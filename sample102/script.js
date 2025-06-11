document.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector(".loading-container");

    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
            // 透明度が0になった後、display: none で完全に消去
        }, 500);
    }, 3000);
    // JavaScriptで3秒後にフェードアウト (setTimeout) 必要なら時間を調整
});
