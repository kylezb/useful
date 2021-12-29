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


import execjs
import requests

f = open('temp.js', 'r+')
js_content = f.read()
print(js_content)
ret = execjs.compile(js_content).call('ok')
print(ret)
cookies = {
    'm': ret.split(';')[0].split('=')[1],
    'sessionid': 'd4iuxk3cp0qsknb84q1rb00uizu9brzd',
}
headers = {
    "User-Agent": "yuanrenxue.project",
}
# 197509
print(cookies)
# cookies['m'] = 'b56990770d8bcdc9a0af910970a36cc6|1640758762000'
total = 0
for i in range(1, 6):
    ret = requests.get(url=f'https://match.yuanrenxue.com/api/match/2?page={i}',
                       cookies=cookies, headers=headers)
    json_content = ret.json()

    items = json_content.get("data")
    for item in items:
        print(item.get("value"))
        total += item.get("value")

print(total)
