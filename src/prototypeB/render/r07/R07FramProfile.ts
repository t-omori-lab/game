/**
 * R07 keeps the R06 causal world and navigation HUD. It changes only the
 * heroine art contract and the restrained depth-aware presentation pass.
 */
export const R07_FRAM_PROFILE = Object.freeze({
  schemaVersion: 1,
  stableId: "fram-r07-semantic-voxel-girl-v1",
  environmentProfile: "r04-live" as const,
  cameraCompositionProfile: "r05" as const,
  presentationProfile: "r07-fram" as const,
  post: {
    maxPixelRatio: 1.5,
    depthAwareDof: true,
    focusRange: 0.036,
    blurPixels: 1.45,
    edgeThreshold: 0.0045,
  },
  actors: {
    heroScale: 2.38,
  },
  identity: {
    title: "F.R.A.M.",
    instance: "F.R.A.M. F-01A",
    characterPreset: "semantic-micro-voxel-girl-a",
  },
} as const);

export type R07FramProfile = typeof R07_FRAM_PROFILE;
