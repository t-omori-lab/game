import { describe, expect, it } from "vitest";

import { isNorthStarDebugEnabled } from "../../src/prototypeB/app/startPrototypeB";

type NodeFs = {
  readFileSync(path: URL, encoding: "utf8"): string;
};

type NodeProcess = {
  getBuiltinModule(name: "fs"): NodeFs;
};

const nodeGlobal = globalThis as typeof globalThis & {
  readonly process: NodeProcess;
};
const fileSystem = nodeGlobal.process.getBuiltinModule("fs");
const styles = fileSystem.readFileSync(
  new URL("../../src/styles.css", import.meta.url),
  "utf8",
);
const applicationSource = fileSystem.readFileSync(
  new URL("../../src/prototypeB/app/startPrototypeB.ts", import.meta.url),
  "utf8",
);

function extractBlock(source: string, marker: string): string {
  const markerIndex = source.indexOf(marker);
  expect(markerIndex).toBeGreaterThanOrEqual(0);
  const openIndex = source.indexOf("{", markerIndex);
  expect(openIndex).toBeGreaterThan(markerIndex);

  let depth = 0;
  for (let index = openIndex; index < source.length; index += 1) {
    const character = source[index];
    if (character === "{") {
      depth += 1;
    } else if (character === "}") {
      depth -= 1;
      if (depth === 0) {
        return source.slice(markerIndex, index + 1);
      }
    }
  }

  throw new Error(`Unclosed CSS block: ${marker}`);
}

describe("North Star presentation policy", () => {
  it("enables diagnostic chrome only for an explicit debug=1 query", () => {
    expect(isNorthStarDebugEnabled("?prototype=north-star")).toBe(false);
    expect(
      isNorthStarDebugEnabled("?prototype=north-star&debug=1"),
    ).toBe(true);
    expect(isNorthStarDebugEnabled("?debug=0&debug=1")).toBe(true);

    expect(applicationSource).toContain(
      'layout.stage.classList.toggle("is-north-star-debug", debugEnabled)',
    );
    expect(applicationSource).toContain(
      'layout.stage.dataset.debug = debugEnabled ? "1" : "0"',
    );
    expect(applicationSource).toContain(
      "layout.performance.hidden = !debugEnabled",
    );
    expect(applicationSource).toContain("badge.hidden = !debugEnabled");
    expect(applicationSource).toContain(
      'layout.stage.dataset.presentationState = "intro"',
    );
    expect(applicationSource).toContain(
      'layout.stage.dataset.presentationState = "active"',
    );
  });

  it("removes touch chrome only from the North Star fine-pointer layout", () => {
    const desktopPolicy = extractBlock(
      styles,
      "@media (hover: hover) and (pointer: fine)",
    );
    const controlsRule = extractBlock(
      desktopPolicy,
      ".north-star-stage .relic-controls",
    );

    expect(controlsRule).toMatch(/display:\s*none/);
    expect(desktopPolicy).not.toMatch(/\n\s*\.relic-controls\s*\{/);
    expect(desktopPolicy).toContain(".north-star-stage .relic-hud");
    expect(desktopPolicy).toContain(".north-star-stage .relic-loadout");
    expect(desktopPolicy).toContain(
      '.north-star-stage[data-presentation-state="intro"] .relic-hud',
    );
  });

  it("keeps the title world-first and the combat readout silent while idle", () => {
    const desktopPolicy = extractBlock(
      styles,
      "@media (hover: hover) and (pointer: fine)",
    );
    const titleRule = extractBlock(
      desktopPolicy,
      ".north-star-stage .relic-title",
    );
    const idleRule = extractBlock(
      styles,
      '.north-star-combat-readout[data-phase="idle"]',
    );

    expect(titleRule).toContain("left / 40% 100% no-repeat");
    expect(titleRule).toMatch(/backdrop-filter:\s*none/);
    expect(desktopPolicy).toContain(
      ".north-star-stage .relic-title__catalog",
    );
    expect(idleRule).toMatch(/visibility:\s*hidden/);
    expect(idleRule).toMatch(/opacity:\s*0/);
    expect(applicationSource).toContain('recover: "RECOVER"');
    expect(applicationSource).not.toContain("RECOVER / REPOSITION");
  });
});
