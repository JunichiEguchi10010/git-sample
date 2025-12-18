四角形を使ったリッチなローディングアニメーション スニペット 20251218
（四角形4つが上下に波打つローディング）

✅ CSSアニメーションのみで構成
・animation-delay + animation-fill-mode: backwards
・alternate による往復アニメーション
・疑似要素 ::before を使った パルス表現
・cubic-bezier によるリッチな動き
・prefers-reduced-motion 対応
・ローディング非表示は JSの load イベントのみ


CSSアニメーション vs GSAP
― ローディング演出では「なぜCSSが良いのか」
結論を先に
観点	            CSS	        GSAP
ローディング演出	◎ 最適	    △ 不向き
初期表示の安定性	非常に高い	 低下しやすい
依存関係	        なし	    ライブラリ必須
チラつき	        起きにくい	起きやすい
運用・保守	        簡単	    複雑
複雑な制御	        △	       ◎ 得意

👉 ローディング・オープニング用途はCSS一択
👉 GSAPは「ユーザー操作後」に本領発揮

① ローディングは「最初に動く」ことが致命的に重要
CSSの場合
.box {
  animation: upDown 1s infinite;
}

HTML＋CSSが読まれた瞬間から動く
JSがまだ読み込まれていなくてもOK
画面が真っ白になる時間がない

GSAPの場合
gsap.to(".box", {
  y: 50,
  repeat: -1,
  yoyo: true
});

❌ 問題点
GSAP本体を ダウンロードしてから 実行
DOM取得 → 初期値設定 → アニメ開始
一瞬 「止まった状態」→動く が発生しやすい

👉 ローディングで「チラつく」のは最悪
👉 CSSは構造的にそれを回避できる

② 初期状態問題（FOUC / チラつき）
GSAPで起きがちな現象
<div class="box"></div>

gsap.fromTo(".box",
  { y: 0 },
  { y: 50, repeat: -1 }
);

JS実行前は y: 0 のまま表示
→ 一瞬「完成状態」が見える
→ その後アニメ開始
📌 これが FOUC（Flash of Unstyled Content）

CSSならどうなる？
.box {
  animation: upDown 1s infinite;
  animation-fill-mode: backwards;
}

初期状態から アニメーション前提
JS不要
構造的にチラつかない

👉 ローディングは
「制御」より「安定性」が最優先

③ パフォーマンスとコスト
CSSアニメーション
ブラウザ最適化対象
GPUアクセラレーション自動適用
JSスレッドを使わない

GSAP
requestAnimationFrame で制御
JSスレッド使用
ローディング中の CPU負荷増加

📌 特に
スマホ
低スペック端末
同時に他JSが動く環境
では CSSが圧倒的に安定

④ アクセシビリティ対応の差
CSS
@media (prefers-reduced-motion: reduce) {
  .box {
    animation: none;
  }
}

GSAP
自前で判定が必要
実装漏れが起きやすい
運用者依存

👉 企業サイト・公共系ではCSSが安全
⑤ 運用・保守（これが実務で効く）
CSSローディング
デザイナーでも触れる
色・速度・個数が即調整可
1ファイルで完結
GSAPローディング
JS理解必須
ロジックと見た目が混在

⑥ じゃあGSAPはいつ使う？

GSAPが強いのは👇
シーン	            理由
スクロール連動	    ScrollTrigger
複雑なシーケンス	timeline制御
ユーザー操作	    hover / click
状態遷移	       JS制御必須

👉 「表示後の演出」専用
実務用・判断フローチャート
これは最初に表示される？
   ├ YES → CSS
   └ NO
       ├ ユーザー操作？
       │    ├ YES → GSAP
       │    └ NO → CSS

一言まとめ（動画の思想）

ローディングは
「かっこよさ」より
「邪魔しないこと」が一番大事

だから
✔ 軽い
✔ 早い
✔ 安定
CSSアニメーションが最適解

四角形を使ったリッチなローディングアニメーションを実装してみましょう！
https://www.youtube.com/watch?v=CFGQFVMPH-M