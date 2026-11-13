const query = new URLSearchParams(location.search);
const runToken = query.get("run") || "";
const slot = query.get("slot") || "?";
const token = query.get("token") || "";
let label = query.get("label") || ("Cliente " + slot);
const APP = "prisma-concurrency-auto-v1";

const $ = (id) => document.getElementById(id);
$("label").textContent = label;

let session = null;
let counter = 0;

function emit(type, details = {}) {
  parent.postMessage({
    app: APP,
    runToken,
    slot,
    token,
    type,
    label,
    clientId: session?.clientId || null,
    at: Date.now(),
    ...details
  }, location.origin);
}

function setStatus(value) {
  $("status").textContent = value;
}

function startSession() {
  const clientId = crypto.randomUUID();
  const dbWorkerUrl = new URL("./src/auto-db-worker.js", location.href);
  dbWorkerUrl.searchParams.set("run", runToken);

  const brokerUrl = new URL("./src/auto-shared-worker.js", location.href);
  brokerUrl.searchParams.set("run", runToken);

  const dbWorker = new Worker(dbWorkerUrl, {
    type: "module",
    name: "prisma-auto-db-" + runToken + "-" + slot + "-" + clientId
  });

  const channel = new MessageChannel();
  dbWorker.postMessage({ type: "attach", port: channel.port1 }, [channel.port1]);

  const shared = new SharedWorker(brokerUrl, {
    type: "module",
    name: "prisma-auto-shared-" + runToken
  });

  const port = shared.port;
  const current = {
    clientId,
    dbWorker,
    dbPort: channel.port2,
    shared,
    port,
    workerTerminated: false,
    unregistering: false
  };
  session = current;

  dbWorker.onerror = (event) => {
    emit("client-error", { error: "Dedicated Worker: " + (event.message || "error") });
  };
  dbWorker.onmessageerror = () => {
    emit("client-error", { error: "Mensaje no deserializable del Dedicated Worker." });
  };
  shared.onerror = (event) => {
    emit("client-error", { error: "SharedWorker: " + (event.message || "error") });
  };

  port.onmessage = (event) => {
    if (session !== current) return;
    const message = event.data || {};

    if (message.kind === "state" || message.kind === "state-snapshot") {
      setStatus(message.ownerClientId === clientId
        ? (message.ownerReady ? "Propietario activo" : "Preparando propiedad")
        : (message.ownerClientId ? "Reserva conectada" : "Sin propietario"));
      $("details").textContent =
        "Sesiones: " + String(message.connections) +
        " · Filas confirmadas: " + String(message.totalRows ?? "—");
      emit("state", { state: message });
      return;
    }

    if (message.kind === "owner-ready") {
      setStatus("Propietario activo");
      emit("owner-ready", { data: message });
      return;
    }

    if (message.kind === "terminate-unresponsive-worker") {
      try { current.dbWorker?.terminate(); } catch {}
      current.dbWorker = null;
      current.workerTerminated = true;
      current.port.postMessage({
        type: "dbWorkerTerminated",
        reason: message.reason || "heartbeat-timeout"
      });
      emit("termination-confirmed", {
        reason: message.reason || "heartbeat-timeout",
        action: "dbWorkerTerminated"
      });
      return;
    }

    if (message.kind === "terminate-activation-candidate") {
      try { current.dbWorker?.terminate(); } catch {}
      current.dbWorker = null;
      current.workerTerminated = true;
      current.port.postMessage({
        type: "activationCandidateTerminated",
        activationId: message.activationId,
        reason: message.reason || "activation-timeout"
      });
      emit("termination-confirmed", {
        reason: message.reason || "activation-timeout",
        activationId: message.activationId,
        action: "activationCandidateTerminated"
      });
      return;
    }

    if (message.kind === "owner-worker-retired") {
      setStatus("Worker propietario retirado");
      emit("owner-retired", { data: message });
      return;
    }

    if (message.kind === "response") {
      emit("response", { data: message, requestId: message.requestId });
      return;
    }

    if (message.kind === "broker-trace") {
      emit("broker-trace", { data: message, stage: message.stage });
      return;
    }

    if (message.kind === "stats") {
      emit("stats", { data: message });
      return;
    }

    if (message.kind === "broker-watchdog") {
      emit("broker-watchdog", { data: message });
      return;
    }

    if (message.kind === "error" || message.kind === "handoff-error" ||
        message.kind === "handoff-failed") {
      emit("client-error", { error: message.error || message.kind, data: message });
      return;
    }
  };

  port.start();
  port.postMessage({
    type: "register",
    clientId,
    visibilityState: document.visibilityState,
    lifecycleState: "active"
  }, [channel.port2]);

  emit("registered");
  port.postMessage({ type: "getState", reason: "auto-test-register" });
}

function stopSession({ terminateWorker = true, unregister = true } = {}) {
  const old = session;
  if (!old) return;

  session = null;
  if (unregister) {
    try { old.port.postMessage({ type: "unregister" }); } catch {}
  }
  if (terminateWorker) {
    try { old.dbWorker?.terminate(); } catch {}
  }
  setTimeout(() => {
    try { old.port.close(); } catch {}
    try { old.dbPort?.close(); } catch {}
  }, 100);
}

function handleCommand(message) {
  if (message.command === "kill-worker") {
    if (!session || !session.dbWorker) {
      emit("worker-killed", { alreadyTerminated: true });
      return;
    }
    try { session.dbWorker.terminate(); } catch {}
    session.dbWorker = null;
    session.workerTerminated = true;
    setStatus("Dedicated Worker terminado deliberadamente");
    emit("worker-killed", { alreadyTerminated: false });
    return;
  }

  if (message.command === "request") {
    if (!session || !session.port) {
      emit("client-error", { error: "Sesión no conectada." });
      return;
    }
    session.port.postMessage({
      type: "request",
      requestId: message.requestId,
      operation: message.operation,
      count: message.count
    });
    emit("request-sent", {
      requestId: message.requestId,
      operation: message.operation
    });
    return;
  }

  if (message.command === "snapshot") {
    session?.port.postMessage({ type: "getState", reason: "auto-test-snapshot" });
    return;
  }

  if (message.command === "restart") {
    const nextLabel = message.label || label;
    stopSession({ terminateWorker: true, unregister: true });
    label = nextLabel;
    $("label").textContent = label;
    setStatus("Reiniciando sesión…");
    setTimeout(startSession, 180);
    return;
  }

  if (message.command === "dispose") {
    stopSession({ terminateWorker: true, unregister: true });
    setStatus("Desconectado");
    emit("disposed");
  }
}

window.addEventListener("message", (event) => {
  if (event.source !== parent || event.origin !== location.origin) return;
  const message = event.data || {};
  if (message.app !== APP || message.runToken !== runToken ||
      message.token !== token) return;
  handleCommand(message);
});

document.addEventListener("visibilitychange", () => {
  if (session?.port) {
    session.port.postMessage({
      type: "lifecycle",
      eventName: "visibilitychange",
      lifecycleState: document.visibilityState,
      visibilityState: document.visibilityState
    });
  }
});

window.addEventListener("pagehide", () => {
  stopSession({ terminateWorker: true, unregister: true });
});

startSession();
