import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { alignHeldWeapon } from "../../src/prototypeB/render/PrototypeBRenderer";
import {
  BLADE_WEAPON_RECIPE,
  IMPACT_WEAPON_RECIPE,
  PLAYER_RECIPE,
  PLAYER_VOXEL_SIZE,
  voxelAnchorPosition,
} from "../../src/prototypeB/voxel";

function expectGripAtPlayerAnchor(
  weapon: "blade" | "impact",
  rotationZ: number,
): void {
  const mesh = new THREE.Mesh();
  const isBlade = weapon === "blade";
  const recipe = isBlade
    ? BLADE_WEAPON_RECIPE
    : IMPACT_WEAPON_RECIPE;
  const voxelSize = isBlade ? 2.1 : 2;
  const scale = isBlade ? 0.9 : 0.86;
  const grip = voxelAnchorPosition(recipe, "grip", voxelSize);
  const playerAnchor = voxelAnchorPosition(
    PLAYER_RECIPE,
    "weapon",
    PLAYER_VOXEL_SIZE,
  );

  mesh.rotation.x = isBlade ? 0.12 : 0.04;
  mesh.rotation.z = rotationZ;
  mesh.scale.setScalar(scale);
  alignHeldWeapon(mesh, weapon);

  const transformedGrip = new THREE.Vector3(grip.x, grip.y, grip.z)
    .multiply(mesh.scale)
    .applyEuler(mesh.rotation)
    .add(mesh.position);

  expect(transformedGrip.x).toBeCloseTo(playerAnchor.x, 6);
  expect(transformedGrip.y).toBeCloseTo(playerAnchor.y, 6);
  expect(transformedGrip.z).toBeCloseTo(playerAnchor.z, 6);
}

describe("held weapon attachment", () => {
  it("keeps the blade grip attached at idle and maximum swing", () => {
    expectGripAtPlayerAnchor("blade", -0.42);
    expectGripAtPlayerAnchor("blade", -0.42 - 1.05);
  });

  it("keeps the impact grip attached at idle and maximum swing", () => {
    expectGripAtPlayerAnchor("impact", -0.28);
    expectGripAtPlayerAnchor("impact", -0.28 - 1.42);
  });
});
