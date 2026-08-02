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
const applicationSource = fileSystem.readFileSync(
  new URL("../../src/prototypeB/app/startPrototypeB.ts", import.meta.url),
  "utf8",
);
const rendererSource = fileSystem.readFileSync(
  new URL("../../src/prototypeB/render/PrototypeBRenderer.ts", import.meta.url),
  "utf8",
);
const pipelineSource = fileSystem.readFileSync(
  new URL("../../src/prototypeB/render/UltraRenderPipeline.ts", import.meta.url),
  "utf8",
);
const styles = fileSystem.readFileSync(
  new URL("../../src/styles.css", import.meta.url),
  "utf8",
);

describe("R02 Beauty Cell presentation contract", () => {
  it("keeps R02 as a distinct experience and environment profile", () => {
    expect(applicationSource).toContain('| "beauty-cell"');
    expect(applicationSource).toContain(
      'const beautyCell = options.experience === "beauty-cell"',
    );
    expect(applicationSource).toMatch(
      /environmentProfile:\s*[\s\S]*?options\.experience === "r04"[\s\S]*?options\.experience === "r06"[\s\S]*?\? "r04-live"\s*:\s*options\.experience === "beauty-cell"\s*\? "beauty-cell"/,
    );
    expect(applicationSource).toMatch(
      /dataset\.prototypeVersion\s*=\s*r06\s*\? "R06"\s*:\s*r05\s*\? "R05"[\s\S]*?r04\s*\? "R04"[\s\S]*?beautyCell\s*\? "R02"\s*:\s*"R01"/,
    );
    expect(rendererSource).toContain('| "beauty-cell"');
    expect(rendererSource).toContain(
      "Always render every terrain/prop that its art",
    );
    const growthIndex = rendererSource.indexOf("this.createFieldGrowth(");
    const terrainIndex = rendererSource.indexOf("this.createTerrain(");
    expect(growthIndex).toBeGreaterThan(-1);
    expect(terrainIndex).toBeGreaterThan(growthIndex);
    expect(rendererSource.slice(growthIndex, terrainIndex)).toContain(
      "route can never continue through invisible legacy geometry.",
    );
  });

  it("enables fixed-camera depth separation only for the Beauty Cell", () => {
    expect(rendererSource).toContain(
      "tiltShift: !this.sharpPresentation",
    );
    expect(rendererSource).toContain(
      'this.environmentProfile === "beauty-cell"',
    );
    expect(pipelineSource).toContain("HorizontalTiltShiftShader");
    expect(pipelineSource).toContain("VerticalTiltShiftShader");
    expect(pipelineSource).toContain("syncTiltShiftUniforms");
    expect(rendererSource).toContain("dataset.ultraTiltShift");
  });

  it("uses smooth scaling and an R02-specific optical/UI treatment", () => {
    expect(styles).toContain(
      ".north-star-stage.beauty-cell-stage .relic-world canvas",
    );
    expect(styles).toContain("image-rendering: auto");
    expect(styles).toContain("saturate(1.18) contrast(1.055)");
    expect(styles).toContain(
      ".north-star-stage.beauty-cell-stage .relic-title",
    );
  });
});
