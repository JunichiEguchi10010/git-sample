html css ピクセルパーフェクト　20250530

➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

🟥CSSのみでの数値変換
SSの calc() 関数を使えば、数値の変換や計算が可能です。例えば、px を rem や vw に変換する際に calc()を活用できます。

1. px → rem の変換
css
html {
    font-size: 16px;
}

p {
    font-size: calc(40px / 16); /* 2.5rem */
}

 calc(40px / 16) を使って rem に変換します。
🟡この方法ではp のフォントサイズ 40pxを rem に変換しています。

2. px → vw の変換
css
p {
    font-size: calc(40px / 1920 * 100vw); /* ビューポート幅1920pxの場合 */
}
この方法では calc(40px / 1920 * 100vw) を使って vw に変換できます。

CSSのみでの計算の注意点
calc() は四則演算（+, -, *, /）が可能。
単位の異なる値を組み合わせる場合は、適切な変換を考慮する必要がある。
vw や rem は環境によって変化するため、ブラウザでの表示を確認しながら調整するのがベスト。


➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

✅Gulpを使ったデザインカンプ処理
pxをvwやremに変換する関数を作成

Gulpのタスク内で、カンプのpx値をvwやremに変換する処理を組み込むことで、異なる画面サイズでも崩れないデザインを実現できます。
例えば、gulp-postcss を使って postcss-pxtorem や postcss-px-to-viewport を適用すると、pxを自動変換できます。


✅数値変換のルール
px を vw や rem に変換する際の基本的な計算方法

🟡1. px → rem の変換
rem は ルートのフォントサイズ（html の font-size）を基準にした相対単位です。
一般的には html { font-size: 16px; } と設定されているため、次の計算式で変換できます。

計算式:
rem値 = px値 ÷ ルートのfont-size
例: 40px を rem に変換（ルートの font-size が 16px の場合）

40 ÷ 16 = 2.5rem
➡︎ CSSでは font-size: 2.5rem; と記述

🟡2. px → vw の変換
vw は ビューポートの幅 に対する割合の単位です。ブラウザの画面幅（例えば 1920px）を基準に変換します。

計算式:
vw値 = (px値 ÷ ビューポート幅) × 100
例: 40px を vw に変換（ビューポート幅が 1920px の場合）

(40 ÷ 1920) × 100 = 2.08vw
➡︎ CSSでは font-size: 2.08vw; と記述


🟥Gulpでpxをremに変換するコード　（px→rem）
以下のコードでは gulp-px2rem-converter を使用して px を rem に変換します。

javascript
const gulp = require('gulp');
const pxToRem = require('gulp-px2rem-converter');

function convertCSS() {
    return gulp.src('./src/*.css') // 変換対象のCSSファイル
        .pipe(pxToRem(16)) // ルートのfont-sizeを16pxとして変換
        .pipe(gulp.dest('./dist')); // 出力先
}

exports.default = convertCSS;
このコードでは、pxToRem(16) を適用することで、px を rem に変換し、dist フォルダに出力します。詳細はこちらで確認できます。

🟥Gulpでpxをvwに変換するコード （px→vw）
postcss-px-to-viewport を使うと、px を vw に変換できます。

javascript
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const pxToViewport = require('postcss-px-to-viewport');

function convertCSS() {
    return gulp.src('./src/*.css')
        .pipe(postcss([
            pxToViewport({
                viewportWidth: 1920, // ビューポートの幅
                unitPrecision: 5, // 小数点以下の精度
                propList: ['*'], // すべてのプロパティを変換
            })
        ]))
        .pipe(gulp.dest('./dist'));
}

exports.default = convertCSS;
このコードでは、viewportWidth: 1920 を指定し、px を vw に変換します。

まとめ
gulp-px2rem-converter を使うと px を rem に変換可能。
postcss-px-to-viewport を使うと px を vw に変換可能。
どちらも gulp のタスクとして組み込めるので、カンプの数値を自動変換し、レスポンシブ対応がしやすくなります。