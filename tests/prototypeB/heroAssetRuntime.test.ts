import { describe, expect, it, vi } from "vitest";
import type { HeroVisual } from "../../src/prototypeB/render/hero";
import {
  resolvePrototypeBHeroAsset,
  type PrototypeBHeroAssetRuntime,
} from "../../src/prototypeB/render/hero/HeroAssetRuntime";

function visual(id: string): HeroVisual {
  return { root: { name: id } } as unknown as HeroVisual;
}

function runtime(createVisual: () => HeroVisual): PrototypeBHeroAssetRuntime {
  return {
    id: "fram.character.f01.gameplay-bridge-v1",
    representation: "compiled-high-density-articulated-voxel-surface",
    characterPreset: "f01-build-sheet",
    visibleVoxelCells: 9_454,
    worldScale: 24,
    createVisual,
  };
}

describe("PrototypeB hero asset runtime", () => {
  it("uses a loaded runtime pack without constructing the built-in fallback", () => {
    const packed = visual("packed");
    const fallback = vi.fn(() => visual("fallback"));
    const resolved = resolvePrototypeBHeroAsset(
      { status: "loaded", runtime: runtime(() => packed) },
      fallback,
    );

    expect(resolved.visual).toBe(packed);
    expect(resolved.source).toBe("runtime");
    expect(resolved.status).toBe("loaded");
    expect(resolved.worldScale).toBe(24);
    expect(resolved.assetId).toBe("fram.character.f01.gameplay-bridge-v1");
    expect(fallback).not.toHaveBeenCalled();
  });

  it("falls back when the runtime factory fails", () => {
    const fallbackVisual = visual("fallback");
    const resolved = resolvePrototypeBHeroAsset(
      {
        status: "loaded",
        runtime: runtime(() => {
          throw new Error("corrupt pack");
        }),
      },
      () => fallbackVisual,
    );

    expect(resolved.visual).toBe(fallbackVisual);
    expect(resolved.source).toBe("built-in");
    expect(resolved.status).toBe("factory-failed");
    expect(resolved.worldScale).toBeUndefined();
  });

  it.each(["disabled", "timeout", "failed"] as const)(
    "keeps gameplay available when loading is %s",
    (status) => {
      const fallbackVisual = visual("fallback");
      const resolved = resolvePrototypeBHeroAsset(
        { status },
        () => fallbackVisual,
      );

      expect(resolved.visual).toBe(fallbackVisual);
      expect(resolved.source).toBe("built-in");
      expect(resolved.status).toBe(status);
    },
  );
});
