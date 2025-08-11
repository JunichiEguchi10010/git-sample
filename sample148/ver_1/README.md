CSS Grid Layout CSSのグリッドレイアウト 基本的な3カラムグリッド 20250811

🟨 CSS Grid Layout(グリッドレイアウト)について
 CSS のレイアウト技術の中でも「2次元（縦と横の両方）」のレイアウトを得意とする強力な仕組みです。
Flexbox が主に「1次元（横並び or 縦並び）」のレイアウトに最適化されているのに対し、Grid はページ全体の骨組みや複雑な配置を作るのに向いています。


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