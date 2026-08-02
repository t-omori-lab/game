import { describe, expect, it } from "vitest";
import * as THREE from "three";
import {
  R05_FRAM_HERO_ASSET_DNA,
  createR05FramHeroVisual,
} from "../../src/prototypeB/render/hero/R05FramHeroVisual";

function namesIn(root: THREE.Object3D): ReadonlySet<string> {
  const names = new Set<string>();
  root.traverse((object) => names.add(object.name));
  return names;
}

describe("F.R.A.M. R05 protagonist", () => {
  it("is a high-density articulated voxel actor with a readable face", () => {
    const visual = createR05FramHeroVisual();
    visual.root.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(visual.root);
    const size = bounds.getSize(new THREE.Vector3());
    const names = namesIn(visual.root);

    expect(visual.root.userData.assetDNA).toBe(R05_FRAM_HERO_ASSET_DNA);
    expect(R05_FRAM_HERO_ASSET_DNA.bodyRatioHeads).toBe(4.8);
    expect(R05_FRAM_HERO_ASSET_DNA.voxelCellCount).toBeGreaterThan(7_500);
    expect(R05_FRAM_HERO_ASSET_DNA.representation).toBe(
      "high-density-articulated-voxel-surface",
    );
    expect(visual.root.userData.visibleVoxelCells).toBeGreaterThan(7_500);
    expect(R05_FRAM_HERO_ASSET_DNA.frontAxis).toBe("+z");
    expect(visual.mode).toBe("articulated");
    expect(size.y).toBeGreaterThan(58);
    expect(size.y).toBeLessThan(96);
    expect(visual.weaponSocket.parent?.name).toBe(
      "fram-f01-rightHand-voxel-pivot",
    );
    expect(names).toContain("fram-f01-cute-face-details");
    expect(names).toContain("fram-f01-left-expressive-eye");
    expect(names).toContain("fram-f01-right-expressive-eye");
    expect(names).toContain("fram-f01-a-line-field-coat");
    expect(names).toContain("fram-f01-archive-halo-and-core");
    expect(names).not.toContain("beauty-hero-motion");
    visual.dispose();
  });

  it("animates its eyes, limbs, archive signal, and weapon socket as one rig", () => {
    const visual = createR05FramHeroVisual();
    visual.updatePose({
      motion: "run",
      timeSeconds: 0.15,
      moveAmount: 1,
    });
    expect(visual.partGroups["left-leg"].rotation.x).toBeCloseTo(
      -visual.partGroups["right-leg"].rotation.x,
    );

    visual.updatePose({
      motion: "skill",
      timeSeconds: 1,
      progress: 0.5,
      moveAmount: 0,
    });
    expect(visual.eyeGroups[0].scale.x).toBeGreaterThan(1);
    expect(visual.partMeshes.equipment?.scale.x).toBeGreaterThan(1);
    expect(visual.weaponSocket.parent?.name).toBe(
      "fram-f01-rightHand-voxel-pivot",
    );
    expect(() => visual.setTint(0xb8fff4)).not.toThrow();
    visual.dispose();
  });
});
