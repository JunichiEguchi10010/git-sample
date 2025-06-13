document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".menu-toggle");
  const nav = document.getElementById("global-nav");

  toggleButton.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("open");
    toggleButton.classList.toggle("active", isOpen);
    toggleButton.setAttribute("aria-expanded", isOpen);
    nav.setAttribute("aria-hidden", !isOpen);
  });
});


// document.addEventListener("DOMContentLoaded", function () {
//   ページのHTMLが完全に読み込まれた時に実行される関数を登録しています。
// 　これにより、スクリプトがHTMLの要素を操作する前に必ず準備が整っています。
  
//   const toggleButton = document.querySelector(".menu-toggle");
//   .menu-toggle というクラスを持つ要素を探し出し、それを変数 toggleButton に保存しています。
// 　これは、クリックするためのボタン要素になります。
  
//   const nav = document.getElementById("global-nav");
//   id="global-nav" を持つ要素を取得し、それを nav という変数に保存しています。
// 　この要素がナビゲーションメニューとなります。
  
//   toggleButton.addEventListener("click", function () {
//   toggleButton をクリックした時に実行される関数を定義しています。
// 　この部分がクリックイベントのスタートです。
  
//   const isOpen = nav.classList.toggle("open");
//   nav 要素のクラスに "open" を追加または削除しています。
// 　追加された場合はメニューが開き、削除された場合は閉じます。
// 　その結果（開いているかどうか）を isOpen に保存します。
  
// open は、グローバルナビゲーション（メニュー）を開閉する状態をコントロールするためのクラス名です。
// 以下の仕組みで動いています：
// 閉じている状態 (.global-nav) 初期状態では、max-height: 0; が設定されているため、メニューが見えない状態になります。
// また、overflow: hidden; により、スクロールなども発生しない仕組みです。
// 開いている状態 (.global-nav.open) open クラスが追加されると、max-height: 300px; に変更されます。これにより、メニューが表示されるようになります。
// また、transition: max-height 0.3s ease; のおかげで、開閉の動作がスムーズにアニメーションされます。
// つまり、isOpen = nav.classList.toggle("open"); によって、
// クリックのたびに open クラスが追加・削除され、ナビゲーションの開閉が動的に切り替わりま


//   toggleButton.classList.toggle("active", isOpen);
//   ボタン自体のクラスに "active" を追加・削除しています。
// 　isOpen に基づいて、状態を同期させています。
  
//   toggleButton.setAttribute("aria-expanded", isOpen);
//   toggleButton の aria-expanded 属性を設定します。
// 　true（開いている場合）または false（閉じている場合）を指定し、アクセシビリティ向上を図っています。
  
//   nav.setAttribute("aria-hidden", !isOpen); 
//   nav 要素の aria-hidden 属性を設定します。
// 　メニューが閉じている場合は true、開いている場合は false を指定して、スクリーンリーダー等での正しい動作を保証します。