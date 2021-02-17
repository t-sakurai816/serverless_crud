# serverless_crud

ブラウザからCRUDするアプリケーションです  
Serverless Frameworkを使用しました

## 動作確認バージョン

```
$ sls --version
Framework Core: 2.23.0
Plugin: 4.4.2
SDK: 2.3.2
Components: 3.6.2
```

```
$ node --version
v14.15.4
```

```
$ aws --version
aws-cli/2.1.24 Python/3.7.4 Darwin/20.2.0 exe/x86_64 prompt/off
```

## セットアップ

下記を実行

```bash
$ git clone https://github.com/t-sakurai816/serverless_crud
$ npm init
$ npm install aws-sdk --save
$ npm install uuid --save
$ npm install --save serverless-s3-sync
```

## デプロイ

別途 `aws configure --profile `でawsのプロファイルを作成しておく必要あり。

```
$ sls deploy -v --aws-profile awsProfileName
```

表示されたURLを`js/index.js`に入力して再度デプロイするとS3バケットにある`index.html`を利用してブラウザからCRUDできるようになります。

## APIのIP制限

現状はAPIに制限をかけていないのでだれでもリクエストを送ることが出来ます。  
そのためIP制限をかけるにはAWSのWAFからIPsetsを作成して適用してください

## 動作イメージ

![](https://i.imgur.com/wRl0V4L.png)
