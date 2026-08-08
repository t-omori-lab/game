# F-01R Source-faithful Reconstruction — Task Plan

## Goal

F-01 Beauty Sheetで承認された人物性を、再生成可能な意味部位データへ変換し、Character ForgeとR09が同一のcompiled assetを読む最小ループを成立させる。

## Acceptance contract

- F-02は技術検証用比較候補として保持し、F-01Rの造形根拠にはしない。
- 白髪の非対称ボブ、丸い頭部、広い頬、大きなtealの目、小さな口という顔まわりの人物性を優先する。
- 頭・顔・髪はruntime TypeScriptで箱を追加せず、versioned source dataからコンパイルする。
- compiled assetはsource digestとpack digestを持ち、ForgeとR09で同じdigestを表示・検証できる。
- F-01、F-02、F-01Rを同じカメラ条件で比較できる。
- 自動検証の合格と、人間による最終的な可愛さの採否を区別する。

## Phases

1. **Source and fidelity baseline** — `completed`
   - Beauty Sheet、Build Sheet、F-01 runtime、F-02 runtimeを固定する。
   - 頭・顔・髪のlandmark、module、material、bone、provenance契約を決める。

2. **F-01R compiler and pack** — `completed`
   - module-aware source definitionから頭部を再構築する。
   - module / bone / material indexとdigestを持つcompiled packを生成する。

3. **Single asset registry** — `completed`
   - ForgeとR09を同じasset registryへ接続する。
   - F-01/F-02を比較候補として残し、F-01Rを新候補にする。

4. **Visual and runtime gates** — `completed`
   - 同一ビューポートで参照・Forge・R09を比較する。
   - 4方向、idle/run/attack、digest一致、性能退行を検証する。

5. **Documentation and local commit** — `completed`
   - 設計判断、実測、未達を記録する。
   - project docsを更新し、exact-file local commitを作る。

## Guardrails

- 公開・デプロイ・pushは行わない。
- F-01/F-02の既存成果物を削除・上書きしない。
- runtimeの場当たり的なgeometry patchを追加しない。
- Beauty Sheetの完全一致や商用品質を、自動テストだけで主張しない。
- `node_modules` symlinkはcommitしない。
