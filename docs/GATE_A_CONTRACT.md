# Gate A Contract: Position-and-build v0.1

Last updated: 2026-08-01  
Status: calibration draft / reference-only during PC North Star iteration / partially implemented / full iPhone acceptance deferred

## 1. この文書が固定するもの

Gate Aは、半自動戦闘が「眺めるだけ」ではなく、位置取りとbuild判断を濃くするかを判定する。ここで扱うのは一回の戦闘感触であり、自由放浪、拠点、world memory、完成visual、save耐久性は別gateとする。この文書は反復の開始値であり、visual、animation、game feel、build差の制作を止める承認手続きではない。

今回のlocal spikeは次を意図として保つ。

- playerは移動、接敵、間合い、撤退を手動で行う。
- 通常攻撃buttonは置かず、装備条件を満たすと通常攻撃を自動実行する。
- 大技、回避、itemは手動。通常targetは自動取得する。
- `Counter cutter`と`Breach driver`の二buildをhard gateとする。
- 格下は自動通常攻撃だけで処理できる。
- 名付き敵は立ち止まり／大技なしでは安定勝利できない。
- 遠距離通常攻撃、同行者、第三buildは今回の実装へ入れない。

数値は採用値ではなく、同じ条件で比較する最初のcalibration値である。反復中はfeelを優先して変更し、視界外追尾、二重hit、非有限座標など作品を壊す境界だけを軽量testで守る。採択候補になった段階で数値表とruntimeを同期する。

North Star v0.1では二build差、auto basic、大技、視界外／遮蔽、既存route維持のsmokeだけをblockerとし、本matrix全件の実装・調整をvisual／game-feel iterationの前提にしない。

## 2. 時間と座標の基準

| 項目 | v0.1 |
|---|---:|
| simulation | 固定30 tick／秒 |
| 1 tick | 33.33 ms |
| player通常速度 | 168 world unit／秒 |
| dodge距離 | 84 world unit |
| dodge無敵 | 7 tick / 233 ms |
| dodge再使用 | 30 tick / 1.0秒 |
| target再評価 | 毎tick |
| target距離猶予 | 6 tick / 200 ms |

browser frame rateはsimulation結果を変えない。background、縦画面、modal中はsimulationと保持入力を止め、復帰時に入力queueを破棄する。

## 3. Combat Feel Contract

### 3.1 通常攻撃state machine

```text
Idle
  → Acquire: 有効候補をscoreし、一体を固定
  → Windup: build固有の時間、移動倍率、cancel規則を適用
  → Hit: target、距離、遮蔽を再検査して一度だけ解決
  → Recover: 次の移動判断を許し、終了後に再評価
  → Idle / Windup
```

`Hit`は1 tickだけ存在する。damage、knockback、effect、soundは同じaction IDへ紐付け、二重解決しない。

### 3.2 target候補

候補は次の全条件を満たす。

1. hostile、active、HP 1以上。
2. playerからbuildの`acquireRange`以内。
3. combat viewportの内側24 CSS pxより内側に中心がある。
4. player中心からenemy中心への線分がsolid terrainを横切らない。
5. scene開始前のsafe／dialog stateではない。

候補scoreは高いものを優先し、同点はstable IDの昇順で決める。

```text
score = 1000
      - distance × 2.0
      + facingAlignment × 120
      + threat × 160
      + currentTarget × 80
```

- `facingAlignment`: -1〜1。移動入力中は入力方向、停止中はplayerの向き。
- `threat`: playerへ予兆中なら1、それ以外は0。
- `currentTarget`: 前tickと同じtargetなら1。小さな距離差でtargetが点滅しないためのhysteresis。

### 3.3 target drop

次は即時dropする。

- targetがdefeated／非hostileになる。
- target中心がcombat viewport外へ出る。
- solid terrainで遮蔽される。
- playerがdodgeし、そのbuildがwindup cancelを要求する。

距離だけが`dropRange`を超えた場合は6 tickの猶予後にdropする。camera外、遮蔽越し、別区画までtargetを追跡し続けない。

### 3.4 二つのbuild

| Contract | Counter cutter | Breach driver |
|---|---:|---:|
| acquireRange | 132 | 96 |
| dropRange | 164 | 128 |
| hitRange | 108 | 82 |
| windup | 5 tick / 167 ms | 18 tick / 600 ms |
| hit | 1 tick | 1 tick |
| recover | 9 tick / 300 ms | 16 tick / 533 ms |
| 一周期 | 15 tick / 500 ms | 35 tick / 1.17秒 |
| 基本damage | 13 | 42 |
| knockback | 8 | 34 |
| windup中の移動倍率 | 1.00 | 0.35 |
| recover中の移動倍率 | 1.00 | 0.75 |
| 通常hit数 | 1 | 1 |
| 基本attackの主判断 | 薄い間合いを維持 | 始動位置と退路を決める |

Counter cutterは移動してもwindupを維持するが、hit時に距離／遮蔽を再検査する。Breach driverはwindup後半6 tickをcommit区間とし、dodgeで攻撃を捨てる。これによりDPSだけでなく、成立距離、周期、移動拘束、撤退判断が変わる。

### 3.5 手動大技

| Build | 大技 | 成立条件 | 成功 | 失敗入力 |
|---|---|---|---|---|
| Counter cutter | Return Cut | targetが132以内でenemy telegraph中 | 48 damage、攻撃中断、45 tick露出 | chargeを消費せず0.35秒の不成立表示 |
| Breach driver | Overdrive | 自動windupの残り8 tick以内、targetが82以内 | 即時96 damage、60 tick露出、攻撃後heat 60 | chargeを消費せず0.35秒の不成立表示 |

- 各大技は開始時2 charge。spike中の自然回復はない。
- 大技buttonは成立時だけ色、ring、短い音で予告し、成立不能時もbuttonを消さない。
- 名付き敵は通常時にbasic damageを35%へ軽減する。露出中は100%通る。
- 大技をmechanics上の正解buttonにせず、成立距離とtimingを作るまで押しても発動しない。

### 3.6 enemy contract

| Enemy | HP | 速度 | attack | 予兆 | 回復 | 役割 |
|---|---:|---:|---:|---:|---:|---|
| Survey scavenger | 36 | 104／秒 | 8 | 15 tick | 20 tick | 自動交戦の理解 |
| Relay warden | 520 | 82／秒 | 19 | 21 tick | 24 tick | 位置変更、dodge、大技の確認 |

- 全enemy attackはdamage解決前に予兆を出す。
- 予兆開始時のplayer位置を狙い、解決時に無制限追尾しない。
- Relay wardenはbasic damage軽減を持つが、完全無敵にはしない。
- standing still、manual skillなしの30秒runはplayer敗北またはwarden HP 60%以上をhard fail期待値とする。
- movement、dodge、大技を使う45秒以内のscripted runは両buildで勝利可能にする。

### 3.7 遠距離通常攻撃を後で入れる場合の上限

v0.1 spikeでは実装しない。将来入れる場合も、最大取得距離240、発射時と命中時の遮蔽検査、projectile寿命0.8秒以内、発射後のhomingなしを最低条件にする。画面外、遮蔽越し、無制限追尾は不採用とする。

## 4. Loot／Build Contract

### 4.1 構造

```text
weapon frame
  + drive module
  + active module
  + support module
```

- frameは`cutter`または`driver`の一つ。
- activeは一つ。通常攻撃を連打buttonへ戻すmoduleは禁止。
- supportはpower、heat、mass、noiseのbudgetを競合させる。
- moduleはrange、timing、risk、resource、target、world verbの最低一つを変える。
- 単純なdamage上位互換だけのlootは採用しない。

### 4.2 最初の候補

| Module | 変わるverb／判断 | 利点 | 代償 | World verb |
|---|---|---|---|---|
| Counter coil | 予兆へReturn Cut | 中断と露出 | 単体、timing依存 | cable／布を精密切断 |
| Quiet edge | target成立幅を薄くする | 低noise、短recover | 群れに弱い | 植生を傷めず採取 |
| Flywheel | 長いwindupを蓄える | armor／構造物へ強い | heat、移動commit | 扉／支持材を動かす |
| Recoil anchor | hit後の位置を保つ | knockback耐性 | mass、dodge距離低下 | 杭／足場を固定 |
| Phase coolant | heatを放出する | Overdrive再利用候補 | 消耗材を使う | 高温遺構へ接続 |
| Resonance line | 中距離へ手動接続 | 誘導、signal採取 | charge、低い直接damage | 機械／生物／配線へ接続 |

hard gateはCounter coilを含むCounter cutterと、Flywheelを含むBreach driver。Resonance lineは第三frameではなく、二frameのactive交換で第三の遊び方が作れるかを見る次段候補とする。

### 4.3 drop cadence

- 最初の5分でbuildを変え得る候補を2回以上提示する。
- 仮のdrop間隔は60〜120秒。固定timerではなくenemy、危険route、探索対象へ紐付ける。
- combat中のpickupは1.2秒の小cardだけを出し、詳細比較を開かない。
- hostileが260以内にいない、予兆後60 tick経過、modalなしをsafe条件とする。

### 4.4 mobile loot wireflow

```text
接触／自動回収
  → 1.2秒card: 変わるverb / 主利点 / 主代償
  → 安全時に「比較」badge
  → pause付きbottom sheet
  → 現在との差: range / timing / heat / noise / world verb
  → 装備 / 保管 / 分解
  → 5秒undo toast
  → 再開
```

- actionは同じ親指側へ固定し、cardごとに順番を変えない。
- default focusは`保管`。誤tapで現在buildを破壊しない。
- 分解は一回目で予測結果を表示し、二回目で確定する。
- named combat中は装備変更を禁止し、拾得だけqueueする。

## 5. Mobile Interaction Contract

### 5.1 v0.1で実装する案 A: manual defense

| 左手 | 右手 | 自動 |
|---|---|---|
| movement stick | 大技、dodge、quick item、context | target取得、通常攻撃、通常loot拾得 |

- 通常攻撃buttonを置かない。
- 大技を右手最大buttonとし、最小64×64 CSS px。
- dodge／itemは最小52×52 CSS px、その他tap対象は48×48 CSS px以上。
- `env(safe-area-inset-*)`をpaddingへ足し、操作をbrowser端へ密着させない。
- joystickとaction buttonだけ`touch-action: none`、通常UIは`manipulation`を維持する。
- dodgeはstick方向、stick neutralならplayer facingへ出る。
- combatとinteractionが重なる場合、combat button位置を動かさずcontextを別位置へ出す。

この案は、敵予兆を見て避けるplayer判断を直接残せる一方、右手buttonが三つになる。

### 5.2 比較案 B: target command

| 左手 | 右手 | 自動 |
|---|---|---|
| movement stick | 大技、target override、quick item | 通常攻撃、build固有防御、通常loot拾得 |

enemy tapまたは脅威方向flickでtargetを4秒優先する。targetが画面外／遮蔽になれば即解除する。button数は同じだが、防御が装備任せになりactionの手応えを失う危険がある。v0.1では案Aを実装し、iPhone試遊で「targetを自分で変えたい」が多い場合だけ案Bと同条件比較する。

### 5.3 input priority

```text
orientation／background pause
  > modal decision
  > dodge
  > manual skill
  > quick item
  > context interaction
  > queued pickup
  > auto basic
```

- pointer cancel、window blur、visibility changeで保持入力を全解除する。
- tapが30Hz tick間でdown／upしても、一回だけqueueして失わない。
- skillとdodgeが同tickならdodgeを優先し、skill chargeは消費しない。
- menu中はworld pause。再開したtickで古いtapを実行しない。
- 左右反転はlayoutだけを反転し、入力意味とHUD順は変えない。

## 6. 合否matrix

### 6.1 automated

| ID | Test | Pass |
|---|---|---|
| A01 | 同じseedとcommand列 | state hashとevent列が一致 |
| A02 | 有効な格下が範囲内 | 1 tick以内にtarget取得 |
| A03 | 画面外／solid遮蔽 | target取得0、damage 0 |
| A04 | targetが遮蔽／画面外へ移動 | 同tickでdrop |
| A05 | 距離だけdropRange超過 | 6 tick猶予後にdrop |
| A06 | Counter cutter一周期 | 5／1／9 tickを一度ずつ通る |
| A07 | Breach driver一周期 | 18／1／16 tickを一度ずつ通る |
| A08 | windup中に移動 | cutter 100%、driver 35%の距離 |
| A09 | 格下一体 | manual attackなしで両buildが処理 |
| A10 | 大技commandなし | 大技event、charge消費とも0 |
| A11 | 大技の不成立入力 | charge不変、reason event一件 |
| A12 | standing still／skillなし対warden | 30秒内に勝利しない |
| A13 | movement／dodge／skill script | 両buildが45秒内に勝利可能 |
| A14 | build差 | range、cycle、移動倍率、skill条件の四項が異なる |
| A15 | Prototype B route | 既定起動と`?prototype=0.1`を変更しない |

### 6.2 iPhone 16 Pro実機

以下はlocal browserで代替完了にしない。

1. 説明を読まず30秒以内に「近づくと自動で攻撃する」と理解できる。
2. 90秒以内に大技の成立表示を読み、一回成功できる。
3. 二buildを各2分触り、間合い、速度、拘束、skill timingの差を二つ以上説明できる。
4. 右親指でskillとdodgeを取り違える回数が5分で1回以下。
5. joystickを保持したままskill／dodgeを各10回使い、stuck input 0。
6. safe area、browser chrome、左右反転のどれでも主要buttonが欠けない。
7. double tapでscale／offsetが変わらず、通常tapとpinch復帰を壊さない。
8. 「自動戦闘を眺めるだけ」「攻撃buttonを連打したい」のどちらに感じるかを自由回答で記録する。

## 7. 試遊質問

100点評価の前に、次を短文で答える。

1. 自分が戦闘中に決めていたことは何か。
2. Counter cutterとBreach driverで、立つ場所や動き方は変わったか。
3. 大技を押す前に、何を待ったか。
4. targetは自動のままで困ったか。困った場面はどこか。
5. dodgeとitemは手動でよいか。減らしたい操作はあるか。
6. loot比較の`変わるverb／利点／代償`だけで装備判断できたか。
7. もう一度別buildで試したいか。理由は何か。

Gate Aの合格は平均点だけで決めない。二buildの判断差が説明され、名付き敵で位置変更と大技が実際に使われ、通常攻撃の自動化が移動判断を消していないことを必須にする。
