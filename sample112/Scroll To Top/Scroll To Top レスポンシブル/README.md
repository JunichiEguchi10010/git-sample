WebDesign html css javascript トップへ戻るボタンのレスポンシブ対応（Scroll To Top）20250621

✅ ポイント
対応内容	                説明
表示タイミングの調整	ユーザーがどの端末でも「ちょうどいいタイミング」でボタンが出現するようにする。
ボタンのサイズ・位置	小さい画面ではスペースを圧迫しないように調整。
保守性	               JavaScriptでサイズ別のしきい値を関数化して管理しやすく。

✅ 疑似コード
1. ページのHTMLがすべて読み込まれたら次の処理を始める：

2. 「トップへ戻るボタン」の要素を取得する。

3. 現在の画面幅に応じて、
   - PCなら表示開始位置を 400px に設定
   - タブレットなら 300px
   - スマートフォンなら 150px にする

4. ページをスクロールするたびに、
   - 現在のスクロール量がしきい値を超えていればボタンを表示する
   - 超えていなければボタンを非表示にする

5. ボタンがクリックされたら、
   - ページの一番上へ、滑らかにスクロールする

   document.addEventListener('DOMContentLoaded', () => {
  const scrollBtn = document.getElementById('scrollToTopBtn');

  // 表示しきい値をデバイス幅に応じて返す関数
  const getScrollThreshold = () => {
    const width = window.innerWidth;
    if (width >= 1024) return 400; // PC
    if (width >= 768) return 300;  // タブレット
    return 150;                    // スマホ
  };

  // スクロール時の表示制御
  window.addEventListener('scroll', () => {
    const threshold = getScrollThreshold();
    if (window.scrollY > threshold) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });

  // スムーススクロールでトップへ戻る
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});


✅ コード解説

document.addEventListener('DOMContentLoaded', () => {
意味：HTMLの構造（DOM）がすべて読み込まれたタイミングで、以下の関数を実行する。
✅ 理由：JavaScriptがHTMLの要素（ボタンなど）を確実に取得できるようにするため。

  const scrollBtn = document.getElementById('scrollToTopBtn');
意味：「トップへ戻る」ボタンの要素を、scrollBtn という変数に代入。
✅ 用途：後の処理でボタンを表示・非表示・クリックなどで操作するため。

  // 表示しきい値をデバイス幅に応じて返す関数
  const getScrollThreshold = () => {
    const width = window.innerWidth;
意味：現在の画面幅を window.innerWidth で取得。
✅ 用途：デバイスがスマホ・タブレット・PCのどれかを判定するため。

    if (width >= 1024) return 400; // PC
意味：画面幅が1024px以上ならPCと判断し、スクロール表示しきい値を400pxに設定。

    if (width >= 768) return 300;  // タブレット
意味：768px以上ならタブレットと判断し、しきい値を300pxに。

    return 150;                    // スマホ
  };
意味：それ以外（768px未満＝スマホ）なら、しきい値を150pxに設定。

  window.addEventListener('scroll', () => {
意味：スクロールイベントを検知したとき、関数を実行する。

    const threshold = getScrollThreshold();
意味：現在の画面サイズに応じて表示するためのしきい値（スクロール量）を取得。

    if (window.scrollY > threshold) {
意味：現在の縦スクロール量（scrollY）がしきい値を超えたら…

      scrollBtn.classList.add('show');
意味：「show」クラスをボタンに追加して、CSSでボタンをふわっと表示。

    } else {
      scrollBtn.classList.remove('show');
意味：しきい値以下なら「show」クラスを外して、ボタンを非表示にする。

    }
  });
意味：「scroll」イベントとその中身の処理の終了。

  scrollBtn.addEventListener('click', () => {
意味：ボタンがクリックされたら次の処理を実行する。

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
意味：ページの一番上まで、**滑らかに（スムーズに）**スクロールするよう指示。
✅ top: 0 → 最上部
✅ behavior: 'smooth' → ゆっくりスクロール

  });
});
意味：クリックイベントの終了、そしてDOMContentLoadedの関数も終了。



✅  scrollY と pageYOffset の違い
比較項目	    window.scrollY	                            window.pageYOffset
意味	        垂直方向のスクロール位置を取得する	        同じく垂直方向のスクロール位置を取得
値の内容	    ページの先頭からのY軸方向のスクロール量	    同じくページの先頭からのスクロール量
型	            number（単位：px）	                        number（単位：px）
対応ブラウザ	IE9以上、モダンブラウザすべて	            IE9以上、モダンブラウザすべて
実質的な違い	ほとんどない（同じ値を返す）	            同じく同等に使える
歴史的背景	    比較的新しい（HTML5以降で標準化）	        古くからあるプロパティ

🔎 実務ではどっちを使う？
モダンなコードでは scrollY を使うことが多いです。
**IE対応が必要な場合（現在はほぼない）**は pageYOffset の方が歴史的に使われていました。

// どちらも同じ結果を返す（垂直スクロール位置）
console.log(window.scrollY);
console.log(window.pageYOffset);


✅ ② addEventListener の第3引数オプション { passive: true } とは？
🧾 書式：
element.addEventListener(type, listener, options);
この options に渡せる主なもの：

オプション名	        型	                     説明
passive	        boolean	            trueにするとイベントの中でpreventDefault()できなくなる
capture	        boolean	            キャプチャフェーズでイベントを処理するか（通常はfalse）
once	        boolean	            一度だけイベントリスナーを実行して自動的に削除する

🧠 passive: true の主な使いどころ：
スクロール系イベント（scroll / touchmove）のパフォーマンス向上に使う。
ブラウザが「このイベントではpreventDefault()されない」とわかるので最適化できる。

// 例：パッシブなスクロールイベントリスナー
window.addEventListener('scroll', () => {
  console.log('スクロール中...');
}, { passive: true });
⚠️ passive: true の注意点
この設定をすると、event.preventDefault()が使えなくなります。

// これはエラーになる！
window.addEventListener('touchmove', (e) => {
  e.preventDefault(); // ❌ passive: true の場合は例外が発生
}, { passive: true });

✅ 実務での利用例まとめ
イベント種類	            passive推奨？	            理由・メモ
scroll	                ✅ true	                    パフォーマンス向上、preventDefault不要ならOK
touchstart / touchmove	✅ 条件付き	                スクロール妨げないならtrue
click, keydown	        ❌ 通常不要	                preventDefault()使うことがあるため

🧩 最終例：パフォーマンスに配慮した scroll イベント
window.addEventListener('scroll', () => {
  // 高速なスクロールイベント処理
  checkScrollPosition();
}, { passive: true });
