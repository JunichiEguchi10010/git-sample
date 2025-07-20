WebDesgin fetch を使った非同期フォーム送信 20250721


サイトキー（sitekey）
6LfKOoQrAAAAAF3803H5UvwNyeYrGleM93KVGVOQ

シークレットキー（secretkey）
6LfKOoQrAAAAAJrnu1ZHDwoKXvoUa8UiEw_HGItI

グーグルアプリパスワード
liaccngouowhcbrq'

グーグルメールアドレス
m100010eguchi@gmail.com

パス
cd C:\Users\eguchijunichi\git-sample\sample129\ver_7\

phpmailerインストール（composer）
composer require phpmailer/phpmailer

composer require vlucas/phpdotenv

ターミナルで起動：ローカルホスト立上げ
bash
php -S localhost:8000



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

          const formData = new FormData(form);

          fetch('send.php', {
            method: 'POST',
            body: formData
          })
          .then(async response => {
            const text = await response.text();
            if (response.ok) {
              result.textContent = '送信が完了しました。ありがとうございます！';
              form.reset();
              // 必要なら画面遷移も可能 → window.location.href = 'thanks.html';
            } else {
              result.textContent = '送信エラー：' + text;
            }
          })
          .catch(error => {
            result.textContent = '通信エラーが発生しました。';
            console.error('通信エラー:', error);
          });
        });
    });
  });
});
