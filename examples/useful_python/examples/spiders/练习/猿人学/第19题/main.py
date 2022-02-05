import math
import random
import re
import time
from urllib.parse import quote

import execjs
import pywasm
import requests
import urllib3

from examples.useful_python.examples.spiders.练习.猿人学.第19题.ja3adapter import Ja3Adapter

YUANRENXUE_COM_MATCH_ = {
    "User-Agent": "yuanrenxue.project",
    "Referer": "https://match.yuanrenxue.com/match/16"
}

url_template = "https://match.yuanrenxue.com/api/match/19?page={page}"
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


session.mount('https://match.yuanrenxue.com/',Ja3Adapter())

total = 0
for i in range(1, 6):
    ret = session.get(url=url_template.format(page=i), headers=headers,
                      verify=False)

    print(ret.text)
    json_content = ret.json()
    data = json_content.get("data")
    for item in data:
        total += item.get("value")


    print(ret)
print(total)
