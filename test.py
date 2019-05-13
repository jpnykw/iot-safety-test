import nmap

nm = nmap.PortScanner()
nm.scan(hosts="localhost", arguments="-sS -p "+"0-65535")
result =  nm.get_nmap_last_output()
with open("/home/rootuser/scan.xml","w") as f:
	f.write(result)

