import sqlite3InitModule from "../node_modules/@sqlite.org/sqlite-wasm/dist/index.mjs";

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

async function executeBenchmark(movieCount, viewsPerMovie, round) {
  const totalStart = performance.now();
  let pool = null;
  let db = null;
  let result = null;

  try {
    // Include worker-side WASM module initialization in totalMs.
    let start = performance.now();
    const sqlite3 = await sqlite3InitModule();
    const moduleInitMs = elapsed(start);

    // Each round has its own dedicated directory. clearOnInit is safe here
    // because this VFS directory contains benchmark data only.
    start = performance.now();
    pool = await sqlite3.installOpfsSAHPoolVfs({
      directory: "/prisma-storage-benchmark-v1",
      initialCapacity: 6,
      clearOnInit: true,
      preserveOnInitFailure: true
    });
    const vfsInitMs = elapsed(start);

    start = performance.now();
    db = new pool.OpfsSAHPoolDb("/prisma-storage-benchmark.sqlite3");
    db.exec(
      "PRAGMA foreign_keys = ON;" +
      "PRAGMA synchronous = FULL;" +
      "PRAGMA journal_mode = DELETE;"
    );
    db.exec(
      "CREATE TABLE movies (" +
        "id TEXT PRIMARY KEY," +
        "title TEXT NOT NULL," +
        "year INTEGER NOT NULL" +
      ");" +
      "CREATE INDEX idx_movies_title ON movies(title);" +
      "CREATE INDEX idx_movies_year ON movies(year);" +
      "CREATE TABLE views (" +
        "id TEXT PRIMARY KEY," +
        "movie_id TEXT NOT NULL REFERENCES movies(id)," +
        "watched_at INTEGER NOT NULL," +
        "rating INTEGER" +
      ");" +
      "CREATE INDEX idx_views_movie_watched ON views(movie_id, watched_at DESC);"
    );
    const openMs = elapsed(start);

    start = performance.now();
    const data = buildDataset(movieCount, viewsPerMovie);
    const dataBuildMs = elapsed(start);

    start = performance.now();
    const insertMovie = db.prepare(
      "INSERT INTO movies (id, title, year) VALUES (?, ?, ?)"
    );
    const insertView = db.prepare(
      "INSERT INTO views (id, movie_id, watched_at, rating) VALUES (?, ?, ?, ?)"
    );

    try {
      db.transaction("IMMEDIATE", () => {
        for (const movie of data.movies) {
          insertMovie.bind([movie.id, movie.title, movie.year]).stepReset();
        }
        for (const view of data.views) {
          insertView.bind([
            view.id,
            view.movieId,
            view.watchedAt,
            view.rating
          ]).stepReset();
        }
      });
    } finally {
      insertMovie.finalize();
      insertView.finalize();
    }
    const insertMs = elapsed(start);

    start = performance.now();
    const yearCount = Number(
      db.selectValue("SELECT COUNT(*) FROM movies WHERE year = ?", 2000)
    );
    const yearQueryMs = elapsed(start);

    start = performance.now();
    const titleMatch = db.selectObject(
      "SELECT id, title, year FROM movies WHERE title = ?",
      data.targetTitle
    );
    const titleQueryMs = elapsed(start);

    start = performance.now();
    const targetViews = db.selectObjects(
      "SELECT id, watched_at, rating FROM views " +
      "WHERE movie_id = ? ORDER BY watched_at DESC",
      data.targetMovieId
    );
    const viewsQueryMs = elapsed(start);

    start = performance.now();
    db.exec({
      sql: "UPDATE views SET rating = ? WHERE id = ?",
      bind: [8, data.targetViewId]
    });
    const updatedRating = Number(
      db.selectValue("SELECT rating FROM views WHERE id = ?", data.targetViewId)
    );
    const updateMs = elapsed(start);

    start = performance.now();
    try {
      db.transaction("IMMEDIATE", () => {
        db.exec({
          sql: "INSERT INTO movies (id, title, year) VALUES (?, ?, ?)",
          bind: ["rollback-sentinel", "Rollback sentinel", 2000]
        });
        throw new Error("Rollback sintético solicitado");
      });
    } catch {
      // Deliberate error: oo1.transaction must roll back all changes.
    }
    const rollbackRemaining = Number(
      db.selectValue(
        "SELECT COUNT(*) FROM movies WHERE id = ?",
        "rollback-sentinel"
      )
    );
    const rollbackMs = elapsed(start);

    start = performance.now();
    db.close();
    db = null;
    db = new pool.OpfsSAHPoolDb("/prisma-storage-benchmark.sqlite3");
    const reopenedCount = Number(db.selectValue("SELECT COUNT(*) FROM views"));
    const reopenMs = elapsed(start);

    result = {
      backend: "SQLite WASM / OPFS SAH pool",
      packageVersion: "3.54.1-build1",
      sqliteCoreVersion: sqlite3.version.libVersion,
      vfs: pool.vfsName,
      round,
      moduleInitMs,
      vfsInitMs,
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
      totalViews: Number(db.selectValue("SELECT COUNT(*) FROM views")),
      updatedRating,
      rollbackRemaining,
      reopenedCount,
      expectedViews: data.expectedViews,
      expectedViewsForTarget: data.expectedViewsForTarget,
      expectedYearCount: data.expectedYearCount
    };
  } finally {
    try {
      db?.close();
    } finally {
      if (pool) {
        // removeVfs() removes the dedicated test directory, so call it only
        // after this round's database is closed and never on product storage.
        await pool.removeVfs();
      }
    }
  }

  return result;
}

self.addEventListener("message", async (event) => {
  if (event.data?.type !== "run") return;
  try {
    const { movieCount, viewsPerMovie, round } = event.data;
    const result = await executeBenchmark(movieCount, viewsPerMovie, round);
    self.postMessage({ type: "result", result });
  } catch (error) {
    self.postMessage({
      type: "error",
      message: error?.message || String(error)
    });
  }
});
