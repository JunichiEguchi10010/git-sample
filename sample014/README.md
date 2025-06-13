React useStateでクラス名やスタイルの切り替えをする方法 20250403

1. 動的なクラス名の切り替え
useState を使って状態を管理し、クリックイベントでクラス名を変更します。

初期状態を設定し、ボタンをクリックするたびに状態を反転させることで、クラス名を動的に切り替えます。


コード例
javascriptファイル
const [isActive, setIsActive] = useState(false);

function handleClick() {
  setIsActive(!isActive); // 状態を反転
}

return (
  <p className={isActive ? 'active' : ''}>Hello World</p>
  <button onClick={handleClick}>Toggle Class</button>
);


2. 動的なスタイルの切り替え
クラス名だけでなく、スタイルを直接変更する方法も紹介されています。

状態に応じて、スタイルをオブジェクト形式で指定します。

コード例
javascriptファイル
const [isActive, setIsActive] = useState(false);

function handleClick() {
  setIsActive(!isActive);
}

return (
  <div
    style={{
      backgroundColor: isActive ? 'gray' : 'white',
      fontSize: isActive ? '20px' : '16px',
    }}
  >
    Dynamic Style
  </div>
  <button onClick={handleClick}>Toggle Style</button>
);

3. 三項演算子の活用
状態に応じて異なる値を返すために、三項演算子（condition ? value1 : value2）を使用します。

これにより、条件に応じたクラス名やスタイルを簡潔に切り替えることができます。



【CSSのスタイルを変更する際に「class」を使う方法と「style」を直接指定する方法には、それぞれメリットとデメリットがあります。】

1. class を使う方法

概要:
HTML要素にclass属性を設定して、CSSファイルでそのクラスに対応するスタイルを定義します。

メリット:
再利用性が高い:
同じクラスを複数の要素に適用できるので、コードがスッキリします。

メンテナンス性が高い:
スタイルの変更はCSSファイルだけで行えるため、HTMLやJavaScriptのコードを変更する必要がありません。

分離された責任:
スタイルはCSS、構造はHTML、動作はJavaScriptに分けて管理できます。

デメリット:
状況に応じた動的なスタイルの変更がやや複雑になる場合があります（classListを操作する必要がある）。


2. style を直接指定する方法
概要:
要素のstyle属性を直接操作し、インラインスタイルを適用します。

メリット:
動的変更が簡単:
JavaScriptでスタイルを直接操作するのが簡単（例えばReactのstyleプロパティ）。

小規模な変更に便利:
1つの要素のスタイルを一時的に変更する場合に便利。

デメリット:
再利用性が低い:
他の要素に同じスタイルを適用する場合、コードが冗長になりやすい。

可読性が低下:
HTML内にスタイルが埋め込まれるため、コードが散らかる可能性があります。

優先順位が高い:
インラインスタイルがCSSの他のルールを上書きする場合があり、意図せずスタイルが変わることがあります。


3. Reactでの使い分け

クラスを使う方法:

javascriptファイル
状態に応じてクラスを動的に切り替える。
const [isActive, setIsActive] = useState(false);
return (
  <div className={isActive ? 'active' : ''}>Hello</div>
);

CSSファイル
.active {
  color: red;
}


スタイル(style)を直接指定する方法:
状態に応じてスタイルを直接変更。(三項演算子を使用)

javascriptファイル
const [isActive, setIsActive] = useState(false);
return (
  <div style={{ color: isActive ? 'red' : 'black' }}>Hello</div>
);

4. どちらを使うべきか？

クラスを使うのが良い場合:
再利用性が高いスタイル（例えばテーマカラーやグローバルなスタイル）。
スタイルが複雑な場合（複数のプロパティを設定する場合）。


スタイルを直接指定するのが良い場合:
状態に応じた単純なスタイル変更（例えば、背景色やフォントサイズを動的に変更する場合）。
細かい一時的な調整。


useStateでクラス名やスタイルの切り替えをする方法
https://www.youtube.com/watch?v=SjeDwrmTg5Y