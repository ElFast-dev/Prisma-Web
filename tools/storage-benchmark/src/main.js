import Dexie from "../node_modules/dexie/dist/dexie.mjs";

const $ = (id) => document.getElementById(id);
const FIELDS = [
  ["moduleInitMs", "Inicialización SQLite WASM"],
  ["vfsInitMs", "Inicialización OPFS VFS"],
  ["openMs", "Apertura de base"],
  ["dataBuildMs", "Generación del dataset"],
  ["insertMs", "Inserción + commit"],
  ["yearQueryMs", "Consulta por año"],
  ["titleQueryMs", "Búsqueda por título"],
  ["viewsQueryMs", "Visionados ordenados"],
  ["updateMs", "Actualizar calificación"],
  ["rollbackMs", "Rollback"],
  ["reopenMs", "Cerrar + reabrir"],
];

let lastReport = null;

function pad(value, width = 6) {
  return String(value).padStart(width, "0");
}

function buildDataset(movieCount, viewsPerMovie) {
  const movies = [];
  const views = [];
  for (let i = 0; i < movieCount; i += 1) {
    const id = `movie-${pad(i)}`;
    const title = `Prisma Film ${pad(i)}`;
    const year = 1980 + (i % 47);
    movies.push({ id, title, year });

    for (let j = 0; j < viewsPerMovie; j += 1) {
      views.push({
        id: `view-${pad(i)}-${j}`,
        movieId: id,
        watchedAt: Date.UTC(2020 + (j % 6), (i + j) % 12, 1 + ((i + j) % 27), 20, 0, 0),
        rating: ((i + j) % 10) + 1
      });
    }
  }
  const targetIndex = Math.floor(movieCount / 2);
  return {
    movies,
    views,
    targetMovieId: `movie-${pad(targetIndex)}`,
    targetTitle: `Prisma Film ${pad(targetIndex)}`,
    targetViewId: `view-${pad(targetIndex)}-0`,
    expectedViews: movieCount * viewsPerMovie,
    expectedViewsForTarget: viewsPerMovie,
    expectedYearCount: movieCount <= 20 ? 0 : Math.floor((movieCount - 1 - 20) / 47) + 1
  };
}

function elapsed(start) {
  return Number((performance.now() - start).toFixed(2));
}

async function inspectBenchmarkOpfsDirectory() {
  try {
    const root = await navigator.storage.getDirectory();
    const dir = await root.getDirectoryHandle("prisma-storage-benchmark-v1", { create: false });
    const entries = [];
    for await (const [name] of dir.entries()) entries.push(name);
    return { exists: true, entries };
  } catch (error) {
    if (error?.name === "NotFoundError") return { exists: false, entries: [] };
    return { exists: null, error: error?.message || String(error) };
  }
}

async function inspectDexieBenchmarkDatabases() {
  if (typeof indexedDB.databases !== "function") {
    return { supported: false, names: [], error: "indexedDB.databases() no está expuesto" };
  }
  try {
    const databases = await indexedDB.databases();
    const names = databases
      .map((entry) => entry.name)
      .filter((name) => typeof name === "string" && name.startsWith("prisma-dexie-benchmark-"));
    return { supported: true, names };
  } catch (error) {
    return { supported: true, names: [], error: error?.message || String(error) };
  }
}

async function storageEstimate() {
  try {
    if (!navigator.storage?.estimate) return null;
    const value = await navigator.storage.estimate();
    return {
      usage: Number.isFinite(value.usage) ? value.usage : null,
      quota: Number.isFinite(value.quota) ? value.quota : null
    };
  } catch {
    return null;
  }
}

async function runDexie(movieCount, viewsPerMovie, round) {
  const dbName = `prisma-dexie-benchmark-${Date.now()}-${round}`;
  const db = new Dexie(dbName, { chromeTransactionDurability: "strict" });
  db.version(1).stores({
    movies: "id,title,year",
    views: "id,movieId,watchedAt,[movieId+watchedAt]"
  });

  const totalStart = performance.now();
  try {
    let openStart = performance.now();
    await db.open();
    const openMs = elapsed(openStart);

    const buildStart = performance.now();
    const data = buildDataset(movieCount, viewsPerMovie);
    const dataBuildMs = elapsed(buildStart);

    const insertStart = performance.now();
    await db.transaction("rw", db.movies, db.views, async () => {
      await db.movies.bulkAdd(data.movies);
      await db.views.bulkAdd(data.views);
    });
    const insertMs = elapsed(insertStart);

    let queryStart = performance.now();
    const yearCount = await db.movies.where("year").equals(2000).count();
    const yearQueryMs = elapsed(queryStart);

    queryStart = performance.now();
    const titleMatch = await db.movies.where("title").equals(data.targetTitle).first();
    const titleQueryMs = elapsed(queryStart);

    queryStart = performance.now();
    const targetViews = await db.views
      .where("[movieId+watchedAt]")
      .between([data.targetMovieId, Dexie.minKey], [data.targetMovieId, Dexie.maxKey])
      .reverse()
      .toArray();
    const viewsQueryMs = elapsed(queryStart);

    const updateStart = performance.now();
    await db.views.update(data.targetViewId, { rating: 8 });
    const updatedRating = (await db.views.get(data.targetViewId))?.rating ?? null;
    const updateMs = elapsed(updateStart);

    const rollbackStart = performance.now();
    try {
      await db.transaction("rw", db.movies, async () => {
        await db.movies.add({ id: "rollback-sentinel", title: "Rollback sentinel", year: 2000 });
        throw new Error("Rollback sintético solicitado");
      });
    } catch {
      // El error es intencional: la transacción debe revertirse.
    }
    const rollbackRemaining = await db.movies.where("id").equals("rollback-sentinel").count();
    const rollbackMs = elapsed(rollbackStart);

    const reopenStart = performance.now();
    db.close();
    await db.open();
    const reopenedCount = await db.views.count();
    const reopenMs = elapsed(reopenStart);

    return {
      backend: "Dexie 4.4.7 / IndexedDB",
      round,
      openMs,
      dataBuildMs,
      insertMs,
      yearQueryMs,
      titleQueryMs,
      viewsQueryMs,
      updateMs,
      rollbackMs,
      reopenMs,
      totalMs: elapsed(totalStart),
      yearCount,
      titleMatches: titleMatch ? 1 : 0,
      viewsRead: targetViews.length,
      totalViews: await db.views.count(),
      updatedRating,
      rollbackRemaining,
      reopenedCount,
      expectedViews: data.expectedViews,
      expectedViewsForTarget: data.expectedViewsForTarget,
      expectedYearCount: data.expectedYearCount
    };
  } finally {
    db.close();
    try {
      await db.delete();
    } catch {
      // Si la base no llegó a abrirse, el navegador puede no tener nada que eliminar.
    }
  }
}

function createSqliteWorker() {
  return new Worker(new URL("./sqlite-worker.js", import.meta.url), { type: "module" });
}

async function runSQLite(movieCount, viewsPerMovie, round) {
  const worker = createSqliteWorker();
  try {
    return await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        worker.terminate();
        reject(new Error("SQLite Worker agotó el tiempo de espera (120 s)."));
      }, 120000);

      worker.onmessage = (event) => {
        const message = event.data;
        if (message.type === "result") {
          clearTimeout(timeout);
          resolve(message.result);
        } else if (message.type === "error") {
          clearTimeout(timeout);
          reject(new Error(message.message || "Error desconocido de SQLite."));
        }
      };
      worker.onerror = (event) => {
        clearTimeout(timeout);
        reject(new Error(event.message || "Error del Worker SQLite."));
      };
      worker.postMessage({ type: "run", movieCount, viewsPerMovie, round });
    });
  } finally {
    worker.terminate();
  }
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function summarize(runs) {
  const summary = {};
  for (const [field] of FIELDS) {
    const values = runs.map((run) => run[field]);
    summary[field] = values.every((value) => Number.isFinite(value))
      ? Number(median(values).toFixed(2))
      : null;
  }
  summary.totalMs = Number(median(runs.map((run) => run.totalMs)).toFixed(2));
  return summary;
}

function ms(value) {
  return `${Number(value).toFixed(2)} ms`;
}

function showResults(dexieRuns, sqliteRuns, config) {
  const dexie = summarize(dexieRuns);
  const sqlite = summarize(sqliteRuns);
  $("resultRows").innerHTML = "";

  for (const [field, label] of FIELDS) {
    const tr = document.createElement("tr");
    for (const value of [label, dexie[field] == null ? "—" : ms(dexie[field]), sqlite[field] == null ? "—" : ms(sqlite[field])]) {
      const td = document.createElement("td");
      td.textContent = value;
      tr.append(td);
    }
    $("resultRows").append(tr);
  }

  const valid = [...dexieRuns, ...sqliteRuns].every((item) =>
    item.totalViews === config.expectedViews &&
    item.reopenedCount === config.expectedViews &&
    item.viewsRead === config.viewsPerMovie &&
    item.titleMatches === 1 &&
    item.updatedRating === 8 &&
    item.rollbackRemaining === 0 &&
    item.yearCount === config.expectedYearCount &&
    item.expectedYearCount === config.expectedYearCount
  );

  const sqliteCleanupPassed = sqliteRuns.every((run) => run.vfsRemoved === true);
  const integrityPassed = valid && sqliteCleanupPassed;

  $("integrity").className = "status " + (integrityPassed ? "ok" : "bad");
  $("integrity").textContent = integrityPassed
    ? "Integridad y limpieza: ambos motores devolvieron los conteos esperados; SQLite confirmó removeVfs() = true."
    : "ATENCIÓN: hay diferencias de integridad o SQLite no confirmó la eliminación de su VFS temporal. No elijas una base todavía.";

  return { dexie, sqlite, integrityPassed, sqliteCleanupPassed };
}

function updateProgress(done, total, message) {
  $("progressBar").style.width = `${Math.round((done / total) * 100)}%`;
  $("status").className = "status";
  $("status").textContent = message;
}

async function runAll() {
  const [movieCount, viewsPerMovie] = $("dataset").value.split(":").map(Number);
  const totalRounds = 3;
  const dexieRuns = [];
  const sqliteRuns = [];
  lastReport = null;
  $("download").disabled = true;
  $("run").disabled = true;
  $("resultRows").innerHTML = "<tr><td colspan='3'>Ejecutando…</td></tr>";
  $("integrity").textContent = "";
  const storageBefore = await storageEstimate();

  try {
    for (let round = 1; round <= totalRounds; round += 1) {
      if (round % 2 === 1) {
        updateProgress((round - 1) * 2, totalRounds * 2, `Ronda ${round}/3 · Dexie…`);
        dexieRuns.push(await runDexie(movieCount, viewsPerMovie, round));
        updateProgress((round - 1) * 2 + 1, totalRounds * 2, `Ronda ${round}/3 · SQLite WASM / OPFS…`);
        sqliteRuns.push(await runSQLite(movieCount, viewsPerMovie, round));
      } else {
        updateProgress((round - 1) * 2, totalRounds * 2, `Ronda ${round}/3 · SQLite WASM / OPFS…`);
        sqliteRuns.push(await runSQLite(movieCount, viewsPerMovie, round));
        updateProgress((round - 1) * 2 + 1, totalRounds * 2, `Ronda ${round}/3 · Dexie…`);
        dexieRuns.push(await runDexie(movieCount, viewsPerMovie, round));
      }
    }

    const expectedViews = movieCount * viewsPerMovie;
    const expectedYearCount = movieCount <= 20 ? 0 : Math.floor((movieCount - 1 - 20) / 47) + 1;
    const config = { movieCount, viewsPerMovie, expectedViews, expectedYearCount };
    const summary = showResults(dexieRuns, sqliteRuns, config);
    await new Promise((resolve) => setTimeout(resolve, 300));
    const storageAfter = await storageEstimate();
    const storageDeltaBytes = Number.isFinite(storageBefore?.usage) && Number.isFinite(storageAfter?.usage)
      ? storageAfter.usage - storageBefore.usage
      : null;
    const opfsCleanup = await inspectBenchmarkOpfsDirectory();
    const indexedDbCleanup = await inspectDexieBenchmarkDatabases();
    summary.opfsCleanupPassed = opfsCleanup.exists === false;
    summary.dexieCleanupPassed = indexedDbCleanup.supported && indexedDbCleanup.names.length === 0;
    summary.integrityPassed = summary.integrityPassed && summary.opfsCleanupPassed;
    $("cleanupCheck").className = "status " + (
      opfsCleanup.exists === false ? "ok" : opfsCleanup.exists === true ? "warn" : "bad"
    );
    $("cleanupCheck").textContent = opfsCleanup.exists === false
      ? "OPFS temporal: directorio de pruebas eliminado."
      : opfsCleanup.exists === true
        ? "ATENCIÓN: aún existe el directorio OPFS de pruebas (" + (opfsCleanup.entries || []).join(", ") + "). Usa la limpieza y conserva este informe."
        : "No se pudo verificar el directorio OPFS: " + (opfsCleanup.error || "resultado desconocido") + ".";
    if (!summary.opfsCleanupPassed) {
      $("integrity").className = "status bad";
      $("integrity").textContent = "Los datos de prueba pasaron la integridad, pero no se pudo confirmar la limpieza del directorio OPFS.";
    }
    $("indexedDbCleanupCheck").className = "status " + (
      indexedDbCleanup.supported && indexedDbCleanup.names.length === 0 ? "ok" :
      indexedDbCleanup.supported && indexedDbCleanup.names.length > 0 ? "warn" : "pending"
    );
    $("indexedDbCleanupCheck").textContent = indexedDbCleanup.supported
      ? indexedDbCleanup.names.length === 0
        ? "IndexedDB temporal: no quedan bases con el prefijo del benchmark."
        : "ATENCIÓN: quedan bases IndexedDB: " + indexedDbCleanup.names.join(", ") + ". Usa la limpieza y comparte el informe."
      : "No se pudo enumerar IndexedDB: " + (indexedDbCleanup.error || "API no disponible") + ".";

    lastReport = {
      tool: "Prisma Storage Benchmark",
      version: 1,
      generatedAt: new Date().toISOString(),
      browser: navigator.userAgent,
      deviceProfile: {
        model: "Samsung Galaxy A03 SM-A035M",
        android: "13 / API 33",
        chipset: "Unisoc T606",
        physicalRamGB: 4,
        browser: "Brave 1.99.56 / Chromium 157.0.8103.50 (perfil informado por el propietario)"
      },
      secureContext: isSecureContext,
      deviceMemoryReported: navigator.deviceMemory || null,
      hardwareConcurrencyReported: navigator.hardwareConcurrency || null,
      storageBefore,
      storageAfter,
      storageDeltaBytes,
      opfsCleanup,
      indexedDbCleanup,
      cleanupVerification: {
        sqliteRemoveVfsAllTrue: summary.sqliteCleanupPassed,
        opfsBenchmarkDirectoryAbsent: opfsCleanup.exists === false,
        dexieDatabasesEnumerated: indexedDbCleanup.supported,
        dexieBenchmarkDatabasesAbsent: indexedDbCleanup.supported ? indexedDbCleanup.names.length === 0 : null
      },
      dataset: config,
      rounds: totalRounds,
      dexie: {
        version: "4.4.7", runs: dexieRuns,
        median: {...summary.dexie, totalMs: Number(median(dexieRuns.map((x) => x.totalMs)).toFixed(2))}
      },
      sqlite: {
        packageVersion: "3.54.1-build1",
        runtimeVersion: sqliteRuns[0]?.sqliteCoreVersion || null,
        runs: sqliteRuns,
        median: summary.sqlite
      },
      integrityPassed: summary.integrityPassed,
      notes: [
        "SQLite usa OPFS SAH pool dentro de un Worker; Dexie usa IndexedDB con chromeTransactionDurability strict.",
        "SQLite totalMs incluye inicialización de Worker, WASM y VFS; Dexie se importa antes de pulsar Ejecutar. Los tiempos totales no son directamente equivalentes. La tabla separa inicialización SQLite para evitar ocultar ese coste.",
        "El valor de StorageManager.estimate es informativo y no se considera cuota garantizada.",
        "SQLite SAH pool limita conexiones concurrentes; el benchmark no convierte ese VFS en una decisión de arquitectura aprobada.",
        "vfsRemoved registra el resultado oficial de PoolUtil.removeVfs(); opfsCleanup comprueba si el directorio OPFS exclusivo sigue existiendo; indexedDbCleanup enumera las bases Dexie que quedan con el prefijo propio del benchmark."
      ]
    };
    $("download").disabled = false;
    updateProgress(totalRounds * 2, totalRounds * 2, summary.integrityPassed
      ? "Comparación completada. Las bases sintéticas se han eliminado."
      : "Comparación terminada con diferencias de integridad; revisa el informe.");
  } catch (error) {
    $("status").className = "status bad";
    $("status").textContent = `La comparación no pudo completarse: ${error.message}`;
    $("integrity").className = "status bad";
    $("integrity").textContent = "No se debe elegir un almacenamiento con una prueba incompleta.";
  } finally {
    $("run").disabled = false;
  }
}

async function cleanupOwnTestData() {
  const notes = [];
  if (navigator.storage?.getDirectory) {
    try {
      const root = await navigator.storage.getDirectory();
      await root.removeEntry("prisma-storage-benchmark-v1", { recursive: true }).catch((error) => {
        if (error?.name !== "NotFoundError") throw error;
      });
      notes.push("Carpeta OPFS temporal revisada");
    } catch (error) {
      notes.push("OPFS: " + (error?.message || String(error)));
    }
  } else {
    notes.push("OPFS no está expuesto; no se pudo revisar la carpeta");
  }

  if (typeof indexedDB.databases === "function") {
    try {
      const databases = await indexedDB.databases();
      const names = databases
        .map((item) => item.name)
        .filter((name) => typeof name === "string" && name.startsWith("prisma-dexie-benchmark-"));
      for (const name of names) {
        await new Promise((resolve, reject) => {
          const request = indexedDB.deleteDatabase(name);
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error || new Error("No se pudo borrar " + name));
          request.onblocked = () => reject(new Error("Cierre otras pestañas que usen " + name));
        });
      }
      const remaining = await indexedDB.databases();
      const leftovers = remaining.map((item) => item.name)
        .filter((name) => typeof name === "string" && name.startsWith("prisma-dexie-benchmark-"));
      notes.push(leftovers.length === 0
        ? "Bases IndexedDB propias eliminadas y ausencia verificada"
        : "Persisten bases IndexedDB propias: " + leftovers.join(", "));
    } catch (error) {
      notes.push("IndexedDB: " + (error?.message || String(error)));
    }
  } else {
    notes.push("indexedDB.databases() no está disponible; las bases de prueba completadas se eliminan al terminar cada ronda");
  }

  $("cleanupStatus").textContent = notes.join(". ") + ".";
}

function downloadReport() {
  if (!lastReport) return;
  const blob = new Blob([JSON.stringify(lastReport, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "prisma-storage-benchmark-report.json";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

$("run").addEventListener("click", runAll);
$("download").addEventListener("click", downloadReport);
$("cleanup").addEventListener("click", async () => {
  if ($("run").disabled) return;
  if (!confirm("¿Eliminar solo las bases y la carpeta OPFS propias de este benchmark?")) return;
  $("cleanupStatus").textContent = "Limpiando…";
  await cleanupOwnTestData();
});
