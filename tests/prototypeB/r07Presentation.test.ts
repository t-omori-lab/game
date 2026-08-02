import { describe, expect, it } from "vitest";
import { R07_FRAM_PROFILE } from "../../src/prototypeB/render/r07/R07FramProfile";

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

describe("F.R.A.M. R07 character and depth contract", () => {
  it("adds a local R07 route without replacing the published R06", () => {
    expect(mainSource).toContain('if (release === "r07")');
    expect(mainSource).toContain('experience: "r07"');
    expect(applicationSource).toContain('? "r07-fram"');
    expect(applicationSource).toContain('options.experience === "r06" || options.experience === "r07"');
    expect(rendererSource).toContain("createR07FramHeroVisual()");
    expect(rendererSource).toContain("R07_FRAM_PROFILE.actors.heroScale");
  });

  it("uses restrained scene-depth softness rather than screen-Y bands", () => {
    expect(R07_FRAM_PROFILE.post.depthAwareDof).toBe(true);
    expect(R07_FRAM_PROFILE.post.blurPixels).toBeLessThan(3);
    expect(rendererSource).toContain('depthAwareDof: this.presentationProfile === "r07-fram"');
    expect(pipelineSource).toContain("DepthAwareDofShader");
    expect(pipelineSource).toContain("sameSurface");
    expect(pipelineSource).toContain("setDepthFocusPoint");
    expect(pipelineSource).toContain("MeshDepthMaterial");
  });
});
