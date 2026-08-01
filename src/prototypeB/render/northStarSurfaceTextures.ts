import * as THREE from "three";

export const NORTH_STAR_SURFACE_PROFILE = "north-star-surface-v2";
export const NORTH_STAR_SURFACE_GENERATOR =
  "north-star-coherent-surface-generator";
export const NORTH_STAR_SURFACE_GENERATOR_VERSION = "2.0.0";
export const NORTH_STAR_SURFACE_SEED = 0x4e_53_56_32;
export const NORTH_STAR_SURFACE_SOURCE = "procedural-dev-candidate";

export type NorthStarSurfaceName = "asphalt" | "concrete" | "roof";
export type NorthStarSurfaceChannel = "albedo" | "normal" | "roughness";

export interface NorthStarSurfaceDigests {
  readonly albedo: string;
  readonly normal: string;
  readonly roughness: string;
}

export interface NorthStarSurfaceSet {
  readonly albedoMap: THREE.DataTexture;
  readonly normalMap: THREE.DataTexture;
  readonly roughnessMap: THREE.DataTexture;
  readonly resolution: number;
  readonly digests: NorthStarSurfaceDigests;
}

export interface NorthStarSurfaceProvenanceEntry {
  readonly resolution: number;
  readonly seed: number;
  readonly repeat: readonly [number, number];
  readonly normalStrength: number;
  readonly channelEncoding: Readonly<
    Record<NorthStarSurfaceChannel, string>
  >;
  readonly digests: NorthStarSurfaceDigests;
  readonly cues: readonly string[];
}

export interface NorthStarSurfaceLibraryProvenance {
  readonly profile: typeof NORTH_STAR_SURFACE_PROFILE;
  readonly generator: typeof NORTH_STAR_SURFACE_GENERATOR;
  readonly version: typeof NORTH_STAR_SURFACE_GENERATOR_VERSION;
  readonly seed: typeof NORTH_STAR_SURFACE_SEED;
  readonly deterministic: true;
  readonly source: typeof NORTH_STAR_SURFACE_SOURCE;
  readonly surfaces: Readonly<
    Record<NorthStarSurfaceName, NorthStarSurfaceProvenanceEntry>
  >;
}

export interface NorthStarSurfaceLibrary {
  readonly asphalt: NorthStarSurfaceSet;
  readonly concrete: NorthStarSurfaceSet;
  readonly roof: NorthStarSurfaceSet;
  readonly provenance: NorthStarSurfaceLibraryProvenance;
  dispose(): void;
}

interface SurfaceSpecification {
  readonly resolution: number;
  readonly seedOffset: number;
  readonly repeat: readonly [number, number];
  readonly normalStrength: number;
  readonly cues: readonly string[];
}

interface SurfaceBuffers {
  readonly albedo: Uint8Array;
  readonly normal: Uint8Array;
  readonly roughness: Uint8Array;
}

interface CachedSurfaceSource {
  readonly buffers: SurfaceBuffers;
  readonly digests: NorthStarSurfaceDigests;
}

// The first PC Ultra load still generates the candidate synchronously. Keep
// its immutable source fields so a renderer restart does not repeat the costly
// height/normal/digest work; each library still owns distinct GPU textures.
const SURFACE_SOURCE_CACHE = new Map<
  NorthStarSurfaceName,
  CachedSurfaceSource
>();

const SURFACE_SPECIFICATIONS: Readonly<
  Record<NorthStarSurfaceName, SurfaceSpecification>
> = {
  asphalt: {
    resolution: 1_024,
    seedOffset: 0x0a_51_fa_17,
    // Macro wear cues should occur once across the city cell; the 1024px
    // source still carries enough aggregate detail without obvious tiling.
    repeat: [1.08, 1.03],
    normalStrength: 3.4,
    cues: [
      "graded-aggregate",
      "hairline-crack-network",
      "utility-cut-patch",
      "damp-drainage-seam",
    ],
  },
  concrete: {
    resolution: 1_024,
    seedOffset: 0x0c_0a_c2_e7,
    repeat: [1, 1],
    normalStrength: 4.8,
    cues: [
      "exposed-aggregate",
      "rain-runoff-streaks",
      "mineral-bloom",
      "board-formed-repair-panel",
    ],
  },
  roof: {
    resolution: 512,
    seedOffset: 0x00_70_0f_22,
    repeat: [1, 1],
    normalStrength: 6.4,
    cues: [
      "embedded-roof-gravel",
      "membrane-lap-seams",
      "ponding-water-ring",
      "maintenance-patch",
    ],
  },
};

const SURFACE_CHANNEL_ENCODING: Readonly<
  Record<NorthStarSurfaceChannel, string>
> = Object.freeze({
  albedo: "srgb-rgba8",
  normal: "linear-rgba8-tangent-space",
  roughness: "linear-rgba8-g-channel",
});

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}

function byte(value: number): number {
  return Math.round(clamp(value, 0, 255));
}

function smoothstep(value: number): number {
  return value * value * (3 - 2 * value);
}

function lerp(start: number, end: number, amount: number): number {
  return start + (end - start) * amount;
}

function hash2D(x: number, y: number, seed: number, salt = 0): number {
  let value =
    Math.imul(x ^ seed, 0x1656_67b1) ^
    Math.imul(y ^ salt, 0x27d4_eb2d);
  value = Math.imul(value ^ (value >>> 15), 0x85eb_ca6b);
  value = Math.imul(value ^ (value >>> 13), 0xc2b2_ae35);
  return (value ^ (value >>> 16)) >>> 0;
}

function hashUnit(x: number, y: number, seed: number, salt = 0): number {
  return hash2D(x, y, seed, salt) / 0xffff_ffff;
}

function valueNoise(
  x: number,
  y: number,
  cellSize: number,
  seed: number,
  salt: number,
): number {
  const cellX = Math.floor(x / cellSize);
  const cellY = Math.floor(y / cellSize);
  const amountX = smoothstep((x - cellX * cellSize) / cellSize);
  const amountY = smoothstep((y - cellY * cellSize) / cellSize);
  const top = lerp(
    hashUnit(cellX, cellY, seed, salt),
    hashUnit(cellX + 1, cellY, seed, salt),
    amountX,
  );
  const bottom = lerp(
    hashUnit(cellX, cellY + 1, seed, salt),
    hashUnit(cellX + 1, cellY + 1, seed, salt),
    amountX,
  );
  return lerp(top, bottom, amountY);
}

function periodicDistance(value: number, period: number): number {
  const wrapped = ((value % period) + period) % period;
  return Math.min(wrapped, period - wrapped);
}

function rectangleMask(
  normalizedX: number,
  normalizedY: number,
  minimumX: number,
  maximumX: number,
  minimumY: number,
  maximumY: number,
  feather: number,
): number {
  const distance = Math.min(
    normalizedX - minimumX,
    maximumX - normalizedX,
    normalizedY - minimumY,
    maximumY - normalizedY,
  );
  return smoothstep(clamp(distance / feather, 0, 1));
}

function rectangleEdge(
  normalizedX: number,
  normalizedY: number,
  minimumX: number,
  maximumX: number,
  minimumY: number,
  maximumY: number,
  width: number,
): number {
  const inside =
    normalizedX >= minimumX &&
    normalizedX <= maximumX &&
    normalizedY >= minimumY &&
    normalizedY <= maximumY;
  if (!inside) {
    return 0;
  }

  const distance = Math.min(
    normalizedX - minimumX,
    maximumX - normalizedX,
    normalizedY - minimumY,
    maximumY - normalizedY,
  );
  return 1 - smoothstep(clamp(distance / width, 0, 1));
}

function writeColor(
  target: Uint8Array,
  index: number,
  red: number,
  green: number,
  blue: number,
): void {
  const offset = index * 4;
  target[offset] = byte(red);
  target[offset + 1] = byte(green);
  target[offset + 2] = byte(blue);
  target[offset + 3] = 255;
}

function writeRoughness(
  target: Uint8Array,
  index: number,
  roughness: number,
): void {
  const value = byte(clamp(roughness, 0, 1) * 255);
  const offset = index * 4;
  target[offset] = value;
  target[offset + 1] = value;
  target[offset + 2] = value;
  target[offset + 3] = 255;
}

function blendScalarSeams(
  target: Float32Array,
  resolution: number,
): void {
  const blendWidth = Math.max(16, Math.floor(resolution / 16));

  for (let y = 0; y < resolution; y += 1) {
    for (let distance = 0; distance <= blendWidth; distance += 1) {
      const amount = 1 - smoothstep(distance / blendWidth);
      const leftIndex = y * resolution + distance;
      const rightIndex = y * resolution + (resolution - 1 - distance);
      const left = target[leftIndex] ?? 0;
      const right = target[rightIndex] ?? 0;
      const average = (left + right) * 0.5;
      target[leftIndex] = lerp(left, average, amount);
      target[rightIndex] = lerp(right, average, amount);
    }
  }

  for (let x = 0; x < resolution; x += 1) {
    for (let distance = 0; distance <= blendWidth; distance += 1) {
      const amount = 1 - smoothstep(distance / blendWidth);
      const topIndex = distance * resolution + x;
      const bottomIndex = (resolution - 1 - distance) * resolution + x;
      const top = target[topIndex] ?? 0;
      const bottom = target[bottomIndex] ?? 0;
      const average = (top + bottom) * 0.5;
      target[topIndex] = lerp(top, average, amount);
      target[bottomIndex] = lerp(bottom, average, amount);
    }
  }
}

function blendRgbaSeams(target: Uint8Array, resolution: number): void {
  const blendWidth = Math.max(16, Math.floor(resolution / 16));

  for (let y = 0; y < resolution; y += 1) {
    for (let distance = 0; distance <= blendWidth; distance += 1) {
      const amount = 1 - smoothstep(distance / blendWidth);
      const leftOffset = (y * resolution + distance) * 4;
      const rightOffset =
        (y * resolution + (resolution - 1 - distance)) * 4;
      for (let channel = 0; channel < 3; channel += 1) {
        const left = target[leftOffset + channel] ?? 0;
        const right = target[rightOffset + channel] ?? 0;
        const average = (left + right) * 0.5;
        target[leftOffset + channel] = byte(lerp(left, average, amount));
        target[rightOffset + channel] = byte(lerp(right, average, amount));
      }
    }
  }

  for (let x = 0; x < resolution; x += 1) {
    for (let distance = 0; distance <= blendWidth; distance += 1) {
      const amount = 1 - smoothstep(distance / blendWidth);
      const topOffset = (distance * resolution + x) * 4;
      const bottomOffset =
        ((resolution - 1 - distance) * resolution + x) * 4;
      for (let channel = 0; channel < 3; channel += 1) {
        const top = target[topOffset + channel] ?? 0;
        const bottom = target[bottomOffset + channel] ?? 0;
        const average = (top + bottom) * 0.5;
        target[topOffset + channel] = byte(lerp(top, average, amount));
        target[bottomOffset + channel] = byte(lerp(bottom, average, amount));
      }
    }
  }
}

function finalizeSurfaceBuffers(
  albedo: Uint8Array,
  roughness: Uint8Array,
  heightField: Float32Array,
  resolution: number,
  normalStrength: number,
): SurfaceBuffers {
  blendScalarSeams(heightField, resolution);
  blendRgbaSeams(albedo, resolution);
  blendRgbaSeams(roughness, resolution);
  const normal = generateNormalMap(heightField, resolution, normalStrength);
  blendRgbaSeams(normal, resolution);
  return { albedo, normal, roughness };
}

function generateNormalMap(
  heightField: Float32Array,
  resolution: number,
  strength: number,
): Uint8Array {
  const data = new Uint8Array(resolution * resolution * 4);

  for (let y = 0; y < resolution; y += 1) {
    const previousY = y === 0 ? resolution - 1 : y - 1;
    const nextY = y === resolution - 1 ? 0 : y + 1;
    for (let x = 0; x < resolution; x += 1) {
      const previousX = x === 0 ? resolution - 1 : x - 1;
      const nextX = x === resolution - 1 ? 0 : x + 1;
      const index = y * resolution + x;
      const left = heightField[y * resolution + previousX] ?? 0;
      const right = heightField[y * resolution + nextX] ?? 0;
      const top = heightField[previousY * resolution + x] ?? 0;
      const bottom = heightField[nextY * resolution + x] ?? 0;
      const normalX = (left - right) * strength;
      const normalY = (top - bottom) * strength;
      const inverseLength =
        1 / Math.sqrt(normalX * normalX + normalY * normalY + 1);
      const offset = index * 4;
      data[offset] = byte((normalX * inverseLength * 0.5 + 0.5) * 255);
      data[offset + 1] = byte(
        (normalY * inverseLength * 0.5 + 0.5) * 255,
      );
      data[offset + 2] = byte(inverseLength * 255);
      data[offset + 3] = 255;
    }
  }

  return data;
}

function generateAsphaltBuffers(
  resolution: number,
  seed: number,
  normalStrength: number,
): SurfaceBuffers {
  const pixelCount = resolution * resolution;
  const albedo = new Uint8Array(pixelCount * 4);
  const roughness = new Uint8Array(pixelCount * 4);
  const heightField = new Float32Array(pixelCount);

  for (let y = 0; y < resolution; y += 1) {
    const normalizedY = y / resolution;
    for (let x = 0; x < resolution; x += 1) {
      const index = y * resolution + x;
      const normalizedX = x / resolution;
      const coarse = valueNoise(x, y, 76, seed, 11);
      const medium = valueNoise(x, y, 19, seed, 29);
      const grain = hashUnit(x, y, seed, 47);

      const pebbleCell = 5;
      const pebbleX = Math.floor(x / pebbleCell);
      const pebbleY = Math.floor(y / pebbleCell);
      const localX = (x % pebbleCell) / pebbleCell;
      const localY = (y % pebbleCell) / pebbleCell;
      const pebbleCenterX = 0.2 + hashUnit(pebbleX, pebbleY, seed, 59) * 0.6;
      const pebbleCenterY = 0.2 + hashUnit(pebbleX, pebbleY, seed, 61) * 0.6;
      const pebbleDistance = Math.hypot(
        localX - pebbleCenterX,
        localY - pebbleCenterY,
      );
      const pebbleActive =
        hashUnit(pebbleX, pebbleY, seed, 67) > 0.64 ? 1 : 0;
      const aggregate =
        pebbleActive * clamp((0.2 - pebbleDistance) / 0.085, 0, 1);
      const paleSpeck = grain > 0.991 ? 1 : 0;
      const darkSpeck = grain < 0.011 ? 1 : 0;

      const sawCutDistance = periodicDistance(x + y * 0.21, 211);
      const sawCut = 1 - smoothstep(clamp(sawCutDistance / 2.2, 0, 1));
      const crackCenter =
        resolution * 0.59 +
        Math.sin(y * 0.012) * 23 +
        Math.sin(y * 0.041) * 4;
      const primaryCrack =
        1 - smoothstep(clamp(Math.abs(x - crackCenter) / 1.55, 0, 1));
      const branchCenter = crackCenter - (y - resolution * 0.42) * 0.43;
      const branchWindow =
        normalizedY > 0.42 && normalizedY < 0.67 ? 1 : 0;
      const branchCrack =
        branchWindow *
        (1 - smoothstep(clamp(Math.abs(x - branchCenter) / 1.3, 0, 1)));
      const crack = Math.max(primaryCrack, branchCrack);

      const patch = rectangleMask(
        normalizedX,
        normalizedY,
        0.13,
        0.37,
        0.61,
        0.82,
        0.012,
      );
      const patchEdge = rectangleEdge(
        normalizedX,
        normalizedY,
        0.13,
        0.37,
        0.61,
        0.82,
        0.006,
      );
      const dampCenter =
        resolution * 0.72 + Math.sin(x * 0.018) * resolution * 0.011;
      const dampDistance = Math.abs(y - dampCenter);
      const damp = 1 - smoothstep(clamp(dampDistance / 18, 0, 1));

      const base = 69 + coarse * 20 + medium * 9 + (grain - 0.5) * 8;
      const aggregateTone =
        aggregate * (grain > 0.5 ? 12 : -7) + paleSpeck * 8 - darkSpeck * 7;
      const patchTone = patch * (7 + medium * 8) - patchEdge * 17;
      const wetTone = damp * 21;
      const fissureTone = crack * 32 + sawCut * 13;
      writeColor(
        albedo,
        index,
        base - 5 + aggregateTone + patchTone - wetTone - fissureTone,
        base + 1 + aggregateTone + patchTone - wetTone * 0.84 - fissureTone,
        base + 4 + aggregateTone + patchTone - wetTone * 0.67 - fissureTone,
      );

      const surfaceRoughness =
        0.78 +
        aggregate * 0.07 +
        crack * 0.1 +
        sawCut * 0.05 -
        damp * 0.36 -
        patch * 0.06 +
        (medium - 0.5) * 0.04;
      writeRoughness(roughness, index, surfaceRoughness);
      heightField[index] =
        (coarse - 0.5) * 0.18 +
        (medium - 0.5) * 0.11 +
        (grain - 0.5) * 0.035 +
        aggregate * 0.075 +
        patch * 0.035 -
        patchEdge * 0.1 -
        sawCut * 0.13 -
        crack * 0.24;
    }
  }

  return finalizeSurfaceBuffers(
    albedo,
    roughness,
    heightField,
    resolution,
    normalStrength,
  );
}

function generateConcreteBuffers(
  resolution: number,
  seed: number,
  normalStrength: number,
): SurfaceBuffers {
  const pixelCount = resolution * resolution;
  const albedo = new Uint8Array(pixelCount * 4);
  const roughness = new Uint8Array(pixelCount * 4);
  const heightField = new Float32Array(pixelCount);

  for (let y = 0; y < resolution; y += 1) {
    const normalizedY = y / resolution;
    for (let x = 0; x < resolution; x += 1) {
      const index = y * resolution + x;
      const normalizedX = x / resolution;
      const body = valueNoise(x, y, 83, seed, 71);
      const mottling = valueNoise(x, y, 27, seed, 83);
      const grain = hashUnit(x, y, seed, 97);

      const aggregateCell = 8;
      const cellX = Math.floor(x / aggregateCell);
      const cellY = Math.floor(y / aggregateCell);
      const localX = (x % aggregateCell) / aggregateCell;
      const localY = (y % aggregateCell) / aggregateCell;
      const centerX = 0.18 + hashUnit(cellX, cellY, seed, 101) * 0.64;
      const centerY = 0.18 + hashUnit(cellX, cellY, seed, 103) * 0.64;
      const aggregateDistance = Math.hypot(localX - centerX, localY - centerY);
      const aggregate = clamp((0.21 - aggregateDistance) / 0.085, 0, 1);

      const formSeam = Math.max(
        1 - smoothstep(clamp(periodicDistance(x + 23, 263) / 1.7, 0, 1)),
        1 - smoothstep(clamp(periodicDistance(y + 37, 197) / 1.5, 0, 1)),
      );
      const rainBand = Math.floor(x / 17);
      const rainActive = hashUnit(rainBand, 0, seed, 107) > 0.57 ? 1 : 0;
      const rainCenter =
        (0.18 + hashUnit(rainBand, 1, seed, 109) * 0.64) * 17;
      const rainDistance = Math.abs((x % 17) - rainCenter);
      const rain =
        rainActive *
        (1 - smoothstep(clamp(rainDistance / 3.4, 0, 1))) *
        (0.25 + normalizedY * 0.75) *
        (0.72 + mottling * 0.28);

      const bloomX = (normalizedX - 0.72) / 0.23;
      const bloomY = (normalizedY - 0.63) / 0.18;
      const bloomDistance = Math.sqrt(bloomX * bloomX + bloomY * bloomY);
      const mineralBloom =
        (1 - smoothstep(clamp((bloomDistance - 0.35) / 0.65, 0, 1))) *
        (0.55 + body * 0.45);

      const repair = rectangleMask(
        normalizedX,
        normalizedY,
        0.12,
        0.43,
        0.24,
        0.58,
        0.014,
      );
      const repairEdge = rectangleEdge(
        normalizedX,
        normalizedY,
        0.12,
        0.43,
        0.24,
        0.58,
        0.007,
      );
      const crackCenter =
        resolution * 0.66 +
        Math.sin(y * 0.019) * 12 +
        Math.sin(y * 0.053) * 2.5;
      const crackWindow = normalizedY > 0.18 && normalizedY < 0.84 ? 1 : 0;
      const crack =
        crackWindow *
        (1 - smoothstep(clamp(Math.abs(x - crackCenter) / 1.25, 0, 1)));

      const base = 145 + body * 18 + (mottling - 0.5) * 10;
      const aggregateTone = aggregate * (grain > 0.48 ? 18 : -12);
      const repairTone = repair * (8 + mottling * 5) - repairEdge * 20;
      writeColor(
        albedo,
        index,
        base + 4 + aggregateTone + mineralBloom * 24 + repairTone - rain * 32 - crack * 35,
        base + 8 + aggregateTone + mineralBloom * 27 + repairTone - rain * 23 - crack * 35,
        base + 5 + aggregateTone + mineralBloom * 19 + repairTone - rain * 18 - crack * 32,
      );

      const surfaceRoughness =
        0.76 +
        aggregate * 0.13 +
        formSeam * 0.08 +
        mineralBloom * 0.11 +
        crack * 0.1 -
        repair * 0.09 -
        rain * 0.12 +
        (mottling - 0.5) * 0.05;
      writeRoughness(roughness, index, surfaceRoughness);
      heightField[index] =
        (body - 0.5) * 0.13 +
        (mottling - 0.5) * 0.08 +
        (grain - 0.5) * 0.025 +
        aggregate * 0.16 +
        mineralBloom * 0.025 +
        repair * 0.04 -
        repairEdge * 0.12 -
        formSeam * 0.1 -
        crack * 0.23;
    }
  }

  return finalizeSurfaceBuffers(
    albedo,
    roughness,
    heightField,
    resolution,
    normalStrength,
  );
}

function generateRoofBuffers(
  resolution: number,
  seed: number,
  normalStrength: number,
): SurfaceBuffers {
  const pixelCount = resolution * resolution;
  const albedo = new Uint8Array(pixelCount * 4);
  const roughness = new Uint8Array(pixelCount * 4);
  const heightField = new Float32Array(pixelCount);

  for (let y = 0; y < resolution; y += 1) {
    const normalizedY = y / resolution;
    for (let x = 0; x < resolution; x += 1) {
      const index = y * resolution + x;
      const normalizedX = x / resolution;
      const body = valueNoise(x, y, 53, seed, 127);
      const smallScale = valueNoise(x, y, 13, seed, 131);
      const grain = hashUnit(x, y, seed, 137);

      const gravelCell = 6;
      const cellX = Math.floor(x / gravelCell);
      const cellY = Math.floor(y / gravelCell);
      const localX = (x % gravelCell) / gravelCell;
      const localY = (y % gravelCell) / gravelCell;
      const centerX = 0.16 + hashUnit(cellX, cellY, seed, 139) * 0.68;
      const centerY = 0.16 + hashUnit(cellX, cellY, seed, 149) * 0.68;
      const gravelDistance = Math.hypot(localX - centerX, localY - centerY);
      const gravel = clamp((0.27 - gravelDistance) / 0.11, 0, 1);

      const membraneSeam = Math.max(
        1 - smoothstep(clamp(periodicDistance(x + 19, 127) / 2.1, 0, 1)),
        1 - smoothstep(clamp(periodicDistance(y + 41, 173) / 1.8, 0, 1)),
      );
      const pondX = (normalizedX - 0.68) / 0.25;
      const pondY = (normalizedY - 0.39) / 0.17;
      const pondDistance = Math.sqrt(pondX * pondX + pondY * pondY);
      const pond = 1 - smoothstep(clamp((pondDistance - 0.62) / 0.24, 0, 1));
      const pondRing =
        1 - smoothstep(clamp(Math.abs(pondDistance - 0.92) / 0.065, 0, 1));
      const patch = rectangleMask(
        normalizedX,
        normalizedY,
        0.1,
        0.34,
        0.67,
        0.84,
        0.018,
      );
      const patchEdge = rectangleEdge(
        normalizedX,
        normalizedY,
        0.1,
        0.34,
        0.67,
        0.84,
        0.01,
      );

      const base = 111 + body * 17 + (smallScale - 0.5) * 9;
      const gravelTone = gravel * (grain > 0.48 ? 25 : -13);
      const patchTone = patch * 10 - patchEdge * 18;
      writeColor(
        albedo,
        index,
        base + 8 + gravelTone + patchTone - pond * 27 - pondRing * 13 - membraneSeam * 10,
        base + 11 + gravelTone + patchTone - pond * 18 - pondRing * 8 - membraneSeam * 9,
        base + 9 + gravelTone + patchTone - pond * 11 - pondRing * 2 - membraneSeam * 7,
      );

      const surfaceRoughness =
        0.72 +
        gravel * 0.18 +
        membraneSeam * 0.08 +
        pondRing * 0.08 -
        pond * 0.42 -
        patch * 0.08 +
        (smallScale - 0.5) * 0.05;
      writeRoughness(roughness, index, surfaceRoughness);
      heightField[index] =
        (body - 0.5) * 0.13 +
        (smallScale - 0.5) * 0.07 +
        (grain - 0.5) * 0.025 +
        gravel * 0.22 +
        patch * 0.04 -
        patchEdge * 0.12 -
        membraneSeam * 0.09 -
        pond * 0.055 +
        pondRing * 0.035;
    }
  }

  return finalizeSurfaceBuffers(
    albedo,
    roughness,
    heightField,
    resolution,
    normalStrength,
  );
}

function digestBytes(data: Uint8Array): string {
  let digest = 2_166_136_261;
  for (let index = 0; index < data.length; index += 1) {
    digest = Math.imul(digest ^ (data[index] ?? 0), 16_777_619);
  }
  return `fnv1a32:${(digest >>> 0).toString(16).padStart(8, "0")}`;
}

function createTexture(
  surface: NorthStarSurfaceName,
  channel: NorthStarSurfaceChannel,
  resolution: number,
  surfaceSeed: number,
  repeat: readonly [number, number],
  data: Uint8Array,
  contentDigest: string,
): THREE.DataTexture {
  const texture = new THREE.DataTexture(
    data,
    resolution,
    resolution,
    THREE.RGBAFormat,
    THREE.UnsignedByteType,
  );
  texture.name = `north-star-${surface}-${channel}`;
  texture.colorSpace =
    channel === "albedo" ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeat[0], repeat[1]);
  texture.anisotropy = 8;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.unpackAlignment = 1;
  texture.needsUpdate = true;
  texture.userData = {
    profile: NORTH_STAR_SURFACE_PROFILE,
    generator: NORTH_STAR_SURFACE_GENERATOR,
    version: NORTH_STAR_SURFACE_GENERATOR_VERSION,
    seed: surfaceSeed,
    baseSeed: NORTH_STAR_SURFACE_SEED,
    surface,
    channel,
    resolution,
    contentDigest,
    deterministic: true,
    source: NORTH_STAR_SURFACE_SOURCE,
  };
  return texture;
}

function generateSurfaceBuffers(
  surface: NorthStarSurfaceName,
  specification: SurfaceSpecification,
): SurfaceBuffers {
  const seed = (NORTH_STAR_SURFACE_SEED ^ specification.seedOffset) >>> 0;
  switch (surface) {
    case "asphalt":
      return generateAsphaltBuffers(
        specification.resolution,
        seed,
        specification.normalStrength,
      );
    case "concrete":
      return generateConcreteBuffers(
        specification.resolution,
        seed,
        specification.normalStrength,
      );
    case "roof":
      return generateRoofBuffers(
        specification.resolution,
        seed,
        specification.normalStrength,
      );
  }
}

function createSurfaceSet(
  surface: NorthStarSurfaceName,
  specification: SurfaceSpecification,
): NorthStarSurfaceSet {
  const surfaceSeed =
    (NORTH_STAR_SURFACE_SEED ^ specification.seedOffset) >>> 0;
  let source = SURFACE_SOURCE_CACHE.get(surface);
  if (source === undefined) {
    const buffers = generateSurfaceBuffers(surface, specification);
    const digests: NorthStarSurfaceDigests = Object.freeze({
      albedo: digestBytes(buffers.albedo),
      normal: digestBytes(buffers.normal),
      roughness: digestBytes(buffers.roughness),
    });
    source = { buffers, digests };
    SURFACE_SOURCE_CACHE.set(surface, source);
  }
  const { buffers, digests } = source;
  return Object.freeze({
    albedoMap: createTexture(
      surface,
      "albedo",
      specification.resolution,
      surfaceSeed,
      specification.repeat,
      buffers.albedo,
      digests.albedo,
    ),
    normalMap: createTexture(
      surface,
      "normal",
      specification.resolution,
      surfaceSeed,
      specification.repeat,
      buffers.normal,
      digests.normal,
    ),
    roughnessMap: createTexture(
      surface,
      "roughness",
      specification.resolution,
      surfaceSeed,
      specification.repeat,
      buffers.roughness,
      digests.roughness,
    ),
    resolution: specification.resolution,
    digests,
  });
}

export function createNorthStarSurfaceLibrary(): NorthStarSurfaceLibrary {
  const asphalt = createSurfaceSet("asphalt", SURFACE_SPECIFICATIONS.asphalt);
  const concrete = createSurfaceSet(
    "concrete",
    SURFACE_SPECIFICATIONS.concrete,
  );
  const roof = createSurfaceSet("roof", SURFACE_SPECIFICATIONS.roof);
  const provenance: NorthStarSurfaceLibraryProvenance = Object.freeze({
    profile: NORTH_STAR_SURFACE_PROFILE,
    generator: NORTH_STAR_SURFACE_GENERATOR,
    version: NORTH_STAR_SURFACE_GENERATOR_VERSION,
    seed: NORTH_STAR_SURFACE_SEED,
    deterministic: true,
    source: NORTH_STAR_SURFACE_SOURCE,
    surfaces: Object.freeze({
      asphalt: Object.freeze({
        resolution: asphalt.resolution,
        seed: (
          NORTH_STAR_SURFACE_SEED ^
          SURFACE_SPECIFICATIONS.asphalt.seedOffset
        ) >>> 0,
        repeat: [
          SURFACE_SPECIFICATIONS.asphalt.repeat[0],
          SURFACE_SPECIFICATIONS.asphalt.repeat[1],
        ] as const,
        normalStrength: SURFACE_SPECIFICATIONS.asphalt.normalStrength,
        channelEncoding: SURFACE_CHANNEL_ENCODING,
        digests: asphalt.digests,
        cues: SURFACE_SPECIFICATIONS.asphalt.cues,
      }),
      concrete: Object.freeze({
        resolution: concrete.resolution,
        seed: (
          NORTH_STAR_SURFACE_SEED ^
          SURFACE_SPECIFICATIONS.concrete.seedOffset
        ) >>> 0,
        repeat: [
          SURFACE_SPECIFICATIONS.concrete.repeat[0],
          SURFACE_SPECIFICATIONS.concrete.repeat[1],
        ] as const,
        normalStrength: SURFACE_SPECIFICATIONS.concrete.normalStrength,
        channelEncoding: SURFACE_CHANNEL_ENCODING,
        digests: concrete.digests,
        cues: SURFACE_SPECIFICATIONS.concrete.cues,
      }),
      roof: Object.freeze({
        resolution: roof.resolution,
        seed: (
          NORTH_STAR_SURFACE_SEED ^
          SURFACE_SPECIFICATIONS.roof.seedOffset
        ) >>> 0,
        repeat: [
          SURFACE_SPECIFICATIONS.roof.repeat[0],
          SURFACE_SPECIFICATIONS.roof.repeat[1],
        ] as const,
        normalStrength: SURFACE_SPECIFICATIONS.roof.normalStrength,
        channelEncoding: SURFACE_CHANNEL_ENCODING,
        digests: roof.digests,
        cues: SURFACE_SPECIFICATIONS.roof.cues,
      }),
    }),
  });
  const ownedTextures = [
    asphalt.albedoMap,
    asphalt.normalMap,
    asphalt.roughnessMap,
    concrete.albedoMap,
    concrete.normalMap,
    concrete.roughnessMap,
    roof.albedoMap,
    roof.normalMap,
    roof.roughnessMap,
  ] as const;
  let disposed = false;

  return {
    asphalt,
    concrete,
    roof,
    provenance,
    dispose(): void {
      if (disposed) {
        return;
      }
      disposed = true;
      ownedTextures.forEach((texture) => texture.dispose());
    },
  };
}
