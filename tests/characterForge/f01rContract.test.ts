import { describe, expect, it } from "vitest";
import source from "../../src/characterForge/f01r.source.json";
import surfacePack from "../../src/characterForge/f01r.surface-pack.json";
import {
  F01R_ASSET_CONTRACT,
  createF01RCharacter,
} from "../../src/characterForge/F01RCharacter";

type NodeFs = { readFileSync(path: URL, encoding: "utf8"): string };
type NodeProcess = { getBuiltinModule(name: "fs"): NodeFs };
const fileSystem = (globalThis as typeof globalThis & {
  readonly process: NodeProcess;
}).process.getBuiltinModule("fs");
const compilerSource = fileSystem.readFileSync(
  new URL("../../scripts/compile-f01r-semantic-pack.py", import.meta.url),
  "utf8",
);

describe("F-01R source-faithful reconstruction contract", () => {
  it("ships a deterministic module-indexed source and compiled pack", () => {
    expect(source.schemaVersion).toBe(2);
    expect(source.sourceKind).toBe("semantic-module-reconstruction");
    expect(surfacePack.schemaVersion).toBe(2);
    expect(surfacePack.compilerVersion).toBe("fram-f01r-semantic-pack-v1");
    expect(surfacePack.stride).toBe(6);
    expect(surfacePack.sourceId).toBe(source.id);
    expect(surfacePack.sourceSha256).toHaveLength(64);
    expect(surfacePack.payloadSha256).toHaveLength(64);
    expect(surfacePack.moduleIds).toEqual(source.moduleOrder);
    expect(surfacePack.moduleIds).toContain("face-skin");
    expect(surfacePack.moduleIds).toContain("hair-fringe");
    expect(surfacePack.moduleIds).toContain("hair-side-lock-left");
    expect(surfacePack.moduleIds).toContain("eye-left");
    expect(surfacePack.renderedSurfaceCells).toBeGreaterThan(8_000);
    expect(surfacePack.moduleSurfaceCells["hair-shell"]).toBeGreaterThan(1_000);
    expect(compilerSource).toContain("build_semantic_head");
    expect(compilerSource).toContain("module_index");
    expect(compilerSource).not.toContain("F02ReadabilityModules");
  });

  it("loads the exact generated pack without runtime geometry patches", () => {
    const character = createF01RCharacter({ castShadow: false });

    expect(character.root.userData.assetDNA).toBe(F01R_ASSET_CONTRACT.id);
    expect(character.root.userData.packDigest).toBe(
      surfacePack.payloadSha256,
    );
    expect(character.root.userData.sourceDigest).toBe(
      surfacePack.sourceSha256,
    );
    expect(character.stats.renderedSurfaceCells).toBe(
      surfacePack.renderedSurfaceCells,
    );
    expect(character.stats.moduleCount).toBe(source.moduleOrder.length);
    expect(character.partGroups.head.children.length).toBeGreaterThan(5);
    character.dispose();
  });
});
