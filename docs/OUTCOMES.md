# Outcomes: ゲーム開発

Last updated: 2026-08-01

## Confirmed

- Prototype 0.1はユーザー試遊で「ゲームとして一応出来上がっている」点を認められた一方、評価は約20点だった。
- 主な不一致は、固定arena、接近や位置取りを必要としない常時自動遠隔攻撃、タワーディフェンス的な手触りだった。これは通常戦闘の自動化すべてを否定する結果ではない。
- ユーザーは、固定俯瞰voxel、scroll探索、手動戦闘を持つPrototype Bが最低限の比較baselineとして成立したことを認めた。これは手動戦闘を製品方向として採用した評価ではない。
- 2026-08-01、ユーザーは製品目標の戦闘をElona Mobileに近い「通常戦闘は自動、大技skillは手動」と明示した。Prototype Bの手動戦闘は実装事実として残るが、目標仕様は手動移動／位置取り＋条件付き自動通常攻撃＋手動大技へ更新された。
- ユーザーはvisual ceilingをhigh-end PC前提のfrontier-quality master sceneに置き、iPhone／lower-specは同じart sourceから派生するquality tierとする方向を確認した。これは目標方向の確定であり、WebGPU／true HDR実装、commercial-quality達成、Steam公開の確認ではない。
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

## Pending confirmation

- [ ] Prototype Bのユーザー試遊評価がPrototype 0.1の約20点から改善するか。
- [ ] Visual Pass Eのhybrid方向がユーザーのcommercial benchmarkへ近づいたと評価されるか。現時点でcommercial HD-2Dと同等とは確認されていない。
- [ ] 高密度playerが通常画面で成立し、調査灯型robotが開始時非表示のままroster候補assetとして別previewで成立するか。
- [ ] Display-P3、AgX、emissiveがiPhone 16 ProのSafari／PWAで意図した色と階調になるか。true HDR出力は未確認。
- [ ] iPhone 16 Pro実機で10分間の操作・performance・発熱基準を満たすか。
- [ ] 二武器、guard／回避、遺物、三つの対処が説明なしで判別できるか。
- [ ] 10分遊んだ本人が自発的に二回目を始めたくなるか。
- [ ] 前回の依頼結果を次回90秒以内に認識できる永続loopが成立するか。
- [ ] HTTPS環境でPWA install、offline再起動、IndexedDB保存が成立するか。
- [ ] IndexedDBのatomic snapshot、quota／eviction対応、persist request、export／import、Safari版からHome Screen版への移行方針が成立するか。
- [ ] local修正版で、iPhone 16 ProのSafari／ホーム画面PWAともdouble tap拡大が再発しないか。
- [ ] Visual Pass E公開後の実利用、Steam審査、販売が生じた場合は別途記録する。
- [ ] Gate Aの半自動戦闘で、target取得、位置取り、build、自動通常攻撃、手動大技がiPhone上でユーザー意図に合うか。
- [ ] Gate Bで、拠点候補地と機能moduleの選択が自由放浪／world memoryを強め、次回90秒以内に理解できるか。
- [ ] death／succession、残響基盤、主人公形式、同行者summer scopeの設計提案がユーザー意図に合うか。
- [ ] literal high-density voxel、semantic voxel surface、stylized low-polyを同条件で比較した結果、どのvisual identityを採るか。
- [ ] PC UltraのWebGPU／HDR、KTX2、Visual Benchmark Scene、AssetDNA、Causal World Cellが知覚品質、制作効率、gameplay改善へ実際につながるか。
- [ ] PC masterから派生したmobile tierがiPhone 16 Pro上で操作視認性、performance、発熱の条件を満たすか。
- [ ] North Star routeの自然侵食現代都市第一候補がユーザーにrecognizableで魅力的と評価され、さらに商業reference級の一画面へ到達するか。local候補は実装済みだが、commercial art acceptanceは未確認。
- [ ] Surface Pass v0.2のroof microdetailが移動時にちらつかず、runtime同期生成をbaked／非同期assetへ移して初回停止を解消できるか。
- [ ] semantic part化した現主人公が十分な精密さと魅力を持つか。顔／髪／衣装surface、PBR material、deformation rig、signature animationを含む最終hero designは未完成。
- [ ] Visual Fidelity Foundation v0.3のlighting／camera／UI統合がユーザーのcommercial benchmarkへ十分近づいたか。現主人公のliteral voxel造形はlocal visual reviewでも次の最大課題であり、commercial-quality達成とは確認していない。
- [ ] Counter cutterとBreach driverが実際の試遊で、DPS以外の位置取り、risk、timingの差として感じられるか。
- [ ] PC UltraのWebGPU／HDR候補が、現WebGL2 half-float post stackより知覚品質で勝つか。同条件比較は未実施。
- [ ] Visual North Star concept Eの画面構成、明るさ、主人公のsurvey motif、四足同行者、hybrid production grammarがユーザーの理想方向として採択されるか。採択後もBeauty Cellのactual gameplayで再現できるかは別gateとする。

## Rule

local実装・browser検査と、実機試遊・公開・実利用を分け、未確認事項を推測で完了にしません。
