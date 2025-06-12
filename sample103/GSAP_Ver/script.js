// GSAPのScrollTriggerを登録 （GSAP + ScrollTrigger）
gsap.registerPlugin(ScrollTrigger);

// アニメーション対象を選択
document.querySelectorAll('.curtain-wrapper').forEach(wrapper => {
  const curtain = wrapper.querySelector('.curtain');
  const content = wrapper.querySelector('.content');

  // カーテンを上から下にスライドさせて消す
  gsap.to(curtain, {
    height: 0,
    duration: 2.0,
    ease: "power2.out",
    scrollTrigger: {
      trigger: wrapper,
      start: "top 80%", // wrapperの上端が画面の80%にきたら開始
      toggleActions: "play none none none"
    }
  });

  // 中身をふわっと表示
  gsap.to(content, {
    opacity: 1,
    y: 0,
    duration: 2.0,
    delay:1.0,
    ease: "power2.out",
    scrollTrigger: {
      trigger: wrapper,
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });
});

// .curtain	カーテン部分。上からスライドして縮む演出
// .content	カーテンの中の本体コンテンツ。ふわっと表示される
// scrollTrigger.start	アニメーション開始タイミングの調整が可能（例: "top 90%"）
// toggleActions	スクロール時の動作設定。play, pause, reset, restart, none など
// 横に開くなら width: 0 に変更
// 遅延をつけて順番にアニメーションしたいなら .stagger を追加
// スクロールで逆再生したいなら toggleActions: "play reverse play reverse"