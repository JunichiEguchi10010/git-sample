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
  

// 1️⃣ コードの全体像
// .gallery-thumbs に対してサムネイル用のSwiperを初期化
// 4枚表示
// スライド間に10pxの余白
// スライドの進行状況と表示状態を監視（連携のため）
// .gallery-main に対してメイン画像用のSwiperを初期化
// スライド間に10pxの余白
// ループ再生を有効化（最後→最初へ自動で戻る）
// fade エフェクトでふわっと切り替える
// crossFade: true により前後の画像が滑らかに重なる
// thumbs.swiper により、サムネイルSwiperとメインSwiperが連携
// サムネイルをクリックすると、対応するメイン画像に切り替わる
// メイン画像をスライドすると、サムネイルのアクティブ状態も更新される


// 2️⃣ 擬似コード
// js
// // サムネイル用のSwiperを作成
// サムネイルスライダー = 新しいSwiperインスタンス('.gallery-thumbs', {
//   表示枚数: 4枚,
//   スライド間の余白: 10px,
//   スライドの進行状況を監視: 有効,
//   スライドの表示状態を監視: 有効
// });

// // メイン画像用のSwiperを作成
// メインスライダー = 新しいSwiperインスタンス('.gallery-main', {
//   スライド間の余白: 10px,
//   ループ再生: 有効,
//   アニメーション効果: 'フェード',
//   フェード設定: {
//     クロスフェード: 有効（前後の画像が滑らかに重なる）
//   },
//   サムネイル連携: {
//     使用するSwiper: サムネイルスライダー
//   }
// });

// 3️⃣ コードの解説
// const thumbsSwiper = new Swiper('.gallery-thumbs', {
// .gallery-thumbs というクラスを持つ要素に対して、サムネイル用のSwiperインスタンスを作成します。

//   slidesPerView: 4,
// 画面に4枚のサムネイル画像を同時に表示します。

//   spaceBetween: 10,
// 各サムネイルスライドの間に10pxの余白を設けます。

//   watchSlidesProgress: true,
// スライドの進行状況（どのスライドが表示されているか）を監視します。メインスライダーとの連携に必要です。

//   watchSlidesVisibility: true,
// スライドが表示領域内にあるかどうかを監視します。これも連携の精度を高めるために使われます。

// });
// サムネイルSwiperの設定が完了し、インスタンスが生成されます。

// const mainSwiper = new Swiper('.gallery-main', {
// .gallery-main というクラスを持つ要素に対して、メイン画像用のSwiperインスタンスを作成します。

//   spaceBetween: 10,
// メイン画像スライド間に10pxの余白を設けます。

//   loop: true,
// 最後のスライドの次に最初のスライドが表示されるように、無限ループで再生されます。

//   effect: 'fade', // フェードアニメーション
// スライド切り替え時にフェード（ふわっと消えて現れる）アニメーションを使用します。

//   fadeEffect: {
//     crossFade: true
//   },
// crossFade: true により、前の画像が徐々に消えながら次の画像が現れる滑らかな切り替えになります。

//   thumbs: {
//     swiper: thumbsSwiper
//   }
// thumbsSwiper（サムネイルSwiper）と連携させる設定です。サムネイルをクリックすると、対応するメイン画像に切り替わります。

// });
// メインSwiperの設定が完了し、インスタンスが生成されます。