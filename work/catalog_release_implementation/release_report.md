# Release Report: F.R.A.M. catalog and Forge FIELD

Status: local release candidate verified; public deployment pending.

## Implemented

- `/game/`を、actual R06 gameplay imageを主役にしたF.R.A.M.のgame-first landingへ再構築した。
- JavaScript到着前にも作品名、放浪RPG、AI-native開発研究、二つのCTAが読めるstatic first viewを追加した。
- public区分を`遊べるAI開発実験`、archive分類を`TECHNICAL EPOCHS / 技術エポック`へ変更した。
- catalog用R06 hero derivativeを720×405／94,317 bytesで追加し、archive画像はIntersectionObserver直前まで実`src`を持たせないhard gateへ変更した。
- Character Forge F-01へ`FIELD` presetを追加した。main gameと同じ固定斜めcamera方向、target screen height 16%、拡張floor／fog／world-scale referenceを用いる。

## Verification

- Vitest: 38 files／205 tests passed.
- strict TypeScript: passed.
- production build: passed.
- catalog first-view transfer概算: 約105 KB。scroll前のvisible raster 1件、archive image request 0件。
- desktop 1280×720: game identity、CTA、catalog構成、FIELD 16.3%、CLOSE→FIELD復帰16.2%、view lockを確認。
- mobile 390×844: catalog／Forge layout、横overflowなし、操作表示を確認。
- browser console: catalog／Forgeともerror 0、warning 0。

## Public confirmation

- Pending.

## Remaining limits

- User visual acceptance and iPhone 16 Pro real-device performance remain separate gates.
