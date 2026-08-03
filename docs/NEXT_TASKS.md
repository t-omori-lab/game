# Next Tasks: ゲーム開発

Last updated: 2026-08-03

## 結論

次は **R09 `First Memory Expedition / 最初の記憶遠征`**を作る。

主product gateは、一回目のsite／回収物／拠点／module選択が二回目の見た目と遊びを変える**First Memory Loop**。同じR09 sceneへF-01を接続し、通常gameplay条件で露呈した問題だけをF-02へ直す。character改善とworld-memory実装を別demoにしない。

```text
R09 First Memory Expedition
├─ A. First Memory Loop（最初にlogic proof）
├─ B. F-01 bridge → evidence-driven F-02
└─ C. loading／PC master／mobile tier guards

→ R10 Relic Buildcraft
→ R11 First Companion
→ R12 Causal World Cell
```

## P0 — Active milestone: R09

### A. First Memory Loop

- [ ] `WorldEvent → pure reducer → WorldMemoryState v1 → versioned save`を定義する。
  - `site discovered`、`item recovered`、`base claimed`、`module installed`、`expedition ended(reason)`を最低eventにする。
  - 現在遠征の`PrototypeBState`と永続world memoryを分離する。
  - 既存`SaveRepository`をR09専用namespaceで使い、R06／`WorldLegacy`を自動importせず、旧saveを保持する。
  - 厳格v1 codec、reload、deterministic fallback、将来migrationの接続点を先にtestできる形にする。

- [ ] R06由来の小mapへ、性質の異なる二siteを同時配置する。
  - 移動で行き先を選び、途中変更と撤退も正規結果にする。
  - 一本道の最後にmodal三択を出す構造にはしない。

- [ ] 一方のsiteを拠点として確保し、二moduleから一つを設置できるようにする。
  - 一つは情報／route、もう一つは遺物／loadoutへ影響させる。
  - module設置には回収物IDを一つ消費し、入手／使用履歴をworld memoryへ残す。
  - 初版は完全自由建築ではなく、候補地とmoduleの選択で検証する。

- [ ] 二回目の遠征へ因果を返す。
  - 二moduleの各々が、開始90秒以内に固有の見た目一件＋互いに異なるgameplay一件を示す。
  - 選ばなかったsiteはworldに残し、後続目的になり得るようにする。

- [ ] 分岐と撤退をhard gateにする。
  - `二site × 二module`の四組合せをclean saveから完走し、それぞれreloadするtable testを作る。
  - 撤退は発見済みsiteと持ち帰った回収物を保持し、base claim／module installは成立させず、現在遠征のHP／敵／位置を破棄する。
  - 両site routeでrange-based auto-basic、手動大技event、cooldownのbrowser regressionを通す。

### B. Playable Character Bridge

- [ ] F-01を凍結し、薄いactor adapterで同じR09 sceneへ接続する。
  - 通常camera、world light、wet surface、移動、combat、装備で評価する。
  - 1280×720／2560×1440、actor高14〜17%、既存idle／run／hitを記録する。
  - 未実装のattack／skill専用motionはF-02の不合格証拠とし、F-01 bridgeの前提にはしない。

- [ ] 実gameplay captureからF-02の修正範囲を決める。
  - module、socket、motionごとのpass／fail manifestを作る。
  - hair、face、torso／jacket、arms、legs、pack、toolのうちfailed moduleだけを独立sourceへ再構築する。
  - head、hand、back、weapon、utility、effect socketとmotionは、実clip／missingの項目だけを修正する。
  - code内の場当たり的な箱追加ではなく、再生成可能なsource／mask／deltaへ残す。
  - attack timing、damage、cooldownのauthorityはsimulation側から動かさない。

- [ ] 同じF-02 runtime packをForgeとR09で使う。
  - gameplay routeではBeauty／Build Sheet、画像sampling、volume再構築、LLM推論をload／実行しない。
  - ForgeとR09で同一人物、同一palette、同一装備として読めることを確認する。

- [ ] 通常倍率でvisual gateを通す。
  - hair silhouette、face window、jacket、脚、pack、coral textile、tool、向きが分離して読める。
  - 四方向と必須motionで、主要形状の矛盾、関節分離、目立つ装備貫通がない。
  - userが「可愛い成人女性型のSF探索者」として採択できる。

### C. R09 guards

- root catalogはService Workerによるnavigation介入を持たない。R09のroute-scoped workerはcatalog scopeへ広げず、cacheするHTMLとhash付きassetを同じrelease manifestで固定する。
- R06の公開performance baselineは、static boot shell、route専用static entry、主要game chunkのmodulepreload、地面画像の初期preload除外を持つ。R09の比較では、この起動順と空白なしのfirst paintも回帰対象にする。
- [ ] 現行actorのままAのlogic proofを完了できるようにし、F-02待ちで停止させない。
- [ ] F-01 pack／adapterの失敗、timeout、disable flag時は現行actorへfallbackし、First Memory Loop、save、reloadを完走する。WorldMemoryState／save schemaにはF-01／F-02固有IDを入れない。
- [ ] R06とR09のcold startを同条件で測り、transfer、first-controllable、long taskを記録する。
- [ ] R09をR06比10%以上悪化させない。悪化時はroute-specific import／asset分離を先に直す。
- [ ] `/game/` first view 150 KB以下、scroll前archive画像0 byteを維持する。
- [ ] PC masterを先にart採択し、同じsemantic sourceからmobile LODを派生する。
- [ ] local test、local browser、public deploy、iPhone実機、user acceptanceを別々に記録する。

## Completion checkpoints

### R09A: First Memory Logic Proof Done

- F-01／F-02なしで、四分岐、回収物消費、撤退、save／reloadを完走できる。
- 二moduleの各々が、二回目開始90秒以内に固有の見た目一件＋異なるgameplay一件を生む。
- R06の移動、collision、mini-map、marker、auto-basic、manual skillを後退させない。

### R09B: Visual Review Candidate Ready

- F-01 actual-gameplay manifestと、failed項目だけを直したF-02 runtime packがある。
- 同じF-02正本がForgeとR09で動き、PC masterの通常gameplay倍率でuser reviewできる。
- loading regression、desktop browser、現行actor fallbackを通す。
- これはcommercial-quality達成、iPhone実機合格、public deploy完了を自動的には意味しない。

## P1 — R09後

### R10: Relic Buildcraft

- [ ] 射程、周期、移動拘束、target条件、resource、大技成立条件が異なる二buildを作る。
- [ ] loot比較、装備、分解、強化を一遠征へ接続する。
- [ ] itemの作用原理、性能budget、合成可否、flavor textを同じschemaから生成する。
- [ ] 名付き敵は静止／manual skillなしで安定勝利できないことをhard gateにする。

### R11: First Companion

- [ ] world内で一体を発見し、加入するかを選べる短いloopを作る。
- [ ] 遺物解析または使用回数制の大技でplayer buildを変える。
- [ ] 固定相棒にせず、将来の人／robot／犬／猫／動物型robot rosterへ接続する。

### R12: Causal World Cell

- [ ] 旧用途、自然侵食、現在資源、actor need、衝突、複数対処、reward、world mutationを因果graphから生成する。
- [ ] 主人公、同行者、敵、遺物、拠点、光、material、弱いdepth-aware softness、音をConcept Cの一sceneへ統合する。
- [ ] PC Ultra actual gameplay captureを採択後、同じassetからmobile tierを派生する。

## 今はしない

- close-upだけで完結するStandalone F-02。
- 都市、建物、monster、itemの大量生成。
- 全character creator、全種族、全同行者roster。
- runtime LLM、都度scenario／map生成。
- 巨大seamless world、全NPC生活simulation、自由建築system。
- WebGPU／HDR移行そのものを目的にすること。
- Steam包装、課金、App Store申請。
- catalog改装を再び主作業にすること。

## Exact restart point

1. `src/prototypeB/sim/types.ts`／`simulation.ts`のquest／return stateを、一遠征のauthorityとして監査する。
2. `src/prototypeB/worldMemory/`へ`WorldMemoryState v1`、event、pure reducer、codecを作る。codecは`src/session/worldLegacy.ts`の厳格decode方式を踏襲し、`src/platform/saveRepository.ts`へR09専用namespaceで接続する。
3. `src/prototypeB/app/startPrototypeB.ts`で、現行actorのまま二site → 回収 → 拠点確保 → module設置 → save → 二回目差分を先に通す。
4. 四分岐、回収物消費、撤退、両routeのcombatをheadless／browserで固定する。
5. `src/characterForge/F01Character.ts`とcompiled surface packを薄いadapter経由で`src/prototypeB/render/PrototypeBRenderer.ts`へ接続し、F-02修正用のpass／fail manifestを取る。

詳細な判断理由と合格条件は、`work/next_direction_2026-08-03/NEXT_DIRECTION.md`を参照する。

## Recently completed

- [x] F.R.A.M. game-first catalog、軽量first view、archive image hard gate、Character Forge FIELDをGitHub Pagesへ公開確認 — 2026-08-03
- [x] Character Forge F-01のBeauty Sheet → Build Sheet → 37,990 source voxels → 9,454 surface cells → 7-part rig pipelineを公開確認。ユーザー暫定評価約70% — 2026-08-02
- [x] R06 Sharp NavigationをR01〜R05保持のまま公開し、mini-map、marker、操作guide、半自動通常攻撃、手動大技を確認 — 2026-08-02
