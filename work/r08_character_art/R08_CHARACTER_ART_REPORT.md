# F.R.A.M. R08 Unified Character Art Report

Status: local candidate verified  
Date: 2026-08-02

## Verdict

R08はR07の「高密度head＋旧body」の混成を廃止し、hair、face、collar、short jacket、under-suit、arms、hands、legs、boots、archive pack、coral textileを15 articulated pivot上の同一semantic micro-voxel grammarへ置換した。通常gameplay cameraで19,221 visible cellsを描画し、R07のworld／HUD／戦闘／depth-aware softnessを維持する。

## Evidence

- Local route: `http://127.0.0.1:4175/game/r08/`
- Final capture: `work/r08_character_art/r08-unified-05-1280x720.png`
- Combined comparison: `work/r08_character_art/r08-design-comparison.png`
- Runtime: `experience=r08`、`prototypeVersion=R08`、`heroVoxelCells=19221`、`ultraDepthAwareDof=true`、fallbackなし。
- Browser: 起動、S移動／正面向き、console warning／error 0件。
- Design QA: project root `design-qa.md`、`final result: passed`（R08 character-art scope）。

## Remaining gates

- ユーザーのvisual review。
- dialogue／character creator close-upの表情と髪secondary motion。
- Concept C全景、commercial HD-2D parity、time／weather／equipment variationの別gate。
- 明示指示がないためGitHub push／Pages deployは未実施。公開R06とcatalogは変更していない。
