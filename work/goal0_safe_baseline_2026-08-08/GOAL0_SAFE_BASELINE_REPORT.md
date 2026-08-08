# F.R.A.M. Goal 0 Safe Baseline Report

Status: complete locally; final task-owned documentation commit SHA is reported in the handoff  
Date: 2026-08-08

## Outcome

Goal 0のR06基準ゲートと文書整合を、canonical `main`へ統合してlocal検証した。独立implementation QAとdocumentation QAはいずれもP0／P1なしでacceptした。開始前から存在したdirty docs／未追跡資料は保持され、実装commitsのpathと衝突していない。push／deployは行っていない。

## Baseline

- Source base: `0bf397c9cf9e3d988358569daa9c7a24142aa7e4`
- Accepted isolated commits: `fc4268644ec4e9d1b5ca42917aafeb7a55c85464` → `c325d2fecd2cc8559b363c520985607832ff0871`
- Canonical main implementation commits: `7166c82` → `1c9d355744589a33dc616e377576b4fc19ac56e1`
- Environment: macOS arm64、Node 24.14.0、Playwright 1.62.0、Chrome 151、Apple M3 Metal、1280×720／DPR 1
- Cold first-controllable: 1,252.3 ms／1,338.6 ms
- Warm first-controllable: 1,034.6 ms／936.2 ms
- 10秒frame p95: 18.5〜18.7 ms、50 ms超long frameは全run 0件
- Full-route transfer: cold 779,580 B、warm 5,912 B
- 全runでWASDガイド、KeyS移動、非blank WebGL／minimap、R06 Service Workerのactivated＋warm前後controller一致、page console／page error 0件を確認した。

### Clean exact-commit confirmation

確定後のclean HEAD `c325d2fecd2cc8559b363c520985607832ff0871`から、標準`pnpm test:e2e:r06`を出力指定なしで再実行した。`sourceState.dirty: false`、porcelain status空、artifact fingerprintは上記retained runsと同一の`3b486613dc8bef95f432e9e635ba10763092cd2cb85febcb1b5c970fbc6b5053`だった。

- Cold／warm first-controllable: 1,334.2 ms／988.2 ms
- Frame p95: 18.7 ms／18.5 ms、50 ms超0／0
- Full-route transfer: 779,580 B／5,912 B
- KeyS movement: 71.57／71.57
- Service Worker activated、warm前後controller一致、console／page error 0
- 証拠は既定どおりOS temporary directoryへ出力され、tracked file、commit、push、deployは発生していない。実行後も同じHEADでGit statusはcleanである。

### Canonical main confirmation

`1c9d355`へ統合後のcanonical checkoutでも同じgateを再実行した。sourceは既存docs／未追跡資料を正しく`dirty`と記録したが、production artifact fingerprintはclean exact-commit runと同じ`3b486613dc8bef95f432e9e635ba10763092cd2cb85febcb1b5c970fbc6b5053`だった。

- Cold／warm first-controllable: 1,448.3 ms／988.9 ms
- Frame p95: 18.6 ms／18.6 ms、50 ms超1／0
- Full-route transfer: 779,580 B／5,912 B
- KeyS movement: 75.43／71.57
- Service Worker activated、warm前後controller一致、console／page error 0

## Changes

- Repository-local `playwright@1.62.0`と`pnpm test:e2e:r06`を追加した。
- ゲート自身がstrict TypeScript＋production buildを行い、artifact tree fingerprint、HEAD、dirty stateをJSONへ残す。
- URLをloopbackの正規R06 routeへ限定し、既定出力は一時directory、保存指定はGoal 0 evidence root内だけに制限した。
- 二つのmachine-readable JSONと代表screenshot一枚を保持した。
- README／ARCHITECTURE／PROJECT_CONTEXT／NEXT_TASKS／LEARNINGSを8/8 briefへ整合し、独立文書reviewでP0／P1なしを確認した。

## Verification

- Node syntax: PASS
- strict TypeScript: PASS
- Vitest: 38 files／205 tests PASS
- production build: PASS
- current R06 gate: 2回 PASS
- rejection checks: absolute output、`..`、external URL、credentialsを正しく拒否
- independent implementation QA: ACCEPT、P0／P1なし
- independent documentation QA: ACCEPT、P0／P1なし

## Remaining Risks

- retained二runは修正中dirty stateを明示しているが、同一artifact fingerprintのclean exact-commit代表runも追加確認済みである。
- desktop headless Chrome基準であり、iPhone 16 Pro、Safari、touch、PWA、thermal、battery、public deployの合格ではない。
- Workspace registryはユーザー承認後に再生成し、更新前backupとの差分がgenerated dateとF.R.A.M. rowの日付だけであることを確認した。既存の他project行／手書き部分は保持し、project postflightはPASSした。shared registry自体はGoal 0 project commitへ混在させない。
- Viteの既存chunk-size warningは残る。Goal 0ではruntime／gameplay／rendererを変更していない。

## R09A Handoff

R09Aへはbaseline code SHA `1c9d355`、artifact fingerprint、二つのretained run、clean exact-commit run、canonical main runを渡す。最初の実装は`WorldEvent → pure reducer → WorldMemoryState v1 → versioned local save`である。R09A、SSO、Cloud Test Save、Product Shell、engine比較、deployはGoal 0では開始していない。

Goal 0の完了はlocal baselineとdocumentationの確立を意味する。GitHub push、GitHub Pages deploy、iPhone 16 Pro実機合格、外部player acceptanceは含まない。
