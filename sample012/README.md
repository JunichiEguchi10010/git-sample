React.jsを使った基本的なイベント処理の書き方 20250401


1. Reactでイベント処理を実装する方法
Reactでは、JavaScriptのイベント（例: クリックイベントや入力イベント）を簡単に実装できます。

クリックイベント: ボタンをクリックした際に特定の処理を実行する方法。
入力イベント: テキスト入力フィールドで文字が入力された際に処理を実行する方法。


2. 基本的なHTMLとCSSの準備
動画では、Reactを使うために以下の基本的な構造を準備しています｡
HTML: id="root" を持つ要素を用意し、Reactコンポーネントを描画する場所を指定。
CSS: ボタンや入力フィールドのスタイルを簡単に設定。


３．クリックイベントの実装

クリックイベントを実装するためには、以下の手順が必要です｡

ボタンの作成
JavaScriptファイル

function App() {
  return <button onClick={handleClick}>Click Me!</button>;
}

イベントハンドラーの定義
JavaScriptファイル

function handleClick() {
  console.log("Button clicked!");
}

動作確認
ボタンをクリックすると、コンソールに「Button clicked!」と表示されます。


4. 入力イベントの実装

入力フィールドの作成
JavaScriptファイル

function App() {
  return <input onInput={handleInput} />;
}

イベントハンドラーの定義
JavaScriptファイル

function handleInput(event) {
  console.log(event.target.value);
}

動作確認
入力フィールドに文字を入力すると、その内容がコンソールに表示されます.｡


5. Reactの特徴的なポイント
JSXの使用: HTMLライクな記述をJavaScript内で行える。
イベント名の書き方: onClick や onInput のように、イベント名はキャメルケースで記述。
直感的なコード: JavaScriptのaddEventListenerを使うよりも簡潔に書ける。

6. その他のポイント
タグのルール: JSXでは、複数の要素を返す場合は必ず1つの親要素で囲む必要があります。
イベントオブジェクトの活用: イベントハンドラーに渡されるオブジェクト（例: event）を使って、入力内容やクリック情報を取得できます。



JavaScriptのイベント処理メカニズム
(event) が引数としてイベントオブジェクトを認識するのは、JavaScriptのイベント処理メカニズムによるものです｡


1. Reactが提供する自動機能
Reactでは、イベントハンドラーを onClick や onInput のようなイベントリスナーとして指定する際、Reactが自動的に そのイベントが発生したときのイベントオブジェクトをハンドラーの引数として渡します。
このイベントオブジェクトには、イベントに関する情報（例: どの要素で発生したか、どのキーが押されたかなど）が含まれています。
Reactがイベントを「合成イベント（SyntheticEvent）」として提供するため、全てのブラウザで一貫した動作をします。

2. JavaScriptの標準動作
JavaScriptでも同様に、ネイティブのイベントリスナーでイベントハンドラーを登録する場合、引数としてイベントオブジェクトが渡されます。

例（バニラJavaScriptの場合）
document.querySelector('input').addEventListener('input', function(event) {
  console.log(event.target.value); // 入力値を取得
});

この仕組みは、DOMがイベント処理中に「このイベントに関する情報をハンドラーに渡す」ように設計されているためです。

3. 自動的に渡される理由
Reactでは以下のような内部処理が行われています：

イベントリスナーが指定された際、Reactは内部でそのイベントを監視する「ラッパー」を作成します。
イベントが発生すると、Reactがその情報をキャッチし、対応するハンドラー（例: handleInput）に 合成イベントオブジェクト を引数として渡します。
そのため、eventを明示的に渡さなくても、Reactが背後でこれを処理しているのです。

. イベントオブジェクトの中身
イベントオブジェクトにはさまざまな情報が含まれています。以下はその一部です。

event.target: イベントが発生したDOM要素（例: 入力フィールド）。
event.type: イベントの種類（例: input、click）。
event.preventDefault(): デフォルトのイベント動作をキャンセルする関数。
event.stopPropagation(): イベントのバブリングを停止する関数。
※バブリング: イベントが親要素に伝わること。

命名の自由
Reactのイベントハンドラーに渡される引数名（例えば event や e）は何でも良いです。これは、引数名が単にローカル変数として扱われるためです。
開発者が読みやすさを重視して名前を選ぶことができます。
よく使われる名前の例

evt:
eventの短縮形。
簡潔で読みやすく、特にコード内で複数の変数名が存在する場合に便利です。

ev:
個人やチームの好みによって採用されることがあります。

eventObj:
オブジェクトを明示的に示す名前。
特にコード内で他のeventとは異なるイベントオブジェクトを強調したい場合に使われます。

mouseEvent:
マウス関連のイベント（クリックや移動など）の場合に使用。
状況に応じて他のイベント（例：keyboardEvent、formEvent）と明確に区別する際に便利です。

action:
イベントが「アクション」をトリガーする場合の命名。動作や目的に焦点を当てた命名法。

details:
イベントオブジェクトが具体的な情報を含む場合

; Reactで、基本的なイベント処理を書く方法。clickイベントやinputイベントについて
; https://www.youtube.com/watch?v=N9seV2R3wDg