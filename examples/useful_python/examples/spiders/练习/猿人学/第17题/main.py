import math
import random
import re
import time
from urllib.parse import quote

import execjs
import pywasm
import requests

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


def encode0():
    ret = requests.get("https://match.yuanrenxue.com/static/match/match15/main.wasm", proxies=proxies, verify=False)
    f = open('a.wasm', 'wb')
    f.write(ret.content)
    f.close()


encode0()


def encode1():
    t1 = int(int(time.time() * 1000) / 1000 / 2)
    t2 = int(int(time.time() * 1000) / 1000 / 2 - math.floor(random.randint(0, 50) + 1))
    print(t1, t2)
    vm = pywasm.load('a.wasm')
    result = vm.exec("encode", [t1, t2])
    print(result)
    return f'{result}|{t1}|{t2}'


result = encode1()

total = 0
for i in range(1, 6):
    ret = session.get(url=url_template.format(page=i, m=quote(result)), headers=headers,
                      proxies=proxies, verify=False)

    print(ret.text)
    json_content = ret.json()
    data = json_content.get("data")
    for item in data:
        total += item.get("value")

    result = encode1()

    print(ret)
print(total)
