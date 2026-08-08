import { describe, expect, it, vi } from "vitest";
import type { PrototypeBHeroAssetRuntime } from "../../src/prototypeB/render/hero/HeroAssetRuntime";
import { loadR09HeroAsset } from "../../src/r09/loadR09HeroAsset";

const runtime = {
  id: "test-runtime",
  representation: "compiled-test",
  characterPreset: "test-preset",
  visibleVoxelCells: 1,
  worldScale: 1,
  createVisual: vi.fn(),
} satisfies PrototypeBHeroAssetRuntime;

describe("R09 hero asset loader", () => {
  it("does not import the pack when the legacy fallback is requested", async () => {
    const importer = vi.fn(async () => ({ R09_HERO_ASSET_RUNTIME: runtime }));
    const result = await loadR09HeroAsset("?actor=legacy", 50, importer);

    expect(result).toEqual({ status: "disabled" });
    expect(importer).not.toHaveBeenCalled();
  });

  it("returns the dynamically loaded runtime contract", async () => {
    const result = await loadR09HeroAsset("", 50, async () => ({
      R09_HERO_ASSET_RUNTIME: runtime,
    }));

    expect(result.status).toBe("loaded");
    expect(result.runtime).toBe(runtime);
  });

  it("classifies import rejection and timeout without blocking gameplay", async () => {
    const rejected = await loadR09HeroAsset("", 50, async () => {
      throw new Error("network");
    });
    const timedOut = await loadR09HeroAsset(
      "",
      1,
      () => new Promise(() => undefined),
    );

    expect(rejected).toEqual({ status: "failed" });
    expect(timedOut).toEqual({ status: "timeout" });
  });
});
