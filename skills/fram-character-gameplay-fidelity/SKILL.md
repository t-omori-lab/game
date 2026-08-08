---
name: fram-character-gameplay-fidelity
description: This skill should be used when the user asks to "F-01をゲームに反映", "Character Forgeから本編へ持ってくる", "ボクセルの格子や足元のゴミを直す", "画像生成から3D、実画面までのキャラクターパイプラインを回す", or needs a generated F.R.A.M. character checked and corrected at gameplay distance without corrupting its canonical source.
---

# F.R.A.M. Character Gameplay Fidelity

## Goal

Character Forgeで確定した高密度ボクセルキャラクターを、同一性と正本を保ったまま実際のゲーム画面へ運び、実距離でのみ現れる崩れを再現可能な手順で直す。

## Boundaries

- Beauty Sheetは人物の魅力を判定するart authority、Build Sheetは機械入力、compiled surface packはリリース済み形状の正本として分ける。
- 正本packの形状を変える修正は新しいasset versionとして再生成する。
- gameplay adapterで許可するのはscale、向き、rig/socket、animation、LOD、陰影、sub-pixel seam、明白な生成断片の非破壊filterである。
- close-up Forge、実画面capture、機械検査、人間による「同一人物／可愛い／商業品質」の採否を別のgateとして扱う。
- このskillは新キャラクターのコンセプトを勝手に決めず、明示承認なしにdeployしない。

詳細な責任境界と判定順は`references/pipeline-contract.md`を読む。F-01で確定した実例は`examples/f01-r09-gameplay-correction.md`を参照する。

## Workflow

1. 対象route、Beauty／Build Sheet、source JSON、compiled pack、runtime adapter、actor IDを特定する。
2. 変更前にversion付きgameplay profileとsurface packを監査し、cell数、payload digest、semantic index、連結成分を記録する。
3. Forgeと本編が同じpackを読むことをコードとdigestで確認する。画像の見た目だけで同一性を推定しない。
4. 1280×720の固定viewportと同じgame cameraでcaptureし、actor ID、source cells、visible cells、digest、browser errorを保存する。
5. 問題をsource mismatch、reconstruction loss、gameplay presentation defectのどれかへ分類する。
6. presentation defectだけをadapterで補正する。形やパーツの変更が必要ならsourceへ戻して新versionをcompileする。
7. unit tests、surface audit、TypeScript、production build、同一camera captureを通す。
8. 最後に人間のart gateを受ける。machine passだけで魅力を合格にしない。

## Commands

正本監査:

```bash
pnpm audit:character:f01
```

実画面capture:

```bash
pnpm capture:character:r09 -- \
  --profile src/characterForge/f01.gameplay-profile.json \
  --url http://127.0.0.1:4177/game/r09/ \
  --out work/<task>/evidence/local-r09
```

## Bundled resources

- `references/pipeline-contract.md`: source、adapter、capture、human gateの責任境界
- `examples/f01-r09-gameplay-correction.md`: F-01の足元断片と黒い格子を直した実例
- `scripts/audit-surface-pack.mjs`: packを変更しないdeterministic integrity／component audit
- `scripts/capture-gameplay-fidelity.mjs`: 固定viewportの実画面captureとruntime contract検査

F-01の現在値は`src/characterForge/f01.gameplay-profile.json`が正本である。新しい距離別presentationを採択するときは既存profileを黙って書き換えず、新versionとして値とevidenceを揃える。
