# Insert AmazonPoints in the Wishlist

AmazonのWishlistに入っているKindle本のAmazonポイントを表示させる拡張

# Version
0.3.0

## Install
### Chrome
1. git cloneやZIP Downloadを行いファイルを入手
1. 拡張機能管理画面(chrome://extensions/)の上部のデベロッパーモードにチェックを入れて、「パッケージ化されてない拡張機能を読み込む」をクリック
1. 入手したフォルダを指定して選択をクリック

### Microsoft Edge
1. git cloneやZIP Downloadを行いファイルを入手
1. 拡張機能管理画面(edge://extensions/)の左下にある開発者モードをオンにして、「展開して読み込み」をクリック
1. 入手したフォルダを指定して選択をクリック

## Usage
1. インストール後オプション画面が開くので、保存をクリック
1. AmazonのWishlistのページを開いて少し待つとポイントが値段の隣に表示される

## Update History
0.3.0
* Manifest V3に対応
* fetchAPIがどこでも利用できるようになっているので、jQueryを削除
* Service Workerを利用する必要がないため削除
* ポイントのサイズ・色を見やすく
* オプションページをoptions_uiに

0.2.1
bugfix

0.2.0
* AmazonのWishlistのurlが違うものができていたので対応ページに追加
* Wishlistのページ構成がページ移動から無限スクロールになっていたので対応
* いつの間にかFetchAPIが使えるようになっていたのでEnableに　デフォルトもFetchAPIに
* jQueryの新しいバージョンが出ていたので確認したところ、問題なく動作したので更新
* その他いくつかリファクタ

## License
Copyright (c) 2017-2023 sytkm
Released under the MIT license
http://opensource.org/licenses/mit-license.php
