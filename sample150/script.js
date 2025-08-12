const openButtons = document.querySelectorAll('.open-modal');
const closeButtons = document.querySelectorAll('.close-modal');
const overlay = document.getElementById('modal-overlay');

openButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modalId = button.dataset.modal;
    const modal = document.getElementById(`modal-${modalId}`);
    overlay.style.display = 'block';
    modal.style.display = 'block';

    if (modal.classList.contains('fade')) {
      setTimeout(() => modal.classList.add('show'), 10);
    }
  });
});

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    closeModal();
  });
});

overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

function closeModal() {
  overlay.style.display = 'none';
  document.querySelectorAll('.modal').forEach(modal => {
    modal.style.display = 'none';
    modal.classList.remove('show');
  });
}

// 🧩コードの全体像
// 🔹 初期設定
// .open-modal クラスを持つすべての「開くボタン」を取得
// .close-modal クラスを持つすべての「閉じるボタン」を取得
// #modal-overlay（モーダル背景）を取得

// 🟢 モーダルを開く処理（ボタンをクリックしたとき）
// ボタンの data-modal 属性から対象モーダルのIDを取得
// modal-<ID> というIDを持つモーダル要素を取得
// オーバーレイを表示（display: block）
// モーダル本体を表示（display: block）
// モーダルが fade クラスを持っている場合は、10ms後に show クラスを追加（フェード演出）

// 🔴 モーダルを閉じる処理（以下のいずれかで発動）
// 「閉じるボタン」がクリックされたとき
// オーバーレイ（背景）がクリックされたとき
// キーボードの Escape キーが押されたとき
// 実行される closeModal() の内容：
// オーバーレイを非表示（display: none）
// .modal クラスを持つすべてのモーダル要素に対して：
// 表示を解除（display: none）
// show クラスを削除（フェード状態を解除）


// 🧠 疑似コード
// 1. 「.open-modal」クラスを持つすべてのボタンを取得する
// 2. 「.close-modal」クラスを持つすべてのボタンを取得する
// 3. モーダル背景（オーバーレイ）要素を取得する

// 4. 各「開く」ボタンに対して以下の処理を設定：
//    - ボタンがクリックされたとき：
//      a. data-modal属性から対象モーダルのIDを取得する
//      b. そのIDに対応するモーダル要素を取得する
//      c. オーバーレイを表示する
//      d. モーダル本体を表示する
//      e. モーダルが「fade」クラスを持っている場合は、少し遅らせて「show」クラスを追加する（フェード表示）

// 5. 各「閉じる」ボタンに対して以下の処理を設定：
//    - ボタンがクリックされたとき、モーダルを閉じる処理を呼び出す

// 6. オーバーレイがクリックされたとき、モーダルを閉じる処理を呼び出す

// 7. キーボードの「Escape」キーが押されたとき、モーダルを閉じる処理を呼び出す

// 8. モーダルを閉じる処理（closeModal関数）：
//    - オーバーレイを非表示にする
//    - すべてのモーダル要素を非表示にする
//    - 「show」クラスを削除してフェード状態を解除する

// 🧠 コード解説
// const openButtons = document.querySelectorAll('.open-modal');
// 🔹 .open-modal クラスを持つすべての要素（モーダルを開くボタン）を取得して、openButtons に格納します。

// const closeButtons = document.querySelectorAll('.close-modal');
// 🔹 .close-modal クラスを持つすべての要素（モーダルを閉じるボタン）を取得して、closeButtons に格納します。

// const overlay = document.getElementById('modal-overlay');
// 🔹 モーダルの背景（オーバーレイ）要素を取得して、overlay に格納します。

// openButtons.forEach(button => {
// 🔹 すべての「開くボタン」に対して、順番に処理を設定します。

//   button.addEventListener('click', () => {
// 🔹 ボタンがクリックされたときに実行する関数を登録します。

//     const modalId = button.dataset.modal;
// 🔹 ボタンの data-modal 属性から、対象モーダルのID（例: "1"）を取得します。

//     const modal = document.getElementById(`modal-${modalId}`);
// 🔹 modal-1 のようなIDを持つモーダル要素を取得します。

//     overlay.style.display = 'block';
// 🔹 オーバーレイ（背景）を表示します。

//     modal.style.display = 'block';
// 🔹 対象のモーダル本体を表示します。

//     if (modal.classList.contains('fade')) {
// 🔹 モーダルが fade クラスを持っているかどうかを確認します（フェード演出用）。

//       setTimeout(() => modal.classList.add('show'), 10);
// 🔹 少し遅らせて show クラスを追加し、CSSアニメーションを発動させます。

//   });
// });
// 🔹 「開くボタン」の処理をすべて設定し終えます。

// closeButtons.forEach(button => {
// 🔹 すべての「閉じるボタン」に対して、順番に処理を設定します。

//   button.addEventListener('click', () => {
//     closeModal();
//   });
// });
// 🔹 ボタンがクリックされたら closeModal() 関数を呼び出して、モーダルを閉じます。

// overlay.addEventListener('click', closeModal);
// 🔹 オーバーレイ（背景）がクリックされたら、モーダルを閉じます。

// document.addEventListener('keydown', e => {
//   if (e.key === 'Escape') closeModal();
// });
// 🔹 キーボードの Escape キーが押されたら、モーダルを閉じます。

// function closeModal() {
// 🔹 モーダルを閉じるための関数を定義します。

//   overlay.style.display = 'none';
// 🔹 オーバーレイを非表示にします。

//   document.querySelectorAll('.modal').forEach(modal => {
// 🔹 .modal クラスを持つすべてのモーダル要素に対して処理を行います。

//     modal.style.display = 'none';
// 🔹 モーダル本体を非表示にします。

//     modal.classList.remove('show');
// 🔹 show クラスを削除して、フェード演出を解除します。

//   });
// }
// 🔹 モーダルを閉じる処理が完了します。