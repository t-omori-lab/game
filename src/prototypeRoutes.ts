export type PrototypeReleaseId = "r01" | "r02" | "r03" | "r04";

export interface PrototypeRelease {
  readonly id: PrototypeReleaseId;
  readonly title: string;
  readonly summary: string;
  readonly status: "latest" | "archive";
}

export const PROTOTYPE_RELEASES: readonly PrototypeRelease[] = [
  {
    id: "r04",
    title: "Causal World Beauty Cell",
    summary:
      "R02の連続world、collision、loot、quest、半自動戦闘を保持し、画角、光、素材、人物表現を組み直したリアルタイム3D次版。",
    status: "latest",
  },
  {
    id: "r03",
    title: "Concept C Beauty Benchmark",
    summary:
      "Cの画角と素材感を基準画像から再構築し、高密度な女性主人公、相棒、正しい4方向移動を統合した独立2.5Dセル。",
    status: "archive",
  },
  {
    id: "r02",
    title: "AI-native Concept C Beauty Cell",
    summary:
      "高密度な立体造形、濡れた都市、自然侵食、光と被写界深度を一画面に統合した最新の美術検証セル。",
    status: "archive",
  },
  {
    id: "r01",
    title: "Concept C Direction Lock",
    summary:
      "固定斜め俯瞰、PC Ultra描画、半自動戦闘と相棒プレビューを確立した保存版プロトタイプ。",
    status: "archive",
  },
] as const;

const RELEASE_PATH_PATTERN = /\/(r01|r02|r03|r04)(?:\/|$)/i;

export function resolvePrototypeRelease(
  pathname: string,
  search = "",
): PrototypeReleaseId | null {
  const alias = resolvePrototypeAlias(search);

  if (alias !== null) {
    return alias;
  }

  const match = RELEASE_PATH_PATTERN.exec(pathname);
  const releaseId = match?.[1]?.toLowerCase();

  return releaseId === "r01" ||
    releaseId === "r02" ||
    releaseId === "r03" ||
    releaseId === "r04"
    ? releaseId
    : null;
}

export function resolvePrototypeAlias(
  search: string,
): PrototypeReleaseId | null {
  const prototype = new URLSearchParams(search).get("prototype");

  if (prototype === "north-star") {
    return "r01";
  }

  if (prototype === "beauty-cell") {
    return "r02";
  }

  return null;
}

export function createReleaseHref(
  releaseId: PrototypeReleaseId,
  baseUrl: string,
  sourceSearch = "",
): string {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const parameters = new URLSearchParams(sourceSearch);
  parameters.delete("prototype");
  const query = parameters.size > 0 ? `?${parameters.toString()}` : "";

  return `${normalizedBase}${releaseId}/${query}`;
}
