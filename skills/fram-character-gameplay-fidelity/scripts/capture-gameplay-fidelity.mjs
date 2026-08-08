#!/usr/bin/env node

import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "../../..");
const defaultChromePath =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const allowedHosts = new Set([
  "127.0.0.1",
  "localhost",
  "[::1]",
  "t-omori-lab.github.io",
]);

function usage() {
  return `Usage: node capture-gameplay-fidelity.mjs --out <directory> [options]\n\nOptions:\n  --profile <gameplay-profile.json>\n  --url <R09 URL>                       default: http://127.0.0.1:4177/game/r09/\n  --out <work/... or output/...>        required\n  --expected-actor <asset id>\n  --expected-digest <sha256>\n  --expected-source-cells <count>\n  --expected-visible-cells <count>\n  --browser <executable path>\n`;
}

function parseArguments(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--help" || argument === "-h") {
      process.stdout.write(usage());
      process.exit(0);
    }
    if (!argument.startsWith("--")) {
      throw new Error(`Unexpected positional argument: ${argument}`);
    }
    const value = argv[index + 1];
    if (value === undefined || value.startsWith("--")) {
      throw new Error(`Missing value for ${argument}`);
    }
    options[argument.slice(2)] = value;
    index += 1;
  }
  return options;
}

function expectedInteger(override, fallback, label) {
  const raw = override ?? fallback;
  if (raw === undefined) return undefined;
  const value = Number(raw);
  if (!Number.isInteger(value) || value < 0) {
    throw new Error(`${label} must be a non-negative integer.`);
  }
  return value;
}

function repositoryFile(rawPath, label) {
  const absolutePath = path.resolve(repositoryRoot, rawPath);
  const relativePath = path.relative(repositoryRoot, absolutePath);
  if (
    relativePath === "" ||
    relativePath.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativePath)
  ) {
    throw new Error(`${label} must live inside this repository.`);
  }
  return {
    absolutePath,
    relativePath: relativePath.split(path.sep).join("/"),
  };
}

function resolveOutputDirectory(rawOutput) {
  if (rawOutput === undefined) {
    throw new Error(`--out is required.\n\n${usage()}`);
  }
  const outputDirectory = path.resolve(repositoryRoot, rawOutput);
  const roots = ["work", "output"].map((name) =>
    path.resolve(repositoryRoot, name),
  );
  if (
    !roots.some(
      (root) =>
        outputDirectory === root || outputDirectory.startsWith(`${root}${path.sep}`),
    )
  ) {
    throw new Error("--out must resolve inside this repository's work/ or output/ directory.");
  }
  return outputDirectory;
}

function resolveTargetUrl(rawUrl, expectedPath) {
  const target = new URL(rawUrl ?? "http://127.0.0.1:4177/game/r09/");
  if (!new Set(["http:", "https:"]).has(target.protocol)) {
    throw new Error("Only HTTP(S) capture URLs are allowed.");
  }
  if (!allowedHosts.has(target.hostname)) {
    throw new Error(`Capture host is not allow-listed: ${target.hostname}`);
  }
  const normalizedExpectedPath = expectedPath.endsWith("/")
    ? expectedPath
    : `${expectedPath}/`;
  const normalizedTargetPath = target.pathname.endsWith("/")
    ? target.pathname
    : `${target.pathname}/`;
  if (normalizedTargetPath !== normalizedExpectedPath) {
    throw new Error(`Capture URL must target the R09 route: ${target.pathname}`);
  }
  return target;
}

async function chooseInitialMemoryIfShown(page) {
  for (let step = 0; step < 2; step += 1) {
    const chooser = page.locator('.r09-memory-chooser[aria-hidden="false"]');
    if (!(await chooser.isVisible().catch(() => false))) return;
    const firstChoice = chooser.locator('[data-r09="chooser-actions"] button').first();
    if (!(await firstChoice.isVisible().catch(() => false))) return;
    await firstChoice.click();
    await page.waitForTimeout(350);
  }
}

async function readContract(page) {
  return page.evaluate(() => {
    const root = document.querySelector("#app");
    const stage = document.querySelector('[data-testid="game-stage"]');
    const canvas = document.querySelector('[data-testid="game-world"] canvas');
    if (
      !(root instanceof HTMLElement) ||
      !(stage instanceof HTMLElement) ||
      !(canvas instanceof HTMLCanvasElement)
    ) {
      throw new Error("R09 runtime contract elements are missing.");
    }
    return {
      bootState: root.dataset.bootState,
      heroAssetLoadStatus: root.dataset.heroAssetLoadStatus,
      heroAssetSource: canvas.dataset.heroAssetSource,
      heroAssetStatus: canvas.dataset.heroAssetStatus,
      heroAssetId: canvas.dataset.heroAssetId,
      heroSourceSurfaceCells: Number(canvas.dataset.heroSourceSurfaceCells),
      heroVisibleCells: Number(canvas.dataset.heroVoxelCells),
      heroPackDigest: canvas.dataset.heroPackDigest,
      heroSourceDigest: canvas.dataset.heroSourceDigest,
      heroRepresentation: canvas.dataset.heroRepresentation,
      heroFacingRadians: Number(canvas.dataset.heroFacingRadians),
      internalResolution: canvas.dataset.internalResolution,
      presentationState: stage.dataset.presentationState,
      gameplayStatus: stage.dataset.status,
      playerX: Number(stage.dataset.playerX),
      playerY: Number(stage.dataset.playerY),
    };
  });
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  const profileFile = options.profile === undefined
    ? undefined
    : repositoryFile(options.profile, "The gameplay profile");
  const profile = profileFile === undefined
    ? undefined
    : JSON.parse(await readFile(profileFile.absolutePath, "utf8"));
  const expectedRoute = profile?.routes?.gameplay ?? "/game/r09/";
  const targetUrl = resolveTargetUrl(options.url, expectedRoute);
  const outputDirectory = resolveOutputDirectory(options.out);
  const expectedSourceCells = expectedInteger(
    options["expected-source-cells"],
    profile?.sourceSurfaceCells,
    "Expected source cells",
  );
  const expectedVisibleCells = expectedInteger(
    options["expected-visible-cells"],
    profile?.visibleSurfaceCells,
    "Expected visible cells",
  );
  const expectedActor = options["expected-actor"] ?? profile?.actorId;
  const expectedDigest =
    options["expected-digest"] ?? profile?.sourcePayloadSha256;
  const viewport = {
    width: expectedInteger(undefined, profile?.capture?.width ?? 1280, "Viewport width"),
    height: expectedInteger(undefined, profile?.capture?.height ?? 720, "Viewport height"),
    deviceScaleFactor: Number(profile?.capture?.deviceScaleFactor ?? 1),
  };
  if (
    viewport.width === undefined ||
    viewport.height === undefined ||
    !Number.isFinite(viewport.deviceScaleFactor) ||
    viewport.deviceScaleFactor <= 0
  ) {
    throw new Error("The capture viewport in the gameplay profile is invalid.");
  }
  const viewportLabel = `${viewport.width}x${viewport.height}`;
  const introScreenshot = `intro-${viewportLabel}.png`;
  const gameplayScreenshot = `gameplay-${viewportLabel}.png`;
  await mkdir(outputDirectory, { recursive: true });

  const bundledChromium = chromium.executablePath();
  const requestedBrowser = options.browser;
  const executablePath = requestedBrowser ??
    (existsSync(bundledChromium)
      ? bundledChromium
      : existsSync(defaultChromePath)
        ? defaultChromePath
        : undefined);
  const browser = await chromium.launch({
    headless: true,
    ...(executablePath === undefined ? {} : { executablePath }),
  });
  const consoleErrors = [];
  const pageErrors = [];

  try {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      screen: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: viewport.deviceScaleFactor,
      locale: "ja-JP",
      serviceWorkers: "block",
    });
    const page = await context.newPage();
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    await page.goto(targetUrl.href, {
      waitUntil: "domcontentloaded",
      timeout: 60_000,
    });
    await page.waitForFunction(
      () => document.querySelector("#app")?.getAttribute("data-boot-state") === "ready",
      undefined,
      { timeout: 60_000 },
    );
    await page.screenshot({
      path: path.join(outputDirectory, introScreenshot),
      type: "png",
    });
    await page.getByTestId("start-game").click();
    await page.waitForFunction(
      () => {
        const stage = document.querySelector('[data-testid="game-stage"]');
        const canvas = document.querySelector('[data-testid="game-world"] canvas');
        return (
          stage?.getAttribute("data-presentation-state") === "active" &&
          stage?.getAttribute("data-status") === "playing" &&
          canvas instanceof HTMLCanvasElement &&
          canvas.width > 0 &&
          canvas.height > 0
        );
      },
      undefined,
      { timeout: 60_000 },
    );
    await chooseInitialMemoryIfShown(page);
    await page.keyboard.down("s");
    await page.waitForTimeout(180);
    await page.keyboard.up("s");
    await page.waitForTimeout(750);
    await page.screenshot({
      path: path.join(outputDirectory, gameplayScreenshot),
      type: "png",
    });
    const contract = await readContract(page);
    const failures = [];
    if (contract.heroAssetLoadStatus !== "loaded") {
      failures.push(`hero load status: ${contract.heroAssetLoadStatus}`);
    }
    if (contract.heroAssetSource !== "runtime" || contract.heroAssetStatus !== "loaded") {
      failures.push(
        `runtime source/status: ${contract.heroAssetSource}/${contract.heroAssetStatus}`,
      );
    }
    if (expectedActor !== undefined && contract.heroAssetId !== expectedActor) {
      failures.push(`actor: expected ${expectedActor}, received ${contract.heroAssetId}`);
    }
    if (expectedDigest !== undefined && contract.heroPackDigest !== expectedDigest) {
      failures.push(
        `digest: expected ${expectedDigest}, received ${contract.heroPackDigest}`,
      );
    }
    if (
      expectedSourceCells !== undefined &&
      contract.heroSourceSurfaceCells !== expectedSourceCells
    ) {
      failures.push(
        `source cells: expected ${expectedSourceCells}, received ${contract.heroSourceSurfaceCells}`,
      );
    }
    if (
      expectedVisibleCells !== undefined &&
      contract.heroVisibleCells !== expectedVisibleCells
    ) {
      failures.push(
        `visible cells: expected ${expectedVisibleCells}, received ${contract.heroVisibleCells}`,
      );
    }
    if (consoleErrors.length > 0 || pageErrors.length > 0) {
      failures.push(
        `browser errors: console=${consoleErrors.length}, page=${pageErrors.length}`,
      );
    }
    const report = {
      gate: "fram-character-gameplay-fidelity-capture-v1",
      pass: failures.length === 0,
      capturedAt: new Date().toISOString(),
      requestedUrl: targetUrl.href,
      finalUrl: page.url(),
      profile: profileFile === undefined
        ? null
        : { path: profileFile.relativePath, id: profile.id ?? null },
      viewport,
      contract,
      expectations: {
        actor: expectedActor ?? null,
        digest: expectedDigest ?? null,
        sourceCells: expectedSourceCells ?? null,
        visibleCells: expectedVisibleCells ?? null,
      },
      failures,
      consoleErrors,
      pageErrors,
      screenshots: [introScreenshot, gameplayScreenshot],
    };
    await writeFile(
      path.join(outputDirectory, "capture.json"),
      `${JSON.stringify(report, null, 2)}\n`,
      "utf8",
    );
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    await context.close();
    if (!report.pass) process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
