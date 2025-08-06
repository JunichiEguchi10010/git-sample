// アコーディオン切り替え
const accordionToggle = document.getElementById('accordionToggle');
const accordionContent = document.getElementById('accordionContent');
accordionToggle?.addEventListener('click', () => {
  accordionContent.classList.toggle('open');
});

// ポップアップ表示切り替え
const popupToggle = document.getElementById('popupToggle');
const popup = document.getElementById('popup');
popupToggle?.addEventListener('click', () => {
  popup.classList.toggle('show');
});

// スクロールでフェードイン
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('.fade-on-scroll').forEach(el => {
  observer.observe(el);
});

// カウントアップ
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / 100;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 30);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
});

// ローディング画面フェードアウト
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  loader.classList.add('loaded');
});

// ✅ コード全体像
// セクション	                        主な役割	                                                           ユーザー体験への影響
// アコーディオン切り替え	        ボタンをクリックすると、関連コンテンツの表示・非表示を切り替える	        一部情報を折りたたんで、見やすく整理されたUIを提供
// ポップアップ表示切り替え	        特定のボタンでポップアップの開閉を制御	                                  注意喚起や追加情報の提示に便利
// スクロールによるフェードイン	    IntersectionObserverを使用して、画面に表示された要素にアニメーションを適用	スムーズで自然なコンテンツ表示を実現し、視覚的な演出を強化
// カウントアップ	               数値の要素を一定間隔で増加させる	                                         統計や実績などの情報に動きを加えて注目度アップ
// ローディング画面フェードアウト	ページ読み込み完了時にローディング画面を非表示にする	                    読み込み完了のタイミングを明確に伝え、スムーズな開始を演出

// ✅ 疑似コード
// 🪗 アコーディオンの切り替え
// 「accordionToggle」ボタンを取得
// 「accordionContent」表示部分を取得

// ボタンがクリックされたら、
//   コンテンツの「open」クラスを追加／削除して表示を切り替える

// 💬 ポップアップ表示切り替え
// 「popupToggle」ボタンを取得
// 「popup」表示要素を取得

// ボタンがクリックされたら、
//   ポップアップの「show」クラスを追加／削除して表示を切り替える
// 🌫️ スクロールでフェードイン
// IntersectionObserver（スクロール監視用）を作成

// 要素が画面内に入ったら、
//   その要素に「visible」クラスを追加

// 「fade-on-scroll」クラスを持つ全ての要素に対して、
//   上記の監視を開始する

// 🔢 数値のカウントアップ
// 「counter」クラスを持つすべての要素を取得

// 各要素に対して：
//   data-target属性から目標値を取得
//   現在の表示値と比較し、
//     少しずつ値を増やして、30ミリ秒ごとに更新
//   目標値に達したら、更新を終了

// 🕓 ローディング画面のフェードアウト
// ページの読み込み完了時に、
//   「loader」要素に「loaded」クラスを追加して、
//   ローディング画面を非表示にする

// // ✅ コード説明
// 🪗 アコーディオン切り替え機能
// const accordionToggle = document.getElementById('accordionToggle');
// 👉 ID「accordionToggle」のボタン要素を取得します。

// const accordionContent = document.getElementById('accordionContent');
// 👉 ID「accordionContent」の表示・非表示を切り替えるコンテンツ要素を取得します。

// accordionToggle?.addEventListener('click', () => {
// 👉 ボタンが存在する場合のみ、クリック時の処理を設定します。

//   accordionContent.classList.toggle('open');
// 👉 コンテンツの「open」クラスを付け外しして、開閉を切り替えます。

// });
// 👉 クリックイベントの設定終了。

// 💬 ポップアップ表示切り替え
// const popupToggle = document.getElementById('popupToggle');
// 👉 ID「popupToggle」のポップアップ表示用ボタンを取得します。

// const popup = document.getElementById('popup');
// 👉 ID「popup」のポップアップ要素を取得します。

// popupToggle?.addEventListener('click', () => {
// 👉 ボタンが存在する場合のみ、クリックイベントを設定します。

//   popup.classList.toggle('show');
// 👉 ポップアップ要素に「show」クラスを付け外しして、表示・非表示を切り替えます。

// });
// 👉 クリックイベントの設定終了。

// 🌫️ スクロールでフェードイン表示
// const observer = new IntersectionObserver(entries => {
// 👉 IntersectionObserverを定義。対象要素が画面内に表示されたかを監視します。

//   entries.forEach(entry => {
// 👉 表示状態の変化があった要素すべてに対して処理を行います。

//     if (entry.isIntersecting) {
// 👉 要素が画面内に入っていれば…

//       entry.target.classList.add('visible');
// 👉 その要素に「visible」クラスを追加してフェードイン効果を適用します。

//     }
//   });
// });
// 👉 Observerの本体の処理完了。

// document.querySelectorAll('.fade-on-scroll').forEach(el => {
// 👉 「fade-on-scroll」クラスを持つ要素を全て取得して…

//   observer.observe(el);
// 👉 それぞれの要素をスクロール監視対象として登録します。

// });
// 👉 監視処理の設定終了。

// 🔢 数値のカウントアップ表示
// const counters = document.querySelectorAll('.counter');
// 👉 「counter」クラスを持つ要素（数字表示）の一覧を取得します。

// counters.forEach(counter => {
// 👉 各カウンター要素に対して処理を実行します。

//   const updateCount = () => {
// 👉 数字を更新する関数を定義します。

//     const target = +counter.getAttribute('data-target');
// 👉 data-target属性から目標値を取得（＋で数値に変換）

//     const count = +counter.innerText;
// 👉 現在表示されている数値を取得

//     const increment = target / 100;
// 👉 数値を徐々に増やすための増加量を算出

//     if (count < target) {
// 👉 現在の数値が目標より少なければ…

//       counter.innerText = Math.ceil(count + increment);
// 👉 数値を少し増やして表示（切り上げ）

//       setTimeout(updateCount, 30);
// 👉 30ミリ秒後に再度この関数を実行（繰り返し）

//     } else {
//       counter.innerText = target;
// 👉 目標値に達したら、正しい値に設定して終了

//     }
//   };
// 👉 関数定義終了

//   updateCount();
// 👉 初回の数値更新を実行

// });
// 👉 カウンター処理終了

// 🕓 ローディング画面のフェードアウト
// window.addEventListener('load', () => {
// 👉 ページの読み込みが完了したときに実行

//   const loader = document.getElementById('loader');
// 👉 ID「loader」のローディング要素を取得

//   loader.classList.add('loaded');
// 👉 ローディング要素に「loaded」クラスを追加して非表示にする

// });
// 👉 ページロード後の処理完了