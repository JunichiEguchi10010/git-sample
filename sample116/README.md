WebDesign html css javascript スクロール連動ナビ（現在地をハイライト）20250627

✅ 1. 疑似コード
1. ページ読み込み後、すべてのセクションとナビリンクを取得する
2. ユーザーがスクロールしたときにイベントを発火する
3. 各セクションが画面内に入っているかをチェックする
4. 入っていれば、そのセクションに対応するナビリンクを「active」にする
5. 他のナビリンクからは「active」を外す
6. 画面幅が狭いときはハンバーガーメニューなどに対応（レスポンシブ設計）


✅ 2. 技術構成（構造・スタイル・動きの技術）
要素	        使用技術	                    解説
HTML	    セクション・ナビリンク	            idとhref="#id"で対応付け
CSS	        スクロール位置の表示・ハイライト	.activeクラスで色を変更・レスポンシブ対応
JavaScript	IntersectionObserver	          スクロール位置を検出し、ナビリンクにクラス追加
レスポンシブ	メディアクエリ	                スマホやタブレットでも正しく表示されるようにする


✅ 補足（実務での注意点）
ポイント	                                                        解説
固定ヘッダーの高さに合わせて padding-top を調整	        スクロールで内容が隠れないように
IntersectionObserver は軽量でパフォーマンス良好	        実務でも十分使える
アクセシビリティ	                                   aria-current の活用やキーボード対応を考慮するとさらに良い
スムーススクロール	                                   html { scroll-behavior: smooth; } も追加可


✅ コード解説
document.addEventListener('DOMContentLoaded', () => {
意味：HTMLドキュメントの読み込みが完了したら、以下の処理を実行するというイベントリスナー。
理由：DOM（要素）が読み込まれる前にスクリプトが走るとエラーになるため、安全に動かすための書き方です。

  const sections = document.querySelectorAll('.section');
意味：.section クラスがついたすべてのセクション（要素）を取得し、sections に格納します。
例：<section class="section" id="section1">～</section> など。

  const navLinks = document.querySelectorAll('.nav-link');
意味：ナビゲーションのリンク（.nav-link クラス）をすべて取得します。
使い道：どのリンクが現在のセクションかを判定し、スタイル（.active）を付け替えるため。

  const observer = new IntersectionObserver(
意味：IntersectionObserver というAPI（交差観測者）を使って、特定の要素が画面に表示されたかどうかを監視する処理を開始します。

    entries => {
意味：監視対象の要素にスクロールなどで変化があった場合、呼び出される関数（コールバック）の引数。
entries：表示の変化があった監視対象（複数）をまとめた配列です。

      entries.forEach(entry => {
意味：表示状態が変化した各セクション要素について順番に処理をします。

        const id = entry.target.getAttribute('id');
意味：現在チェック中のセクションの id を取得します。
例：<section id="section2"> なら "section2" が取得される。

        const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
意味：その id に対応するナビゲーションリンク（例：<a href="#section2">）を取得します。

        if (entry.isIntersecting) {
意味：そのセクションが画面内（指定された割合）に入っているかどうかを判定します。
trueのとき：画面に見えている状態。

          navLinks.forEach(link => link.classList.remove('active'));
意味：すべてのナビリンクから .active クラス（ハイライト）をいったん削除します。

          navLink.classList.add('active');
意味：該当のセクションに対応するリンクに .active クラスを追加し、現在地として強調します。

      });
意味：entries.forEach(...) の処理終了。

    },
意味：IntersectionObserver のコールバック関数終了。

    {
      threshold: 0.6, // セクションが60%見えたら対象とする
    }
意味：セクションが60%以上表示された時点で「表示された」とみなす設定です。
効果：チラ見えではなく、しっかり見えてからナビを切り替えるようになります。

  );
意味：IntersectionObserver インスタンスの定義完了。

  sections.forEach(section => {
    observer.observe(section);
  });
意味：すべてのセクションを監視対象に登録します。

効果：これで各セクションが画面に入ったときに自動でナビリンクが切り替わるようになります。

});
意味：DOMContentLoaded のイベントハンドラーの終了。

💡まとめ
このスクリプトは「IntersectionObserver」を活用して、
セクションが画面に入ったタイミングで
対応するナビゲーションリンクをハイライト（.active）に変更する
という動作を、軽量で効率的に行っています。