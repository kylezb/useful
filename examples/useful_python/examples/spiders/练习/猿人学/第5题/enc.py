"""
ECB没有偏移量
"""
import base64
from binascii import b2a_hex, a2b_hex, b2a_base64, a2b_base64

from Crypto.Cipher import AES

from examples.useful_python.examples.spiders.utils.tools import MyAES


def add_to_16(text):
    if len(text.encode('utf-8')) % 16:
        add = 16 - (len(text.encode('utf-8')) % 16)
    else:
        add = 0
    text = text + ('\0' * add)
    return text.encode('utf-8')


# 加密函数
def aes_encrypt(text):
    key = 'MTY0MTI4NjgyMzUx'.encode('utf-8')
    mode = AES.MODE_ECB
    # text = add_to_16(text)
    cryptos = AES.new(key, mode)
    pad = lambda s: (s + (16 - len(s) % 16) * chr(
        16 - len(s) % 16))
    raw = pad(str(text))
    cipher_text = cryptos.encrypt(raw.encode('utf8'))
    # b2a_hex(cipher_text)
    return b2a_base64(cipher_text)


# 解密后，去掉补足的空格用strip() 去掉
def decrypt(text):
    key = 'MTY0MTI2NzY4Mzg0'.encode('utf-8')
    mode = AES.MODE_ECB
    cryptor = AES.new(key, mode)
    plain_text = cryptor.decrypt(a2b_base64(text))
    return bytes.decode(plain_text).rstrip('\0')


if __name__ == '__main__':
    e = aes_encrypt(
        '096c804b35856b8fba6097c47d45b66e,7cf61745e4dfd4f46d5a78c69a5342a1,061d21743c6e541a389dd88e7cbab070,300d3a330806646a014dbcd6c1882c32,200205ce904df6b587b7b700ca4cbda8'
    )  # 加密
    # d = decrypt(e) # 解密
    print("加密:", e)

    myAes = MyAES('MTY0MTI4NjgyMzUx')
    print(myAes.aes_encrypt_ecb('096c804b35856b8fba6097c47d45b66e,7cf61745e4dfd4f46d5a78c69a5342a1,061d21743c6e541a389dd88e7cbab070,300d3a330806646a014dbcd6c1882c32,200205ce904df6b587b7b700ca4cbda8', True))
    # print("解密:", d)
    # print(base64.b64encode(e.decode().encode("gb2312")))
