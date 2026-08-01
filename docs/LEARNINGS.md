# Learnings: ゲーム開発

Last updated: 2026-08-01

## Validated project learnings

- Prototype 0.1の「遊べるが約20点」という評価から、技術的完成とゲーム核の適合は別であると確認できた。不一致は自動化一般ではなく、固定arenaで接近、位置取り、target、大技の判断を伴わず常時自動遠隔攻撃を眺める構造だった。scroll探索とplayer判断へ核を移す必要がある。
- simulationを表示から分離し、seedと30Hz tickへ限定すると、rendererをPhaserからThree.jsへ変えても、戦闘、分岐、replayをbrowserなしで再現検査できる。
- 16×16×16を実行時のcube数ではなくauthoring gridとして扱い、隠れ面を除去した単一geometryへ変換すると、画像assetなしで立体silhouetteを作れる。
- fixed orthographic camera、low-resolution world canvas、crisp HTML HUD、blob shadowの組合せは、自由回転cameraやdynamic shadowなしでも奥行きと操作視認性を出せる。
- 既定runtimeをThree.js、旧runtimeをquery指定のdynamic importに分けると、旧試作を比較用に残しながらPhaserを既定bundleから分離できる。
- dynamic importした既定runtimeは、HTMLからassetを発見する現在のservice workerではinstall時precache対象にならない。既定runtimeはstatic importにし、比較用の旧runtimeだけをdynamic importする。
- SF itemを「効果／原理仮説／副作用／使用者メモ」に分けると、単なる数値modifierへ世界観と収集欲を載せられる。AI候補生成にもschemaを与えられる。
- procedurally生成した短い波形とnoiseでも、速い刃、重い衝撃、guard、遺物、結果の役割を分けられる。実機ではspeaker特性と音量balanceの再確認が必要。
- 852×393相当のlocal browserでは初期画面約25 draw calls／約18k triangles、表示60fps、console error 0件だった。これは実機性能の証明ではない。
- keyboard／pointerの非常に短いtapは30Hz tick間にdown/upが終わり得る。移動tapを一tickだけqueueすると、操作とE2Eの取りこぼしを防げる。
- 複数buttonを同時に使うtouch actionは入力順へ依存させず、保持状態と「組合せが成立した瞬間」を分離すると、回避後も防御へ自然に戻せる。
- quest分岐の必要itemは、対峙triggerより十分外で取得可能かを配置invariantと初期地点からの連続移動testで検証する。選択modalにも探索へ戻る出口が必要。
- mobileの縦向き案内は画面を覆うだけでなく、simulationと保持入力も止める。Web Audioのschedulerはmute／background復帰時に過去時刻を再生せず現在時刻へrebaseする。
- local browserで戦闘せず街道のlootへ向かうと、最初の敵に敗北した。手動対応を要求する設計は成立している一方、練習敵としての強さは実機試遊で調整が必要。
- GitHub Pagesのproject siteでは、Viteの`base`とWeb App Manifestの`id`を公開subpathへ固定する。asset URLが偶然動いても、manifestの相対`id`は別の基準で解決され、PWA identityがorigin rootを指し得る。
- 新規repositoryのPages sourceをGitHub Actionsへ切り替える前に初回workflowを走らせると、buildが正しくてもdeployは失敗する。source保存後に再実行し、最新commitの成功runと公開HTTP応答を別々に確認する。
- fullscreen web gameでは、外枠だけの`touch-action: none`と`user-scalable=no`へ依存すると、iOSで拡大だけ成立し縮小操作を失う可能性がある。local mobile Chromeでは、通常UIの実touch対象を`manipulation`、joystickや同時押しactionだけを`none`に分けると、double tap、pinch復帰、multi-touch操作のgesture policyを分離できた。iOS Safari／PWAでの有効性は実機再確認が必要。
- 終末世界の過酷さを暗いfog、低明度palette、強いvignetteで画面全体へ掛けると、探索したい世界とplayer判読性まで失われる。環境は昼光、自然、水、錆で美しく保ち、危険をenemy silhouette、赤橙の予兆、音へ局所化すると、深刻さと旅の魅力を分離できる。
- `MeshBasicMaterial`中心のrendererではlightやexposureを足しても主因は変わらない。今回の暗さはcamera距離に対して強すぎる`FogExp2`、地面自体の低明度、screen overlayの三重掛けであり、fog density、source palette、overlay opacityを同時に直す必要があった。
- 16³を全assetの上限にせず、recipe固有のwidth／height／depthへすると、背景資産を壊さず重要characterだけを高密度化できる。16×24×12 playerは1 mesh／1,484 trianglesで、local 852×393では26 draw calls／22,148 triangles／60fps表示を維持しながら、顔、髪、手足、coat、weaponの判読性を増やせた。実機性能の証明ではない。
- voxel数、props、生活小物を増やしても、低い内部解像度、antialiasing不足、大きな単色面、surface texture不足が残ればcommercial-qualityには見えない。Visual Pass Dのユーザー不合格から、geometry密度と最終画面の美しさは別のgateとして評価する必要がある。
- 生成textureは、画像を作っただけでは製品assetにならない。source、生成条件、禁止事項、用途、scale、採否を記録し、Web向けformatへ変換したうえで、UV repeat、mipmap、anisotropy、seam、反復pattern、gameplay readabilityを実画面で確認する。
- AgX tone mapping、emissive、Display-P3は画面改善の手段だが、true HDRの証明ではない。sRGBをbaselineにし、広色域はdeviceの`color-gamut`とWebGL drawing bufferの対応を確認できる場合だけ段階的に有効化すると、unsupported環境の色崩れを避けられる。
- Three.jsの頂点色attributeはLinear-sRGB値を前提とする。authoring paletteの16進sRGBを単純に255除算するとAgX／lit material経路で中間色が白っぽくなるため、sRGB EOTFで線形化してからface shadeを掛ける。`0x808080`が約`0.216`になる回帰testを持たせる。
- JavaScriptからimportした生成textureは、HTMLの`href`／`src`だけを探索するservice workerでは初回precacheから漏れる。Viteがhash付きURLへ変換する画像preloadをbuilt HTMLへ置き、さらにTextureLoaderのerror時はvertex-color地面へ戻すと、初回installとasset障害を別々に守れる。
- rendererだけにsolid-looking fixtureを足すと、見た目では塞がっているのにsimulationでは通過できる。visual fixtureごとにcollision ID、interaction reachability、退路を紐付け、追加した6区画を移動testへ入れることで表示とruleの乖離を防げた。
- 未加入のcompanion候補を開始画面へ置くと「最初から固定相棒」という別の仕様に見える。asset previewとgameplay spawn条件を分離し、加入eventが実装されるまでは通常開始画面で非表示にする。
- Visual Pass Eの852×393 local browserは35 draw calls／約48〜49k visible trianglesで約47〜54fpsだった。旧Visual Pass Cの60fps表示より重く、内部解像度、texture、shadowの増加は同じlocal budget内でもfpsへ効く。local Chromeの数値からiPhone 16 Proの性能を推定せず、実機Safari／PWAで測る。
- PC masterを先に作る場合、baseline rendererを直接置換せず独立quality routeとfallbackを残すと、half-float post stackや高DPI cameraを大胆に試しながら、既存mobile比較版を壊さずに済む。mobile budgetは後段の縮退規則として扱い、制作時の上限へしない。
- 高密度voxel recipeを単一meshで上下動させるだけでは、形状を増やしてもcharacter actingにならない。頭、胴、左右腕、左右脚、装備へsemantic分割し、weapon socketとwindup／hit／recoveryを持たせると、同じ24×32×16 sourceでも攻撃意図を画面上で読ませられる。ただしこれは造形そのものの完成ではない。
- PC Ultraのhalf-float render target、MSAA、GTAO、bloom、SMAAはedge、接地、highlightを改善するが、既存のblockyな町をcommercial HD-2Dへ変えるものではない。recognizableな都市構成、高解像度surface、hero art、material、animation、lighting compositionを同じreference cellで作る必要がある。
- 半自動通常攻撃をpure fixed-tick controllerへ分けると、simulationへ渡すのは`attack`と移動倍率だけになり、target／windup ring、HUD、hero poseは同じpresentation stateから派生できる。game ruleと演出の同期点を一つに保てる。
- `Hit`をgame rule上の1 tickにすると、30Hz simulationでは正しくても60Hz以上のrender frameへ表示されないことがある。damageは1 tickのまま、heroのfollow-throughは`player-attacked` eventから短いrender clockで再生し、大技／武器切替はauto controllerを明示的に抑止すると、ruleの決定性と読めるactionを両立できる。
- headless desktop Chromeの1600×900／device pixel ratio 1で1598×898内部解像度を確認できても、Retina desktopの2倍scale、HDR display、wide color、WebGPU性能の証明にはならない。quality名ではなく実deviceの内部解像度、pipeline status、frame time、最終画面を別々に記録する。
- baselineとNorth Starの環境を`qualityProfile`だけで分けると、baseline体験へPC描画だけを適用する組合せまで都市化し得る。`experience → environmentProfile`を明示してart factoryだけを差し替えると、simulation、collision、interaction、比較版を保ったまま一画面を大胆に改稿できる。
- fixed cameraの建物は、camera-facing側へ窓、庇、看板、tile、補修跡を置かなければ、高密度にauthoringしても最終画面では巨大な無地boxに見える。実画面の第一稿で方角誤りを検出し、正面を反転して初めて旧用途が読めた。geometry countではなくactual-camera screenshotをart gateにする。
- 小さなprocedural舗装textureをnearest相当で反復すると、解像度を上げてもmoireと布目状patternが目立つ。512²以上、linear magnification、mipmap minification、anisotropyを組み合わせ、道路標示も完全な白ではなく風化／分節させると、主人公と戦闘記号を保ったまま現代道路を読ませやすい。
- 1024²へ上げても、macro補修を数回repeatしたり、固定cellへ必ず骨材を置くと、実画面では「高精細な生成tile」や点格子として規則が露出する。macro wearは一画面に一回程度、micro aggregateは候補cellから疎に採用し、actual-camera screenshotで反復を検出してから採用する。
- BoxGeometryの全6面へ同じ0..1 UVを貼ると、ひび、雨筋、補修が同形反復し、面寸法によって物理scaleも変わる。fixed cameraで同時に見える面は実寸aspectでUV範囲を決め、法線方向別offsetを持たせる。最終assetではtileable microdetailと一回性macro decalを分離する。
- 高解像度albedo／normal／roughnessをruntimeで同期生成すると、再現性と候補制作には便利でも初回main threadを止める。source field／digest cacheはrenderer restartの再計算を避けられるが、productionではversioned build-time bake、非同期preload、KTX2等へ移す必要がある。

## Working hypotheses to validate

- Prototype Bには二つの独立した不足がある可能性が高い。Gate Aでは条件付き自動通常攻撃、手動大技、loot比較、異なるbuildを、Gate Bでは自分で選ぶ同時目的／拠点と、一回目が二回目のloadout／routeを変える因果を別々に検証する。一方を他方の代替にしない。
- 通常攻撃を自動化するとsmartphoneの連打負荷を減らせる可能性がある。ただし深さは、接敵、間合い、target優先、撤退、build固有の攻撃周期、有限resourceの大技へ移さなければならない。格下は自動で処理でき、名付き敵は立ち止まったままでは安定して倒せない難度差を比較する。
- 自築拠点は独立した建築gameへ広げず、放浪の成果とworld memoryを物理化する最初の永続因果にできる可能性がある。候補地二つ、機能module候補二つ以上／今回設置一つ、次回差分一つで「場所と設備の選択が次の遠征を変えるか」を先に試す。
- 人類激減と自然に侵食された現代都市は確認済みの方向だが、魅力は草や廃墟の量だけでは生まれない。旧用途、水／日照／土壌、植生遷移、現在の生活、route、資源を同じ因果から作る必要があるという点は検証仮説である。
- 人物、monster、item、遺跡を単品生成するより、旧用途、現在資源、actor need、衝突、証拠、複数対処、reward、world mutation、future hookを一つのCausal World Cellとして先に作る方が、装飾的な生成物を減らし、gameplayへ接続しやすい可能性が高い。
- 主人公／同行者の完成meshを一発生成するより、version付きStyleProfileと、role、silhouette、semantic parts、material、rig、socket、物理budget、wearを持つAssetDNAからgeometryとgame dataをcompileする方が、シリーズ内一貫性、mobile budget、item合成、破損表現を両立しやすい。最新3D／rig生成はpart／static candidateとして比較する。
- literal high-density voxel、semantic voxel surface、stylized low-polyは、同じcamera、light、animation、effectで比較するまで優劣を確定しない。人型／犬猫の変形meshは、既知rigとedge loopを持つmodular topologyを正本にする案が安全である。
- 最高品質層はPC Ultra masterで比較し、iPhoneは同じsceneから派生するmobile tierとしてWebGPU／HDRを試す。Three.js WebGPURendererはexperimentalであり、API移行だけでは美しさを保証しない。同一Visual Benchmark SceneをWebGPU／WebGL2、HDR／SDR、複数render scaleで実機比較し、baked hybrid、KTX2、character qualityの寄与を分離する。half-float内部照明、P3、HDR outputは別能力として測る。
- fixed cameraでは、moving character、collision、occlusion、dynamic shadowだけをrealtime 3Dへ残し、地面、道、背景、建物面を高解像度生成／baked layerへ分けることで、見える面へquality budgetを集中できる可能性が高い。まだユーザーのart acceptanceは得ていない。light direction、palette、scale、contact shadowを同一camera previewで検査し、2D／3Dの貼り合わせ感が出ないか確かめる。
- MSAA、高い内部解像度、AgX、生成textureの組合せがVisual Pass Dより商業HD-2D基準へ近づくかは未確認である。公開後のユーザーreviewをquality gateにする。

## Improvement candidates

- iPhoneへのLAN内HTTP共有とPWA install／offline検証を分け、後者にはHTTPS previewを標準手順として用意する。
  - reuse_count: 1
  - promotion_status: observed
- hidden-face voxel geometryのtriangle／draw-call budgetをasset validationへ追加する。
  - reuse_count: 1
  - promotion_status: observed

## Candidate template

```yaml
observed_at:
problem:
observation:
evidence:
applies_to:
does_not_apply_to:
proposed_change:
validation:
reuse_count: 1
promotion_status: observed
```

1案件の観察は自動的に共通ルールへ昇格させません。
