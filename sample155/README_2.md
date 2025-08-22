CSS Sass（Syntactically Awesome Stylesheets） について 20250822

Sass公式サイト
https://sass-lang.com/

Sass（Syntactically Awesome Stylesheets）は、CSSをよりパワフルにするための「プリプロセッサ」です。
つまり、Sassで書いたコードを一度コンパイル（変換）して、通常のCSSにしてからブラウザで使います。

💡 Sassのメリット
Sassを使うと、CSSの面倒な部分がスッキリします。
主なメリットはこちら：

✅ 変数が使える 色やサイズを変数にして、何度も使い回せます。
scss
$main-color: #3498db;
body {
  background-color: $main-color;
}

✅ ネスト（入れ子）構造が使える
HTMLの構造に合わせて、CSSを階層的に書けます。

scss
nav {
  ul {
    li {
      a {
        color: blue;
      }
    }
  }
}

✅ ミックスイン（mixin）で再利用可能なスタイルを定義できる
よく使うスタイルをまとめて、必要なときに呼び出せます。

scss
@mixin center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  @include center;
}

✅ 継承（@extend）でスタイルを引き継げる
似たようなスタイルをまとめて管理できます。

scss
.message {
  border: 1px solid #ccc;
  padding: 10px;
}

.success {
  @extend .message;
  border-color: green;
}

✅ ファイルを分割し管理がしやすい
Sassは、ファイルを分割し管理をしやすくすることができます。
ファイルを以下のようにそれぞれのまとまりで分割するとします。
_header.scss
_body.scss
_footer.scss
_sidebar.scss
そうすると、ヘッダーの記述を修正する時は「_header.scss」を修正すれば良くなるので、該当箇所を見つけやすく管理がしやすくなります。

✅🔧 Sassを使うには？
Sassはコンパイルが必要なので、以下のような方法で使います：

Node.js + Dart Sass（公式推奨）
WebpackやViteなどのビルドツールに組み込む
GUIツール（CodeKitなど）で簡単に使う

🧠 まとめ
機能	       CSS	    Sass
変数	       ❌	    ✅
ネスト	       ❌	    ✅
ミックスイン	❌       ✅
継承	       ❌	    ✅


✅「SASS記法」と「SCSS記法」

SASSとSCSSとは何が違う？
Sassには実は記法が2つあり、「SASS記法」と「SCSS記法」があります。

結論：「SCSS記法」が主流

最初は「SASS記法」が用いられていましたが、通常のCSSの書き方を非常に簡略化して書かれており、そのためCSSの書き方と異なり分かりづらいためあまり普及しませんでした。
その後にCSSの書き方に近い「SCSS記法」が作られ、それが広く普及して今に至ります。
そのため、Sassと呼ばれていますが ファイルの拡張子は「.scss」 となっています。
この辺りが少しややこしいので、注意しましょう。
ちなみに「SCSS」は「Sassy CSS」の略で「イカしたCSS」という意味となります。

✅ Sassの「SASS記法」と「SCSS記法」と大文字と小文字で意味が違ってくるので注意