param(
    [string]$ZipPath = ".\案件スターター.zip", # スターターZIPのパス
    [string]$ProjectName = "project-A"         # 案件名（展開後のフォルダ名）
)

Write-Host "=== スターターキット自動セットアップ開始 ==="

# 1. 作業ディレクトリを作成
if (!(Test-Path $ProjectName)) {
    New-Item -ItemType Directory -Path $ProjectName | Out-Null
    Write-Host "作業フォルダ [$ProjectName] を作成しました"
} else {
    Write-Host "作業フォルダ [$ProjectName] は既に存在します"
}

# 2. ZIP を展開
Expand-Archive -LiteralPath $ZipPath -DestinationPath $ProjectName -Force
Write-Host "ZIP [$ZipPath] を [$ProjectName] に展開しました"

# 3. 内部フォルダ（starter-kit）をリネームして整理
$innerPath = Join-Path $ProjectName "starter-kit"
if (Test-Path $innerPath) {
    Get-ChildItem $innerPath | Move-Item -Destination $ProjectName -Force
    Remove-Item $innerPath -Recurse -Force
    Write-Host "内部フォルダ starter-kit を整理しました"
}

# 4. 依存インストール
Set-Location $ProjectName
Write-Host "npm install を実行中..."
npm install

# 5. gulp起動
Write-Host "開発サーバーを起動します..."
npm start

npm start


# ✅ 使い方（Cursorのターミナルで実行）

# C:\projects を Cursor で開く
# setup.ps1 を 案件スターター.zip と同じ場所に置く
# 例： C:\projects\setup.ps1 と 案件スターター.zip

# ターミナルで移動
# powershelldeで以下を入力

# cd C:\projects

# 実行（案件名を渡す）
# powershelldeで以下を入力

# powershell -ExecutionPolicy Bypass -File .\setup.ps1 -ZipPath ".\案件スターター.zip" -ProjectName "project-A"

# ✅ 実行後に自動でやってくれること
# project-A フォルダ作成
# ZIP を展開 (starter-kit フォルダの中身を整理)
# npm install
# npm start（→ BrowserSync サーバー起動）

# C:\projects\
#   ├─ 案件スターター.zip
#   ├─ setup.ps1   ← ここに置く
#   └─ （案件ごとにここへ展開される）
# この状態にしておくと、

# Cursorで C:\projects を開く
# （Ctrl + K, Ctrl + O → フォルダを選ぶ）

# Cursorのターミナルで

# powershell
# powershell -ExecutionPolicy Bypass -File .\setup.ps1 -ProjectName "project-A"
# と実行すればOK。

# 💡 なぜ同じ場所に置くのか？
# setup.ps1 から 案件スターター.zip を相対パス (.\案件スターター.zip) で読めるようにするため
# 毎回パスをフルで書かなくても済む
# ZIP とセットで持ち運べる