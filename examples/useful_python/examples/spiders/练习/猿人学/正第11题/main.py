import re

import execjs
import requests
from scrapy import Selector

cookies = {
    'sessionid': '9omdl2rt4tvysuefh92h3yli5cl04moq'
}

js_content = '''
function test(code){
    let document = {}
    setTimeout = function(){}
    document.attachEvent = function () {
    }
    document.addEventListener = function () {
    }
    let location = {}
    location.pathname = ''
    location.href = ''
    location.search = ''
    let temp = {
        firstChild : {
            href:'https://www.python-spider.com/'
        }
    }
    document.createElement = function(){return temp}
    eval(code)
    _N()
    return document.cookie
}
'''

ret = requests.get("https://www.python-spider.com/challenge/11", cookies=cookies)
text = ret.text
script = re.search(r'<script>(.*?)</script>', text)[1]
print(script)
# 调用js代码
ret = execjs.compile(js_content).call('test', script)
print(ret)
temp_cookies = ret.split(';')

for temp_cookie in temp_cookies:
    temp = temp_cookie.split('=')
    if temp[0] == '__jsl_clearance':
        cookies['__jsl_clearance'] = temp[1]

ret = requests.get("https://www.python-spider.com/challenge/11", cookies=cookies)
print(ret.text)
selector = Selector(text=ret.text)
tds = selector.xpath('//td[@class="info"]/text()').extract()
print(tds)
total = 0
for td in tds:
    td = td.strip()
    td = int(td)
    total += td
print(total)
