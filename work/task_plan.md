# Task Plan: Prototype B — 生活型ハクスラ原型

## Goal

iPhone 16 Proの横画面で遊べる、固定俯瞰ボクセル表現・スクロール探索・手動戦闘・小さな依頼分岐を備えた10分版を作り、現行prototype 0.1とは別の遊びの核として評価可能にする。

## Phases

- [x] Phase 1: 現行architectureを調査し、Prototype Bの仕様・移行境界・検証条件を固定する
- [x] Phase 2: Three.jsによる固定俯瞰voxel renderer、追従camera、scroll地形を実装する
- [x] Phase 3: 手動攻撃、防御、回避、魔法、item、loot／装備差を実装する
- [x] Phase 4: 町―分岐路―廃屋、名付き異形、三つの依頼分岐、最小sound designを実装する
- [x] Phase 5: unit test、build、iPhone相当browser QA、performance表示、操作性、音の判別性を検証する
- [x] Phase 6: durable docsを更新し、postflightとscope限定commitを行う

## Key Questions

1. 現行simulation／save／PWAを保ちつつ、Phaser表示を安全にThree.jsへ交換できるか。
2. 16×16×16 voxelを個別cubeではなく統合geometryとして描き、iPhoneで安定させられるか。
3. 10分以内に武器差、手動操作、探索目的、名付き敵への選択を体感できるか。

## Decisions Made

- prototype 0.1は評価基準としてGit履歴に保存し、Prototype Bでは遊びの核を入れ替える。
- 作品の中心を「Elona／ルナティックドーン型の自由世界に、手動ハクスラを置く」とする。
- 常時自動遠隔攻撃を廃止し、基本攻撃・防御・itemはplayer入力で行う。
- 近距離自動攻撃は本体機能ではなく、後の装備特性またはaccessibility候補とする。
- 16³はasset authoring gridとし、rendererでは隠れ面を除去した統合geometryへ変換する。
- 世界観は確定しないため、初版の名付き敵は「異形」とし、妖怪へ差し替えられるdata構造にする。
- 世界観の上位概念を「辺境を旅する生活型ハクスラ＋正体不明のSF遺物」とし、妖怪、電脳怪異、旧文明機械のいずれにも着せ替えられるようにする。
- ラグランジュポイントを、武器差、SF設定、音がgameplayの記憶へ残る参考にする。
- 攻殻機動隊、Cyberpunk 2077、Watch Dogsからは監視、network、身体拡張、都市の裏側という題材だけを参照し、固有表現は模倣しない。
- SF item説明は、機能、原理解釈、副作用、使用者の所感を分離したdataとして生成する。

## Errors Encountered

- sandbox内の`pnpm add three @types/three`はregistry取得失敗とstore location不一致で停止した。既存`node_modules`が使うstoreを明示した許可付き再実行で追加を完了した。
- `@types/three`をdevDependencyへ移す`pnpm add --save-dev`はsandboxからpnpm store databaseを開けず停止した。packageとlockfileのimporter区分だけを同じversionのまま手動修正した。
- lockfile更新後、環境側`pnpm` wrapperが非TTYで`node_modules`再生成を中断し、`CI=true`再実行はsandbox内DNSでregistryへ接続できなかった。既存pnpm storeとbundled Node pathを明示した許可付きinstallで復元した。
- 通常の`pnpm build`は環境側dependency status checkが再installを要求したため、検証はbundled NodeからTypeScript、Vite、Vitestのentrypointを直接実行した。
- browserの極端に短いArrow keypressはdown/upが同じ30Hz tick間に収まり、移動へ反映されなかった。input側へ一tickのmovement tap queueを追加して解決した。
- この作業環境では通常PATH上に`node`がなく、local binary wrapperからの検査がexit 127になった。Codex付属Nodeの絶対pathからVitest、TypeScript、Vite entrypointを実行し、すべて合格した。
- `plutil`はwebmanifestをproperty listとして受理しなかったため、manifestはNodeのJSON parseで検証した。
- production previewは、server停止時にbrowserが生成したerror pageからURL policy上復帰できずlive確認を完了できなかった。production buildと生成indexのdefault asset参照は確認したが、HTTPS PWA install／offlineは未確認のまま残す。
- 初回postflightは`PROJECT_CONTEXT`のStatus行へphase説明まで書いたため、manifestの`active`と文字列不一致になった。Statusを`active`へ揃え、phaseを別行へ分離した。
- Status修正後のpostflightはproject auditを通過したが、manifest更新日を進めたことでWorkspace registryの生成欄がstaleになった。project外のregistryを変更せず整合を保つため、今回変更不要だったmanifest日付を登録時の値へ戻した。

## Status

**Completed locally** — Prototype Bは試遊可能な原型として実装・検査・記録済み。次の判定はiPhone 16 Pro実機10分試遊で行う。

## Previous Milestone

Prototype 0.1「境界調査録」は、移動、自動攻撃、強化選択、最小継承、PWA保存を備えた技術原型としてlocal commit済み。ユーザー試遊評価は約20点で、固定闘技場と常時自動射撃が意図する冒険体験と合わないことが確認された。

## Checkpoint Rule

`work/CHECKPOINT.md` は、各phaseが検証済みの独立再開点になったとき、または計画的な中断前だけ更新する。

---

## Current Iteration: Visual Pass C — daylight ruins and expressive voxels

### Goal

公開Prototype Bを、暗い終末画面から「人間には過酷だが、自然と光に満ちた崩壊世界」へ転換し、主人公をSFC後期RPGのspriteに近い判別力を持つ3D voxel characterへ更新する。

### Phases

- [x] Phase 1: 現行のlighting、palette、overlay、voxel制約とmobile描画budgetを監査する
- [x] Phase 2: 独自のdaylight ruin paletteと可変character grid規格を`work/visual_direction_v2.md`へ固定する
- [x] Phase 3: world lighting、地面、遺構、植生、水、screen effect、HUD透過を実装する
- [x] Phase 4: 主人公を高密度voxel recipeへ更新し、顔、髪、服、装備、向き、action silhouetteを改善する
- [x] Phase 5: unit test、strict TypeScript、production build、852×393 visual QA、draw-call／triangle budgetを検証する
- [ ] Phase 6: project docs、postflight、scope限定commit、承認済みGitHub Pages deployを行う

### Key Questions

1. gameplayの危険度をHUD、enemy予兆、音で保ちつつ、worldそのものを明るく色鮮やかにできるか。
2. 16³を普遍的制限にせず、playerだけ高密度化してもmesh統合と共有geometryで60fps budgetを保てるか。
3. 852×393で、主人公の頭、顔、髪、胴、手足、主武器が一目で分かるか。

### Decisions Made

- 『NieR:Automata』から固有の色、衣装、構図を写さず、「淡い昼光の遺構を自然が侵食し、危険と美しさが同居する」という構造だけを参照する。
- 『FINAL FANTASY VI』からspriteを複製せず、小画面でも頭身、顔、髪、服、装備、pose差が読める情報階層を参照する。
- 暗さは全画面filterで作らず、危険はenemy予兆、局所影、音、UIへ移す。
- 高密度化は全object一括ではなく、player、主要NPC、名付きenemyを優先し、背景objectは現行密度を維持する。
- voxel recipe schemaを可変`width × height × depth`へ更新し、legacy assetは16³、playerは16×24×12／voxel size 8/3とする。

### Errors Encountered

- 現時点なし。

### Status

**Currently in Phase 6** — local implementationとbrowser visual QAは合格した。project docs、review、postflightを終え、public deployは明示承認を待つ。

---

## Current Iteration: Visual Pass D — commercial-quality art slice

### Trigger

2026-07-31、ユーザーはVisual Pass Cについて、map、building、objectが大きなbox中心で「Minecraftのまま」、鮮やかさと魅力も不足していると評価した。目標をprototype内の相対改善ではなく、『OCTOPATH TRAVELER』など商業HD-2D作品を基準に置き直す。

### Goal

開始地点の一画面を、地面、建築、小物、自然、光、空気、playerまで含むcommercial-quality vertical art sliceへ作り直す。将来の同行者candidateも同じ品質でasset化するが、開始時は主人公単独とする。全worldへ薄く広げる前に、一画面で品質規格を合格させる。

### Phases

- [x] Phase D1: official HD-2D production insightと現rendererの表現／performance制約を監査する
- [x] Phase D2: start-town art sliceのcolor script、depth layers、lighting、asset density、camera scaleを固定する
- [x] Phase D3: ground microdetail、broken multi-part architecture、high-density props、自然侵食を実装する
- [x] Phase D4: lit material、directional／hemisphere／effect light、tone mapping、atmosphereを実装する
- [x] Phase D5: playerを再高密度化し、同行者roster候補をpreview-only assetとして追加する
- [x] Phase D6: 852×393 visual QA、combat readability、touch、fps、calls、triangles、heat-riskを検証する
- [ ] Phase D7: user review後に表現規格を全mapへ展開する。承認前はdeployしない

### Decisions Made

- Visual Pass Cはbrightness／readabilityの中間成果として保持するが、art acceptanceには不合格。
- densityはvoxel数だけでなく、material breakup、silhouette、depth、light／shadow、atmosphere、compositionの積で作る。
- map全域を一度に高密度化せず、start-townの一画面をquality gateにする。
- reference作品のasset、建物、character、palette、effectを複製せず、high-resolution map、organic detail、dynamic lighting、light-linked effectというproduction principleだけを参照する。
- 同行者は開始時の固定相棒にせず、world内で発見／加入し、複数候補から交代できるroster構造にする。今回の調査灯型robotは候補asset一体であり通常画面には表示しない。

### Status

**Superseded after local review** — 構造、生活感、光、hero密度は改善したが、ユーザー評価ではantialiasと実textureを欠き、commercial HD-2Dの美しさへ未到達。D7の全map展開は行わず、Visual Pass Eのhybrid routeへ移る。

---

## Current Iteration: Visual Pass E — hybrid HD-2D foundation

### Trigger

2026-07-31、ユーザーはVisual Pass Dを「まだ全く美しくない」と評価し、特にmap、背景、地面texture、antialiasをcommercial HD-2D水準へ上げるよう求めた。固定視点で矛盾しないなら、map／objectを3D voxelへ固定しない方針も承認された。その後、最新中間候補のGitHub Pages deployが明示承認された。

### Goal

主人公、item、interactive silhouette、shadow／occlusionはrealtime 3Dとして保ち、地面、遠景、建物表面は高解像度生成texture／baked layerを使えるhybrid rendererへ移行する。今回は開始町のfirst layerとしてMSAA、高い内部解像度、HDR-like color pipeline、generated ground albedoを公開し、iPhone実機で次のart passを判断できる中間版にする。

### Phases

- [x] Phase E1: user feedbackをhybrid HD-2D contract、HDR-like contract、asset-generation contractへ記録する
- [x] Phase E2: MSAA、1041×480相当の内部解像度、AgX tone mapping、sRGB baseline／Display P3 progressive enhancementを実装する
- [x] Phase E3: 開発時生成した高解像度ground albedoを最適化・provenance記録し、continuous groundへ適用する
- [x] Phase E4: solid-looking town decorとauthoritative collisionを一致させ、route／interactionを再検証する
- [x] Phase E5: world bible／generation rules／project docsを完成し、tests、type、build、browser QA、postflightを通す
- [x] Phase E6: exact-scope commitをmainへpushし、GitHub Pages workflowとpublic URLを確認する

### Decisions Made

- fixed cameraは制約ではなくbake可能性として使う。地面／遠景／建物surfaceは2D texture、normal／roughness map、baked detailを許可する。
- realtime 3Dに残すのは、移動するhero／enemy／item、collisionへ影響するsilhouette、characterを隠すoccluder、dynamic shadowが必要な形。
- 2D／3Dの矛盾はworld scale、camera、palette、light direction、material response、depth／occlusion maskを共有して防ぐ。
- `antialias: true`のMSAAを有効化し、内部canvasを852×393 CSSに対して1041×480へ上げる。
- true HDRを必須にせず、AgX tone mappingとlinear lightingをbaselineにする。Display P3はscreenとWebGL contextがともに対応するときだけ有効化する。
- 最初のgenerated groundは人間が選別したalbedo candidate。最終commercial assetではなく、将来はalbedo／normal／roughness／macro maskを一つのscale contractから生成する。

### Errors Encountered

- `sips`はこの環境でAVIF書出しをadvertiseしたが実行時に`Can't write format`で失敗した。bundled `sharp`で1024×1024 WebP quality 88へ変換し、約3.1 MBのPNGを約453 KBへ削減した。
- visual probe初回はlocal Vite停止により`ERR_CONNECTION_REFUSED`。serverを5174で再起動し、同一probeを再実行した。
- start-town receiverを非表示にした直後、underlying world groundの外周がcameraへ露出した。continuous ground geometryをworld外へoverscanし、textureを継続させて解決した。
- collision test初版はmovement stepが境界へぴったり着地すると仮定し、1 unit差で失敗した。禁止境界を越えず、一tick幅6 unit以内で停止するinvariantへ修正した。
- pre-deploy reviewで、sRGB authoring paletteを255除算した値がLinear-sRGB頂点色として渡っていたことを検出した。sRGB EOTF変換と`0x808080`の回帰testを追加した。
- start-town ground receiver削除後、life-pass testの固定draw-call期待値が12のまま残り1件失敗した。可視batch 11件へ期待値を更新し、全116件を再実行した。
- 最終browser QA初回はsystem tempの`ENOSPC`、次はpreview停止による`ERR_CONNECTION_REFUSED`で中断した。作業用`/private/tmp`へ一時領域を切り替え、production previewを再起動して同じprobeを合格させた。

### Status

**Completed and publicly verified** — commit `773aaf6`をmainへpushし、GitHub Actions run #7のbuild／deploy成功を確認した。公開URLは新JS／WebPを配信し、852×393 mobile browserで60fps表示、MSAA、AgX、texture `ready`、double tap scale 1、browser error 0件を確認した。次のgateはユーザーart reviewとiPhone 16 Pro実機性能である。
