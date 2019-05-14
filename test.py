
#### 動作に際して、2つのパッケージが必要 ####
#pip3 install python-nmap
#pip3 install xmltodict

import nmap
import json
import xmltodict
import sys

#localhostの0-65535(全ポート)に対してスキャン
#localhost以外にも繋げる方が〜→「引数に入れてください」仕様に変更
nm = nmap.PortScanner()
nm.scan(hosts=sys.argv[1], arguments="-sS -p "+"0-65535")
xml_result =  nm.get_nmap_last_output()	#xml形式での取得

#### xml形式での出力→いらないのでコメントアウト(必要なら外してください)
#with open("/home/rootuser/scan.xml","w") as f:
#	f.write(xml_result)

####json形式での出力(xml→json)
with open("/home/rootuser/scan.json","w") as f:
	f.write(json.dumps(xmltodict.parse(xml_result), indent=4, sort_keys=True))

