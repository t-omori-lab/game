import * as THREE from "three";
import { describe, expect, it, vi } from "vitest";
import {
  NORTH_STAR_SURFACE_GENERATOR,
  NORTH_STAR_SURFACE_GENERATOR_VERSION,
  NORTH_STAR_SURFACE_PROFILE,
  NORTH_STAR_SURFACE_SEED,
  NORTH_STAR_SURFACE_SOURCE,
  createNorthStarSurfaceLibrary,
  type NorthStarSurfaceChannel,
  type NorthStarSurfaceName,
  type NorthStarSurfaceSet,
} from "../../src/prototypeB/render/northStarSurfaceTextures";

function textureBytes(texture: THREE.DataTexture): Uint8Array {
  const image = texture.image as { readonly data: Uint8Array };
  return image.data;
}

function digestBytes(data: Uint8Array): string {
  let digest = 2_166_136_261;
  for (let index = 0; index < data.length; index += 1) {
    digest = Math.imul(digest ^ (data[index] ?? 0), 16_777_619);
  }
  return `fnv1a32:${(digest >>> 0).toString(16).padStart(8, "0")}`;
}

function entries(
  library: ReturnType<typeof createNorthStarSurfaceLibrary>,
): readonly [NorthStarSurfaceName, NorthStarSurfaceSet][] {
  return [
    ["asphalt", library.asphalt],
    ["concrete", library.concrete],
    ["roof", library.roof],
  ];
}

function textureEntries(
  surface: NorthStarSurfaceSet,
): readonly [NorthStarSurfaceChannel, THREE.DataTexture][] {
  return [
    ["albedo", surface.albedoMap],
    ["normal", surface.normalMap],
    ["roughness", surface.roughnessMap],
  ];
}

function expectSeamless(texture: THREE.DataTexture, resolution: number): void {
  const data = textureBytes(texture);
  for (let y = 0; y < resolution; y += 1) {
    for (let channel = 0; channel < 4; channel += 1) {
      expect(data[(y * resolution) * 4 + channel]).toBe(
        data[(y * resolution + resolution - 1) * 4 + channel],
      );
    }
  }
  for (let x = 0; x < resolution; x += 1) {
    for (let channel = 0; channel < 4; channel += 1) {
      expect(data[x * 4 + channel]).toBe(
        data[((resolution - 1) * resolution + x) * 4 + channel],
      );
    }
  }
}

describe("North Star coherent PBR surface library", () => {
  it("configures nine high-resolution textures with explicit provenance", () => {
    const library = createNorthStarSurfaceLibrary();

    expect(library.asphalt.resolution).toBe(1_024);
    expect(library.concrete.resolution).toBe(1_024);
    expect(library.roof.resolution).toBe(512);
    expect(library.provenance).toMatchObject({
      profile: NORTH_STAR_SURFACE_PROFILE,
      generator: NORTH_STAR_SURFACE_GENERATOR,
      version: NORTH_STAR_SURFACE_GENERATOR_VERSION,
      seed: NORTH_STAR_SURFACE_SEED,
      deterministic: true,
      source: NORTH_STAR_SURFACE_SOURCE,
    });

    for (const [surfaceName, surface] of entries(library)) {
      expect(library.provenance.surfaces[surfaceName].resolution).toBe(
        surface.resolution,
      );
      expect(library.provenance.surfaces[surfaceName].digests).toEqual(
        surface.digests,
      );
      expect(library.provenance.surfaces[surfaceName].cues.length).toBe(4);

      for (const [channel, texture] of textureEntries(surface)) {
        expect(texture).toBeInstanceOf(THREE.DataTexture);
        expect(texture.image).toMatchObject({
          width: surface.resolution,
          height: surface.resolution,
        });
        expect(texture.colorSpace).toBe(
          channel === "albedo" ? THREE.SRGBColorSpace : THREE.NoColorSpace,
        );
        expect(texture.wrapS).toBe(THREE.RepeatWrapping);
        expect(texture.wrapT).toBe(THREE.RepeatWrapping);
        expect(texture.magFilter).toBe(THREE.LinearFilter);
        expect(texture.minFilter).toBe(THREE.LinearMipmapLinearFilter);
        expect(texture.generateMipmaps).toBe(true);
        expect(texture.anisotropy).toBe(8);
        expectSeamless(texture, surface.resolution);
        expect(texture.userData).toEqual({
          profile: NORTH_STAR_SURFACE_PROFILE,
          generator: NORTH_STAR_SURFACE_GENERATOR,
          version: NORTH_STAR_SURFACE_GENERATOR_VERSION,
          seed: library.provenance.surfaces[surfaceName].seed,
          baseSeed: NORTH_STAR_SURFACE_SEED,
          surface: surfaceName,
          channel,
          resolution: surface.resolution,
          contentDigest: surface.digests[channel],
          deterministic: true,
          source: NORTH_STAR_SURFACE_SOURCE,
        });
      }
    }

    library.dispose();
  }, 15_000);

  it("stores verified content digests and varied roughness in the G channel", () => {
    const library = createNorthStarSurfaceLibrary();

    for (const [, surface] of entries(library)) {
      for (const [channel, texture] of textureEntries(surface)) {
        expect(digestBytes(textureBytes(texture))).toBe(
          surface.digests[channel],
        );
      }

      const roughness = textureBytes(surface.roughnessMap);
      let minimumGreen = 255;
      let maximumGreen = 0;
      for (let index = 1; index < roughness.length; index += 4) {
        minimumGreen = Math.min(minimumGreen, roughness[index] ?? 255);
        maximumGreen = Math.max(maximumGreen, roughness[index] ?? 0);
      }
      expect(maximumGreen - minimumGreen).toBeGreaterThan(40);
      expect(surface.digests.albedo).not.toBe(surface.digests.normal);
      expect(surface.digests.normal).not.toBe(surface.digests.roughness);
    }

    library.dispose();
  }, 15_000);

  it("keeps generated content independent of Math.random", () => {
    const random = vi.spyOn(Math, "random").mockReturnValue(0.03125);
    const first = createNorthStarSurfaceLibrary();
    random.mockReturnValue(0.96875);
    const second = createNorthStarSurfaceLibrary();

    try {
      expect(second.provenance).toEqual(first.provenance);
      for (const [surfaceName, firstSurface] of entries(first)) {
        const secondSurface = second[surfaceName];
        expect(secondSurface.digests).toEqual(firstSurface.digests);
      }
    } finally {
      first.dispose();
      second.dispose();
      random.mockRestore();
    }
  }, 15_000);

  it("owns and disposes all nine textures exactly once", () => {
    const library = createNorthStarSurfaceLibrary();
    const textures = entries(library).flatMap(([, surface]) =>
      textureEntries(surface).map(([, texture]) => texture),
    );
    const disposalCounts = new Map<THREE.DataTexture, number>();

    expect(new Set(textures).size).toBe(9);
    textures.forEach((texture) => {
      disposalCounts.set(texture, 0);
      texture.addEventListener("dispose", () => {
        disposalCounts.set(texture, (disposalCounts.get(texture) ?? 0) + 1);
      });
    });

    library.dispose();
    library.dispose();

    expect([...disposalCounts.values()]).toEqual(new Array(9).fill(1));
  }, 15_000);
});
