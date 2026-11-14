import AxeBuilder from "@axe-core/playwright";
import { expect, test as base, type Page } from "@playwright/test";

const test = base.extend<{ pageErrors: string[] }>({
  pageErrors: async ({ page }: { page: Page }, use) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await use(errors);
    expect(errors, "La página no debe emitir errores JavaScript").toEqual([]);
  }
});

test("Descubrir busca por género y año con resultados exactos", async ({ page, pageErrors }) => {
  void pageErrors;
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Descubrir" })).toBeVisible();
  await expect(page.locator(".poster")).toHaveCount(240);

  const search = page.getByRole("searchbox");
  await search.fill("Ciencia ficción");
  await expect(page.locator(".poster")).toHaveCount(40);

  await search.fill("1963");
  await expect(page.locator(".poster")).toHaveCount(22);
});

test("Personal navega al Historial con el recuento correcto", async ({ page, pageErrors }) => {
  void pageErrors;
  await page.goto("/personal");
  await expect(page.getByRole("heading", { name: "Personal" })).toBeVisible();
  await expect(page.locator(".tile")).toHaveCount(4);

  await page.getByRole("link", { name: /Historial/ }).click();
  await expect(page).toHaveURL(/estado=historial/);
  await expect(page.getByRole("heading", { name: "Descubrir" })).toBeVisible();
  await expect(page.locator(".poster")).toHaveCount(180);
});

test("Filtros y ordenación aplican el estado seleccionado", async ({ page, pageErrors }) => {
  void pageErrors;
  await page.goto("/");
  await page.getByRole("button", { name: "Filtros" }).click();

  const dialog = page.getByRole("dialog", { name: "Filtros y orden" });
  await expect(dialog).toBeVisible();
  await dialog.getByLabel("Estado").selectOption("Pendiente");
  await dialog.getByLabel("Orden").selectOption("year");

  await expect(page.locator(".poster")).toHaveCount(60);
  await expect(page.locator(".results")).toContainText("Orden: Año");
  await dialog.getByRole("button", { name: "Aplicar" }).click();
  await expect(dialog).not.toBeVisible();
});

test("La ficha abre el diálogo y muestra la calificación guardada", async ({ page, pageErrors }) => {
  void pageErrors;
  await page.goto("/pelicula/25");
  await expect(page.getByRole("heading", { name: "Horizonte de cristal 3" })).toBeVisible();

  await page.getByRole("button", { name: "Calificar" }).click();
  const dialog = page.getByRole("dialog", { name: "Calificar esta película" });
  await dialog.getByLabel("Nota").selectOption("8");
  await dialog.getByRole("button", { name: "Guardar nota" }).click();

  await expect(page.getByRole("button", { name: "8/10" })).toBeVisible();
});

test("El tema Cuarzo se conserva después de recargar", async ({ page, pageErrors }) => {
  void pageErrors;
  await page.goto("/personal");
  await page.getByRole("button", { name: "Ajustes" }).click();

  const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "Cuarzo" }).click();
  await expect.poll(() => page.locator("html").getAttribute("data-theme")).toBe("cuarzo");

  await page.reload();
  await expect.poll(() => page.locator("html").getAttribute("data-theme")).toBe("cuarzo");
});

test("Service Worker permite abrir sin conexión una ficha visitada previamente", async ({ page, pageErrors, context }) => {
  void pageErrors;
  await page.goto("/");
  await page.evaluate(async () => {
    if (!("serviceWorker" in navigator)) {
      throw new Error("Service Worker no disponible");
    }
    await navigator.serviceWorker.ready;
  });

  await page.reload();
  await page.waitForFunction(
    () => Boolean(navigator.serviceWorker?.controller),
    undefined,
    { timeout: 15_000 }
  );

  // Visita la ruta mientras hay conexión para que su módulo y recursos se guarden
  // en la caché de ejecución antes de comprobar el modo sin conexión.
  await page.goto("/pelicula/25");
  await expect(page.getByRole("heading", { name: "Horizonte de cristal 3" })).toBeVisible();
  await page.goto("/");

  await context.setOffline(true);
  try {
    await page.goto("/pelicula/25", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: "Horizonte de cristal 3" })).toBeVisible({
      timeout: 10_000
    });
  } finally {
    await context.setOffline(false);
  }
});

test("axe no detecta infracciones críticas o graves en las pantallas principales", async ({ page, pageErrors }, testInfo) => {
  void pageErrors;
  const routes = ["/", "/personal", "/pelicula/25"];
  const findings: Array<{
    route: string;
    id: string;
    impact: string | null;
    help: string;
    nodes: number;
    examples: Array<{ target: string[]; failureSummary: string | null }>;
  }> = [];

  for (const route of routes) {
    await page.goto(route);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    findings.push(
      ...result.violations.map((violation) => ({
        route,
        id: violation.id,
        impact: violation.impact ?? null,
        help: violation.help,
        nodes: violation.nodes.length,
        examples: violation.nodes.slice(0, 5).map((node) => ({
          target: node.target,
          failureSummary: node.failureSummary ?? null
        }))
      }))
    );
  }

  await testInfo.attach("axe-accessibility-findings.json", {
    body: JSON.stringify(findings, null, 2),
    contentType: "application/json"
  });

  const blockers = findings.filter((finding) =>
    finding.impact === "critical" || finding.impact === "serious"
  );
  const warnings = findings.filter((finding) =>
    finding.impact !== "critical" && finding.impact !== "serious"
  );

  if (warnings.length > 0) {
    console.warn("Avisos de accesibilidad no bloqueantes:", JSON.stringify(warnings));
  }

  expect(blockers, "Infracciones críticas o graves de accesibilidad").toEqual([]);
});
