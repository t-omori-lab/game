import { describe, expect, it } from "vitest";
import * as THREE from "three";
import {
  F01_GAMEPLAY_VISIBLE_SURFACE_CELLS,
} from "../../src/prototypeB/render/hero/F01ForgeHeroVisual";
import {
  F02_FORGE_HERO_ASSET_RUNTIME,
  createF02ForgeHeroVisual,
} from "../../src/prototypeB/render/hero/F02ForgeHeroVisual";
import {
  F02_ADDED_SURFACE_CELLS,
  F02_READABILITY_MODULE_IDS,
} from "../../src/characterForge/F02ReadabilityModules";

function namesIn(root: THREE.Object3D): ReadonlySet<string> {
  const names = new Set<string>();
  root.traverse((object) => names.add(object.name));
  return names;
}

describe("F-02 evidence-driven gameplay correction", () => {
  it("keeps F-01's compiled pack and adds only the failed readability modules", () => {
    const visual = createF02ForgeHeroVisual();
    const names = namesIn(visual.root);

    expect(F02_READABILITY_MODULE_IDS).toEqual([
      "face-readability",
      "torso-jacket-separation",
      "limb-silhouette",
      "backpack-signal",
      "combat-pose-readability",
    ]);
    expect(F02_ADDED_SURFACE_CELLS).toBeGreaterThan(300);
    expect(F02_ADDED_SURFACE_CELLS).toBeLessThan(1_500);
    expect(visual.root.userData.visibleVoxelCells).toBe(
      F01_GAMEPLAY_VISIBLE_SURFACE_CELLS + F02_ADDED_SURFACE_CELLS,
    );
    expect(visual.root.userData.characterPreset).toBe(
      "f02-evidence-corrected",
    );
    expect(visual.root.userData.f02ModuleIds).toEqual(
      F02_READABILITY_MODULE_IDS,
    );
    expect(names).toContain("fram.character.f01.build-sheet-visual-hull-v1:head");
    expect(names).toContain("fram-f02-face-skin-plane");
    expect(names).toContain("fram-f02-left-eye");
    expect(names).toContain("fram-f02-right-eye");
    expect(names).toContain("fram-f02-coat-left");
    expect(names).toContain("fram-f02-archive-screen");
    const detailedShadowCasters: THREE.InstancedMesh[] = [];
    visual.root.traverse((object) => {
      if (object instanceof THREE.InstancedMesh && object.castShadow) {
        detailedShadowCasters.push(object);
      }
    });
    expect(detailedShadowCasters).toHaveLength(0);
    visual.dispose();
  });

  it("strengthens the combat silhouette and animated archive signal", () => {
    const visual = createF02ForgeHeroVisual();
    const signal = visual.root.getObjectByName("fram-f02-skill-signal");
    if (!(signal instanceof THREE.Group)) {
      throw new Error("F-02 skill signal group is missing.");
    }

    visual.updatePose({ motion: "idle", timeSeconds: 1, moveAmount: 0 });
    const idleSignalScale = signal.scale.x;
    const idleArmSeparation = Math.abs(
      visual.partGroups["left-arm"].rotation.z -
        visual.partGroups["right-arm"].rotation.z,
    );
    visual.updatePose({ motion: "skill", timeSeconds: 1, progress: 0.5 });
    const skillArmSeparation = Math.abs(
      visual.partGroups["left-arm"].rotation.z -
        visual.partGroups["right-arm"].rotation.z,
    );

    expect(signal.scale.x).toBeGreaterThan(idleSignalScale);
    expect(skillArmSeparation).toBeGreaterThan(idleArmSeparation);
    expect(() => visual.setTint(0xb8fff4)).not.toThrow();
    expect(() => visual.setTint(0xffffff)).not.toThrow();
    visual.dispose();
  });

  it("ships the corrected pack through the final R09 runtime contract", () => {
    expect(F02_FORGE_HERO_ASSET_RUNTIME.id).toBe(
      "fram.character.f02.gameplay-readability-v1",
    );
    expect(F02_FORGE_HERO_ASSET_RUNTIME.visibleVoxelCells).toBe(
      F01_GAMEPLAY_VISIBLE_SURFACE_CELLS + F02_ADDED_SURFACE_CELLS,
    );
    expect(F02_FORGE_HERO_ASSET_RUNTIME.worldScale).toBe(24);
    const visual = F02_FORGE_HERO_ASSET_RUNTIME.createVisual();
    expect(visual.root.userData.assetDNA).toBe(
      F02_FORGE_HERO_ASSET_RUNTIME.id,
    );
    visual.dispose();
  });
});
