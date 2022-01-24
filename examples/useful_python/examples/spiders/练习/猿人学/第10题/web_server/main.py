import re

import requests
import uvicorn
from fastapi import FastAPI, responses, Request
from fastapi.templating import Jinja2Templates

# from fastapi.responses import HTMLResponse

app = FastAPI()
templates = Jinja2Templates(directory="./")


@app.get("/")
async def root():
    return {"message": "Hello World"}


def get_real_html_10():
    session = requests.Session()
    session.trust_env = False
    headers = {
        "accept-language": "zh-CN,zh;q=0.9",
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "user-agent": "yuanrenxue.project"
    }
    session.headers.update(headers)
    # 设置sessionid
    response1 = session.get('https://match.yuanrenxue.com/match/10')
    search_sessionid = re.search('sessionid=(.*?); ', response1.headers['Set-Cookie'])
    if search_sessionid:
        sessionid = search_sessionid.group(1)
    # print('sessionid', sessionid)
    enc_int = int(re.findall(r'yuanrenxue_59 *= *(\d+)', response1.text)[0])
    # print('enc_int', enc_int)
    return enc_int, sessionid


@app.get("/10", response_class=responses.HTMLResponse)
async def root(request: Request):
    f = open("10.html", 'r', encoding='utf8')
    html_content = f.read()
    enc_int, sessionid = get_real_html_10()
    response = templates.TemplateResponse("10.html",
                                      {"request": request, "yuanrenxue_59": enc_int,
                                       "mytitle": "mytitle"})
    response.set_cookie(key="sessionid", value=sessionid)
    return response
    # return responses.HTMLResponse(content=html_content, status_code=200)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)