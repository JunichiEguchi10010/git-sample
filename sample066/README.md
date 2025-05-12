HTML CSS imgタグの下の余白対策　20250512

各方法の比較
方法	                                            メリット	                                    デメリット	                                                    使うべきケース
vertical-align: bottom;	                         画像の下端を揃えられる	                        テキストとの位置調整が難しくなる	                                  画像の下端をテキストと揃えたい場合
display: block;	                                 余白を完全になくせる	                        インライン要素ではなくなるため、テキストと並べられない	                画像を単独で使う場合（例: メインビジュアル）
display: inline-block; vertical-align: middle;	 インラインの特性を維持しつつ、サイズを持てる	  baseline の影響を受けることがある	                                    画像をテキストと一緒に使いつつ、調整が必要な場合
line-height: 0;	                                 フォントの影響を減らす	                        親要素の影響を完全に排除するわけではない	                            line-height の影響で画像の位置がずれる場合
font-size: 0; を親要素に指定                      余計な余白をなくせる	                         テキストが小さくなり、可読性が低下する	                                 画像の周囲に余計なスペースを作りたくない場合
display: flex; を親要素に指定	                  align-items で簡単に位置調整できる             フレックスアイテムとして扱われるため、意図しないレイアウトになることがある	画像を中央揃えしたい場合や、複数の要素を整列したい場合

おすすめの選択
テキストと画像を並べるなら → vertical-align: middle;
画像をテキストと揃えて自然に見せたいなら、この方法が適切。

画像単体なら → display: block;
余白を完全になくして、画像をブロック要素として表示したい場合におすすめ。

テキストのベースラインと揃えたいなら → vertical-align: baseline;
デフォルトの動作なので、特別な調整なしで使える。

インライン要素の特性を維持しつつ調整したいなら → display: inline-block;
インラインのまま扱えるので、複数の画像を横並びにしたいときに便利。

親要素の影響を減らしたいなら → line-height: 0;
line-height の影響で画像の位置がずれる場合に有効。

フレックスボックスを使うなら → display: flex;
align-items を使って簡単に位置調整できるので、レイアウトを柔軟にしたい場合におすすめ。


<img>タグの特性
1.サイズを持つ
他のインライン要素 (<span> など) は基本的にコンテンツのサイズに依存しますが、<img>はwidthやheightを指定して明示的にサイズを変更できます。

2.テキストと異なる表示ルール
imgは「置換要素」（replaced element）と呼ばれ、ブラウザが内部のコンテンツ（画像）を適切にレンダリングします。
例えば<span>や<strong>はテキストとして解釈されますが、<img>は画像として解釈されるため、テキストのプロパティ（letter-spacing, text-decoration など）は適用されません。

3.ベースラインの影響
デフォルトのvertical-align: baseline; の影響で、画像の下に余白ができることがあります。
他のインライン要素（<span>, <a> など）は通常テキストの高さに合わせて表示されますが、<img>は画像のサイズが決まっているため、テキストのベースラインとズレる可能性があります。

他のインライン要素との比較
要素            	サイズ指定可能	                    コンテンツ	                影響を受けるCSS
<span>	            ✖（テキストサイズ依存）	            テキスト	                font-size, color, letter-spacing
<a>                	✖（テキストサイズ依存）            	リンク                  	text-decoration, color
<strong>	        ✖（テキストサイズ依存）            	強調されたテキスト      　 	 font-weight, color
<img>	            ✔（width, height可）	           画像                    　  border, vertical-align, display

ベースラインの基準
テキストのベースライン:フォントの基準線（通常、文字の下端ではなく「x」や「m」の下側に位置する線）がベースラインになります。
画像のベースライン:画像は「置換要素」なので、デフォルトではコンテンツボックスの下端ではなく、文字と同じベースラインに合うように配置されます。
結果: 画像の下端よりも少し上の部分がテキストのベースラインと揃うため、画像の下に余白が生じることがあります。



HTMLの<img>タグはデフォルトでインライン要素ですが、それでもwidthやheightを指定できる理由は、
インライン要素でもボックスモデルに従ってサイズを持つことができるからです。

下に余白ができる理由

ベースラインの影響
imgタグはインライン要素であり、デフォルトではテキストのベースラインに揃えられます。
そのため、画像の下に余白（ギャップ）が生じることがあります。

フォントの影響
画像はインラインテキストの一部として扱われるため、親要素のフォントサイズによって影響を受けることがあります。

デフォルトのvertical-alignがbaseline
vertical-align: baseline; の設定により、画像の下側にテキストのベースライン分の余白ができることがあります。

解決方法
display: block; を指定する（インライン要素ではなくなるため、余白の問題が解消）

vertical-align: bottom; を指定する（ベースラインではなく、画像の下端に合わせる）

font-size: 0; を親要素に指定する（フォントによる影響を排除）
display: flex;　を親要素に指定する（フレックスコンテナのalign-items を調整することで、垂直方向の位置を制御できる）


<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>imgタグの挙動</title>
    <style>
        .container {
            font-size: 20px;
        }

        img {
            width: 200px;
            height: 100px;
            vertical-align: bottom; /* 余白をなくす場合 */
            border: 2px solid red; /* 画像の領域を視覚化 */
        }
    </style>
</head>
<body>
    <div class="container">
        テキスト<img src="https://picsum.photos/seed/picsum/200/300" alt="サンプル画像">テキスト
    </div>
</body>
</html>

<img>タグはインライン要素であるため、周囲のテキストと同じライン上に配置されます。

widthとheightを指定しても画像のサイズは変更されます。

vertical-align: bottom; を指定すると、ベースラインの影響による余白が消えます。


igm(インライン要素)とdisplay: inline-block;について

<img> タグは他のインライン要素とは異なり、最初からサイズ(width / height)を持つ特別な要素です。
画像は「置換要素」（replaced element）と呼ばれ、HTMLの中にデータとして埋め込まれるのではなく、外部の画像データをレンダリングする要素です。
そのため、画像自体の元のサイズ（ピクセル数）がある場合、ブラウザは自動的にそのサイズで表示します。

CSSでサイズ指定が可能
画像の元サイズとは別に、CSSでwidthやheightを指定することで、任意のサイズに変更できます。
html
<img src="https://picsum.photos/200/300" alt="サンプル画像">
css
img {
  width: 100px; /* 強制的に幅を変更 */
  height: auto; /* アスペクト比を維持しながらサイズ調整 */
}
✅ <img> は元のサイズを持つ特殊な要素(インライン要素)
✅ そのまま表示すると元サイズ通りになる
✅ CSS を使うと、自由にサイズ変更が可能 
✅ ただし、width のみ変更すると、画像が歪む可能性があるため height: auto; を併用する！


display: inline-blockについて
インライン要素の特性を維持しながら、ブロック要素のようにサイズを持てるという便利な特性を持っています。 

1. インライン要素のままサイズを指定できる
通常の inline 要素（例: <span>, <a>）は、width や height を指定できません。
しかし、inline-block を使うと、インラインのままサイズを持つことが可能になります。

css
span {
  display: inline-block;
  width: 100px;
  height: 50px;
  background-color: lightblue;
}
このように、インライン要素でもサイズを自由に調整できます。

2. テキストと画像を自然に並べられる
display: block; を使うと、要素が改行されてしまい、横並びにできません。
しかし、inline-block を使えば、テキストや他の要素と横並びに配置できます。

html
<span>テキスト</span>
<img src="https://via.placeholder.com/100x50" alt="画像">
<a href="#">リンク</a>
このように、インライン要素の流れの中で画像やリンクを配置できるのがポイントです。

3. フレックスボックスやグリッドを使わずに簡単なレイアウトが可能
display: flex; や display: grid; を使わなくても、簡単な横並びレイアウトを作ることができます。

css
.box {
  display: inline-block;
  width: 150px;
  height: 100px;
  background-color: lightgray;
  margin: 10px;
}
この設定を使うと、複数の .box 要素を横並びに配置できます。

4. vertical-align との併用で整列がしやすい
inline-block を使うことで、vertical-align の設定を適用できるため、画像やテキストの整列を細かく調整できます。

css
img {
  display: inline-block;
  vertical-align: middle;
}
こうすることで、画像とテキストをバランスよく配置できます。

まとめ
✅ インラインの特性を維持しながらサイズを持てる
✅ テキストや画像と自然に並べられる 
✅ フレックスボックスなしで簡単なレイアウトが可能 
✅ vertical-align との併用で整列しやすい

主な用途
画像とテキストを自然に並べる
display: block; を使うと、画像が改行されてしまうため、テキストと一緒に並べることが難しくなります。
inline-block を使えば、インラインの流れの中で画像を配置できるので、見た目が自然になります。

アイコンやボタンの配置
例えば、アイコン付きのボタンを作るときに、inline-block を使うと、アイコンとテキストを適切に並べることができます。
css
.button {
  display: inline-block;
  padding: 10px;
  background-color: blue;
  color: white;
}

.button img {
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
}
この設定で、ボタン内のアイコンとテキストを自然に並べることが可能になります。

カードやリストアイテムの横並び
例えば、商品のカードやプロフィール画像をリストとして表示するときも、inline-block を使えば、横並びで均等に配置しやすくなります。

ナビゲーションメニュー
メニュー項目を横並びに配置したい場合に、inline-block を使うと、フレックスボックスなしでも簡単にレイアウトを作れる。

使うべきケース
✅ 画像とテキストを自然に並べたい場合
✅ アイコンやボタンの配置を整えたい場合 
✅ ナビゲーションやカードレイアウトなど、複数の要素を横に並べたい場合

この方法は、特にデザインの一貫性を保ちつつ、インライン要素の特性を活かしたいときに便利です！

総括
display: inline-block; 
最大のメリットは、画像 (<img> タグ) をテキストと簡単に横並びにしつつ、サイズ調整も柔軟にできることです。
画像+テキストのレイアウトに特化した専用の値である。


css
Copy to Clipboard
/* キーワード値 */
vertical-align: baseline;
vertical-align: sub;
vertical-align: super;
vertical-align: text-top;
vertical-align: text-bottom;
vertical-align: middle;
vertical-align: top;
vertical-align: bottom;

/* <length> 値 */
vertical-align: 10em;
vertical-align: 4px;

/* <percentage> 値 */
vertical-align: 20%;

/* グローバル値 */
vertical-align: inherit;
vertical-align: initial;
vertical-align: revert;
vertical-align: revert-layer;
vertical-align: unset;

ワードプレス公式ドキュメント
https://developer.mozilla.org/ja/docs/Web/CSS/vertical-align