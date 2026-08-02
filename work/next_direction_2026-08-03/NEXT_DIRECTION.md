# F.R.A.M. 次期開発方針

Status: approved planning baseline for the next implementation slice.

## 結論

次の主milestoneは、**R09 `First Memory Expedition / 最初の記憶遠征`**とする。

F-01で、生成画像を再現可能な3D actorへ変換できることは約70%の水準で証明できた。R06では、scrollするworld、半自動通常攻撃、手動大技、敵、loot、HUDまで動いている。一方で、現在は一回の遠征が次の遠征を変えないため、まだF.R.A.M.固有の「世界の記憶」がgame loopになっていない。

R09では、次の二つを**同じplayable scene**で進める。

1. **First Memory Loop** — 二つの目的地、遺物回収、拠点選択、module設置、保存、二回目の変化をつなぐ。
2. **Playable Character Bridge** — F-01を実gameplayへ接続し、その証拠からF-02を必要箇所だけ再構築する。

First Memory Loopのlogic proofはcharacter改善で止めない。F-02はStandalone Forgeとして先に作らず、R09の通常camera、移動、戦闘、光、装備で見つかった問題を直す。これにより、gameplayとvisualのどちらも「後で統合する別demo」にしない。

```text
R09 First Memory Expedition
├─ A. First Memory Loop（主product gate）
├─ B. F-01 bridge → evidence-driven F-02（visual gate）
└─ C. loading／PC master／mobile tier（release guard）

→ R10 Relic Buildcraft
→ R11 First Companion
→ R12 Causal World Cell
```

## R09のplayer experience

一回目の遠征:

1. 同じ小mapに、性質の異なる二つの目的地／拠点候補が同時に存在する。
2. playerは移動によって行き先を決め、途中変更または撤退もできる。
3. 半自動通常攻撃と手動大技で危険を越え、moduleの材料になる遺物または資源を回収する。
4. 一方のsiteを拠点として確保し、回収物を消費して性質の異なる二moduleから一つを設置する。
5. 遠征結果をversion付きworld stateへ保存する。

二回目の遠征:

- 開始90秒以内に、選んだsite／moduleによる**見た目の変化一件**と**遊びの変化一件**が分かる。
- 選ばなかったsiteは消えず、後続の目的としてworldに残る。
- 変化の理由を「前回これを選んだから、今回はこうなった」と一文で説明できる。

初版moduleは、正確な名称や設定よりmechanic差を先に固定する。

- 情報／route系: 次回の目的、危険、近道のいずれかを変える。
- 遺物／loadout系: 次回の装備、回復、skill resourceのいずれかを変える。

## Workstream A — First Memory Loop（最初に着手）

### 実装

1. `WorldEvent → pure reducer → WorldMemoryState v1 → versioned save`を、現在遠征の`PrototypeBState`から独立させる。
2. 最低限、`site discovered`、`item recovered`、`base claimed`、`module installed`、`expedition ended(reason)`をeventとして記録する。
3. R06由来の小mapへ、同時に選べる二siteと途中撤退を置く。
4. 拠点確保と二moduleの選択を、長いmenuではなく移動／短いinteractionで完了できるようにする。設置時は回収物IDを消費し、入手と使用の履歴をworld memoryへ残す。
5. 既存`SaveRepository`の二slot／checksum方式を新namespaceで使い、旧saveを上書きせず、reloadと二回目の遠征で同じ結果と差分を再現する。
6. 撤退時は`expedition ended(reason: retreat)`を記録し、発見済みsiteと持ち帰った回収物は保持する一方、拠点を自動確保せず、現在遠征のHP、敵、位置を破棄する。
7. AI textが失敗しても、deterministicな名称、説明、進行で完走できるようにする。

### 合格条件

- 二siteが最初から同時に選択可能で、一本道の最後の三択になっていない。
- 一方を選んでも、途中変更と撤退が正規結果として成立する。
- 回収物なしではmoduleを設置できず、設置後は回収物が消費済みになり、入手／使用履歴はreload後も検証できる。
- `二site × 二module`の四組合せをclean saveから完走・reloadできる。
- 二moduleはそれぞれ、二回目開始90秒以内に固有の見た目一件＋互いに異なるgameplay一件を生む。
- 撤退は発見と持ち帰りを保持するが、base claim／module installを誤って成立させない。
- reducerはrenderingと現在遠征simulationから独立してtestでき、同じevent列から同じstateになる。
- 現行actorのままでもlogic proofを完了できる。F-02待ちでこのgateを止めない。
- 両site routeで、通常攻撃buttonなしのrange-based auto-basic、手動大技event、cooldownがbrowser regressionを通る。

## Workstream B — Playable Character Bridge（Aと同じsceneで進行）

### F-01 bridge

1. F-01をTechnology Epochとして凍結し、source、compiler、surface pack、hashを保持する。
2. R09へ薄いactor adapterを作り、F-01を通常camera、移動、combat、wet surface、world lightへ接続する。
3. 1280×720と2560×1440、actor高14〜17%で、F-01が既に持つidle、run、hitを記録する。attack／skillの専用motionがないこと自体をF-02の不合格証拠として記録し、bridgeの前提にはしない。
4. hair silhouette、face window、jacket、脚、pack、coral textile、tool、向きが通常倍率で読めるかを判定する。

### Evidence-driven F-02

F-02は上記captureをmodule／socket／motionごとのpass／fail manifestへし、不合格になった部分だけを再構築する。

- hair、face、torso／jacket、arms、legs、pack、toolは独立評価し、failed moduleだけを独立sourceへ再構築する。
- head、hand、back、weapon、utility、effect socketは実clip／missingの項目だけを修正する。
- windup、recover、skill、dodge、guard、hurt、interactは、専用motionの不足をmanifest化して必要なものから追加する。
- 同じversioned runtime packをForgeとR09が読み、gameplay routeではBeauty／Build Sheetをloadしない。
- 人間修正は再生成可能なmask／delta／source definitionへ残し、code内の場当たり的な箱追加へ戻さない。
- actor presentationを差し替えても、攻撃timing、damage、cooldownのauthorityはsimulation側から動かさない。

### 合格条件

- ForgeとR09で同一人物、同一palette、同一装備として読める。
- front／back／left／rightと必須motionで、主要partの破綻、関節分離、目立つ装備貫通がない。
- 通常gameplay倍率で「可愛い成人女性型のSF探索者」としてuser acceptanceを得る。
- 近接ではmicro-voxel、gameplay距離ではrich pixel-art silhouetteとして統合して見える。
- PC masterを先にart採択し、同じsemantic sourceからidentityとtelegraphを保ったmobile LODを派生する。

F-01 pack／adapterの読込失敗、timeout、またはdisable flag時は現行R06 actorへfallbackし、First Memory Loop、save、reloadを完走できなければならない。WorldMemoryStateとsave schemaにはF-01／F-02固有IDを入れない。

F-02はR09のlogic proofを塞がないが、R09をvisual review候補として公開する前の独立gateとする。

## Workstream C — R09 release guards

- R06とR09を同条件でcold start計測し、transfer、first-controllable、main-thread long taskを記録する。
- R09をR06比10%以上悪化させない。悪化時はroute-specific import、asset分離、compiled packを先に直す。
- `/game/`はfirst view 150 KB以下、scroll前archive画像0 byteを維持する。
- runtime起動時に画像sampling、volume再構築、LLM推論を行わない。
- PC masterのart／frame budgetを先に測り、mobileは同じasset sourceからLOD、shadow、post effectを縮退する。
- R09は新save namespaceから開始し、R06／`WorldLegacy`を自動importしない。旧saveは保持する。初版は厳格v1 codecと将来migrationの接続点だけを作る。
- local test、local browser、public deploy、iPhone実機、user art acceptanceを別々に記録する。

## Completion checkpoints

### R09A — First Memory Logic Proof Done

- 現行actor／fallback actorだけで、四分岐、回収物消費、撤退、save／reload、二回目差分を完走できる。
- F-01／F-02 asset、Forge、Beauty／Build Sheetに依存しない。
- 両routeのauto-basicとmanual skillがR06から後退しない。

### R09B — Visual Review Candidate Ready

- F-01 actual-gameplay manifestがあり、failed項目だけを直したF-02 packをForgeとR09が共有する。
- PC masterの通常cameraでcharacter visual gateを通り、user reviewできる。
- loading regression、desktop browser、fallbackを通す。public deployとiPhone実機合格は別判定とする。

## R09の制作順

1. `src/prototypeB/worldMemory/`へWorldMemoryState v1、event、reducer、codecを作り、新namespaceで`src/platform/saveRepository.ts`へ接続する。
2. `src/prototypeB/sim/types.ts`／`simulation.ts`は一遠征のauthorityとして保ち、現行actorで二site、回収物、拠点確保、module設置、撤退、二回目差分をlocal playableにする。
3. F-01 actor adapterを同じR09 sceneへ接続し、actual gameplay captureを取る。
4. captureからpass／fail manifestを作り、failed part／socket／motionだけをF-02として再構築し、ForgeとR09へ同時反映する。
5. R09に必要な範囲だけcombat telegraph、loot、HUDを整える。
6. visual、causality、loading、desktop browserを検証し、user reviewへ渡す。
7. iPhone実機とpublic deployは別gateとし、公開時は過去版を残すか再確認する。

## R09後のroadmap

### R10 — Relic Buildcraft

- damage値だけでなく、射程、周期、移動拘束、target条件、resource、大技成立条件が異なる二build。
- lootの比較、装備、分解、強化を短い遠征へ接続する。
- itemの作用原理、性能budget、合成可能性、flavor textを同じschemaから生成する。
- 名付き敵は静止／manual skillなしで安定勝利できないことをhard gateにする。

### R11 — First Companion

- world内で一体を発見し、加入するかを選べる。
- 遺物解析または使用回数制の大技でplayer buildを変える。
- 固定相棒にせず、将来の人、robot、犬、猫、動物型robot rosterへ接続できる契約を作る。

### R12 — Causal World Cell

- 旧用途、自然侵食、現在資源、actor need、衝突、複数対処、reward、world mutationを一つの因果graphから生成する。
- 自然侵食都市、主人公、同行者、敵、遺物、拠点、光、material、弱いdepth-aware softness、音をConcept Cの一sceneへ統合する。
- PC Ultra actual gameplay captureを採択後、mobile tierを派生する。

## 今はしない

- F-02をclose-upだけで完結するStandalone Forgeとして作ること。
- 都市、建物、monster、itemを大量生成すること。
- 全character creator、全種族、全同行者rosterを先に作ること。
- runtime LLM、都度scenario／map生成を初版loopへ入れること。
- 巨大seamless world、全NPC生活simulation、自由建築systemへ広げること。
- WebGPU／HDRへの移行自体をvisual改善と扱うこと。
- Steam包装、課金、App Store申請。
- catalog改装を再び主作業にすること。重さは計測とregression guardで扱う。
