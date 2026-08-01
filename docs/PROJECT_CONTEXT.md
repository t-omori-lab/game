# Project Context: ゲーム開発

Last updated: 2026-08-01  
Status: active  
Phase: Concept C Direction Lock v0.5 / realtime hybrid contract and input alignment

## Purpose

仕組みと遊び方で長く遊べる、世界記憶型の放浪生活ハクスラを開発する。自然に侵食された現代都市を自由に放浪し、通常戦闘は自動、大技は手動で介入する。装備、異形への対処、回収、拠点づくり、帰還結果が次の旅へ巡る小さなworldを目指す。visualはPC play前提の最高品質masterを先に作り、iPhone 16 Proは同じasset／simulationから縮退する必須tierとする。ブラウザで反復し、Steam向けdesktop包装を視野に入れる。

## Confirmed current state

- 既定起動をPrototype B「辺境遺物録」へ切り替えた。Prototype 0.1「境界調査録」は比較用に`?prototype=0.1`で起動できる。
- Prototype Bは、町―三叉路―聴取廃区を連続scrollする3,600×1,800のworldと固定斜め俯瞰cameraを持つ。moving character、collision silhouette、occluder、dynamic shadowはrealtime 3Dを維持し、地面、背景、建物面は高解像度の生成／baked surfaceを併用できるhybrid HD-2Dへ移行した。playerの現行authoring gridは24×32×16。
- 30Hzの決定論的simulationに、手動攻撃、guard／just guard、回避、遺物skill、回復item、武器持替、敵予兆、loot、地形collisionを実装した。
- 武器は、速く間合いの長い測量刃と、遅く高威力・高knockbackの杭打機の二系統。
- 通常敵3種と名付き反響体1体があり、名付き反響体は破壊、鎮静、接続の三経路で解決できる。結果を町へ報告すると異なる帰還記録が出る。
- lootは6種。各SF遺物を、効果、世界内の原理仮説、副作用、使用者の所感に分けて表示する。
- 音はWeb Audioによる独自のprocedural soundscapeで、探索pulse、危険layer、武器2種、予兆、guard、回避、遺物、item、三結果を分けた。
- 2026-07-31時点のVisual Pass E候補はVitest 116件、strict TypeScript、production buildが合格した。公開結果はlocal verificationと分けて記録する。
- 公開repositoryは`https://github.com/t-omori-lab/game`。GitHub Pagesの公開URLは`https://t-omori-lab.github.io/game/`。
- GitHub Actions run #3でcommit `3375470`のbuild／deploy成功を確認し、公開URL、manifest、service worker、共有画像がHTTPSで200応答することを確認した。
- 公開URLをChromeで開き、タイトル、縦向き案内、PWA install候補の表示を確認した。
- 必要遺物は対峙開始前に連続移動で回収できる配置へ修正し、取り逃した場合も選択画面から探索へ戻り、反響体の近くで開き直せる。
- 防御と移動は押す順にかかわらず一度だけ回避へなり、保持中は防御へ戻る。縦画面／background中はsimulationと操作を止め、復帰時の入力と音の蓄積をresetする。
- 852×393相当のlocal browserで、60fps表示、開始、依頼受注、武器切替、scroll移動、敵接近、敗北、再開を確認。観測値は初期画面で約25 draw calls／約18k triangles。browser consoleのerror／warningは0件。
- スマホ実機でdouble tapすると拡大したまま戻せない報告を受け、固定倍率のviewport指定を外し、全UIへ`touch-action: manipulation`、joystick／action buttonへ`touch-action: none`を直接適用した。852×393のlocal mobile Chromeではdouble tap前後ともscale 1、offset 0を維持した。
- GitHub Actions run #5でcommit `da3b8cf`のbuild／deploy成功を確認した。公開URLを852×393のmobile Chromeで開き、double tap前後ともscale 1、offset 0を維持した。
- ユーザー評価を受け、local Visual Pass Cで暗い終末画面を淡い昼光、白化した遺構、sageの地面、青緑の水、錆、草花へ転換した。危険は全画面の暗さではなく、赤橙の敵予兆と局所contrastで示す。
- playerは16³／368 voxelsから16×24×12／583 voxelsへ再設計した。髪、顔、上着、左右の腕、分離した脚、boots、scarf、weapon anchorを持ち、bodyは1 draw call／1,484 triangles。
- 852×393のlocal mobile ChromeでVisual Pass Cを確認し、上下左右のsilhouette、worldの視認性、60fps表示、26 draw calls、22,148 trianglesを観測した。double tap後もscale 1、offset 0を維持した。
- ユーザーはVisual Pass Cを、map／building／objectが大きなbox中心でMinecraft的、鮮やかさと魅力も不足すると評価した。次のquality barは『OCTOPATH TRAVELER』等の商業HD-2D作品であり、Visual Pass Cはart acceptanceに未達。
- Visual Pass Dではstart-townへmulti-part architecture、修理跡、畑、洗濯、作業台、道具、生活小物と24×32×16 playerを追加した。しかしユーザーは、antialiasingの不足、平坦な地面／背景texture、map全体の粗さを理由に「まだ全く美しくない」と明確に評価し、Visual Pass Dをcommercial-quality art gateとして却下した。
- Visual Pass Eのlocal中間候補では、WebGL MSAA、高精度shader、854×480基準の内部解像度、AgX tone mapping、mipmap／anisotropyを備えた1024×1024の開発時生成meadow textureを導入した。出力はsRGBをbaselineとし、Display-P3は現project固有の`ColorSpaces.js`登録と`drawingBufferColorSpace` probeが通るときだけ有効にする。
- Visual Pass Eは、固定cameraを活かし、地面／背景／建物面を2D生成・bakeできるhybrid HD-2Dの最初の技術候補である。現時点では地面albedo一枚が主なsurface改善で、商業HD-2Dと同等の仕上がりを意味しない。
- start-townで見た目上solidな掲示板、作業場、修理台、街灯、菜園、crate群の6区画をsimulation colliderへ接続し、表示物をすり抜けない状態にした。町の主要routeと掲示板interactionはtestで到達可能を維持した。
- 同行者は開始時の固定相棒にせず、world内で発見／加入し、複数候補から交代するroster構想へ変更した。調査灯型robotは候補assetとして保持するが、通常の開始画面では非表示にする。
- Visual Pass Eの852×393 local mobile Chromeでは、約47〜54fps、35 draw calls、約48〜49k visible trianglesを観測した。double tap前後はscale 1、offset 0を維持し、browser errorは観測されなかった。60fps目標への到達とiPhone 16 Pro実機性能は未確認。
- 最終production previewでは60fps表示、35〜37 draw calls、49,520〜49,616 visible triangles、ground textureの`ready`、double tap前後scale 1／offset 0、browser error 0件を確認した。texture要求を遮断した別検査では`fallback`へ移行した。いずれもiPhone実機性能の証明ではない。
- GitHub Actions run #7はcommit `773aaf6`のbuild／deployに成功した。公開HTMLが`index-JIEoGgMy.js`と`reclaimed-meadow-v1-CgTL2cqk.webp`を参照し、JS、WebP、service worker、manifestがHTTPSで200応答することを確認した。
- 公開URLを852×393のmobile Chromeで起動・操作し、60fps表示、37 draw calls、49,616 triangles、MSAA、AgX、ground textureの`ready`、double tap前後scale 1／offset 0、browser error 0件を確認した。
- 世界、人物、地図、遺跡、item、monster、同行者の状態と出典を分離する`docs/WORLD_BIBLE.md`と、開発時生成、schema、seed、provenance、検証、人間採否、fallbackを定める`docs/GENERATION_RULES.md`をv0.1 draftとして追加した。
- 2026-07-31、ユーザーは追加実装より、これまでの要求、不足設計、具体的な実現方法を先に整理するよう指示した。`docs/GAME_CONSTITUTION.md`と`docs/DESIGN_SYNTHESIS.md`へ、仮称「世界記憶型・放浪生活ハクスラ」を、Gate Aの手動action＋loot／build、Gate Bの自己目的＋world memory、Gate Cのvisual比較へ分離してdesign proposalとして記録した。GameplayContract、Event Log Lite、Causal World Cell、StyleProfile／AssetDNA、mobile renderer tierも未採用の設計案である。
- 2026-08-01、ユーザーは目標戦闘をElona Mobileに近い「通常戦闘は自動、大技skillは手動」と明示し、自由放浪とworld memoryを支持した。人類が激減し、現代都市を自然が侵食したpost-apocalypse、既存遺構の復旧または選んだ土地への自築拠点も上位方向として確認した。Prototype Bの手動戦闘は実装事実として残るが、製品目標は半自動戦闘へ更新する。
- 最新一次資料の調査では、Safari 26のWebGPU／HDR Canvas、Three.js WebGPURendererのWebGL2 fallbackとexperimental status、KTX2／Basisのmobile texture利点、2025〜2026年のPBR／rig-aware 3D生成、LLM game-state一貫性とkeypoint validationの現状を確認した。これらは候補技術の確認であり、本project上の実機性能やproduction採用を意味しない。
- 2026-08-01、独立route `?prototype=north-star`へPC-first North Star候補をlocal実装した。既存のstart-townを再利用し、device pixel ratio連動の可変内部解像度、half-float render target、4× MSAA、GTAO、抑制したbloom、SMAA、AgX、dynamic shadowを一つのpost stackへ統合した。これはWebGL2上の候補であり、WebGPU／true HDRではない。
- North Star routeでは通常攻撃buttonを外し、`Acquire → Windup → Hit → Recover`の半自動近接攻撃、build別間合い／移動拘束、手動大技、target／windup ring、hit時camera impulseを接続した。格下処理と二buildの最終game feelは未採択。
- 主人公の24×32×16 recipeを、頭、胴、左右腕、左右脚、装備へsemantic分割し、右腕weapon socketとidle／run／windup／hit／recovery／hurt／skill poseをPC Ultra routeへ接続した。従来のmerged meshはbaseline fallbackへ残した。
- 1600×900、device pixel ratio 1のlocal desktop ChromeでNorth Star routeを起動し、1598×898内部解像度、half-float MSAA、GTAO、bloom、SMAA、通常攻撃button非表示、windup／hit pose、大技中のauto combat停止、browser error 0件を観測した。strict TypeScript、Vitest 124件、production buildも合格した。
- North Star routeだけが`north-star-city` environment profileを選ぶようにし、baselineのstart-townは保持した。最初の都市cell候補は、旧高架駅／集合住宅、舗装道路と横断歩道、旧店舗／診療所、雨水濾過槽、再利用kiosk、修理bay、菜園、局所的な植生を、既存collisionとinteraction座標へ合わせて一画面へ統合した。
- North Star Surface Pass v0.2では、asphalt／concreteを1024²、roofを512²とし、同一の損耗fieldからalbedo／normal／roughnessを生成する9枚のDataTextureへ更新した。各surfaceはseed、generator version、channel encoding、repeat、normal strength、content digestをprovenanceとして持ち、roughnessはThree.jsのG channelへ格納する。道路と主要2棟のshell／roofをUV付きmeshへ移管し、歩道には伸縮目地と欠損した点字誘導blockを加えた。
- 1600×900のactual-camera reviewでは、第一稿のmacro tile反復、次稿の規則的な骨材格子を検出して解消した。建物は面の実寸aspectと法線方向別offsetを持ち、+X／+Z／roofで同じ傷を同形反復しない。最終local候補は1598×898、`environment=north-star-city`、MSAA、half-float post stack、texture `ready`、visual viewport scale 1、browser error 0件。baseline routeは`environment=start-town`／`quality=baseline`を維持した。strict TypeScript、Vitest 19 files／133 tests、production buildが合格した。
- 2026-08-01、ユーザーは都市partの追加を止め、単純な構造でも美しく見えるlighting／material／camera／UIと主人公造形を先にcommercial reference水準へ上げるよう優先順位を変更した。Visual Fidelity Foundation v0.3では、North Star専用にPMREM IBL、warm key／cool rim／reduced fill、PC露出／fog、進行方向／戦闘targetを含むcamera composition、cloth／metal／HDR signal material、world-first introと縮小HUDを接続した。baselineのcamera、lighting、mobile touch UIは保持した。
- 1280×720／device pixel ratio 2のlocal browserで、2556×1436 canvas、Display-P3、AgX exposure 0.98、PMREM、half-float 4× MSAA、GTAO、bloom、SMAA、texture `ready`、PC touch controls非表示を観測した。第一稿の白浮きと主人公の小ささを、ambient低減と360 world-unit cameraへ一度改稿した。strict TypeScript、Vitest 141件、production buildが合格した。これは画面統合基盤のlocal候補であり、現主人公の造形、commercial HD-2D同等、ユーザーart acceptance、public deployを意味しない。
- 2026-08-01、Visual North StarのAI conceptを五案生成し、`docs/concepts/visual-fidelity-v03/`へpromptとSHA-256 manifestを含めて保存した。Aはluminous hybrid、Bはprecision micro-voxel、Cはstylized 3D actor、Dは三案統合、EはDの暗部、actor scale、固有性を修正した案。Eを暫定North Starとし、`docs/VISUAL_NORTH_STAR_IMPLEMENTATION.md`へfixed-camera VisualCell、rigged GLB actor、baked PBR／indirect light、GLB／KTX2 pack、AssetDNA、provenance、PCからmobileへのquality tierを設計した。これらはart-direction artifactと実装提案であり、runtime再現、commercial-quality達成、user art acceptance、public deployではない。
- 2026-08-01、ユーザーは五案からAI concept Cを正式なVisual North Starに選んだ。評価対象は高密度voxel／rich pixel-artのように統合される小型3D造形、fixed diagonal diorama、HD-2D的な被写界深度である。C自体はliteral pixel／cube-voxel画像ではないため、実装はhigh-density micro-voxel由来のrealtime 3D actor、fixed-camera 3D shell、baked static density、wet PBR、gameplay-safe multi-layer DOFに分けて同じ知覚結果を再構築する。Eは比較履歴へ戻した。
- 主人公は女性型field scavengerを最初のart presetとするが、唯一の主人公には固定しない。`humanoid-v1`から始め、種族、body frame、性別／gender表現、顔、髪、surface、palette、voice／pronoun、augmentation、equipmentをversioned `CharacterGenome`で構成する。Cの白髪、長coat、発光剣はそのまま採らず、都市作業服、sensor、power／heat／service機構を持つpost-apocalyptic SFへ修正する。
- 固定斜めcameraに対してkeyboard／virtual stickのscreen axisをworld axisへ直結していたため、上入力が画面斜めへ投影される問題を確認した。rendererと同じcamera offsetからscreen-relative input basisを計算し、simulation直前でworld X/Yへ回転する実装へ変更した。上下左右、analog magnitude、実Three.js camera投影をtest化し、Vitest 21 files／144 tests、strict TypeScript、production buildが合格した。Gamepad APIとclick／tap-to-move自体は未実装である。

## Creative reference notes

- 探索場面のBGMイメージとして、MYUKKE.「Go, Go, Heartbreaker!」を参照する。
- 参照するのは、移動を前へ押すテンポ感、高揚感の中にある切なさ、探索を「旅の時間」として感じさせる感情設計。旋律、編曲、音色は直接模倣せず、オリジナルのprocedural music／soundscapeへ翻訳する。

## Boundaries

- Prototype Bは新しい遊びの核を評価する原型であり、完成ゲームではない。
- local mobile相当browserの結果は、iPhone 16 Pro実機性能、発熱、touch感触、音量balance、Safari/PWA適合の証明ではない。
- double tap修正は公開mobile Chromeで確認済みだが、iPhone 16 ProのSafari／ホーム画面PWAでの再確認は未完了。
- Visual Pass Cはlocal browserでのみ確認済みで、ユーザーのart acceptanceには不合格。GitHub Pagesへは反映しない。
- Visual Pass Dはユーザーreviewで不合格となり、Visual Pass Eのhybrid方針へ置き換えた。
- Visual Pass EはGitHub Pagesへ反映した中間評価版であり、公開asset、service worker、公開画面の一致を確認済み。商業HD-2D同等の完成やユーザーart acceptanceを意味しない。
- AgX tone mapping、広い色域、明るいemissiveはHDR的な見え方を助けるが、現在のWebGL出力をtrue HDRと断定しない。Display-P3は対応device／browserだけのprogressive enhancementである。
- Visual Pass Eのlocal計測は60fps目標を下回る観測を含む。iPhone 16 Proでのfps、発熱、battery、Safari/PWA color出力は未確認。
- 三つの依頼結果はsimulation testで到達確認済みだが、local browserで開始から帰還までの10分通し試遊は未完了。
- Prototype 0.1の`WorldLegacy v1`、A/B save、IndexedDBはrepository内に残るが、Prototype Bの依頼結果／途中状態にはまだ接続していない。
- PWA shellは公開HTTPS上で配信され、Chromeのinstall候補までは確認済み。iPhoneでのホーム画面追加、offline再起動、Prototype B asset cacheは実機未確認。
- Safari tabとHome Screen Web AppのIndexedDB saveは自動継承を仮定できない。Prototype B永続化ではatomic snapshot、quota／eviction、persist request、export／import、初回移行を別gateにする。
- 人類激減、自然に侵食された現代都市は確認済みの舞台条件。崩壊原因、経過年数、地域、共同体密度、主人公、妖怪と電脳怪異の比率は未確定。現在の固有名とSF辺境の詳細は仮設定。
- 生成ガバナンスは文書化したが、offline generator、schema検査、candidate registry、human curation UIは未実装。runtime AIは接続していない。
- 自由放浪、world memory、半自動戦闘、自然に侵食された現代都市、自築拠点、AI concept Cのvisual方向、女性型defaultから始めるcharacter creationは確認済みの上位方向。targeting、防御／itemの手動範囲、拠点配置粒度、GameplayContract、Causal World Cell、残響基盤、WebGPU／HDR profile、StyleProfile／AssetDNA、death／succession、World Loop Proof v0.2の具体仕様は設計提案であり、Cのruntime再現、final asset生成、実機合格はまだない。
- このdesign synthesis iterationではgame code、runtime asset、public buildを変更しておらず、deployも行っていない。
- 上記のdoc-only design synthesisとは別に、2026-08-01のNorth Star iterationではlocal game codeを変更した。公開版とGitHub Pagesは変更しておらず、deployも行っていない。
- 現North Star sceneはPC Ultra描画／半自動戦闘／部位animationと、recognizableな自然侵食現代都市の第一候補を同じ画面で判断できる。Surface Pass v0.2でmulti-channel高解像度面は入ったが、runtime procedural生成のlocal art candidateである。初回同期生成の停止、build-time bake／非同期preload／KTX2、高架駅の構造分節、最終hero／companion、商業HD-2D相当の密度やユーザーart acceptanceは未達。
- 現主人公は既存semantic voxel recipeを部位化した第一段階であり、最終hero design、顔、髪／布のsurface、PBR material、deformation rig、signature motionの完成を意味しない。表示中の調査灯型robotはart review用候補で、開始時加入の仕様変更ではない。
- Visual Fidelity Foundation v0.3でcloth／metal／signalのmaterial responseと画面占有は改善したが、24×32×16 literal voxel source自体の造形不足は残る。次は選定済みCに向け、96-cell級を開始点とするhigh-density micro-voxel sourceをoptimized skinned meshへcompileし、normal gameplay scaleで検証する。
- Visual North Star concept Cは、最終画面のcamera／actor占有／detail frequency／material／light／DOF／hybrid production grammarを評価するtargetである。主人公のbiography／final face、選択可能な種族構成、同行者の加入条件、Cの画面をruntimeで再現できるかは未確認。画像をgameplay captureやaccepted commercial artとして扱わない。
- Git remoteとVisual Pass E中間版のGitHub Pages公開は完了している。Steam公開は行っていない。

## Canonical handoff

- Next work: `docs/NEXT_TASKS.md`
- Real-world results: `docs/OUTCOMES.md`
- Reusable observations: `docs/LEARNINGS.md`
