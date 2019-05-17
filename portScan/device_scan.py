# -*- coding: utf-8 -*-

import nmap
import json
import sys
import ipaddress
import netifaces

def getNetworkAddresses():
    res = []
    for iface_name in netifaces.interfaces():
        iface_data = netifaces.ifaddresses(iface_name)
        ipv4_data_list = iface_data.get(netifaces.AF_INET)
        if ipv4_data_list == None:
            continue

        for ipv4_data in ipv4_data_list:
            addr = ipaddress.ip_address(ipv4_data["addr"])
            netmask = ipv4_data["netmask"]
            if not (addr.is_link_local or addr.is_loopback):
                print('valid ip: %s' % addr)
                network = ipaddress.ip_network('%s/%s'%(addr, netmask), False)
                print('network addr: %s' % network)
                res.append(network)
    return res



networkAddresses = getNetworkAddresses()
for networkAddress in networkAddresses:
    nm = nmap.PortScanner()
    nm.scan(hosts='%s'%networkAddress, arguments="-n -sP -PE -PA21,23, 80, 3389")
    #hosts_list = [(x, nm[x]['status']['state']) for x in nm.all_hosts()]

    hosts = {'hosts': nm.all_hosts(), 'network': '%s'%networkAddress}
    print(json.dumps(hosts))
