export const BEAUTY_CELL_SCHEMA_VERSION = "1.0.0";
export const BEAUTY_CELL_STABLE_ID = "concept-c-beauty-cell-r02";
export const BEAUTY_CELL_SEED = 0x43_42_43_02;

export type BeautyCellBounds = Readonly<{
  minimumX: number;
  maximumX: number;
  minimumZ: number;
  maximumZ: number;
}>;

export type BeautyCellModuleRole =
  | "route"
  | "threshold"
  | "shelter"
  | "water"
  | "work"
  | "habitat"
  | "landmark";

export interface BeautyCellModuleSpec {
  readonly stableId: string;
  readonly role: BeautyCellModuleRole;
  readonly anchor: Readonly<{ x: number; y: number; z: number }>;
  readonly bounds: BeautyCellBounds;
  readonly authoredCues: readonly string[];
  readonly causalRule: string;
  readonly gameplayPromise: string;
}

export interface BeautyCellSpecification {
  readonly schemaVersion: typeof BEAUTY_CELL_SCHEMA_VERSION;
  readonly stableId: typeof BEAUTY_CELL_STABLE_ID;
  readonly seed: typeof BEAUTY_CELL_SEED;
  readonly deterministic: true;
  readonly environmentKind: "optimistic-reclaimed-modern-city";
  readonly worldBounds: BeautyCellBounds;
  readonly spawn: Readonly<{ x: 430; z: 900 }>;
  readonly clearPlayerCorridor: Readonly<{
    centerZ: 900;
    minimumX: 390;
    maximumX: 820;
    clearHalfWidth: 70;
  }>;
  readonly composition: Readonly<{
    cameraIntent: "fixed-diagonal-hd2d";
    foreground: readonly string[];
    middleGround: readonly string[];
    background: readonly string[];
    focalHierarchy: readonly string[];
  }>;
  readonly materialGrammar: Readonly<{
    wetAsphalt: readonly string[];
    reclaimedConcrete: readonly string[];
    vegetation: readonly string[];
    technology: readonly string[];
  }>;
  readonly modules: readonly BeautyCellModuleSpec[];
  readonly generationProvenance: Readonly<{
    source: "runtime-procedural-geometry";
    externalAssets: false;
    referenceImageUsedAtRuntime: false;
    generator: "beauty-cell-composition-grammar";
    generatorVersion: "1.0.0";
    laws: readonly string[];
  }>;
}

export const BEAUTY_CELL_SPEC: BeautyCellSpecification = Object.freeze({
  schemaVersion: BEAUTY_CELL_SCHEMA_VERSION,
  stableId: BEAUTY_CELL_STABLE_ID,
  seed: BEAUTY_CELL_SEED,
  deterministic: true,
  environmentKind: "optimistic-reclaimed-modern-city",
  worldBounds: Object.freeze({
    minimumX: -70,
    maximumX: 930,
    minimumZ: 470,
    maximumZ: 1_320,
  }),
  spawn: Object.freeze({ x: 430, z: 900 }),
  clearPlayerCorridor: Object.freeze({
    centerZ: 900,
    minimumX: 390,
    maximumX: 820,
    clearHalfWidth: 70,
  }),
  composition: Object.freeze({
    cameraIntent: "fixed-diagonal-hd2d",
    foreground: Object.freeze([
      "leaf-framed-lower-edge",
      "rain-dark-stair-threshold",
      "bright-maintained-planters",
    ]),
    middleGround: Object.freeze([
      "playable-wet-intersection",
      "human-scale-transit-shelter",
      "field-workbench-and-contract-kiosk",
    ]),
    background: Object.freeze([
      "water-reclaim-basin",
      "broken-concrete-city-frame",
      "physically-present-anomaly",
    ]),
    focalHierarchy: Object.freeze([
      "player-and-companion",
      "sunlit-crosswalk",
      "working-amber-technology",
      "distant-cyan-anomaly",
    ]),
  }),
  materialGrammar: Object.freeze({
    wetAsphalt: Object.freeze([
      "fine-aggregate-normal",
      "irregular-puddle-clearcoat",
      "worn-paint-not-clean-stripes",
    ]),
    reclaimedConcrete: Object.freeze([
      "mineral-bloom",
      "repair-seams",
      "runoff-fed-moss",
    ]),
    vegetation: Object.freeze([
      "highest-density-at-water-and-drains",
      "low-density-in-maintained-route",
      "warm-flower-accents-near-human-work",
    ]),
    technology: Object.freeze([
      "dark-ceramic-and-brushed-metal",
      "cyan-data-light",
      "amber-life-light",
    ]),
  }),
  modules: Object.freeze([
    Object.freeze({
      stableId: "cbc-route-reclaimed-intersection",
      role: "route",
      anchor: Object.freeze({ x: 430, y: 0.7, z: 900 }),
      bounds: Object.freeze({
        minimumX: 40,
        maximumX: 860,
        minimumZ: 570,
        maximumZ: 1_250,
      }),
      authoredCues: Object.freeze([
        "offset-crosswalk",
        "tactile-paving",
        "drainage-cuts",
        "wet-wheel-tracks",
      ]),
      causalRule:
        "Active foot traffic keeps the east route open while failed drains retain shallow rainwater.",
      gameplayPromise:
        "A readable combat lane with occluding detail kept outside the player corridor.",
    }),
    Object.freeze({
      stableId: "cbc-threshold-rain-stairs",
      role: "threshold",
      anchor: Object.freeze({ x: 250, y: 1, z: 1_035 }),
      bounds: Object.freeze({
        minimumX: 145,
        maximumX: 340,
        minimumZ: 960,
        maximumZ: 1_160,
      }),
      authoredCues: Object.freeze([
        "broad-lower-left-stairs",
        "broken-retaining-wall",
        "mossed-handrail",
      ]),
      causalRule:
        "A retaining wall diverts runoff down the stairs, darkening the treads and feeding edge moss.",
      gameplayPromise:
        "A strong foreground threshold and future vertical-route affordance.",
    }),
    Object.freeze({
      stableId: "cbc-shelter-transit-04",
      role: "shelter",
      anchor: Object.freeze({ x: 294, y: 1, z: 718 }),
      bounds: Object.freeze({
        minimumX: 205,
        maximumX: 380,
        minimumZ: 650,
        maximumZ: 780,
      }),
      authoredCues: Object.freeze([
        "laminated-glass-panels",
        "patched-solar-roof",
        "working-route-display",
      ]),
      causalRule:
        "The roof still catches rain and solar power, so survivors maintain the light and water filter beneath it.",
      gameplayPromise:
        "A safe readable waypoint that later supports rest, rumor, and companion meetings.",
    }),
    Object.freeze({
      stableId: "cbc-water-spillway",
      role: "water",
      anchor: Object.freeze({ x: 132, y: 0.4, z: 700 }),
      bounds: Object.freeze({
        minimumX: -45,
        maximumX: 245,
        minimumZ: 555,
        maximumZ: 815,
      }),
      authoredCues: Object.freeze([
        "shallow-clear-basin",
        "concrete-spillway",
        "reed-density-gradient",
      ]),
      causalRule:
        "A cracked utility main continuously replenishes the lowest basin and determines the reed line.",
      gameplayPromise:
        "A cool reflective counterweight and a future resource/risk pocket.",
    }),
    Object.freeze({
      stableId: "cbc-work-relic-bench",
      role: "work",
      anchor: Object.freeze({ x: 620, y: 1, z: 836 }),
      bounds: Object.freeze({
        minimumX: 555,
        maximumX: 705,
        minimumZ: 765,
        maximumZ: 920,
      }),
      authoredCues: Object.freeze([
        "field-tool-silhouettes",
        "cable-spool",
        "amber-analysis-lamp",
      ]),
      causalRule:
        "The bench sits on a dry raised apron close to the route and draws power from salvaged transit cells.",
      gameplayPromise:
        "An obvious future interaction point for analysis, assembly, and limited-use skills.",
    }),
    Object.freeze({
      stableId: "cbc-habitat-drain-gardens",
      role: "habitat",
      anchor: Object.freeze({ x: 635, y: 1, z: 1_020 }),
      bounds: Object.freeze({
        minimumX: 520,
        maximumX: 785,
        minimumZ: 965,
        maximumZ: 1_205,
      }),
      authoredCues: Object.freeze([
        "repaired-planter-frames",
        "edible-leaf-grid",
        "small-warm-flowers",
      ]),
      causalRule:
        "Planters intercept road runoff but remain trimmed along the maintained east route.",
      gameplayPromise:
        "Visible human optimism and a later food/crafting loop without a quest marker.",
    }),
    Object.freeze({
      stableId: "cbc-landmark-real-anomaly",
      role: "landmark",
      anchor: Object.freeze({ x: 575, y: 50, z: 565 }),
      bounds: Object.freeze({
        minimumX: 510,
        maximumX: 645,
        minimumZ: 505,
        maximumZ: 625,
      }),
      authoredCues: Object.freeze([
        "broken-conductor-ring",
        "suspended-relic-shards",
        "cyan-field-core",
      ]),
      causalRule:
        "A fractured superconducting service ring traps an intermittent field between its surviving segments.",
      gameplayPromise:
        "A real world-space destination rather than a flat backdrop or decorative billboard.",
    }),
  ]),
  generationProvenance: Object.freeze({
    source: "runtime-procedural-geometry",
    externalAssets: false,
    referenceImageUsedAtRuntime: false,
    generator: "beauty-cell-composition-grammar",
    generatorVersion: "1.0.0",
    laws: Object.freeze([
      "water-follows-low-points-and-broken-infrastructure",
      "plant-density-follows-water-light-and-human-maintenance",
      "repair-signals-cluster-near-safe-travel-and-dry-work-surfaces",
      "detail-density-may-frame-but-never-obscure-the-player-corridor",
      "technology-emission-is-limited-to-functional-data-or-life-signals",
    ]),
  }),
});

export function beautyCellModule(
  stableId: BeautyCellModuleSpec["stableId"],
): BeautyCellModuleSpec {
  const module = BEAUTY_CELL_SPEC.modules.find(
    (candidate) => candidate.stableId === stableId,
  );
  if (module === undefined) {
    throw new RangeError(`Unknown Beauty Cell module: ${stableId}`);
  }
  return module;
}
