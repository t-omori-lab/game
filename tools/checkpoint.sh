#!/usr/bin/env bash

set -euo pipefail

if [[ $# -lt 2 || $# -gt 3 ]]; then
  echo "Usage: $0 <confirmed-progress> <exact-next-action> [verification]" >&2
  exit 1
fi

progress="$1"
next_action="$2"
verification="${3:-Not run.}"
project_dir="$(cd "$(dirname "$0")/.." && pwd)"
checkpoint_file="$project_dir/work/CHECKPOINT.md"

if [[ -d "$project_dir/.git" ]]; then
  branch="$(git -C "$project_dir" branch --show-current 2>/dev/null || true)"
  [[ -n "$branch" ]] || branch="detached or unborn"
  changed_files="$(git -C "$project_dir" status --short | sed -n '1,100p')"
  [[ -n "$changed_files" ]] || changed_files="None."
else
  branch="not initialized"
  changed_files="Git repository not initialized."
fi

timestamp="$(date '+%Y-%m-%d %H:%M %Z')"

{
  printf '# Current Checkpoint\n\n'
  printf 'Updated: %s\n\n' "$timestamp"
  printf '## Current objective\n\n'
  printf '%s\n\n' "$progress"
  printf '## Repository state\n\n'
  printf -- '- Branch: `%s`\n' "$branch"
  printf -- '- Changed files:\n\n```text\n%s\n```\n\n' "$changed_files"
  printf '## Verification\n\n%s\n\n' "$verification"
  printf '## Blocker or uncertainty\n\n- None recorded.\n\n'
  printf '## Exact next action\n\n%s\n\n' "$next_action"
  printf '## Resume instructions\n\n'
  printf 'Read `AGENTS.md`, `docs/PROJECT_CONTEXT.md`, `docs/NEXT_TASKS.md`, and this file. Check Git status before editing.\n'
} > "$checkpoint_file"

echo "Updated: $checkpoint_file"
