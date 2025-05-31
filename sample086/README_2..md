React JSX（ジェイエスエックス）記法 20250531

➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

✅ JSXの基本ルール早見表
ルール	                                        内容	                                例
親要素は1つだけ	                            JSXは必ず1つのタグで囲う	            ✅<div><h1>こんにちは</h1></div>
                                                                                ❌<h1></h1><p></p>
class属性は使えない	                        HTMLの class → JSXでは className	   <div className="box">
for属性もNG	                                HTMLの for → JSXでは htmlFor	       <label htmlFor="email">
JavaScriptを使うときは {} で囲む	        JSX内で式を埋め込むには {}	            <h1>{userName}さん</h1>
条件分岐は if ではなく三項演算子などを使う	   JSX内で if は使えない	              {isLogin ? <p>ようこそ</p> : <p>ログインしてください</p>}
JSXでコメントを書くときは {/* */} を使う	  通常の // や /* */ は使えない	          {/* これはコメント */}
空タグは自己閉じにする必要がある	            <br>, <img> など	                  <br />, <img src="" />
配列を表示する場合は map() を使う	         複数要素を描画する	                      {items.map(item => <li>{item}</li>)}
key属性はユニークに！	                    リスト表示のときに必要	                  <li key={item.id}>{item.name}</li>

❌ JSXエラーあるある（＆対処法）
エラー例	                                                        原因	                 対処法
Adjacent JSX elements must be wrapped in an enclosing tag	要素が複数あるのに親要素で囲っていない	            <></> や <div> で囲う
'class' is not a valid JSX attribute	class を使ってしまっている	                      className に修正する
Unexpected token '<'	                JSX記法をJSが理解できていない（Babelなど設定ミス）	JSXが使える環境か確認（.jsx, Create React Appなど）
Objects are not valid as a React child	オブジェクトをそのまま表示しようとしている	        JSON.stringify(obj) で変換するか、値だけを取り出す
Warning: Each child in a list should have a unique "key" prop	key をつけていない or 重複している	key={item.id}などを指定する
Can't use if/else inside JSX	        JSX内にif文を直接書いた	JSX外にifを書く or 三項演算子を使う
JSX expressions must have one parent element	return内に複数のタグがある	<React.Fragment> や <></> で囲む

🎁よく使う書き方テンプレ
jsx
const fruits = ['🍎', '🍌', '🍇'];

const FruitList = () => (
  <ul>
    {fruits.map((fruit, index) => (
      <li key={index}>{fruit}</li>
    ))}
  </ul>
);

➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖


✅ JSXとは？
JavaScript XML の略。
JavaScriptの中でHTMLのような記述を可能にする**構文（シンタックス）**です。

🔤 普通のJavaScript vs JSXの違い
🧪 通常のJavaScriptで書くと…
javascript
const element = React.createElement('h1', null, 'こんにちは！');
✅ JSXで書くと…
jsx
const element = <h1>こんにちは！</h1>;
まるでHTMLのように見えますが、これはあくまでJavaScriptの構文です。
JSXは最終的に React.createElement() に変換されます。

✅ JSXの特徴とルール
特徴	                        内容
HTML風の構文	            <div>こんにちは</div> のように書ける
必ず1つの親要素で囲む	    複数のタグは <></> や <div> で囲う必要あり
JavaScriptを埋め込める	    {} を使えば変数や関数を埋め込める
属性名が違うことも	        例: class → className, for → htmlFor

🧠 JSX内でJavaScriptを書く例：
jsx
const name = "太郎";

const Greeting = () => (
  <h1>こんにちは、{name}さん！</h1>
);

✅ JSXはReactの「見た目を作るパーツ」
Reactのコンポーネントでは JSXをreturnしてUIを作るのが基本です。

例：
jsx
const Hello = () => {
  return <p>こんにちは、世界！</p>;
};

🧩 JSXとHTMLの違いの例
HTML	                                        JSX
<div class="box"></div>	                    <div className="box"></div>
<label for="email">	                        <label htmlFor="email">
<input disabled>	                        <input disabled={true} />

🔚 まとめ
JSXは HTMLのように書けるJavaScript構文
ReactではJSXで UIを構築するのが基本
書き方はHTMLに似ているが、細かい違い（属性名など）もある

🧠 JSX内でJavaScriptを書く部分の見分け方
jsx
const name = "太郎";

const Greeting = () => (
  <h1>こんにちは、{name}さん！</h1>
);
✅ JavaScriptの部分
部分	                                内容	                                解説
const name = "太郎";	                変数定義	                       完全にJavaScript。Reactとは無関係の普通のJS文法です。
const Greeting = () => (...)	       アロー関数のコンポーネント定義   	JavaScriptの関数（Reactコンポーネント）です。
{name}	                               JSXの中で使っている {} の中	        この中だけ JavaScriptの式 を書く場所です。name はJSの変数です。

✅ JSXの部分
jsx
<h1>こんにちは、{name}さん！</h1>
この行の <h1> や こんにちは、さん！ はHTMLライクなJSX

ただし {name} の部分だけが JavaScript！

🎯 ポイント
JSX内で JavaScript を書きたいときは、必ず {}（中かっこ）で囲みます。

💬 例：いろいろなJavaScript表現
jsx
<p>{10 + 5}</p>          // → <p>15</p>
<p>{name.toUpperCase()}</p> // → <p>太郎 → 太郎（大文字）</p>
<p>{isLoggedIn ? "ログイン中" : "ログアウト中"}</p>

✅ まとめ
JSX内では基本的にHTMLのように見えるけど、
{} を使うことで JavaScriptの「式」を挿入できる。
if文やfor文などの文（statement）は使えない。