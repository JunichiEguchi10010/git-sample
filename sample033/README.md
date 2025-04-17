 WordPress デフォルトテーブル一覧（主なカラム付き） 20250417

テーブル名	                             割・概要	                                             主なカラム名（代表）
wp_posts	           投稿・固定ページ・カスタム投稿タイプなど全ての「コンテンツ」を管理	ID, post_author, post_date, post_content, post_title, post_status, 
post_type, post_name
wp_postmeta	           投稿に紐づくカスタムフィールドなどの追加情報	                       meta_id, post_id, meta_key, meta_value
wp_users	           ユーザー情報（ログインID・パスワードなど）	                       ID, user_login, user_pass, user_email, display_name
wp_usermeta	           ユーザーに紐づく追加情報（権限・プロファイル設定など）	            umeta_id, user_id, meta_key, meta_value
wp_terms	           カテゴリ・タグなど「名前」の管理                                   term_id, name, slug, term_group
wp_term_taxonomy	   タクソノミーの種類（カテゴリ・タグ・カスタム分類など）の管理	         term_taxonomy_id, term_id, taxonomy, description, parent, count
wp_term_relationships  投稿とタクソノミーの「ひもづけ」管理	                               object_id, term_taxonomy_id
wp_options	           サイト全体の設定情報（テーマ・プラグイン・URL など）                 option_id, option_name, option_value, autoload
wp_comments	           投稿へのコメント本文や著者情報の保存                                comment_ID, comment_post_ID, comment_author, comment_content, comment_approved
wp_commentmeta	       コメントに付随するメタ情報（通知フラグなど）                         meta_id, comment_id, meta_key, meta_value
wp_links	           相互リンク機能（非推奨）	                                          link_id, link_url, link_name, link_description, link_visible
wp_actionscheduler_*   スケジュールされた処理（WooCommerce系プラグインなどが追加）	        action_id, hook, status, scheduled_date_gmt（※プラグイン依存。標準WordPressにはなし）


🔍 よく使う具体例
例：ブログ記事「タイトル」と「本文」を取得したい
    使うテーブル：wp_posts

    カラム：post_title, post_content, post_type='post'

例：投稿に設定されたカスタムフィールド（例：価格）
    使うテーブル：wp_postmeta

    カラム：post_id, meta_key='price', meta_value

例：投稿とカテゴリの関連を取得したい
    wp_term_relationships（object_id） → wp_term_taxonomy（taxonomy='category'） → wp_terms（name）