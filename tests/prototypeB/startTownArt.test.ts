import * as THREE from "three";
import { describe, expect, it } from "vitest";
import {
  START_TOWN_ART_BUDGET,
  createStartTownArtSlice,
  measureStartTownArtSlice,
  type StartTownLifePassMetrics,
} from "../../src/prototypeB/render/startTownArt";
import { TOWN_CONTRACT_BOARD_POSITION } from "../../src/prototypeB/sim";

function geometryDigest(root: THREE.Object3D): number[] {
  const digests: number[] = [];

  root.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) {
      return;
    }

    let digest = 2_166_136_261;
    for (const attributeName of ["position", "normal", "color"] as const) {
      const attribute = object.geometry.getAttribute(attributeName);

      for (let index = 0; index < attribute.array.length; index += 1) {
        const value = attribute.array[index] ?? 0;
        digest = Math.imul(
          digest ^ Math.round(Number(value) * 10_000),
          16_777_619,
        );
      }
    }
    digests.push(digest >>> 0);
  });

  return digests;
}

describe("start town art slice", () => {
  it("replaces only the renderer-side start-town fixtures", () => {
    const slice = createStartTownArtSlice();

    expect([...slice.replacedTerrainIds]).toEqual([
      "town-hall",
      "town-well",
      "south-house",
      "town-board-collider",
      "town-hall-workyard-collider",
      "town-repair-bench-collider",
      "town-south-lamp-collider",
      "town-kitchen-garden-collider",
      "town-south-crates-collider",
    ]);
    expect([...slice.replacedPropIds]).toEqual([
      "town-contract-board",
      "town-lamp-a",
      "town-lamp-b",
    ]);
    expect(slice.group.name).toBe("start-town-art-slice");
    expect(slice.ground.name).toBe("start-town-ground");
    expect(slice.ground.parent).toBe(slice.group);
    expect(slice.group.userData.contractBoardPosition).toEqual(
      TOWN_CONTRACT_BOARD_POSITION,
    );

    slice.dispose();
  });

  it("stays inside the renderer budget with merged standard-material batches", () => {
    const slice = createStartTownArtSlice();
    const metrics = measureStartTownArtSlice(slice.group);
    const meshes: THREE.Mesh[] = [];

    slice.group.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        meshes.push(object);
      }
    });

    expect(metrics.drawCalls).toBeGreaterThanOrEqual(10);
    expect(metrics.drawCalls).toBeLessThanOrEqual(
      START_TOWN_ART_BUDGET.targetDrawCalls,
    );
    expect(metrics.triangles).toBeGreaterThan(10_000);
    expect(metrics.triangles).toBeLessThanOrEqual(
      START_TOWN_ART_BUDGET.maximumTriangles,
    );
    expect(metrics.geometries).toBe(metrics.drawCalls);
    expect(metrics.components).toBeGreaterThan(400);
    expect(
      meshes.every(
        (mesh) => mesh.material instanceof THREE.MeshStandardMaterial,
      ),
    ).toBe(true);
    expect(meshes.some((mesh) => mesh.castShadow)).toBe(true);
    expect(
      (slice.ground.children as THREE.Mesh[]).every(
        (mesh) => mesh.receiveShadow,
      ),
    ).toBe(true);

    slice.dispose();
  });

  it("omits the superseded receiver and preserves ground microdetail", () => {
    const slice = createStartTownArtSlice();
    const receiver = slice.group.getObjectByName(
      "start-town-ground-receiver",
    );
    const microdetail = slice.group.getObjectByName(
      "start-town-ground-microdetail",
    );

    expect(receiver).toBeUndefined();
    expect(microdetail).toBeInstanceOf(THREE.Mesh);

    if (!(microdetail instanceof THREE.Mesh)) {
      throw new Error("Start-town microdetail batch is missing.");
    }

    expect(microdetail.geometry.userData.componentCount).toBeGreaterThan(
      120,
    );
    expect(microdetail.geometry.userData.componentCount).toBeLessThan(240);

    slice.dispose();
  });

  it("adds an optimistic life pass without a new batch or danger palette", () => {
    const slice = createStartTownArtSlice();
    const metrics = measureStartTownArtSlice(slice.group);
    const lifePass =
      slice.group.userData.lifePass as StartTownLifePassMetrics;

    expect(lifePass.repairPanelCount).toBe(8);
    expect(lifePass.roofDamageFillRatio).toBeGreaterThanOrEqual(0.25);
    expect(lifePass.roofDamageFillRatio).toBeLessThanOrEqual(0.35);
    expect(lifePass.gardenBedCount).toBe(4);
    expect(lifePass.laundryClothCount).toBe(4);
    expect(lifePass.dangerRedOrangeUsed).toBe(false);
    expect(lifePass.gardenBounds).toEqual({
      minimumX: 405,
      maximumX: 480,
      minimumZ: 1_110,
      maximumZ: 1_200,
    });
    expect(lifePass.addedComponents).toBeGreaterThan(100);
    expect(lifePass.addedTriangles).toBeLessThan(3_000);
    expect(metrics.drawCalls).toBe(11);
    expect(metrics.triangles).toBeLessThan(27_000);

    slice.dispose();
  });

  it("emits identical buffers for identical calls without Math.random", () => {
    const first = createStartTownArtSlice();
    const second = createStartTownArtSlice();

    expect(measureStartTownArtSlice(first.group)).toEqual(
      measureStartTownArtSlice(second.group),
    );
    expect(geometryDigest(first.group)).toEqual(
      geometryDigest(second.group),
    );

    first.dispose();
    second.dispose();
  });

  it("disposes idempotently and detaches its renderer-only group", () => {
    const slice = createStartTownArtSlice();
    const scene = new THREE.Scene();
    scene.add(slice.group);

    slice.dispose();
    slice.dispose();

    expect(slice.group.parent).toBeNull();
    expect(slice.group.children).toHaveLength(0);
    expect(slice.ground.children).toHaveLength(0);
  });
});
