#!/usr/bin/env node

import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const baseUrl = process.argv[2] ?? "http://127.0.0.1:4174/game/";
const outputDirectory = resolve(
  process.argv[3] ??
    "work/r09a_first_memory_logic_2026-08-08/evidence/performance",
);
const executablePath = existsSync(chromium.executablePath())
  ? chromium.executablePath()
  : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const routes = ["r06", "r09"];
const runsPerRoute = 3;
const sampleMs = 5_000;

await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath });
const measurements = { r06: [], r09: [] };

try {
  for (const route of routes) {
    for (let run = 1; run <= runsPerRoute; run += 1) {
      process.stdout.write(`${route} performance run ${run}/${runsPerRoute}\n`);
      measurements[route].push(await measureRoute(browser, route));
    }
  }
} finally {
  await browser.close();
}

const summary = {
  r06: summarize(measurements.r06),
  r09: summarize(measurements.r09),
};
const ratios = {
  firstControllable:
    summary.r09.firstControllableMedianMs /
    summary.r06.firstControllableMedianMs,
  transfer:
    summary.r09.sameOriginTransferMedianBytes /
    summary.r06.sameOriginTransferMedianBytes,
  frameP95: summary.r09.frameP95MedianMs / summary.r06.frameP95MedianMs,
};
const artifactFingerprints = Object.fromEntries(
  routes.map((route) => [
    route,
    createHash("sha256")
      .update(
        JSON.stringify(
          measurements[route][0]?.transfer.resources.map(
            (resource) => resource.pathname,
          ) ?? [],
        ),
      )
      .digest("hex"),
  ]),
);
const gates = {
  firstControllableWithinTenPercent: ratios.firstControllable <= 1.1,
  transferWithinTenPercent: ratios.transfer <= 1.1,
  frameP95WithinTenPercent: ratios.frameP95 <= 1.1,
  r09InputResponded: measurements.r09.every((run) => run.input.moved),
  noBrowserErrors: [...measurements.r06, ...measurements.r09].every(
    (run) => run.consoleErrors.length === 0 && run.pageErrors.length === 0,
  ),
};
const status = Object.values(gates).every(Boolean) ? "passed" : "failed";
const report = {
  schemaVersion: 1,
  gate: "r09-vs-r06-production-preview",
  status,
  measuredAt: new Date().toISOString(),
  baseUrl,
  viewport: { width: 1_280, height: 720, deviceScaleFactor: 1 },
  sampleMs,
  runsPerRoute,
  browserExecutable: executablePath,
  measurements,
  artifactFingerprints,
  summary,
  ratios,
  gates,
  limits: {
    relativeRegressionMaximum: 1.1,
    note:
      "Local desktop Chrome evidence only. This is not iPhone 16 Pro or public deployment acceptance.",
  },
};

await writeFile(
  `${outputDirectory}/r09-vs-r06.json`,
  `${JSON.stringify(report, null, 2)}\n`,
  "utf8",
);
process.stdout.write(`${JSON.stringify({ status, summary, ratios, gates }, null, 2)}\n`);
if (status !== "passed") process.exitCode = 1;

async function measureRoute(browserInstance, route) {
  const context = await browserInstance.newContext({
    viewport: { width: 1_280, height: 720 },
    screen: { width: 1_280, height: 720 },
    deviceScaleFactor: 1,
    locale: "ja-JP",
    serviceWorkers: "block",
  });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  const url = new URL(`${route}/`, baseUrl).href;
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(
    () => document.querySelector("#app")?.getAttribute("data-boot-state") === "ready",
    undefined,
    { timeout: 60_000 },
  );
  await page.getByTestId("start-game").click();
  await page.waitForFunction(
    () => {
      const stage = document.querySelector('[data-testid="game-stage"]');
      const canvas = document.querySelector('[data-testid="game-world"] canvas');
      const minimap = document.querySelector('[data-ui="minimap"]');
      return stage?.getAttribute("data-presentation-state") === "active" &&
        stage?.getAttribute("data-status") === "playing" &&
        canvas instanceof HTMLCanvasElement &&
        canvas.width > 0 &&
        canvas.height > 0 &&
        minimap instanceof HTMLCanvasElement &&
        Number(minimap.dataset.lastPaintAt ?? "0") > 0;
    },
    undefined,
    { timeout: 60_000 },
  );
  const firstControllableMs = await page.evaluate(() => performance.now());
  const transfer = await page.evaluate(() => {
    const origin = location.origin;
    const entries = performance.getEntriesByType("resource")
      .filter((entry) => entry instanceof PerformanceResourceTiming)
      .filter((entry) => new URL(entry.name).origin === origin);
    const navigation = performance.getEntriesByType("navigation")[0];
    return {
      sameOriginBytes:
        entries.reduce((total, entry) => total + entry.transferSize, 0) +
        (navigation instanceof PerformanceNavigationTiming
          ? navigation.transferSize
          : 0),
      decodedBytes:
        entries.reduce((total, entry) => total + entry.decodedBodySize, 0) +
        (navigation instanceof PerformanceNavigationTiming
          ? navigation.decodedBodySize
          : 0),
      resourceCount: entries.length + 1,
      resources: [
        ...(navigation instanceof PerformanceNavigationTiming
          ? [{
              pathname: new URL(navigation.name).pathname,
              initiatorType: "navigation",
              transferSize: navigation.transferSize,
              decodedBodySize: navigation.decodedBodySize,
            }]
          : []),
        ...entries.map((entry) => ({
          pathname: new URL(entry.name).pathname,
          initiatorType: entry.initiatorType,
          transferSize: entry.transferSize,
          decodedBodySize: entry.decodedBodySize,
        })),
      ].sort((a, b) => a.pathname.localeCompare(b.pathname)),
    };
  });
  const input = await proveInput(page);
  const frames = await page.evaluate(
    (durationMs) => new Promise((resolveFrames) => {
      const deltas = [];
      const startedAt = performance.now();
      let previous = startedAt;
      const sample = (now) => {
        deltas.push(now - previous);
        previous = now;
        if (now - startedAt >= durationMs) {
          const sorted = [...deltas].sort((a, b) => a - b);
          const p95Index = Math.min(
            sorted.length - 1,
            Math.max(0, Math.ceil(sorted.length * 0.95) - 1),
          );
          resolveFrames({
            count: deltas.length,
            p95Ms: sorted[p95Index] ?? 0,
            longFrames: deltas.filter((delta) => delta > 50).length,
            maximumMs: sorted.at(-1) ?? 0,
          });
          return;
        }
        requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    }),
    sampleMs,
  );
  const readyMs = await page.locator("#app").evaluate(
    (root) => Number(root.getAttribute("data-ready-ms")),
  );
  await context.close();
  return {
    route,
    firstControllableMs: round(firstControllableMs),
    appReadyMs: readyMs,
    transfer,
    frames: {
      ...frames,
      p95Ms: round(frames.p95Ms),
      maximumMs: round(frames.maximumMs),
    },
    input,
    consoleErrors,
    pageErrors,
  };
}

async function proveInput(page) {
  const stage = page.locator('[data-testid="game-stage"]');
  const before = await stage.evaluate(readPosition);
  await page.keyboard.down("s");
  await page.keyboard.down("d");
  await page.waitForTimeout(420);
  await page.keyboard.up("d");
  await page.keyboard.up("s");
  const after = await stage.evaluate(readPosition);
  return {
    before,
    after,
    distance: round(Math.hypot(after.x - before.x, after.y - before.y)),
    moved: Math.hypot(after.x - before.x, after.y - before.y) >= 20,
  };
}

function readPosition(stage) {
  return {
    x: Number(stage.getAttribute("data-player-x")),
    y: Number(stage.getAttribute("data-player-y")),
  };
}

function summarize(runs) {
  return {
    firstControllableMedianMs: median(runs.map((run) => run.firstControllableMs)),
    appReadyMedianMs: median(runs.map((run) => run.appReadyMs)),
    sameOriginTransferMedianBytes: median(
      runs.map((run) => run.transfer.sameOriginBytes),
    ),
    decodedMedianBytes: median(runs.map((run) => run.transfer.decodedBytes)),
    frameP95MedianMs: median(runs.map((run) => run.frames.p95Ms)),
    longFramesTotal: runs.reduce((total, run) => total + run.frames.longFrames, 0),
    maximumFrameMs: Math.max(...runs.map((run) => run.frames.maximumMs)),
  };
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? ((sorted[middle - 1] ?? 0) + (sorted[middle] ?? 0)) / 2
    : (sorted[middle] ?? 0);
}

function round(value) {
  return Number(value.toFixed(2));
}
