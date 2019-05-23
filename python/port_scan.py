# -*- coding: utf-8 -*-
import nmap
import json
import xmltodict
import sys

nm = nmap.PortScanner()
target_host = sys.argv[1]

nm.scan(hosts=target_host,arguments="-T4 -f")
xml_result =  nm.get_nmap_last_output()

output = json.dumps(xmltodict.parse(xml_result), indent=4, sort_keys=True)
print(output)

