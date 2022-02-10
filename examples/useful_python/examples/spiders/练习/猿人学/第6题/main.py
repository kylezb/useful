import base64
import subprocess
import time
from functools import partial
from urllib.parse import quote

from Crypto.PublicKey import RSA

from examples.useful_python.examples.spiders.utils.decoder import USE_RSA

subprocess.Popen = partial(subprocess.Popen, encoding="utf-8")
import execjs
import requests

YUANRENXUE_COM_MATCH_ = {
    "User-Agent": "yuanrenxue.project",
    "Referer": "https://match.yuanrenxue.com/match/6"
}

url_template = "https://match.yuanrenxue.com/api/match/6?&page={page}&m={m}&q={q}"
headers = YUANRENXUE_COM_MATCH_
proxies = {
    'http': 'http://127.0.0.1:8888',
    'https': 'http://127.0.0.1:8888',
}
session = requests.session()
session.headers = headers
session.cookies.update({
    "sessionid": "1v7ytuna1sh2b1lised7yltga6u1v0nj",
})


def encode0(data):
    rsa = USE_RSA()
    rsa.pubkey = RSA.import_key(open("pub.pem").read())
    # print(pubkey)
    # rsa.readPem("server-private.pem", "pubkey")
    ret = rsa.rsaEncrypt(data)
    ret = base64.b64encode(ret).decode()
    print(ret)
    return ret


def encode2(data):
    from Crypto.PublicKey import RSA
    from Crypto.Cipher import PKCS1_v1_5 as Cipher_pkcs1_v1_5
    # from Crypto.Cipher import PKCS1_OAEP as Cipher_pkcs1_v1_5
    import base64

    # 加密
    message = data
    rsakey = RSA.importKey(open("pub.pem").read())
    cipher = Cipher_pkcs1_v1_5.new(rsakey)  # 创建用于执行pkcs1_v1_5加密或解密的密码
    cipher_text = base64.b64encode(cipher.encrypt(message.encode('utf-8')))
    print(cipher_text.decode('utf-8'))
    return cipher_text.decode('utf-8')


def encode3(t, time):
    # 通过sdk加密
    f = open('sdk.js', 'r', encoding="utf-8")
    sdk_1 = f.read()
    compiled = execjs.compile(sdk_1)
    ret = compiled.call('z', int(t), int(time))
    print(ret)
    return ret


total_q = ''


def encode1(window_o):
    global total_q
    t1 = int(int(time.time()) * 1000)
    # t1 = 1644461166000
    data = f'{window_o}|{t1}'
    print(data)
    # m = encode2(data)
    m = encode3(t1, window_o)
    total_q = str(window_o) + '-' + str(t1) + "|"
    return m, total_q


total = 0
for i in range(1, 6):
    m, total_q = encode1(i)
    # q_m = parse(m)
    # q_m = quote(m, safe='')

    url = url_template.format(page=i, m=quote(m), q=quote(total_q))
    ret = session.get(url=url, headers=headers, proxies=proxies, verify=False)
    print(ret.text)
    json_content = ret.json()
    data = json_content.get("data")
    for item in data:
        total += item.get("value") + item.get("value") * 8 + item.get("value") * 15

    # result = encode1()
    print(session.cookies)
    time.sleep(2)

    print(ret)
print(total)
