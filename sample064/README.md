WordPress 代表的なテンプレートタグ一覧　20250510

🏠 基本情報系
タグ	                                        説明
bloginfo('name')	                        サイト名を取得
bloginfo('description')	                    サイトのキャッチフレーズ
bloginfo('url')	                            サイトのURL
home_url()	                                トップページのURLを取得
site_url()	                                WordPressのインストールURL
wp_title()	                                ページタイトルの取得（旧方式）
wp_head()	                                <head>タグ内に必要なコードを出力
wp_footer()	                                </body>の直前に必要なコードを出力

📄 テンプレート読み込み系
タグ	                                        説明
get_header()	                            header.php を読み込む
get_footer()	                            footer.php を読み込む
get_sidebar()	                            sidebar.php を読み込む
get_template_part()	                        テンプレートの部品を読み込む
locate_template()	                        テンプレートファイルを探して読み込む

🧭 メニュー・ナビゲーション系
タグ	                                        説明
wp_nav_menu()	                            管理画面で作成したナビメニューを表示
get_nav_menu_items()	                    メニュー項目の配列を取得（カスタム表示用）
wp_page_menu()	                            ページ一覧の簡易メニューを表示（メニュー未設定時）

📝 投稿・ページ系
タグ	                                        説明
have_posts()	                            投稿のループ開始条件
the_post()	                                投稿データをループ内でセット
the_title()	                                投稿のタイトルを表示
the_content()	                            本文を表示
the_excerpt()	                            抜粋を表示
the_permalink()	                            投稿のURLを取得
get_post()	                                投稿オブジェクトを取得
get_post_meta()	                            カスタムフィールドを取得

🖼️ メディア・画像系
タグ	                                        説明
has_post_thumbnail()	                    アイキャッチ画像の有無を判定
the_post_thumbnail()	                    アイキャッチ画像を表示
wp_get_attachment_image()	                画像IDから画像を表示
wp_get_attachment_url()	                    画像IDから画像URLを取得

🏷️ カテゴリ・タグ・タクソノミー系
タグ	                                        説明
the_category()	                            カテゴリを表示
get_the_category()	                        カテゴリの配列を取得
the_tags()	                                タグを表示
get_the_terms()	                            タクソノミーの用語を取得
get_the_term_list()	                        用語をリンク付きでリスト表示

🔄 条件分岐タグ系
タグ	                                        説明
is_home()	                                ブログトップかどうか
is_front_page()	                            サイトのフロントページか
is_page('slug')	                            指定の固定ページか
is_single()	                                投稿ページか
is_category()	                            カテゴリページか
is_tag()	                                タグページか
is_archive()	                            アーカイブページか
is_search()	                                検索結果ページか

🔢 ページング・ナビゲーション系
タグ	                                        説明
posts_nav_link()	                        前後の投稿リンク（旧）
previous_posts_link()	                    「前のページ」リンク
next_posts_link()	                        「次のページ」リンク
paginate_links()	                        ページ番号付きのナビゲーションを生成

👤 ユーザー関連
タグ	                                        説明
get_current_user_id()	                    現在のログインユーザーIDを取得
wp_get_current_user()	                    現在のユーザー情報を取得
get_author_posts_url()	                    著者アーカイブページのURLを取得
the_author()	                            著者名を表示

💬 コメント関連（企業サイトではあまり使わない）
タグ	                                        説明
comments_template()	                        コメントテンプレートを読み込む
comments_number()	                        コメント数を表示
comment_form()	                            コメントフォームを表示

🧰 その他便利系
タグ	                                        説明
get_search_form()	                        検索フォームを表示
dynamic_sidebar()	                        ウィジェットエリアを表示
wp_enqueue_script()	                        JavaScriptの読み込み登録
wp_enqueue_style()	                        CSSの読み込み登録


WordPress 公式ドキュメント
https://developer.wordpress.org/themes/basics/template-tags/
