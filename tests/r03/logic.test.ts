import { describe, expect, it } from "vitest";
import {
  clampCameraToPlate,
  clampPointToPolygon,
  getFacingDirection,
  getInputVector,
  isPointInPolygon,
  moveWithinBounds,
  moveWithinPolygon,
  vectorToward,
} from "../../src/r03/logic";

describe("R03 screen-relative movement", () => {
  it("maps WASD directions to the matching on-screen direction", () => {
    const up = getInputVector({ up: true, right: false, down: false, left: false });
    const right = getInputVector({ up: false, right: true, down: false, left: false });
    const down = getInputVector({ up: false, right: false, down: true, left: false });
    const left = getInputVector({ up: false, right: false, down: false, left: true });

    expect(up).toEqual({ x: 0, y: -1 });
    expect(right).toEqual({ x: 1, y: 0 });
    expect(down).toEqual({ x: 0, y: 1 });
    expect(left).toEqual({ x: -1, y: 0 });
    expect(getFacingDirection(up, "down")).toBe("up");
    expect(getFacingDirection(right, "left")).toBe("right");
    expect(getFacingDirection(down, "up")).toBe("down");
    expect(getFacingDirection(left, "right")).toBe("left");
  });

  it("normalizes diagonal movement without rotating the control frame", () => {
    const vector = getInputVector({ up: true, right: true, down: false, left: false });

    expect(Math.hypot(vector.x, vector.y)).toBeCloseTo(1);
    expect(vector.x).toBeGreaterThan(0);
    expect(vector.y).toBeLessThan(0);
    expect(getFacingDirection(vector, "left")).toBe("up");
  });

  it("clamps movement and tap targets to the authored road", () => {
    const bounds = { left: 10, right: 100, top: 20, bottom: 80 };

    expect(moveWithinBounds({ x: 98, y: 25 }, { x: 1, y: -1 }, 20, bounds)).toEqual({
      x: 100,
      y: 20,
    });
    expect(vectorToward({ x: 0, y: 0 }, { x: 3, y: 2 }, 4)).toEqual({ x: 0, y: 0 });
  });

  it("never lets camera follow expose an edge of the environment plate", () => {
    expect(
      clampCameraToPlate(
        { x: 108, y: 72 },
        {
          scale: 1,
          originX: 0,
          originY: 0,
          viewportWidth: 1672,
          viewportHeight: 941,
          referenceWidth: 1672,
          referenceHeight: 941,
        },
      ),
    ).toEqual({ x: 0, y: 0 });

    const landscape = clampCameraToPlate(
      { x: 108, y: 72 },
      {
        scale: 874 / 1672,
        originX: 0,
        originY: (402 - 941 * (874 / 1672)) / 2,
        viewportWidth: 874,
        viewportHeight: 402,
        referenceWidth: 1672,
        referenceHeight: 941,
      },
    );

    expect(landscape.x).toBe(0);
    expect(landscape.y).toBeGreaterThan(0);
    expect(landscape.y).toBeLessThanOrEqual(72);
  });

  it("keeps movement and tap destinations on the authored central road", () => {
    const road = [
      { x: 365, y: 565 },
      { x: 570, y: 435 },
      { x: 805, y: 410 },
      { x: 1030, y: 500 },
      { x: 1215, y: 545 },
      { x: 1175, y: 665 },
      { x: 1110, y: 780 },
      { x: 875, y: 825 },
      { x: 620, y: 795 },
      { x: 420, y: 705 },
    ] as const;
    const start = { x: 757, y: 651 };
    const movedTowardShelter = moveWithinPolygon(
      start,
      { x: 0, y: -1 },
      300,
      road,
    );
    const tappedShelterRoof = clampPointToPolygon({ x: 950, y: 260 }, road);

    expect(isPointInPolygon(start, road)).toBe(true);
    expect(isPointInPolygon(movedTowardShelter, road)).toBe(true);
    expect(movedTowardShelter.y).toBeGreaterThanOrEqual(410);
    expect(isPointInPolygon(tappedShelterRoof, road)).toBe(true);
    expect(tappedShelterRoof.y).toBeGreaterThan(410);
  });
});
