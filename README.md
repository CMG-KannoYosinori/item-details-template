# item-details-template

もらため商品詳細 HTML のテンプレートリポジトリです。

---

## チーム向け（作業開始）

チームは **このセクションだけ** 読めば十分です。以降はこのリポジトリの作成者向けです。

1. GitHub リポジトリページで **Code → Download ZIP** を選ぶ
2. ダウンロードした ZIP を解凍する
3. 解凍したフォルダのうち **`00000html` だけ** を取り出し、案件用の作業場所へ置く
4. `00000html` を開いて作業を始める

詳細な手順（`00000` の一括置換、Live Sass / Live Server、命名規則など）は次を参照してください。

→ **[`00000html/README.md`](./00000html/README.md)**

`npm` は不要です。触るのは `00000html/dist` と `00000html/src` だけです。

---

## 作成者向け

このファイルの以降は、テンプレート整備・npm・GitHub Pages など **作成者用** です。`npm` はリポジトリルートで、テンプレート作成・メンテ時のみ使います。

## リポジトリ構成

```
item-details-template/
├── 00000html/                 # 案件へコピーするテンプレート本体
│   ├── README.md              # チーム向け説明書
│   ├── dist/                  # チームが編集・納品する成果物
│   ├── src/                   # チームが編集する SCSS
│   └── .vscode/               # Live Sass / Live Server 設定
├── package.json               # 作成者用 npm
├── package-lock.json
├── .prettierrc.json
├── .stylelintrc.json
├── eslint.config.mjs
├── .vscode/                   # リポジトリルート用 Live Sass 設定
├── .github/workflows/         # GitHub Pages デプロイ
└── README.md                  # 本ファイル（作成者向け）
```

---

## npm（作成者用）

リポジトリルートで実行します。チームの日常作業では使いません。

```shell
npm install
npm run watch   # Sass 監視コンパイル
npm run build   # format + Sass ビルド
npm run format  # ESLint / Prettier / Stylelint
```

| スクリプト | 用途 |
| ---------- | ---- |
| `watch` / `watch:sass` | `00000html/src/styles/style.scss` → `00000html/dist/styles/style.css` を監視コンパイル |
| `build:sass` | `style.scss` から `style.css` へ一回ビルド |
| `build` | `format` のあと `build:sass` |
| `format` | JS / SCSS の整形（Stylelint 含む） |
| `format:stylelint:sass` | SCSS のみ。プロパティ順は [stylelint-config-recess-order](https://github.com/stormwarning/stylelint-config-recess-order)（配置 → ボックスモデル → タイポグラフィ → 背景・ボーダー） |

普段の案件作業用コンパイルは Live Sass で足ります。テンプレート更新時の一括整形・確認に npm を使います。

---

## GitHub Pages（テンプレプレビュー）

`00000html/dist/` を GitHub Pages で公開できます。`main` への push で自動デプロイされます。

### 初回セットアップ

1. リポジトリの **Settings → Pages**
2. **Build and deployment → Source** を **GitHub Actions** にする
3. ワークフロー（`.github/workflows/deploy-pages.yml`）が `main` にあることを確認する

### 公開 URL

```
https://<owner>.github.io/item-details-template/
```

デプロイ時に `00000.html` を `index.html` としてもコピーするため、ルートで表示されます。

> 開発用のローカル CSS（`./styles/style.css`）のまま Pages に載ります。本番 CDN 向けとは別用途のプレビューです。

---

## テンプレート更新時のメモ

- チーム向けの手順・命名・マークアップ例が変わったら **`00000html/README.md` を更新**する
- npm / Pages / リポジトリ運用が変わったら **この README を更新**する
- コミットメッセージは gitmoji 付き（例: `📝 チーム向けREADMEを整理`）
