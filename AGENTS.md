# Project Instructions: ゲーム開発

## Bootstrap

- If `../../.codex-workspace-root` exists, read `../../AGENTS.md` first and follow its start and finish protocols.
- If the project is elsewhere, walk upward for `.codex-workspace-root`; if none exists, use this file and local `docs/` in standalone mode.
- Before non-trivial work, read `PROJECT_MANIFEST.json` and these files in order:
  - `docs/PROJECT_CONTEXT.md`
  - `docs/NEXT_TASKS.md`
  - `docs/OUTCOMES.md`
  - `docs/LEARNINGS.md`
- Run the Workspace `tools/project-preflight.sh` when available.

## Project-local rules

- Add only rules that are specific to this project.
- Local rules may refine commands and deliverables, but must not weaken source protection, evidence requirements, external-operation approval, or verification.
- Character Forge、生成ボクセルキャラクター、surface packの本編反映、実画面での見た目補正を扱う場合は、作業前に`skills/fram-character-gameplay-fidelity/SKILL.md`を全文読み、その正本／派生物境界と実画面capture gateに従う。

## Work and handoff

- Preserve original inputs and unrelated user changes.
- Use project files, not chat history, as the durable source of truth.
- Update Context and Next Tasks when state changes.
- Record only confirmed real-world outcomes; keep unknowns pending.
- Record reusable observations in Learnings, but do not promote them to shared rules without the Workspace promotion gate.
- Run project postflight before completion when available.
- After postflight, make a local commit only for exact files changed by the current task using the Workspace `tools/project-finish.sh`; never stage the whole repository.
- Preserve pre-existing staged, modified, and untracked files. If they overlap or a safe commit is blocked, report the condition and do not force it.
- Do not add a remote or push to GitHub without explicit user approval.
- For long-running work, use the Workspace `tools/project-checkpoint.sh` only after a verified, independently resumable milestone or before a planned pause. Checkpoint commits must name exact task-owned files and must not be triggered only by elapsed time.
