SecHack期間中の進捗分は[master-old ブランチ](https://github.com/JPNYKW/SecHack365_2019_0502/tree/master-old)にあります.  

# IoT-Safety-Test

このプロジェクトは、  
SecHack2019表現駆動コースの課題で、  
グループメンバーと共同制作しました.  

ネットワーク内のデバイスに対してポートスキャンを行います.  
攻撃を行い、パスワードが脆弱であると警告を表示します.  
また、警告が表示されたデバイスをクリックすることで、  
デバイスのパスワードの変更を行うことが出来ます。

# 開発メンバー

[@Haruto Hirakawa](https://github.io/JPNYKW) (Me)  
[@Koya Ohashi](https://github.com/tohutohu)  
[@Yoshikazu Fusayasu](https://github.com/YoshikazuFusayasu)  
[@Takamichi Omori](https://github.com/onsd)

# インストールと起動方法

1. npm-install-missing をインストール

```
$ npm install -g npm-install-missing
```

2. npm-install-missing を実行

```
$ npm-install-missing
```

3. pythonのmoduleをインストール

```
$ pip install python-nmap
$ pip install xmltodict
$ pip install netifaces
```

`device_scan.py` が正常に動作するかを確認することを推奨します.

```
$ sudo python3 ./portScan/device_scan.py
```

エラーが発生する場合は、以下のコマンドを試してください.

```
$ brew install nmap
```

4. 起動

```
$ sudo electron .
```
