import sqlite3InitModule from "../node_modules/@sqlite.org/sqlite-wasm/dist/index.mjs";

const DB_DIRECTORY = "/prisma-sahpool-sharedworker-probe-v2";
const DB_FILE = "/sharedworker-probe.sqlite3";
const DEDICATED_WORKER_ID = crypto.randomUUID();

let sqlite3 = null;
let pool = null;
let db = null;
let initialization = null;
let queue = Promise.resolve();

function postResponse(request, payload) {
  self.postMessage({
    kind: "response",
    requestId: request?.requestId,
    clientId: request?.clientId,
    dedicatedWorkerId: DEDICATED_WORKER_ID,
    ...payload
  });
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

async function ensureDatabase() {
  if (db) return db;

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

      pool = await sqlite3.installOpfsSAHPoolVfs({
        directory: DB_DIRECTORY,
        initialCapacity: 6,
        clearOnInit: true,
        preserveOnInitFailure: true
      });

      db = new pool.OpfsSAHPoolDb(DB_FILE);
      db.exec(
        "PRAGMA foreign_keys = ON;" +
        "PRAGMA synchronous = FULL;" +
        "PRAGMA journal_mode = DELETE;" +
        "CREATE TABLE IF NOT EXISTS writes (" +
          "id TEXT PRIMARY KEY," +
          "client_id TEXT NOT NULL," +
          "sequence INTEGER NOT NULL," +
          "created_at INTEGER NOT NULL" +
        ");" +
        "CREATE INDEX IF NOT EXISTS idx_writes_client " +
          "ON writes(client_id, sequence);"
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

function clientRows(clientId) {
  return Number(db.selectValue(
    "SELECT COUNT(*) FROM writes WHERE client_id = ?",
    clientId
  ));
}

async function handle(request) {
  const { type, clientId } = request || {};
  if (typeof type !== "string") {
    throw new Error("Solicitud sin tipo de operación.");
  }

  if (type === "hello" || type === "status") {
    await ensureDatabase();
    return {
      ok: true,
      type,
      dedicatedWorkerId: DEDICATED_WORKER_ID,
      requiredOpfsApis: requiredOpfsApis(),
      totalRows: countRows(),
      clientRows: clientRows(clientId)
    };
  }

  if (type === "insertBatch") {
    await ensureDatabase();

    if (typeof clientId !== "string" || !clientId) {
      throw new Error("Falta el identificador de la pestaña.");
    }

    const count = Math.max(1, Math.min(100, Number(request.count) || 25));
    const insert = db.prepare(
      "INSERT INTO writes (id, client_id, sequence, created_at) VALUES (?, ?, ?, ?)"
    );

    try {
      db.transaction("IMMEDIATE", () => {
        for (let i = 1; i <= count; i += 1) {
          insert.bind([
            clientId + ":" + i,
            clientId,
            i,
            Date.now()
          ]).stepReset();
        }
      });
    } finally {
      insert.finalize();
    }

    return {
      ok: true,
      type,
      inserted: count,
      clientRows: clientRows(clientId),
      totalRows: countRows()
    };
  }

  if (type === "reopenVerify") {
    await ensureDatabase();
    db.close();
    db = new pool.OpfsSAHPoolDb(DB_FILE);

    return {
      ok: true,
      type,
      totalRows: countRows(),
      clientRows: clientRows(clientId)
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
      ok: true,
      type,
      removeVfsResult
    };
  }

  throw new Error("Operación desconocida: " + type);
}

self.addEventListener("message", (event) => {
  const request = event.data;

  // SAH pool has one database owner. Serialize every request, even when
  // two ports submit work at nearly the same time.
  queue = queue.then(async () => {
    try {
      const result = await handle(request);
      postResponse(request, result);
    } catch (error) {
      postResponse(request, {
        ok: false,
        error: error?.message || String(error)
      });
    }
  });
});
