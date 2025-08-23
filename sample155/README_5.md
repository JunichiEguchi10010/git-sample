Gulpを中心にしたフロントエンド開発環境（Sassコンパイル + JSバンドル + 画像最適化）のセットアップ方法 20250823

Node.js がインストール済み

プロジェクトを新規作成する場合

✅ 1. プロジェクト準備
mkdir my-project
cd my-project
npm init -y

package.json が作成されます

✅2. 必要なパッケージをインストール
npm install --save-dev gulp gulp-sass sass gulp-concat gulp-uglify gulp-imagemin gulp-sourcemaps

パッケージ	            役割
gulp	            タスクランナー本体
gulp-sass + sass	Sass → CSSコンパイル
gulp-concat	        JSファイル結合
gulp-uglify	        JS圧縮
gulp-imagemin	    画像最適化
gulp-sourcemaps	    ソースマップ生成（デバッグ用）

✅ 3. ディレクトリ構成例
my-project/
├─ src/
│  ├─ scss/
│  │   └─ style.scss
│  ├─ js/
│  │   └─ script.js
│  └─ images/
│      └─ sample.png
├─ dist/
│  ├─ css/
│  ├─ js/
│  └─ images/
└─ gulpfile.js

dist/ は手動で作ってもよいですが、Gulp実行時に自動生成も可能です

✅ 4. gulpfile.js の例（CommonJS形式）
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');

// Sassコンパイル
function styles() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));
}

// JSバンドル・圧縮
function scripts() {
  return gulp.src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'));
}

// 画像最適化
function images() {
  return gulp.src('src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
}

// 監視タスク
function watchFiles() {
  gulp.watch('src/scss/**/*.scss', styles);
  gulp.watch('src/js/**/*.js', scripts);
  gulp.watch('src/images/**/*', images);
}

// タスクの公開
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.watch = gulp.series(styles, scripts, images, watchFiles);
exports.default = gulp.series(styles, scripts, images);

✅ 5. 実行方法
npx gulp          # Sass, JS, 画像をまとめてビルド
npx gulp watch    # 監視 + 自動ビルド

watch を実行すると、ファイルを保存するたびに自動で処理されます

✅ ポイント
SassやJSは圧縮付きでビルド
画像も自動で最適化
Gulp単体で開発・ビルドが完結
Viteと併用する場合は、Sass・JSバンドルはViteに任せ、Gulpは画像最適化だけ担当する構成も効率的


✅ まとめ：Gulp環境を 完成形の状態
1. ディレクトリ構成（完成形イメージ）
my-project/
├─ src/
│  ├─ scss/
│  │   └─ style.scss       ← Sassのソース
│  ├─ js/
│  │   └─ script.js        ← JSのソース
│  └─ images/
│      └─ sample.png       ← 画像
├─ dist/                   ← Gulpが出力
│  ├─ css/
│  ├─ js/
│  └─ images/
├─ package.json
└─ gulpfile.js             ← 完全版タスク

2. 完全版 gulpfile.js（CommonJS）
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');

// Sass → CSS（圧縮 & ソースマップ）
function styles() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));
}

// JSバンドル + 圧縮
function scripts() {
  return gulp.src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'));
}

// 画像最適化
function images() {
  return gulp.src('src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
}

// ファイル監視
function watchFiles() {
  gulp.watch('src/scss/**/*.scss', styles);
  gulp.watch('src/js/**/*.js', scripts);
  gulp.watch('src/images/**/*', images);
}

// タスクの公開
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.watch = gulp.series(styles, scripts, images, watchFiles);
exports.default = gulp.series(styles, scripts, images);

3. 実行コマンド
npx gulp          # 一括ビルド（Sass, JS, 画像）
npx gulp watch    # 自動監視 + ビルド

SassやJSは圧縮され、dist に出力されます
画像は最適化されます
保存するだけで自動的に処理されるので作業がラクになります


✅ 1. npx gulp を実行した場合
npx gulp

起こること
gulpfile.js の defaultタスク が実行される
今回の default は styles → scripts → images の順に処理

Sassのコンパイル
src/scss/**/*.scss を読み込み
CSSに変換し、圧縮（minify）
ソースマップを生成（デバッグ用）
dist/css/ に出力
JSの結合と圧縮
src/js/**/*.js を読み込み
bundle.js に結合
圧縮（minify）
ソースマップを生成
dist/js/ に出力
画像最適化
src/images/**/* を読み込み
画像圧縮
dist/images/ に出力

💡ポイント：一回のコマンドでSass・JS・画像をまとめてビルド

2. npx gulp watch を実行した場合
npx gulp watch

起こること
最初に styles → scripts → images を実行（初回ビルド）
その後、ファイルを監視（watch）
src/scss/**/*.scss → 変更があれば styles タスク自動実行
src/js/**/*.js → 変更があれば scripts タスク自動実行
src/images/**/* → 変更があれば images タスク自動実行
保存するたびに自動でビルドされるので 手作業で毎回コマンドを打つ必要なし

3. 実行イメージ（ターミナル例）
[15:00:00] Starting 'styles'...
[15:00:01] Finished 'styles'
[15:00:01] Starting 'scripts'...
[15:00:02] Finished 'scripts'
[15:00:02] Starting 'images'...
[15:00:03] Finished 'images'
[15:00:03] Starting 'watchFiles'...
[15:00:03] Watching files...

この状態でSCSSやJSを保存すると、該当タスクだけが再実行されます

💡 まとめ

npx gulp → 一括ビルド（Sass, JS, 画像）
npx gulp watch → 初回ビルド後に監視、自動ビルド
監視中は、保存するだけで処理が走るので作業効率が格段に上がる


✅ Gulpのタスクは 「必要なときに実行する」 のが基本です。
タイミングごとに整理するとわかりやすいです。

1. 初回ビルド（プロジェクト準備時）
プロジェクトを作った直後や、新しいSass/JS/画像を追加したとき

実行コマンド：
npx gulp
Sass・JS・画像をまとめて dist/ に出力
まだ監視していないので、手動で実行する必要があります

2. 開発中（編集作業時）
SCSSやJS、画像を編集するたびに手動でビルドするのは面倒
そこで 監視モード を使う
npx gulp watch

実行すると：
最初に一回ビルド（初回の styles → scripts → images）
ファイルを監視 → 保存するたびに自動でビルド
開発中はずっと watch を起動 しておくのが効率的

3. 本番リリース前（最終ビルド）
デプロイ前に 最新のビルドを作る 必要があります
ここでも一括ビルド：

npx gulp

watchは必要なし、最終成果物だけを dist/ に出力

💡まとめ
状況	           実行コマンド	     内容
初回セットアップ	npx gulp	     Sass・JS・画像をまとめてビルド
開発中	           npx gulp watch	ファイル監視 + 自動ビルド
本番リリース前	    npx gulp    	 最終ビルドのみ

開発中は watch を起動して、手を動かすたびに自動ビル
リリース前は一括ビルド