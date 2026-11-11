# PEACE BURGER — 本番サイト

本番URL: https://peace-burger.pages.dev/

Cloudflare Pages の `peace-burger` プロジェクトは、このリポジトリの `main` の更新を自動配信します。FrameworkはNone、ビルドコマンドなし、出力ディレクトリはルートです。

## 公開ファイル

- `index.html` / `styles.css` / `preview.js`: ページ・デザイン・動作
- `i18n.mjs`: 日本語・英語・韓国語・簡体字中国語
- `calendar-utils.mjs` / `food-films.mjs`: 営業カレンダー・動画
- `analytics.mjs`: 既存の電話・SNSクリック計測
- `assets/`: 画像・動画
- `_headers` / `robots.txt` / `sitemap.xml`: 公開・検索設定

## 更新

変更ファイルと参照素材を確認し、スマホ幅とPCで確認した後、必要なファイルだけcommit・pushします。GitHubのCloudflare Pagesチェックが成功したことと、本番URLの表示を確認してください。

制作資料・元動画・確認用サイト・バックアップは `リニューアル/` 内で管理し、公開リポジトリには追加しません。以前の `assets/img/` は既存の画像URLの互換性のため保持しています。

## 切り戻し

公開した変更commitを `git revert` し、`main` へpushします。Cloudflare Pagesの成功結果と本番の表示を確認してください。強制pushは不要です。
