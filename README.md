```
electron .
```

で起動します。

一応`device_scan.py`を[`js/dom.js`](https://github.com/JPNYKW/SecHack365_2019_0502/blob/electron/js/dom.js)内で実行しています.  
エラーは吐いておらず，コマンドの実行は正常にできますが，  
端末のパスワードを入力する事ができません…  
現状，正しい実装方法と対処方法がわかりません…  

ひとまず値を`console.log()`へ出力しています.  
electronのwindow内でctrl + shift + iを押すか，  
上部メニューよりview → Toggle Developer Toolsで切り替えてください.
