import { describe, expect, it } from "vitest";
import { R08_FRAM_PROFILE } from "../../src/prototypeB/render/r08/R08FramProfile";

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

describe("F.R.A.M. R08 full-body character art contract", () => {
  it("adds a local R08 route without changing the published release catalog", () => {
    expect(mainSource).toContain('if (release === "r08")');
    expect(mainSource).toContain('experience: "r08"');
    expect(applicationSource).toContain('? "r08-fram"');
    expect(rendererSource).toContain("createR08FramHeroVisual()");
    expect(rendererSource).toContain("R08_FRAM_PROFILE.actors.heroScale");
  });

  it("inherits the proven R07 camera and optical contract", () => {
    expect(R08_FRAM_PROFILE.cameraCompositionProfile).toBe("r05");
    expect(R08_FRAM_PROFILE.environmentProfile).toBe("r04-live");
    expect(R08_FRAM_PROFILE.post.depthAwareDof).toBe(true);
    expect(R08_FRAM_PROFILE.post.blurPixels).toBeLessThan(3);
    expect(rendererSource).toContain("isDepthAwareFramPresentation");
  });
});
