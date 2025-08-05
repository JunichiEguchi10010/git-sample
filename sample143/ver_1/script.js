document.addEventListener("DOMContentLoaded", () => {
    // ✅ アコーディオン切り替え
    const accordionToggle = document.getElementById("accordionToggle");
    const accordionContent = document.getElementById("accordionContent");
  
    accordionToggle.addEventListener("click", () => {
      accordionContent.classList.toggle("open");
    });
  
    // ✅ ポップアップ切り替え
    const popupToggle = document.getElementById("popupToggle");
    const popup = document.getElementById("popup");
  
    popupToggle.addEventListener("click", () => {
      popup.classList.toggle("show");
    });
  });


// ✅ コードの全体像
//   ページ読み込み時：

//   アコーディオン切り替え：
//     ボタンをクリック → 中身の表示／非表示を切り替え

//   ポップアップ切り替え：
//     ボタンをクリック → ポップアップの表示／非表示を切り替え

//  ✅ 疑似コード
//   // ページの読み込みが完了したときの処理
// ページが表示されたら：

// // アコーディオンの切り替え処理
// アコーディオンのボタン（accordionToggle）を取得
// アコーディオンの中身（accordionContent）を取得

// ボタンがクリックされたら：
//   中身の表示・非表示を切り替える（クラス "open" を追加／削除）

// // ポップアップの切り替え処理
// ポップアップのボタン（popupToggle）を取得
// ポップアップの要素（popup）を取得

// ボタンがクリックされたら：
//   ポップアップの表示・非表示を切り替える（クラス "show" を追加／削除）

// ✅ コード説明
// document.addEventListener("DOMContentLoaded", () => {
// 📦 ページのHTMLがすべて読み込まれたタイミングで、処理を開始するためのイベントリスナーです。

//   const accordionToggle = document.getElementById("accordionToggle");
// 🎯 「アコーディオンを開く・閉じる」ためのボタン要素（id="accordionToggle"）を取得します。

//   const accordionContent = document.getElementById("accordionContent");
// 📄 アコーディオンの中身の要素（id="accordionContent"）を取得します。

//   accordionToggle.addEventListener("click", () => {
// 👆 アコーディオンのボタンがクリックされた時に、以下の処理を実行します。

//     accordionContent.classList.toggle("open");
// 🔁 中身の表示・非表示を切り替えます。CSSの「.open」クラスを追加／削除して、開閉を制御します。

//   const popupToggle = document.getElementById("popupToggle");
// 🎯 「ポップアップを表示・非表示」するためのボタン要素（id="popupToggle"）を取得します。

//   const popup = document.getElementById("popup");
// 🪟 ポップアップの中身の要素（id="popup"）を取得します。

//   popupToggle.addEventListener("click", () => {
// 👆 ポップアップのボタンがクリックされた時に、以下の処理を実行します。

//     popup.classList.toggle("show");
// 🔁 ポップアップの表示・非表示を切り替えます。CSSの「.show」クラスを追加／削除して、見せたり隠したりします。

// });