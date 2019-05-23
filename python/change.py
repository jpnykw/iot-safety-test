# -*- coding: utf-8 -*-
import telnetlib
import re
import sys
import time

host = sys.argv[1]
user = sys.argv[2]
password = sys.argv[3]
timeout_t = 10
new_password = sys.argv[4]

print("----------------------")
print("password :"+password+" → "+new_password)
print("----------------------")

tn = telnetlib.Telnet(host)
tn.read_until(b"login:", timeout_t)

tn.write(user.encode('ascii') + b"\n")
tn.read_until(b"Password:", timeout_t)

tn.write(password.encode('ascii') + b"\n")
tn.read_until(b"GNU/Linux", timeout_t)

time.sleep(1)
tn.write(b"passwd\n")

time.sleep(timeout_t)
tn.write(b"root\n")
time.sleep(1)
tn.write(new_password.encode('ascii') + b"\n")
time.sleep(1)
tn.write(new_password.encode('ascii') + b"\n")
time.sleep(1)

tn.close()

