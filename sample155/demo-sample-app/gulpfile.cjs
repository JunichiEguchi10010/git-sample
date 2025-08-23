const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

// Sassタスク
gulp.task('sass', () => {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream()); // CSS変更時に即時反映
});

// JSタスク
gulp.task('scripts', () => {
  return gulp.src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream()); // JS変更時に即時反映
});

// 画像最適化
gulp.task('images', () => {
  return gulp.src('src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

// HTMLコピー
gulp.task('html', () => {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

// デフォルトタスク（初回ビルド用）
gulp.task('default', gulp.parallel('sass', 'scripts', 'images', 'html'));

// serveタスク（初回ビルド + サーバー起動 + ファイル監視）
gulp.task('serve', gulp.series('default', () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });

  gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('src/js/**/*.js', gulp.series('scripts'));
  gulp.watch('src/images/**/*', gulp.series('images'));
  gulp.watch('src/**/*.html', gulp.series('html'));
}));

// // watch タスク（serve と統合する場合は不要）
// gulp.task('watch', () => {
//   gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
//   gulp.watch('src/js/**/*.js', gulp.series('scripts'));
//   gulp.watch('src/images/**/*', gulp.series('images'));
// });


// ✅ これで npx gulp serve を実行すれば：
// dist フォルダに必要なファイルがすべてビルドされ
// ローカルサーバーが起動し
// ファイル変更が監視されて
// ブラウザが自動リロードされる