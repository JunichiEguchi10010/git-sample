CSS Sass（Syntactically Awesome Stylesheets）について 20250822

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
ネスト	       ❌	  ✅
ミックスイン	❌      ✅
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


✅ SCSS が残る主な原因
1. 既存の SCSS コードが大量にある
すでに何千行もの SCSS があり、すべてを書き換えるコストが大きすぎる
Tailwind を部分導入し、SCSS と併用して徐々に移行するケースが多い

2. デザインシステムが SCSS ベース
大企業や制作会社では「色・余白・ボタン・コンポーネント」などを SCSS 変数やミックスインで統一している
これを Tailwind に移行すると設計全体を組み替える必要がある
そのため、SCSS を基盤に残したまま、ユーティリティ的に Tailwind を導入することが多い

3. チーム文化・開発体制
CSS 設計（BEM, OOCSS, SMACSS など）を徹底している現場では、SCSS が前提になっている
フロント以外のエンジニア（バックエンド寄り）が Tailwind より SCSS に慣れている場合も多い

4. 技術的制約
CMS（WordPress、Drupal など）や古いビルド環境が SCSS 前提
Tailwind を導入するにはビルド設定を大きく変える必要がある

✅ まとめ
「Tailwind だけで十分なのに SCSS が残る」最大の理由は「既存資産・設計基盤・レガシー対応」
新規開発なら Tailwind 単独で完結するのが主流
既存環境では「Tailwind + SCSS」のハイブリッド運用が現実的

👉 逆に言うと、新規でゼロから作れる立場 なら、「Tailwind で大部分 → 足りない部分を CSS」で十分で、
SCSS を無理に入れる必要はない。



【たった５分で完了】「gulp」の導入方法と使用例を紹介します
https://digitalidentity.co.jp/blog/creative/gulp.html
【Gulp4】フロントエンド環境構築３（Gulp基本）
https://www.youtube.com/watch?v=-9_eTHVOiqg

CSSやHTMLを保存したらブラウザ側も自動的にリロード
Sassが保存されたタイミングで自動コンパイル
CSSにベンダープレフィックスを自動で付与
CSS、JavaScriptのソースを圧縮
画像を圧縮
古いので注意

【Gulp4】フロントエンド環境構築１（概要編）
https://www.youtube.com/watch?v=wj4KUnArxHI&t=234s
【Gulp4】フロントエンド環境構築２（インストール）
https://www.youtube.com/watch?v=zwLQ3i5GGVU&t=185s


以下不要論
https://itokoba.com/archives/7593
Web制作の場合はSassをコンパイルするという用途以外gulpを使いたい場面はほぼないです。

それなのにさらにそのSassが大して必要ありません。