document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const result = document.getElementById('result');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      result.textContent = '送信中です...';
  
      grecaptcha.ready(function () {
        grecaptcha.execute('【あなたのサイトキー】', { action: 'submit' }).then(function (token) {
          document.getElementById('recaptchaToken').value = token;
          form.submit(); // トークンをセット後、再送信
        });
      });
    });
  });
  

//   ページが読み込まれたら、次の処理を開始する：

//     ・フォーム（IDが「contactForm」）と
//       結果表示領域（IDが「result」）を取得する。

//     ・フォームが送信されたときの処理を設定する：

//         → ブラウザの標準の送信動作をキャンセルする。
//         → 結果表示領域に「送信中です...」と表示する。

//         → reCAPTCHAライブラリの準備が整ったら次の処理を行う：

//             → サイトキーと「submit」アクションを使ってreCAPTCHAトークンを取得する。

//             → トークンが取得できたら、
//                フォームの「recaptchaToken」入力欄にそのトークンをセットする。

//             → トークンを設定したあと、フォームを手動で送信する。


// document.addEventListener('DOMContentLoaded', () => {
//     ➡ ページのHTMLがすべて読み込まれたタイミングで、以下の処理を実行する。

//       const form = document.getElementById('contactForm');
//     ➡ ページ内の id="contactForm" のフォーム要素を取得して、変数 form に格納する。
    
//       const result = document.getElementById('result');
//     ➡ 結果表示用の id="result" の要素を取得し、変数 result に格納する。
    
//       form.addEventListener('submit', (e) => {
//     ➡ フォームが送信されたときに、以下の関数（送信イベントハンドラー）を実行するよう設定する。
    
//         e.preventDefault();
//     ➡ ブラウザのデフォルトの送信動作（ページ遷移など）を止める。JavaScriptで制御するため。
    
//         result.textContent = '送信中です...';
//     ➡ result 要素に「送信中です...」というメッセージを表示する（ユーザーへのフィードバック）。
    
//         grecaptcha.ready(function () {
//     ➡ Google reCAPTCHAのライブラリの準備ができたら、次の関数（トークン取得処理）を実行する。
    
//           grecaptcha.execute('【あなたのサイトキー】', { action: 'submit' }).then(function (token) {
//     ➡ あなたのサイトキーを使って、"submit" というアクション名のトークンを生成する。token に結果が返る。
    
//             document.getElementById('recaptchaToken').value = token;
//     ➡ フォーム内の id="recaptchaToken" の隠しフィールドに取得したトークンをセットする。
    
//             form.submit(); // トークンをセット後、再送信
//     ➡ フォームの内容とトークンを含めて、手動で再度送信する。
    
//           });
//         });
//       });
//     ➡ reCAPTCHA部分とsubmitイベントの処理を終了。