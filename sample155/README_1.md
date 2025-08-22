モダンCSS・SCSS・Sass（インデント構文）比較 20250822

🧩 機能・構文の比較
| 項目               | モダンCSS                            | SCSS                                     | Sass（インデント構文）                   |
|--------------------|--------------------------------------|------------------------------------------|------------------------------------------|
| 機能・特徴         | ネイティブで軽量。CSSの進化が著しい | Sassの機能をCSSライクな構文で使える     | Sassの機能をインデント構文で使える       |
| 変数               | `--color: #fff;`（CSS変数）          | `$color: #fff;`（Sass変数）              | `$color: #fff`（Sass変数）               |
| ネスト構文         | `@nest`（一部ブラウザ対応）          | `{}`で自由にネスト可能                  | インデントでネスト表現                   |
| 色操作             | `color-mix()`, `color-contrast()`    | `lighten()`, `darken()` など豊富         | 同上（SCSSと同じ）                       |
| レイアウト         | `grid`, `flex`, `clamp()` など       | CSSと同様に使用                          | 同上                                     |
| コンポーネント管理 | `@layer`, `:is()`, `:has()` など     | `@mixin`, `@extend`, `@include`          | 同上（構文が異なる）                     |
| コンパイル         | 不要（ブラウザが直接解釈）           | 必要（CSSに変換）                        | 必要（CSSに変換）                        |
| JavaScript連携     | CSS変数はJSで操作可能                | Sass変数はJSから操作不可                | 同上                                     |
| ツール依存         | 少ない（PostCSSなどで補完可能）      | Sass CLIやビルドツールが必要            | 同上                                     |


✅ 構文比較：モダンCSS vs SCSS vs SASS（インデント構文）
| 機能         | モダンCSS（CSS変数）                          | SCSS（中括弧構文）　Sassの主流                      | Sass（インデント構文）                          |

|--------------|---------------------------------------------|----------------------------------------------------|-------------------------------------|

| 変数定義     | `--main-color: #3498db;`                      | `$main-color: #3498db;`                            | `$main-color: #3498db`                           |
| 変数使用     | `color: var(--main-color);`                   | `color: $main-color;`                              | `color: $main-color`                             |
| ネスト構文   | `@nest .child { color: red; }`（一部対応）    | `.parent { .child { color: red; } }`               | `.parent`<br>&nbsp;&nbsp;`.child`<br>&nbsp;&nbsp;&nbsp;&nbsp;`color: red` |
| ミックスイン | ❌（未対応）                                   | `@mixin rounded { border-radius: 10px; }`          | `=rounded`<br>&nbsp;&nbsp;`border-radius: 10px`  |
| インクルード | ❌（未対応）                                   | `@include rounded;`                                | `+rounded`                                       |
| 条件分岐     | ❌（未対応）                                   | `@if $theme == dark { background: black; }`        | `@if $theme == dark`<br>&nbsp;&nbsp;`background: black` |
| ループ       | ❌（未対応）                                   | `@for $i from 1 through 3 { ... }`                 | `@for $i from 1 through 3`<br>&nbsp;&nbsp;`...`  |
| 関数定義     | ❌（未対応）                                   | `@function double($n) { @return $n * 2; }`         | `@function double($n)`<br>&nbsp;&nbsp;`@return $n * 2` |

モダンCSSは機能が増えてきていますが、ロジック的な処理（条件分岐・ループ・関数）には未対応です。


🎯 実際の選び方の比較
| 項目           | モダンCSS                     | SCSS                                | Sass（インデント構文）         |
|----------------|-------------------------------|-------------------------------------|--------------------------------|
| ページ数       | 少ないなら◎                   | 多いなら◎                           | 少ないなら◎                    |
| 再利用性       | CSS変数・`@layer`で可能       | ミックスイン・関数で強力            | 同上（構文が異なる）           |
| 保守性         | 小規模なら十分                | 中〜大規模で真価発揮                | 小規模向き（簡潔）             |
| ビルド環境     | 不要                          | 必要（npmなど）                     | 必要（npmなど）                |
| JSとの連携     | CSS変数が便利                | Sass変数は不可                      | 同上                           |

📝 まとめ
モダンCSS：軽量でブラウザ対応が進んでおり、小〜中規模のプロジェクトに最適。JSとの連携も強力。
SCSS：CSSに慣れている人にとって扱いやすく、チーム開発や大規模サイトに向いている。
Sass（インデント構文）：コードが簡潔で美しいが、CSSとの互換性がなく、学習コストがやや高め。



🟦 「JSとの連携 ◎ × ×」というのは、JavaScriptからスタイルの値を動的に操作できるかどうかという観点での違いです。

✅ モダンCSS（CSS変数） × JavaScript連携
🔧 CSS（style.css）
css
:root {
  --main-color: #3498db;
}

.button {
  background-color: var(--main-color);
  color: white;
  padding: 10px 20px;
}
💡 JavaScriptで変数を変更
js
document.documentElement.style.setProperty('--main-color', '#e74c3c');

🖼 結果
ボタンの背景色が 青 → 赤 に変わります。 CSS変数は document.documentElement.style.setProperty() を使って リアルタイムで変更可能です。

❌ SCSS / SASS × JavaScript連携不可
🔧 SCSS（style.scss）
scss
$main-color: #3498db;

.button {
  background-color: $main-color;
  color: white;
  padding: 10px 20px;
}
この $main-color は Sassのコンパイル時にCSSに変換されるだけで、JavaScriptからはアクセスできません。

💡 JavaScriptで変更しようとしても…
js
// これは効きません
document.documentElement.style.setProperty('$main-color', '#e74c3c');
→ $main-color はCSSには存在しないため、何も起こりません。

