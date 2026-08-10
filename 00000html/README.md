# 商品詳細ページ テンプレート（チーム向け）

もらため商品詳細 HTML のテンプレートです。案件ごとにこのディレクトリをコピーし、プロジェクト ID に合わせて編集してください。

**チームが触るのは次だけです。**

- `dist/` … HTML・画像・スクリプト・コンパイル済み CSS（納品・プレビュー）
- `src/` … SCSS ソース（FLOCSS）

開発は **Live Sass Compiler** と **Live Server** だけで行います。`npm` は不要です。

---

## 1. はじめに（必須）

作業開始時に、プレースホルダ `00000` / `p00000` を **実際のプロジェクト ID** に置き換えます。

例: プロジェクト ID が `15403` の場合

| 変換前                 | 変換後       |
| ---------------------- | ------------ |
| `00000`                | `15403`      |
| `p00000`               | `p15403`     |
| フォルダ名 `00000html` | `15403html`  |
| `00000.html`           | `15403.html` |

### VS Code / Cursor での一括置換

1. テンプレートフォルダ（例: `00000html`）を開く
2. サイドバーで対象フォルダを選択した状態で、検索パネルを開く（`Cmd + Shift + F` / `Ctrl + Shift + F`）
3. 「ファイルで置換」で次を実行する（**必ずこの順**）

```
1. p00000  →  p15403
2. 00000   →  15403
```

> **注意**
>
> - `p00000` を先に置換しないと、`p` + `00000` が意図せず二重変換されることがあります
> - 置換範囲は `00000html`（またはコピー後のフォルダ）内に限定する
> - HTML / SCSS / CSS / `.vscode/settings.json` など、拡張子を問わずすべて置換する

### フォルダ・ファイル名の変更

置換後、次もリネームします。

```
00000html/                 →  15403html/
00000html/dist/00000.html  →  15403html/dist/15403.html
```

リポジトリ直下の `.vscode/settings.json` を使っている場合は、Live Sass のパスも合わせて更新します。

```json
"savePath": "/15403html/dist/styles",
"includeItems": ["/15403html/src/styles/style.scss"]
```

`15403html/.vscode/settings.json` だけを使う場合は、パスにプロジェクト ID が含まれていないため変更不要です。

---

## 2. ディレクトリ構成（チームが使う範囲）

```
00000html/
├── dist/                 # 納品・プレビュー用
│   ├── 00000.html
│   ├── images/
│   ├── scripts/
│   └── styles/
│       └── style.css     # SCSS のコンパイル結果（直接編集しない）
├── src/
│   └── styles/           # SCSS ソース（FLOCSS）
│       ├── style.scss    # エントリポイント
│       ├── foundation/   # リセット・フォントなど土台
│       ├── layout/       # レイアウト（余白コンテナなど）
│       └── object/
│           ├── component/  # 再利用 UI（c-）
│           ├── project/    # 案件固有（p-）※主にここを編集
│           └── utility/    # ユーティリティ（u-）
└── .vscode/              # Live Sass / Live Server 設定
```

---

## 3. FLOCSS とクラス命名

プレフィックス `p00000`（置換後は `p15403` など）は、サイト全体 CSS との衝突回避用です。

| 層         | 接頭辞 | 置くもの                     | 例                                                                                         |
| ---------- | ------ | ---------------------------- | ------------------------------------------------------------------------------------------ |
| Foundation | —      | フォント読み込み、ベース     | `foundation/_font-family.scss`                                                             |
| Layout     | `l-`   | 余白・幅などのレイアウト     | `p00000-l-container`                                                                       |
| Component  | `c-`   | 再利用できる UI 部品         | `p00000-c-box`, `p00000-c-heading`, `p00000-c-allergy`, `p00000-c-banner`, `p00000-c-button`, `p00000-c-youtube` |
| Project    | `p-`   | その商品ページ固有のブロック | `p00000-p-main`, `p00000-p-section`                                                        |
| Utility    | `u-`   | 単機能ヘルパー               | `p00000-u-font-noto-serif-jp`, `p00000-u-text-center`                                      |

### どこを編集するか

- **案件ごとの見た目・構成** → `object/project/_project.scss` を中心に編集
- **Project 層のパーシャルを増やす** → ファイルを `object/project/` に追加し、`style.scss` で `@import` する（Component と同じ）
- **共通部品として再利用したい** → `object/component/` に切り出す
- **余白だけ欲しい** → `p00000-l-container` など Layout を使う
- **フォント指定だけ** → Utility クラスを HTML に付与

---

## 4. 開発環境（Live Sass / Live Server）

### 推奨拡張機能

- [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass)（`glenn2223.live-sass`）
- Live Server（プレビュー用）

### Live Sass

1. ステータスバーの **Watch Sass** をクリック
2. `src/styles/**/*.scss` を保存すると `dist/styles/style.css` が更新される

出力先は `.vscode/settings.json` で指定済みです。

```
src/styles/style.scss  →  dist/styles/style.css
```

> `src/styles/` 直下に `.css` が生成された場合は、設定が効いていません。Watch を止め、リポジトリ／フォルダの開き方と `.vscode/settings.json` を確認してください。

### プレビュー（Live Server）

1. Live Server で `dist/00000.html`（置換後は `dist/15403.html` など）を開く
2. 開発中はローカル CSS を読み込む

```html
<link href="./styles/style.css" rel="stylesheet" type="text/css" />
```

公開用に CDN へ切り替える場合は、ローカルをコメントアウトし、本番 URL を有効にします。

```html
<!-- <link href="./styles/style.css" rel="stylesheet" type="text/css" /> -->
<link href="https://image.moratame.net/images/detail/15403/styles/style.css" rel="stylesheet" type="text/css" />
```

---

## 5. 作業の流れ（チェックリスト）

1. [ ] テンプレートをコピーする
2. [ ] `p00000` → `pXXXXX`、続けて `00000` → `XXXXX` を一括置換する
3. [ ] フォルダ名・HTML ファイル名をリネームする
4. [ ] `.vscode` の Live Sass パスを必要に応じて更新する
5. [ ] Watch Sass を開始する
6. [ ] Live Server で `dist/*.html` を開く
7. [ ] `dist/*.html` と `src/styles/object/project/` を中心にコーディングする
8. [ ] 画像は `dist/images/`（または CDN パス）に配置する
9. [ ] 公開前に CSS のリンク先（ローカル / CDN）を確認する

---

## 6. マークアップの例

```html
<section class="p00000-p-section p00000-p-section--1">
  <div class="p00000-l-container">
    <div class="p00000-c-box">
      <h3 class="p00000-c-heading">見出し</h3>
      <p class="p00000-u-font-noto-serif-jp">明朝体のテキスト</p>
    </div>
  </div>
</section>
```

- `p-section` … セクション（Project）
- `l-container` … 余白コンテナ（Layout）
- `c-box` … 白ボックス（Component）
- `c-heading` … 共通見出し（Component）
- `c-banner` … バナーブロック（Component）
- `u-font-*` … フォント指定（Utility）
- `u-text-center` … 中央寄せ（Utility）

### ぶら下がりインデント（ご注意点など）

先頭記号（・ ※ ● など）を 1 文字分、番号付き（※1 ＊1 など）を 2 文字分ずらします。

```html
<p class="p00000-u-indent p00000-u-indent--11">※すべての菌を取り除くわけではありません。</p>
<p class="p00000-u-indent p00000-u-indent--07">・1日の摂取目安量を守ってください。</p>
<p class="p00000-u-indent p00000-u-indent--11">●乳幼児・小児の手の届かない所に置いてください。</p>
<p class="p00000-u-indent p00000-u-indent--22">※1 食物アレルギーの方は原材料名をご確認ください。</p>
<p class="p00000-u-indent p00000-u-indent--19">＊1 原材料の特性により色等が変化することがあります。</p>
```

| クラス | 用途 |
|--------|------|
| `p00000-u-indent` | ぶら下がりインデントのベース（必須） |
| `p00000-u-indent--07` | 0.7em（・ など） |
| `p00000-u-indent--10` | 1em |
| `p00000-u-indent--11` | 1.1em（※ ● など） |
| `p00000-u-indent--19` | 1.9em（＊1 など） |
| `p00000-u-indent--22` | 2.2em（※1 など） |

### 文中の上付き注釈（米印など）

```html
<p>除菌<sup class="p00000-u-sup">※</sup>し、新たなニオイの発生を防ぎます。</p>
<p class="p00000-u-indent p00000-u-indent--11">※すべての菌を取り除くわけではありません。</p>
```

---

## 7. 補足

### `@import` の警告について

Live Sass の出力に Sass `@import` 非推奨の警告が出ることがあります。現状のビルドは動作します。段階的に `@use` へ移行予定がある場合を除き、無視して問題ありません。

### 文字化け対策

特殊文字は実体参照を使います。

```
® → &#174;
```
