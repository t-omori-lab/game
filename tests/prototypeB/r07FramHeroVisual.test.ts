import { describe, expect, it } from "vitest";
import * as THREE from "three";
import {
  R07_FRAM_HERO_ASSET_DNA,
  createR07FramHeroVisual,
} from "../../src/prototypeB/render/hero/R07FramHeroVisual";

function objectsNamed(root: THREE.Object3D): ReadonlyMap<string, THREE.Object3D> {
  const objects = new Map<string, THREE.Object3D>();
  root.traverse((object) => objects.set(object.name, object));
  return objects;
}

describe("F.R.A.M. R07 semantic micro-voxel girl", () => {
  it("rebuilds the face, bob and short technical outfit as semantic volumes", () => {
    const visual = createR07FramHeroVisual();
    const objects = objectsNamed(visual.root);

    expect(visual.root.userData.assetDNA).toBe(R07_FRAM_HERO_ASSET_DNA);
    expect(visual.root.userData.characterPreset).toBe(
      "semantic-micro-voxel-girl-a",
    );
    expect(visual.root.userData.runtimeRepresentation).toBe(
      "semantic-high-density-articulated-voxel-girl",
    );
    expect(visual.semanticCellCount).toBeGreaterThan(500);
    expect(visual.root.userData.visibleVoxelCells).toBeGreaterThan(8_200);
    expect(objects.has("fram-f01a-semantic-head-hair")).toBe(true);
    expect(objects.has("fram-f01a-semantic-head-eye")).toBe(true);
    expect(objects.has("fram-f01a-semantic-head-cheek")).toBe(true);
    expect(objects.has("fram-f01a-short-tech-jacket-jacket")).toBe(true);
    expect(objects.get("fram-f01-a-line-field-coat")?.visible).toBe(false);
    expect(R07_FRAM_HERO_ASSET_DNA.bodyRatioHeads).toBeCloseTo(3.6);
    visual.dispose();
  });

  it("keeps the articulated rig, readable proportions and weapon socket", () => {
    const visual = createR07FramHeroVisual();
    visual.updatePose({ motion: "run", timeSeconds: 0.24, moveAmount: 1 });

    expect(visual.mode).toBe("articulated");
    expect(visual.partGroups.head.scale.x).toBeGreaterThan(
      visual.partGroups.head.scale.y,
    );
    expect(visual.partGroups["left-leg"].scale.y).toBeCloseTo(0.78);
    expect(visual.partGroups["right-leg"].scale.y).toBeCloseTo(0.78);
    expect(visual.weaponSocket.parent?.name).toBe(
      "fram-f01-rightHand-voxel-pivot",
    );
    visual.dispose();
  });
});
