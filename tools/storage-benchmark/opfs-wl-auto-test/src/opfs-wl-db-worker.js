import sqlite3InitModule from "../../node_modules/@sqlite.org/sqlite-wasm/dist/index.mjs";

let sqlite3 = null;
let db = null;
let runId = null;
let clientId = null;
let filename = null;
let busyRetries = 0;
let openAttempts = 0;
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

function describeError(error, stage) {
  const message = error?.message || String(error);
  const resultCode = Number.isFinite(error?.resultCode) ? error.resultCode : null;
  let resultCodeName = null;
  if (resultCode !== null && sqlite3?.capi?.sqlite3_js_rc_str) {
    try {
      resultCodeName = sqlite3.capi.sqlite3_js_rc_str(resultCode);
    } catch {}
  }

  let vfsNames = [];
  try {
    vfsNames = sqlite3?.capi?.sqlite3_js_vfs_list?.() || [];
  } catch {}

  let isOpen = null;
  let pointerType = null;
  let filenameValue = null;
  let schemaTables = null;
  let schemaProbeError = null;
  try {
    if (db) {
      pointerType = typeof db.pointer;
      isOpen = typeof db.isOpen === "function" ? db.isOpen() : Boolean(db.pointer);
      filenameValue = db.filename || null;
      if (isOpen) {
        schemaTables = db.selectValues(
          "SELECT name FROM sqlite_schema WHERE type = 'table' ORDER BY name"
        );
      }
    }
  } catch (probeError) {
    schemaProbeError = probeError?.message || String(probeError);
  }

  return {
    stage,
    name: error?.name || "Error",
    message,
    resultCode,
    resultCodeName,
    sqliteVersion: sqlite3?.version?.libVersion || null,
    opfsWlConstructor: typeof sqlite3?.oo1?.OpfsWlDb,
    opfsWlVfsPointer: Boolean(sqlite3?.capi?.sqlite3_vfs_find?.("opfs-wl")),
    registeredVfs: vfsNames,
    filename: filenameValue || filename,
    schemaTables,
    schemaProbeError,
    dbObjectType: db === null ? "null" : typeof db,
    dbPointerType: pointerType,
    dbIsOpen: isOpen,
    openAttempts,
    busyRetries,
    stack: typeof error?.stack === "string" ? error.stack.slice(0, 8000) : null
  };
}

function throwDiagnosticError(error, stage) {
  const details = describeError(error, stage);
  const wrapped = new Error(
    "OPFS-WL " + stage + " · " + details.name + ": " + details.message +
    " · Diagnóstico: " + JSON.stringify(details)
  );
  wrapped.name = details.name;
  wrapped.resultCode = details.resultCode;
  wrapped.diagnostics = details;
  throw wrapped;
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
    )),
    tableTotal: asNumber(db.selectValue(
      "SELECT COUNT(*) FROM writes"
    ))
  };
}

function sqlLiteral(value) {
  return "'" + String(value).replace(/'/g, "''") + "'";
}

function buildInsertSql(targetClient, batchNo, rowCount) {
  const values = [];
  for (let row = 1; row <= rowCount; row += 1) {
    const id = targetClient === "REFERENCE"
      ? runId + ":reference:" + row
      : runId + ":" + targetClient + ":" + batchNo + ":" + row;
    values.push("(" + [
      sqlLiteral(id),
      sqlLiteral(runId),
      sqlLiteral(targetClient),
      String(batchNo),
      String(row),
      String(Date.now())
    ].join(", ") + ")");
  }
  return "INSERT INTO writes " +
    "(id, run_id, client_id, batch_no, row_no, created_at) VALUES " +
    values.join(", ") + ";";
}

function inspectWriteRows() {
  return {
    groups: db.selectArrays(
      "SELECT quote(run_id), quote(client_id), COUNT(*) " +
      "FROM writes GROUP BY run_id, client_id ORDER BY run_id, client_id"
    ),
    sample: db.selectArrays(
      "SELECT quote(id), quote(run_id), quote(client_id), batch_no, row_no " +
      "FROM writes ORDER BY rowid LIMIT 10"
    )
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/*
 * Open exactly as SQLite's official OPFS concurrency tester does:
 * retry SQLITE_BUSY around the constructor itself, not by wrapping open()
 * in sqlite3_js_retry_busy(). That helper is used for SQL transactions below.
 */
async function openDb() {
  const maxOpenAttempts = 120;
  openAttempts = 0;

  while (true) {
    openAttempts += 1;
    try {
      db = new sqlite3.oo1.OpfsWlDb({
        filename,
        flags: "c"
      });

      const pointer = db?.pointer;
      const isOpen = typeof db?.isOpen === "function"
        ? db.isOpen()
        : Boolean(pointer);

      if (!db || !pointer || !isOpen) {
        const error = new Error(
          "El constructor terminó sin una conexión SQLite abierta. " +
          "pointer=" + String(pointer) + "; isOpen=" + String(isOpen)
        );
        error.name = "SQLiteConnectionNotOpen";
        throw error;
      }
      break;
    } catch (error) {
      const isBusy = error instanceof sqlite3.SQLite3Error &&
        error.resultCode === sqlite3.capi.SQLITE_BUSY;

      if (isBusy && openAttempts < maxOpenAttempts) {
        busyRetries += 1;
        send("busy-retry", {
          stage: "open",
          attempt: openAttempts + 1,
          busyRetries,
          error: error.message
        });
        await sleep(Math.min(100, 10 + openAttempts * 2));
        continue;
      }

      // Preserve the failed object until diagnostics have captured its
      // pointer/isOpen/filename state. The page terminates this Worker on error.
      throwDiagnosticError(error, "open");
    }
  }

  try {
    sqlite3.capi.sqlite3_busy_timeout(db.pointer, 5000);
  } catch (error) {
    throwDiagnosticError(error, "busy-timeout");
  }

  return db;
}

function seedDatabase() {
  /*
   * Use one multi-row SQL INSERT rather than the prepared-statement loop.
   * The report separates whole-table rows from rows matching this RUN_ID.
   */
  const seedSql = buildInsertSql("REFERENCE", 0, 5);
  let executedSeedSql = [];
  let changesInsideTransaction = null;
  let totalChangesInsideTransaction = null;

  retryBusy("seed", () => {
    executedSeedSql = [];
    changesInsideTransaction = null;
    totalChangesInsideTransaction = null;
    db.transaction("IMMEDIATE", (tx) => {
      tx.exec(seedSql, { saveSql: executedSeedSql });
      changesInsideTransaction = tx.changes();
      totalChangesInsideTransaction = tx.changes(true);
      if (changesInsideTransaction !== 5) {
        throw new Error(
          "El INSERT de referencia reportó " + changesInsideTransaction +
          " cambios; se esperaban cinco."
        );
      }
    });
  });

  const seededCounts = readCounts();
  if (seededCounts.total !== 5 || seededCounts.tableTotal !== 5) {
    throw new Error(
      "La siembra no dejó cinco filas para este RUN_ID. " +
      "Diagnóstico: " + JSON.stringify({
        counts: seededCounts,
        changesInsideTransaction,
        totalChangesInsideTransaction,
        totalChangesAfterCommit: db.changes(true),
        executedSeedSql,
        rows: inspectWriteRows()
      })
    );
  }
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
  if (!filename.startsWith("file:" + runId + "/")) {
    throw new Error("La ruta SQLite no pertenece al RUN_ID de esta ejecución.");
  }
  if (!self.crossOriginIsolated || typeof SharedArrayBuffer !== "function" ||
      typeof Atomics.waitAsync !== "function" || !navigator.locks) {
    throw new Error(
      "El Worker no está aislado o no dispone de SharedArrayBuffer, " +
      "Atomics.waitAsync y Web Locks."
    );
  }

  try {
    sqlite3 = await sqlite3InitModule();
  } catch (error) {
    throwDiagnosticError(error, "sqlite-module-init");
  }

  if (typeof sqlite3.oo1.OpfsWlDb !== "function") {
    throw new Error(
      "SQLite WASM no expone sqlite3.oo1.OpfsWlDb. " +
      "Diagnóstico: " + JSON.stringify({
        sqliteVersion: sqlite3?.version?.libVersion || null,
        opfsWlConstructor: typeof sqlite3?.oo1?.OpfsWlDb,
        registeredVfs: sqlite3?.capi?.sqlite3_js_vfs_list?.() || []
      })
    );
  }

  if (!sqlite3.capi.sqlite3_vfs_find("opfs-wl")) {
    throw new Error(
      "El VFS opfs-wl no quedó registrado en SQLite. " +
      "Diagnóstico: " + JSON.stringify({
        sqliteVersion: sqlite3?.version?.libVersion || null,
        registeredVfs: sqlite3?.capi?.sqlite3_js_vfs_list?.() || [],
        crossOriginIsolated: self.crossOriginIsolated,
        atomicsWaitAsync: typeof Atomics.waitAsync === "function",
        webLocks: Boolean(navigator.locks)
      })
    );
  }

  await openDb();

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
    vfsName: "opfs-wl",
    connection: "Dedicated Worker independiente",
    filename,
    workerCrossOriginIsolated: self.crossOriginIsolated,
    webLocks: typeof navigator.locks !== "undefined",
    atomicsWaitAsync: typeof Atomics.waitAsync === "function",
    sharedArrayBuffer: typeof SharedArrayBuffer === "function",
    openAttempts,
    busyRetries
  });
}

function runBatches() {
  if (!initialized || !db) throw new Error("La conexión no está preparada.");

  const latencies = [];
  const completedAt = [];
  let retryCountAtStart = busyRetries;

  for (let batch = 1; batch <= 12; batch += 1) {
    const started = performance.now();

    let batchChanges = null;
    retryBusy("write-" + batch, () => {
      batchChanges = null;
      db.transaction("IMMEDIATE", (tx) => {
        tx.exec(buildInsertSql(clientId, batch, 25));
        batchChanges = tx.changes();
        if (batchChanges !== 25) {
          throw new Error(
            "La transacción " + batch + " de " + clientId +
            " reportó " + batchChanges + " cambios; se esperaban 25."
          );
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
  const average = latencies.reduce((sum, value) => sum + value, 0) / latencies.length;
  const p95 = sorted[Math.max(0, Math.ceil(sorted.length * 0.95) - 1)];

  send("writes-done", {
    batchesCompleted: latencies.length,
    rowsInserted: latencies.length * 25,
    busyRetries,
    meanMs: Number(average.toFixed(2)),
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

async function reopenAndVerify() {
  if (db) {
    db.close();
    db = null;
  }
  await openDb();
  const counts = readCounts();
  send("reopened", { counts, openAttempts, busyRetries });
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
        await reopenAndVerify();
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
      diagnostics: error?.diagnostics || describeError(error, message.type || "unknown"),
      stack: error?.stack || null
    });
  }
});
