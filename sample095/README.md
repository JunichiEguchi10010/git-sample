Vite × React 数字を入力し､ボタンを押すと数値を2倍にした結果を表示する　202506066

疑似コード
　入力した数値を取得し、ボタンを押すと
  数値を2倍にする
  結果を表示する

イベントハンドラでは「入力値の取得」と「ロジック呼び出し」のみ
doubleNumber(num) のような関数を作る

✅ 疑似コードの分解と対応する技術マッピング

処理の内容	                概要	                    使用するReact技術・構文
1. 入力値を取得        	ユーザーが数値を入力する	<input type="number" /> + onChange イベント
2. ボタンを押す	        入力値を処理するトリガー	<button> + onClick イベント
3. 数値を2倍にする	    ビジネスロジック処理    	doubleNumber(num) という関数を作る
4. 結果を表示する	    計算結果を画面に表示	    useState フックを使って状態管理・表示更新

🧠 実装の構成イメージ（Reactの役割）
要素	                    内容	                        具体例
状態（state）	        入力された数値と結果を保存する	    useState（例：const [input, setInput] = useState(0)）
イベントハンドラ	     入力の取得、ボタン押下の処理　 	 handleChange, handleClick
プレゼンテーション	     入力欄・ボタン・結果の表示	         JSX構文によるUI構築
ロジック関数	        入力値の2倍を返す関数	            function doubleNumber(num) { return num * 2; }

🧩 実際のマッピングまとめ
機能	                        コードレベル	                                         技術/構文
入力欄	            <input type="number" onChange={handleChange} />	            イベント処理 + フォーム入力
値の保存	                        useState	                                    React状態管理
ボタン	            <button onClick={handleClick}>2倍にする</button>	            JSX + イベント
計算関数	          function doubleNumber(num) { return num * 2; }	            JavaScript関数
表示	                      <p>結果: {result}</p>	                                JSXによる動的表示

✅ 総括
疑似コードに基づく技術マッピング：

状態管理（useState）
イベント処理（onChange / onClick）
プレゼンテーション（JSX）
ビジネスロジック分離（関数化）


✅ コード解説：
import { useState } from 'react'
👉 Reactが提供する「状態管理フック」useState をインポートしています。これを使うと、コンポーネントの中で値の変化を管理できます。

import './App.css'
👉 このReactコンポーネント用のCSSファイル（App.css）を読み込んで、デザインを適用しています。

function doubleNumber(num) { return num * 2 }
👉 ユーザーが入力した数値 num を2倍にして返すロジック関数です。
この関数は計算のみを担当し、UIとは関係しません。

function App() {
👉 ここからReactのメインコンポーネント App が始まります。
この関数の中に、表示内容や動作がすべて書かれています。

const [inputValue, setInputValue] = useState('')
👉 ユーザーが入力欄に打ち込んだ値を管理します。初期値は空文字。
inputValue：今の入力値
setInputValue：値を変更する関数

const [result, setResult] = useState(null)
👉 計算結果（2倍した値）を保存する状態です。
初期値は null（＝まだ何も表示しない状態）

const handleClick = () => {
👉 ボタンが押されたときに実行される関数（イベントハンドラ）です。

const num = parseFloat(inputValue)
👉 inputValue は文字列なので、parseFloat を使って数値に変換しています。

if (!isNaN(num)) {
👉 num が 数値として有効かどうかをチェックしています。NaN だったら不正な入力。
isNaN() は ✅JavaScriptのデフォルト（組み込み）関数です。
 「Not a Number（数値ではない）」かどうかを調べる関数 
 isNaN(num) が true → 数字じゃない（たとえば文字列や空欄など）
 isNaN(num) が false → 数字として正しい
🔁 !isNaN(num) は逆の意味
! は 否定（not） を表す記号です。
!isNaN(num) は「数値でない」→「数値である」という意味になります。

const doubled = doubleNumber(num)
👉 2倍計算用の関数 doubleNumber() を使って、数値 num を2倍した結果を取得します。

setResult(doubled)
👉 計算結果（2倍された値）を result に保存します。これで表示内容が更新されます。
🟥「変数 result に、ユーザーが入力した数値の2倍を動的に格納する」

} else { setResult('数値を入力してください') }
👉 入力が無効な場合は、エラーメッセージを result に入れて表示します。

return ( ... )
👉 ここから JSX（見た目を作るコード）が始まります。
表示されるHTMLのような構文です。

<div className="container">
👉 CSSクラス container を持つ div。画面の大枠を作っています。

<h1>数値を2倍にするアプリ</h1>
👉 見出しです。アプリのタイトルを表示しています。

<input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="数値を入力" />
👉 数値入力欄：

value={inputValue} で状態と同期

onChange で文字が入力されたら setInputValue を呼び出して更新

placeholder は入力のヒント表示

<button onClick={handleClick}>2倍にする</button>
👉 ボタンです。クリックされると handleClick() を実行します（＝計算開始）。

<p className="result">結果: {result !== null ? result : '未入力'}</p>
👉 結果表示部分：
result が null なら「未入力」と表示
値があるなら「結果: ○○」と表示
CSSで result クラスのデザインを適用
🟥三項演算子を使って、条件によって表示内容を切り替えている、典型的な条件付きレンダリング
</div>
👉 全体の div を閉じています。

}
👉 App() 関数の終わりです。

export default App
👉 このコンポーネント App を他のファイルでも使えるように「エクスポート」しています。
main.jsx などがこの App を読み込んで表示します。