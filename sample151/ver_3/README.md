Javascript Swiper.js サムネイル付きギャラリー スニペット 20250813

🧭 スニペット一覧と挙動概要
スニペット名	            挙動概要
① ベーシックカルーセル	    横スクロール、ループ、ナビゲーション付き
② カード型カルーセル	    複数枚表示、レスポンシブで枚数調整
③ サムネイル付きギャラリー	メイン画像＋サムネイル連動


✅ 1. fade エフェクトを追加する場合
🔧 script.js
js
const thumbsSwiper = new Swiper('.gallery-thumbs', {
  slidesPerView: 4,
  spaceBetween: 10,
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
});

const mainSwiper = new Swiper('.gallery-main', {
  spaceBetween: 10,
  loop: true,
  effect: 'fade', // フェードアニメーション
  fadeEffect: {
    crossFade: true
  },
  thumbs: {
    swiper: thumbsSwiper
  }
});
✅ 特徴
スライドがふわっと切り替わる。
画像の印象が柔らかくなる。
crossFade: true により前後の画像が滑らかに重なる。

✅ 2. coverflow エフェクトを追加する場合
🔧 script.js
js
const thumbsSwiper = new Swiper('.gallery-thumbs', {
  slidesPerView: 4,
  spaceBetween: 10,
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
});

const mainSwiper = new Swiper('.gallery-main', {
  loop: true,
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 30,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true
  },
  thumbs: {
    swiper: thumbsSwiper
  }
});
✅ 特徴
3D風の立体感あるスライド。
中央の画像が強調され、左右に傾いたサムネイルが並ぶ。
slidesPerView: 'auto' により画像サイズに応じた表示。

✅ 注意点
fade や coverflow を使う場合、CSSの .swiper に overflow: visible を加えると表示が安定します。
coverflow はサムネイル連携と併用すると少し複雑になるため、必要に応じて centeredSlides: false に調整可能です。