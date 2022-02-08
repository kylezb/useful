import math
import re
import time
from urllib.parse import quote

import execjs
import pywasm
import requests
from Crypto import Random
from Crypto.PublicKey import RSA

from examples.useful_python.examples.spiders.utils.decoder import USE_RSA

YUANRENXUE_COM_MATCH_ = {
    "User-Agent": "yuanrenxue.project",
    "Referer": "https://match.yuanrenxue.com/match/16"
}

url_template = "https://match.yuanrenxue.com/api/match/15?m={m}&page={page}"
headers = YUANRENXUE_COM_MATCH_
proxies = {
    'http': 'http://127.0.0.1:8888',
    'https': 'http://127.0.0.1:8888',
}
session = requests.session()
session.headers = headers
session.cookies.update({
    "sessionid": "vrq58x8fsocpmm40clw6ufk7543sq7gc",
})
random_generator = Random.new().read
rsa = RSA.generate(1024, random_generator)

# Server的秘钥对的生成
private_pem = rsa.exportKey()
with open("server-private.pem", "wb") as f:
    f.write(private_pem)

def encode0():
    rsa = USE_RSA()
    rsa.pubkey = RSA.import_key(open("pub.pem").read())
    # print(pubkey)
    # rsa.readPem("server-private.pem", "pubkey")
    ret = rsa.sign('ok')
    print(ret.decode())


encode0()


# def encode1():
#     t1 = int(int(time.time() * 1000) / 1000 / 2)
#     t2 = int(int(time.time() * 1000) / 1000 / 2 - math.floor(random.randint(0, 50) + 1))
#     print(t1, t2)
#     vm = pywasm.load('a.wasm')
#     result = vm.exec("encode", [t1, t2])
#     print(result)
#     return f'{result}|{t1}|{t2}'
#
#
# result = encode1()
#
# total = 0
# for i in range(1, 6):
#     ret = session.get(url=url_template.format(page=i, m=quote(result)), headers=headers,
#                       proxies=proxies, verify=False)
#
#     print(ret.text)
#     json_content = ret.json()
#     data = json_content.get("data")
#     for item in data:
#         total += item.get("value")
#
#     result = encode1()
#
#     print(ret)
# print(total)
