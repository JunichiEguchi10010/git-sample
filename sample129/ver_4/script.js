document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const result = document.getElementById('result');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      result.textContent = '送信中です...';
  
      grecaptcha.ready(function () {
        grecaptcha.execute('あなたのサイトキー', {action: 'submit'}).then(function (token) {
          document.getElementById('recaptchaToken').value = token;
          form.submit(); // トークンを埋めたら送信
        });
      });
    });
  });
  