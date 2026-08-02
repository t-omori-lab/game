import { describe, expect, it } from "vitest";

import forgeHtml from "../../forge/f01/index.html?raw";
import source from "../../src/characterForge/f01.source.json";
import surfacePack from "../../src/characterForge/f01.surface-pack.json";

type NodeFs = { readFileSync(path: URL, encoding: "utf8"): string };
type NodeProcess = { getBuiltinModule(name: "fs"): NodeFs };
const fileSystem = (globalThis as typeof globalThis & {
  readonly process: NodeProcess;
}).process.getBuiltinModule("fs");
const mainSource = fileSystem.readFileSync(
  new URL("../../src/main.ts", import.meta.url),
  "utf8",
);
const forgeSource = fileSystem.readFileSync(
  new URL("../../src/characterForge/startCharacterForge.ts", import.meta.url),
  "utf8",
);
const characterSource = fileSystem.readFileSync(
  new URL("../../src/characterForge/F01Character.ts", import.meta.url),
  "utf8",
);
const compilerSource = fileSystem.readFileSync(
  new URL("../../scripts/compile-f01-surface-pack.py", import.meta.url),
  "utf8",
);
const viteSource = fileSystem.readFileSync(
  new URL("../../vite.config.ts", import.meta.url),
  "utf8",
);

describe("Character Forge F-01 pipeline contract", () => {
  it("keeps the forge independent from the published release sequence", () => {
    expect(forgeHtml).toContain("Character Forge F-01");
    expect(forgeHtml).toContain("forge-boot");
    expect(forgeHtml).toContain('src="/src/main.ts"');
    expect(mainSource).toContain("/\\/forge\\/f01");
    expect(mainSource).toContain("startCharacterForge");
    expect(viteSource).toContain('forgeF01: "forge/f01/index.html"');
  });

  it("uses an external high-density four-view canonical source", () => {
    expect(source.schemaVersion).toBe(1);
    expect(source.sourceKind).toBe("ai-build-sheet-multiview");
    expect(source.grid.height).toBeGreaterThanOrEqual(88);
    expect(source.grid.width).toBeGreaterThanOrEqual(48);
    expect(Object.keys(source.views)).toEqual([
      "front",
      "left",
      "back",
      "right",
    ]);
    expect(source.palette).toHaveLength(9);
    expect(surfacePack.compilerVersion).toBe("fram-f01-surface-pack-v1");
    expect(surfacePack.sourceVoxels).toBe(37_990);
    expect(surfacePack.renderedSurfaceCells).toBe(9_454);
    expect(surfacePack.stride).toBe(5);
    expect(surfacePack.partIds).toHaveLength(7);
    expect(surfacePack.paletteIds).toHaveLength(9);
    expect(surfacePack.payloadSha256).toHaveLength(64);
    expect(compilerSource).toContain("inside_humanoid_volumes");
    expect(compilerSource).toContain("def build_pack");
    expect(characterSource).toContain("decodeSurfaceCells");
    expect(characterSource).toContain("RoundedBoxGeometry");
  });

  it("exposes the required comparison and animation controls", () => {
    expect(forgeSource).toContain('type ForgeMotion');
    expect(forgeSource).toContain('button("RUN", "run", "motion")');
    expect(forgeSource).toContain('button("HIT", "hit", "motion")');
    expect(forgeSource).toContain('button("FIELD", "field", "distance")');
    expect(forgeSource).toContain('button("FULL", "full", "distance")');
    expect(forgeSource).not.toContain('button("GAME", "game", "distance")');
    expect(forgeSource).toContain("const FIELD_TARGET_OCCUPANCY = 0.16");
    expect(forgeSource).toContain("controls.maxDistance = 80");
    expect(forgeSource).toContain("createFieldReference()");
    expect(forgeSource).toContain('data-reference="${reference.id}"');
    expect(forgeSource).toContain("R05");
    expect(forgeSource).toContain("R08");
    expect(forgeSource).toContain("forge/f01-build-sheet.jpg");
    expect(forgeSource).not.toContain("fram-f01-production-build-sheet.png?url");
    expect(forgeSource).toContain("createF01Character()");
  });
});
