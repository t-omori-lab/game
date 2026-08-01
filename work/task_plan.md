# Iteration Log: ゲーム開発

Active authority: 末尾の`PC Ultra North Star scene`。それ以前のPrototype B、mobile、手動戦闘の節は履歴であり、現在の優先順位や[GAME_CONSTITUTION](../docs/GAME_CONSTITUTION.md)を上書きしない。

## Historical Iteration: Prototype B — 生活型ハクスラ原型

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

**Deployment verified; art acceptance pending** — commit `773aaf6`をmainへpushし、GitHub Actions run #7のbuild／deploy成功を確認した。公開URLは新JS／WebPを配信し、852×393 mobile browserで60fps表示、MSAA、AgX、texture `ready`、double tap scale 1、browser error 0件を確認した。次のgateはユーザーart reviewとiPhone 16 Pro実機性能である。

---

## Current Iteration: Product Design Synthesis — 本当に作りたいゲームの設計統合

### Trigger

2026-07-31、ユーザーは現状を「最低限はできていた」と評価し、token制約下では追加実装より、これまでの要求の統合、不足設計の発見、具体的な実現方法の文書化を優先するよう指示した。

### Goal

Prototype Bの実装事実と、長期的に作りたい放浪・生活・ハクスラ・世界反応gameを分離して表現する。そのうえで、次の実装判断を可能にするcore loop、world persistence、死亡、装備build、非戦闘解決、同行者、地域構造、生成pipeline、visual／audio production、試遊gateの設計骨格を一つの正本へまとめる。追加要求として、iPhone前提で最もrichなvisual、主人公／同行者designの抜本改善、生成したworld／character／itemを因果とgameplayへ接続する独自pipelineを、2026年時点の一次資料と実装可能性に基づいて設計する。

### Phases

- [x] Phase S1: 既存brief、world bible、generation rules、decision log、user taste signal、Prototype Bの実装境界を監査する
- [x] Phase S2: game identity、player fantasy、複数時間scaleのloop、明確なnon-goalを統合する
- [x] Phase S2R: mobile WebGPU／WebGL、HDR／wide color、game-ready 3D生成、rigging、PBR、PCG／AI検証、Steam disclosureの最新一次資料を調査する
- [x] Phase S3: 不足／未決定事項を優先度、影響、推奨default、要確認事項に分解する
- [x] Phase S4: event-driven persistent world、build grammar、encounter resolution、companion roster、region graphの具体設計を作る
- [x] Phase S5: summer vertical sliceのcontent budget、tiered mobile renderer、character／StyleProfile／AssetDNA、causal-first content generation、visual／audio contract、playtest gate、cut lineを固定する
- [x] Phase S6: project docsを更新し、整合review、postflight、exact-scope local commitを行う

### Working hypothesis

本作の中心は「Vampire Survivors型の自動戦闘」でも「voxel rendererそのもの」でもない。小さくても記憶を持つ明るい崩壊世界を、自分の手で戦い、避け、交渉し、回収し、生活しながら放浪する生活型ハクスラである。一本の遠征のbuildと判断が、帰還／死亡後の噂、依頼、人物、敵、品物、地図へ巡り、次の旅の目的を生むことが最重要仮説である。

### Constraints

- このiterationでは実装、asset量産、deployを行わない。
- 正式theme、主人公、死亡／継承方式など、ユーザー判断で体験が変わる事項を無断で確定しない。
- commercial HD-2D品質は目標として保持するが、rendererの改善をcore-system証明の代替にしない。
- 生成AIは開発時candidate生成に限定し、runtime規則、数値、save、合否を決めない。

### Status

**Completed locally** — `GAME_CONSTITUTION.md`と`DESIGN_SYNTHESIS.md`を中心に、Gate A／B／C、GameplayContract、夏版の最小World Cell、将来の因果世界コンパイラ、StyleProfile／AssetDNA、mobile renderer、art briefを統合した。独立したdesign／technical reviewを反映し、相対link、doc-only scope、`git diff --check`、Workspace postflightを合格した。game code、runtime asset、public build、deployは変更していない。

---

## Current Iteration: Semi-auto combat, overgrown city, self-built base

### Trigger

2026-08-01、ユーザーは目標戦闘をElona Mobileに近い「移動は手動、通常戦闘は自動、大技skillは手動」と明示した。また、自由放浪とworld memoryを支持し、人類が激減した現代都市を自然が侵食する世界、自分で場所を選んで築く拠点を作品の方向として追加した。

### Goal

過去の「常時自動遠隔攻撃は合わない」という試遊結果を、あらゆる自動戦闘の否定と誤読せず、位置取りと重要判断をplayerへ残す半自動戦闘へ再定義する。放浪、回収、拠点選定／復旧／建築、world memoryを一つの複数遠征loopへ統合し、夏版で検証できる最小scopeを定める。

### Phases

- [x] Phase R1: 最新の確定事項と既存設計の矛盾箇所を監査する
- [x] Phase R2: 半自動戦闘の入力、targeting、手動介入、停止条件のdraft contract骨格を作る
- [x] Phase R3: 自由放浪、拠点、world memoryを結ぶ最小loopとdraft schema骨格を作る
- [x] Phase R4: 作品憲法、統合設計、brief、world bible、generation rules、project台帳を更新する
- [x] Phase R5: 相対link、表現整合、doc-only scope、Workspace postflightを検査し、exact-scope local commitを行う

### Working hypothesis

嫌だったのは「固定arenaで常時自動遠隔攻撃を眺めること」であり、通常攻撃の自動化そのものではない。移動、接敵距離、向き、target優先、撤退と、大技、防御、item、同行者命令などの有限介入を手動にすれば、smartphoneの操作負荷を下げながらbuildと判断を濃くできる。拠点は単なるmenuではなく、選んだ土地、持ち帰った部品、加入者、過去の遠征が物理的に積み上がるworld memoryの表示面にする。

### Constraints

- Prototype Bの手動戦闘は過去の実装事実として保持し、目標仕様と混同しない。
- 通常攻撃以外のどこまでを自動／手動にするかは、設計提案と確定要求を分ける。
- 夏版で無制限の地形編集や建築editorは作らない。候補地選択と機能module設置で核を試す。
- このiterationではcode、asset、public build、deployを変更しない。

### Status

**Completed locally** — 半自動戦闘、自然侵食された現代都市、最小拠点loopを文書へ反映した。独立design reviewでP0残件0を確認し、`git diff --check`、相対link、確定／仮説境界、Workspace postflightが合格した。game code、runtime asset、public build、deployは変更していない。

---

## Current Iteration: PC Ultra North Star scene

### Trigger

2026-08-01、ユーザーは正本に残るタスクを確認し、そのまま実行するよう指示した。

### Goal

PC play前提の最高品質を先に定義し、自然侵食された現代都市、精密な主人公／同行者候補、半自動戦闘、二build、手動大技を一つのNorth Star sceneへ統合する。iPhoneは同じmasterから後で縮退する。数値contractと検証は反復を止めない最低限にし、visual、game feel、表現、設計判断へ制作時間を集中する。

### Phases

- [x] Phase G1: North Star、正本、現renderer／hero／effect／combat architectureを監査し、PC Ultraの変更面を固定する
- [x] Phase G2: PC Ultra scene、heroのsemantic part化、二build、manual skill、visual feedbackを設計する。companion最終造形は次sliceへ残す
- [x] Phase G3: 独立routeへNorth Star playable sceneを実装する
- [x] Phase G4: 既存版を壊さない最低限のVitest、strict TypeScript、production build、desktop browser visual smokeを実行する
- [x] Phase G5: Context／Next Tasks／Outcomes／Learningsを更新し、postflightとexact-scope local commitを行う

### Constraints

- PC masterの表現上限をiPhone budgetで先に下げない。mobileはquality tierとして後で最適化する。
- Prototype Bの既存runtimeと公開版は比較可能な状態を保持する。
- iPhone 16 Pro実機試遊はユーザー操作が必要であり、local／browser検査を実機合格として扱わない。
- public deploy／pushはこの指示に含めず、local実装と検証までを今回の外部操作境界とする。
- 網羅的な数値固定やtest作り込みより、visual、game feel、character表現、二buildの差を優先する。壊れやすい境界だけsmoke testへ残す。

### Status

**Completed locally; not deployed** — PC-first North Star候補へWebGL2 half-float post stack、半自動戦闘、部位化主人公を統合し、desktop実画面まで確認した。現sceneは技術sliceであり、自然侵食現代都市、最終hero／companion造形、WebGPU／true HDR比較、commercial art acceptanceは次sliceへ残る。

### Error log

| Date | Command | Failure | Resolution |
|---|---|---|---|
| 2026-08-01 | `pnpm exec tsc --noEmit` | bundled pnpmがregistry metadata取得と非TTYのmodules再作成を要求して停止 | bundled Nodeでlocal TypeScript CLIを直接実行し、strict TypeScript合格を確認 |

---

## Current Iteration: North Star City Cell v0.1

### Trigger

2026-08-01、ユーザーはPC-first North Star候補の改善を確認し、「では次」と継続実装を指示した。

### Goal

North Starルートに残る村落的な開始地点を、旧用途が一目で読める「自然に侵食された現代都市の一画面」へ置き換える。道路、高架／鉄道、集合住宅／店舗、水と植生、修理して暮らす痕跡を同じ因果で構成し、現行の主人公、半自動戦闘、高品質post stack、既存baseline routeを保つ。

### Art-direction decision

**Revise one thing** — 今回はrenderer方式やgameplay scopeを広げず、背景の都市認識と画面構成だけを大きく改稿する。主役は移動／戦う主人公。読む順番は `主人公と進路 → 都市の旧用途 → 植生と生活の痕跡` とし、colliderとinteractionに対応する物体は装飾ではなくevidence layerとして見せる。

### Phases

- [x] Phase C1: start-town art、renderer統合、collision／prop置換、既存testを監査し、North Star専用差し替え面を固定する
- [x] Phase C2: 固定camera向けの高密度都市セル、material、植生、生活痕跡を実装する
- [x] Phase C3: desktop実画面で構図、主人公可読性、都市認識を確認し、一度改稿する
- [x] Phase C4: focused test、全test、strict TypeScript、production buildを合格させる
- [x] Phase C5: project docsを更新し、postflightとexact-scope local commitを行う

### Constraints

- `baseline` routeのstart-town表現とauthoritative collision／interactionを壊さない。
- North StarはPC最高品質候補を先に作り、mobile tierへの縮退はこのsliceでは行わない。
- 固有作品の景観、商標、assetを模倣しない。参照するのは鮮やかな自然と都市遺構の構造だけ。
- commercial HD-2D達成とは呼ばず、user art acceptance前のlocal candidateとして扱う。
- public deploy／pushは今回の指示に含めない。

### Status

**Completed locally; not deployed** — 都市cellのlocal実装、1600×900 actual-camera review、camera-facing facade／舗装filterの改稿、baseline保持、strict TypeScript、Vitest 129件、production build、Workspace postflightまで合格した。public deploy／pushとユーザーart acceptanceは行っていない。

---

## Current Iteration: North Star Surface Pass v0.2

### Trigger

2026-08-01、ユーザーがNorth Star都市cellの改善を確認し、「つぎ」と継続実装を指示した。正本上の次P0である、procedural box主体の表面をcommercial referenceへ近づける作業へ進む。

### Goal

North Star専用都市cellの大面積な舗装、外壁、屋根を、決定的に生成した高解像度albedo／normal／roughnessと固定camera向けmicrodetailへ置き換える。現行の都市構図、主人公、戦闘、collision／interaction、post stack、baseline routeは保持し、「形は都市だが表面が生成boxに見える」問題を一段解消する。

### Art-direction decision

**Revise one thing** — 今回の主問題は、大面積surfaceの平坦さと反復感。読む順番 `主人公と進路 → 駅・集合住宅・旧診療所 → 水・修理・菜園` を保ち、画面上でよく見えるroofとcamera-facing facade、道路を優先する。

### Phases

- [x] Phase S1: 現都市cellのsurface／material所有、UV、dispose、test境界を監査し、限定した実装方式を固定する
- [x] Phase S2: North Star専用の決定的multi-channel surface libraryと、facade／roof／asphalt microdetailを実装する
- [x] Phase S3: 1600×900 actual-cameraで第一稿を確認し、主問題を一度改稿する
- [x] Phase S4: focused／full test、strict TypeScript、production build、baseline browser smokeを合格させる
- [x] Phase S5: durable docs、Workspace postflight、exact-scope local commitを完了する

### Constraints

- gameplay、collision、interaction、baseline route、PC post stackを変更しない。
- WebGPU／true HDR、mobile quality tier、最終hero／companion造形は別sliceとする。
- 外部AI runtimeや無審査assetを追加しない。surface生成はseed、version、channel、content digestを記録し、再現可能にする。
- commercial HD-2D達成とは呼ばず、actual-cameraとuser review前のlocal candidateとして扱う。
- public deploy／pushは今回の指示に含めない。

### Status

**Completed locally; not deployed** — 9枚の決定的albedo／normal／roughness、UV付き道路・主要2棟shell／roof、歩道microdetailを実装した。1600×900 reviewでmacro反復と点格子を解消。strict TypeScript、Vitest 19 files／133 tests、production build、North Star／baseline browser smoke、独立code／visual review、Workspace postflightが合格した。public deploy／push、移動時shimmer、iPhone実機、ユーザーart acceptance、commercial-quality達成は未確認。
