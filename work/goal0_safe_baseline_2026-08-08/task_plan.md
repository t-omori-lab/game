# Task Plan: Goal 0 Safe Baseline

## Goal

既存のユーザー変更と公開R06を壊さず、R09Aを比較可能な状態で始められる安全な基準線を確立する。

## Acceptance Gates

- [x] 現在のbranch、基準SHA、staged／modified／untrackedの所有範囲を記録した。
- [x] R06の起動、操作、console、cold／warm first-controllable、frame-time p95、long frameを再現可能な方法で測定した。
- [x] 旧Phaserだけを対象にしたsmoke testとは別に、現行R06のE2E gateがある。
- [x] 2026-08-08 briefとREADME／ARCHITECTURE／PROJECT_CONTEXT／NEXT_TASKS／LEARNINGSの不整合を解消した。
- [x] strict TypeScript、unit tests、production build、対象browser checkに合格した。
- [x] 変更はtask-owned filesだけに限定し、既存の未整理変更を保持した。
- [x] R09A実装taskへ渡せるbaseline SHA、計測値、未解決riskが一つの報告書にまとまった。

## Phases

- [x] Phase 1: Goal登録、指示／skill読込、Workspace preflight
- [x] Phase 2: dirty ownershipと現行R06／test／docsの差分監査
- [x] Phase 3: 実装task packet作成、指定modelでwriter開始
- [x] Phase 4: R06性能計測と現行E2E実装
- [x] Phase 5: 文書整合、統合review、全検証
- [x] Phase 6: postflight、scope-limited local commit、R09A handoff

## Task Topology

- Control Room: 現task。契約、dirty保全、文書整合、統合判断を担当。
- Writer: `gpt-5.6-sol / xhigh`。clean worktreeでR06 baseline／E2Eを担当。
- Reviewer: `gpt-5.6-terra / high`。read-onlyでacceptanceと回帰を確認。

## Decisions Made

- Goal 0ではdeploy／pushを行わない。
- Product Shell、Google SSO、cloud save、R09A gameplay本体はGoal 0へ混ぜない。
- 現在modifiedのproject docsは上書きせず、diffを読んで意図を保持してから整合する。
- current taskをControl Roomとして維持し、writerはclean worktreeへ分離する。
- Writer task `019fe05d-6c12-7673-930d-8c594e752b6a`は`gpt-5.6-sol / xhigh`で起動し、R06 E2E／performanceだけを所有する。
- 2026-08-05のdirty docsは内容を保持し、8/8 briefと矛盾する箇所だけを同じ継続作業として狭く更新する。既存画像や別work artifactは対象外とする。
- Accepted HEAD `c325d2f`から既定temp出力のclean-source gateを再実行し、retained runsと同一artifact fingerprint、dirty false、Git cleanを確認した。

## Errors Encountered

- Workspace postflight initially failed only at `PROJECT_REGISTRY.md` freshness. The registry was already modified before Goal 0, so it was left untouched until explicit user approval; the later limited regeneration resolved the check.
- The first attempt to send the revision packet used unescaped backticks inside the orchestration script and failed at parse time. It made no external or filesystem change; the same packet was resent as a plain string successfully.
- Independent QA accepted the hardened commits, but the first main cherry-pick attempt could not create `.git/sequencer` under the sandbox. The escalated retry was rejected because explicit user approval for applying two commits onto a dirty `main` is required. No commit was applied and no workaround was attempted.
- The user explicitly approved both main integration and the limited shared-registry refresh; commits `7166c82`／`1c9d355` were then applied without overlapping existing dirty paths.
- A new goal could not be created after the user resumed because the blocked Goal 0 remains the unfinished thread goal. Work continued against the same objective; no duplicate goal was created.
- The first canonical dependency install could not resolve npm inside the network sandbox and was stopped. The approved escalated retry reused the fixed lockfile and installed 65 packages with browser download disabled.
- The first package-script checks lacked bundled Node on `PATH`; rerunning with the bundled Node path made Vitest／build pass. The first browser gate could not bind loopback under the sandbox (`listen EPERM`); the approved local-only retry passed.

## Status

**Completed locally** — QA済みimplementationをcanonical `main`へ統合し、TypeScript、205 tests、production build、R06 browser gate、registry freshness、project postflightへ合格した。task-owned documentationの最終local commit SHAはhandoffで報告する。push／deployは行わない。
