# Task Plan: 画像生成から3Dボクセル資産を作る制作パイプラインの検討

## Goal

生成したキャラクターシートを3D化し、リグ・アニメーション・装備差分まで含む再利用可能な制作基盤にできるかを判断し、最小の実証工程を定める。

## Phases

- [x] Phase 1: 調査範囲と判断基準を定める
- [x] Phase 2: 現行R05〜R08、生成シート、実装基盤を監査する
- [x] Phase 3: 画像から3D、ボクセル化、リグ生成の現行技術を確認する
- [x] Phase 4: 推奨パイプライン、失敗条件、実証計画をまとめる

## Key Questions

1. 生成シートの外見を、ゲーム中の全方向・全動作で保てるか。
2. 完全自動化すべき工程と、人間またはAIエージェントによる修正を残す工程はどこか。
3. Three.jsベースの現行環境へ、どの形式と構造で受け渡すべきか。
4. 主人公で成立した工程を、装備、敵、同行者、アイテムへ拡張できるか。

## Decisions Made

- 既存のコード内ボクセル造形を延長する前提ではなく、外部で正本となる3D資産を制作して読み込む案を独立に評価する。
- 評価対象は静止画の類似だけでなく、背面、装備交換、アニメーション、LOD、商用利用可能性まで含める。
- 現Character SheetはBeauty Sheetとして固定し、別にorthographic modular Build Sheetを作る。
- 推奨経路は `image -> 3D draft -> semantic voxel canonical source -> shared rig -> compiled GLB`。raw generated meshは製品正本にしない。
- 次の最小実証は本編R09ではなく、主人公一体の独立Character Forgeとする。

## Errors Encountered

- なし。

## Status

**Complete** - local監査、現行技術確認、推奨パイプラインと最小実証計画を文書化済み。
