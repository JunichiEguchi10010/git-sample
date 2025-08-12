document.querySelectorAll('.tab-buttons button').forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
  
      document.querySelectorAll('.tab-buttons button').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
  
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(tabId).classList.add('active');
    });
  });

  
// ✅ コードの全体像
// .tab-buttons 内のすべての <button> 要素を取得
// 各ボタンにクリックイベントを設定
// ボタンがクリックされたら：
// 対応するタブの ID（data-tab 属性）を取得
// すべてのボタンから active クラスを削除
// クリックされたボタンに active クラスを追加
// すべての .tab-content 要素から active クラスを削除
// 対象のタブコンテンツに active クラスを追加して表示


// ✅ 疑似コード
// すべての「.tab-buttons」内のボタンを取得して、1つずつ処理する：
//   各ボタンにクリックイベントを追加する：
//     クリックされたボタンの「data-tab」属性から、表示すべきタブのIDを取得する

//     すべてのボタンから「active」クラスを削除する
//     クリックされたボタンに「active」クラスを追加する

//     すべてのタブコンテンツから「active」クラスを削除する
//     取得したIDに対応するタブコンテンツに「active」クラスを追加する


// ✅ コードの1行ずつの解説
// document.querySelectorAll('.tab-buttons button').forEach(button => {
// .tab-buttons クラスの中にあるすべての <button> 要素を取得します。
// それぞれのボタンに対して、順番に処理を行うために forEach を使っています。

//   button.addEventListener('click', () => {
// 各ボタンに「クリックされたときの処理（イベント）」を登録します。
// ユーザーがボタンをクリックすると、以下の処理が実行されます。

//     const tabId = button.getAttribute('data-tab');
// クリックされたボタンの data-tab 属性の値を取得します。
// これは、表示したいタブのコンテンツの ID を表しています。

//     document.querySelectorAll('.tab-buttons button').forEach(btn => btn.classList.remove('active'));
// すべてのボタンから active クラスを削除します。
// これにより、前に選ばれていたボタンの「選択中スタイル」が解除されます。

//     button.classList.add('active');
// 今クリックされたボタンに active クラスを追加します。
// これで、選択中のボタンにスタイル（色など）を適用できます。

//     document.querySelectorAll('.tab-content').forEach(content => {
//       content.classList.remove('active');
//     });
// すべてのタブコンテンツから active クラスを削除します。
// これにより、表示されていたコンテンツが非表示になります。

//     document.getElementById(tabId).classList.add('active');
// tabId に対応するコンテンツ（IDで指定された要素）に active クラスを追加します。
// これで、選ばれたタブのコンテンツが表示されます。

// 🧠まとめ
// このコードは「タブ切り替え機能」を実現するものです。 ボタンをクリックすると：
// ボタンの見た目が変わり（active クラス）
// 対応するコンテンツだけが表示されるようになります。