# import re
#
# import execjs
# import requests
#
# url_template = "https://match.yuanrenxue.com/api/match/12?page={page}&m={m}"
# headers = {
#     "User-Agent": "yuanrenxue.project",
#     "Referer": "https://match.yuanrenxue.com/match/13"
# }
# proxies = {
#     'http': 'http://127.0.0.1:8888',
#     'https': 'http://127.0.0.1:8888',
# }
#
# ret = requests.get(url='https://match.yuanrenxue.com/match/13', headers=headers,
#                    proxies=proxies, verify=False,
#                    cookies={"sessionid": "ga7xoogsx5vdsqibhmssmkm7a5im96fa", })
#
# print(ret.text)
# ret_text = ret.text
# js = re.search(r"<script>(.*?)\+';path=/", ret.text)
# js_content = f'''
# let document={{}};
# function main(){{
#  {js[1]}
#  return document.cookie
# }}
#
#  '''
# print(js_content)
# ret = execjs.compile(js_content).call('main')
# print(ret)
#
# cookies = {
#     ret.split('=')[0]: ret.split('=')[1],
#     "sessionid": "ga7xoogsx5vdsqibhmssmkm7a5im96fa",
# }
# print(cookies)
#
# total = 0
# ret = requests.get(url='https://match.yuanrenxue.com/match/13', proxies=proxies,
#                    headers=headers,
#                    verify=False,
#                    cookies=cookies)
# # print(ret.text)
# # ret = session.get(url='http://match.yuanrenxue.com/api/loginInfo', headers=headers)
# # print(ret.text)
# for i in range(1, 6):
#     ret = requests.get(
#         url='https://match.yuanrenxue.com/api/match/13?page={page}'.format(page=i),
#         headers=headers,
#         proxies=proxies,
#         verify=False,
#         cookies=cookies)
#     print(ret.text)
#     json_content = ret.json()
#     print(json_content)
#     for temp in json_content.get("data"):
#         total += temp.get("value")
#
# print(total)





import re

import execjs
import requests

YUANRENXUE_COM_MATCH_ = {
    "User-Agent": "yuanrenxue.project",
    "Referer": "https://match.yuanrenxue.com/match/13"
}

url_template = "http://match.yuanrenxue.com/api/match/12?page={page}&m={m}"
headers = YUANRENXUE_COM_MATCH_
proxies = {
    'http': 'http://127.0.0.1:8888',
    'https': 'http://127.0.0.1:8888',
}
session = requests.session()
session.headers = headers
session.cookies.update({
    "sessionid": "ga7xoogsx5vdsqibhmssmkm7a5im96fa",
})
ret = session.get(url='http://match.yuanrenxue.com/match/13', headers=headers,
                  proxies=proxies, verify=False)

print(ret.text)
ret_text = ret.text
js = re.search(r"<script>(.*?)\+';path=/", ret.text)
js_content = f'''
let document={{}};
function main(){{
 {js[1]}
 return document.cookie
}}

 '''
print(js_content)
ret = execjs.compile(js_content).call('main')
print(ret)

cookies = {
    ret.split('=')[0]: ret.split('=')[1],
}
print(cookies)

total = 0
session.cookies.update(cookies)
ret = session.get(url='http://match.yuanrenxue.com/match/13', proxies=proxies)
session.cookies.update(cookies)
for i in range(1, 6):
    ret = session.get(
        url='http://match.yuanrenxue.com/api/match/13?page={page}'.format(page=i),
        proxies=proxies)
    print(ret.text)
    json_content = ret.json()
    print(json_content)
    for temp in json_content.get("data"):
        total += temp.get("value")

print(total)
