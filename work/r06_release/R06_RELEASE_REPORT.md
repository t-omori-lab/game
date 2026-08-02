# F.R.A.M. R06 Release Report

Status: local candidate verified; public verification pending  
Date: 2026-08-02

## Verdict

R06 local release candidate is **GO for deploy**. R05を独立保存し、入口の過剰download、screen-Y banded blur、細長い主人公比率、navigation／操作説明欠如の四点を前進させた。Concept C／commercial art完成、depth-aware DOF、最終主人公採択は未達であり、R06はSharp Navigation Buildとして扱う。

## Local evidence

- Catalog: actual gameplay JPEG thumbnail、latestのみeager、archives lazy。
- Cache: root workerはcatalog shellのみ。R05／R06はroute-scoped worker。
- R05 archive: relative static bundle、snapshot metadata、15-file SHA-256 all OK。
- R06 optics: sharpPresentation=trueでbanded tilt-shift OFF。GTAO／bloom／SMAAは維持。
- R06 hero: 7,734 visible cells、Box cell、3.65-head compact proportion、semantic rig／weapon socket維持。
- R06 UI: 2D mini-map、player／enemy／target、objective bearing／distance、WASD／AUTO／Q／SHIFT／E／R guide。
- Automated: 32 test files／191 tests、strict TypeScript、production build passed。
- Browser: 1280×720 catalog、R06 active、R05 frozen archiveをlocal production artifactから確認。

## Remaining release gates

- exact-file commit and push
- GitHub Actions Pages deploy success
- public catalog newest-first and public R05／R06 browser verification
