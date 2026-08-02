export type TechnicalEpochId = "f01";

export interface TechnicalEpoch {
  readonly id: TechnicalEpochId;
  readonly eyebrow: string;
  readonly title: string;
  readonly summary: string;
  readonly review: string;
  readonly path: string;
}

export const TECHNICAL_EPOCHS: readonly TechnicalEpoch[] = [
  {
    id: "f01",
    eyebrow: "CHARACTER FORGE / 2026-08-02",
    title: "F-01 / Image-to-3D Character Forge",
    summary:
      "一枚絵だった主人公を、どの方向から見ても崩れずに動く高密度ボクセルモデルへ。髪、衣装、装備を組み替えられる制作法の最初の形です。",
    review: "USER REVIEW · APPROX. 70%",
    path: "forge/f01/",
  },
] as const;

export function createTechnicalEpochHref(
  epoch: TechnicalEpoch,
  baseUrl: string,
): string {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return `${normalizedBase}${epoch.path}`;
}
