# Visual Direction V2: Daylight Relic Frontier

Status: implementation target fixed; pending visual proof  
Updated: 2026-07-31

## Decision

Return to purpose/value. 現行画面は「暗い終末」を主役にしており、旅、生活、発見、自然に侵食される世界という企画の魅力を覆っている。小さな明度調整ではなく、worldの視覚命題を作り直す。

## Preserve

- fixed orthographic cameraと低解像度world render
- realtime 3D voxelとcrisp HTML HUD
- signal cyan、warning amber、enemy danger redの機能色
- blob shadow、統合geometry、低draw-call設計
- 手動戦闘で予兆とhitが判別できること

## Visual route

- First glance: 明るい空気、淡い遺構、草木と水の色。「この世界を歩きたい」が先に来る。
- Several seconds: 主人公、相棒候補、道、依頼対象、危険の順に読める。
- Close reading: 錆、ひび、花、通信標識、遺物の微光が文明と自然の履歴を語る。
- Danger: world全体を暗くせず、敵の局所色、予兆、影、sound layerで伝える。

## Working palette

- daylight and fog: pale gray-green `#c4d3c7`; `FogExp2` density `0.00025`
- town ground: sage stone `#64735f` / `#72816a`
- wild ground: moss and young leaf `#4f6b49` / `#55734f` / `#607c56` / `#6b865d`
- road: dry earth `#87684f` / `#9a7859`
- ruins: pale concrete `#767a72` / `#85867c`; structure highlight `#9b9b85`
- water: clear blue-green `#4d91a1`, opacity around `0.82`
- oxidation and roof: orange rust `#a76043`
- flowers: sparse ivory, yellow, pale blue accents; they must remain subordinate to signals and danger
- player: worldより一段高いvalue contrastと固有accent
- UI: opaque black panelを減らし、ivory／slateの半透明plateへ移行
- screen edge darkness: side opacity `0.08` / `0.10`; vignette begins near `68%` and ends near `0.12`
- enemy telegraph: saturated red-orange `#ed4034`, opacity approximately `0.34`–`0.84`

## Character readability contract

- 16³はbackground object用の基本規格として残し、characterの上限にはしない。
- playerと主要characterは非立方の可変gridを許可する。
- 初回のplayer規格は`16 wide × 24 high × 12 deep`。現行の約64 world-unit高を保つため、voxel sizeは`8/3`とする。
- 24段は内部360p描画で1 voxelが潰れにくい上限として選び、28段以上はcamera解像度を上げる段階で再評価する。
- 852×393で、頭、髪、顔面、胴、左右の腕、左右の脚、主武器が静止状態でも分離して見える。
- 色数を増やすだけでなく、輪郭、negative space、明度段階、accent配置で役割を分ける。
- player bodyは1 mesh／1 draw call、目標1,500 triangles以下とする。
- reference作品のsprite、衣装、顔、palette、animation frameは複製しない。

## Validation and stop rule

- 公開版と同じ852×393で、world中央の地形とplayerがHUDなしでも判別できる。
- grayscaleでもplayer silhouetteと道が背景から分離する。
- joystick＋actionを表示した状態で、重要world areaが黒overlayに埋もれない。
- 60fps表示、draw callsとtrianglesが現行budgetから大幅に逸脱しない。
- iPhone 16 Pro実機確認前は、Safari performanceや発熱を合格扱いにしない。
