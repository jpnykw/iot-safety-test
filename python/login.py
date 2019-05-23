# -*- coding: utf-8 -*-
import telnetlib
import re
import sys
import json

host = sys.argv[1]
user_list = ["rootuser"]
password_list = ["root"]
timeout_t = 10

for user in user_list :
	for password in password_list :
		tn = telnetlib.Telnet(host)
		tn.read_until(b"login:", timeout_t)
		tn.write(user.encode('ascii') + b"\n")
		res1 = tn.read_until(b"Password:", timeout_t)

		if res1.decode("utf-8").endswith("incorrect"):
			tn.close()
			continue

		tn.write(password.encode('ascii') + b"\n")
		res2 = tn.read_until(b"GNU/Linux", timeout_t)
		if res2.decode("utf-8").endswith("GNU/Linux"):
			print(json.dumps({'result': 'successed', 'user': user, 'pass': password}))
			tn.close()
			exit()
		else :
			tn.close()

print(json.dumps({'result': 'failed'}))

