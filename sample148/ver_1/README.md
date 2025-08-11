CSS Grid Layout CSSのグリッドレイアウト 基本的な3カラムグリッド 20250811

grid-template MDN公式
https://developer.mozilla.org/ja/docs/Web/CSS/grid-template

🟨 CSS Grid Layout(グリッドレイアウト)について
 CSS のレイアウト技術の中でも「2次元（縦と横の両方）」のレイアウトを得意とする強力な仕組みです。
Flexbox が主に「1次元（横並び or 縦並び）」のレイアウトに最適化されているのに対し、Grid はページ全体の骨組みや複雑な配置を作るのに向いています。

******************************************************************************************

1. 基本の考え方
CSS Grid では、親要素（Grid コンテナ） と 子要素（Grid アイテム） という2つの概念があります。

css
.grid-container { display: grid; }
.grid-item { ... }

✅ Grid コンテナ
display: grid または display: inline-grid を指定した要素。中の子要素はすべて Grid アイテムになります。

✅ Grid アイテム
コンテナの直下の子要素。行（row）と列（column）に沿って配置されます。

2. 列と行の定義
列（columns）
css
.grid-container {
  display: grid;
  grid-template-columns: 100px 200px auto;
}
100px → 1列目の幅

200px → 2列目の幅

auto → 残りの幅を自動

行（rows）
css
.grid-container {
  grid-template-rows: 50px 100px auto;
}

3. 繰り返し構文
repeat() を使えば同じサイズの列や行を簡単に書けます。

css
grid-template-columns: repeat(3, 1fr);
/* 1fr（fraction 単位）は余白を等分する単位 */

4. ギャップ（間隔）
css
grid-gap: 10px; /* 古い書き方 */
gap: 10px;      /* 新しい推奨書き方 */
列間（column-gap）と行間（row-gap）を一括指定できます。

5. アイテムの配置
グリッドの位置を指定
(.item1 は Grid コンテナ直下の特定の Grid アイテム に付けた任意のクラス名)
css
.item1 {
  grid-column: 1 / 3; /* 1列目から3列目の手前まで → 2列分 */
  grid-row: 1 / 2;    /* 1行目だけ */
}
grid-column → 列の開始ライン / 終了ライン

grid-row → 行の開始ライン / 終了ライン

6. 自動配置
Grid は「空いている場所」に自動でアイテムを流し込みます。
grid-auto-flow で流れ方を制御できます。

css
grid-auto-flow: row;    /* デフォルト：行ごとに並べる */
grid-auto-flow: column; /* 列ごとに並べる */
grid-auto-flow: dense;  /* 隙間を詰める（dense オプション） */

7. アラインメント
Grid 全体やアイテムの位置を揃えることができます。

コンテナ全体に対して
css
justify-items: center; /* 横方向の揃え方 */
align-items: center;   /* 縦方向の揃え方 */

8. 個別アイテムに対して
css
.item1 {
  justify-self: end;
  align-self: start;
}
9. 実用例（レスポンシブ対応）
html
コピーする
編集する
<div class="grid-container">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.grid-container > div {
  background: lightblue;
  padding: 20px;
}
auto-fit と minmax() を使うと、画面幅に応じて列数が自動調整されます。

9. Flexbox との使い分け
Flexbox → 主に1次元のレイアウト（ナビバー、ボタン並び）
Grid → 2次元のレイアウト（ページ全体の構造、ダッシュボード、カード一覧）

******************************************************************************************

🧱 Gridコンテナ用プロパティ
これらは display: grid または display: inline-grid を指定した要素に使います。

プロパティ名	                説明
grid-template-columns	列のサイズと数を定義
grid-template-rows	    行のサイズと数を定義
grid-template-areas	    名前付き領域によるレイアウト定義
grid-template	        上記3つをまとめて定義
grid-auto-columns	    暗黙的に生成される列のサイズ
grid-auto-rows	        暗黙的に生成される行のサイズ
grid-auto-flow	        アイテムの自動配置の方向と挙動（row, column, dense）
grid	                グリッド全体のショートハンド（grid-template + grid-auto-flow など）
column-gap / row-gap	列・行の間隔（旧：grid-column-gap, grid-row-gap）
gap	                    row-gap と column-gap のショートハンド
justify-items	        各アイテムの水平方向の配置（コンテナ全体に対して）
align-items	            各アイテムの垂直方向の配置（コンテナ全体に対して）
place-items	            justify-items と align-items のショートハンド
justify-content	        グリッド全体の水平方向の配置
align-content	        グリッド全体の垂直方向の配置
place-content	        justify-content と align-content のショートハンド

📦 Gridアイテム用プロパティ
これらは Gridコンテナの子要素（Gridアイテム）に使います。

プロパティ名	                説明
grid-column-start	    アイテムの開始列
grid-column-end	        アイテムの終了列
grid-row-start	        アイテムの開始行
grid-row-end	        アイテムの終了行
grid-column	            grid-column-start と grid-column-end のショートハンド
grid-row	            grid-row-start と grid-row-end のショートハンド
grid-area	            名前付き領域にアイテムを配置、または row-start / column-start / row-end / column-end をまとめて指定
justify-self	        アイテムの水平方向の配置（自身に対して）
align-self	            アイテムの垂直方向の配置（自身に対して）
place-self	            justify-self と align-self のショートハンド

✅ 補足
grid-template-areas と grid-area を組み合わせると、視覚的にわかりやすいレイアウトが可能になります。
auto や fr 単位、minmax()、repeat() などの関数もGridの定義に使えます。
******************************************************************************************

✅ repeat()
grid-template-columns: repeat
CSS Grid Layout において 列のサイズを繰り返し指定するための関数です。
以下に、repeat() の使い方とその意味をわかりやすく解説します。

🧩 repeat() の基本構文
css
grid-template-columns: repeat(<回数>, <サイズ>);
🟥 repeat()関数が付いていると必ず , で区切られる。
通常(repeat()関数なし)の場合の値は●●　●●　●●　と , ()で区切られていないので混同しないこと。
例：  grid-template-rows: 50px 100px auto; ← , ()で区切られていない

第1引数：繰り返す回数（整数）

第2引数：繰り返すサイズ（1つまたは複数）

✅ 例と意味
① 均等な列を繰り返す
css
grid-template-columns: repeat(3, 1fr);
→ 1fr 1fr 1fr（3列、均等な幅）

② 複数サイズのパターンを繰り返す
css
grid-template-columns: repeat(2, 100px 1fr);
→ 100px 1fr 100px 1fr（2回繰り返し、合計4列）

💡 応用：レスポンシブ対応
css
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
→ コンテナの幅に応じて、200px以上の列を自動で並べる。画面サイズに応じて列数が変化。

🛑 注意点
repeat(1fr 2fr) のように、回数の指定がない repeat() は構文エラーになります。
repeat() は 関数なので、括弧 () は引数を囲むためのものです。


******************************************************************************************

❓ .grid-container { display: grid; } display: grid;を指定したにも関わらす、grid-template-columnsやgapなどの専用プロパティを指定しなかったり、gridアイテムにも専用プロパティを使用しない場合はどういう挙動になりますか？

→display: grid; を指定しただけで、grid-template-columns や gap などの専用プロパティを指定しない場合、CSS Gridは初期状態のレイアウトで動作します。以下にその挙動を詳しく説明します。

🧱 Gridコンテナの初期挙動
grid-template-columns や grid-template-rows を指定しない場合：
暗黙的な1列レイアウトになります。
すべての子要素（gridアイテム）は縦に並びます（つまり、1列に1つずつ配置される）。

gap を指定しない場合：
アイテム間の隙間はゼロになります。つまり、アイテム同士がぴったりくっつきます。

📦 Gridアイテムの挙動
Gridアイテムに grid-column や grid-row などの専用プロパティを指定しない場合：
アイテムは自動的に順番に配置されます。
1列レイアウトの場合、上から下へ並びます。
アイテムのサイズは、内容に応じて自動調整されます（auto）。

🧪 例
html
<style>
.grid-container {
  display: grid;
  border: 1px solid black;
}
.grid-item {
  border: 1px solid red;
}
</style>

<div class="grid-container">
  <div class="grid-item">Item 1</div>
  <div class="grid-item">Item 2</div>
  <div class="grid-item">Item 3</div>
</div>
この場合、以下のような挙動になります：
grid-container は1列のグリッドとして機能。
grid-item は縦に並ぶ。
隙間はなし。
各アイテムの幅は親要素に合わせて広がる（ただし内容に応じて変化する可能性あり）。

✅ 補足
Gridの強みは、grid-template-columns や grid-template-rows を使って明示的なレイアウトを定義できる点です。
何も指定しないと、Gridの恩恵はほとんど受けられず、ほぼ通常のブロックレイアウトと同じような見た目になります。


******************************************************************************************


✅ ホームページ制作でよく使われる grid-template-columns のパターン
CSS Grid は、レスポンシブで柔軟なレイアウトを作るのに最適です。以下はよく使われるパターンです：

🧩 1. 均等な3列レイアウト
css
grid-template-columns: repeat(3, 1fr);
→ 商品一覧、カード型レイアウト、ブログ記事一覧などに使われる

🧩 2. サイドバー + メインコンテンツ
css
grid-template-columns: 250px 1fr;
→ 左に固定幅のサイドバー、右に可変のメインコンテンツ

🧩 3. ヘッダー・フッター以外を3分割
css
grid-template-columns: 1fr 2fr 1fr;
→ 中央にメイン、左右に補助情報や広告など

🧩 4. レスポンシブ対応（自動折り返し）
css
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
→ 画面サイズに応じて列数が変わる。ギャラリーやカード型レイアウトに最適。

🧩 5. 固定 + 可変 + 固定
css
grid-template-columns: 100px 1fr 100px;
→ 両端に固定幅のナビゲーションや広告、中央にメインコンテンツ



******************************************************************************************

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