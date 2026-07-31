# Outcomes: ゲーム開発

Last updated: 2026-07-31

## Confirmed

- Prototype 0.1はユーザー試遊で「ゲームとして一応出来上がっている」点を認められた一方、評価は約20点だった。
- 主な不一致は、固定arena、常時自動遠隔攻撃、タワーディフェンス的な手触りであり、ユーザーは自分で攻撃、防御、item、skillを使うハクスラを求めている。
- ユーザーは、固定俯瞰voxel、scroll探索、手動戦闘、Elona／ルナティックドーン寄りのPrototype B実装を承認した。
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
- Visual Pass Eのlocal中間候補は、WebGL MSAA、854×480基準の内部解像度、AgX tone mapping、sRGB baseline、対応環境だけのDisplay-P3、1024×1024生成meadow textureを統合した。開始時の調査灯型robotは非表示を維持した。
- start-townの修理跡、畑、洗濯、作業台、道具等の生活表現を維持し、見た目上solidなfixture 6区画へsimulation colliderを接続した。町のrouteと掲示板interactionは回帰testで到達可能を維持した。
- Visual Pass E候補はVitest 116件、strict TypeScript、production buildが合格した。852×393のproduction previewでは60fps表示、35〜37 draw calls、49,520〜49,616 visible triangles、double tap前後scale 1／offset 0、browser error 0件、ground textureの`ready`を観測した。別検査でtexture取得を強制失敗させた場合も`fallback`表示へ移行した。
- `WORLD_BIBLE.md`と`GENERATION_RULES.md`をv0.1 draftとして追加し、設定の確定／仮説／未決定と、開発時生成のseed、schema、provenance、検証、人間採否、fallbackを分離した。

## Pending confirmation

- [ ] Prototype Bのユーザー試遊評価がPrototype 0.1の約20点から改善するか。
- [ ] Visual Pass EがGitHub Pagesへ反映され、公開asset、service worker、画面がlocal候補と一致するか。
- [ ] Visual Pass Eのhybrid方向がユーザーのcommercial benchmarkへ近づいたと評価されるか。現時点でcommercial HD-2Dと同等とは確認されていない。
- [ ] 高密度playerが通常画面で成立し、調査灯型robotが開始時非表示のままroster候補assetとして別previewで成立するか。
- [ ] Display-P3、AgX、emissiveがiPhone 16 ProのSafari／PWAで意図した色と階調になるか。true HDR出力は未確認。
- [ ] iPhone 16 Pro実機で10分間の操作・performance・発熱基準を満たすか。
- [ ] 二武器、guard／回避、遺物、三つの対処が説明なしで判別できるか。
- [ ] 10分遊んだ本人が自発的に二回目を始めたくなるか。
- [ ] 前回の依頼結果を次回90秒以内に認識できる永続loopが成立するか。
- [ ] HTTPS環境でPWA install、offline再起動、IndexedDB保存が成立するか。
- [ ] local修正版で、iPhone 16 ProのSafari／ホーム画面PWAともdouble tap拡大が再発しないか。
- [ ] Visual Pass E公開後の実利用、Steam審査、販売が生じた場合は別途記録する。

## Rule

local実装・browser検査と、実機試遊・公開・実利用を分け、未確認事項を推測で完了にしません。
