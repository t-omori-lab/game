# Design QA: F.R.A.M. R08 Unified Character Art Pass

Date: 2026-08-02  
Scope: R07由来の通常gameplay画角を保持した、主人公character art一体のR08 local candidate。Concept C全景の完全再現、都市asset刷新、commercial art acceptanceはこのpassの合格範囲に含めない。

## Comparison target

- Source visual truth: `work/r07_character_depth/fram-r07-character-direction.png`
- Full-screen context: `docs/concepts/visual-fidelity-v03/ideal-screen-c-stylized-3d.png`
- R07 normalized baseline: `work/r08_character_art/r07-baseline-1280x720.png`
- Final browser implementation: `work/r08_character_art/r08-unified-05-1280x720.png`
- Combined comparison input: `work/r08_character_art/r08-design-comparison.png`
- Local route: `http://127.0.0.1:4175/game/r08/`

## Normalization

- Source direction／Concept C pixels: 1,672 × 941。
- R07／R08 implementation pixels: 1,280 × 720。
- Browser CSS viewport: 1,280 × 720、viewport override、density 1相当の同pixel capture。
- State: `active` gameplay、開始地点、同一camera／world／HUD／objective。R07とR08は同じ16:9 viewportとstate。character direction sheetはstudio specであり同一cameraではないため、pixel-perfect比較ではなくsignature silhouette／material readsの基準に限定した。

## Findings

- P0／P1／P2: R08 character-art scopeでは残件なし。
- [P3] 顔の微表情は通常画角で数pixelへ縮小される。
  Location: F-01B head／face clusters.
  Evidence: source sheetの拡大faceは目・頬・口を明瞭に読めるが、gameplay full viewでは主にwhite bobとskin windowとして読む。
  Impact: 放浪中のsilhouetteは成立するが、会話close-upには専用camera／expression stateが必要。
  Follow-up: dialogue portrait／close-up gateで眉・まぶた・口clusterとsecondary hair motionを追加する。

## Required fidelity surfaces

- Fonts and typography: R07の既存HUDを意図的に保持。1,280 × 720で階層、weight、letter spacing、操作guideの判読に新規退行なし。
- Spacing and layout rhythm: camera、HUD、mini-map、objective、control guideはR07と同一。characterだけを差し替え、persistent controlのoverflow／cropなし。
- Colors and visual tokens: direction sheetのpearl hair、pale sage jacket、graphite under-suit、coral textile、cyan archive signalをruntime materialへ分離。instance colorの二重乗算による暗化を修正した。
- Image quality and asset fidelity: direction sheet／Concept C画像はruntimeへ貼らず、visible 19,221 instanced micro-voxel cellで描画。scene-depth DOF、SMAA、AgX、lightingはR07契約を維持し、post-process fallbackなし。
- Copy and content: F.R.A.M. R08 identity、mission、mini-map、操作説明は既存product copyを保持。debug時のみR08／UNIFIED VOXEL GIRLを表示する。

## Full-view and focused evidence

- Full view: `r08-design-comparison.png`上段。R08は選定方向のwhite bob／short pale jacket／graphite legs／cyan toolを通常gameplay scaleで保持する。
- Normalized R07／R08: 同比較中段。R07のhead overlay＋旧body columnから、R08ではhair、face、shoulder、jacket、limbs、boots、archive packが同じcell／material grammarへ移った。
- Focused region: combined comparison下段のCSS 2× crop。full viewでは小さいcharacter差を、同一source image／同一cropで比較した。

## Comparison history

1. `r08-unified-01-1280x720.png`
   - Earlier P1: BODY_CELLを小さくした一方でtorso／equipment座標を補正せず、頭と胴が分離し、旧bodyより細い柱状silhouetteになった。
   - Fix: torso、collar、hip panels、packのY coordinateをrig pivot基準へ再配置し、hero scaleを調整。
2. `r08-unified-02-1280x720.png` → `r08-unified-03-1280x720.png`
   - Earlier P1: material paletteとinstance colorの両方へ同じ色を掛け、skin／jacketがgraphite近くまで暗化した。
   - Fix: materialをpalette truth、instance colorを0.92〜1.00のvalue variationだけに変更。pale jacket panelとshoulder massを追加。
3. `r08-unified-04-1280x720.png` → `r08-unified-05-1280x720.png`
   - Earlier P2: inherited compact-rootのY 0.69によりheadが横長helmetへ圧縮された。
   - Fix: semantic head scaleでroot compressionを相殺し、head widthを縮め、fringe／side locks／collar／bootの比率を再調整。
   - Post-fix: same-view combined comparisonでP0／P1／P2なし。残るface close-upはP3 follow-upへ限定。

## Functional browser evidence

- Primary interactions: F.R.A.M.起動、S入力による正面向き／移動、既存HUD表示。
- Runtime metadata: `experience=r08`、`prototypeVersion=R08`、`heroRepresentation=unified-semantic-high-density-articulated-voxel-girl`、`heroVoxelCells=19221`、`ultraDepthAwareDof=true`。
- Browser console: warning／error 0件。post-process fallbackなし。
- Automated verification: strict TypeScript、199 tests、production build（最終再実行はtask report参照）。

## Follow-up polish

- Dialogue／character-create close-up専用の表情と髪secondary motion。
- 装備換装時のjacket／pack silhouette validation。
- Concept C全景とcommercial HD-2D parityは別passで再評価し、R08 character passの合格と混同しない。

final result: passed

