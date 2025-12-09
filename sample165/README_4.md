github 実務手順 20251210

git branch → ローカルリポジトリだけ検索 → *居場所

git branch -a → ポジトリとリモートリポジトリも全て検索

git diff → 未ステージングの変更を確認

git diff --staged → ステージング済みの変更と最新コミットとの差分を確認

git status → 変更の有無を一覧で確認

git log → コミット履歴を一覧で表示するコマンド（OP多数）


git commit → - ローカルリポジトリに履歴を作る操作

git commit -m "メッセージ" → ステージされた変更をコミット

git commit -am "メッセージ" → まだ add していない変更もまとめてコミット

[作業ツリー] --add--> [ステージ] --commit--> [ローカル履歴]
                                              |
                                              | push
                                              v
                                        [リモート履歴]

git push → ローカルで作ったコミットをリモートに反映する（OP多数）





 作業終わりに保存

git add ファイル名 → 変更をステージング

git commit -m "作業内容の説明" → ローカルリポジトリに保存


 翌日作業を始める前に最新化

git pull origin main → リモートの最新の main を取り込む


origin/main を作業中でコミットが先行している場合に、変更を取り込むコマンド
　

とりあえずローカルの変更を退避（stash）して pull

今の変更をまだコミットしたくない場合

git stash push -m "temp local changes"
git pull origin main
git stash pop
（１行づつ実施）

stash pop でコンフリクトする可能性あり。



################################################################################################################################################################################################################################################################



## ブランチの有無の確認方法

>ローカルリポジトリだけ検索

git branch


>>ローカルリポジトリとリモートリポジトリも全て検索
git branch -a


*がついているところが現在作業しているところ



## 最新のmainブランチを取り込む


```
(main) $ git fetch origin
(main) $ git merge origin/main
```

これでローカルのmainブランチが最新になる


## 最新のmainブランチをローカルのstagingブランチを取り込む
```
(main) $ git checkout staging
(staging) $ git merge main
```


## 最新のstagingブランチを取り込む
```
(staging) $ git fetch origin
(staging) $ git merge origin/staging
```


## 新しいブランチを作成して作業する （stagingブランチからブランチ作成）
```
(staging) $ git checkout -b update/branch-name
(update/branch-name) $ 
```


## 自分のブランチで作業途中にローカルのstagingブランチを最新にして、自分のブランチにも最新のstagingブランチを反映する
```
(my-branch) $ git stash
(my-branch) $ git checkout staging
(staging) $ git fetch origin
(staging) $ git merge origin/staging
(staging) $ git checkout my-branch
(my-branch) $ git merge staging
(my-branch) $ git stash pop
```

「ローカル main を最新化しない方法」（こちらが例外）
短期間の作業で、main に更新が入っていないと分かっているとき → 例えば「昨日 pull したばかりで、誰も main に push していない」状況なら、再度最新化する必要はない

staging が直接リモートから最新化される運用の場合 → チームによっては「main は本番用、staging がテスト用で常に最新化される」ので、作業ブランチは staging だけを追従すれば十分なこともある

main を直接使わず、常に staging を経由する開発フロー → この場合は「main を最新化する」より「staging を最新化する」ことが優先される



## 自分のブランチで作業途中にローカルのmainブランチを最新にして、ローカルのstagingブランチにも最新のmainブランチを取り込む。

その後ローカルのstagingにmainを取り込んで自分のブランチにも最新のstagingブランチを反映する

※前項との違いは「ローカル main を最新化するかどうか」で、こちらはローカル main を最新化する方法で一般的で安全。
```
(my-branch) $ git stash
(my-branch) $ git checkout main
(main) $ git fetch origin
(main) $ git merge origin/main
(main) $ git checkout staging
(staging) $ git merge main
(staging) $ git checkout my-branch
(my-branch) $ git merge staging
(my-branch) $ git stash pop
```




################################################################################################################################################################################################################################################################


## 用語整理
ブランチ = 作業ノート

checkout = どのノートを開くか選ぶ

push = 自分のノートをチームの本棚（リモート）に置く

fetch = チームの本棚から最新のノートを持ってくる（まだ自分のノートには書き込まない）

merge = 持ってきたノートの内容を自分のノートに書き足す

pull = fetch + merge を一気にやるショートカット


## よくある使い方
新しい作業を始める前に：

bash
git pull origin main

→ 最新の main をローカルに取り込んでからブランチを切る

作業が終わったら：

bash
git push origin my-feature-branch

→ 自分の作業ブランチをリモートにアップロードして、PRを作る







## 最新のmainブランチを取り込む


```
(main) $ git fetch origin
(main) $ git merge origin/main
```
もしくは
●git pull origin main


git fetch origin → git merge origin/main

2ステップで「リモートの最新情報を取得」してから「ローカル main に統合」する方法

より明示的で、途中で差分を確認したいときに便利


## git pull origin main


上記の fetch + merge をまとめて1回でやってくれるショートカット

普段の更新作業ではこちらを使うことが多い


これでローカルのmainブランチが最新になる




## 最新のmainブランチをローカルのstagingブランチを取り込む
```
(main) $ git checkout staging
(staging) $ git merge main
```


## 最新のstagingブランチを取り込む
```
(staging) $ git fetch origin
(staging) $ git merge origin/staging
```


## 新しいブランチを作成して作業する （stagingブランチからブランチ作成）
```
(staging) $ git checkout -b update/branch-name
(update/branch-name) $ 
```


## 自分のブランチで作業途中にローカルのstagingブランチを最新にして、自分のブランチにも最新のstagingブランチを反映する
```
(my-branch) $ git stash
(my-branch) $ git checkout staging
(staging) $ git fetch origin
(staging) $ git merge origin/staging
(staging) $ git checkout my-branch
(my-branch) $ git merge staging
(my-branch) $ git stash pop
```



## 自分のブランチで作業途中にローカルのmainブランチを最新にして、ローカルのstagingブランチにも最新のmainブランチを取り込む。その後ローカルのstagingにmainを取り込んで自分のブランチにも最新のstagingブランチを反映する
```
(my-branch) $ git stash
(my-branch) $ git checkout main
(main) $ git fetch origin
(main) $ git merge origin/main
(main) $ git checkout staging
(staging) $ git merge main
(staging) $ git checkout my-branch
(my-branch) $ git merge staging
(my-branch) $ git stash pop
```



 一## 日の作業の流れ（典型例）
作業中

ファイルを編集する
 変更を確認する（git status や git diff）


git diff → 未ステージングの変更を確認

git diff --staged → ステージング済みの変更と最新コミットとの差分を確認

git status → 変更の有無を一覧で確認



作業終わりに保存

git add ファイル名 → 変更をステージング

git commit -m "作業内容の説明" → ローカルリポジトリに保存

 これで「今日の作業履歴」がローカルに残ります。


翌日作業を始める前に最新化

git pull origin main → リモートの最新の main を取り込む

差異があれば確認して、必要なら自分の作業ブランチに反映

 これで「チームの最新状態」から作業を始められます。


 ポイント
commit はローカルの履歴に保存するだけ → チームにはまだ共有されない

push するとリモートに共有される → 他の人が見られるようになる

pull するとリモートの最新を取り込む → チームの進捗に追従できる


 まとめ
あなたの理解通り、

一日の終わりに add → commit でローカル保存

翌日始める前に git pull origin main で最新化 という流れは チーム開発での基本的な習慣です。



## 「リモートの main を最新化したあと、その差分を自分の作業ブランチに反映する」にはいくつか方法があります。
代表的なのは merge と rebase です。

 方法1: merge で取り込む
ローカルの main を最新化

bash
git checkout main
git pull origin main
作業ブランチに切り替えて main を取り込む

bash
git checkout update/ui-customers
git merge main
 この方法は「mainの変更をそのまま合流」させるので安全。履歴に「マージコミット」が残ります。

 方法2: rebase で取り込む
ローカルの main を最新化

bash
git checkout main
git pull origin main
作業ブランチに切り替えて main の上に付け替える

bash
git checkout update/ui-customers
git rebase main
 この方法は「自分の作業を最新の main の後ろに並び替える」ので履歴がきれいになります。ただしコンフリクトが出たら解決してから git rebase --continue が必要。

 まとめ
merge → 安全で履歴をそのまま残す。チーム開発でよく使う。

rebase → 履歴がきれいになる。個人作業や PR 前に整理すると便利。




## 「rebase と merge の違い」
 merge の特徴
動作: 2つのブランチをそのまま合流させる

結果: 「マージコミット」という特別なコミットが追加される

メリット: 履歴を壊さない、安全。どのブランチから統合したかが明確に残る

デメリット: マージコミットが増えて履歴が複雑になることもある

よく使う場面: チーム開発での Pull Request 統合（GitHub の「Merge pull request」）

 rebase の特徴
動作: 自分のブランチのコミットを「最新の main の後ろに付け替える」

結果: 履歴が一直線になり、見やすくなる

メリット: 履歴がきれいでシンプルになる

デメリット: 履歴を書き換えるため、共有ブランチで使うとトラブルの原因になる

よく使う場面: 個人開発や、まだ他人に共有していないブランチを整理するとき

 図でイメージ
merge の場合:

コード
main:    A --- B --- C
feature:       └── D --- E
結果:    A --- B --- C
                └── D --- E --- M
→ M が「マージコミット」

rebase の場合:

コード
main:    A --- B --- C
feature:       └── D --- E
結果:    A --- B --- C --- D' --- E'
→ D, E が付け替えられて直線的になる

 まとめ
merge: 安全で履歴をそのまま残す → チーム開発でよく使う

rebase: 履歴をきれいに整理する → 個人作業や未共有ブランチで便利


## コンフリクトが起きる例
main ブランチ

js
console.log("Hello World");
feature ブランチ

js
console.log("こんにちは世界");
→ 同じ行を別々に変更しているため、マージ時に「どっちを残す？」とGitが判断できずコンフリクトになる。

 コンフリクト解決の流れ
マージやリベースを実行 → コンフリクトがあると Git が止まり、対象ファイルに特別な記号が挿入される

例:

js
<<<<<<< HEAD
console.log("Hello World");
=======
console.log("こんにちは世界");
>>>>>>> feature
手動で修正する

<<<<<<< HEAD と >>>>>>> feature の間が競合部分

どちらを残すか、あるいは両方を組み合わせるかを決めて編集する

例（両方残す場合）:

js
console.log("Hello World");
console.log("こんにちは世界");
修正後にステージング

bash
git add ファイル名
マージやリベースを完了させる

マージの場合:

bash
git commit
リベースの場合:

bash
git rebase --continue
 ポイント
コンフリクトは「エラー」ではなく「要相談」 → Gitが「どっちを採用すべきかわからないから人間に決めてほしい」と言っている状態

解決方法は状況次第

片方だけ残す

両方を組み合わせる

新しいコードに書き直す

 まとめ
コンフリクトは「同じ部分を複数ブランチで違う変更をした」時に発生

Gitが自動で判断できないので、開発者が手動で修正する

修正後に git add → git commit または git rebase --continue で完了



## ステージングとは？
Git には 3つの領域があります：

作業ディレクトリ (Working Directory) → あなたが実際にファイルを編集している場所

ステージングエリア (Staging Area / Index) → 「次のコミットに含める変更」を一時的に置いておく場所

リポジトリ (Repository) → コミット済みの履歴が保存される場所

ステージングとは、作業ディレクトリでの変更を「次のコミットに含めるよ」と準備することです。 → つまり「コミットする前の仮置き場に登録する」イメージです。

 git add コマンドの意味
git add ファイル名 → 指定したファイルの変更を ステージングエリアに追加する

例:

bash
git add index.html
→ index.html の変更を「次のコミットに含める」ように準備する

すべての変更をまとめてステージングしたいときは：

bash
git add .
→ カレントディレクトリ以下の変更を全部ステージング

 流れのイメージ
ファイルを編集する（作業ディレクトリ）

git add で変更をステージングエリアに登録する

git commit でステージングされた変更をリポジトリに保存する

 まとめ
ステージング = コミットする前に「次に保存する変更」を選ぶ作業

git add = その選択を実際に行うコマンド