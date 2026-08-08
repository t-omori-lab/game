# R09A First Memory Logic Proof — Task Plan

## Goal

F.R.A.M.の一回目の遠征結果を、二回目の世界の見た目と遊びへ返す。`WorldEvent → pure reducer → WorldMemoryState v1 → versioned local save`を正本にし、R06の操作・戦闘・描画を後退させずに、二地点、二モジュール、撤退、四分岐を実プレイで証明する。

## Scope guard

- R09Aのlogic proofと同一sceneへの接続を対象にする。
- 現行actorを使い、F-01／F-02、Product Shell、Google SSO、cloud save、engine比較、公開deployへは広げない。
- R06と旧`WorldLegacy`のsaveを読み替えず、R09専用namespaceを使う。
- PC Ultraを維持し、R06 baselineから10%以上の起動性能悪化を許容しない。

## Phases

- [x] Goal 0 baseline確認、preflight、専用branch／worktree作成
- [x] WorldMemory contract、pure reducer、strict v1 codec、repository adapterをtest-firstで実装
- [x] 二site、回収、base claim、二module、撤退を一遠征のsimulation／UIへ接続
- [x] 二回目開始90秒以内のmodule別visual／gameplay差分を接続
- [x] 四分岐、撤退、reload、両route combatのheadless／browser gate
- [ ] R06比較、documentation、postflight、限定commit、main統合

## Acceptance evidence

- clean saveから`2 site × 2 module`を完走し、各saveをreloadできるtable test。
- 撤退では発見地点と持帰り回収物だけが残り、base／moduleと一遠征のHP・敵・位置は残らない。
- 情報moduleと遺物moduleがそれぞれ、二回目開始90秒以内に固有のvisual cueと異なるgameplay effectを出す。
- 選ばなかったsiteが未解決目的として残る。
- R06の移動、collision、mini-map、marker、range-based auto-basic、manual relic skillに回帰がない。
- strict TypeScript、Vitest、production build、browser gate、project postflightが合格する。

## Decisions

- 2026-08-08: R09Aを`codex/r09-memory-loop`へ隔離し、mainの未追跡アート資料24件を変更しない。
- 2026-08-08: 永続状態はeventからのみ更新し、`PrototypeBState`をsave payloadへ混在させない。
- 2026-08-08: module効果は初版から互いに別系統とする。Pathfinder Arrayはroute表示＋探索速度、Relic Overdriveはcoral aura＋大技cooldownへ作用する。
- 2026-08-08: R09AはR06と同じR05/R06 presentation profileで性能比較する。R08 character／depth profileはR09Bのvisual gateへ分離する。

## Errors / blockers

- WorktreeではNodeがPATHへ自動露出しなかった。bundled Nodeを絶対pathで実行し、依存はmain worktreeの既存`node_modules`を一時symlinkして解決した。追跡対象への影響なし。
- 初回のR09 performance計測はR08 presentationを選んだためframe p95が33.4 msへ悪化した。World Memory固有負荷ではないことを切り分け、R06と同じpresentationへ戻した最終測定で18.7 msに回復した。
