import { describe, expect, it } from "vitest";
import * as THREE from "three";
import {
  R04_HERO_ASSET_DNA,
  createR04HeroVisual,
} from "../../src/prototypeB/render/hero/R04HeroVisual";

function objectNames(root: THREE.Object3D): ReadonlySet<string> {
  const names = new Set<string>();
  root.traverse((object) => names.add(object.name));
  return names;
}

describe("R04 realtime protagonist", () => {
  it("builds a high-detail articulated female SF actor facing local +Z", () => {
    const visual = createR04HeroVisual();
    visual.root.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(visual.root);
    const size = bounds.getSize(new THREE.Vector3());
    const names = objectNames(visual.root);

    expect(R04_HERO_ASSET_DNA.representation).toBe(
      "realtime-articulated-procedural-3d",
    );
    expect(R04_HERO_ASSET_DNA.provenance.r03SpriteUsedAtRuntime).toBe(false);
    expect(visual.root.userData.assetDNA).toBe(R04_HERO_ASSET_DNA);
    expect(visual.root.userData.frontAxis).toBe("+Z");
    expect(visual.mode).toBe("articulated");
    expect(visual.weaponSocket.parent).toBe(visual.partGroups["right-arm"]);
    expect(visual.partMeshes.head?.scale.x).toBeGreaterThan(1.1);
    expect(visual.partMeshes.torso?.scale.x).toBeLessThan(0.9);
    expect(size.y).toBeGreaterThan(68);
    expect(size.y).toBeLessThan(90);

    for (const name of [
      "r04-face-eye-left",
      "r04-face-eye-right",
      "r04-face-brow-left",
      "r04-face-brow-right",
      "r04-face-mouth",
      "r04-layered-fringe",
      "r04-layered-ponytail",
      "r04-pale-coat-torso-overlay",
      "r04-analysis-pack-and-tools",
    ]) {
      expect(names, name).toContain(name);
    }
    expect(
      visual.facialRig.eyes.every((eye) => eye.position.z > 6),
    ).toBe(true);
    const inheritedHeadMaterials = Array.isArray(
      visual.partMeshes.head?.material,
    )
      ? visual.partMeshes.head.material
      : [];
    const neutralizedVisor = inheritedHeadMaterials.find(
      (material) => material.name === "r04-inherited-visor-neutralized",
    );
    expect(neutralizedVisor).toBeInstanceOf(THREE.MeshPhysicalMaterial);
    expect((neutralizedVisor as THREE.MeshPhysicalMaterial).opacity).toBe(0.1);
    expect((neutralizedVisor as THREE.MeshPhysicalMaterial).depthWrite).toBe(
      false,
    );
    visual.dispose();
  });

  it("animates face, coat, hair, body, and weapon socket as one rig", () => {
    const visual = createR04HeroVisual();
    const initialMouthScale = visual.facialRig.mouth.scale.y;

    visual.updatePose({
      motion: "hurt",
      timeSeconds: 1,
      progress: 0.5,
      moveAmount: 0,
    });
    expect(visual.facialRig.mouth.scale.y).toBeGreaterThan(initialMouthScale);
    expect(visual.facialRig.brows[0].position.y).toBeGreaterThan(8.2);
    expect(Math.abs(visual.facialRig.ponytail.rotation.z)).toBeGreaterThan(0.1);

    visual.updatePose({
      motion: "run",
      timeSeconds: 0.15,
      moveAmount: 1,
    });
    expect(visual.partGroups["left-leg"].rotation.x).toBeCloseTo(
      -visual.partGroups["right-leg"].rotation.x,
    );
    expect(Math.abs(visual.facialRig.coatTails[0].rotation.z)).toBeGreaterThan(0);

    visual.updatePose({
      motion: "hit",
      timeSeconds: 0.3,
      progress: 1,
    });
    expect(visual.partGroups["right-arm"].rotation.x).toBeGreaterThan(1);
    expect(visual.weaponSocket.parent).toBe(visual.partGroups["right-arm"]);
    visual.dispose();
  });

  it("uses geometry meshes only and keeps the shared tint contract", () => {
    const visual = createR04HeroVisual();
    let meshCount = 0;
    let spriteCount = 0;
    visual.root.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        meshCount += 1;
      }
      if (object instanceof THREE.Sprite) {
        spriteCount += 1;
      }
    });

    expect(meshCount).toBeGreaterThan(18);
    expect(spriteCount).toBe(0);
    expect(() => visual.setTint(0xb8fff4)).not.toThrow();
    visual.dispose();
  });
});
