# Game Brief: 辺境遺物録（仮）

Last updated: 2026-08-01

## Document map

- 1ページの作品方針、確定要求、提案中の核、次のproof、要判断事項: [GAME_CONSTITUTION.md](./GAME_CONSTITUTION.md)
- 要求統合、core loop、不足設計、mobile visual、character／world生成architecture、summer slice: [DESIGN_SYNTHESIS.md](./DESIGN_SYNTHESIS.md)
- 世界、人物、地図、遺跡、item、monster、同行者の設定status: [WORLD_BIBLE.md](./WORLD_BIBLE.md)
- 開発時生成、科学的／世界内制約、schema、provenance、人間採否: [GENERATION_RULES.md](./GENERATION_RULES.md)
- 現在の実装事実、local／public／実機の確認境界: [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md)
- 長期判断と置換関係: [DECISIONS.md](./DECISIONS.md)

## Product promise

人類が激減し、自然に侵食された現代都市を自由に歩く。通常戦闘は装備へ任せ、移動、位置取り、撤退、大技の時機を自分で決める。遺物を回収して装備を組み、選んだ土地へ拠点を築き、その結果が次の旅へ巡る生活型ハクスラを作る。

豪華な素材量ではなく、武器の手触り、依頼、探索、遺物の奇妙な用途、世界反応の組合せで長く遊べることを目指す。

設計上の仮称は「世界記憶型・放浪生活ハクスラ」。自由放浪、world memory、半自動戦闘、自然に侵食された現代都市、自築拠点は確認済みの上位方向であり、正式genre名、戦闘の細部、設定の因果は未決定である。作品方針は[GAME_CONSTITUTION.md](./GAME_CONSTITUTION.md)、詳細と現prototypeとの差は[DESIGN_SYNTHESIS.md](./DESIGN_SYNTHESIS.md)を正本とする。

## Prototype history

### Prototype 0.1「境界調査録」

- 固定arena、自動遠隔攻撃、3択強化、最小WorldLegacyを実装。
- 技術原型としては完成したが、ユーザー試遊は約20点。
- 固定arenaで常時自動遠隔攻撃を眺める構造がタワーディフェンス的で、求める放浪・ハクスラ体験と違った。通常攻撃の自動化すべてを否定した結果ではない。
- `?prototype=0.1`で比較用に保持する。

### Prototype B「辺境遺物録」

local実装済み:

- 町―三叉路―聴取廃区を連続scrollするworld。
- fixed orthographic cameraと、realtime 3D character／collision／occlusionに高解像度生成／baked surfaceを組み合わせるhybrid renderer。
- 24×32×16 playerと、開始時には表示しない高密度companion候補asset。
- 測量刃、杭打機、guard／just guard、回避、斥力環、回復item。
- 通常敵3種、名付き反響体1体、loot 6種。
- 破壊、鎮静、接続の三結果と町への帰還。
- 効果、原理仮説、副作用、使用者メモを持つSF遺物dossier。
- procedural exploration／danger／combat sound。
- Visual Pass Eのlocal中間候補として、MSAA、854×480基準の内部解像度、AgX、sRGB baseline、条件付きDisplay-P3、生成meadow texture、生活小物、表示と一致する町colliderを統合した。
- Vitest 116件、strict TypeScript、production build、production previewが合格した。

未実装:

- Prototype B結果の永続saveと次回world反映。
- 宿敵が死亡旅人の装備を拾い、次回に奪還する仕組み。
- 複数依頼、生活技能、経済、NPC関係、長期build。
- AIによる検査済みcontent pipeline。
- 地面、道、建物面、背景をcommercial benchmarkまで仕上げる複数surface material pipeline。
- iPhone 16 Pro実機の10分性能合格、HTTPS PWA install、Steam包装。
- 公開Visual Pass Eのユーザーart acceptance。

## Confirmed taste signals

- ルナティックドーン、Elona、Kenshi、Oblivionのように、放浪し、生き方や目的を自分で選べる。
- 戦闘はElona Mobileに近く、通常戦闘を自動化し、大技skillを手動で使う感覚が近い。
- 選ばれた英雄ではない人物から始まり、世界がplayerの外でも続いている。
- Diablo、おっさん or die、Metal Maxのように、装備、能力、乗り物を組み合わせて強くなる。
- Undertaleのように、敵を倒す以外の対処と、その結果への世界反応がある。
- ラグランジュポイントのように、武器system、SF設定、soundが一体で記憶に残る。
- 攻殻機動隊、Cyberpunk 2077、Watch Dogsにある、監視、network、身体拡張、都市の裏側という題材が好みに合う。
- 『少女終末旅行』『世界が終わっても生きるのって楽しい』『ウスズミの果て』のように、文明の残骸を旅しながら、食事、修理、補給、休息、小さな発見に生活の楽しさが宿る。
- 人類は危機にあっても常時悲壮的にはせず、「まだ負けていない」と、荒廃へ現実的かつ楽天的に対応する。
- 人類は激減し、現代的な都市、道路、鉄道、住宅、商業／公共施設が自然に侵食され、新しい生態と生活へ転用されている。
- 死や喪失は起きるが、世界全体を長い哀歌にしない。死はときに予告も美化もなく、あっさり訪れる。
- 『リビルドワールド』のように、危険地帯の旧世界遺物を回収し、解析、換金、装備更新、次の探索へ循環させる。
- 謎のSF道具を妙に具体的な原理と副作用で説明する面白さがある。
- 計算で描くvoxel、線、円弧、粒子を中心にしつつ、画面として美しい。
- 既存の遺構を復旧するか、条件の合う土地を選び、自分の拠点を築く。

参考作の固有設定、文章、人物、画面、音楽は複製せず、system上の役割と情報構造だけを抽出する。

## World tone contract

- 平時の感情baselineは、悲しみではなく好奇心、実用、生活、乾いた冗談、前進。
- 廃墟は「過去が死んだ記念碑」だけでなく、屋根を継ぎ、洗濯物を干し、畑を作り、古い機械で湯を沸かす現在の生活場所として描く。
- 人々は危機を理解しているが、毎回深刻な演説をせず、修理、商売、食事、依頼、移動へ普通に取り組む。
- 明るさは危険の否定ではない。敵の予兆、負傷、resource不足、突然の死は簡潔かつ明確に扱う。
- 死を長い感傷演出や英雄化で包まず、残された装備、空いた寝床、短い噂などworld stateの変化で後から効かせる。
- humorは緊張を壊すための漫才ではなく、奇妙な遺物の副作用、現場の工夫、生活者の慣れから自然に生む。

## Prototype B playable loop

### First 30 seconds

1. 町の依頼板を調べる。
2. 自分で移動し、測量刃を振る。
3. loadoutをtapして杭打機へ持ち替え、速度、間合い、impact差を知る。
4. 敵の予兆にguard、just guard、方向＋guardの回避で対応する。

### Ten-minute route

1. 町で聴取廃区の未分類信号を受注する。
2. 三叉路までの敵を避けるか倒す。
3. 6種のlootから武器強化、回復、遺物強化、特殊な鍵を拾う。
4. 廃区で名付き反響体《オリソン》と対峙する。
5. 破壊、無音鈴による鎮静、信号鍵による接続から選ぶ。
6. 町へ戻り、異なる帰還記録を見る。

### Multiple runs

Gate Bで最初に検証する:

- 前回の対処が町の噂、価格、敵、信号のいずれかを変える。
- 同じ空間へ二つ以上の目的を置き、対峙前に目的／routeを自分で選べる。
- 性質の異なる拠点候補から一つを選び、復旧または新設した機能が次の遠征を変える。
- 前回の結果は次回開始90秒以内に見える。

死亡した旅人の装備を宿敵が拾い、次の旅人が奪還、回避、取引する仕組みは有力な拡張案だが、Gate Bの最小scopeには含めない。

## Target vertical-slice content budget

- 分岐地域1、廃区1、拠点候補地2、稼働拠点1。
- 拠点core 1、機能module候補2以上／設置1。完全自由建築editorは含めない。
- 主人公表現1、Gate C用の同行者比較候補1、武器表現2。voxel／semantic surface／low-polyの採用比率はGate Cまで固定しない。
- 通常敵3、名付き異形1。
- meaningful loot 6、回復item 1、active relic 1。
- quest outcome 3。
- procedural sound: 探索、危険、武器2、敵予兆／衝撃、guard、just guard、回避、遺物、item、結果。
- 基準端末はiPhone 16 Pro横画面。

## Theme abstraction

正式themeは未決定。内部では次の対応余地を残す。

| Internal concept | 妖怪寄り | 電脳怪異／旧文明寄り |
|---|---|---|
| traveler | 旅人、退魔師、流れ者 | 調査員、運び屋、辺境技師 |
| anomaly | 妖怪、怪異、付喪神 | 反響体、暴走機械、network残留人格 |
| relic | 札、器、記憶 | 未分類機器、身体拡張、protocol鍵 |
| contract | 退治、封印、回収 | 調査、停止、接続、回収 |
| history | 噂、祟り、土地の記憶 | log、監視記録、地域network |

## Visual direction

- fixed isometric寄りのorthographic camera。自由回転しない。
- 背景小物は16³を維持できるが、hero assetは可変grid。playerは24×32×16、同行者候補も役割に応じて高密度化する。
- 小画面でのsilhouette、negative space、前後差を優先し、hero paletteはmatte／metal／emissiveの役割を分ける。
- moving character、collision silhouette、occluder、dynamic shadow、interactive effectは、hidden faceを除去したgeometryを含むrealtime 3Dで描画する。
- 地面、道、背景、建物面はvoxelへ固執せず、高解像度の生成／baked albedo、normal、roughness、detail layerを使える。ただし固定camera内でscale、palette、light direction、contact shadowを3D assetと一致させる。
- world canvasはMSAAと十分な内部解像度をbaselineにし、HUDはcrispなHTML/CSSに分離する。低解像度nearest-neighbor拡大を画面全体の標準にはしない。
- tone mappingはAgX、色出力はsRGBをbaselineとする。Display-P3は現project固有のcolor-space登録と`drawingBufferColorSpace` probeが通るときだけ有効化し、stock Three.js設定とはみなさない。HDR的な明暗と色を目指してもtrue HDR達成済みとは扱わない。
- literal high-density voxel、semantic voxel surface、stylized low-polyを、同じcamera、light、animation、effectで比較してからcharacter表現を決める。
- version付き`StyleProfile`でcamera、world scale、light、palette、material family、texel density、edge、shadow、摩耗、LOD、effect密度を全assetへ共有する。
- textureはmipmap、anisotropy、適切なUV scaleを持ち、seam、反復pattern、圧縮artifact、戦闘視認性をiPhoneの実`visualViewport`で検査する。
- sage、花、淡い石、陽光、錆、陶器、修理布を使い、荒廃の中に生活と色を残す。signal cyan、warning amber、danger redは意味色として限定する。
- hemisphere／directional key light、限定shadow、blob shadow、fog、effect-linked point light、attack arc、ring、voxel burstを使う。
- 生活の痕跡として、修理跡、掲示物、容器、配線、鉢植え、洗濯、食事や仕事の道具を、戦闘視認性を壊さない範囲で置く。
- 「neon on black」だけの既視感あるcyberpunkへ寄せない。

## Relic information model

各遺物は次を持つ。

- 呼称とcatalog番号
- 実際のgameplay効果
- 世界内で信じられている作動原理
- 副作用または誤作動
- 発見者／使用者の短い所感
- 確認済み情報と仮説の区別

## AI boundary

- 戦闘判定、数値、報酬、world stateへruntime生成AIを使わない。
- 人物、地図、遺跡、item、武器、monster、名前、噂、依頼、VoxelRecipe、遺物解説、来歴、visual、audioは、原則として開発時に候補生成する。
- deterministic codeが物理／energy／熱／stress、合成可否、数値、到達性、報酬を決める。AIは許可されたsemantic fieldの候補だけを提案する。
- 出力はstable ID、seed、generator version、hash、source、validation、人間の採否を持ち、`accept`された固定dataだけを収録する。実装契約は[GENERATION_RULES.md](./GENERATION_RULES.md)に従う。
- 固有作品の文体模倣、クライアントへのAPI key、無検査live生成は初版対象外。

## Post-prototype concept: discoverable companion roster

現行prototypeでは候補assetだけを保持し、通常の開始画面では非表示にする。開始時の固定相棒やgameplay能力は追加しない。正式な同行者は旅の途中で発見、救助、雇用、依頼、交渉などを通じて加入する。

- 主人公: 移動、回避、近距離物理、遠距離物理の主体。
- 同行者は一体だけの固有partnerではなく、加入済みrosterから旅へ連れていく相手を入れ替えられる。
- 候補は人型robot、生活する犬や猫、犬型／猫型robot、遺物解析機、各地の人物など。生物と機械を同じ外見へ揃えない。
- 各同行者は固有の加入経緯、性格、得意行動、装備またはmodule、会話反応、関係変化を持つ。
- 初期版の同行枠数は未決定。少なくとも一体を選んで交代でき、待機中の仲間もworld内に居場所を持つ構造を優先する。
- 技術系同行者は、機械的／技術的遺物の解析、module組込み、特殊技／大技を担当できる。
- 特殊能力は使用回数またはenergy制とし、補給、修理、充電、食事、休息など、種別に応じた回復判断を作る。
- 現行の斥力環は、技術系同行者moduleへ移行できる最初の候補。
- 通常行動は自動化できるが、同行者を受動DPSだけにしない。探索verb、拠点role、命令する有限resource行動を分ける。
- 既存作品からは「旅の途中で仲間になり、一緒に行動し、交代できる」という構造だけを参照し、外見、人物像、台詞、設定は模倣しない。

このroster案は、終末的な辺境でも「生きることが楽しい」旅の生活感と接続する。戦闘以外にも、食事、充電、修理、遺物の鑑定、野営時の短い反応を通じ、誰と移動するかを一回ごとの冒険の選択にする。

## Success gates

### Gate A — Position-and-build

- 30秒以内に「間合いへ入ると通常攻撃し、離れると停止する」を説明なしで理解できる。
- 90秒以内に有限resourceの大技を自分の判断で使い、武器差または介入成功を体感できる。
- 格下は自動処理できるが、名付き敵は立ち止まり／大技なしでは安定勝利できず、位置変更、撤退、大技のいずれかを要求する。
- 遠距離通常攻撃は画面外、遮蔽越し、無制限追尾でtargetを取り続けない。
- 最低二buildについて、数値以外の立ち回り差と代償を説明できる。第三buildは目標枠として別判定する。
- lootの比較、装備、保管／分解を小画面で迷わず行える。

### Gate B — Roam／settle／remember

- 性質の異なる二つの拠点候補を自己目的として理解し、どちらを調査／確保するかを選べる。
- 選んだ候補地へ機能moduleを一つ復旧／設置できる。
- 一回の結果が次回90秒以内に見た目とgameplayを一件ずつ変える。
- 「何が変わったか」「なぜ変わったか」「そのため次に何を変えたか」を説明できる。

### Release durability gate

- atomic save、直前backup、checksum、export／importが成立し、Safari版とHome Screen版のstorageを自動的に同一とみなさない。
- 15遠征でcrash、進行不能、save破損が0件。

### Gate C — Visual benchmark

- 主人公＋同行者＋小背景vignetteを三表現で同条件比較し、一案を採用できる。
- 勝った一案だけで開始町一画面を仕上げ、商業品質方向の基準sceneにできる。
- iPhone 16 Proで10分間、操作不能、500ms級停止、戻せない拡大がない。
- 選択profileのp95 frame-time目標、safe area、実`visualViewport`、色、発熱観察を記録する。

内部gameplay proofはGate A＋Bで成立する。ユーザーへ目標品質の完成候補として公開する版はGate A＋B＋C＋release durabilityを必要とする。

## Non-goals for the first release

- 広大な完全seamless world。
- 全NPCの常時生活simulation。
- 完全自由な床／壁／家具建築、複数拠点物流、入植者仕事割当、複雑なcraft、長文AI自由会話。候補地選定と最小module設置はcoreに含む。
- 定期襲撃、wave防衛、offline待機生産で拠点をタワーディフェンス／作業gameにすること。
- multiplayer。
- App Store、Google Play、Steam実績、Steam Cloudの同時対応。
