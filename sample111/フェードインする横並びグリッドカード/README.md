Webdesign javascript スクロールで順番にフェードインする横並びグリッドカードのスクロールアニメーション 20250620

✅技術構成ポイント
IntersectionObserver API
画面表示判定をブラウザ標準機能で行い、高速かつ省リソース

CSS Grid
レスポンシブ対応が簡単で柔軟性が高い

遅延指定をJS側で動的付与
手動で遅延設定を繰り返さず管理工数を削減

アクセシビリティ対応（prefers-reduced-motion）
動きを減らしたいユーザーへの配慮

監視解除でパフォーマンス向上
一度表示したら監視解除しリソース節約

構造分離
HTML・CSS・JSを役割ごとに分離しメンテしやすい

✅ 技術の流れ（スクロール遅延フェードイン）
HTMLでカードをグリッド内に配置

CSSでカードを初期状態（非表示・少し下位置）に設定

JavaScriptでIntersectionObserverを作成し、.sectionの表示を監視

監視中のセクションが画面に入ると子のカードに順番に遅延つきでis-visibleクラスを付与

CSSでis-visibleが付いたカードがフェードインしつつ上にスライド

一度フェードインしたら監視を解除し、パフォーマンスを維持

アクセシビリティ設定が有効な場合は、アニメーションをOFFにしてユーザーの負担を減らす

✅ 疑似コード
DOMの読み込み完了時（DOMContentLoaded）に実行：

  すべての .section 要素を取得する

  IntersectionObserver を作成（しきい値 threshold は 0.2）：
    各監視対象の要素について処理する：
      もしその要素が画面内に表示されたら（isIntersecting）：
        その中にある .card 要素をすべて取得する
        各 .card 要素に対して、順番（index）を使って：
          CSS の transition-delay を index × 0.15秒 に設定
          "is-visible" クラスを付与してアニメーションを発動
        この section の監視を停止する（パフォーマンス最適化）

  各 .section 要素に対して：
    IntersectionObserver で監視を開始する

🔍 用語の補足
IntersectionObserver：画面に要素が入ったかどうかを検知するブラウザの機能
threshold：どれくらい表示されたら「表示された」と判定するか（0.2 = 20%）
transition-delay：アニメーションの開始をどれだけ遅らせるか
is-visible クラス：CSSでアニメーションを発動するトリガー


document.addEventListener("DOMContentLoaded", () => {
HTMLの読み込みがすべて完了したら、以下の関数（=> { ... }）を実行します。
スクリプトをHTMLの<head>や上部に書いていても、DOMがまだ構築されていないとエラーになる可能性があるため。

  const sections = document.querySelectorAll(".section");
クラスが .section のすべての要素を取得して、sections に代入します。
返り値：NodeList（HTML要素のリスト）になります。
目的：このあとで、これらのセクションがスクロールで表示されたかを監視するため。

  const observer = new IntersectionObserver((entries, observer) => {
IntersectionObserverのインスタンス（observer）を生成しています。
ページ内の特定要素（この場合は .section）が画面内に入ったかどうかを自動的に監視する。

引数：
entries：監視している要素の情報（複数ある場合すべて）
observer：今作ったIntersectionObserver自体。後で解除などに使います。

    entries.forEach(entry => {
監視中の要素ごとに順番に処理します。
複数の .section が同時に表示される可能性があるため、それぞれ個別に処理。

      if (entry.isIntersecting) {
この entry（監視対象）が画面に少しでも表示されていれば true。
画面外にいるときは何もしないように制御。画面内に入った瞬間だけ処理する。

        const cards = entry.target.querySelectorAll(".card");
表示された .section の中にある .card 要素をすべて取得。
entry.target は画面に入った .section 要素そのもの。

        cards.forEach((card, index) => {
そのセクション内の .card 要素すべてを順番に処理。
index：0, 1, 2, ... の連番で、順番に遅延時間を設定するために使用。

          card.style.transitionDelay = `${index * 0.15}s`;
card に対してアニメーションの開始を遅らせる時間を設定。
例：1番目は 0秒、2番目は 0.15秒、3番目は 0.30秒... というように、順番に表示されるようにする。

          card.classList.add("is-visible");
CSSで設定している .is-visible クラスを追加。
CSS側の opacity: 1 や transform: translateY(0) が発動し、アニメーションが再生される。

        });
すべての .card に対して処理が終わったことを示す。

        observer.unobserve(entry.target);
一度アニメーションが終わったら、この .section の監視をやめます。
2回目以降のスクロールで再度アニメーションが発動しないようにして、パフォーマンスを向上させる。

      }
if (entry.isIntersecting) の終了。

    });
entries.forEach の終了。すべての監視対象に対して処理が完了したことを意味します。

  }, {
    threshold: 0.2
  });
IntersectionObserverのオプション設定です。
threshold: 0.2：要素の20%が画面内に入ったら「表示された」とみなす設定。
実用的な理由：完全に表示されなくてもアニメーション開始されるため、滑らかに感じられる。

  sections.forEach(section => observer.observe(section));
取得しておいた .section 要素を1つずつ observer で監視開始。
スクロールでそのセクションが見えたら上記処理が発動するようになります。

});
最初の DOMContentLoaded イベントリスナーの終了。HTMLが完全に読み込まれてから、これまでの一連の処理を実行するという流れを閉じます。

✅ まとめ
このコードでやっていることをまとめると：

項目	            内容
🎯 目的	        セクション内のカードを順番にフェードイン表示させる
🧠 技術	        IntersectionObserver + 遅延付きアニメーション
⚙️ 初期設定	    opacity: 0, transform: translateY(30px)（CSS側）
🚀 表示時	    transition-delay で遅らせて is-visible クラス追加
🔧 最適化	    一度表示したら監視解除でパフォーマンスUP

