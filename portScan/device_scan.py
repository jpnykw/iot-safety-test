# -*- coding: utf-8 -*-

import nmap
import json

nm = nmap.PortScanner()
nm.scan(hosts="192.168.11.1/24", arguments="-n -sP -PE -PA21,23, 80, 3389")
#hosts_list = [(x, nm[x]['status']['state']) for x in nm.all_hosts()]

hosts = {'hosts': nm.all_hosts()}
print(json.dumps(hosts))

