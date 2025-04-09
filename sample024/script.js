// 初期表示チェック用の関数
function checkVisibility() {
    const targets = document.querySelectorAll('.fade-in-up');

    targets.forEach(target => {
        const rect = target.getBoundingClientRect(); // 要素の位置を取得
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isVisible) {
            target.classList.add('is-show'); // クラスを追加して表示
        }
    });
}

// 初期チェック
checkVisibility();

// スクロール時にもチェックを行う
window.addEventListener("scroll", checkVisibility);