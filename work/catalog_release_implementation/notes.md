# Notes: F.R.A.M. catalog and Forge FIELD release

## Confirmed baseline

- branchは`main`、開始HEADは`bd000ec`、`origin/main`より1 commit先行。
- 既存の未追跡18 PNGは過去のR05 visual workであり、本releaseの所有対象外。
- current public catalogはF-01、R06、R05、R04の4画像を初期取得し、約403 KBが画像である。
- current F-01は`CLOSE` 9.1、`GAME` 12.8、manual max 16でactual gameplay-distanceに届かない。

## Evidence log

- `index.html`へJS前から読めるgame identity、actual R06 hero、二つのCTAを追加した。
- catalog runtimeをgame hero → AI-native statement → playable builds → technical epochsの順へ再構築した。
- release／epoch imageはreal `src`を持たず、IntersectionObserverの220px手前で設定する方式へ変更した。
- R06 hero derivativeは720×405／94,317 bytes。canonical `r06.jpg`は保持した。
- F-01へ`CLOSE / FULL / FIELD`を追加し、FIELDはmain gameと同じ510:680:510の固定斜め方向、target occupancy 0.16の自動fit、world-scale road／structure referenceを使う。
- 全Vitestは38 files／205 tests、strict TypeScript、production buildに合格した。
- production previewのdesktop 1280×720で、catalogのgame-first first view、F-01 FIELD 16.3%を確認した。CLOSEからFIELDへ戻した再fitは16.2%だった。
- mobile 390×844でcatalog／Forgeのlayoutと操作表示を確認し、catalogは`clientWidth = scrollWidth = 390`だった。
- scroll前のcatalogで実`src`を持つrasterはR06 hero 1件だけで、R06〜R01／F-01 archiveは全てdeferredのままだった。browser consoleのerror／warningはcatalog／Forgeとも0件。
