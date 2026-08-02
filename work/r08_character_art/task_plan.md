# Task Plan: F.R.A.M. R08 Unified Character Art Pass

Updated: 2026-08-02

## Goal

R07の因果world／gameplay／depth-aware softnessを保ちつつ、選定済みConcept CとR07 character directionを通常gameplay scaleでより忠実に再現する、統一された高密度voxel少女R08 local candidateを作る。

## Acceptance contract

- R01〜R07と公開catalogを変更しない。R08は独立local route／entryとして追加する。
- Visual targetは`docs/concepts/visual-fidelity-v03/ideal-screen-c-stylized-3d.png`と`work/r07_character_depth/fram-r07-character-direction.png`。
- 普通のsmooth 3Dへ戻さず、visible micro-voxel／rich pixel-art-like surfaceを維持する。
- 頭部だけでなく、face、layered hair、neck、shoulders、short jacket、under-suit、hands、legs、boots、archive pack、coral textile、cyan toolを同じsemantic art grammarで統一する。
- 同一1280×720 gameplay viewportでR07とR08を比較し、通常画角でも少女、SF field archivist、装備silhouetteが読める。
- R07のmini-map、marker、操作guide、半自動通常攻撃、手動大技、scene-depth DOFを維持する。
- strict TypeScript、全tests、production build、local production browser、same-view design QAが合格する。
- public push／deployはユーザーの明示指示があるまで行わない。

## Phases

- [x] Phase 1: Project state, target images, and R07 evidence refresh
- [x] Phase 2: R07 rig／screen-space proportion measurement
- [x] Phase 3: R08 unified semantic character implementation
- [x] Phase 4: Same-viewport browser comparison and revision
- [x] Phase 5: Design QA, automated checks, docs, and exact-file local commit

## Key questions

1. R07がまだ丸い頭部と旧成人型bodyに見える原因を、normal gameplay cropからどう数値化するか。
2. 既存articulated rig／weapon socketを保持しながら、visible body surfaceだけをR08 semantic volumeへ置換できるか。
3. C案の可愛さとSF identityを、顔の拡大ではなくsilhouette、髪layer、肩、衣装、packの関係でどう読むか。

## Decisions made

- R07を直接改変せず、R08 route／presentation／hero visualを追加する。
- R08は新しい都市partを追加せず、character art一体の知覚品質に集中する。
- R07 depth-aware DOF値をR08にも継承し、character変更とpost変更を同時に評価しない。
- Product Design saved contextは未設定。現在のproject正本、Concept C、R07 direction／comparisonをvisual groundingとする。

## Errors encountered

- Direct `vite-node` measurement command failed because this repository does not install a standalone `vite-node` entry. Continue with source-derived rig pivots, existing same-view browser evidence, and focused Vitest/browser checks instead of adding a temporary runtime dependency.

## Status

**Complete** — R08 local candidateはbrowser design QA、strict TypeScript、199 tests、production buildに合格。公開R06／catalog／保存版は変更せず、deployは未実施。
