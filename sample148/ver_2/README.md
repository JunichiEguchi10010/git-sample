CSS Grid Layout CSSのグリッドエリアを使ったレイアウト（ヘッダー・サイドバー・メイン・フッター）20250811

✅ grid-template-areas
CSS Grid Layout の中でも特に「視覚的にわかりやすく」「柔軟に」レイアウトを定義できる方法です。
名前付き領域（area）を使って、HTML要素をグリッド上の特定の位置に配置することができます。

🎯 得意なレイアウトのタイプ
以下のようなレイアウトに特に向いています：

📰 1. ページ全体の構造的レイアウト
ヘッダー、ナビゲーション、メインコンテンツ、サイドバー、フッターなどを明確に分ける

css
grid-template-areas:
  "header header"
  "nav    main"
  "footer footer";

📦 2. ダッシュボードや管理画面
複数のウィジェットやパネルを整然と配置

css
grid-template-areas:
  "sidebar content"
  "sidebar stats";

📱 3. レスポンシブなレイアウト
メディアクエリと組み合わせて、画面サイズに応じて領域の配置を変更

css
@media (max-width: 600px) {
  grid-template-areas:
    "header"
    "main"
    "footer";
}

🧩 4. 複雑なグリッド構成でも可読性を保てる
grid-template-areas によって、コードの可読性が高まり、保守性も向上

✅ メリットまとめ
特徴	                        内容
👁️ 視覚的にわかりやすい     レイアウト構造が文字列で表現されるため、直感的
🧭 柔軟性が高い        　  領域の再配置が簡単で、レスポンシブ対応も楽
🛠️ 保守性が高い	        名前付き領域でコードが整理され、変更が容易