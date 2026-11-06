# ArcheAge Chronicles NPC Map starter

このフォルダは GitHub Pages で公開するためのスターターです。

## フォルダ構成

- `index.html` : サイト本体
- `npc_template.csv` : NPC登録用スプレッドシートの列見本
- `images/` : ゲーム内で撮影したマップ画像を置く場所

## 最初にすること

1. GitHubで `npc-map` という Public リポジトリを作成
2. `index.html` をリポジトリ直下へアップロード
3. `images` フォルダへマップ画像をアップロード
4. `index.html` 内の `AREAS` を実際の画像名・エリア階層に合わせて変更
5. Settings → Pages → Deploy from a branch → main → /(root) → Save

## マップ画像の用意

`images/world.jpg`、`images/diamond-shores.jpg`、`images/gylden-ruins.jpg`、`images/astron-plains.jpg` を用意してください。
ファイル名はコードの `AREAS` と一致させます。
画像サイズは自動で読み取ります。マップ画像はなるべく全域が見える、文字や地名が読める解像度のものを使います。

## エリア階層の設定

`AREAS` 配列の各項目：

- `id`: 英数字の一意なID
- `name`: 画面に表示する名前
- `parentId`: 親マップのID。最上位だけ `null`
- `image`: `images/` 内の画像パス
- `parentX`, `parentY`: 親マップ上に置くエリア移動ピンの座標

子エリアの `parentX`, `parentY` は、親マップを開いてクリックしたときに画面下に表示される座標を入力します。

## NPCをGoogleスプレッドシートで管理

1. Googleスプレッドシートを新規作成
2. `npc_template.csv` の1行目（列名）とサンプル行をコピー
3. 共有／ファイル → 共有 → ウェブに公開 からCSV形式で公開
4. 発行されたCSV URLを `index.html` の `SHEET_CSV_URL` に貼り付け
5. NPCの追加・編集はスプレッドシートで行う

列の意味：

- `id`: NPCごとの一意ID
- `name`: NPC名
- `areaId`: `AREAS` に設定したエリアID
- `x`, `y`: そのエリア画像上の座標
- `category`: 商人、クエスト、重要人物など
- `location`: 町・建物・目印
- `memo`: 補足
- `source`: 情報の出典・投稿者名など
- `status`: 確認済み／未確認など

NPCの座標は、該当エリアのマップ上をクリックして表示された `x` と `y` を入力します。

## 注意

- Googleシートをウェブ公開すると、シート内容が誰でも閲覧できる状態になります。個人情報や非公開情報は入れないでください。
- GitHub Pagesも公開サイトです。
- 画像やゲーム内素材の公開・再配布は、ゲーム運営会社の利用規約・権利条件を確認してください。まずは自分で撮影した画像を使うのが無難です。
- このスターターはNPCの閲覧・検索用です。一般ユーザーからの投稿受付や管理者承認は第2段階で追加します。
