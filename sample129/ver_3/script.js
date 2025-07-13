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
  