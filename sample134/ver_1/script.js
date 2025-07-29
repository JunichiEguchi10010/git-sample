const openBtn = document.getElementById('openModal');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('closeModal');

openBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
  modal.focus();
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  openBtn.focus();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'flex') {
    closeBtn.click();
  }
});

// 🟧 疑似コード
// 変数 openBtn に「openModal」というIDの要素を取得する  
// 変数 modal に「modal」というIDの要素を取得する  
// 変数 closeBtn に「closeModal」というIDの要素を取得する  

// openBtn がクリックされたとき：
//     modal の表示スタイルを「flex」に設定する  
//     modal の aria-hidden 属性を「false」に変更する  
//     modal にフォーカスを当てる  

// closeBtn がクリックされたとき：
//     modal の表示スタイルを「none」に設定する  
//     modal の aria-hidden 属性を「true」に変更する  
//     openBtn にフォーカスを戻す  

// キーボードで何かキーが押されたとき：
//     押されたキーが「Escape」であり、modal の表示が「flex」の場合：
//         closeBtn をクリックさせてモーダルを閉じる


// 🟧 コード解説
// javascript
// const openBtn = document.getElementById('openModal');
// 「openModal」というIDを持つHTML要素を取得し、それをopenBtnという変数に格納します。

// これは「モーダルを開くためのボタン」です。

// javascript
// const modal = document.getElementById('modal');
// 「modal」というIDの要素を取得してmodalという変数に格納します。

// これは表示・非表示を切り替える「モーダルの本体」です。

// javascript
// const closeBtn = document.getElementById('closeModal');
// 「closeModal」というIDの要素を取得してcloseBtnという変数に格納します。

// これは「モーダルを閉じるためのボタン」です。

// 🟢モーダル表示処理（開くとき）
// javascript
// openBtn.addEventListener('click', () => {
// openBtn（開くボタン）がクリックされたときに処理を実行するようイベントを設定します。

// javascript
//   modal.style.display = 'flex';
// モーダルの表示スタイルを「flex」に変更します。これにより、モーダルが画面に表示されます。

// javascript
//   modal.setAttribute('aria-hidden', 'false');
// アクセシビリティ用属性を設定します。aria-hiddenをfalseにして、「このモーダルは画面読み上げ対象である」と明示しています。

// javascript
//   modal.focus();
// 表示されたモーダルにキーボードフォーカスを移します。これにより、ユーザーがすぐに操作できる状態になります。

// javascript
// });
// 「開く」処理の終わり。

// 🔴モーダル非表示処理（閉じるとき）
// javascript
// closeBtn.addEventListener('click', () => {
// closeBtn（閉じるボタン）がクリックされたときに処理を実行するイベントを設定します。

// javascript
//   modal.style.display = 'none';
// モーダルを非表示にします。画面から見えなくなります。

// javascript
//   modal.setAttribute('aria-hidden', 'true');
// アクセシビリティ用に、「このモーダルは現在非表示である」と明示します。

// javascript
//   openBtn.focus();
// フォーカスを元の「開くボタン」に戻して、操作が自然に戻るようにします。

// javascript
// });
// 「閉じる」処理の終わり。

// ⌨️キーボードによる閉じる処理（Escapeキー）
// javascript
// document.addEventListener('keydown', (e) => {
// ページ全体でキーが押されたことを監視します。

// javascript
//   if (e.key === 'Escape' && modal.style.display === 'flex') {
// 「Escape」キーが押され、かつモーダルが表示されている場合にのみ、以下の処理を実行します。

// javascript
//     closeBtn.click();
// 閉じるボタンをプログラム的に「クリック」して、モーダルを閉じます。

// javascript
//   }
// });
// キーイベントの処理終了。