function activateTab(tabId) {
    document.querySelectorAll('.tab-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${tabId}`);
    });
  
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.id === tabId);
    });
  }
  
  function handleHashChange() {
    const hash = window.location.hash.replace('#', '');
    const validTab = document.getElementById(hash);
    if (validTab) {
      activateTab(hash);
    }
  }
  
  document.querySelectorAll('.tab-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').replace('#', '');
      activateTab(targetId);
    });
  });
  
  window.addEventListener('load', handleHashChange);
  window.addEventListener('hashchange', handleHashChange);
  

// ✅ コードの全体像
// ページ読み込み時：
// URLのハッシュ（例：#tab2）に対応するタブを表示する。
// 🖱️ タブボタンをクリックしたとき：
// 対応するタブの中身を表示し、ボタンの見た目を「アクティブ」にする。
// 🔗 URLのハッシュが変更されたとき（例：リンクをクリックして #tab3 に変わる）：
// 対応するタブを表示する。
// 🎯 表示の切り替えは activateTab 関数が担当：
// ボタンとコンテンツの両方に active クラスを付けたり外したりして、見た目と表示を制御。
// このコードは、URLのハッシュと連動したタブ切り替え機能を実現しています。
// ブラウザの「戻る・進む」操作にも対応できる、ユーザーフレンドリーな設計！


//   📝 疑似コード（日本語での説明）
// 関数 activateTab(tabId):
//   すべてのタブボタンを調べて、
//     そのボタンの href が "#tabId" と一致するなら active クラスを付ける
//     一致しないなら active クラスを外す

//   すべてのタブの中身を調べて、
//     その要素の id が tabId と一致するなら active クラスを付ける
//     一致しないなら active クラスを外す

// 関数 handleHashChange():
//   現在のURLのハッシュ（#以降の文字）を取得
//   そのハッシュに対応するIDの要素が存在するか確認
//   存在するなら activateTab を呼び出して表示を切り替える

// ページ内のすべてのタブボタンに対して、
//   クリックされたときに、
//     href属性から表示したいタブのIDを取得
//     activateTab を呼び出して表示を切り替える

// ページが読み込まれたときと、
// URLのハッシュが変化したときに、
//   handleHashChange を呼び出して表示を更新する

// ✅ コード解説
// 🔧 function activateTab(tabId) {
//     「指定されたタブIDを使って、表示するタブを切り替える関数」を定義しています。
    
//     🔍 document.querySelectorAll('.tab-link').forEach(link => {
//     .tab-link というクラスを持つすべてのタブボタンを取得して、1つずつ処理します。
    
//     🎯 link.classList.toggle('active', link.getAttribute('href') === \#${tabId}\);
//     各タブボタンの href 属性（例：#tab1）が、今表示したいタブID（例：tab1）と一致していれば active クラスを付ける。
    
//     一致しなければ active クラスを外す。
    
//     🔚 });
//     タブボタンの処理が終わり。
    
//     🔍 document.querySelectorAll('.tab-content').forEach(content => {
//     .tab-content というクラスを持つすべてのタブの中身を取得して、1つずつ処理します。
    
//     🎯 content.classList.toggle('active', content.id === tabId);
//     各タブの中身の id が、今表示したいタブIDと一致していれば active クラスを付ける。
    
//     一致しなければ active クラスを外す。
    
//     🔚 });
//     タブ中身の処理が終わり。
    
//     🔚 }
//     activateTab 関数の定義が終わり。
    
//     🔧 function handleHashChange() {
//     「URLのハッシュが変わったときに、表示するタブを切り替える関数」を定義しています。
    
//     🔗 const hash = window.location.hash.replace('#', '');
//     現在のURLのハッシュ（例：#tab2）から # を取り除いて、tab2 のようなIDだけを取得します。
    
//     🔍 const validTab = document.getElementById(hash);
//     そのID（例：tab2）を持つ要素がページ内にあるかどうかを確認します。
    
//     ✅ if (validTab) {
//     そのIDの要素が存在する場合だけ、次の処理を行います。
    
//     🚀 activateTab(hash);
//     そのIDに対応するタブを表示するために activateTab 関数を呼び出します。
    
//     🔚 }
//     if 文の終わり。
    
//     🔚 }
//     handleHashChange 関数の定義が終わり。
    
//     🔁 document.querySelectorAll('.tab-link').forEach(link => {
//     すべてのタブボタンに対して、クリックイベントを設定します。
    
//     🖱️ link.addEventListener('click', (e) => {
//     タブボタンがクリックされたときに実行する処理を定義します。
    
//     🔗 const targetId = link.getAttribute('href').replace('#', '');
//     クリックされたボタンの href 属性から、表示したいタブのIDを取得します。
    
//     🚀 activateTab(targetId);
//     そのIDに対応するタブを表示するために activateTab 関数を呼び出します。
    
//     🔚 });
//     クリックイベントの処理が終わり。
    
//     🔚 });
//     すべてのタブボタンへのイベント設定が終わり。
    
//     🕒 window.addEventListener('load', handleHashChange);
//     ページが読み込まれたときに、URLのハッシュに応じてタブを表示します。
    
//     🔄 window.addEventListener('hashchange', handleHashChange);
//     URLのハッシュが変わったとき（例：#tab3 に変わる）に、表示するタブを更新します。
    
//     ✅ 全体のまとめ
//     このコードは、タブ切り替え機能を実現するためのものです。 
//     URLのハッシュ（#tab1 など）に応じて、対応するタブを表示し、ボタンの見た目も切り替えます。 
//     クリックやURL変更、ページ読み込みにすべて対応していて、使いやすい設計です。