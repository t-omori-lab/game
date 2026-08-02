# F.R.A.M. Character Generation Pipeline Proposal

Status: proposal  
Date: 2026-08-02

## Decision

生成したCharacter Sheetを美術正本にし、編集可能な3D voxel assetへ起こしてからrig/animationを付ける方式へ切り替えることを推奨する。

R08のcode-authored cell調整はこれ以上の主人公造形の主経路にしない。R05/R08は比較用baselineとfallbackとして保存する。

この変更はThree.js基盤を捨てるものではない。Blender等をoffline asset compilerとして加え、browser runtimeは引き続きThree.js、GLB、既存simulationを使う。

## Why this is the right pivot

R05は既に `external glTF -> voxel cells -> 15 articulated parts -> runtime animation` を実行している。R05がR08より女の子として読みやすい部分があるのは、cell数ではなく、female body/hairの実在3D silhouetteをsourceにしたためである。

一方、R07/R08は優れたCharacter Sheetを3D計測せず、画像を見ながらTypeScriptの整数範囲で別々の部位を近似した。cell数を7,734から9,627、19,221へ増やしても、face、hair、body、jacket、packの統合形状へ収束しない。問題は解像度ではなく、canonical shapeの欠如である。

## Two-sheet contract

### Beauty Sheet

現在の `fram-r07-character-direction.png` を採用する。

役割:

- 可愛さ、identity、head/body ratio、silhouette
- hair/jacket/pack/toolのdesign
- palette、material、wear、SF language
- human accept/reject

### Build Sheet

Beauty Sheetから別途作る。

必須条件:

- neutral A-pose
- orthographic front/back/left/rightと必要なtop/3-quarter
- 全view同一scale、joint位置、平坦なneutral lighting
- body、face、hair、jacket、arms、legs、boots、pack、toolを分離
- voxel height、palette roles、bone regions、sockets、pivotを明記

画像modelのview不一致は、自動生成の再試行だけでなく、3D draftのturntable renderを画像modelへ戻すround-tripで補正する。

## Canonical flow

```text
StyleProfile + CharacterGenome
  -> image-generated Beauty Sheet candidates
  -> human art selection
  -> orthographic modular Build Sheet
  -> AI 3D draft / multiview visual hull candidates
  -> semantic micro-voxel canonical source
  -> humanoid-v1 rig, sockets and limited secondary bones
  -> idle / locomotion / action clips
  -> outer-surface, shadow proxy and LOD compile
  -> GLB + manifest + optional KTX2
  -> Three.js Character Forge
  -> same-camera render QA
  -> human accept/reject
```

AI 3Dはshape donorであり、そのまま製品assetにはしない。accepted voxel source、rig family、module IDs、palette roles、sockets、animation mapping、license/provenanceがcanonical dataになる。

## Voxel animation rule

見えるcellを全てsmooth skinningしない。

- rigid: head core、torso core、boots、pack、weapon
- bone-owned rigid voxel clusters: upper/lower arms、thighs、calves
- authored joint volumes: shoulder、elbow、hip、knee
- limited skin/secondary bones: hair locks、jacket/coat tails、coral textile
- stable semantic modules: face、hair、outerwear、back equipment、tool

これにより、関節でcubeがゴムのように歪むことを避けながら、R05の人形的な硬さも減らす。

## Runtime delivery

- source: editable `.blend` and/or semantic voxel data + manifest
- runtime: lazy-loaded `.glb`
- animation: existing deterministic `HeroVisual` phaseをclip timeへmapping
- simulation: damage/timingは従来どおりsimulation authoritative
- optimization: hidden/internal face removal、outer-surface compile、Meshopt、separate shadow proxy、PC/mobile LOD
- fallback: approved R05/R08 visual

Three.jsの`GLTFLoader`と`AnimationMixer`を新しいadapterで`HeroVisual`へ接続する。main JavaScriptへbase64埋め込みせず、route訪問時にhashed assetを非同期loadする。

## Asset expansion

上位のForge protocolは全assetで共有するが、geometry/rig methodは種類別にする。

| Asset | Canonical method |
|---|---|
| Protagonist / humanoid NPC | humanoid-v1 + approved modular voxel parts |
| Weapon / relic / item | image-to-3D draft + semantic rigid voxel source |
| Machine / robot | rigid modules + pivot rig |
| Dog / cat / creature | separate body-plan rig family |
| Building / road | procedural modular geometry + generated surface/decal |
| Vegetation / small prop | curated generated set + instancing |

Character creationは毎回whole bodyを生成せず、accepted face/hair/body-frame/outerwear/pack/equipment modulesを同じrig上で組み替える。これがanimation、equipment fit、save/load、LODを成立させる。

## First proof: Character Forge F-01

本編R09を先に作らず、独立したasset pipeline spikeを作る。

### Scope

- default protagonist F-01 one character
- neutral Build Sheet
- one AI 3D draft and one semantic voxel reconstruction
- existing 15-part rig or clean humanoid-v1
- idle、run、hit
- weapon socket、back socket
- sharp audit and C-camera presentation
- R05/R08 side-by-side

### Gate

1. 説明なしに「可愛い女性型」「SF探索者」「高密度voxel」と読める。
2. four directionsで同一人物に見える。
3. face、hair、jacket、pack、tool、coral textileが通常gameplay scaleで分離する。
4. motion中にvoxel grammarと衣装が壊れない。
5. source cellsとruntime geometry budgetを分離し、LODを生成できる。
6. user art acceptanceを得る。これ以前はcommercial-quality達成と呼ばない。

## Tool judgment

- Blender: canonical editor/compilerとして採用候補。ユーザーが操作を学ぶ前提にはせず、AI agentとscriptで扱う。
- Blockbench: cube/bone hierarchyの目視修正とanimation preview候補。最終compile/provenanceはBlender/独自compilerへ戻す。
- Tripo/Meshy: four-view input、parts/low-poly、rig candidateを一連で比較できる最速のdraft path。ただしservice outputを完成品扱いせず、規約、privacy、attribution、model versionを生成ごとに記録する。Meshy free outputは2026-03-07規約でCC BY 4.0となるため、主人公正本にはpaid/private条件または別pathを使う。
- TRELLIS.2: MITで有力な3D draft比較候補だが、official pathはLinux/NVIDIA 24GB以上。local Apple M3ではなくremote GPU候補。
- Hunyuan3D: multiview draft候補。ただし2.1 licenseのterritory制約がglobal Steam配布と衝突し得るため、canonical adoptionは保留。
- UniRig/Mixamo: rig/clipの初稿候補。stylized proportion、hair/clothing、socket、voxel deformationは必ず修正・検査する。

## Recommendation

次の作業はR08の微修正ではなく、`Character Forge F-01`とBuild Sheetの作成にする。成功した一体のasset contractを、主人公variation、同行者、敵、遺物へ順に拡張する。
