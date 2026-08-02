# Design QA — Character Forge F-01

Reference: `work/r07_character_depth/fram-r07-character-direction.png`

Implementation: `http://127.0.0.1:5173/game/forge/f01/`

Comparison input: `work/character_forge_f01/f01-beauty-vs-runtime-1280x720.png`

Viewport: 1280 × 720, three-quarter view, close inspection, idle.

## Visual gate

| Priority | Area | Result | Action |
| --- | --- | --- | --- |
| P0 | Runtime and controls | passed | Build Sheetから実際の3Dセルを再構築し、視点・距離・モーション操作を有効化。 |
| P0 | Character identity | passed for F-01 | 白髪、顔、目、小頭身、技術ジャケット、graphite、coral、cyanを同じ人物として維持。Beauty Sheet完全一致は次段のmodule gate。 |
| P1 | Proportions | passed for pipeline proof | 小頭身と大頭部、短い四肢、技術ジャケットの主シルエットを維持。 |
| P1 | Three-dimensional volume | passed for pipeline proof | 単純visual hullの膨張をsemantic humanoid volumesで分離。正面・背面・3/4で破綻なく確認可能。 |
| P1 | Material and lighting | passed | アイボリー、グラファイト、肌、コーラル、シアンを別素材で表示。露出とブルームの白飛びを修正。 |
| P1 | Animation | passed | 共通7パーツリグでidle / run / hitが動作。 |
| P2 | UI legibility | passed | 1280×720で主要操作、比較画像、セル数、工程を一画面に表示。 |
| P2 | Responsive layout | passed for static policy | 固定倍率を使わず、touch-actionと狭幅layoutを実装しviewport policy testへ追加。実機visual QAはF-01 PC検証の外で未実施。 |

## Honest status

F-01は「AI生成シートを実際の再利用可能なリアルタイム3Dへ変換できるか」という限定工程に合格した。ただし、Beauty Sheetと同じ可愛さ・髪束・表情の商用品質ゲートには未達。次段は顔・髪・衣装をモジュール別に再構築し、単一の全身visual hullを置き換える。

final result: passed — Character Forge F-01 pipeline proof only; North Star／commercial character acceptance is not claimed
