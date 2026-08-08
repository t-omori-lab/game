#!/usr/bin/env node

import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const url = process.argv[2] ?? "http://127.0.0.1:4174/game/r09/";
const outputDirectory = resolve(
  "work/r09a_first_memory_logic_2026-08-08/evidence/browser",
);
const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const executablePath = existsSync(chromium.executablePath())
  ? chromium.executablePath()
  : chrome;
const scenarios = [
  { site: "canopy-relay", module: "pathfinder-array" },
  { site: "canopy-relay", module: "relic-overdrive" },
  { site: "flooded-archive", module: "pathfinder-array" },
  { site: "flooded-archive", module: "relic-overdrive" },
];

await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath });
const results = [];
let retreatResult;

try {
  for (const scenario of scenarios) {
    process.stdout.write(`R09 ${scenario.site} + ${scenario.module}: start\n`);
    const context = await browser.newContext({
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

    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(
      () => document.querySelector("#app")?.getAttribute("data-boot-state") === "ready",
      undefined,
      { timeout: 60_000 },
    );
    await page.getByTestId("start-game").click();
    await page.waitForFunction(
      () => document.querySelector('[data-testid="game-stage"]')?.getAttribute("data-presentation-state") === "active",
    );

    if (scenario.site === "canopy-relay") {
      await followWaypoints(page, [
        [900, 900],
        [1_260, 900],
        [1_520, 900],
        [1_640, 1_105],
      ]);
    } else {
      await followWaypoints(page, [
        [900, 900],
        [1_300, 900],
        [1_800, 900],
        [2_250, 900],
        [2_610, 900],
        [2_400, 900],
        [2_350, 1_030],
      ]);
    }
    await page.keyboard.press("e");
    await page.waitForFunction(
      (site) => {
        const stage = document.querySelector('[data-testid="game-stage"]');
        const ledger = document.querySelector(".r09-memory-ledger");
        return stage?.getAttribute("data-memory-discovered")?.includes(site) === true &&
          ledger?.textContent?.includes("REC 1") === true;
      },
      scenario.site,
    );

    await followWaypoints(
      page,
      scenario.site === "canopy-relay"
        ? [[1_450, 950], [1_050, 900], [700, 900], [565, 900, 20]]
        : [[2_250, 900], [1_800, 900], [1_300, 900], [850, 900], [565, 900, 20]],
    );
    await page.keyboard.press("e");
    await page.waitForFunction(
      () => document.querySelector('[data-testid="game-stage"]')?.getAttribute("data-memory-phase") === "choosing-base",
    );
    await page.getByRole("button", {
      name: scenario.site === "canopy-relay" ? /樹冠中継所/ : /沈水資料庫/,
    }).click();
    await page.waitForFunction(
      () => document.querySelector('[data-testid="game-stage"]')?.getAttribute("data-memory-phase") === "choosing-module",
    );
    await page.getByRole("button", {
      name: scenario.module === "pathfinder-array" ? /経路観測列/ : /遺物過励器/,
    }).click();
    await page.waitForFunction(
      () => document.querySelector('[data-testid="game-stage"]')?.getAttribute("data-memory-phase") === "ended",
      undefined,
      { timeout: 20_000 },
    );

    const firstExpedition = await readMemoryContract(page);
    assertEqual(firstExpedition.saved, "1", "first expedition save count");
    assertEqual(firstExpedition.module, scenario.module, "installed module");
    assertAtLeast(firstExpedition.autoBasicEvents, 1, "auto-basic events");
    assertAtLeast(firstExpedition.manualSkillEvents, 1, "manual skill events");
    await page.waitForTimeout(450);
    await page.screenshot({
      path: `${outputDirectory}/${scenario.site}-${scenario.module}-result.png`,
      type: "png",
    });

    await page.getByRole("button", { name: /二回目へ/ }).click();
    await page.waitForFunction(
      () => {
        const stage = document.querySelector('[data-testid="game-stage"]');
        return stage?.getAttribute("data-memory-phase") === "exploring" &&
          stage?.getAttribute("data-memory-expedition") === "expedition-2";
      },
    );
    const secondExpedition = await readMemoryContract(page);
    verifyModuleEffect(secondExpedition, scenario.module);
    await page.waitForTimeout(450);
    await page.screenshot({
      path: `${outputDirectory}/${scenario.site}-${scenario.module}-second.png`,
      type: "png",
    });

    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForFunction(
      () => document.querySelector("#app")?.getAttribute("data-boot-state") === "ready",
      undefined,
      { timeout: 60_000 },
    );
    await page.getByTestId("start-game").click();
    const reloaded = await readMemoryContract(page);
    verifyModuleEffect(reloaded, scenario.module);
    assertEqual(reloaded.saved, "1", "reload save count");
    assertEqual(reloaded.loadSource, "loaded", "reload source");
    if (consoleErrors.length > 0 || pageErrors.length > 0) {
      throw new Error(
        `Browser errors: ${JSON.stringify({ consoleErrors, pageErrors })}`,
      );
    }

    results.push({
      ...scenario,
      status: "passed",
      firstExpedition,
      secondExpedition,
      reloaded,
      consoleErrors,
      pageErrors,
    });
    await context.close();
    process.stdout.write(`R09 ${scenario.site} + ${scenario.module}: passed\n`);
  }
  retreatResult = await proveRetreat(browser);
} finally {
  await browser.close();
}

await writeFile(
  `${outputDirectory}/r09-memory-loop.json`,
  `${JSON.stringify(
    {
      schemaVersion: 1,
      gate: "r09-first-memory-loop-browser",
      status:
        results.length === scenarios.length && retreatResult?.status === "passed"
          ? "passed"
          : "failed",
      measuredAt: new Date().toISOString(),
      url,
      viewport: { width: 1_280, height: 720, deviceScaleFactor: 1 },
      browserExecutable: executablePath,
      results,
      retreatResult,
    },
    null,
    2,
  )}\n`,
  "utf8",
);
process.stdout.write(
  `R09 browser gate: ${results.length}/${scenarios.length} branches + retreat passed\n`,
);

async function followWaypoints(page, waypoints) {
  for (const [x, y, tolerance] of waypoints) {
    await moveTo(page, x, y, tolerance);
  }
}

async function moveTo(page, targetX, targetY, tolerance = 62) {
  const deadline = Date.now() + 24_000;
  let stalled = 0;
  let previousDistance = Number.POSITIVE_INFINITY;
  let iteration = 0;

  while (Date.now() < deadline) {
    const position = await page.locator('[data-testid="game-stage"]').evaluate(
      (stage) => ({
        x: Number(stage.getAttribute("data-player-x")),
        y: Number(stage.getAttribute("data-player-y")),
        status: stage.getAttribute("data-status"),
      }),
    );
    if (position.status !== "playing") {
      throw new Error(`Player stopped before waypoint: ${JSON.stringify(position)}`);
    }
    const dx = targetX - position.x;
    const dy = targetY - position.y;
    const distance = Math.hypot(dx, dy);
    if (distance <= tolerance) return;

    stalled = distance >= previousDistance - 2 ? stalled + 1 : 0;
    previousDistance = distance;
    const screenX = (dx - dy) / Math.SQRT2;
    const screenY = (dx + dy) / Math.SQRT2;
    const keys = [];
    if (screenX > 22) keys.push("d");
    if (screenX < -22) keys.push("a");
    if (screenY > 22) keys.push("s");
    if (screenY < -22) keys.push("w");
    if (stalled >= 5) {
      keys.length = 0;
      keys.push(iteration % 2 === 0 ? "w" : "s");
      stalled = 0;
    }
    for (const key of keys) await page.keyboard.down(key);
    await page.waitForTimeout(220);
    for (const key of keys.reverse()) await page.keyboard.up(key);
    if (iteration % 10 === 0) await page.keyboard.press("q");
    if (iteration % 18 === 0) await page.keyboard.press("r");
    iteration += 1;
  }
  throw new Error(`Timed out moving to ${targetX},${targetY}`);
}

async function readMemoryContract(page) {
  return page.evaluate(() => {
    const root = document.querySelector("#app");
    const stage = document.querySelector('[data-testid="game-stage"]');
    const canvas = document.querySelector('[data-testid="game-world"] canvas');
    if (!(root instanceof HTMLElement) || !(stage instanceof HTMLElement)) {
      throw new Error("R09 memory contract elements are missing.");
    }
    return {
      loadSource: root.dataset.memoryLoadSource,
      persistence: root.dataset.memoryPersistence,
      phase: stage.dataset.memoryPhase,
      expedition: stage.dataset.memoryExpedition,
      discovered: stage.dataset.memoryDiscovered,
      module: stage.dataset.memoryModule,
      base: stage.dataset.memoryBase,
      recovered: stage.dataset.memoryRecovered,
      lastEndReason: stage.dataset.memoryLastEndReason,
      visualCue: stage.dataset.memoryVisualCue,
      gameplayCue: stage.dataset.memoryGameplayCue,
      canvasVisualCue: canvas instanceof HTMLElement
        ? canvas.dataset.worldMemoryVisualCue
        : undefined,
      playerSpeed: Number(stage.dataset.playerSpeed),
      relicCooldownMaxTicks: Number(stage.dataset.relicCooldownMaxTicks),
      saved: stage.dataset.memorySaved,
      autoBasicEvents: Number(stage.dataset.memoryAutoBasicEvents),
      manualSkillEvents: Number(stage.dataset.memoryManualSkillEvents),
    };
  });
}

function verifyModuleEffect(contract, module) {
  if (module === "pathfinder-array") {
    assertEqual(contract.visualCue, "route-overlay", "pathfinder visual cue");
    assertEqual(contract.canvasVisualCue, "route-overlay", "pathfinder 3D cue");
    assertEqual(contract.gameplayCue, "exploration-speed", "pathfinder gameplay cue");
    assertEqual(contract.playerSpeed, 181, "pathfinder player speed");
    assertEqual(contract.relicCooldownMaxTicks, 150, "pathfinder relic cooldown");
    return;
  }
  assertEqual(contract.visualCue, "relic-aura", "overdrive visual cue");
  assertEqual(contract.canvasVisualCue, "relic-aura", "overdrive 3D cue");
  assertEqual(contract.gameplayCue, "relic-cooldown", "overdrive gameplay cue");
  assertEqual(contract.playerSpeed, 162, "overdrive player speed");
  assertEqual(contract.relicCooldownMaxTicks, 98, "overdrive relic cooldown");
}

async function proveRetreat(browserInstance) {
  process.stdout.write("R09 retreat: start\n");
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

  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(
    () => document.querySelector("#app")?.getAttribute("data-boot-state") === "ready",
    undefined,
    { timeout: 60_000 },
  );
  await page.getByTestId("start-game").click();
  await followWaypoints(page, [
    [900, 900],
    [1_260, 900],
    [1_520, 900],
    [1_640, 1_105],
  ]);
  await page.keyboard.press("e");
  await page.waitForFunction(
    () => document.querySelector('[data-testid="game-stage"]')?.getAttribute("data-memory-recovered")?.includes("relic:pickup-gravity-weight:available") === true,
  );
  await page.getByRole("button", { name: /撤退して持ち帰る/ }).click();
  await page.waitForFunction(
    () => document.querySelector('[data-testid="game-stage"]')?.getAttribute("data-memory-phase") === "ended",
  );
  const ended = await readMemoryContract(page);
  assertEqual(ended.module, "none", "retreat module");
  assertEqual(ended.base, "none", "retreat base");
  assertEqual(ended.lastEndReason, "retreated", "retreat reason");
  assertEqual(ended.saved, "1", "retreat save count");
  if (!ended.recovered?.includes("relic:pickup-gravity-weight:available")) {
    throw new Error(`retreat recovered item missing: ${ended.recovered}`);
  }

  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForFunction(
    () => document.querySelector("#app")?.getAttribute("data-boot-state") === "ready",
    undefined,
    { timeout: 60_000 },
  );
  await page.getByTestId("start-game").click();
  const reloaded = await readMemoryContract(page);
  assertEqual(reloaded.loadSource, "loaded", "retreat reload source");
  assertEqual(reloaded.module, "none", "retreat reload module");
  assertEqual(reloaded.base, "none", "retreat reload base");
  assertEqual(reloaded.lastEndReason, "retreated", "retreat reload reason");
  if (!reloaded.recovered?.includes("relic:pickup-gravity-weight:available")) {
    throw new Error(`retreat reload item missing: ${reloaded.recovered}`);
  }
  if (consoleErrors.length > 0 || pageErrors.length > 0) {
    throw new Error(
      `Retreat browser errors: ${JSON.stringify({ consoleErrors, pageErrors })}`,
    );
  }
  await context.close();
  process.stdout.write("R09 retreat: passed\n");
  return {
    status: "passed",
    ended,
    reloaded,
    consoleErrors,
    pageErrors,
  };
}

function assertEqual(actual, expected, label) {
  if (actual !== expected) {
    throw new Error(`${label}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

function assertAtLeast(actual, minimum, label) {
  if (!Number.isFinite(actual) || actual < minimum) {
    throw new Error(`${label}: expected at least ${minimum}, got ${JSON.stringify(actual)}`);
  }
}
