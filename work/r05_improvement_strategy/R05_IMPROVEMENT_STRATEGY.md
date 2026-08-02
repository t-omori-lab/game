# F.R.A.M. R05 改善・実装方針

Status: audit complete / runtime・public buildは未変更  
Date: 2026-08-02

## 結論

R05は方向として前進したが、次版は「今の数値を少し調整する」段階ではない。次の四つをそれぞれ構造から直す。

1. `/game/`の重さは設計上の問題である。catalogが5世代分の大画像を一度に読むうえ、root service workerがR01〜R05のlinked assetを初回訪問時からprecacheしている。保存版を残すことと、保存版を入口で全部downloadすることは分離する。
2. 現在のminiature blurは実際の奥行きを見ず、画面Y座標だけで上下をぼかしている。強度調整ではConcept Cへ届かない。既定OFFを経て、depth-aware DOFへ置換する。
3. 主人公は知覚上たしかに細長い。ただし頭身だけが原因ではない。長い脚とcoat、左右対称、粒状の丸cell、髪と衣装の明度融合、正面の顔が見えないことを同時に直す。高密度voxelは維持する。
4. UIはminimalではなく、必要な情報まで非表示になっている。常時表示、状況表示、初回学習、menuを分けたdynamic HUDへ再設計し、mini-map／marker／入力説明を実装する。

次版は、都市partを増やすより先に、`fast shell → sharp visual baseline → character preset選定 → dynamic HUD → depth-aware DOF`の順で作る。Concept Cは引き続きNorth Starであり、別の一般的な3D gameへ寄せない。

## 現状監査

| 課題 | 確認した事実 | 判定 |
|---|---|---|
| `/game/`の初期表示 | 5枚のcard画像をCSS backgroundとして同時指定。R01、R02は各2,478,394 bytes、R03 concept画像は2,656,918 bytes、R04 coverは157,117 bytes、R05 OGは161,711 bytesで、画像だけで約7.9 MB | P0。catalogの責務を超えている |
| service worker | root scopeのinstall中にcatalogとR01〜R05のHTMLを順番に取得し、各HTMLの`href`／`src` assetを`cache.addAll()`する。現production artifactでは38 files、実体約8.29 MB、gzip転送見積約5.61 MB。card画像との重複を除いても初回通信は約10.9 MBになる | P0。過去版は訪問時cacheへ変更する |
| R05起動 | current sessionのdirect navigation一標本は約7.2秒で、別のcold公開遷移は通常の10秒観測枠を超えた。main entryは1,019,606 bytes／gzip 304,317 bytes。加えてtexture生成、7,734 voxel decode／instance設定、scene組立、shader compileが同期経路にある | networkとmain-threadを別々に改修する |
| runtime生成 | 3 surface familyのDataTexture生成だけでもlocal初回約2.27秒、ArrayBuffer約32 MB。hero生成は約101 msで、31 draw可能mesh、約840,432 triangles、shadow mapでも再描画される | P0。法則は維持してbuild-time assetへcompileする |
| miniature blur | fragment shaderは`vUv.y`だけからblur量を算出し、実depthを参照しない。現設定は輪郭から最大約14〜18 CSS px先の色まで拾いうる | P0。方式を廃止する |
| 主人公 | metadataは4.8頭身だが、生成形状は約4.27頭身、runtime head scale後は単純比で約3.66頭身。それでも脚領域約49%、長いcoat、左右対称、巨大な手、粒状surfaceにより高身長・人形的に見える | 頭身labelではなく最終組立を測る |
| PC HUD | WASD、Shift guard、K dodge、Q／L skill、R item、1 weapon、E interactがあるが、PCではaction群と操作hintの多くをCSSで非表示にしている | P0。初見では理解できない |
| navigation | mini-map、目的地marker、任意pin、pause／controls、gamepad、R05 tap-to-moveは未実装 | 探索gameとして不足 |

公開画面とConcept Cは1280×720の同一viewportで保存し、full viewとhero cropを確認した。Concept Cの中心routeと主人公はほぼsharpで、softnessは実際の前景・遠景と光へ限定される。R05のような水平帯の境界は見えない。

## 1. 読み込みと実行時負荷

### 1.1 Catalogを軽い入口へ戻す

- cardをCSS backgroundから`<picture><img>`へ変更する。
- R05だけ`fetchpriority="high"`、R04は`auto`、R03〜R01は`loading="lazy" decoding="async"`とする。
- catalog専用thumbnailを640×360程度のAVIF／WebPで生成し、最新1枚100 KB前後、5枚すべてを開いても500 KB以下を目標にする。保存版のOG／原画像は変更しない。
- root service workerのinstall cacheはcatalog HTML、catalog CSS／JS、icon、manifest、最新thumbnailだけに限定する。
- R01〜R05はそれぞれのrouteを実際に開いたときだけ、そのscopeでcacheする。root workerからarchive assetの全precacheを外す。
- cache version更新時も全保存版を再downloadしない。

保存版はURLとhashで残し、network上の取得は遅延させる。この二つは矛盾しない。

### 1.2 R05の「まず見える」と「遊べる」を分ける

起動を四段階へ分ける。

1. **Shell visible** — title、start、軽量なactual-gameplay previewを即表示する。
2. **Engine import** — user startまたはidle後にrendererをdynamic importする。
3. **World ready** — approved asset packを非同期decode／GPU uploadする。
4. **Interactive first frame** — shader compileとsimulation接続後にpreviewからcross-fadeする。

Viteのdynamic importでrenderer chunkを分離し、Three.jsの`compileAsync()`で対応環境のparallel shader compileを使う。textureはruntimeで1024² DataTextureを同期生成せず、build時にbakeしたKTX2／BasisまたはWebP packへ移す。heroのcell transform／material bucketもbuild時にbinary bufferへcompileし、必要ならworkerでdecodeする。

heroの7,734 cellはauthoring truthとして残してよいが、各RoundedBoxを最終描画単位にしない。内部面を除去したindexed outer surfaceへcompileし、PC masterで40〜80k triangles／1〜4 draw calls、shadow proxyは2〜5k trianglesを開始budgetにする。見えるvoxel gridと、GPUへ渡すgeometryの粒度は分離できる。

### 1.3 計測をUI labelではなくtimelineにする

次をPerformance markとして残す。

- `catalog-shell-visible`
- `catalog-latest-card-visible`
- `r05-shell-visible`
- `engine-imported`
- `world-assets-decoded`
- `shader-ready`
- `first-interactive-frame`
- `first-input-response`

同時にresource timing、long task、GPU draw call／triangle、cold／warm cacheを分ける。現在の一回約7.2秒は問題発見の標本であり、正式な性能結果にはしない。

### 1.4 暫定budget

| Gate | PC desktop | iPhone 16 Pro tier |
|---|---:|---:|
| catalog first visual | 1.0秒以内 | 1.5秒以内 |
| catalog initial transfer | shell 350 KB以下、visible thumbnail込み500 KB以下 | 同左 |
| service worker install | 150 KB以下 | 150 KB以下 |
| R05 shell visible | 1.2秒以内 | 1.8秒以内 |
| startからinteractive | 2.5秒以内 | 4.0秒以内 |
| single main-thread task | 50 ms未満 | 50 ms未満を目標 |
| play frame | median 16.7 ms、p95 22 ms以下 | quality tier別に実機決定 |

このbudgetは次版の計測開始値であり、実機で更新する。

PC Ultraをvisual ceilingとして残しつつ、最初の一枚は軽いrendererで出し、GPU capabilityとframe budget確認後にHigh／Ultraへ上げる。MSAA、SMAA、GTAO、bloom、DOFは「全部ON」を品質の証拠にせず、同一画面で寄与とcostを測ってpreset化する。

## 2. Concept C型のminiature depthと光

### 2.1 現在のbanded blurを既定OFFにする

現方式はdepth of fieldではない。建物、地面、主人公が同じ画面高にあれば同じだけぼけ、depth edgeを跨いで色が漏れる。`Sharp Audit`を次版の最初の正本にし、造形、material、lightをblurなしで合格させる。

### 2.2 Depth-aware DOFへ置換する

color＋depth bufferからcircle of confusionを計算し、heroのworld depthをfocus planeとする。

- 主人公、同行者、攻撃対象、telegraph、loot、interaction objectはsharp maskで再合成する。
- focus depthの前後180 world unitsは0〜0.75 CSS pxに留める。
- 中遠景は1.0〜2.5 pxへ緩やかに増やす。
- 本当に近い非操作植生だけ最大3.5 pxを許容する。
- 深度差の大きいsampleを棄却するbilateral／depth rejectionで輪郭越しの色漏れを防ぐ。
- worldだけに適用し、DOM HUD、marker、文字は常にsharpにする。
- CSS pixel基準で管理し、DPRによって見た目のblur幅を変えない。

品質presetは次の三つに限定する。

| Preset | 近景／遠景最大 | 用途 |
|---|---:|---|
| Sharp Audit | 0／0 px | 造形・surface・UI検査 |
| C Gameplay | 3.5／2.5 px | 通常playの既定 |
| Diorama Photo | 5／4 px | photo mode／短い演出だけ |

Three.jsの`BokehPass`はdepth-of-fieldの技術確認には使えるが、最終版はactor mask、CSS-pixel normalization、depth-edge rejectionを持つproject専用passが必要である。

### 2.3 Cとの差はblurだけではない

- dark greenの全画面washと強いvignetteを弱める。
- warm directional sun、cool shadow／water、wet specular、植物の透過光を分離する。
- white hairとcoatが一体化しないよう、隣接明度差12〜15 L*を確保する。
- 試作開始値はkey 2.7〜3.0、sky 0.36〜0.45、environment 0.18〜0.25、rim 0.25〜0.38、CSS contrast 1.00〜1.05とする。
- asphalt、concrete、wet patch、foliage、metalをroughnessとnormalの異なるmaterial familyにする。全体をbloomで光らせない。

比較はConcept C、Sharp Audit、C Gameplayを同じ1280×720／2560×1440、同じcamera、時刻、pose、game stateで横並びにする。水平なblur境界、heroの溶け、telegraphの不鮮明が一つでも見えれば不合格とする。

## 3. 可愛い高密度voxel少女

### 3.1 「頭身が高すぎるか」への回答

知覚上は高すぎる。ただし、単純に頭をさらに大きくするだけでは幼い頭を載せた長い人形になる。脚、coat、手、髪、pose、色面を一緒に設計し直す。

第一候補は**F-01B Archive Surveyor、4.05頭身**とする。

- 全高88〜94 cell、頭部22〜23 cell。
- 脚は全高の38〜41%へ短縮する。
- 肩幅は頭幅の1.35〜1.48倍、腰幅は0.78〜0.88倍。
- 手は頭高の20〜26%。現状の大きな手を縮める。
- coat裾は地面から全高の38〜42%、裾幅は頭幅の1.15〜1.30倍。
- normal gameplayでは画面高の14〜17%、基準15.5%を占める。
- 初期向きはcameraへ正面〜前3/4を見せる。背面だけで「可愛い」を判定しない。

### 3.2 Surface sampleからsemantic voxel volumeへ

現在の「汎用女性mesh表面を細かくsampleする」生成を最終造形に使わない。CC0 modelはbone、joint、可動域の参考だけにする。

head、face、hair、ribcage、pelvis、limb、coat、packを別々の意味あるvoxel volume／maskとして生成する。最初にmacro silhouette、次に髪・衣装のmeso cluster、最後に目、留め具、機器のmicro accentを置く。cell数を増やすことを品質指標にしない。

- faceは丸い別primitiveではなく顔面gridへ統合する。
- 目は2×3 cell前後、iris 1×2、highlight 1 cell、眉／上まつ毛2〜3 cell、口2×1 cellから試す。
- 対称twin bunを撤去し、非対称bob＋片側の細い編み髪／短いponyを第一候補にする。
- hairは毛束ごとの2〜4色、clothは3〜5 cell単位の相関色面とし、cellごとのrandom点描をやめる。
- cellは98.5〜100%幅、bevelは0〜1.5%。現状の丸く隙間のあるbead感をなくす。
- cloth、skin、hair、metal、emissiveごとにmaterial responseを分ける。
- 左右完全対称を崩し、肩／腰の逆捻り2〜4°、肘12〜20°、腕外開き6〜10°、足先外向き10〜14°をidleへ入れる。
- weaponは中世剣に見せず、coil、service latch、heat vent、archive signalを読めるSF field toolとする。

### 3.3 三presetをcode前に比較する

| Preset | 頭身 | 方向 | 主なrisk |
|---|---:|---|---|
| F-01A Compact Runner | 3.75 | 大きい頭、短い非対称bob、短いsplit coat | 幼い玩具へ寄る |
| **F-01B Archive Surveyor** | **4.05** | bob＋細い片編み、中腿coat、狭い肩、技術pack | 推奨 |
| F-01C Longline Scout | 4.35 | half coat、少し長い脚、強いscarf | 現在の細長さへ戻る |

1280×720、同じcamera／light／画面占有15.5%、まずDOFなしで、正面、前3/4、後3/4、背面、idle、run接地、通常攻撃を生成する。通常倍率と3倍cropの双方で、顔、髪、手、coat、SF module、weaponが読める一案だけをruntimeへ進める。

テストもmetadataの`4.8`やcell数だけでなく、最終組立後の頭身、脚比率、肩幅、手、screen占有、front-view face visibilityを実測する。

## 4. Dynamic HUDと操作理解

必要なのは「常に大量表示」でも「常に非表示」でもなく、状況で出入りする情報体系である。Returnalの公式UX解説と同じく、即時判断は視線中心、二次情報は周辺、危機時は視覚・音・振動を重ねる。本projectではこれをF.R.A.M.の野外観測moduleとして表現する。

### 4.1 PC探索時の標準HUD

- **左上** — F.R.A.M. HP、状態異常、manual skill energy／ready。
- **右上** — 150〜180 pxのmini-map。主人公の向き、発見済み道路／水路／建物、目的地、任意pin、発見済み遺物／異常信号／拠点候補。
- **mini-map直下** — 現在目標を一行、距離、必要時だけ次action。
- **左下** — 現weapon／build、切替key、比較可能badge。
- **右下** — manual decisionだけ。大技、防御／回避、回復。調査は接近時だけ出す。
- **world／中心付近** — 実際のauto-attack target、射程成立、windup／recover、敵予兆、off-screen danger。

通常攻撃buttonは置かない。ただし「誰を狙うか」「間合いが成立したか」「攻撃phase」は読めるようにする。

### 4.2 Smartphoneとgamepad

- 左下virtual stick 112〜128 px。
- 右下manual skill 72〜88 px、guard／dodge 52〜60 px、item 48〜56 px。
- context actionは必要時だけ同じthumb zoneへ出す。
- mini-mapは右上96〜112 px、objectiveはpin＋距離へcollapseする。
- safe area、片手操作、button位置変更、HUD scaleを設定可能にする。
- `pointer:fine`だけで決めず、最後に使った入力を`keyboard / gamepad / touch`で追跡し、button glyphとHUDを即時切替する。

Diablo Immortalの公式説明も、mobileとPCで機能を保ったままHUDをscaleし、WASD、controller自動認識、key remap、mobile skill button位置変更を用意している。F.R.A.M.も「PCでは操作を隠す」のではなく、同じ機能を入力方式に合わせて表現する。

### 4.3 Mini-map／markerの実装

第二の3D cameraを描画しない。

1. 開発時にroad、water、building outline、collision、landmarkから軽量な2D map dataを生成する。
2. runtimeはCanvas 2Dを10 Hz程度で更新し、static layerとplayer／quest／observed signalだけを重ねる。
3. 未踏部はfog-of-recordとし、F.R.A.M.が観測したrouteだけをarchiveする。
4. world markerは既存cameraでworld座標をscreenへ投影し、画面外ではedgeへclampした方向markerと距離へ変える。
5. 未発見loot／enemyを万能radarとして表示しない。scan、地形、依頼情報に因果を持たせる。

目的地はmapとmini-mapの双方へ出し、player pinを置けるようにする。これは探索の迷いをなくすだけでなく、「世界を記録する主人公」というF.R.A.M.の概念をgameplayへ接続する。

### 4.4 初回onboarding

長い説明画面を一度に出さず、行動が成功するまで一件ずつ示す。

1. 開始直後 — 現在の入力deviceで移動。
2. 初target — 通常攻撃は自動、位置と向きが重要。
3. 初telegraph — guard／dodge。成功まで残す。
4. skill ready — Q／controller glyph／touch buttonとcooldown ring。
5. 初遺物 — interact、回収、短い効果card。
6. safety — weapon switchと比較。
7. pause menu — Controlsからいつでも再確認。

目標は、説明を読んだことではなく、30秒以内にmove＋auto-engage、90秒以内にmanual skill、3分以内にguard／item／objective navigationを成功させること。

### 4.5 Pause／menu

次版の最低構成は、Map、目的／依頼、Equipment／Build、Inventory／Relic compare、F.R.A.M. Archive、Controls、Settings、Resume／Exit。後続でCompanion、World Memory、Baseを追加する。

UI visualはdark glass cardの増築ではなく、野外観測機器として統一する。

- 墨緑の半透明面、象牙色本文。
- teal＝観測／ready、amber＝注意／charge、coral＝danger。
- 1 pxの精密な区切り、切り欠き、機器label。過剰な角丸を避ける。
- 日本語は可読性の高いgothic、英数字だけcondensed。
- 常時点滅を避け、状態変化だけ120〜180 msで応答する。
- Unicode symbolではなく一貫した24 px icon setを使う。

### 4.6 実装構成

- `deriveR05HudViewModel()` — simulation、combat presentation、quest、input device、tutorialから表示stateを純粋関数で導出。
- `R05Hud` — vitals、objective、loadout、action、target、toast。
- `MinimapCanvas` — generated static map＋dynamic marker。
- `MarkerProjection` — world／off-screen marker。
- `InputRouter` — keyboard、gamepad、touch、last-used detection。
- `TutorialDirector` — 成功条件で進むonboarding。
- `PauseMenu` — map、equipment、archive、controls、settings。

現在の巨大なlayout／update関数へ条件を継ぎ足さない。HUDはsimulationと同じtarget IDを正本にし、表示中の敵HPとauto-attack対象の不一致を禁止する。また「J 武器で破壊」のように半自動戦闘と矛盾する説明を修正する。

## 5. Figmaと画像生成

今回は新しい全画面conceptを生成し直す必要はない。Concept CがNorth Starとして確定しているため、次は実装判断に必要な狭い比較へ生成を使う。

### Figmaを先に使うもの

今回保存したR05 actual screenshotを背景に、同じcomponent setで次の5画面を作る。

1. PC探索
2. PC戦闘
3. iPhone 16 Pro探索
4. iPhone 16 Pro戦闘
5. full map＋relic compare

Figmaでは情報量、thumb reach、safe area、文字、marker重なり、状態遷移を決める。操作設計が決まるまでUIの表層をruntimeへ実装しない。

### ImageGenを使うもの

- F-01A／B／C character sheet。正面、前3/4、後3/4、背面、同じSF装備、同じvoxel density。
- F.R.A.M.野外観測HUDのsurface treatment三案。Figma wireframeのslot位置を変えない。
- 必要なら、選定characterをConcept C／R05 worldへ同じscaleで合成したgameplay確認。

生成物は「綺麗だから採用」せず、StyleProfile／AssetDNA、seed、prompt、source image、SHA-256、human correction、採否理由を保存し、approved packだけをbuildへ入れる。

## 6. 次版の実装順

### Milestone A — Fast catalog and boot

1. root service workerの全archive precacheを廃止。
2. lazy thumbnailとroute-scoped cache。
3. shell／engine dynamic split、performance mark。
4. cold／warmのPC計測。

**合格:** `/game/`を開いただけでR01〜R05 assetをdownloadせず、catalog first visualとR05 startが暫定budget内。

### Milestone B — Sharp Beauty Baseline

1. banded blur既定OFF。
2. contrast／vignette／light balanceを調整。
3. Cと同一viewportのSharp Auditを作る。

**合格:** blurなしでもroad、wet surface、vegetation、actorがC型の光・色・素材階層を持つ。

### Milestone C — F-01 character gate

1. F-01A／B／Cをimage／voxel specで比較。
2. userが一案を選定。
3. semantic voxel generator、4方向、pose、materialへ実装。

**合格:** normal gameplay sizeのfront／3/4で「可愛い少女」「SF探索者」「高密度voxel」が説明なしで同時に読める。user選定前に一案へ固定しない。

### Milestone D — HUD/navigation gate

1. Figma 5 stateを作成、比較。
2. HudViewModel、mini-map、marker、onboarding、pause／controlsを実装。
3. keyboard、gamepad、touchで表示を切り替える。

**合格:** 初見playで30秒以内にauto-engage、90秒以内にmanual skill、3分以内にguard／item／objective navigationを成功できる。操作一覧をいつでも開ける。

### Milestone E — C Gameplay DOF

1. depth-aware CoC、depth rejection、actor mask。
2. Sharp／C Gameplay／Photo preset。
3. PC Ultraとmobile tierのperformance比較。

**合格:** 水平blur帯が見えず、hero、target、telegraph、markerはsharpなまま、実depthに沿うminiature softnessがConcept C比較で成立する。

## 7. 次版でやらないこと

- 重さと画面基盤を直す前に都市buildingを大量追加しない。
- current band blurをさらに強くしてConcept Cへ近づけようとしない。
- 高密度voxelを捨ててordinary smooth 3D characterへ置換しない。
- mini-mapのために第二のrealtime 3D cameraを追加しない。
- UIを「少ないほど美しい」として操作情報まで隠さない。
- Figma／ImageGenの静止画だけを実装完了やcommercial-quality合格と扱わない。

## 参考にする公式実装原則

- Three.js `WebGLRenderer.compileAsync()` — shader compileによる不要なstallを避けるための非同期compile。
- Three.js `KTX2Loader` — hardwareに応じたGPU圧縮texture formatへtranscodeする。
- Three.js `BokehPass` — depth-of-field passの技術baseline。F.R.A.M.ではmask／edge rejectionを追加する。
- Vite dynamic import — renderer／world chunkのlazy split。
- MDN service worker／`Cache.addAll()` — install時precacheは指定assetを取得するため、scopeとprecache listを小さく保つ。
- Returnal公式UX解説 — critical informationは視線中心、二次情報は周辺、mapも世界固有の表現へ統合する。
- Diablo Immortal公式PC／accessibility解説 — mobile／PCで機能を保ち、HUD scale、WASD、controller検出、remap、touch button位置をplatformに合わせる。
- Zelda: Tears of the Kingdom公式guide — destinationをmapとmini-mapへ同時に示し、controlsをいつでも確認できる。

## 証拠artifact

- `evidence/public-root-1280x720.jpg`
- `evidence/public-r05-intro-1280x720.jpg`
- `evidence/public-r05-gameplay-1280x720.jpg`
- Concept C正本: `docs/concepts/visual-fidelity-v03/ideal-screen-c-stylized-3d.png`

この文書は、2026-08-02の公開版、local production artifact、現source、同一viewport screenshotの監査に基づく。iPhone 16 Proのcold load、Safari／PWA、発熱、battery、true HDRは未計測である。
