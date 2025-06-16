html css display: flex; フレックスボックス 20250616

✅ フレックスボックスとは？ display: flex;

● 基本の考え方
🟦要素を柔軟に・簡単に並べるためのレイアウト方法。

🟦横並びや縦並び、間隔調整、中央寄せなどをCSSだけで簡潔に実現できる。

🟦親要素に display: flex; を指定 → 子要素に影響。

◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻

① 親要素（フレックスコンテナ）のプロパティ

🟦display: flex;
要素を フレックスボックスにする宣言。

🟦flex-direction（並べる方向）
値	                意味
row	            横並び（左→右）※初期値
row-reverse	    横並び（右→左）
column	        縦並び（上→下）
column-reverse	縦並び（下→上）

🟦justify-content（主軸方向の整列）
※「主軸」は flex-direction によって変わる

値	                意味
flex-start	    左寄せ／上寄せ
flex-end	    右寄せ／下寄せ
center	        中央揃え
space-between	両端に寄せて、間を均等
space-around	周りの余白を均等
space-evenly	全体の間隔を完全に均等

【CSS】justify-contentプロパティの使い方と実装例を解説！！
https://webukatu.com/wordpress/blog/18110/

🟦align-items（交差軸の整列）
値	                意味
stretch	        高さを自動で親に合わせて伸ばす（初期）
flex-start	    上寄せ or 左寄せ（交差軸の先頭）
flex-end	    下寄せ or 右寄せ
center	        中央寄せ
baseline	    テキストのベースラインで揃える

🟦flex-wrap（折り返し）
🟥親要素）に設定するプロパティで、子要素（flexアイテム）が一列で並びきれない場合にどうするかを指定します。
値	                意味
nowrap	        折り返さず1行に並ぶ（初期）🟥カラム落ち対策はこれを選択
wrap	        幅が足りなければ折り返す
wrap-reverse	上から下じゃなく下から上に


🟦gap（子要素間の間隔）
css
display: flex;
gap: 20px; /* 子要素の間隔を指定できる */

◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻

② 子要素（フレックスアイテム）のプロパティ

🟦flex（ショートハンド）
🟥この flex は、子要素（flexアイテム） に対して指定するもので、親要素に指定する値は設定出来ません。
css
flex: <grow> <shrink> <basis>;

例：
css
flex: 1; /* flex: 1 1 0 の省略 */

🟦flex-grow（余ったスペースをどれだけ広げるか）
数値で指定（0なら伸びない）
他のアイテムと比率で拡張される

🟦flex-shrink（スペース不足時に縮む割合）
0にすると縮まない

🟦flex-basis（初期サイズ）
例：flex-basis: 200px;
autoなら内容に応じて、0なら比率だけで決定

🟦align-self（個別に縦方向揃え）
値	                    意味
auto	            親の align-items に従う
flex-start	        上寄せ（交差軸の先頭）
flex-end	        下寄せ
center	            中央
stretch	            親に合わせて高さを伸ばす

③ よくあるレイアウト例（実用）
🟦横並び・中央揃え
css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

🟦サイドバー + メインエリア
css
.container {
  display: flex;
}

.sidebar {
  flex: 0 0 200px; /* 固定幅 */
}

.main {
  flex: 1; /* 残りを全部使う */
}

🟦子要素を均等に並べる（ボタンなど）
css
.button {
  flex: 1; /* すべてのボタンが均等に伸びる */
}

④ よくある誤解と注意点
誤解	                                        実際は…
flex: 1 は「幅100%」	                    余白を比率で分けるだけ
align-items: center は上下中央	            主軸が横なら縦方向だけ中央
justify-content: center で縦中央	        主軸が横なので横だけ中央
width を指定してると flex-grow が効かない	  flex-basis との優先順位に注意

✅ まとめ早見表
プロパティ	                    役割	            よく使う値
display	Flex指定	            flex
flex-direction	            並べ方の方向	        row column
justify-content	            主軸の揃え方	        center space-between
align-items	                交差軸の揃え方	        center stretch
flex-wrap	                折り返し	            wrap
flex	                    伸縮設定	            1 0 0 auto

◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻


🟦主軸、交差軸について
✅ 主軸（Main Axis）と交差軸（Cross Axis）とは？
row:列 column:行

用語	意味
主軸	子要素が並ぶ方向（＝横か縦）
交差軸	主軸と垂直の方向（＝縦か横）

✅ 主軸と交差軸の向きは、flex-direction によって変わる！
flex-direction の値	            主軸の方向	            交差軸の方向	            並び方
row（初期値）	                横（左→右）	            縦（上→下）	                子要素が横に並ぶ
row-reverse	                   横（右→左）	           縦（上→下）	               子要素が右から左に並ぶ
column	                       縦（上→下）	           横（左→右）	               子要素が縦に並ぶ
column-reverse	               縦（下→上）	           横（左→右）	               子要素が下から上に並ぶ


✅ 主軸と交差軸に関係するプロパティ
プロパティ名	            軸の種類	            働き
justify-content	            主軸	        子要素の**並べ方（左寄せ・中央・間隔など）**を調整
align-items	                交差軸	        子要素の**縦位置（中央揃えや伸ばし）**などを調整
align-self	                交差軸	        各子要素ごとの縦方向の揃え方
align-content	            交差軸	        複数行あるときの全体的な縦揃え（ラップ時）

📌 図でイメージ（テキスト版）
flex-direction: row の場合（横並び）※デフォルト
css
← 主軸 →
[ Box1 ][ Box2 ][ Box3 ]

↑
交差軸（縦方向）
↓

flex-direction: column の場合（縦並び）
css
↑ 主軸 ↑
[ Box1 ]
[ Box2 ]
[ Box3 ]
↓ 主軸 ↓

← 交差軸（横方向） →

✅ 実例で確認
例1：横並び＆中央に寄せたいとき
css
.container {
  display: flex;
  flex-direction: row;            /* 横方向が主軸 */
  justify-content: center;        /* 主軸（横）で中央寄せ */
  align-items: center;            /* 交差軸（縦）で中央寄せ */
}
例2：縦並び＆左寄せにしたいとき
css
.container {
  display: flex;
  flex-direction: column;         /* 縦方向が主軸 */
  justify-content: flex-start;    /* 主軸（縦）で上寄せ */
  align-items: flex-start;        /* 交差軸（横）で左寄せ */
}
✅ まとめ
キーワード	                覚え方
主軸（main axis）	    要素が並ぶ方向
交差軸（cross axis）	主軸と直角の方向
justify-content	       主軸方向に並べる
align-items	           交差軸方向に揃える


◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻

✅ gapについて
定義：
gap は 子要素同士の間の「すき間（スペース）」を設定するプロパティです。
本来は CSS Grid のために登場しましたが、現在は Flexbox でも使えます。

✅ 基本構文
css
.container {
  display: flex; /* または display: grid; */
  gap: 20px;     /* 子要素の間を縦横20px空ける */
}
✅ 使いどころ（Flexbox）
html
<div class="container">
  <div>Box 1</div>
  <div>Box 2</div>
  <div>Box 3</div>
</div>
css
.container {
  display: flex;
  gap: 20px;
}
💡結果：
各ボックスの間だけに 20px の余白が入ります。
ボックス外の余白は変わりません。

✅ gapの応用：2つの値で縦横を指定
css
.container {
  display: flex;
  flex-direction: column;
  gap: 10px 20px;  /* 縦方向10px・横方向20px */
}
🟦1つ目の値 → 縦方向の間隔（row-gap）

🟦2つ目の値 → 横方向の間隔（column-gap）

※ 横並び（row方向）なら、2つ目の値だけが有効

✅ よくある誤解
誤解	                    正しい理解
marginと同じ？	        marginは外側に空白を作る。gapは中の要素間に統一して空ける。
Flexboxには使えない？	使えます（現在は主要ブラウザすべて対応）

✅ gapに使える単位（主なもの）
単位	             例	                            解説
px	            gap: 16px;	                ピクセル指定。定番。
rem	            gap: 1rem;	                ルートの文字サイズ（例：16px）を基準に可変。
%	            gap: 5%;	                親要素の幅に対する割合。レスポンシブに便利。
vw	            gap: 2vw;	                画面の幅の2%。
clamp()	        gap: clamp(8px, 2vw, 24px);	レスポンシブ + 最小・最大制限付きで柔軟指定

✅ gap を使うメリット
✅ コードがすっきり：要素ごとに margin を調整する必要がない
✅ 均等で一貫したスペースを確保できる
✅ レスポンシブ対応がしやすい（vw, rem, clampなど）

✅ まとめ
ポイント	        内容
目的	       子要素同士の間隔を設定するためのプロパティ
主な使い方	    display: flex or grid と一緒に使う
対応ブラウザ	全主要ブラウザ（Flexbox対応は2020年以降）
単位の柔軟性	px, rem, %, vw, clamp() など多様な単位を使用可能

✅ gap に使える主な単位
単位	例	意味・特徴
px	gap: 20px;	絶対的な長さ（ピクセル）で指定。よく使われる。
%	gap: 5%;	親要素のサイズに対する割合。レスポンシブ対応に便利。
em	gap: 2em;	親（または自身）のフォントサイズ基準の長さ。
rem	gap: 1rem;	ルート要素（html）のフォントサイズ基準の長さ。
vw	gap: 2vw;	ビューポート幅の2%（画面幅に応じて可変）
vh	gap: 2vh;	ビューポート高さの2%（縦に対して可変）
clamp()	gap: clamp(8px, 2vw, 24px);	最小・最大・中間の3値を組み合わせて柔軟に指定可能

✅ 使用例（px 以外）
css
コピーする
編集する
.container {
  display: flex;
  gap: 1.5rem;  /* html の font-size（通常16px）× 1.5 = 24px */
}

.container {
  display: flex;
  gap: 5%;      /* 親要素の幅の5%の隙間 */
}

.container {
  display: flex;
  gap: clamp(10px, 2vw, 30px);  /* 最小10px、最大30px、通常は画面幅の2% */
}
✅ 注意点
gap は Flexbox（横・縦）でも Grid でも使えます（以前は Grid 専用でした）。

% を使うと、親要素のサイズによって変わるので、思わぬ結果になることがあります。

em や rem は、テキストサイズに連動させたいときに便利です。

🔍 まとめ
用途	おすすめ単位
固定のスペースが欲しい場合	px
テキストに応じて調整したい場合	em / rem
画面サイズに応じて柔軟にしたい	% / vw / clamp()


◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻


✅🔍 flex-wrapとは？
Flexboxコンテナ（親要素）に設定するプロパティで、子要素（flexアイテム）が一列で並びきれない場合にどうするかを指定します。

css
.container {
  display: flex;
  flex-wrap: nowrap; /* これがデフォルト */
}
📌 nowrapの意味（デフォルト設定）

子要素を1行（または1列）に詰め込む
画面幅が足りなくても折り返さない
子要素がはみ出してしまうこともある（＝横スクロールになることも）

✅ メリット
「落ちない」＝無理やりでも横一列に並ぶ（＝カラム落ちしない）
特にカラムレイアウトやナビゲーションバーなど横並びを必ず保ちたい場合に有効

❗ デメリット
画面が狭いと横スクロールバーが出る可能性あり
要素同士が重なったり、見切れたりすることもある

💡 例（違いを比較）
flex-wrap: nowrap;（折り返さない）
html
<div style="display: flex; flex-wrap: nowrap;">
  <div style="width: 400px;">Box 1</div>
  <div style="width: 400px;">Box 2</div>
  <div style="width: 400px;">Box 3</div>
</div>
➡︎ 画面幅が狭くても 1行に並び続ける。はみ出しても折り返さない。

flex-wrap: wrap;（折り返す）
html
<div style="display: flex; flex-wrap: wrap;">
  <div style="width: 400px;">Box 1</div>
  <div style="width: 400px;">Box 2</div>
  <div style="width: 400px;">Box 3</div>
</div>
➡︎ 画面が狭くなると自動的に折り返して縦に積む。これが「カラム落ち」です。


✅ 結論（いつ使う？）
使用シーン	                       flex-wrap の設定
横並びを維持したい場合	         nowrap（カラム落ち防止）
スマホで縦並びにしたい場合	      wrap + メディアクエリで切替
レイアウトが崩れるのを防ぎたい  	wrap にして要素幅調整

🔁 実務
デスクトップで flex-wrap: nowrap;
スマホ画面では @media で flex-direction: column; に切り替える


◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻◻


フレックスボックスの基本概念
https://developer.mozilla.org/ja/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox