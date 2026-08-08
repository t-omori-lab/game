import * as THREE from "three";
import {
  createF01Character,
  type F01Character,
  type F01PartId,
} from "../../../characterForge/F01Character";
import type { VoxelMaterialRole, VoxelPoint } from "../../voxel";
import {
  HERO_PART_IDS,
  alignObjectGripToSocket,
  type HeroAnimationInput,
  type HeroPartId,
  type HeroVisual,
} from "./HeroVisual";
import type { PrototypeBHeroAssetRuntime } from "./HeroAssetRuntime";

export const F01_GAMEPLAY_WORLD_SCALE = 24;

export interface CompiledForgeHeroDescriptor {
  readonly id: string;
  readonly representation: string;
  readonly characterPreset: string;
  readonly visibleVoxelCells: number;
  readonly worldScale: number;
  readonly payloadSha256?: string;
  readonly sourceSha256?: string;
}

export const F01_FORGE_HERO_ASSET_RUNTIME = Object.freeze({
  id: "fram.character.f01.gameplay-bridge-v1",
  representation: "compiled-high-density-articulated-voxel-surface",
  characterPreset: "f01-build-sheet",
  visibleVoxelCells: 9_454,
  worldScale: F01_GAMEPLAY_WORLD_SCALE,
  createVisual: createF01ForgeHeroVisual,
} satisfies PrototypeBHeroAssetRuntime);

/** Comparison export used when R09 is opened with `?actor=f01`. */
export const R09_HERO_ASSET_RUNTIME = F01_FORGE_HERO_ASSET_RUNTIME;

const emptyPartMeshes = Object.fromEntries(
  HERO_PART_IDS.map((partId) => [partId, null]),
) as unknown as HeroVisual["partMeshes"];

function clampProgress(input: HeroAnimationInput): number {
  return THREE.MathUtils.clamp(
    Number.isFinite(input.progress) ? input.progress ?? 0 : 0,
    0,
    1,
  );
}

function smooth(value: number): number {
  return value * value * (3 - 2 * value);
}

function asHeroPartGroups(
  groups: Readonly<Record<F01PartId, THREE.Group>>,
): HeroVisual["partGroups"] {
  return groups as Readonly<Record<HeroPartId, THREE.Group>>;
}

export function createF01ForgeHeroVisual(): HeroVisual {
  return createCompiledForgeHeroVisual(
    F01_FORGE_HERO_ASSET_RUNTIME,
    () => createF01Character({ castShadow: false }),
  );
}

export function createCompiledForgeHeroVisual(
  descriptor: CompiledForgeHeroDescriptor,
  createCharacter: () => F01Character,
): HeroVisual {
  const character = createCharacter();
  const partGroups = asHeroPartGroups(character.partGroups);
  const weaponSocket = new THREE.Group();
  weaponSocket.name = `${descriptor.id}:right-hand-socket`;
  // F-01 arm geometry extends from its shoulder pivot toward +X and -Y.
  // The socket stays in those authored units and follows the whole arm rig.
  weaponSocket.position.set(0.52, -1.02, 0.06);
  partGroups["right-arm"].add(weaponSocket);

  character.root.userData.assetDNA = descriptor.id;
  character.root.userData.frontAxis = "+z";
  character.root.userData.runtimeRepresentation =
    descriptor.representation;
  character.root.userData.visibleVoxelCells =
    descriptor.visibleVoxelCells;
  character.root.userData.characterPreset =
    descriptor.characterPreset;
  character.root.userData.packDigest =
    descriptor.payloadSha256 ?? character.stats.payloadSha256;
  character.root.userData.sourceDigest =
    descriptor.sourceSha256 ?? character.stats.sourceSha256 ?? "unavailable";

  const materialById = character.materials;
  const materialContract = {
    matte: materialById.get("ivory") ?? firstMaterial(materialById),
    metal: materialById.get("near-black") ?? firstMaterial(materialById),
    emissive: materialById.get("cyan") ?? firstMaterial(materialById),
  } satisfies Record<VoxelMaterialRole, THREE.Material>;
  const originalColors = new Map(
    [...materialById.values()].map((material) => [
      material,
      {
        color: material.color.clone(),
        emissive: material.emissive.clone(),
      },
    ] as const),
  );

  const updatePose = (input: HeroAnimationInput): void => {
    const time = Number.isFinite(input.timeSeconds) ? input.timeSeconds : 0;
    const progress = clampProgress(input);
    const phase = smooth(progress);
    const moveAmount = THREE.MathUtils.clamp(
      Number.isFinite(input.moveAmount) ? input.moveAmount ?? 1 : 1,
      0,
      1,
    );

    if (input.motion === "run") {
      character.update("run", time, time);
      partGroups["left-leg"].rotation.x *= moveAmount;
      partGroups["right-leg"].rotation.x *= moveAmount;
      partGroups["left-arm"].rotation.x *= moveAmount;
      partGroups["right-arm"].rotation.x *= moveAmount;
      return;
    }

    character.update("idle", time, time);
    switch (input.motion) {
      case "idle":
        break;
      case "windup":
        partGroups.torso.rotation.y = -0.42 * phase;
        partGroups["right-arm"].rotation.set(
          -1.08 * phase,
          -0.12 * phase,
          0.34 * phase,
        );
        partGroups["left-arm"].rotation.x = 0.3 * phase;
        partGroups.head.rotation.y += 0.18 * phase;
        break;
      case "hit":
        character.update("hit", time, time - progress * 0.62);
        partGroups.torso.rotation.y = THREE.MathUtils.lerp(-0.42, 0.32, phase);
        partGroups["right-arm"].rotation.x = THREE.MathUtils.lerp(
          -1.08,
          1.34,
          phase,
        );
        partGroups["right-arm"].rotation.z += THREE.MathUtils.lerp(
          0.34,
          -0.18,
          phase,
        );
        break;
      case "recovery": {
        const remaining = 1 - phase;
        partGroups.torso.rotation.y = 0.32 * remaining;
        partGroups["right-arm"].rotation.x = 1.34 * remaining;
        partGroups["right-arm"].rotation.z = -0.18 * remaining;
        break;
      }
      case "hurt": {
        const recoil = Math.sin(progress * Math.PI);
        character.motionRoot.position.z += recoil * 0.18;
        character.motionRoot.rotation.z = recoil * 0.09;
        partGroups.torso.rotation.x = -0.34 * recoil;
        partGroups.head.rotation.x += 0.24 * recoil;
        partGroups["left-arm"].rotation.x = -0.58 * recoil;
        partGroups["right-arm"].rotation.x = -0.72 * recoil;
        break;
      }
      case "skill": {
        const energy = Math.sin(progress * Math.PI);
        character.motionRoot.position.y -= energy * 0.1;
        partGroups.torso.rotation.x = -0.16 * energy;
        partGroups["left-arm"].rotation.set(
          0.72 * energy,
          0,
          -0.82 * energy,
        );
        partGroups["right-arm"].rotation.set(
          0.72 * energy,
          0,
          0.82 * energy,
        );
        partGroups.equipment.scale.setScalar(1 + energy * 0.12);
        break;
      }
    }
  };

  const visual: HeroVisual = {
    root: character.root,
    motionRoot: character.motionRoot,
    mode: "articulated",
    partGroups,
    partMeshes: emptyPartMeshes,
    mergedMesh: null,
    weaponSocket,
    materials: materialContract,
    updatePose,
    attachWeapon(
      object: THREE.Object3D,
      gripLocal: VoxelPoint = { x: 0, y: 0, z: 0 },
    ): void {
      weaponSocket.add(object);
      // PrototypeB tools are already authored in world units. They become a
      // child of F-01's authored-unit root, so cancel only the actor's bridge
      // scale to keep the tool at its original gameplay size.
      object.scale.multiplyScalar(1 / descriptor.worldScale);
      alignObjectGripToSocket(object, gripLocal);
    },
    setTint(color: THREE.ColorRepresentation): void {
      const tint = new THREE.Color(color);
      for (const [material, original] of originalColors) {
        material.color.copy(original.color).multiply(tint);
        material.emissive.copy(original.emissive).multiply(tint);
      }
    },
    dispose(): void {
      character.dispose();
    },
  };
  visual.updatePose({ motion: "idle", timeSeconds: 0, moveAmount: 0 });
  return visual;
}

function firstMaterial(
  materials: ReadonlyMap<string, THREE.MeshPhysicalMaterial>,
): THREE.MeshPhysicalMaterial {
  const first = materials.values().next().value;
  if (first === undefined) {
    throw new Error("F-01 surface pack did not create any materials.");
  }
  return first;
}
