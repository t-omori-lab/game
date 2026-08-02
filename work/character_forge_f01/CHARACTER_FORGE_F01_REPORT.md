# Character Forge F-01 Report

Status: completed as a local pipeline proof

## Objective

Beauty Sheetからゲーム用3D正本へ変換するAI-native制作工程を、同一人物・編集可能性・アニメーション・ゲーム距離での可読性まで含めて検証する。

## Deliverables

- Production Build Sheet
- External canonical character asset and reproducible compiler
- Shared rig with idle/run/hit
- Local Character Forge comparison route
- Same-state visual comparison and `design-qa.md`

## Result

選定済みBeauty Sheetを人物同一性の正本として保持し、同一人物のstrict four-view＋module Build Sheetを生成した。Build Sheetのfront／left／back／right投影をbrowser canvasで実測し、外部`f01.source.json`のgrid、crop、palette、rig定義から、48×92×42／37,990 solid cellsの3D volumeを決定的に再構築する。

全身visual hullが腕、胴、backpackの輪郭を直積して膨らむため、`fram-humanoid-compact-v1`のsemantic volume gateを加えた。外側9,454 cellsだけをrounded instancingし、head、torso、左右arm、左右leg、equipmentの7 partへ所有させた。同じ正本で`idle / run / hit`を再生し、front／left／back／right／3-quarter、close／game distance、wireframe、turntableを操作できる。

独立routeは`/game/forge/f01/`。Build Sheet、Beauty Sheet、R05、R08を画面内で切り替えられる。main game、catalog、公開R06は変更していない。

## Verification

- strict TypeScript: passed
- Vitest: 37 files / 202 tests passed
- production build: passed
- 1280×720 in-app browser: 9,454 rendered cells / 37,990 source volume / 7 rig parts / 9 materials
- interaction: idle, run, hit→idle, four cardinal views, three-quarter, distance, comparison tabs
- same-screen comparison: `f01-beauty-vs-runtime-1280x720.png`

## Decision

「AI生成したキャラクターシートを、コード内の箱の手描きではなく、再生成可能な3Dセル正本と共通rigへ変換する」工程は成立した。一方、Beauty Sheetの髪束、顔の可愛さ、衣装の重なりを商用品質で完全再現したとは判定しない。F-02では下段module sheetをhair／face／torso／arm／leg／packごとに独立復元し、全身visual hullを置き換える。
