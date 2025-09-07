# mapterhorn-martin

このリポジトリは、Mapterhorn プロジェクトと X-24B（Martin社開発の実験機、および [unvt/x-24b](https://github.com/unvt/x-24b) プロジェクト）へのリスペクトを込めて作成されました。  
三次元地形・陰影・等高線等の可視化デモを実装しています。

## 🏔️ プロジェクト概要

本プロジェクトは、Mapterhorn の地形タイルを活用した Web ベースの三次元地形可視化システムです。

- **目的**: Mapterhorn の地形タイルを用い、Web上で三次元地形表示・陰影表現・等高線描画などを実装・デモすること
- **データソース**: [tunnel.optgeo.org/martin/mapterhorn](https://tunnel.optgeo.org/martin/mapterhorn) (Terrarium) および [tunnel.optgeo.org/martin/gel](https://tunnel.optgeo.org/martin/gel) (Mapbox)
- **主な技術**: MapLibre GL JS, maplibre-contour, WebGL
- **ステータス**: ✅ 実装完了・動作中

## 🚀 技術スタック

- **レンダリング**: MapLibre GL JS v5.6.1 (WebGL)
- **地形処理**: maplibre-contour v0.1.0 (動的等高線生成)
- **言語**: JavaScript (ES Modules)
- **データ形式**: 
  - 地形タイル: Terrarium エンコーディング (Mapterhorn)
  - 地形タイル: Mapbox エンコーディング (Gel)
  - ベースマップ: Protomaps ベクトルタイル
- **最適化**: Web Workers による等高線計算の並列処理

## 📁 ディレクトリ構成

```
mapterhorn-martin/
├── docs/           # GitHub Pages のコンテンツ (実装済み)
│   ├── index.html  # 地形可視化アプリケーション (HTML構造)
│   └── style.css   # アプリケーションのスタイリング (CSS)
├── .github/        # GitHub Actions 設定
├── LICENSE         # ライセンスファイル
└── README.md       # このドキュメント
```

## 🗺️ データソース

### 地形タイル

1. **Mapterhorn (推奨)**
   - URL: `https://tunnel.optgeo.org/martin/mapterhorn`
   - エンコーディング: Terrarium
   - 最大ズーム: 12
   - サイズ: 512px

2. **Gel (代替)**
   - URL: `https://tunnel.optgeo.org/martin/gel`  
   - エンコーディング: Mapbox
   - 最大ズーム: 12
   - サイズ: 512px

### ベースマップ

- **Protomaps**
  - URL: `https://tunnel.optgeo.org/martin/protomaps-basemap`
  - 形式: ベクトルタイル
  - データ: OpenStreetMap ベース

## 🛠️ 開発ガイドライン

### 実装済みアーキテクチャ

- **分離された構成**: HTML構造 (`docs/index.html`) とスタイリング (`docs/style.css`) を分離
- **CDN 依存関係**: 外部ライブラリは jsDelivr CDN 経由で読み込み（unpkg.com から移行済み、fallback機構なし）
- **モジュラー設計**: 機能ごとに分離されたJavaScript関数
- **レスポンシブ UI**: デスクトップ・モバイル対応

### コーディングスタイル

- JavaScript ES6+ 機能を活用
- ファイル命名は小文字 + ハイフン区切り（例: `terrain-viewer.js`）
- インデントは2スペース
- セミコロン使用

### ブランチ運用

- ブランチ名は `feature/xxx`, `fix/yyy` など用途を分かりやすく
- プルリクエストには簡単な説明文・スクリーンショットを付けること
- Issue はバグ報告・機能要望・質問など用途明記の上で作成

## 🧪 テスト・CI

- **現在のステータス**: 手動テスト完了、機能動作確認済み
- **将来の計画**: Jest/Playwright等の自動テストフレームワーク導入予定
- **GitHub Actions**: Lint/ビルド/テストの自動実行設定予定

## 🌐 実装済み機能

✅ **完成した機能:**

1. **3D地形可視化**: MapLibre GL JS による WebGL レンダリング
2. **動的等高線生成**: maplibre-contour ライブラリによるリアルタイム等高線計算
3. **等高線ラベル**: 標高値の自動表示（メートル単位）
4. **ヒルシェード効果**: 地形の陰影表現による立体感
5. **インタラクティブ制御**:
   - 等高線表示/非表示切り替え
   - 等高線ラベル表示/非表示切り替え  
   - 3D地形表示/非表示切り替え
   - ヒルシェード効果ON/OFF
   - 地形データソース切り替え (Mapterhorn/Gel)
6. **地物プロパティ表示**: クリックによる詳細情報表示
7. **Web Worker最適化**: 等高線計算の並列処理によるパフォーマンス向上

**实装アーキテクチャ:**
- HTML/CSS 分離構成 (`docs/index.html` + `docs/style.css`)
- jsDelivr CDN ベースの依存関係管理（安定性向上、fallback機構なし）
- レスポンシブデザイン対応

## 🏁 Getting Started

### 🌐 ライブデモ

**GitHub Pages で公開中**: [https://hfu.github.io/mapterhorn-martin/](https://hfu.github.io/mapterhorn-martin/)

### 💻 ローカル実行

```bash
# リポジトリをクローン
git clone https://github.com/hfu/mapterhorn-martin.git
cd mapterhorn-martin

# ローカルサーバーで表示
# 例: Python の場合
python -m http.server 8000
# または Node.js の場合
npx serve docs
```

ブラウザで `http://localhost:8000/docs` にアクセスして地形可視化デモをご覧ください。

### 🎮 操作方法

- **左上のコントロールパネル**: 各種表示切り替え
- **マップクリック**: 地物の詳細プロパティ表示
- **マウス操作**: 
  - ドラッグ: パン
  - スクロール: ズーム
  - Ctrl+ドラッグ: 3D視点回転（地形ON時）

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
- **MapLibre GL JS**: WebGL ベースの高性能地図ライブラリ
- **maplibre-contour**: 動的等高線生成ライブラリの開発チーム
- **Protomaps**: オープンソースベクトルタイルの提供
- **オープンコミュニティ**: 地形可視化技術の発展に貢献するすべての開発者・研究者の皆様

## 🤝 コントリビューション

プルリクエスト・Issue は歓迎です！  
地形可視化・三次元描画に関するアイデアや改善提案をお待ちしています。

---

*Mapterhorn プロジェクト、および貴重な地形タイルデータ、オープンコミュニティへの敬意を込めて* 🏔️