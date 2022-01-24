import time

import requests

token = 'QVQwOjMuMDozLjA6MjQwOk5odUV3UUtYdnNsVE1kWmRrcnF1VUZpUzU5ckFWWENjeU0zOjcyMzg3OnEzN29l'
cookies_temp = {"version": "tough-cookie@2.5.0", "storeType": "MemoryCookieStore",
                "rejectPublicSuffixes": True, "cookies": [
        {"key": "JSESSIONID", "value": "4A8E463E2A80040A1A375449437817B5.prdaccounts-76",
         "domain": "signin.ea.com", "path": "/p", "secure": True, "httpOnly": True,
         "extensions": ["SameSite=None"], "hostOnly": True,
         "creation": "2022-01-14T02:22:09.119Z",
         "lastAccessed": "2022-01-14T02:22:09.456Z"},
        {"key": "signin-cookie", "value": "\"4599d77f84cbaf82\"", "domain": "signin.ea.com",
         "path": "/", "secure": True, "httpOnly": True, "extensions": ["SameSite=None"],
         "hostOnly": True, "creation": "2022-01-14T02:22:09.119Z",
         "lastAccessed": "2022-01-14T02:22:09.456Z"},
        {"key": "weblastlogin", "value": "weblbeooid",
         "expires": "2022-01-21T02:22:08.000Z", "maxAge": 604800, "domain": "signin.ea.com",
         "path": "/", "secure": True, "httpOnly": True, "extensions": ["SameSite=None"],
         "hostOnly": True, "creation": "2022-01-14T02:22:09.941Z",
         "lastAccessed": "2022-01-14T02:22:09.941Z"},
        {"key": "webun", "value": "josiahtabby@Gmail.com",
         "expires": "2022-01-21T02:22:08.000Z", "maxAge": 604800, "domain": "signin.ea.com",
         "path": "/", "secure": True, "httpOnly": True, "extensions": ["SameSite=None"],
         "hostOnly": True, "creation": "2022-01-14T02:22:09.941Z",
         "lastAccessed": "2022-01-14T02:22:09.941Z"},
        {"key": "_nx_mpcid", "value": "e50a75c4-0488-4a45-bd6e-2d6f68f8fa57",
         "expires": "2026-12-19T02:22:08.000Z", "maxAge": 155520000, "domain": "ea.com",
         "path": "/", "secure": True, "httpOnly": True, "extensions": ["SameSite=None"],
         "hostOnly": False, "creation": "2022-01-14T02:22:09.942Z",
         "lastAccessed": "2022-01-14T02:22:11.273Z"}, {"key": "sid",
                                                       "value": "U1djMFZaUzY3WnpVbzcwRXNGUzE1THhkaTl1bU9OdGdWbVVpcER2Y25qZFd6Nzd5YXNaSk8yODNQam40Uw.C7Ri3jfYBLeJTpgof3LFluoQMawcplt_Ig3pVDLhOgw",
                                                       "domain": "accounts.ea.com",
                                                       "path": "/connect", "secure": True,
                                                       "httpOnly": True,
                                                       "extensions": ["SameSite=None"],
                                                       "hostOnly": True,
                                                       "creation": "2022-01-14T02:22:10.279Z",
                                                       "lastAccessed": "2022-01-14T02:22:11.634Z"},
        {"key": "AWSELB",
         "value": "2FAFF949026E69DC0DC19203AA11597BE14F279F4F5AF437A6915B39BA43F1E8888131D14B00616EC4A03519E4011EF9A8923E4760653F84F2BAEFFA7655FA3FE8666679A4",
         "domain": "www.origin.com", "path": "/", "hostOnly": True,
         "creation": "2022-01-14T02:22:11.268Z",
         "lastAccessed": "2022-01-14T02:22:11.268Z"}, {"key": "AWSELBCORS",
                                                       "value": "2FAFF949026E69DC0DC19203AA11597BE14F279F4F5AF437A6915B39BA43F1E8888131D14B00616EC4A03519E4011EF9A8923E4760653F84F2BAEFFA7655FA3FE8666679A4",
                                                       "domain": "www.origin.com",
                                                       "path": "/", "secure": True,
                                                       "extensions": ["SAMESITE=None"],
                                                       "hostOnly": True,
                                                       "creation": "2022-01-14T02:22:11.268Z",
                                                       "lastAccessed": "2022-01-14T02:22:11.268Z"},
        {"key": "ak_bmsc",
         "value": "3DC89D582392D1294B4928CCF180220A~000000000000000000000000000000~YAAQnIzZF8pM3rV9AQAAS3BkVg7qo+OgCPMv/yVXyQDQmG0x8NDCdHUKiboShSUnNHep36gCAl9nZmCy7Nl7h9HdjsTRyRprhd6Ric3F5sEYvL7xue9dzDsHMQiL1eT1JgAout5jduu97kxobArtnzsDIxwaMY8xwZWXr1C57KvTN/S3o4kBnoNXRyKuuFo9O1bvFRnzqHz+Nvp4seJSSnCz1sS9myMRb6VbVI2Ij4c8KA33OUYovKQ47Lic8bj/You9ez4LFzQNbCDa+3p8PIJ36e2WAJ7MefD5v03jhAxMiiUQMOxpXipYDSfkkhZcwPdGJgsdVX/zZtdvqSvToCpTWSF1x2DyURUCxJCzVEV6za8+5cSijF+GAtU=",
         "expires": "2022-01-14T04:22:09.000Z", "maxAge": 7200, "domain": "origin.com",
         "path": "/", "httpOnly": True, "hostOnly": False,
         "creation": "2022-01-14T02:22:11.268Z",
         "lastAccessed": "2022-01-14T02:22:11.268Z"}]}
currencyCode = 'ARS'
countryCode = 'AR'
offerId = 'OFB-EAST:109552299'

json_cookies = cookies_temp.get("cookies")
cookies = {}
# for temp in json_cookies:
#     cookies[temp.get("key")] = temp.get("value")
cookies = {
    # 'JSESSIONID': 'CDC680591D96A00C541CE8C038B57622.prdlockboxv5-6',
    # "_nx_mpcid": '10a96aa6-ba40-426e-a60b-f129fc68eeba',
    # 'checkout-cookie': '"8213109b229eb449"',
    'sid': 'U3VxV0xLaVpadG83ejJrN0pyZ2NkREpvSklKWFV1eHBvbEhCRjRpRlY1OU9Dck1VTDdrSGZBUTA1Nkl3VA.hVFmBLtBPnYlHT1529K4kNA-P_83h2le0OZcc6BWT40; remid=TUU6dUllVkpTUjI1WFlUUWU4aVJ1OTVlRUVSd0lTTnBVRVVMQlVWQXR6VDowMTE0NzIzODc.sjKOOKtWg2e6294Ug19vck8LsPBt5tn86dqcRzjs'

    # 's_txn':'U1Q6ZDhRT1FyQ2RuVEhGRjFYSFY3TG06MzA'
}

session = requests.session()
# session.cookies = requests.utils.cookiejar_from_dict(cookies)

proxies = {
    'http': 'http://127.0.0.1:8888',
    'https': 'http://127.0.0.1:8888',
}


def card2():
    cur_time = int(time.time() * 1000)
    url = f'https://gateway.ea.com/proxy/commerce/carts2/store-cart-purchase-{cur_time}/offerEntries?storeId=Store-Origin&currencyCode={currencyCode}&countryCode={countryCode}&needFullCartInfo=true&needClearCart=true'
    url = f'https://gateway.ea.com/proxy/commerce/carts2/store-cart-purchase-{cur_time}/offerEntries'
    cards2_params = {
        "storeId": 'Store-Origin',
        "currencyCode": currencyCode,
        "countryCode": countryCode,
        "needFullCartInfo": True,
        "needClearCart": True,
    }
    cards2_headers = {
        "Host": 'gateway.ea.com',
        "Connection": 'keep-alive',
        "Content-Length": '131',
        'Nucleus-RequestorId': 'Ebisu-Platform',
        'sec-ch-ua-mobile': '?0',
        'Authorization': 'Bearer ' + token,
        'X-CART-REQUESTORID': 'Ebisu-Platform',
        'Content-Type': 'text/plain;charset=UTF-8',
        'accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36 Edg/97.0.1072.55',
        'sec-ch-ua': '" Not;A Brand";v="99", "Microsoft Edge";v="97", "Chromium";v="97"',
        'sec-ch-ua-platform': "Windows",
        'client_id': 'ORIGIN_JS_SDK',
        'Origin': 'https://www.origin.com',
        'Sec-Fetch-Site': 'cross-site',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://www.origin.com/',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    }

    data = {
        "offers": {
            "offer": [
                {"offerId": offerId, "quantity": 1},
            ],
        },
        "bundleType": "NONE_BUNDLE",
        "bundlePromotionRuleId": "",
    }

    # session.get()
    ret = session.post(url=url, params=cards2_params, headers=cards2_headers, json=data,
                       proxies=proxies, verify=False)

    print(ret.text)
    return ret.json()


def checkoutCart(cartName):
    url = 'https://checkout.ea.com/checkout/origin'
    params = {
        'gameId': 'originX',
        'cartName': f"{cartName}",
        'locale': 'zh_TW',
        'currency': currencyCode,
        'countryCode': countryCode,
        'invoiceSource': f'ORIGIN-STORE-CLIENT-{countryCode}',
    }
    # headers = {
    #     'cookie': f"_nx_mpcid={cookies['_nx_mpcid']}"
    # }
    headers = {
        'Connection': 'keep-alive',
        # 'Authorization': 'Bearer ' + token,
        'sec-ch-ua': '" Not;A Brand";v="99", "Microsoft Edge";v="97", "Chromium";v="97"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': 'Windows',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36 Edg/97.0.1072.55',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Sec-Fetch-Site': 'cross-site',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Dest': 'iframe',
        'Referer': 'https://www.origin.com/',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6"',
        # 'cookie': '_nx_mpcid=770a99e4-c6e2-4d85-9e5d-be27103c8469'
    }
    # ret = session.get(url, params=params, headers=headers, proxies=proxies, verify=False)
    # 第一个
    ret = session.get(url, params=params, headers=headers, proxies=proxies, verify=False,
                      allow_redirects=False)
    print(ret.headers.get("location"))
    url = ret.headers.get("location")
    # 第二个
    headers['Cookie'] = f'sid={cookies.get("sid")}'
    ret = session.get(url, params=params, headers=headers, proxies=proxies, verify=False,
                      allow_redirects=False)
    print(ret.headers.get("location"))
    url = ret.headers.get("location")
    headers.pop('Cookie')
    # headers['Cookie'] = f'checkout-cookie={cookies.get("checkout-cookie")}'
    # 第三个
    ret = session.get(url, params=params, headers=headers, proxies=proxies, verify=False,
                      allow_redirects=False)
    print(ret.headers.get("location"))
    url = ret.headers.get("location")
    # headers['Cookie'] = f'checkout-cookie={cookies.get("checkout-cookie")}'
    # 第四个
    ret = session.get(url, params=params, headers=headers, proxies=proxies, verify=False,
                      allow_redirects=False)
    print(ret.headers.get("location"))
    url = ret.headers.get("location")
    # headers.pop('Cookie')
    # 第五个
    ret = session.get(url, params=params, headers=headers, proxies=proxies, verify=False,
                      allow_redirects=False)

    print(session.cookies)
    return ret


card_info = card2()

cart_name = card_info.get("cartInfo").get("cartName")
checkoutCart(cart_name)

# def cookie_to_cookiejar(cookies: str):
#     if not hasattr(cookies, "startswith"):
#         raise TypeError
#     import requests
#     cookiejar = requests.utils.cookiejar_from_dict()
#     return cookiejar
#
# # 将 cookie 字符串转为 cookiejar 格式
# cookie = "BIDUPSID=E4981EF2384816CCD9C74884942F16AA; PSTM=1583307926"
# cookiejar = cookie_to_cookiejar(cookie)
# print(cookiejar)

# session.get("http://www.baidu.com")
# print(session.cookies)
# print(requests.utils.dict_from_cookiejar(session.cookies))
#
# print(requests.utils.cookiejar_from_dict(
#     {"BDORZ": 27315, "max-age": 86400, "domain": '.baidu.com', 'path': '/'}))
# print(dir(requests.utils))
