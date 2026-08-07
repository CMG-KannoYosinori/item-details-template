# Install

```shell
yarn
```

# Start

```shell
# yarn parcel src/index.html
yarn parcel src/15403.html
```

ソースマップが不要なときは

```shell
yarn parcel src/15403.html --no-source-maps
yarn parcel src/15403.html src/15403.html --no-source-maps
```

# 開発手順

コーディング時は、 npm run watch

コーディング終了後は、watch をと止めて

npm run build

最後に npm run foromat

# purge css

下記のように html , css をセットする

```
.
├── styles
│   └── style.css
└── test.html
```

```
npm run postcss
```

./dist/styles/ に結果が書き出される

# 文字化け対策

®
