const SHARED_WORKER_ID = crypto.randomUUID();
const RUN_ID = "prisma-sahpool-recovery-probe-v1";
const BROKER_PROTOCOL = "recovery-fault-probe-2";
const NESTED_WORKER_AVAILABLE = typeof Worker === "function";

const sessions = new Map();
const portOwners = new Map();
const pending = new Map();

let ownerClientId = null;
let databaseWorkerId = null;
let persistedTotalRows = null;
let brokerSequence = 0;
let controlSequence = 0;
let handoffInProgress = null;

const HEARTBEAT_INTERVAL_MS = 5000;
const HEARTBEAT_TIMEOUT_MS = 20000;
let heartbeatTimer = null;
let heartbeatSequence = 0;

function send(port, message, transfer = []) {
  try { port.postMessage(message, transfer); } catch { /* Client closed. */ }
}

function sessionFor(port) {
  const clientId = portOwners.get(port);
  return clientId ? sessions.get(clientId) : null;
}

function publishState() {
  const owner = ownerClientId ? sessions.get(ownerClientId) : null;
  const state = {
    kind: "state",
    workerId: SHARED_WORKER_ID,
    runId: RUN_ID,
    brokerProtocol: BROKER_PROTOCOL,
    nestedWorkerConstructor: NESTED_WORKER_AVAILABLE,
    connections: sessions.size,
    totalRows: persistedTotalRows,
    ownerClientId,
    ownerRole: owner?.role || null,
    databaseWorkerId,
    requiredOpfsApis: owner?.opfsApis || null,
    removedFailedV4Directory: owner?.removedFailedV4Directory ?? null,
    databaseDiagnostics: owner?.databaseDiagnostics || null,
    ownerReady: Boolean(ownerClientId && owner?.role === "owner" && databaseWorkerId),
    handoffInProgress: handoffInProgress?.phase || null
  };
  for (const session of sessions.values()) send(session.port, state);
}

function requestOwnerTermination(owner, reason) {
  if (!owner || ownerClientId !== owner.clientId || owner.terminationRequested) return;

  owner.terminationRequested = true;
  owner.role = "unresponsive";
  publishState();

  send(owner.port, {
    kind: "terminate-unresponsive-worker",
    workerId: SHARED_WORKER_ID,
    databaseWorkerId,
    reason,
    timeoutMs: HEARTBEAT_TIMEOUT_MS
  });
}

function retireOwnerWorker(clientId, reason) {
  const failed = sessions.get(clientId);
  if (!failed || ownerClientId !== clientId) return;

  failed.role = "failed";
  failed.terminationRequested = false;
  failed.heartbeatPending = null;
  failed.databaseWorkerId = null;

  try { failed.dbPort?.close(); } catch {}
  failed.dbPort = null;

  databaseWorkerId = null;
  ownerClientId = null;

  for (const [brokerRequestId, request] of pending) {
    if (request.watchdogTimer) clearTimeout(request.watchdogTimer);
    const target = sessions.get(request.clientId);
    if (target) {
      send(target.port, {
        kind: "response",
        requestId: request.requestId,
        clientId: request.clientId,
        brokerRequestId,
        ok: false,
        error: "El Dedicated Worker propietario dejó de responder. El coordinador está recuperando SQLite. Consulta el estado antes de reintentar."
      });
    }
    pending.delete(brokerRequestId);
  }

  send(failed.port, {
    kind: "owner-worker-retired",
    reason,
    expectedRows: Number.isFinite(persistedTotalRows) ? persistedTotalRows : 0
  });

  const expectedRows = Number.isFinite(persistedTotalRows)
    ? persistedTotalRows
    : 0;

  activateNextOwner({
    excludeClientId: clientId,
    expectExistingDb: expectedRows > 0,
    expectedMinRows: expectedRows
  });
}

function startHeartbeatLoop() {
  if (heartbeatTimer !== null) return;

  heartbeatTimer = setInterval(() => {
    const owner = ownerClientId ? sessions.get(ownerClientId) : null;
    if (!owner || owner.role !== "owner" || !databaseWorkerId || !owner.dbPort) return;

    const now = Date.now();
    if (owner.heartbeatPending) {
      if (now - owner.heartbeatPending.sentAt >= HEARTBEAT_TIMEOUT_MS) {
        requestOwnerTermination(owner, "heartbeat-timeout");
      }
      return;
    }

    const heartbeatId = "hb-" + String(++heartbeatSequence);
    owner.heartbeatPending = { heartbeatId, sentAt: now };

    try {
      owner.dbPort.postMessage({ type: "heartbeat", heartbeatId });
    } catch {
      requestOwnerTermination(owner, "heartbeat-post-failed");
    }
  }, HEARTBEAT_INTERVAL_MS);
}

function activateNextOwner({
  excludeClientId = null,
  preferredClientId = null,
  expectExistingDb = false,
  expectedMinRows = 0,
  databaseImage = null
} = {}) {
  databaseWorkerId = null;
  ownerClientId = null;

  const eligible = [...sessions.values()].filter((session) =>
    session.clientId !== excludeClientId &&
    session.dbPort &&
    (session.role === "standby" || session.role === "paused")
  );

  const candidate =
    eligible.find((session) => session.clientId === preferredClientId) ||
    eligible[0];

  if (!candidate) {
    publishState();
    return;
  }

  ownerClientId = candidate.clientId;
  candidate.role = "starting";
  const activation = {
    type: "activate",
    clientId: candidate.clientId,
    runId: RUN_ID,
    expectExistingDb,
    expectedMinRows
  };
  const transfer = [];
  if (databaseImage instanceof ArrayBuffer && databaseImage.byteLength) {
    const imageCopy = databaseImage.slice(0);
    activation.databaseImage = imageCopy;
    transfer.push(imageCopy);
  }
  candidate.dbPort.postMessage(activation, transfer);
  publishState();
}

function removeSession(clientId, reason) {
  const session = sessions.get(clientId);
  if (!session) return;

  const wasOwner = ownerClientId === clientId;
  const cancelledHandoff =
    handoffInProgress &&
    (handoffInProgress.fromClientId === clientId ||
     handoffInProgress.toClientId === clientId);

  portOwners.delete(session.port);
  sessions.delete(clientId);

  try { session.dbPort?.close(); } catch {}
  try { session.port.close(); } catch {}

  for (const [brokerRequestId, request] of pending) {
    if (wasOwner || request.clientId === clientId) {
      const target = sessions.get(request.clientId);
      if (target) {
        send(target.port, {
          kind: "response",
          requestId: request.requestId,
          ok: false,
          error: "El propietario o la pestaña que originó la operación se cerró. Consulta el estado antes de reintentar."
        });
      }
      if (request.watchdogTimer) clearTimeout(request.watchdogTimer);
      pending.delete(brokerRequestId);
    }
  }

  if (cancelledHandoff) handoffInProgress = null;

  if (wasOwner) {
    databaseWorkerId = null;
    const expectedRows = Number.isFinite(persistedTotalRows)
      ? persistedTotalRows
      : 0;
    activateNextOwner({
      expectExistingDb: expectedRows > 0,
      expectedMinRows: expectedRows
    });
  } else {
    publishState();
  }
}

function finishHandoff(ownerClientIdForPort, message) {
  if (!handoffInProgress ||
      handoffInProgress.phase !== "releasing" ||
      handoffInProgress.fromClientId !== ownerClientIdForPort ||
      ownerClientId !== ownerClientIdForPort) {
    return;
  }

  const previousOwner = sessions.get(ownerClientIdForPort);

  if (!(message.databaseImage instanceof ArrayBuffer) ||
      message.databaseImage.byteLength <= 0) {
    const expectedRows = Number.isFinite(message.totalRows) ? message.totalRows : 0;
    if (previousOwner) {
      previousOwner.role = "paused";
      previousOwner.databaseWorkerId = message.dedicatedWorkerId;
    }
    handoffInProgress = {
      controlId: handoffInProgress.controlId,
      phase: "restoring",
      fromClientId: null,
      toClientId: ownerClientIdForPort,
      expectedRows,
      databaseImage: null,
      failure: "El propietario no pudo exportar una instantánea SQLite para el relevo."
    };
    ownerClientId = null;
    databaseWorkerId = null;
    activateNextOwner({
      preferredClientId: ownerClientIdForPort,
      expectExistingDb: true,
      expectedMinRows: expectedRows
    });
    return;
  }
  if (previousOwner) {
    previousOwner.role = "paused";
    previousOwner.databaseWorkerId = message.dedicatedWorkerId;
    previousOwner.databaseDiagnostics = message.databaseDiagnostics || null;
  }

  const targetClientId = handoffInProgress.toClientId;
  handoffInProgress.phase = "activating";
  handoffInProgress.expectedRows = Number.isFinite(message.totalRows)
    ? message.totalRows
    : 0;
  handoffInProgress.databaseImage = message.databaseImage.slice(0);
  handoffInProgress.databaseImageBytes = message.databaseImage.byteLength;

  ownerClientId = null;
  databaseWorkerId = null;

  if (previousOwner) {
    send(previousOwner.port, {
      kind: "handoff-released",
      totalRows: message.totalRows,
      databaseDiagnostics: message.databaseDiagnostics || null,
      vfsPaused: message.vfsPaused === true,
      databaseImageBytes: message.databaseImageBytes || 0
    });
  }

  // The incoming Worker must recover the exact same DB file and at least
  // the row count confirmed by the outgoing owner. Empty DBs are rejected.
  activateNextOwner({
    excludeClientId: ownerClientIdForPort,
    preferredClientId: targetClientId,
    expectExistingDb: true,
    expectedMinRows: handoffInProgress.expectedRows,
    databaseImage: handoffInProgress.databaseImage
  });
}

function onDatabaseMessage(ownerClientIdForPort, message) {
  const owner = sessions.get(ownerClientIdForPort);
  if (!owner) return;

  if (message.kind === "heartbeat-ack") {
    if (ownerClientId === ownerClientIdForPort &&
        owner.heartbeatPending?.heartbeatId === message.heartbeatId &&
        owner.role === "owner") {
      owner.heartbeatPending = null;
      owner.lastHeartbeatAt = Date.now();
    }
    return;
  }

  if (message.kind === "dedicated-ready") return;

  if (message.kind === "broker-trace") {
    let tracedRequest = pending.get(message.brokerRequestId);
    if (!tracedRequest && message.requestId != null) {
      for (const candidate of pending.values()) {
        if (candidate.requestId === message.requestId &&
            candidate.clientId === message.clientId) {
          tracedRequest = candidate;
          break;
        }
      }
    }

    if (tracedRequest && typeof message.stage === "string") {
      tracedRequest.stage = message.stage;
    }

    const target = tracedRequest
      ? sessions.get(tracedRequest.clientId)
      : sessions.get(ownerClientIdForPort);

    if (target) {
      send(target.port, {
        kind: "broker-trace",
        workerId: SHARED_WORKER_ID,
        databaseWorkerId,
        brokerProtocol: BROKER_PROTOCOL,
        ...message,
        matchedPendingRequest: Boolean(tracedRequest)
      });
    }
    return;
  }

  if (message.kind === "activated") {
    if (ownerClientId !== ownerClientIdForPort) return;

    databaseWorkerId = message.dedicatedWorkerId;
    persistedTotalRows = Number.isFinite(message.totalRows)
      ? message.totalRows
      : persistedTotalRows;
    owner.role = "owner";
    owner.heartbeatPending = null;
    owner.lastHeartbeatAt = Date.now();
    owner.terminationRequested = false;
    startHeartbeatLoop();
    owner.opfsApis = message.requiredOpfsApis || null;
    owner.removedFailedV4Directory = message.removedFailedV4Directory === true;
    owner.databaseWorkerId = databaseWorkerId;
    owner.databaseDiagnostics = message.databaseDiagnostics || null;

    const completedHandoff =
      handoffInProgress?.toClientId === ownerClientIdForPort
        ? handoffInProgress
        : null;
    handoffInProgress = null;

    publishState();
    send(owner.port, {
      kind: "owner-ready",
      workerId: SHARED_WORKER_ID,
      runId: RUN_ID,
      databaseWorkerId,
      requiredOpfsApis: owner.opfsApis,
      removedFailedV4Directory: owner.removedFailedV4Directory,
      totalRows: message.totalRows,
      databaseDiagnostics: owner.databaseDiagnostics
    });

    if (completedHandoff?.phase === "activating") {
      const previousOwner = sessions.get(completedHandoff.fromClientId);
      if (previousOwner) {
        send(previousOwner.port, {
          kind: "handoff-complete",
          newOwnerClientId: ownerClientIdForPort,
          databaseWorkerId,
          totalRows: message.totalRows,
          databaseDiagnostics: owner.databaseDiagnostics
        });
      }
    } else if (completedHandoff?.phase === "restoring") {
      const failedCandidate = sessions.get(completedHandoff.fromClientId);
      if (failedCandidate) {
        send(failedCandidate.port, {
          kind: "handoff-failed",
          ownerRestored: true,
          error: completedHandoff.failure,
          restoredOwnerClientId: ownerClientIdForPort,
          totalRows: message.totalRows,
          databaseDiagnostics: owner.databaseDiagnostics
        });
      }
      send(owner.port, {
        kind: "handoff-restored",
        error: completedHandoff.failure,
        totalRows: message.totalRows,
        databaseDiagnostics: owner.databaseDiagnostics
      });
    }
    return;
  }

  if (message.kind === "activation-error") {
    if (ownerClientId !== ownerClientIdForPort) return;

    owner.role = "failed";
    owner.opfsApis = message.requiredOpfsApis || null;
    owner.databaseDiagnostics = message.databaseDiagnostics || null;

    send(owner.port, {
      kind: "error",
      error: message.error || "No se pudo recuperar la base SQLite en el Dedicated Worker.",
      requiredOpfsApis: owner.opfsApis,
      databaseDiagnostics: owner.databaseDiagnostics,
      workerId: SHARED_WORKER_ID
    });

    const failedHandoff =
      handoffInProgress?.phase === "activating" &&
      handoffInProgress.toClientId === ownerClientIdForPort
        ? handoffInProgress
        : null;

    ownerClientId = null;
    databaseWorkerId = null;

    if (failedHandoff) {
      // Restore the old owner, whose own PoolUtil remains paused in memory.
      handoffInProgress = {
        phase: "restoring",
        fromClientId: ownerClientIdForPort,
        toClientId: failedHandoff.fromClientId,
        expectedRows: failedHandoff.expectedRows,
        databaseImage: failedHandoff.databaseImage || null,
        failure: message.error || "El nuevo propietario no recuperó la base anterior."
      };
      activateNextOwner({
        excludeClientId: ownerClientIdForPort,
        preferredClientId: failedHandoff.fromClientId,
        expectExistingDb: true,
        expectedMinRows: failedHandoff.expectedRows,
        databaseImage: failedHandoff.databaseImage || null
      });
    } else if (
      handoffInProgress?.phase === "restoring" &&
      handoffInProgress.toClientId === ownerClientIdForPort
    ) {
      // The previous owner could not recover either. Stop automatic retries
      // and report the failure rather than presenting an empty DB as success.
      const restoreFailure = handoffInProgress.failure;
      handoffInProgress = null;
      publishState();
      for (const session of sessions.values()) {
        send(session.port, {
          kind: "handoff-failed",
          error: "No se pudo completar ni revertir el relevo. Error inicial: " +
            restoreFailure + ". Error de recuperación: " +
            (message.error || "desconocido"),
          databaseDiagnostics: owner.databaseDiagnostics
        });
      }
    } else {
      handoffInProgress = null;
      activateNextOwner({ excludeClientId: ownerClientIdForPort });
    }
    return;
  }

  if (message.kind === "released") {
    finishHandoff(ownerClientIdForPort, message);
    return;
  }

  if (message.kind === "release-error") {
    if (!handoffInProgress ||
        handoffInProgress.phase !== "releasing" ||
        handoffInProgress.fromClientId !== ownerClientIdForPort ||
        ownerClientId !== ownerClientIdForPort) {
      return;
    }

    owner.role = "owner";
    databaseWorkerId = message.dedicatedWorkerId || owner.databaseWorkerId;
    handoffInProgress = null;
    publishState();
    send(owner.port, {
      kind: "handoff-error",
      error: message.error || "SQLite no pudo liberar el VFS.",
      databaseDiagnostics: message.databaseDiagnostics || null,
      vfsPaused: message.vfsPaused === true
    });
    return;
  }

  if (message.kind === "stats") {
    if (Number.isFinite(message.totalRows)) {
      persistedTotalRows = message.totalRows;
    }
    if (message.databaseDiagnostics) {
      owner.databaseDiagnostics = message.databaseDiagnostics;
    }
    for (const session of sessions.values()) {
      send(session.port, {
        kind: "stats",
        workerId: SHARED_WORKER_ID,
        databaseWorkerId: message.dedicatedWorkerId,
        totalRows: message.totalRows,
        databaseDiagnostics: message.databaseDiagnostics || null
      });
    }
    return;
  }

  if (message.kind === "response") {
    let matchedBrokerRequestId = message.brokerRequestId || null;
    let request = matchedBrokerRequestId
      ? pending.get(matchedBrokerRequestId)
      : null;

    // Fallback correlation: tolerate a missing or changed brokerRequestId
    // when the originating page requestId and clientId still match.
    if (!request && message.requestId != null && message.clientId) {
      for (const [candidateBrokerId, candidate] of pending) {
        if (candidate.requestId === message.requestId &&
            candidate.clientId === message.clientId) {
          matchedBrokerRequestId = candidateBrokerId;
          request = candidate;
          break;
        }
      }
    }

    if (!request) {
      const origin = message.clientId ? sessions.get(message.clientId) : null;
      if (origin) {
        send(origin.port, {
          kind: "broker-orphan-response",
          workerId: SHARED_WORKER_ID,
          databaseWorkerId,
          receivedBrokerRequestId: message.brokerRequestId || null,
          receivedRequestId: message.requestId || null,
          receivedClientId: message.clientId || null
        });
      }
      return;
    }

    pending.delete(matchedBrokerRequestId);
    if (request.watchdogTimer) clearTimeout(request.watchdogTimer);
    if (Number.isFinite(message.totalRows)) {
      persistedTotalRows = message.totalRows;
    }
    if (message.databaseDiagnostics) {
      owner.databaseDiagnostics = message.databaseDiagnostics;
    }
    const target = sessions.get(request.clientId);
    if (target) {
      send(target.port, {
        ...message,
        kind: "response",
        requestId: request.requestId,
        brokerRequestId: matchedBrokerRequestId,
        workerId: SHARED_WORKER_ID,
        databaseWorkerId,
        brokerCorrelation: message.brokerRequestId === matchedBrokerRequestId
          ? "brokerRequestId"
          : "clientId+requestId"
      });
    }
  }
}

function registerSession(port, message, dbPort) {
  const clientId = message.clientId;
  if (typeof clientId !== "string" || !clientId || !dbPort) {
    send(port, {
      kind: "error",
      error: "Registro inválido: falta clientId o puerto del Dedicated Worker."
    });
    try { dbPort?.close(); } catch {}
    return;
  }

  if (sessions.has(clientId)) {
    send(port, { kind: "error", error: "clientId duplicado." });
    try { dbPort.close(); } catch {}
    return;
  }

  const session = {
    clientId,
    port,
    dbPort,
    role: "standby",
    registeredAt: Date.now(),
    heartbeatPending: null,
    lastHeartbeatAt: null,
    terminationRequested: false,
    opfsApis: null,
    removedFailedV4Directory: null,
    databaseWorkerId: null,
    databaseDiagnostics: null
  };
  sessions.set(clientId, session);
  portOwners.set(port, clientId);

  dbPort.onmessage = (event) => onDatabaseMessage(clientId, event.data || {});
  dbPort.onmessageerror = () => {
    if (ownerClientId === clientId) {
      requestOwnerTermination(
        sessions.get(clientId),
        "dedicated-messageerror"
      );
    }
  };
  dbPort.start();

  publishState();
  if (!ownerClientId) activateNextOwner();
}

function beginHandoff(session) {
  if (handoffInProgress) {
    send(session.port, {
      kind: "handoff-error",
      error: "Ya hay una transferencia de propiedad en curso."
    });
    return;
  }

  if (ownerClientId !== session.clientId || session.role !== "owner" || !databaseWorkerId) {
    send(session.port, {
      kind: "handoff-error",
      error: "Esta pestaña no es la propietaria activa de SQLite."
    });
    return;
  }

  const candidate = [...sessions.values()].find((other) =>
    other.clientId !== session.clientId &&
    other.dbPort &&
    (other.role === "standby" || other.role === "paused")
  );

  if (!candidate) {
    send(session.port, {
      kind: "handoff-error",
      error: "No hay otra pestaña conectada que pueda asumir la propiedad."
    });
    return;
  }

  const controlId = "handoff-" + String(++controlSequence);
  handoffInProgress = {
    controlId,
    phase: "releasing",
    fromClientId: session.clientId,
    toClientId: candidate.clientId,
    expectedRows: null
  };

  session.role = "releasing";
  publishState();
  send(session.port, {
    kind: "handoff-started",
    targetClientId: candidate.clientId
  });

  session.dbPort.postMessage({
    type: "release",
    controlId,
    clientId: session.clientId,
    runId: RUN_ID
  });
}

function handleClientMessage(port, message, dbPort) {
  if (message?.type === "register") {
    registerSession(port, message, dbPort);
    return;
  }

  const session = sessionFor(port);
  if (!session) {
    send(port, { kind: "error", error: "La pestaña todavía no está registrada." });
    return;
  }

  if (message.type === "heartbeat") return;

  if (message.type === "cancelRequest") {
    for (const [brokerRequestId, request] of pending) {
      if (request.clientId === session.clientId &&
          request.requestId === message.requestId) {
        pending.delete(brokerRequestId);
        if (request.watchdogTimer) clearTimeout(request.watchdogTimer);
        send(port, {
          kind: "broker-trace",
          stage: "request-cancelled-at-coordinator",
          brokerRequestId,
          requestId: request.requestId,
          clientId: session.clientId,
          operation: request.operation,
          lastStage: request.stage || "shared-received"
        });
      }
    }
    return;
  }

  if (message.type === "unregister") {
    removeSession(session.clientId, "page-unload");
    return;
  }

  if (message.type === "handoff") {
    beginHandoff(session);
    return;
  }

  if (message.type === "dbWorkerFailed" ||
      message.type === "dbWorkerTerminated") {
    if (ownerClientId === session.clientId) {
      retireOwnerWorker(
        session.clientId,
        message.type === "dbWorkerFailed" ? "dedicated-worker-error" : "owner-confirmed-termination"
      );
    }
    return;
  }

  if (message.type === "request") {
    send(port, {
      kind: "broker-trace",
      stage: "shared-received",
      brokerProtocol: BROKER_PROTOCOL,
      requestId: message.requestId,
      clientId: session.clientId,
      operation: message.operation
    });

    const activeOwner = ownerClientId
      ? sessions.get(ownerClientId)
      : null;

    if (!activeOwner || activeOwner.role !== "owner" || !databaseWorkerId) {
      send(port, {
        kind: "broker-trace",
        stage: "shared-rejected",
        brokerProtocol: BROKER_PROTOCOL,
        requestId: message.requestId,
        clientId: session.clientId,
        operation: message.operation,
        reason: "no-active-owner",
        activeOwnerRole: activeOwner?.role || null,
        databaseWorkerId
      });
      send(port, {
        kind: "response",
        requestId: message.requestId,
        clientId: session.clientId,
        ok: false,
        error: "SQLite está preparando o transfiriendo su propiedad. Espera a que indique «Propietaria activa»."
      });
      return;
    }

    const brokerRequestId =
      session.clientId + ":" + String(++brokerSequence);
    const pendingRequest = {
      clientId: session.clientId,
      requestId: message.requestId,
      operation: message.operation,
      createdAt: Date.now(),
      stage: "shared-received",
      watchdogTimer: null
    };
    pending.set(brokerRequestId, pendingRequest);

    pendingRequest.watchdogTimer = setTimeout(() => {
      const stillPending = pending.get(brokerRequestId);
      if (!stillPending) return;
      const target = sessions.get(stillPending.clientId);
      if (target) {
        send(target.port, {
          kind: "broker-watchdog",
          brokerProtocol: BROKER_PROTOCOL,
          brokerRequestId,
          requestId: stillPending.requestId,
          clientId: stillPending.clientId,
          operation: stillPending.operation,
          lastStage: stillPending.stage,
          elapsedMs: Date.now() - stillPending.createdAt,
          ownerClientId: activeOwner.clientId,
          databaseWorkerId
        });
      }
    }, 18000);

    pendingRequest.stage = "shared-forwarded";
    send(port, {
      kind: "broker-trace",
      stage: "shared-forwarded",
      brokerProtocol: BROKER_PROTOCOL,
      brokerRequestId,
      requestId: message.requestId,
      clientId: session.clientId,
      operation: message.operation,
      ownerClientId: activeOwner.clientId,
      databaseWorkerId
    });

    try {
      activeOwner.dbPort.postMessage({
        type: message.operation,
        clientId: session.clientId,
        runId: RUN_ID,
        requestId: message.requestId,
        brokerRequestId,
        count: message.count
      });
    } catch (error) {
      pending.delete(brokerRequestId);
      if (pendingRequest.watchdogTimer) clearTimeout(pendingRequest.watchdogTimer);
      send(port, {
        kind: "broker-trace",
        stage: "shared-forward-failed",
        brokerProtocol: BROKER_PROTOCOL,
        brokerRequestId,
        requestId: message.requestId,
        clientId: session.clientId,
        operation: message.operation,
        error: error?.message || String(error)
      });
      send(port, {
        kind: "response",
        requestId: message.requestId,
        clientId: session.clientId,
        brokerRequestId,
        ok: false,
        error: "El coordinador no pudo enviar la operación al Dedicated Worker: " +
          (error?.message || String(error))
      });
    }
  }
}

self.onconnect = (event) => {
  const port = event.ports[0];
  port.onmessage = (messageEvent) => {
    handleClientMessage(
      port,
      messageEvent.data || {},
      messageEvent.ports?.[0] || null
    );
  };
  port.onmessageerror = () => {};
  port.start();
};
