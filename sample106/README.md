html css ヘッダーの固定表示（スクロールで非表示→再表示）202502615

🟦html
<header id="header" class="header">
  <h1>サイトタイトル</h1>
</header>

<main>
  <p>ここにたくさんのコンテンツが入ります...</p>
</main>

🟦css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #3A99C9;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  transition: transform 0.3s ease;
  z-index: 1000;
}

/* 非表示状態（上に隠れる） */
.header.hide {
  transform: translateY(-100%);
}

main {
  padding-top: 80px;
}

🟦js
let lastScrollY = window.scrollY;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    // 下にスクロール → ヘッダー非表示
    header.classList.add('hide');
  } else {
    // 上にスクロール → ヘッダー表示
    header.classList.remove('hide');
  }

  lastScrollY = currentScrollY;
});


💡 技術ロジック
ロジック部分	                    内容
window.scrollY	                現在の縦スクロール位置を取得。
lastScrollY	                    直前のスクロール位置を保存し、スクロール方向を判定。
currentScrollY > lastScrollY	下方向にスクロールしているかを判定。
> 100	                        ヘッダーがすぐ隠れないようにする「最小スクロール量」。
classList.add('hide')	        CSSクラスを追加し、transformでヘッダーを上に隠す。
classList.remove('hide')	    ヘッダーを再表示。

🔧 カスタマイズ
スクロール方向に関係なく常に上部に戻ったら表示したい場合は scrollY が 0 近くになったら remove('hide') するよう調整。


🟥重要条件文：
js
if (currentScrollY > lastScrollY && currentScrollY > 100)
🔍 条件の意味
「現在のスクロール位置が前回より下に移動していて、かつ、100px以上スクロールしている場合」
🧩 さらに分解：
currentScrollY > lastScrollY
　→ 「ユーザーが下方向にスクロールしている」
currentScrollY > 100
　→ 「スクロール位置が100ピクセルを超えている（＝ページの最初ではない）」

✅ この条件の目的
この if 文はつまり：
「ユーザーが100px以上スクロールして、さらに下にスクロールし続けているときに、ヘッダーを隠す」という動作をさせたいのです。


🟥コード解説
let lastScrollY = window.scrollY;
最初にページを読み込んだ時点での**スクロール位置（縦方向）**を記録します。
lastScrollY は、前回スクロールした位置を覚えておくための変数です。
これを使って、スクロールが「上に動いたのか、下に動いたのか」を判断します。

const header = document.getElementById('header');
HTMLの<header id="header"> 要素を取得し、headerという名前で使えるようにします。
今後このheaderを、表示・非表示に切り替える対象として操作します。

window.addEventListener('scroll', () => {
ウィンドウ全体（window）で「スクロールが発生した時」に呼び出される処理（イベントリスナー）を登録します。
スクロールが起きるたびに、中の関数（()=>{}）が実行されます。

  const currentScrollY = window.scrollY;
スクロールした直後の「現在のスクロール位置（Y軸）」を取得します。
currentScrollYは今のスクロール位置で、さっきのlastScrollYと比較するために使います。

  if (currentScrollY > lastScrollY && currentScrollY > 100) {
**「下にスクロールした」かつ「100px以上スクロールしている」**という条件です。
currentScrollY > lastScrollY は下に動いたことを意味します。
currentScrollY > 100 は、ページを少しだけ動かしただけでは隠さないようにするための条件です。

    header.classList.add('hide');
上記の条件が成立したとき、hideというCSSクラスをヘッダーに追加します。
CSSで .hide { transform: translateY(-100%); } などを定義していれば、ヘッダーが上にスライドして非表示になります。

  } else {
上記以外（＝上にスクロールした、または100px以下しかスクロールしていない）ときの処理です。

    header.classList.remove('hide');
hideクラスを取り除き、ヘッダーを元の位置に戻して表示させます。

  lastScrollY = currentScrollY;
最後に、今回のスクロール位置をlastScrollYに保存します。
次にスクロールしたときに、「前回との差」を比べるために更新します。

✨ まとめ
スクロールのたびに現在位置を取得
前回と比べて「下に動いたか」「ある程度スクロールしたか」をチェック
条件を満たしたらヘッダーを隠す（hide追加）、そうでなければ表示する（hide削除）
最後にスクロール位置を記録して、次回に備える