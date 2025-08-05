CSSアニメーション 20250805

✅ UIの基本動作・フィードバック系
ホバー時のボタン拡大・色変更
例：transform: scale(1.05), background-colorのトランジション

フェードイン／フェードアウト（不透明度）
例：opacity: 0 → 1、transition: opacity

スライドイン（横・縦方向から出現）
例：transform: translateX()やtranslateY()を使用

ドロップダウンやアコーディオンの開閉
例：max-heightやscaleYのアニメーション

スケルトンローディング
例：backgroundのグラデーション＋animationでシャイン効果

スピナー（ローディングアイコン）
例：@keyframes rotateでの回転アニメーション

ツールチップ・ポップアップの表示アニメーション
例：scale + opacityの組み合わせ

✅ 視線誘導・演出系
スクロール連動のフェードイン（AOS風）
IntersectionObserver + opacityとtransformの組み合わせ

背景グラデーションのアニメーション
例：background-positionの変化 or @keyframesでカラー変化

ボーダーや線のアニメーション（ドローイング風）
例：border-width, stroke-dashoffset（SVG使用時）

カウントアップ・数値のアニメーション（JS連携）
CSSだけでは難しいが、表示のトリガーとして使用

文字の一文字ずつ表示（タイピング風）
animation-delayで遅延を順番に付ける

シャドウの変化で浮かせる効果
box-shadowのトランジション

✅ ページ全体・レイアウト演出
ローディング画面のフェードアウト
opacityやvisibilityの切り替え

メインビジュアル要素のゆっくり表示
@keyframes fadeInUp などで動きをつける

ヒーローセクションのテキストアニメーション
transform: translateY + opacity

セクション分けの仕切りに波・斜線アニメーション
SVGまたはclip-pathとアニメーション

✅ ナビゲーション系
ハンバーガーメニューの変形アニメーション
例：3本線 → ×印 に変形（rotate, translate）

メニュー開閉のスライドアニメーション
height や transform を使う

スクロールに応じてナビゲーションバーを隠す／出す
JavaScript連携でtop: -100px → 0など

✅ マイクロインタラクション
チェックボックス・トグルスイッチのアニメーション
擬似要素やtransformでスライド

「コピーしました」等のトースト通知
translateY + opacity の組み合わせ

SVGアイコンのアニメーション（例えばチェックマーク）
stroke-dasharray, stroke-dashoffset

ご希望であれば、上記それぞれのアニメーションに対応したスニペットテンプレートや**アニメーション集（HTML＋CSS）**も作成可能です。どのカテゴリを重点的にスニペット化したいか教えていただければ、対応します。