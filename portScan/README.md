# Scripts
## device_scan.py
Usage: `sudo python device_scan.py {IP addr}`

Example: `sudo python device_scan.py 192.168.100.1`

LAN内のデバイスをスキャンし、IPアドレスを列挙します。
また、スキャンした結果は`sample_device_scan.json`の形式で標準出力に出します。

大森の環境の都合で`192.168.11.1/24`を探索しているので、実際に使用する場合は、デバイスのIPアドレスから探索するIPアドレスを決定する必要がある気がします。

### 例
ホストのIPアドレスが `192.168.100.41`の場合、探索する範囲は`192.168.100.1/24`を指定する


## port_scan.py
房安さんのコードをお借りして、少し修正しました。

Usage: `sudo python port_scan.py { host_name || ip address }`

Example: `sudo python port_scan.py 192.168.100.41`

`host_name`に関してポートスキャンを行い、結果をjsonで標準出力に出します。


