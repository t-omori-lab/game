# Generation Rules: 開発時content生成

Last updated: 2026-07-31  
Status: v0.1 draft

## 1. 原則

すべてのcontent候補は開発時に生成し、検査、人間の採否、固定data化を経て収録する。ゲーム起動ごとにAIやgeneratorが新しい人物、地図、武器、item、monster、台詞、音楽を発明してはならない。

runtimeが行ってよいのは、承認済みdataの読込、seed済みsimulation、承認済みVoxelRecipeからのgeometry構築、承認済み音響presetの再生／合成である。これはcontent生成ではなく、固定仕様のmaterializationとする。

- 世界設定とstatus: [WORLD_BIBLE.md](./WORLD_BIBLE.md)
- 遊びの約束: [GAME_BRIEF.md](./GAME_BRIEF.md)
- deterministic simulation方針: [DECISIONS.md](./DECISIONS.md)

### 1.1 必須条件

| Requirement | Rule |
|---|---|
| Human curation | 人間が`accept`したcandidateだけを製品catalogへ移す |
| Deterministic seed | 同じ正規化input、seed、generator versionから同じ機械生成結果を得る |
| Schema validation | kind別schema、参照整合、範囲、enumを機械検査する |
| Provenance | source、seed、version、input hash、生成手段、採否を保存する |
| Fallback | 生成不能、検査失敗、読込失敗時に、事前承認済み固定contentへ戻る |
| Rule ownership | 戦闘、数値、合成、地図到達性、報酬はdeterministic codeが決める |
| AI boundary | AIは候補を出す。採否、rule、runtime world stateを決めない |
| Originality | 著作物の固有表現、文体、人物、画面、旋律、歌詞、音色配置を模倣しない |

## 2. Input → Constraint → Generate → Validate → Curate

| Stage | Input | Output | Hard gate |
|---|---|---|---|
| 1. Specify | kind、目的、source IDs、budget profile、count | `GenerationSpec` | sourceとscopeが存在する |
| 2. Normalize | spec、schema、rule set | canonical JSON、`input_hash` | key順、単位、defaultが固定 |
| 3. Seed | normalized input、master seed | kind別sub-seed | seedをlogし、暗黙乱数を使わない |
| 4. Generate | spec、sub-seed、approved registry | candidate群 | ruleはcode、AIは候補fieldだけ |
| 5. Validate | candidate、world registry、budget | `ValidationReport` | schema、参照、invariant、originality |
| 6. Fallback | failure reason、fallback ID | 承認済みcandidate | 原因とfallback使用を記録 |
| 7. Curate | candidate、report、preview／playtest | accept / revise / reject | 人間のdecision recordが必須 |
| 8. Freeze | accepted candidate | immutable approved JSON、content hash | generator出力と製品dataを分離 |
| 9. Integrate | approved catalog | build、simulation、preview | replay、balance、mobile budget |

AIとdeterministic generatorを併用する場合、code側が先に許可field、数値範囲、禁止関係を決める。AI出力はそのschemaへ収まるsemantic candidateであり、codeの検証結果を上書きできない。

## 3. Proposed artifact layout

実装時の配置案。現時点でdirectoryの存在やcommand実装を意味しない。

```text
content/
  specs/                 # 人が書いたGenerationSpec
  candidates/            # 未採用。製品buildへ含めない
  approved/              # 人が採用した固定data
  fallbacks/             # 事前承認済みの安全な固定data
  provenance/            # seed、version、hash、採否
  schemas/               # JSON Schema
reports/
  generation/            # validation、replay、balance、similarity
```

## 4. 共通schema

### 4.1 GenerationSpec

```json
{
  "schema_version": "generation-spec/1",
  "generator_id": "weapon-generator",
  "generator_version": "0.1.0",
  "kind": "weapon",
  "scope": "product",
  "seed": "20260731-demo-001",
  "count": 8,
  "world_profile_id": "theme.product.primary_profile",
  "rule_set_id": "weapon-rules/1",
  "budget_profile_id": "balance.prototype/1",
  "fallback_id": "weapon.fallback.safe_default",
  "source_ids": [
    "tone.product.baseline",
    "state.product.humanity"
  ]
}
```

### 4.2 CandidateEnvelope

```json
{
  "schema_version": "candidate-envelope/1",
  "stable_id": "weapon.candidate.7c2a91",
  "kind": "weapon",
  "scope": "product",
  "knowledge_status": "hypothesis",
  "revision_status": "draft",
  "tags": ["mechanical", "close-range"],
  "parent_ids": [],
  "provenance": {
    "source_ids": ["tone.product.baseline"],
    "generator_id": "weapon-generator",
    "generator_version": "0.1.0",
    "seed": "20260731-demo-001/weapon/0",
    "input_hash": "sha256:REQUIRED",
    "prompt_template_hash": "sha256:OPTIONAL_FOR_NON_AI",
    "model_id": "OPTIONAL_FOR_NON_AI",
    "generated_at": "2026-07-31T00:00:00+09:00"
  },
  "payload": {},
  "content_hash": "sha256:REQUIRED_AFTER_NORMALIZE"
}
```

ID、seed、timestamp以外の自由文字列にもlength上限を置く。AI利用時はraw responseを製品dataへ入れず、正規化したJSONと監査用provenanceを分離して保存する。

`content_hash`は`kind`、`scope`、`tags`、`parent_ids`、`payload`の正規化projectionから計算し、`generated_at`や人間のdecision時刻を含めない。envelope全体の監査には別の`record_hash`を使う。deterministic generatorのcandidate IDはspec hash／seed／indexから、非決定的なAI proposalのcandidate IDはresponse hashから導出する。

### 4.3 HumanDecision

```json
{
  "stable_id": "weapon.candidate.7c2a91",
  "decision": "accept",
  "reviewer": "human",
  "decided_at": "2026-07-31T00:00:00+09:00",
  "validation_report_hash": "sha256:REQUIRED",
  "accepted_content_hash": "sha256:REQUIRED",
  "notes": "採用理由と残る制約を短く記録する"
}
```

`accept`、`revise`、`reject`以外を許可しない。修正したcandidateは新しいcontent hashと親revisionを持つ。

## 5. Determinismとfallback

### 5.1 Determinism

- 乱数は明示されたPRNGへ集約し、現在時刻、object列挙順、locale、network応答をseedにしない。
- master seedから`kind/stable_id/index`でsub-seedを導出する。
- 浮動小数点差が構造を変えないよう、分岐前にquantize規則を置く。
- 正規化JSONのkey順、配列順、単位、defaultを固定し、hashを比較する。
- 同一seedを2回生成し、canonical payloadの`content_hash`とgraph hashが一致しなければ不合格。provenanceのtimestampは比較対象から外す。
- 検査で落ちたseedをfixtureとして保存し、修正後もreplayする。
- AI serviceの応答自体は、seed指定があっても決定論的とは仮定しない。same-seed replayを保証できないserviceは`proposal-only`とし、最初の応答をhash付きで凍結する。以後のrule計算と検証は、凍結済みcandidateを入力にして再現する。
- 同じAI requestを再実行して異なる応答を得た場合は、response hash由来の新IDを持つ新candidateとして扱う。approved contentをmodel再実行で更新しない。

### 5.2 Fallback

- generatorごとに`fallback_id`を最低一つ持つ。
- fallbackもschema、balance、reachability、originality、人間採用を通す。
- AI、network、model、timeout、invalid JSON、空candidateは同じfailureとして黙殺せず、reason codeを残す。
- runtimeでは未承認candidateへ切り替えない。参照不正時は承認済みfallbackを読込み、diagnostic eventを記録する。
- fallback使用で進行、save互換、quest item到達性が壊れないことをtestする。

## 6. 人物生成

### 6.1 Input

- community、役割、現在の仕事、必要なもの、提供できるもの。
- 移動可能範囲、日課slot、関係hook、危険への態度。
- silhouette budget、装備anchor、palette role、会話量上限。
- `knowledge_status`ごとの既知情報と秘密。未決定をAIで勝手に埋めない。

### 6.2 Constraint

- NPCは設定説明だけの人物にしない。最低一つの生活verbとworld stateへの影響を持つ。
- 主人公は開始時単独。candidate同行者を初期画面へ自動配置しない。
- 名前、話し方、外見、過去が参照作品の特定人物へ近づくpromptを使わない。
- 同じcommunity内で役割、visual silhouette、口調tagが過度に重複しない。
- scheduleはroute、営業時間、休息、危険状態と矛盾しない。

### 6.3 Generate / Validate / Curate

1. codeがrole、日課、関係、resource hookの組合せをseedから作る。
2. AIは許可された名前候補、短い発話、所感、来歴候補をJSONで提案できる。
3. schema、役割collision、schedule到達性、知識矛盾、文字数、禁止表現を検査する。
4. 立面preview、日課timeline、会話一覧を人が確認する。
5. CandidateEnvelopeのstable IDを保ったままproduct registryへ採用し、修正はrevisionとして追跡する。別IDへ移す場合はmappingをprovenanceへ残す。

## 7. 世界地図・地域生成

### 7.1 Input

- community IDs、region archetype、travel cost、危険／補給budget、landmark数。
- 必須route、任意route、撤退先、world-state変化点。
- visual layer: terrain、material breakup、architecture、life props、light／atmosphere。

### 7.2 Constraint

- 地図はgraphを正本とし、visual terrainはgraphの接続を隠さない。
- critical nodeを孤立させない。quest進行に必要なitemを、自身が開けるlockの内側へ置かない。
- 少なくとも一つの明確な帰還routeを持つ。危険routeにはriskに見合う報酬またはshortcutを置く。
- communityの仕事、regionのresource、遺跡の回収価値をrouteで説明できる。
- 同一landmark名、表示色、silhouetteの衝突を検査する。

### 7.3 Validation

- graph reachability、strongly connected components、critical path、travel cost、resource収支をcodeで検査する。
- 同一seedでnode、edge、landmark、配置hashが一致することを確認する。
- 人はgraph overlay、通常camera、minimap、852×393 previewで読みやすさを確認する。
- 開発時に採用したmapだけを固定dataとして収録し、runtimeで地図を再抽選しない。

## 8. 遺跡・dungeon生成

### 8.1 必須flow

すべての主要遺跡は、次の順序を少なくとも一回含む。

1. `entrance`: 入口と撤退方向を認識する。
2. `foreshadow`: hazard、敵、lock、報酬の性質を予告する。
3. `choice`: route、resource、戦闘／非戦闘の選択を置く。
4. `reward`: 装備、知識、world state、shortcutのいずれかを得る。
5. `retreat`: 同じ道の単純逆走だけに限らない、読める撤退判断を置く。

### 8.2 Minimum dungeon schema

数値は初期profileの仮値であり、playtest後にprofile単位で更新する。

```json
{
  "schema_version": "dungeon/1",
  "stable_id": "ruin.candidate.31ab90",
  "seed": "20260731-demo-ruin-001",
  "flow": ["entrance", "foreshadow", "choice", "reward", "retreat"],
  "budgets": {
    "min_meaningful_route_choices": 1,
    "min_route_redundancy": 1,
    "max_empty_dead_end_ratio": 0.15,
    "max_nodes_without_landmark": 3
  },
  "cadence": ["combat", "rest", "puzzle", "combat"],
  "required_reachability": ["reward", "exit"],
  "locks": [],
  "nodes": [],
  "edges": []
}
```

### 8.3 Hard validation

- `route redundancy`: 一つの閉鎖でcritical rewardとexitの両方を失わない。代替routeまたは明示的な復旧手段を持つ。
- `dead-end budget`: 空のdead endをbudget以下にする。dead endには報酬、予告、shortcut、物語証拠のいずれかを置く。
- `landmark/readability`: 分岐間に識別可能なlandmarkを置き、入口、深部、撤退方向を同じ見た目にしない。
- `cadence`: combat、rest、puzzle／interactionをprofileで配列化し、長い同種連続を検査する。
- `reachable invariant`: lockと所持itemを含むstate-space searchで、入口から必須item、reward、exitへ到達できる。鍵を自身のlockの奥へ置かない。
- `seed replay`: 同じseedを2回生成してgraph hashを比較し、seed batch testで進行不能率0を要求する。

AIは部屋の用途、痕跡、短い説明候補を作れるが、node、edge、lock、key、報酬、到達判定を決めない。

## 9. Monster生成

### 9.1 Minimum fields

- habitat、発生／維持仮説、行動目的、感知方法。
- silhouette、移動、予兆、attack pattern、弱点、retreat behavior。
- 破壊以外の対処可否と、その必要resource。
- drop、world response、communityへの影響。
- 数値difficulty profileとvisual／audio cue IDs。

### 9.2 Constraint and validation

- 名前や外見より先にcombat roleとcounterplayを固定する。
- 攻撃は予兆時間、range、hit shape、cooldown、damage、追尾性能を数値で持つ。
- 初期地点、spawn地点、quest item、撤退routeを同時に塞がない。
- habitatとdropに因果を持たせ、地域を問わず同じenemyを貼らない。
- 非戦闘解決がある場合、必要itemは対峙trigger前に到達可能とする。
- deterministic simulationで大量戦闘し、time-to-hit、time-to-defeat、被damage、stunlock、退避成功率を測る。
- 人が通常cameraでsilhouette、赤橙の予兆、音、初見counterplayを確認する。

AIは名称、外観motif、観察記録候補を提案できる。hit判定、AI state machine、drop率、difficultyはcodeと人が決める。

## 10. 武器・item・合成

### 10.1 説明可能な構造

武器とitemはフレーバー文だけで成立させない。最低限、次を構造化する。

| Field | Question |
|---|---|
| `mechanisms` | 何の機構で作用するか |
| `materials` | 何ででき、何に耐えるか |
| `energy` | energy源、入力、peak、補給方法は何か |
| `targets` | 物質、装甲、生体、信号、化学系など何へ作用するか |
| `scale` | range、area、mass、持続時間はどの程度か |
| `output` | damage、impulse、heat、field、変換量はどれだけか |
| `side_effects` | heat、反動、毒性、noise、誤作動、環境影響は何か |
| `interfaces` | 機械、電力、熱、data、化学、装着の接続規格は何か |
| `compatibility` | 必須、許可、禁止する機構／材料／hostは何か |

現実単位を使える量はSI単位を使い、世界固有量は`*_sim`と明示する。見せかけの精密な物理値を作らず、同じunit system内で比較可能にする。

### 10.2 Minimum weapon schema

以下はschema例であり、正式武器ではない。

```json
{
  "stable_id": "weapon.example.kinetic_tool",
  "knowledge_status": "hypothesis",
  "mechanisms": ["mechanical_impulse"],
  "materials": [
    {"material_id": "material.example.frame", "mass_kg": 3.2}
  ],
  "energy": {
    "source": "stored_mechanical",
    "capacity_sim": 100,
    "cost_per_use_sim": 18,
    "peak_power_sim": 72
  },
  "targets": ["armor", "structure"],
  "scale": {
    "range_m": 1.6,
    "effect_radius_m": 0.25
  },
  "output": {
    "damage_sim": 38,
    "impulse_sim": 70
  },
  "side_effects": [
    {"type": "recoil", "magnitude_sim": 44},
    {"type": "heat", "magnitude_sim": 12}
  ],
  "interfaces": [
    {
      "type": "mechanical_mount",
      "standard_id": "interface.example.mount_m1",
      "load_limit_sim": 80
    }
  ],
  "compatibility": {
    "requires": ["interface.example.mount_m1"],
    "forbids": ["material.tag.brittle"]
  }
}
```

### 10.3 数値軸

強さの正本はrank文字ではなく、少なくとも次の数値軸で持つ。

- `damage_sim`、`impulse_sim`、`range_m`、`effect_radius_m`。
- `cycle_time_s`、`charge_time_s`、`cooldown_s`。
- `accuracy_0_1`、`control_0_1`、`tracking_0_1`。
- `energy_per_use_sim`、`peak_power_sim`、`heat_per_use_sim`。
- `peak_stress_ratio_0_1`、`durability_cycles`、`failure_probability_0_1`。
- `mass_kg`、`operator_risk_0_100`、`environment_risk_0_100`。

UI用の総合値を出す場合も、これらからversion付きformulaで導出し、入力値を残す。

### 10.4 E→Aは仮の技術帯域

E→Aは表示と候補整理のための暫定bandであり、強さ、rarity、価値を直接表さない。E帯の大型機械がA帯の微小操作器より高damageでも矛盾しない。

| Temporary band | Mechanism例 | 必要な説明 |
|---|---|---|
| E | 機械、圧力、弾性、摩擦、通常の物理作用 | 動力、材料強度、反動、摩耗 |
| D | 熱、燃焼、冷却、単純な電力変換 | 熱源、放熱、絶縁、補給 |
| C | 電磁、化学反応、signal制御 | field、反応物、遮蔽、選択性 |
| B | 複数領域の精密連携、微細構造制御 | feedback、誤差、汚染、制御帯域 |
| A | 分子操作など高精度な物質変換 | 対象範囲、energy、触媒、廃熱、失敗形 |

この対応自体も仮説であり、世界固有法則の決定後に改訂する。

サイキック表現を採用する場合、無制約な説明逃れにしない。科学的仮説または世界固有法則として、観測可能な入力／出力、媒体または到達条件、range、energy／代償、noise、失敗率、遮蔽／countermeasure、再現testを定義する。検証不能な万能能力は不採用とする。

### 10.5 合成判定

合成は名前やflavorの相性ではなく、次の順でdeterministicに判定する。

1. schemaと参照IDが有効か。
2. 機構同士が接続可能か。作用方向と制御loopが衝突しないか。
3. mechanical、electrical、thermal、data、chemical、mount interfaceが一致するか。
4. mass、energy、反応物、排出物の収支が説明できるか。
5. peak power、heat、stress、耐久がhost budget以内か。
6. operator、同行者、環境、save進行への危険性が許容範囲か。
7. damage、range、cycle、resource、counterplayがgame balance envelope内か。
8. 人が用途、見た目、音、操作の読みやすさを確認したか。

結果は`pass`、`conditional`、`reject`とreason codeを返す。

```text
INTERFACE_MISMATCH
ENERGY_BUDGET_EXCEEDED
THERMAL_BUDGET_EXCEEDED
STRESS_LIMIT_EXCEEDED
CONSERVATION_UNEXPLAINED
OPERATOR_RISK_HIGH
BALANCE_ENVELOPE_EXCEEDED
```

`conditional`では必要なadapter、cooling、出力制限、追加resourceを構造化して返す。AIの説明文でhard failureを覆してはならない。

## 11. Item・遺物生成

- codeがgameplay verb、数値effect、resource cost、使用条件、side effectを作る。
- AIは呼称、短い所感、作動仮説の候補を作れるが、`observed_effect`と矛盾してはならない。
- `observed_effect`、`mechanism_hypothesis`、`side_effects`、`operator_note`、`evidence_status`を分離する。
- quest keyは複数routeまたはfallbackを持ち、取り逃しで進行不能にしない。
- 合成可能itemは10章と同じinterface／budget判定を通す。
- 説明が面白くても、gameplay上の選択、risk、用途が増えないitemは採用優先度を下げる。

## 12. VoxelRecipe・visual生成

- 背景assetの16³は選択肢であり上限ではない。hero assetは役割に応じて可変gridを使う。
- paletteはsurface role、material response、emissive、danger signalを分離する。
- character／monsterはfaceまたはsensor、手足／manipulator、装備、前後、action silhouetteを852×393で確認する。
- mapはterrain、material breakup、architecture、life props、light／atmosphereの5層をpreviewする。
- hidden-face geometry、voxel数、exposed face、triangle、draw call、anchor、collision boundsをvalidation reportへ出す。
- AI画像を完成assetとして直接採用せず、構造候補からschema済みVoxelRecipeを作り、人が全方向previewで採否を決める。
- runtimeは承認済みRecipeをgeometryへ変換できるが、寸法、voxel、palette、anchorを再生成しない。

## 13. 音・文章・名称の生成

- 音楽、sound cue、名称、噂、依頼文は開発時に候補生成し、人が採用したpreset／textだけを収録する。
- runtime procedural audioは承認済みparameterとevent mappingの再生に限定し、新しい曲構造やmotifを作らない。
- 参照曲はtempo、音色、余白、反復、感情温度へ分解し、旋律、rhythm pattern、音色配置、歌詞、構成を複製しない。
- promptへ「特定作家／作品のstyleで」を入れない。固有名を模倣指示へ使わない。
- proper noun、定型句、長い一致、既知referenceとの高い類似をscreeningし、疑わしいcandidateは人がrejectする。
- 既存曲、sample、font、image、textを収録する場合、licenseと配信条件を別途確認する。参照した事実は利用許諾を意味しない。

## 14. Validation gate

| Gate | Automated check | Human check |
|---|---|---|
| Schema | JSON Schema、enum、range、required | 意図した情報が分離されている |
| Identity | Stable ID uniqueness、参照整合 | 同一人物／物の改稿か別物か |
| Determinism | same-seed hash、failing-seed replay | previewが同じ意味を保つ |
| World consistency | status、theme、timeline、community relation | 明るく実務的なtoneと生活感 |
| Mechanics | simulation、interface、budget、counterplay | 操作、読みやすさ、面白さ |
| Map / dungeon | reachability、locks、route、dead end | landmark、cadence、撤退判断 |
| Visual | bounds、anchor、triangle、draw call | 852×393のsilhouetteと密度 |
| Originality | reference name、string similarity、asset hash | 固有表現やstyle模倣がない |
| Release | approved catalogのみbuildへ含む | 採用理由、権利、未決定点 |

一つでもhard gateが落ちたcandidateは`approved/`へ移さない。面白さは自動点だけで代替せず、人間のpreview／playtestを必須とする。

## 15. Generator実装interface

実装言語にかかわらず、generatorは次の境界を持つ。

```ts
type Generator<TSpec, TCandidate> = {
  generate(spec: TSpec, seed: string): readonly TCandidate[];
  validate(
    candidate: TCandidate,
    context: ApprovedRegistry,
  ): ValidationReport;
  fallback(reason: FailureReason): ApprovedContentId;
};
```

- `generate`はfilesystem、network、現在時刻を暗黙参照しない。
- `validate`はpureかつreason code付きにする。
- `fallback`は事前承認済みIDを返し、その場で新規contentを作らない。
- `curate`は別工程とし、自動accept関数を作らない。

## 16. Seed replay test

各generatorは最低限、次を継続検査する。

1. 同じspecとseedを2回実行し、canonical output hashが一致する。
2. 異なるseed batchでschema violation、ID collision、進行不能が0件。
3. 過去に失敗したseedをfixtureとして再実行する。
4. generator version変更時は旧approved contentを勝手に再生成しない。
5. map／dungeonはlock stateを含むreachability、monsterはsimulation、武器はbudget計算を同じseedで再現する。
6. test reportへspec hash、seed、generator version、result hash、failure reasonを保存する。

## 17. 採用のDefinition of Done

- [ ] CandidateEnvelopeとkind別schemaに合格した。
- [ ] Stable ID、tags、provenance、revision statusがある。
- [ ] 同一seed replayとcontent hashが一致した。
- [ ] fallbackが存在し、fallback経路も検査済みである。
- [ ] rule、数値、到達性をdeterministic codeが決めている。
- [ ] gameplay、visual、audio、文章の該当gateを通った。
- [ ] 著作物の固有表現やstyleを模倣していない。
- [ ] 人間の`accept`記録と採用理由がある。
- [ ] 承認済み固定dataだけが製品buildへ入る。
