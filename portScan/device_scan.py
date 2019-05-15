# -*- coding: utf-8 -*-

import nmap
import json
import sys

nm = nmap.PortScanner()
nm.scan(hosts=sys.argv[1]+"/24", arguments="-n -sP -PE -PA21,23, 80, 3389")
#hosts_list = [(x, nm[x]['status']['state']) for x in nm.all_hosts()]

hosts = {'hosts': nm.all_hosts()}
print(json.dumps(hosts))

