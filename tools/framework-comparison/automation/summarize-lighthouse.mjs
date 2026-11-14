import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("lighthouse-results");
const candidates = [
  { name: "SvelteKit", directory: "sveltekit" },
  { name: "React Router", directory: "react-router" }
];

const rows = [];

function score(value) {
  return typeof value === "number" ? Math.round(value * 100) : null;
}

function metric(report, id) {
  const value = report.audits?.[id]?.numericValue;
  return typeof value === "number" ? value : null;
}

function round(value, decimals = 0) {
  if (value === null) return null;
  const multiplier = 10 ** decimals;
  return Math.round(value * multiplier) / multiplier;
}

for (const candidate of candidates) {
  const directory = path.join(root, candidate.directory);
  const manifestPath = path.join(directory, "manifest.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const representative = manifest.filter((item) => item.isRepresentativeRun);

  if (representative.length !== 3) {
    throw new Error(
      `${candidate.name}: se esperaban 3 páginas representativas y se encontraron ${representative.length}`
    );
  }

  for (const entry of representative) {
    const reportPath = path.isAbsolute(entry.jsonPath)
      ? entry.jsonPath
      : path.resolve(process.cwd(), entry.jsonPath);
    const report = JSON.parse(await readFile(reportPath, "utf8"));
    const url = new URL(entry.url);

    rows.push({
      framework: candidate.name,
      page: url.pathname === "/" ? "Descubrir" :
        url.pathname === "/personal" ? "Personal" : "Ficha",
      url: entry.url,
      performance: score(report.categories?.performance?.score),
      accessibility: score(report.categories?.accessibility?.score),
      bestPractices: score(report.categories?.["best-practices"]?.score),
      seo: score(report.categories?.seo?.score),
      fcpMs: round(metric(report, "first-contentful-paint")),
      lcpMs: round(metric(report, "largest-contentful-paint")),
      tbtMs: round(metric(report, "total-blocking-time")),
      cls: round(metric(report, "cumulative-layout-shift"), 3),
      speedIndexMs: round(metric(report, "speed-index"))
    });
  }
}

const columns = [
  ["framework", "Framework"],
  ["page", "Pantalla"],
  ["performance", "Rendimiento %"],
  ["accessibility", "Accesibilidad %"],
  ["bestPractices", "Buenas prácticas %"],
  ["seo", "SEO %"],
  ["fcpMs", "FCP ms"],
  ["lcpMs", "LCP ms"],
  ["tbtMs", "TBT ms"],
  ["cls", "CLS"],
  ["speedIndexMs", "Speed Index ms"]
];

const table = [
  "| " + columns.map(([, label]) => label).join(" | ") + " |",
  "| " + columns.map(() => "---").join(" | ") + " |",
  ...rows.map((row) =>
    "| " + columns.map(([key]) => row[key] ?? "—").join(" | ") + " |"
  )
].join("\n");

const report = [
  "# Resumen Lighthouse · comparación de frameworks",
  "",
  "Resultados de la ejecución representativa seleccionada por Lighthouse CI entre tres mediciones por pantalla.",
  "",
  table,
  "",
  "Perfil móvil emulado en Chromium y red/CPU simuladas por Lighthouse. No equivale a mediciones del Galaxy A03 real ni de Brave Android.",
  "",
  "Las puntuaciones son informativas y no determinan por sí solas un ganador."
].join("\n");

await writeFile(path.join(root, "lighthouse-summary.md"), report + "\n");
await writeFile(
  path.join(root, "lighthouse-summary.json"),
  JSON.stringify(rows, null, 2) + "\n"
);

console.log(report);
console.log("\nResumen JSON guardado en lighthouse-results/lighthouse-summary.json");
