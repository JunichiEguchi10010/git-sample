WebDesign HTML、CSS、JavaScript スクロールでカーテンが開くようなアニメーション 20250612

document.addEventListener("DOMContentLoaded", () => {
  const wrappers = document.querySelectorAll(".curtain-wrapper");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.4, // 表示領域の40%入ったら
    }
  );

  wrappers.forEach(wrapper => observer.observe(wrapper));
});

💡ポイント
.curtain は要素全体を覆っており、translateX(100%) で右へスライドして「開く」演出。
.content はデフォルトで透明（opacity: 0）、カーテンが開いたら opacity: 1 で表示。
IntersectionObserver を使って、スクロールで画面内に入ったタイミングを検知しています。

コード解説：
document.addEventListener("DOMContentLoaded", () => {
📌 意味: ページのHTML（DOM）がすべて読み込まれたら、関数を実行します。
💡ポイント: 画像やスタイルが読み込まれる前でも、HTMLの要素が使える状態になったタイミングで発動します。

  const wrappers = document.querySelectorAll(".curtain-wrapper");
📌 意味: HTMLの中で、.curtain-wrapper というクラスを持つすべての要素を取得して、wrappersという変数に入れます。
💡例: 複数セクションに .curtain-wrapper があれば、それら全部を対象にします。

  const observer = new IntersectionObserver(
📌 意味: 新しく IntersectionObserver という監視オブジェクトを作ります。
💡目的: ある要素が画面に表示される（交差する）かどうかを自動的に監視するための仕組み。

    entries => {
📌 意味: 監視している要素が画面内に入ったか出たかを entries（一覧）で受け取る関数の始まりです。

      entries.forEach(entry => {
📌 意味: entries の中には複数の要素の情報があるので、それを1つずつ順番に処理します。


        if (entry.isIntersecting) {
📌 意味: 要素が表示画面内に40%以上入っているかどうか（交差しているか）をチェックします。
💡trueなら「表示された」とみなします。

          entry.target.classList.add("active");
📌 意味: 表示された要素（entry.target）に active というクラスを追加します。
💡このクラスがCSS側で「カーテンを開く」アニメーションを発動させます。

        }
📌 意味: if 文の終わり。

      });
📌 意味: entries.forEach() の終わり。すべての監視対象要素を処理します。

    },
    {
      threshold: 0.4, // 表示領域の40%入ったら
    }
  );
📌 意味: IntersectionObserver のオプション設定。

threshold: 0.4 は、要素が画面内に40%以上入ったときに反応するようにしています。

  wrappers.forEach(wrapper => observer.observe(wrapper));
📌 意味: さっき取得したすべての .curtain-wrapper 要素に対して、監視を開始（observe）します。
💡これでスクロールによる表示チェックが有効になります。

});
📌 意味: DOMContentLoaded のイベントリスナーを閉じる部分です。
💡これですべての処理が、HTML読み込み完了後に実行されるようになります。




✅ IntersectionObserver とは？
ある要素が、別の要素（またはビューポート）と交差したかどうか（＝表示領域に入ったかどうか）を非同期に監視できる API です。

🟨🟨🟨
✅IntersectionObserverの仕組み
new IntersectionObserver(callback, {
  root: null,         // 監視対象（nullはビューポート）
  rootMargin: "0px",  // 表示エリアのマージン調整
  threshold: 0.4      // 対象要素の表示割合（0〜1）
});

IntersectionObserver は JavaScript（正確には Web API）の一部として、ブラウザにもともと組み込まれている仕組みです。
自分で定義したり、ライブラリを追加したりする必要はありません。
Chrome、Firefox、Safari、Edge などの主要ブラウザに標準対応しています。

📌 使うと何ができる？
たとえば：
スクロールしてきたときに要素をアニメーション表示（いわゆる「フェードイン」「カーテン」効果）
広告や画像などを 遅延読み込み（Lazy Load）
スクロールで読み進めた時の 現在位置のナビゲーション切替
無限スクロール（ページの一番下が見えたらコンテンツを追加）

🧪 登場の背景（なぜ生まれた？）
従来は次のようにして監視していました：

window.addEventListener('scroll', () => {
  const rect = element.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    // 要素が表示された
  }
});
→ これでは処理が重くなったり、複雑になりやすい。

そこで、IntersectionObserver が登場し、効率的で軽量な監視手段として使われるようになりました。

✅ 主要ブラウザの対応状況
ブラウザ	    対応状況
Chrome	○      対応済み
Firefox	○      対応済み
Safari (iOS含む)	○ 対応済み
Edge	○      対応済み
Internet Explorer	❌ 非対応（IE11以前）
📌 2020年以降、IEのサポート終了により、IntersectionObserver は実用上ほぼ全ブラウザで使えます。

✅ まとめ
項目	                内容
組み込みか？	        ✅ もともとある（Web標準API）
対応ブラウザ	        IE以外のモダンブラウザはすべて対応
主な用途	           要素の表示検知、スクロール連動処理、Lazy Load、ナビゲーション更新 など
特長	               軽量・高性能・コードが簡潔




✅ threshold: 0.4（スレッシュホールド：出発点・入り口）
これは：
「対象の要素（entry.target）自体の面積のうち、40%がビューポート（画面表示領域）に入っている状態になったら、コールバック関数を実行する」
という意味です。

🔍 図でイメージ
--------------------------- ← ビューポート上端
|                         |
|        ↑               |
|     要素の一部          |
|    （40%以上が表示）     |
|                         |
--------------------------- ← ビューポート下端
ビューポート側（表示領域）の 40% では ない

対象要素自身の 40% が表示領域に入ったかどうか です

📦 具体例で考える
🎯 要素の高さが 500px の場合：
その 40% = 200px
要素の200px以上が画面に入った瞬間に isIntersecting: true になる



【頻出Webデザイン】画像がカーテン状に表示されるアニメーション
https://www.youtube.com/watch?v=N-HyeCuwCs4

https://www.youtube.com/watch?v=T0u6j6GNaHk
スクロールアニメーション！CSSとJSでカーテンが開くように要素を表示！