document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target;
          const children = section.querySelectorAll("div");
  
          children.forEach((el, index) => {
            el.style.transitionDelay = `${index * 0.3}s`;
            el.classList.add("is-visible");
          });
  
          observer.unobserve(section);
        }
      });
    }, {
      threshold: 0.2
    });
  
    sections.forEach(section => observer.observe(section));
});

//   document.addEventListener("DOMContentLoaded", () => {
//   HTMLの構造（DOM）がすべて読み込まれたら、この中の処理を実行します。
//   まだ読み込まれていない要素にアクセスするとエラーになるので、DOMが完全にできあがってから処理を始めるためです。
    
//       const sections = document.querySelectorAll(".section");
//     クラス名が「section」のすべての要素を取得して、sections という変数に入れます。    
//     返り値：複数の要素をまとめたNodeList（配列のようなもの）です。
    
//       const observer = new IntersectionObserver((entries, observer) => {
//     新しく「IntersectionObserver（交差監視）」のインスタンスを作っています。
//     特定の要素が画面に表示されたかどうかを監視するための機能です。
    
//     引数：
//     entries：監視対象の状態が変わった要素の配列（それぞれの監視結果）
//     observer：このIntersectionObserver自身（監視を操作するため）
    
//         entries.forEach(entry => {
//     監視対象の要素ごとに順番に処理を行います。
//     entry：1つの監視結果で、どの要素がどのくらい画面に見えているかなどの情報を持ちます。
    
//           if (entry.isIntersecting) {
//     「この要素が画面に見えている状態か？」を判定します。
//     isIntersecting が true なら、要素が少しでも表示されているという意味です。
    
//             const section = entry.target;
//     画面に入った対象の要素を section 変数に格納します。
//     entry.target は監視対象のDOM要素です。
    
//             const direction = section.dataset.direction || "fade-up"; // デフォルト方向 
//     section のHTMLにある data-direction 属性の値を取得します。
//     もし指定がなければ "fade-up"（上からフェードイン）をデフォルトとして使います。
//     dataset はHTMLの data- 属性をJavaScriptから扱うためのプロパティです。

//             const children = section.querySelectorAll("div");
//     section の中にあるすべての <div> 要素を取得します。    
//     それら子要素にアニメーションを順番に付けていくための準備です。
    
//             children.forEach((el, index) => {
//     子要素の1つ1つを順番に処理します。
//     el：現在処理している子要素。
//     index：子要素の順番（0から始まる番号）。
    
//               el.classList.add(direction); // アニメ方向クラス付与
//     子要素に対して、先ほど取得した方向名（例：fade-up、fade-left、zoom-in）のクラスを付けます。
//     CSSでアニメーションの種類を切り替えるためです。

//               el.style.transitionDelay = `${index * 0.2}s`;
//     アニメーションが始まるのを子要素ごとに遅らせます。
//     具体的には：
//     1つ目の要素は 0s
//     2つ目は 0.2s
//     3つ目は 0.4s
//     と順番に遅延をつけてフェードインします。
//     連続的で自然なアニメーションになります。
    
//               el.classList.add("is-visible");
//     子要素に「表示状態」を表すクラスを追加します。
//     CSS側でこのクラスに反応して、フェードインなどのアニメーションが実行されます。
//             });
//     forEach の終了。すべての子要素への処理が終わりました。
    
//             observer.unobserve(section); // 一度表示したら監視解除
//     このセクションは一度アニメーションしたので、これ以上監視しないようにします。
//     パフォーマンスを良くするため。何度もチェックすると無駄が多いからです。
//           }
//     if (entry.isIntersecting) の終わり。
//         });
//     entries.forEach の終わり。監視対象のすべての変化に対して処理が終わりました。
//       }, {
//         threshold: 0.2
//       });
//     IntersectionObserver のオプションです。
//     threshold: 0.2 は、要素の20％が画面内に見えたら「表示された」と判定する設定です。
    
//       sections.forEach(section => observer.observe(section));
//     意味：取得したすべての .section 要素に対して、IntersectionObserver の監視を開始します。
//     });
//     意味：DOMContentLoaded イベントリスナーの終わり。ここまでのコードが、DOM読み込み後に実行されます。
    
//     まとめ
//     ページの読み込みが終わったら、
//     .section クラスの要素を全部取得し、
//     それぞれ画面に表示されたか監視を始め、
//     表示されたら中の子要素に順番にアニメーション用のクラスをつけて、
//     遅延時間をずらして自然なフェードインを実現し、
    
//     一度表示したら監視をやめる、
//     という処理をしています。