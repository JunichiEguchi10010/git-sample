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


// ✅ コードの全体像
// 1. アコーディオンの開閉：
//    ボタンをクリックすると、対象のコンテンツの表示・非表示を切り替える。

// 2. ポップアップの表示切り替え：
//    ボタンをクリックすると、ポップアップの表示・非表示を切り替える。

// 3. スクロールによるフェードイン：
//    特定の要素が画面に現れたときに、フェードインのクラスを追加する。

// 4. 数値のカウントアップ：
//    ページ読み込み時に、指定された目標値まで数値が徐々に増加する。


// ✅ 疑似コード
// 🪗 アコーディオンの切り替え
// 「accordionToggle」というIDの要素を取得する
// 「accordionContent」というIDの要素を取得する

// もし「accordionToggle」が存在するなら
//   クリックされたときに「accordionContent」のクラス「open」を切り替える

// 💬 ポップアップの表示切り替え
// 「popupToggle」というIDの要素を取得する
// 「popup」というIDの要素を取得する

// もし「popupToggle」が存在するなら
//   クリックされたときに「popup」のクラス「show」を切り替える

// 🌫️ スクロールでフェードイン表示
// IntersectionObserverを作成する（画面に要素が表示されたかを監視）

// 監視対象の各要素について
//   画面に表示されたら、その要素に「visible」クラスを追加する

// 「fade-on-scroll」クラスを持つすべての要素を取得し
//   それぞれをObserverで監視する

// 🔢 数値のカウントアップ表示
// 「counter」クラスを持つすべての要素を取得する

// 各カウンター要素に対して
//   「updateCount」関数を定義する
//     - 目標値（data-target属性）を取得する
//     - 現在の表示値を取得する
//     - 目標値に向かって少しずつ増加させる（100分割して加算）

//   「updateCount」関数を実行する

// ✅ コード解説
// 🪗 アコーディオン切り替え
// const accordionToggle = document.getElementById('accordionToggle');
// 👉 IDが「accordionToggle」の要素（ボタンなど）を取得します。

// const accordionContent = document.getElementById('accordionContent');
// 👉 IDが「accordionContent」の要素（開閉されるコンテンツ）を取得します。

// accordionToggle?.addEventListener('click', () => {
// 👉 「accordionToggle」が存在する場合、クリックイベントを設定します。

//   accordionContent.classList.toggle('open');
// 👉 「accordionContent」に「open」クラスを付けたり外したりして、表示・非表示を切り替えます。

// });
// 👉 クリックイベントの処理終了。

// 💬 ポップアップ表示切り替え
// const popupToggle = document.getElementById('popupToggle');
// 👉 IDが「popupToggle」の要素（ポップアップを開くボタン）を取得します。

// const popup = document.getElementById('popup');
// 👉 IDが「popup」の要素（表示されるポップアップ）を取得します。

// popupToggle?.addEventListener('click', () => {
// 👉 「popupToggle」が存在する場合、クリックイベントを設定します。

//   popup.classList.toggle('show');
// 👉 「popup」に「show」クラスを付けたり外したりして、表示・非表示を切り替えます。

// });
// 👉 クリックイベントの処理終了。

// 🌫️ スクロールでフェードイン
// const observer = new IntersectionObserver(entries => {
// 👉 IntersectionObserverを作成し、要素が画面に表示されたかどうかを監視します。

//   entries.forEach(entry => {
// 👉 監視対象のすべての要素（entry）に対して処理を行います。

//     if (entry.isIntersecting) {
// 👉 その要素が画面内に入ったかどうかを判定します。

//       entry.target.classList.add('visible');
// 👉 表示された要素に「visible」クラスを追加して、フェードインなどの効果を適用します。

//     }
//   });
// });
// 👉 Observerの設定終了。

// document.querySelectorAll('.fade-on-scroll').forEach(el => {
// 👉 「fade-on-scroll」クラスを持つすべての要素を取得し、1つずつ処理します。

//   observer.observe(el);
// 👉 各要素をObserverに登録して、スクロールによる表示を監視します。

// });
// 👉 監視対象の設定終了。

// 🔢 カウントアップ
// js
// const counters = document.querySelectorAll('.counter');
// 👉 「counter」クラスを持つすべての要素（数値表示）を取得します。

// counters.forEach(counter => {
// 👉 各カウンター要素に対して処理を行います。

//   const updateCount = () => {
// 👉 数値を更新する関数を定義します。

//     const target = +counter.getAttribute('data-target');
// 👉 カウントの目標値（data-target属性）を取得します。+は数値に変換するための記号です。

//     const count = +counter.innerText;
// 👉 現在表示されている数値を取得します。

//     const increment = target / 100;
// 👉 目標値に向かって少しずつ増やすための増加量を計算します。

//     if (count < target) {
// 👉 まだ目標値に達していないかを判定します。

//       counter.innerText = Math.ceil(count + increment);
// 👉 数値を少し増やして表示します（小数点切り上げ）。

//       setTimeout(updateCount, 30);
// 👉 30ミリ秒後にもう一度「updateCount」を呼び出して、繰り返し更新します。

//     } else {
//       counter.innerText = target;
// 👉 目標値に達したら、正確な値を表示して終了します。

//     }
//   };
// 👉 関数定義終了。

//   updateCount();
// 👉 数値の更新処理を開始します。

// });
// 👉 各カウンターへの処理終了。