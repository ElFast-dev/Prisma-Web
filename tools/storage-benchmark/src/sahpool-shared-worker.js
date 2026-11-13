const SHARED_WORKER_ID = crypto.randomUUID();
const ports = new Set();
const pending = new Map();

let databaseWorker = null;
let databaseWorkerFailure = null;

function send(port, message) {
  try { port.postMessage(message); } catch { /* The tab may have closed. */ }
}

function broadcast(message) {
  for (const port of ports) send(port, message);
}

function failPending(error) {
  for (const [requestId, owner] of pending) {
    send(owner, {
      kind: "response",
      requestId,
      ok: false,
      workerId: SHARED_WORKER_ID,
      error
    });
  }
  pending.clear();
}

function startDatabaseWorker() {
  if (databaseWorker) return databaseWorker;
  if (databaseWorkerFailure) throw new Error(databaseWorkerFailure);

  // SyncAccessHandle is available only in Dedicated Workers. This SharedWorker
  // coordinates tabs and forwards all SQLite operations to one dedicated owner.
  databaseWorker = new Worker(
    new URL("./sahpool-db-worker.js", import.meta.url),
    {
      type: "module",
      name: "prisma-sahpool-database-owner-v2"
    }
  );

  databaseWorker.onmessage = (event) => {
    const message = event.data || {};

    if (message.kind === "stats") {
      broadcast({
        ...message,
        workerId: SHARED_WORKER_ID,
        connections: ports.size
      });
      return;
    }

    if (message.kind === "response") {
      const owner = pending.get(message.requestId);
      if (!owner) return;

      pending.delete(message.requestId);
      send(owner, {
        ...message,
        workerId: SHARED_WORKER_ID,
        connections: ports.size
      });
    }
  };

  databaseWorker.onerror = (event) => {
    const detail = event.message || "Error desconocido en el Dedicated Worker SQLite.";
    databaseWorkerFailure = detail;
    databaseWorker?.terminate();
    databaseWorker = null;
    failPending("Fallo del Dedicated Worker SQLite: " + detail);
    broadcast({
      kind: "fatal",
      workerId: SHARED_WORKER_ID,
      error: detail
    });
  };

  databaseWorker.onmessageerror = () => {
    failPending("No se pudo deserializar una respuesta del Dedicated Worker SQLite.");
  };

  return databaseWorker;
}

self.onconnect = (event) => {
  const port = event.ports[0];
  ports.add(port);

  port.onmessage = (messageEvent) => {
    const request = messageEvent.data || {};
    const requestId = request.requestId;

    if (typeof requestId !== "string" || !requestId) {
      send(port, {
        kind: "response",
        ok: false,
        workerId: SHARED_WORKER_ID,
        error: "Solicitud sin requestId."
      });
      return;
    }

    if (pending.has(requestId)) {
      send(port, {
        kind: "response",
        requestId,
        ok: false,
        workerId: SHARED_WORKER_ID,
        error: "requestId duplicado."
      });
      return;
    }

    try {
      const owner = startDatabaseWorker();
      pending.set(requestId, port);
      owner.postMessage(request);
    } catch (error) {
      send(port, {
        kind: "response",
        requestId,
        ok: false,
        workerId: SHARED_WORKER_ID,
        error: error?.message || String(error)
      });
    }
  };

  port.start();

  broadcast({
    kind: "connections",
    workerId: SHARED_WORKER_ID,
    connections: ports.size
  });
};
