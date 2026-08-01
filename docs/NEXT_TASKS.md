# Next Tasks: ゲーム開発

Last updated: 2026-08-01

## P0

Active P0は`North Star Scene v0.1`のみ。以下のcontract、world loop、生成、mobile実機項目は同sceneへ順次接続するqueueであり、North Star候補の制作とvisual reviewをblockしない。

- [ ] PC play前提の`North Star Scene v0.1`を最優先で作る。
  - [x] `?prototype=north-star`を独立routeにし、PC Ultra WebGL2 post stack、半自動通常攻撃、手動大技、部位化主人公、同行者候補previewを一画面へ接続した。
  - [x] North Star routeだけを、道路、横断歩道、鉄道／高架、集合住宅、店舗／診療所、雨水／修理設備の旧用途が読める自然侵食現代都市cellへ置き換えた。baseline start-townは保持した。
  - [ ] 現都市cellを高解像度baked surface、facade／roof microdetail、植生silhouette、lighting compositionで再制作し、procedural box主体の第一候補からcommercial reference級へ引き上げる。
  - 自然に侵食されたrecognizableな現代都市一画面、精密な主人公、同行者候補一体、格下一体、名付き敵一体、遺物effectを同じ固定cameraへ置く。
  - 2560×1440相当のPC Ultraをmasterとし、WebGPU／HDR、half-float lighting、PBR、baked indirect light、高解像度surface、shadow、選択的postを比較する。WebGL2／SDRとmobileは後から同じsceneを縮退する。
  - 主人公／同行者は単一merged voxel meshの上下動に留めず、顔／sensor、衣装／外装、武器、semantic parts、material差、signature pose、part animationを持つhero assetにする。
  - 半自動通常攻撃、build切替、手動大技、敵予兆、hit-stop／camera impulse／light／soundを同じsceneで触れるようにし、rendererだけのdemoにしない。
  - Done when: 2560×1440相当のPC Ultra候補を静止画と操作captureでreviewでき、backend／color outputをcapability evidenceとともに記録する。二buildと大技の差を同じsceneで判断できる。ユーザーのart acceptanceまではcommercial-quality達成と呼ばない。
- [ ] Gate Aの`Combat Feel Contract`、`Loot／Build Contract`、`Mobile Interaction Contract`を、調整を止めない軽量contractとして半自動戦闘へ接続する。
  - [x] `Acquire → Windup → Hit → Recover`、二buildの間合い／周期／移動倍率、dodge cancel、target hysteresisをpure fixed-tick controllerとして実装し、North Star routeへ接続した。
  - [ ] build切替を実戦中に触れる導線、手動大技のbuild固有成立条件、格下／名付き敵の差、loot比較を同じ短いplay loopへ接続する。
  - `Acquire → Windup → Hit → Recover`、target score／drop、attack中の移動／cancel、成立間合い、攻撃周期、manual skill、敵予兆、safe area、loot比較／装備／分解を定義する。
  - guard／dodge、item、target上書き、通常の同行者行動、遠距離通常攻撃をどこまで手動にするか、二案以内で比較する。
  - 遠距離通常攻撃は画面外、遮蔽越し、無制限追尾を禁止し、名付き敵の立ち止まり／manual skillなし安定勝利をhard failにする。
  - Counter cutterとBreach driverをhard gate、Resonance lineを同じ二frameへ付く手動active moduleの目標枠として仮data化し、DPS以外の機械的距離をtest項目にする。
  - Done when: iPhone実機で比較する入力表、target／frame data、最低二build／目標三build、loot UI wireflow、合否質問が一式になり、30秒でauto-engage、90秒でmanual skillを理解できる。
- [ ] Gate Bの`World Loop Proof v0.2`をcode実装前に個別schemaへ分ける。
  - `GameplayContract`、`WorldEvent`、`WorldState`、`BaseSite`、`BaseModule`、`BaseEvent`、帰還時reducer、次回90秒以内の可視化を定義する。
  - 性質の異なる拠点候補地二つ、稼働拠点一つ、機能module候補二つ以上／設置一つへ限定し、reclaim／foundを同じ状態遷移で扱う。
  - Event Log Liteとし、combat tick全件ではなくworldを変える高価値eventだけを保存する。
  - Done when: 二つの拠点候補を自己目的として選べ、選んだsite／moduleから見た目一件＋gameplay一件の次回差分をtable testで説明できる。
- [ ] Gate A／Bとは別に`Release Durability Contract`を固定する。
  - IndexedDBはversion付きsnapshot／migration、atomic snapshot、直前backup、checksum、quota error、`persisted()`／`persist()`、save export／importを持ち、SafariとHome Screen版のstorage自動継承を仮定しない。
  - Done when: 両候補地経路を含む15遠征でcrash、進行不能、save破損0件となり、reload／migration／export／import後もsite、module、item参照が一致する。
- [ ] 現代都市の自然侵食を、最初の一地域の`World Cell`へ具体化する。
  - 旧用途、水／日照／土壌、植生遷移、現在の生活、資源、危険、route、拠点候補を同じ因果で記述する。
  - 崩壊原因、経過年数、地域、共同体密度、妖怪／残響基盤の関係は未決定のまま比較可能にする。
  - Done when: recognizableな現代infra、自然侵食、回収、拠点、encounterが一つの`WorldCellSpec`から説明できる。
- [ ] North Star Scene v0.1の内部workstreamとして、PC Ultra masterの描画architectureとcharacter方式を決め、その後iPhone 16 Proのtierを作る。
  - [x] WebGL2上のhalf-float render target、4× MSAA、GTAO、抑制したbloom、SMAAを既存sceneで動かす技術候補を実装した。WebGPU／HDR profile比較とart採択は未実施。
  - [x] 既存24×32×16主人公をsemantic partsへ分け、weapon socketと7種poseをPC Ultra routeで動かした。これは最終hero造形ではない。
  - C0では主人公、同行者、草地／現代遺構の小vignetteをliteral high-density voxel／semantic voxel surface／stylized low-polyで比較し、C1では勝った一案だけをreference qualityへ仕上げる。
  - 同じC1 sceneを`pc-ultra-webgpu-hdr`／`pc-high-webgpu-sdr`／`webgl2-p3`／`webgl2-srgb`で比較する。
  - PCでは2560×1440相当を起点に、character、surface、indirect light、shadow、AA、postの知覚品質を先に詰める。次にiPhoneの実`visualViewport`、safe area、internal scale、KTX2、MSAA、shadow、限定bloomを決める。
  - Done when: PC masterのvisual方式とhero表現が決まり、同じart sourceからmobile tierへ縮退できる。
- [ ] 主人公一体、同行者一体、武器一つで`AssetDNA` pilotを設計する。
  - version付き`StyleProfile`と、gameplay role、silhouette、semantic parts、material、rig、socket、power／heat／mass、wear、mobile budgetを一つのschemaへ持たせる。
  - AI 3Dはpart／static candidateに限定し、geometry、rig、collision、PBR、actual-camera readability、licenseを検査する。
  - Done when: 同じDNAからgame data、geometry、material、icon、説明、validation reportを生成する一件分のcontractが揃う。
- [ ] 夏版の生成実装は、手作業のWorld Cell一件＋最小schema／参照検査／provenanceへ限定する。
  - 汎用geometry／PBR／rig／sound compiler、candidate registry UI、自動repair agentはGate A＋B合格後へ送る。
  - Done when: 雨水再生塔cell一件を同じstable IDとGameplayContractで説明・検査でき、tool開発がgameplay proofを遅らせない。
- [ ] 公開したVisual Pass Eを、commercial HD-2D完成版ではなくhybrid方向の比較候補としてユーザーreviewする。
  - 地面の質感、建物面、背景、player、生活感、戦闘視認性を分けて評価する。Visual Pass Dは不合格のため基準へ戻さない。
  - Done when: 次に直す一画面と、合格／不合格の理由を3点以内で固定する。
- [ ] hybrid HD-2Dの次のsurface passを、start-town一画面へ限定して実装する。
  - realtime 3Dはmoving character、collision silhouette、occluder、dynamic shadowへ集中し、地面、道、建物面、背景は高解像度albedo、normal、roughness、baked detailを組み合わせる。
  - visualとcollisionの矛盾を自動検査し、生成assetにはsource、generator、制約、採否、content hashを残す。
  - Done when: 大きな単色面、Minecraft的なblock感、surfaceの反復が焦点画面を支配せず、iPhoneの実`visualViewport`でplayerとinteraction routeが読める。
- [ ] Visual Pass E以降のperformance budgetを実機結果から決め直す。
  - local候補は約47〜54fps、35 draw calls、約48〜49k visible trianglesであり、旧60fps目標を満たしたとは扱わない。
  - Done when: iPhone 16 ProのSafari／ホーム画面PWAで同一routeを計測し、内部解像度、pixel ratio、texture、shadowの調整順を決める。
- [ ] 公開済みのdouble tap修正版を、iPhone 16 ProのSafariとホーム画面PWAで再試験する。
  - タイトル、world、HUD、装備欄、攻撃buttonを各5回double tapし、拡大と画面ずれが起きないことを確認する。
  - joystick＋防御の二本指操作、pinchでの倍率復帰、通常の単発tapも併せて確認する。
  - Done when: double tapでscaleとoffsetが変わらず、意図しない拡大が起きてもpinchで元へ戻せる。
- [ ] Prototype BをiPhone 16 Pro実機で10分通し試遊する。
  - 公開URL: `https://t-omori-lab.github.io/game/`
  - 開始、依頼板、移動、二武器、guard／回避、遺物、item、loot、名付き反響体、帰還の順に確認する。
  - Done when: 操作不能、誤入力、文字、safe area、音の判別、発熱、fps低下、もう一度遊びたいか、100点中の評価を記録する。
- [x] Prototype Bを比較可能なまま保持し、別routeでGate Aの半自動戦闘技術spikeを作る。
  - `?prototype=north-star`で`Acquire → Windup → Hit → Recover`とmanual skillをlocal接続した。
  - 30秒以内のauto-engage理解、90秒以内のmanual skill理解、格下／名付き敵の難度差はユーザー試遊待ち。
- [ ] Prototype Bの開始から三結果・町帰還までをbrowser E2Eで固定する。
  - Done when: 破壊、鎮静、接続の三経路で進行不能がなく、結果画面まで自動検査できる。
- [ ] Prototype Bの依頼結果をversion付きsaveへ接続する。
  - Done when: 再起動後に前回の対処と町の反応が見え、Prototype 0.1 saveを壊さない。

## P1

- [ ] Prototype B評価後、発見／加入／交代できる同行者rosterを設計する。
  - 人型robot、犬／猫、犬型／猫型robot、人物などを同じ外見や役割へ均さず、加入経緯、性格、得意行動、補給方法を個別化する。
  - Done when: 開始時は単独、world内で加入、少なくとも一体を選んで交代、待機場所、通常行動とは別の有限resource命令、拠点role、離脱／再加入の扱いを一枚の状態遷移で説明できる。
- [ ] 同じsystemへ「妖怪寄り」と「電脳怪異／旧文明寄り」のtheme profileを仮着せし、固有性、読みやすさ、展開可能性で比較する。
- [ ] 名前、噂、依頼文、VoxelRecipe、遺物解説を生成するoffline AI pipelineを設計する。
  - `WORLD_BIBLE.md`と`GENERATION_RULES.md`を入力契約とし、AI出力はJSON schema検査と人間の採否を通し、runtime判定へ直接つながない。
  - Done when: 同じseed／versionのdeterministic部分が同一hashを返し、AI候補はprovenanceと採否を持つ固定dataとしてのみbuildへ入る。
- [ ] 「死亡旅人の遺物を宿敵が拾い、次回に奪還する」永続sliceをPrototype Bへ移植する。
- [ ] 公開URLをiPhoneのホーム画面へ追加し、offline再起動、Prototype B saveを確認する。

## P2

- [ ] 戦闘／依頼／継承loopが合格した後、ElectronまたはTauriによるSteam候補版を比較して包装する。

## Recently completed

- [x] PC Ultra North Star技術sliceへhalf-float MSAA／GTAO／bloom／SMAA、半自動近接戦闘、部位化主人公と7種poseを統合し、desktop browserでvisual smokeを実施 — 2026-08-01
- [x] 自由放浪、world memory、Elona Mobile型の半自動戦闘、自然に侵食された現代都市、自築拠点を上位方向として作品憲法と設計正本へ反映 — 2026-08-01
- [x] これまでの要求を、提案中の仮称「世界記憶型・放浪生活ハクスラ」として統合し、短い`GAME_CONSTITUTION.md`、Gate A／B／C、Causal World Cell、GameplayContract、StyleProfile／AssetDNA、mobile renderer tierを設計 — 2026-07-31
- [x] Safari／Three.js／KTX2、2025〜2026年の3D／rig生成、PCG／LLM検証、Steam AI申告の一次資料を調査し、採用／保留境界を設計文書へ反映 — 2026-07-31
- [x] Prototype 0.1を比較用のlocal commitとquery routeに保存 — 2026-07-30
- [x] 16³ voxel core、hidden-face mesher、11 recipeを実装 — 2026-07-30
- [x] Three.js固定俯瞰renderer、追従camera、連続scroll worldを実装 — 2026-07-30
- [x] 手動戦闘、二武器、guard／回避、遺物、item、lootを実装 — 2026-07-30
- [x] 町―三叉路―廃区、名付き反響体、三結果、procedural soundを実装 — 2026-07-30
- [x] Vitest 85件、strict TypeScript、production build、mobile相当browser QAを合格 — 2026-07-31
- [x] 分岐鍵の経路、探索へ戻る導線、縦画面pause、防御／回避、keyboard、音声復帰をreview修正 — 2026-07-31
- [x] `t-omori-lab/game`を作成し、GitHub PagesへPrototype Bを公開 — 2026-07-31
- [x] double tap拡大をgesture policyと回帰testで修正し、GitHub Pagesへ反映 — 2026-07-31
- [x] local Visual Pass Cでdaylight ruin palette、低cost草花、16×24×12 player、可変voxel recipe schemaを実装 — 2026-07-31
- [x] Visual Pass Cをlocal検証し、brightness／readabilityは改善したがcommercial art barには未達と判定 — 2026-07-31
- [x] Visual Pass Dでstart-townの高密度props、生活の痕跡、24×32×16 playerを実装し、ユーザーreviewでcommercial art gate不合格を確認 — 2026-07-31
- [x] Visual Pass Eのlocal中間候補へMSAA、高内部解像度、AgX、条件付きDisplay-P3、生成meadow texture、ground overscanを実装 — 2026-07-31
- [x] start-townのsolid-looking fixture 6区画へsimulation colliderを追加し、route／掲示板到達性を回帰testで維持 — 2026-07-31
- [x] `WORLD_BIBLE.md`と`GENERATION_RULES.md`を追加し、設定statusと開発時生成ガバナンスをv0.1 draftとして固定 — 2026-07-31
- [x] Visual Pass E候補でVitest 116件、strict TypeScript、production build、production preview、texture fallbackを確認。iPhone実機性能は未確認 — 2026-07-31
- [x] commit `773aaf6`をGitHub Pagesへ反映し、run #7成功、新JS／WebP／service worker／manifestの200応答と公開mobile browser操作を確認 — 2026-07-31
