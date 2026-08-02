# Notes: F.R.A.M. R07 Character and Depth Pass

Updated: 2026-08-02

## Confirmed inputs

- Concept Cは、高密度voxel／rich pixel-art-like surface、fixed diagonal diorama、明るい自然侵食都市、抑制したHD-2D的softnessの統合がvisual contract。
- R06は7,734 visible cells、3.65頭身、Box cell、sharp presentation、2D mini-mapと操作guideを持つ。
- R06は公開評価版だが、主人公の可愛さ、Concept C再現、commercial art quality、depth-aware DOFは未採択。

## Findings

- R06 heroは成人型CC0 scaffold由来の7,734-cell recipeへ、全体`(1.16, 0.69, 1.16)`と頭`(1.68, 1.62, 1.68)`を後段適用している。数値上3.65頭身でも、torso／pelvis／limb／coatのmacro volumeは成人型のまま。
- 顔はgenerated head内のeye／mouth cellsを除去し、別RoundedBox pixelを後付けしている。通常gameplay scaleでは髪massに対して顔clusterが小さく、front／three-quarter readが弱い。
- R06はscreen-Y banded blurをOFFにしている。現pipelineはscene depthを使わず、`classic`／`banded` tilt-shiftだけを持つ。
- PC Ultra composerはhalf-float color target、GTAO、bloom、SMAAを持つ。sceneをMeshDepthMaterialで別targetへ描く弱いbilateral depth-aware passを追加できる。DOM HUDはcomposer外なのでsharpなまま。
- 生成した`fram-r07-character-direction.png`をR07 semantic volume基準とする。採用要素は3.6頭身、横に広いasymmetric bob、大きいdark-teal eye cluster、短いtechnical jacket、分割腰panel、小型archive pack、coral textile、cyan survey blade。

## Generated art direction

- File: `work/r07_character_depth/fram-r07-character-direction.png`
- Tool: OpenAI image generation
- Reference: `docs/concepts/visual-fidelity-v03/ideal-screen-c-stylized-3d.png`
- Runtime use: none。実装判断のreferenceのみ。
- Human status: Codex-selected implementation guide; user acceptance pending。

## Verification log

- AI character directionを生成し、runtime非使用のart referenceとして保存した。
- 初回R07は11-cell幅の頭とside eyeがmask／goggleに見えたため不採択。頭部をbody cellの0.56倍、20-cell超のmicro-gridへ再構築し、side eyeを廃止、front faceとhair shellを分離した。
- R06／R07を同じ1280×720、同じproduction previewで比較。R06 7,734 cells、R07 9,627 cells。full frame、3倍hero crop、comparison boardを保存した。
- R07 canvas metadata: `r07-fram`、`semantic-high-density-articulated-voxel-girl`、9,627 cells、1917×1077、half-float 4× MSAA、GTAO／bloom／SMAA、depth-aware DOF true、focus range 0.036、blur 1.45px、edge 0.0045、fallbackなし。
- strict TypeScript passed。
- Vitest passed: 34 files／195 tests。PC Ultra browserを動作させたままの初回並列runは既存生成testがtimeoutしたが、browser描画停止後の全suiteは合格した。
- production build passed。既存の500 kB超chunk warningは残る。
- public R01〜R06、catalog、deploy、pushは変更していない。
