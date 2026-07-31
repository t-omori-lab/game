# Next Tasks: ゲーム開発

Last updated: 2026-07-31

## P0

- [ ] `GAME_CONSTITUTION.md`と`DESIGN_SYNTHESIS.md`をユーザーreviewし、二つの作品核を別々に判断する。
  - Gate Aの「近接主体の手動hack-and-slash＋loot／build」と、Gate Bの「自由な放浪＋world memory」をそれぞれ`accepted`／`revise`／`reject`にする。
  - death／継承、主人公一人か複数旅人か、残響基盤案、遠距離攻撃の位置、summer同行者一体か二体かは、核の承認後に決める。
  - Done when: 各項目が`accepted`または比較testへ送られ、推奨defaultを無言で確定しない。
- [ ] Gate Aの`Combat Feel Contract`、`Loot／Build Contract`、`Mobile Interaction Contract`を数値化する。
  - aim assist、attack移動／cancel、間合い、hit stop、guard／dodge受付、敵予兆、tap／hold競合、safe area、loot比較／装備／分解を定義する。
  - Counter cutterとBreach driverをhard gate、Resonance lineを同じ二frameへ付く手動active moduleの目標枠として仮data化し、DPS以外の機械的距離をtest項目にする。
  - Done when: iPhone実機で比較する入力表、frame data、最低二build／目標三build、loot UI wireflow、合否質問が一式になる。
- [ ] Gate Bの`World Loop Proof v0.2`をcode実装前に個別schemaへ分ける。
  - `GameplayContract`、`WorldEvent`、`WorldState`、snapshot／migration、帰還時reducer、二つの同時目的、選んだ二対処、次回90秒以内の可視化を定義する。
  - Event Log Liteとし、combat tick全件ではなくworldを変える高価値eventだけを保存する。
  - IndexedDBはatomic snapshot、直前backup、checksum、quota error、`persisted()`／`persist()`、save export／importを持ち、SafariとHome Screen版のstorage自動継承を仮定しない。
  - Done when: playerが対峙前に目的／routeを選べ、選んだeventから見た目一件＋gameplay一件の次回差分をtable testで説明できる。
- [ ] `Visual Benchmark Scene`の比較仕様を作り、iPhone 16 Proで描画architectureを決める。
  - C0では主人公、同行者、草地／遺構の小vignetteだけをliteral high-density voxel／semantic voxel surface／stylized low-polyで比較し、C1では勝った一案だけで開始町一画面を仕上げる。
  - 同じC1 sceneを`webgpu-hdr-experiment`／`webgpu-sdr`／`webgl2-p3`／`webgl2-srgb`で比較する。
  - 実`visualViewport`、safe area、internal scale、KTX2、MSAA、shadow、限定bloomを記録し、half-float、P3、HDR outputを別々に判定する。
  - Done when: visual方式、backend、render scale、texture／shadow／post budgetが実機evidenceで決まり、voxel／WebGPU採用を名称だけで判断しない。
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
- [ ] 実機結果を基に、最初の敵とtouch操作を一度だけ調整する。
  - 特に「移動しながら防御で回避」が説明なしで伝わるか、最初の屑鉄猟犬が練習相手として強すぎないかを見る。
  - Done when: 30秒以内に移動と手動攻撃が成立し、90秒以内に武器差またはguard成功を体感できる。
- [ ] Prototype Bの開始から三結果・町帰還までをbrowser E2Eで固定する。
  - Done when: 破壊、鎮静、接続の三経路で進行不能がなく、結果画面まで自動検査できる。
- [ ] Prototype Bの依頼結果をversion付きsaveへ接続する。
  - Done when: 再起動後に前回の対処と町の反応が見え、Prototype 0.1 saveを壊さない。

## P1

- [ ] Prototype B評価後、発見／加入／交代できる同行者rosterを設計する。
  - 人型robot、犬／猫、犬型／猫型robot、人物などを同じ外見や役割へ均さず、加入経緯、性格、得意行動、補給方法を個別化する。
  - Done when: 開始時は単独、world内で加入、少なくとも一体を選んで交代、待機場所、自動戦闘ではない命令型能力、離脱／再加入の扱いを一枚の状態遷移で説明できる。
- [ ] 同じsystemへ「妖怪寄り」と「電脳怪異／旧文明寄り」のtheme profileを仮着せし、固有性、読みやすさ、展開可能性で比較する。
- [ ] 名前、噂、依頼文、VoxelRecipe、遺物解説を生成するoffline AI pipelineを設計する。
  - `WORLD_BIBLE.md`と`GENERATION_RULES.md`を入力契約とし、AI出力はJSON schema検査と人間の採否を通し、runtime判定へ直接つながない。
  - Done when: 同じseed／versionのdeterministic部分が同一hashを返し、AI候補はprovenanceと採否を持つ固定dataとしてのみbuildへ入る。
- [ ] 「死亡旅人の遺物を宿敵が拾い、次回に奪還する」永続sliceをPrototype Bへ移植する。
- [ ] 公開URLをiPhoneのホーム画面へ追加し、offline再起動、Prototype B saveを確認する。

## P2

- [ ] 戦闘／依頼／継承loopが合格した後、ElectronまたはTauriによるSteam候補版を比較して包装する。

## Recently completed

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
