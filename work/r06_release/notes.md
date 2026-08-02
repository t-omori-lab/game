# Notes: F.R.A.M. R06 release

Updated: 2026-08-02

## Current state

- HEAD: `f80383d`; `origin/main`: `dea41e8` before this task.
- R05 is the current live Vite entry; R01–R04 are static snapshots.
- Pre-existing untracked files: 18 screenshots under `work/r05_fram_visual_pass/`; out of scope.

## Requirements and evidence

- R05をpublic/r05/のrelative bundle、route-scoped service worker、SNAPSHOT.json、SHA256SUMSへ凍結した。15件のchecksumは全件一致。
- catalog coverを720px JPEGへ変換し、R06だけeager、保存版はlazyにした。source thumbnail合計は約492 KiBで、旧card原寸画像約7.93 MiBを入口から除外した。
- root service workerはcatalog document／manifest／iconだけを管理し、R01〜R06 routeをinstall時にprecacheしない。
- R06はsharpPresentationでscreen-Y banded tilt-shiftを既定OFFにした。GTAO、bloom、SMAA、AgX、lightingは維持する。
- 主人公AssetDNAは3.65頭身のcompact presetへ更新し、cell geometryをRoundedBoxからBoxへ変更した。visible cell 7,734は維持。
- 2D mini-map、現在地、敵、目的地、方向／距離marker、PC操作guide、combat controllerと一致するtarget HUDを追加した。
- 1280×720 production browserでcatalog、R06 active、R05 archiveを確認。R06 DOMではWASD、AUTO、Q、SHIFT、E、R、mini-map、目的地9mが読める。
- strict TypeScript、Vitest 32 files／191 tests、production buildが合格。

## Errors

- 通常sandboxではpreview server listenがEPERM。許可済みのlocal previewとして4175へ起動して検査した。
- bundled pnpm scriptはshell内のnodeが見つからなかったため、bundle NodeでTypeScript／Vitest／Viteを直接実行した。
