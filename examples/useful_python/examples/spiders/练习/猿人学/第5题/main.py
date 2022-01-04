import base64
import subprocess
import time
from collections import defaultdict
from functools import partial
import os
from examples.useful_python.examples.spiders.utils.tools import MyAES

subprocess.Popen = partial(subprocess.Popen, encoding="utf-8")
import execjs
import requests

common_headers = {
    "Host": "match.yuanrenxue.com",
    "Connection": "keep-alive",
    "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "X-Requested-With": "XMLHttpRequest",
    "sec-ch-ua-mobile": "?0",
    "User-Agent": "yuanrenxue.project",
    "sec-ch-ua-platform": "Windows",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    "Referer": "https://match.yuanrenxue.com/match/5",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh,zh-HK;q=0.9,ru;q=0.8,en;q=0.7,en-US;q=0.6,zh-CN;q=0.5",
}

common_cookies = {
    'sessionid': 'c9jqi35m9wa3k16kzd63h1jzsljy332f',
}
proxies = {
    'http': '127.0.0.1:8888',
    'https': '127.0.0.1:8888',
}

total = defaultdict(int)

session = requests.session()
session.headers = common_headers
session.cookies.update({
    "sessionid": "q9mzvylmp1p61z3xbkoyanr7cs3v20l9",
})
t = int(time.time() * 1000)
f = open("sdk.js", "r+", encoding='utf8', )
js_file = f.read()
js_compile = execjs.compile(js_file)
temp1 = js_compile.call("getCookie")
m = temp1[2]
t = temp1[0]
text = temp1[3]

# t = 1641287390884
sec_key = base64.b64encode(str(t).encode()).decode()[0:16]
print('sec_key', sec_key, t)
myAes = MyAES(sec_key)

print("加密文本:", text)
# text = '2c19c45fe56c91072c0eff540547b553,10b0395acfe3e66f0c14649561d1f3fe,6ab5e43cbee9e88be053f49d1f69ee83,e29ff5852aee529eff2f72473a097bc4,e10f123fa9ab8a2524512376eef09010'
aes_text = myAes.aes_encrypt_ecb(text, True)
print("加密后结果:", aes_text)
print(t)
session.cookies.update({
    "m": m,
    "RM4hZBv0dDon443M": aes_text,
})
print(session.cookies)
for i in range(1, 6):

    ret = session.get(
        url=f'https://match.yuanrenxue.com/api/match/5?page={i}&m={t}&f={int(t / 1000) * 1000}',
        proxies=proxies, verify=False)

    print(ret.text, 'olkk')
    json_content = ret.json()
    items = json_content.get("data")
    for item in items:
        total[str(item.get("value"))] += 1

total_list = []
for k, v in total.items():
    total_list.append((k, v))

total_list.sort(key=lambda x: x[0], reverse=True)
print(total_list)
total = 0
for i in range(0, 5):
    total += int(total_list[i][0])

print(total)