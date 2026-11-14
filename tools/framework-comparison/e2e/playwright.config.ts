import { defineConfig } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const configDirectory = path.dirname(fileURLToPath(import.meta.url));
const frameworkDirectory = path.resolve(configDirectory, "..");
const ci = Boolean(process.env.CI);

const frameworks = ["sveltekit", "react-router"] as const;
type Framework = (typeof frameworks)[number];

const requestedFramework = process.env.PRISMA_FRAMEWORK;
if (
  requestedFramework &&
  !frameworks.includes(requestedFramework as Framework)
) {
  throw new Error(
    `PRISMA_FRAMEWORK debe ser uno de: ${frameworks.join(", ")}`
  );
}

const servers: Record<Framework, {
  command: string;
  cwd: string;
  url: string;
  reuseExistingServer: boolean;
  timeout: number;
}> = {
  sveltekit: {
    command: "node serve.mjs sveltekit",
    cwd: frameworkDirectory,
    url: "http://127.0.0.1:18820/",
    reuseExistingServer: !ci,
    timeout: 30_000
  },
  "react-router": {
    command: "node serve.mjs react",
    cwd: frameworkDirectory,
    url: "http://127.0.0.1:18821/",
    reuseExistingServer: !ci,
    timeout: 30_000
  }
};

const activeFrameworks: Framework[] = requestedFramework
  ? [requestedFramework as Framework]
  : [...frameworks];

const browsers = ["chromium", "firefox", "webkit"] as const;
type Browser = (typeof browsers)[number];
const requestedBrowser = process.env.PLAYWRIGHT_BROWSER ?? "chromium";

if (!browsers.includes(requestedBrowser as Browser)) {
  throw new Error(
    `PLAYWRIGHT_BROWSER debe ser uno de: ${browsers.join(", ")}`
  );
}

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
    browserName: requestedBrowser as Browser,
    viewport: { width: 360, height: 800 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  projects: frameworks.map(name => ({ name })),
  webServer: activeFrameworks.map(framework => servers[framework])
});
