# mapterhorn-martin

このリポジトリは、Mapterhorn プロジェクトと X-24B（Martin社開発の実験機、および [unvt/x-24b](https://github.com/unvt/x-24b) プロジェクト）へのリスペクトを込めて作成されました。  
三次元地形・陰影・等高線等の可視化デモを目指しています。

## 🏔️ プロジェクト概要

本プロジェクトは、Mapterhorn の地形タイルを活用した Web ベースの三次元地形可視化システムです。

- **目的**: Mapterhorn の地形タイルを用い、Web上で三次元地形表示・陰影表現・等高線描画などを実装・デモすること
- **データソース**: [tunnel.optgeo.org/martin/mapterhorn](https://tunnel.optgeo.org/martin/mapterhorn) の TileJSON
- **主な技術**: WebGL, JavaScript/TypeScript, Mapterhornライブラリ

## 🚀 技術スタック

- **言語**: JavaScript/TypeScript（ES Modules推奨）
- **フロントエンド**: バニラJS
- **レンダリング**: WebGL
- **データ形式**: 地形タイル（TileJSON）

## 📁 ディレクトリ構成

```
mapterhorn-martin/
├── docs/           # GitHub Pages のコンテンツ
├── .github/        # GitHub Actions 設定
├── LICENSE         # ライセンスファイル
└── README.md       # このドキュメント
```

## 🛠️ 開発ガイドライン

### コーディングスタイル

- コーディングスタイルは [Prettier](https://prettier.io/) + [ESLint](https://eslint.org/) を基本とする
- ファイル命名は小文字 + ハイフン区切り（例: `terrain-viewer.js`）
- ES Modules を推奨

### ブランチ運用

- ブランチ名は `feature/xxx`, `fix/yyy` など用途を分かりやすく
- プルリクエストには簡単な説明文・スクリーンショットを付けること
- Issue はバグ報告・機能要望・質問など用途明記の上で作成

## 🧪 テスト・CI

- テストフレームワーク：Jest/Playwright等（随時導入予定）
- GitHub Actions により Lint/ビルド/テストの自動実行を設定

## 🌐 実装イメージ

1. [autopilot](https://github.com/hfu/autopilot) と同様、`docs/index.html` シングルファイルでウェブサイトを作成
2. 標高タイルの使用方法は [glob](https://github.com/hfu/glob) と同じですが、参照するデータが [tunnel.optgeo.org/martin/mapterhorn](https://tunnel.optgeo.org/martin/mapterhorn) に変更

## 🏁 Getting Started

```bash
# リポジトリをクローン
git clone https://github.com/hfu/mapterhorn-martin.git
cd mapterhorn-martin

# ローカルサーバーで表示（docs/index.html が完成後）
# 例: Python の場合
python -m http.server 8000
# または Node.js の場合
npx serve docs
```

ブラウザで `http://localhost:8000/docs` にアクセスして地形可視化デモをご覧ください。

## 📜 ライセンス・出典

### コード
- 本リポジトリのコードは CC0 1.0 Universal ライセンスの下で公開されています
- 詳細は [LICENSE](./LICENSE) ファイルをご確認ください

### データ
- 地形タイルデータは Mapterhorn プロジェクト由来です
- データ利用条件は [Mapterhorn公式](https://mapterhorn.com/data-access/) に準拠してください

## 🙏 クレジット・謝辞

- **Mapterhorn プロジェクト**: 貴重な地形タイルデータの提供に感謝いたします
- **X-24B (Flying Iron)**: Martin社開発の実験機で、スペースシャトル開発にも影響を与えました。本リポジトリ名はこれに由来します
- **unvt/x-24b**: [Martin tile server](https://github.com/unvt/x-24b) による PMTiles ホスティングソリューションに敬意を表します
- **MapLibre Martin**: 高性能なタイルサーバーとしての MapLibre Martin の貢献に感謝いたします
- **オープンコミュニティ**: 地形可視化技術の発展に貢献するすべての開発者・研究者の皆様

## 🤝 コントリビューション

プルリクエスト・Issue は歓迎です！  
地形可視化・三次元描画に関するアイデアや改善提案をお待ちしています。

---

*Mapterhorn プロジェクト、および貴重な地形タイルデータ、オープンコミュニティへの敬意を込めて* 🏔️