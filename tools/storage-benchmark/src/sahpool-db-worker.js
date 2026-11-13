import sqlite3InitModule from "../node_modules/@sqlite.org/sqlite-wasm/dist/index.mjs";

const DB_DIRECTORY = "/prisma-sahpool-sharedworker-probe-v5";
const DB_FILE = "/sharedworker-probe.sqlite3";
const DEDICATED_WORKER_ID = crypto.randomUUID();

let sqlite3 = null;
let pool = null;
let db = null;
let initialization = null;
let removedFailedV4Directory = false;
let port = null;
let queue = Promise.resolve();

function send(payload) {
  if (!port) return;
  try { port.postMessage({ dedicatedWorkerId: DEDICATED_WORKER_ID, ...payload }); }
  catch { /* The coordinator/page may already be gone. */ }
}

function requiredOpfsApis() {
  return {
    FileSystemHandle: typeof FileSystemHandle !== "undefined",
    FileSystemDirectoryHandle: typeof FileSystemDirectoryHandle !== "undefined",
    FileSystemFileHandle: typeof FileSystemFileHandle !== "undefined",
    createSyncAccessHandle:
      typeof FileSystemFileHandle !== "undefined" &&
      typeof FileSystemFileHandle.prototype?.createSyncAccessHandle === "function",
    storageGetDirectory:
      typeof navigator !== "undefined" &&
      typeof navigator.storage?.getDirectory === "function"
  };
}

async function removeFailedV4TestDirectory() {
  const root = await navigator.storage.getDirectory();
  try {
    await root.removeEntry("prisma-sahpool-sharedworker-probe-v4", {
      recursive: true
    });
    return true;
  } catch (error) {
    if (error?.name === "NotFoundError") return false;
    throw error;
  }
}

async function ensureDatabase() {
  if (db) return db;

  // A previous owner can hand off its PoolUtil without deleting the database.
  // The next elected Dedicated Worker reclaims the same SAHs with unpauseVfs().
  if (pool && typeof pool.isPaused === "function" && pool.isPaused()) {
    await pool.unpauseVfs();
    db = new pool.OpfsSAHPoolDb(DB_FILE);
    return db;
  }

  if (pool && !db) {
    db = new pool.OpfsSAHPoolDb(DB_FILE);
    return db;
  }

  if (!initialization) {
    initialization = (async () => {
      const apis = requiredOpfsApis();
      const missing = Object.entries(apis)
        .filter(([, available]) => !available)
        .map(([name]) => name);

      if (missing.length) {
        throw new Error(
          "El Dedicated Worker no expone las APIs OPFS requeridas: " +
          missing.join(", ") + ". Diagnóstico: " + JSON.stringify(apis)
        );
      }

      sqlite3 = await sqlite3InitModule();
      removedFailedV4Directory = await removeFailedV4TestDirectory();

      pool = await sqlite3.installOpfsSAHPoolVfs({
        directory: DB_DIRECTORY,
        initialCapacity: 6,
        preserveOnInitFailure: true
      });

      db = new pool.OpfsSAHPoolDb(DB_FILE);
      db.exec(
        "PRAGMA foreign_keys = ON;" +
        "PRAGMA synchronous = FULL;" +
        "PRAGMA journal_mode = DELETE;" +
        "CREATE TABLE IF NOT EXISTS writes (" +
          "id TEXT PRIMARY KEY," +
          "run_id TEXT NOT NULL," +
          "client_id TEXT NOT NULL," +
          "sequence INTEGER NOT NULL," +
          "created_at INTEGER NOT NULL" +
        ");" +
        "CREATE INDEX IF NOT EXISTS idx_writes_run_client " +
          "ON writes(run_id, client_id, sequence);"
      );

      return db;
    })().catch((error) => {
      initialization = null;
      throw error;
    });
  }

  await initialization;
  return db;
}

function countRows() {
  return Number(db.selectValue("SELECT COUNT(*) FROM writes"));
}

function clientRows(runId, clientId) {
  return Number(db.selectValue(
    "SELECT COUNT(*) FROM writes WHERE run_id = ? AND client_id = ?",
    [runId, clientId]
  ));
}

async function handle(request) {
  const {
    type, clientId, runId, requestId, brokerRequestId, controlId
  } = request || {};

  if (type === "activate" || type === "status") {
    await ensureDatabase();
    return {
      kind: type === "activate" ? "activated" : "response",
      requestId,
      brokerRequestId,
      controlId,
      clientId,
      ok: true,
      totalRows: countRows(),
      clientRows: clientRows(runId, clientId),
      requiredOpfsApis: requiredOpfsApis(),
      removedFailedV4Directory,
      vfsPaused: Boolean(pool?.isPaused?.())
    };
  }

  if (type === "insertBatch") {
    await ensureDatabase();

    if (typeof clientId !== "string" || !clientId ||
        typeof runId !== "string" || !runId) {
      throw new Error("Falta clientId o runId.");
    }

    const count = Math.max(1, Math.min(100, Number(request.count) || 25));
    const insert = db.prepare(
      "INSERT INTO writes (id, run_id, client_id, sequence, created_at) " +
      "VALUES (?, ?, ?, ?, ?)"
    );

    try {
      db.transaction("IMMEDIATE", () => {
        for (let i = 1; i <= count; i += 1) {
          insert.bind([
            runId + ":" + clientId + ":" + Date.now() + ":" + i,
            runId,
            clientId,
            i,
            Date.now()
          ]).stepReset();
        }
      });
    } finally {
      insert.finalize();
    }

    const totalRows = countRows();
    send({ kind: "stats", runId, totalRows });

    return {
      kind: "response",
      requestId,
      brokerRequestId,
      clientId,
      ok: true,
      type,
      inserted: count,
      clientRows: clientRows(runId, clientId),
      totalRows
    };
  }

  if (type === "reopenVerify") {
    await ensureDatabase();
    db.close();
    db = new pool.OpfsSAHPoolDb(DB_FILE);

    return {
      kind: "response",
      requestId,
      brokerRequestId,
      clientId,
      ok: true,
      type,
      totalRows: countRows(),
      clientRows: clientRows(runId, clientId)
    };
  }

  if (type === "release") {
    const totalRows = db ? countRows() : null;

    if (db) {
      db.close();
      db = null;
    }

    if (pool && !pool.isPaused()) {
      // Releases every SyncAccessHandle but preserves the OPFS files.
      pool.pauseVfs();
    }

    return {
      kind: "released",
      controlId,
      clientId,
      ok: true,
      totalRows,
      vfsPaused: Boolean(pool?.isPaused?.())
    };
  }

  if (type === "cleanup") {
    if (db) {
      db.close();
      db = null;
    }

    let removeVfsResult = null;
    if (pool) {
      removeVfsResult = await pool.removeVfs();
      pool = null;
    }

    sqlite3 = null;
    initialization = null;

    return {
      kind: "response",
      requestId,
      brokerRequestId,
      clientId,
      ok: true,
      type,
      removeVfsResult
    };
  }

  throw new Error("Operación desconocida: " + String(type));
}

async function processRequest(request) {
  try {
    const result = await handle(request);
    send(result);
  } catch (error) {
    send({
      kind: request?.type === "activate"
        ? "activation-error"
        : request?.type === "release"
          ? "release-error"
          : "response",
      requestId: request?.requestId,
      brokerRequestId: request?.brokerRequestId,
      controlId: request?.controlId,
      clientId: request?.clientId,
      ok: false,
      error: error?.message || String(error),
      requiredOpfsApis: requiredOpfsApis(),
      vfsPaused: Boolean(pool?.isPaused?.())
    });
  }
}

self.addEventListener("message", (event) => {
  if (event.data?.type !== "attach" || !event.ports?.[0]) return;
  if (port) {
    event.ports[0].close();
    return;
  }

  port = event.ports[0];
  port.onmessage = (messageEvent) => {
    const request = messageEvent.data;
    queue = queue.then(() => processRequest(request));
  };
  port.start();
  send({ kind: "dedicated-ready" });
});
