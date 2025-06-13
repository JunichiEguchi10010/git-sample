const hamburger = document.getElementById("hamburger");
const drawerMenu = document.getElementById("drawerMenu");

hamburger.addEventListener("click", () => {
  drawerMenu.classList.toggle("drawer-open");
});


// const hamburger = document.getElementById("hamburger");
// HTMLドキュメントからIDが "hamburger" の要素を取得して、hamburger という変数に格納しています。 
// 例: ハンバーガーメニューのボタンを指す部分です。

// const drawerMenu = document.getElementById("drawerMenu");
// 同様に、IDが "drawerMenu" の要素を取得して、drawerMenu という変数に格納しています。 
// 例: サイドメニューまたはドロワーメニューを指す部分です。

// hamburger.addEventListener("click", () => {
// hamburger ボタンにクリックイベントリスナーを追加しています。
// クリックされたときに後述の関数（コールバック）が実行されます。

// drawerMenu.classList.toggle("drawer-open");
// drawerMenu の要素にあるクラスリストに対して、"drawer-open" クラスを追加または削除（トグル）しています。 
// 例: サイドメニューの表示／非表示を切り替える動作を制御する部分です。