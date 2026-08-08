#!/usr/bin/env node

/**
 * Current-R06 production-preview browser and performance gate.
 *
 * This intentionally stays separate from smoke.py, which covers the legacy
 * Phaser/mobile startup flow. It uses only the externally observable R06 DOM
 * contract and does not require runtime instrumentation.
 */

import { spawn, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import {
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  stat,
  writeFile,
} from "node:fs/promises";
import { createRequire } from "node:module";
import { arch, platform, release, tmpdir } from "node:os";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(SCRIPT_DIRECTORY, "../..");
const EVIDENCE_ROOT = join(PROJECT_ROOT, "work/goal0_r06_baseline/evidence");
const DEFAULT_URL = "http://127.0.0.1:4173/game/r06/";
const DEFAULT_SAMPLE_MS = 10_000;
const DEFAULT_TIMEOUT_MS = 60_000;
const VIEWPORT = Object.freeze({ width: 1_280, height: 720 });
const EXPECTED_SERVICE_WORKER_PATH = "/game/r06/sw.js";
const EXPECTED_SERVICE_WORKER_SCOPE_PATH = "/game/r06/";
const require = createRequire(import.meta.url);

async function main() {
  const options = parseArguments(process.argv.slice(2));
  const sourceState = readSourceState();
  const outputDirectory = await resolveOutputDirectory(options.outputDirectory);
  const resultPath = join(outputDirectory, "baseline.json");
  const screenshotPath = options.screenshot
    ? join(outputDirectory, "verified-r06.png")
    : null;
  await mkdir(outputDirectory, { recursive: true });

  const startedAt = new Date().toISOString();
  const { playwright, version: playwrightVersion } = loadPlaywright(
    options.playwrightModule,
  );
  const browserExecutable = resolveBrowserExecutable(
    playwright.chromium,
    options.browserExecutable,
  );
  let previewServer;
  let browser;
  let browserErrors;

  const report = {
    schemaVersion: 2,
    gate: "goal0-current-r06-browser-baseline",
    status: "failed",
    measuredAt: startedAt,
    sourceState,
    build: {
      performedByGate: true,
      provenanceStrength: "source-state-plus-production-artifact-fingerprint",
      commands: [],
      artifactFingerprint: null,
    },
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
      kind: options.reuseServer
        ? "reused-loopback-server"
        : "vite-production-preview",
      startedByGate: !options.reuseServer,
      localOnly: true,
      provenanceStrength: options.reuseServer
        ? "weaker-reused-server; the gate builds and fingerprints dist/client but does not own the server process"
        : "gate-started Vite preview serving the just-built fingerprinted dist/client",
      command:
        "vite preview --configLoader runner --host 127.0.0.1 --port 4173 --strictPort",
    },
    frameSample: {
      durationMs: options.sampleMs,
      longFrameThresholdMs: 50,
    },
    errorCoverage: {
      claim:
        "Fails on page errors and error-level console messages surfaced by Playwright BrowserContext, including service-worker-origin console messages when Playwright surfaces them.",
      limitation:
        "Playwright does not expose a separate exhaustive service-worker exception event; activated registration and controller identity are proved independently.",
      consoleErrors: [],
      pageErrors: [],
    },
    serviceWorkerProof: {
      expectedScopePath: EXPECTED_SERVICE_WORKER_SCOPE_PATH,
      expectedScriptPath: EXPECTED_SERVICE_WORKER_PATH,
      observedWorkers: [],
      afterCold: null,
      beforeWarmNavigation: null,
      afterWarmNavigation: null,
    },
    runs: [],
    artifacts: {
      json: describeArtifactPath(resultPath),
      screenshot: screenshotPath === null
        ? null
        : describeArtifactPath(screenshotPath),
    },
  };

  try {
    report.build.commands = runProductionBuild();
    report.build.artifactFingerprint = await fingerprintDirectory(
      join(PROJECT_ROOT, "dist/client"),
    );

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
    browserErrors = createBrowserErrorRecorder(context, page);

    browserErrors.setPhase("cold");
    report.runs.push(
      await measureRun(page, browserErrors, {
        cacheState: "cold",
        url: options.url,
        timeoutMs: options.timeoutMs,
        sampleMs: options.sampleMs,
      }),
    );

    browserErrors.setPhase("after-cold-service-worker");
    report.serviceWorkerProof.afterCold = await requireRouteServiceWorker(
      page,
      options.url,
      options.timeoutMs,
      false,
    );
    report.serviceWorkerProof.beforeWarmNavigation = await requireRouteServiceWorker(
      page,
      options.url,
      options.timeoutMs,
      true,
    );
    browserErrors.assertNoErrors("cold run and service-worker activation");

    browserErrors.setPhase("warm");
    const warmMeasurement = await measureRun(page, browserErrors, {
      cacheState: "warm",
      url: options.url,
      timeoutMs: options.timeoutMs,
      sampleMs: options.sampleMs,
      requireControllerAfterNavigation: true,
    });
    report.serviceWorkerProof.afterWarmNavigation =
      warmMeasurement.serviceWorkerAfterNavigation;
    delete warmMeasurement.serviceWorkerAfterNavigation;
    report.runs.push(warmMeasurement);

    browserErrors.setPhase("after-warm-service-worker");
    browserErrors.assertNoErrors("warm run and service-worker control");

    if (screenshotPath !== null) {
      await page.screenshot({ path: screenshotPath, type: "png" });
    }

    report.serviceWorkerProof.observedWorkers = browserErrors.observedWorkers;
    report.errorCoverage.consoleErrors = browserErrors.consoleErrors;
    report.errorCoverage.pageErrors = browserErrors.pageErrors;
    await context.close();

    report.status = "passed";
    await writeJson(resultPath, report);
    printSummary(report, resultPath, screenshotPath);
  } catch (error) {
    if (browserErrors !== undefined) {
      report.serviceWorkerProof.observedWorkers = browserErrors.observedWorkers;
      report.errorCoverage.consoleErrors = browserErrors.consoleErrors;
      report.errorCoverage.pageErrors = browserErrors.pageErrors;
    }
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
    outputDirectory: undefined,
    sampleMs: DEFAULT_SAMPLE_MS,
    timeoutMs: DEFAULT_TIMEOUT_MS,
    playwrightModule: process.env.R06_PLAYWRIGHT_MODULE_PATH,
    browserExecutable: process.env.R06_BROWSER_EXECUTABLE,
    reuseServer: false,
    headed: false,
    screenshot: true,
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
      case "--no-screenshot":
        options.screenshot = false;
        break;
      default:
        throw new Error(`Unknown argument: ${argument}`);
    }
  }

  assertLocalR06Url(options.url, options.reuseServer);
  return options;
}

function assertLocalR06Url(rawUrl, reuseServer) {
  let parsedUrl;
  try {
    parsedUrl = new URL(rawUrl);
  } catch (error) {
    throw new Error(`--url must be a valid absolute URL: ${rawUrl}`, {
      cause: error,
    });
  }
  const loopbackHosts = new Set(["127.0.0.1", "localhost", "[::1]"]);
  if (parsedUrl.protocol !== "http:") {
    throw new Error("--url must use loopback HTTP for this local preview gate.");
  }
  if (!loopbackHosts.has(parsedUrl.hostname)) {
    throw new Error(`--url must use a loopback host: ${rawUrl}`);
  }
  if (parsedUrl.username !== "" || parsedUrl.password !== "") {
    throw new Error("--url must not contain credentials.");
  }
  if (parsedUrl.pathname !== EXPECTED_SERVICE_WORKER_SCOPE_PATH) {
    throw new Error(
      `Current production R06 URL must use exactly /game/r06/: ${rawUrl}`,
    );
  }
  if (parsedUrl.search !== "" || parsedUrl.hash !== "") {
    throw new Error("--url must not contain a query string or fragment.");
  }
  if (!reuseServer && parsedUrl.href !== DEFAULT_URL) {
    throw new Error(
      `The self-started preview uses the fixed local URL ${DEFAULT_URL}. ` +
        "Use --reuse-server only for another loopback preview port.",
    );
  }
}

async function resolveOutputDirectory(explicitOutput) {
  if (explicitOutput === undefined) {
    return mkdtemp(join(tmpdir(), "fram-r06-baseline-"));
  }
  if (isAbsolute(explicitOutput)) {
    throw new Error("--output must be project-relative, not absolute.");
  }
  const segments = explicitOutput.split(/[\\/]/u);
  if (segments.includes("..")) {
    throw new Error("--output must not contain '..' path segments.");
  }
  const candidate = resolve(PROJECT_ROOT, explicitOutput);
  if (candidate !== EVIDENCE_ROOT && !candidate.startsWith(`${EVIDENCE_ROOT}${sep}`)) {
    throw new Error(
      "--output must stay inside work/goal0_r06_baseline/evidence/.",
    );
  }
  await assertNoSymlinkEscape(candidate);
  return candidate;
}

async function assertNoSymlinkEscape(candidate) {
  const candidateRelative = relative(PROJECT_ROOT, candidate);
  const components = candidateRelative === "" ? [] : candidateRelative.split(sep);
  let current = PROJECT_ROOT;
  for (const component of components) {
    current = join(current, component);
    try {
      const currentStat = await lstat(current);
      if (currentStat.isSymbolicLink()) {
        throw new Error(`--output must not traverse a symbolic link: ${current}`);
      }
    } catch (error) {
      if (error?.code === "ENOENT") return;
      throw error;
    }
  }
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
      "Playwright is unavailable. Run pnpm install --frozen-lockfile first.",
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
      "No Chromium executable was found. Run `pnpm exec playwright install chromium` " +
        "or provide --browser-executable for an existing local Chrome/Chromium.",
    );
  }
  return executable;
}

function readSourceState() {
  const headResult = runGit(["rev-parse", "HEAD"]);
  const statusResult = runGit(
    ["status", "--porcelain=v1", "--untracked-files=all"],
    true,
  );
  const statusPorcelain = statusResult === "" ? [] : statusResult.split("\n");
  return {
    head: headResult,
    dirty: statusPorcelain.length > 0,
    statusPorcelain,
    statement: statusPorcelain.length > 0
      ? "The measured production artifact was built from a dirty source tree; HEAD alone does not identify its contents."
      : "The measured production artifact was built from a clean source tree at HEAD.",
  };
}

function runGit(argumentsList, preserveLeadingWhitespace = false) {
  const result = spawnSync("git", argumentsList, {
    cwd: PROJECT_ROOT,
    encoding: "utf8",
  });
  if (result.status !== 0) {
    throw new Error(`Git ${argumentsList.join(" ")} failed: ${result.stderr}`);
  }
  return preserveLeadingWhitespace
    ? result.stdout.replace(/\r?\n$/u, "")
    : result.stdout.trim();
}

function runProductionBuild() {
  const commands = [
    {
      label: "strict TypeScript",
      entry: join(PROJECT_ROOT, "node_modules/typescript/bin/tsc"),
      arguments: ["--noEmit"],
      display: "tsc --noEmit",
    },
    {
      label: "Vite production build",
      entry: join(PROJECT_ROOT, "node_modules/vite/bin/vite.js"),
      arguments: ["build", "--configLoader", "runner"],
      display: "vite build --configLoader runner",
    },
  ];

  return commands.map((command) => {
    if (!existsSync(command.entry)) {
      throw new Error(
        `${command.label} dependency is unavailable. Run pnpm install --frozen-lockfile first.`,
      );
    }
    const startedAt = Date.now();
    const result = spawnSync(
      process.execPath,
      [command.entry, ...command.arguments],
      {
        cwd: PROJECT_ROOT,
        encoding: "utf8",
        maxBuffer: 20 * 1024 * 1024,
      },
    );
    const commandResult = {
      command: command.display,
      exitCode: result.status,
      durationMs: Date.now() - startedAt,
    };
    if (result.status !== 0) {
      throw new Error(
        `${command.label} failed (${result.status}).\n` +
          tail(`${result.stdout ?? ""}\n${result.stderr ?? ""}`, 12_000),
      );
    }
    return commandResult;
  });
}

async function fingerprintDirectory(rootDirectory) {
  if (!existsSync(rootDirectory)) {
    throw new Error(`Production artifact directory is missing: ${rootDirectory}`);
  }
  const files = await listFilesRecursively(rootDirectory);
  const aggregate = createHash("sha256");
  let totalBytes = 0;
  for (const absolutePath of files) {
    const content = await readFile(absolutePath);
    const projectPath = relative(rootDirectory, absolutePath).split(sep).join("/");
    const digest = createHash("sha256").update(content).digest("hex");
    totalBytes += content.byteLength;
    aggregate.update(`${projectPath}\0${content.byteLength}\0${digest}\n`);
  }
  return {
    algorithm: "sha256-tree-v1",
    root: "dist/client",
    digest: aggregate.digest("hex"),
    fileCount: files.length,
    totalBytes,
  };
}

async function listFilesRecursively(rootDirectory) {
  const entries = await readdir(rootDirectory, { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    const absolutePath = join(rootDirectory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listFilesRecursively(absolutePath));
    } else if (entry.isFile()) {
      const fileStat = await stat(absolutePath);
      if (fileStat.isFile()) files.push(absolutePath);
    }
  }
  return files;
}

function startPreviewServer() {
  const viteEntry = join(PROJECT_ROOT, "node_modules/vite/bin/vite.js");
  if (!existsSync(viteEntry)) {
    throw new Error("Vite is unavailable. Run pnpm install --frozen-lockfile first.");
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

function createBrowserErrorRecorder(context, page) {
  const recorder = {
    phase: "setup",
    consoleErrors: [],
    pageErrors: [],
    observedWorkers: [],
    setPhase(phase) {
      this.phase = phase;
    },
    assertNoErrors(label) {
      if (this.consoleErrors.length > 0 || this.pageErrors.length > 0) {
        throw new Error(
          `Browser errors during ${label}: ${JSON.stringify({
            console: this.consoleErrors,
            page: this.pageErrors,
          })}`,
        );
      }
    },
  };

  context.on("console", (message) => {
    if (message.type() !== "error") return;
    const location = message.location();
    const source = location.url.includes(EXPECTED_SERVICE_WORKER_PATH)
      ? "service-worker"
      : message.page() === page
        ? "page"
        : "browser-context";
    recorder.consoleErrors.push({
      phase: recorder.phase,
      source,
      text: message.text(),
      location,
    });
  });
  page.on("pageerror", (error) => {
    recorder.pageErrors.push({
      phase: recorder.phase,
      message: String(error),
    });
  });
  context.on("serviceworker", (worker) => {
    recorder.observedWorkers.push({
      phase: recorder.phase,
      url: worker.url(),
      observedAt: new Date().toISOString(),
    });
  });
  return recorder;
}

async function measureRun(page, browserErrors, options) {
  const errorStart = {
    console: browserErrors.consoleErrors.length,
    page: browserErrors.pageErrors.length,
  };
  const response = await page.goto(options.url, {
    waitUntil: "domcontentloaded",
    timeout: options.timeoutMs,
  });
  if (response === null || !response.ok()) {
    throw new Error(
      `R06 navigation failed (${response === null ? "no response" : response.status()}).`,
    );
  }
  const serviceWorkerAfterNavigation = options.requireControllerAfterNavigation
    ? await requireImmediateRouteServiceWorkerController(page, options.url)
    : null;

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

  const controlGuide = await inspectDesktopControlGuide(page, options.timeoutMs);
  const canvas = await inspectCanvas(page);
  const controllable = await readFirstControllable(page);
  const input = await provePlayerResponse(page, options.timeoutMs);
  const frameTiming = await sampleFrameTiming(page, options.sampleMs);
  await page.waitForTimeout(100);
  const routeResources = await collectSameOriginRouteResources(page);

  const errors = {
    console: browserErrors.consoleErrors.slice(errorStart.console),
    page: browserErrors.pageErrors.slice(errorStart.page),
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
    controlGuide,
    canvas,
    input,
    frameTiming,
    routeResources,
    serviceWorkerAfterNavigation,
    errors,
  };
}

async function inspectDesktopControlGuide(page, timeoutMs) {
  const guide = page.locator(".relic-control-guide");
  await guide.waitFor({ state: "visible", timeout: timeoutMs });
  const result = await guide.evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    const text = element.textContent?.replace(/\s+/gu, " ").trim() ?? "";
    return {
      visible: bounds.width > 0 && bounds.height > 0,
      ariaLabel: element.getAttribute("aria-label"),
      text,
      containsWasd: /WASD/iu.test(text),
      bounds: {
        width: Number(bounds.width.toFixed(2)),
        height: Number(bounds.height.toFixed(2)),
      },
    };
  });
  if (!result.visible || !result.containsWasd) {
    throw new Error(`Desktop WASD control guide gate failed: ${JSON.stringify(result)}`);
  }
  return result;
}

async function readFirstControllable(page) {
  return page.evaluate(() => {
    const root = document.querySelector("#app");
    const stage = document.querySelector('[data-testid="game-stage"]');
    const timing = performance.getEntriesByType("navigation")[0];
    if (!(root instanceof HTMLElement) || !(stage instanceof HTMLElement)) {
      throw new Error("R06 controllable elements are missing.");
    }
    return {
      firstControllableMs: Number(performance.now().toFixed(2)),
      firstControllableDefinition:
        "R06 boot ready; start activated; stage active/playing; visible WASD guide; nonblank WebGL canvas and painted minimap verified.",
      appReadyMs: Number(root.dataset.readyMs ?? "NaN"),
      navigationTiming: {
        domContentLoadedMs: timing instanceof PerformanceNavigationTiming
          ? Number(timing.domContentLoadedEventEnd.toFixed(2))
          : null,
        loadEventMs: timing instanceof PerformanceNavigationTiming
          ? Number(timing.loadEventEnd.toFixed(2))
          : null,
      },
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
  await page.keyboard.down("s");
  await page.waitForTimeout(600);
  await page.keyboard.up("s");
  await page.waitForFunction(
    (initial) => {
      const currentStage = document.querySelector('[data-testid="game-stage"]');
      if (!(currentStage instanceof HTMLElement)) return false;
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
      `Visible KeyS/WASD input did not move R06: ${JSON.stringify({ before, after })}`,
    );
  }
  return {
    control: "KeyS",
    advertisedControl: "WASD",
    keySent: "s",
    holdMs: 600,
    observedContract: "data-player-x/y",
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
        if (now > previousAt) intervals.push(now - previousAt);
        previousAt = now;
        if (now - startedAt < durationMs) {
          requestAnimationFrame(sample);
          return;
        }

        const sorted = [...intervals].sort((left, right) => left - right);
        const percentileIndex = Math.max(0, Math.ceil(sorted.length * 0.95) - 1);
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

async function collectSameOriginRouteResources(page) {
  return page.evaluate(() => {
    const navigation = performance.getEntriesByType("navigation")[0];
    const resources = performance.getEntriesByType("resource");
    const entries = [];
    if (navigation instanceof PerformanceNavigationTiming) {
      entries.push(toRecord(navigation, "navigation"));
    }
    for (const resource of resources) {
      if (!(resource instanceof PerformanceResourceTiming)) continue;
      let resourceUrl;
      try {
        resourceUrl = new URL(resource.name);
      } catch {
        continue;
      }
      if (resourceUrl.origin !== location.origin) continue;
      entries.push(toRecord(resource, classify(resource)));
    }

    const groups = {};
    for (const entry of entries) {
      groups[entry.group] ??= emptyTotals();
      add(groups[entry.group], entry);
    }
    const totals = emptyTotals();
    for (const entry of entries) add(totals, entry);

    return {
      scope:
        "Same-origin navigation and PerformanceResourceTiming entries observed through the end of the fixed active-gameplay sample.",
      totals,
      groups,
      entries,
    };

    function toRecord(entry, group) {
      const url = new URL(entry.name, location.href);
      return {
        group,
        entryType: entry.entryType,
        initiatorType: "initiatorType" in entry ? entry.initiatorType : "navigation",
        url: `${url.pathname}${url.search}`,
        transferSizeBytes: finiteNumber(entry.transferSize),
        encodedBodySizeBytes: finiteNumber(entry.encodedBodySize),
        decodedBodySizeBytes: finiteNumber(entry.decodedBodySize),
        durationMs: Number(entry.duration.toFixed(2)),
      };
    }

    function classify(entry) {
      const url = new URL(entry.name, location.href);
      const pathname = url.pathname.toLowerCase();
      const initiator = entry.initiatorType.toLowerCase();
      if (pathname.endsWith("/sw.js")) return "service-worker";
      if (initiator === "script" || pathname.endsWith(".js")) return "script";
      if (initiator === "css" || initiator === "link" || pathname.endsWith(".css")) {
        return "stylesheet";
      }
      if (
        initiator === "img" ||
        initiator === "image" ||
        /\.(?:avif|gif|jpe?g|png|svg|webp)$/iu.test(pathname)
      ) return "image";
      if (/\.(?:woff2?|ttf|otf)$/iu.test(pathname)) return "font";
      if (pathname.endsWith(".webmanifest")) return "manifest";
      if (["fetch", "xmlhttprequest", "beacon"].includes(initiator)) return "data";
      return "other";
    }

    function emptyTotals() {
      return {
        count: 0,
        transferSizeBytes: 0,
        encodedBodySizeBytes: 0,
        decodedBodySizeBytes: 0,
      };
    }

    function add(target, entry) {
      target.count += 1;
      target.transferSizeBytes += entry.transferSizeBytes;
      target.encodedBodySizeBytes += entry.encodedBodySizeBytes;
      target.decodedBodySizeBytes += entry.decodedBodySizeBytes;
    }

    function finiteNumber(value) {
      return Number.isFinite(value) ? value : 0;
    }
  });
}

async function requireRouteServiceWorker(page, targetUrl, timeoutMs, requireController) {
  const target = new URL(targetUrl);
  const expectedScope = new URL(EXPECTED_SERVICE_WORKER_SCOPE_PATH, target.origin).href;
  const expectedScript = new URL(EXPECTED_SERVICE_WORKER_PATH, target.origin).href;
  const proof = await page.evaluate(
    async ({ expectedScopeUrl, expectedScriptUrl, boundedTimeoutMs, controllerRequired }) => {
      if (!("serviceWorker" in navigator)) {
        throw new Error("Service workers are unavailable in this browser context.");
      }
      const deadline = Date.now() + boundedTimeoutMs;
      let registration = null;
      let active = null;
      while (Date.now() < deadline) {
        registration = await navigator.serviceWorker.getRegistration(expectedScopeUrl);
        active = registration?.active ?? null;
        if (
          registration?.scope === expectedScopeUrl &&
          active?.scriptURL === expectedScriptUrl &&
          active.state === "activated"
        ) break;
        await new Promise((resolveWait) => window.setTimeout(resolveWait, 50));
      }
      if (
        registration?.scope !== expectedScopeUrl ||
        active?.scriptURL !== expectedScriptUrl ||
        active.state !== "activated"
      ) {
        throw new Error(`R06 service worker did not activate: ${JSON.stringify({
          scope: registration?.scope ?? null,
          activeScript: active?.scriptURL ?? null,
          activeState: active?.state ?? null,
        })}`);
      }

      let controller = navigator.serviceWorker.controller;
      while (
        controllerRequired &&
        controller?.scriptURL !== expectedScriptUrl &&
        Date.now() < deadline
      ) {
        await new Promise((resolveWait) => window.setTimeout(resolveWait, 50));
        controller = navigator.serviceWorker.controller;
      }
      if (controllerRequired && controller?.scriptURL !== expectedScriptUrl) {
        throw new Error(`R06 page is not controlled by the expected worker: ${JSON.stringify({
          controllerScript: controller?.scriptURL ?? null,
          expectedScriptUrl,
        })}`);
      }

      return {
        checkedAt: new Date().toISOString(),
        pageUrl: location.href,
        controllerRequired,
        registration: {
          scope: registration.scope,
          matchesExpectedScope: registration.scope === expectedScopeUrl,
          active: {
            scriptURL: active.scriptURL,
            state: active.state,
            matchesExpectedScript: active.scriptURL === expectedScriptUrl,
          },
        },
        controller: controller === null
          ? null
          : {
              scriptURL: controller.scriptURL,
              state: controller.state,
              matchesExpectedScript: controller.scriptURL === expectedScriptUrl,
            },
      };
    },
    {
      expectedScopeUrl: expectedScope,
      expectedScriptUrl: expectedScript,
      boundedTimeoutMs: timeoutMs,
      controllerRequired: requireController,
    },
  );
  return proof;
}

async function requireImmediateRouteServiceWorkerController(page, targetUrl) {
  const target = new URL(targetUrl);
  const expectedScope = new URL(EXPECTED_SERVICE_WORKER_SCOPE_PATH, target.origin).href;
  const expectedScript = new URL(EXPECTED_SERVICE_WORKER_PATH, target.origin).href;
  return page.evaluate(
    async ({ expectedScopeUrl, expectedScriptUrl }) => {
      if (!("serviceWorker" in navigator)) {
        throw new Error("Service workers are unavailable after warm navigation.");
      }
      const controller = navigator.serviceWorker.controller;
      const controllerSnapshot = controller === null
        ? null
        : {
            scriptURL: controller.scriptURL,
            state: controller.state,
            matchesExpectedScript: controller.scriptURL === expectedScriptUrl,
          };
      if (controllerSnapshot?.matchesExpectedScript !== true) {
        throw new Error(
          `Warm navigation was not immediately controlled by R06: ${JSON.stringify({
            controller: controllerSnapshot,
            expectedScriptUrl,
          })}`,
        );
      }
      const registration = await navigator.serviceWorker.getRegistration(expectedScopeUrl);
      const active = registration?.active ?? null;
      if (
        registration?.scope !== expectedScopeUrl ||
        active?.scriptURL !== expectedScriptUrl ||
        active.state !== "activated"
      ) {
        throw new Error(
          `Warm navigation lost the activated R06 registration: ${JSON.stringify({
            scope: registration?.scope ?? null,
            activeScript: active?.scriptURL ?? null,
            activeState: active?.state ?? null,
          })}`,
        );
      }
      return {
        checkedAt: new Date().toISOString(),
        timing: "immediately after warm page.goto reached DOMContentLoaded, before R06 boot/playability waits",
        pageUrl: location.href,
        controllerRequired: true,
        registration: {
          scope: registration.scope,
          matchesExpectedScope: true,
          active: {
            scriptURL: active.scriptURL,
            state: active.state,
            matchesExpectedScript: true,
          },
        },
        controller: controllerSnapshot,
      };
    },
    {
      expectedScopeUrl: expectedScope,
      expectedScriptUrl: expectedScript,
    },
  );
}

function describeArtifactPath(path) {
  const projectRelative = relative(PROJECT_ROOT, path);
  if (projectRelative !== "" && !projectRelative.startsWith(`..${sep}`) && projectRelative !== "..") {
    return projectRelative.split(sep).join("/");
  }
  return path;
}

async function writeJson(path, value) {
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function printSummary(report, resultPath, screenshotPath) {
  const [cold, warm] = report.runs;
  console.log("R06 baseline gate passed.");
  console.log(
    `Source: ${report.sourceState.head} (${report.sourceState.dirty ? "dirty" : "clean"})`,
  );
  console.log(`Cold first-controllable: ${cold.firstControllableMs} ms`);
  console.log(`Warm first-controllable: ${warm.firstControllableMs} ms`);
  console.log(
    `Warm frame p95: ${warm.frameTiming.p95Ms} ms; ` +
      `>50 ms frames: ${warm.frameTiming.longFrameCount}`,
  );
  console.log(
    `Cold same-origin route transfer: ${cold.routeResources.totals.transferSizeBytes} bytes ` +
      `across ${cold.routeResources.totals.count} entries`,
  );
  console.log(
    `Warm same-origin route transfer: ${warm.routeResources.totals.transferSizeBytes} bytes ` +
      `across ${warm.routeResources.totals.count} entries`,
  );
  console.log(`JSON: ${resultPath}`);
  if (screenshotPath !== null) console.log(`Screenshot: ${screenshotPath}`);
}

async function stopPreviewServer(server) {
  if (server === undefined || server.exitCode !== null) return;
  server.kill("SIGTERM");
  await Promise.race([
    new Promise((resolveExit) => server.once("exit", resolveExit)),
    delay(3_000),
  ]);
  if (server.exitCode === null) server.kill("SIGKILL");
}

function delay(milliseconds) {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));
}

function tail(value, maximumLength) {
  return value.length <= maximumLength ? value : value.slice(-maximumLength);
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
