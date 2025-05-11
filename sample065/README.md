HTML CSS テキストをレスポンシブ対策(メディアクエリを使わない)　 20250511

プロパティ	                         動作
word-break: keep-all;	        単語の途中で改行しない（特に日本語・韓国語に有効）
white-space: nowrap;	        改行を禁止し、テキストが横に伸びる
overflow-wrap: break-word;	    長い単語を途中で改行できる



h1 {
/_ font-size: 48px; _/
font-size: clamp(32px, 8vw, 48px);
/_ 段落ち(日本語の文章が変に分割される)を防ぎ、可読性を向上させる _/
word-break: keep-all;
/_ other-styles _/
font-family: Futura, mobo-bold, sans-serif;
text-align: center;
}

word-break: keep-all; 
CSS のプロパティ word-break の値の一つで、テキストの改行ルールを制御します。

単語の途中で改行しない 通常、長い単語や文章は、コンテナの幅が狭いと自動的に改行されますが、keep-all を指定すると、単語の途中で改行されません。

日本語や韓国語のテキストに有効 アジア系言語（特に日本語や韓国語）では、単語を分けずにそのまま表示することが一般的なため、このプロパティが役立ちます。

英語のテキストには適用されない keep-all は 英語には適用されず、通常の単語区切り（スペースなど）で改行されます。


white-space: nowrap;
改行を防ぐ 通常、テキストは要素の幅に収まらない場合、自動で折り返されます
しかし、nowrap を指定すると 強制的に改行を禁止 します。

テキストが要素の幅を超えた場合は、横に伸びる 必要に応じて、overflow: hidden; や text-overflow: ellipsis; を併用すると、はみ出しを防ぐことができます。

p {
    white-space: nowrap;
    overflow: hidden;
    はみ出した部分は「…」で省略
    text-overflow: ellipsis;
}

overflow-wrap: break-word;
長い単語を途中で改行可能にする overflow-wrap: break-word; を指定すると、長い単語やURLなどが要素の幅を超えた場合、途中で改行されるようになります。
（例えば長いURLや特殊なID）
スマートな改行を実現 通常、英単語はスペースで分割されますが、長すぎる単語がある場合に便利です。
