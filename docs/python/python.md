[返回主目录](../../README.md)


- [1. 知识点总结](#1-知识点总结)
- [2. 常用库总结和技巧总结(如需实列，请跳转到具体页面查看)](#2-常用库总结和技巧总结如需实列请跳转到具体页面查看)
- [3. pyenv使用](#3-pyenv使用)
  - [3.1. 安装](#31-安装)
  - [3.2. pyenv-virtualenv插件安装](#32-pyenv-virtualenv插件安装)
  - [3.3. pyenv-virtualenv 使用](#33-pyenv-virtualenv-使用)
  - [3.4. 常用命令](#34-常用命令)
- [4. 简繁体转换 使用opencc 或者 opencc-python-reimplemented](#4-简繁体转换-使用opencc-或者-opencc-python-reimplemented)
  - [4.1. sys.stderr.write(f"ERROR: {exc}")](#41-sysstderrwriteferror-exc)
  - [4.2. _ctypes](#42-_ctypes)
  - [4.3. Could not build the ssl module!](#43-could-not-build-the-ssl-module)
- [5. requests 的一些用法](#5-requests-的一些用法)
  - [5.1. session的使用](#51-session的使用)
  - [5.2. 错误处理](#52-错误处理)

# 1. 知识点总结
* type 类型提示
```python
from typing import List, Dict
Vector = List[str]  # 类型提示的别名

def scale(scalar: float, vector: Vector, dic: Dict[str, int]) -> Vector:
    for item in vector:
        print(item.replace("", ""))  # 在有类型提示的情况下直接使用.符号ide可以知道该类型。
    print(scalar, vector, dic)
    return ["10", "20", "30"]


new_vector = scale(2.0, ["10", "20", "30"], {"a": 10})
```


# 2. 常用库总结和技巧总结(如需实列，请跳转到具体页面查看)
* [re正则模块总结](../../examples/useful_python/examples_jupyter/re.ipynb)
    * match     ：从开头匹配
    * search    ：在字符串中返回匹配的第一个结果
    * findall   ：匹配字符串的所用内容
    * sub       ：替换匹配的字符串(**代替的字符在前， 匹配的字符在后**)
    * 贪婪模式和非贪婪模式



* [mongo模块](../../examples/useful_python/examples_jupyter/mongo.ipynb)

* [selenium模块](../../examples/useful_python/examples_jupyter/selenium.ipynb)

* [excel模块](../../examples/useful_python/examples_jupyter/excel.ipynb)

* [一些技巧总结](../../examples/useful_python/examples_jupyter/tips.ipynb)
    * 下载文件，获取文件名，并保存。以下载百度文库举例
    
    * 显示base64图片
    ```
        # 显示图片
        import io
        from PIL import Image
        import base64
        im = Image.open(io.BytesIO(base64.b64decode("")))
        im.show()
    ```
    
    
* 进程的三中方式：
    * spawn：使用此方式启动的进程，只会执行和 target 参数或者 run() 方法相关的代码。Windows 平台只能使用此方法，事实上该平台默认使用的也是该启动方式。相比其他两种方式，此方式启动进程的效率最低。
    * fork：使用此方式启动的进程，基本等同于主进程（即主进程拥有的资源，该子进程全都有）。因此，该子进程会从创建位置起，和主进程一样执行程序中的代码。注意，此启动方式仅适用于 UNIX 平台，os.fork() 创建的进程就是采用此方式启动的。
    *  forserver：使用此方式，程序将会启动一个服务器进程。即当程序每次请求启动新进程时，父进程都会连接到该服务器进程，请求由服务器进程来创建新进程。通过这种方式启动的进程不需要从父进程继承资源。注意，此启动方式只在 UNIX 平台上有效。
    


# 3. pyenv使用
## 3.1. 安装
```
    1.安装环境
    ubuntu:
    sudo apt-get update; sudo apt-get install --no-install-recommends make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev

    centos:
    yum install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel -y
    yum install libffi-devel -y
    
    $ sudo yum install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel 


    2.输入命令:
    git clone https://github.com/pyenv/pyenv.git ~/.pyenv


    3.加入环境:
    echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
    echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
    echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.bashrc
    source ~/.bashrc
    exec "$SHELL"
```
## 3.2. pyenv-virtualenv插件安装
```
    git clone git://github.com/yyuu/pyenv-virtualenv.git ~/pyenv/plugins/pyenv-virtualenv
    或者：git clone https://github.com/yyuu/pyenv-virtualenv.git ~/.pyenv/plugins/pyenv-virtualenv
    echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.bash_profile
    source ~/.bash_profile
```
## 3.3. pyenv-virtualenv 使用
```
    pyenv virtualenv 版本号 name   创建一个虚拟环境,命名为name 创建好后可通过pyenv versions来查看
    pyenv activate name  切换到name虚拟环境中
    pyenv deactivate   推出虚拟环境
    pyenv virtualenv-delete name 删除name环境
    
    window下激活python虚拟环境:
    Set-ExecutionPolicy RemoteSigned
```
## 3.4. 常用命令
```
    1.安装特定版本 
        * 使用代理需要先设置 export PYTHON_CONFIGURE_OPTS="--disable-ipv6"
        * proxychains pyenv install 3.8.5
```
    


# 4. 简繁体转换 使用opencc 或者 opencc-python-reimplemented
```
    pip install opencc-python-reimplemented
    https://pypi.org/project/opencc-python-reimplemented/
```


**# 常见错误
## 4.1. sys.stderr.write(f"ERROR: {exc}")
```
   python2升级pip后报错：
   解决：sudo easy_install pip==20.3.4
```

## 4.2. _ctypes
```
CentOS7 编译时出现
Failed to build these modules:
_ctypes
安装libffi-devel依赖包即可: yum install libffi-devel
```

## 4.3. Could not build the ssl module!
```
1. 下载ssl 模块: https://www.openssl.org/source/  或者直接yum install openssl
2. yum install openssl-devel
```


# 5. requests 的一些用法
## 5.1. session的使用
```text
session = requests.Session()
session.headers.update(headers)
```

## 5.2. 错误处理
```
1. Error--requests.exceptions.ProxyError: 该报错为系统代理原因. 手动设置代理, 或者如下设置都可以
session.trust_env = False
```

    
[返回上一级](../../README.md)
