JavaScript  some every メソッド について 20250925

✅ some メソッド いくつか

意味：配列の中に 1つでも条件を満たす要素があるか を調べる。
返り値：true または false

使い方の例
const members = [
  { name: "田中", age: 25 },
  { name: "佐藤", age: 41 },
  { name: "鈴木", age: 32 }
];

// 40歳以上の人が1人でもいるか？
const hasOver40 = members.some(member => member.age >= 40);
console.log(hasOver40); // true

👉 つまり 「1人でも条件に当てはまればOK」 というチェックに使う。

✅ every メソッド すべて

意味：配列の中の すべての要素が条件を満たすか を調べる。
返り値：true または false

使い方の例

// 全員が20歳以上か？
const allOver20 = members.every(member => member.age >= 20);
console.log(allOver20); // true

👉 つまり 「1人でも条件に当てはまらなければ false」 になる。

✅ 使い分けイメージ
some → 「少なくとも1人でも〜？」
every → 「全員が〜？」

🎯 まとめ

some → 配列の中に 1つでも条件を満たす要素があるか

every → 配列の中の すべての要素が条件を満たすか

効率的に条件判定できるので、ループ処理を自分で書くより簡潔。


JSのsome（サム）とevery（エブリー）メソッドについて解説！配列をもっと効率的に扱ってみましょう！
https://www.youtube.com/watch?v=02TjG8iLU-s&t=25s