import { describe, expect, it } from "vitest";
import {
  PLAYER_TRIANGLE_CAP,
  PLAYER_RECIPE,
  PLAYER_VOXEL_DIMENSIONS,
  PLAYER_VOXEL_SIZE,
  createVoxelGrid,
  defineVoxelPalette,
  fillVoxelBox,
  meshVoxelGrid,
  meshVoxelRecipe,
  setVoxel,
  voxelAnchorPosition,
} from "../../src/prototypeB/voxel";

const WHITE_PALETTE = [{ id: "white", color: 0xffffff }] as const;
const MID_GRAY_PALETTE = [{ id: "mid-gray", color: 0x808080 }] as const;
const ROLE_PALETTE = defineVoxelPalette([
  { id: "cloth", color: 0x556677, materialRole: "matte" },
  { id: "steel", color: 0x889999, materialRole: "metal" },
  { id: "signal", color: 0x55ffff, materialRole: "emissive" },
] as const);
const RECTANGULAR_DIMENSIONS = {
  width: 16,
  height: 24,
  depth: 12,
} as const;

function singleVoxelGrid() {
  const grid = createVoxelGrid(WHITE_PALETTE);
  setVoxel(grid, 0, 0, 0, "white");
  return grid;
}

function component(
  values: Float32Array,
  vectorIndex: number,
  axis: number,
): number {
  return values[vectorIndex * 3 + axis] ?? Number.NaN;
}

describe("hidden-face voxel meshing", () => {
  it("emits six indexed quads with renderer-ready typed attributes", () => {
    const mesh = meshVoxelGrid(singleVoxelGrid(), { shadeFaces: false });

    expect(mesh.voxelCount).toBe(1);
    expect(mesh.faceCount).toBe(6);
    expect(mesh.vertexCount).toBe(24);
    expect(mesh.triangleCount).toBe(12);
    expect(mesh.positions).toBeInstanceOf(Float32Array);
    expect(mesh.normals).toBeInstanceOf(Float32Array);
    expect(mesh.colors).toBeInstanceOf(Float32Array);
    expect(mesh.indices).toBeInstanceOf(Uint32Array);
    expect(mesh.positions).toHaveLength(24 * 3);
    expect(mesh.normals).toHaveLength(24 * 3);
    expect(mesh.colors).toHaveLength(24 * 3);
    expect(mesh.indices).toHaveLength(12 * 3);
    expect(mesh.bounds).toEqual({ min: [0, 0, 0], max: [1, 1, 1] });
    expect(Math.max(...mesh.indices)).toBeLessThan(mesh.vertexCount);
  });

  it("culls the shared face between adjacent voxels", () => {
    const grid = singleVoxelGrid();
    setVoxel(grid, 1, 0, 0, "white");
    const mesh = meshVoxelGrid(grid);

    expect(mesh.voxelCount).toBe(2);
    expect(mesh.faceCount).toBe(10);
    expect(mesh.faceCount).toBeLessThan(mesh.voxelCount * 6);
  });

  it("reduces a solid 16-cube to only its outer shell", () => {
    const grid = createVoxelGrid(WHITE_PALETTE);
    fillVoxelBox(
      grid,
      { x: 0, y: 0, z: 0 },
      { x: 15, y: 15, z: 15 },
      "white",
    );
    const mesh = meshVoxelGrid(grid);

    expect(mesh.voxelCount).toBe(16 ** 3);
    expect(mesh.faceCount).toBe(6 * 16 * 16);
    expect(mesh.faceCount).toBeLessThan(mesh.voxelCount);
  });

  it("meshes a solid rectangular grid using each axis independently", () => {
    const grid = createVoxelGrid(WHITE_PALETTE, {
      dimensions: RECTANGULAR_DIMENSIONS,
    });
    fillVoxelBox(
      grid,
      { x: 0, y: 0, z: 0 },
      { x: 15, y: 23, z: 11 },
      "white",
    );
    const mesh = meshVoxelGrid(grid);

    expect(mesh.voxelCount).toBe(16 * 24 * 12);
    expect(mesh.faceCount).toBe(
      2 * (16 * 24 + 16 * 12 + 24 * 12),
    );
    expect(mesh.faceCount).toBe(1_728);
    expect(mesh.triangleCount).toBe(3_456);
    expect(mesh.bounds).toEqual({
      min: [0, 0, 0],
      max: [16, 24, 12],
    });
  });

  it("uses outward triangle winding that agrees with emitted normals", () => {
    const mesh = meshVoxelGrid(singleVoxelGrid());

    for (
      let triangleOffset = 0;
      triangleOffset < mesh.indices.length;
      triangleOffset += 3
    ) {
      const first = mesh.indices[triangleOffset] ?? 0;
      const second = mesh.indices[triangleOffset + 1] ?? 0;
      const third = mesh.indices[triangleOffset + 2] ?? 0;
      const edgeAX = component(mesh.positions, second, 0) -
        component(mesh.positions, first, 0);
      const edgeAY = component(mesh.positions, second, 1) -
        component(mesh.positions, first, 1);
      const edgeAZ = component(mesh.positions, second, 2) -
        component(mesh.positions, first, 2);
      const edgeBX = component(mesh.positions, third, 0) -
        component(mesh.positions, first, 0);
      const edgeBY = component(mesh.positions, third, 1) -
        component(mesh.positions, first, 1);
      const edgeBZ = component(mesh.positions, third, 2) -
        component(mesh.positions, first, 2);
      const crossX = edgeAY * edgeBZ - edgeAZ * edgeBY;
      const crossY = edgeAZ * edgeBX - edgeAX * edgeBZ;
      const crossZ = edgeAX * edgeBY - edgeAY * edgeBX;
      const alignment =
        crossX * component(mesh.normals, first, 0) +
        crossY * component(mesh.normals, first, 1) +
        crossZ * component(mesh.normals, first, 2);

      expect(alignment).toBeGreaterThan(0);
    }
  });

  it("normalizes palette colors and shades the top more brightly than the base", () => {
    const mesh = meshVoxelGrid(singleVoxelGrid());
    const topRed = mesh.colors[24] ?? 0;
    const bottomRed = mesh.colors[36] ?? 0;

    expect(Math.min(...mesh.colors)).toBeGreaterThanOrEqual(0);
    expect(Math.max(...mesh.colors)).toBeLessThanOrEqual(1);
    expect(topRed).toBeCloseTo(1);
    expect(topRed).toBeGreaterThan(bottomRed);
  });

  it("converts authored sRGB palette colors to linear-sRGB before face shading", () => {
    const grid = createVoxelGrid(MID_GRAY_PALETTE);
    setVoxel(grid, 0, 0, 0, "mid-gray");

    const unshaded = meshVoxelGrid(grid, { shadeFaces: false });
    const shaded = meshVoxelGrid(grid, {
      faceShades: { "positive-x": 0.5 },
    });
    const expectedLinearMidGray = 0.2158605;

    expect(unshaded.colors[0]).toBeCloseTo(expectedLinearMidGray, 6);
    expect(unshaded.colors[1]).toBeCloseTo(expectedLinearMidGray, 6);
    expect(unshaded.colors[2]).toBeCloseTo(expectedLinearMidGray, 6);
    expect(shaded.colors[0]).toBeCloseTo(expectedLinearMidGray * 0.5, 6);
  });

  it("applies voxel scale and origin while preserving deterministic buffers", () => {
    const options = {
      voxelSize: 2,
      origin: { x: -1, y: 3, z: 5 },
      shadeFaces: false,
    } as const;
    const first = meshVoxelGrid(singleVoxelGrid(), options);
    const second = meshVoxelGrid(singleVoxelGrid(), options);

    expect(first.bounds).toEqual({ min: [-1, 3, 5], max: [1, 5, 7] });
    expect([...first.positions]).toEqual([...second.positions]);
    expect([...first.normals]).toEqual([...second.normals]);
    expect([...first.colors]).toEqual([...second.colors]);
    expect([...first.indices]).toEqual([...second.indices]);
  });

  it("groups hero indices by authored material role without duplicating faces", () => {
    const grid = createVoxelGrid(ROLE_PALETTE);
    setVoxel(grid, 0, 0, 0, "cloth");
    setVoxel(grid, 3, 0, 0, "steel");
    setVoxel(grid, 6, 0, 0, "signal");
    const mesh = meshVoxelGrid(grid, { shadeFaces: false });

    expect(mesh.materialGroups.map((group) => group.role)).toEqual([
      "matte",
      "metal",
      "emissive",
    ]);
    expect(
      mesh.materialGroups.reduce((total, group) => total + group.count, 0),
    ).toBe(mesh.indices.length);
    expect(mesh.triangleCount).toBe(36);
  });

  it("returns empty typed buffers for an empty grid and rejects invalid options", () => {
    const grid = createVoxelGrid(WHITE_PALETTE);
    const mesh = meshVoxelGrid(grid);

    expect(mesh.faceCount).toBe(0);
    expect(mesh.positions).toHaveLength(0);
    expect(mesh.indices).toHaveLength(0);
    expect(mesh.bounds).toBeNull();
    expect(() => meshVoxelGrid(grid, { voxelSize: 0 })).toThrow(RangeError);
    expect(() =>
      meshVoxelGrid(grid, {
        faceShades: { "positive-x": Number.NaN },
      }),
    ).toThrow(RangeError);
  });

  it("meshes a validated recipe without depending on Three.js", () => {
    const mesh = meshVoxelRecipe(PLAYER_RECIPE);

    expect(PLAYER_RECIPE.dimensions).toEqual(PLAYER_VOXEL_DIMENSIONS);
    expect(mesh.voxelCount).toBe(PLAYER_RECIPE.voxels.length);
    expect(mesh.faceCount).toBeLessThan(mesh.voxelCount * 6);
    expect(mesh.positions.length).toBe(mesh.faceCount * 4 * 3);
    expect(mesh.indices.length).toBe(mesh.faceCount * 6);
    expect(mesh.triangleCount).toBeLessThanOrEqual(PLAYER_TRIANGLE_CAP);
  });

  it("maps recipe anchors into the renderer's centered local coordinates", () => {
    const playerWeapon = voxelAnchorPosition(
      PLAYER_RECIPE,
      "weapon",
      PLAYER_VOXEL_SIZE,
    );

    expect(playerWeapon.x).toBeCloseTo(19.125);
    expect(playerWeapon.y).toBeCloseTo(32.625);
    expect(playerWeapon.z).toBeCloseTo(-7.875);
    expect(() =>
      voxelAnchorPosition(PLAYER_RECIPE, "missing"),
    ).toThrow(/no anchor/);
    expect(() =>
      voxelAnchorPosition(PLAYER_RECIPE, "weapon", 0),
    ).toThrow(RangeError);
  });
});
