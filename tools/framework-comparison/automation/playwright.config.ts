import { defineConfig } from "@playwright/test";
import process from "node:process";

const mobileViewport = {
  viewport: { width: 360, height: 800 },
  screen: { width: 360, height: 800 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true
};

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  fullyParallel: false,
  workers: 1,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  timeout: 30_000,
  globalTimeout: 8 * 60 * 1000,
  expect: {
    timeout: 7_000
  },
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }]
  ],
  outputDir: "test-results",
  use: {
    actionTimeout: 10_000,
    navigationTimeout: 20_000,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  projects: [
    {
      name: "SvelteKit · móvil",
      use: {
        ...mobileViewport,
        browserName: "chromium",
        baseURL: "http://127.0.0.1:18820"
      }
    },
    {
      name: "React Router · móvil",
      use: {
        ...mobileViewport,
        browserName: "chromium",
        baseURL: "http://127.0.0.1:18821"
      }
    }
  ],
  webServer: [
    {
      command: "node ../serve.mjs sveltekit",
      url: "http://127.0.0.1:18820/",
      reuseExistingServer: !process.env.CI,
      timeout: 45_000
    },
    {
      command: "node ../serve.mjs react",
      url: "http://127.0.0.1:18821/",
      reuseExistingServer: !process.env.CI,
      timeout: 45_000
    }
  ]
});
