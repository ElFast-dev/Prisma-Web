import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("portada: muestra el catálogo completo y cabe en una pantalla móvil", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Descubrir" })).toBeVisible();
  await expect(page.getByText("240 resultados")).toBeVisible();
  await expect(page.locator(".poster")).toHaveCount(240);

  const overflowsHorizontally = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
  );
  expect(overflowsHorizontally).toBe(false);
});

test("diseño adaptable: móvil estrecho y pantalla grande sin desbordamiento", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Descubrir" })).toBeVisible();

  const mobileOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
  );
  expect(mobileOverflow).toBe(false);

  await page.setViewportSize({ width: 1280, height: 900 });
  const desktopLayout = await page.locator(".feed").evaluate(element => ({
    columns: getComputedStyle(element).gridTemplateColumns.split(/\s+/).length,
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
  }));
  expect(desktopLayout.columns).toBeGreaterThanOrEqual(4);
  expect(desktopLayout.overflow).toBe(false);
});

test("navegación: Personal, Descubrir y una ruta profunda", async ({ page }) => {
  await page.goto("/personal");
  await expect(page.getByRole("heading", { name: "Personal" })).toBeVisible();

  await page.getByRole("link", { name: /Descubrir/ }).click();
  await expect(page.getByRole("heading", { name: "Descubrir" })).toBeVisible();

  await page.goto("/pelicula/25");
  await expect(page.locator(".hero")).toBeVisible();
  await expect(page.getByText("FICHA DE PRUEBA")).toBeVisible();
  await expect(page.getByRole("button", { name: "Calificar" })).toBeVisible();
});

test("teclado: permite abrir y cerrar los filtros sin usar el ratón", async ({ page }) => {
  await page.goto("/");
  const search = page.getByRole("searchbox", {
    name: "Buscar películas por título, género o año"
  });

  await search.focus();
  await page.keyboard.press("Tab");
  const filtersButton = page.getByRole("button", { name: "Filtros" });
  await expect(filtersButton).toBeFocused();
  await page.keyboard.press("Enter");

  const dialog = page.getByRole("dialog", { name: "Filtros y orden" });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("búsqueda: encuentra títulos, géneros y años", async ({ page }) => {
  await page.goto("/");
  const search = page.getByRole("searchbox", {
    name: "Buscar películas por título, género o año"
  });

  await search.fill("Horizonte de cristal");
  expect(await page.locator(".poster").count()).toBeGreaterThan(0);
  expect(await page.locator(".poster").count()).toBeLessThan(240);

  await search.fill("Ciencia ficción");
  await expect(page.locator(".poster")).toHaveCount(40);

  await search.fill("1963");
  expect(await page.locator(".poster").count()).toBeGreaterThan(0);
  expect(await page.locator(".poster").count()).toBeLessThan(240);
});

test("búsqueda sin coincidencias: muestra cero resultados sin tarjetas obsoletas", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("searchbox", {
    name: "Buscar películas por título, género o año"
  }).fill("zzzz_sin_coincidencias_prisma_987654");

  await expect(page.getByText("0 resultados")).toBeVisible();
  await expect(page.locator(".poster")).toHaveCount(0);
});

test("filtros y orden: aplica Pendiente y ordena por año", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Filtros" }).click();

  const dialog = page.getByRole("dialog", { name: "Filtros y orden" });
  await expect(dialog).toBeVisible();
  await dialog.getByLabel("Estado").selectOption("Pendiente");
  await dialog.getByLabel("Orden").selectOption("year");
  await dialog.getByRole("button", { name: "Aplicar" }).click();

  await expect(page.locator(".results")).toContainText("60 resultados");
  await expect(page.locator(".results")).toContainText("Orden: Año");

  const years = await page.locator(".poster .sr-only").evaluateAll(elements =>
    elements.map(element => {
      const match = element.textContent?.match(/,\s*(\d{4}),/);
      return match ? Number(match[1]) : Number.NaN;
    })
  );
  expect(years.length).toBe(60);
  expect(years.every(Number.isFinite)).toBe(true);
  expect(years).toEqual([...years].sort((a, b) => b - a));
});

test("calificación: guarda una nota válida en la ficha", async ({ page }) => {
  await page.goto("/pelicula/25");
  await page.getByRole("button", { name: "Calificar" }).click();

  const dialog = page.getByRole("dialog", { name: "Calificar esta película" });
  await expect(dialog).toBeVisible();
  await dialog.getByLabel("Nota").selectOption("8");
  await dialog.getByRole("button", { name: "Guardar nota" }).click();

  await expect(page.getByRole("button", { name: "8/10" })).toBeVisible();
});

test("ruta inexistente: informa claramente que la película no existe", async ({ page }) => {
  await page.goto("/pelicula/999999");
  await expect(page.getByRole("heading", { name: "Película no encontrada" })).toBeVisible();
});

test("tema: conserva Cuarzo después de recargar", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Ajustes" }).click();

  const dialog = page.getByRole("dialog", { name: "Ajustes de la prueba" });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Cuarzo" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "cuarzo");
  await dialog.getByRole("button", { name: "Cerrar" }).click();

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "cuarzo");
});

test("PWA: declara manifiesto y registra un Service Worker activo", async ({ page }) => {
  const manifestResponse = await page.request.get("/manifest.webmanifest");
  expect(manifestResponse.ok()).toBe(true);

  const manifest = await manifestResponse.json();
  expect(manifest.start_url).toBe("/");
  expect(manifest.display).toBe("standalone");

  await page.goto("/");
  await page.waitForFunction(async () => {
    const registration = await navigator.serviceWorker.getRegistration();
    return Boolean(registration?.active && registration.active.state === "activated");
  }, { timeout: 15_000 });
});

test("offline: vuelve a abrir sin red una ficha visitada con conexión", async ({ page, context }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.waitForFunction(async () => {
    const registration = await navigator.serviceWorker.getRegistration();
    return Boolean(registration?.active && registration.active.state === "activated");
  }, { timeout: 15_000 });

  await page.reload({ waitUntil: "networkidle" });
  await page.waitForFunction(() => Boolean(navigator.serviceWorker.controller), {
    timeout: 15_000
  });

  // Visita la ficha mientras hay red para que su módulo de ruta también entre en caché.
  await page.goto("/pelicula/25", { waitUntil: "networkidle" });
  await expect(page.locator(".hero")).toBeVisible();
  await page.goto("/", { waitUntil: "networkidle" });

  await context.setOffline(true);
  try {
    await page.goto("/pelicula/25", {
      waitUntil: "domcontentloaded",
      timeout: 15_000
    });
    await expect(page.locator(".hero")).toBeVisible();
    await expect(page.getByText("FICHA DE PRUEBA")).toBeVisible();
  } finally {
    await context.setOffline(false);
  }
});

test("estabilidad: las rutas principales no generan excepciones JavaScript", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));

  for (const route of ["/", "/personal", "/pelicula/25"]) {
    await page.goto(route);
  }

  expect(errors).toEqual([]);
});

test("accesibilidad: no hay infracciones críticas o graves en las pantallas principales", async ({ page }, testInfo) => {
  const routes = ["/", "/personal", "/pelicula/25"];
  const report: Array<{ route: string; violations: unknown[] }> = [];

  for (const route of routes) {
    await page.goto(route);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    const severe = result.violations.filter(
      violation => violation.impact === "critical" || violation.impact === "serious"
    );
    report.push({
      route,
      violations: result.violations.map(violation => ({
        id: violation.id,
        impact: violation.impact,
        description: violation.description,
        help: violation.help,
        nodes: violation.nodes.map(node => ({
          target: node.target,
          summary: node.failureSummary
        }))
      }))
    });

    expect(severe, `Infracciones graves de accesibilidad en ${route}`).toEqual([]);
  }

  await testInfo.attach("axe-accessibility-report.json", {
    body: JSON.stringify(report, null, 2),
    contentType: "application/json"
  });
});
