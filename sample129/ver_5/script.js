document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const result = document.getElementById('result');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      result.textContent = '送信中です...';
  
      grecaptcha.ready(() => {
        grecaptcha.execute('6LeFxxxxxx...', {action: 'submit'}).then((token) => {
          document.getElementById('recaptchaToken').value = token;
          form.submit(); // トークン挿入後にsubmit
        });
      });
    });
  });
  