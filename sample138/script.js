document.getElementById("toggleTheme").addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });


// 疑似コード
// 1. 「toggleTheme」というIDを持つボタンを探す
// 2. そのボタンに「クリックされたときの動作」を登録する
// 3. クリックされたら、bodyタグのクラスに「dark」があるかを確認し、あれば削除・なければ追加する
// →これによりテーマの切り替えが実現される

// コード解説
// document.getElementById("toggleTheme").addEventListener("click", () => {
//     意味：HTMLの中から「toggleTheme」というIDを持った要素（たとえばボタン）を探し、クリックされたときのイベントを設定する。 
    
//     document.body.classList.toggle("dark");
//     意味：ページ全体のbodyタグに「dark」というクラスがすでに付いていれば削除し、なければ追加する。 
//     💡ポイント：「toggle」は「オン・オフの切り替え」のような処理。

//     });
//     意味：1行目で設定した「クリックされたときにやること」の処理が終わる位置。関数の締め。
    
//     💡補足
//     このスクリプトと合わせて、CSS側に「.dark」クラスのデザインルールを書いておけば、明暗テーマの切り替えができる仕組みになります！
    
//     css
//     body.dark {
//       background-color: #222;
//       color: #fff;