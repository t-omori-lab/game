export type PrototypeReleaseId =
  | "r01"
  | "r02"
  | "r03"
  | "r04"
  | "r05"
  | "r06"
  | "r07"
  | "r08"
  | "r09";

export interface PrototypeRelease {
  readonly id: PrototypeReleaseId;
  readonly title: string;
  readonly summary: string;
  readonly status: "latest" | "archive";
}

export const PROTOTYPE_RELEASES: readonly PrototypeRelease[] = [
  {
    id: "r09",
    title: "F.R.A.M. / First Memory Expedition",
    summary:
      "二つのsiteを自由に歩き、遺物を持ち帰り、最初の拠点とmoduleを選ぶ。保存された選択が二回目の光と遊びを変える、世界記憶ループの実証版です。",
    status: "latest",
  },
  {
    id: "r06",
    title: "F.R.A.M. / Sharp Navigation Build",
    summary:
      "視界を広く保ち、迷わず廃都を歩けるようにした現在の公開版。ミニマップ、目的地への案内、戦闘操作をひとつの画面にまとめました。",
    status: "archive",
  },
  {
    id: "r05",
    title: "F.R.A.M. / High-density Voxel Girl",
    summary:
      "少女型F-01を初めて高密度ボクセルで形にした試作版。広い見下ろし画面と、小さな世界をのぞき込むような奥行きを試しています。",
    status: "archive",
  },
  {
    id: "r04",
    title: "Causal World Beauty Cell",
    summary:
      "町から廃区まで歩き、敵と戦い、遺物を拾って帰る。遊びの流れを残したまま、光、路面、建物、主人公の見え方を作り直した版です。",
    status: "archive",
  },
  {
    id: "r03",
    title: "Concept C Beauty Benchmark",
    summary:
      "濡れた街路と自然に覆われた都市を舞台に、女性主人公と相棒が歩く一場面を作り込んだ映像基準版です。上下左右の移動にも対応しています。",
    status: "archive",
  },
  {
    id: "r02",
    title: "AI-native Concept C Beauty Cell",
    summary:
      "濡れた路面、錆びた構造物、芽吹く草木、遠くの光。F.R.A.M.が目指す色と空気を、リアルタイム3Dで探った最初の美術試作です。",
    status: "archive",
  },
  {
    id: "r01",
    title: "Concept C Direction Lock",
    summary:
      "斜め見下ろしの画面で街を歩き、間合いに入れば通常攻撃、ここぞという場面では大技を放つ。現在の方向を定めた最初の保存版です。",
    status: "archive",
  },
] as const;

const RELEASE_PATH_PATTERN = /\/(r01|r02|r03|r04|r05|r06|r07|r08|r09)(?:\/|$)/i;

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
    releaseId === "r04" ||
    releaseId === "r05" ||
    releaseId === "r06" ||
    releaseId === "r07" ||
    releaseId === "r08" ||
    releaseId === "r09"
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
