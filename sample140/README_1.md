Ajax（エイジャックス：Asynchronous JavaScript and XML） 非同期通信　20250804

🔷Ajax（Asynchronous JavaScript and XML） は、Webページを再読み込みせずに、サーバーと非同期で通信し、データの取得・送信が可能な技術群の総称です。
「XML」という言葉が含まれていますが、現在では JSON や HTML なども広く使われており、XMLに限定されていません。
Asynchronous：非同期　XML：eXtensible（拡張可能） Markup Language

🔧 Ajaxを構成する主な技術
JavaScript：動的な操作を可能にする言語（通信処理を記述）
DOM（Document Object Model）：ページ構造をプログラム的に操作
XMLHttpRequest API または Fetch API：非同期通信を実現するためのインターフェース（非同期通信を実行）
HTML/CSS：ページの表示とスタイル
サーバー側のスクリプト（PHP, Python,Node.jsなど）：要求に応じてデータを返す
データ形式（JSON, XML, HTML など）


📱 何ができるのか？
ページを丸ごと再読み込みせずに一部だけ更新できる
フォーム送信後の応答を、ページの一部に表示可能
Googleマップのようなインタラクティブな操作が実現可能



✅ 具体例
たとえば…

Googleマップをスクロールしてもページがリロードされない

フォームを送信したときに、「送信完了」のメッセージだけが表示される

商品一覧ページで「もっと見る」を押すと、ページ遷移なしで商品が増える

こうした動きに Ajax が使われています。

🔷 Ajaxの基本仕組み（流れ）
ユーザーが何か操作する

ボタンを押す、フォームを送る、スクロールする…など

JavaScriptでイベントをキャッチ

たとえば click や submit

サーバーに非同期でリクエストを送る

XMLHttpRequest か fetch を使って通信

サーバーが処理して、データを返す

例：JSONやHTML形式のデータ

受け取ったデータをJavaScriptで画面に反映

DOMを操作して表示内容を更新する

🔷 Ajaxのメリット
項目	内容
🌐 ページを再読み込みしない	ユーザー体験（UX）が向上する
🚀 反応が速い	必要なデータだけ取得するので、軽くて速い
🔁 柔軟な動きが可能	表示の一部だけを更新できる


【JavaScriptの基本】Ajax入門講座｜非同期通信とAjaxとは
https://www.youtube.com/watch?v=V89nh3UCBbM