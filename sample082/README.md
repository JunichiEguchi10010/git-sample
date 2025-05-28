Easy Snippet スニペット 20250528

Visual Studio Code（VS Code）で スニペット（コードの定型文）を簡単に作成・管理できるツール です。
（Cursorも使える）

📌 主な特徴：
GUIベースで簡単にスニペットを作成
通常、VS Code のスニペットは JSON 形式で直接編集する必要がありますが、Easy Snippet を使えば、フォーム形式で入力するだけで作成できます。

複雑な構文が不要
$1, $2 などのプレースホルダーも、分かりやすく入力できます。

リアルタイムプレビュー
実際に挿入されるスニペットのコードが即時表示されるため、確認しながら編集できます。

既存のスニペットも管理可能
作成済みのスニペットも GUI 上で編集・削除ができます。

🎯 どういう人に向いている？
「JSON ファイルの手動編集がわずらわしい…」
「自分用の HTML/CSS/JS テンプレを効率的に使いたい」
「チームや社内でよく使うコードの共通スニペットを管理したい」

🛠 使い方（基本的な流れ）
VS Code の拡張機能から「Easy Snippet」をインストール。
コマンドパレット（Ctrl + Shift + P）で Easy Snippet: Open を実行。
GUI 上で以下の情報を入力：

名前（スニペットのタイトル）
トリガー文字（prefix）
挿入するコード（body）
説明（任意）
「保存」すると、自動的に snippets に登録される。


✅Snippet Manager と Snippet Scope Manager

Snippet Manager
スニペットの作成・管理をするためのツールです。
言語ごとにスニペットを整理できるので、管理がしやすくなります。
例えば、JavaScript用のスニペットとPython用のスニペットを分けて保存できます。

Snippet Scope Manager
スニペットの適用範囲（スコープ）を管理する機能です。
スニペットを特定の言語やグローバル（全言語）で使用できるように設定できます。
例えば、JavaScriptとTypeScriptの両方で使えるスニペットを作成する場合、スコープを "javascript,typescript" に設定できます。

"scope": "javascript" → JavaScriptファイルでのみ有効
"scope": "python" → Pythonファイルでのみ有効
"scope": "global" → すべての言語で有効

使い分けのポイント
頻繁に使うコードを登録・管理 → Snippet Manager
スニペットの適用範囲を設定 → Snippet Scope Manager


✅VS Code（Cursor） の標準機能だけでスニペットを直接記述する方法

🔧 1. ユーザースニペットの編集を開く
手順:
Ctrl + Shift + P を押してコマンドパレットを開く
「Preferences: Configure User Snippets（ユーザースニペットの設定）」を選択

対象の言語（例：html や javascript など）を選ぶ
　※または New Global Snippets file を選んで、全言語共通のファイルを作ってもOK

✍️ 2. JSON形式でスニペットを記述
例：HTML用の「テーブル」スニペット
json
{
  "My Table Snippet": {
    "prefix": "table",
    "body": [
      "<table>",
      "  <thead>",
      "    <tr>",
      "      <th>$1</th>",
      "      <th>$2</th>",
      "    </tr>",
      "  </thead>",
      "  <tbody>",
      "    <tr>",
      "      <td>$3</td>",
      "      <td>$4</td>",
      "    </tr>",
      "  </tbody>",
      "</table>"
    ],
    "description": "HTML table template"
  }
}
🧠 補足情報
キー	            説明
prefix	        呼び出しトリガーになる文字列（例：table）
body	        実際に挿入されるコード。配列で記述（1行ごとに文字列）
description	    サジェストに表示される説明（任意）
$1, $2	        プレースホルダー（タブキーで順にジャンプできる）

📁 保存先のパス
スニペットは以下のような場所に保存されます：
ユーザースニペット：
C:/Users/<ユーザー名>/AppData/Roaming/Code/User/snippets/

ワークスペース固有：
./.vscode/html.code-snippets のようなプロジェクト内ファイル


✅スニペットの文字を入力してもサジェストが出てこず、スニペットが使えない問題が発生

🟨スニペットが正しく登録されているか確認する方法(パスの確認)

1. スニペットの設定を開く
Ctrl + Shift + P を押して、コマンドパレットを開きます。
そこから "Preferences: Configure User Snippets" を検索して選択してください。
(ユーザースニペットの設定)

2. html.code-snippets ファイルを探す
検索画面で html.code-snippets を探し、正しく登録されているか確認します。
⭕ ファイルが表示されていればOK → 設定が認識されています｡
❌ 表示されない場合 → スニペットのパスが正しく設定されているかをチェックする。

✅✅✅標準のスニペット保存場(settings.json)✅✅✅
Ctrl + Shift + P (VS Codeのコマンドパレットを開くショートカットキー) → settings.jsonsを確認する。
C:/Users/xxユーザー名：eguchijunichixxx/AppData/Roaming/Code/User/snippets/
"easySnippet.snippetsPath": "C:/Users/eguchijunichi/AppData/Roaming/Code/User/snippets/",

✅ easySnippet.snippetsPath は、Easy Snippet拡張機能の設定キーとして使われる。


問題の原因：
EasySnippetのスニペットとワークスペースのスニペットが同じ場所（.vscode/html.code-snippets）を参照していた。
同じtableというプレフィックスを持つスニペットが2つ存在していた。
スニペットの優先順位が明確でなかった。

最初の対応：
snippets.priorityを設定して優先順位を調整しようとした。
一時的な解決策として機能したが、根本的な解決にはならなかった。

根本的な解決：
EasySnippetのスニペット保存場所を標準のユーザースニペットの場所に変更。

"easySnippet.snippetsPath": "C:/Users/eguchijunichi/AppData/Roaming/Code/User/snippets/"

これにより、スニペットの保存場所が分離され、競合が解消された。

最終的な結果：
問題なく動作したことを確認できた。

学んだ教訓：
スニペットの管理は場所を分けることが重要
同じプレフィックスを持つスニペットは競合の原因になる
設定の優先順位よりも、適切な場所の分離が重要
この経験から、スニペットの管理は「場所の分離」と「明確な命名規則」が重要であることがわかりました。

Easy Snippet（公式）
https://marketplace.visualstudio.com/items?itemName=inu1255.easy-snippet

【初心者向け】VSCodeのEasy Snippet使い方【スニペット】
https://arcuss-service.com/knowledge/vscode-easy-snippet.html

スニペットの書き方
https://qiita.com/takamasakiyoshi/items/70d03f652ca626da71d7

VSCodeでのスニペットのスコープについて
https://zenn.dev/melon1891/articles/snippet_type
