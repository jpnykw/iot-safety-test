# Scripts
## device_scan.py
Usage: `sudo python device_scan.py`
LAN内のデバイスをスキャンし、IPアドレスを列挙します。
また、スキャンした結果は`sample_device_scan.json`の形式で標準出力に出します。

大森の環境の都合で`192.168.11.1/24`を探索しているので、実際に使用する場合は、デバイスのIPアドレスから探索するIPアドレスを決定する必要がある気がします。

## port_scan.py
房安さんのコードをお借りして、少し修正しました。
Usage: `sudo python port_scan.py {host_name}`
`host_name`に関してポートスキャンを行い、結果をjsonで保存します。

printするかどうかなのでjsonを標準出力したほうが使いやすいならすぐに変更は可能です。

仕様を把握できていないのですが、`localhost`以外(他のマシンのIPアドレスなど)を入力したとき動作が停止するので、調査が必要かと
