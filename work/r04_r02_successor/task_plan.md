# Task Plan: R04 R02-successor deploy

## Goal

R02の決定論的simulation、world座標、collision、semi-auto combat、loot、questを正本として維持し、Concept C／R03のcamera、density、light、material、DOF、hero readabilityへ近づけた次版を`/game/r04/`へ公開する。

## Non-negotiable gates

- R04は`src/prototypeB`を使い、R03の独立Canvas 2D appを製品基盤にしない。
- R02／R03／R01の公開snapshotは削除・上書きしない。
- 既存の探索、collision、enemy、loot、quest、二武器、半自動通常攻撃、手動大技を同じruntime stateで動かす。
- Concept C／R03はvisual golden referenceとして使い、静止画一致だけで完成判定しない。
- local design QA、機能test、production build、公開Pages run、公開browser確認を別々に記録する。

## Phases

- [x] Phase 1: R02／R03／Concept Cと現sourceの差分を整理し、R04の最小architectureを確定する。
- [x] Phase 2: R02-derived R04 routeとversioned public shellを実装する。
- [x] Phase 3: camera、lighting、surface、environment density、hero／companionをConcept C方向へ改稿する。
- [x] Phase 4: R02 gameplay invariantsとR04固有testを通す。
- [x] Phase 5: 同一viewportのbrowser captureとdesign QAを反復し、P0／P1を解消し、残るP2を次版課題として明記する。
- [x] Phase 6: project docsを更新し、scope限定commit、push、GitHub Pages成功、公開URLを検証する。

## Key questions

1. R02の因果を一切分離せず、最も大きなvisual gainを出せるrenderer／asset差分は何か。
2. R04を新しいlive bundleとして公開しつつ、R02／R03を完全に保存するbuild構成は何か。
3. 静止画の美しさと実際のscroll／combat／loot／questを同じacceptance gateへどう統合するか。

## Decisions made

- R03はvisual benchmarkとして保存するが、R04 runtimeの土台にはしない。
- R04はR02の`PrototypeBState -> PrototypeBRenderer`境界を維持し、presentation層を大胆に更新する。
- 既存versionはすべて保持する。
- R04の三大置換点はcamera／Beauty Cell art compiler／realtime actor representationとする。
- R03は今回`public/r03/`へ自己完結snapshotとして凍結し、R04だけをlive Vite entryにする。
- runtimeへR03の完成画面plateやactor spriteを貼らず、R04は動的な3D sceneとして成立させる。
- companionは未加入から始まる世界設定を守り、R04公開版ではpreviewを無効にする。

## Errors encountered

- Workspace fallback `pnpm test` attempted an automatic modules purge and aborted because the command had no TTY (`ERR_PNPM_ABORTED_REMOVE_MODULES_DIR_NO_TTY`). No files were removed. Focused tests were run safely with the bundled Node executable and the existing Vitest entry instead; the final full check will use `CI=true` with the pinned pnpm runtime.
- 最初のpinned full checkはbundled Node／inner pnpmへのPATHが不足して失敗した。`fallback`とbundled Nodeを明示したPATHで再実行し、最終的に30 files／184 tests、strict TypeScript、production buildまで完走した。
- production previewの既存port 4173／4174が使用中だったため、R04最終確認は4175を使用した。これはcode defectではない。

## Status

**Complete** — commit `ab33dd8`をpushし、GitHub Pages run #13成功、公開catalog／R04／R01〜R03、主要assetのHTTPS 200、公開R04の依頼・武器・移動・手動大技、browser warning／error 0を確認した。Concept C完全再現とユーザーart acceptanceは次の別gateである。
