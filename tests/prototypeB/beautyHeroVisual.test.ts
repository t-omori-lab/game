import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { HERO_PART_IDS } from "../../src/prototypeB/render/hero/HeroVisual";
import {
  BEAUTY_COMPANION_ASSET_DNA,
  BEAUTY_HERO_ASSET_DNA,
  createBeautyCompanionVisual,
  createBeautyHeroVisual,
  createBeautyWeaponVisual,
} from "../../src/prototypeB/render/hero/BeautyHeroVisual";

describe("Beauty Cell procedural actors", () => {
  it("compiles a high-density articulated surveyor from stable AssetDNA", () => {
    const visual = createBeautyHeroVisual();
    visual.root.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(visual.root);
    const size = bounds.getSize(new THREE.Vector3());

    expect(BEAUTY_HERO_ASSET_DNA.representation).toBe(
      "grid-quantized-modular-3d",
    );
    expect(BEAUTY_HERO_ASSET_DNA.provenance.externalAssets).toBe(false);
    expect(visual.root.userData.assetDNA).toBe(BEAUTY_HERO_ASSET_DNA);
    expect(visual.mode).toBe("articulated");
    expect(visual.mergedMesh).toBeNull();
    expect(visual.weaponSocket.parent).toBe(visual.partGroups["right-arm"]);
    expect(size.y).toBeGreaterThan(65);
    expect(size.y).toBeLessThan(82);

    for (const partId of HERO_PART_IDS) {
      const mesh = visual.partMeshes[partId];
      expect(mesh, partId).not.toBeNull();
      expect(mesh?.geometry.getAttribute("position").count, partId).toBeGreaterThan(
        70,
      );
      expect(mesh?.material.length, partId).toBeGreaterThanOrEqual(2);
    }
    visual.dispose();
  });

  it("retains the shared motion and tint contract", () => {
    const visual = createBeautyHeroVisual();
    const rightArm = visual.partGroups["right-arm"];

    visual.updatePose({
      motion: "windup",
      timeSeconds: 0,
      progress: 1,
    });
    const windup = rightArm.rotation.x;
    visual.updatePose({
      motion: "hit",
      timeSeconds: 0,
      progress: 1,
    });
    expect(windup).toBeLessThan(0);
    expect(rightArm.rotation.x).toBeGreaterThan(1);

    expect(visual.materials.matte).toBeInstanceOf(
      THREE.MeshPhysicalMaterial,
    );
    expect(visual.materials.metal).toBeInstanceOf(
      THREE.MeshPhysicalMaterial,
    );
    expect(visual.materials.emissive).toBeInstanceOf(THREE.MeshBasicMaterial);
    visual.setTint(0xffffff);
    const emissive = visual.materials.emissive;
    if (!(emissive instanceof THREE.MeshBasicMaterial)) {
      throw new Error("Beauty signal material must stay unlit for bloom.");
    }
    expect(emissive.toneMapped).toBe(false);
    expect(emissive.color.g).toBeGreaterThan(1);
    visual.dispose();
  });

  it("builds an animated survey-hound candidate without forcing its spawn", () => {
    const companion = createBeautyCompanionVisual();
    companion.root.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(companion.root);

    expect(companion.root.userData.assetDNA).toBe(
      BEAUTY_COMPANION_ASSET_DNA,
    );
    expect(companion.legGroups).toHaveLength(4);
    expect(bounds.getSize(new THREE.Vector3()).y).toBeGreaterThan(24);
    companion.updatePose({ timeSeconds: 0.25, moveAmount: 1, reaction: 0.5 });
    expect(
      companion.legGroups.some((leg) => Math.abs(leg.rotation.x) > 0.05),
    ).toBe(true);
    expect(Math.abs(companion.sensorHead.rotation.y)).toBeGreaterThan(0);
    companion.dispose();
  });

  it("provides two non-medieval technical tools around a zero grip anchor", () => {
    const cutter = createBeautyWeaponVisual("blade");
    const driver = createBeautyWeaponVisual("impact");

    expect(cutter.name).toBe("resonance-seam-cutter");
    expect(driver.name).toBe("coil-anchor-driver");
    expect(cutter.userData.gripAnchor).toEqual({ x: 0, y: 0, z: 0 });
    expect(driver.userData.longAxis).toBe("-Y");
    expect(cutter.children).toHaveLength(1);
    expect(driver.children).toHaveLength(1);
    expect(cutter.userData.dispose).toBeTypeOf("function");
    expect(driver.userData.dispose).toBeTypeOf("function");
    cutter.userData.dispose();
    driver.userData.dispose();
  });
});
