import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import sourceDefinition from "./f01.source.json";
import surfacePackDefinition from "./f01.surface-pack.json";

export type ForgeMotion = "idle" | "run" | "hit";
export type ForgeView = "front" | "left" | "back" | "right" | "three-quarter";

type PartId =
  | "head"
  | "torso"
  | "left-arm"
  | "right-arm"
  | "left-leg"
  | "right-leg"
  | "equipment";

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

interface SurfacePack {
  readonly schemaVersion: number;
  readonly compilerVersion: string;
  readonly sourceId: string;
  readonly sourceVoxels: number;
  readonly renderedSurfaceCells: number;
  readonly stride: number;
  readonly partIds: readonly string[];
  readonly paletteIds: readonly string[];
  readonly buildSheetSha256: string;
  readonly payloadSha256: string;
  readonly cellsBase64: string;
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
  readonly reconstruction: "compiled four-view visual hull";
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
const surfacePack = surfacePackDefinition as SurfacePack;

function paletteById(id: string): PaletteEntry {
  const entry = palette.find((candidate) => candidate.id === id);
  if (entry === undefined) throw new Error(`Unknown F-01 palette entry: ${id}`);
  return entry;
}

function decodeSurfaceCells(): readonly SurfaceCell[] {
  if (
    surfacePack.schemaVersion !== 1 ||
    surfacePack.sourceId !== source.id ||
    surfacePack.stride !== 5
  ) {
    throw new Error("F-01 surface pack does not match the canonical source.");
  }
  const binary = atob(surfacePack.cellsBase64);
  if (binary.length !== surfacePack.renderedSurfaceCells * surfacePack.stride) {
    throw new Error("F-01 surface pack length is invalid.");
  }
  const cells: SurfaceCell[] = [];
  for (let offset = 0; offset < binary.length; offset += surfacePack.stride) {
    const partId = surfacePack.partIds[binary.charCodeAt(offset + 3)];
    const paletteId = surfacePack.paletteIds[binary.charCodeAt(offset + 4)];
    if (!PART_IDS.includes(partId as PartId) || paletteId === undefined) {
      throw new Error("F-01 surface pack contains an unknown semantic index.");
    }
    cells.push({
      x: binary.charCodeAt(offset),
      y: binary.charCodeAt(offset + 1),
      z: binary.charCodeAt(offset + 2),
      part: partId as PartId,
      palette: paletteById(paletteId),
    });
  }
  return cells;
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

export function createF01Character(): F01Character {
  const surfaceCells = decodeSurfaceCells();
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

  for (const [key, cells] of groupCells(surfaceCells)) {
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
      sourceVoxels: surfacePack.sourceVoxels,
      renderedSurfaceCells: surfaceCells.length,
      materialCount: materials.size,
      rigParts: PART_IDS.length,
      reconstruction: "compiled four-view visual hull",
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
