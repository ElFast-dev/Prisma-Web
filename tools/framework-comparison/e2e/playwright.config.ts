import { defineConfig } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const configDirectory = path.dirname(fileURLToPath(import.meta.url));
const frameworkDirectory = path.resolve(configDirectory, "..");
const ci = Boolean(process.env.CI);

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: false,
  forbidOnly: ci,
  retries: ci ? 1 : 0,
  workers: 2,
  reporter: [
    ["list"],
    ["junit", { outputFile: "test-results/junit.xml" }],
    ["html", { outputFolder: "playwright-report", open: "never" }]
  ],
  outputDir: "test-results/results",
  use: {
    browserName: "chromium",
    viewport: { width: 360, height: 800 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  projects: [
    {
      name: "sveltekit",
      use: { baseURL: "http://127.0.0.1:18820" }
    },
    {
      name: "react-router",
      use: { baseURL: "http://127.0.0.1:18821" }
    }
  ],
  webServer: [
    {
      command: "node serve.mjs sveltekit",
      cwd: frameworkDirectory,
      url: "http://127.0.0.1:18820/",
      reuseExistingServer: !ci,
      timeout: 30_000
    },
    {
      command: "node serve.mjs react",
      cwd: frameworkDirectory,
      url: "http://127.0.0.1:18821/",
      reuseExistingServer: !ci,
      timeout: 30_000
    }
  ]
});
