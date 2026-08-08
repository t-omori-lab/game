#!/usr/bin/env node

/**
 * Current-R06 production-preview browser and performance gate.
 *
 * This intentionally stays separate from smoke.py, which covers the legacy
 * Phaser/mobile startup flow. It uses only the externally observable R06 DOM
 * contract and does not require runtime instrumentation.
 */

import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { platform, arch, release } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(SCRIPT_DIRECTORY, "../..");
const DEFAULT_URL = "http://127.0.0.1:4173/game/r06/";
const DEFAULT_OUTPUT_DIRECTORY = join(
  PROJECT_ROOT,
  "work/goal0_r06_baseline/evidence/latest",
);
const DEFAULT_SAMPLE_MS = 10_000;
const DEFAULT_TIMEOUT_MS = 60_000;
const VIEWPORT = Object.freeze({ width: 1_280, height: 720 });
const require = createRequire(import.meta.url);

async function main() {
  const options = parseArguments(process.argv.slice(2));
  const outputDirectory = resolve(PROJECT_ROOT, options.outputDirectory);
  const resultPath = join(outputDirectory, "baseline.json");
  const screenshotPath = join(outputDirectory, "verified-r06.png");
  await mkdir(outputDirectory, { recursive: true });

  const startedAt = new Date().toISOString();
  const buildSha = readBuildSha();
  const { playwright, version: playwrightVersion } = loadPlaywright(
    options.playwrightModule,
  );
  const browserExecutable = resolveBrowserExecutable(
    playwright.chromium,
    options.browserExecutable,
  );
  let previewServer;
  let browser;

  const report = {
    schemaVersion: 1,
    gate: "goal0-current-r06-browser-baseline",
    status: "failed",
    measuredAt: startedAt,
    buildSha,
    url: options.url,
    viewport: {
      ...VIEWPORT,
      deviceScaleFactor: 1,
    },
    environment: {
      platform: platform(),
      release: release(),
      architecture: arch(),
      node: process.version,
      playwright: playwrightVersion,
      browserExecutable,
      browserVersion: null,
      headless: !options.headed,
      graphicsMode: "system-auto",
    },
    server: {
      kind: "vite-production-preview",
      startedByGate: !options.reuseServer,
      command: "vite preview --configLoader runner --host 127.0.0.1 --port 4173 --strictPort",
    },
    frameSample: {
      durationMs: options.sampleMs,
      longFrameThresholdMs: 50,
    },
    runs: [],
    artifacts: {
      json: relative(PROJECT_ROOT, resultPath),
      screenshot: relative(PROJECT_ROOT, screenshotPath),
    },
  };

  try {
    assertProductionArtifact();
    if (!options.reuseServer) {
      previewServer = startPreviewServer();
    }
    await waitForPreview(options.url, previewServer, options.timeoutMs);

    browser = await playwright.chromium.launch({
      headless: !options.headed,
      executablePath: browserExecutable,
    });
    report.environment.browserVersion = await browser.version();

    const context = await browser.newContext({
      viewport: VIEWPORT,
      screen: VIEWPORT,
      deviceScaleFactor: 1,
      locale: "ja-JP",
      colorScheme: "dark",
      serviceWorkers: "allow",
    });
    const page = await context.newPage();
    const browserErrors = createBrowserErrorRecorder(page);

    report.runs.push(
      await measureRun(page, browserErrors, {
        cacheState: "cold",
        url: options.url,
        timeoutMs: options.timeoutMs,
        sampleMs: options.sampleMs,
      }),
    );

    await waitForRouteServiceWorker(page);

    report.runs.push(
      await measureRun(page, browserErrors, {
        cacheState: "warm",
        url: options.url,
        timeoutMs: options.timeoutMs,
        sampleMs: options.sampleMs,
      }),
    );

    await page.screenshot({ path: screenshotPath, type: "png" });
    await context.close();

    report.status = "passed";
    await writeJson(resultPath, report);
    printSummary(report, resultPath, screenshotPath);
  } catch (error) {
    report.error = formatError(error);
    await writeJson(resultPath, report);
    throw error;
  } finally {
    await browser?.close();
    await stopPreviewServer(previewServer);
  }
}

function parseArguments(argumentsList) {
  const options = {
    url: DEFAULT_URL,
    outputDirectory: DEFAULT_OUTPUT_DIRECTORY,
    sampleMs: DEFAULT_SAMPLE_MS,
    timeoutMs: DEFAULT_TIMEOUT_MS,
    playwrightModule: process.env.R06_PLAYWRIGHT_MODULE_PATH,
    browserExecutable: process.env.R06_BROWSER_EXECUTABLE,
    reuseServer: false,
    headed: false,
  };

  for (let index = 0; index < argumentsList.length; index += 1) {
    const argument = argumentsList[index];
    switch (argument) {
      case "--url":
        options.url = requireArgumentValue(argumentsList, ++index, argument);
        break;
      case "--output":
        options.outputDirectory = requireArgumentValue(
          argumentsList,
          ++index,
          argument,
        );
        break;
      case "--sample-ms":
        options.sampleMs = parsePositiveInteger(
          requireArgumentValue(argumentsList, ++index, argument),
          argument,
        );
        break;
      case "--timeout-ms":
        options.timeoutMs = parsePositiveInteger(
          requireArgumentValue(argumentsList, ++index, argument),
          argument,
        );
        break;
      case "--playwright-module":
        options.playwrightModule = requireArgumentValue(
          argumentsList,
          ++index,
          argument,
        );
        break;
      case "--browser-executable":
        options.browserExecutable = requireArgumentValue(
          argumentsList,
          ++index,
          argument,
        );
        break;
      case "--reuse-server":
        options.reuseServer = true;
        break;
      case "--headed":
        options.headed = true;
        break;
      default:
        throw new Error(`Unknown argument: ${argument}`);
    }
  }

  const parsedUrl = new URL(options.url);
  if (!new Set(["http:", "https:"]).has(parsedUrl.protocol)) {
    throw new Error("--url must use http or https.");
  }
  if (!parsedUrl.pathname.endsWith("/game/r06/")) {
    throw new Error(
      `Current production R06 URL must end with /game/r06/: ${options.url}`,
    );
  }

  return options;
}

function requireArgumentValue(argumentsList, index, flag) {
  const value = argumentsList[index];
  if (value === undefined || value.startsWith("--")) {
    throw new Error(`${flag} requires a value.`);
  }
  return value;
}

function parsePositiveInteger(value, flag) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`${flag} must be a positive integer.`);
  }
  return parsed;
}

function loadPlaywright(explicitModule) {
  const moduleSpecifier = explicitModule ?? "playwright";
  let playwright;
  try {
    playwright = require(moduleSpecifier);
  } catch (error) {
    throw new Error(
      "Playwright is unavailable. Provide an existing installation with " +
        "--playwright-module or R06_PLAYWRIGHT_MODULE_PATH; do not install it as part of this gate.",
      { cause: error },
    );
  }

  let version = "unknown";
  try {
    const packageSpecifier = explicitModule === undefined
      ? "playwright/package.json"
      : join(explicitModule, "package.json");
    version = require(packageSpecifier).version;
  } catch {
    // Version is useful evidence, but its absence must not prevent a valid run.
  }

  return { playwright, version };
}

function resolveBrowserExecutable(chromium, explicitExecutable) {
  const candidates = [
    explicitExecutable,
    chromium.executablePath(),
    platform() === "darwin"
      ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
      : undefined,
  ].filter((candidate) => candidate !== undefined);

  const executable = candidates.find((candidate) => existsSync(candidate));
  if (executable === undefined) {
    throw new Error(
      "No existing Chromium/Chrome executable was found. Provide one with " +
        "--browser-executable or R06_BROWSER_EXECUTABLE; this gate will not install a browser.",
    );
  }
  return executable;
}

function assertProductionArtifact() {
  const r06Artifact = join(PROJECT_ROOT, "dist/client/r06/index.html");
  if (!existsSync(r06Artifact)) {
    throw new Error(
      "Production R06 artifact is missing. Run the project's production build before this gate.",
    );
  }
}

function startPreviewServer() {
  const viteEntry = join(PROJECT_ROOT, "node_modules/vite/bin/vite.js");
  if (!existsSync(viteEntry)) {
    throw new Error(
      "Existing Vite dependencies are unavailable; the gate will not install them.",
    );
  }

  const server = spawn(
    process.execPath,
    [
      viteEntry,
      "preview",
      "--configLoader",
      "runner",
      "--host",
      "127.0.0.1",
      "--port",
      "4173",
      "--strictPort",
    ],
    {
      cwd: PROJECT_ROOT,
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  server.output = "";
  const record = (chunk) => {
    server.output += chunk.toString();
    server.output = server.output.slice(-8_000);
  };
  server.stdout.on("data", record);
  server.stderr.on("data", record);
  return server;
}

async function waitForPreview(url, server, timeoutMs) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    if (server !== undefined && server.exitCode !== null) {
      throw new Error(
        `Production preview exited before readiness (${server.exitCode}).\n${server.output}`,
      );
    }
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (response.ok) {
        const body = await response.text();
        if (body.includes("F.R.A.M. R06") && body.includes("data-boot-state=\"shell\"")) {
          return;
        }
      }
    } catch {
      // Preview startup is polled until the bounded timeout.
    }
    await delay(150);
  }
  throw new Error(`Production preview was not ready within ${timeoutMs} ms.`);
}

function createBrowserErrorRecorder(page) {
  const recorder = {
    consoleErrors: [],
    pageErrors: [],
    reset() {
      this.consoleErrors.length = 0;
      this.pageErrors.length = 0;
    },
  };
  page.on("console", (message) => {
    if (message.type() === "error") {
      recorder.consoleErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => {
    recorder.pageErrors.push(String(error));
  });
  return recorder;
}

async function measureRun(page, browserErrors, options) {
  browserErrors.reset();
  const response = await page.goto(options.url, {
    waitUntil: "domcontentloaded",
    timeout: options.timeoutMs,
  });
  if (response === null || !response.ok()) {
    throw new Error(
      `R06 navigation failed (${response === null ? "no response" : response.status()}).`,
    );
  }

  await page.waitForFunction(
    () => {
      const state = document.querySelector("#app")?.getAttribute("data-boot-state");
      return state === "ready" || state === "failed";
    },
    undefined,
    { timeout: options.timeoutMs },
  );
  const bootState = await page.locator("#app").getAttribute("data-boot-state");
  if (bootState !== "ready") {
    throw new Error(`R06 boot did not reach ready: ${bootState}`);
  }

  const startButton = page.locator('[data-testid="start-game"]');
  await startButton.waitFor({ state: "visible", timeout: options.timeoutMs });
  await startButton.click({ timeout: options.timeoutMs });
  await page.waitForFunction(
    () => {
      const stage = document.querySelector('[data-testid="game-stage"]');
      return stage instanceof HTMLElement &&
        stage.dataset.experience === "r06" &&
        stage.dataset.prototypeVersion === "R06" &&
        stage.dataset.presentationState === "active" &&
        stage.dataset.status === "playing";
    },
    undefined,
    { timeout: options.timeoutMs },
  );
  await page.evaluate(
    () => new Promise((resolveFrame) => requestAnimationFrame(resolveFrame)),
  );

  const controllable = await page.evaluate(() => {
    const root = document.querySelector("#app");
    const stage = document.querySelector('[data-testid="game-stage"]');
    const timing = performance.getEntriesByType("navigation")[0];
    if (!(root instanceof HTMLElement) || !(stage instanceof HTMLElement)) {
      throw new Error("R06 controllable elements are missing.");
    }
    return {
      firstControllableMs: Number(performance.now().toFixed(2)),
      appReadyMs: Number(root.dataset.readyMs ?? "NaN"),
      domContentLoadedMs: timing instanceof PerformanceNavigationTiming
        ? Number(timing.domContentLoadedEventEnd.toFixed(2))
        : null,
      loadEventMs: timing instanceof PerformanceNavigationTiming
        ? Number(timing.loadEventEnd.toFixed(2))
        : null,
      transferSizeBytes: timing instanceof PerformanceNavigationTiming
        ? timing.transferSize
        : null,
      player: readPlayer(stage),
      metadata: {
        experience: stage.dataset.experience,
        prototypeVersion: stage.dataset.prototypeVersion,
        presentationState: stage.dataset.presentationState,
        status: stage.dataset.status,
        questPhase: stage.dataset.questPhase,
      },
    };

    function readPlayer(element) {
      return {
        x: Number(element.dataset.playerX),
        y: Number(element.dataset.playerY),
      };
    }
  });

  const canvas = await inspectCanvas(page);
  const input = await provePlayerResponse(page, options.timeoutMs);
  const frameTiming = await sampleFrameTiming(page, options.sampleMs);
  await page.waitForTimeout(100);

  const errors = {
    console: [...browserErrors.consoleErrors],
    page: [...browserErrors.pageErrors],
  };
  if (errors.console.length > 0 || errors.page.length > 0) {
    throw new Error(
      `Browser errors during ${options.cacheState} run: ${JSON.stringify(errors)}`,
    );
  }

  return {
    cacheState: options.cacheState,
    responseStatus: response.status(),
    finalUrl: page.url(),
    ...controllable,
    canvas,
    input,
    frameTiming,
    errors,
  };
}

async function inspectCanvas(page) {
  const canvasResult = await page.evaluate(
    () => new Promise((resolveInspection, rejectInspection) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          try {
            const canvas = document.querySelector(
              '[data-testid="game-world"] canvas',
            );
            const minimap = document.querySelector('[data-ui="minimap"]');
            if (!(canvas instanceof HTMLCanvasElement)) {
              throw new Error("Visible R06 WebGL canvas is missing.");
            }
            if (!(minimap instanceof HTMLCanvasElement)) {
              throw new Error("R06 minimap canvas is missing.");
            }
            const bounds = canvas.getBoundingClientRect();
            const minimapBounds = minimap.getBoundingClientRect();
            const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
            if (gl === null) {
              throw new Error("R06 canvas has no WebGL context.");
            }

            const pixel = new Uint8Array(4);
            const colors = [];
            let nonTransparentSamples = 0;
            for (let row = 1; row <= 4; row += 1) {
              for (let column = 1; column <= 6; column += 1) {
                const x = Math.min(
                  canvas.width - 1,
                  Math.floor((canvas.width * column) / 7),
                );
                const y = Math.min(
                  canvas.height - 1,
                  Math.floor((canvas.height * row) / 5),
                );
                gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
                const color = [...pixel];
                colors.push(color.join(","));
                if (color[3] > 0 && color.slice(0, 3).some((value) => value > 0)) {
                  nonTransparentSamples += 1;
                }
              }
            }
            const debugRenderer = gl.getExtension("WEBGL_debug_renderer_info");
            resolveInspection({
              css: {
                width: Number(bounds.width.toFixed(2)),
                height: Number(bounds.height.toFixed(2)),
              },
              buffer: { width: canvas.width, height: canvas.height },
              minimap: {
                cssWidth: Number(minimapBounds.width.toFixed(2)),
                cssHeight: Number(minimapBounds.height.toFixed(2)),
                bufferWidth: minimap.width,
                bufferHeight: minimap.height,
                lastPaintAt: Number(minimap.dataset.lastPaintAt ?? "0"),
              },
              contextLost: gl.isContextLost(),
              sampledPixels: colors.length,
              nonTransparentSamples,
              uniqueSampledColors: new Set(colors).size,
              renderer: debugRenderer === null
                ? gl.getParameter(gl.RENDERER)
                : gl.getParameter(debugRenderer.UNMASKED_RENDERER_WEBGL),
              vendor: debugRenderer === null
                ? gl.getParameter(gl.VENDOR)
                : gl.getParameter(debugRenderer.UNMASKED_VENDOR_WEBGL),
            });
          } catch (error) {
            rejectInspection(error);
          }
        });
      });
    }),
  );

  if (
    canvasResult.css.width < 640 ||
    canvasResult.css.height < 350 ||
    canvasResult.buffer.width <= 0 ||
    canvasResult.buffer.height <= 0 ||
    canvasResult.contextLost ||
    canvasResult.nonTransparentSamples < 8 ||
    canvasResult.uniqueSampledColors < 3 ||
    canvasResult.minimap.cssWidth <= 0 ||
    canvasResult.minimap.cssHeight <= 0 ||
    canvasResult.minimap.lastPaintAt <= 0
  ) {
    throw new Error(`R06 canvas/blank-state gate failed: ${JSON.stringify(canvasResult)}`);
  }
  return canvasResult;
}

async function provePlayerResponse(page, timeoutMs) {
  const stage = page.locator('[data-testid="game-stage"]');
  const before = await stage.evaluate(readStagePlayer);
  await page.keyboard.down("ArrowDown");
  await page.waitForTimeout(600);
  await page.keyboard.up("ArrowDown");
  await page.waitForFunction(
    (initial) => {
      const currentStage = document.querySelector('[data-testid="game-stage"]');
      if (!(currentStage instanceof HTMLElement)) {
        return false;
      }
      const current = {
        x: Number(currentStage.dataset.playerX),
        y: Number(currentStage.dataset.playerY),
      };
      return Number.isFinite(current.x) &&
        Number.isFinite(current.y) &&
        Math.hypot(current.x - initial.x, current.y - initial.y) >= 2;
    },
    before,
    { timeout: timeoutMs },
  );
  const after = await stage.evaluate(readStagePlayer);
  const distance = Math.hypot(after.x - before.x, after.y - before.y);
  if (!Number.isFinite(distance) || distance < 2) {
    throw new Error(
      `Visible ArrowDown input did not move R06: ${JSON.stringify({ before, after })}`,
    );
  }
  return {
    control: "ArrowDown",
    holdMs: 600,
    before,
    after,
    distance: Number(distance.toFixed(2)),
  };

  function readStagePlayer(element) {
    return {
      x: Number(element.dataset.playerX),
      y: Number(element.dataset.playerY),
    };
  }
}

async function sampleFrameTiming(page, sampleMs) {
  return page.evaluate(
    (durationMs) => new Promise((resolveSample) => {
      const intervals = [];
      const startedAt = performance.now();
      let previousAt = startedAt;

      const sample = (now) => {
        if (now > previousAt) {
          intervals.push(now - previousAt);
        }
        previousAt = now;
        if (now - startedAt < durationMs) {
          requestAnimationFrame(sample);
          return;
        }

        const sorted = [...intervals].sort((left, right) => left - right);
        const percentileIndex = Math.max(
          0,
          Math.ceil(sorted.length * 0.95) - 1,
        );
        const total = intervals.reduce((sum, value) => sum + value, 0);
        resolveSample({
          targetDurationMs: durationMs,
          actualDurationMs: Number((now - startedAt).toFixed(2)),
          frameCount: intervals.length,
          meanMs: Number((total / Math.max(1, intervals.length)).toFixed(2)),
          p95Ms: Number((sorted[percentileIndex] ?? 0).toFixed(2)),
          maxMs: Number((sorted.at(-1) ?? 0).toFixed(2)),
          longFrameThresholdMs: 50,
          longFrameCount: intervals.filter((interval) => interval > 50).length,
        });
      };

      requestAnimationFrame(sample);
    }),
    sampleMs,
  );
}

async function waitForRouteServiceWorker(page) {
  await page.evaluate(async () => {
    if (!("serviceWorker" in navigator)) return;
    await Promise.race([
      navigator.serviceWorker.ready,
      new Promise((resolveTimeout) => window.setTimeout(resolveTimeout, 5_000)),
    ]);
  });
}

function readBuildSha() {
  const result = spawnSync("git", ["rev-parse", "HEAD"], {
    cwd: PROJECT_ROOT,
    encoding: "utf8",
  });
  if (result.status !== 0) {
    throw new Error(`Could not read build SHA: ${result.stderr}`);
  }
  return result.stdout.trim();
}

async function writeJson(path, value) {
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function printSummary(report, resultPath, screenshotPath) {
  const [cold, warm] = report.runs;
  console.log("R06 baseline gate passed.");
  console.log(`Cold first-controllable: ${cold.firstControllableMs} ms`);
  console.log(`Warm first-controllable: ${warm.firstControllableMs} ms`);
  console.log(
    `Warm frame p95: ${warm.frameTiming.p95Ms} ms; ` +
      `>50 ms frames: ${warm.frameTiming.longFrameCount}`,
  );
  console.log(`JSON: ${resultPath}`);
  console.log(`Screenshot: ${screenshotPath}`);
}

async function stopPreviewServer(server) {
  if (server === undefined || server.exitCode !== null) return;
  server.kill("SIGTERM");
  await Promise.race([
    new Promise((resolveExit) => server.once("exit", resolveExit)),
    delay(3_000),
  ]);
  if (server.exitCode === null) {
    server.kill("SIGKILL");
  }
}

function delay(milliseconds) {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));
}

function formatError(error) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }
  return { name: "UnknownError", message: String(error) };
}

main().catch((error) => {
  console.error(`R06 baseline gate failed: ${formatError(error).message}`);
  process.exitCode = 1;
});
