# 環境構築

## セットアップ手順

前提：npmなどの開発環境なし

```
# nvmインストール
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.0/install.sh | bash

# パス設定
% cat ~/.zshrc 
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

# nvmバージョン確認
nvm ls-remote
       v14.15.4   (LTS: Fermium)
       v14.15.5   (LTS: Fermium)
       v14.16.0   (LTS: Fermium)
       v14.16.1   (LTS: Fermium)
       v14.17.0   (LTS: Fermium)
->     v14.17.1   (Latest LTS: Fermium)
        v15.0.0
        v15.0.1
        v15.1.0

# node.js(LTS)インストール
nvm install v14.17.1

# Vueインストール
npm install vue@next
この時点だとまだvue --versionは使えない

npm install -g @vue/cli

vue --version
@vue/cli 4.5.13

vue upgrade --next
package.jsonがないと怒られるので、npm initしてデフォルト回答する

vue upgrade --next
 WARN  There are uncommitted changes in the current repository, it's recommended to commit or stash them first.
? Still proceed? Yes
✔  Gathering package information...
 DONE  Seems all plugins are up to date. Good work!

 npm i -g @vue/cli-service-global
 npm i @vue/compiler-sfc
```



## 参考サイト

- https://qiita.com/tanishi/items/f741e4bebfb6b6d470dc
- https://qiita.com/tanaka-lapis-jp/items/2039570c8d05824665da
- https://v3.ja.vuejs.org/guide/installation.html#npm

# Vue CLI利用

## Vue 3使ったらダメだった

```
vue create tutorial


Vue CLI v4.5.13
? Please pick a preset: Default (Vue 3) ([Vue 3] babel, eslint)


Vue CLI v4.5.13
✨  Creating project in /Users/yuta/repo/vuelocalportal/tutorial.
⚙️  Installing CLI plugins. This might take a while...


> fsevents@1.2.13 install /Users/yuta/repo/vuelocalportal/tutorial/node_modules/watchpack-chokidar2/node_modules/fsevents
> node install.js

No receipt for 'com.apple.pkg.CLTools_Executables' found at '/'.

No receipt for 'com.apple.pkg.DeveloperToolsCLILeo' found at '/'.

No receipt for 'com.apple.pkg.DeveloperToolsCLI' found at '/'.

gyp: No Xcode or CLT version detected!
gyp ERR! configure error 
gyp ERR! stack Error: `gyp` failed with exit code: 1
gyp ERR! stack     at ChildProcess.onCpExit (/Users/yuta/.nvm/versions/node/v14.17.1/lib/node_modules/npm/node_modules/node-gyp/lib/configure.js:351:16)
gyp ERR! stack     at ChildProcess.emit (events.js:375:28)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:277:12)
gyp ERR! System Darwin 20.5.0
gyp ERR! command "/Users/yuta/.nvm/versions/node/v14.17.1/bin/node" "/Users/yuta/.nvm/versions/node/v14.17.1/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "rebuild"
gyp ERR! cwd /Users/yuta/repo/vuelocalportal/tutorial/node_modules/watchpack-chokidar2/node_modules/fsevents
gyp ERR! node -v v14.17.1
gyp ERR! node-gyp -v v5.1.0
gyp ERR! not ok 

> fsevents@1.2.13 install /Users/yuta/repo/vuelocalportal/tutorial/node_modules/webpack-dev-server/node_modules/fsevents
> node install.js

No receipt for 'com.apple.pkg.CLTools_Executables' found at '/'.

No receipt for 'com.apple.pkg.DeveloperToolsCLILeo' found at '/'.

No receipt for 'com.apple.pkg.DeveloperToolsCLI' found at '/'.

gyp: No Xcode or CLT version detected!
gyp ERR! configure error 
gyp ERR! stack Error: `gyp` failed with exit code: 1
gyp ERR! stack     at ChildProcess.onCpExit (/Users/yuta/.nvm/versions/node/v14.17.1/lib/node_modules/npm/node_modules/node-gyp/lib/configure.js:351:16)
gyp ERR! stack     at ChildProcess.emit (events.js:375:28)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:277:12)
gyp ERR! System Darwin 20.5.0
gyp ERR! command "/Users/yuta/.nvm/versions/node/v14.17.1/bin/node" "/Users/yuta/.nvm/versions/node/v14.17.1/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "rebuild"
gyp ERR! cwd /Users/yuta/repo/vuelocalportal/tutorial/node_modules/webpack-dev-server/node_modules/fsevents
gyp ERR! node -v v14.17.1
gyp ERR! node-gyp -v v5.1.0
gyp ERR! not ok 

> yorkie@2.0.0 install /Users/yuta/repo/vuelocalportal/tutorial/node_modules/yorkie
> node bin/install.js

setting up Git hooks
can't find .git directory, skipping Git hooks installation

> core-js@3.15.1 postinstall /Users/yuta/repo/vuelocalportal/tutorial/node_modules/core-js
> node -e "try{require('./postinstall')}catch(e){}"


> ejs@2.7.4 postinstall /Users/yuta/repo/vuelocalportal/tutorial/node_modules/ejs
> node ./postinstall.js

added 1261 packages from 665 contributors and audited 1261 packages in 13.694s

78 packages are looking for funding
  run `npm fund` for details

found 14 vulnerabilities (7 moderate, 7 high)
  run `npm audit fix` to fix them, or `npm audit` for details
🚀  Invoking generators...
📦  Installing additional dependencies...

added 83 packages from 87 contributors and audited 1344 packages in 3.094s

85 packages are looking for funding
  run `npm fund` for details

found 14 vulnerabilities (7 moderate, 7 high)
  run `npm audit fix` to fix them, or `npm audit` for details
⚓  Running completion hooks...

📄  Generating README.md...

🎉  Successfully created project tutorial.
👉  Get started with the following commands:

 $ cd tutorial
 $ npm run serve
```

## Vue2でやる

```
# コンパイル
vue create tutorial2


Vue CLI v4.5.13
? Please pick a preset: Default ([Vue 2] babel, eslint)

# 実行
  vue serve hello.vue --open
There's a package.json in the current directory.
Did you mean npm run serve?
 INFO  Starting development server...
98% after emitting CopyPlugin

 DONE  Compiled successfully in 1042ms                                                                                                              13:29:37


  App running at:
  - Local:   http://localhost:8080/ 
  - Network: http://192.168.0.41:8080/

  Note that the development build is not optimized.
  To create a production build, run npm run build.
```

### 動作確認

![20210627_01](images/20210627_01.png)

# tutorial配下からの移行

お試しのつもりでtutorial配下のhello.vueで開発していたが、これを最初のバージョンにしていい気がしてきたので、  
localportalview配下に格上げ。  
移行する前は書籍に従って`vue serve hello.vue --open`で起動していたが、移行して綺麗にする中で、  
tutorial/hello.vueの内容をsrc/App.vueにして、vue-good-tableの依存性をpackage.jsonに記載すると、  
`npm run serve`で起動できるようになった。

# ファーストバージョンリリース

見た目は劣化しているが、機能的にはlocalportalv0.0.7と同じ機能を実装できた気がするので、v0.1.0としてタグを切る。  
npm run buildした結果だと、ローカルでvue.jsを動かすことができない。  
これはindex.htmlのパスの書き方によるものらしいので、`%s;"/;";g`みたいな感じでsedで置換。
```
置換前：link href="/js/chunk-vendors.5aa61c95.js"
置換後：link href="js/chunk-vendors.5aa61c95.js"
```
あとフォーマットはVS Codeでの設定の仕方がよくわからないので諦めて、、[ここ](https://mtp.tools/formatters/vue-formatter)でやることにした。

# テスト調査

- [Vue.js ユニットテストの基本まとめ](https://qiita.com/kskinaba/items/d23259060e6e13b7353c)
  - 写経したが動かなかった
  - GitHubのコードをクローンしてnpm install, npm testしたら動いた
  - 動くサンプルという点で重要。記事の内容自体は見返さなくても良さそう
- [【基本編】Jestを利用してVue コンポーネントをテストする方法(Unit Test)](https://reffect.co.jp/vue/vue-jest-test)
  - 次はこれ読む

# Puppeteer

- テストピラミッドを踏まえると、自動化はUTから始めるのが鉄則だと思うが、以下の理由でUT自動化はすっ飛ばして、Puppeteerによるブラウザテストの自動化をする。
  + `vue cli test`を使ったUT作成のハードルが自分には高い（VueおよびUTコード作成の知識不足）
  + 頭に浮かんでいてやりたいのはブラウザテスト
  + Puppeteerいい加減ちゃんと使ってみたい
  + ブラウザテストの自動化が敬遠されるのって、ブラウザテストが壊れやすかったり、ブラウザテストのためにUI改善ができなかったりという開発の都合があると思うが、今回は自分一人の開発なので、あまり問題にならなそう

## Puppeteerインストール

```
% npm install puppeteer

> puppeteer@10.1.0 install /Users/yuta/repo/orenobookmark/node_modules/puppeteer
> node install.js

Downloading Chromium r884014 - 113.6 Mb [====================] 100% 0.0s 
+ puppeteer@10.1.0
added 26 packages from 26 contributors and audited 1345 packages in 20.491s

86 packages are looking for funding
  run `npm fund` for details

found 7 moderate severity vulnerabilities
  run `npm audit fix` to fix them, or `npm audit` for details
  ```

  ## Puppeteer実行

  [ここ]見て、`node index.js`でローカルのorenobookmarkに対して実行。画面キャプチャが取れた。データが何も入っていなかったので、次は初期化ボタンを自分で押すような処理を書く必要がありそう。Chromeですでに登録している既存のデータに対しての影響はなかった。Chromiumで実行しているからだと思う。

  ## テスト作成

  - 書籍だとテストフレームワークにavaを使っているが、今使うなら、jestっぽいので、jestを使う。
  - jestのサイトにpuppeteerとの使い方も書いてあった。

  ## テスト実行

  - jestのサイトのpuppeteerとの使い方見て、とりあえず初期表示の自動テストはできた。
  - puppeteer単体の時は別ブラウザが起動していた気がするが、jestと組み合わせると、別ブラウザが立ち上がっておらず、事前にアプリを起動しておかないといけないことに気づいた。