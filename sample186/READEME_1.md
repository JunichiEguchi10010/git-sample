querySelectorAll getElementsByClassName getElementsById 比較 20251217

querySelectorAll と getElementsByClassName は「マジで別物」
結論（最重要）

見た目が配列っぽいだけで、中身は全く違う

取得方法	             返り値	            forEach 	   map	    特徴
配列（Array）	        Array	            ✅	        ✅	    本物の配列
querySelectorAll	    NodeList	        ✅	        ❌	    静的・配列ではない
getElementsByClassName	HTMLCollection	    ❌	        ❌	    配列風オブジェクト

① querySelectorAll の正体
const nodes = document.querySelectorAll('.card');

✔ 返り値
NodeList（静的）
配列ではない

✔ できること
nodes.forEach(node => {
  node.classList.add('active');
});

❌ できないこと
nodes.map(...) // エラー

補足

静的（Static）
→ DOMが変わっても中身は自動更新されない

forEach は NodeList専用に実装されている

② getElementsByClassName の正体
const cards = document.getElementsByClassName('card');

✔ 返り値

HTMLCollection（配列風オブジェクト）

生きている（Live）

❌ できないこと
cards.forEach(...) // エラー
cards.map(...)     // エラー

✔ できること🔴（for...of）
for (const card of cards) {
  card.classList.add('active');
}

補足

Live
→ DOMが変わると自動で中身も変わる

forEach を「持っていない」だけ

③ NodeList は配列じゃない

公式仕様より：
NodeList は Array とは異なりますが、
forEach メソッドで処理を反復適用することは可能です。

つまり：
❌ Array ではない
⭕ 一部の配列っぽい機能だけ持っている

④ 「配列のように扱えるもの」3種類まとめ
● 配列（Array）
[1,2,3].forEach()
[1,2,3].map()

● NodeList（querySelectorAll）
nodeList.forEach() // OK
nodeList.map()     // NG

● 配列風オブジェクト（HTMLCollection）
for (const el of collection) { ... } // OK
collection.forEach() // NG
collection.map()     // NG

⑤ NodeListで map を使いたいとき

方法① Array.from（推奨）
const nodes = document.querySelectorAll('.someClass');
const array = Array.from(nodes);

const result = array.map(item =>
  item.textContent.toUpperCase()
);

✅ Array.from は 配列風オブジェクト (array-like objects) や 反復可能オブジェクト (iterable objects) を
新しい配列に変換するための静的メソッドです。
基本構文:Array.from(arrayLike[, mapFn[, thisArg]])


方法② slice.call（古典）
const nodes = document.querySelectorAll('.someClass');
const array = Array.prototype.slice.call(nodes);

const result = array.map(item =>
  item.textContent.toUpperCase()
);

🔴 👉 配列に変換すれば map / filter / reduce 全部使える

⑥ 実務でのおすすめ指針
基本はこれでOK
document.querySelectorAll()

・forEach が使える
・CSSセレクタが使える
・挙動が直感的

getElementsByClassName を使うのは？
・パフォーマンス最優先
・Live更新が必要なとき
・仕様を理解している場合のみ

⑦ 覚え方（暗記しなくていい）
❌ 丸暗記
⭕ エラー → 調べる → 修正 → 体で覚える

重要なのはこれ
「これは配列か？」
「返り値は何か？」

⑧ ポイント
配列っぽく見えるものは、だいたい配列じゃない。
JavaScriptでは「返り値の正体」を意識できると一気に楽になります。

● 配列（Array）
● 配列風オブジェクト（HTMLCollection）
● NodeList（querySelectorAll）

**「見た目は似てるけど中身が全然違う3兄弟」**

配列 / HTMLCollection / NodeList の違い
まず結論（これだけ覚えてOK）
👉 違いは「できること」と「正体」

種類	        正体	            forEach 	map	        特徴
配列（Array）	本物の配列	        ✅	        ✅	    何でもできる
NodeList	    配列っぽい	        ✅	        ❌	    forEachだけ使える
HTMLCollection	さらに配列っぽい	❌	        ❌	    for文なら回せる

① 配列（Array）とは？
イメージ
🧺 「ちゃんとした箱」

例
const arr = [1, 2, 3];

できること
arr.forEach(v => console.log(v));
arr.map(v => v * 2);
arr.filter(v => v > 1);

特徴
・JavaScriptで一番よく使う
・配列専用メソッドが全部使える
・完全に自由
✅ 困ったらこれが最強

② NodeList（querySelectorAll）
イメージ
📋 「配列っぽいリスト」

例
const nodes = document.querySelectorAll('.card');

できること
nodes.forEach(node => {
  node.classList.add('active');
});

できないこと
nodes.map(...) // エラー

特徴
・配列ではない
・forEach だけ特別に使える
・DOM操作専用
・中身は「要素の一覧」
👉 見た目は配列、正体は別物

③ 配列風オブジェクト（HTMLCollection）
イメージ
📂 「並んでるけど道具がない棚」

例
const els = document.getElementsByClassName('card');

できないこと
els.forEach(...) // ❌
els.map(...)     // ❌

できること（for文）for of
for (const el of els) {
  el.classList.add('active');
}

特徴
・配列でもNodeListでもない
・メソッドをほぼ持っていない
・昔からある仕組み
・DOMが変わると自動で中身も変わる（Live）

④ 3つを「人」に例えると
種類	        例え
配列	        料理人（何でもできる）
NodeList	    調理補助（forEachだけできる）
HTMLCollection	食材（自分では何もできない）

⑤ 初心者が混乱するポイント
見た目が同じ
console.log(nodes);
console.log(collection);

⑥ 実務ではどう使う？
基本ルール
✅ querySelectorAll を使う
document.querySelectorAll('.card')
・forEach が使える
・CSSセレクタが使える
・分かりやすい

map / filter を使いたいなら？
Array.from(document.querySelectorAll('.card'))
  .map(...)

⑦ 一番大事な考え方
「配列っぽい」＝「配列」ではない

JavaScriptでは
「返ってきたものは何か？」 を意識するだけで、
エラーが一気に減ります。

⑧ 超短いまとめ（覚える用）
・配列 → 何でもできる
・NodeList → forEachだけOK
・HTMLCollection → for文だけOK

配列 → 何でもできる
NodeList → forEachだけOK
HTMLCollection → for文だけOK
上記の主な使い道？

✅ 配列 / NodeList / HTMLCollectionそれぞれの「主な使い道」

① 配列（Array）
👉 データ処理専用の万能選手
主な使い道
・データを加工・変換・集計したいとき
・map / filter / reduce を使いたいとき
・ロジック中心の処理

よくある例
const prices = [100, 200, 300];
const taxIncluded = prices.map(p => p * 1.1);
const users = [
  { name: 'A', age: 20 },
  { name: 'B', age: 30 }
];

const adults = users.filter(u => u.age >= 20);

使う場面まとめ
✅ APIレスポンス
✅ 計算・集計
✅ 状態管理
✅ React / Vue の state
👉 「DOM以外」はほぼ全部配列

② NodeList（querySelectorAll）
👉 DOM操作で一番使う実務の主役
主な使い道
・複数のHTML要素をまとめて操作
・class を一括で付ける / 外す
・クリックイベントを複数要素に設定

よくある例
const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
  });
});

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.classList.add('show');
});

使う場面まとめ
✅ アニメーション開始
✅ 表示 / 非表示切り替え
✅ UI操作
✅ Web制作の9割
👉 「DOMを複数触るならこれ」

③ HTMLCollection（getElementsByClassName）
👉 限定用途・玄人向け
主な使い道
・DOMの変化を自動で反映したい
・追加・削除される要素を常に最新で扱いたい

よくある例
const items = document.getElementsByClassName('item');

function addItem() {
  const div = document.createElement('div');
  div.className = 'item';
  document.body.appendChild(div);

  // items は自動で増えている
}

使う場面まとめ
✅ 動的に増減する要素管理
✅ 高速処理が必要なケース
✅ 古いコードの保守
👉 初心者は無理に使わなくてOK

④ 使い分け早見表（超重要）
やりたいこと	           使うもの
データを加工したい	       配列
DOMをまとめて操作	       NodeList
DOMの増減を自動追従したい	HTMLCollection

⑤ 初心者向け結論（これ守ればOK）
✔ まずはこれだけでいい
document.querySelectorAll()

✔ map が必要になったら
Array.from(NodeList)

✔ HTMLCollectionは
👉 「そういうものがある」程度でOK

⑥ 一言でまとめると
・配列：考えるための道具
・NodeList：画面を動かす道具
・HTMLCollection：DOMの監視カメラ

✅ ① NodeList → 配列に変換すべきタイミング
結論（これだけ覚えてOK）
👉 「map / filter / reduce を使いたくなった瞬間」

変換しなくていいケース（9割）
document.querySelectorAll('.card').forEach(card => {
  card.classList.add('show');
});

理由
・クラス付与
・イベント登録
・表示切り替え
👉 DOM操作だけなら NodeList のままで十分

変換すべきケース①：map を使いたい
const cards = document.querySelectorAll('.card');

const texts = Array.from(cards).map(card =>
  card.textContent
);

なぜ？
・NodeList は map を持っていない
・データ加工は配列の仕事

✅ 変換すべきケース②：filter / reduce を使いたい
const visibleCards = Array.from(cards)
  .filter(card => card.classList.contains('show'));

✅ 変換すべきケース③：値として扱いたい
const cardData = Array.from(cards).map(card => ({
  text: card.textContent,
  width: card.offsetWidth
}));
👉 UI → データに変換した瞬間、配列にする

判断フロー（実務用）
NodeListを取得
   ↓
forEachだけ？ → 変換しない
   ↓
map / filter / reduce？ → 配列に変換

② forEach / for / for...of の使い分け
結論        （超重要）
ループ	    使う場面
forEach	    一番よく使う
for...of	配列風オブジェクト対応
for	        細かい制御が必要

① forEach
👉 基本これ
使い道
・全要素に同じ処理
・indexが不要

cards.forEach(card => {
  card.classList.add('active');
});

特徴
・読みやすい
・break / continue 不可
・NodeListで使える

② for...of
👉 HTMLCollection対応用
使い道
・HTMLCollection
・反復可能オブジェクト

for (const card of cards) {
  card.classList.add('active');
}

特徴
・配列 / NodeList / HTMLCollection すべてOK
・break / continue 可能
👉 迷ったら for...of は安全

③ for（古典的ループ）
👉 制御したいときだけ
使い道
・途中で止めたい
・index操作したい
・パフォーマンス最優先

for (let i = 0; i < cards.length; i++) {
  if (i === 2) break;
  cards[i].classList.add('active');
}

特徴
・何でもできる
・書くのが面倒
・読みにくい

③つのループ比較まとめ
ループ	        読みやすさ	制御	HTMLCollection
forEach	            ◎	   ❌	  ❌
for...of	        ○	    ◎	    ◎
for             	△	   ◎        ◎

✅ 実務での鉄板ルール
DOM操作
document.querySelectorAll().forEach(...)

HTMLCollection
for (const el of collection) { ... }

データ処理
Array.from(nodeList).map(...)

一言でまとめると
・NodeListは「触る用」
・配列は「考える用」
・forEachは「楽」
・for...ofは「万能」
・forは「最後の手段」

✅ ① DOM操作でやってはいけないアンチパターン
アンチパターン①：ループの中でDOMを何度も触る

❌ 悪い例
cards.forEach(card => {
  card.style.width = card.offsetWidth + 'px';
});

なぜダメ？
・DOM取得（offsetWidth）は高コスト
・レイアウト計算が何度も走る（リフロー）

✔ 改善例
const widths = Array.from(cards).map(c => c.offsetWidth);

cards.forEach((card, i) => {
  card.style.width = widths[i] + 'px';
});
👉 「読む」と「書く」を分離

✅ アンチパターン②：DOM操作とデータ処理を混ぜる

❌ 悪い例
cards.forEach(card => {
  if (card.textContent.includes('sale')) {
    card.style.display = 'block';
  }
});

✔ 改善例
const saleCards = Array.from(cards)
  .filter(card => card.textContent.includes('sale'));

saleCards.forEach(card => {
  card.style.display = 'block';
});
👉 DOM = 表示 / 配列 = 判断

✅ アンチパターン③：HTMLCollectionに forEach を使おうとする

❌
document.getElementsByClassName('card').forEach(...)

✔

for (const card of document.getElementsByClassName('card')) {
  card.classList.add('active');
}

👉 正体を知らないと必ずハマる
アンチパターン④：NodeListを配列だと信じ切る

❌
document.querySelectorAll('.card').map(...)

✔
Array.from(document.querySelectorAll('.card')).map(...)

アンチパターン⑤：DOMを状態として使う

❌ 悪い例
if (card.classList.contains('active')) {
  // 状態判定
}

✔ 良い例
let isActive = true;

if (isActive) {
  card.classList.add('active');
}
👉 DOMは結果、状態はJSで管理

DOMアンチパターンまとめ
NG	                    理由
ループ中DOM読み書き	    パフォーマンス低下
判断ロジックをDOMで	    バグりやすい
NodeListを配列扱い	    エラー
HTMLCollection乱用	    意図不明

② なぜ map / forEach を分ける設計思想なのか
結論
👉 「目的が違うから」
forEach の思想

👉「処理する」
cards.forEach(card => {
  card.classList.add('active');
});

・戻り値なし
・副作用OK
・Array.from(arrayLike[, mapFn[, thisArg]])
・DOM操作向き
👉 「やるだけ」

map の思想
👉「変換する」
const texts = cards.map(card => card.textContent);

・新しい配列を返す
・元データは触らない
・純粋な変換
👉 「データを別の形にする」

なぜ混ぜないのか？

❌
cards.map(card => {
  card.classList.add('active');
});

✔

cards.forEach(card => {
  card.classList.add('active');
});

理由
・mapは「結果を返す前提」
・副作用目的は設計ミス

設計思想まとめ
メソッド	    役割	DOM向き
forEach     	実行	◎
map	            変換	❌
filter	        選別	❌
reduce	        集約	❌

実務の黄金ルール
・データ処理 → map / filter / reduce
・DOM操作 → forEach / for...of

一言でまとめると
・map = 考える
・forEach = 動かす
・DOM = 結果
・データ = 判断

**「素のJavaScript → React的思考」**に切り替わる最重要ポイント
① 理由 → ② 状態管理が必要になる瞬間、の順で丁寧にいきます。

① なぜ React は DOM を直接触らせないのか
結論（先に）
👉 DOM操作は「結果」であって、「原因」ではないから

Reactは
「状態（state） → 画面」
という一方向の流れを守らせたいフレームワークです。

素のJSでよくある書き方（Reactが嫌う例）
button.addEventListener('click', () => {
  box.classList.toggle('active');
});

問題点
・今の状態はどこ？
・active は ON？OFF？
・別の場所から見えない
👉 DOMが状態になっている

Reactの考え方
const [isActive, setIsActive] = useState(false);
<button onClick={() => setIsActive(!isActive)} />
<div className={isActive ? 'active' : ''} />

何が違う？
・状態は isActive
・DOMは「結果」
・画面は state から自動生成

ReactがDOMを触らせない理由①
👉 状態の矛盾を防ぐ
DOMを直接触ると…
・JSの変数
・DOMのclass
・表示状態がズレる

Reactは状態は必ず1箇所にまとめろと強制している。

ReactがDOMを触らせない理由②
👉 差分更新を自動化するため

Reactはこう考える：
「前の状態」と「次の状態」の差分だけDOM更新

直接DOMを触られるとReactの想定外の変更
差分計算が壊れる

👉 だから禁止

ReactがDOMを触らせない理由③
👉 UIを関数として扱うため
UI = f(state)
同じ state → 同じ UI

予測可能
テストしやすい

DOM操作は
「途中で画面をいじる命令」

まとめ（React視点）
項目	素のJS	    React
状態	DOM	        state
UI更新	命令	    再描画
管理	バラバラ	一元管理

② 状態管理が必要になる瞬間
結論（これが来たらアウト）

👉 「今どうなってる？」と自分に聞き始めた時

状態管理が不要な例
button.addEventListener('click', () => {
  alert('clicked');
});

単発
記憶不要

状態管理が必要な例①
表示 / 非表示の切り替え

❌ DOM依存

if (box.classList.contains('open')) {
  box.classList.remove('open');
}


✔ 状態管理

let isOpen = false;

isOpen = !isOpen;
box.classList.toggle('open', isOpen);

状態管理が必要な例②
複数箇所で同じ状態を使う
・ボタンの色
・テキスト
・表示エリア
let isLogin = false;

👉 DOMでは持てない

状態管理が必要な例③
条件分岐が増えた
if (isActive && isAdmin && !isLoading) {

👉 状態が増えたら
👉 DOM操作は破綻する

状態管理が必要な例④
・非同期が絡む
・API通信
・setTimeout
・fetch
・let isLoading = true;

DOMだけで管理すると
確実に破綻

状態管理が必要になる境界線    サイン   意味
classList.contains          多用	危険
querySelector               連発	危険

今の状態が不明	限界
同期/非同期混在	React向き

Reactが解決したこと
状態を1か所に集める
↓
UIは自動で決まる
↓
DOM操作不要

一言でまとめると
DOMは触るものではなく、描かれるもの
状態が増えたらReactの出番
ReactはDOM操作を「禁止」しているのではなく「不要」にした

querySelectorAllとgetElementsByClassNameはマジで違うものという話
https://www.youtube.com/watch?v=BqTP_-O_zn8&list=PLLGOuXghEbzx_GMLJUa-Cq93KKeNu6m0G&index=24