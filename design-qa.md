# Design QA — F-01R Source-faithful Reconstruction Cell

Art authority: `work/r07_character_depth/fram-r07-character-direction.png`

Implementation: `/game/forge/f01/?candidate=f01r` and `/game/r09/?actor=f01r`

Comparison input: `work/f01r_fidelity_reconstruction_2026-08-08/evidence/f01-f02-f01r-comparison.png`

Viewport: 1280 × 720. Forge candidates use the same three-quarter／close preset; R09 uses the normal fixed gameplay camera.

## Visual gate

| Priority | Area | Result | Evidence |
| --- | --- | --- | --- |
| P0 | Exact asset identity | passed | Forge／R09でasset ID、source SHA-256、payload SHA-256、9,065 cells、20 modulesが一致。 |
| P0 | Runtime integration | passed | R09でloaded／ready／active、移動と手動大技、browser error 0を確認。 |
| P0 | Reproducible source | passed | 頭・顔・髪はversioned JSON→build-time compiler→schema v2 pack。runtime TypeScript cell patchなし。 |
| P1 | Face read | passed for reconstruction cell | F-02の横長maskを除去し、丸いskin face、大きな左右眼、小さい口、blush、連続した首を回復。 |
| P1 | Hair identity | passed for reconstruction cell | 白髪、非対称fringe、左右で長さの違うside locks、cowlick、cyan clipを別moduleで保持。Beauty Sheetの細い束感は次のsource correction対象。 |
| P1 | Gameplay silhouette | passed | 通常cameraで頭、顔、白いjacket、黒いinner suit、pack、toolが分離して読める。 |
| P2 | Comparison workflow | passed | F-01／F-02／F-01R切替と同条件captureを実装し、一枚のcomparison inputで評価。 |
| P2 | Honest scope | passed | bodyはF-01非頭部surfaceの暫定再利用。landmark／parameterはagent-authoredで、画像からの自動mask抽出は未実装。全身module化、Beauty完全一致、commercial quality、user art acceptanceは未主張。 |

## Human gate

「同じ人物」「可愛い女性型」としての最終採択はユーザーreviewまでpending。今回のpassは、頭部のsource correctionが同一compiled packとしてForgeとR09へ届くproduction loopに限定する。

final result: passed — F-01R source-faithful reconstruction-cell engineering and internal visual gate; user art acceptance remains pending
