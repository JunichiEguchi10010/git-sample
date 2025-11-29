document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".js-count-up");
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          startCounter(el);
          observer.unobserve(el); // 1回だけ動かす
        }
      });
    }, {
      threshold: 0.4  // 40%見えたら開始（実務で使いやすい値）
    });
  
    counters.forEach(counter => observer.observe(counter));
  });
  
  
  function startCounter(element) {
    const target = Number(element.dataset.target);
    const duration = Number(element.dataset.duration);
  
    countUp(element, target, duration);
  }
  
  
  function countUp(element, target, duration) {
    let startTime = null;
  
    // 「数字が早すぎる / 遅すぎる」時の自動補正（実務用）
    const minDuration = 800;   // 最短0.8秒（ユーザーに早すぎる印象を与えない）
    const maxDuration = 5000;  // 最長5秒（長すぎて飽きない限界）
    const adjustedDuration = Math.min(Math.max(duration, minDuration), maxDuration);
  
    function update(timestamp) {
      if (!startTime) startTime = timestamp;
  
      const progress = Math.min((timestamp - startTime) / adjustedDuration, 1);
      const value = Math.floor(progress * target);
  
      element.textContent = value.toLocaleString();
  
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
  
    requestAnimationFrame(update);
  }  