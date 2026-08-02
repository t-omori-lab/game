# F.R.A.M. R07 Character and Depth Report

Status: local candidate complete; user review pending  
Date: 2026-08-02

## Verdict

R07はR06の「成人型scaffoldを全体scaleし、白いhair massへ小さいface pixelを足す」方式を打ち切り、頭部を独立したsemantic micro-voxel生成単位へ変更した。通常gameplay画角で顔、目、口、短いbob、小柄なsilhouetteが読めるところまでは前進した。

ただし、生成したcharacter directionと同等の可愛さ、衣装／体型、secondary motion、全方向readには未到達で、Concept C／commercial HD-2D合格とはしない。次はユーザーreviewで最大3差分へ絞る。

## Evidence

- Art direction: `fram-r07-character-direction.png`
- Same-view full frames: `r06-gameplay-1280x720.jpg`／`r07-gameplay-1280x720.jpg`
- 3× hero crops: `r06-hero-3x.png`／`r07-hero-3x.png`
- Comparison board: `r06-r07-character-comparison.png`
- R06: 7,734 visible cells、sharp baseline、screen-Y tilt-shift off。
- R07: 9,627 visible cells、0.56× head micro-cell、semantic face／hair／jacket、scene-depth DOF。
- R07 post: focus range 0.036、maximum blur 1.45px、edge threshold 0.0045、fallbackなし、HUD sharp。
- Automated: strict TypeScript、Vitest 34 files／195 tests、production build passed。

## Remaining gates

1. 顔／髪：C案directionとの差を、目、前髪、横髪、頭部materialのどれから直すか。
2. 衣装／体型：short jacket、肩幅、脚、archive pack、coral textileを通常画角でどこまで強めるか。
3. World softness：R07の1.45px depth-aware DOFを採択、さらに弱める、sharpへ戻すのどれにするか。

Public version化、catalog追加、snapshot、service worker、deployは未実施。
