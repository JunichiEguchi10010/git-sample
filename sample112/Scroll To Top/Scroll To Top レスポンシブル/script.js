document.addEventListener('DOMContentLoaded', () => {
    const scrollBtn = document.getElementById('scrollToTopBtn');
  
    // 表示しきい値をデバイス幅に応じて返す関数
    const getScrollThreshold = () => {
      const width = window.innerWidth;
      if (width >= 1024) return 400; // PC
      if (width >= 768) return 300;  // タブレット
      return 150;                    // スマホ
    };
  
    // スクロール時の表示制御
    window.addEventListener('scroll', () => {
      const threshold = getScrollThreshold();
      if (window.scrollY > threshold) {
        scrollBtn.classList.add('show');
      } else {
        scrollBtn.classList.remove('show');
      }
    });
  
    // スムーススクロールでトップへ戻る
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });
  