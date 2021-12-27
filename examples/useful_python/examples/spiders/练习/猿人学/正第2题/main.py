'''
1. 先是aiding_win+时间戳
2. 然后base64第一步, 得到token
3. 然后md5token, 得到md

'''
import base64
from hashlib import md5

org_time = 1587102734000

temp1 = 'aiding_win' + str(org_time)
token = base64.b64encode(temp1.encode())
print(token)

temp2 = 'aiding_win' + str(int(org_time/1000))
token2 = base64.b64encode(temp2.encode())
print(token2)

md = md5(token2)
md = md.hexdigest()
print(md)

token = token.decode()
sign =  str(int(org_time/1000)) + '~' + token + '|' + md
print(sign)
