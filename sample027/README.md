高階関数（Higher-Order Functions）とは？ map forEach filter

高階関数は、関数を引数として受け取る関数または関数を戻り値として返す関数のことを指します。これらはJavaScriptの開発現場で頻繁に使用され、特に以下の状況で便利です：

配列操作

非同期処理

高階関数の例：配列メソッド
map メソッド：

目的：配列の全ての要素に同じ操作を適用し、新しい配列を返します。

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


抽象化の利点
高階関数や無名関数を使用することで、以下のメリットがあります：

コードの簡潔化：同じ処理を繰り返さず、再利用可能。

可読性向上：ループ処理を簡単に記述できる。

メンテナンス性の向上：変更が容易でエラーを減らす。