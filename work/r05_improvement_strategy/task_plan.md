# R05 improvement strategy — task plan

Updated: 2026-08-02

## Goal

公開済みR05とConcept Cを同じ条件で比較し、初期表示の重さ、ミニチュアボケ、主人公の可愛さ、HUD／操作理解の四課題を、次版で実装できる優先順位付き方針へ落とす。今回はruntimeを変更・deployせず、根拠を伴う設計文書を完成させる。

## Scope and boundaries

- 対象: `https://t-omori-lab.github.io/game/`、`/game/r05/`、現在のsource、Concept C正本。
- 変更対象: 本work folderと、状態が変わった場合のproject docsのみ。
- 非対象: R05 runtimeの改修、asset生成、Figma作成、GitHub Pages deploy。
- 判定は、現在の公開画面、source／bundle実測、保存した同一viewport screenshotを根拠にする。

## Phases

1. **Evidence capture — completed**
   - 公開catalogとR05の初回load、resource量、main-thread work、service worker挙動を確認する。
   - Concept C、公開R05 intro／gameplayを同じviewportで保存し、目視する。
2. **Parallel audit — completed**
   - Performance、DOF／composition、character proportion、HUD／controlsを独立に監査する。
   - 高品質な市販gameと公式技術資料から、転用する原則だけを抽出する。
3. **Design synthesis — completed**
   - P0/P1/P2、実装順、acceptance gate、計測budgetを定義する。
   - 次版で作るUI state、mini-map／marker、character preset比較を具体化する。
4. **Project handoff — completed**
   - `R05_IMPROVEMENT_STRATEGY.md`を完成する。
   - project context／next tasksへ必要なdeltaだけ反映し、postflightを通す。

## Decisions

- 「重い」はbundle sizeだけで決めず、catalogの初期download、service workerのbackground fetch、R05 startまでのCPU／GPU準備を分離して測る。
- ボケは強度調整問題と仮定しない。Concept Cのdepth stagingと現在のscreen-space band設計を比較する。
- 主人公はsmooth 3Dへ戻さず、高密度voxel表現を維持する。頭身、頭部比率、顔cluster、髪silhouette、pose、通常gameplay占有率を別々に直す。
- HUDは常時全部を出すのではなく、常時・文脈・学習時・debugの四層に分ける。

## Errors / blockers

- Local shell did not expose `node` on PATH during an optional linked-asset sum check. The performance audit independently measured the production artifact with the configured project runtime, so this did not block the strategy.
- iPhone 16 Pro実機、Safari／PWA、cold cacheの正式なperformance measurementはこの設計turnの範囲外。

## Verification

- Public catalog、R05 intro、R05 gameplayを1280×720でcurrent-run captureし、目視した。
- Concept C正本とcurrent screenshotのfull-view／hero cropを比較した。
- Catalog image size、service-worker precache、R05 bundle、runtime texture／hero construction、HUD sourceを監査した。
- Three.js、Vite、MDN、Blizzard、PlayStation、Nintendoの公式資料で実装候補とUI原則を確認した。
- `git diff --check`: pass。
- Workspace postflight: 36 pass、0 warning、0 fail。Gitはpre-existing untracked screenshotを含むdirty-worktree warningのみ。
