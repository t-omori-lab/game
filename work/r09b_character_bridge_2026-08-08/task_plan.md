# R09B Playable Character Bridge — Task Plan

## Goal

Character Forge F-01の承認済みcompiled surface packを、薄いadapter経由でR09の通常camera・world light・移動・装備・半自動戦闘へ接続する。actual gameplay証拠からmodule別pass／failを判定し、failed箇所だけをF-02へ修正して、同じruntime packをForgeとR09で使うlocal visual review candidateを作る。

## Scope guard

- R09AのWorld Memory、二site×二module、save／reloadを維持する。
- F-01／F-02固有IDをWorldMemoryStateへ入れない。
- gameplay runtimeでBeauty／Build Sheetのsampling、volume再構築、LLM推論を行わない。
- 現行actor fallbackを必ず残し、pack失敗時もR09A loopを完走できるようにする。
- Product Shell、Google SSO、cloud save、R10 buildcraft、public deploy、iPhone実機へは広げない。

## Phases

- [x] Phase 1: baseline、F-01 pack／rig／renderer契約、R09A回帰条件を監査
- [x] Phase 2: shared actor pack contractと現行actor fallbackをtest-firstで定義
- [x] Phase 3: F-01をR09の通常gameplayへ接続し、移動・装備・戦闘motionを同期
- [x] Phase 4: 1280×720／2560×1440 actual captureとmodule別pass／fail manifestを作成
- [x] Phase 5: failed moduleだけをF-02へ再構築し、Forge／R09で同じpackを使用
- [x] Phase 6: R09A回帰、loading／performance、browser、visual evidenceを検証
- [x] Phase 7: canonical docs、Workspace構成検査、限定local commit

## Key questions

1. F-01の9,454 surface cellsと7 semantic rig partsを、既存PrototypeBのauthoritative pose／socketへ最小変換で接続できるか。
2. 通常gameplay倍率でhair、face、jacket、arms、legs、pack、toolが別々に読めるか。
3. attack／skill専用motionやheld weapon socketの不足を、simulation authorityを変えずにどこまでF-02へ補えるか。
4. F-01 load失敗時に現行actorへ戻り、R09A四分岐とsaveを維持できるか。
5. character改善後もR09のfirst-controllable、frame p95、transferを許容範囲に保てるか。

## Decisions made

- 2026-08-08: `codex/r09-character-bridge`と`/tmp/fram-r09b`へ隔離し、mainの未追跡資料24件を変更しない。
- 2026-08-08: F-01をそのまま採択せず、まず同一gameplay条件へbridgeして不合格証拠を取る。F-02はその証拠に限定する。
- 2026-08-08: `PrototypeBRenderer`からF-01をstatic importしない。R09 entryだけがactor packをdynamic importし、rendererへfactory contractを渡す。これによりR06の配信bundleを維持する。
- 2026-08-08: `?actor=legacy`、load timeout、pack生成例外の三経路で現行R05 actorへ退避する。失敗理由はcanvas datasetへ検証可能な有限値だけを出す。
- 2026-08-08: F-01 raw height約5.34 world unitsはadapter scaleで既存gameplay身長へ合わせる。WorldMemoryStateやsimulation stateへasset IDを混入させない。
- 2026-08-08: actual captureからF-01のpassはsurface density、scale、hair silhouette、weapon socket、locomotion、fallback。F-02対象はface、torso/jacket、limb separation、backpack signal、combat-pose readabilityだけに限定する。
- 2026-08-08: F-02はF-01の9,454 cellsを保持し、failed 5 moduleへ706 cellsだけ追加する。ForgeとR09は同じasset ID／10,160 cellsを公開する。
- 2026-08-08: gameplayは既存のblob shadowで接地感を維持できるため、10,160-cell actorだけ詳細shadow passを省く。visible surface packとForgeのauthored shadowは維持する。
- 2026-08-08: 本goalは限定local commitまでとし、`main`統合やpublic deployを含めない。成果は`codex/r09-character-bridge`へ保持する。

## Errors encountered

- 2026-08-08: strict TypeScript rejected an unreachable `run` switch arm after the earlier locomotion return narrowed the union. Removed the unreachable arm; no behavior change.
- 2026-08-08: first actual capture exposed actor-scale inheritance on world-unit weapons: the tool became a giant black mass and occluded the body. The adapter now cancels the F-01 bridge scale for attached tools; a world-size regression assertion covers it.
- 2026-08-08: F-02 unit tests passed under Vitest, but strict TypeScript retained the literal patch union and could not see optional `groupName` on every member. Widened the immutable table to its declared `PatchDefinition` contract.
- 2026-08-08: first F-02 Forge browser pass rendered correctly but failed the zero-console gate on an implicit missing favicon request. Added the same project icon explicitly to the Forge document.
- 2026-08-08: first performance runはF-02の全InstancedMeshをshadow mapへ再描画し、frame p95 50.0 ms／long frames 17で不合格。gameplay actorの詳細shadow casterだけを無効化し、既存blob shadowへ集約すると34.2 ms／0へ回復した。
- 2026-08-08: completion auditでW/A/S/Dの実移動、simulation facing、renderer yawを同時に記録するgateを追加した。依頼板collisionを検査失敗と誤認した二試行を修正し、既知の通行可能な中央道路で4方向すべてを両解像度で合格させた。
- 2026-08-08: bundled pnpmの配置変更と既存node_modulesのstore metadata差によりpnpm wrapperが再installを要求した。依存を変更せず、固定済みvitest／TypeScript／Viteをbundled Nodeで直接実行した。
- 2026-08-08: standard postflightは隔離worktreeがWorkspace root外にあるため、project relative-path算出で停止した。内容を迂回せず、同じ三構成を正規projectのWorkspace audit 36/36、registry check current、隔離branch git status cleanとして個別実行し、すべて合格した。

## Status

**Complete locally** — R09B実装、実画面証拠、R09A回帰、性能回復、設計文書、限定branch commitまで完了。user visual review、`main`統合、public deployは別判断とする。
