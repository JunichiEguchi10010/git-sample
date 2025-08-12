new Swiper('.basic-swiper', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    }
  });
  
//   🔄コードの全体像
//   ページ読み込み後、.basic-swiper クラスの要素に対して Swiper を初期化。
//  スライドはループ設定されているため、最後のスライドの次は最初に戻る。
//  .swiper-pagination にドットナビゲーションが表示され、クリックで任意のスライドに移動可能。
//  .swiper-button-next と .swiper-button-prev により、左右の矢印で手動操作が可能。
//  自動再生が有効になっており、4秒ごとに次のスライドへ移動。
//  ユーザーが矢印やドットを操作しても、自動再生は止まらず継続する。

//    📘疑似コード（コメント付き）
//    カルーセル（.basic-swiper）を初期化する
//   - スライドをループさせる（最後の次は最初に戻る）

//   - ページネーション（ドットナビ）を表示する
//     - 要素は .swiper-pagination
//     - ドットをクリック可能にする

//   - ナビゲーションボタンを設定する
//     - 次へボタンは .swiper-button-next
//     - 前へボタンは .swiper-button-prev

//   - 自動再生を設定する
//     - 1枚あたりの表示時間は4000ミリ秒（4秒）
// //      - ユーザーが操作しても自動再生は止めない

// ✅ コード解説
// new Swiper('.basic-swiper', {
// 👉 .basic-swiper というクラスを持つ要素に対して、Swiper（カルーセル）を初期化します。

//   loop: true,
// 👉 スライドをループさせます。最後のスライドの次は最初に戻り、無限に回り続けます。

//   pagination: {
//     el: '.swiper-pagination',
//     clickable: true
//   },
// 👉 ページネーション（ドットナビ）を表示します。

// el: '.swiper-pagination'：ドットを表示する要素を指定。

// clickable: true：ドットをクリックするとそのスライドに移動できます。

//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev'
//   },
// 👉 左右のナビゲーションボタン（矢印）を設定します。

// nextEl：次へ進むボタンのセレクター。

// prevEl：前へ戻るボタンのセレクター。

//   autoplay: {
//     delay: 4000,
//     disableOnInteraction: false
//   }
// 👉 自動再生の設定です。

// delay: 4000：4秒ごとに次のスライドへ自動で切り替わります。

// disableOnInteraction: false：ユーザーが操作しても自動再生は止まりません。

// });
// 👉 Swiperの初期化が完了します。