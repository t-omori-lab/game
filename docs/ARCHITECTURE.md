# Architecture

Last updated: 2026-07-30

## System overview

TypeScript、Vite、Three.jsで既定のbrowser／PWA版Prototype Bを作る。ゲーム規則はrendererとDOMから独立した決定論的simulation coreに置く。Prototype 0.1のPhaser runtimeは比較用に残し、`?prototype=0.1`のときだけdynamic importする。Steam候補版はゲーム核の検証後に同じWeb本体をdesktop shellで包む。

## Runtime selection

```text
index.html
  → src/main.ts
      ├─ default → src/prototypeB/app/startPrototypeB.ts
      │              ├─ sim/
      │              ├─ input/
      │              ├─ render/PrototypeBRenderer.ts
      │              ├─ voxel/
      │              └─ audio/
      └─ ?prototype=0.1 → dynamic import src/app/startGame.ts
                                → Phaser FieldNotebookScene
```

Prototype Bは既定のstatic importにする。これによりproduction HTMLが参照するmain asset内へThree.jsとPrototype Bを含め、現在のservice workerがinstall時にprecacheできる。大きいPhaser chunkは比較routeを開くまで取得しない。

## Prototype B components

| Component | Responsibility | Main path |
|---|---|---|
| Application | fixed-step loop、UI状態、event→音／文言、lifecycle | `src/prototypeB/app/` |
| Simulation | world、移動、手動戦闘、敵、loot、quest三結果 | `src/prototypeB/sim/` |
| Voxel core | 16³ grid、recipe検査、hidden-face meshing | `src/prototypeB/voxel/` |
| Renderer | Three.js fixed orthographic camera、world、effect、resource dispose | `src/prototypeB/render/` |
| Input | DOM pointer／keyboardを共通control frameへ変換 | `src/prototypeB/input/` |
| Audio | Web Audioの探索／危険layerとevent cue | `src/prototypeB/audio/` |
| Platform | PWA shell、A/B save、IndexedDB／memory fallback | `src/platform/` |
| Legacy runtime | Prototype 0.1のPhaser scene、旧simulation、WorldLegacy | `src/app/`, `src/render/`, `src/sim/`, `src/session/` |
| Tests | 新旧simulation、voxel、保存 | `tests/` |

## Prototype B data flow

touch／key → `PrototypeBControlFrame` → tick付き`PrototypeBCommand` → `stepPrototypeB()` → 新しい`PrototypeBState`＋`PrototypeBEvent[]`

同じevent列を次へ配る:

- Three renderer: 攻撃弧、予兆輪、被弾burst、遺物wave
- DOM HUD: HP、武器、目的、target、loot dossier、三結果
- Web Audio: 武器、guard、回避、危険、結果cue

simulationの平面`x/y`をrenderの`x/z`へ写し、renderの`y`は高さだけに使う。camera state、effect乱数、音時刻はsimulationへ入れない。

## Voxel pipeline

```text
VoxelRecipe
  → 16³ VoxelGrid
  → bounds／palette／connectivity／anchor validation
  → hidden-face mesher
  → positions／normals／colors／indices
  → one Three.BufferGeometry per visual
```

個別voxel cubeへ一つずつdraw callを割り当てない。同一地面tileは`InstancedMesh`、静的objectはgeometryを生成後に固定する。dynamic shadow mapを使わず、blob shadowと面色を使う。

## External dependencies

| Dependency | Purpose | Failure behavior |
|---|---|---|
| Three.js | Prototype B world rendering | WebGL context lossを表示し、操作をpause。起動不能時は明示的なfallback画面 |
| Phaser 4 | 比較用Prototype 0.1 | query routeでのみ読込 |
| Vite | 開発serverとproduction build | build失敗として停止 |
| Vitest | simulation、voxel、保存の自動検査 | release gateを不合格にする |
| Web Audio | procedural sound | unlock失敗を通知し、無音で続行 |
| IndexedDB | 後続のPrototype B永続保存／旧版save | memory fallback。現在Bへは未接続 |

## Boundaries and invariants

- simulationで`Math.random()`、現在時刻、描画delta、DOM、Three.jsを使わない。
- simulationは毎秒30 tick、描画はbrowserのanimation frameで動かし、1frame最大5 tickとする。
- state更新はcloneを返し、入力stateをmutationしない。
- `saveVersion`、`contentVersion`、seedをstateへ含める。
- collisionとcombatは2D平面で判定し、voxel単位physicsは行わない。
- 16³はasset authoring上限であり、world尺度や実行時cube object数ではない。
- WebGL resource、event listener、animation frame、AudioContextをapplication終了時にdisposeする。
- AI出力はゲーム判定へ直接接続しない。クライアントへAPI keyや秘密情報を入れない。
- Prototype 0.1とPrototype Bのsave schemaを暗黙に共有しない。

## Open design questions

- 最初の敵を倒す前にguard／回避をどう自然に教えるか。
- 二武器をupgrade treeへ広げるか、別武器coreを増やすか。
- 依頼結果を、宿敵、地域価格、勢力、噂のどれへ最初に永続化するか。
- 妖怪、電脳怪異、旧文明技術をどの比率で正式themeにするか。
- Steam shellをElectronとTauriのどちらにするか。
