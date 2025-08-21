SCSS スニペット ショートカット一覧表 20250821

| Prefix         | 用途 / 内容             | コメント                           |
|----------------|--------------------------|------------------------------------|
| **bgi**        | 背景画像                 | `background-image`                 |
| **bg**         | 背景 shorthand           | `background`                       |
| **bgc**        | 背景色                   | `background-color`                 |
| **bgp**        | 背景位置                 | `background-position`              |
| **bgr**        | 背景繰り返し             | `background-repeat`                |
| **bgs**        | 背景サイズ               | cover / contain                    |
| **fw**         | フォント太さ             | `font-weight`                      |
| **fz**         | フォントサイズ           | `font-size`                        |
| **lh**         | 行の高さ                 | `line-height`                      |
| **ls**         | 文字間隔                 | `letter-spacing`                   |
| **tdn**        | テキスト装飾なし         | `text-decoration: none`            |
| **tac**        | テキスト中央寄せ         | `text-align: center`               |
| **font**       | フォント一括指定         | family, size, weight, lh           |
| **clamp**      | 可変フォントサイズ       | `clamp()` 指定                     |
| **px/rem/vw**  | 単位変換                 | px → rem / vw 変換                 |
| **vw-sp**      | SP用 vw変換              | px → vw (スマホ基準)               |
| **mt/mr/mb/ml**| margin 上下左右          | `margin-top` など                  |
| **pt/pr/pb/pl**| padding 上下左右         | `padding-top` など                 |
| **w / h**      | 幅・高さ                 | `width`, `height`                  |
| **mw / mh**    | 最大幅・最大高さ         | `max-width`, `max-height`          |
| **br**         | 角丸                     | `border-radius`                    |
| **bs**         | 影                       | `box-shadow`                       |
| **border**     | ボーダー一括指定         | `border: width style color`        |
| **bt/br/bb/bl**| 上右下左ボーダー         | `border-top` など                  |
| **grid**       | Grid 位置指定            | `grid-column`, `grid-row`          |
| **grid-cont**  | Gridコンテナ             | `display: grid`                    |
| **grid-item**  | Gridアイテム             | 各セルの配置                       |
| **flex-cont**  | Flexコンテナ             | `display: flex` 基本設定           |
| **flex-item**  | Flexアイテム             | 個別 `flex` 調整                   |
| **ps**         | 絶対配置                 | `position: absolute`               |
| **pf**         | 固定配置                 | `position: fixed`                  |
| **pr**         | 相対配置                 | `position: relative`               |
| **st**         | sticky 配置              | `position: sticky`                 |
| **before**     | 擬似要素 ::before        | コンテンツ前に要素を追加           |
| **after**      | 擬似要素 ::after         | コンテンツ後に要素を追加           |
| **hover**      | hover 時のスタイル       | ホバー時の装飾                     |
| **focus**      | focus 時のスタイル       | フォーカス時の装飾                 |
| **nth**        | n番目の要素              | `:nth-child(n)`                    |
| **first/last** | 最初/最後の要素          | `:first-child`, `:last-child`      |
| **c-main**     | メインカラー             | プロジェクト基準色                 |
| **c-sub**      | サブカラー               | 補助色                             |
| **c-accent**   | アクセントカラー         | 強調色                             |
| **c-bg**       | 背景色                   | 全体やセクション背景               |
| **c-text**     | テキストカラー           | 文字色                             |
| **img-fit**    | 画像フィット             | `object-fit`                       |
| **img-wrap**   | 画像ラッパー             | アスペクト比維持                   |
| **img-center** | 画像中央寄せ             | `margin: auto` + `display: block`  |
| **img-bg**     | 背景画像指定             | wrapperで cover 指定               |
| **tx / ty**    | 変形 (translate)         | `transform: translate`             |
| **txy**        | X/Y 変形                 | `translate(x,y)`                   |
| **tr**         | 回転                     | `transform: rotate`                |
| **transition** | 遷移                     | `transition: all`                  |
| **animation**  | アニメーション雛形       | keyframes 含む雛形                 |
| **fadeIn**     | フェードイン             | opacity を 0→1                     |
| **fadeUp**     | 下からフェードイン       | `translateY` + opacity             |
| **fadeDown**   | 上からフェードイン       | `translateY(-)` + opacity          |
| **fadeLeft**   | 左からフェードイン       | `translateX(-)` + opacity          |
| **fadeRight**  | 右からフェードイン       | `translateX(+)` + opacity          |
| **slideIn**    | 横方向スライドイン       | 移動アニメーション                  |
| **zoomIn**     | 拡大しながら表示         | `scale` 0→1                        |
| **rotateIn**   | 回転しながら表示         | `rotate` 0→360度                   |
| **swiper**     | Swiper 用 CSS            | ページネーションやボタン設定       |
| **center**     | Flex 中央寄せ            | `justify-content + align-items`    |
| **truncate**   | テキスト省略 (…)         | `white-space: nowrap` 等           |
| **hide-scroll**| スクロールバー非表示     | 各ブラウザ対応                     |
| **tel**        | PCで tel 無効化          | `pointer-events: none`             |
| **u**          | @use                     | SCSS ファイル読み込み              |
| **e**          | @extend                  | クラス継承                         |
| **i**          | @include                 | mixin 呼び出し                     |
| **global1-3**  | グローバル読み込み       | 相対パス違いで3種類                |
| **mq**         | メディアクエリ           | @media 雛形                        |
| **sp**         | スマホ用                 | max-width: 767px                   |
| **pc**         | PC 用                    | min-width: 768px                   |
| **tab**        | タブレット用             | 768–1023px                         |
| **read-grade** | グラデーション解説       | linear, radial, text-clip          |
| **read-anim**  | アニメーション解説       | duration, delay, easing            |
