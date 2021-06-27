# 環境構築

## 手順

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
```



## 参考サイト

- https://qiita.com/tanishi/items/f741e4bebfb6b6d470dc
- https://qiita.com/tanaka-lapis-jp/items/2039570c8d05824665da
- https://v3.ja.vuejs.org/guide/installation.html#npm