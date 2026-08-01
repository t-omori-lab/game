# Task Plan: AI-native Concept C Beauty Cell v1

## Goal

現在のThree.js／browser基盤で、選択済みConcept Cの構図、密度、光、色、素材、選択的DoFを、移動・半自動戦闘・装備表示が成立する一つのrealtime Beauty Cellとして`R02`に再現する。現行prototypeを`R01`として保持し、`/game/`に新しい順のversion一覧を設け、検証済みbuildをGitHub Pagesへ公開する。

## Acceptance gates

- [x] Concept CのPNGを背景として使用せず、road／stair／shelter／water／vegetation／hero／anomalyをruntime sceneとして構成する
- [x] 2560×1440相当のPC viewで、hero、route、wet surface、vegetation、depth bands、warm light、cool shadow、stronger background bokehが読める
- [x] heroが移動できるruntimeへ接続され、半自動通常攻撃、手動大技、装備差、enemy telegraphを維持する
- [x] Beauty Cellをversioned spec／manifestから構築し、rendererへ個別座標を無制限に直書きしない
- [x] strict TypeScript、Vitest、production build、desktop browser boot／render statusを検証する
- [ ] scope限定commitをpushし、GitHub Pages workflowと公開URLを確認する
- [ ] `/game/r01/`で現行prototype、`/game/r02/`でBeauty Cell、`/game/`で新しい順の説明付き一覧を直接開ける

## Phases

- [x] Phase 0: Workspace／project instructions、skills、Git状態、公開先を確認する
- [x] Phase 1: Concept Cと現行North Star routeを同一条件で撮影し、最大差分と再利用可能な描画機構を監査する
- [x] Phase 2: Beauty Cell spec／visual grammar／asset manifestの最小AI-native contractを実装する
- [x] Phase 3: environment、hero、lighting、wetness、vegetation、DoF、UIをConcept Cへ収束させる
- [x] Phase 4: tests、build、browser capture、操作、render statusを反復検証する
- [ ] Phase 5: durable docs、postflight、scope限定commit、push、GitHub Pages公開確認を行う（進行中）

## Decisions made

- Concept Cは知覚目標であり、PNGそのものをbackground、depth、normal、textureとして使用しない。
- 一般ゲームエンジンは導入しない。既存simulationとbrowser即時previewを維持し、固定camera専用の縦型生成基盤として作る。
- visualはPC masterを先に合格させ、iPhoneは同じasset／compositionから後で縮退する。今回の公開はiPhone実機合格を意味しない。
- AI生成候補はspec／manifest／provenanceへ戻し、runtimeのcollision、combat、save、world truthはdeterministic codeが所有する。
- 既存baseline routeと`?prototype=north-star`を保持する。`?prototype=north-star`は凍結R01、`?prototype=beauty-cell`はR02への互換aliasとする。
- 現行North Star routeは`R01`として凍結する。Beauty Cellは`R02`の新routeに実装し、既存query URLは互換aliasとして保持する。
- 今後のdeploy planには、既存versionを保持するかの確認を必須項目として残す。

## Errors encountered

- bundled `pnpm run dev`はdependency status checkでregistry取得に失敗し、`node_modules`再作成確認へ進んだため中止した。既存modulesを保ち、bundled NodeからVite entrypointを直接起動する。
- sandbox内Viteは`listen EPERM`で停止した。localhost待受だけを許可付きで起動した。
- 5173／5174は既存serverが使用中だったため、今回の検証serverは5175で起動した。
- in-app browserの`networkidle`待機はbackend非対応だった。`domcontentloaded`と描画完了後の状態検査へ切り替えた。
- system `node`はPATH上になかった。Workspace bundled Nodeの絶対pathへ統一した。
- 並行作業中の一時的なVite config型errorはNode型を必要としない相対inputへ修正し、strict TypeScriptを再び通過した。
- sandbox内`curl`から許可付きpreview serverへ到達できなかったため、同じproduction buildを許可付きHTTP probeで検証し、catalog、R01、R02、service worker、manifestの200応答を確認した。
- in-app browser packageには`consoleMessages()`とlocatorの`focus()`がなく、専用console採取は実行できなかった。startup failure UIがないこと、canvasのrender data属性、production HTTP、unit／integration testsを検査し、console error 0件とは主張しない。
- 公開前reviewで、routeだけのR01がcurrent main bundleを共有し将来変質することを検出した。開始commit `88d0f2f`からbase `./`で独立buildし、静的bundle、source commit、SHA-256 manifestとして`public/r01/`へ固定した。
- 同reviewで、Beauty Cellが旧simulationの未置換terrain／propを描かず不可視collision／空の東方routeを作ることを検出した。全replaced colliderへbounds anchorと読めるfixtureを追加し、未置換world geometryをfallback描画するよう修正した。
- R01 nested service workerの旧cache prefixがroot service workerのmigration削除対象になる競合を検出した。R01を`relic-frontier-r01-shell-`へ分離し、snapshotのSHA-256を更新した。

## Status

**Phase 5 in progress** — local candidateと版管理shellは検証済み。durable docs、scope限定commit、push、GitHub Pages workflow、公開URL確認を完了する。
