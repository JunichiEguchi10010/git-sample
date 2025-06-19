WebDesign javascript フェードイン系（Fade In）202250619

✅ 1. フェードイン系（Fade In）
アニメーション	                内容	                                使用例
上下からのフェードイン	下→上、または上→下にフェードイン	        セクションの見出し、会社紹介文
左右からのフェードイン	左→右 or 右→左にフェードしながらスライド	スタッフ紹介、サービス説明など
ズームフェードイン	    拡大 or 縮小しながらフェードイン           商品のビジュアル、ロゴ


✅フェードイン系アニメーション（上下／左右／ズームフェードイン）」はIntersectionObserver APIで実装する。

🔁 技術構成と考え方
項目	                内容
観測方法	            IntersectionObserver API
アニメーションの種類	 CSSで定義（上下 / 左右 / ズーム）
トリガー方法	        JSでis-visibleクラスを追加し、CSSでアニメ適用
対象要素	            .fade-up, .fade-left, .zoom-in などのクラスで判別

✅ 疑似コード（フローイメージ）
1. 対象要素を選択する（.fade-up など）
2. IntersectionObserver を定義する
    └ 閾値やrootMarginなどでタイミング調整
3. 要素が見えたらクラス is-visible を付与
4. CSS側で .fade-up.is-visible にアニメーションを設定


✅ この構成の利点（実務対応ポイント）
        項目	                            内容
✅ HTMLに方向を記述するだけ	        data-direction="zoom-in" のように直感的に制御可能
✅ JSが自動で .fade-up などを付与	HTML側はプレーンな <div> だけでもOK
✅ 再利用しやすい	                section数が増えても柔軟に対応可
✅ メンテナンス性が高い	            CSSとJSの責務が分かれている