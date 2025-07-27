// Lenis 初期化（スムーススクロール）
const lenis = new Lenis({
  duration: 2.0,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,
  direction: 'vertical',
  gestureDirection: 'vertical'
});

// スクロールを毎フレーム更新
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf); // or lenis.start(); でもOK

// Intersection Observer によるアニメーション効果
const boxes = document.querySelectorAll('.box');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // クラス付与後に監視解除
    }
  });
}, {
  threshold: 0.3 // 要素が30%表示された時点で実行
});

// 各.box を監視対象に追加
boxes.forEach(box => observer.observe(box));


// 💡 擬似コード（LenisとIntersection Observerの役割）
// 🌬️ Lenis によるスムーススクロール処理
// Lenisスクロール機能を初期化する
//   - スクロールの滑らかさの設定（速度や緩急の度合い）
//   - マウスホイール対応（smoothWheel: true）
//   - タッチ操作はオフ（smoothTouch: false）

// 毎フレーム、Lenisにスクロール位置の更新を依頼する
//   → 画面の描画タイミングに合わせて、滑らかなスクロールを実現
// 🎯 Intersection Observer による表示アニメーション制御
// .boxというクラスを持つすべての要素を取得する

// それぞれの要素に対して、画面に30%以上表示されたかを監視する
//   - 表示されたら「visible」というクラスを追加する
//   - 一度表示された要素は監視解除する（再実行防止）

// これにより、スクロールしてボックスが現れるタイミングで
//   → アニメーション付きでフェードインのような表示が実行される

//   ✨ このコードの狙い
// Lenisでスクロールの動きを滑らかにしてUX向上
// Intersection Observerで要素が表示されるタイミングでアニメーションをつけて魅力的な演出を実現
// 全体として「スクロールするたびに気持ちよく、視覚的にも印象に残るページ」を作る仕掛けになっています 👌


// 🟨 コード解説
// 、Lenisによるスムーススクロールと、Intersection Observerによるアニメーション表示を組み合わせた構成。

// 🎯 Lenis のスムーススクロール部分
// const lenis = new Lenis({
// ➡ Lenisというスムーススクロールライブラリのインスタンスを作成します。

//   duration: 2.0,
// ➡ スクロールの継続時間（2秒）。値が大きいほど“とろみ”感が増します。

//   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
// ➡ イージング（緩急）を決める関数。初速が速くてだんだん減速する「Ease-Out」系の動きになります。

//   smoothWheel: true,
// ➡ マウスホイールでのスクロールに対して、Lenisの滑らかさを適用します。

//   smoothTouch: false,
// ➡ タッチ操作（スマホなど）には滑らかさを適用しない設定。

//   direction: 'vertical',
//   gestureDirection: 'vertical'
// ➡ スクロールの方向を上下（縦方向）に設定しています。

// });
// ➡ Lenisの設定はここで完了です。

// 🔄 毎フレームスクロールを更新（アニメーションループ）
// function raf(time) {
// ➡ raf という関数を定義。requestAnimationFrameから渡される時間情報を受け取ります。

//   lenis.raf(time);
// ➡ Lenisに現在の時間を渡して、スクロールの動きを計算・更新します。

//   requestAnimationFrame(raf);
// }
// ➡ raf関数を毎フレーム繰り返すために再呼び出しします。

// requestAnimationFrame(raf); // or lenis.start(); でもOK
// ➡ 初回のフレーム更新を実行して、スクロールを開始します。※ lenis.start()でも同様の動作。

// 👁️ Intersection Observer によるアニメーション制御
// const boxes = document.querySelectorAll('.box');
// ➡ .boxクラスのすべての要素を取得し、変数boxesに格納します。

// const observer = new IntersectionObserver((entries, observer) => {
// ➡ IntersectionObserverのインスタンスを作成。要素が画面に表示されたかを監視する仕組みです。

//   entries.forEach(entry => {
// ➡ 監視対象のそれぞれの要素（entry）に対して処理を実行します。

//     if (entry.isIntersecting) {
// ➡ 要素が画面に30%以上表示されているかどうかを判定します。

//       entry.target.classList.add('visible');
// ➡ 表示された要素にvisibleクラスを追加して、CSSでアニメーション（フェードイン等）を実行します。

//       observer.unobserve(entry.target); // クラス付与後に監視解除
// ➡ 一度表示されたら監視を解除して、再びアニメーションしないようにします。

//   });
// }, {
//   threshold: 0.3 // 要素が30%表示された時点で実行
// });
// ➡ 表示判定の閾値を30%に設定。画面に30%以上見えたら表示とみなします。

// 📦 各ボックス要素の監視を開始
// boxes.forEach(box => observer.observe(box));
// ➡ 取得したすべての.box要素を、Observerの監視対象として登録します。