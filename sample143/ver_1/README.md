CSSアニメーション UIの基本動作・フィードバック系 20250805

✅構成内容と説明
機能	                    説明	                            技術構成
ホバーボタン	        ボタンにマウスを乗せると拡大＋色変更	transform, background-color, transition
フェードイン	        ページ表示時に徐々に透明度が上がる	    @keyframes, opacity
スライドイン	        左からスライドして表示される	        transform: translateX, opacity, @keyframes
アコーディオン	        ボタンクリックで開閉	                max-height, transition, JS toggle
スケルトンローディング	 グラデーションが流れる読み込み中表現	  linear-gradient, @keyframes
スピナー	            回転するローディングアイコン	        border, @keyframes rotate
ポップアップ	        スケール＋フェードで表示・非表示	     scale, opacity, transition, JS toggle