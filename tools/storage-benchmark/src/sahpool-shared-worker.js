import sqlite3InitModule from "../node_modules/@sqlite.org/sqlite-wasm/dist/index.mjs";

const WORKER_ID = crypto.randomUUID();
const DB_DIRECTORY = "/prisma-sahpool-sharedworker-probe-v1";
const DB_FILE = "/sharedworker-probe.sqlite3";
const ports = new Set();

let sqlite3 = null;
let pool = null;
let db = null;
let initialization = null;

function post(port, payload) {
  try { port.postMessage(payload); } catch { /* A client may have closed. */ }
}

function broadcast(payload) {
  for (const port of ports) post(port, payload);
}

function connectionSnapshot() {
  return {
    workerId: WORKER_ID,
    connections: ports.size,
    crossOriginIsolated: self.crossOriginIsolated === true
  };
}

async function ensureDatabase() {
  if (db) return db;
  if (!initialization) {
    initialization = (async () => {
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

async function handle(port, message) {
  const { requestId, type, clientId } = message || {};
  try {
    if (type === "hello" || type === "status") {
      await ensureDatabase();
      post(port, {
        kind: "response", requestId, ok: true, type,
        workerId: WORKER_ID,
        connections: ports.size,
        crossOriginIsolated: self.crossOriginIsolated === true,
        totalRows: countRows(),
        clientRows: clientRows(clientId)
      });
      return;
    }

    if (type === "insertBatch") {
      await ensureDatabase();
      const count = Math.max(1, Math.min(100, Number(message.count) || 25));
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

      const totalRows = countRows();
      const ownRows = clientRows(clientId);
      broadcast({
        kind: "stats",
        workerId: WORKER_ID,
        connections: ports.size,
        totalRows
      });
      post(port, {
        kind: "response", requestId, ok: true, type,
        workerId: WORKER_ID,
        connections: ports.size,
        inserted: count,
        clientRows: ownRows,
        totalRows
      });
      return;
    }

    if (type === "reopenVerify") {
      await ensureDatabase();
      db.close();
      db = new pool.OpfsSAHPoolDb(DB_FILE);
      const totalRows = countRows();
      post(port, {
        kind: "response", requestId, ok: true, type,
        workerId: WORKER_ID,
        connections: ports.size,
        totalRows,
        clientRows: clientRows(clientId)
      });
      return;
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
      post(port, {
        kind: "response", requestId, ok: true, type,
        workerId: WORKER_ID,
        removeVfsResult
      });
      broadcast({
        kind: "cleaned",
        workerId: WORKER_ID,
        connections: ports.size
      });
      return;
    }

    throw new Error("Operación desconocida: " + String(type));
  } catch (error) {
    post(port, {
      kind: "response", requestId, ok: false, type,
      workerId: WORKER_ID,
      error: error?.message || String(error)
    });
  }
}

self.onconnect = (event) => {
  const port = event.ports[0];
  ports.add(port);

  port.onmessage = (messageEvent) => {
    handle(port, messageEvent.data);
  };
  port.start();

  broadcast({
    kind: "connections",
    ...connectionSnapshot()
  });
};
