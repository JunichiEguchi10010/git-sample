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
      console.log('reCAPTCHA is ready 読み込み成功'); // ← ここが出れば読み込み成功！
      grecaptcha.execute('6LfKOoQrAAAAAF3803H5UvwNyeYrGleM93KVGVOQ', { action: 'submit' })
        .then(token => {
          console.log('Token取得OK:', token); // ← ここが出ればトークン取得OK！

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
          console.log('PHP応答:', text); // ← PHP側のレスポンスを確認
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