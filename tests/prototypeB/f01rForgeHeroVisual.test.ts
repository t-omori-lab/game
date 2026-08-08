import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { F01R_ASSET_CONTRACT } from "../../src/characterForge/F01RCharacter";
import {
  F01R_FORGE_HERO_ASSET_RUNTIME,
  createF01RForgeHeroVisual,
} from "../../src/prototypeB/render/hero/F01RForgeHeroVisual";

describe("F-01R gameplay adapter", () => {
  it("uses the exact same compiled asset contract as Character Forge", () => {
    const visual = createF01RForgeHeroVisual();
    visual.root.updateMatrixWorld(true);
    const size = new THREE.Box3()
      .setFromObject(visual.root)
      .getSize(new THREE.Vector3());

    expect(F01R_FORGE_HERO_ASSET_RUNTIME.id).toBe(F01R_ASSET_CONTRACT.id);
    expect(F01R_FORGE_HERO_ASSET_RUNTIME.payloadSha256).toBe(
      F01R_ASSET_CONTRACT.payloadSha256,
    );
    expect(visual.root.userData.packDigest).toBe(
      F01R_ASSET_CONTRACT.payloadSha256,
    );
    expect(visual.root.userData.sourceDigest).toBe(
      F01R_ASSET_CONTRACT.sourceSha256,
    );
    expect(visual.root.userData.moduleIds).toEqual(
      F01R_ASSET_CONTRACT.moduleIds,
    );
    expect(size.y).toBeGreaterThan(5);
    expect(size.y).toBeLessThan(6);
    visual.dispose();
  });

  it("keeps the shared rig usable across locomotion and combat", () => {
    const visual = createF01RForgeHeroVisual();
    visual.updatePose({ motion: "run", timeSeconds: 0.19, moveAmount: 1 });
    expect(visual.partGroups["left-leg"].rotation.x).not.toBeCloseTo(0);
    visual.updatePose({ motion: "hit", timeSeconds: 1, progress: 0.5 });
    expect(Math.abs(visual.partGroups["right-arm"].rotation.x)).toBeGreaterThan(
      0.1,
    );
    visual.updatePose({ motion: "skill", timeSeconds: 1, progress: 0.5 });
    expect(visual.partGroups.equipment.scale.x).toBeGreaterThan(1);
    visual.dispose();
  });
});
