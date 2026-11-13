import sqlite3InitModule from "../../node_modules/@sqlite.org/sqlite-wasm/dist/index.mjs";

let sqlite3 = null;
let db = null;
let runId = null;
let clientId = null;
let filename = null;
let busyRetries = 0;
let initialized = false;

function send(type, extra = {}) {
  self.postMessage({
    type,
    clientId,
    runId,
    ...extra
  });
}

function asNumber(value) {
  return Number(value);
}

function retryBusy(stage, callback) {
  return sqlite3.capi.sqlite3_js_retry_busy(-1, callback, (attempt) => {
    busyRetries += 1;
    send("busy-retry", { stage, attempt, busyRetries });
  });
}

function readCounts() {
  return {
    total: asNumber(db.selectValue(
      "SELECT COUNT(*) FROM writes WHERE run_id = ?",
      runId
    )),
    A: asNumber(db.selectValue(
      "SELECT COUNT(*) FROM writes WHERE run_id = ? AND client_id = 'A'",
      runId
    )),
    B: asNumber(db.selectValue(
      "SELECT COUNT(*) FROM writes WHERE run_id = ? AND client_id = 'B'",
      runId
    ))
  };
}

function openDb() {
  retryBusy("open", () => {
    db = new sqlite3.oo1.OpfsWlDb({
      filename,
      flags: "c"
    });
  });
  if (!db || !db.pointer) {
    throw new Error("SQLite no devolvió una conexión válida.");
  }
  sqlite3.capi.sqlite3_busy_timeout(db.pointer, 5000);
}

function seedDatabase() {
  retryBusy("seed", () => {
    db.transaction("IMMEDIATE", (tx) => {
      tx.exec(
        "CREATE TABLE IF NOT EXISTS writes (" +
          "id TEXT PRIMARY KEY," +
          "run_id TEXT NOT NULL," +
          "client_id TEXT NOT NULL," +
          "batch_no INTEGER NOT NULL," +
          "row_no INTEGER NOT NULL," +
          "created_at INTEGER NOT NULL" +
        ");" +
        "CREATE INDEX IF NOT EXISTS idx_writes_run_client " +
          "ON writes(run_id, client_id, batch_no);"
      );

      const insert = tx.prepare(
        "INSERT INTO writes " +
        "(id, run_id, client_id, batch_no, row_no, created_at) " +
        "VALUES (?, ?, ?, ?, ?, ?)"
      );
      try {
        for (let row = 1; row <= 5; row += 1) {
          insert.bind([
            runId + ":reference:" + row,
            runId,
            "REFERENCE",
            0,
            row,
            Date.now()
          ]).stepReset();
        }
      } finally {
        insert.finalize();
      }
    });
  });
}

async function initialize(message) {
  if (initialized) throw new Error("Este Worker ya fue inicializado.");

  runId = String(message.runId || "");
  clientId = String(message.clientId || "");
  filename = String(message.filename || "");

  if (!/^prisma-opfs-wl-auto-[0-9a-f-]{36}$/i.test(runId)) {
    throw new Error("RUN_ID no válido.");
  }
  if (clientId !== "A" && clientId !== "B") {
    throw new Error("Identificador de cliente no válido.");
  }
  if (!filename.startsWith("/" + runId + "/")) {
    throw new Error("La ruta SQLite no pertenece al RUN_ID de esta ejecución.");
  }
  if (!self.crossOriginIsolated || typeof SharedArrayBuffer !== "function" ||
      typeof Atomics.waitAsync !== "function" || !navigator.locks) {
    throw new Error(
      "El Worker no está aislado o no dispone de SharedArrayBuffer, " +
      "Atomics.waitAsync y Web Locks."
    );
  }

  sqlite3 = await sqlite3InitModule();

  if (typeof sqlite3.oo1.OpfsWlDb !== "function") {
    throw new Error(
      "SQLite WASM no expone sqlite3.oo1.OpfsWlDb. " +
      "Comprueba que el paquete fijado incluye OPFS-WL."
    );
  }

  if (!sqlite3.capi.sqlite3_vfs_find("opfs-wl")) {
    throw new Error(
      "El VFS opfs-wl no quedó registrado en SQLite. " +
      "No se creó ni se aceptó una base alternativa."
    );
  }

  openDb();

  if (clientId === "A") {
    seedDatabase();
  } else {
    const initial = readCounts();
    if (initial.total !== 5) {
      throw new Error(
        "El cliente B esperaba encontrar las cinco filas iniciales, pero encontró " +
        initial.total + ". Se detuvo para no aceptar una base vacía."
      );
    }
  }

  const counts = readCounts();
  if (counts.total !== 5) {
    throw new Error("La preparación no terminó con exactamente cinco filas.");
  }

  initialized = true;
  send("ready", {
    counts,
    sqliteCoreVersion: sqlite3.version.libVersion,
    packageVersion: "3.54.1-build1",
    vfsAvailable: true,
    connection: "Dedicated Worker independiente",
    workerCrossOriginIsolated: self.crossOriginIsolated,
    webLocks: typeof navigator.locks !== "undefined",
    atomicsWaitAsync: typeof Atomics.waitAsync === "function",
    sharedArrayBuffer: typeof SharedArrayBuffer === "function"
  });
}

function runBatches() {
  if (!initialized || !db) throw new Error("La conexión no está preparada.");

  const latencies = [];
  const completedAt = [];
  let retryCountAtStart = busyRetries;

  for (let batch = 1; batch <= 12; batch += 1) {
    const started = performance.now();

    retryBusy("write-" + batch, () => {
      db.transaction("IMMEDIATE", (tx) => {
        const insert = tx.prepare(
          "INSERT INTO writes " +
          "(id, run_id, client_id, batch_no, row_no, created_at) " +
          "VALUES (?, ?, ?, ?, ?, ?)"
        );
        try {
          for (let row = 1; row <= 25; row += 1) {
            insert.bind([
              runId + ":" + clientId + ":" + batch + ":" + row,
              runId,
              clientId,
              batch,
              row,
              Date.now()
            ]).stepReset();
          }
        } finally {
          insert.finalize();
        }
      });
    });

    const elapsedMs = Number((performance.now() - started).toFixed(2));
    latencies.push(elapsedMs);
    completedAt.push(performance.now());

    send("batch-complete", {
      batch,
      batchesCompleted: batch,
      rowsInserted: 25,
      latencyMs: elapsedMs,
      busyRetries: busyRetries - retryCountAtStart
    });
    retryCountAtStart = busyRetries;
  }

  const sorted = [...latencies].sort((a, b) => a - b);
  const mean = latencies.reduce((sum, value) => sum + value, 0) / latencies.length;
  const p95 = sorted[Math.max(0, Math.ceil(sorted.length * 0.95) - 1)];

  send("writes-done", {
    batchesCompleted: latencies.length,
    rowsInserted: latencies.length * 25,
    busyRetries,
    meanMs: Number(mean.toFixed(2)),
    p95Ms: Number(p95.toFixed(2)),
    minMs: Number(sorted[0].toFixed(2)),
    maxMs: Number(sorted[sorted.length - 1].toFixed(2)),
    totalMs: Number((completedAt[completedAt.length - 1] -
      (completedAt[0] - latencies[0])).toFixed(2))
  });
}

function verify() {
  const counts = readCounts();
  send("verified", { counts });
}

function reopenAndVerify() {
  if (db) {
    db.close();
    db = null;
  }
  openDb();
  const counts = readCounts();
  send("reopened", { counts });
}

function closeConnection() {
  if (db) {
    db.close();
    db = null;
  }
  send("closed", { closed: true });
}

self.addEventListener("message", async (event) => {
  const message = event.data || {};
  try {
    switch (message.type) {
      case "init":
        await initialize(message);
        break;
      case "start":
        runBatches();
        break;
      case "verify":
        verify();
        break;
      case "reopen":
        reopenAndVerify();
        break;
      case "close":
        closeConnection();
        break;
      default:
        throw new Error("Operación desconocida: " + String(message.type));
    }
  } catch (error) {
    send("error", {
      stage: message.type || "unknown",
      error: error?.message || String(error),
      name: error?.name || "Error",
      resultCode: Number.isFinite(error?.resultCode) ? error.resultCode : null,
      stack: error?.stack || null
    });
  }
});
