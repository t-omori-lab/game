import { describe, expect, it } from "vitest";
import * as THREE from "three";
import {
  R08_FRAM_HERO_ASSET_DNA,
  createR08FramHeroVisual,
} from "../../src/prototypeB/render/hero/R08FramHeroVisual";

function objectsNamed(root: THREE.Object3D): ReadonlyMap<string, THREE.Object3D> {
  const objects = new Map<string, THREE.Object3D>();
  root.traverse((object) => objects.set(object.name, object));
  return objects;
}

describe("F.R.A.M. R08 unified semantic micro-voxel girl", () => {
  it("replaces every visible inherited body surface with one semantic grammar", () => {
    const visual = createR08FramHeroVisual();
    const objects = objectsNamed(visual.root);

    expect(visual.root.userData.assetDNA).toBe(R08_FRAM_HERO_ASSET_DNA);
    expect(visual.root.userData.characterPreset).toBe(
      "unified-semantic-micro-voxel-girl-b",
    );
    expect(visual.root.userData.runtimeRepresentation).toBe(
      "unified-semantic-high-density-articulated-voxel-girl",
    );
    expect(visual.semanticCellCount).toBeGreaterThan(4_000);
    expect(visual.root.userData.visibleVoxelCells).toBe(visual.semanticCellCount);
    expect(objects.has("fram-f01b-head-hairLight")).toBe(true);
    expect(objects.has("fram-f01b-head-eye")).toBe(true);
    expect(objects.has("fram-f01b-torso-jacket")).toBe(true);
    expect(objects.has("fram-f01b-left-foot-graphite")).toBe(true);
    expect(objects.has("fram-f01b-archive-pack-cyan")).toBe(true);
    expect(objects.get("fram-f01a-semantic-head")?.visible).toBe(false);
    expect(objects.get("fram-f01a-short-tech-jacket")?.visible).toBe(false);
    visual.dispose();
  });

  it("retains articulated motion and the inherited right-hand weapon socket", () => {
    const visual = createR08FramHeroVisual();
    visual.updatePose({ motion: "run", timeSeconds: 0.24, moveAmount: 1 });

    expect(visual.mode).toBe("articulated");
    expect(visual.partGroups.head.scale.y).toBeGreaterThan(
      visual.partGroups.head.scale.x,
    );
    expect(visual.partGroups["left-leg"].scale.y).toBeCloseTo(0.78);
    expect(visual.weaponSocket.parent?.name).toBe(
      "fram-f01-rightHand-voxel-pivot",
    );
    visual.dispose();
  });
});
