export type ScreenDirection = "up" | "right" | "down" | "left";

export interface Point {
  x: number;
  y: number;
}

export interface MovementBounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export interface DirectionalInput {
  up: boolean;
  right: boolean;
  down: boolean;
  left: boolean;
}

export interface CameraFrame {
  scale: number;
  originX: number;
  originY: number;
  viewportWidth: number;
  viewportHeight: number;
  referenceWidth: number;
  referenceHeight: number;
}

export function getInputVector(input: DirectionalInput): Point {
  const x = Number(input.right) - Number(input.left);
  const y = Number(input.down) - Number(input.up);
  const length = Math.hypot(x, y);

  if (length === 0) {
    return { x: 0, y: 0 };
  }

  return { x: x / length, y: y / length };
}

export function getFacingDirection(
  vector: Point,
  previous: ScreenDirection,
): ScreenDirection {
  if (vector.x === 0 && vector.y === 0) {
    return previous;
  }

  if (Math.abs(vector.x) > Math.abs(vector.y)) {
    return vector.x > 0 ? "right" : "left";
  }

  return vector.y > 0 ? "down" : "up";
}

export function moveWithinBounds(
  position: Point,
  vector: Point,
  distance: number,
  bounds: MovementBounds,
): Point {
  return {
    x: clamp(position.x + vector.x * distance, bounds.left, bounds.right),
    y: clamp(position.y + vector.y * distance, bounds.top, bounds.bottom),
  };
}

export function moveWithinPolygon(
  position: Point,
  vector: Point,
  distance: number,
  polygon: readonly Point[],
): Point {
  return clampPointToPolygon(
    {
      x: position.x + vector.x * distance,
      y: position.y + vector.y * distance,
    },
    polygon,
  );
}

export function clampPointToPolygon(
  point: Point,
  polygon: readonly Point[],
): Point {
  if (polygon.length < 3) {
    return { ...point };
  }

  if (isPointInPolygon(point, polygon)) {
    return { ...point };
  }

  let closest = { ...polygon[0]! };
  let closestDistanceSquared = Number.POSITIVE_INFINITY;

  for (let index = 0; index < polygon.length; index += 1) {
    const start = polygon[index]!;
    const end = polygon[(index + 1) % polygon.length]!;
    const candidate = closestPointOnSegment(point, start, end);
    const distanceSquared =
      (candidate.x - point.x) ** 2 + (candidate.y - point.y) ** 2;

    if (distanceSquared < closestDistanceSquared) {
      closest = candidate;
      closestDistanceSquared = distanceSquared;
    }
  }

  return closest;
}

export function isPointInPolygon(
  point: Point,
  polygon: readonly Point[],
): boolean {
  if (polygon.length < 3) {
    return false;
  }

  let inside = false;

  for (
    let index = 0, previousIndex = polygon.length - 1;
    index < polygon.length;
    previousIndex = index, index += 1
  ) {
    const current = polygon[index]!;
    const previous = polygon[previousIndex]!;

    if (squaredDistanceToSegment(point, previous, current) < 0.000_001) {
      return true;
    }

    const crosses =
      current.y > point.y !== previous.y > point.y &&
      point.x <
        ((previous.x - current.x) * (point.y - current.y)) /
          (previous.y - current.y) +
          current.x;

    if (crosses) {
      inside = !inside;
    }
  }

  return inside;
}

export function vectorToward(
  origin: Point,
  target: Point,
  stopDistance = 4,
): Point {
  const x = target.x - origin.x;
  const y = target.y - origin.y;
  const length = Math.hypot(x, y);

  if (length <= stopDistance) {
    return { x: 0, y: 0 };
  }

  return { x: x / length, y: y / length };
}

export function clampCameraToPlate(
  desired: Point,
  frame: CameraFrame,
): Point {
  const scale = Math.max(Number.EPSILON, frame.scale);
  const minimumX = frame.originX / scale;
  const maximumX =
    (frame.originX + frame.referenceWidth * scale - frame.viewportWidth) /
    scale;
  const minimumY = frame.originY / scale;
  const maximumY =
    (frame.originY + frame.referenceHeight * scale - frame.viewportHeight) /
    scale;

  return {
    x: clamp(
      desired.x,
      Math.min(minimumX, maximumX),
      Math.max(minimumX, maximumX),
    ),
    y: clamp(
      desired.y,
      Math.min(minimumY, maximumY),
      Math.max(minimumY, maximumY),
    ),
  };
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}

function closestPointOnSegment(
  point: Point,
  start: Point,
  end: Point,
): Point {
  const segmentX = end.x - start.x;
  const segmentY = end.y - start.y;
  const lengthSquared = segmentX ** 2 + segmentY ** 2;

  if (lengthSquared === 0) {
    return { ...start };
  }

  const progress = clamp(
    ((point.x - start.x) * segmentX + (point.y - start.y) * segmentY) /
      lengthSquared,
    0,
    1,
  );

  return {
    x: start.x + segmentX * progress,
    y: start.y + segmentY * progress,
  };
}

function squaredDistanceToSegment(
  point: Point,
  start: Point,
  end: Point,
): number {
  const closest = closestPointOnSegment(point, start, end);
  return (closest.x - point.x) ** 2 + (closest.y - point.y) ** 2;
}
