# Notes: F.R.A.M. R08 Unified Character Art Pass

Updated: 2026-08-02

## Visual truth

- Full-screen North Star: `docs/concepts/visual-fidelity-v03/ideal-screen-c-stylized-3d.png`
- Character direction: `work/r07_character_depth/fram-r07-character-direction.png`
- R07 same-view evidence: `work/r07_character_depth/r07-gameplay-1280x720.jpg`
- R07 hero crop: `work/r07_character_depth/r07-hero-3x.png`
- R06／R07 comparison: `work/r07_character_depth/r06-r07-character-comparison.png`

## Confirmed constraints

- Visual surface remains high-density voxel／dot-derived realtime 3D.
- Default preset is a cute female SF field archivist, while future character creation supports other bodies, gender presentations, and species.
- Fixed diagonal camera and normal gameplay scale are the acceptance view.
- Public R01〜R06 and local R07 remain unchanged.

## Findings

- R07 hero crop reads at about two dominant masses: a rounded pale head and a narrow inherited torso／leg column. The head itself is finer than R06, but hair material values merge into one helmet-like shell.
- R07 body visibility still comes primarily from the R05 CC0-scaffold-derived surface. R07 adds only a torso-attached jacket outline and hip panels, so shoulder, arm, hand, leg, boot, and pack macro volumes are not authored in the same character grammar as the head.
- The existing rig already has semantic head／torso／upper arm／forearm／hand／thigh／calf／foot／equipment pivots and a right-hand weapon socket. R08 can preserve animation by hiding only visible voxel surfaces and attaching replacement cell groups to the same pivots.
- The R07 comparison proves more facial readability than R06, but the next gain must come from full-body silhouette and material separation rather than another global head scale change.

## Verification log

- R08はR07 articulated rig／right-hand weapon socketを保持し、継承visible surfaceを非表示にして15 semantic pivotへ新surfaceを接続した。
- 初期candidateのtorso／pack coordinate mismatch、material double tint、head Y compressionをsame-view browser captureで検出し、5回のcaptureで修正した。
- 最終browser captureは1,280×720、`R08`／`r08`、19,221 visible cells、scene-depth DOF有効、post fallbackなし、warning／error 0件。
- F.R.A.M.起動とS入力による正面向き／移動をlive browserで確認した。
- `design-qa.md`はR08 character-art scopeで`final result: passed`。Concept C全景／commercial parity／user acceptanceは別gate。
