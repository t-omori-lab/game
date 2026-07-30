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
