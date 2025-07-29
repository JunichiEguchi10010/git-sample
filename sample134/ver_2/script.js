const accordionButtons = document.querySelectorAll('.accordion button');

accordionButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));

    const content = document.getElementById(btn.getAttribute('aria-controls'));
    if (expanded) {
      content.hidden = true;
    } else {
      content.hidden = false;
    }
  });

  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      btn.click();
    }
  });
});



// 🟧 コードの全体像
// アコーディオン内のボタンをすべて取得する。

// 各ボタンに以下の機能を追加する：

// クリックまたは Enter／スペースキーで、関連するコンテンツを表示・非表示に切り替える。

// aria-expanded 属性で状態を記録し、操作に応じて反転させる。



// 🟧 疑似コード
// 1. 「.accordion」クラス内のすべてのボタン要素を取得する。

// 2. 各ボタンについて以下の処理を実行する：

//    2.1 ボタンがクリックされたときの処理を追加する：
//        - aria-expanded 属性の値（trueかfalseか）を取得する。
//        - その値を反転させて、aria-expanded 属性を更新する。
//        - ボタンの aria-controls 属性で指定されたコンテンツ要素を取得する。
//        - 元々展開されていた場合は、そのコンテンツを非表示にする。
//        - 展開されていなかった場合は、そのコンテンツを表示する。

//    2.2 キーボードで Enter キーまたはスペースキーが押されたときの処理を追加する：
//        - デフォルトの動作をキャンセルする（ページスクロールなどを防ぐ）。
//        - ボタンのクリック処理を実行する。

// 🟧 コード解説
// const accordionButtons = document.querySelectorAll('.accordion button');
// 🔍 .accordion クラスの中にあるすべての <button> 要素を取得して、accordionButtons に格納します。

// accordionButtons.forEach((btn) => {
// 🔁 取得したすべてのボタンに対して、繰り返し処理を行います。各ボタンを btn として扱います。

//   btn.addEventListener('click', () => {
// 🖱️ ボタンがクリックされたときに実行される処理（イベントリスナー）を追加します。

//     const expanded = btn.getAttribute('aria-expanded') === 'true';
// 📌 ボタンの aria-expanded 属性を取得して、それが 'true' かどうかを判定し、結果を expanded に保存します。これは「今展開されているか？」を意味します。

//     btn.setAttribute('aria-expanded', String(!expanded));
// 🔄 展開状態を反転させた値（true ➝ false、false ➝ true）を、再び aria-expanded 属性にセットします。

//     const content = document.getElementById(btn.getAttribute('aria-controls'));
// 📎 ボタンが制御しているコンテンツ領域の ID（aria-controls に指定された値）を取得し、それに該当する要素を content として取得します。

//     if (expanded) {
//       content.hidden = true;
//     } else {
//       content.hidden = false;
//     }
// 👁️ 現在展開されていたら（expanded === true）、コンテンツを非表示に。逆に展開されていなかったら表示します。

//   });
// ✅ クリックイベントの処理終了。

//   btn.addEventListener('keydown', (e) => {
// ⌨️ ボタンに対してキーボード操作（キーが押された）イベントを追加します。

//     if (e.key === 'Enter' || e.key === ' ') {
// 🗝️ 押されたキーが Enter またはスペース（' '）かどうかをチェックします。

//       e.preventDefault();
// 🚫 デフォルトの動作（例えばスペースを押すとページがスクロールするなど）を無効化します。

//       btn.click();
// 👆 キーボード操作を使って、ボタンをクリックしたのと同じ動作を呼び出します。

//     }
//   });
// });
// 🔚 forEachループの処理とイベント設定終了。