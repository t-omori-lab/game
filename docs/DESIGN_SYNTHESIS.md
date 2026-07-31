# 設計統合案: 世界記憶型・放浪生活ハクスラ

Last updated: 2026-07-31  
Status: design proposal v0.1 — 実装判断前の統合案

## 0. この文書の結論

`設計提案。正式な作品核として未承認`

作りたいものは「Vampire Survivorsに探索を足したgame」ではない。現時点の統合仮説を一言で呼ぶなら、**世界記憶型・放浪生活ハクスラ**である。

> 崩壊しても明るく生きている小さな世界を、選ばれた英雄ではない旅人として歩く。自分の手で戦い、守り、避け、調べ、回収し、ときには相手を壊さずに対処する。拾った遺物と部品を、原理と代償が納得できる装備へ組み替える。旅の途中で人、robot、犬や猫などの同行者と出会い、誰と行くかを選ぶ。帰還、失敗、死亡、売買、介入の結果は、噂、価格、道、敵、人物、品物として世界に残り、次の旅の理由になる。

画面は暗い終末を美化するのではなく、陽光、植物、水、錆、生活の修理跡、色のある廃墟を、スマートフォン上で最も魅力的に見せる。美しいvisualは必須条件だが、作品の固有性を決める中心はrendererそのものではなく、**装備build、手動action、複数の対処、生活、世界の記憶が循環する仕組み**である。

Prototype Bは、手動action、scroll探索、固定俯瞰表現、一回の依頼を成立させた「部品の技術証明」である。次は二つの核を別々に証明し、別々に採否を判断する。

1. **瞬間〜一遠征** — 手動actionの手触りと、拾う・比較する・組む・試すが異なるloot／build。
2. **複数遠征** — 自分で目的を選ぶ放浪と、一回目の行為が二回目の遊び方を変えるworld memory。

どちらか一方だけでは、目標とする長く遊べる放浪ハクスラにはならない。短い判断用の正本は[GAME_CONSTITUTION.md](./GAME_CONSTITUTION.md)とする。

## 1. Statusの読み方

| Label | Meaning |
|---|---|
| `確定要求` | ユーザーが明示した方向。勝手に変更しない |
| `実装事実` | 現在のrepository／公開prototypeに存在する |
| `設計提案` | 次の実装へ進むための推奨default。正式確定前 |
| `未決定` | 選択によって作品の体験が変わるため、ユーザー判断が必要 |

本書は[GAME_BRIEF.md](./GAME_BRIEF.md)、[WORLD_BIBLE.md](./WORLD_BIBLE.md)、[GENERATION_RULES.md](./GENERATION_RULES.md)を置き換えない。それらの間にある「何を作るか」「何を先に証明するか」「生成物をどう遊びへ接続するか」を統合する。

## 2. Game identity

### 2.1 Player fantasy

`確定要求を中心に、一部を設計解釈として明記`

- `設計解釈`: 主人公は世界を救う運命を初めから背負った英雄ではなく、仕事、装備、人間関係、生き方を選ぶ旅人である。主人公像自体は未決定。
- `確定要求`: playerは攻撃、防御、回避、item、skill／同行者支援を自分で使う。常時自動遠隔攻撃は中心にしない。
- `設計解釈`: 依頼に従うだけでなく、噂を追う、遺跡へ寄る、商売する、遺品を取り戻す、危険を避けるなど、自分で今回の目的を決められる。
- `設計提案`: 遺物、武器、同行者、旅の結果に来歴が残り、自分だけの個人史ができる。
- `設計提案`: 異形は単なる経験値袋ではなく、目的、維持条件、予兆、対処法、世界内の居場所を持つ。

### 2.2 作品を支える八本の柱

`設計提案`

1. **自由な放浪** — 行き先と目的を選び、依頼を無視する自由も持つ。
2. **手動で読めるaction** — 少ないtouch inputで、間合い、予兆、guard、回避、weapon commitmentを読む。
3. **原理を持つハクスラbuild** — 攻撃力の序列ではなく、作用、interface、energy、heat、stress、riskのtrade-offで装備を組む。
4. **破壊以外の対処** — 鎮静、接続、誘導、交渉、回避、利用が、相手の仕組みから成立する。
5. **世界の記憶** — 選択、帰還、死亡、売買が次の旅の状況を変える。
6. **発見する同行者roster** — 開始時は単独。world内で出会い、加入、交代し、同行者ごとの都合と有限能力を使う。
7. **明るい崩壊世界の生活** — 危険は深刻でも、baselineは好奇心、修理、食事、商売、乾いたhumor、前進。
8. **生成と人間の共同制作** — AIは世界法則内の候補を増やし、codeが規則を検証し、人が採否とart directionを決める。

### 2.3 これは何ではないか

`確定要求から導くnon-goal案`

- 常時自動射撃を眺めるsurvival arenaではない。
- 一本道を進み、最後に三択だけを出す短編action gameではない。
- 数値の大きい装備へ交換し続けるだけのloot treadmillではない。
- 巨大なseamless open worldや全NPC常時simulationを競うgameではない。
- 飢え、渇き、耐久meterを常に作業的に補充するsurvival choresではない。
- voxel、生成AI、HDRを見せるtechnology demoではない。
- AIがplay中に規則、報酬、世界の真実を即興で決めるgameではない。

## 3. 参考作品から抽出している役割

| Reference group | 抽出する構造 | 複製しないもの |
|---|---|---|
| ルナティックドーン、Elona、Kenshi、Oblivion | 自己目的、放浪、世界がplayer外でも続く感覚、偶発的な個人史 | 世界設定、quest、人物、文章 |
| Diablo、おっさん or die、Metal Max、ラグランジュポイント | 装備更新、部品構成、拾う喜び、危険地帯へ再挑戦する循環、武器と音の記憶 | item名、数値、vehicle、音楽、visual |
| Undertale | 相手を理解し、倒す以外の方法と結果の記憶を作る | battle表現、dialogue、character |
| 攻殻機動隊、Cyberpunk 2077、Watch Dogs | network、監視、身体拡張、都市機能の裏側 | 固有技術、都市、組織、衣装 |
| 少女終末旅行、世界が終わっても生きるのって楽しい、ウスズミの果て、リビルドワールド | 廃墟での食事、修理、補給、旅、遺物回収を生活loopへする | 景観、人物、出来事、台詞 |
| NieR:Automata、商業HD-2D作品 | 危険と美しさの同居、characterと背景の情報階層、固定cameraを活かすproduction principle | 構図、palette、asset、effect |

三つの中心層は同時に必要である。

- 自由と生活がなければ、一本道のaction RPGになる。
- 装備buildがなければ、探索adventureになる。
- 世界反応がなければ、複数ending付きの短編になる。

## 4. 体験を四つの時間scaleで設計する

`設計提案`

```text
数秒:   予兆を読む → 近づく／避ける → 攻撃／guard／回避／item／支援
数分:   相手と場所を観察 → 対処法を見つける → costを払い結果を得る
一遠征: 目的、loadout、同行者を選ぶ → 旅、回収、撤退 → 帰還／遭難／死亡
複数回: world turnが進む → 噂、価格、道、敵、人物が変わる → 次の目的が生まれる
```

### 4.1 Moment-to-moment

- 一つの主攻撃buttonでも、weapon frameによりtap、hold、移動中、guard後の挙動が変わる。
- enemyはsilhouette、動き、音、局所色で予兆を出す。小画面でparticleの奥に予兆を隠さない。
- hit、just guard、回避、装備過熱、破損寸前を、映像、音、短いUI feedbackで一致させる。
- 通常戦闘時間は実測で決める。初期仮説として15〜40秒の判断単位を比較し、戦闘だけが連続しないよう調査、回収、移動を挟む。

weaponごとの手触りを感想だけで管理せず、30Hz simulation tickを基準に次をdata化する。

```ts
type CombatFeelContract = {
  actionId: string;
  startupTicks: number;
  activeTicks: number;
  recoveryTicks: number;
  movementScaleByPhase: readonly [number, number, number];
  cancelWindows: readonly CancelWindow[];
  reachAndArc: HitShapeSpec;
  aimAssist: AimAssistSpec;
  guardOrDodgeInteraction: DefenseInteractionSpec;
  hitFeedback: {
    simulationHitStopTicks: number;
    cameraImpulse: number;
    effectCue: CueId;
    soundCue: CueId;
    hapticCue?: HapticCueId;
  };
  resourceDelta: ResourceDelta;
  telegraphContract: TelegraphSpec;
  tests: readonly TestSpec[];
};
```

同じdamageでも、startup、移動拘束、cancel、reach、反動、feedbackが違えば別の判断になる。逆に、このcontractの差が小さいweaponは外見と数値が違っても別buildとして数えない。hit stop、camera impulse、hapticは端末負荷と酔いを含め個別に無効化できるようにする。

### 4.2 Encounter

異形ごとに全手段を義務化しない。成立する手段だけを、相手の維持条件から導く。

| Verb | 必要なgameplay | 典型cost | World consequence |
|---|---|---|---|
| 破壊 | telegraphを読み切るcombat | 負傷、消耗、機能喪失 | 即時安全、部品、生活機能の消失 |
| 鎮静 | 入力、energy、環境を調整 | 専用道具、時間、維持費 | 機能を残すが再発／保守が必要 |
| 接続 | signalを観測し認証／書換 | 解析、noise、追跡risk | 新機能と情報、別勢力からの注目 |
| 誘導／取引 | 相手の目的や資源を利用 | bait、評判、資源 | 危険の移動、別地域への余波 |
| 回避／撤退 | routeと警戒を読む | 報酬放棄、時間 | 現象が世界に残り続ける |

非戦闘解決を最後のmodal choiceだけにしない。旅の途中で観察、必要itemの確保、環境操作、同行者能力を行い、対峙時には「なぜ可能か」が分かるようにする。

### 4.3 Expedition

1. 町や野営地でworldの変化を読む。
2. 依頼、噂、遺品、興味から目的を選ぶ。
3. 武器、module、道具、補給、同行者を選ぶ。
4. world graph上の地域へ移動する。移動は時間とriskを進める。
5. local mapで戦闘、探索、回収、対処、撤退を行う。
6. 帰還、撤退、遭難、死亡のいずれかで遠征を閉じる。

自由な放浪はmap面積ではなく、**同時に存在する目的と、選ばなかった結果**で証明する。最小sliceでも、同じ空間へ「受注した依頼」「噂で知った遺物」「以前失った装備の奪還」などから二つ以上を置く。playerは出発前または道中で優先目的を変えられ、途中帰還、放棄、偶然の発見も正規の遠征結果とする。

### 4.4 Return and legacy

1. 遠征中のeventを確定する。
2. 移動、休息、負傷、死亡に応じてworld turnを進める。
3. deterministic reducerが共同体、地域、人物、敵、品物を更新する。
4. 更新から次の噂、依頼、在庫、route、宿敵を導く。
5. 次回90秒以内に「見た目の変化」と「遊びの変化」を最低一つずつ見せる。

一遠征の主要変化は、原則として**重大変化1件＋小さな余波0〜2件**に絞る。変化を増やしすぎると、何が自分の行為の結果か読めなくなる。

### 4.5 「圧倒的向上」をどこで作るか

圧倒的な改善は、敵数、effect、生成文章の量ではなく、現在は分離している判断を一本の因果へ接続することで作る。

| Current Prototype B | Target experience |
|---|---|
| 二武器を持ち替える | module、heat、range、impact、noiseにより、同じ場所でも立ち回りと解法が変わる |
| 道中でlootを拾う | 欲しい部品を求めて目的地、危険、撤退時期を選ぶ |
| 最後のmodalで三択する | 道中の観察、item、環境操作、同行者によって、対峙前から別解を作る |
| 帰還文を見る | 町の外見、価格、人物、route、enemy、次依頼が変わり、次のloadoutを変える |
| 同行者候補assetを見る | world内で出会い、加入条件を満たし、有限支援を自分で命令し、誰と行くか選ぶ |
| 一つのrouteを進む | world graphから依頼、噂、遺品、好奇心のどれを追うか決める |

mobile操作はbutton数を増やさない。

- 左手: movement stick。
- 右手主操作: attackのtap／hold。weapon frameが動作を変える。
- 右手副操作: guard hold。方向入力との組合せでdodge。
- quick action: item／relic／companion commandの選択slotを一つ。選択中の一actionだけ大きく置く。
- interactionは対象が近いときだけ同じcontext位置へ出し、combat中のbutton配置を動かさない。

button配置だけでなく、次の`TouchActionState`をP0設計にする。

```text
Neutral → AttackTap / AttackHold / GuardHold / AimAssist / QuickAction / Interact
GuardHold + move-flick → Dodge
Pickup candidate + combat threat → combat inputを優先し、pickupは短時間queue
menu open → world pauseを原則とし、危険中の装備変更可否を明示
```

- target候補は距離だけでなく、入力方向、画面内、脅威、遮蔽でscoreし、選択中targetを足元と輪郭で示す。
- tap／hold／二本指入力の競合、押したまま画面外へ滑った場合、通知やtab復帰後のstuck inputをstate machine testにする。
- 左右反転、safe area、親指の可動域、最小touch target、誤装備のundo、片手で届かない操作を実機で検査する。
- loot比較は「現在との差」「変わるverb」「代償」を一画面に出し、装備／保管／分解を同じ親指範囲で完了させる。field変更中はpauseを推奨defaultとする。

これにより、物理buttonの少ないsmartphoneでも、瞬間action、遠征build、長期worldの三層で深さを作れる。visual gateとgameplay gateは別々に合格させ、綺麗な画面で弱いloopを隠さず、強いloopを粗い仮assetで完成と扱わない。

## 5. Prototype Bと目標gameの差

| Area | Prototype Bの証明 | まだ証明していないこと |
|---|---|---|
| Action | 手動攻撃、二武器、guard、回避、item、遺物 | weaponごとの深い操作、buildによる立ち回り変化、touchの長期快適性 |
| Exploration | scrollする町―道―遺跡 | 行き先の自由、地域graph、自由探索、撤退／寄り道判断 |
| Encounter | 名付き異形へ破壊／鎮静／接続 | 道中から成立する非戦闘解決、複数相手への一般化 |
| Loot | 6種のlootと説明 | module文法、compatibility、経済、所有履歴、奪還 |
| World | 一回の依頼と帰還記録 | saveされた因果、次回の世界変化、人物／価格／route反応 |
| Companion | 非表示の候補asset | 発見、加入、交代、命令、補給、離脱 |
| Visual | hybrid HD-2Dの技術的入口 | commercial-level art direction、複数material、hero／companionの決定的魅力 |
| Generation | schemaとガバナンス文書 | generator、candidate registry、横断的な因果生成、curation tool |

したがって、Prototype Bは失敗ではなく、**actionとrendererの実験台として最低限成立した**。ただし本作の中心を証明したとはまだ言えない。

## 6. 先に決める不足設計

### P0 — 次の実装前に必要

| Missing design | 推奨default | まだ確定しない点 |
|---|---|---|
| Combat Feel Contract | aim assist、attack中の移動／cancel、間合い、hit stop、guard／dodge受付、敵予兆、敵密度、音と画面feedbackを一体で定義 | weaponごとのcommitment、無敵時間、target切替方法 |
| Loot／Build Contract | slot、module役割、drop、比較／装備／分解UI、遠征内／永続成長を定義し、判断が異なるbuildを最低2、目標3作る | field装備変更、所持上限、永続強化の上限 |
| Mobile Interaction Contract | target score、tap／hold競合、safe area、左右反転、誤操作回復、combat／interaction優先順位 | 横画面専用か、縦持ち／browser chromeへどこまで対応するか |
| World update | 帰還／死亡時に進むevent-driven world turn | 一回に進む日数、遠隔地域の変化量 |
| Save | append-only event log＋version付きsnapshot | save slot数、巻戻し方針 |
| Death | 遺品を名付き存在が持ち、別の旅で奪還可能 | 完全死亡、行方不明、同一主人公復帰のどれか |
| World map | world graph＋小さく密度の高いlocal map | 地域数、移動の見せ方 |
| Encounter grammar | 観察可能な条件から複数対処を導く | 交渉／捕獲を初版へ入れるか |
| Self-directed objective | 同じ空間へ依頼、噂の遺物、遺品奪還など二つ以上を同時提示し、途中帰還／放棄を許す | 同時保持数、期限、目的間の衝突 |
| Success gates | Gate Aのcombat／buildとGate Bの放浪／因果を別採点する | 目標評価点と外部tester数 |

### P1 — P0の因果loop合格後

- 同行者の発見、加入、待機、同行、負傷／故障、離脱、再加入の状態遷移。
- 依頼をworld stateから作るtemplateと、期限、部分成功、放棄、嘘の扱い。
- 修理、解析、交易、休息、食事、噂のうち、意思決定を増やす生活verbだけを選ぶ。
- 世界法則5〜8本と、妖怪語彙／電脳怪異語彙を重ねるtheme profile。
- character／prop／material／world cell generatorの実体とcuration UI。

### P2 — Summer vertical slice合格後

- 複数共同体、faction、車両、複雑なcraftと経済。
- 多数の同行者とrelationship story。
- 複数biomeへのcommercial art pass。
- Steam包装、実績、Cloud。
- runtime live AI。

## 7. 推奨するruntime因果architecture

`設計提案。Gate Aのcombat／buildと並行してGate Bで検証する`

### 7.1 Event log＋snapshot

単一の巨大save objectだけでなく、「何が起きたか」と「現在どうなっているか」を分ける。

```ts
type WorldEvent = {
  eventId: string;
  worldTurn: number;
  rulesVersion: string;
  type: WorldEventType;
  actorId?: string;
  targetId?: string;
  regionId?: string;
  payload: Readonly<Record<string, unknown>>;
};

type WorldState = {
  schemaVersion: string;
  seed: string;
  worldTurn: number;
  settlements: Readonly<Record<string, SettlementState>>;
  regions: Readonly<Record<string, RegionState>>;
  travelers: Readonly<Record<string, TravelerState>>;
  companions: Readonly<Record<string, CompanionState>>;
  namedEntities: Readonly<Record<string, NamedEntityState>>;
  itemOwnership: Readonly<Record<string, OwnerRef>>;
  openRumors: readonly RumorId[];
  openContracts: readonly ContractId[];
};
```

主なevent候補:

```text
ContractAccepted        EntityDestroyed       EntityCalmed
EntityConnected         TravelerReturned      TravelerLost
ItemRecovered           ItemClaimedByEntity   RelicAnalyzed
CompanionDiscovered     CompanionJoined       CompanionInjured
RouteOpened             SettlementStockChanged WorldTurnAdvanced
```

これは全combat tickを保存する完全なevent sourcingではなく、**worldを変える高価値eventだけを残すEvent Log Lite**とする。一撃ごとのdamageや通常移動は遠征結果へ集約し、item所有者、死亡、加入、route、供給、named entityの状態など、後で因果を説明／再生する必要があるeventだけを追記する。一定件数ごとにsnapshotを作り、migration時は旧eventとrules versionを保持する。

AIはeventを決めない。runtimeでは純粋関数がeventをstateへreduceする。AIが関与できるのは、開発時に作った承認済みrumor template、報告文、表示名、visual motifの候補である。

### 7.2 Save durability contract

IndexedDBへ書けたことと、永久保存を保証できることは別である。WebKitのbrowser storageは既定でbest-effortであり、容量圧迫時のevictionがあり得る。またSafari tabとHome Screen Web Appのstorageは同じものとして自動移行されない（[WebKit storage policy](https://webkit.org/blog/14403/updates-to-storage-policy/)、[Safari 17.2 storage model](https://webkit.org/blog/14787/webkit-features-in-safari-17-2/)）。

- `navigator.storage.persisted()`を確認し、可能なら`persist()`をrequestする。ただし許可を保証せず、UIに保存状態を表示する。
- IndexedDB transaction内で、event batch、新snapshot、checksumを書いてからactive pointerを切り替える。直前の正常snapshotを一世代残す。
- `navigator.storage.estimate()`を目安にし、`QuotaExceededError`、transaction abort、tab killを明示的に扱う。memory fallbackへ黙って移って永続保存済みと表示しない。
- version、checksum、content pack IDを含むsave export／importを用意する。SafariからHome Screen版へ移る初回は自動継承を仮定せず、export／importまたは開始前のinstall誘導を使う。
- update前save、破損snapshot、event replay、export／import、Safari／PWA分離をacceptance testへ入れる。

### 7.3 一つの因果例

```text
オリソンへ接続した
→ 廃区のsignal障害が低下
→ 回収者のrouteが再開
→ 電子部品の供給が増えて価格が下がる
→ 旧中継器の保守依頼が発生
→ 接続時の識別情報を追う別のnamed entityが現れる
```

町ではantennaの動き、商人の在庫、短い噂のうち二つ程度で示す。結果画面へ長文を出すだけではworld reactionと数えない。

### 7.4 Deathの推奨案

`設計提案`

- world saveには複数旅人を置ける。
- 遠征失敗時、旅人は`dead`または`missing`になり、装備一つを原因となったnamed entityが取得する。
- 次の旅人は、奪還、取引、別route、放置を選べる。
- 空いた寝床、仕事、短い噂、item所有者の履歴で喪失を残す。

`未決定`: 完全permadeathにするか、行方不明なら救出可能にするか。同一主人公への愛着を重視するなら、重傷／救出costを含む中間案も成立する。

## 8. 独自提案: Causal World Cell — 因果先行生成

現在の生成規則は、個別の人物、item、monsterを安全に作る土台として優れている。最大の不足は、それらを同じ世界の一つの問題へ束ねる単位である。

そこで、contentを単品で生成せず、**一つの遊べる因果cell**として生成する。

```text
旧用途
  ↓
現在の資源・生活上の必要
  ↓
その場所を使う人物／生物／機械
  ↓
衝突・異常・不足
  ↓
playerが観測できる証拠
  ↓
二つ以上の対処と異なるcost
  ↓
回収できるitem／知識／同行者
  ↓
world stateの変化
  ↓
次の依頼・噂・宿敵・route
```

### 8.1 全生成物共通の`GameplayContract`

世界、人物、item、monster、quest、assetを単品で量産せず、重要な生成物は最低限この契約を参照する。

```ts
type GameplayContract = {
  playerVerbs: readonly VerbId[];
  preconditions: readonly Condition[];
  costs: readonly ResourceDelta[];
  risks: readonly RiskSpec[];
  effects: readonly WorldDelta[];
  counterplay: readonly CounterplaySpec[];
  worldLawRefs: readonly WorldLawId[];
  entityRefs: readonly StableId[];
  visualCues: readonly CueSpec[];
  soundCues: readonly CueSpec[];
  validationTests: readonly TestSpec[];
};
```

文章、画像、3D modelが魅力的でも、player verb、cost、counterplay、world effectのいずれにも接続しない候補はgame contentとして採らない。生活感を作るambient artは、別の`AmbientPurpose`とcomposition budgetを明記して例外承認する。

### 8.2 Minimum `WorldCellSpec`

```ts
type WorldCellSpec = {
  stableId: string;
  gameplayContract: GameplayContract;
  gameplayIntent: {
    primaryDecision: string;
    viableApproaches: readonly ApproachSpec[];
    retreatRouteRequired: true;
  };
  oldFunction: SystemFunction;
  currentResourceFlow: ResourceGraph;
  stakeholders: readonly ActorNeed[];
  obstacle: ControlLoop | CreatureEcology | HumanConflict;
  observableEvidence: readonly EvidenceSpec[];
  rewards: readonly RewardSpec[];
  worldMutations: readonly WorldMutationSpec[];
  futureHooks: readonly HookSpec[];
  spatialMissionGraph: MissionGraph;
  assetManifest: AssetManifest;
};
```

### 8.3 生成順序

1. **Play intent** — 今回playerへ何を比較させるかを人またはruleが指定する。
2. **Functional skeleton** — codeがapproach、cost、reward、world mutationを構造化する。
3. **World causality** — resource flow、旧用途、actor need、異常の維持条件を接続する。
4. **Spatial mission graph** — 入口、予告、分岐、圧力、発見、対処、報酬、撤退を作る。
5. **Expression candidates** — AIが名称、外観、生活者の解釈、技術者の仮説、短い噂を提案する。
6. **Asset genomes** — character、prop、material、effect、soundの生成specをcellから派生する。
7. **Validation** — 物理、interface、到達性、counterplay、因果、tone、originalityを検査する。
8. **Simulation** — 複数build／strategyで完走、撤退、資源、dominant choiceを測る。
9. **Human curation** — 実画面とplaytestで`accept`／`revise`／`reject`する。
10. **Freeze** — 採用済みdataとassetだけをbuildへ収録する。

この順番は「AIが面白そうなitemや設定を先に作り、後からgameへ押し込む」失敗を防ぐ。**遊びの問いを先に作り、世界設定とvisualを同じ因果から生やす**。

missionとspaceは別の中間表現にする。まず「観察する、鍵を得る、別解を開く、対処する」というmission DAGを生成し、次にそれを部屋、道、分岐、近道へ配置する。同じmissionを別spaceへ載せ替えられ、同じspaceをworld stateに応じた別missionで再利用できる。

Wave Function Collapseは、隣接patternを整える能力は高いが、依頼の目的、退路、鍵順序、combat cadenceを保証しない。したがってworld／dungeonの中核にはせず、missionとspaceのhard validation後に、壁面、床、植生、配管、破損patternなどの局所仕上げへ限定する。

### 8.4 一件をまとめて生成する例

`説明用仮説。正式設定ではない`

**雨水再生塔cell**を作る場合、AIへ「綺麗な廃墟とmonsterを作れ」と頼まない。

| Layer | Generated／derived content |
|---|---|
| 旧用途 | 町区画の雨水を濾過し、非常用tankへ送る保守塔 |
| 現在の必要 | 開始町の水不足と菜園の縮小 |
| 異常 | 認証を失った保守systemが、人と容器を汚染物として排除する。蔓と菌膜がsensor網へ共生 |
| 観測証拠 | 周囲だけ濃い植生、一定間隔の圧力音、空の容器を集める動き、乾いた排水路 |
| 破壊 | combatでpump coreを得る。即時安全だが水供給機能を失う |
| 鎮静 | pressure valveとfilterを修理する。水供給が戻るが定期保守itemが必要 |
| 接続 | 認証tagまたは解析同行者で利用者を再登録。近道と情報を得るが旧networkへ位置が残る |
| Item | pressure skin、凝縮coil、認証tag。すべて塔のmaterial／functionから派生 |
| Companion relevance | robotはsignal解析、dogは安全な水路追跡、work robotは詰まったgateを開く |
| Visual kit | 白いceramic、濡れた石、錆びたpipe、若葉、薄い水膜、cyan認証灯、amber圧力警告 |
| 次回差分 | 水価格、菜園の色、商人在庫、保守依頼、追跡entity、routeのいずれかが変化 |

このcellから、region layout、異形、三つのitem、依頼、world event、surface material、sound cue、短い噂を別々にcompileする。全てが同じresource flowとgameplay decisionを参照するため、生成物同士の辻褄が後付けにならない。

### 8.5 採用hard gate

- 最低二つの実用的approachがあり、costと将来結果が異なる。
- 万能な一手が全buildで最適にならない。
- 相手の予兆、必要条件、危険が通常cameraで観測できる。
- 重要itemと撤退routeが到達可能。
- rewardの少なくとも一つが新しいverb、trade-off、次の目的を生む。
- world mutationが次回90秒以内に少なくとも一つ可視化できる。
- 旧用途、現在用途、資源、actor、monster、lootが同じ因果graphで説明できる。
- 生成文を削除してもgame ruleが成立する。

## 9. 世界法則の強い仮説: 残響基盤

`設計提案・未採用`

妖怪、cyberpunk、旧文明遺物、明るい自然を一つに束ねられる候補として、次を比較対象にする。

旧文明は、建物、道路、土壌、水路、機械、義肢、生体sensorへ、記憶、演算、制御が可能な微細素子群を埋め込んでいた。都市全体が分散した保守systemだった。崩壊後、中央統制を失った局所systemは、通行管理、水や電力の配分、住民保護、荷物回収、汚染排除、人物の再現など、古い目的を不完全に続けている。

長い年月でそれらが植物、菌類、動物、廃材、人間の習慣や噂と結びつき、「土地の癖」や「人格」に見える振る舞いを持つ。生活者は妖怪、土地神、付喪神、祟りと呼び、技術者は残留protocol、反響体、局所人格と呼ぶ。本当に人格が生まれたかは断定しないが、gameplay上の作用は再現可能にする。

「残響基盤」を採用する場合の制約案:

1. 必ず物質、機械、生態系のどれかを基盤にする。
2. energy、反応物、情報の入力なしに作用しない。
3. range、遅延、精度、noise、遮蔽を持つ。
4. 強い作用ほどheat、摩耗、汚染、追跡riskを増やす。
5. 行動は古い目的または現在の生態的必要から導く。
6. 破壊、鎮静、接続、誘導、回避の少なくとも一つで対処可能にする。

この仮説なら、自然が鮮やかな理由も、旧保守基盤と植物／菌類の共適応として説明できる。ただし正式themeは、この案と別案を同じgameplay cellへ着せて比較してから確定する。

## 10. Mobile-firstでvisualを最もrichにする方針

### 10.1 結論

最もrichな画面は、全要素を高polygon 3Dにすることではない。**固定cameraをbake可能性へ変え、dynamicなものだけを高品質3Dで残す、art-directed hybrid 2.5D**が本作とiPhoneに最も合う。

```text
Realtime 3D:
  主人公、enemy、同行者、item、武器、interaction形状、low-poly occluder proxy、contact shadow、effect

Baked / tiled 2.5D:
  ground / mid / roof / foreground層、道、建物面、遠景、静的影、間接光、汚れ、植生群、生活小物群

Shared contract:
  world scale、camera、light direction、material、depth、collision、palette、state overlay
```

固定camera下のworldを512〜1024px程度のscene tileへ分け、各tileにalbedo、normal、roughness、macro variation、ground／mid／roof／foregroundのdepth層、occlusion mask、low-poly occluder、collision／navigation proxy、world-state overlayを持たせる。一枚絵とdepth maskだけにせず、高い建物の前後をcharacterが通れる構造にする。静的な間接光と大部分の影はbakeし、characterと重要objectだけへdynamic key light、contact shadow、effect lightを使う。初版は時刻と主光源方向を固定し、昼夜別bakeの制作費を負わない。

### 10.2 Renderer tier

| Profile | 方針 | 判断 |
|---|---|---|
| `webgpu-hdr-experiment` | half-float内部照明、`extended` tone mapping／HDR canvas、4× MSAA、限定的half-resolution bloom | configure成功、実画面、SDR fallbackを確認した端末だけの実験層 |
| `webgpu-sdr` | WebGPU、half-float内部照明、AgX、P3またはsRGB | WebGPUは使えるがHDR表示できない場合 |
| `webgl2-p3` | 現行project固有のcolor-space登録＋`drawingBufferColorSpace` probe、MSAA、AgX、Display-P3、KTX2 | probeと実画面が合格したSafari向けenhancement。stock設定とみなさない |
| `webgl2-srgb` | WebGL2、MSAA、AgX、sRGB、KTX2 | 最終互換層 |

Safari 26はiOSを含めWebGPUを出荷し、HDR imageをWebGPU Canvasでも扱える。一方、Three.js自身は`WebGPURenderer`をまだexperimentalとし、custom shaderやpost stackの移行が必要だと説明している（[WebKit](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/)、[Three.js](https://threejs.org/manual/en/webgpurenderer)）。したがって、**WebGPUへ書き換えれば自動的に美しくなるわけではない**。まずart／asset pipelineをbackend非依存にし、同じreference sceneでWebGL2とWebGPUを比較する。

内部half-float照明、P3広色域、HDR display outputは別能力として扱う。feature判定はuser-agentではなく、`navigator.gpu`、context生成、color-space／tone-mapping configure、実測frame time、実画面で行う。HDR profileにはSDR用AgXとは別にdisplay transform、paper white、highlight上限、SDR fallbackを定義する。`navigator.gpu`があるだけでHDR出力可能とは判定しない。

Three.jsのstock `WebGLRenderer`設定を選ぶだけでDisplay-P3になるわけではない。現projectはcustom `ColorSpaces.js`登録とWebGL drawing bufferの`drawingBufferColorSpace` probeを持つ固有経路であり、これをasset／renderer contractへ明記する。probe失敗、色差不合格、wrapper非対応時はsRGBへ戻す（[Three.js WebGLRenderer docs](https://threejs.org/docs/pages/WebGLRenderer.html)、[Safari WebGL P3](https://developer.apple.com/documentation/safari-release-notes/safari-16_4-release-notes)）。

最初に本編を全面移行せず、同じ主人公、同行者、草地、遺構、発光遺物を四profileで切り替える**Visual Benchmark Scene**を作る。固定したCSS寸法ではなく、`window.innerWidth／innerHeight`、`visualViewport`、safe areaを実機で記録し、内部scale 1.25／1.5／1.75、MSAA、shadow、bloom、P3／HDRを比較する。品質profileは30fpsならp95 frame time 33.3ms以内、性能profileは60fpsなら16.7ms以内を初期目標とする。発熱は実機観察とOSのdimming／throttling兆候、texture memoryはoffline推計とresource寸法として記録し、Webページから正確に自動取得した値とは扱わない。10分後のframe-time分布、context loss、入力遅延、輪郭、地面の細密感を全assetのbudgetへする。

### 10.3 Asset delivery

- runtime assetはglTF／GLBを基本とし、static batchとcharacter rigを分ける。
- textureはKTX2／Basis Universalへ変換し、base colorはETC1Sまたはquality優先UASTC、normal／roughnessはartifactを実画面で比較する。
- mipmap、anisotropy、LOD、region単位のload／unloadを必須にする。
- 生成元の4K／8K masterをそのまま配信しない。target cameraで必要なtexel densityへbakeする。
- HUDはHTML／CSSでnative resolutionを保ち、dynamic resolutionの影響を受けない。
- 画質を落とす順は、render scale → shadow resolution／対象 → foliage／decal density → optional post。player silhouette、enemy telegraph、interaction表示は削らない。

KTX2／Basis Universalは配信sizeだけでなく、GPU native formatへtranscodeしてmemory、bandwidth、powerを減らすため、mobileでrichなsurfaceを成立させる基盤になる。

### 10.4 Richnessの内訳

画面のrichnessはvoxel数ではなく、次の積で判断する。

```text
silhouette
× material separation
× surface scale variation
× depth and occlusion
× light / shadow integration
× color script
× life traces
× animation and effect timing
× camera composition
```

一人開発で商業作品の全map量を再現することは現実的ではない。ただし、**開始町一画面、主人公一体、同行者一体の知覚品質**へ制作量を集中し、そのquality contractを生成pipelineへ移すことは可能である。

### 10.5 Platform architecture

初版は現在のTypeScript＋Three.js browser／PWAを継続する。iPhoneへ即試遊でき、同じcontent packとsimulationをdesktop browserでも検証できる利点が大きい。release baselineはWebGL2／SDR、WebGPU／P3／HDRはprogressive enhancementとする。

game coreから、storage、audio resume、fullscreen／orientation、safe area、input、share、install promptを`PlatformAdapter`で分ける。これによりSafari／PWA固有処理をsimulationへ混ぜず、将来のSteam wrapperでも同じworld、save、renderer契約を再利用する。

Steam包装はGate A＋B合格後にElectronとTauri等を同じacceptance testで比較する。bundled Chromiumによる挙動の揃えやすさ、system WebViewによる配布size、WebGPU／controller／save path／offline／update／crash logの差を実測し、現時点ではどちらも確定しない。App Store native版と同時に最適化するscopeは初版へ入れない。

## 11. 主人公と同行者を断然良くする生成design

### 11.1 表現方式は三案を同条件で決める

`設計提案・未決定`

一辺16のcube集合をそのまま描画する方式では、密度を増やしてもMinecraft的な表面と硬いanimationが残る。ただしsemantic voxelも既定路線にはしない。三案すべてで開始町を作るのは制作過多なので、二段階で決める。

1. **C0 blockout comparison** — 主人公、同行者、地面／遺構の小背景vignetteだけを、同じcamera、light、短いanimation、effect、端末budgetで三案比較する。
2. **C1 reference scene** — C0で勝った一案だけを、主人公、同行者、開始町一画面のreference qualityへ仕上げる。

C0で比較する三案:

1. literal high-density voxel。
2. semantic voxel volumeから作るsurface。
3. stylized low-poly＋painted／PBR surface。

semantic volumeを使う場合の安全な役割:

- semantic partごとのoccupancy／volumeを作る。
- surface nets、dual contouring、部位別merged meshは体型blockout、hard-surface、prop、terrainの候補生成に使う。
- silhouetteを壊さない範囲でbevel、weighted normal、material boundaryを入れる。
- 角を残す箇所と滑らかにする箇所をpart tagで制御する。
- 服、装備、髪、sensor、repair patchを別layerにする。
- 主人公、人型、犬、猫の変形部は、既知rigと変形用edge loopを持つ人手制作template／modular topologyを正本にする。
- 4〜8方向animationとsignature poseをrigまたはpart transformで作る。

semantic案を採る場合も、結果は「cubeで作った人形」ではなく、**pixel／voxelの論理で設計された小さな立体character**を目指す。生成しやすさではなく、silhouette、変形、surface、画面整合、制作修正時間の総合で選ぶ。

### 11.2 Semantics-First Asset Compiler

characterだけでなく、world内の全assetを同じ意味dataから派生させる。まずversion付き`StyleProfile`をvisualの正本にし、その下で総称を`AssetDNA`、kind別schemaを`CharacterGenome`、`ItemGenome`、`MaterialGenome`、`StructureGenome`とする。

```ts
type StyleProfile = {
  version: string;
  cameraMatrix: readonly number[];
  worldUnitsPerMeter: number;
  keyLightDirection: readonly [number, number, number];
  paletteRoles: PaletteRoleMap;
  materialFamilies: readonly MaterialFamilyId[];
  texelsPerWorldUnit: number;
  edgeTreatment: EdgeTreatment;
  shadowContract: ShadowContract;
  saturationCurve: Curve;
  wearLanguage: readonly WearRule[];
  lodThresholds: readonly number[];
  effectDensityBudget: number;
};
```

```text
StyleProfile + World law / Gameplay contract
        ↓
AssetDNA — stable ID、役割、部品、material、予算、来歴
        ↓
Content IR＋asset manifestを検証
        ↓
人手／Blender／生成tool等のasset adapterがgeometry、PBR、rig、icon、sound候補を作る
        ↓
automated validation＋actual-camera human review
        ↓
approved GLB／KTX2／data pack
```

ここでいうcompilerのP0責務は、Content IRのschema、stable ID参照、seed、budget、manifest、validation、pack出力までである。mesh、material、rig、audioを単一の自作generatorで作る意味ではなく、外部toolや人手工程を`AssetAdapter`として呼び、出力とprovenanceを同じmanifestへ戻す。

例えば同じmaterial IDが、gameplayとvisualの両方を所有する。

```ts
type MaterialGenome = {
  stableId: string;
  propertyMode: "measured_si" | "world_calibrated_sim";
  referenceTemperatureK?: number;
  densityKgM3?: number;
  thermalConductivityWMK?: number;
  specificHeatJKgK?: number;
  electricalConductivitySM?: number;
  hardnessScale?: "mohs" | "vickers" | "sim";
  hardnessValue: number;
  layerThicknessM?: number;
  sourceOrCalibrationId: string;
  confidence?: readonly [number, number];
  gameplayLinks: readonly ("heat" | "fracture" | "sound" | "handling" | "craft")[];
  corrosionTags: readonly string[];
  fractureMode: "ductile" | "brittle" | "layered";
  baseColor: string;
  metallic: number;
  roughnessRange: readonly [number, number];
  normalFamily: string;
  wearRules: readonly WearRule[];
};
```

実在材は単位、基準温度、出典または測定条件を持たせる。架空材は実測物性と呼ばず、`world_calibrated_sim`として既知材との比較とgameplay出力を校正する。複合材は層厚とlayer構成を別schemaで保持する。数値を増やすこと自体を目的にせず、heat、破損、sound、操作、合成のどれへ現れるかを`gameplayLinks`で必須にする。これにより「軽いが被膜が割れる」「熱には強いが衝撃で導電部が露出する」という性能、外見、破損、説明を同じ根拠から生成できる。

### 11.3 `CharacterGenome`

一発のtext-to-3Dを正本にせず、外見とgameplayを共有する構造dataを正本にする。

```ts
type CharacterGenome = {
  stableId: string;
  styleProfileVersion: string;
  role: GameplayRole;
  bodyPlan: "biped" | "quadruped" | "floating" | "wheeled" | "custom";
  proportions: ProportionSpec;
  silhouetteKeys: readonly SilhouetteKey[];
  faceOrSensor: FaceSpec;
  locomotion: LocomotionSpec;
  semanticParts: readonly PartSpec[];
  materialSlots: readonly MaterialSlot[];
  paletteRoles: PaletteRoleMap;
  asymmetry: readonly AsymmetrySpec[];
  wearAndRepairHistory: readonly SurfaceStory[];
  equipmentAnchors: readonly AnchorSpec[];
  moduleSockets: readonly SocketSpec[];
  rigProfile: RigProfile;
  animationProfile: AnimationProfile;
  mobileBudget: AssetBudget;
};
```

### 11.4 制作flow

1. **Role brief** — 戦闘、探索、生活、性格、加入経緯を先に書く。
2. **Silhouette generation** — 2Dで8〜16案を作り、actual game cameraの小サイズで比較する。
3. **Human selection** — 役割が姿だけで読め、既存作品の影が強くない2〜3案へ絞る。
4. **Genome extraction** — 比率、部位、material、色、asymmetry、wear historyへ分解する。
5. **Deterministic assembly** — 種別ごとのpart libraryとsemantic latticeからgeometryを作る。
6. **Optional AI 3D candidate** — hard-surface partやstatic accessoryのblockout／donorとして試す。
7. **Topology／rig gate** — deformation、anchor、collision、LOD、UV、material数を検査する。
8. **Material bake** — albedo、normal、roughness、emissiveを作りKTX2へ変換する。
9. **Animation and sound** — idle、移動、攻撃、guard、dodge、hurt、interaction、signature actionを作る。
10. **Actual-view acceptance** — iPhone実機の`window.innerWidth／innerHeight`、`visualViewport`、safe areaを記録し、その実画面で前後左右、明所、影、戦闘effect中を人が判定する。

2025〜2026年の個別研究は、それぞれPBR、polygon budget、UV／normal bake、automatic rigの一部を前進させている。一つの公開toolがhero制作をend-to-endで保証しているわけではなく、最新surveyもtopology、UV、PBR、rig、physics、scene assemblyまで含むproduction-ready gapが残ると整理している（[production-ready 3D survey](https://arxiv.org/abs/2604.23629)、[AssetGen](https://arxiv.org/abs/2605.26137)）。主人公と主要同行者は、AI meshを無検査で完成品にせず、**conceptと部品候補を生成し、構造は自前のgenomeとvalidatorで所有する**。

### 11.5 主人公のart gate

`設計提案。主人公設定そのものは未決定`

最初に「何者か」が武器なしでも読めるrole briefを作る。仮の職能は**回収品を運びながら道、機械、水場を修理する辺境の旅仕事人**とし、華美な軍人や選ばれた英雄の記号を避ける。衣服には日除け、雨、工具、荷重分散、修理を理由として持たせ、旅の履歴を継ぎ布、交換部品、擦れ、所有札で示す。

同じbody／animationへ着せる最初の三concept:

| Concept | 一形状 | 一色 | 読ませる生活／職能 |
|---|---|---|---|
| A「風受けの修理屋」 | 片側だけ大きい三角の肩布／雨除け | 黄土amber | 日差し、雨、荷物を受ける。布の補修線が旅の地図に見える |
| B「環状回収具の旅人」 | 背中から片側へずれるbroken ring | 青緑verdigris | 巻上げ、測量、運搬を一つのframeへまとめた仕事道具 |
| C「長脚の境界測り」 | 膝下と測量rodが作る二本の長い縦線 | coral red | 悪路を越え、地面とsignalを測る軽装のfield worker |

この名称や色はcanonではない。front／back／side、武器なし、通常立ち、signature pose、最終cameraサイズで比較し、次を満たす一案だけを採る。

- 画面上の小さなsilhouetteだけで、頭、胴、左右の脚、武器、向きが読める。
- 3色程度の大きなcolor blockと、一つのsignal accentで識別できる。
- 前後非対称と一つの象徴的shapeを持つ。
- 通常立ち、攻撃、guard、dodgeの重心が異なる。
- 顔または視線方向が読めるが、細部を顔textureだけに依存しない。
- 装備交換で、手に持つ物だけでなく姿勢、sound、effect timingが変わる。
- 正面と背面で、道具の用途と修理履歴が別の情報として読める。

### 11.6 同行者のart／game gate

同行者をheroの小型版や自動DPS枠にしない。

- `analysis robot`: 浮く水平disc＋片側の折畳みarm。scan／接続。energyとcoolingが必要。iris、fin、hover heightで感情を示す。止まった雨水塔の内側で、自分を修理部品と誤認して分解中のところへ出会う。
- `dog`: 大きい胸郭＋細い脚＋片耳の色札。追跡／警戒／小物回収。食事、休息、信頼が必要。耳、尾、歩調、主人公との距離で状態を示す。遺品の匂いを追う途中で何度もrouteが交差し、餌だけではなく共同探索で加入する。
- `work robot`: 低い台形body＋長い二本のlift arm。障害物破壊／一時遮蔽。部品、heat、重量制約を持つ。崩落した市場で屋根を支え続けており、住民と代替支持を作ってから同行可能になる。

初期同行枠1は設計提案であり未決定。rosterは複数を保持し、待機中にもworld内の居場所と仕事を持たせる。少なくとも一体の探索verb、一つのplayer命令型有限action、一つの拠点role、一つの固有補給法を持つ。夏版が一体だけなら証明できるのは「発見・加入proof」までであり、交換可能rosterの完成とは記録しない。rosterを証明するなら、低制作costでも二体目を入れ、同行者選択がroute、補給、別解を変えるところまで試す。

## 12. Item／武器を生成してbuildへする方法

### 12.1 部品文法

```text
骨格／frame
+ 駆動部
+ 動力源
+ 制御部
+ 作用部
+ interface
+ 冷却／安全機構
```

各部品はmass、power、heat、stress、bandwidth、noise、risk、対応interfaceを持つ。合成は`pass`／`conditional`／`reject`を返す。

`conditional`例:

- adapterを付ければ接続できる。
- 出力を60%へ制限すればheat budget内へ収まる。
- 冷却材を消費するなら三回だけ使える。
- 反動を同行者のsupportで受ければ使える。

高技術bandは強さの序列ではなく、制御精度と複雑性を示す。巨大なE帯杭打機がA帯分子操作具より直接damageで強くてもよい。

### 12.2 Loot採用条件

- 既存verbのtiming、range、risk、resource、targetのどれかを変える。
- 単純な完全上位互換ではない。
- world内の用途と戦闘用途が最低一つずつあるか、どちらかが非常に強い。
- sound、effect、持ち方の差で使用感が読める。
- 来歴と作用がworld cellの資源／異常から導かれる。
- 所有者、修理、改造、死亡時の移動を履歴として残せる。

### 12.3 Gate Aで比較するbuild候補

`設計提案・数値未調整`

| Build | Base | 主判断 | 強み | 代償 | World verb |
|---|---|---|---|---|---|
| Counter cutter | 既存の測量刃frame＋counter module | 敵の予兆へ踏み込み、guard直後に刃へchargeを移す | 軽い、静か、just guardで循環 | 群れと離れたtargetに弱い | cable、布、植物を精密切断する |
| Breach driver | 既存の杭打機frame＋flywheel module | 長い予備動作中の位置と、反動後の退路を決める | armor、壁、重量物へ強い | heat、騒音、移動commitment | 崩落、扉、杭、支持材を動かす |
| Resonance line | 測量刃frame＋手動active line module。第三frameではない | 中距離pointへlineを刺し、heatと接続時間を管理する | 誘導、引寄せ、signal採取 | 有限charge、直接damageは低い | 機械、生物、配線を一時接続する |

hard gateはCounter cutterとBreach driverの二build。Resonance lineは同じ二frameから三つ目の遊び方を作れるかを見る目標枠である。DPS差ではなく、間合い、timing、resource、target、route判断の少なくとも三項を変える。採用buildはどれでもsliceを完走できるが、すべてを一装備で最適化できないようpower、heat、mass、noise、interface budgetを競合させる。

Loot／Build Contractの初期値:

- 最初の5分で、現在のbuildを変え得るmodule候補を2〜3回見る。drop間隔は60〜120秒を仮説としてplaytestで調整する。
- field pickupは詳細説明で戦闘を止めず、`変わるverb／主な利点／主な代償`だけをcardで示す。安全時に比較画面を開く。
- 比較画面は現在装備との差を数値だけでなく、range、timing、heat、noise、対応world verbの五軸で示す。
- `装備`、`保管`、`分解`の結果とundo可能時間を明示する。装備変更中はworld pauseを推奨する。
- 遠征内成長は今回の組替え、永続成長はframe解放、知識、拠点設備、来歴に分ける。永続数値だけで序盤を無意味にしない。
- moduleは少なくとも二つのbuildへ意味を持ち、完全な一用途ごみを避ける。一方、組合せの万能化はresource budgetで禁止する。

## 13. 音と音楽をgameplayへ接続する

音は雰囲気の飾りではなく、weapon、危険、異形の状態、world memoryを伝える第二のUIにする。

### 13.1 `AudioGenome`

```ts
type AudioGenome = {
  stableId: string;
  gameplayRole: "exploration" | "danger" | "combat" | "settlement" | "result" | "entity";
  tempoRange?: readonly [number, number];
  pulsePattern: string;
  timbreFamilies: readonly string[];
  density: number;
  emotionalTemperature: "bright" | "dry" | "tense" | "bittersweet" | "uncanny";
  loopLengthSeconds?: number;
  layers: readonly AudioLayerSpec[];
  triggerEvents: readonly WorldEventType[];
  mobileSpeakerBand: readonly [number, number];
  originalityChecks: readonly string[];
};
```

`Go, Go, Heartbreaker! / MYUKKE.`と`.conf / ariiol`から参照するのは、移動を前へ押すtempo、明るさの中の切なさ、反復の余白、音の密度変化、探索を旅として感じる温度である。melody、rhythm pattern、arrangement、固有soundは複製しない。

### 13.2 Layered score

- 90〜120秒程度の疲れにくい探索base。
- 地域危険度、追跡、異形の活性で重なるdanger layer。
- combat開始時に曲を毎回切り替えず、percussion／pulse／noiseを追加して連続した旅を保つ。
- 風、水路、昆虫、発電機、調理、修理、遠い会話などの生活音を地域ごとに2〜4層持ち、敵の不在も「無音」だけにしない。
- 破壊、鎮静、接続、死亡へ短いresult stingerを割り当てる。
- world eventが残った地域では、次回のbaseへ一つだけ音響差分を加え、前回結果を耳でも認識できるようにする。
- weapon、guard、dodge、enemy telegraph、item、companion commandは、iPhone speakerのmonoでも区別できる周波数とtimingにする。
- 各weapon frameへ、構えのmechanical pre-sound、contactの材質音、resource状態のtailという三段のsignatureを持たせ、画面外でもbuildの手触りを区別する。

AI／procedural生成は開発時にpreset、motif候補、sound parameterを作り、人が採用したものだけを収録する。runtimeでは承認済みlayerをworld stateに応じてmixするだけで、新しい曲やmelodyをlive生成しない。既存曲そのものの収録はgame、Web、Steam、地域、期間を含むlicense確認まで別問題とする。

## 14. AIを面白さへ接続する三段構造

### 14.1 Rule AIではなくCandidate AI

```text
Layer A: deterministic game truth
  数値、state、物理budget、到達性、報酬、合成可否、world mutation

Layer B: generated candidate
  名称、外観motif、生活者の解釈、技術者の仮説、噂、surface候補

Layer C: human authorship
  採否、修正、art direction、面白さ、固有性、権利判断
```

LLMは文章の魅力を作れても、長いgame stateと規則の一貫性を崩しやすい。runtime mechanicsはLayer Aから動かさない。

### 14.2 Keypoint validation

一つの長い自動playだけで検査せず、生成specを小さなassertionへ分解する。

例:

- 「無音鈴は対峙前に取得できる」stateへ直接入り、到達可能性を検査。
- 「鎮静後にsignal stateが`stable`になる」直前stateへ入り、一actionだけ実行。
- 「死亡装備が宿敵へ移る」死亡直前stateを注入し、所有者とsave再読込を確認。
- 「adapterなしではmoduleがrejectされる」合成stateだけを検査。

2026年のGameGen-Verifierは、100本のLLM生成gameを対象に、仕様をkeypointへ分けてruntime stateへ注入し、短いinteractionで検証する方法を報告している（[paper](https://arxiv.org/abs/2605.07442)）。本作への一般的保証ではないが、deterministic simulationの検査を分割する着想として採る。

### 14.3 AI design assistantの役割

将来、AIはplay trace、死亡地点、未使用item、選択率、build dominanceを読み、次のcandidate変更を提案できる。ただし自動適用しない。

```text
simulation／human play trace
→ metricと代表frame
→ AIが原因仮説とparameter変更案を提案
→ deterministic batch test
→ human review
→ accepted configだけcommit
```

NVIDIAの2025年研究「Fly, Fail, Fix」は、RL agentのplay traceをlarge multimodal modelが読み、game configurationを反復修正する枠組みを示している（[NVIDIA Research](https://research.nvidia.com/publication/2025-08_fly-fail-fix-iterative-game-repair-reinforcement-learning-and-large-multimodal)）。本作では「自動balance担当」ではなく、見落としを出すdesign reviewerとして使う。

### 14.4 生成量ではなく遊びを測る指標

`本作独自の設計提案・未校正`

| Metric | Definition | 使い方 |
|---|---|---|
| 意思決定密度 | 異なる将来結果を持つ選択／分 | 同じcombat判断だけの連続を検出 |
| 因果収率 | 重要world eventのうち、後のplayでplayerが認識できた割合 | eventを保存しただけの偽の永続性を検出 |
| 機械的距離 | 二つの武器／buildが要求する間合い、timing、resource判断の差 | 数値だけ違う装備を除外 |
| 伝承実体化率 | 説明文の主張が能力、場所、関係、eventとして実在する割合 | 設定だけ豊かな装飾を除外 |
| 装飾的孤児率 | gameplay contract、world cell、または承認済みambient-art目的tagへ接続しない生成物の割合 | 目的tagなしを0にする。生活感のため意図して承認した環境演出は除外 |
| 別解率 | 戦闘以外の有効解法を持つ重要encounterの割合 | すべて三択にせず、適切な対象だけ測る |
| 再訪差分 | 同じ地域の再訪時、以前の行動に起因する視覚／機械変化 | world memoryの強さを測る |
| Hard failure | soft lock、無限利益、必須item到達不能、save不整合 | すべて0 |

automatic metricは候補を落とすfilterであり、面白さの最終点数ではない。actual touch play、art review、因果を説明できるかは人が判定する。

### 14.5 ProvenanceとSteam

assetごとに少なくとも次を保存する。

```text
source input / owner / license
tool / model / version / service terms snapshot
prompt or structured spec
seed if available
raw output hash
human edits and derivative steps
final asset hash
accept / reject reason
reference screening
```

Steamworksは、gameへ同梱されplayerが消費するAI-assisted artwork、sound、narrative、localizationなどをpre-generated AI contentとして申告対象にしている。live-generated contentには追加guardrail説明が必要である（[Steamworks Content Survey](https://partner.steamgames.com/doc/gettingstarted/contentsurvey?language=english)）。runtime AIを避けてもpre-generated申告と権利責任は残り、申告自体が法的clearanceにはならない。提出時点の規則を再確認する。

### 14.6 将来の「因果世界コンパイラ」と夏版の縮小形

`独自設計提案`

以下は反復制作を支えるtarget architectureであり、夏版に全部を実装しない。geometry、PBR、rig、sound、mission、simulation、provenanceを一度に汎用tool化すると、gameよりtool開発が大きくなる。

夏版は、**一つの雨水再生塔cellを人が手作業で構造化し、最小JSON schema、stable ID参照、seed、provenance、hard validationだけを通す**。geometry／audioは既存の制作手段で作り、汎用compile、candidate registry UI、自動repair agentはGate A＋B合格後に、実際に繰り返し作業となった工程だけを自動化する。

将来architectureでは開発時と実行時を分離する。

```text
Development-time Node／TypeScript CLI
  authored intent + world seed + generator version
  → GameplayContract / WorldCellSpec / AssetDNA candidate
  → schema / reference / units / physics / mission / economy / build-distance validation
  → AI expression candidate + procedural asset candidate
  → actual-camera preview + automated play
  → human accept / revise / reject
  → signed-off Content Pack + provenance manifest

Runtime browser / PWA
  approved Content Packを読む
  → deterministic local placementとEvent Log Liteだけを進める
  → IndexedDBへsnapshot / world event / generator versionを保存
```

具体的な実装規則:

- JSON Schema＋AjvまたはZodでContent IRを検査する。AIのStructured Outputsで形を拘束できても値の意味は保証されないため、参照、物理、balance、解法はcodeで再検査する（[OpenAI公式説明](https://openai.com/index/introducing-structured-outputs-in-the-api/)）。
- 生成乱数は整数seedから作り、`hash(worldSeed, stableId, stage, generatorVersion)`で工程ごとに分離する。生成codeでは`Math.random()`を使わない。
- byte再現を要求するのはprocedural code工程だけにする。AI／画像／3D serviceは同じseedでも一致を保証しないため、最初のraw outputをhash付きcandidateとして凍結する。同じrequestを再実行した出力は別IDの新candidateとし、再検査／再承認する（[OpenAI Cookbookのseed境界](https://cookbook.openai.com/examples/reproducible_outputs_with_the_seed_parameter)）。
- mission DAGとspace graphを別dataにし、到達性、必須地点、退路、別解を検査してから、WFC／配置文法で局所surfaceを仕上げる。
- AIは許可されたfieldの候補だけを返し、既存entity IDを自由文で発明させない。後工程は前工程の確定IDだけを参照する。
- candidate registryにはinput、tool／model version、seed、raw hash、validator結果、cleanup時間、license、human decisionを残す。
- 失敗候補を無限再生成せず、回数上限後は承認済みfallback cellへ戻す。
- runtimeに重い地域配置が残る場合だけWeb Workerで先読みし、UI threadへgameplay-readyなdataを渡す。LLM APIとasset生成はruntimeへ持ち込まない。
- Event Log Liteは一撃ごとではなく、帰還、対処、所有権、加入、route、供給などの重大eventだけを保存し、一定件数でsnapshotを作る。

生成pipeline自体の合格条件は、生成数ではなく「procedural工程は同じseed／versionでbyte再現」「AI候補はraw hashで凍結」「参照切れ0」「到達不能0」「無限利益0」「目的tagなし0」「人が一件を修正する時間が許容内」である。

## 15. World Loop Proof v0.2

`設計提案。三gateを別々に合格させる`

夏休み中の次の完成目標は、広い完成版ではなく、**手動ハクスラが気持ちよく、二回遊ぶと自分の選択で世界の意味が変わる公開vertical slice**とする。一つの巨大scopeにせず、次へ分ける。

### 15.1 三つのgate

| Gate | 証明すること | 最小scope | 完了条件の要点 |
|---|---|---|---|
| A: Hack-and-build | iPhoneで手動combatとloot比較が気持ちよく、buildが判断を変える | 既存mapの一部、敵2、weapon frame 2、module 4〜6、build最低2／目標3、loot UI | 間合い、timing、resource判断が異なる2 buildをtesterが説明できる。第三buildは目標枠 |
| B: Roam-and-memory | 自分で目的を選び、その結果が次回の外見と遊びを変える | 同じ小map、同時目的2、重要encounter 1、対処2以上、persistent variable 3〜4 | 対峙前に目的／routeを選び、二回目90秒以内に因果を認識して行動を変える |
| C: Visual benchmark | 主人公、同行者、町が一つの商業品質方向へ収束する | C0は主人公＋同行者＋小背景vignetteの三表現blockout。C1は勝った一案だけで開始町一画面 | C0で一案を採り、C1を実機でsilhouette、material、depth、生活感、操作視認性まで合格させる |

内部gameplay proofで必須なのはA＋B。Cは並行制作するが、commercial art pass全体をA／Bの検証blockerにしない。ユーザーへ目標品質の完成候補として公開する版はA＋B＋Cを必要とし、A／Bが弱い状態をCの美しさで、Cが弱い状態をA／Bの強さで完成扱いにしない。

### 15.2 統合時のcontent上限

| Kind | Budget |
|---|---|
| Play time | 初回12〜18分。二回目90秒以内に因果を発見 |
| Map | 拠点1、分岐街道1、小遺跡1。既存範囲を再利用 |
| Character | 主人公1、通常敵2〜3、名付き異形1。宿敵variantはGate B余力時 |
| Weapons | 既存2 frame＋交換module 6以内 |
| Loot | 意味のあるitem 8以内。完全上位互換なし |
| Relic | active 1 |
| Objectives | 同じ空間へ同時に2。途中帰還／放棄可 |
| Outcomes | 最低2。破壊、鎮静、接続から選ぶ。死亡／奪還は次の拡張候補 |
| Companion | Gate C用の候補1。実playへ入れる場合は「加入proof」と明記 |
| Companion action | 実playへ入れる場合、自動攻撃ではない有限resource命令1 |
| Persistent variables | 町在庫、signal、route危険度、named entity所持品など3〜4 |
| Visual art gate | 開始町一画面、主人公、同行者、主要enemyだけをreference qualityへ |

一体だけで証明できるのは発見／加入までで、rosterの本質である交代は証明できない。rosterを夏に証明する場合だけ、低制作costの二体目を加え、route、補給、別解が変わるところまで実装する。

### 15.3 必ず残すもの

- 手動攻撃、防御、回避。
- 差が明確な三buildと、苦にならない比較／装備／分解。
- 同じ空間に同時目的を二つ置き、自分で選ぶこと。
- 破壊以外の対処。
- 少なくとも一つの結果を、次回の見た目とgameplayへ反映すること。
- iPhone 16 Pro実機試験。

遅れた場合は、宿敵／死亡奪還、追加enemy、追加loot、同行者の実play参加、町以外の高密度artの順で削る。Gate Aのcombat／buildとGate Bの自己目的／因果は削らない。

### 15.4 合格条件

内部:

- 選んだ二対処を含む15遠征でcrash、進行不能、save破損0件。
- update前saveからmigrationできる。
- persistent変数とitem所有者が再起動後も一致する。
- atomic snapshot、直前backup、checksum、save export／importが成立し、Safari版とHome Screen版のstorage分離を誤って自動継承扱いしない。
- iPhone 16 ProのSafari／ホーム画面PWAで10分、選択profileのp95 frame-time目標を満たし、500ms級停止、操作不能、戻せない拡大がない。

体験:

- 30秒以内に移動と攻撃が成立する。
- 90秒以内に武器差またはguard成功を体感する。
- 最低二buildについて、数値以外の立ち回り差と代償を説明できる。第三buildは目標枠として別判定する。
- 対峙前に、二つ以上の候補から今回の目的またはrouteを自分で選んだと認識できる。
- playerが「何が変わったか」「なぜ変わったか」「そのため次に何を変えたか」を説明できる。
- 指示されず二回目を始めたいと思う。
- 感想が「もっと絵を綺麗に」だけで終わらず、別build、別対処、別route、同行者のどれかを次に試したいと言える。

## 16. 最新技術から採用するもの／保留するもの

| Technology / finding | Current evidence | Project decision |
|---|---|---|
| WebGPU on iPhone | Safari 26でiOSを含め出荷 | capability experimentは行う。release dependencyにしない |
| Three.js WebGPURenderer | WebGPU＋WebGL2 fallbackを持つがexperimental | TSL移行costを測る別branch。今のWebGL2を捨てない |
| Half-float／P3／HDR | Safari 26はHDR imageとWebGPU Canvasを扱うが、内部精度、wide color、HDR outputは別能力 | sRGB／AgXをbaseline。P3とHDRは別々の実機enhancement |
| WebGL Display-P3 | Safari WebGLはP3 drawing bufferを扱えるが、stock Three.js設定だけでは現project経路を再現しない | custom color-space登録＋`drawingBufferColorSpace` probeを明示し、失敗時sRGB |
| KTX2／Basis | GPU native textureへtranscodeしmemory／bandwidthを削減 | next surface pipelineのP0候補 |
| 2025〜2026 3D generation | 個別研究がPBR、UV／normal bake、polygon control、rigの一部を前進 | static prop／part候補へ試す。heroのend-to-end完成を期待しない |
| LLM game generation | 魅力ある文章は作れるが長期mechanics一貫性は弱い | runtime state ownerにしない |
| Keypoint state-injection test | 限定されたLLM生成game群で、長期playを分解した検証を報告 | world event／合成／quest testへの着想として試す |
| AI＋play trace iteration | RL agent traceからconfiguration改善を提案する研究例 | human-approved offline design assistantとして試す |

### 16.1 2026年時点のasset-generation候補

| Candidate | Confirmed capability | 本作での安全な用途 |
|---|---|---|
| Pixal3D | SIGGRAPH 2026。単一画像からPBR付きGLBを生成。repository codeはMIT | 一点物の遺物、静的機械、樹木、石像の候補。retopo／LOD／collision／入力・出力権利検査後に採否 |
| TRELLIS.2 | PBR、複雑topology、opacityを扱うimage-to-3D。repositoryはMIT。公式要件はLinux＋24GB NVIDIA GPU | cloud／専用GPUで比較する研究候補。local defaultにしない |
| SkinTokens | meshからskeleton／skinningを作る2026年のresearch implementation。repositoryはMIT | animal／怪物／候補meshのrig案。motion品質、足接地、武器保持、変形、GPU要件を再検査 |
| CubePart | 論文はpart-controllable生成を扱う。現公開codeは主に既存mesh＋part schemaからpart meshへ分解 | `AssetDNA`の設計precedent。公開README／root license／checkpoint card間で適用範囲を明確に確認できないため、clearance完了まで製品asset生成へ使わない |
| PBR material generation | Adobe Substance 3D Sampler等は画像からnormal、height、roughnessを含むmaterial候補を生成 | 地面、錆、陶器、塗装、樹皮を優先。完成3D生成より制御しやすい（[Adobe公式](https://experienceleague.adobe.com/en/docs/substance-3d-sampler/using/filters/tools/image-to-material)） |
| Blender Geometry Nodes／独自generator | parameterとruleでmodular geometryを再現可能 | 建物、配管、破損、植生、修理跡の正本。生成AI候補を安定したworld kitへ変換 |

最新tool名をproduction dependencyへ直結させない。最初に同じ入力、同じtarget camera、同じbudgetで比較し、license、再現性、cleanup時間、実画面品質を含む総costで選ぶ。MIT等の表記はrepository code／modelの許諾を指し、入力画像、生成出力、checkpoint、dependency、第三者権利の非侵害保証ではない。release時に個別再確認する。

## 17. 最後に残る重要な未決定

次の実装へ進む前に、最終的には以下をユーザーと決める。

1. **瞬間の核** — 近接主体の手動hack-and-slash＋module buildを中心にしてよいか。
2. **長期の独自性** — 自由な放浪＋world memoryを中心にしてよいか。
3. **死** — 完全死亡、行方不明／救出、重傷復帰のどれをbaselineにするか。
4. **主人公** — 固有主人公一人を深く描くか、複数旅人の人生を巡らせるか。
5. **世界法則** — 残響基盤案を採るか、妖怪を独立した存在として強くするか。
6. **遠距離攻撃** — 主人公の常用武器、有限resource、同行者支援のどこへ置くか。
7. **同行者の夏scope** — 一体の加入proofにするか、二体を用意して交代まで証明するか。
8. **visual identity** — 三表現を同条件で比較し、どの比率を採るか。

推奨する検証順は、Gate Aの手動combat／build、Gate Bの自己目的／world memory、Gate Cの三表現比較である。event-driven world、world graph＋local map、複数旅人save、同行枠1は有力な設計提案だが未承認。semantic voxel surfaceもGate Cの一候補であり既定路線にしない。runtime AIなしだけは、初版scopeの安全なdefaultとする。

## 18. Sources reviewed by evidence type

### Official platform／product documentation

- WebKit, [News from WWDC25: WebGPU in Safari 26](https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-this-fall-in-safari-26-beta/)
- WebKit, [WebKit Features in Safari 26.0: HDR images and WebGPU Canvas](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/)
- WebKit, [Updates to Storage Policy](https://webkit.org/blog/14403/updates-to-storage-policy/)
- WebKit, [Safari 17.2 Home Screen Web App storage model](https://webkit.org/blog/14787/webkit-features-in-safari-17-2/)
- Three.js, [WebGPURenderer manual](https://threejs.org/manual/en/webgpurenderer)
- Three.js, [WebGLRenderer documentation](https://threejs.org/docs/pages/WebGLRenderer.html)
- Apple, [Safari 16.4 release notes: WebGL wide-gamut canvas](https://developer.apple.com/documentation/safari-release-notes/safari-16_4-release-notes)
- Khronos, [KTX 2.0 and Basis Universal for glTF](https://www.khronos.org/news/press/khronos-ktx-2-0-textures-enable-compact-visually-rich-gltf-3d-assets)
- Apple, [iPhone 16 Pro technical specifications](https://support.apple.com/ja-jp/121031)
- Adobe, [Image to Material](https://experienceleague.adobe.com/en/docs/substance-3d-sampler/using/filters/tools/image-to-material)
- OpenAI, [Structured Outputs](https://openai.com/index/introducing-structured-outputs-in-the-api/)
- OpenAI Cookbook, [Seed and reproducibility boundary](https://cookbook.openai.com/examples/reproducible_outputs_with_the_seed_parameter)
- Valve, [Steamworks Content Survey: Generative AI Content](https://partner.steamgames.com/doc/gettingstarted/contentsurvey?language=english)

### Conference／workshop publications and research pages

- Tencent ARC, SIGGRAPH 2026, [Pixal3D](https://github.com/TencentARC/Pixal3D)
- Roblox, SIGGRAPH 2026, [CubePart publication page](https://about.roblox.com/publications/cubepart-open-vocabulary-part-controllable-3d-generator)
- Dormans, PCG Workshop 2010, [Adventures in Level Design](https://pcgworkshop.com/archive/dormans2010adventures.pdf)
- Freehold Games, [Generation of Mythic Biographies in Caves of Qud](https://www.freeholdgames.com/papers/Generation_of_mythic_biographies_in_Cavesofqud.pdf)
- NVIDIA Research, 2025, [Fly, Fail, Fix](https://research.nvidia.com/publication/2025-08_fly-fail-fix-iterative-game-repair-reinforcement-learning-and-large-multimodal)

### Preprints／technical reports

- Wang et al., 2026, [AssetGen](https://arxiv.org/abs/2605.26137)
- Wu et al., 2026, [Production-ready 3D asset generation survey](https://arxiv.org/abs/2604.23629)
- Rigel3D, 2026, [Rig-aware Latents](https://arxiv.org/abs/2605.13129)
- Yu et al., 2025, [RPGBench](https://arxiv.org/abs/2502.00595)
- Jia et al., 2026, [GameGen-Verifier](https://arxiv.org/abs/2605.07442)

### Repositories／reference implementations

- Microsoft, [TRELLIS.2](https://github.com/microsoft/TRELLIS.2)
- VAST AI Research, [SkinTokens](https://github.com/VAST-AI-Research/SkinTokens)
- Roblox, [CubePart README and public implementation scope](https://raw.githubusercontent.com/Roblox/cube/main/cubepart/README.md)
- Roblox, [Cube root license](https://raw.githubusercontent.com/Roblox/cube/main/LICENSE) and [CubePart checkpoint card](https://huggingface.co/Roblox/cubepart)
- mxgmn, [WaveFunctionCollapse reference implementation](https://github.com/mxgmn/WaveFunctionCollapse)
