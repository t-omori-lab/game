/**
 * R05 changes presentation only. The R04 causal world, collision, quest,
 * loot, and combat simulation remain authoritative.
 */
export const R05_FRAM_PROFILE = Object.freeze({
  schemaVersion: 1,
  stableId: "fram-r05-presentation-v1",
  environmentProfile: "r04-live" as const,
  cameraCompositionProfile: "r05" as const,
  presentationProfile: "r05-fram" as const,
  camera: {
    viewHeight: 640,
    offsetY: 560,
    targetHeight: 28,
    targetOffsetX: -76,
    targetOffsetZ: -82,
    exploreLookAhead: 42,
    combatTargetWeight: 0.34,
    maximumCombatOffset: 88,
    followSpeed: 6.1,
  },
  post: {
    // Keep the beauty pass interactive on current desktop browsers. The
    // temporal AA, bloom and banded tilt-shift still operate at a denser
    // internal resolution than the R04 baseline without stalling inspection.
    maxPixelRatio: 1.5,
    tiltShiftMode: "banded" as const,
    tiltShiftFocus: 0.57,
    tiltShiftClearBand: 0.3,
    tiltShiftFarBlurPixels: 6.5,
    tiltShiftNearBlurPixels: 8.5,
  },
  display: {
    exposure: 0.98,
    fogColor: 0x91aaa7,
    fogNear: 1_620,
    fogFar: 3_480,
    groundWhiteMix: 0.025,
  },
  lighting: {
    skyColor: 0xffe9c9,
    groundColor: 0x183b3a,
    skyIntensity: 0.23,
    keyColor: 0xffc77f,
    keyIntensity: 3.72,
    keyOffsetX: -470,
    keyOffsetY: 790,
    keyOffsetZ: 250,
    shadowHalfExtent: 560,
    shadowNormalBias: 0.58,
    rimColor: 0x79c6d3,
    rimIntensity: 0.48,
    environmentIntensity: 0.13,
  },
  actors: {
    heroScale: 2.24,
  },
  identity: {
    title: "F.R.A.M.",
    fullName: "Frontier Relics Archive Module",
    japaneseName: "辺境遺物記録モジュール",
    instance: "F.R.A.M. F-01",
  },
} as const);

export type R05FramProfile = typeof R05_FRAM_PROFILE;
