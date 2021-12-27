import base64
import time
from hashlib import md5

import requests

proxies = {
    'https': "127.0.0.1:8888"
}
headers = {
    'Host': 'www.python-spider.com',
    'Connection': 'keep-alive',
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
    'sec-ch-ua-mobile': '?0',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'timestamp': '1640587071',
    'X-Requested-With': 'XMLHttpRequest',
    'sec-ch-ua-platform': '"Windows"',
    'safe': 'eb318d6cfe1fa9876c3403028d6122fd',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Referer': 'https://www.python-spider.com/challenge/1',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh,zh-HK;q=0.9,ru;q=0.8,en;q=0.7,en-US;q=0.6,zh-CN;q=0.5',
}
total = 0
for i in range(1, 86):
    timestamp = str(int(time.time()))
    temp = base64.b64encode(('9622' + timestamp).encode('utf-8'))
    tokens = md5(temp)
    tokens = tokens.hexdigest()
    # print()

    headers['safe'] = tokens
    headers['timestamp'] = str(timestamp)

    ret = requests.get(
        url=f'https://www.python-spider.com/challenge/api/json?page={i}&count=14',
        verify=False,
        proxies=proxies,
        headers=headers
    )

    json_content = ret.json()
    infos = json_content.get("infos")
    for info in infos:
        message = info.get("message")
        if '招' in message:
            total += 1


print(total)




