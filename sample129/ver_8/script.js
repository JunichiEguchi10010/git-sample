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

          const start = Date.now();
          const formData = new FormData(form);
          fetch('send.php', {
            method: 'POST',
            body: formData
          })
          .then(async response => {
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
            result.textContent = '送信中にエラーが発生しました。';
          });
        });
    });
  });
});