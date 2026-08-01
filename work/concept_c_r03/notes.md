# Notes: Concept C Complete Reconstruction R03

## Confirmed user findings

- R02はConcept Cを再現しておらず、元prototypeが多少変化しただけに見える。
- cameraが寄りすぎて周囲が見えない。
- default女性主人公に可愛さがなく、微細化が不足し、Cと大きく異なる。
- WASD移動方向とcharacter facingが逆。
- 同じ方向の改善で到達できないなら、一気に再設計・再構築する。

## Evidence to collect

- [x] Concept C source truth path and pixel dimensions
- [x] R02 same-viewport capture
- [x] C／R02 structural gap matrix
- [x] current renderer and actor representation constraints
- [x] R03 capture history and final comparison

## Source truth

- 正本: `docs/concepts/visual-fidelity-v03/ideal-screen-c-stylized-3d.png`
- 画素: 1672 × 941
- SHA-256: `9190e60398b794f5e423e40f9084f1988a7c2b055d06304e4aee43c3fce57e02`
- initial hero anchor: 約45.3% W / 68.9% H
- actor height: 約14–17% Hを基準、environment占有率95%以上
- lighting: warm upper-right key / cool teal distance / lower-left long shadow
- focus: central gameplay band sharp、far/topとforeground/bottomはbaked DOF

## R02 diagnosis

- `PrototypeBRenderer.ts`はlegacy 3600-unit worldを常に構築し、Beauty Cellをoverlayしていたため、画面構造は旧prototypeのままだった。
- R02 viewHeight 390とprocedural box actorではcameraと人物密度の両方がCへ届かない。
- hero local front +Zに対するyaw式が反転し、WASDのscreen directionと見た目の向きが逆だった。
- `r02/index.html`がlive `/src/main.ts`を参照し、R03変更で過去版も変わる状態だった。

## R03 implementation

- environment: Cを基にactor/UIだけを除いた1672×941のAI-generated plate。
- actor: cute female SF explorer / robot dog / biomechanical anomalyを生成し、chroma処理、方向別normalize、foot anchor統一。
- runtime: independent Canvas 2D layer、wide fixed composition、limited follow camera、high-DPI AA、dynamic shadows、particles、semi-auto shot、manual relic skill。
- input: WASD/arrowはscreen-relative、tap-to-move、Space/Q/manual HUD skill。
- archive: R02を静的asset、scope別SW、snapshot、checksumで凍結。

## Comparison history

- R02 public baseline: `r02-public-gameplay-1672x941.png`
- C vs R02: `concept-c-vs-r02-1672x941.png`
- R03 initial: `r03-local-initial-1672x941.png`
- C vs R03 initial: `concept-c-vs-r03-initial-1672x941.png`
- Initial P1 findings: HUDのmagenta key残り／サイズ過大、extra R03 badge、hero/companionを約6–14%拡大、追加vignette過多。
- R03 final: `r03-local-p1-fixed-1672x941.jpg`
- C vs R03 final: `concept-c-vs-r03-p1-fixed-1672x941.png`
- Final visual gate: P0 0、P1 0、P2 3 non-blocking、`final result: passed`。
- P1 resolution: heroをfront-facingで女性／可愛い顔とSF装備が読める状態へ変更し、actorへwarm rim、lower-left cast／contact shadow、wet-road reflectionを追加。anomalyは拡大、blur、低彩度、pink bloom、particle、水際glowで遠景へ統合した。

## Architecture boundary

- R03はConcept Cの知覚品質を固定するC0 Beauty Benchmarkであり、完成したHD-2D engineではない。
- 次のC1は、R03中央のroad、stair、shelter、workbenchをdepth-aware geometry、occlusion、collision、navigation、dynamic lightへ分解する。
- distant／non-interactive領域にはplateを残し、playable領域だけを3D／depth-aware layerへ置換する。
- R03のlimited-follow cameraはplateのcover overscanを超えない。基準1672×941ではoffset 0、aspect差で余白が生じる軸だけを追従させ、背景外の黒帯を公開blocking defectとして禁止する。
- R03の移動可能域は矩形ではなく、中央road／intersectionへinsetした10頂点polygonとする。keyboardとtap-to-moveは同じpolygonへclampし、shelter、wall、植栽、foreground parapetへ重なる移動をC0で禁止する。
