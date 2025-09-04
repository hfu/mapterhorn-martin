# Copilot Instructions for mapterhorn-martin

このリポジトリは、Mapterhorn プロジェクトと X-24B（Martin社開発の実験機）へのリスペクトを込めて作成されました。  
三次元地形・陰影・等高線等の可視化デモを目指しています。  
地形タイルは [tunnel.optgeo.org/martin/mapterhorn](https://tunnel.optgeo.org/martin/mapterhorn) の TileJSON を利用しています。

---

## プロジェクト概要

- **目的**: Mapterhorn の地形タイルを用い、Web上で三次元地形表示・陰影表現・等高線描画などを実装・デモすること。
- **利用タイル**: [TileJSON](https://tunnel.optgeo.org/martin/mapterhorn)  
- **主な技術**: WebGL, JavaScript/TypeScript, Mapterhornライブラリ

---

## コーディング・開発ルール

- **言語・フレームワーク**  
  - JavaScript/TypeScript（ES Modules推奨）
  - フロントエンド: バニラJS

- **スタイルガイド**  
  - コーディングスタイルは[Prettier](https://prettier.io/)＋[ESLint](https://eslint.org/)を基本とする
  - ファイル命名は小文字＋ハイフン区切り（例: `terrain-viewer.js`）

- **ディレクトリ構成**  
  - `/docs` ... GitHub Pages のコンテンツ
  - `README.md` ... ドキュメント

---

## プルリクエスト・Issue運用

- ブランチ名は `feature/xxx`, `fix/yyy` など用途を分かりやすく
- プルリクエストには簡単な説明文・スクリーンショットを付けること
- Issueはバグ報告・機能要望・質問など用途明記の上で作成

---

## テスト・CI

- テストフレームワーク：Jest/Playwright等（随時導入予定）
- GitHub ActionsによりLint/ビルド/テストの自動実行を設定

---

## Copilot への指示

- Mapterhorn の地形タイルを活用する地形可視化・三次元描画に関するコード補完を優先的に提案してください
- UI部品やデータ取得部分も自動生成してよいですが、地形表現ロジック部分は既存仕様に合わせてください
- READMEやライセンスファイル等、ルートの重要ファイルは事前に確認の上で自動編集してください
- ドキュメントの自動生成時は、地形タイルの出典・クレジット（MapterhornおよびMartin/X-24Bへのリスペクト）を記載してください

---

## 実装イメージ

1. https://github.com/hfu/autopilot と同様、docs/index.html シングルファイルでウェブサイトを作ります
2. 標高タイルの使用方法は https://github.com/hfu/glob と同じですが、参照するデータが https://tunnel.optgeo.org/martin/mapterhorn に変わります

---

## ライセンス・出典

- 本リポジトリのコードは MIT ライセンスとします
- 地形タイルデータは Mapterhorn プロジェクト由来です。データ利用条件は[Mapterhorn公式](https://mapterhorn.com/data-access/)に準拠してください

---

## その他

- X-24B（フライングアイロン）は Martin社開発の実験機で、スペースシャトル開発にも影響を与えました。本リポジトリ名はこれに由来します
- Mapterhorn プロジェクト、および貴重な地形タイルデータ、オープンコミュニティへの敬意を忘れずに！

---
