#!/usr/bin/env node

import { createRequire } from "node:module";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const url = process.argv[2] ?? "http://127.0.0.1:4176/game/r09/";
const outputDirectory = resolve("output/playwright/f01r-fidelity");
const executablePath = existsSync(chromium.executablePath())
  ? chromium.executablePath()
  : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const viewports = [
  { width: 1_280, height: 720, label: "1280x720" },
  { width: 2_560, height: 1_440, label: "2560x1440" },
];

await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath });
const captures = [];

try {
  for (const viewport of viewports) {
    captures.push(await captureRuntimeActor(browser, viewport));
  }
  captures.push(await captureLegacyFallback(browser, viewports[0]));
  captures.push(await captureForgeF01R(browser, viewports[0]));
} finally {
  await browser.close();
}

const runtimeCapture = captures.find((capture) => capture.kind === "runtime");
const forgeCapture = captures.find((capture) => capture.kind === "forge-f01r");
const sameCompiledPack =
  runtimeCapture?.contract.heroAssetId === forgeCapture?.contract.heroAssetId &&
  runtimeCapture?.contract.heroPackDigest === forgeCapture?.contract.heroPackDigest &&
  runtimeCapture?.contract.heroSourceDigest === forgeCapture?.contract.heroSourceDigest;
const status = sameCompiledPack && captures.every(
  (capture) =>
    capture.consoleErrors.length === 0 && capture.pageErrors.length === 0,
)
  ? "passed"
  : "failed";
const report = {
  schemaVersion: 1,
  gate: "f01r-source-faithful-character-bridge",
  status,
  measuredAt: new Date().toISOString(),
  url,
  browserExecutable: executablePath,
  sameCompiledPack,
  captures,
};
await writeFile(
  `${outputDirectory}/f01r-fidelity.json`,
  `${JSON.stringify(report, null, 2)}\n`,
  "utf8",
);
process.stdout.write(
  `${JSON.stringify({ status, captures: captures.map(compactCapture) }, null, 2)}\n`,
);
if (status !== "passed") process.exitCode = 1;

async function captureRuntimeActor(browserInstance, viewport) {
  const { context, page, consoleErrors, pageErrors } = await openR09(
    browserInstance,
    url,
    viewport,
  );
  const prefix = `${outputDirectory}/${viewport.label}`;
  await page.waitForTimeout(650);
  await page.screenshot({ path: `${prefix}-idle.png`, type: "png" });

  // Screen-down maps onto the camera offset, producing a direct gameplay
  // front read without mutating simulation state from outside normal input.
  await page.keyboard.down("s");
  await page.waitForTimeout(180);
  await page.screenshot({ path: `${prefix}-front-read.png`, type: "png" });
  await page.keyboard.up("s");
  await page.waitForTimeout(650);
  await page.screenshot({ path: `${prefix}-front-settled.png`, type: "png" });

  // The request board has deliberate collision edges. Move onto the already
  // proven central road before measuring all four directions so collision
  // does not masquerade as a facing failure.
  await moveTo(page, 700, 900, 72);
  const directionEvidence = await proveFourDirectionMovement(
    page,
    prefix,
  );

  await page.keyboard.down("d");
  await page.waitForTimeout(180);
  await page.screenshot({ path: `${prefix}-run.png`, type: "png" });
  await page.keyboard.up("d");

  await page.keyboard.down("s");
  await page.waitForTimeout(120);
  await page.keyboard.up("s");
  await page.waitForTimeout(260);
  await page.keyboard.press("q");
  await page.waitForTimeout(180);
  await page.screenshot({ path: `${prefix}-skill.png`, type: "png" });

  await page.keyboard.press("1");
  await page.waitForTimeout(180);
  await page.screenshot({ path: `${prefix}-impact-tool.png`, type: "png" });

  await moveTo(page, 900, 900, 82);
  await page.waitForFunction(
    () =>
      Number(
        document.querySelector('[data-testid="game-stage"]')?.getAttribute(
          "data-memory-auto-basic-events",
        ) ?? "0",
      ) > 0,
    undefined,
    { timeout: 12_000 },
  );
  await page.waitForTimeout(90);
  await page.screenshot({ path: `${prefix}-combat.png`, type: "png" });
  const contract = await readContract(page);
  await context.close();

  assertEqual(contract.rootHeroAssetLoadStatus, "loaded", "root load status");
  assertEqual(contract.heroAssetSource, "runtime", "runtime source");
  assertEqual(contract.heroAssetStatus, "loaded", "runtime status");
  assertEqual(
    contract.heroAssetId,
    "fram.character.f01r.source-faithful-head-v1",
    "runtime asset id",
  );
  if (Number(contract.heroVoxelCells) < 8_000) {
    throw new Error(
      `F-01R semantic surface is incomplete: ${contract.heroVoxelCells}`,
    );
  }
  if (
    contract.heroPackDigest?.length !== 64 ||
    contract.heroSourceDigest?.length !== 64 ||
    Number(contract.heroModuleCount) < 15
  ) {
    throw new Error(`F-01R provenance contract is incomplete: ${JSON.stringify(contract)}`);
  }
  if (contract.autoBasicEvents < 1 || contract.manualSkillEvents < 1) {
    throw new Error(`Combat evidence missing: ${JSON.stringify(contract)}`);
  }
  if (consoleErrors.length > 0 || pageErrors.length > 0) {
    throw new Error(
      `Browser errors: ${JSON.stringify({ consoleErrors, pageErrors })}`,
    );
  }
  return {
    kind: "runtime",
    viewport,
    contract,
    directionEvidence,
    screenshots: [
      `${viewport.label}-idle.png`,
      `${viewport.label}-front-read.png`,
      `${viewport.label}-front-settled.png`,
      `${viewport.label}-facing-up.png`,
      `${viewport.label}-facing-left.png`,
      `${viewport.label}-facing-down.png`,
      `${viewport.label}-facing-right.png`,
      `${viewport.label}-run.png`,
      `${viewport.label}-skill.png`,
      `${viewport.label}-impact-tool.png`,
      `${viewport.label}-combat.png`,
    ],
    consoleErrors,
    pageErrors,
  };
}

async function proveFourDirectionMovement(page, prefix) {
  const directions = [
    {
      key: "w",
      label: "up",
      facingX: -Math.SQRT1_2,
      facingY: -Math.SQRT1_2,
      renderedYaw: -Math.PI * 0.75,
    },
    {
      key: "a",
      label: "left",
      facingX: -Math.SQRT1_2,
      facingY: Math.SQRT1_2,
      renderedYaw: -Math.PI * 0.25,
    },
    {
      key: "s",
      label: "down",
      facingX: Math.SQRT1_2,
      facingY: Math.SQRT1_2,
      renderedYaw: Math.PI * 0.25,
    },
    {
      key: "d",
      label: "right",
      facingX: Math.SQRT1_2,
      facingY: -Math.SQRT1_2,
      renderedYaw: Math.PI * 0.75,
    },
  ];
  const evidence = [];

  for (const direction of directions) {
    const before = await readPoseContract(page);
    await page.keyboard.down(direction.key);
    await page.waitForTimeout(220);
    const after = await readPoseContract(page);
    await page.screenshot({
      path: `${prefix}-facing-${direction.label}.png`,
      type: "png",
    });
    await page.keyboard.up(direction.key);
    await page.waitForTimeout(90);

    const deltaX = after.playerX - before.playerX;
    const deltaY = after.playerY - before.playerY;
    const distance = Math.hypot(deltaX, deltaY);
    const facingLength = Math.hypot(after.facingX, after.facingY);
    const alignment =
      distance > 0 && facingLength > 0
        ? (deltaX * after.facingX + deltaY * after.facingY) /
          (distance * facingLength)
        : 0;
    const movesForward =
      deltaX * after.facingX + deltaY * after.facingY > 0;
    const facingMatches =
      Math.abs(after.facingX - direction.facingX) < 0.002 &&
      Math.abs(after.facingY - direction.facingY) < 0.002;
    const renderedYawMatches =
      Math.abs(after.heroFacingRadians - direction.renderedYaw) < 0.002;
    if (
      distance < 10 ||
      !movesForward ||
      !facingMatches ||
      !renderedYawMatches
    ) {
      throw new Error(
        `Direction ${direction.label} did not match movement, simulation facing and rendered yaw: ${JSON.stringify({ before, after, distance, alignment, movesForward, facingMatches, renderedYawMatches })}`,
      );
    }
    evidence.push({
      ...direction,
      before,
      after,
      distance: Math.round(distance * 10) / 10,
      alignment: Math.round(alignment * 1_000) / 1_000,
      movesForward,
    });
  }

  const distinctRenderedDirections = new Set(
    evidence.map((entry) => entry.after.heroFacingRadians),
  ).size;
  if (distinctRenderedDirections !== directions.length) {
    throw new Error(
      `Expected four rendered actor directions, received ${distinctRenderedDirections}.`,
    );
  }
  return evidence;
}

async function readPoseContract(page) {
  return page.evaluate(() => {
    const stage = document.querySelector('[data-testid="game-stage"]');
    const canvas = document.querySelector('[data-testid="game-world"] canvas');
    if (!(stage instanceof HTMLElement) || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error("R09 pose contract elements are missing.");
    }
    return {
      playerX: Number(stage.dataset.playerX),
      playerY: Number(stage.dataset.playerY),
      facingX: Number(stage.dataset.playerFacingX),
      facingY: Number(stage.dataset.playerFacingY),
      heroFacingRadians: Number(canvas.dataset.heroFacingRadians),
    };
  });
}

async function captureLegacyFallback(browserInstance, viewport) {
  const fallbackUrl = new URL(url);
  fallbackUrl.searchParams.set("actor", "legacy");
  const { context, page, consoleErrors, pageErrors } = await openR09(
    browserInstance,
    fallbackUrl.href,
    viewport,
  );
  await page.waitForTimeout(500);
  await page.screenshot({
    path: `${outputDirectory}/${viewport.label}-legacy-fallback.png`,
    type: "png",
  });
  const contract = await readContract(page);
  await context.close();

  assertEqual(contract.rootHeroAssetLoadStatus, "disabled", "fallback load status");
  assertEqual(contract.heroAssetSource, "built-in", "fallback source");
  assertEqual(contract.heroAssetStatus, "disabled", "fallback status");
  if (consoleErrors.length > 0 || pageErrors.length > 0) {
    throw new Error(
      `Fallback browser errors: ${JSON.stringify({ consoleErrors, pageErrors })}`,
    );
  }
  return {
    kind: "legacy-fallback",
    viewport,
    contract,
    screenshots: [`${viewport.label}-legacy-fallback.png`],
    consoleErrors,
    pageErrors,
  };
}

async function captureForgeF01R(browserInstance, viewport) {
  const forgeUrl = new URL("../forge/f01/", url);
  forgeUrl.searchParams.set("candidate", "f01r");
  const context = await browserInstance.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    screen: { width: viewport.width, height: viewport.height },
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
  await page.goto(forgeUrl.href, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(
    () =>
      document.querySelector("#app")?.getAttribute(
        "data-character-candidate",
      ) === "f01r" &&
      document.querySelector("[data-loading]")?.classList.contains(
        "is-complete",
      ) === true,
    undefined,
    { timeout: 60_000 },
  );
  await page.locator('[data-view="back"]').click();
  await page.waitForTimeout(500);
  await page.screenshot({
    path: `${outputDirectory}/${viewport.label}-forge-f01r-back.png`,
    type: "png",
  });
  await page.locator('[data-distance="field"]').click();
  await page.waitForTimeout(700);
  await page.screenshot({
    path: `${outputDirectory}/${viewport.label}-forge-f01r-field.png`,
    type: "png",
  });
  const contract = await page.evaluate(() => {
    const root = document.querySelector("#app");
    const cellCount = document.querySelector("[data-cell-count]")?.textContent;
    if (!(root instanceof HTMLElement) || cellCount === null || cellCount === undefined) {
      throw new Error("F-01R Forge contract elements are missing.");
    }
    return {
      heroAssetSource: "forge-shared",
      heroAssetStatus: root.dataset.characterCandidate,
      heroAssetId: root.dataset.assetId,
      heroPackDigest: root.dataset.packDigest,
      heroSourceDigest: root.dataset.sourceDigest,
      heroModuleCount: root.dataset.moduleCount,
      heroVoxelCells: cellCount.replaceAll(",", ""),
      autoBasicEvents: 0,
      manualSkillEvents: 0,
      actorViewportHeight: root.dataset.actorViewportHeight,
    };
  });
  await context.close();
  if (
    contract.heroAssetId !== "fram.character.f01r.source-faithful-head-v1" ||
    Number(contract.heroVoxelCells) < 8_000 ||
    contract.heroPackDigest?.length !== 64 ||
    contract.heroSourceDigest?.length !== 64 ||
    Number(contract.heroModuleCount) < 15
  ) {
    throw new Error(`Forge did not expose the F-01R pack: ${JSON.stringify(contract)}`);
  }
  if (consoleErrors.length > 0 || pageErrors.length > 0) {
    throw new Error(
      `F-01R Forge browser errors: ${JSON.stringify({ consoleErrors, pageErrors })}`,
    );
  }
  return {
    kind: "forge-f01r",
    viewport,
    contract,
    screenshots: [
      `${viewport.label}-forge-f01r-back.png`,
      `${viewport.label}-forge-f01r-field.png`,
    ],
    consoleErrors,
    pageErrors,
  };
}

async function openR09(browserInstance, targetUrl, viewport) {
  const context = await browserInstance.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    screen: { width: viewport.width, height: viewport.height },
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
  await page.goto(targetUrl, { waitUntil: "domcontentloaded" });
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
      return stage?.getAttribute("data-presentation-state") === "active" &&
        stage?.getAttribute("data-status") === "playing" &&
        canvas instanceof HTMLCanvasElement &&
        canvas.width > 0 &&
        canvas.height > 0;
    },
    undefined,
    { timeout: 60_000 },
  );
  return { context, page, consoleErrors, pageErrors };
}

async function moveTo(page, targetX, targetY, tolerance) {
  const deadline = Date.now() + 30_000;
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
      throw new Error(`Player stopped before combat: ${JSON.stringify(position)}`);
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
    await page.waitForTimeout(180);
    for (const key of keys.reverse()) await page.keyboard.up(key);
    iteration += 1;
  }
  throw new Error(`Timed out moving to ${targetX},${targetY}`);
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
      throw new Error("R09 character bridge contract elements are missing.");
    }
    return {
      rootHeroAssetLoadStatus: root.dataset.heroAssetLoadStatus,
      heroAssetSource: canvas.dataset.heroAssetSource,
      heroAssetStatus: canvas.dataset.heroAssetStatus,
      heroAssetId: canvas.dataset.heroAssetId,
      heroPackDigest: canvas.dataset.heroPackDigest,
      heroSourceDigest: canvas.dataset.heroSourceDigest,
      heroModuleCount: canvas.dataset.heroModuleCount,
      heroRepresentation: canvas.dataset.heroRepresentation,
      heroVoxelCells: canvas.dataset.heroVoxelCells,
      heroCharacterPreset: canvas.dataset.heroCharacterPreset,
      weapon: stage.dataset.weapon,
      playerX: Number(stage.dataset.playerX),
      playerY: Number(stage.dataset.playerY),
      autoBasicEvents: Number(stage.dataset.memoryAutoBasicEvents),
      manualSkillEvents: Number(stage.dataset.memoryManualSkillEvents),
      internalResolution: canvas.dataset.internalResolution,
    };
  });
}

function compactCapture(capture) {
  return {
    kind: capture.kind,
    viewport: capture.viewport,
    heroAssetSource: capture.contract.heroAssetSource,
    heroAssetStatus: capture.contract.heroAssetStatus,
    heroAssetId: capture.contract.heroAssetId,
    heroPackDigest: capture.contract.heroPackDigest,
    autoBasicEvents: capture.contract.autoBasicEvents,
    manualSkillEvents: capture.contract.manualSkillEvents,
    consoleErrors: capture.consoleErrors.length,
    pageErrors: capture.pageErrors.length,
  };
}

function assertEqual(actual, expected, label) {
  if (actual !== expected) {
    throw new Error(`${label}: expected ${expected}, received ${actual}`);
  }
}
