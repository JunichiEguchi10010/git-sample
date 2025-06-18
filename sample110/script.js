document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.fixed-header'); // 固定ヘッダー取得
    const links = document.querySelectorAll('a[href^="#"]');
  
    links.forEach(link => {
      link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
  
        if (targetElement) {
          e.preventDefault();
  
          const headerHeight = header.offsetHeight; // ヘッダーの高さを動的に取得
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerHeight;
  
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  });
  