# 読み上げアプリ(仮)
# Feature
動画編集などでも使える最低限の機能を備えた読み上げWEBアプリです。
音声合成の部分には、VOICEVOXのAPIを使用しています。

Windows11、MacOS Ventura 13.1、ColorOS V12のGoogle Chromeで動作確認済みです。

サンプルのプロジェクト、CSVファイルは
/export.json /sample.csv からダウンロードできます。

# Installation
```:bash
npm install
```

.env.local を作成して
```:env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
```
を記載します。

```:bash
npm run dev
```

で起動します。