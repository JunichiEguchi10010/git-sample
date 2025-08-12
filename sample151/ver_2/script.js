new Swiper('.card-swiper', {
    slidesPerView: 1.2,
    spaceBetween: 16,
    loop: true, // ループ再生
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      640: {
        slidesPerView: 2.2
      },
      1024: {
        slidesPerView: 3.2
      }
    },
    effect: 'slide', // 他に 'fade', 'cube', 'coverflow', 'flip' なども可
    speed: 600 // アニメーション速度（ms）
  });
 
  

//   ✅ コードの全体像
//   ページ読み込み時に .card-swiper 要素を対象に Swiper を初期化
//   初期状態では 1.2 枚のカードを横並びで表示（モバイル向け）
//   画面サイズが広がると、表示枚数が 2.2 → 3.2 に変化（レスポンシブ対応）
//   スライドはループ再生され、最後の次に最初が表示される
//   ページ下部にドット型のページネーションが表示され、クリックで移動可能
//   左右にナビゲーションボタンが表示され、クリックで前後に移動可能
//   スライド切り替え時には「slide」効果で滑らかに移動  
//   アニメーション速度は 600ms（0.6秒）で設定されている

//  ✅ 疑似コード
//   Swiperライブラリを使ってカルーセルを初期化する

// 対象のHTML要素（.card-swiper）に対して以下の設定を適用：

// - slidesPerView: 1.2
//   → 画面に1.2枚分のカードを表示（少し次のカードが見える）

// - spaceBetween: 16
//   → スライド間の余白を16pxに設定

// - loop: true
//   → 最後のスライドの次に最初のスライドが表示されるようにループ再生

// - pagination:
//     el: '.swiper-pagination'
//     → ページネーション（ドット）を表示する要素を指定
//     clickable: true
//     → ドットをクリックしてスライドを切り替え可能にする

// - navigation:
//     nextEl: '.swiper-button-next'
//     prevEl: '.swiper-button-prev'
//     → 左右のナビゲーションボタンを指定

// - breakpoints:
//     画面幅に応じて表示枚数を変更
//     - 640px以上 → 2.2枚表示
//     - 1024px以上 → 3.2枚表示

// - effect: 'slide'
//   → スライド切り替え時のアニメーション効果（他にfade, cubeなども選択可能）

// - speed: 600
//   → スライド切り替えのアニメーション速度（600ミリ秒）


// ✅ コード解説
// new Swiper('.card-swiper', {
// 👉 .card-swiper というクラスを持つ要素に対して、Swiperカルーセルを初期化します。

//   slidesPerView: 1.2,
// 👉 画面に1.2枚分のスライドを表示します。次のスライドが少し見えている状態になり、スワイプを促す視覚効果があります。

//   spaceBetween: 16,
// 👉 各スライドの間に16pxの余白を設けます。カード同士がくっつかず、見やすくなります。

//   loop: true, // ループ再生
// 👉 最後のスライドの次に最初のスライドが表示されるように、無限ループで再生されます。

//   pagination: {
//     el: '.swiper-pagination',
//     clickable: true
//   },
// 👉 ページネーション（ドットナビ）を表示します。

// el: ドットを表示する要素のセレクター。

// clickable: ドットをクリックするとそのスライドに移動できるようにします。

//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev'
//   },
// 👉 左右のナビゲーションボタン（矢印）を設定します。

// nextEl: 次へ進むボタンのセレクター。

// prevEl: 前へ戻るボタンのセレクター。

//   breakpoints: {
//     640: {
//       slidesPerView: 2.2
//     },
//     1024: {
//       slidesPerView: 3.2
//     }
//   },
// 👉 画面サイズに応じて表示枚数を変更するレスポンシブ設定です。

// 幅640px以上 → 2.2枚表示。

// 幅1024px以上 → 3.2枚表示。

//   effect: 'slide', // 他に 'fade', 'cube', 'coverflow', 'flip' なども可
// 👉 スライド切り替え時のアニメーション効果を指定します。

// 'slide': 通常のスライド移動。

// 他にも 'fade'（フェード）、'coverflow'（3D風）などが選べます。

//   speed: 600 // アニメーション速度（ms）
// 👉 スライド切り替えのアニメーション速度を600ミリ秒（0.6秒）に設定します。速すぎず、ゆっくりすぎず、ちょうどよい滑らかさです。

// });
// 👉 Swiperの設定が完了し、カルーセルが動作を開始します。