SCSS @mixin について 20250825

@mixin は Sass（SCSS）で使われるとても便利な機能で、スタイルの再利用を簡単にする仕組みです。
CSS を効率よく書くための「部品化」みたいなものです。

🧩 @mixin とは？
Sass の @mixin は、よく使うスタイルをひとまとめにして、何度でも呼び出せるようにする機能です。 
CSS の「関数」みたいなイメージを持つとわかりやすいです。

📦 基本の書き方
scss
@mixin box-style {
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}
これは「box-style という名前のスタイルセット」を定義しています。

📞 呼び出し方（@include）
scss
.box {
  @include box-style;
}
このように書くと、.box に対して box-style の中身が展開されます。

🧾 出力される CSS
css
.box {
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}
つまり、@mixin の中身がそのまま挿入されるということです。

🛠️ 引数付きの mixin
もっと柔軟にしたい場合は、引数を使って値を変えられる mixin を作れます。

scss
@mixin font-size($size) {
  font-size: $size;
}
呼び出し側：

scss
.title {
  @include font-size(24px);
}
出力される CSS：

css
.title {
  font-size: 24px;
}
💡 よく使われる場面
レスポンシブ対応（メディアクエリ）
ボタンやカードなどの共通スタイル
アニメーションやトランジションの定義
色やサイズのバリエーション対応

🧠 まとめ
機能	    説明
@mixin	    スタイルのテンプレートを定義する
@include	定義した mixin を呼び出して展開する
引数付き	呼び出し時に値を渡して柔軟に使える
@content	呼び出し元のスタイルを mixin 内に挿入できる（上級編）


✅ @mixinの具体的な使用例

🎨 例①：ボタンのスタイルを共通化
scss
@mixin button-style($bg-color, $text-color) {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: $bg-color;
  color: $text-color;
  cursor: pointer;
  transition: background-color 0.3s;
}
呼び出し例：
scss
.primary-btn {
  @include button-style(#007bff, #fff);
}

.secondary-btn {
  @include button-style(#f0f0f0, #333);
}
✅ メリット：色だけ変えて、他のスタイルは共通にできる！

📱 例②：レスポンシブ対応のメディアクエリ
scss
@mixin mq($breakpoint) {
  @if $breakpoint == sm {
    @media (min-width: 576px) { @content; }
  } @else if $breakpoint == md {
    @media (min-width: 768px) { @content; }
  } @else if $breakpoint == lg {
    @media (min-width: 992px) { @content; }
  }
}
呼び出し例：
scss
.card {
  width: 100%;

  @include mq(md) {
    width: 50%;
  }

  @include mq(lg) {
    width: 33.33%;
  }
}
✅ メリット：画面サイズごとにスタイルを切り替えるのが簡単！

🧼 例③：リセットスタイル
scss
@mixin reset {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
呼び出し例：
scss
* {
  @include reset;
}

✅ メリット：全要素に一括でリセットスタイルを適用できる！

🧠 まとめ
使用例	        内容	                    利点
ボタン	        色を変えて共通スタイル適用	コードの重複を防げる
メディアクエリ	 画面サイズごとの切り替え	 レスポンシブ対応が簡単
リセット	    全要素の初期化	           ベーススタイルの統一

✅@includeはscssであればどこでも呼び出せるのか？
基本的に、@include は SCSSファイル内の任意の場所で呼び出すことができます。
ただし、いくつかのポイントを押さえておくと、より正しく使えます。

✅ 呼び出し可能な場所
呼び出し場所	    使用可能か	    補足
セレクタの中	    ✅ 可能	    一般的な使い方。スタイルの一部として展開されます。
セレクタの外	    ⚠️ 条件付き	    @include の中身がルートレベルのスタイルならOK。
他の mixin の中	    ✅ 可能	      ネストして使うこともできます。
@media の中	        ✅ 可能	      レスポンシブ対応にも便利。

📌 注意点
mixin を定義する前に呼び出すとエラーになります
→ SCSSは上から順に処理するので、@include より前に @mixin を定義しておく必要があります。

mixin の中身がセレクタに依存している場合は、セレクタの中で使うべき 例：

scss
@mixin red-bg {
  background: red;
}

.box {
  @include red-bg;
}
セレクタの外で使う場合は、mixin の中身がルートレベルの CSS である必要があります 例：

scss
@mixin global-reset {
  * {
    margin: 0;
    padding: 0;
  }
}

@include global-reset; // セレクタの外でもOK

🧠 まとめ
@include は柔軟に使えるけど、使う場所の文脈に合った内容の mixin を呼び出すことが大事。
セレクタの中で使うのが基本。
セレクタの外で使う場合は、mixin の中身がそれに適しているか確認しましょう。


✅ @content とは？
Sass（SCSS）の @mixin の中で使う特殊な命令で、 mixin を呼び出すときに書いたスタイルの内容を、その場所に差し込むためのものです。

📦 まずは mixin の定義
scss
@mixin mq($size) {
  @if $size == md {
    @media (min-width: 768px) {
      @content;
    }
  }
}
この mixin は、md サイズ以上の画面にだけスタイルを適用したいときに使います。
そして @content の部分に、呼び出し元で書いたスタイルが入ります。

🧪 呼び出し側のコード
scss
@include mq(md) {
  .box {
    background: red;
  }
}
この @include は、次のように展開されます👇

🧾 実際に出力される CSS
css
@media (min-width: 768px) {
  .box {
    background: red;
  }
}
つまり、@content の場所に .box { background: red; } が挿入されたということです。

🧠 まとめ
要素	    役割・意味
@mixin	    再利用できるスタイルのテンプレートを作る
$size	    呼び出し時に指定する条件（例：md）
@content	呼び出し元で書いたスタイルをここに挿入
@include	mixin を使う命令。中にスタイルを書くと @content に入る