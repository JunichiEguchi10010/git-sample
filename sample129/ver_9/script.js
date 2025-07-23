document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const result = document.getElementById('result');
  const thankYou = document.getElementById('thankYouMessage');

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
      // サイトキ―登録
      grecaptcha.execute('6LfKOoQrAAAAAF3803H5UvwNyeYrGleM93KVGVOQ', { action: 'submit' })
        .then(token => {

          document.getElementById('recaptchaToken').value = token;

          const formData = new FormData(form);
          // fetch送信はこの中で実行
          fetch('send.php', {
            method: 'POST',
            body: formData
          })
          .then(async response => {
            if (response.ok) {
              form.reset();
              result.textContent = '';
              thankYou.classList.add('show');
              thankYou.style.display = 'block';
              setTimeout(() => {
                thankYou.classList.remove('show');
                thankYou.style.display = 'none';
              }, 5000);
            } else {
              const text = await response.text();
              result.textContent = text || '送信に失敗しました。';
            }
          })
          .catch(() => {
            result.textContent = '送信中にエラーが発生しました。';
          });
        });
    });
  });
}); 


// 🟥 フォーム処理の全体的な流れ
// 初期化処理
// ・フォームとメッセージ表示要素を取得
// ・入力欄（名前・メール・お問い合わせ内容）を監視してバリデーション

// 送信時の処理
// ・デフォルトの送信をキャンセル（ページ遷移防止）
// ・全入力欄を確認し、不備があればエラー表示して終了
//・ 正常なら「送信中...」を表示し、reCAPTCHAのトークン取得
// ・入力データ＋トークンを fetch で送信（非同期）

// 送信結果の処理
// ・成功：フォームリセット、完了メッセージ表示（一定時間で非表示）
//  ※fetch による送信処理でレスポンス(response.ok)が正常（ステータス 200 番台）だった場合に「お問い合わせ完了」のメッセージが表示される
// ・失敗：エラーメッセージ表示
// ・例外発生：汎用エラーメッセージ表示


//  🟥 疑似コード
// 【ページ読み込み時に以下の処理を開始】

// 1. フォーム要素や、表示メッセージ用の要素を取得する

// 2. 「名前」「メール」「お問い合わせ内容」の3つの入力欄について：
//    └ ユーザーが入力するたびに、その内容が妥当かをチェックし、
//       - 問題がなければエラーメッセージを非表示
//       - 問題がある場合は、該当する警告メッセージを表示する

// 【フォーム送信時の処理】

// 3. ブラウザ標準の送信動作をキャンセルする（ページ遷移を防ぐ）

// 4. 入力欄をすべてチェックして、不備がないか確認
//    └ もし不備があれば、「入力内容に不備があります」と表示し処理を終了

// 5. 不備がなければ「送信中...」と表示する

// 6. Google reCAPTCHA のトークンを取得する
//    └ 取得したトークンを hidden フィールドにセット

// 7. フォームの入力内容（+ reCAPTCHA トークン）を送信する（fetch による非同期通信）

// 8. fetch の送信処理の結果に応じて以下の対応：

//    ● 成功した場合：
//      - フォーム入力欄をリセット（空欄に戻す）
//      - 送信中のメッセージを消す
//      - 「お問い合わせありがとうございました」などの完了メッセージを表示
//      - 5秒後にそのメッセージを非表示にする

//    ● 失敗した場合：
//      - サーバーから返ってきたエラーメッセージ（もしくは汎用メッセージ）を表示

// 【例外が発生したとき】
//    └ 「送信中にエラーが発生しました」と表示する


// 🟥 コード解説
// document.addEventListener('DOMContentLoaded', () => {
//   → ページのHTMLがすべて読み込まれた後に、以下の処理を実行する（DOMが操作可能になったタイミング）
  
//   📑 必要なDOM要素を取得する
//     const form = document.getElementById('contactForm');
//   → お問い合わせフォーム全体を取得
  
//     const result = document.getElementById('result');
//   → エラーメッセージや処理状況などを表示する領域
  
//     const thankYou = document.getElementById('thankYouMessage');
//   → 送信完了メッセージの表示領域
  
//   ✍️ フォーム入力項目の設定（入力欄＋エラーメッセージ領域）
//     const fields = {
//   → 入力項目の情報をひとまとめに管理するオブジェクトを定義
  
//   👤 名前欄の設定
//       name: {
//         input: document.getElementById('name'),
//         error: document.getElementById('nameError'),
//         message: 'お名前は2文字以上で、日本語または英字で入力してください。'
//       },
//   ✉️ メール欄の設定
//       email: {
//         input: document.getElementById('email'),
//         error: document.getElementById('emailError'),
//         message: '正しいメールアドレス形式で入力してください。'
//       },
//   📝 メッセージ欄の設定
//       message: {
//         input: document.getElementById('message'),
//         error: document.getElementById('messageError'),
//         message: 'お問い合わせ内容は10文字以上で入力してください。'
//       }
//     };
//   → 以上の3つの入力欄それぞれに、対応するエラー表示とバリデーションメッセージを設定
  
//   🖊 リアルタイムバリデーション（入力のたびにエラーを表示）
//     Object.values(fields).forEach(({ input, error, message }) => {
//       input.addEventListener('input', () => {
//   → 各入力欄に対して「入力イベント」を設定（文字が入力された瞬間に実行）
  
//         if (input.validity.valid) {
//           error.textContent = '';
//         } else {
//           error.textContent = message;
//         }
//   → 入力が正しければエラーを消す、間違っていれば指定メッセージを表示

//       });
//     });
//   📮 フォーム送信時の処理
//     form.addEventListener('submit', function (e) {
//       e.preventDefault();
//   → 通常の送信動作を止め、JS側で送信処理を制御する
  
//   ✅ 入力項目のバリデーションチェック
//       let isValid = true;

//       Object.values(fields).forEach(({ input, error, message }) => {
//         if (!input.validity.valid) {
//           error.textContent = message;
//           isValid = false;
//         } else {
//           error.textContent = '';
//         }
//       });
//   → 全項目をチェックし、不備があればメッセージ表示＋送信を止めるフラグを立てる
  
//       if (!isValid) {
//         result.textContent = '入力内容に不備があります。';
//         return;
//       }
//   → 不備があった場合はここで処理を終了
  
//   ⌛ reCAPTCHAのトークン取得と表示更新

//       result.textContent = '送信中...';
//   → ユーザーに送信処理中であることを伝える
  
//       grecaptcha.ready(() => {
//   → Google reCAPTCHAの処理開始準備
  
//         grecaptcha.execute('6LfKOoQrAAAAAF3803H5UvwNyeYrGleM93KVGVOQ', { action: 'submit' })
//           .then(token => {
//   → reCAPTCHA v3 による「トークン」を取得（ユーザーが人間かどうかの判断材料）
  
//             document.getElementById('recaptchaToken').value = token;
//   → トークンを hidden フィールドにセットしてフォームに含める
  
//   🚀 fetch による非同期送信処理
//             const formData = new FormData(form);
//   → フォームデータを FormData オブジェクトに変換

//             fetch('send.php', {
//               method: 'POST',
//               body: formData
//             })
//   → send.php に対して、データを非同期で送信
  
//   📬 サーバーの応答処理（成功 or エラー）
//             .then(async response => {
//               if (response.ok) {
//   → 成功した場合
  
//                 form.reset();
//                 result.textContent = '';
//                 thankYou.classList.add('show');
//                 thankYou.style.display = 'block';
//   → フォームをリセットし、完了メッセージを表示
  
//                 setTimeout(() => {
//                   thankYou.classList.remove('show');
//                   thankYou.style.display = 'none';
//                 }, 5000);
//   → 5秒後にメッセージを自動で非表示にする

//               } else {
//                 const text = await response.text();
//                 result.textContent = text || '送信に失敗しました。';
//               }
//   → 失敗した場合は、エラー内容を表示
  
//   ⚠️ 通信エラー処理（fetchの失敗）
//             })
//             .catch(() => {
//               result.textContent = '送信中にエラーが発生しました。';
//             });
//   🔚 reCAPTCHA の終了
//           });
//       });
//     });
//   });