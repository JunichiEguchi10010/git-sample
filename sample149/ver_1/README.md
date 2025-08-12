CSS JavaScript クリックで切り替える基本タブ 「タブ切り替え」スニペット 20250812

✅ 挙動
タブをクリックすると、対応するコンテンツが表示され、他のコンテンツは非表示になります。

モバイルでは縦並び、PCでは横並びに切り替わります。



js
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

🔍 ロジック
1. すべてのタブボタンを取得して、クリックイベントを設定
document.querySelectorAll('.tab-buttons button').forEach(button => {
  button.addEventListener('click', () => {
.tab-buttons の中にあるすべての <button> 要素を対象にします。

各ボタンに「クリックされたときの処理」を登録します。

2. クリックされたボタンが持つ data-tab 属性から、表示すべきタブの ID を取得
const tabId = button.getAttribute('data-tab');
例えば <button data-tab="tab2"> の場合、tabId は "tab2" になります。

この ID を使って、対応する .tab-content を表示します。

3. すべてのボタンから active クラスを削除し、クリックされたボタンだけに追加
document.querySelectorAll('.tab-buttons button').forEach(btn => btn.classList.remove('active'));
button.classList.add('active');
これにより、ボタンの見た目（色など）が「選択中」になるのは1つだけになります。

4. すべてのタブコンテンツから active クラスを削除し、対応するコンテンツだけに追加
document.querySelectorAll('.tab-content').forEach(content => {
  content.classList.remove('active');
});
document.getElementById(tabId).classList.add('active');
.tab-content は初期状態では display: none（非表示）です。

active クラスが付くと display: block になり、表示されます。

つまり、クリックされたボタンに対応するコンテンツだけが表示されるようになります。

🧠まとめ：このロジックの役割
処理	                      目的
ボタンにイベントを設定	    ユーザーの操作を受け取る
data-tab を取得	           どのコンテンツを表示するか判断
ボタンの active を更新	    見た目を切り替える（選択中の強調）
コンテンツの active を更新	表示する内容を切り替える

このロジックによって、1つのボタンをクリックするだけで、対応するコンテンツが表示され、他のコンテンツは非表示になるという「タブ切り替え」が実現されています。