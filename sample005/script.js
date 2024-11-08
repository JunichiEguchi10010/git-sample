// ォームデータの取得：フォームの入力フィールドからユーザーの情報を取得します。
const form = document.querySelector('.form');
const fname = document.querySelector('.fname');
const email = document.querySelector('.email');
const tel = document.querySelector('.tel');
const subject = document.querySelector('.subject');
const text = document.querySelector('.text');

function sendEmail() {
  // console.log('送信');
  const bodyMsg = `
    お名前：${fname.value}<br>
    メールアドレス：${email.value}<br>
    電話番号：${tel.value}<br>
    件名：${subject.value}<br>
    内容：${text.value}
  `;
  // SMTP.js(https://smtpjs.com/)が提供するメール送信メソッド
  Email.send({
    // メール送信時に認証情報として SecureToken を利用することで、セキュリティが確保されます。この SecureToken はSMTP.jsの設定手順に従って取得する
    // SecureToken: 'xxxxxxxxxxxxxxxxx',
    // To: 'xxxxxxxxx@gmail.com',
    // From: 'xxxxxxxxxxxxxx@gmail.com',
    // SecureToken: '92595d77-110f-4676-b8e9-3d3dc375ab75',// '取得したSecureTokenをここに貼り付ける',
    // SecureToken: '6D8077A7B9E3B6DDF3D5A2444011FBF0D4AE',
    SecureToken: 'acc86bd5-b1a6-40dd-9c9e-009db826f01d',
    To: 'm100010eguchi@gmail.com',
    From: 'm100010eguchi@gmail.com',
    // Subject: 'テスト送信',
    Subject: subject.value,
    // Body: 'こちらはテストメールです',
    Body: bodyMsg,
  }).then((message) => alert("メール送信成功: " + message))
  .catch((error) => console.error("メール送信に失敗しました:", error));
}
// setup an smtp server hereをクリックして右上のログインボタンからログイン
// アンケートは一番上を回答して終了する
// settings→create SMTPでGmailアドレスを入力してcreateボタンをクリック
// hostとusernameとpasswordをポップアップの内容に差し替えてポップアップを閉じる
// settings→manage domains→Email verification→Start verification
// I don’t own a domain→verify email→アドレスを入力→メール検証をクリアしてリロード
// Email verificationでメールアドレスがverifiedになる

// Encrypt your smtp credentialsをクリックして、UserNameとPasswordをコピペして、GenerateToken
// 表示されたトークンをSecureTokenの値にコピペ
// ↑からHostとUsernameとPasswordを削除する

// 必須入力チェック
// 各入力フィールドが空欄でないかを確認し、空欄の場合にエラーメッセージを表示します。
function checkInput() {
  const inputList = document.querySelectorAll('.input');
  for (const input of inputList) {
    // 初期設定: 空欄の場合にエラーを表示
    if (input.value == '') {
      input.classList.add('error');
      input.parentElement.classList.add('error');
    }

    // 入力時のリアルタイムチェック
    // inputList（すべての入力フィールド）をループして、各フィールドが空でないかチェックしています。
    // 空欄のときには .error クラスを追加して赤い枠線とエラーメッセージを表示し、入力があればエラーを取り除きます。
    input.addEventListener('keyup', () => {
      if (input.value == '') {
        input.classList.add('error');
        input.parentElement.classList.add('error');
      } else {
        input.classList.remove('error');
        input.parentElement.classList.remove('error');
      }
    });
    // メールアドレスのフォーマットチェック(正規表現emailRgx)
    // メールアドレスの入力時に正規表現を用いて形式を確認し、不正な場合にmailErrクラスを追加します。
    email.addEventListener('keyup', () => {
      // https://www.javadrive.jp/regex-basic/sample/index13.html
      const emailRgx =
        '^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*.)+[a-zA-Z]{2,}$';
      if (!email.value.match(emailRgx)) {
        email.classList.add('mailErr');// 不正なメールアドレスの場合に mailErr クラスを追加
        email.parentElement.classList.add('mailErr'); // 親要素にも mailErr クラスを追加
      } else {
        email.classList.remove('mailErr'); // 正しいメールアドレスの場合に mailErr クラスを削除
        email.parentElement.classList.remove('mailErr'); // 親要素からも mailErr クラスを削除
      }
    });
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();// フォーム送信を防止
  checkInput();  // 入力チェックを実行
  // sendEmail();
  if (form.querySelectorAll('.error').length === 0) {
    // e.preventDefault();
    sendEmail();// エラーがなければメール送信
  }
});
