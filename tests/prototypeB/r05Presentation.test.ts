import { describe, expect, it } from "vitest";
import { R05_FRAM_PROFILE } from "../../src/prototypeB/render/r05/R05FramProfile";

type NodeFs = { readFileSync(path: URL, encoding: "utf8"): string };
type NodeProcess = { getBuiltinModule(name: "fs"): NodeFs };
const fileSystem = (globalThis as typeof globalThis & {
  readonly process: NodeProcess;
}).process.getBuiltinModule("fs");
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
const pipelineSource = fileSystem.readFileSync(
  new URL("../../src/prototypeB/render/UltraRenderPipeline.ts", import.meta.url),
  "utf8",
);

describe("F.R.A.M. R05 presentation contract", () => {
  it("keeps the R04 causal environment but selects an independent presentation", () => {
    expect(mainSource).toContain('if (release === "r05")');
    expect(mainSource).toContain('experience: "r05"');
    expect(applicationSource).toContain('presentationProfile: options.experience === "r05"');
    expect(applicationSource).toContain('? "r05-fram"');
    expect(applicationSource).toContain('options.experience === "r04" || options.experience === "r05"');
    expect(rendererSource).toContain("createR04ArtSlice()");
    expect(rendererSource).toContain("createR05ConceptCArtSlice()");
    expect(rendererSource).toContain("createR05FramHeroVisual()");
    expect(rendererSource).toContain("dataset.heroRepresentation");
    expect(rendererSource).toContain("dataset.heroVoxelCells");
  });

  it("uses a wide playable field and restrained miniature-depth optics", () => {
    expect(R05_FRAM_PROFILE.camera.viewHeight).toBeGreaterThan(600);
    expect(R05_FRAM_PROFILE.camera.viewHeight).toBeGreaterThan(540);
    expect(R05_FRAM_PROFILE.post.tiltShiftMode).toBe("banded");
    expect(R05_FRAM_PROFILE.post.tiltShiftClearBand).toBeGreaterThanOrEqual(0.26);
    expect(R05_FRAM_PROFILE.post.tiltShiftNearBlurPixels).toBeLessThan(10);
    expect(R05_FRAM_PROFILE.post.tiltShiftNearBlurPixels).toBeGreaterThan(
      R05_FRAM_PROFILE.post.tiltShiftFarBlurPixels,
    );
    expect(pipelineSource).toContain("BandedTiltShiftShader");
    expect(pipelineSource).toContain("clearBand");
    expect(pipelineSource).toContain("nearBlur");
    expect(pipelineSource).toContain("farBlur");
  });

  it("makes F.R.A.M. the protagonist identity rather than a decorative label", () => {
    expect(R05_FRAM_PROFILE.identity.fullName).toBe(
      "Frontier Relics Archive Module",
    );
    expect(applicationSource).toContain("あなたは辺境を歩き、遺物を解析し");
    expect(applicationSource).toContain("F.R.A.M. F-01 / 第07雨庭区");
    expect(applicationSource).toContain("F.R.A.M.を起動");
  });
});
