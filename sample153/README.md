 Vite + Tailwind CSS v3 + PostCSS 「ヘッダー / メイン / フッター」をそれぞれモジュール化 スニペット 20250819

✅ 環境構築ステップの確認と補足
ステップ	                    内容	                                                             補足
① npm create vite@latest	Viteプロジェクトの初期化	                                    テンプレート選択（例：vanilla）後、自動でディレクトリが作成されます
② cd demo-sample-app-ver2	作成したプロジェクトに移動	                                       OK
③ npm install	            依存パッケージのインストール	                                 package.json が生成され、node_modules が作成されます
④ npm install -D            tailwindcss postcss autoprefixer	                          Tailwind + PostCSS の導入	-D は開発用依存としてインストールする指定です
④-2 npx tailwindcss init -p	設定ファイルの生成	                                            tailwind.config.js と postcss.config.js が同時に生成されます
④-3 npm uninstall           tailwindcss && npm install -D tailwindcss@3.3.3	v4 → v3 に変更	v3系の安定バージョンに戻す操作。必要に応じてバージョン番号は調整可能
⑤ src/index.css に Tailwind のディレクティブを記述	@tailwind base; など	                  CSSが正しくビルドされるために必須です
⑥ npm run dev	開発サーバー起動	Viteがローカルサーバーを立ち上げ、ブラウザで確認できます

vite.config.jsを手動で作成


✅ ファイル構成
demo-sample-app-ver2/
├── node_modules/               # npmでインストールされた依存パッケージ
├── public/                     # 静的ファイル（画像やfaviconなど）
│   └── favicon.ico
├── src/                        # アプリケーションのソースコード
│   ├── main.js                 # エントリーポイント（JS）
│   ├── index.css               # TailwindのCSSを読み込むファイル
│   └── components/             # コンポーネント（任意）
│       └── Header.js
├── index.html                  # HTMLテンプレート（Viteが読み込む）
├── tailwind.config.js          # Tailwindの設定ファイル
├── postcss.config.js           # PostCSSの設定ファイル
├── vite.config.js              # Viteの設定ファイル
├── package.json                # npmの設定ファイル
└── README.md                   # プロジェクトの説明（任意）

✅ 実務的ポイント
ヘッダー / フッターを分離：複数ページで再利用できる
カードを別モジュールに分ける：後で API データに差し替え可能
main.js が司令塔：アプリ全体を組み立てる責務だけに集中

✅ 出来上がり
ヘッダー：ロゴ + ナビ（レスポンシブ対応）
ヒーローセクション：キャッチコピー + CTA ボタン
サービスカード：3列のグリッド（モバイルでは1列）
フッター：シンプルな著作権表記

✅ これで動作する流れ
npm install aos でライブラリ導入
main.js で import "aos/dist/aos.css" & AOS.init()
各要素に data-aos 属性をつけるだけでアニメーション