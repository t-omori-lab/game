import type {
  PrototypeBHeroAssetRequest,
  PrototypeBHeroAssetRuntime,
} from "../prototypeB/render/hero/HeroAssetRuntime";

type R09HeroAssetModule = {
  readonly R09_HERO_ASSET_RUNTIME: PrototypeBHeroAssetRuntime;
};

export type R09HeroAssetImporter = () => Promise<R09HeroAssetModule>;

class R09HeroAssetTimeoutError extends Error {}

const importR09HeroAsset: R09HeroAssetImporter = () =>
  import("../prototypeB/render/hero/F01RForgeHeroVisual");

const importF01HeroAsset: R09HeroAssetImporter = () =>
  import("../prototypeB/render/hero/F01ForgeHeroVisual");

const importF02HeroAsset: R09HeroAssetImporter = () =>
  import("../prototypeB/render/hero/F02ForgeHeroVisual");

export async function loadR09HeroAsset(
  search: string,
  timeoutMs = 4_000,
  importer: R09HeroAssetImporter = importR09HeroAsset,
): Promise<PrototypeBHeroAssetRequest> {
  const actor = new URLSearchParams(search).get("actor");
  if (actor === "legacy") {
    return { status: "disabled" };
  }
  const selectedImporter = actor === "f01"
    ? importF01HeroAsset
    : actor === "f02"
      ? importF02HeroAsset
      : importer;

  let timeoutHandle: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_resolve, reject) => {
    timeoutHandle = setTimeout(
      () => reject(new R09HeroAssetTimeoutError()),
      Math.max(1, timeoutMs),
    );
  });

  try {
    const module = await Promise.race([selectedImporter(), timeout]);
    return {
      status: "loaded",
      runtime: module.R09_HERO_ASSET_RUNTIME,
    };
  } catch (error: unknown) {
    return {
      status: error instanceof R09HeroAssetTimeoutError
        ? "timeout"
        : "failed",
    };
  } finally {
    if (timeoutHandle !== undefined) clearTimeout(timeoutHandle);
  }
}
