JavaScript スライダーライブラリ Splide 20250514

Splide は、軽量でアクセシビリティに優れた JavaScript のスライダーライブラリです。
jQuery などの外部ライブラリに依存せず、シンプルな構造で高機能なスライダーを実装できます

Splide の特徴
軽量: ファイルサイズが小さく、ページの読み込み速度に影響を与えにくい。

アクセシビリティ対応: スクリーンリーダー対応など、ユーザーの利便性を考慮。

日本語ドキュメント: 開発者が日本人のため、公式ドキュメントが日本語で提供されている。

豊富なオプション: 自動再生、ループ、フェード効果、レスポンシブ対応など、多彩なカスタマイズが可能


Splide の導入方法

CDN を利用:
html

<script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.0.7/dist/js/splide.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.0.7/dist/css/splide.min.css">

npm でインストール:
npm install @splidejs/splide
GitHub からダウンロード: 公式リポジトリからファイルを取得し、プロジェクトに組み込む。


基本的な使い方
html

<div class="splide">
  <div class="splide__track">
    <ul class="splide__list">
      <li class="splide__slide">Slide 1</li>
      <li class="splide__slide">Slide 2</li>
      <li class="splide__slide">Slide 3</li>
    </ul>
  </div>
</div>
<script>
  new Splide('.splide').mount();
</script>


Splide のイージング（Easing）について
スライダーのアニメーションの動きをカスタマイズする方法

要約
イージングとは？
スライダーの動き方を調整するオプション。
初期値は cubic-bezier(0.25, 1, 0.5, 1) で、最初速く、最後ゆっくりになる動き。

基本的なイージングの種類

linear：一定の速度で動く。

ease-in：最初ゆっくり、最後速く。

ease-out：最初速く、最後ゆっくり。

ease-in-out：最初と最後がゆっくり。

カスタマイズ可能なキュービックベジェ（Cubic Bezier）

cubic-bezier(x1, y1, x2, y2) を指定することで、独自の動きを設定可能。

例えば、cubic-bezier(0.1, 0.7, 0.1, 1) で、最初ゆっくり、途中速く、最後ゆっくりの動きに。

特殊なアニメーション

オーバーシュート（行き過ぎて戻る動き）。

バウンス（跳ねるような動き）。

S 字カーブ（途中で速度が変化する動き）。

実装方法
javascript
new Splide('.splide', {
easing: 'cubic-bezier(0.25, 1, 0.5, 1)' // カスタムイージング
}).mount();


レスポンシブ対応の方法

1.ブレイクポイントの設定 breakpoints オプションを使用して、特定の画面幅でスライドの表示数を変更できます。
javascript
new Splide('.splide', {
perPage: 3, // デフォルトは 3 枚表示
breakpoints: {
768: { perPage: 2 }, // 768px 以下では 2 枚表示
640: { perPage: 1 } // 640px 以下では 1 枚表示
}
}).mount();

2.余白（ギャップ）の調整 gap オプションを使い、画面サイズに応じて余白を変更できます。
javascript
new Splide('.splide', {
gap: '20px', // デフォルトの余白
breakpoints: {
768: { gap: '10px' }, // 768px 以下では余白を 10px に
640: { gap: '5px' } // 640px 以下では余白を 5px に
}
}).mount();

3.メディアクエリーの活用 通常は max-width を使用しますが、min-width を使うことで、特定のサイズ以上の時に適用する設定も可能です。
javascript
new Splide('.splide', {
breakpoints: {
768: { perPage: 2 }, // 768px 以下で 2 枚表示
1024: { perPage: 4 } // 1024px 以上で 4 枚表示
}
}).mount();


Splide と Swiper の違い。

Splide の特徴
軽量: ファイルサイズが小さく、ページの読み込み速度に影響を与えにくい。
アクセシビリティ対応: スクリーンリーダー対応など、ユーザーの利便性を考慮。
日本語ドキュメント: 開発者が日本人のため、公式ドキュメントが日本語で提供されている。
シンプルな API: 設定が直感的で扱いやすい。

Swiper の特徴
高機能: 多くのエフェクト（フェード、パララックスなど）やオプションが用意されている。
モジュール化: 必要な機能だけをインポートできるため、カスタマイズ性が高い。
コミュニティが活発: 世界中で広く使われており、情報が豊富。
レスポンシブ対応: モバイル向けのスワイプ操作がスムーズ。

主な違い
項目                            Splide                   Swiper
ファイルサイズ                  軽量（約 30KB）         やや重め（約 225KB）
jQuery 依存                     なし                     なし
エフェクト                      スライド・フェード        スライド・フェード・パララックスなど
公式ドキュメント                日本語対応                 英語のみ
カスタマイズ性 シンプル 高機能で細かく設定可能

Splide は軽量でシンプルなスライダーを作りたい場合に適している。
Swiper は多機能でカスタマイズ性の高いスライダーを求める場合に向いています。


Splide 公式サイト
https://ja.splidejs.com/

軽量なスライダーライブラリ「Splide」（スプライド）の紹介と基本的な使い方！
https://www.youtube.com/watch?v=mAeAQIybKnc&list=PLv7E5OqNAIPyRciXnWSBjVE4_zEvN4LdQ&index=2

軽量スライダーライブラリ Splide のレスポンシブ対応について解説！
https://www.youtube.com/watch?v=GWU6hiT8lPA
