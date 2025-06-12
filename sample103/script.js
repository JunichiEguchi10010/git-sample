document.addEventListener("DOMContentLoaded", () => {
    const wrappers = document.querySelectorAll(".curtain-wrapper");
  
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.4, // 表示領域の40%入ったら
      }
    );
  
    wrappers.forEach(wrapper => observer.observe(wrapper));
  });
  