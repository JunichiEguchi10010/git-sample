document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll("img.lazy");
  
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove("lazy");
            observer.unobserve(img);
          }
        });
      });
  
      lazyImages.forEach(img => observer.observe(img));
    } else {
      // 古いブラウザ：即座に画像を読み込む
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.classList.remove("lazy");
      });
    }
  });
  


  
// ✅ コード解説
// document.addEventListener("DOMContentLoaded", function () {
// 🟡 解説：
// このコードは、「HTMLがすべて読み込まれた後（DOM構造が完成した後）」に中の関数を実行するという意味です。
// ブラウザが画像やCSSをすべて読み込む前に、HTML要素（imgなど）だけ先に操作できるようにするためです。

// const lazyImages = document.querySelectorAll("img.lazy");
// 🟡 解説：
// HTML内の <img> タグのうち、クラス名が lazy の画像をすべて選び、NodeList（配列のようなもの）として変数 lazyImages に代入します。
// これが遅延読み込みの対象となる画像たちです。

// if ("IntersectionObserver" in window) {
// 🟡 解説：
// IntersectionObserver という機能（API）が使えるかどうかをチェックしています。
// これは、要素が画面内に入ったかどうかを自動で判定してくれるモダンな機能です。
// 使えない古いブラウザのときは、後ろの else に進みます。

//  const observer = new IntersectionObserver((entries, observer) => {
// 🟡 解説：
// ここで「監視員（observer）」を作っています。
// entries は監視している画像たちが、画面内に入ったかどうかをまとめて持ってくる情報の集まりです。
// 画像1つ1つに対して処理をしていく準備です。

//    entries.forEach(entry => {
// 🟡 解説：
// 監視対象（画像）が複数あるので、1つ1つに対してループ処理を行います。
// entry は各画像に関する状態情報（位置や交差状況）を表しています。

//      if (entry.isIntersecting) {
// 🟡 解説：
// この行で「画像が画面内に入ったとき」だけ処理を実行するようにしています。
// isIntersecting が true のときは、その画像が今まさにユーザーの画面に現れているということです。

//        const img = entry.target;
// 🟡 解説：
// entry.target は画面内に入ってきた画像の要素そのものです。
// それを img という変数に代入して扱いやすくしています。

//        img.src = img.dataset.src;
// 🟡 解説：
// 画像の src 属性に、本物の画像URLを代入しています。
// このURLは data-src というカスタム属性に格納されていたもので、これで初めて画像が読み込まれるようになります。

//        img.classList.remove("lazy");
// 🟡 解説：
// 画像に付けられていた lazy クラスを取り除きます。
// これによって「もう遅延読み込み対象ではない」と明示し、同じ画像に2度処理をしないようにします。

//        observer.unobserve(img);
// 🟡 解説：
// その画像の監視を解除します。
// 一度読み込んだ画像はもう監視する必要がないため、処理の効率を上げるために解除します。

//      }
//    });
//  });
// 🟡 解説：
// 監視員（observer）の中の処理がここで終わります。
// 画像が画面に入ってきたときにだけ読み込みが行われるようになっています。

//  lazyImages.forEach(img => observer.observe(img));
// 🟡 解説：
// 先ほど取得した全ての lazy クラスの画像を、順番に observer に登録（監視開始）しています。
// これでスクロール中に画像が画面に入ってきた瞬間に読み込まれるようになります。

// } else {
// 🟡 解説：
// ここは IntersectionObserver に対応していない古いブラウザ用のフォールバック処理です。

//  lazyImages.forEach(img => {
//    img.src = img.dataset.src;
//    img.classList.remove("lazy");
//  });
// 🟡 解説：
// 古いブラウザでは、遅延読み込みは使わずに最初からすぐに全画像を読み込むようにします。
// 一応動くようにする保険のような処理です。

// });
// 🟡 解説：
// 最初の DOMContentLoaded の括りを閉じます。
// これで、HTML構造が完成した後に画像の遅延読み込み処理が走る仕組みが完成です。

// ✅ まとめ（全体の流れ）
// 遅延対象の画像（クラスがlazy）を取得
// IntersectionObserverが使えるか判定
// 使える → 画像が画面に入ったら本物の画像を読み込み
// 使えない → 最初から全画像を読み込む
// 読み込んだ画像は監視対象から外す（無駄を減らす）
