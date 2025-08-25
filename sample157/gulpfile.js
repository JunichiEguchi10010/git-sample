// 開発用（自動監視＋ブラウザ自動リロード）
// npx gulp

// 本番ビルド（dist/ に出力）
// npx gulp build

// このセットアップで、
// src/scss/ → dist/css/style.css（Autoprefixer + minify + sourcemap）
// src/js/ → dist/js/main.js（Babel + minify + sourcemap）
// src/images/ → dist/images/（圧縮）
// src/*.html → dist/
// が自動で処理されます。

// gulpfile.js に以下タスクを設定：
// HTMLコピー
// SCSS → CSS（Sourcemap + Autoprefixer + minify）
// JS圧縮（Babel + Uglify）
// 画像圧縮
// dist クリーン
// BrowserSync で開発サーバー＆自動リロー

// ==============================
// 必要プラグインの読み込み
// ==============================
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();
const del = require("del");

// ==============================
// パス設定
// ==============================
const paths = {
  html: {
    src: "src/*.html",
    dest: "dist/"
  },
  styles: {
    src: "src/scss/**/*.scss",
    dest: "dist/css/"
  },
  scripts: {
    src: "src/js/**/*.js",
    dest: "dist/js/"
  },
  images: {
    src: "src/images/**/*",
    dest: "dist/images/"
  }
};

// ==============================
// HTMLコピー
// ==============================
function html() {
  return gulp.src(paths.html.src).pipe(gulp.dest(paths.html.dest));
}

// ==============================
// SCSS → CSS
// ==============================
function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "expanded"
      }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS()) // 本番用に圧縮
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// ==============================
// JS変換（Babel → Uglify）
// ==============================
function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/preset-env"]
      })
    )
    .pipe(uglify())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// ==============================
// 画像最適化
// ==============================
function images() {
  return gulp
    .src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
}

// ==============================
// クリーン処理
// ==============================
function clean() {
  return del(["dist"]);
}

// ==============================
// ローカルサーバー & 自動リロード
// ==============================
function serve() {
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  });

  gulp.watch(paths.html.src, html).on("change", browserSync.reload);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.images.src, images).on("change", browserSync.reload);
}

// ==============================
// タスク定義
// ==============================
const build = gulp.series(
  clean,
  gulp.parallel(html, styles, scripts, images)
);

exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.build = build;
exports.serve = gulp.series(build, serve);
exports.default = exports.serve;