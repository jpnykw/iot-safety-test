# -*- coding: utf-8 -*-
#### 動作に際して、2つのパッケージが必要 ####
#pip3 install python-nmap
#pip3 install xmltodict

import nmap
import json
import xmltodict

#localhostの0-65535(全ポート)に対してスキャン
nm = nmap.PortScanner()
target_host = input()
print("Scan Started to {}".format(target_host))
nm.scan(hosts=target_host, arguments="-sS -p "+"0-65535")
xml_result =  nm.get_nmap_last_output()	#xml形式での取得

#### xml形式での出力(正直必要は無いです)
#with open("scan.xml","w") as f:
#	f.write(xml_result)

####json形式での出力(xml→json)
with open("scan.json","w") as f:
	f.write(json.dumps(xmltodict.parse(xml_result), indent=4, sort_keys=True))



