// 「フォーム送信時に送信中メッセージを表示するスクリプト」
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const result = document.getElementById('result');
  
    form.addEventListener('submit', () => {
      result.textContent = '送信中です...';
    });
  });

  
// コード解説
// js
// document.addEventListener('DOMContentLoaded', () => {
// 🔍 解説：document はHTML全体を表します。
// addEventListener は「イベントを監視する」関数。
// 'DOMContentLoaded' というイベントは、「HTMLの読み込みが完了したとき（画像などはまだでもOK）」に発動します。
// () => { ... } はアロー関数という書き方で、「読み込み完了後に実行する処理」が中に書かれています。
// ✅ この行の目的：ページが読み終わったら、フォームの送信処理を準備する。

// js
//   const form = document.getElementById('contactForm');
// 🔍 解説：const は「変数（変更しない値）を定義する」キーワード。
// document.getElementById('contactForm') は、HTML内の id="contactForm" の要素（つまりフォーム）を取得します。
// ✅ この行の目的：対象のフォームを取得して、後で使えるようにしている。

// js
//   const result = document.getElementById('result');
// 🔍 解説：同様に、id="result" の要素（送信結果を表示する場所）を取得しています。
// ✅ この行の目的：「送信中です」や「送信完了」などのメッセージを表示するエリアを準備している。

// js
//   form.addEventListener('submit', () => {
// 🔍 解説：フォームが submit（送信）されたときに実行する関数を設定します。
// () => { ... } は送信された瞬間に実行される処理。
// ✅ この行の目的：送信ボタンが押されたときに何か処理をしたい（例：メッセージ表示）。

// js
//     result.textContent = '送信中です...';
// 🔍 解説：result は先ほど取得した「表示用エリア」。
// .textContent は「その中の文字」を書き換えるプロパティです。
// '送信中です...' に置き換えられることで、画面にその文字が表示されます。

// ✅ この行の目的：ユーザーに「送信中です」と表示し、処理中であることを知らせる。

// js
//   });
// });
// 🔍 解説：ここはそれぞれの関数ブロック（addEventListener や DOMContentLoaded）を閉じる括弧と中カッコです。
// ✅ この2行は関数の終了を示す閉じカッコです。


// ✅ 全体の流れまとめ
// ページが表示されたら...
// id="contactForm" のフォームと id="result" の表示エリアを探す。
// ユーザーがフォームを送信した瞬間に…
// 「送信中です...」という文字を画面に表示する。

// 📌 補足：このコードはフォームの見た目上の応答を提供するだけで、実際のメール送信処理は send.php で行われます。