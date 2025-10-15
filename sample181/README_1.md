JavaScript React JSX構文 三項演算子（条件演算子）の適切な使い方  20251015

🔍 三項演算子とは？
JavaScriptで唯一「3つの被演算子」を取る演算子。(if文の代わりになる)
🔴 ReactなどのJSX構文では、if 文が使えないため、三項演算子がよく使われます。

・JavaScriptの「式と演算子」のカテゴリに属する構文。
・if 文のような「文（statement）」ではなく、「式（expression）」として扱われます。
つまり、値を返す場面（代入、関数の引数、JSX内など）で使えるのが特徴です。

構文：condition ? expr1 : expr2

条件が true なら expr1、false なら expr2 を返す。

「演算子」なので、値を返す場面で使える（代入式や関数の引数など）。

✅ 三項演算子が適しているパターン

1. 値の代入
js
result = str === 'piyo' ? 'piyo！！' : 'not piyo…'
三項演算子の「値を返す」性質を活かして、代入式を簡潔に。

2. 引数の中で分岐
js
console.log(str === 'piyo' ? 'piyo!!' : 'not piyo…')
console.log() の引数として使うことで、コードがスッキリ。

3. 定数への代入（応用）
js
const DISPLAY_PATTERN = displaySize < 500 ? 0 : 1
関数を使わず、宣言時に条件分岐を含めた代入が可能。

❌ 三項演算子が不適なパターン

1. 分岐が複雑な場合
js
if (str === 'piyo') {
  console.log('piyo!!')
} else if (str === 'koke') {
  console.log('koke!!')
} else {
  console.log('not bird…')
}
else if が連続する場合は、if文の方が読みやすい。

2. ネストが深い場合
js
if (str === 'piyo') {
  if (str === 'mofu') {
    console.log('mofu!!')
  } else {
    console.log('piyo!!')
  }
} else {
  console.log('not piyo…')
}
三項演算子でネストすると可読性が下がる。if文で書く方が明快。

📝 結論と心構え
・三項演算子は「短く書ける」より「理解しやすい」ことが重要。
・基本は if/else を使い、三項演算子は「簡潔にできるときだけ」使う
・「三項演算子＝わかりにくい」と決めつけず、適切な場面で活用するのがベスト。


✅ Reactでの三項演算子
ReactなどのJSX構文では、if 文が使えないため、三項演算子がよく使われます。
特に、Reactコンポーネント内で条件に応じて表示内容を切り替える場面で頻出です。

🧩 JSXでの三項演算子の使用例

✅ 表示の切り替えに使う
jsx
{isLoggedIn ? <WelcomeUser /> : <LoginPrompt />}
isLoggedIn が true なら <WelcomeUser /> を表示、そうでなければ <LoginPrompt /> を表示。

JSX内では if 文が直接使えないため、三項演算子が便利。

✅ テキストやスタイルの分岐にも
jsx
<p className={isError ? 'error' : 'normal'}>
  {isError ? 'エラーが発生しました' : '正常です'}
</p>
クラス名や表示文言を条件によって切り替える。

✅ 属性値の分岐
jsx
<button disabled={isLoading ? true : false}>
  {isLoading ? '読み込み中…' : '送信'}
</button>
属性値も三項演算子で制御可能。

🎯 注意点
表示が複雑な場合は、三項演算子より if 文や switch 文を使った方が可読性が高くなることも。
ネストした三項演算子は避ける（読みづらくなる）。
JSXでは「値を返す」ことが重要なので、三項演算子の性質がぴったり合います。

三項演算子の適切な使い方（条件演算子）
https://qiita.com/smicle/items/7d3b9881834dc0142fb7