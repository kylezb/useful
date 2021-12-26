import base64
from urllib.parse import quote

import requests

url_template = "https://match.yuanrenxue.com/api/match/12?page={page}&m={m}"
headers = {
    "User-Agent": "yuanrenxue.project",
}

cookies = {
    "sessionid": "bpa0kjjexx0k8rxam2doenybnxrdb7k0"
}

total = 0
for i in range(5):
    m = base64.b64encode(('yuanrenxue' + str(i + 1)).encode('utf-8'))
    ret = requests.get(url=url_template.format(page=i + 1, m=quote(m)), headers=headers,
                       cookies=cookies)
    print(ret.text)
    json_content = ret.json()
    for temp in json_content.get("data"):
        total += temp.get("value")

print(total)
