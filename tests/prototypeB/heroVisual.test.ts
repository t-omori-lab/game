import { describe, expect, it } from "vitest";
import { PLAYER_RECIPE } from "../../src/prototypeB/voxel";
import {
  HERO_PART_IDS,
  createHeroVisual,
  partitionHeroRecipe,
  sampleHeroPose,
} from "../../src/prototypeB/render/hero";

describe("articulated hero visual", () => {
  it("partitions every canonical voxel into exactly one semantic part", () => {
    const parts = partitionHeroRecipe();
    const partitionedVoxels = HERO_PART_IDS.flatMap(
      (partId) => parts[partId].voxels,
    );
    const coordinates = partitionedVoxels.map(
      (voxel) => `${voxel.x},${voxel.y},${voxel.z}`,
    );

    expect(partitionedVoxels).toHaveLength(PLAYER_RECIPE.voxels.length);
    expect(new Set(coordinates).size).toBe(PLAYER_RECIPE.voxels.length);
    for (const partId of HERO_PART_IDS) {
      expect(parts[partId].voxels.length, partId).toBeGreaterThan(0);
      expect(parts[partId].palette).toBe(PLAYER_RECIPE.palette);
    }
  });

  it("builds a right-arm weapon socket and distinct authored action poses", () => {
    const visual = createHeroVisual();

    expect(visual.mode).toBe("articulated");
    expect(visual.weaponSocket.parent).toBe(visual.partGroups["right-arm"]);
    expect(visual.mergedMesh).toBeNull();
    expect(
      HERO_PART_IDS.every((partId) => visual.partMeshes[partId] !== null),
    ).toBe(true);

    const windup = sampleHeroPose({
      motion: "windup",
      timeSeconds: 0,
      progress: 1,
    });
    const hit = sampleHeroPose({
      motion: "hit",
      timeSeconds: 0,
      progress: 1,
    });
    const run = sampleHeroPose({ motion: "run", timeSeconds: 0.15 });
    const skill = sampleHeroPose({
      motion: "skill",
      timeSeconds: 0,
      progress: 0.5,
    });

    expect(windup.parts["right-arm"].rotation[0]).toBeLessThan(0);
    expect(hit.parts["right-arm"].rotation[0]).toBeGreaterThan(1);
    expect(run.parts["left-leg"].rotation[0]).toBeCloseTo(
      -run.parts["right-leg"].rotation[0],
    );
    expect(skill.parts.equipment.scale[0]).toBeGreaterThan(1);
    visual.dispose();
  });

  it("retains a single-mesh fallback with a canonical weapon socket", () => {
    const visual = createHeroVisual({ mode: "merged" });

    expect(visual.mergedMesh).not.toBeNull();
    expect(visual.weaponSocket.parent).toBe(visual.motionRoot);
    expect(
      HERO_PART_IDS.every((partId) => visual.partMeshes[partId] === null),
    ).toBe(true);
    visual.dispose();
  });
});
