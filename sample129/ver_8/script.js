document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const result = document.getElementById('result');

  const fields = {
    name: {
      input: document.getElementById('name'),
      error: document.getElementById('nameError'),
      message: 'お名前は2文字以上で、日本語または英字で入力してください。'
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('emailError'),
      message: '正しいメールアドレス形式で入力してください。'
    },
    message: {
      input: document.getElementById('message'),
      error: document.getElementById('messageError'),
      message: 'お問い合わせ内容は10文字以上で入力してください。'
    }
  };

  Object.values(fields).forEach(({ input, error, message }) => {
    input.addEventListener('input', () => {
      if (input.validity.valid) {
        error.textContent = '';
      } else {
        error.textContent = message;
      }
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;

    Object.values(fields).forEach(({ input, error, message }) => {
      if (!input.validity.valid) {
        error.textContent = message;
        isValid = false;
      } else {
        error.textContent = '';
      }
    });

    if (!isValid) {
      result.textContent = '入力内容に不備があります。';
      return;
    }

    result.textContent = '送信中...';

    grecaptcha.ready(() => {
      grecaptcha.execute('6LfKOoQrAAAAAF3803H5UvwNyeYrGleM93KVGVOQ', { action: 'submit' })
        .then(token => {
          document.getElementById('recaptchaToken').value = token;

          // ★送信開始時刻を記録
          const start = Date.now();
          const formData = new FormData(form);
          fetch('send.php', {
            method: 'POST',
            body: formData
          })
          .then(async response => {
            // ★送信終了時刻を記録
            const end = Date.now();
            const elapsed = (end - start) / 1000;
            if (response.redirected) {
              alert(`送信処理時間: ${elapsed}秒`);
              window.location.href = response.url;
              return;
            }
            const text = await response.text();
            result.textContent = text;
          })
          .catch(() => {
            const end = Date.now();
            const elapsed = (end - start) / 1000;
            alert(`送信処理時間: ${elapsed}秒`);
            result.textContent = '送信中にエラーが発生しました。';
          });
        });
    });
  });
}); 


// 🟥 疑似コード
// 【1】ページが読み込まれたら次の処理を開始
//   └ フォーム要素（contactForm）と結果表示用要素（result）を取得

// 【2】バリデーション対象の各フィールド（名前、メール、メッセージ）を定義
//   └ それぞれのinput要素、エラー表示エリア、エラーメッセージをセットで登録

// 【3】各フィールドに「リアルタイム入力チェック」のイベントを追加
//   └ 入力のたびにvalidity（HTML5バリデーション）でチェックし、
//      問題があればエラーメッセージを表示。なければ非表示にする

// 【4】フォームが送信された時の処理を設定
//   └ デフォルトの送信動作を止める（e.preventDefault）

// 【5】バリデーション実行（submit時）
//   └ 各フィールドを再チェックし、不正があればエラー表示と送信中止
//   └ 問題がなければ「送信中...」というメッセージを表示

// 【6】Google reCAPTCHA v3 を準備（grecaptcha.ready）
//   └ action=submit で reCAPTCHAトークンを取得する

// 【7】reCAPTCHAトークンをhiddenフィールドにセット

// 【8】フォームデータを FormData で準備し、fetch で send.php に送信

// 【9】送信の処理時間を測定（開始時刻を記録）

// 【10】サーバーからの応答処理
//   └ 応答がリダイレクトだった場合：
//        → 経過時間をアラートで表示し、リダイレクト先に遷移
//   └ 通常応答だった場合：
//        → レスポンスのテキストを取得し、resultに表示

// 【11】送信エラー時の処理
//   └ 経過時間をアラートで表示し、「送信中にエラーが発生しました」と表示


// 🟥 コード解説
// // ページの読み込みが完了したら、フォーム処理を開始
// document.addEventListener('DOMContentLoaded', () => {

//   // フォーム本体と、結果表示領域を取得
//   const form = document.getElementById('contactForm');
//   const result = document.getElementById('result');

//   // 入力フィールドごとのバリデーション情報（入力欄、エラー欄、エラーメッセージ）を定義
//   const fields = {
//     name: {
//       input: document.getElementById('name'),               // 名前の入力欄
//       error: document.getElementById('nameError'),          // 名前のエラーメッセージ表示欄
//       message: 'お名前は2文字以上で、日本語または英字で入力してください。' // 名前用のエラーメッセージ
//     },
//     email: {
//       input: document.getElementById('email'),              // メールの入力欄
//       error: document.getElementById('emailError'),         // メールのエラーメッセージ表示欄
//       message: '正しいメールアドレス形式で入力してください。'           // メール用のエラーメッセージ
//     },
//     message: {
//       input: document.getElementById('message'),            // お問い合わせ本文の入力欄
//       error: document.getElementById('messageError'),       // 本文のエラーメッセージ表示欄
//       message: 'お問い合わせ内容は10文字以上で入力してください。'        // 本文用のエラーメッセージ
//     }
//   };

//   // 各フィールドに対し、入力ごとのリアルタイムバリデーションを設定
//   Object.values(fields).forEach(({ input, error, message }) => {
//     input.addEventListener('input', () => {
//       if (input.validity.valid) {
//         error.textContent = ''; // 入力が正しければエラーメッセージを消す
//       } else {
//         error.textContent = message; // 不正ならメッセージ表示
//       }
//     });
//   });

//   // フォーム送信時の処理を定義
//   form.addEventListener('submit', function (e) {
//     e.preventDefault(); // フォームの標準送信動作をキャンセル
//     let isValid = true; // バリデーション判定用フラグ

//     // 各フィールドをチェックし、1つでもエラーがあれば送信中止
//     Object.values(fields).forEach(({ input, error, message }) => {
//       if (!input.validity.valid) {
//         error.textContent = message; // 該当エラーメッセージを表示
//         isValid = false;
//       } else {
//         error.textContent = ''; // エラーなしならメッセージ非表示
//       }
//     });

//     if (!isValid) {
//       result.textContent = '入力内容に不備があります。'; // バリデーションエラー時に通知
//       return;
//     }

//     result.textContent = '送信中...'; // 正常なら「送信中」表示

//     // reCAPTCHAの準備ができたら実行
//     grecaptcha.ready(() => {
//       // サイトキーを使ってreCAPTCHAトークンを取得
//       grecaptcha.execute('6LfKOoQrAAAAAF3803H5UvwNyeYrGleM93KVGVOQ', { action: 'submit' })
//         .then(token => {
//           // 取得したトークンをhiddenフィールドに設定
//           document.getElementById('recaptchaToken').value = token;

//           const start = Date.now(); // ★送信開始時間を記録

//           // フォームデータをまとめて取得
//           const formData = new FormData(form);

//           // fetch APIでPHPへPOST送信
//           fetch('send.php', {
//             method: 'POST',
//             body: formData
//           })
//           .then(async response => {
//             const end = Date.now(); // ★送信終了時間を記録
//             const elapsed = (end - start) / 1000; // 処理時間（秒）

//             if (response.redirected) {
//               // リダイレクトが発生した場合（例: thanks.html）
//               alert(`送信処理時間: ${elapsed}秒`);
//               window.location.href = response.url; // リダイレクト先へ遷移
//               return;
//             }

//             // 通常レスポンス時のメッセージ表示
//             const text = await response.text();
//             result.textContent = text;
//           })

//           ✅ このコードの主な特徴
//           HTML5バリデーション（validity.valid）で基本チェックを実装
          
//           Google reCAPTCHA v3 によるスパム防止
          
//           fetch + FormData による非同期送信
          
//           サーバーからのリダイレクトも自動追従
          
//           処理時間を表示することでパフォーマンスも可視化