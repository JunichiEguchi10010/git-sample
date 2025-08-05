document.addEventListener("DOMContentLoaded", () => {
    // ✅ アコーディオン切り替え
    const accordionToggle = document.getElementById("accordionToggle");
    const accordionContent = document.getElementById("accordionContent");
  
    accordionToggle.addEventListener("click", () => {
      accordionContent.classList.toggle("open");
    });
  
    // ✅ ポップアップ切り替え
    const popupToggle = document.getElementById("popupToggle");
    const popup = document.getElementById("popup");
  
    popupToggle.addEventListener("click", () => {
      popup.classList.toggle("show");
    });
  });
  