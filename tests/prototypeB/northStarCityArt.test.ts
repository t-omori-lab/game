import * as THREE from "three";
import { describe, expect, it, vi } from "vitest";
import {
  NORTH_STAR_CITY_ART_BUDGET,
  createNorthStarCityArtSlice,
  measureNorthStarCityArtSlice,
} from "../../src/prototypeB/render/northStarCityArt";
import { TOWN_CONTRACT_BOARD_POSITION } from "../../src/prototypeB/sim";

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

function textureDigest(texture: THREE.DataTexture): number {
  const image = texture.image as { readonly data: ArrayLike<number> };
  let digest = 2_166_136_261;
  for (let index = 0; index < image.data.length; index += 1) {
    digest = Math.imul(digest ^ (image.data[index] ?? 0), 16_777_619);
  }
  return digest >>> 0;
}

function uvBoundsForFace(
  geometry: THREE.BufferGeometry,
  faceNormal: readonly [number, number, number],
): { minimumU: number; maximumU: number; minimumV: number; maximumV: number } {
  const uv = geometry.getAttribute("uv");
  const normal = geometry.getAttribute("normal");
  let minimumU = Number.POSITIVE_INFINITY;
  let maximumU = Number.NEGATIVE_INFINITY;
  let minimumV = Number.POSITIVE_INFINITY;
  let maximumV = Number.NEGATIVE_INFINITY;

  for (let index = 0; index < normal.count; index += 1) {
    const alignment =
      normal.getX(index) * faceNormal[0] +
      normal.getY(index) * faceNormal[1] +
      normal.getZ(index) * faceNormal[2];
    if (alignment < 0.99) {
      continue;
    }
    minimumU = Math.min(minimumU, uv.getX(index));
    maximumU = Math.max(maximumU, uv.getX(index));
    minimumV = Math.min(minimumV, uv.getY(index));
    maximumV = Math.max(maximumV, uv.getY(index));
  }

  return { minimumU, maximumU, minimumV, maximumV };
}

describe("North Star overgrown city art slice", () => {
  it("preserves renderer fixture IDs and exposes urban-causality evidence", () => {
    const slice = createNorthStarCityArtSlice();

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
    expect(slice.group.name).toBe("north-star-city-art-slice");
    expect(slice.ground.name).toBe("north-star-city-ground");
    expect(slice.ground.parent).toBe(slice.group);
    expect(slice.group.userData.environmentKind).toBe(
      "overgrown-modern-city",
    );
    expect(slice.group.userData.oldUseSignals).toEqual(
      expect.arrayContaining([
        "crosswalk-and-lane-markings",
        "mixed-use-apartment-balconies",
        "elevated-rail-platform-fragment",
      ]),
    );
    expect(slice.group.userData.causalGrowthZones).toHaveLength(3);
    expect(slice.group.userData.lifeSignals).toEqual(
      expect.arrayContaining([
        "rain-capture-and-filter",
        "kitchen-garden",
        "working-amber-lights",
      ]),
    );
    expect(slice.group.userData.surfaceProfile).toBe(
      "north-star-surface-v2",
    );
    expect(slice.group.userData.surfaceProvenance).toMatchObject({
      profile: "north-star-surface-v2",
      deterministic: true,
      source: "procedural-dev-candidate",
    });

    slice.dispose();
  }, 15_000);

  it("keeps the spawn corridor open and contract kiosk on authoritative coordinates", () => {
    const slice = createNorthStarCityArtSlice();
    const kiosk = slice.group.getObjectByName(
      "north-star-contract-kiosk-anchor",
    );

    expect(slice.group.userData.spawnPosition).toEqual({ x: 430, y: 900 });
    expect(slice.group.userData.playerCorridor).toEqual({
      centerZ: 900,
      minimumX: 390,
      maximumX: 820,
      clearHalfWidth: 70,
    });
    expect(slice.group.userData.contractBoardPosition).toEqual(
      TOWN_CONTRACT_BOARD_POSITION,
    );
    expect(kiosk?.position.toArray()).toEqual([
      TOWN_CONTRACT_BOARD_POSITION.x,
      0,
      TOWN_CONTRACT_BOARD_POSITION.y,
    ]);
    expect(kiosk?.userData.interactionPoint).toEqual(
      TOWN_CONTRACT_BOARD_POSITION,
    );
    expect(slice.group.userData.nonBlockingOverheadBounds.minimumY).toBe(
      150,
    );

    slice.dispose();
  }, 15_000);

  it("uses a bounded batched PBR scene with non-flat materials", () => {
    const slice = createNorthStarCityArtSlice();
    const metrics = measureNorthStarCityArtSlice(slice.group);
    const meshes: THREE.Mesh[] = [];
    const asphalt = slice.group.getObjectByName("north-star-city-asphalt");

    slice.group.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        meshes.push(object);
      }
    });

    expect(metrics).toEqual(slice.group.userData.metrics);
    expect(metrics.drawCalls).toBeGreaterThanOrEqual(16);
    expect(metrics.drawCalls).toBeLessThanOrEqual(
      NORTH_STAR_CITY_ART_BUDGET.maximumDrawCalls,
    );
    expect(metrics.triangles).toBeGreaterThan(8_000);
    expect(metrics.triangles).toBeLessThanOrEqual(
      NORTH_STAR_CITY_ART_BUDGET.maximumTriangles,
    );
    expect(metrics.components).toBeGreaterThan(500);
    expect(metrics.geometries).toBe(metrics.drawCalls);
    expect(
      meshes.every(
        (mesh) =>
          mesh.material instanceof THREE.MeshStandardMaterial &&
          mesh.material.flatShading === false,
      ),
    ).toBe(true);
    expect(
      meshes.some(
        (mesh) => mesh.material instanceof THREE.MeshPhysicalMaterial,
      ),
    ).toBe(true);
    expect(meshes.some((mesh) => mesh.castShadow)).toBe(true);
    expect(
      (slice.ground.children as THREE.Mesh[]).every(
        (mesh) => mesh.receiveShadow,
      ),
    ).toBe(true);
    if (
      !(asphalt instanceof THREE.Mesh) ||
      !(asphalt.material instanceof THREE.MeshStandardMaterial) ||
      !(asphalt.material.map instanceof THREE.DataTexture) ||
      !(asphalt.material.normalMap instanceof THREE.DataTexture) ||
      !(asphalt.material.roughnessMap instanceof THREE.DataTexture)
    ) {
      throw new Error("North Star asphalt PBR channels are missing.");
    }
    expect(asphalt.material.map.image).toMatchObject({
      width: 1_024,
      height: 1_024,
    });
    expect(asphalt.material.map.colorSpace).toBe(THREE.SRGBColorSpace);
    expect(asphalt.material.normalMap.colorSpace).toBe(THREE.NoColorSpace);
    expect(asphalt.material.roughnessMap.colorSpace).toBe(
      THREE.NoColorSpace,
    );
    expect(asphalt.material.map.magFilter).toBe(THREE.LinearFilter);
    expect(asphalt.material.map.minFilter).toBe(
      THREE.LinearMipmapLinearFilter,
    );
    expect(asphalt.material.map.generateMipmaps).toBe(true);

    for (const name of [
      "north-star-city-north-apartment-shell",
      "north-star-city-north-apartment-roof",
      "north-star-city-south-clinic-shell",
      "north-star-city-south-clinic-roof",
    ]) {
      const surfaceMesh = slice.group.getObjectByName(name);
      if (
        !(surfaceMesh instanceof THREE.Mesh) ||
        !(surfaceMesh.material instanceof THREE.MeshStandardMaterial)
      ) {
        throw new Error(`Textured architecture mesh ${name} is missing.`);
      }
      expect(surfaceMesh.geometry.getAttribute("uv")).toBeDefined();
      expect(surfaceMesh.material.map).toBeInstanceOf(THREE.DataTexture);
      expect(surfaceMesh.material.normalMap).toBeInstanceOf(
        THREE.DataTexture,
      );
      expect(surfaceMesh.material.roughnessMap).toBeInstanceOf(
        THREE.DataTexture,
      );
      expect(surfaceMesh.castShadow).toBe(true);
      expect(surfaceMesh.receiveShadow).toBe(true);
    }

    const apartmentShell = slice.group.getObjectByName(
      "north-star-city-north-apartment-shell",
    );
    if (!(apartmentShell instanceof THREE.Mesh)) {
      throw new Error("North apartment shell is missing.");
    }
    const positiveX = uvBoundsForFace(
      apartmentShell.geometry,
      [1, 0, 0],
    );
    const positiveZ = uvBoundsForFace(
      apartmentShell.geometry,
      [0, 0, 1],
    );
    expect(positiveX.maximumU - positiveX.minimumU).toBeCloseTo(
      140 / 152,
      4,
    );
    expect(positiveX.maximumV - positiveX.minimumV).toBeCloseTo(1, 4);
    expect(positiveZ.maximumU - positiveZ.minimumU).toBeCloseTo(1, 4);
    expect(positiveZ.maximumV - positiveZ.minimumV).toBeCloseTo(
      152 / 244,
      4,
    );
    expect([positiveX.minimumU, positiveX.minimumV]).not.toEqual([
      positiveZ.minimumU,
      positiveZ.minimumV,
    ]);

    slice.dispose();
  }, 15_000);

  it("keeps generated content independent of Math.random UUID noise", () => {
    const random = vi.spyOn(Math, "random").mockReturnValue(0.03125);
    const first = createNorthStarCityArtSlice();
    random.mockReturnValue(0.96875);
    const second = createNorthStarCityArtSlice();

    try {
      const firstAsphalt = first.group.getObjectByName(
        "north-star-city-asphalt",
      );
      const secondAsphalt = second.group.getObjectByName(
        "north-star-city-asphalt",
      );
      if (
        !(firstAsphalt instanceof THREE.Mesh) ||
        !(secondAsphalt instanceof THREE.Mesh) ||
        !(firstAsphalt.material instanceof THREE.MeshStandardMaterial) ||
        !(secondAsphalt.material instanceof THREE.MeshStandardMaterial) ||
        !(firstAsphalt.material.map instanceof THREE.DataTexture) ||
        !(secondAsphalt.material.map instanceof THREE.DataTexture)
      ) {
        throw new Error("Deterministic asphalt texture is missing.");
      }

      expect(measureNorthStarCityArtSlice(first.group)).toEqual(
        measureNorthStarCityArtSlice(second.group),
      );
      expect(geometryDigest(first.group)).toEqual(
        geometryDigest(second.group),
      );
      expect(textureDigest(firstAsphalt.material.map)).toBe(
        textureDigest(secondAsphalt.material.map),
      );
    } finally {
      first.dispose();
      second.dispose();
      random.mockRestore();
    }
  }, 15_000);

  it("disposes geometry, materials, textures, and group idempotently", () => {
    const slice = createNorthStarCityArtSlice();
    const scene = new THREE.Scene();
    const asphalt = slice.group.getObjectByName("north-star-city-asphalt");

    if (
      !(asphalt instanceof THREE.Mesh) ||
      !(asphalt.material instanceof THREE.MeshStandardMaterial) ||
      !(asphalt.material.map instanceof THREE.DataTexture) ||
      !(asphalt.material.normalMap instanceof THREE.DataTexture) ||
      !(asphalt.material.roughnessMap instanceof THREE.DataTexture)
    ) {
      throw new Error("Asphalt resources are missing.");
    }

    let geometryDisposals = 0;
    let materialDisposals = 0;
    let textureDisposals = 0;
    asphalt.geometry.addEventListener("dispose", () => {
      geometryDisposals += 1;
    });
    asphalt.material.addEventListener("dispose", () => {
      materialDisposals += 1;
    });
    const asphaltTextures = [
      asphalt.material.map,
      asphalt.material.normalMap,
      asphalt.material.roughnessMap,
    ] as const;
    asphaltTextures.forEach((texture) => texture.addEventListener("dispose", () => {
      textureDisposals += 1;
    }));
    scene.add(slice.group);

    slice.dispose();
    slice.dispose();

    expect(geometryDisposals).toBe(1);
    expect(materialDisposals).toBe(1);
    expect(textureDisposals).toBe(3);
    expect(slice.group.parent).toBeNull();
    expect(slice.group.children).toHaveLength(0);
    expect(slice.ground.children).toHaveLength(0);
  }, 15_000);
});
