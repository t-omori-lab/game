# F-01 Technical Epoch Release Notes

## Starting state

- Local HEAD: `08c9624 feat(game): add AI-native character forge F-01`
- Branch: `main`, `origin/main`より4 commits ahead
- Local route: `/game/forge/f01/`
- User review: 暫定約70%。細部に矛盾はあるが、開発上の技術的エポックとして保存公開する価値あり。
- Public route before this task: R06 catalog。F-01は未公開。

## Evidence to collect

- Catalog上の独立Technology Epochs表示
- Production buildにF-01 HTML／assetsが含まれること
- Exact pushed SHAとGitHub Pages workflow result
- Public catalogと`/game/forge/f01/`のHTTP／browser表示

## Publication convention

- User-adopted technical epochs get stable routes and a separate catalog section.
- They do not replace or increment playable RXX releases.
- Preserve actual runtime capture, reproducible inputs, provenance, validation and known gaps.
- F-02 starts with hair／face modules and must be judged at both close and gameplay camera distances.

## Performance finding

- Before release tuning, F-01 loaded the 1.8 MB canonical Build Sheet and rebuilt 37,990 solid cells on every visit.
- Keep the canonical image and deterministic compiler in development; ship the validated 47,270-byte surface pack.
- Use an 87 KB derivative only for the visible reference panel. Do not overwrite the canonical Build Sheet.
