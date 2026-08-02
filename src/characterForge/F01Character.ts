import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import sourceDefinition from "./f01.source.json";

export type ForgeMotion = "idle" | "run" | "hit";
export type ForgeView = "front" | "left" | "back" | "right" | "three-quarter";

type ViewId = "front" | "left" | "back" | "right";
type PartId =
  | "head"
  | "torso"
  | "left-arm"
  | "right-arm"
  | "left-leg"
  | "right-leg"
  | "equipment";

interface CropDefinition {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

interface Projection {
  readonly width: number;
  readonly height: number;
  readonly mask: Uint8Array;
  readonly colors: Uint8ClampedArray;
}

interface PaletteEntry {
  readonly id: string;
  readonly hex: string;
  readonly surface: "cloth" | "polymer" | "emissive" | "skin" | "glass";
}

interface SurfaceCell {
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly part: PartId;
  readonly palette: PaletteEntry;
}

interface PartState {
  readonly group: THREE.Group;
  readonly restPosition: THREE.Vector3;
}

export interface F01CharacterStats {
  readonly sourceVoxels: number;
  readonly renderedSurfaceCells: number;
  readonly materialCount: number;
  readonly rigParts: number;
  readonly reconstruction: "four-view visual hull";
}

export interface F01Character {
  readonly root: THREE.Group;
  readonly motionRoot: THREE.Group;
  readonly stats: F01CharacterStats;
  update(motion: ForgeMotion, timeSeconds: number, motionStartedAt: number): void;
  setWireframe(enabled: boolean): void;
  dispose(): void;
}

const PART_IDS = [
  "head",
  "torso",
  "left-arm",
  "right-arm",
  "left-leg",
  "right-leg",
  "equipment",
] as const satisfies readonly PartId[];

const source = sourceDefinition;
const palette = source.palette as readonly PaletteEntry[];

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Build Sheetを読み込めませんでした: ${url}`));
    image.src = url;
  });
}

function colorDistance(
  first: readonly [number, number, number],
  second: readonly [number, number, number],
): number {
  return Math.hypot(
    first[0] - second[0],
    first[1] - second[1],
    first[2] - second[2],
  );
}

function saturation(red: number, green: number, blue: number): number {
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  return max === 0 ? 0 : (max - min) / max;
}

function samplePixel(
  pixels: Uint8ClampedArray,
  imageWidth: number,
  imageHeight: number,
  x: number,
  y: number,
): readonly [number, number, number] {
  const safeX = THREE.MathUtils.clamp(Math.round(x), 0, imageWidth - 1);
  const safeY = THREE.MathUtils.clamp(Math.round(y), 0, imageHeight - 1);
  const offset = (safeY * imageWidth + safeX) * 4;
  return [pixels[offset] ?? 0, pixels[offset + 1] ?? 0, pixels[offset + 2] ?? 0];
}

function averageBackground(
  pixels: Uint8ClampedArray,
  imageWidth: number,
  imageHeight: number,
  crop: CropDefinition,
): readonly [number, number, number] {
  const samples = [
    samplePixel(pixels, imageWidth, imageHeight, crop.x + 5, crop.y + 5),
    samplePixel(pixels, imageWidth, imageHeight, crop.x + crop.width - 5, crop.y + 5),
    samplePixel(pixels, imageWidth, imageHeight, crop.x + 6, crop.y + crop.height * 0.42),
    samplePixel(
      pixels,
      imageWidth,
      imageHeight,
      crop.x + crop.width - 6,
      crop.y + crop.height * 0.42,
    ),
  ];
  return [0, 1, 2].map((channel) =>
    Math.round(
      samples.reduce((sum, sample) => sum + (sample[channel] ?? 0), 0) /
        samples.length,
    ),
  ) as unknown as readonly [number, number, number];
}

function createProjection(
  pixels: Uint8ClampedArray,
  imageWidth: number,
  imageHeight: number,
  crop: CropDefinition,
  targetWidth: number,
  targetHeight: number,
): Projection {
  const background = averageBackground(
    pixels,
    imageWidth,
    imageHeight,
    crop,
  );
  const mask = new Uint8Array(targetWidth * targetHeight);
  const colors = new Uint8ClampedArray(targetWidth * targetHeight * 3);
  const threshold = source.segmentation.backgroundDistance;
  const sampleRadius = source.segmentation.sampleRadius;
  const sampleOffsets = [
    [0, 0],
    [-sampleRadius, 0],
    [sampleRadius, 0],
    [0, -sampleRadius],
    [0, sampleRadius],
  ] as const;

  for (let y = 0; y < targetHeight; y += 1) {
    for (let x = 0; x < targetWidth; x += 1) {
      const index = y * targetWidth + x;
      const imageX = crop.x + ((x + 0.5) / targetWidth) * crop.width;
      const imageY =
        crop.y + crop.height - ((y + 0.5) / targetHeight) * crop.height;
      const samples = sampleOffsets.map(([offsetX, offsetY]) =>
        samplePixel(
          pixels,
          imageWidth,
          imageHeight,
          imageX + (offsetX * crop.width) / targetWidth,
          imageY + (offsetY * crop.height) / targetHeight,
        ),
      );
      const foregroundSamples = samples.filter((sample) => {
        const distance = colorDistance(sample, background);
        return (
          distance >= threshold ||
          (saturation(sample[0], sample[1], sample[2]) >=
            source.segmentation.saturationFloor &&
            distance >= threshold * 0.56)
        );
      });
      if (foregroundSamples.length < 2) continue;
      mask[index] = 1;
      for (let channel = 0; channel < 3; channel += 1) {
        colors[index * 3 + channel] = Math.round(
          foregroundSamples.reduce(
            (sum, sample) => sum + (sample[channel] ?? 0),
            0,
          ) / foregroundSamples.length,
        );
      }
    }
  }
  return { width: targetWidth, height: targetHeight, mask, colors };
}

function projectionMask(
  projection: Projection,
  firstAxis: number,
  y: number,
): boolean {
  return projection.mask[y * projection.width + firstAxis] === 1;
}

function projectionColor(
  projection: Projection,
  firstAxis: number,
  y: number,
): readonly [number, number, number] | null {
  const index = y * projection.width + firstAxis;
  if (projection.mask[index] !== 1) return null;
  return [
    projection.colors[index * 3] ?? 0,
    projection.colors[index * 3 + 1] ?? 0,
    projection.colors[index * 3 + 2] ?? 0,
  ];
}

function paletteRgb(entry: PaletteEntry): readonly [number, number, number] {
  const packed = Number.parseInt(entry.hex.slice(1), 16);
  return [(packed >> 16) & 255, (packed >> 8) & 255, packed & 255];
}

function nearestPalette(color: readonly [number, number, number]): PaletteEntry {
  let closest = palette[0];
  let closestDistance = Number.POSITIVE_INFINITY;
  for (const entry of palette) {
    const target = paletteRgb(entry);
    const distance = colorDistance(color, target);
    if (distance < closestDistance) {
      closest = entry;
      closestDistance = distance;
    }
  }
  if (closest === undefined) {
    throw new Error("F-01 palette is empty.");
  }
  return closest;
}

function paletteById(id: string): PaletteEntry {
  const entry = palette.find((candidate) => candidate.id === id);
  if (entry === undefined) throw new Error(`Unknown F-01 palette entry: ${id}`);
  return entry;
}

function semanticFacePalette(
  x: number,
  y: number,
  z: number,
  sourceColor: readonly [number, number, number],
  occupied: (x: number, y: number, z: number) => boolean,
  fallback: PaletteEntry,
): PaletteEntry {
  if (occupied(x, y, z + 1)) return fallback;
  const normalizedX = Math.abs(
    (x - (source.grid.width - 1) / 2) / source.grid.width,
  );
  const normalizedY = y / (source.grid.height - 1);
  const isIrisBand =
    normalizedY >= 0.72 &&
    normalizedY <= 0.805 &&
    normalizedX >= 0.045 &&
    normalizedX <= 0.19;
  const isCoolDarkPixel =
    sourceColor[1] >= sourceColor[0] + 2 &&
    sourceColor[2] >= sourceColor[0] + 2 &&
    (sourceColor[0] + sourceColor[1] + sourceColor[2]) / 3 <= 126;
  return isIrisBand && isCoolDarkPixel ? paletteById("eye-teal") : fallback;
}

function rangeAtY(
  first: Projection,
  second: Projection,
  y: number,
): readonly [number, number] | null {
  let minimum = Number.POSITIVE_INFINITY;
  let maximum = Number.NEGATIVE_INFINITY;
  for (let axis = 0; axis < first.width; axis += 1) {
    if (projectionMask(first, axis, y) || projectionMask(second, axis, y)) {
      minimum = Math.min(minimum, axis);
      maximum = Math.max(maximum, axis);
    }
  }
  return Number.isFinite(minimum) ? [minimum, maximum] : null;
}

function isInsideRoundedCrossSection(
  x: number,
  z: number,
  xRange: readonly [number, number],
  zRange: readonly [number, number],
): boolean {
  const radiusX = Math.max(1, (xRange[1] - xRange[0] + 1) / 2);
  const radiusZ = Math.max(1, (zRange[1] - zRange[0] + 1) / 2);
  const centerX = (xRange[0] + xRange[1]) / 2;
  const centerZ = (zRange[0] + zRange[1]) / 2;
  const normalizedX = (x - centerX) / radiusX;
  const normalizedZ = (z - centerZ) / radiusZ;
  return normalizedX * normalizedX + normalizedZ * normalizedZ <= 1.08;
}

/**
 * A global visual hull turns arms + torso + backpack into one inflated block.
 * This semantic gate keeps the four-view evidence, but constrains it to the
 * body volumes declared by the humanoid-v1 rig. New actor types can replace
 * this gate without changing the reconstruction or rendering code.
 */
function isInsideHumanoidVolumes(
  x: number,
  y: number,
  z: number,
): boolean {
  const { width, height, depth } = source.grid;
  const nx = (x - (width - 1) / 2) / width;
  const ny = y / (height - 1);
  const nz = (z - (depth - 1) / 2) / depth;
  const ax = Math.abs(nx);

  if (ny >= source.rig.headStart) return true;

  if (ny >= 0.42) {
    const torso = ax <= 0.225 && nz >= -0.145 && nz <= 0.16;
    const arm = ax > 0.205 && ax <= 0.45 && Math.abs(nz - 0.01) <= 0.105;
    const pack = ax <= 0.23 && nz >= -0.34 && nz < -0.14;
    return torso || arm || pack;
  }

  if (ny >= 0.28) {
    const coatAndHip = ax <= 0.285 && nz >= -0.16 && nz <= 0.17;
    const armOrHand = ax > 0.24 && ax <= 0.44 && Math.abs(nz - 0.02) <= 0.1;
    const packAndTextile = ax <= 0.21 && nz >= -0.35 && nz < -0.15;
    return coatAndHip || armOrHand || packAndTextile;
  }

  const legCenter = nx < 0 ? -0.115 : 0.115;
  const boot = ny <= 0.13;
  const legRadiusX = boot ? 0.115 : 0.082;
  const legRadiusZ = boot ? 0.17 : 0.115;
  const legZCenter = boot ? 0.035 : 0;
  const leg =
    Math.abs(nx - legCenter) <= legRadiusX &&
    Math.abs(nz - legZCenter) <= legRadiusZ;
  const rearTextile =
    ny >= 0.12 && ax <= 0.13 && nz >= -0.31 && nz <= -0.13;
  return leg || rearTextile;
}

function classifyPart(
  x: number,
  y: number,
  z: number,
  paletteEntry: PaletteEntry,
): PartId {
  const width = source.grid.width;
  const height = source.grid.height;
  const depth = source.grid.depth;
  const normalizedX = (x - (width - 1) / 2) / width;
  const normalizedY = y / (height - 1);
  const normalizedZ = (z - (depth - 1) / 2) / depth;

  if (normalizedY >= source.rig.headStart) return "head";
  if (
    (normalizedZ <= source.rig.backEquipmentDepth && normalizedY >= 0.26) ||
    (paletteEntry.id === "coral" && normalizedY <= 0.5)
  ) {
    return "equipment";
  }
  if (
    normalizedY >= 0.36 &&
    normalizedY <= source.rig.shoulderHeight &&
    Math.abs(normalizedX) >= source.rig.armOuterStart
  ) {
    return normalizedX < 0 ? "left-arm" : "right-arm";
  }
  if (normalizedY <= source.rig.hipHeight) {
    return normalizedX < 0 ? "left-leg" : "right-leg";
  }
  return "torso";
}

function chooseSurfaceColor(
  x: number,
  y: number,
  z: number,
  occupied: (x: number, y: number, z: number) => boolean,
  projections: Readonly<Record<ViewId, Projection>>,
): readonly [number, number, number] {
  const normalizedY = y / (source.grid.height - 1);
  const frontHemisphere = z >= (source.grid.depth - 1) / 2;
  if (normalizedY >= source.rig.headStart && frontHemisphere) {
    const frontalIdentityColor = projectionColor(projections.front, x, y);
    if (frontalIdentityColor !== null) return frontalIdentityColor;
  }
  const candidates: Array<readonly [boolean, readonly [number, number, number] | null]> = [
    [!occupied(x, y, z + 1), projectionColor(projections.front, x, y)],
    [!occupied(x, y, z - 1), projectionColor(projections.back, x, y)],
    [!occupied(x + 1, y, z), projectionColor(projections.right, z, y)],
    [!occupied(x - 1, y, z), projectionColor(projections.left, z, y)],
  ];
  for (const [isExposed, color] of candidates) {
    if (isExposed && color !== null) return color;
  }
  for (const [, color] of candidates) {
    if (color !== null) return color;
  }
  return [166, 168, 154];
}

function buildSurfaceCells(
  projections: Readonly<Record<ViewId, Projection>>,
): { readonly cells: readonly SurfaceCell[]; readonly solidCount: number } {
  const { width, height, depth } = source.grid;
  const volume = new Uint8Array(width * height * depth);
  const indexOf = (x: number, y: number, z: number): number =>
    y * width * depth + z * width + x;
  const occupied = (x: number, y: number, z: number): boolean =>
    x >= 0 &&
    x < width &&
    y >= 0 &&
    y < height &&
    z >= 0 &&
    z < depth &&
    volume[indexOf(x, y, z)] === 1;
  let solidCount = 0;

  for (let y = 0; y < height; y += 1) {
    const xRange = rangeAtY(projections.front, projections.back, y);
    const zRange = rangeAtY(projections.left, projections.right, y);
    if (xRange === null || zRange === null) continue;
    for (let x = xRange[0]; x <= xRange[1]; x += 1) {
      if (
        !projectionMask(projections.front, x, y) &&
        !projectionMask(projections.back, x, y)
      ) {
        continue;
      }
      for (let z = zRange[0]; z <= zRange[1]; z += 1) {
        if (
          (!projectionMask(projections.left, z, y) &&
            !projectionMask(projections.right, z, y)) ||
          !isInsideRoundedCrossSection(x, z, xRange, zRange) ||
          !isInsideHumanoidVolumes(x, y, z)
        ) {
          continue;
        }
        volume[indexOf(x, y, z)] = 1;
        solidCount += 1;
      }
    }
  }

  const cells: SurfaceCell[] = [];
  const neighbors = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ] as const;
  for (let y = 0; y < height; y += 1) {
    for (let z = 0; z < depth; z += 1) {
      for (let x = 0; x < width; x += 1) {
        if (!occupied(x, y, z)) continue;
        const exposed = neighbors.some(([dx, dy, dz]) =>
          !occupied(x + dx, y + dy, z + dz),
        );
        if (!exposed) continue;
        const sourceColor = chooseSurfaceColor(
          x,
          y,
          z,
          occupied,
          projections,
        );
        const paletteEntry = semanticFacePalette(
          x,
          y,
          z,
          sourceColor,
          occupied,
          nearestPalette(sourceColor),
        );
        cells.push({
          x,
          y,
          z,
          palette: paletteEntry,
          part: classifyPart(x, y, z, paletteEntry),
        });
      }
    }
  }
  return { cells, solidCount };
}

function createMaterial(entry: PaletteEntry): THREE.MeshPhysicalMaterial {
  const emissive = entry.surface === "emissive";
  const metal = entry.surface === "polymer" || entry.surface === "glass";
  return new THREE.MeshPhysicalMaterial({
    color: entry.hex,
    roughness: entry.surface === "skin" ? 0.58 : metal ? 0.38 : 0.7,
    metalness: metal ? 0.2 : 0,
    clearcoat: entry.surface === "glass" ? 0.46 : 0.06,
    clearcoatRoughness: 0.35,
    sheen: entry.surface === "cloth" ? 0.28 : 0.05,
    sheenColor: entry.hex,
    sheenRoughness: 0.74,
    emissive: emissive ? entry.hex : 0x000000,
    emissiveIntensity: emissive ? 2.4 : 0,
  });
}

function pivotForPart(part: PartId): THREE.Vector3 {
  const { width, height, depth, cellSize } = source.grid;
  const xCenter = (width - 1) / 2;
  const zCenter = (depth - 1) / 2;
  const point = (x: number, y: number, z: number): THREE.Vector3 =>
    new THREE.Vector3(
      (x - xCenter) * cellSize,
      y * cellSize,
      (z - zCenter) * cellSize,
    );
  switch (part) {
    case "head":
      return point(xCenter, height * source.rig.headStart, zCenter);
    case "torso":
      return point(xCenter, height * source.rig.hipHeight, zCenter);
    case "left-arm":
      return point(width * 0.25, height * source.rig.shoulderHeight, zCenter);
    case "right-arm":
      return point(width * 0.75, height * source.rig.shoulderHeight, zCenter);
    case "left-leg":
      return point(width * 0.39, height * source.rig.hipHeight, zCenter);
    case "right-leg":
      return point(width * 0.61, height * source.rig.hipHeight, zCenter);
    case "equipment":
      return point(xCenter, height * 0.49, depth * 0.32);
  }
}

function groupCells(
  cells: readonly SurfaceCell[],
): ReadonlyMap<string, readonly SurfaceCell[]> {
  const groups = new Map<string, SurfaceCell[]>();
  for (const cell of cells) {
    const key = `${cell.part}:${cell.palette.id}`;
    const current = groups.get(key) ?? [];
    current.push(cell);
    groups.set(key, current);
  }
  return groups;
}

function resetPart(part: PartState): void {
  part.group.position.copy(part.restPosition);
  part.group.rotation.set(0, 0, 0);
  part.group.scale.setScalar(1);
}

function updatePose(
  parts: Readonly<Record<PartId, PartState>>,
  motionRoot: THREE.Group,
  motion: ForgeMotion,
  timeSeconds: number,
  motionStartedAt: number,
): void {
  for (const part of Object.values(parts)) resetPart(part);
  motionRoot.position.set(0, 0, 0);
  motionRoot.rotation.set(0, 0, 0);
  const breath = Math.sin(timeSeconds * 2.1);
  motionRoot.position.y = breath * 0.012;
  parts.head.group.rotation.y = Math.sin(timeSeconds * 0.64) * 0.026;
  parts.head.group.rotation.x = breath * 0.012;
  parts.torso.group.rotation.x = breath * 0.007;
  parts.equipment.group.rotation.x = -breath * 0.01;

  if (motion === "run") {
    const stride = Math.sin(timeSeconds * 7.4);
    const rebound = Math.abs(Math.cos(timeSeconds * 7.4));
    motionRoot.position.y += rebound * 0.052;
    motionRoot.rotation.z = stride * 0.018;
    parts["left-leg"].group.rotation.x = stride * 0.7;
    parts["right-leg"].group.rotation.x = -stride * 0.7;
    parts["left-arm"].group.rotation.x = -stride * 0.52;
    parts["right-arm"].group.rotation.x = stride * 0.52;
    parts.torso.group.rotation.x = 0.07;
    parts.head.group.rotation.x = -0.045 + rebound * 0.018;
    return;
  }

  if (motion === "hit") {
    const progress = THREE.MathUtils.clamp(
      (timeSeconds - motionStartedAt) / 0.62,
      0,
      1,
    );
    const strike = Math.sin(progress * Math.PI);
    const recoil = Math.sin(progress * Math.PI * 2) * (1 - progress);
    motionRoot.position.z = -strike * 0.13;
    motionRoot.rotation.x = recoil * 0.15;
    parts.torso.group.rotation.x = -strike * 0.2;
    parts.head.group.rotation.x = strike * 0.16;
    parts["left-arm"].group.rotation.z = -strike * 0.36;
    parts["right-arm"].group.rotation.z = strike * 0.36;
    parts["left-leg"].group.rotation.x = strike * 0.12;
    parts["right-leg"].group.rotation.x = -strike * 0.12;
  }
}

export async function createF01Character(
  buildSheetUrl: string,
): Promise<F01Character> {
  const image = await loadImage(buildSheetUrl);
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (context === null) throw new Error("2D build-sheet canvas is unavailable.");
  context.drawImage(image, 0, 0);
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
  const views = source.views as Readonly<Record<ViewId, CropDefinition>>;
  const projections: Record<ViewId, Projection> = {
    front: createProjection(
      pixels,
      canvas.width,
      canvas.height,
      views.front,
      source.grid.width,
      source.grid.height,
    ),
    back: createProjection(
      pixels,
      canvas.width,
      canvas.height,
      views.back,
      source.grid.width,
      source.grid.height,
    ),
    left: createProjection(
      pixels,
      canvas.width,
      canvas.height,
      views.left,
      source.grid.depth,
      source.grid.height,
    ),
    right: createProjection(
      pixels,
      canvas.width,
      canvas.height,
      views.right,
      source.grid.depth,
      source.grid.height,
    ),
  };
  const built = buildSurfaceCells(projections);
  const root = new THREE.Group();
  root.name = source.id;
  const motionRoot = new THREE.Group();
  motionRoot.name = `${source.id}:motion-root`;
  root.add(motionRoot);

  const parts = Object.fromEntries(
    PART_IDS.map((partId) => {
      const group = new THREE.Group();
      const pivot = pivotForPart(partId);
      group.name = `${source.id}:${partId}`;
      group.position.copy(pivot);
      motionRoot.add(group);
      return [partId, { group, restPosition: pivot.clone() } satisfies PartState];
    }),
  ) as Record<PartId, PartState>;
  const materials = new Map(
    palette.map((entry) => [entry.id, createMaterial(entry)] as const),
  );
  const geometry = new RoundedBoxGeometry(
    source.grid.cellSize * source.grid.surfaceGap,
    source.grid.cellSize * source.grid.surfaceGap,
    source.grid.cellSize * source.grid.surfaceGap,
    2,
    source.grid.cellSize * 0.075,
  );
  const xCenter = (source.grid.width - 1) / 2;
  const zCenter = (source.grid.depth - 1) / 2;
  const matrix = new THREE.Matrix4();

  for (const [key, cells] of groupCells(built.cells)) {
    const [partId, paletteId] = key.split(":") as [PartId, string];
    const material = materials.get(paletteId);
    const part = parts[partId];
    if (material === undefined || part === undefined) continue;
    const mesh = new THREE.InstancedMesh(geometry, material, cells.length);
    mesh.name = `${source.id}:${key}`;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    const pivot = part.restPosition;
    cells.forEach((cell, index) => {
      matrix.makeTranslation(
        (cell.x - xCenter) * source.grid.cellSize - pivot.x,
        cell.y * source.grid.cellSize - pivot.y,
        (cell.z - zCenter) * source.grid.cellSize - pivot.z,
      );
      mesh.setMatrixAt(index, matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    part.group.add(mesh);
  }

  let wireframe = false;
  return {
    root,
    motionRoot,
    stats: {
      sourceVoxels: built.solidCount,
      renderedSurfaceCells: built.cells.length,
      materialCount: materials.size,
      rigParts: PART_IDS.length,
      reconstruction: "four-view visual hull",
    },
    update(motion, timeSeconds, motionStartedAt) {
      updatePose(parts, motionRoot, motion, timeSeconds, motionStartedAt);
    },
    setWireframe(enabled) {
      if (enabled === wireframe) return;
      wireframe = enabled;
      for (const material of materials.values()) material.wireframe = enabled;
    },
    dispose() {
      geometry.dispose();
      for (const material of materials.values()) material.dispose();
      root.removeFromParent();
    },
  };
}
