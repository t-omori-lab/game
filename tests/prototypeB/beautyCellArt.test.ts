import * as THREE from "three";
import { describe, expect, it, vi } from "vitest";
import {
  BEAUTY_CELL_SPEC,
  createBeautyCellArtSlice,
  measureBeautyCellArt,
} from "../../src/prototypeB/render/beautyCell";
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

describe("AI-native Concept C Beauty Cell art", () => {
  it("compiles the versioned causal spec without a runtime reference image", () => {
    const slice = createBeautyCellArtSlice();

    expect(slice.group.name).toBe("beauty-cell-art-slice");
    expect(slice.ground.name).toBe("beauty-cell-ground");
    expect(slice.group.userData).toMatchObject({
      schemaVersion: BEAUTY_CELL_SPEC.schemaVersion,
      stableId: BEAUTY_CELL_SPEC.stableId,
      seed: BEAUTY_CELL_SPEC.seed,
      environmentKind: "optimistic-reclaimed-modern-city",
      generationProvenance: {
        source: "runtime-procedural-geometry",
        externalAssets: false,
        referenceImageUsedAtRuntime: false,
      },
    });
    expect(slice.group.userData.modules).toHaveLength(7);
    expect(slice.group.userData.modules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ stableId: "cbc-threshold-rain-stairs" }),
        expect.objectContaining({ stableId: "cbc-shelter-transit-04" }),
        expect.objectContaining({ stableId: "cbc-landmark-real-anomaly" }),
      ]),
    );

    slice.dispose();
  }, 20_000);

  it("keeps authoritative interaction coordinates and the player corridor", () => {
    const slice = createBeautyCellArtSlice();
    const anchor = slice.group.getObjectByName("beauty-cell-contract-anchor");

    expect(slice.group.userData.spawnPosition).toEqual({ x: 430, y: 900 });
    expect(slice.group.userData.playerCorridor).toEqual(
      BEAUTY_CELL_SPEC.clearPlayerCorridor,
    );
    expect(anchor?.position.toArray()).toEqual([
      TOWN_CONTRACT_BOARD_POSITION.x,
      0,
      TOWN_CONTRACT_BOARD_POSITION.y,
    ]);
    expect(anchor?.userData.interactionPoint).toEqual(
      TOWN_CONTRACT_BOARD_POSITION,
    );
    expect([...slice.replacedTerrainIds]).toContain("town-board-collider");
    expect([...slice.replacedPropIds]).toContain("town-contract-board");
    for (const terrainId of slice.replacedTerrainIds) {
      const visual = slice.group.getObjectByName(
        `beauty-cell-collider-visual-${terrainId}`,
      );
      expect(visual, `${terrainId} needs a visible collider counterpart`).toBeDefined();
      expect(visual?.userData.bounds).toBeDefined();
    }

    slice.dispose();
  }, 20_000);

  it("contains all focal masses in a dense, batched PBR scene", () => {
    const slice = createBeautyCellArtSlice();
    const metrics = measureBeautyCellArt(slice.group);
    const asphalt = slice.group.getObjectByName("beauty-cell-wet-asphalt");

    expect(metrics).toEqual(slice.group.userData.metrics);
    expect(metrics.drawCalls).toBeGreaterThanOrEqual(20);
    expect(metrics.drawCalls).toBeLessThan(42);
    expect(metrics.triangles).toBeGreaterThan(28_000);
    expect(metrics.triangles).toBeLessThan(120_000);
    expect(metrics.components).toBeGreaterThan(1_500);
    expect(slice.group.getObjectByName("beauty-cell-stair-retaining-shell")).toBeDefined();
    expect(slice.group.getObjectByName("beauty-cell-transit-roof")).toBeDefined();
    expect(slice.group.getObjectByName("beauty-cell-spillway-water")).toBeDefined();
    expect(slice.group.getObjectByName("beauty-cell-world-space-anomaly")).toBeDefined();
    expect(slice.group.getObjectByName("beauty-cell-causal-foliage")).toBeDefined();
    expect(slice.group.getObjectByName("beauty-cell-collider-visual-anchors")).toBeDefined();

    if (
      !(asphalt instanceof THREE.Mesh) ||
      !(asphalt.material instanceof THREE.MeshPhysicalMaterial)
    ) {
      throw new Error("Beauty Cell wet asphalt is missing.");
    }
    expect(asphalt.material.map).toBeInstanceOf(THREE.DataTexture);
    expect(asphalt.material.normalMap).toBeInstanceOf(THREE.DataTexture);
    expect(asphalt.material.roughnessMap).toBeInstanceOf(THREE.DataTexture);
    expect(asphalt.material.clearcoat).toBeGreaterThan(0.3);
    expect(slice.group.getObjectByName("beauty-cell-working-signals")).toBeDefined();

    slice.dispose();
  }, 20_000);

  it("is deterministic even when Math.random changes", () => {
    const random = vi.spyOn(Math, "random").mockReturnValue(0.01);
    const first = createBeautyCellArtSlice();
    random.mockReturnValue(0.99);
    const second = createBeautyCellArtSlice();

    try {
      expect(measureBeautyCellArt(first.group)).toEqual(
        measureBeautyCellArt(second.group),
      );
      expect(geometryDigest(first.group)).toEqual(geometryDigest(second.group));
    } finally {
      first.dispose();
      second.dispose();
      random.mockRestore();
    }
  }, 30_000);
});
