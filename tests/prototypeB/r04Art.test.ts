import * as THREE from "three";
import { describe, expect, it, vi } from "vitest";
import { createR04ArtSlice } from "../../src/prototypeB/render/r04/R04Art";
import { R04_LIVE_PROFILE } from "../../src/prototypeB/render/r04/R04LiveProfile";
import {
  ANOMALY_ID,
  ENEMY_PLACEMENTS,
  TERRAIN_PLACEMENTS,
  TOWN_CONTRACT_BOARD_POSITION,
  WORLD_HEIGHT,
  WORLD_WIDTH,
} from "../../src/prototypeB/sim";

const REPLACED_TERRAIN_IDS = [
  "town-hall",
  "town-well",
  "south-house",
  "town-board-collider",
  "town-hall-workyard-collider",
  "town-repair-bench-collider",
  "town-south-lamp-collider",
  "town-kitchen-garden-collider",
  "town-south-crates-collider",
] as const;

function geometryDigest(root: THREE.Object3D): number[] {
  const digests: number[] = [];
  root.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) {
      return;
    }
    let digest = 2_166_136_261;
    for (const attributeName of ["position", "normal", "color", "uv"] as const) {
      const attribute = object.geometry.getAttribute(attributeName);
      if (attribute === undefined) {
        continue;
      }
      for (let index = 0; index < attribute.array.length; index += 1) {
        digest = Math.imul(
          digest ^ Math.round(Number(attribute.array[index] ?? 0) * 10_000),
          16_777_619,
        );
      }
    }
    digests.push(digest >>> 0);
  });
  return digests;
}

describe("R04 R02-successor art compiler", () => {
  it("stamps the live profile while preserving the R02 collision contract", () => {
    const slice = createR04ArtSlice();

    expect(slice.group.name).toBe("r04-art-slice");
    expect(slice.ground.name).toBe("r04-ground");
    expect(slice.ground.parent).toBe(slice.group);
    expect(slice.group.userData).toMatchObject({
      schemaVersion: R04_LIVE_PROFILE.schemaVersion,
      stableId: R04_LIVE_PROFILE.stableId,
      seed: R04_LIVE_PROFILE.seed,
      environmentProfile: "r04-live",
      removedLegacyWetFilm: true,
      contractBoardPosition: TOWN_CONTRACT_BOARD_POSITION,
      generationProvenance: {
        externalAssets: false,
        referenceImageUsedAtRuntime: false,
        causalColliderParity: true,
      },
    });
    expect([...slice.replacedTerrainIds]).toEqual(REPLACED_TERRAIN_IDS);
    expect([...slice.replacedPropIds]).toEqual([
      "town-contract-board",
      "town-lamp-a",
      "town-lamp-b",
    ]);
    for (const id of REPLACED_TERRAIN_IDS) {
      expect(
        slice.group.getObjectByName(`beauty-cell-collider-visual-${id}`),
        `${id} must keep its visible causal anchor`,
      ).toBeDefined();
    }
    expect(
      slice.group.getObjectByName("r04-contract-anchor")?.userData
        .interactionPoint,
    ).toEqual(TOWN_CONTRACT_BOARD_POSITION);

    slice.dispose();
  }, 20_000);

  it("replaces the dark road film with local physical water and low route edges", () => {
    const slice = createR04ArtSlice();
    const legacyFilm = slice.group.getObjectByName("beauty-cell-wet-road-film");
    const puddles = slice.group.getObjectByName("r04-localized-physical-puddles");
    const routeEdges = slice.group.getObjectByName(
      "r04-low-collider-readable-drains-curbs",
    );

    expect(legacyFilm).toBeUndefined();
    expect(puddles).toBeInstanceOf(THREE.Mesh);
    if (
      !(puddles instanceof THREE.Mesh) ||
      !(puddles.material instanceof THREE.MeshPhysicalMaterial)
    ) {
      throw new Error("R04 physical puddles are missing.");
    }
    expect(puddles.material.clearcoat).toBeGreaterThan(0.9);
    expect(puddles.material.transparent).toBe(true);
    expect(routeEdges).toBeInstanceOf(THREE.Mesh);
    if (!(routeEdges instanceof THREE.Mesh)) {
      throw new Error("R04 route edge batch is missing.");
    }
    routeEdges.geometry.computeBoundingBox();
    expect(routeEdges.geometry.boundingBox?.max.y).toBeLessThanOrEqual(4.25);
    expect(slice.group.getObjectByName("r04-open-route-anchor")?.userData.bounds)
      .toEqual(R04_LIVE_PROFILE.composition.openRoute);

    slice.dispose();
  }, 20_000);

  it("adds dense fixed-camera urban layers and foreground ecology", () => {
    const slice = createR04ArtSlice();
    const facade = slice.group.getObjectByName(
      "r04-layered-fixed-camera-facades",
    );
    const windows = slice.group.getObjectByName("r04-window-bands");
    const rails = slice.group.getObjectByName("r04-rails-awnings-roof-edges");
    const vines = slice.group.getObjectByName(
      "r04-facade-vines-repair-decals",
    );
    const vegetation = slice.group.getObjectByName(
      "r04-high-density-edge-vegetation",
    );

    for (const object of [facade, windows, rails, vines, vegetation]) {
      expect(object).toBeInstanceOf(THREE.Mesh);
    }
    expect(
      (facade as THREE.Mesh).geometry.userData.componentCount,
    ).toBeGreaterThan(20);
    expect(
      (windows as THREE.Mesh).geometry.userData.componentCount,
    ).toBeGreaterThan(20);
    expect(
      (vegetation as THREE.Mesh).geometry.userData.componentCount,
    ).toBeGreaterThan(1_500);

    slice.dispose();
  }, 20_000);

  it("keeps solid facades collider-backed and decorative skyline outside reach", () => {
    const slice = createR04ArtSlice();
    const facade = slice.group.getObjectByName(
      "r04-layered-fixed-camera-facades",
    );
    const scrims = [
      slice.group.getObjectByName("r04-nonsolid-distant-ghost-scrims"),
      slice.group.getObjectByName("r04-nonsolid-distant-scrim-frames"),
    ];

    expect(facade).toBeInstanceOf(THREE.Mesh);
    expect(facade?.userData.collisionRole).toBe(
      "authoritative-collider-backed-facade",
    );
    expect(facade?.userData.authoritativeColliderIds).toEqual([
      "town-hall",
      "south-house",
    ]);

    const footprints = facade?.userData.groundFootprints as readonly {
      readonly colliderId: string;
      readonly minimumX: number;
      readonly maximumX: number;
      readonly minimumZ: number;
      readonly maximumZ: number;
    }[];
    for (const footprint of footprints) {
      const collider = TERRAIN_PLACEMENTS.find(
        (terrain) => terrain.id === footprint.colliderId,
      );
      expect(collider?.solid).toBe(true);
      expect(footprint).toMatchObject({
        minimumX: collider?.bounds.x,
        maximumX: (collider?.bounds.x ?? 0) + (collider?.bounds.width ?? 0),
        minimumZ: collider?.bounds.y,
        maximumZ: (collider?.bounds.y ?? 0) + (collider?.bounds.height ?? 0),
      });
    }

    for (const scrim of scrims) {
      expect(scrim).toBeInstanceOf(THREE.Mesh);
      if (!(scrim instanceof THREE.Mesh)) {
        throw new Error("R04 distant scrim batch is missing.");
      }
      scrim.geometry.computeBoundingBox();
      expect(scrim.geometry.boundingBox?.max.x).toBeLessThan(0);
      expect(scrim.userData).toMatchObject({
        collisionRole: "non-solid-distant-ghost-scrim",
        worldBoundary: "west",
        maximumReachableX: 0,
        outsideReachableWorld: true,
      });
      expect(scrim.castShadow).toBe(false);
      expect(scrim.material).toBeInstanceOf(THREE.MeshStandardMaterial);
      if (!(scrim.material instanceof THREE.MeshStandardMaterial)) {
        throw new Error("R04 distant scrim material is missing.");
      }
      expect(scrim.material.transparent).toBe(true);
      expect(scrim.material.depthWrite).toBe(false);
      expect(scrim.material.opacity).toBeLessThan(0.5);
    }
    expect(slice.group.userData.generationProvenance).toMatchObject({
      causalColliderParity: true,
      solidFacadePolicy: "authoritative-collider-backed-only",
      decorativeFacadePolicy: "non-solid-scrims-outside-reachable-world",
    });

    slice.dispose();
  }, 20_000);

  it("rejects unclassified inherited solids and removes the unbound anomaly", () => {
    const slice = createR04ArtSlice();
    const removedNames = [
      "beauty-cell-stair-retaining-shell",
      "beauty-cell-far-left-shell",
      "beauty-cell-far-right-shell",
      "beauty-cell-world-space-anomaly",
    ] as const;
    for (const name of removedNames) {
      expect(slice.group.getObjectByName(name)).toBeUndefined();
    }
    expect(slice.group.userData.removedUnboundInheritedObjects).toEqual(
      removedNames,
    );

    const anomaly = ENEMY_PLACEMENTS.find(
      (placement) => placement.id === ANOMALY_ID,
    );
    expect(anomaly).toBeDefined();
    expect(slice.group.userData.authoritativeAnomaly).toEqual({
      id: ANOMALY_ID,
      initialX: anomaly?.x,
      initialZ: anomaly?.y,
      source: "simulation-enemy-state",
    });

    const inheritedMeshes: THREE.Mesh[] = [];
    slice.group.traverse((object) => {
      if (
        object instanceof THREE.Mesh &&
        object.name.startsWith("beauty-cell-")
      ) {
        inheritedMeshes.push(object);
      }
    });
    const auditedNames = slice.group.userData.inheritedCausalAudit
      .classifiedMeshNames as readonly string[];
    expect(inheritedMeshes.map(({ name }) => name).sort()).toEqual(
      [...auditedNames].sort(),
    );

    for (const mesh of inheritedMeshes) {
      const role = mesh.userData.r04CausalRole as string | undefined;
      expect(role, `${mesh.name} lacks a causal role`).toBeDefined();
      const bounds = new THREE.Box3().setFromObject(mesh);
      const insideReachableWorld =
        bounds.max.x >= 0 &&
        bounds.min.x <= WORLD_WIDTH &&
        bounds.max.z >= 0 &&
        bounds.min.z <= WORLD_HEIGHT;
      if (!insideReachableWorld) {
        continue;
      }
      const materials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];
      const opaque = materials.every(
        (material) => !material.transparent || material.opacity >= 0.95,
      );
      const groundReachableVolume =
        bounds.min.y < 48 && bounds.max.y - bounds.min.y > 12;
      const naturallyNonSolid =
        role === "non-solid-ecology" || role === "non-solid-effect";
      const colliderIds = mesh.userData.authoritativeColliderIds;
      const colliderBacked =
        Array.isArray(colliderIds) && colliderIds.length > 0;

      expect(
        opaque && groundReachableVolume && !naturallyNonSolid &&
          !colliderBacked,
        `${mesh.name} is an opaque reachable volume without a collider`,
      ).toBe(false);
      if (role === "non-solid-atmospheric") {
        expect(materials.every((material) => material.transparent)).toBe(true);
        expect(materials.every((material) => !material.depthWrite)).toBe(true);
        expect(mesh.castShadow).toBe(false);
      }
      if (role === "overhead-nonblocking") {
        expect(bounds.min.y).toBeGreaterThanOrEqual(
          Number(mesh.userData.minimumClearance),
        );
      }
    }
    expect(slice.group.userData.generationProvenance).toMatchObject({
      causalColliderParity: true,
      inheritedGeometryPolicy: "classified-or-rejected-at-construction",
      anomalyPolicy: "simulation-enemy-state-only",
    });

    slice.dispose();
  }, 20_000);

  it("is deterministic and disposes idempotently", () => {
    const random = vi.spyOn(Math, "random").mockReturnValue(0.01);
    const first = createR04ArtSlice();
    random.mockReturnValue(0.99);
    const second = createR04ArtSlice();

    try {
      expect(geometryDigest(first.group)).toEqual(geometryDigest(second.group));
      const scene = new THREE.Scene();
      scene.add(first.group);
      first.dispose();
      first.dispose();
      expect(first.group.parent).toBeNull();
      expect(first.group.children).toHaveLength(0);
      expect(first.ground.children).toHaveLength(0);
    } finally {
      second.dispose();
      random.mockRestore();
    }
  }, 30_000);
});
