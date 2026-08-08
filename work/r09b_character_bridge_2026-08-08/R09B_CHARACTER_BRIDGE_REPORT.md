# R09B Playable Character Bridge — Report

Status: **LOCAL IMPLEMENTATION COMPLETE / USER VISUAL REVIEW PENDING**

F-01のcompiled surface packをR09の実ゲームへ接続し、実画面で不合格だった5項目だけをF-02へ補正した。R09Aのゲームロジックと保存形式を変えず、ForgeとR09が同じF-02 runtime assetを使用する状態まで完了した。

本報告はローカル実装・自動検証・作者側の画面確認を記録する。公開デプロイ、iPhone 16 Pro、商業品質到達、ユーザーによる造形承認は別の合格条件である。

## 1. Outcome

- F-01の37,990 source voxels／9,454 visible cells／7 semantic rig parts／9 materialsを再構築せず利用した。
- F-02はF-01の合格部を固定し、face、torso/jacket、limbs、backpack、combat poseへ706 visible cellsだけを追加した。
- 最終candidateは`fram.character.f02.gameplay-readability-v1`、合計10,160 visible cells。
- R09の通常camera、world light、WASD、4方向向き、装備切替、手動大技、自動通常攻撃で動作する。
- Character ForgeのF-02表示とR09 runtimeは、同じasset ID・cell count・readability modulesを使う。
- 旧R05 actor fallback、R09Aの2 site × 2 module、二周目差分、reload、retreatを維持した。

## 2. Runtime architecture

```text
R09 entry
  ├─ load local WorldMemoryState
  └─ bounded dynamic import of F-02 runtime pack
       ├─ success → PrototypeBHeroAssetRuntime factory
       └─ disabled / timeout / import or factory failure → built-in R05 actor

PrototypeBRenderer
  └─ consumes the runtime factory contract only
       ├─ simulation authority remains PrototypeB/R09A
       ├─ adapter maps full movement/combat poses
       └─ adapter owns authored-unit scale and weapon socket conversion
```

R06の共有rendererはF-01／F-02をstatic importしない。ビルド上もR09専用のdynamic chunkとして分離され、R06 entry chunkは1.49 kBのままである。asset IDは表示・検証用であり、`WorldMemoryState`やsave schemaには入れていない。

## 3. Evidence-driven F-02

F-01の判定は`F01_GAMEPLAY_MODULE_MANIFEST.json`、F-02の結果は`F02_GAMEPLAY_MODULE_MANIFEST.json`を正本とする。

| Module | F-01 | F-02 change | Final local status |
|---|---|---|---|
| Surface density / scale / hair | Pass | No replacement | Preserved |
| Face readability | Fail | Skin plane, large teal eyes, highlights, fringe, mouth, blush | Pass for local review |
| Torso / jacket | Fail | Dark inner suit, asymmetric coat, collar, belt, chest signal | Pass for local review |
| Limb silhouette | Conditional fail | Gloves, cuffs, neutral arm separation | Pass for local review |
| Backpack signal | Fail | Archive shell, cyan screen, coral rail | Pass for local review |
| Weapon socket / locomotion | Pass after bridge fix | No asset redesign | Preserved |
| Combat pose | Fail | Stronger windup/hit/skill separation and pulsing signal | Pass for local review |
| Runtime fallback | Pass | No change | Preserved |

「pass for local review」は、自動契約と実キャプチャ上でF-01の失敗理由が解消されたという意味である。可愛さ、Concept Cとの一致、商業品質についての最終判断はユーザー確認を待つ。

## 4. Verification

### Code and production build

- Full Vitest: **43 files / 231 tests passed**
- Strict TypeScript: **passed**
- Vite production build: **passed**
- Pre-existing warning: `startGame` and shared rendering chunks remain above Vite's 500 kB advisory threshold。

### Actual gameplay

- 1280×720 and 2560×1440: F-02 runtime loaded, 10,160 cells, W/A/S/Dの移動・simulation facing・rendered yaw 4方向一致、manual skill ≥1、auto-basic ≥1、console/page errors 0。
- Forge F-02: same asset ID and cell count, FIELD actor height 17.2%, back view captured, console/page errors 0。
- `?actor=legacy`: built-in R05 actor starts without browser errors。

### R09A regression

- `canopy-relay × pathfinder-array`: passed
- `canopy-relay × relic-overdrive`: passed
- `flooded-archive × pathfinder-array`: passed
- `flooded-archive × relic-overdrive`: passed
- Second-expedition module effect, reload source/save count, retreat: passed

### Performance gate

Local desktop Chrome、1280×720、production preview、各route 3 runsのmedian。

| Metric | R06 | R09B | Ratio | Gate |
|---|---:|---:|---:|---|
| First controllable | 979.2 ms | 940.5 ms | 0.960 | Pass |
| Same-origin transfer | 789,846 B | 832,495 B | 1.054 | Pass |
| Frame p95 | 33.8 ms | 35.0 ms | 1.036 | Pass |
| >50 ms frames | 0 | 0 | — | Pass |

最初の実装は詳細ボクセルをshadow mapにも再描画したためp95 50.0 msで不合格だった。visible surface packを減らさず、gameplayだけ既存blob shadowへ集約し、最終計測で35.0 msまで回復した。Forgeのauthored shadowは維持している。

### Workspace closure

- Canonical Workspace audit: **36/36 passed**
- Generated project registry check: **current**
- Isolated branch status: **clean; staged 0 / worktree 0 / untracked 0 / conflicts 0**
- Standard postflight wrapperはWorkspace外のGit worktreeをproject relative pathへ変換できないため、内容検査前に停止した。同じ三構成を個別実行した結果を上記に記録する。

## 5. Preserved evidence

`evidence/`には、F-01／F-02比較、F-02 skill、Forge back／FIELD、browser contract、R09A regression、performance reportを保存した。全raw captureはコミット対象にせず、判断に必要な最小証拠だけを残す。

## 6. Known limits and next decision

- F-02は「完成キャラクター」ではなく、画像生成→compiled voxel pack→runtime adapter→actual-play evidenceというAI-native production loopの最初の成立例である。
- 顔・衣装・身体比率はF-01へのadditive correctionであり、将来のproduction character generatorではbuild sheetからより良いvolume/meshを再生成する余地がある。
- PC local headless Chromeの相対性能は合格したが、実機GPU、iPhone 16 Pro、thermal、長時間playは未検証。
- Product Shell、Google SSO、cloud save、R10 buildcraft、engine comparison、public deployはこのsliceに含めない。
- 次の判断は、ユーザーがR09Bのactual gameplayを確認し、F-02を暫定actorとして採択するか、F-03造形補正をもう一度行うかである。
