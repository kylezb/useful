from collections import defaultdict

import requests

common_headers = {
    "User-Agent": "yuanrenxue.project",
    "Host": "match.yuanrenxue.com",
    "Connection": "keep-alive",
    "Content-Length": "0",
    "sec-ch-uav": '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
    "sec-ch-ua-mobile": "?0",
    "User-Agent": "yuanrenxue.project",
    "sec-ch-ua-platform": "Windows",
    "Accept": "*/*",
    "Origin": "https://match.yuanrenxue.com",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    "Referer": "https://match.yuanrenxue.com/match/3",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh,zh-HK;q=0.9,ru;q=0.8,en;q=0.7,en-US;q=0.6,zh-CN;q=0.5",
}

common_cookies = {
    'sessionid': 'yq67779czi1vsvta1kl2uerlsfl43ny3',
}
proxies = {
    'http': '127.0.0.1:8888',
    'https': '127.0.0.1:8888',
}

total = defaultdict(int)

session = requests.session()
session.headers = common_headers
session.cookies.update({
    "sessionid": "yq67779czi1vsvta1kl2uerlsfl43ny3",
})
for i in range(1, 2):
    ret = session.post(url='https://match.yuanrenxue.com/jssm', proxies=proxies,
                       verify=False)
    ret = session.get(url=f'https://match.yuanrenxue.com/api/match/3?page={i}',
                      proxies=proxies, verify=False)

    # ret = requests.post(url='https://match.yuanrenxue.com/jssm', proxies=proxies,
    #                     verify=False, headers=common_headers, cookies=common_cookies)
    # ret = requests.get(url=f'https://match.yuanrenxue.com/api/match/3?page={i}',
    #                    proxies=proxies, verify=False, headers=common_headers,
    #                    cookies=common_cookies)

    json_content = ret.json()
    items = json_content.get("data")
    for item in items:
        total[str(item.get("value"))] += 1

total_list = []
for k, v in total.items():
    total_list.append((k, v))

total_list.sort(key=lambda x: x[1])
print(total_list)
