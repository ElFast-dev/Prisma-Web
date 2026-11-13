const SHARED_WORKER_ID = crypto.randomUUID();
const RUN_ID = crypto.randomUUID();
const NESTED_WORKER_AVAILABLE = typeof Worker === "function";
const sessions = new Map();
const portOwners = new Map();
const pending = new Map();

let ownerClientId = null;
let databaseWorkerId = null;
let brokerSequence = 0;

function send(port, message, transfer = []) {
  try { port.postMessage(message, transfer); } catch { /* A client may have closed. */ }
}

function sessionFor(port) {
  const clientId = portOwners.get(port);
  return clientId ? sessions.get(clientId) : null;
}

function publishState() {
  const state = {
    kind: "state",
    workerId: SHARED_WORKER_ID,
    runId: RUN_ID,
    nestedWorkerConstructor: NESTED_WORKER_AVAILABLE,
    connections: sessions.size,
    ownerClientId,
    databaseWorkerId,
    requiredOpfsApis: ownerClientId
      ? (sessions.get(ownerClientId)?.opfsApis || null)
      : null,
    ownerReady: Boolean(ownerClientId && databaseWorkerId)
  };
  for (const session of sessions.values()) send(session.port, state);
}

function activateNextOwner() {
  ownerClientId = null;
  databaseWorkerId = null;

  const candidate = [...sessions.values()].find(
    (session) => session.dbPort && session.role !== "failed"
  );
  if (!candidate) {
    publishState();
    return;
  }

  ownerClientId = candidate.clientId;
  candidate.role = "starting";
  candidate.dbPort.postMessage({
    type: "activate",
    clientId: candidate.clientId,
    runId: RUN_ID
  });
  publishState();
}

function removeSession(clientId, reason) {
  const session = sessions.get(clientId);
  if (!session) return;

  portOwners.delete(session.port);
  sessions.delete(clientId);

  try { session.dbPort?.close(); } catch {}
  try { session.port.close(); } catch {}

  const wasOwner = ownerClientId === clientId;
  for (const [brokerRequestId, request] of pending) {
    if (wasOwner || request.clientId === clientId) {
      const target = sessions.get(request.clientId);
      if (target) {
        send(target.port, {
          kind: "response",
          requestId: request.requestId,
          ok: false,
          error: wasOwner
            ? "La pestaña propietaria de SQLite se cerró durante la operación. Consulta el estado antes de reintentar."
            : "La pestaña que originó la operación se cerró."
        });
      }
      pending.delete(brokerRequestId);
    }
  }

  if (wasOwner) activateNextOwner();
  else publishState();
}

function onDatabaseMessage(ownerClientIdForPort, message) {
  const owner = sessions.get(ownerClientIdForPort);
  if (!owner) return;

  if (message.kind === "dedicated-ready") {
    return;
  }

  if (message.kind === "activated") {
    if (ownerClientId !== ownerClientIdForPort) return;
    databaseWorkerId = message.dedicatedWorkerId;
    owner.role = "owner";
    owner.opfsApis = message.requiredOpfsApis || null;
    publishState();
    send(owner.port, {
      kind: "owner-ready",
      workerId: SHARED_WORKER_ID,
      databaseWorkerId,
      requiredOpfsApis: owner.opfsApis,
      totalRows: message.totalRows
    });
    return;
  }

  if (message.kind === "activation-error") {
    if (ownerClientId !== ownerClientIdForPort) return;

    owner.role = "failed";
    owner.opfsApis = message.requiredOpfsApis || null;
    const failedPort = owner.port;

    ownerClientId = null;
    databaseWorkerId = null;

    send(failedPort, {
      kind: "error",
      error: message.error || "No se pudo inicializar SQLite en el Dedicated Worker.",
      requiredOpfsApis: owner.opfsApis,
      workerId: SHARED_WORKER_ID
    });

    // Do not leave other tabs stuck in "registration sent". Elect the next
    // healthy candidate; failed candidates are excluded from future elections.
    activateNextOwner();
    return;
  }

  if (message.kind === "stats") {
    for (const session of sessions.values()) {
      send(session.port, {
        kind: "stats",
        workerId: SHARED_WORKER_ID,
        databaseWorkerId: message.dedicatedWorkerId,
        totalRows: message.totalRows
      });
    }
    return;
  }

  if (message.kind === "response") {
    const request = pending.get(message.brokerRequestId);
    if (!request) return;

    pending.delete(message.brokerRequestId);
    const target = sessions.get(request.clientId);
    if (target) {
      send(target.port, {
        ...message,
        kind: "response",
        workerId: SHARED_WORKER_ID,
        databaseWorkerId: databaseWorkerId
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
    registeredAt: Date.now()
  };
  sessions.set(clientId, session);
  portOwners.set(port, clientId);

  dbPort.onmessage = (event) => onDatabaseMessage(clientId, event.data || {});
  dbPort.onmessageerror = () => {
    if (ownerClientId === clientId) {
      send(port, {
        kind: "error",
        error: "No se pudo deserializar un mensaje del Dedicated Worker SQLite."
      });
    }
  };
  dbPort.start();

  publishState();
  if (!ownerClientId) activateNextOwner();
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

  if (message.type === "unregister") {
    removeSession(session.clientId, "page-unload");
    return;
  }

  if (message.type === "dbWorkerFailed") {
    if (ownerClientId === session.clientId) {
      removeSession(session.clientId, "database-worker-failed");
    }
    return;
  }

  if (message.type === "request") {
    if (!ownerClientId || !databaseWorkerId) {
      send(port, {
        kind: "response",
        requestId: message.requestId,
        ok: false,
        error: "Todavía no hay un Dedicated Worker propietario de SQLite."
      });
      return;
    }

    const owner = sessions.get(ownerClientId);
    if (!owner?.dbPort) {
      activateNextOwner();
      send(port, {
        kind: "response",
        requestId: message.requestId,
        ok: false,
        error: "El propietario de SQLite no está disponible. Reintenta."
      });
      return;
    }

    const brokerRequestId =
      session.clientId + ":" + String(++brokerSequence);
    pending.set(brokerRequestId, {
      clientId: session.clientId,
      requestId: message.requestId
    });

    owner.dbPort.postMessage({
      type: message.operation,
      clientId: session.clientId,
      runId: RUN_ID,
      requestId: message.requestId,
      brokerRequestId,
      count: message.count
    });
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

