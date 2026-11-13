import sqlite3InitModule from "../node_modules/@sqlite.org/sqlite-wasm/dist/index.mjs";

const VFS_NAME = "opfs-sahpool";
const DB_DIRECTORY = "/prisma-sahpool-sharedworker-probe-v5";
const DB_FILE = "/sharedworker-probe.sqlite3";
const DEDICATED_WORKER_ID = crypto.randomUUID();

let sqlite3 = null;
let pool = null;
let db = null;
let initialization = null;
let removedFailedV4Directory = false;
let importedDatabaseBytes = 0;
let port = null;
let queue = Promise.resolve();

function send(payload, transfer = []) {
  if (!port) return;
  try {
    port.postMessage(
      { dedicatedWorkerId: DEDICATED_WORKER_ID, ...payload },
      transfer
    );
  } catch { /* The coordinator/page may already be gone. */ }
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

function poolSnapshot() {
  if (!pool) return null;

  let fileNames = [];
  try { fileNames = pool.getFileNames(); } catch {}

  let databaseFileBytes = null;
  const databaseFileFound = fileNames.includes(DB_FILE);
  if (databaseFileFound) {
    try { databaseFileBytes = pool.exportFile(DB_FILE).byteLength; }
    catch (error) {
      databaseFileBytes = "ERROR: " + (error?.message || String(error));
    }
  }

  return {
    vfsName: pool.vfsName,
    directory: DB_DIRECTORY,
    capacity: pool.getCapacity(),
    allocatedFiles: pool.getFileCount(),
    fileNames,
    databaseFileFound,
    databaseFileBytes,
    importedDatabaseBytes: importedDatabaseBytes || 0,
    vfsPaused: pool.isPaused()
  };
}

function databaseSnapshot() {
  const snapshot = poolSnapshot();
  if (!snapshot) return null;

  let totalRows = null;
  let writesTableExists = false;

  if (db) {
    try { totalRows = countRows(); } catch (error) {
      totalRows = "ERROR: " + (error?.message || String(error));
    }
    try {
      writesTableExists = Number(db.selectValue(
        "SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name='writes'"
      )) === 1;
    } catch {}
  }

  return {
    ...snapshot,
    writesTableExists,
    totalRows
  };
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

async function installPoolIfNeeded() {
  if (pool) return pool;

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

  if (!initialization) {
    initialization = (async () => {
      sqlite3 = await sqlite3InitModule();
      removedFailedV4Directory = await removeFailedV4TestDirectory();

      // Match SQLite's official SAH-pool pause demo: the incoming Worker
      // installs the same named VFS only after the previous owner paused it.
      pool = await sqlite3.installOpfsSAHPoolVfs({
        name: VFS_NAME,
        directory: DB_DIRECTORY,
        clearOnInit: false,
        initialCapacity: 6,
        preserveOnInitFailure: true
      });

      return pool;
    })().catch((error) => {
      initialization = null;
      pool = null;
      throw error;
    });
  }

  await initialization;
  return pool;
}

async function openDatabase({
  expectExistingDb = false,
  expectedMinRows = 0,
  databaseImage = null
} = {}) {
  await installPoolIfNeeded();

  if (pool.isPaused()) {
    await pool.unpauseVfs();
  }

  importedDatabaseBytes = 0;
  if (databaseImage) {
    const image = databaseImage instanceof Uint8Array
      ? databaseImage
      : new Uint8Array(databaseImage);

    if (!image.byteLength) {
      throw new Error("La instantánea SQLite recibida está vacía.");
    }

    // importDb overwrites the named virtual SQLite database with the exact
    // byte snapshot exported by the previous owner before its VFS was paused.
    importedDatabaseBytes = pool.importDb(DB_FILE, image);
  }

  const beforeOpen = poolSnapshot();

  // Do not silently create a fresh empty DB during a handoff. The incoming
  // owner must find the exact persisted virtual filename in the SAH pool.
  if (expectExistingDb && (
    !beforeOpen?.databaseFileFound ||
    !(Number(beforeOpen.databaseFileBytes) > 0)
  )) {
    throw new Error(
      "Relevo cancelado: el nuevo Worker no encontró el archivo SQLite anterior. " +
      "Diagnóstico del pool: " + JSON.stringify(beforeOpen)
    );
  }

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

  const totalRows = countRows();

  if (expectExistingDb && totalRows < expectedMinRows) {
    const diagnostic = databaseSnapshot();
    db.close();
    db = null;
    pool.pauseVfs();

    throw new Error(
      "Relevo cancelado: SQLite recuperó " + totalRows +
      " registros, pero el propietario anterior confirmó " +
      expectedMinRows + ". El VFS se pausó sin borrar los archivos. " +
      "Diagnóstico: " + JSON.stringify(diagnostic)
    );
  }

  return db;
}

async function ensureDatabase(options = {}) {
  if (db) return db;

  try {
    return await openDatabase(options);
  } catch (error) {
    // Preserve the on-disk VFS. If activation is rejected, the old paused
    // owner can reacquire it through unpauseVfs().
    if (db) {
      try { db.close(); } catch {}
      db = null;
    }
    if (pool && !pool.isPaused()) {
      try { pool.pauseVfs(); } catch {}
    }
    throw error;
  }
}

async function handle(request) {
  const {
    type, clientId, runId, requestId, brokerRequestId, controlId,
    expectExistingDb = false, expectedMinRows = 0, databaseImage = null
  } = request || {};

  if (type === "activate" || type === "status") {
    await ensureDatabase({ expectExistingDb, expectedMinRows, databaseImage });
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
      databaseDiagnostics: databaseSnapshot(),
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
    send({
      kind: "stats",
      runId,
      totalRows,
      databaseDiagnostics: databaseSnapshot()
    });

    return {
      kind: "response",
      requestId,
      brokerRequestId,
      clientId,
      ok: true,
      type,
      inserted: count,
      clientRows: clientRows(runId, clientId),
      totalRows,
      databaseDiagnostics: databaseSnapshot()
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
      clientRows: clientRows(runId, clientId),
      databaseDiagnostics: databaseSnapshot()
    };
  }

  if (type === "release") {
    const totalRows = db ? countRows() : null;

    if (!db || !pool) {
      throw new Error("No hay una conexión SQLite activa que pueda cederse.");
    }

    db.close();
    db = null;

    // Export only after closing the database so its journal is resolved.
    // The coordinator keeps this snapshot until the incoming Worker verifies it.
    const databaseBytes = pool.exportFile(DB_FILE);
    if (!(databaseBytes instanceof Uint8Array) || !databaseBytes.byteLength) {
      throw new Error("No se pudo exportar una instantánea SQLite válida.");
    }

    const databaseImage = databaseBytes.slice().buffer;
    const beforeRelease = {
      ...poolSnapshot(),
      totalRows,
      databaseImageBytes: databaseImage.byteLength
    };

    if (!pool.isPaused()) {
      pool.pauseVfs();
    }

    return {
      kind: "released",
      controlId,
      clientId,
      ok: true,
      totalRows,
      databaseImage,
      databaseImageBytes: databaseImage.byteLength,
      databaseDiagnostics: beforeRelease,
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
    if (result?.kind === "released" && result.databaseImage instanceof ArrayBuffer) {
      const image = result.databaseImage;
      delete result.databaseImage;
      send({ ...result, databaseImage: image }, [image]);
    } else {
      send(result);
    }
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
      databaseDiagnostics: databaseSnapshot(),
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
