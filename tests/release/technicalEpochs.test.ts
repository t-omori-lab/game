import { describe, expect, it } from "vitest";
import {
  TECHNICAL_EPOCHS,
  createTechnicalEpochHref,
} from "../../src/technicalEpochs";

describe("technical epoch routing", () => {
  it("keeps F-01 separate from the numbered playable releases", () => {
    expect(TECHNICAL_EPOCHS.map((epoch) => epoch.id)).toEqual(["f01"]);
    expect(TECHNICAL_EPOCHS[0]?.path).toBe("forge/f01/");
  });

  it("creates a stable Pages URL from either base form", () => {
    const epoch = TECHNICAL_EPOCHS[0];
    expect(epoch).toBeDefined();
    if (epoch === undefined) return;

    expect(createTechnicalEpochHref(epoch, "/game")).toBe(
      "/game/forge/f01/",
    );
    expect(createTechnicalEpochHref(epoch, "/game/")).toBe(
      "/game/forge/f01/",
    );
  });
});
