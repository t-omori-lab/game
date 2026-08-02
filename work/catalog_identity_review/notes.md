# Notes: F.R.A.M. catalog identity and performance review

## Confirmed inputs

- ユーザーは、catalogの初見でゲーム開発、ゲーム名F.R.A.M.、AI-native開発研究のいずれも伝わらないと評価した。
- `開発の節目`は不採択。`技術エポック`の方がまだ良く、別案も求められている。
- 保存版説明の「新しくなるたびに、失われる手触りもある」は意味不明として不採択。
- F-01は現在より約3倍小さい、実ゲーム画面相当までcameraを引ける必要がある。
- 公開catalogは前回の最適化後も体感上重い。

## Evidence to collect

- [x] 公開catalogの初期asset inventory
- [x] catalog sourceのasset参照、eager／lazy load、bundle構成
- [x] F-01 camera distance／zoom state／framing constraints
- [x] current hero copyとsection taxonomy

## Confirmed findings

### Identity and hierarchy

- 公開画面は、最上段の`DEVELOPMENT ARCHIVE`、左列のbuild数、最初の大画像であるCharacter Forgeにより、ゲーム公式ページではなく開発ポートフォリオに見える。
- `F.R.A.M.`は大きいが、`GAME`、`RPG`、`今すぐ遊ぶ`がfirst viewにない。acronymの正体を知る前提の構成である。
- actual gameplay imageとlatest playable CTAがfirst viewにないため、何を操作する作品か視覚的にも伝わらない。
- AI-nativeの説明はF-01内にしかなく、catalog単体ではprojectの研究目的が読めない。
- `新しくなるたびに、失われる手触りもある`は、保存理由、比較価値、何が遊べるかを説明していない。

### Public catalog load

- 公開browserのfirst view asset inventoryは、HTMLに加えてcatalog script 2件、stylesheet 1件、画像4件を取得していた。
- 画像は`f01.jpg`、`r06.jpg`、`r05.jpg`、`r04.jpg`。release画像は`loading="lazy"`でも、browserの先読み距離内にあるため3件が初期取得された。
- current production artifact上の上記4画像は合計402,809 bytes。HTML、catalog CSS／JS／shared route chunkを加えると約422 KBであり、catalogとしては削減余地が大きい。
- root shellのgzip合計は7,316 bytesで、観測した初期inventoryの約98%は画像だった。Forge／Three.js bundleはroot初期表示へ混入していない。
- native lazy loadはnetwork hard gateではない。`content-visibility:auto`も画像取得を止めない。
- root HTMLは`#app`が空で、module scriptが取得・実行されるまで作品名もCTAも表示しない。bytes以上にblank first paintを感じさせる構造である。
- current root service workerは旧版の全archive precacheを既に廃止しており、現時点の主byte原因ではない。ただしcatalogをnetwork-firstで制御する価値は薄く、旧worker移行とstale表示の複雑さは残る。
- public HTMLの直接応答は今回の単発計測でTTFB約0.33秒。これは端末／低速回線全般の保証ではない。

### F-01 camera

- current `CLOSE` radiusは9.1、`GAME` radiusは12.8で、距離比は約1.41倍にすぎない。
- manual orbit zoomも`maxDistance = 16`で止まるため、現仕様ではcharacterを約3分の1へ縮小できない。
- current Forgeはperspective character-inspection camera、main gameはfixed diagonal orthographic cameraであり、単純にradiusだけ増やしても実gameplay compositionの確認にはならない。
- floor radius 9、grid 14、fog density 0.016のまま大きく引くと、小さいactorが空の灰色背景に浮くだけになる。
- next contractは`CLOSE / FULL / FIELD`の三段階とし、FIELDをcamera距離ではなくactorのscreen占有率とactual gameplay angleで定義する必要がある。

## Working hypotheses

- identity問題は文言単体ではなく、heroの第一階層が「開発archive」で、game artwork／play proposition／research labelの順序が逆であることが主因。
- load問題の第一原因は、catalog archive thumbnailがnative lazy-loadの先読み範囲へ入り、初回から取得されることである。空のHTML shellによる描画待ちが体感を悪化させる。paint effectはnetwork修正後に再計測する。
- F-01の`game`距離はcharacter review用の中距離に留まり、実gameplay scaleを測る第三presetとworld-scale referenceが欠けている可能性がある。

## Boundary

このreviewでは実装、deploy、公開状態の変更を行わない。
