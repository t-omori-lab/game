# ゲーム開発

プロジェクトの目的、利用者、完成条件を一文で記載します。

## Start

1. `AGENTS.md`を読む。
2. `PROJECT_MANIFEST.json`を確認する。
3. `docs/PROJECT_CONTEXT.md`と`docs/NEXT_TASKS.md`から再開する。
4. `../../tools/project-preflight.sh .`で文書とGit状態を読み取り確認する。

## Verify

Workspace内では次を実行します。

```bash
../../tools/project-preflight.sh .
../../tools/project-postflight.sh .
../../tools/project-finish.sh . 'type(scope): subject' path/to/exact-file
```

`project-finish.sh`は明示した変更ファイルだけをローカルcommitします。GitHubへはpushしません。

## Documentation

- 現在状態: `docs/PROJECT_CONTEXT.md`
- 次の作業: `docs/NEXT_TASKS.md`
- 現実世界の結果: `docs/OUTCOMES.md`
- 再利用可能な学び: `docs/LEARNINGS.md`
- アーキテクチャ: `docs/ARCHITECTURE.md`
- 重要判断: `docs/DECISIONS.md`
