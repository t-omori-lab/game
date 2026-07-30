# Task Plan: Prototype B — 生活型ハクスラ原型

## Goal

iPhone 16 Proの横画面で遊べる、固定俯瞰ボクセル表現・スクロール探索・手動戦闘・小さな依頼分岐を備えた10分版を作り、現行prototype 0.1とは別の遊びの核として評価可能にする。

## Phases

- [x] Phase 1: 現行architectureを調査し、Prototype Bの仕様・移行境界・検証条件を固定する
- [x] Phase 2: Three.jsによる固定俯瞰voxel renderer、追従camera、scroll地形を実装する
- [x] Phase 3: 手動攻撃、防御、回避、魔法、item、loot／装備差を実装する
- [x] Phase 4: 町―分岐路―廃屋、名付き異形、三つの依頼分岐、最小sound designを実装する
- [x] Phase 5: unit test、build、iPhone相当browser QA、performance表示、操作性、音の判別性を検証する
- [x] Phase 6: durable docsを更新し、postflightとscope限定commitを行う

## Key Questions

1. 現行simulation／save／PWAを保ちつつ、Phaser表示を安全にThree.jsへ交換できるか。
2. 16×16×16 voxelを個別cubeではなく統合geometryとして描き、iPhoneで安定させられるか。
3. 10分以内に武器差、手動操作、探索目的、名付き敵への選択を体感できるか。

## Decisions Made

- prototype 0.1は評価基準としてGit履歴に保存し、Prototype Bでは遊びの核を入れ替える。
- 作品の中心を「Elona／ルナティックドーン型の自由世界に、手動ハクスラを置く」とする。
- 常時自動遠隔攻撃を廃止し、基本攻撃・防御・itemはplayer入力で行う。
- 近距離自動攻撃は本体機能ではなく、後の装備特性またはaccessibility候補とする。
- 16³はasset authoring gridとし、rendererでは隠れ面を除去した統合geometryへ変換する。
- 世界観は確定しないため、初版の名付き敵は「異形」とし、妖怪へ差し替えられるdata構造にする。
- 世界観の上位概念を「辺境を旅する生活型ハクスラ＋正体不明のSF遺物」とし、妖怪、電脳怪異、旧文明機械のいずれにも着せ替えられるようにする。
- ラグランジュポイントを、武器差、SF設定、音がgameplayの記憶へ残る参考にする。
- 攻殻機動隊、Cyberpunk 2077、Watch Dogsからは監視、network、身体拡張、都市の裏側という題材だけを参照し、固有表現は模倣しない。
- SF item説明は、機能、原理解釈、副作用、使用者の所感を分離したdataとして生成する。

## Errors Encountered

- sandbox内の`pnpm add three @types/three`はregistry取得失敗とstore location不一致で停止した。既存`node_modules`が使うstoreを明示した許可付き再実行で追加を完了した。
- `@types/three`をdevDependencyへ移す`pnpm add --save-dev`はsandboxからpnpm store databaseを開けず停止した。packageとlockfileのimporter区分だけを同じversionのまま手動修正した。
- lockfile更新後、環境側`pnpm` wrapperが非TTYで`node_modules`再生成を中断し、`CI=true`再実行はsandbox内DNSでregistryへ接続できなかった。既存pnpm storeとbundled Node pathを明示した許可付きinstallで復元した。
- 通常の`pnpm build`は環境側dependency status checkが再installを要求したため、検証はbundled NodeからTypeScript、Vite、Vitestのentrypointを直接実行した。
- browserの極端に短いArrow keypressはdown/upが同じ30Hz tick間に収まり、移動へ反映されなかった。input側へ一tickのmovement tap queueを追加して解決した。
- この作業環境では通常PATH上に`node`がなく、local binary wrapperからの検査がexit 127になった。Codex付属Nodeの絶対pathからVitest、TypeScript、Vite entrypointを実行し、すべて合格した。
- `plutil`はwebmanifestをproperty listとして受理しなかったため、manifestはNodeのJSON parseで検証した。
- production previewは、server停止時にbrowserが生成したerror pageからURL policy上復帰できずlive確認を完了できなかった。production buildと生成indexのdefault asset参照は確認したが、HTTPS PWA install／offlineは未確認のまま残す。
- 初回postflightは`PROJECT_CONTEXT`のStatus行へphase説明まで書いたため、manifestの`active`と文字列不一致になった。Statusを`active`へ揃え、phaseを別行へ分離した。
- Status修正後のpostflightはproject auditを通過したが、manifest更新日を進めたことでWorkspace registryの生成欄がstaleになった。project外のregistryを変更せず整合を保つため、今回変更不要だったmanifest日付を登録時の値へ戻した。

## Status

**Completed locally** — Prototype Bは試遊可能な原型として実装・検査・記録済み。次の判定はiPhone 16 Pro実機10分試遊で行う。

## Previous Milestone

Prototype 0.1「境界調査録」は、移動、自動攻撃、強化選択、最小継承、PWA保存を備えた技術原型としてlocal commit済み。ユーザー試遊評価は約20点で、固定闘技場と常時自動射撃が意図する冒険体験と合わないことが確認された。

## Checkpoint Rule

`work/CHECKPOINT.md` は、各phaseが検証済みの独立再開点になったとき、または計画的な中断前だけ更新する。
