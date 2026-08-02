# F.R.A.M. R06 Release Report

Status: deployed and public-browser verified  
Date: 2026-08-02

## Verdict

R06 release is **GO and deployed**. R05を独立保存し、入口の過剰download、screen-Y banded blur、細長い主人公比率、navigation／操作説明欠如の四点を前進させた。Concept C／commercial art完成、depth-aware DOF、最終主人公採択は未達であり、R06はSharp Navigation Buildとして扱う。

## Local evidence

- Catalog: actual gameplay JPEG thumbnail、latestのみeager、archives lazy。
- Cache: root workerはcatalog shellのみ。R05／R06はroute-scoped worker。
- R05 archive: relative static bundle、snapshot metadata、15-file SHA-256 all OK。
- R06 optics: sharpPresentation=trueでbanded tilt-shift OFF。GTAO／bloom／SMAAは維持。
- R06 hero: 7,734 visible cells、Box cell、3.65-head compact proportion、semantic rig／weapon socket維持。
- R06 UI: 2D mini-map、player／enemy／target、objective bearing／distance、WASD／AUTO／Q／SHIFT／E／R guide。
- Automated: 32 test files／191 tests、strict TypeScript、production build passed。
- Browser: 1280×720 catalog、R06 active、R05 frozen archiveをlocal production artifactから確認。

## Public evidence

- Commit: `2fd05c2` on `main`.
- GitHub Actions: `Deploy GitHub Pages` run #17 completed successfully.
- Catalog: R06→R05→R04→R03→R02→R01。latest coverのみeager、archive 5件はlazy。
- Public R06: `sharpPresentation=true`、`ultraTiltShift=false`、`heroVoxelCells=7734`。mini-map、9m objective、WASD／AUTO／Q／SHIFT／E／R guideを実browserで確認。
- Public R05: `R05`／`r05`の独立titleと起動画面を維持。

## Remaining product gates

- ユーザーによる公開R06のvisual／game-feel評価。
- Concept Cと同等の可愛い少女造形、commercial art quality、depth-aware DOFの採択。
