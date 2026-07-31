# World Bible: 辺境遺物録（仮）

Last updated: 2026-08-01  
Status: v0.2 draft

## 1. この文書の役割

本書は、世界を拡張するときに守る感情・生活・設定の基準である。固有名を増やすための設定集ではなく、現時点の「確定」「仮説」「未決定」を分け、人物、地域、遺跡、道具、敵、同行者を同じ台帳で扱う。

- 遊びの約束と現在の範囲: [GAME_BRIEF.md](./GAME_BRIEF.md)
- 確定要求、提案中の作品核、次のproof: [GAME_CONSTITUTION.md](./GAME_CONSTITUTION.md)
- 因果生成とvisual／asset統合案: [DESIGN_SYNTHESIS.md](./DESIGN_SYNTHESIS.md)
- 実装済み事実と未確認事項: [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md)
- 開発時generatorの規則: [GENERATION_RULES.md](./GENERATION_RULES.md)

Prototype Bの呼称や配置は、`scope: prototype_b`の実装事実である。明記がない限り、完成版の正式設定として確定したものではない。

## 2. 設定台帳の共通形式

### 2.1 二種類のstatus

| Field | Values | Meaning |
|---|---|---|
| `knowledge_status` | `confirmed` / `hypothesis` / `undecided` | 設定内容が確定、検証中、未決定のどれか |
| `revision_status` | `draft` / `reviewed` / `accepted` / `deprecated` | レコードが制作工程のどこにあるか |

`knowledge_status: confirmed`でも、`scope: prototype_b`なら「Prototype Bで確認済み」の意味に限る。正式設定の確定とはみなさない。

### 2.2 Stable ID

- 形式は`<kind>.<scope>.<slug>`とし、ASCII小文字、数字、`.`、`_`だけを使う。
- 表示名、強さのrank、連番の並び順をIDへ埋め込まない。
- 名称や設定を改稿してもIDは変えない。別物になった場合だけ新IDを発行する。
- 削除したIDは再利用せず、`revision_status: deprecated`で参照を残す。

### 2.3 最小レコード

```yaml
schema_version: world-record/1
stable_id: person.product.protagonist
kind: person
scope: product
display_name: null
knowledge_status: confirmed
revision_status: draft
tags: [traveler, player-controlled, starts-alone]
provenance:
  - source: docs/GAME_BRIEF.md
    section: Confirmed taste signals
    recorded_at: 2026-07-31
summary: 開始時は単独で、自分の移動、位置取り、撤退、大技の判断を担う旅人。
open_questions:
  - 出身、年齢、外見、過去、固有名
```

すべての人物、共同体、地図、地域、遺跡、item、武器、monster、同行者、生活要素、音楽参照は、このenvelopeを持つ。AI候補にはさらにseed、generator version、input hash、人間の採否を記録する。

## 3. 世界の感情基調

### 3.1 Core register

| Stable ID | Status | Contract | Tags | Provenance | Revision |
|---|---|---|---|---|---|
| `tone.product.baseline` | confirmed | baselineは悲嘆ではなく、好奇心、仕事、修理、商売、食事、乾いたhumor | `sunlit-resilience`, `practical` | `GAME_BRIEF.md / World tone contract` | accepted |
| `state.product.humanity` | confirmed | 人類は激減し危機にあるが、まだ敗北していない | `population-collapse`, `crisis`, `not-defeated` | user direction, 2026-08-01 | accepted |
| `environment.product.overgrown_modern_city` | confirmed | 現代都市とinfraが植物、水、動物、新しい生活へ侵食・転用されている | `modern-city`, `reclaimed-nature`, `sunlit-ruin` | user direction, 2026-08-01 | accepted |
| `tone.product.death` | confirmed | 死は突然かつ簡潔でよい。常に長い感傷や英雄化で包まない | `brief-death` | `work/notes.md / Optimistic post-apocalypse tone clarification` | accepted |
| `system.product.death_trace` | hypothesis | 喪失を装備、仕事、寝床、噂、価格等のworld stateへ残す | `persistent-trace` | `DESIGN_SYNTHESIS.md / Death` | draft |
| `lore.product.collapse_cause` | undecided | 文明崩壊の原因、年代、責任主体 | `collapse`, `open` | `PROJECT_CONTEXT.md / Boundaries` | draft |
| `theme.product.primary_profile` | undecided | 妖怪、電脳怪異、旧文明技術の正式比率 | `theme-profile`, `open` | `GAME_BRIEF.md / Theme abstraction` | draft |

### 3.2 描写の基準

- 廃墟は過去の墓標だけでなく、屋根を継ぎ、湯を沸かし、畑を作り、洗濯物を干す現在の生活場所として描く。
- 舞台の基層は識別可能な現代都市とし、道路、集合住宅、鉄道、駅、店舗、office、学校、病院、上下水、送電設備などの旧用途が読めるようにする。
- 自然侵食は無秩序な草の散布ではなく、日照、水系、土壌、建物の亀裂、人と動物の利用から、植生と新しいrouteが生じた状態として描く。
- 明るい昼光、自然、水、錆、陶器、修理布、看板を使い、危険は敵のsilhouette、赤橙の予兆、resource不足、音へ局所化する。
- 人々は危機を理解しているが、毎回演説しない。まず手を動かし、直し、売り、食べ、移動する。
- humorは漫才ではなく、奇妙な副作用、現場の工夫、生活者の慣れから生む。
- 死後は、残された装備、空いた寝床、止まった仕事、短い噂、価格や関係の変化で効かせる。

### 3.3 避ける表現

- 全画面を暗くして深刻さを代用する。
- すべての人物を絶望、皮肉、長い独白だけで話させる。
- 死を常に英雄化し、playerの判断とworld stateから切り離す。
- 「neon on black」だけでcyberpunkらしさを代用する。
- 参照作品の固有設定、人物、台詞、構図、音楽を置き換えただけの表現。

## 4. 人物

### 4.1 確定

- `person.product.protagonist`: 開始時は単独。移動、接敵、位置取り、撤退、大技、item、最終判断の主体。通常戦闘は装備規則により自動化する。

### 4.2 仮説

- 主人公は「選ばれた英雄」より、仕事と装備を得ながら生き方を選ぶ旅人を比較案にする。
- NPCは世界説明のためだけに立たせず、修理、調理、回収、交易、警戒、記録など現在の仕事を持つ。
- 人物の死亡や離脱は、台詞だけでなく仕事、関係、在庫、居場所の変化へ接続する。
- 人物roleは、回収者、修理者、調査者、運び手、商人、調理者、見張り、記録者など生活loopから作る。
- 各人物は「いま必要なもの」「提供できるもの」「避けたい危険」「短い日課」を最低一つずつ持つ。
- 背景説明より、依頼、交換、同行、修理、噂の更新を通して性格を見せる。

### 4.3 未決定

- 主人公と主要人物の固有名、年齢、出身、外見、過去。
- 人間以外の知性体、身体拡張、network人格の社会的地位。
- 会話量、relationship段階数、死亡の可逆性。

## 5. 共同体

| Stable ID | Status | Summary | Tags | Provenance | Revision |
|---|---|---|---|---|---|
| `community.product.reclaimed_settlement` | hypothesis | 遺構を修理し、回収・交易・補給の拠点として使う共同体 | `settlement`, `repair`, `trade` | `GAME_BRIEF.md / World tone contract` | draft |
| `community.prototype_b.start_town` | confirmed in Prototype B | 依頼受注と帰還記録を担う開始地点。正式名称・制度は未決定 | `prototype-only`, `hub` | `PROJECT_CONTEXT.md / Confirmed current state` | reviewed |

共同体は最低限、食料／水、修理、休息、情報、危険への対処をどう成立させているか説明できること。統治制度、人口、宗教、通貨、他共同体との関係は未決定であり、固有名から先に固定しない。

### 5.1 Player-built base

| Stable ID | Status | Summary | Tags | Provenance | Revision |
|---|---|---|---|---|---|
| `base.product.player_built` | confirmed direction | 既存遺構を復旧するか条件の合う土地を選び、playerが自分の拠点を築く | `reclaim`, `found`, `world-memory` | user direction, 2026-08-01 | accepted direction |
| `base.product.site_contract` | hypothesis | 土地の水、電力、交通、遮蔽、危険、拡張性が機能と代償を決める | `site-choice`, `tradeoff` | `DESIGN_SYNTHESIS.md / Base as world memory` | draft |
| `base.product.module_contract` | hypothesis | storage、workshop、power／water等のmoduleが新しいverbと次回差分を作る | `module`, `gameplay-effect` | `DESIGN_SYNTHESIS.md / Base as world memory` | draft |

拠点は自然を消して旧都市を元通りにするものではなく、既存構造、生態、水、光、回収部品を修理・転用する。正式な配置自由度、複数拠点、移転、維持、襲撃の有無は未決定。夏版では候補地二つと機能module候補二つ以上／今回設置一つでworld memoryへの接続だけを試す。

## 6. 世界地図

### 6.1 確定

- 自由放浪と短い依頼を両立し、町、移動路、危険地域、遺跡、帰還の関係が読める地図にする。

### 6.2 設計仮説

- 世界はplayerの外でも続いている感覚を持つが、初期版で全NPCの常時simulationは行わない。
- 行動結果は帰還時などのevent-driven更新で次の旅へ反映する。
- playerの拠点候補地、稼働拠点、復旧／設置したmoduleをworld map上の恒久stateとして持つ。

### 6.3 現在のprototype scope

| Stable ID | Status | Summary | Canonicality |
|---|---|---|---|
| `map.prototype_b.primary` | confirmed | 町―三叉路―廃区を連続scrollする3,600×1,800 world | Prototype B only |
| `map.product.primary` | undecided | 完成版の世界形状、地域数、距離、境界 | Not fixed |

### 6.4 地図が持つ情報

- 地域node、接続route、移動cost、危険度、補給点、landmark、撤退先。
- 共同体の仕事と遺跡の用途がrouteで接続している理由。
- world stateによる通行、価格、敵、噂、資源の差分。
- 地図の正式地名は、theme profileと歴史が確定してから採用する。

## 7. 地域

初期archetypeは仮説であり、組合せ候補として扱う。

| Stable ID | Status | Function | Required contrast |
|---|---|---|---|
| `region.product.settlement_edge` | hypothesis | 仕事、依頼、補給、帰還 | 安全寄りだが生活上の問題がある |
| `region.product.travel_corridor` | hypothesis | 移動、遭遇、分岐、landmark | 見通しと退避場所 |
| `region.product.recovery_zone` | hypothesis | 遺物回収、解析対象、環境hazard | 高い報酬と明確な撤退判断 |
| `region.product.reclaimed_nature` | confirmed direction | 現代都市への自然侵食、食料、水、新しい生態 | 旧infraの用途が読め、人工物だけではない世界の回復 |

各地域は、visual paletteだけでなく「ここで何をして暮らすか」「何を持ち帰るか」「何を恐れるか」を一文ずつ持つ。

## 8. 遺跡

### 8.1 設定contract

- 遺跡は旧文明の展示室ではなく、現在の生活、回収経済、monster、生態、routeへ影響する場所。
- 各遺跡は`past_function`、`current_use`、`hazard`、`recoverable_value`、`retreat_condition`を持つ。
- 文明の年代、技術系統、崩壊原因は未決定。説明不能を雰囲気だけで埋めない。
- playerが理解できる予告、選択、報酬、撤退経路を持つ。生成詳細は[GENERATION_RULES.md](./GENERATION_RULES.md)に従う。

### 8.2 Prototype B

`ruin.prototype_b.listening_district`は、名付き反響体との対峙と三つの対処を検証するprototype用遺跡である。名称、旧用途、正式地理は完成版canonとして未決定。

## 9. Itemと遺物

### 9.1 共通分類

- 生活物資: 食料、水、薬、燃料、充電材、修理材。
- 回収物: 換金、解析、部品取り、共同体への返却に使う。
- 鍵／protocol: routeや対処を変えるが、取り逃しで進行不能にしない。
- 遺物: gameplay効果と、世界内での作動仮説、副作用、使用者所感を持つ。

### 9.2 遺物record

各遺物は最低限、次を分離する。

1. `observed_effect`: 実際のgameplay効果。
2. `mechanism_hypothesis`: 世界内で信じられている作動原理。確定事実とは限らない。
3. `side_effects`: 誤作動、消耗、身体／環境への負担。
4. `operator_note`: 発見者または使用者の短い所感。
5. `evidence_status`: 確認済み、仮説、未確認。

固有名、catalog体系、旧文明の製造者は未決定。合成可能性は説明文ではなく、機構とinterfaceから判定する。

## 10. 武器

### 10.1 確定

- playerが移動、接敵、位置取り、撤退を行い、通常戦闘は自動、大技skillは手動で発動する。
- 固定arenaで常時自動遠隔攻撃を眺める形にはせず、武器ごとにtarget取得、成立間合い、攻撃周期、移動拘束、resourceを持つ。
- 武器差はdamageだけでなく、間合い、速度、impact、resource、危険性、音で判別できるようにする。
- 強さはrank文字ではなく数値軸で管理する。

### 10.2 Prototype Bの実装事実

| Stable ID | Status | Function | Product canon |
|---|---|---|---|
| `weapon.prototype_b.survey_blade` | confirmed | 速く、間合いが長い | 名称・機構とも未決定 |
| `weapon.prototype_b.pile_driver` | confirmed | 遅く、高威力、高knockback | 名称・機構とも未決定 |

完成版武器は、機構、材料、energy、作用対象、scale、出力、副作用、interfaceを説明できるものだけ採用する。

## 11. Monsterと異形

### 11.1 確定

- 敵はHP袋ではなく、habitat、行動目的、予兆、対処法、dropまたはworld responseを持つ。
- 一部の相手には破壊以外の鎮静、接続、回避、取引などを用意できる。
- 危険は画面全体の暗さではなく、silhouette、動き、予兆、音で読む。

### 11.2 Prototype Bの実装事実

通常敵3種と名付き反響体1体が存在し、名付き反響体は破壊、鎮静、接続で解決できる。これは対処分岐の検証済み構造であり、種名、正体、正式なmonster分類は未決定。

### 11.3 未決定

- 妖怪、生物、暴走機械、network残留人格の比率。
- monsterの繁殖、製造、発生、消滅の法則。
- 捕獲、飼育、共生、再出現の範囲。

## 12. 同行者roster

### 12.1 確定

- `companion.product.roster`: 主人公は単独で開始し、同行者をworld内で発見、救助、雇用、依頼、交渉などにより加入させる。
- 一体だけの固定partnerではなく、加入済みrosterから旅へ連れていく相手を交代できる。
- 候補は人物、人型robot、犬／猫、犬型／猫型robot、遺物解析機など。生物と機械を同じ外見や補給法へ均さない。
- 各同行者は加入経緯、性格、得意行動、補給方法、会話反応、関係変化、待機場所を持つ。
- 通常行動は自動化できるが、受動DPSだけの枠にしない。探索verb、拠点role、playerが命令する有限resource行動を分ける。

### 12.2 仮説

- 技術系同行者は遺物解析、module組込み、有限回数の特殊技を担当できる。
- 生物は食事、休息、治療、信頼、機械は充電、修理、部品、heat管理など、種別ごとに維持判断を変える。
- 現行の斥力環は技術系同行者moduleへ移せる候補。

### 12.3 未決定

- 同行枠数、待機場所の形式、離脱／死亡／再加入の規則。
- 正式roster、固有名、能力、relationship段階。
- 調査灯型robotはVisual Pass Dの候補assetであり、正式加入者でも開始時の相棒でもない。

## 13. 日常生活

日常は雰囲気用propではなく、遠征の判断と次の旅へ接続する。

| Verb | Resource / state | World response |
|---|---|---|
| 食べる・飲む | 食料、水、体調、同行者の好み | 会話、回復、在庫、価格 |
| 修理する | 部品、工具、耐久、時間 | 装備性能、仕事、共同体の機能 |
| 補給・充電する | 燃料、電力、薬、弾薬 | route選択、同行者能力、遠征長 |
| 解析する | 遺物、知識、危険、時間 | 新しい用途、売価、依頼、誤作動情報 |
| 拠点を復旧・築く | 土地、旧設備、資材、電力、水、時間 | 帰還先、storage、工房、route、同行者の居場所、地域の注目 |
| 売る・交換する | 回収物、評判、需要 | 価格、品揃え、関係、噂 |
| 休む・野営する | 時間、安全、天候、見張り | world進行、短い反応、襲撃risk |
| 弔う・片付ける | 遺品、空いた役割、記録 | 噂、継承、宿敵、共同体の変化 |

初期版で全項目をsimulationしない。まず回収→解析／換金→修理／装備更新→次の探索の循環を優先する。

## 14. 音・音楽

### 14.1 感情contract

- 探索音楽は「明るい終末」「旅を続ける推進力」「反復しても疲れにくい感情温度」を支える。
- 危険は常時の重苦しい曲ではなく、局所layer、予兆、武器音、環境の変化で上げる。
- 生活音は水、工具、容器、布、足音、機械、風、遠い信号など、場所が現在も使われていることを示す。
- 音は戦闘情報でもある。武器差、予兆、guard、回避、item、遺物、結果を聞き分けられるようにする。

### 14.2 User-supplied references

| Stable ID | Reference | Intended role | Adoption status | Provenance |
|---|---|---|---|---|
| `audio.reference.go_go_heartbreaker` | `Go, Go, Heartbreaker! / MYUKKE.` | 探索、旅、明るい終末、反復時の感情温度を考える参照 | undecided | user direction, 2026-07-31 |
| `audio.reference.dot_conf` | `.conf / ariiol` | 探索、旅、明るい終末、反復時の感情温度を考える参照 | undecided | user direction, 2026-07-31 |

両曲は感情設計の参照であり、ゲームへの採用曲ではない。既存音源そのものの収録、編曲、配信利用は、権利者、license、地域、store、配信、二次利用条件を確認するまで未決定とする。

### 14.3 分解して参照する

参照曲は、旋律や固有の音形を写さず、次の軸へ分解して比較する。BPM、拍子、key、具体的な楽器構成は未計測のため、本書では断定しない。

| Axis | Record during analysis | Original output rule |
|---|---|---|
| tempo | 歩行を押す速さ、戦闘へ移る余裕 | BPMやrhythm patternを直接複製しない |
| timbre | 明るさ、硬さ、手触り、前景／背景 | 独自の音源、合成preset、instrumentationを作る |
| space | 音数、休符、環境音が入る余白 | 同じ配置やbreakを写さない |
| repetition | loop長、変化頻度、耳に残る単位 | 独自のmotifとvariation ruleを使う |
| emotional temperature | 高揚、切なさ、好奇心、疲労のbalance | 「進みたいが悲壮ではない」という機能へ翻訳する |

## 15. Theme profile

正式themeは未決定。内部概念を先に固定し、表示語だけをprofileで交換できるようにする。

| Internal concept | 妖怪寄りの候補 | 電脳怪異／旧文明寄りの候補 |
|---|---|---|
| traveler | 旅人、退魔師、流れ者 | 調査員、運び屋、辺境技師 |
| anomaly | 妖怪、怪異、付喪神 | 反響体、暴走機械、network残留人格 |
| relic | 札、器、記憶 | 未分類機器、身体拡張、protocol鍵 |
| contract | 退治、封印、回収 | 調査、停止、接続、回収 |
| history | 噂、祟り、土地の記憶 | log、監視記録、地域network |

この表の語は候補であり、正式名称ではない。両profileを同じmechanicsへ着せ、固有性、読みやすさ、展開可能性を比較してから採用する。

## 16. 未決定事項

優先して決める順序は次の通り。

1. 人類激減と都市崩壊の原因、経過年数、地域、共同体密度。
2. 正式theme profileと、世界固有法則の範囲。
3. 主人公、最初の共同体、最初のregionの役割と関係。
4. 遺物技術の制約、energy源、故障と副作用。
5. monsterの発生法則と、破壊以外の対処が成立する条件。
6. 半自動戦闘のtarget、防御／回避、item、遠距離攻撃の手動範囲。
7. 拠点の配置自由度、複数化、移転、維持、襲撃の有無。
8. 同行枠、待機、離脱、再加入、維持resource。
9. 世界地図のscale、地域数、移動時間、world update単位。
10. 音楽の制作方法、権利処理、loop仕様、実機speaker基準。

固有名、年代、組織図から先に埋めない。上記がgameplayへ与える差を先にprototypeし、採用後に名称を決める。

## 17. 新規設定の採用checklist

- [ ] Stable ID、scope、tags、provenanceがある。
- [ ] `knowledge_status`と`revision_status`を混同していない。
- [ ] 世界の明るく実務的なbaselineを壊していない。
- [ ] 生活、旅、戦闘、回収、world stateの少なくとも一つへ接続する。
- [ ] 固有名だけでなく、機能、制約、副作用、未決定点を説明できる。
- [ ] 参照作品の固有表現、文体、人物、画面、音楽を模倣していない。
- [ ] [GENERATION_RULES.md](./GENERATION_RULES.md)のschema検査とhuman curationを通過した。
