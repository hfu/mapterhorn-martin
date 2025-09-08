# mapterhorn-martin

This repository is created with great respect for the Mapterhorn project and the X-24B (Flying Iron) experimental aircraft developed by Martin Company, as well as the [unvt/x-24b](https://github.com/unvt/x-24b) project.  
It implements a comprehensive 3D terrain visualization demo featuring terrain rendering and hillshade effects.

このリポジトリは、Mapterhorn プロジェクトと X-24B（Martin社開発の実験機、および [unvt/x-24b](https://github.com/unvt/x-24b) プロジェクト）へのリスペクトを込めて作成されました。  
三次元地形・陰影等の可視化デモを実装しています。

## 🏔️ Project Overview / プロジェクト概要

This project is a web-based 3D terrain visualization system utilizing Mapterhorn terrain tiles.

本プロジェクトは、Mapterhorn の地形タイルを活用した Web ベースの三次元地形可視化システムです。

- **Purpose / 目的**: Implement and demonstrate 3D terrain visualization and hillshade effects using Mapterhorn terrain tiles / Mapterhorn の地形タイルを用い、Web上で三次元地形表示・陰影表現などを実装・デモすること
- **Data Sources / データソース**: [tunnel.optgeo.org/martin/mapterhorn](https://tunnel.optgeo.org/martin/mapterhorn) (Terrarium) and [tunnel.optgeo.org/martin/gel](https://tunnel.optgeo.org/martin/gel) (Mapbox) / [tunnel.optgeo.org/martin/mapterhorn](https://tunnel.optgeo.org/martin/mapterhorn) (Terrarium) および [tunnel.optgeo.org/martin/gel](https://tunnel.optgeo.org/martin/gel) (Mapbox)
- **Key Technologies / 主な技術**: MapLibre GL JS, WebGL
- **Status / ステータス**: ✅ Implementation complete and operational / 実装完了・動作中

## 🚀 Technical Stack / 技術スタック

- **Rendering / レンダリング**: MapLibre GL JS v5.6.1 (WebGL)
- **Language / 言語**: JavaScript (ES Modules)
- **Data Formats / データ形式**: 
  - Terrain tiles / 地形タイル: Terrarium encoding (Mapterhorn), Mapbox encoding (Gel) / Terrarium エンコーディング (Mapterhorn)、Mapbox エンコーディング (Gel)
  - Base map / ベースマップ: Protomaps vector tiles / Protomaps ベクトルタイル

## 📁 Directory Structure / ディレクトリ構成

```
mapterhorn-martin/
├── docs/           # GitHub Pages content (implemented) / GitHub Pages のコンテンツ (実装済み)
│   ├── index.html  # Terrain visualization application / 地形可視化アプリケーション
│   ├── style.css   # Application styling / アプリケーションのスタイリング
│   └── style.json  # MapLibre style configuration / MapLibre スタイル設定
├── .github/        # GitHub Actions configuration / GitHub Actions 設定
├── LICENSE         # License file / ライセンスファイル
└── README.md       # This document / このドキュメント
```

## 🗺️ Data Sources / データソース

### Terrain Tiles / 地形タイル

1. **Mapterhorn (Recommended / 推奨)**
   - URL: `https://tunnel.optgeo.org/martin/mapterhorn`
   - Encoding / エンコーディング: Terrarium
   - Max zoom / 最大ズーム: 12
   - Tile size / タイルサイズ: 512px

2. **Gel (Alternative / 代替)**
   - URL: `https://tunnel.optgeo.org/martin/gel`  
   - Encoding / エンコーディング: Mapbox
   - Max zoom / 最大ズーム: 12
   - Tile size / タイルサイズ: 512px

### Base Map / ベースマップ

- **Protomaps**
  - URL: `https://tunnel.optgeo.org/martin/protomaps-basemap`
  - Format / 形式: Vector tiles / ベクトルタイル
  - Data / データ: OpenStreetMap-based / OpenStreetMap ベース

## 🌐 Features / 実装済み機能

✅ **Completed Features / 完成した機能:**

1. **3D Terrain Visualization / 3D地形可視化**: WebGL rendering with MapLibre GL JS / MapLibre GL JS による WebGL レンダリング
2. **Hillshade Effects / ヒルシェード効果**: Terrain shading for enhanced depth perception / 地形の陰影表現による立体感
3. **Interactive Controls / インタラクティブ制御**:
   - 3D terrain toggle / 3D地形表示/非表示切り替え
   - Hillshade effects toggle / ヒルシェード効果ON/OFF
   - Terrain data source switching (Mapterhorn/Gel) / 地形データソース切り替え (Mapterhorn/Gel)
4. **Feature Property Display / 地物プロパティ表示**: Detailed information display on click / クリックによる詳細情報表示

**Implementation Architecture / 実装アーキテクチャ:**
- Separated HTML/CSS structure / HTML/CSS 分離構成 (`docs/index.html` + `docs/style.css`)
- jsDelivr CDN-based dependency management / jsDelivr CDN ベースの依存関係管理（安定性向上）
- Responsive design support / レスポンシブデザイン対応

## 🏁 Getting Started / 使い方

### 🌐 Live Demo / ライブデモ

**Available on GitHub Pages / GitHub Pages で公開中**: [https://hfu.github.io/mapterhorn-martin/](https://hfu.github.io/mapterhorn-martin/)

### 💻 Local Development / ローカル実行

```bash
# Clone the repository / リポジトリをクローン
git clone https://github.com/hfu/mapterhorn-martin.git
cd mapterhorn-martin

# Serve locally / ローカルサーバーで表示
# Using Python / Python の場合
python -m http.server 8000
# Or using Node.js / または Node.js の場合
npx serve docs
```

Open your browser and navigate to `http://localhost:8000/docs` to view the terrain visualization demo.

ブラウザで `http://localhost:8000/docs` にアクセスして地形可視化デモをご覧ください。

### 🎮 Controls / 操作方法

- **Control Panel (top-left) / コントロールパネル（左上）**: Toggle various display options / 各種表示切り替え
- **Map Click / マップクリック**: Display detailed feature properties / 地物の詳細プロパティ表示
- **Mouse Operations / マウス操作**: 
  - Drag / ドラッグ: Pan / パン
  - Scroll / スクロール: Zoom / ズーム
  - Ctrl+Drag / Ctrl+ドラッグ: 3D view rotation (when terrain is enabled) / 3D視点回転（地形ON時）

## 🛠️ Development Guidelines / 開発ガイドライン

### Architecture / アーキテクチャ

- **Separated structure / 分離された構成**: HTML structure (`docs/index.html`) and styling (`docs/style.css`) separation / HTML構造 (`docs/index.html`) とスタイリング (`docs/style.css`) を分離
- **CDN dependencies / CDN 依存関係**: External libraries loaded via jsDelivr CDN / 外部ライブラリは jsDelivr CDN 経由で読み込み
- **Modular design / モジュラー設計**: JavaScript functions separated by functionality / 機能ごとに分離されたJavaScript関数
- **Responsive UI / レスポンシブ UI**: Desktop and mobile support / デスクトップ・モバイル対応

### Coding Style / コーディングスタイル

- Utilize JavaScript ES6+ features / JavaScript ES6+ 機能を活用
- File naming: lowercase + hyphen-separated (e.g., `terrain-viewer.js`) / ファイル命名は小文字 + ハイフン区切り（例: `terrain-viewer.js`）
- Indentation: 2 spaces / インデントは2スペース
- Use semicolons / セミコロン使用

### Branch Management / ブランチ運用

- Branch names: `feature/xxx`, `fix/yyy` etc. with clear purpose / ブランチ名は `feature/xxx`, `fix/yyy` など用途を分かりやすく
- Pull requests should include simple descriptions and screenshots / プルリクエストには簡単な説明文・スクリーンショットを付けること
- Issues should specify purpose: bug reports, feature requests, questions / Issue はバグ報告・機能要望・質問など用途明記の上で作成

### Testing & CI / テスト・CI

- **Current Status / 現在のステータス**: Manual testing completed, functionality verified / 手動テスト完了、機能動作確認済み
- **Future Plans / 将来の計画**: Jest/Playwright automated testing framework planned / Jest/Playwright等の自動テストフレームワーク導入予定
- **GitHub Actions**: Automated lint/build/test execution planned / Lint/ビルド/テストの自動実行設定予定

## 🔧 Troubleshooting / トラブルシューティング

### Other Issues / その他の問題

- **Terrain tiles not loading / 地形タイルが読み込まれない**: Data source may be temporarily unavailable / データソースが一時的に利用できない可能性があります
- **3D display is slow / 3D表示が重い**: Enable hardware acceleration in your browser / ブラウザのハードウェアアクセラレーションを有効にしてください
- **Not working on mobile / モバイルで動作しない**: Please use a WebGL-compatible browser / WebGL対応ブラウザをご利用ください

## 📜 License & Attribution / ライセンス・出典

### Code / コード
- The code in this repository is released under CC0 1.0 Universal License / 本リポジトリのコードは CC0 1.0 Universal ライセンスの下で公開されています
- See [LICENSE](./LICENSE) file for details / 詳細は [LICENSE](./LICENSE) ファイルをご確認ください

### Data / データ
- Terrain tile data is derived from the Mapterhorn project / 地形タイルデータは Mapterhorn プロジェクト由来です
- Data usage conditions comply with [Mapterhorn official terms](https://mapterhorn.com/data-access/) / データ利用条件は [Mapterhorn公式](https://mapterhorn.com/data-access/) に準拠してください

## 🙏 Credits & Acknowledgments / クレジット・謝辞

- **Mapterhorn Project**: Thank you for providing valuable terrain tile data / 貴重な地形タイルデータの提供に感謝いたします
- **X-24B (Flying Iron)**: An experimental aircraft developed by Martin Company that influenced Space Shuttle development. This repository name is derived from this heritage / Martin社開発の実験機で、スペースシャトル開発にも影響を与えました。本リポジトリ名はこれに由来します
- **unvt/x-24b**: We pay tribute to the [Martin tile server](https://github.com/unvt/x-24b) PMTiles hosting solution / [Martin tile server](https://github.com/unvt/x-24b) による PMTiles ホスティングソリューションに敬意を表します
- **MapLibre Martin**: Thank you for the contributions as a high-performance tile server / 高性能なタイルサーバーとしての MapLibre Martin の貢献に感謝いたします
- **MapLibre GL JS**: High-performance WebGL-based mapping library / WebGL ベースの高性能地図ライブラリ
- **Protomaps**: Providing open-source vector tiles / オープンソースベクトルタイルの提供
- **Open Community**: All developers and researchers contributing to terrain visualization technology / 地形可視化技術の発展に貢献するすべての開発者・研究者の皆様

## 🤝 Contributing / コントリビューション

Pull requests and issues are welcome! We look forward to ideas and improvement suggestions related to terrain visualization and 3D rendering.

プルリクエスト・Issue は歓迎です！  
地形可視化・三次元描画に関するアイデアや改善提案をお待ちしています。

---

*With respect to the Mapterhorn project, valuable terrain tile data, and the open community* 🏔️

*Mapterhorn プロジェクト、および貴重な地形タイルデータ、オープンコミュニティへの敬意を込めて* 🏔️