# 商品詳細ページ テンプレート（チーム向け）

もらため商品詳細 HTML のテンプレートです。案件ごとにこのディレクトリをコピーし、プロジェクト ID に合わせて編集してください。

**チームが触るのは次だけです。**

- `dist/` … HTML・画像・スクリプト・コンパイル済み CSS（納品・プレビュー）
- `src/` … SCSS ソース（Modern BEM）

開発は **Live Sass Compiler** と **Live Server** だけで行います。`npm` は不要です。

---

## 1. はじめに（必須）

作業開始時に、プレースホルダ `00000` を **実際のプロジェクト ID** に置き換えます。クラス名の `p00000` も文字列中の `00000` を含むため、同じ置換で `p15403` になります。

例: プロジェクト ID が `15403` の場合

| 変換前                 | 変換後（一括置換の結果） |
| ---------------------- | ------------------------ |
| `00000`                | `15403`                  |
| `p00000`               | `p15403`                 |
| フォルダ名 `00000html` | `15403html`（手動リネーム） |
| `00000.html`           | `15403.html`（手動リネーム） |

### VS Code / Cursor での一括置換

1. テンプレートフォルダ（例: `00000html`）を開く
2. サイドバーで対象フォルダを選択した状態で、検索パネルを開く（`Cmd + Shift + F` / `Ctrl + Shift + F`）
3. 「ファイルで置換」で次を実行する

```
00000  →  15403
```

> **注意**
>
> - 置換範囲は `00000html`（またはコピー後のフォルダ）内に限定する
> - HTML / SCSS / CSS / `.vscode/settings.json` など、拡張子を問わずすべて置換する
> - 商品 URL など、プロジェクト ID とは無関係な `00000` を含む文字列（例: `000000000177`）は意図せず変わることがある。置換後に目視で確認する

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
│   └── styles/           # SCSS ソース（Modern BEM）
│       ├── style.scss    # エントリポイント
│       ├── foundation/   # リセット・フォントなど土台
│       ├── layout/       # 配置・表示切替・タイポ・余白ユーティリティ
│       └── blocks/       # UI Block（1 ファイル = 1 Block）
└── .vscode/              # Live Sass / Live Server 設定
```

| ディレクトリ    | 役割                                                         |
| --------------- | ------------------------------------------------------------ |
| `foundation/`   | リセット、フォント読み込みなど Block に属さない共通基盤      |
| `layout/`       | 余白コンテナ、表示切替、フォント指定などコンテキスト依存     |
| `blocks/`       | UI コンポーネント（Block）。Element / Modifier も同ファイル内 |
| `style.scss`    | 上記を読み込む入口                                           |

---

## 3. Modern BEM とクラス命名

命名規則・ディレクトリ構成・State の扱い・アンチパターンなどの詳細は、[Modern BEM コーディング規約 (Draft)](https://github.com/YoshinoriKanno/doc-modern-bem) を参照してください。以下は本テンプレート固有の補足です。

プレフィックス `p00000`（置換後は `p15403` など）は、サイト全体 CSS との衝突回避用です。Block 名の前に付けます。

| 種類         | 命名規則                         | 例                                           |
| ------------ | -------------------------------- | -------------------------------------------- |
| **Block**    | `p00000-{block}`                 | `p00000-box`, `p00000-section`               |
| **Element**  | Block 名 + `__` + 要素名         | `p00000-allergy__heading`                    |
| **Modifier** | Block / Element + `--` + 修飾    | `p00000-section--1`, `p00000-indent--11`     |
| **State**    | `is-*` または `data-*`（動的）   | `is-open`（必要時）                          |

### どこを編集するか

- **案件ごとの Block を追加・変更** → `blocks/` に `_block名.scss` を追加し、`style.scss` で読み込む
- **余白コンテナ・表示切替・フォント指定** → `layout/` を使う
- **共通 Block として再利用したい** → `blocks/` に切り出す（ファイル名 = Block 名）

> Block 同士を親から直接スタイリングしない（例: `.line-up .button { }` は不可）。配置用 Element（`__card-action` など）を Block 内に用意する。

### 主な Block / Layout クラス

| クラス | 用途 |
| ------ | ---- |
| `p00000-main` | 商品詳細ページのルート |
| `p00000-section` | セクション Block |
| `p00000-container` | 余白コンテナ（Layout） |
| `p00000-mt-4` / `p00000-mt-8` | 上余白ユーティリティ（Layout） |
| `p00000-box` | 白ボックス |
| `p00000-heading` | 共通見出し |
| `p00000-banner` / `p00000-banner__item` | バナー |
| `p00000-balloon` | 下向き三角付きのキャッチコピーバルーン |
| `p00000-line-up` | 商品ラインナップ |
| `p00000-item-label` | 医薬部外品などの商品区分ラベル |
| `p00000-item-spec` | 内容量・価格などの商品スペック（`dl` / `dt` / `dd`） |
| `p00000-item-spec--horizontal` | 上記の PC 横並び版（640px 以上で flex 横並び） |
| `p00000-item-spec__row--cell` | 横並び版の行（`--horizontal` と併用） |
| `p00000-item-spec__term--slash` | 項目名の後に `／` を表示（横並び版で使用） |
| `p00000-button` | 共通ボタン |
| `p00000-font-noto-serif-jp` など | フォント指定（Layout） |
| `p00000-hidden` / `pc:p00000-hidden` | 表示切替（Layout） |

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
2. [ ] `00000` → `XXXXX` を一括置換する（`p00000` も同時に `pXXXXX` になる）
3. [ ] フォルダ名・HTML ファイル名をリネームする
4. [ ] `.vscode` の Live Sass パスを必要に応じて更新する
5. [ ] Watch Sass を開始する
6. [ ] Live Server で `dist/*.html` を開く
7. [ ] `dist/*.html` と `src/styles/blocks/` を中心にコーディングする
8. [ ] 画像は `dist/images/`（または CDN パス）に配置する
9. [ ] 公開前に CSS のリンク先（ローカル / CDN）を確認する

---

## 6. マークアップの例

```html
<section class="p00000-section p00000-section--1">
  <div class="p00000-container">
    <div class="p00000-box">
      <h3 class="p00000-heading">見出し</h3>
      <p class="p00000-font-noto-serif-jp">明朝体のテキスト</p>
    </div>
  </div>
</section>
```

### ぶら下がりインデント（ご注意点など）

先頭記号（・ ※ ● など）を 1 文字分、番号付き（※1 ＊1 など）を 2 文字分ずらします。

```html
<p class="p00000-indent p00000-indent--11">※すべての菌を取り除くわけではありません。</p>
<p class="p00000-indent p00000-indent--07">・1日の摂取目安量を守ってください。</p>
<p class="p00000-indent p00000-indent--11">●乳幼児・小児の手の届かない所に置いてください。</p>
<p class="p00000-indent p00000-indent--22">※1 食物アレルギーの方は原材料名をご確認ください。</p>
<p class="p00000-indent p00000-indent--19">＊1 原材料の特性により色等が変化することがあります。</p>
```

| クラス | 用途 |
|--------|------|
| `p00000-indent` | ぶら下がりインデントのベース（必須） |
| `p00000-indent--07` | 0.7em（・ など） |
| `p00000-indent--10` | 1em |
| `p00000-indent--11` | 1.1em（※ ● など） |
| `p00000-indent--19` | 1.9em（＊1 など） |
| `p00000-indent--22` | 2.2em（※1 など） |

### 文中の上付き注釈（米印など）

```html
<p>除菌<sup class="p00000-sup">※</sup>し、新たなニオイの発生を防ぎます。</p>
<p class="p00000-indent p00000-indent--11">※すべての菌を取り除くわけではありません。</p>
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
