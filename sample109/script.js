// スクロールで.fade-inが表示されたらクラス追加
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
  
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  });

