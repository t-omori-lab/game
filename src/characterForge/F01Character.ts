import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import sourceDefinition from "./f01.source.json";
import surfacePackDefinition from "./f01.surface-pack.json";

export type ForgeMotion = "idle" | "run" | "hit";
export type ForgeView = "front" | "left" | "back" | "right" | "three-quarter";

export type F01PartId =
  | "head"
  | "torso"
  | "left-arm"
  | "right-arm"
  | "left-leg"
  | "right-leg"
  | "equipment";

export interface PaletteEntry {
  readonly id: string;
  readonly hex: string;
  readonly surface: "cloth" | "polymer" | "emissive" | "skin" | "glass";
}

interface SurfaceCell {
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly part: F01PartId;
  readonly palette: PaletteEntry;
  readonly module?: string;
}

export interface SurfacePack {
  readonly schemaVersion: number;
  readonly compilerVersion: string;
  readonly sourceId: string;
  readonly sourceVoxels: number;
  readonly renderedSurfaceCells: number;
  readonly stride: number;
  readonly partIds: readonly string[];
  readonly paletteIds: readonly string[];
  readonly moduleIds?: readonly string[];
  readonly buildSheetSha256?: string;
  readonly sourceSha256?: string;
  readonly payloadSha256: string;
  readonly cellsBase64: string;
}

export interface CompiledCharacterSource {
  readonly schemaVersion: number;
  readonly id: string;
  readonly grid: {
    readonly width: number;
    readonly height: number;
    readonly depth: number;
    readonly cellSize: number;
    readonly surfaceGap: number;
  };
  readonly rig: {
    readonly family: string;
    readonly headStart: number;
    readonly hipHeight: number;
    readonly shoulderHeight: number;
    readonly armOuterStart: number;
    readonly backEquipmentDepth: number;
  };
  readonly palette: readonly PaletteEntry[];
}

interface PartState {
  readonly group: THREE.Group;
  readonly restPosition: THREE.Vector3;
}

export interface F01CharacterStats {
  readonly sourceId: string;
  readonly sourceVoxels: number;
  readonly renderedSurfaceCells: number;
  readonly materialCount: number;
  readonly rigParts: number;
  readonly moduleCount: number;
  readonly sourceSha256?: string;
  readonly payloadSha256: string;
  readonly reconstruction: string;
}

export interface F01Character {
  readonly root: THREE.Group;
  readonly motionRoot: THREE.Group;
  readonly partGroups: Readonly<Record<F01PartId, THREE.Group>>;
  readonly materials: ReadonlyMap<string, THREE.MeshPhysicalMaterial>;
  readonly stats: F01CharacterStats;
  update(motion: ForgeMotion, timeSeconds: number, motionStartedAt: number): void;
  setWireframe(enabled: boolean): void;
  dispose(): void;
}

export interface F01CharacterRenderOptions {
  /**
   * Forge defaults to authored voxel shadows. Gameplay already renders a
   * dedicated blob shadow, so its bridge can skip the expensive per-part
   * shadow pass without changing the visible surface pack.
   */
  readonly castShadow?: boolean;
  readonly receiveShadow?: boolean;
  /**
   * Multiplies the authored cell size without moving cell centers. The Forge
   * keeps the source gap; distant gameplay can close sub-pixel black seams.
   */
  readonly surfaceFill?: number;
  /**
   * Rounded edge radius as a ratio of one authored cell. Distant gameplay
   * needs a much smaller bevel than the close-up Forge inspection view.
   */
  readonly edgeRadiusRatio?: number;
  /**
   * Drops tiny, disconnected components that live entirely on the two lowest
   * grid layers. This removes visual-hull floor shards without changing the
   * canonical compiled pack or its digest.
   */
  readonly removeDetachedGroundDebris?: boolean;
  readonly detachedGroundMaximumY?: number;
  readonly detachedGroundMaximumCells?: number;
}

const CELL_NEIGHBORS = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
] as const;
const MAX_GROUND_DEBRIS_Y = 1;
const MAX_GROUND_DEBRIS_CELLS = 64;

const PART_IDS = [
  "head",
  "torso",
  "left-arm",
  "right-arm",
  "left-leg",
  "right-leg",
  "equipment",
] as const satisfies readonly F01PartId[];

const source = sourceDefinition as CompiledCharacterSource;
const surfacePack = surfacePackDefinition as SurfacePack;

function paletteById(
  palette: readonly PaletteEntry[],
  id: string,
): PaletteEntry {
  const entry = palette.find((candidate) => candidate.id === id);
  if (entry === undefined) throw new Error(`Unknown F-01 palette entry: ${id}`);
  return entry;
}

function decodeSurfaceCells(
  sourceDefinitionValue: CompiledCharacterSource,
  surfacePackValue: SurfacePack,
): readonly SurfaceCell[] {
  if (
    ![1, 2].includes(surfacePackValue.schemaVersion) ||
    surfacePackValue.sourceId !== sourceDefinitionValue.id ||
    ![5, 6].includes(surfacePackValue.stride) ||
    (surfacePackValue.stride === 6 && surfacePackValue.moduleIds === undefined)
  ) {
    throw new Error("Compiled surface pack does not match its canonical source.");
  }
  const binary = atob(surfacePackValue.cellsBase64);
  if (
    binary.length !==
    surfacePackValue.renderedSurfaceCells * surfacePackValue.stride
  ) {
    throw new Error("Compiled surface pack length is invalid.");
  }
  const cells: SurfaceCell[] = [];
  for (
    let offset = 0;
    offset < binary.length;
    offset += surfacePackValue.stride
  ) {
    const partId = surfacePackValue.partIds[binary.charCodeAt(offset + 3)];
    const paletteId = surfacePackValue.paletteIds[binary.charCodeAt(offset + 4)];
    const moduleId = surfacePackValue.moduleIds?.[
      binary.charCodeAt(offset + 5)
    ];
    if (!PART_IDS.includes(partId as F01PartId) || paletteId === undefined) {
      throw new Error("F-01 surface pack contains an unknown semantic index.");
    }
    cells.push({
      x: binary.charCodeAt(offset),
      y: binary.charCodeAt(offset + 1),
      z: binary.charCodeAt(offset + 2),
      part: partId as F01PartId,
      palette: paletteById(sourceDefinitionValue.palette, paletteId),
      module: moduleId,
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

function pivotForPart(
  sourceDefinitionValue: CompiledCharacterSource,
  part: F01PartId,
): THREE.Vector3 {
  const { width, height, depth, cellSize } = sourceDefinitionValue.grid;
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
      return point(
        xCenter,
        height * sourceDefinitionValue.rig.headStart,
        zCenter,
      );
    case "torso":
      return point(
        xCenter,
        height * sourceDefinitionValue.rig.hipHeight,
        zCenter,
      );
    case "left-arm":
      return point(
        width * 0.25,
        height * sourceDefinitionValue.rig.shoulderHeight,
        zCenter,
      );
    case "right-arm":
      return point(
        width * 0.75,
        height * sourceDefinitionValue.rig.shoulderHeight,
        zCenter,
      );
    case "left-leg":
      return point(
        width * 0.39,
        height * sourceDefinitionValue.rig.hipHeight,
        zCenter,
      );
    case "right-leg":
      return point(
        width * 0.61,
        height * sourceDefinitionValue.rig.hipHeight,
        zCenter,
      );
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

function surfaceCellKey(cell: Pick<SurfaceCell, "x" | "y" | "z">): string {
  return `${cell.x},${cell.y},${cell.z}`;
}

function removeDetachedGroundDebris(
  cells: readonly SurfaceCell[],
  maximumGroundY: number,
  maximumComponentCells: number,
): readonly SurfaceCell[] {
  const cellByPosition = new Map(
    cells.map((cell) => [surfaceCellKey(cell), cell] as const),
  );
  const visited = new Set<string>();
  const rejected = new Set<string>();

  for (const initial of cells) {
    const initialKey = surfaceCellKey(initial);
    if (visited.has(initialKey)) continue;

    const component: SurfaceCell[] = [];
    const pending = [initial];
    visited.add(initialKey);
    let maximumY = initial.y;

    while (pending.length > 0) {
      const cell = pending.pop();
      if (cell === undefined) break;
      component.push(cell);
      maximumY = Math.max(maximumY, cell.y);

      for (const [offsetX, offsetY, offsetZ] of CELL_NEIGHBORS) {
        const neighborKey = `${cell.x + offsetX},${cell.y + offsetY},${cell.z + offsetZ}`;
        const neighbor = cellByPosition.get(neighborKey);
        if (neighbor === undefined || visited.has(neighborKey)) continue;
        visited.add(neighborKey);
        pending.push(neighbor);
      }
    }

    if (
      maximumY <= maximumGroundY &&
      component.length <= maximumComponentCells
    ) {
      for (const cell of component) rejected.add(surfaceCellKey(cell));
    }
  }

  return rejected.size === 0
    ? cells
    : cells.filter((cell) => !rejected.has(surfaceCellKey(cell)));
}

function resetPart(part: PartState): void {
  part.group.position.copy(part.restPosition);
  part.group.rotation.set(0, 0, 0);
  part.group.scale.setScalar(1);
}

function updatePose(
  parts: Readonly<Record<F01PartId, PartState>>,
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

export interface CompiledCharacterOptions extends F01CharacterRenderOptions {
  readonly source: CompiledCharacterSource;
  readonly surfacePack: SurfacePack;
  readonly reconstruction: string;
}

export function createCompiledCharacter(
  options: CompiledCharacterOptions,
): F01Character {
  const sourceDefinitionValue = options.source;
  const pack = options.surfacePack;
  const palette = sourceDefinitionValue.palette;
  const decodedSurfaceCells = decodeSurfaceCells(sourceDefinitionValue, pack);
  const surfaceCells = options.removeDetachedGroundDebris
    ? removeDetachedGroundDebris(
        decodedSurfaceCells,
        Math.max(
          0,
          Math.floor(options.detachedGroundMaximumY ?? MAX_GROUND_DEBRIS_Y),
        ),
        Math.max(
          1,
          Math.floor(
            options.detachedGroundMaximumCells ?? MAX_GROUND_DEBRIS_CELLS,
          ),
        ),
      )
    : decodedSurfaceCells;
  const root = new THREE.Group();
  root.name = sourceDefinitionValue.id;
  root.userData.sourceSha256 = pack.sourceSha256 ?? "unavailable";
  root.userData.payloadSha256 = pack.payloadSha256;
  root.userData.moduleIds = pack.moduleIds ?? [];
  const motionRoot = new THREE.Group();
  motionRoot.name = `${sourceDefinitionValue.id}:motion-root`;
  root.add(motionRoot);

  const parts = Object.fromEntries(
    PART_IDS.map((partId) => {
      const group = new THREE.Group();
      const pivot = pivotForPart(sourceDefinitionValue, partId);
      group.name = `${sourceDefinitionValue.id}:${partId}`;
      group.position.copy(pivot);
      motionRoot.add(group);
      return [partId, { group, restPosition: pivot.clone() } satisfies PartState];
    }),
  ) as Record<F01PartId, PartState>;
  const materials = new Map(
    palette.map((entry) => [entry.id, createMaterial(entry)] as const),
  );
  const surfaceFill = THREE.MathUtils.clamp(
    options.surfaceFill ?? sourceDefinitionValue.grid.surfaceGap,
    0.82,
    1.02,
  );
  const edgeRadiusRatio = THREE.MathUtils.clamp(
    options.edgeRadiusRatio ?? 0.075,
    0.008,
    0.12,
  );
  const geometry = new RoundedBoxGeometry(
    sourceDefinitionValue.grid.cellSize * surfaceFill,
    sourceDefinitionValue.grid.cellSize * surfaceFill,
    sourceDefinitionValue.grid.cellSize * surfaceFill,
    2,
    sourceDefinitionValue.grid.cellSize * edgeRadiusRatio,
  );
  const xCenter = (sourceDefinitionValue.grid.width - 1) / 2;
  const zCenter = (sourceDefinitionValue.grid.depth - 1) / 2;
  const matrix = new THREE.Matrix4();

  for (const [key, cells] of groupCells(surfaceCells)) {
    const [partId, paletteId] = key.split(":") as [F01PartId, string];
    const material = materials.get(paletteId);
    const part = parts[partId];
    if (material === undefined || part === undefined) continue;
    const mesh = new THREE.InstancedMesh(geometry, material, cells.length);
    mesh.name = `${sourceDefinitionValue.id}:${key}`;
    mesh.castShadow = options.castShadow ?? true;
    mesh.receiveShadow = options.receiveShadow ?? true;
    mesh.frustumCulled = false;
    const pivot = part.restPosition;
    cells.forEach((cell, index) => {
      matrix.makeTranslation(
        (cell.x - xCenter) * sourceDefinitionValue.grid.cellSize - pivot.x,
        cell.y * sourceDefinitionValue.grid.cellSize - pivot.y,
        (cell.z - zCenter) * sourceDefinitionValue.grid.cellSize - pivot.z,
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
    partGroups: Object.fromEntries(
      PART_IDS.map((partId) => [partId, parts[partId].group]),
    ) as Record<F01PartId, THREE.Group>,
    materials,
    stats: {
      sourceId: pack.sourceId,
      sourceVoxels: pack.sourceVoxels,
      renderedSurfaceCells: surfaceCells.length,
      materialCount: materials.size,
      rigParts: PART_IDS.length,
      moduleCount: pack.moduleIds?.length ?? 0,
      sourceSha256: pack.sourceSha256,
      payloadSha256: pack.payloadSha256,
      reconstruction: options.reconstruction,
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

export function createF01Character(
  options: F01CharacterRenderOptions = {},
): F01Character {
  return createCompiledCharacter({
    ...options,
    source,
    surfacePack,
    reconstruction: "compiled four-view visual hull",
  });
}
