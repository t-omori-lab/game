import * as THREE from "three";

export type Vector3Tuple = readonly [number, number, number];

export type ColoredBoxFace =
  | "negative-x"
  | "positive-x"
  | "negative-y"
  | "positive-y"
  | "negative-z"
  | "positive-z";

export interface ColoredBox {
  readonly center: Vector3Tuple;
  readonly size: Vector3Tuple;
  readonly color: THREE.ColorRepresentation;
  readonly rotation?: Vector3Tuple;
  readonly shade?: number;
  readonly faceShades?: Readonly<
    Partial<Record<ColoredBoxFace, number>>
  >;
}

export interface ColoredQuad {
  readonly corners: readonly [
    Vector3Tuple,
    Vector3Tuple,
    Vector3Tuple,
    Vector3Tuple,
  ];
  readonly color:
    | THREE.ColorRepresentation
    | readonly [
        THREE.ColorRepresentation,
        THREE.ColorRepresentation,
        THREE.ColorRepresentation,
        THREE.ColorRepresentation,
      ];
  readonly shade?: number;
}

type BoxFaceDefinition = {
  readonly id: ColoredBoxFace;
  readonly corners: readonly [number, number, number, number];
  readonly normal: Vector3Tuple;
};

const UNIT_CUBE_CORNERS: readonly Vector3Tuple[] = [
  [-0.5, -0.5, -0.5],
  [0.5, -0.5, -0.5],
  [0.5, 0.5, -0.5],
  [-0.5, 0.5, -0.5],
  [-0.5, -0.5, 0.5],
  [0.5, -0.5, 0.5],
  [0.5, 0.5, 0.5],
  [-0.5, 0.5, 0.5],
] as const;

const BOX_FACES: readonly BoxFaceDefinition[] = [
  {
    id: "negative-z",
    corners: [0, 3, 2, 1],
    normal: [0, 0, -1],
  },
  {
    id: "positive-z",
    corners: [4, 5, 6, 7],
    normal: [0, 0, 1],
  },
  {
    id: "negative-x",
    corners: [0, 4, 7, 3],
    normal: [-1, 0, 0],
  },
  {
    id: "positive-x",
    corners: [1, 2, 6, 5],
    normal: [1, 0, 0],
  },
  {
    id: "negative-y",
    corners: [0, 1, 5, 4],
    normal: [0, -1, 0],
  },
  {
    id: "positive-y",
    corners: [3, 7, 6, 2],
    normal: [0, 1, 0],
  },
] as const;

const QUAD_TRIANGLE_ORDER = [0, 1, 2, 0, 2, 3] as const;

function assertFiniteTuple(
  tuple: Vector3Tuple,
  label: string,
): void {
  if (!tuple.every(Number.isFinite)) {
    throw new RangeError(`${label} must contain finite values.`);
  }
}

function copyColor(
  target: THREE.Color,
  source: THREE.ColorRepresentation,
  shade: number,
): void {
  target.set(source).multiplyScalar(shade);
  target.r = THREE.MathUtils.clamp(target.r, 0, 1);
  target.g = THREE.MathUtils.clamp(target.g, 0, 1);
  target.b = THREE.MathUtils.clamp(target.b, 0, 1);
}

function directionalShade(normal: THREE.Vector3): number {
  if (normal.y > 0.55) {
    return 1.04;
  }

  if (normal.y < -0.55) {
    return 0.56;
  }

  return THREE.MathUtils.clamp(
    0.75 + normal.x * 0.055 + normal.z * 0.09,
    0.62,
    0.9,
  );
}

/**
 * Builds one non-indexed, vertex-coloured geometry from many small authored
 * components. The builder deliberately owns no materials so callers can batch
 * components by surface behaviour (ground, stone, foliage, emissive glass).
 */
export class ColoredGeometryBuilder {
  private readonly positions: number[] = [];
  private readonly normals: number[] = [];
  private readonly colors: number[] = [];
  private readonly transformedCorners = UNIT_CUBE_CORNERS.map(
    () => new THREE.Vector3(),
  );
  private readonly matrix = new THREE.Matrix4();
  private readonly normalMatrix = new THREE.Matrix3();
  private readonly position = new THREE.Vector3();
  private readonly scale = new THREE.Vector3();
  private readonly quaternion = new THREE.Quaternion();
  private readonly euler = new THREE.Euler();
  private readonly faceNormal = new THREE.Vector3();
  private readonly color = new THREE.Color();
  private componentCount = 0;

  public get triangles(): number {
    return this.positions.length / 9;
  }

  public get components(): number {
    return this.componentCount;
  }

  public addBox(box: ColoredBox): this {
    assertFiniteTuple(box.center, "Box center");
    assertFiniteTuple(box.size, "Box size");

    if (box.size.some((value) => value <= 0)) {
      throw new RangeError("Box size values must be greater than zero.");
    }

    const rotation = box.rotation ?? [0, 0, 0];
    assertFiniteTuple(rotation, "Box rotation");
    const shade = box.shade ?? 1;

    if (!Number.isFinite(shade) || shade < 0) {
      throw new RangeError("Box shade must be a finite non-negative value.");
    }

    this.position.set(...box.center);
    this.scale.set(...box.size);
    this.euler.set(...rotation);
    this.quaternion.setFromEuler(this.euler);
    this.matrix.compose(this.position, this.quaternion, this.scale);
    this.normalMatrix.getNormalMatrix(this.matrix);

    UNIT_CUBE_CORNERS.forEach((corner, index) => {
      this.transformedCorners[index]?.set(...corner).applyMatrix4(this.matrix);
    });

    for (const face of BOX_FACES) {
      this.faceNormal
        .set(...face.normal)
        .applyMatrix3(this.normalMatrix)
        .normalize();
      const faceShade =
        shade *
        directionalShade(this.faceNormal) *
        (box.faceShades?.[face.id] ?? 1);
      copyColor(this.color, box.color, faceShade);

      for (const cornerIndex of QUAD_TRIANGLE_ORDER) {
        const transformed =
          this.transformedCorners[face.corners[cornerIndex]];

        if (transformed === undefined) {
          throw new Error("Invalid internal box face definition.");
        }

        this.positions.push(transformed.x, transformed.y, transformed.z);
        this.normals.push(
          this.faceNormal.x,
          this.faceNormal.y,
          this.faceNormal.z,
        );
        this.colors.push(this.color.r, this.color.g, this.color.b);
      }
    }

    this.componentCount += 1;
    return this;
  }

  public addQuad(quad: ColoredQuad): this {
    quad.corners.forEach((corner) => {
      assertFiniteTuple(corner, "Quad corner");
    });
    const shade = quad.shade ?? 1;

    if (!Number.isFinite(shade) || shade < 0) {
      throw new RangeError("Quad shade must be a finite non-negative value.");
    }

    const first = new THREE.Vector3(...quad.corners[0]);
    const second = new THREE.Vector3(...quad.corners[1]);
    const third = new THREE.Vector3(...quad.corners[2]);
    this.faceNormal
      .subVectors(second, first)
      .cross(new THREE.Vector3().subVectors(third, first));

    if (this.faceNormal.lengthSq() <= Number.EPSILON) {
      throw new RangeError("Quad corners must describe a non-zero surface.");
    }

    this.faceNormal.normalize();
    const colors = Array.isArray(quad.color)
      ? quad.color
      : [quad.color, quad.color, quad.color, quad.color];

    for (const cornerIndex of QUAD_TRIANGLE_ORDER) {
      const corner = quad.corners[cornerIndex];
      const color = colors[cornerIndex];

      if (corner === undefined || color === undefined) {
        throw new Error("Invalid internal quad definition.");
      }

      copyColor(this.color, color, shade);
      this.positions.push(...corner);
      this.normals.push(
        this.faceNormal.x,
        this.faceNormal.y,
        this.faceNormal.z,
      );
      this.colors.push(this.color.r, this.color.g, this.color.b);
    }

    this.componentCount += 1;
    return this;
  }

  public build(): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(this.positions, 3),
    );
    geometry.setAttribute(
      "normal",
      new THREE.Float32BufferAttribute(this.normals, 3),
    );
    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(this.colors, 3),
    );
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    geometry.userData.componentCount = this.componentCount;
    geometry.userData.triangleCount = this.triangles;
    return geometry;
  }
}

export function createColoredBoxGeometry(
  boxes: readonly ColoredBox[],
): THREE.BufferGeometry {
  const builder = new ColoredGeometryBuilder();
  boxes.forEach((box) => builder.addBox(box));
  return builder.build();
}
