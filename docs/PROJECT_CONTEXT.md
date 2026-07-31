# Project Context: ゲーム開発

Last updated: 2026-07-31  
Status: active  
Phase: Prototype B public / product design synthesis

## Purpose

仕組みと遊び方で長く遊べる、スマホ対応の生活型ハクスラを開発する。短い依頼と手動戦闘を入口に、装備、異形への対処、帰還結果が次の旅へ巡る小さな自由世界を目指す。初版はブラウザ／PWAで反復し、ゲーム核の合格後にSteam向けdesktop包装を検討する。

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
- 最新一次資料の調査では、Safari 26のWebGPU／HDR Canvas、Three.js WebGPURendererのWebGL2 fallbackとexperimental status、KTX2／Basisのmobile texture利点、2025〜2026年のPBR／rig-aware 3D生成、LLM game-state一貫性とkeypoint validationの現状を確認した。これらは候補技術の確認であり、本project上の実機性能やproduction採用を意味しない。

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
- 世界観、舞台、主人公、妖怪と電脳怪異の比率は未確定。現在のSF辺境は着せ替え可能な仮設定。
- 生成ガバナンスは文書化したが、offline generator、schema検査、candidate registry、human curation UIは未実装。runtime AIは接続していない。
- `GAME_CONSTITUTION.md`と`DESIGN_SYNTHESIS.md`の二つの作品核、GameplayContract、Causal World Cell、残響基盤、三visual表現、WebGPU／HDR profile、StyleProfile／AssetDNA、death／succession、World Loop Proof v0.2は設計提案であり、ユーザーの正式採用、runtime実装、asset生成、実機合格はまだない。
- このdesign synthesis iterationではgame code、runtime asset、public buildを変更しておらず、deployも行っていない。
- Git remoteとVisual Pass E中間版のGitHub Pages公開は完了している。Steam公開は行っていない。

## Canonical handoff

- Next work: `docs/NEXT_TASKS.md`
- Real-world results: `docs/OUTCOMES.md`
- Reusable observations: `docs/LEARNINGS.md`
