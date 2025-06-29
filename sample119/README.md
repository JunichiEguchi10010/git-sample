条件式のパターン 20250629

🔚 実務で条件式が多用されるタイミング
ナビゲーションの現在位置表示
ログイン・会員状態の判定
フォーム入力チェック
モバイル/PCのUI切り替え
投稿・データの有無チェック
日付/時間による期間制御


ホームページ制作の実務では、HTML・CSS・JavaScript・PHPなどを使いながら、条件によって表示・処理を切り替える「条件分岐（if文など）」が多く使われます。
以下に「実務でよくある条件式のパターン」を、目的別にわかりやすく・詳しくまとめました。

✅ 表示・非表示の切り替えパターン
● ログインしているユーザーのみ表示
php
<?php if (is_user_logged_in()): ?>
  <p>ようこそ、ログインユーザー様</p>
<?php endif; ?>
WordPressなどでよく使われる。
会員限定コンテンツやマイページ表示で活用。

● スマホとPCで表示を切り替える
js
if (window.innerWidth <= 768) {
  // スマホ用の処理
} else {
  // PC用の処理
}
JavaScriptやCSSメディアクエリと組み合わせてレスポンシブ対応。
実務では「ハンバーガーメニュー」の切り替えなどで使用。

● 特定のページだけ表示する
php
<?php if (is_page('contact')): ?>
  <script src="contact-form.js"></script>
<?php endif; ?>
ページ別に必要なファイルだけ読み込むことでパフォーマンス最適化。

✅ クラス名の動的切り替えパターン
● アクティブなナビにclassを追加
php
<li class="<?php if (is_page('about')) echo 'active'; ?>">
  <a href="/about">About</a>
</li>
現在表示中のページに応じてナビにハイライトを入れる。

● スクロール位置に応じてクラスを付ける
js
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('fixed');
  } else {
    header.classList.remove('fixed');
  }
});
ヘッダーの固定・表示切替、アニメーションのトリガーなどに使用。

✅ フォーム入力・バリデーションの条件分岐
● 入力が空だったら送信しない
js
if (input.value === '') {
  alert('入力してください');
  return false;
}
フォーム送信前にバリデーションを行うのは必須。

● メールアドレス形式かどうか判定
js
if (!input.value.match(/^[\w\-\.]+@[\w\-\.]+\.[a-z]{2,}$/)) {
  alert('メールアドレスの形式が正しくありません');
}
実務では正規表現とセットで条件式を使うことが多い。

✅ データの有無による表示制御
● 投稿があればループで表示
php
<?php if (have_posts()): while (have_posts()): the_post(); ?>
  <h2><?php the_title(); ?></h2>
<?php endwhile; else: ?>
  <p>記事がありません。</p>
<?php endif; ?>
WordPressの投稿一覧表示でよく使われる基本形。

● データが存在するかチェック（JavaScript）
js
if (data && data.length > 0) {
  renderList(data);
} else {
  showEmptyMessage();
}
Ajax通信で取得したデータが空かどうかの判定によく使う。

✅ 時間・日付・条件に応じた出し分け
● 今日の日付によって表示を切り替える
js
const today = new Date();
if (today.getDay() === 0) {
  console.log('今日は日曜日');
}
キャンペーンや営業日カレンダーの切り替えに使う。

● 指定期間中だけバナーを表示（PHP）
php
<?php
$now = time();
$start = strtotime('2025-06-01');
$end = strtotime('2025-06-30');
if ($now >= $start && $now <= $end): ?>
  <div class="campaign-banner">6月限定キャンペーン中！</div>
<?php endif; ?>
実務では「特定期間のみ表示」は頻出。

✅ その他 実務でありがちな条件分岐
● デバイス言語に応じた表示切替
js
const lang = navigator.language;
if (lang.startsWith('ja')) {
  showJapaneseContent();
} else {
  showEnglishContent();
}
多言語サイトでは定番。

● カテゴリやタグによって表示を切り替え（WordPress）
php
<?php if (has_tag('news')): ?>
  <div class="tag-news">お知らせ記事</div>
<?php endif; ?>
投稿の属性に応じた出し分けでUX向上。

🔚 まとめ：実務で条件式が多用されるタイミング
ナビゲーションの現在位置表示
ログイン・会員状態の判定
フォーム入力チェック
モバイル/PCのUI切り替え
投稿・データの有無チェック
日付/時間による期間制御
