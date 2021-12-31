import subprocess
import time
from collections import defaultdict
from functools import partial

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
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
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
    "sessionid": "c9jqi35m9wa3k16kzd63h1jzsljy332f",
})
t = int(time.time() * 1000)
f = open("sdk.js", "r+", encoding='utf8', )
js_file = f.read()
js_compile = execjs.compile(js_file)
m = js_compile.call("test", int(t / 1000) * 1000)
session.cookies.update({
    "m": m
})
for i in range(2, 6):

    ret = session.get(
        url=f'https://match.yuanrenxue.com/api/match/5?page={i}&m={t}&t={int(t / 1000) * 1000}',
        proxies=proxies, verify=False)

    print(ret.text)
    json_content = ret.json()
    items = json_content.get("data")
    for item in items:
        total[str(item.get("value"))] += 1

total_list = []
for k, v in total.items():
    total_list.append((k, v))

total_list.sort(key=lambda x: x[1], reverse=True)
print(total_list)
total = 0
for i in range(0, 5):
    total += int(total_list[i][0])
