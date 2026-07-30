# Architecture

Last updated: 2026-07-30

## System overview

TypeScript、Vite、Phaser 4でブラウザ／PWA版を作る。ゲーム規則はPhaserから独立した決定論的simulation coreに置き、表示、入力、音、エフェクトだけをPhaserが担当する。Steam候補版はゲーム核の検証後にElectronで同じWeb本体を包む。

## Components

| Component | Responsibility | Main path |
|---|---|---|
| Application | 起動、画面遷移、依存関係の組み立て | `src/app/` |
| Simulation | 移動、戦闘、敵、強化、seed付き乱数 | `src/sim/` |
| Session | 遠征結果、討伐跡、累計記録の次回継承 | `src/session/` |
| Content | 敵、装備、スキル、イベント定義 | `src/content/` |
| Renderer | Phaser scenes、ベクター描画、演出 | `src/render/` |
| Input | touch、keyboard、gamepadを共通intentへ変換 | `src/input/` |
| Platform | Web保存、PWA、後続のElectron保存 | `src/platform/` |
| Tests | simulation、保存、ブラウザ、性能 | `tests/` |

## Data flow

touch／key → `PlayerIntent` → tick付き`SimulationCommand` → `stepSimulation()` → 新しいstate＋`SimulationEvent` → Phaser表示／演出

遠征終了 → `recordCompletedRun()` → `WorldLegacy v1` → checksum付きA/B save → IndexedDB（失敗時はmemory fallback）

Phaserはstateを表示するが、HP、敵位置、報酬、乱数結果を直接変更しない。

## External dependencies

| Dependency | Purpose | Failure behavior |
|---|---|---|
| Phaser 4 | 2D表示、入力、音、scene管理 | 起動時に明示的なエラー画面 |
| Vite | 開発serverとproduction build | build失敗として停止 |
| Vitest | simulationと保存の自動検査 | release gateを不合格にする |
| Playwright | mobile viewportと主要操作のE2E検査 | release gateを不合格にする |
| IndexedDB | Web版の永続保存 | memory上で継続し、書き出しを案内 |

## Boundaries and invariants

- simulationで`Math.random()`、現在時刻、描画deltaを使わない。
- ゲーム用乱数と演出用乱数を分離する。
- simulationは毎秒30 tick、描画は最大60fpsで動かす。
- 保存には`saveVersion`、`contentVersion`、seedを必ず含める。
- WorldLegacyは完了した遠征だけを記録し、前回の討伐跡は最大12件に制限する。
- 保存mutationは直列化し、importはsize、depth、node数、checksum、domain schemaを検査する。
- 画面回転ではsceneを再生成しない。現在の永続保存は遠征終了時だけで、途中復帰は次sliceの要件とする。
- AI出力はゲーム判定へ直接接続しない。
- クライアントへAPI keyや秘密情報を入れない。

## Open design questions

- 初期版の攻撃を完全自動にするか、対象tapを許可するか。
- 能動スキルを1個に固定するか、2個まで許可するか。
- 妖怪案と荒野案のどちらを正式な世界観にするか。
- 目標敵数を80体から増やす必要があるか。
- 次の永続要素を「宿敵による落とし物の継承」にするか、「地域価格／勢力変化」にするか。
