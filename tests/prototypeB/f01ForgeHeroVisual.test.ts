import { describe, expect, it } from "vitest";
import * as THREE from "three";
import {
  F01_FORGE_HERO_ASSET_RUNTIME,
  createF01ForgeHeroVisual,
} from "../../src/prototypeB/render/hero/F01ForgeHeroVisual";

describe("F-01 Character Forge gameplay adapter", () => {
  it("wraps the exact compiled Forge surface pack as an articulated HeroVisual", () => {
    const visual = createF01ForgeHeroVisual();
    visual.root.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(visual.root);
    const size = bounds.getSize(new THREE.Vector3());

    expect(visual.mode).toBe("articulated");
    expect(visual.root.userData.runtimeRepresentation).toBe(
      F01_FORGE_HERO_ASSET_RUNTIME.representation,
    );
    expect(visual.root.userData.visibleVoxelCells).toBe(9_454);
    expect(visual.root.userData.characterPreset).toBe("f01-build-sheet");
    expect(visual.root.userData.frontAxis).toBe("+z");
    expect(size.y).toBeGreaterThan(5);
    expect(size.y).toBeLessThan(6);
    expect(visual.weaponSocket.parent).toBe(visual.partGroups["right-arm"]);
    expect(F01_FORGE_HERO_ASSET_RUNTIME.worldScale).toBeGreaterThan(20);
    const detailedShadowCasters: THREE.InstancedMesh[] = [];
    visual.root.traverse((object) => {
      if (object instanceof THREE.InstancedMesh && object.castShadow) {
        detailedShadowCasters.push(object);
      }
    });
    expect(detailedShadowCasters).toHaveLength(0);
    visual.dispose();
  });

  it("maps every PrototypeB locomotion and combat phase onto the Forge rig", () => {
    const visual = createF01ForgeHeroVisual();

    visual.updatePose({ motion: "run", timeSeconds: 0.19, moveAmount: 1 });
    expect(visual.partGroups["left-leg"].rotation.x).not.toBeCloseTo(0);
    expect(visual.partGroups["left-leg"].rotation.x).toBeCloseTo(
      -visual.partGroups["right-leg"].rotation.x,
    );

    visual.updatePose({ motion: "windup", timeSeconds: 1, progress: 0.75 });
    const windupArm = visual.partGroups["right-arm"].rotation.x;
    expect(Math.abs(windupArm)).toBeGreaterThan(0.3);

    visual.updatePose({ motion: "hit", timeSeconds: 1, progress: 0.5 });
    expect(visual.partGroups["right-arm"].rotation.x).not.toBeCloseTo(
      windupArm,
    );

    visual.updatePose({ motion: "skill", timeSeconds: 1, progress: 0.5 });
    expect(visual.partGroups.equipment.scale.x).toBeGreaterThan(1);

    visual.updatePose({ motion: "hurt", timeSeconds: 1, progress: 0.5 });
    expect(Math.abs(visual.motionRoot.rotation.z)).toBeGreaterThan(0.01);
    expect(() => visual.setTint(0xb8fff4)).not.toThrow();
    expect(() => visual.setTint(0xffffff)).not.toThrow();
    visual.dispose();
  });

  it("keeps a held tool attached to the animated right-arm socket", () => {
    const visual = createF01ForgeHeroVisual();
    visual.root.scale.setScalar(F01_FORGE_HERO_ASSET_RUNTIME.worldScale);
    const tool = new THREE.Mesh(new THREE.BoxGeometry(6, 40, 6));
    visual.attachWeapon(tool);
    visual.updatePose({ motion: "hit", timeSeconds: 1, progress: 0.5 });
    visual.root.updateMatrixWorld(true);
    const toolSize = new THREE.Box3()
      .setFromObject(tool)
      .getSize(new THREE.Vector3());

    expect(tool.parent).toBe(visual.weaponSocket);
    expect(visual.weaponSocket.getWorldPosition(new THREE.Vector3()).length())
      .toBeGreaterThan(0);
    expect(toolSize.y).toBeGreaterThan(35);
    expect(toolSize.y).toBeLessThan(45);
    tool.geometry.dispose();
    visual.dispose();
  });
});
