gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.box').forEach(box => {
  gsap.fromTo(box,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: box,
        start: "top 80%", // 要素の80%がビューポートの上に到達したとき
        toggleActions: "play none none reverse", // 表示時→再生、他は無効
        markers: false // デバッグ用マーカー（trueで可視化）
      }
    }
  );
});

// 🔍 疑似コード
// ScrollTriggerをGSAPに登録する

// すべての.box要素を順に処理する:
//     boxの表示アニメーションを設定（スクロールで表示されるとき）

//     boxの初期状態:
//         透明（opacity = 0）
//         下に50pxずれた位置（y = 50）

//     boxの表示状態（アニメーション終了後）:
//         不透明（opacity = 1）
//         元の位置に戻る（y = 0）
//         再生時間 = 1.2秒
//         イージング = power3.out（自然な動き）

//     ScrollTrigger設定:
//         アニメーションのトリガーはbox
//         boxの上端が画面の下から80%の高さに到達すると発火
//         表示時に再生、他は何もしない、スクロールアウト時は逆再生
//         デバッグマーカーは非表示（false）


// 🔍 コード解説
// gsap.registerPlugin(ScrollTrigger);
// GSAPにScrollTriggerプラグインを登録するための宣言。
// この一行がないと、ScrollTriggerを使うアニメーションは機能しません。

// gsap.utils.toArray('.box').forEach(box => {
// document.querySelectorAll('.box') と同様に、.box 要素を配列として取得。
// 複数の .box 要素に対してそれぞれ個別にアニメーションを適用するための準備。

//   gsap.fromTo(box,
// box 要素に対して from（開始状態）と to（終了状態）を指定してアニメーションを構成。

//     { opacity: 0, y: 50 },
// アニメーションの開始状態：
// opacity: 0 → 完全に透明
// y: 50 → 下に50pxずらされた位置

//     {
//       opacity: 1,
//       y: 0,
//       duration: 1.2,
//       ease: "power3.out",
// アニメーションの終了状態と設定：
// opacity: 1 → 完全に表示
// y: 0 → 元の位置に戻る
// duration: 1.2 → アニメーションの長さ（秒）
// ease: "power3.out" → 加速・減速に自然な動きを加えるイージング設定

//       scrollTrigger: {
// ここからが ScrollTriggerの設定項目

//         trigger: box,
// box 要素が トリガー（表示される対象）になる。

//         start: "top 80%", // 要素の80%がビューポートの上に到達したとき
// スクロール位置の指定：
// トリガー要素の「top」が、ビューポート（画面）の下から80%の位置に到達したときに発火。

//         toggleActions: "play none none reverse", // 表示時→再生、他は無効
// アニメーションの挙動設定：
// "play" → 要素がスクロールで表示されたときに再生
// "none" → 再表示時・スクロールバック時などの動作は無効
// "reverse" → 要素がスクロールアウトしたときにアニメーションを逆再生

//         markers: false // デバッグ用マーカー（trueで可視化）
// trueにするとスクロールの発火位置に赤と青の線が表示され、デバッグに便利。

//       }
//     }
//   );
// });
// 各 .box に ScrollTrigger付きのアニメーションを適用完了。

// ✅ 補足ポイント
// fromTo は「開始状態 → 終了状態」を指定する最も明確なGSAP関数。
// ScrollTrigger で start の位置や toggleActions を変えるだけで、かなり挙動のバリエーションが変化します。
// markers: true を使って視覚的に確認すると、思った通りに動いているかチェックしやすくなります。