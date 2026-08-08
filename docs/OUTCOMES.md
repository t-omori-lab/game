# Outcomes: ゲーム開発

Last updated: 2026-08-09

## Confirmed

- 2026-08-09、F-01正本のpayloadを保持したまま、R09のgameplay距離でのみsurface cleanupを行う版を実装・公開した。6近傍で本体から分離しgrid最下層二段だけにある33 cellsを除外して実表示を9,421 cellsとし、cell fill 1.01／edge radius 0.012 cell／詳細cell shadowなしへ調整した。GTAOを一時的に外した比較では黒い縦筋が残り、cell gapを閉じた比較で大幅に減ったため、GTAOはworld用に維持した。正本／派生物境界、versioned gameplay profile、pack integrity／topology audit、1280×720実画面captureを`fram-character-gameplay-fidelity` project-local skillへ固定した。strict TypeScript、Vitest 46 files／238 tests、production buildが合格し、implementation commit `f105e09`のGitHub Pages run 27（run ID `31269855944`）でbuild／deploy両jobが成功した。公開R09でもasset ID `fram.character.f01.gameplay-bridge-v1`、9,454 source／9,421 visible cells、正本payload SHA-256 `a77a7e0a15e0d3a62a95fcc87f77edbc8b972a593e41cc8cf673533af901abc1`、console／page error 0を再現した。公開`/game/`、`/game/r09/`、`/game/forge/f01/`、R01／R06／R08はHTTP 200だった。iPhone 16 Pro実機確認とキャラクター全体の最終art acceptanceは未完了である。
- 2026-08-08、公開Character Forge F-01に既存のcompiled 3D正本があるにもかかわらず、R09既定actorを別形状のF-01Rへ置換していた誤りを修正した。R09は再び`createF01Character()`から同じ`f01.surface-pack.json`を読み、asset ID `fram.character.f01.gameplay-bridge-v1`、9,454 cells、payload SHA-256 `a77a7e0a15e0d3a62a95fcc87f77edbc8b972a593e41cc8cf673533af901abc1`をproduction Chromeで確認した。F-01Rは`?actor=f01r`の比較用として保持した。Vitest 45 files／236 tests、strict TypeScript、production build、browser console error 0に合格した。これはlocal correctionであり、public deployとuser visual acceptanceは未完了である。
- 2026-08-08、F-02をtechnical evidenceとして保持し、F-01R `Source-faithful Reconstruction Cell`をlocal実装した。F-01の非頭部surfaceを暫定再利用しつつ、Beauty Sheetで人物性を決める頭、顔、hair shell、前髪、左右横髪、cowlick、hair ridge、目、口、blush、clip、neck collarをversion付きJSONへ分離し、deterministic compilerでschema v2／20 modules／9,065 surface cellsへ変換した。ForgeとR09は同じasset factoryを使い、asset ID、source SHA-256 `8fd93a6f…`、payload SHA-256 `7f5a3900…`、cell数、module数が一致した。F-01／F-02／F-01Rの同条件比較、R09の移動／手動大技、browser error 0、strict TypeScript、Vitest 45 files／235 tests、production buildを確認した。これは頭部で生成loopを証明したlocal candidateであり、Beauty Sheet完全一致、全身module化、user art acceptance、性能再測定、iPhone 16 Pro、public deployの完了ではない。
- 2026-08-08、R09B `Playable Character Bridge`をlocal実装した。Character Forge F-01のcompiled 9,454-cell packをR09専用dynamic adapterで実gameplayへ接続し、1280×720／2560×1440のcaptureからfailしたface、torso/jacket、limbs、backpack、combat poseだけへ706 cellsを追加したF-02を作った。ForgeとR09は同じ`fram.character.f02.gameplay-readability-v1`／10,160 cellsを使い、W/A/S/Dの実移動・simulation facing・rendered yaw、manual skill、auto-basic、weapon socket、旧R05 actor fallback、browser error 0を確認した。R09Aの四分岐、二周目差分、reload、retreatも再合格した。詳細voxelのgameplay shadow passを既存blob shadowへ集約した後、local desktop Chrome 3-run medianでR06／R09はfirst-controllable 979.2／940.5 ms、transfer 789,846／832,495 B、frame p95 33.8／35.0 ms、long frame 0となり10% gateを通過した。strict TypeScript、Vitest 43 files／231 tests、production buildも合格した。これはlocal visual review candidateであり、user art acceptance、commercial-quality parity、iPhone 16 Pro、public deployの完了ではない。
- 2026-08-08、R09A `First Memory Logic Proof`をlocal実装した。永続world memoryを一遠征のHP／敵／位置から分離し、二site×二moduleの四分岐、回収物消費、拠点確保、撤退、二回目の視覚／gameplay差分、R09専用IndexedDB saveとreloadを同じR06由来sceneで完走した。desktop Chromeのproduction previewでは全四分岐と撤退が合格し、各routeでrange-based auto-basicと手動大技eventを確認、console／page errorは0件だった。strict TypeScript、Vitest 39 files／217 tests、production buildも合格した。R09対R06のlocal性能gateはfirst-controllable 988.0／985.0 ms、transfer 794,338／789,565 bytes、frame p95 18.5／18.6 ms、50ms超long frame 0で合格した。これはpublic deploy、iPhone 16 Pro実機、userが因果を90秒以内に理解できること、面白さ、visual acceptanceの確認ではない。
- 2026-08-03、commit `b6cd199`を`main`へpushし、GitHub Actions `Deploy GitHub Pages` run #26のbuild／deploy成功を確認した。root catalogのService Worker登録を終了し、既存root registrationと`fram-catalog-*`／旧root shell cacheだけを次回成功読込時に退役させる。R01〜R08のroute-scoped worker／cacheは保持した。公開HTML、catalog JS、retirement workerはHTTPS 200で、公開workerにfetch handlerがなく、catalog JSにroot worker登録がないことを確認した。strict TypeScript、Vitest 38 files／205 tests、production buildも合格した。これはiPhone実機のcold／warm時間や全既存利用者のcache退役完了を意味しない。
- 2026-08-03、commit `d553898`を`main`へpushし、GitHub Actions `Deploy GitHub Pages` run #23のbuild／deploy成功を確認した。公開catalogはfull stylesheetへのrender-blocking linkを持たず、static first viewの後でenhanceする。公開R06は`data-boot-state="shell"`の起動画面を即時表示し、主要game chunkをHTMLからmodulepreloadし、452,720-byteの地面画像を初期preloadしない。公開HTMLはcatalog 5,275 bytes、R06 3,812 bytesで、no-cache確認では両route HTTPS 200だった。strict TypeScript、Vitest 38 files／205 tests、production buildも合格した。これはiPhone実機、cold低速回線、first-controllable時間の合格を意味しない。
- 2026-08-03、commit `026970f`を`main`へpushし、GitHub Actions `Deploy GitHub Pages` run #21のbuild／deploy成功を確認した。公開`/game/`はF.R.A.M.がゲーム名、世界記憶型・放浪RPG、AI-native game development projectであること、actual R06 gameplay image、`最新版を遊ぶ`／`AI開発実験を見る`をfirst viewに表示した。scroll前はhero 1件だけが実`src`を持ち、R06〜R01／F-01 archiveはdeferredのままだった。公開ForgeはFIELD 16.2%／target 16%、view lockで動作し、catalog／Forgeともbrowser error／warning 0件だった。`/game/`、`/game/r01/`、`/game/r06/`、`/game/forge/f01/`はHTTPS 200だった。iPhone 16 Pro実機とuser visual acceptanceは別gateである。
- Prototype 0.1はユーザー試遊で「ゲームとして一応出来上がっている」点を認められた一方、評価は約20点だった。
- 主な不一致は、固定arena、接近や位置取りを必要としない常時自動遠隔攻撃、タワーディフェンス的な手触りだった。これは通常戦闘の自動化すべてを否定する結果ではない。
- ユーザーは、固定俯瞰voxel、scroll探索、手動戦闘を持つPrototype Bが最低限の比較baselineとして成立したことを認めた。これは手動戦闘を製品方向として採用した評価ではない。
- 2026-08-01、ユーザーは製品目標の戦闘をElona Mobileに近い「通常戦闘は自動、大技skillは手動」と明示した。Prototype Bの手動戦闘は実装事実として残るが、目標仕様は手動移動／位置取り＋条件付き自動通常攻撃＋手動大技へ更新された。
- ユーザーはvisual ceilingをhigh-end PC前提のfrontier-quality master sceneに置き、iPhone／lower-specは同じart sourceから派生するquality tierとする方向を確認した。これは目標方向の確定であり、WebGPU／true HDR実装、commercial-quality達成、Steam公開の確認ではない。
- 2026-08-01、ユーザーはAI concept A〜EのうちCをVisual North Starとして選んだ。high-density voxel／rich pixel-artのような画面密度、fixed diagonal diorama、HD-2D的なボケ味を評価し、この画面関係をactual gameplayで再現するよう指示した。C画像そのものはliteral pixel art／cube voxel runtime captureではない。
- Cの主人公／武器に見える中世fantasy driftは採用せず、post-apocalyptic SFへ修正する。最初のcharacter benchmarkは女性型presetとし、種族、性別／gender表現、体格、顔、髪、surface、装備を選べるcharacter creatorへ接続する。女性型は唯一の主人公や能力制限ではない。
- 2026-08-02、ユーザーは既存prototypeを後から公開環境で確認できるよう保持し、`/game/`を新しい順の説明付きversion一覧、各prototypeを`RXX` URLへ分離するよう指示した。今後のdeployでは過去版を残すか確認し、明示的な削除指示がない限り保持する。
- 2026-08-02、ユーザーはCharacter Forge F-01を、細部の矛盾は残るが暫定約70%と評価した。カメラをゲーム距離まで引けばさらに良く見える可能性を認め、開発上の技術的エポックとしてGitHub Pagesへ保存し、今後の同種の節目も同様に公開するよう指示した。これはBeauty Sheet完全一致、commercial character art、Concept C全景の合格ではない。
- F-01公開候補のruntime reconstructionを開発時compilerへ移した。Build Sheetから再生成したpackは37,990 source voxels、9,454 surface cells、7 parts、9 materialsを旧runtime結果と一致させ、47,270 bytes、SHA-256 `a77a7e0a15e0d3a62a95fcc87f77edbc8b972a593e41cc8cf673533af901abc1`となった。production previewでは同じ造形／動作を維持し、warm navigation後のapp ready markerは79〜102 msだった。GitHub Pagesのcold loadと実端末性能は未確認である。
- commit `2c64a5d`を`main`へpushし、GitHub Actions `Deploy GitHub Pages` run #19はbuild／deployとも成功した。公開`https://t-omori-lab.github.io/game/`はF.R.A.M.正式名、full name／日本語副題、改稿したplayer向け文言、Technology Epoch 1件、Playable Builds 6件を表示した。公開`https://t-omori-lab.github.io/game/forge/f01/`は9,454 cells、37,990 volume、7 rig partsで起動し、初回public navigationのapp ready markerは531 ms、1151px Build Sheet previewも正常表示した。これはiPhone実機、低速回線、commercial art合格の確認ではない。
- `R02` Beauty Cellをlocal実装した。Concept C画像を背景に使わず、road、stair、shelter、water、vegetation、hero、四脚survey robot、SF tools、cyan anomalyをruntime 3Dで構成し、deterministic versioned spec、stable ID、seed、AssetDNA／provenanceへ接続した。
- `R02`は既存の半自動通常攻撃、手動大技、装備切替、敵予兆、screen-relative inputを保持し、PC master候補としてhalf-float 4× MSAA、GTAO、bloom、SMAA、AgX、world限定tilt-shiftを使う。これはWebGPU、true HDR、commercial-quality達成、ユーザーart acceptanceの確認ではない。
- `/game/`、`/game/r01/`、`/game/r02/`のversion shellとroute別service worker cacheを実装した。R01は開始commit `88d0f2f`から独立buildした静的成果物とSHA-256 manifestであり、R02以降の共有source変更で変質しない。strict TypeScript、Vitest 26 files／163 tests、production build、production previewが合格した。
- 公開前reviewでR02の専用artが旧worldの未置換terrain／propを描かず、不可視collisionと空の東方quest routeを作る可能性を検出した。置換対象colliderへ読める造形／bounds anchorを追加し、未置換terrain／prop／landmarkはR01相当のfallbackを常時描画するよう修正した。
- GitHub Actions run #9はcommit `e1cdb57`のtest／build／deployに成功した。`https://t-omori-lab.github.io/game/`、`/game/r01/`、`/game/r02/`、root service worker、R01 `SNAPSHOT.json`がHTTPS 200を返した。
- 公開browserでcatalogがR02→R01の順に表示され、R01は独立相対bundleで`environment=north-star-city`、R02は`environment=beauty-cell`、`quality=pc-ultra`、`pipeline=half-float-msaa`、`tiltShift=true`、stable ID `concept-c-beauty-cell-r02`、3196×1796内部bufferとして起動した。
- ユーザーは公開R02を、Concept Cの完全再現ではなく旧prototypeの小改良と評価した。cameraの寄り、女性主人公の造形／可愛さ／微細化、WASDと向きの逆転をblocking defectとして挙げ、R03の再設計・再構築を指示した。
- R03をR02 renderer非依存のappとしてlocal実装した。Concept C由来の高品質environment plate、高解像度4方向女性SF hero、robot dog、遠景anomaly、動的影／反射／bloom／particle、半自動通常攻撃、手動遺物skill、tap-to-moveを、一つのwide fixed-camera 2.5D benchmarkへ統合した。
- Concept C正本とR03の1672×941同条件comparisonに対する独立visual QAは、修正後P0 0、P1 0、非blocking P2 3で`final result: passed`と判定した。strict TypeScript、Vitest 27 files／168 tests、production buildもlocalで合格した。
- 公開前code reviewでfollow cameraのplate外露出と矩形walk boundsによる構造物上への侵入をP1として検出し、camera overscan clampと10頂点road polygonへ修正した。再監査はP0 0／P1 0、公開GOと判定した。
- R02はcommit `0b5fd9f6…`由来の静的bundle、固有service worker、snapshot、11ファイルのSHA-256 manifestとして凍結した。
- R03は指定初期frameのBeauty Benchmarkであって完成したHD-2D engineではない。`R03_HD2D_ARCHITECTURE.md`で、World Model、Layered Scene Compiler、actor representation、render graph、AI-native manifest、C0〜C3 gateを定義した。
- GitHub Actions run #11はcommit `79bf341`のtest／build／deployに成功した。公開catalog、R03、R02、R02 `SNAPSHOT.json`、root service workerはHTTPS 200で、R03本番bundle／environment preloadとR02 `frozen: true`を確認した。
- 公開browserでcatalogはR03→R02→R01の順に表示された。R03は1280×720 viewportで2560×1440 canvasを描画し、tap移動、4方向facing、safe camera、半自動照準statusが動作した。R02保存版も独立bundleで起動した。
- R04をR02-derived realtime 3D次版としてlocal実装した。R02の連続world、collision、quest、loot、二武器、半自動通常攻撃、手動大技を保持し、R03／Concept Cはvisual referenceに限定した。R01／R02／R03 snapshotは保持している。
- R04はfixed diagonal camera、PMREM IBL、warm key／teal rim、AgX、half-float 4× MSAA、GTAO、bloom、SMAA、world限定tilt-shift、決定的なroad／roof／facade／vegetation detailと、articulated realtime 3D女性型SF heroを統合した。未加入companionは開始時に生成・表示しない。
- R04のlocal full checkは30 files／184 tests、strict TypeScript、production buildに合格した。R01／R02／R03 snapshot checksumは9／9、11／11、19／19一致し、production previewで依頼受注、手動大技cooldown、武器切替、移動、browser warning／error 0件を確認した。
- 公開直前reviewで、継承したcolliderなしの不透明立体／旧anomalyと、初回offline precacheから地面textureが漏れる二件をP1として検出した。R04だけで旧objectを除去・全継承meshを因果分類し、simulation anomalyを正本化した。R04 HTMLへVite変換されるimage preloadを追加し、本番HTMLにhash付きWebPが現れることを確認した。R02保存版は変更していない。
- commit `ab33dd8`のGitHub Actions run #13はtest／build／deployに成功した。公開catalog、R04、R01〜R03、R04 manifest、root service worker、hash付き地面WebPはHTTPS 200を返した。公開browserでcatalogのR04→R03→R02→R01順、各保存版の独立title、公開R04の依頼受注、武器切替、移動、手動大技cooldownとR04描画metadataを確認し、warning／errorは0件だった。
- ユーザーは正式作品名として`F.R.A.M. (Frontier Relics Archive Module)`、日本語副題「辺境遺物記録モジュール」、呼称「フラム」を採用した。player characterはF.R.A.M. module instanceである。character creationで外見、種族、性別／gender表現を変えてもこのidentityは維持する。
- R05 local候補を実装した。R04の因果world／gameplayを維持し、cameraを広げて低くし、主人公中心の構図、near／far非対称miniature-depth、正式title／introを接続した。F.R.A.M. F-01は約90 cell高／7,734 visible cell、4.8頭身のarticulated高密度voxel少女で、white twin hair、face pixel、split sage coat、coral textile、小型archive module、weapon socketを持つ。CC0 meshはoffline anatomy scaffoldだけに使い、smooth source surfaceをruntimeでload／renderしない。
- local browserの1280×720でstart、ArrowUp、Q、1917×1077内部buffer、`r05-fram`／`r04-live`／banded miniature-depth、Display-P3 capability path、AgX、`high-density-articulated-voxel-surface`／7,734 cellsを確認し、browser error／warningは0件だった。Vitest 32 files／190 tests、strict TypeScript、production build、`git diff --check`が合格した。Concept Cとの同一frame QAではmacro layout、surface material、warm／cool light hierarchyがP0で`final result: blocked`である。
- R05 deployでは、公開済みcommit `3cb27cd…`由来のR04を自己完結static snapshotへ凍結し、root service workerをR01〜R05 routeへ更新した。commits `0980f0f`／`35cf75f`のGitHub Actions run #15は成功し、公開catalogのR05→R04→R03→R02→R01、全route、R04 snapshot、R05 manifest／OG、root service workerがHTTPS 200を返した。公開R04の独立bundleと描画metadata、公開R05のstart、移動`430,900 → 426,896`、Q入力、`r05-fram`、7,734 cells metadata、browser warning／error 0件を確認した。公開は評価版の配信確認であり、Concept C完全再現やcommercial art acceptanceではない。
- 2026-08-02、ユーザーは公開R05の前進を認めつつ、入口からの重さ、不自然なminiature blur、可愛くない主人公、説明／mini-map／marker不足のHUDを不合格点として確認した。同一viewportの公開監査とsource／production artifact auditにより、catalog画像約7.93 MB、root service workerの全route precache、runtime同期surface／hero生成、screen-Y banded blur、PC hint非表示を確認し、`work/r05_improvement_strategy/R05_IMPROVEMENT_STRATEGY.md`へ次版方針を記録した。これは設計監査の完了であり、修正実装、Figma／ImageGen artifact、public deployの完了ではない。
- 自由放浪とworld memoryはユーザー意図に合う上位方向として確認された。
- 世界の基層は、人類が激減し、識別可能な現代都市が植物、水、動物、新しい生活へ侵食・転用されたpost-apocalypseと確認された。崩壊原因、年代、地域、共同体密度は未決定。
- playerは既存遺構を復旧するか条件の合う土地を選び、自分の拠点を築く方向が確認された。配置自由度、複数拠点、移転、維持、襲撃の詳細は未決定。
- 公開repository `https://github.com/t-omori-lab/game`を作成し、Prototype Bを`https://t-omori-lab.github.io/game/`へ公開した。
- GitHub Actions run #3はcommit `3375470`のbuild／deployに成功した。公開URL、manifest、service worker、共有画像はHTTPSで200応答し、Chromeでタイトル、縦向き案内、PWA install候補を確認した。
- iPhone 16 Proの実機試遊で、double tapにより画面が拡大し、元の倍率へ戻せなくなる不具合が確認された。
- GitHub Actions run #5はdouble tap修正commit `da3b8cf`のbuild／deployに成功した。公開URLのmobile Chromeではdouble tap前後ともscale 1、offset 0を維持した。
- ユーザーは公開版のplay画面を「全体的に暗すぎる」と評価し、崩壊が人間にとって過酷でも、世界は自然に侵食され色鮮やかでよいと方向を修正した。
- ユーザーは16³ characterを表現力不足と評価し、3D voxelを保ちながらSFC後期RPG程度のcharacter判読性を求めた。
- local Visual Pass Cは、昼光の侵食廃墟と16×24×12 playerへ更新され、Vitest 94件、strict TypeScript、production buildが合格した。852×393のlocal mobile Chromeでは60fps表示、26 draw calls、22,148 trianglesを観測した。
- ユーザーはVisual Pass Cについて、map／building／objectを高密度化しない限りMinecraft的でrichnessがなく、mapの鮮やかさと魅力も不足すると評価した。
- 新しいart quality barは『OCTOPATH TRAVELER』等の商業HD-2D作品。playerとcompanion robotは特にvisual qualityを優先し、必要ならさらに高密度化する。
- 同行者は一体だけの固定partnerではなく、旅の途中で発見／加入し、人型robot、犬／猫、犬型／猫型robot、人物など複数候補から交代できるrosterとする。開始時は主人公単独。
- Visual Pass Dはstart-townの高密度props、生活の痕跡、24×32×16 playerまで実装したが、ユーザーはantialiasingの不足、地面／背景textureの弱さ、map全体の粗さを理由に「まだ全く美しくない」と評価した。Visual Pass Dはcommercial art gate不合格である。
- 固定cameraのため、map、ground、building、objectをすべてvoxel／3Dへ限定せず、moving character、collision、occlusion、dynamic shadowはrealtime 3D、surfaceと背景は高解像度生成／baked assetを使うhybrid HD-2D方針へ変更した。
- Visual Pass Eのlocal中間候補は、WebGL MSAA、854×480基準の内部解像度、AgX tone mapping、sRGB baseline、現project固有のcolor-space登録と`drawingBufferColorSpace` probeが通る環境だけのDisplay-P3、1024×1024生成meadow textureを統合した。開始時の調査灯型robotは非表示を維持した。
- start-townの修理跡、畑、洗濯、作業台、道具等の生活表現を維持し、見た目上solidなfixture 6区画へsimulation colliderを接続した。町のrouteと掲示板interactionは回帰testで到達可能を維持した。
- Visual Pass E候補はVitest 116件、strict TypeScript、production buildが合格した。852×393のproduction previewでは60fps表示、35〜37 draw calls、49,520〜49,616 visible triangles、double tap前後scale 1／offset 0、browser error 0件、ground textureの`ready`を観測した。別検査でtexture取得を強制失敗させた場合も`fallback`表示へ移行した。
- `WORLD_BIBLE.md`と`GENERATION_RULES.md`をv0.1 draftとして追加し、設定の確定／仮説／未決定と、開発時生成のseed、schema、provenance、検証、人間採否、fallbackを分離した。
- GitHub Actions run #7はcommit `773aaf6`のbuild／deployに成功した。公開HTMLは新しい`index-JIEoGgMy.js`と`reclaimed-meadow-v1-CgTL2cqk.webp`を参照し、JS、WebP、service worker、manifestがHTTPSで200応答した。
- 公開URLの852×393 mobile Chromeで起動、武器切替、攻撃、移動、double tapを実行し、60fps表示、37 draw calls、49,616 triangles、MSAA、AgX、texture `ready`、scale 1／offset 0、browser error 0件を確認した。
- ユーザーはtoken制約下で追加実装を増やさず、これまでの要求、不足している検討、具体的な設計、iPhone前提のrich visual、主人公／同行者design、生成world／assetをgameplayへ接続する方法を先に進めるよう指示した。
- `docs/GAME_CONSTITUTION.md`と`docs/DESIGN_SYNTHESIS.md`をlocalに追加し、確定要求と設計提案を分離した。仮称「世界記憶型・放浪生活ハクスラ」を、Gate Aの手動action＋loot／buildと、Gate Bの自由な放浪＋world memoryに分け、Gate Cのvisual比較を独立させた。GameplayContract、Causal World Cell、StyleProfile／AssetDNA、Event Log Lite、残響基盤は未採用のdesign proposalであり、runtime、asset、公開buildは変更していない。
- 2026-08-01、作品憲法と統合設計をv0.2へ更新し、Gate Aを半自動戦闘、Gate Bを候補地選定／module設置／次回差分へ再定義した。`BaseSite`、`BaseModule`、`BaseEvent`と拠点生成hard gateをdraft化し、release durabilityを体験gateから分離した。game code、runtime asset、公開build、deployは変更していない。
- 2026-08-01、PC最高品質を先に追う独立local North Star候補route `?prototype=north-star`を追加した。既存公開routeは保持し、GitHub Pagesへのpush／deployは行っていない。
- ユーザーは半自動戦闘、PC-first描画、部位化主人公を統合した最初のNorth Star候補を見て「確かによくなった」と評価し、次の実装へ進むよう指示した。これはcommercial-qualityの合格評価ではない。
- North Star routeへ、WebGL2 half-float render target、4× MSAA、GTAO、抑制したbloom、SMAA、可変内部解像度、camera impulseを統合した。1600×900／device pixel ratio 1のChromeでは1598×898内部解像度でpost stackがfallbackせず動作した。これはWebGPU／true HDR採用結果ではない。
- `Acquire → Windup → Hit → Recover`のfixed-tick controllerを実装し、二武器の間合い、周期、移動拘束、target維持、dodge cancelと通常攻撃自動発動をNorth Star routeへ接続した。通常攻撃buttonは同routeで非表示にし、大技、回避／防御、itemは手動のままにした。
- 24×32×16主人公を7 semantic partへ分割し、右腕weapon socket、idle／run／windup／hit／recovery／hurt／skill poseをPC Ultra routeへ接続した。single merged meshはbaseline fallbackとして保持した。
- North Star local候補はstrict TypeScript、Vitest 124件、production buildが合格した。desktop Chromeで開始、移動、半自動攻撃windup／hit pose、PC Ultra候補post stack、通常攻撃button非表示、大技中のauto combat停止、武器切替時の即時hit抑止、browser error 0件を確認した。
- North Star専用の自然侵食現代都市cellをlocal実装した。旧高架駅／集合住宅、横断歩道、旧店舗／診療所、雨水濾過槽、情報kiosk、修理bay、菜園を既存collisionへ合わせ、baselineは従来のstart-townを維持した。1600×900のlocal Chromeで都市表示と主人公の開始位置を目視し、空白だったcamera-facing facadeと舗装filterを一度改稿した。strict TypeScript、Vitest 129件、production buildが合格した。公開／deployとユーザーart acceptanceは未実施。
- North Star Surface Pass v0.2をlocal実装した。asphalt／concrete 1024²、roof 512²のalbedo／normal／roughnessを決定的に生成し、provenance／content digest、面別UV、冪等dispose、歩道microdetailを接続した。1600×900 actual-cameraでmacro反復と骨材格子を改稿し、別visual reviewで同sliceを止める静止画上のP0なしと判定した。strict TypeScript、Vitest 19 files／133 tests、production build、North Star／baseline browser smokeが合格した。公開／deploy、移動時shimmer、ユーザーart acceptance、commercial-quality達成は未確認。
- ユーザーは、都市構造やpartを増やす前に、単純な構造物でも美しく見える画面描写、主人公造形、個別asset、画面構成、UI、光を先に追求し、『NieR:Automata』とcommercial HD-2D級を目標にするよう優先順位を明示した。
- Visual Fidelity Foundation v0.3をlocal実装した。North Star専用にPMREM IBL、warm key／cool rim／reduced fill、PC露出／fog、探索／戦闘camera composition、cloth／metal／HDR signal material、world-first intro、縮小HUD、debug表示の明示切替を接続した。1280×720／DPR 2で2556×1436、Display-P3、AgX 0.98、half-float MSAA 4、GTAO／bloom／SMAA、PMREM、texture ready、PC touch UI非表示を確認した。strict TypeScript、Vitest 141件、production buildが合格した。public deploy／pushとユーザーart acceptanceは行っていない。
- AI生成によるVisual North Star conceptをA〜Eの五案作成し、1672×941 PNG、全prompt、SHA-256 manifestをlocal projectへ保存した。比較の結果、Dの単純な交差点構図を、明るい中間調、拡大した主人公／四足同行者、sage／rust衣装と折り畳み半円survey frameで修正したEを暫定North Starにした。fixed-camera VisualCell、rigged GLB、baked PBR／indirect light、GLB／KTX2、AssetDNA／provenance、PC masterからmobile tierへの実装案も文書化した。これはconceptとlocal設計の完了であり、runtime再現、commercial art acceptance、user approval、public deploy／pushではない。
- 固定cameraのworld X/Yへkeyboard／virtual-stick X/Yを直結すると、上入力が画面斜めへ投影されることをcode上で確認した。screen-relative controlをrendererと共有するcamera basisでworld座標へ回転するlocal実装を追加し、上下左右、analog magnitude、実Three.js camera投影を含むVitest 144件、strict TypeScript、production buildが合格した。Gamepad APIとclick／tap-to-moveはまだ接続していない。
- R06 local candidateを実装した。R05はrelative static bundle、固有service worker、snapshot、15-file SHA-256 manifestへ凍結し、全checksum一致とlocal browser起動を確認した。
- catalog coverを720px gameplay JPEGへ置き換え、R06のみeager、R05〜R01をlazyにした。root service workerはcatalog shellだけを管理し、全archive routeのinstall-time precacheを廃止した。
- R06はscreen-Y banded tilt-shiftを既定OFFにし、3.65頭身／7,734 visible cell／Box cellのcompact主人公、2D mini-map、目的地方向／距離、PC操作guide、controller一致target HUDを統合した。strict TypeScript、Vitest 32 files／191 tests、production build、1280×720 production browser smokeが合格した。
- commit `2fd05c2`を`main`へpushし、GitHub Actions `Deploy GitHub Pages` run #17は成功した。公開catalogはR06→R05→R04→R03→R02→R01で、最新coverのみeager、保存版cover 5件はlazyだった。公開R06は`R06`／`r06`／`sharpPresentation=true`／`ultraTiltShift=false`／7,734 cells、mini-map、目的地9m、WASD／AUTO／Q／SHIFT／E／R guideを実browserで確認した。公開R05は`R05`／`r05`の独立起動画面を維持した。Concept C／commercial art合格、depth-aware DOF、ユーザーvisual acceptanceは未確認である。

- R07 local candidateをR06-derived live routeとして実装した。R06／公開R01〜R06／公開catalogは変更していない。R07はR06の連続world、collision、quest、loot、半自動通常攻撃、手動大技、mini-map、marker、PC操作guideを継承する。
- R07主人公は、AI生成した4面character directionをruntime referenceには使わず、deterministic semantic micro-voxel volumeへ翻訳した。頭部cellをbodyの0.56倍へ細分化し、旧head surfaceを置換、visible cellを7,734から9,627へ増加した。同一1280×720比較では、R06の顔を覆う白いhair massから、目／口／顔面、短いbob、小柄なsilhouetteが読める状態へ変化した。これは最終character art／Concept C同等／ユーザーvisual acceptanceの確認ではない。
- R07はworld-onlyのscene-depth DOFを実装した。MeshDepthMaterialによるdepth target、player world focus、CoC、bilateral depth-edge rejectionを使い、screen-Y bandを使わない。local browserではfocus range 0.036、最大1.45px、edge threshold 0.0045、fallbackなし、HUD sharpを観測した。
- R07 local candidateはstrict TypeScript、Vitest 34 files／195 tests、production buildに合格した。1280×720 production browserでは1917×1077内部buffer、`r07-fram`、`semantic-high-density-articulated-voxel-girl`、9,627 cells、half-float MSAA、GTAO、bloom、SMAA、depth-aware DOF、tilt-shift falseを確認した。public push／deployは行っていない。

- Character Forge F-01を独立local routeとして実装した。AI生成Beauty Sheetからstrict four-view＋module Build Sheetを作り、外部source definitionと4方向投影から48×92×42／37,990 solid cellsの3D正本を再生成、9,454 outer surface cells、9 materials、7 semantic rig partsで`idle / run / hit`を動かした。1280×720 same-screen comparison、strict TypeScript、37 files／202 tests、production buildに合格した。F-01 pipeline proofはpassだが、Beauty Sheet完全一致、commercial character art、Concept C全景、ユーザー採択、公開／deployは未実施である。

## Pending confirmation

- R04がR02の遊べる基盤を維持しつつ、ユーザーのConcept C／commercial HD-2D基準へ十分近づいたと評価されるか。local design QAのpassはユーザーacceptanceの代替ではない。
- F.R.A.M. moduleの製造者、起源、network／組織との関係、複製／継承、instance名、logoをどう定義するか。
- local R05の高密度voxel少女F.R.A.M. F-01の顔／髪／衣装／動作を含む可愛さと、Concept C型へ再構築するmacro layout／material／lightがユーザー基準を満たすか。ordinary smooth 3Dへ戻さないことは確定したが、Concept C完全再現、commercial HD-2D同等、公開合格は未確認である。
- local R07のsemantic micro-voxel少女が、R06より明確な前進としてユーザー基準を満たすか。顔／髪の最終造形、体型／衣装、secondary motion、全方向read、Concept C／commercial HD-2D同等、公開採択は未確認である。
- R03がConcept Cの知覚品質へ十分近づいたか、ユーザーart reviewで合格するか。local independent visual QAのpassはユーザーacceptanceの代替ではない。
- R03のplate型benchmarkをC1のdepth-aware geometry、occlusion、collision、navigation、dynamic lightingへ移しても同じ画面品質を維持できるか。

- [ ] Prototype Bのユーザー試遊評価がPrototype 0.1の約20点から改善するか。
- [ ] Visual Pass Eのhybrid方向がユーザーのcommercial benchmarkへ近づいたと評価されるか。現時点でcommercial HD-2Dと同等とは確認されていない。
- [ ] 高密度playerが通常画面で成立し、調査灯型robotが開始時非表示のままroster候補assetとして別previewで成立するか。
- [ ] Display-P3、AgX、emissiveがiPhone 16 ProのSafari／PWAで意図した色と階調になるか。true HDR出力は未確認。
- [ ] iPhone 16 Pro実機で10分間の操作・performance・発熱基準を満たすか。
- [ ] 二武器、guard／回避、遺物、三つの対処が説明なしで判別できるか。
- [ ] 10分遊んだ本人が自発的に二回目を始めたくなるか。
- [ ] 未説明のplayerが、前回の選択結果を次回90秒以内に認識できるか。R09Aでcueが開始直後に発生する技術条件は確認済みだが、理解と面白さは未試遊である。
- [ ] HTTPS環境でPWA install、offline再起動、IndexedDB保存が成立するか。
- [ ] IndexedDBのatomic snapshot、quota／eviction対応、persist request、export／import、Safari版からHome Screen版への移行方針が成立するか。
- [ ] local修正版で、iPhone 16 ProのSafari／ホーム画面PWAともdouble tap拡大が再発しないか。
- [ ] Visual Pass E公開後の実利用、Steam審査、販売が生じた場合は別途記録する。
- [ ] Gate Aの半自動戦闘で、target取得、位置取り、build、自動通常攻撃、手動大技がiPhone上でユーザー意図に合うか。
- [ ] Gate Bで、拠点候補地と機能moduleの選択が自由放浪／world memoryを強め、未説明のplayerにも次回90秒以内で理解されるか。
- [ ] death／succession、残響基盤、主人公形式、同行者summer scopeの設計提案がユーザー意図に合うか。
- [ ] 選定済みconcept Cのhigh-density micro-voxel知覚を、96-cell級女性default preset、SF装備、character variation、実際のanimation／scroll／combatを持つrealtime Beauty Cellで再現し、ユーザーのart acceptanceを得られるか。
- [ ] PC UltraのWebGPU／HDR、KTX2、Visual Benchmark Scene、AssetDNA、Causal World Cellが知覚品質、制作効率、gameplay改善へ実際につながるか。
- [ ] PC masterから派生したmobile tierがiPhone 16 Pro上で操作視認性、performance、発熱の条件を満たすか。
- [ ] North Star routeの自然侵食現代都市第一候補がユーザーにrecognizableで魅力的と評価され、さらに商業reference級の一画面へ到達するか。local候補は実装済みだが、commercial art acceptanceは未確認。
- [ ] Surface Pass v0.2のroof microdetailが移動時にちらつかず、runtime同期生成をbaked／非同期assetへ移して初回停止を解消できるか。
- [ ] semantic part化した現主人公が十分な精密さと魅力を持つか。顔／髪／衣装surface、PBR material、deformation rig、signature animationを含む最終hero designは未完成。
- [ ] Visual Fidelity Foundation v0.3のlighting／camera／UI統合がユーザーのcommercial benchmarkへ十分近づいたか。現主人公のliteral voxel造形はlocal visual reviewでも次の最大課題であり、commercial-quality達成とは確認していない。
- [ ] Counter cutterとBreach driverが実際の試遊で、DPS以外の位置取り、risk、timingの差として感じられるか。
- [ ] PC UltraのWebGPU／HDR候補が、現WebGL2 half-float post stackより知覚品質で勝つか。同条件比較は未実施。
- [x] Visual North Starとしてconcept Cの画面方向をユーザーが採択した。runtime Beauty Cellで同等の画面を再現できるかは別gateとする。
- R08 unified characterをlocal candidateとして実装した。R07のworld／gameplay／HUD／scene-depth DOFとarticulated rigを保持し、全身visible surfaceを19,221-cellのsemantic hair／face／jacket／limbs／boots／archive packへ置換した。strict TypeScript、199 tests、production build、1,280×720 browser起動／S移動、warning／error 0件、character-art scopeのdesign QAに合格した。公開R06／catalogは変更せず、GitHub push／Pages deploy、ユーザーvisual acceptance、Concept C全景／commercial parityは未実施である。

## Rule

local実装・browser検査と、実機試遊・公開・実利用を分け、未確認事項を推測で完了にしません。
