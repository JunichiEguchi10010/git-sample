document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const result = document.getElementById('result');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      result.textContent = '送信中です...';
 
      grecaptcha.ready(function () {
        grecaptcha.execute('6LfKOoQrAAAAAF3803H5UvwNyeYrGleM93KVGVOQ', {action: 'submit'}).then(function (token) {
          document.getElementById('recaptchaToken').value = token;
          form.submit(); // サイトキー トークンを埋めたら送信
        });
      });
    });
  });
  