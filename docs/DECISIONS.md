# Decision Log

重要で長期的な判断だけを追記します。軽微な作業記録は `work/notes.md` に残します。

## ADR-001: Project documentation is the source of truth

- Date: 2026-07-30
- Status: accepted
- Context: 会話履歴だけでは長期作業の再開が不安定になる。
- Decision: 現在状態、設計、判断、未完了作業を `docs/` 配下で管理する。
- Consequences: 終了時の文書更新が必要になるが、スレッドをまたいで再開できる。
- Supersedes: none

---

## ADR-002: Browser-first delivery

- Date: 2026-07-30
- Status: accepted
- Context: iPhone 16 Proでの反復試遊を短くし、将来Steam公開も残す必要がある。
- Decision: TypeScript、Phaser 4、ViteでPWAを先に作り、ゲーム核の検証後にElectronでdesktop候補版を作る。
- Consequences: スマホ実機への共有とブラウザ自動検査を高速化できる。native app固有機能は初版対象外になる。
- Supersedes: none

---

## ADR-003: Deterministic simulation core

- Date: 2026-07-30
- Status: accepted
- Context: 長く遊べる相互作用、バランス、セーブを検証し、表示変更からルールを守る必要がある。
- Decision: ゲーム規則をPhaserから分離し、seedとtickで再現できるpure TypeScript simulationとして実装する。
- Consequences: 自動検査と不具合再現が容易になる。表示側からstateを直接変更してはいけない。
- Supersedes: none

---

## ADR-004: Delay theme lock and runtime AI

- Date: 2026-07-30
- Status: accepted
- Context: 妖怪を含む世界観候補は未確定であり、AIは面白さを保証しない。
- Decision: 初期実装は抽象語彙とtheme profileを使う。AIは戦闘核の合格後に、検査済みコンテンツ候補の生成へ限定して追加する。
- Consequences: 同じ仕組みで複数の世界観を比較できる。初期版に自由会話やライブ生成は入らない。
- Supersedes: none

---

## ADR-005: Make one world trace persistent before expanding content

- Date: 2026-07-30
- Status: accepted
- Context: 戦闘だけでは既存のarena survivalとの差が見えず、「巡り巡る世界」の仮説を試せない。
- Decision: 遠征終了時に討伐跡、累計遠征、最高討伐数を`WorldLegacy v1`として保存し、次の遠征の地図へ最大12件の跡を再表示する。
- Consequences: 最小規模でも前回の行動が次回90秒以内に見える。装備奪還、宿敵、価格、勢力の永続化は同じsession境界へ後から追加する。
- Supersedes: none

---

## ADR-006: Replace arena autofire with a manual action route

- Date: 2026-07-30
- Status: accepted
- Context: Prototype 0.1はlocalで完成したが、ユーザー評価は約20点だった。固定arenaと常時自動遠隔攻撃が、求める放浪・ハクスラ体験と一致しなかった。
- Decision: Prototype Bでは、町―三叉路―廃区の連続scroll route、手動攻撃、guard、回避、遺物、item、武器持替を遊びの中心にする。自動攻撃は初期標準操作から外す。
- Consequences: playerの判断と敵予兆がgameplayになる。操作数とbalance検証は増える。Prototype 0.1は比較用に保持する。
- Supersedes: Prototype 0.1のfirst playable combat loop

---

## ADR-007: Use a fixed Three.js voxel renderer for Prototype B

- Date: 2026-07-30
- Status: accepted
- Context: 画像生成したdot絵では品質と一貫性が不足し、固定cameraの立体表現を計算生成したい。
- Decision: 16×16×16をasset authoring gridとし、隠れ面を除去したgeometryをThree.jsで固定斜め俯瞰表示する。cameraは回転させずplayerへ追従し、low-resolution canvasを拡大する。Phaserは旧版query routeだけに残す。
- Consequences: 同じrecipeからcharacter、object、effectを一貫して生成できる。WebGL resource管理と実機performance gateが必要になる。
- Supersedes: ADR-002のrenderer選定部分。browser-first delivery自体は継続

---

## ADR-008: Treat SF relic explanation and sound as gameplay information

- Date: 2026-07-30
- Status: accepted
- Context: ラグランジュポイントの武器・SF設定・soundと、謎の道具を具体的に解説する面白さが新たなtaste signalとして確認された。
- Decision: 遺物dataを効果、原理仮説、副作用、使用者メモへ分け、loot取得時に表示する。武器、guard、遺物、危険、結果へ固有のprocedural audio cueを割り当てる。
- Consequences: 数値itemにも世界内の意味を持たせられ、将来のAI候補生成schemaになる。音の判別性はiPhone speakerで別途検証する。
- Supersedes: none

---

## ADR-009: Keep the ruined world bright and scale voxel detail by narrative importance

- Date: 2026-07-31
- Status: accepted
- Context: 公開Prototype Bは暗いfog、低明度palette、vignetteが重なり、自然に侵食される世界と主人公の形が読めなかった。16³ characterも、求めるSFC後期RPG程度の情報量に足りなかった。
- Decision: worldは淡い昼光、白化した遺構、sage、若葉、水、錆で描き、危険はenemy、予兆、音へ局所化する。voxel recipeを可変width／height／depthへ移行し、背景は16³、playerは16×24×12、主要characterだけを優先的に高密度化する。
- Consequences: 終末の深刻さと探索の美しさを両立し、重要characterへtriangle budgetを集中できる。theme固有のpalette、実機performance、animation frameは後続評価が必要になる。
- Supersedes: ADR-007の「全assetを16×16×16 authoring gridに固定する」部分。fixed Three.js rendererとlow-resolution cameraは継続

---

## ADR-010: Use a fixed-camera hybrid HD-2D rendering stack

- Date: 2026-07-31
- Status: accepted
- Context: Visual Pass Dはvoxel密度、生活小物、lightingを増やしたが、antialiasing不足、低い内部解像度、平坦な地面／背景surfaceが残り、ユーザーのcommercial HD-2D基準に不合格だった。固定cameraでは、見えない面まで全要素をvoxel／3Dへ限定する必然性がない。
- Decision: fixed orthographic cameraは維持する。moving character、collision silhouette、occluder、dynamic shadow、interactive effectはrealtime 3Dを正本とし、地面、道、背景、建物面は高解像度の生成／baked albedo、normal、roughness、detail layerを使用できるhybrid HD-2Dにする。rendererはMSAAと十分な内部解像度をbaselineにし、AgX tone mappingを使う。色出力はsRGBを基準とし、Display-P3はdeviceとWebGL contextの対応を確認できる場合だけ有効にする。
- Consequences: 固定視点で見える情報へ制作budgetを集中し、voxel characterと高品質surfaceを両立できる。一方で、2D／3D間のscale、palette、light direction、contact shadow、collisionの整合をasset gateで検査する必要がある。P3やtone mappingをtrue HDRの証明として扱わず、iPhone実機でperformanceと色を再確認する。
- Supersedes: ADR-007の「low-resolution canvasを拡大する」部分と、ADR-009の「low-resolution cameraは継続」の部分。fixed Three.js renderer、固定camera、重要度に応じたcharacter密度は継続

---

## ADR-011: Generate content during development and freeze only validated candidates

- Date: 2026-07-31
- Status: accepted
- Context: 人物、地図、遺跡、item、武器、monster、visual、audioを広く生成しながら、合成の納得感、科学的／世界内原理、地図の遊びやすさ、著作物からの独立性を維持する必要がある。runtimeの都度生成では再現、balance、save互換、人間の採否を保証できない。
- Decision: contentは原則として開発時に`Specify → Normalize → Seed → Generate → Validate → Fallback → Curate → Freeze → Integrate`の順で作る。deterministic codeがschema、数値、合成可否、物理／energy／熱／stress制約、地図到達性、報酬、fallbackを所有し、AIは許可fieldの候補だけを提案する。各candidateはstable ID、seed、generator version、input／content hash、source、validation report、人間の`accept`／`revise`／`reject`を持ち、採用済み固定dataだけをruntimeへ入れる。詳細契約は`WORLD_BIBLE.md`と`GENERATION_RULES.md`を正本とする。
- Consequences: 同じ規則から再生成、監査、rollback、balance検査ができ、itemのflavorと実効果を同じ根拠へ結び付けられる。候補生成だけではcontent増加と数えず、検証と人間reviewの制作costが必要になる。offline generator、schema、registry、curation UIは別途実装する。
- Supersedes: none。ADR-004の「runtime AIを避け、検査済み候補へ限定する」を具体化する

---

## ADR-012: Use manual positioning with automatic basic combat and manual burst skills

- Date: 2026-08-01
- Status: accepted direction / implementation details pending
- Context: Prototype 0.1の不一致は、固定arenaで接近、位置取り、target、撤退を必要とせず、常時自動遠隔攻撃を眺める構造だった。ユーザーはElona Mobileに近い、通常戦闘を自動化し、大技skillを手動で発動する感覚を目標として明示した。
- Decision: 製品目標では、移動、接敵、位置取り、撤退をplayerが担い、武器条件を満たした通常攻撃は自動実行し、有限resourceの大技は手動で発動する。buildはdamageだけでなく、target取得、成立間合い、移動拘束、攻撃周期、manual skillの時機を変える。
- Consequences: smartphoneの連打負荷を減らしながら、判断を位置取り、build、大技へ集中できる。target上書き、guard／dodge、item、遠距離通常攻撃、通常の同行者行動をどこまで手動に残すかはGate Aで比較する。
- Supersedes: ADR-006の製品目標部分。ADR-006はPrototype Bの実装判断と比較用controlとして有効

---

## ADR-013: Ground the world in overgrown modern cities and make the player base a world-memory system

- Date: 2026-08-01
- Status: accepted direction / implementation details pending
- Context: 自由放浪とworld memoryの方向が支持され、世界の基層と帰還先の所有感を具体化する必要がある。ユーザーは、人類が激減し、現代都市が自然に侵食されたpost-apocalypseと、既存地点の復旧または自由に選んだ場所へ自分で拠点を築く像を示した。
- Decision: 識別可能な現代都市とinfraを、植物、水、動物、新しい生活が侵食／転用した世界を基層にする。playerは既存遺構を復旧するか条件の合う土地を選び、回収資源で自分の拠点を築く。拠点は別の建築gameではなく、放浪、loot build、同行者、world memoryを束ねる恒久stateにする。
- Consequences: 地域生成は旧用途、水／日照／土壌、植生遷移、現在の生活、資源、route、拠点候補を同じ因果から作る。夏版は候補地二つ、稼働拠点一つ、機能module候補二つ以上／今回設置一つ、次回差分一つへ縮小する。崩壊原因、経過年数、地域、配置自由度、複数拠点、移転、維持、襲撃は未決定。
- Supersedes: none

---

## ADR-014: Select Concept C as a realtime micro-voxel hybrid North Star

- Date: 2026-08-01
- Status: accepted direction / runtime art acceptance pending
- Context: A〜Eのvisual conceptを比較し、ユーザーはCの高密度voxel／rich pixel-artに感じられる小型3D造形、fixed diagonal diorama、HD-2D的なボケ味を最も近い方向として選んだ。同時に、Cの人物と武器が中世fantasyへ寄る点を修正し、女性型をbaseにしつつ種族、性別／gender表現、体格、顔、髪、装備を選ぶcharacter creationを求めた。斜めcameraではworld axis直結の上入力が画面斜めへ出る懸念も確認された。
- Decision: Concept Cをvisual North Starとする。人物、装備、同行者、enemy、occlusion、近景の動きはhigh-density micro-voxel／grid-quantized sourceからcompileしたrealtime 3Dとし、static city density、間接光、AO、遠景はbaked assetへ分ける。被写界深度は主人公、敵予兆、interactionをsharpに保つmulti-layer方式とする。default protagonist presetは女性型だが固定heroineにはせず、appearanceをversioned `CharacterGenome`へ分離する。武器と衣装は動力、sensor、冷却、service機構の読めるpost-apocalyptic SFへ直す。keyboard／virtual stick／future gamepadはscreen-relative axisで受け、共有camera basisからsimulation world axisへ変換する。
- Consequences: CのPNGを背景、texture、literal topologyとして使用しない。最初のproofは96-cell級女性default、SF survey cutter、別gender presentation、別humanoid species、四足同行者candidateを一つのC Beauty Cellで動かし、2560×1440 actual gameplayでCのcamera、actor scale、light、material、density、DOFを比較する。Gamepad API、click／tap-to-move、runtime character creator、C Beauty Cell、mobile tierは別実装であり、今回の方向決定だけでは完成としない。
- Supersedes: Visual North Star Concept Set v0.4でのconcept E暫定選択。ADR-010のfixed-camera hybrid構造は継続し、人型surfaceの最終密度とcharacter creationを具体化する

---

## ADR-015: Name the game F.R.A.M. and make the player its embodied module

- Date: 2026-08-02
- Status: accepted
- Context: 遺物回収、解析、world memory、character creationを一つの作品identityへ束ねる正式名称と、player characterの存在理由が必要だった。
- Decision: 正式作品名を`F.R.A.M. (Frontier Relics Archive Module)`、日本語副題を「辺境遺物記録モジュール」、呼称を「フラム」とする。player characterはF.R.A.M.の操作者ではなく、辺境踏査、遺物解析、記憶編纂を担う身体化module instanceである。女性型`F-01`は最初のvisual benchmarkであり、character creation後の種族、性別／gender表現、体格、顔、髪、身体拡張、装備の違いをF.R.A.M. identityと能力制限へ自動結合しない。
- Consequences: 探索、item解析、build、帰還、拠点、world stateをF.R.A.M.の三機能へ接続できる。moduleの製造者、起源、network、法的地位、複製／継承、instance命名法は別のworld-design decisionとして未決定に残す。
- Supersedes: 「辺境遺物録」を正式名称候補として扱う状態。prototype内の地域名・記録名としての使用は妨げない

---

## ADR-016: Preserve user-adopted technical epochs beside playable releases

- Date: 2026-08-02
- Status: accepted
- Context: Character Forge F-01は本編のreleaseではないが、AI生成sheetから高密度voxel 3D、semantic rig、realtime animationへ至る新しい制作基盤を初めて一画面で実証した。ユーザーは暫定約70%と評価し、同種の技術的エポックを今後もGitHub Pagesへ保存公開するよう指示した。
- Decision: ユーザーが技術的エポックとして採択した検証成果は、`/game/forge/fXX/`または同等のstable URLへ凍結し、`/game/`の`Technology Epochs`へ新しい順で追加する。RXXのplayable releaseとは番号、status、一覧を分離し、実runtime capture、再現入力、source definition、provenance、validation、既知差分を残す。削除指示がない限り過去epochを保持する。
- Consequences: 生成／描画基盤の進歩を後から比較できる一方、技術demoを完成game、最新playable版、commercial art合格と誤認させない表示が必要になる。次epochは新しい技術契約を実証し、ユーザーが保存価値を認めた時点で同じ公開手順へ進む。
- Supersedes: none。prototype version保存規則をtechnical milestoneへ拡張する

---

## ADR-017: Keep expedition simulation transient and reduce durable world events into local memory

- Date: 2026-08-08
- Status: accepted
- Context: R09は、帰還／撤退の結果を次の遠征へ残しながら、現在のHP、敵、位置、cooldownまで再開saveへ固定せず、将来のProduct Shell、cloud snapshot、engine比較でも同じworld truthを使う必要がある。既存`SaveRepository`にはA/B revision、checksum、corruption recovery、post-write verificationがあり、保存機構の再発明は不要だった。
- Decision: 一遠征のauthorityは引き続き`PrototypeBState`とする。永続対象を`site-discovered`、`item-recovered`、`base-claimed`、`module-installed`、`expedition-ended`のdurable `WorldEvent`へ限定し、pure reducerでstrict `WorldMemoryState v1`へ変換する。R09専用namespaceでlocal IndexedDBへ保存し、R06／旧`WorldLegacy`を暗黙importしない。visual／gameplay効果は保存済みmodule IDから導出し、renderer固有値をsave schemaへ入れない。
- Consequences: 撤退は発見siteと持帰り品だけを残し、次回は新しい一遠征として開始できる。event順、重複、schema drift、seed mismatch、corruptionを自動検査できる。将来versionは明示migrationが必要で、Google identity／Cloud Test Saveはlocal authorityとv1 schemaを保ったadapterとして後付けする。F-01／F-02などactor固有IDもWorld Memoryへ入れない。
- Supersedes: none。ADR-013のworld-memory拠点方向を実装契約へ具体化する
