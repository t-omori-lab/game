import { describe, expect, it } from "vitest";

import forgeHtml from "../../forge/f01/index.html?raw";
import source from "../../src/characterForge/f01.source.json";

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
const viteSource = fileSystem.readFileSync(
  new URL("../../vite.config.ts", import.meta.url),
  "utf8",
);

describe("Character Forge F-01 pipeline contract", () => {
  it("keeps the forge independent from the published release sequence", () => {
    expect(forgeHtml).toContain("Character Forge F-01");
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
    expect(characterSource).toContain("buildSurfaceCells");
    expect(characterSource).toContain("isInsideHumanoidVolumes");
    expect(characterSource).toContain("RoundedBoxGeometry");
  });

  it("exposes the required comparison and animation controls", () => {
    expect(forgeSource).toContain('type ForgeMotion');
    expect(forgeSource).toContain('button("RUN", "run", "motion")');
    expect(forgeSource).toContain('button("HIT", "hit", "motion")');
    expect(forgeSource).toContain('data-reference="${reference.id}"');
    expect(forgeSource).toContain("R05");
    expect(forgeSource).toContain("R08");
  });
});
