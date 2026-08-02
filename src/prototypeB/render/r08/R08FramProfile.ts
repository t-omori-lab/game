/**
 * R08 keeps the R07 causal world, camera, navigation HUD and restrained
 * depth-aware softness. It replaces every visible heroine body surface with
 * one coherent semantic micro-voxel art pass.
 */
export const R08_FRAM_PROFILE = Object.freeze({
  schemaVersion: 1,
  stableId: "fram-r08-unified-semantic-voxel-girl-v1",
  environmentProfile: "r04-live" as const,
  cameraCompositionProfile: "r05" as const,
  presentationProfile: "r08-fram" as const,
  post: {
    maxPixelRatio: 1.5,
    depthAwareDof: true,
    focusRange: 0.036,
    blurPixels: 1.45,
    edgeThreshold: 0.0045,
  },
  actors: {
    heroScale: 2.58,
  },
  identity: {
    title: "F.R.A.M.",
    instance: "F.R.A.M. F-01B",
    characterPreset: "unified-semantic-micro-voxel-girl-b",
  },
} as const);

export type R08FramProfile = typeof R08_FRAM_PROFILE;
