import base64
import time
from urllib.parse import quote
# from urllib import parse

import requests
from Crypto.PublicKey import RSA

from examples.useful_python.examples.spiders.utils.decoder import USE_RSA

YUANRENXUE_COM_MATCH_ = {
    "User-Agent": "yuanrenxue.project",
    "Referer": "https://match.yuanrenxue.com/match/6"
}

url_template = "https://match.yuanrenxue.com/api/match/6?page={page}&m={m}&q={q}"
headers = YUANRENXUE_COM_MATCH_
proxies = {
    'http': 'http://127.0.0.1:8888',
    'https': 'http://127.0.0.1:8888',
}
session = requests.session()
session.headers = headers
session.cookies.update({
    "sessionid": "8hq6hmq1fpxke19av41yrn0dibyjp8gz",
})


# Server的秘钥对的生成
# random_generator = Random.new().read
# rsa = RSA.generate(1024, random_generator)
# private_pem = rsa.exportKey()
# with open("server-private.pem", "wb") as f:
#     f.write(private_pem)

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



def encode1(window_o):
    t1 = int(int(time.time()) * 1000)
    data = f'{window_o}|{t1}'
    print(data)
    m = encode2(data)
    q = str(window_o) + '-' + str(t1) + "|"
    return m, q


total = 0
for i in range(1, 6):
    m, q = encode1(i)
    # q_m = parse(m)
    q_m = quote(m, safe='')

    url = url_template.format(page=i, m=quote(q_m, safe=''), q=quote(q))
    ret = session.get(url=url, headers=headers,
                       verify=False)
    print(ret.text)
    json_content = ret.json()
    data = json_content.get("data")
    for item in data:
        total += item.get("value")

    # result = encode1()
    time.sleep(10)

    print(ret)
print(total)
