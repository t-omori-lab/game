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
