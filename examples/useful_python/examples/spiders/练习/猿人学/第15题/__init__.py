import re
import time

import execjs
import requests

YUANRENXUE_COM_MATCH_ = {
    "User-Agent": "yuanrenxue.project",
    "Referer": "https://match.yuanrenxue.com/match/16"
}

url_template = "https://match.yuanrenxue.com/api/match/16?page={page}&m={m}&t={t}"
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
_ts = int(int(time.time())*1000)
f = open('sdk.js', 'r')
sdk_1 = f.read()
ret = execjs.compile(sdk_1).call('call', str(_ts))
print(ret)



total = 0
for i in range(1, 6):
    ret = session.get(url=url_template.format(page=i, m=ret, t=_ts), headers=headers,
                      proxies=proxies, verify=False)

    print(ret.text)
    json_content = ret.json()
    data = json_content.get("data")
    for item in data:
        total += item.get("value")

    ret = execjs.compile(sdk_1).call('call', str(_ts))
    print(ret)
print(total)