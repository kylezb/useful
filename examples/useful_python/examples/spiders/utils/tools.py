import hashlib
import os
import sqlite3
import urllib
from Crypto.Cipher import AES
from binascii import b2a_hex, a2b_hex, b2a_base64, a2b_base64


def get_cookie(host='.taobao.com'):
    from win32crypt import CryptUnprotectData
    cookiepath = os.environ['LOCALAPPDATA'] + r"\Google\Chrome\User Data\Default\Cookies"
    sql = "select host_key,name,encrypted_value from cookies where host_key='%s'" % host
    with sqlite3.connect(cookiepath) as conn:
        cu = conn.cursor()
        cookies = {name: CryptUnprotectData(encrypted_value)[1].decode() for
                   host_key, name, encrypted_value in
                   cu.execute(sql).fetchall()}
        # print(type(cookies))
        return cookies



def url_decoder(text):
    return urllib.parse.unquote(text, encoding='utf-8', errors='replace')


def url_encoder(text):
    return urllib.parse.quote(text, safe='/', encoding=None, errors=None)



def char_code_at(text):
    return ord(text)


def md5(text):
    md5_ed = hashlib.md5(text.encode('utf-8')).hexdigest()
    return md5_ed



class MyAES(object):
    def __init__(self, key):
        self.key = key.encode('utf-8')
        pass

    @staticmethod
    def add_to_16_zeros(text):
        if len(text.encode('utf-8')) % 16:
            add = 16 - (len(text.encode('utf-8')) % 16)
        else:
            add = 0
        text = text + ('\0' * add)
        return text.encode('utf-8')

    def aes_encrypt_ecb(self, text, is_ret_base64=False):
        mode = AES.MODE_ECB
        # text = self.add_to_16_zeros(text)
        cryptos = AES.new(self.key, mode)
        # cipher_text = cryptos.encrypt(text)
        # print(cipher_text)
        pad = lambda s: (s + (16 - len(s) % 16) * chr(
            16 - len(s) % 16))
        raw = pad(str(text))
        cipher_text = cryptos.encrypt(raw.encode('utf8'))
        if is_ret_base64:
            return b2a_base64(cipher_text).decode().strip()
        else:
            return b2a_hex(cipher_text).decode().strip()

    def aes_decode_ecb(self, text,is_base64=False):
        mode = AES.MODE_ECB
        cryptor = AES.new(self.key, mode)
        if is_base64:
            plain_text = cryptor.decrypt(a2b_base64(text))
        else:
            plain_text = cryptor.decrypt(a2b_hex(text))
        return bytes.decode(plain_text).rstrip('\0')
