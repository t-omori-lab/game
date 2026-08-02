import { describe, expect, it } from "vitest";

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
const mainSource = fileSystem.readFileSync(
  new URL("../../src/main.ts", import.meta.url),
  "utf8",
);
const applicationSource = fileSystem.readFileSync(
  new URL("../../src/prototypeB/app/startPrototypeB.ts", import.meta.url),
  "utf8",
);
const rendererSource = fileSystem.readFileSync(
  new URL("../../src/prototypeB/render/PrototypeBRenderer.ts", import.meta.url),
  "utf8",
);
const styles = fileSystem.readFileSync(
  new URL("../../src/styles.css", import.meta.url),
  "utf8",
);

function sourceBetween(
  source: string,
  startMarker: string,
  endMarker: string,
): string {
  const start = source.indexOf(startMarker);
  expect(start).toBeGreaterThanOrEqual(0);
  const end = source.indexOf(endMarker, start + startMarker.length);
  expect(end).toBeGreaterThan(start);
  return source.slice(start, end);
}

function extractFunctionBody(source: string, marker: string): string {
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

  throw new Error(`Unclosed source block: ${marker}`);
}

describe("R04 R02-successor presentation contract", () => {
  it("boots the R04 route through the R02-derived application loop", () => {
    const r04Branch = sourceBetween(
      mainSource,
      'if (release === "r04")',
      'if (release === "r02")',
    );

    expect(mainSource).toContain(
      'import { startPrototypeB } from "./prototypeB/app"',
    );
    expect(r04Branch).toContain("startPrototypeB(applicationRoot");
    expect(r04Branch).toContain('experience: "r04"');
    expect(r04Branch).toContain('renderQuality: "pc-ultra"');
    expect(r04Branch).toContain("companionPreview: false");
    expect(r04Branch).toContain("semiAutoCombat: true");
    expect(r04Branch).not.toContain("startR03");
  });

  it("maps R04 to its live renderer profile without changing R02 identity", () => {
    expect(applicationSource).toContain('| "r04"');
    expect(applicationSource).toMatch(
      /cameraCompositionProfile:\s*[\s\S]*?options\.experience === "r04"\s*\? "r04"/,
    );
    expect(applicationSource).toMatch(
      /environmentProfile:\s*[\s\S]*?options\.experience === "r04" \|\| options\.experience === "r05"\s*\? "r04-live"\s*:\s*options\.experience === "beauty-cell"\s*\? "beauty-cell"/,
    );
    expect(applicationSource).toMatch(
      /dataset\.prototypeVersion\s*=\s*r05\s*\? "R05"\s*:\s*r04\s*\? "R04"/,
    );
    expect(applicationSource).toContain('root.classList.add("r04-shell")');
    expect(applicationSource).toContain(
      'layout.stage.classList.add("r04-stage")',
    );
  });

  it("gives R04 its own high-fidelity optical and desktop UI treatment", () => {
    expect(styles).toContain(
      ".north-star-shell.beauty-cell-shell.r04-shell",
    );
    expect(styles).toContain(
      ".north-star-stage.beauty-cell-stage.r04-stage .relic-world canvas",
    );
    expect(styles).toMatch(
      /\.north-star-stage\.beauty-cell-stage\.r04-stage \.relic-world canvas\s*\{[^}]*filter:\s*saturate\(/s,
    );
    expect(styles).toContain(
      ".north-star-stage.r04-stage .relic-hud__mission",
    );
    expect(styles).toMatch(
      /\.north-star-stage\.r04-stage \.relic-hud__identity,[\s\S]*?backdrop-filter:\s*blur\(/,
    );
    expect(styles).toContain(
      ".north-star-stage.r04-stage .relic-title",
    );
  });

  it("keeps PrototypeBState authoritative for movement, combat, loot, and camera", () => {
    const updateSource = extractFunctionBody(
      rendererSource,
      "public update(",
    );

    expect(applicationSource).toContain(
      "let state = createPrototypeBState(RUN_SEED)",
    );
    expect(applicationSource).toContain("stepPrototypeB(state, command)");
    expect(applicationSource).toContain(
      "stepSemiAutoCombatController(",
    );
    expect(rendererSource).toMatch(
      /public constructor\(\s*mount: HTMLElement,\s*initialState: PrototypeBState/,
    );
    expect(updateSource).toContain("state: PrototypeBState");
    expect(updateSource).toContain("this.syncPlayer(state");
    expect(updateSource).toContain("this.syncEnemies(state)");
    expect(updateSource).toContain("this.syncLoot(state)");
    expect(updateSource).toContain("this.updateCamera(state");
    expect(mainSource).not.toContain('from "./r03/');
  });
});
