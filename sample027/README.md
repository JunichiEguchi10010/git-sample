高階関数（Higher-Order Functions）とは？ map forEach filter　20250415

高階関数は、関数を引数として受け取る関数または関数を戻り値として返す関数のことを指します。
<!-- 関数を引数とすることで配列操作を容易にすることができる -->
これらはJavaScriptの開発現場で頻繁に使用され、特に以下の状況で便利です：

■配列操作

■非同期処理

高階関数の例：配列メソッド
map メソッド：

目的：配列の全ての要素に同じ操作を適用し、新しい配列(戻り値が配列)を返します。

例：
javascript
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6]
反復処理を簡潔に記述できます。

forEach メソッド：
目的：配列の全ての要素に対して何らかの処理を実行します。戻り値はありません。

例：
javascript
const numbers = [1, 2, 3];
numbers.forEach(num => console.log(num));
filter メソッド：

目的：配列の要素を条件に基づいてフィルタリングし、新しい配列を返します。

例：
javascript
const numbers = [1, 2, 3, 4];
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4]

無名関数（Anonymous Functions）とは？
無名関数は名前を持たない関数で、特定の場面でのみ使う一時的な関数として便利です。

利用例：
高階関数の引数として渡す際に使用。

例：以下はmapで無名関数を使用した例です。

javascript
const numbers = [1, 2, 3];
const doubled = numbers.map(function(num) {
  return num * 2;
});

アロー関数を使ってさらに簡潔にする
javascript
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);


目的と利点
コードの抽象化: 高階関数を使用することで、同じような処理を繰り返し書く必要がなくなり、
コードが簡潔になります。例えば、mapやfilterを使うことで、ループ処理を自分で書く必要がなくなります。

柔軟性の向上: 高階関数は、関数を引数として受け取り、何をしたいかの具体的な処理を渡すことで、幅広い用途に対応できます。
例えば、filterに条件を渡せば、特定の条件に合ったデータだけを抽出できます。

可読性の向上: ループ処理や条件分岐が隠されるため、プログラム全体の流れがより分かりやすくなります。




通常のFOR文
javascript
const numbers = [1, 2, 3];
const doubled = []; // 新しい配列を作成

for (let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2); // 各要素を2倍して新しい配列に追加
}

console.log(doubled); // 結果: [2, 4, 6]

forループ: 配列numbersを手動で走査して、各要素を取得します。
pushメソッド: 各要素を処理してdoubled配列に追加します。
この方法はシンプルですが、ループや配列操作を自分で記述する必要があり、コードが長くなる傾向があります。


高階関数を使い、引数にアロー関数を使用した場合
javascript
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // 結果: [2, 4, 6]




17. 高階関数（Array.map, forEach, filter） - プログラミング初心者のためのプログラミング学習（JavaScript）
https://www.youtube.com/watch?v=8VxsdWPc9sQ&list=PLfjH1GcldGmiCbhsiZ19QWJKcMXlrm-Cr&index=19