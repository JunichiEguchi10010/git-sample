Cursorのスニペット登録方法

Ctrl + Shift + P」（またはMacなら Cmd + Shift + P）を押してコマンドパレットを開く
「Configure User Snippets」 または **「ユーザースニペットの構成」**と入力し、選択する
スニペットを追加したい言語（例：javascript.json や html.json）を選択
スニペットをJSON形式で記述

スニペットの例
例えば、javascript.json に以下のように記述すると、log と入力して Tab を押すだけで console.log() が補完されるようになります。
{
  "Print to console": {
    "prefix": "log",
    "body": ["console.log('$1');", "$2"],
    "description": "Console log shortcut"
  }
}

https://www.youtube.com/watch?v=GDXsuwsyaBU

20250327作成
ファイルの拡張子を.mdに変更する方法:

1. Visual Studio Code (Cursor) での変更方法:
   - ファイルを開いた状態で
   - 画面左下のステータスバーに表示されている言語モード（Plain Text）をクリック
   - 上部に表示される言語選択で「Markdown」を選択
   - ファイルを保存する際に、.mdの拡張子で保存

2. または、直接ファイル名を変更:
   - Cursorのエクスプローラーペインでファイルを右クリック
   - 「名前を変更」（Rename）を選択
   - 拡張子を.txtから.mdに変更
   - Enterキーを押して確定

GitHubでの表示について:
- .txtファイルのままでもGitHubでは内容は表示されますが、マークダウンの整形（見出しや箇条書きなど）は適用されません
- .mdに変更することで、マークダウンとして正しく整形されて表示されます



