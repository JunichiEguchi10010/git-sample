 使用中ポートの強制終方法 プロセス番号（PID）20250921

✅ キャッシュクリアを試してみる next.jsの場合
Remove-Item -Recurse -Force .next

✅ 主な流れ
タスクマネージャー単体では「PIDまで」しか分からない
netstatで「ポート番号 → PID」を調べる
tasklistで「PID → プロセス名」を調べる


1. Windowsの場合
プロセス番号（PID）を確認する方法
タスクマネージャーから確認
Ctrl + Shift + Esc でタスクマネージャーを開く
「詳細」タブで PID 列を表示（表示されていなければ右クリック → 列の選択 → PID にチェック）
node.exe や npm などを探すと、開発サーバーが使っている PID がわかります

🟥 コマンドラインでプロセス番号（PID）を確認する方法
コマンドプロンプトまたは PowerShell で次のコマンドを実行
netstat -ano | findstr :3000

:3000 はポート番号
出力例:
TCP    0.0.0.0:3000      0.0.0.0:0       LISTENING       41368
最後の列が PID（この場合 41368）

🟥 プロセスを強制終了する方法
コマンドラインから
taskkill /PID 41368 /F
/F は強制終了の意味
終了するとポート3000が解放されます
→ npm run dev で再起動

2. Mac / Linuxの場合
プロセス番号（PID）を確認する方法
ターミナルで次のコマンドを実行
lsof -i :3000

出力例:
COMMAND   PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
node      41368 user   23u  IPv4 123456      0t0  TCP *:3000 (LISTEN)

PID 列がプロセス番号です
プロセスを強制終了する方法
kill -9 41368
-9 は強制終了（SIGKILL）
終了後、ポート3000が空くので開発サーバーを再起動可能

💡 ポイント
開発中に yarn dev や npm run dev が落ちていないと、ポートが残って 404 以外のエラーの原因になることがあります。
Windowsなら taskkill /PID <PID> /F、Mac/Linuxなら kill -9 <PID> が基本操作です。




❓ ポートが「今どのプロセスに使われているか」を調べる方法
OSごとにコマンドが違います。

🔎 Windows の場合
1. 特定のポートが使われているか確認
netstat -ano | findstr :3000
:3000 の部分を調べたいポートに変える（例: :3001）

出力例：
TCP    0.0.0.0:3000     0.0.0.0:0    LISTENING    41368
→ 最後の数字 41368 がプロセスID（PID）

2. そのプロセスが何かを調べる
tasklist /FI "PID eq 41368"

🔎 Mac / Linux の場合
1. 特定のポートが使われているか確認
lsof -i :3000
出力例：
COMMAND   PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
node    41368 user   23u  IPv4 123456      0t0  TCP *:3000 (LISTEN)

→ PID 列にプロセス番号が表示される
2. もっと簡単に確認（Linux限定）
ss -ltnp | grep 3000

✅ まとめ
Windows → netstat -ano | findstr :ポート番号
Mac/Linux → lsof -i :ポート番号
で「どのプロセスがポートを使っているか」調べられる
そのあと不要なら taskkill (Windows) や kill (Mac/Linux) で終了できます。


✅ タスクマネージャーでPIDを見ても「どのポートを使っているか」は分かりません。
タスクマネージャーは「どのアプリが動いているか」や「そのPID」までは見せてくれますが、ポート番号までは表示しないんです。

🔎 じゃあどうやって「PID ⇔ ポート番号」を結びつけるか？
方法1: netstat を使う（Windows標準）
netstat -ano | findstr :3000

出力例
TCP    0.0.0.0:3000    0.0.0.0:0    LISTENING    12345

→ 最後の 12345 がPID
→ そのPIDをタスクマネージャーで探せば「どのプロセスか」が分かる

方法2: tasklist を使う（組み合わせ技）
PIDが分かっていれば、対応するプロセス名を調べられます：
tasklist /FI "PID eq 12345"

出力例：
イメージ名                     PID セッション名 セッション# メモリ使用
========================= ======== =========== ========== ============
node.exe                    12345 Console       1        150,000 K

→ つまり「3000番ポートを使っていたのは node.exe」だと分かる


🟩 プロセス番号（PID: Process ID）とは？

🖥 プロセスとは？
プロセス = 実行中のプログラムのこと
例: Chromeを開けば「chrome.exe」というプロセスが動く
例: Next.jsの開発サーバーを立ち上げると「node.exe」が動く
1つのアプリでも複数のプロセスを作ることがあります（Chromeはタブごとに別プロセスなど）。

🔢 PID（Process ID）とは？
OSが 動いているプロセスを区別するために付ける番号
一意（同じ時刻に同じPIDは存在しない）
プロセスを管理したり終了させたりするときに使う

イメージすると：
学校で生徒1人ひとりに 出席番号 が付いているようなもの
OSにとっては「プログラム名」よりも PID番号のほうが確実な識別子

✅ PIDの使われ方
タスクマネージャー にも「PID列」がある
netstat でポートの使用状況を見るとPIDが出る
taskkill コマンドで終了するときはPIDを指定する

例（Windowsの場合）：
netstat -ano | findstr :3000
→ LISTENING 41368 と出たら「ポート3000を使っているのはPID 41368」

tasklist /FI "PID eq 41368"
→ PID 41368 が node.exe だと分かる

taskkill /PID 41368 /F
→ そのプロセスを終了

📝 まとめ
プロセス = 実行中のプログラム
PID = プロセスごとに割り当てられる識別番号（出席番号みたいなもの）
ポート使用調査やプロセス強制終了のときに重要