# Next Tasks: ゲーム開発

Last updated: 2026-08-09

## 結論

**Goal 0、R09A `First Memory Logic Proof`、R09Bのtechnical bridgeは完了し、公開Forgeと同じF-01 compiled packをR09の既定actorへ復帰してgameplay-distance補正まで公開した。** 正本packを変えず、破片に見える33個の分離cellと過大な黒いcell gapをversioned表示profileで補正し、同じprofileを読むpack audit／実画面capture／project-local skillも固定した。F-02とF-01Rはbridge／再構築の比較証拠として保持するが、F-01の代替正本にはしない。次は公開版の造形判断を受け、正本を保持したversioned derivative改善loopへ進む。

catalog先頭の「01」カードはR09 thumbnail欠落をlocal修正済みで、全releaseの画像存在検査も追加した。次の外部操作は、この二ファイルと記録だけを公開へ反映し、GitHub Pages上でもR09画像の200応答と可視表示を確認することである。

F-01Rはsemantic sourceから別の9,065-cell packを生成できる技術証拠だが、公開F-01の頭部を忠実に移植する方法ではなかった。既に存在する3D正本は再生成せず、Forgeとgameが同じfactory／payload digestを読む。改善時だけF-01を凍結したまま新しいsource versionを作り、同一camera比較で採否する。

```text
Goal 0 Safe Baseline ✓
└─ current R06 browser／performance gate + documentation reconciliation

R09 First Memory Expedition
├─ A. First Memory Loop ✓
├─ B. F-01 bridge → F-02 technical evidence ✓ art rejected
├─ B2. F-01R semantic head cell ✓ technical evidence／fidelity rejected
├─ B3. exact F-01 pack restored as R09 default ✓
├─ B4. gameplay-distance seam／ground-debris cleanup ✓ published
└─ C. F-01-preserving versioned correction loop ← user review後

→ R10 Relic Buildcraft
→ 20〜30分 Golden Vertical Slice
→ Engine Decision Gate
→ R11 First Companion
→ R12 Causal World Cell
```

## P0 — Catalog 01 thumbnail

- [x] 公開R09の実gameplay captureから720×405の`public/catalog/r09.jpg`を作る。
- [x] release一覧へ追加した全RXXに対応thumbnailが存在することを回帰testにする。
- [x] production buildとlocal 4177の実browserでR09画像の可視表示を確認する。
- [ ] 明示承認後にscope限定commitをpushし、GitHub Pagesの`/game/`で01カードと画像応答を確認する。

## Completed — Goal 0: Safe Baseline

- [x] current branch、基準SHA、staged／modified／untrackedとpublic mainとの差を記録する。
- [x] 現行R06のbrowser gateを旧Phaser smokeから分離する。
  - production previewでcold／warm first-controllable、frame-time p95、50ms超long frame、visible input response、consoleを同条件で記録する。
  - machine、browser、viewport、build SHAをmachine-readable resultへ残す。
  - desktop browserの結果をiPhone 16 Pro実機合格として扱わない。
- [x] README、ARCHITECTURE、PROJECT_CONTEXT、NEXT_TASKS、LEARNINGSを2026-08-08 briefへ整合する。
- [x] strict TypeScript、Vitest、production build、R06 browser gate、project postflightへ合格し、R09Aへbaselineを渡す。

Baseline code SHAは`1c9d355`。canonical main runはcold／warm first-controllable 1,448.3／988.9 ms、frame p95 18.6／18.6 ms、50ms超1／0、same-origin route transfer 779,580／5,912 bytes、page console／page error 0だった。詳細は`work/goal0_safe_baseline_2026-08-08/GOAL0_SAFE_BASELINE_REPORT.md`と`work/goal0_r06_baseline/REPORT.md`を参照する。

## P0 — Active milestone: R09

### A. First Memory Loop

- [x] `WorldEvent → pure reducer → WorldMemoryState v1 → versioned save`を定義する。
  - `site discovered`、`item recovered`、`base claimed`、`module installed`、`expedition ended(reason)`を最低eventにする。
  - 現在遠征の`PrototypeBState`と永続world memoryを分離する。
  - 既存`SaveRepository`をR09専用namespaceで使い、R06／`WorldLegacy`を自動importせず、旧saveを保持する。
  - 厳格v1 codec、reload、deterministic fallback、将来migrationの接続点を先にtestできる形にする。

- [x] R06由来の小mapへ、性質の異なる二siteを同時配置する。
  - 移動で行き先を選び、途中変更と撤退も正規結果にする。
  - 一本道の最後にmodal三択を出す構造にはしない。

- [x] 一方のsiteを拠点として確保し、二moduleから一つを設置できるようにする。
  - 一つは情報／route、もう一つは遺物／loadoutへ影響させる。
  - module設置には回収物IDを一つ消費し、入手／使用履歴をworld memoryへ残す。
  - 初版は完全自由建築ではなく、候補地とmoduleの選択で検証する。

- [x] 二回目の遠征へ因果を返す。
  - 二moduleの各々が、開始90秒以内に固有の見た目一件＋互いに異なるgameplay一件を示す。
  - 選ばなかったsiteはworldに残し、後続目的になり得るようにする。

- [x] 分岐と撤退をhard gateにする。
  - `二site × 二module`の四組合せをclean saveから完走し、それぞれreloadするtable testを作る。
  - 撤退は発見済みsiteと持ち帰った回収物を保持し、base claim／module installは成立させず、現在遠征のHP／敵／位置を破棄する。
  - 両site routeでrange-based auto-basic、手動大技event、cooldownのbrowser regressionを通す。

### B. Playable Character Bridge

- [x] F-01を凍結し、薄いactor adapterで同じR09 sceneへ接続する。
  - 通常camera、world light、wet surface、移動、combat、装備で評価する。
  - 1280×720／2560×1440、actor高14〜17%、既存idle／run／hitを記録する。
  - 未実装のattack／skill専用motionはF-02の不合格証拠とし、F-01 bridgeの前提にはしない。

- [x] 実gameplay captureからF-02の技術的な修正範囲を決める。
  - module、socket、motionごとのpass／fail manifestを作る。
  - hair、face、torso／jacket、arms、legs、pack、toolのうちfailed moduleだけを独立sourceへ再構築する。
  - head、hand、back、weapon、utility、effect socketとmotionは、実clip／missingの項目だけを修正する。
  - F-02はcode内の固定cell patchだったため、この条件はart pipelineとして不合格。比較証拠として凍結し、F-01Rでsource dataへ戻す。
  - attack timing、damage、cooldownのauthorityはsimulation側から動かさない。

- [x] 同じF-02 runtime packをForgeとR09で使う。
  - gameplay routeではBeauty／Build Sheet、画像sampling、volume再構築、LLM推論をload／実行しない。
  - ForgeとR09で同一人物、同一palette、同一装備として読めることを確認する。

- [x] F-01Rの頭・顔・髪をsource-faithful moduleとして再構築する。
  - Beauty Sheetをart authority、Build Sheetをmachine-facing referenceとして分離する。
  - 頭蓋、顔面、hair shell、前髪、左右横髪、目、口、blush、clip、collarをversion付きsource dataにする。
  - schema v2 packへmodule index、source digest、payload digestを保存し、runtime TypeScript geometry patchを使わない。
  - ForgeとR09が同じfactory／packを読み、ID、digest、cell数、module数が一致することを確認する。

- [ ] F-01Rを全身moduleと編集loopへ拡張する。
  - torso／jacket、arms／gloves、legs／boots、backpack、coral textile、toolをBuild Sheet下段の独立moduleへする。
  - 現在agent-authoredのlandmark／parameterを、Build Sheet module画像のmask／depth／order抽出へ接続し、画像入力からsource dataを半自動生成できるようにする。
  - Beauty→Build→source correction→compile→Forge／R09→same-view comparisonを一操作単位で再実行できるようにする。
  - module別mask／depth／order／bone／socketと、human accept／revise履歴をasset contractへ加える。

- [ ] 通常倍率でvisual gateを通す。
  - hair silhouette、face window、jacket、脚、pack、coral textile、tool、向きが分離して読める。
  - 四方向と必須motionで、主要形状の矛盾、関節分離、目立つ装備貫通がない。
  - userが「可愛い成人女性型のSF探索者」として採択できる。

### C. R09 guards

- root catalogはService Workerによるnavigation介入を持たない。R09のroute-scoped workerはcatalog scopeへ広げず、cacheするHTMLとhash付きassetを同じrelease manifestで固定する。
- R06の公開performance baselineは、static boot shell、route専用static entry、主要game chunkのmodulepreload、地面画像の初期preload除外を持つ。R09の比較では、この起動順と空白なしのfirst paintも回帰対象にする。
- [x] 現行actorのままAのlogic proofを完了できるようにし、F-02待ちで停止させない。
- [x] F-01 pack／adapterの失敗、timeout、disable flag時は現行actorへfallbackし、First Memory Loop、save、reloadを完走する。WorldMemoryState／save schemaにはF-01／F-02固有IDを入れない。
- [x] R06とR09を同じproduction previewで測り、transfer、first-controllable、frame-time p95、50ms超long frameを記録する。
- [x] R09をR06比10%以上悪化させない。悪化時はroute-specific import／asset分離を先に直す。
- [ ] `/game/` first view 150 KB以下、scroll前archive画像0 byteを維持する。
- [ ] PC masterを先にart採択し、同じsemantic sourceからmobile LODを派生する。
- [x] local test、local browser、public deploy、iPhone実機、user acceptanceを別々に記録する。

### D. Product Foundation（R09Aを止めずに段階導入）

- [ ] 実load phaseを持つProduct Shellを作る。
  - `Boot → Loading → Title → Google sign-in → Profile setup → Continue／New expedition → Game`を明示stateにする。
  - loadingは`account → save → core data → visual pack → playable`の完了phaseを表示し、error／retry／offline／fallbackを正規stateにする。

- [ ] title、player name、statusをlocal dataで先に成立させる。
  - titleはContinue、New Expedition、Account、Settingsを持つ。
  - Google表示名、game内player name、character identityを分離する。
  - statusはidentity、HP／resource、装備、遺物、derived stat、状態、module効果を表示する。

- [ ] R09AのWorldMemoryState v1固定後に、closed playtest用Google sign-inとCloud Test Saveを接続する。
  - provider／backendはFirebase、Supabase等をGitHub Pages／PWA、Steam、offline、料金、export、lock-inで比較するADRを先に作る。
  - local saveを即時authorityとし、cloudはsafe pointのsnapshot、backup、復旧、別browser／別端末継続に限定する。
  - revision／checksum／build／schema versionを持ち、非互換saveはarchiveして説明後にnew gameへ進める。無言上書きはしない。
  - 複雑merge、完全な双方向sync、offline queue、provider間account linkは初期scopeに含めない。

- [ ] rendering qualityの計測と手動profileを先に作る。
  - PC Ultraをart正本にし、PC High、Mobile High、Mobile Safeを同じasset sourceから派生する。
  - playerはquality、resolution scale、shadow、DOF、effectを上書きできる。
  - first-controllable、gameplay frame-time p95、long frame、input latencyを記録する。
  - auto selectionはtarget deviceの実測後に追加し、hysteresis／cooldownで頻繁な切替を防ぐ。

- [ ] Game Core、Game Web、Player Service、Dev Studioの責務境界を固定する。
  - Dev Studio／生成用referenceをpublic game bundleへ入れない。
  - provider SDK型をGame Coreへ漏らさず、最初はfolder／entry／build分離から始める。
  - 実行taskはmemory loop、product shell、account save、runtime quality、engine evaluationのchat／`codex/*` branchへ分ける。branch作成は各task開始時に行う。

- [ ] Engine Decision Gateに備えてportable contractを維持する。
  - R09A直後の全面移行は行わず、R09＋最小Product Shell＋R10代表buildが同じsliceへ載るまで比較を開始しない。
  - auth、database、physics、animation、navigation、compression等の成熟技術は、独自実装をdefaultにしない。

## Completion checkpoints

### R09A: First Memory Logic Proof Done ✓

- F-01／F-02なしで、四分岐、回収物消費、撤退、save／reloadを完走できる。
- 二moduleの各々が、二回目開始90秒以内に固有の見た目一件＋異なるgameplay一件を生む。
- R06の移動、collision、mini-map、marker、auto-basic、manual skillを後退させない。

Local evidenceは`work/r09a_first_memory_logic_2026-08-08/`にある。desktop Chromeで四分岐＋撤退、reload、console／page error 0、R06比10%以内の性能gateを確認した。public deploy、iPhone実機、user acceptanceは未実施である。

### R09B: Visual Review Candidate Ready

- F-01 actual-gameplay manifestと、failed項目だけを直したF-02 runtime packがある。
- 同じF-02正本がForgeとR09で動き、PC masterの通常gameplay倍率でuser reviewできる。
- loading regression、desktop browser、現行actor fallbackを通す。
- これはcommercial-quality達成、iPhone実機合格、public deploy完了を自動的には意味しない。

F-02はtechnical candidateとして上記を満たしたが、ユーザーvisual reviewでart successorとして不採択。現在のvisual review candidateはF-01Rであり、`work/f01r_fidelity_reconstruction_2026-08-08/`を参照する。

### R09C: Product Foundation Candidate Ready

- blankなしのloading、title、初回name設定、Continue、status、settingsが実runtime stateへ接続される。
- Google sign-in後にplayer profileとworld saveを復旧でき、offline時はlocal saveでplayを継続できる。
- 手動quality profileがPC masterのidentity／telegraphを保ち、input latencyとframe pacingを計測できる。auto selectionは完成条件に含めない。
- Game Core、Game Web、Player Service、Dev Studioの依存方向をtest／buildで検査できる。
- これはbackend providerの永久固定、全端末性能合格、engine移行決定を意味しない。

## P1 — R09後

### R10: Relic Buildcraft

- [ ] 射程、周期、移動拘束、target条件、resource、大技成立条件が異なる二buildを作る。
- [ ] loot比較、装備、分解、強化を一遠征へ接続する。
- [ ] itemの作用原理、性能budget、合成可否、flavor textを同じschemaから生成する。
- [ ] 名付き敵は静止／manual skillなしで安定勝利できないことをhard gateにする。

### Golden Vertical Slice / Engine Decision Gate

- [ ] R09、最小Product Shell、R10代表buildを20〜30分の同一sliceへ結合する。
- [ ] 現行Three.js＋desktop wrapper、最有力engine候補一つ、必要ならhybridを同じasset／操作／測定条件でtime-box比較する。
- [ ] Concept C、input、frame pacing、browser反復、AI編集性、save、controller、iPhone／Steam、license／保守costからstay／hybrid／migrationをADR化する。

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
- Local trial／匿名auth、複雑なcloud merge、完全な双方向sync。
- target deviceの実測前にauto qualityをblack box化すること。
- R09＋最小Product Shell＋R10代表buildより前のengine全面移行。
- Steam包装、課金、App Store申請。
- catalog改装を再び主作業にすること。

## Exact restart point

1. 公開R09のcanonical 9,454-cell pack／9,421-cell gameplay表示をuser確認し、足元の分離cell除外と黒いgrid低減を造形面で採否する。
2. 採択時はcell fill／bevel／shadowのgameplay-distance profileを固定し、camera、light、world scale、animation adapterによる差と、F-01 geometry自体の不足を分離する。
3. F-01正本は凍結し、採択された頭・顔・髪を失わないversioned derivativeでmodule単位のsource correctionを行う。F-01／F-02／F-01R evidenceは上書きしない。
4. derivativeの同一digest、四方向、必須motion、装備、R09A回帰、R06比performanceを再実行する。
5. character generation loopが成立後、最小Product ShellとR10最初の二〜三buildを同じR09 sceneへ接続する。

詳細な判断理由と合格条件は、`work/next_direction_2026-08-03/NEXT_DIRECTION.md`を参照する。

Product Foundationの採用範囲と2026-08-08の優先順は、本ファイルのD節と`docs/ARCHITECTURE.md`を再開時の正本とする。元の検討資料はlocal work artifactとして保持するが、R09A taskの入力契約にはしない。

## Recently completed

- [x] F-01 gameplay-distance surface cleanup／再現pipeline — canonical 9,454-cell pack／digestを維持し、R09表示だけ33 detached ground cellsを除外。cell gap／bevel／detail shadowを通常画角用に調整し、versioned profile、pack audit、固定camera capture、project-local skillへ固定。9,421 cells、console／page error 0、238 tests／build合格を確認 — 2026-08-09
- [x] 公開Character Forge F-01の9,454-cell packをR09既定actorへ無加工で復帰。F-01Rは`?actor=f01r`へ分離し、asset ID／payload digest／cell数をproduction Chromeで確認 — 2026-08-08
- [x] F-01R Source-faithful Reconstruction Cell — semantic head／face／hair source、schema v2 module pack（9,065 cells／20 modules）、Forge／R09 shared digest、same-view comparison、R09移動／大技browser check — 2026-08-08
- [x] R09B Playable Character Bridge — F-01 gameplay adapter、evidence-driven F-02（10,160 cells）、Forge／R09 shared runtime、旧actor fallback、R09A回帰、R06比performance gate — 2026-08-08
- [x] R09A First Memory Logic Proof — WorldMemoryState v1、二site×二module、回収物消費、撤退、二回目差分、R09専用local save／reload、四分岐browser gate、R06比性能gate — 2026-08-08
- [x] Goal 0 Safe Baseline — current R06 E2E／performance gate、Playwright固定、canonical docs整合、main統合、local postflight — 2026-08-08
- [x] F.R.A.M. game-first catalog、軽量first view、archive image hard gate、Character Forge FIELDをGitHub Pagesへ公開確認 — 2026-08-03
- [x] Character Forge F-01のBeauty Sheet → Build Sheet → 37,990 source voxels → 9,454 surface cells → 7-part rig pipelineを公開確認。ユーザー暫定評価約70% — 2026-08-02
- [x] R06 Sharp NavigationをR01〜R05保持のまま公開し、mini-map、marker、操作guide、半自動通常攻撃、手動大技を確認 — 2026-08-02
