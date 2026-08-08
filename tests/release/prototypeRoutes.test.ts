import { describe, expect, it } from "vitest";
import {
  PROTOTYPE_RELEASES,
  createReleaseHref,
  resolvePrototypeAlias,
  resolvePrototypeRelease,
} from "../../src/prototypeRoutes";

type NodeFs = {
  statSync(path: URL): { isFile(): boolean; readonly size: number };
};

type NodeProcess = {
  getBuiltinModule(name: "fs"): NodeFs;
};

const fileSystem = (globalThis as typeof globalThis & {
  readonly process: NodeProcess;
}).process.getBuiltinModule("fs");

describe("prototype release routing", () => {
  it("lists playable releases newest first", () => {
    expect(PROTOTYPE_RELEASES.map((release) => release.id)).toEqual([
      "r09",
      "r06",
      "r05",
      "r04",
      "r03",
      "r02",
      "r01",
    ]);
    expect(PROTOTYPE_RELEASES[0]?.status).toBe("latest");
    expect(PROTOTYPE_RELEASES[1]?.status).toBe("archive");
    expect(PROTOTYPE_RELEASES[2]?.status).toBe("archive");
    expect(PROTOTYPE_RELEASES[3]?.status).toBe("archive");
    expect(PROTOTYPE_RELEASES[4]?.status).toBe("archive");
    expect(PROTOTYPE_RELEASES[5]?.status).toBe("archive");
    expect(PROTOTYPE_RELEASES[6]?.status).toBe("archive");
  });

  it("ships a non-empty catalog thumbnail for every listed release", () => {
    for (const release of PROTOTYPE_RELEASES) {
      const thumbnail = fileSystem.statSync(
        new URL(`../../public/catalog/${release.id}.jpg`, import.meta.url),
      );

      expect(thumbnail.isFile(), `${release.id} thumbnail`).toBe(true);
      expect(thumbnail.size, `${release.id} thumbnail bytes`).toBeGreaterThan(1024);
    }
  });

  it("resolves versioned paths without confusing the catalog", () => {
    expect(resolvePrototypeRelease("/game/", "")).toBeNull();
    expect(resolvePrototypeRelease("/game/r01/", "")).toBe("r01");
    expect(resolvePrototypeRelease("/game/r02/index.html", "")).toBe("r02");
    expect(resolvePrototypeRelease("/game/r03/index.html", "")).toBe("r03");
    expect(resolvePrototypeRelease("/game/r04/index.html", "")).toBe("r04");
    expect(resolvePrototypeRelease("/game/r05/index.html", "")).toBe("r05");
    expect(resolvePrototypeRelease("/game/r06/index.html", "")).toBe("r06");
    expect(resolvePrototypeRelease("/game/r07/index.html", "")).toBe("r07");
    expect(resolvePrototypeRelease("/game/r08/index.html", "")).toBe("r08");
    expect(resolvePrototypeRelease("/game/r09/index.html", "")).toBe("r09");
  });

  it("keeps compatibility aliases pinned to their intended release", () => {
    expect(resolvePrototypeAlias("?prototype=north-star")).toBe("r01");
    expect(resolvePrototypeAlias("?prototype=beauty-cell")).toBe("r02");
    expect(resolvePrototypeAlias("?prototype=0.1")).toBeNull();
    expect(
      resolvePrototypeRelease(
        "/game/r02/",
        "?prototype=north-star&debug=1",
      ),
    ).toBe("r01");
  });

  it("creates canonical links while preserving non-routing diagnostics", () => {
    expect(createReleaseHref("r04", "/game")).toBe("/game/r04/");
    expect(createReleaseHref("r05", "/game")).toBe("/game/r05/");
    expect(createReleaseHref("r06", "/game")).toBe("/game/r06/");
    expect(createReleaseHref("r07", "/game")).toBe("/game/r07/");
    expect(createReleaseHref("r08", "/game")).toBe("/game/r08/");
    expect(createReleaseHref("r09", "/game")).toBe("/game/r09/");
    expect(createReleaseHref("r03", "/game")).toBe("/game/r03/");
    expect(createReleaseHref("r02", "/game")).toBe("/game/r02/");
    expect(
      createReleaseHref(
        "r01",
        "/game/",
        "?prototype=north-star&debug=1",
      ),
    ).toBe("/game/r01/?debug=1");
  });
});
