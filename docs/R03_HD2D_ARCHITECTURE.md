# R03から生成可能なHD-2D基盤へ

更新日: 2026-08-02

## 結論

R03の「高品質environment plate + dynamic actor」は、Concept Cの知覚品質とcamera compositionを固定するBeauty Benchmarkとして有効である。一方、この方式だけでは、広い世界、建物内外、遮蔽、経路探索、破壊、時間帯、天候を持つHD-2Dゲーム全体にはならない。

North Starを実現するには、R03を最終runtimeと誤認せず、R03の承認画面をvisual contractとして、同じ画面をscene graph、depth、material、lighting、navigationへ逆分解できる生成基盤へ移行する。

## R03で証明すること

- 1672 × 941の広い固定斜め俯瞰で、worldが画面の95%以上を占める。
- 自然侵食都市、wet asphalt、植生、構造物、小物を高密度に共存させる。
- warm upper-right light、cool distance、foreground/far DOFを一つの画面で成立させる。
- 高精細な女性主人公、companion、anomalyを動的に重ねても、Cの色・明度・素材感から逸脱しない。
- WASD、tap-to-move、semi-auto attack、manual relic skillを同じ画面で操作できる。

## R03だけでは証明できないこと

- 背景内部の正しい高さ、奥行き、遮蔽、collision
- 建物への進入、階層移動、破壊や状態変化
- 天候、時刻、装備変更に対する光と影の物理的更新
- 隣接cellを跨ぐ連続的なworld streaming
- 生成した地形とquest、enemy、item配置のgameplay整合性
- すべてのcamera stateで同じ美術品質を維持すること

## 最終runtimeの層

### 1. World Model

AIは画像だけでなく、次の正規化データを同時に生成する。

- `scene graph`: 地形、建物、植生、props、actor、lightの親子関係
- `semantic tags`: road、cover、entrance、water、climbable、lootable、habitable
- `geometry`: footprint、高さ、collision、occluder、navigation surface
- `causal state`: 浸水、腐食、通電、可燃、温度、時間帯、天候反応
- `provenance`: seed、rule version、source、generator、asset hash

画像から法則を推測するのではなく、法則からsceneと画像を同時にcompileする。

### 2. Layered Scene Compiler

一つのcellを以下へcompileする。

1. modular low/mid-poly 3D geometry
2. AI-generated PBR texture set: albedo、normal、roughness、metalness、height、emissive
3. baked lightmap / ambient occlusion / decal atlas
4. depth、occlusion、collision、navigation mesh
5. distant plate / sky / fog volume
6. actor spawn、interaction、loot、combat affordance

遠景や非接触領域にはR03型plateを残し、playable領域だけを3D/depth-aware layerへ置き換える。画面全体を一度に完全3D化しない。

### 3. Actor Representation

R03の4方向spriteはart acceptanceと操作確認に使う。製品runtimeでは次のいずれかへ移行する。

- high-detail rigged 3D character + fixed orthographic camera
- multi-view neural sprite / Gaussian or mesh-backed avatar
- 8〜16方向、depth、normal、motion vectorを持つgenerated sprite set

最低条件は、装備交換、attack、hurt、dodge、weather、light directionが変化しても、face、hair、silhouette、materialが破綻しないことである。

### 4. Render Graph

PC Ultra masterは次の順で描画する。

1. geometry / depth / velocity
2. physically-based direct and indirect light
3. contact shadow / AO / reflection probe or screen-space reflection
4. vegetation and atmospheric scattering
5. depth-aware fog and DOF
6. bloom / emissive / particles
7. HDR tone map and color grade
8. UI composite

mobile tierは同じart sourceから、shadow distance、reflection、volumetric sample、texture resolution、particle count、render scaleだけを落とす。別の低品質美術へ作り直さない。

## AI-native生成契約

各生成物は、見た目だけでなくgameplay上の意味を持つmanifestを出力する。

```json
{
  "cell_id": "district-09-rainbreak-001",
  "seed": 803011,
  "visual_contract": "concept-c-v1",
  "camera_contract": "ortho-3q-45-v1",
  "ruleset": "overgrown-city-v1",
  "assets": [],
  "geometry": [],
  "navigation": [],
  "interactions": [],
  "validation": {
    "reachable": true,
    "occlusion_valid": true,
    "combat_space_score": 0.82,
    "visual_similarity_gate": "pending"
  }
}
```

同じseedとrule versionからは同じ構造を再生成できる。LLMは自由作文だけを行わず、schema、物理ルール、gameplay制約の範囲内で候補を出す。

## 段階的な実装gate

### C0 — R03 Beauty Benchmark

- Cと同一viewportの静止画比較
- wide camera、female hero、companion、anomaly、HUD
- screen-relative input、tap movement、manual skill
- 2.5D hybridで知覚品質を固定

### C1 — Layered Beauty Cell

- R03の道路、階段、停留所、作業台をdepth付きlayerへ分解
- collision、occlusion、navigationを実装
- actorを一つの動的lightに正しく反応させる
- R03承認captureとの差をP1ゼロに保つ

### C2 — Generated Adjacent Cells

- 同じrulesetから隣接する3 cellを生成
- 境界、道路、水位、植生、導線を連続させる
- plate依存領域と3D playable領域の継ぎ目を不可視にする

### C3 — Roaming Game Slice

- 拠点、遺跡、loot、enemy、companion discoveryを接続
- semi-auto basic combatとmanual relic skillをprogressionへ接続
- save、world memory、生成provenanceを保持

## 採用判断

- R03を「HD-2D engine完成」とは呼ばない。
- R03を破棄して旧R02型procedural box worldへ戻らない。
- R03の承認画像、camera、palette、density、actor scaleを回帰基準として保存する。
- 次の実装対象は、広いworld全体ではなく、R03の中央道路と停留所をdepth-awareに再構築するC1とする。
