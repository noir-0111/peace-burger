# PEACE BURGER LP — デプロイ用フォルダ

このフォルダは Cloudflare Pages へのデプロイ用にクリーンアップされた本番用ファイル一式です。

## 含まれるもの

| ファイル / フォルダ | 説明 |
|---|---|
| `index.html` | メインの HTML ファイル |
| `styles.css` | スタイルシート |
| `main.js` | JavaScript（タイプライター、アニメ等） |
| `assets/img/` | 画像素材（28MB） |
| `_headers` | Cloudflare Pages の HTTP ヘッダー設定（キャッシュ・セキュリティ） |
| `robots.txt` | 検索エンジンクローラー向け設定 |

## デプロイ方法

### 方法 A：ドラッグ&ドロップ（一番簡単）
1. [Cloudflare ダッシュボード](https://dash.cloudflare.com/) にログイン
2. **Workers & Pages** → **Create application** → **Pages** タブ → **Upload assets**
3. プロジェクト名を入力（例：`peace-burger`）
4. **このフォルダ全体** をドラッグ&ドロップ
5. **Deploy site** ボタン
6. 数分で完了 → `https://peace-burger.pages.dev` で公開

### 方法 B：Wrangler CLI
```bash
cd /Users/kotaro/Desktop/peace-burger-dist
wrangler pages deploy . --project-name=peace-burger
```

詳しい解説は親フォルダの `ANIMATION_PLAYBOOK.md` や、デプロイガイドの会話履歴を参照。

## 更新方法

サイトを更新したら：
1. 元の作業フォルダ（`peace-burger-imagesのコピー`）で編集
2. 変更したファイルだけ、このフォルダ（`peace-burger-dist`）にも反映
3. 再度 Cloudflare にアップロード

または、後述の同期スクリプトを使う：

```bash
# 例：作業フォルダから dist にファイルだけ更新
SRC="/Users/kotaro/Desktop/peace-burger-imagesのコピー"
DIST="/Users/kotaro/Desktop/peace-burger-dist"
cp "$SRC/index.html" "$SRC/styles.css" "$SRC/main.js" "$DIST/"
rsync -a --delete "$SRC/assets/img/" "$DIST/assets/img/"
find "$DIST" -name ".DS_Store" -delete
```

## 容量
合計：約 28 MB（うち 28MB は画像。Cloudflare Pages の無料枠は 25MB/ファイル、無制限/合計）

## 含めなかったもの（社内資料・バックアップ等）
- `ANIMATION_PLAYBOOK.md`
- `FIGMA_TO_CODE_PLAYBOOK.md`
- `CLAUDE.md`
- `MAPPING.md`
- `_animation-toolkit/`
- `_backup_旧実装/`
- `素材_原本/`
- `assets/figma/`（HTML/CSS で参照なし）

　
