javascript getElementByIdについて 20250923

getElementById とは JavaScript で HTMLの特定の要素を取得するための関数（メソッド） です。

1. 基本の形
document.getElementById("id名")
document → 今表示されているWebページ全体（HTMLドキュメント）
getElementById("id名") → 指定した id属性 を持つDOM要素（Elementオブジェクト）を返す

2. 具体例
HTML
<p id="greeting">こんにちは</p>
JavaScript
const element = document.getElementById("greeting");
console.log(element.textContent); // "こんにちは" と出力

👉 この場合、element には <p id="greeting">こんにちは</p> が入ります。

3. 使い道
取得した要素に対して、いろいろな操作ができます。

テキストを変える
document.getElementById("greeting").textContent = "こんばんは！";

スタイルを変える
document.getElementById("greeting").style.color = "red";

属性を変える
document.getElementById("greeting").setAttribute("title", "ヒント表示");

4. 注意点
id はページ内で1つだけ（ユニーク） が基本
存在しない id を指定すると null が返る → そのまま操作するとエラーになる

const elem = document.getElementById("notFound");
console.log(elem); // null

✅ まとめ
getElementById = 「id属性を指定して、その要素を1つ取得する」ためのメソッド。


🟦 getElementByIdのtextContentなどの変更できる値は？
主に変更できる値・プロパティ
💬 テキスト関連
textContent → 要素内のテキストを変更（HTMLタグはそのまま文字列として表示される）
innerText → 実際にブラウザに表示されるテキストを変更（非表示のCSSなどを反映する場合がある）
innerHTML → 要素の中身を「HTML」として書き換える（タグも使える）

例：
document.getElementById("result1").textContent = "こんにちは";
document.getElementById("result1").innerHTML = "<strong>太字</strong>です";

🎨 見た目関連
style → CSS を直接書き換えられる
document.getElementById("result1").style.color = "red";
document.getElementById("result1").style.backgroundColor = "yellow";

className / classList → クラスを変更・追加・削除
document.getElementById("result1").className = "highlight";
document.getElementById("result1").classList.add("big");
document.getElementById("result1").classList.remove("hidden");

属性関連
id → 要素のID自体を変更できる
src（画像の場合）
href（リンクの場合）
value（フォーム入力の場合）
setAttribute(name, value) → 任意の属性を設定できる

例：
document.getElementById("myImg").src = "new-image.png";
document.getElementById("myLink").href = "https://example.com";
document.getElementById("myInput").value = "新しい値";
document.getElementById("result1").setAttribute("title", "ヒント表示");

📌 その他よく使うもの
disabled（ボタンや入力欄を無効化する）
checked（チェックボックスやラジオボタンの状態）
hidden（要素を非表示にする）
appendChild() / remove() → 要素を追加・削除する

3. まとめ
getElementById("id名") で取れる要素は「HTMLタグそのもの」なので、
以下のようなことができます：
テキストの変更 → textContent, innerHTML
見た目の変更 → style, classList
属性の変更 → src, href, value, setAttribute()
状態の変更 → disabled, checked, hidden
構造の変更 → 子要素の追加・削除


✅ extContent, innerHTMLの違い

textContent と innerHTML はどちらも「要素の中身を書き換える」ためのプロパティですが、扱いが大きく違います。

🔹 1. textContent
テキストとして扱う
HTMLタグを書いても、そのまま文字として表示される
安全性が高い（ユーザー入力をそのまま出すときなどに使える）

例：
<div id="box"></div>
document.getElementById("box").textContent = "<strong>太字</strong>";

📺 ブラウザ表示：
<strong>太字</strong>

（タグは「文字」として表示される）

🔹 2. innerHTML
HTMLとして扱う
HTMLタグを解釈して、実際に要素を挿入する
レイアウト変更や装飾をしたいときに便利
ただし、外部から受け取った文字列をそのまま入れると XSS（スクリプト攻撃）リスク がある

例：
document.getElementById("box").innerHTML = "<strong>太字</strong>";


📺 ブラウザ表示：
太字
（タグが解釈され、実際に太字になる）

🔹 まとめ
プロパティ	    HTMLタグの扱い	    主な用途
textContent	   そのまま文字列	ユーザー入力を安全に表示したい時
innerHTML	   タグを解釈する	レイアウト変更や装飾をしたい時

👉 簡単に言うと：
安全にテキストを入れるなら textContent
装飾や構造を変えるなら innerHTML
価格を文字で表示するだけなら安全なtextContent の方がベストチョイスになります。

✅ DOM操作の基本
1. DOMとは？
DOM = Document Object Model
HTML を JavaScript が触れるようにしたオブジェクト構造 のこと。
簡単に言えば、「ブラウザに読み込まれたHTMLをJavaScriptから操作できる仕組み」。

例：
<div id="result1">こんにちは</div>
ブラウザが読み込むと「木（ツリー）構造」に変換される：

Document
 └─ <html>
     └─ <body>
         └─ <div id="result1">こんにちは</div>

2. 要素を「取得」する
DOM を操作する第一歩は「対象の要素を JavaScript で取得する」こと。
代表的な方法：

// id で取得（1つだけ）
document.getElementById("result1");

// クラス名で取得（複数）
document.getElementsByClassName("item");

// タグ名で取得（複数）
document.getElementsByTagName("p");

// CSSセレクタで取得（1つ）
document.querySelector(".item");

// CSSセレクタで取得（複数）
document.querySelectorAll(".item");

3. 要素を「変更」する
取得した要素は「テキスト」「見た目」「属性」を自由に変えられます。

💬 テキストを変える
document.getElementById("result1").textContent = "こんばんは！";

🎨 見た目を変える
document.getElementById("result1").style.color = "red";
document.getElementById("result1").style.fontSize = "20px";

🏷 属性を変える
document.getElementById("myImg").src = "new.png";
document.getElementById("myLink").href = "https://example.com";

4. 要素を「追加・削除」する
追加
const newItem = document.createElement("p");
newItem.textContent = "新しい段落です！";
document.body.appendChild(newItem);

削除
document.getElementById("result1").remove();

5. よくある使い方
フォームに入力した値を表示する
ボタンを押したら文字や色を変える
新しい要素を追加してリストを増やす
画像やリンク先を差し替える

まとめ
DOM操作の基本はこの3ステップです：
要素を取得する → getElementById, querySelector
要素を変更する → textContent, style, setAttribute
要素を追加・削除する → appendChild, remove


✅ 実例
「ユーザー入力 → JSで処理 → DOMに反映」 は、Webで一番よくある流れです。
「電卓」「入力フォーム」「検索」などが代表例です。

🎯 例：ユーザーが数字を入力 → 消費税込みの金額を表示
HTML
<input id="priceInput" type="number" placeholder="金額を入力してください">
<button id="calcBtn">計算する</button>
<p id="result"></p>

JavaScript
const tax = 1.1;

// 税込み計算する関数
function calculation(price) {
    return Math.floor(price * tax);
}

// ボタンをクリックしたときの処理
document.getElementById("calcBtn").addEventListener("click", function () {
    // 入力値を取得（文字列なので数値に変換）
    const price = Number(document.getElementById("priceInput").value);

    // 計算した結果を result 要素に表示
    document.getElementById("result").textContent =
        "税込み価格は " + calculation(price) + " 円です";
});

✅ 動きの流れ
ユーザーが input に「100」と入力
「計算する」ボタンをクリック
getElementById("priceInput").value で値を取得
calculation() 関数で処理（100 * 1.1 = 110）
getElementById("result").textContent で表示

他にもよくある「あるある事例」
名前を入力 → 「こんにちは〇〇さん！」と表示
円をドルに換算 → 結果を表示
チェックボックスの状態を取得 → メッセージを表示
検索ボックスに入力 → 候補リストを表示
