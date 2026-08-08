# Architecture

Last updated: 2026-08-08

## System overview

TypeScript、Vite、Three.jsで既定のbrowser版Prototype Bを作る。ゲーム規則はrendererとDOMから独立した決定論的simulation coreに置く。Prototype 0.1のPhaser runtimeは比較用legacyとして、Character Forgeは制作pipelineの技術実験として分離する。Steam候補版とengine採否は、R09、最小Product Shell、R10代表buildを同じsliceで比較できる段階まで固定しない。

## Runtime selection

```text
index.html
  → src/catalog.ts                         public catalog

r06/index.html
  → src/r06/main.ts                        R06 dedicated static entry
      → src/prototypeB/app/startPrototypeB.ts

r03/index.html
  → src/r03/main.ts                        R03 fixed-render concept route

r04/index.html / r05/index.html / r07/index.html / r08/index.html
forge/f01/index.html
  → src/main.ts
      ├─ release resolver
      ├─ dynamic import Prototype B
      ├─ /forge/f01/ → dynamic import Character Forge
      └─ ?prototype=0.1 → dynamic import Phaser legacy runtime
```

公開最新版R06だけは、空白のないboot shellと読み込み順を固定するため専用entryからPrototype Bをstatic importする。R06のService Workerは`/game/r06/`のscopeだけを持ち、catalog navigationへ介入しない。その他のrouteではPrototype B、Forge、Phaserを必要時に分けて読み込む。R07／R08はcharacter比較候補で、R06を自動的に置き換えない。

## Prototype B components

| Component | Responsibility | Main path |
|---|---|---|
| Application | fixed-step loop、UI状態、event→音／文言、lifecycle | `src/prototypeB/app/` |
| Simulation | world、移動、半自動通常戦闘、手動skill、敵、loot、quest三結果 | `src/prototypeB/sim/` |
| Voxel core | recipe、grid検査、hidden-face meshing、背景／object生成 | `src/prototypeB/voxel/` |
| Renderer | Three.js fixed orthographic camera、world、effect、resource dispose | `src/prototypeB/render/` |
| Input | DOM pointer／keyboardを共通control frameへ変換 | `src/prototypeB/input/` |
| Audio | Web Audioの探索／危険layerとevent cue | `src/prototypeB/audio/` |
| Platform | PWA shell、A/B save、IndexedDB／memory fallback | `src/platform/` |
| Character Forge | AI-generated sheet、source definition、compiled surface pack、semantic rig | `src/characterForge/` |
| Legacy runtime | Prototype 0.1のPhaser scene、旧simulation、WorldLegacy | `src/app/`, `src/render/`, `src/sim/`, `src/session/` |
| Tests | 新旧simulation、voxel、保存 | `tests/` |

## Prototype B data flow

touch／key → `PrototypeBControlFrame` → tick付き`PrototypeBCommand` → `stepPrototypeB()` → 新しい`PrototypeBState`＋`PrototypeBEvent[]`

同じevent列を次へ配る:

- Three renderer: 攻撃弧、予兆輪、被弾burst、遺物wave
- DOM HUD: HP、武器、目的、target、loot dossier、三結果
- Web Audio: 武器、guard、回避、危険、結果cue

simulationの平面`x/y`をrenderの`x/z`へ写し、renderの`y`は高さだけに使う。camera state、effect乱数、音時刻はsimulationへ入れない。

## Character and voxel pipelines

```text
VoxelRecipe / semantic asset source
  → role-specific grid or compiled surface pack
  → bounds／palette／connectivity／anchor validation
  → hidden-face or exposed-surface compilation
  → positions／normals／colors／indices
  → Three.js geometry／instancing／rig-owned parts
```

16³は背景objectに使える一つのrecipe familyであり、主人公を含む全assetの固定上限ではない。F-01はBeauty Sheet／Build Sheetとsource definitionから高密度surface packを開発時にcompileし、runtimeでは元画像のsamplingやvolume再構築を行わない。個別cellへ一つずつdraw callを割り当てず、geometry統合、instancing、rig part単位の所有を使う。

## R09以降に追加する境界

以下は目標architectureであり、2026-08-08時点では未実装である。全面refactorを先行させず、R09AとProduct Shellに必要な継ぎ目から切り出す。

```text
ProductShell
  boot / loading / title / Google sign-in / profile / menu / status

GameSession
  fixed-step loop / expedition lifecycle / pause / resume

WorldMemory
  WorldEvent / pure reducer / strict codec / WorldMemoryState

SaveCoordinator
  local authority / cloud snapshot / recovery / version check

PresentationCoordinator
  simulation event → HUD / audio / effect / notification

RuntimeQuality
  measurement / manual profile / later auto-selection

PlayerService
  auth identity / player profile / cloud adapter

DevStudio
  generation / validation / provenance / human approval
```

Game Coreへprovider SDK型を入れない。Dev Studioの生成model、raw source、review UIをpublic game bundleへ入れない。`startPrototypeB.ts`と`PrototypeBRenderer.ts`は現在の責務集中点なので、新機能を無制限に追加せず、上記境界へ段階的に移す。

## External dependencies

| Dependency | Purpose | Failure behavior |
|---|---|---|
| Three.js | Prototype B world rendering | WebGL context lossを表示し、操作をpause。起動不能時は明示的なfallback画面 |
| Phaser 4 | 比較用Prototype 0.1 | query routeでのみ読込 |
| Vite | 開発serverとproduction build | build失敗として停止 |
| Vitest | simulation、voxel、保存の自動検査 | release gateを不合格にする |
| Web Audio | procedural sound | unlock失敗を通知し、無音で続行 |
| IndexedDB | local-first save authority／旧版save | memory fallback。現在Prototype BのWorld Memoryへは未接続 |

## Boundaries and invariants

- simulationで`Math.random()`、現在時刻、描画delta、DOM、Three.jsを使わない。
- simulationは毎秒30 tick、描画はbrowserのanimation frameで動かし、1frame最大5 tickとする。
- state更新はcloneを返し、入力stateをmutationしない。
- `saveVersion`、`contentVersion`、seedをstateへ含める。
- collisionとcombatは2D平面で判定し、voxel単位physicsは行わない。
- asset grid密度は役割別に選び、16³を主人公や全objectの共通上限にしない。
- WebGL resource、event listener、animation frame、AudioContextをapplication終了時にdisposeする。
- AI出力はゲーム判定へ直接接続しない。クライアントへAPI keyや秘密情報を入れない。
- Prototype 0.1とPrototype Bのsave schemaを暗黙に共有しない。
- Google sign-inはidentityであり、cloud databaseをgame authorityにしない。初期cloudはsafe-point snapshot／復旧へ限定する。
- manual quality profileと計測をauto selectionより先に作る。
- engine比較はR09＋最小Product Shell＋R10代表buildの同一sliceで行い、先に全面移行しない。

## Open design questions

- R09Aの二moduleが二回目90秒以内に生む最小のvisual差とgameplay差を何にするか。
- guard／回避、item、target上書き、同行者命令をどこまで手動介入として残すか。
- R10の二〜三buildを、target、間合い、周期、移動拘束、resource、副作用でどう分けるか。
- 妖怪、電脳怪異、旧文明技術をどの比率で正式themeにするか。
- 現行Three.js、既存engine、hybridのどれをGolden Slice後の製品基盤にするか。
