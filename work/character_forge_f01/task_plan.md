# Character Forge F-01 — Task Plan

## Goal

選定済みのキャラクター方向性画像を、ゲーム内で再利用・編集・アニメーション可能な高密度ボクセル3D正本へ変換する工程を、独立したローカル検証画面として成立させる。

## Acceptance contract

- Beauty Sheetの人物同一性（白髪、顔、頭身、衣装、色、SF装備）をBuild Sheetと3Dに引き継ぐ。
- 3D正本はコード内の手描き箱集合ではなく、外部データとして保存・再生成できる。
- `idle / run / hit` を同じリグで再生できる。
- 正面・側面・背面、通常ゲーム距離・近接確認距離を切り替えられる。
- R05・R08と同じ条件で比較し、改善点と未達を隠さない。
- 本編と公開版は変更せず、独立したCharacter Forgeとしてローカルで検証できる。

## Phases

1. **Build Sheet生成** — `completed`
   - Beauty Sheetを確認する。
   - 同一人物の厳密な正投影4面図とモジュール定義を生成する。
   - 生成物をF-01の入力資産として保存する。

2. **外部3D正本と変換工程** — `completed`
   - 画像入力と意味パーツから、再生成可能な外部キャラクターデータを作る。
   - 共通リグ、素材、装備ソケット、LOD情報を含める。
   - ブラウザで読み込めるGLBまたは同等の外部形式へ変換する。

3. **Character Forge実装** — `completed`
   - 独立ルートと検証UIを作る。
   - `idle / run / hit`、視点、距離、装備、比較表示を操作可能にする。
   - Beauty Sheet / Build Sheet / 3Dを一画面で照合できるようにする。

4. **視覚比較と反復** — `completed`
   - 同一ビューポートの参照・実装比較画像を作る。
   - P0/P1/P2の差分を修正する。
   - `design-qa.md` を合格状態にする。

5. **検証・記録・完了処理** — `completed`
   - 型検査、テスト、ビルド、ローカル表示を検証する。
   - PROJECT_CONTEXT / NEXT_TASKS / OUTCOMES / LEARNINGSを更新する。
   - exact-file commitを作り、ローカルURLと未達点を報告する。

## Guardrails

- `/game/` と公開R06を変更・デプロイしない。
- 既存の未追跡R05画像18点には触れない。
- Beauty Sheetの見た目を都合よく言い換えず、比較で判定する。
- 完成度をConcept Cや商用品質と同一視しない。
