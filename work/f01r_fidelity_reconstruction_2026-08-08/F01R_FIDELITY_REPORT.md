# F-01R Source-faithful Reconstruction Cell

Status: local implementation and internal QA passed; user art review pending

## 結論

F-02のtechnical bridgeは保持し、art patchは不採択証拠として固定した。F-01 Beauty Sheetをart authorityへ戻し、人物性への寄与が大きい頭・顔・髪だけを最初のsemantic reconstruction cellとして再構築した。ForgeとR09は、同じIDではなく同じcompiled packそのものを読む。

## 何を変えたか

- `f01r.source.json`にlandmark、palette、module order、provenance、F-01 body baseを記録した。
- 頭蓋、face skin、hair shell、fringe、左右side lock、cowlick、hair ridge、eyes、mouth、blush、hair clip、neck collarを独立moduleにした。
- deterministic compilerでschema v2／6-byte strideのsurface packを生成した。各cellはpart、materialに加えてmodule indexを持つ。
- F-01の非頭部surfaceは今回の境界内で暫定再利用した。全身の完成を装ってはいない。
- `F01RCharacter`を正本factoryとし、Character ForgeとR09 gameplay adapterが同じfactoryを呼ぶようにした。
- ForgeにF-01／F-02／F-01R切替を追加し、R09はF-01Rを既定generated actor、`?actor=f01`／`?actor=f02`を比較経路にした。

## Compiled contract

| Item | Value |
| --- | --- |
| Asset ID | `fram.character.f01r.source-faithful-head-v1` |
| Surface cells | 9,065 |
| Semantic modules | 20 |
| Materials | 13 |
| Rig parts | 7 |
| Source SHA-256 | `8fd93a6f98123624f99d8f151647cddc66c8d22445338243719dfdf8441a9315` |
| Payload SHA-256 | `7f5a3900727a907f3226a59d5e1a21138bf2d4d2056a500032d6a84edda697f4` |

ForgeとR09のDOM contractから、上記ID、両digest、cell数、module数の一致を確認した。

## Visual result

同じForge cameraでF-01／F-02／F-01Rを比較した。F-01RはF-02の平面skin mask、巨大な矩形眼、白黒のhard retoneを除去し、丸いface、skin cheek、左右眼、小さい口、blush、首、非対称bob／side lockへ戻した。通常R09 cameraでは、白髪の丸い頭、顔、jacket、inner suit、pack、toolが一つの主人公として読める。

一方、Beauty Sheetの細かなhair lock、上まぶた、頬の柔らかさ、poseの人格までは一致していない。bodyはF-01 visual hull由来で、torso／jacket、arms／gloves、legs／boots、pack、textile、toolのsource module化が残る。

また、今回のsemantic sourceはBeauty／Build Sheetを見てagentがlandmarkとmodule parameterへ起こしたもの。Build Sheet下段のmodule画像からmask／depth／orderを自動抽出する工程はまだない。したがって「sheetを入力すれば無人で3Dになる」完成形ではなく、画像とgame実画面の間をversion管理できる最初の編集可能cellである。

## Verification

- strict TypeScript: passed
- Vitest: 45 files／235 tests passed
- production build: passed
- in-app browser: Forge F-01／F-02／F-01R same-view capture、F-01R front／FIELD passed
- R09: asset loaded、boot ready、presentation active、movement、manual skill、browser error 0
- public deploy／push: not performed
- full performance baseline／iPhone 16 Pro: not run in this slice

## Next correction loop

1. ユーザーが頭・顔・髪をmodule単位でaccept／reviseする。
2. correctionはTypeScript geometryへ足さず、`f01r.source.json`へ戻す。
3. compilerを再実行し、source／payload digestを更新する。
4. Forge close／front／FIELDとR09 actual gameplayを同時captureする。
5. 頭部採択後、同じ契約でjacket、limbs、pack、textile、toolを置換する。

このloopにより、画像生成したsheetを一回だけ3D化するのではなく、実ゲーム画面からsourceへ戻って再生成できるCharacter Forgeへ進める。
