[返回上一级](../../README.md)

- [1. 搜索关键字](#1-搜索关键字)
  - [1.1. 通过以jquery为关键字搜索](#11-通过以jquery为关键字搜索)
  - [1.2. 查找拦截器(用户发送请求和接受请求时候的http处理)](#12-查找拦截器用户发送请求和接受请求时候的http处理)
  - [1.3. 对于某些变量赋值搜索不到的，很可能是该赋值是在加密代码中。](#13-对于某些变量赋值搜索不到的很可能是该赋值是在加密代码中)
- [2. 加密总结](#2-加密总结)
  - [2.1. RSA加密](#21-rsa加密)
- [3. 无限debugger](#3-无限debugger)
  - [3.1. 直接添加条件跳过(右键 never pause here)](#31-直接添加条件跳过右键-never-pause-here)
  - [3.2. 直接在控制台中将函数设置为空函数](#32-直接在控制台中将函数设置为空函数)
  - [3.3. 一些常用过debugger脚本](#33-一些常用过debugger脚本)
  - [3.4. 在控制台的定义的函数也可debugger](#34-在控制台的定义的函数也可debugger)
- [4. nodejs](#4-nodejs)
  - [4.1. nodejs 和 浏览器环境区别](#41-nodejs-和-浏览器环境区别)
  - [4.2. python 中调用nodejs文件](#42-python-中调用nodejs文件)
- [5. 变量生成的hook](#5-变量生成的hook)
  - [5.1. 简单的直接通过油候脚本hook](#51-简单的直接通过油候脚本hook)
  - [5.2. 5.2.函数的基本hook](#52-52函数的基本hook)
  - [5.3. 对象的hook](#53-对象的hook)
  - [5.4. 原型函数的hook](#54-原型函数的hook)
  - [5.5. Object.defineProperty在网站中定义了一次后, 后续就无法在定义,](#55-objectdefineproperty在网站中定义了一次后-后续就无法在定义)
- [6. 过程记录](#6-过程记录)
  - [6.1. F12，右键反调试](#61-f12右键反调试)
- [7. chrome 中技巧](#7-chrome-中技巧)
  - [7.1. 可以在dom元素上打断点](#71-可以在dom元素上打断点)
  - [7.2. 在控制台打印的东西可以直接定位到](#72-在控制台打印的东西可以直接定位到)
- [8. 模拟登陆相关知识](#8-模拟登陆相关知识)
  - [8.1. 模拟登陆检测网站](#81-模拟登陆检测网站)
- [9. 自执行函数(定义完成后就马上调)](#9-自执行函数定义完成后就马上调)
- [10. call 和 apply](#10-call-和-apply)
- [11. 扣代码心得](#11-扣代码心得)
- [12. webpack](#12-webpack)
  - [12.1. 特征标识](#121-特征标识)
  - [12.2. bota函数定义](#122-bota函数定义)
  - [12.3. 如何扣代码](#123-如何扣代码)
- [13. 一些函数使用](#13-一些函数使用)
  - [13.1. 数组解码](#131-数组解码)
- [14. 错误记录](#14-错误记录)
  - [14.1. execjs报错 UnicodeEncodeError: 'gbk' codec can't encode character](#141-execjs报错-unicodeencodeerror-gbk-codec-cant-encode-character)

# 1. 搜索关键字

## 1.1. 通过以jquery为关键字搜索

```
$("#输入框的id")
$(".输入框的classname")
```

## 1.2. 查找拦截器(用户发送请求和接受请求时候的http处理)

```
    # axios的拦截器
    axios.interceptors
    # 还有其他库的拦截器
```

## 1.3. 对于某些变量赋值搜索不到的，很可能是该赋值是在加密代码中。

```
1. 对于有base64加密的地方，解密后，看变量赋值是不是在其中
2. 对于window.f像这类的赋值，可能被混淆成window['f']或其他
```

# 2. 加密总结

## 2.1. RSA加密

* 一般的rsa加密通常会先声明一个rsa对象
* 本地使用公钥加密即public key
* 通常有Encrypt关键字
* 加密后字符长度为128位或256位

# 3. 无限debugger

## 3.1. 直接添加条件跳过(右键 never pause here)

## 3.2. 直接在控制台中将函数设置为空函数

```
  function tt(){}
  重写之后，点击X关闭f12窗口（切记不要刷新页面，因为刷新的话相当于重新加载一遍，刚才的重写函数也就没了意义），关闭之后再重新打开f12
```

## 3.3. 一些常用过debugger脚本

```javascript



// 将constructor函数设置为空
Function.prototype.constructor_bak = Function.prototype.constructor
Function.prototype.constructor=function(x){
  if(x !== 'debugger'){
      return Function.prototype.constructor_bak(x)
  }
};

// Function 函数清空
f_bak = Function
Function=function(x){
    console.log(x, 'function')
    if(x !== 'debugger'){
        return f_bak(a)
    }
}

// eval执行debugger检测
eval_bak = eval
eval=function(x){
    if(x !== 'debugger'){
        return eval_bak(x)
    }
    return ''
}

// 定时函数清空
setInterval=function(){}



```
## 3.4. 在控制台的定义的函数也可debugger
```js
a = function(){
    debugger
    console.log('a')
}
```

# 4. nodejs

## 4.1. nodejs 和 浏览器环境区别

```
1. 内置对象不同
    浏览器环境中提供了 window 全局对象
    NodeJS 环境中的全局对象不叫 window , 叫 global
2. this 默认指向不同
    浏览器环境中全局this默认指向 window
    NodeJS 环境中全局this默认指向空对象 {}
3. API 不同
    浏览器环境中提供了操作节点的 DOM 相关 API 和操作浏览器的 BOM 相关 API
    NodeJS 环境中没有 HTML 节点也没有浏览器, 所以 NodeJS 环境中没有 DOM / BOM
```

## 4.2. python 中调用nodejs文件

```
  1. 直接使用管道的方式，其中decode.js中有console.log，然后python读取打印出来的值即可。
      nodejs = os.popen('node decode.js ' + ts + '000')
      m = nodejs.read().replace('\n', '') + '丨' + ts
      nodejs.close()
```

# 5. 变量生成的hook

## 5.1. 简单的直接通过油候脚本hook

## 5.2. 5.2.函数的基本hook
```js
old_fun = func
func = function(argument){
    mytask
    return old_fun.apply(argument)
}
func.prototype = ... // 需要修改一些函数的原型, 比如toString, 等 防止检测
```
## 5.3. 对象的hook
```js
old_attr = obj.attr
Object.defineProperty(obj, 'attr', {
    get: function(){
        return old_attr
    },
    set: function(val){
        return ...
    },
}) 
```
## 5.4. 原型函数的hook
```js
let a = '1234'
String.prototype.split_old = String.prototype.split
String.prototype.split = function(val){
     debugger   
     return String.prototype.split_old(val)
}
a.split('2')
```
## 5.5. Object.defineProperty在网站中定义了一次后, 后续就无法在定义,

# 6. 过程记录

## 6.1. F12，右键反调试

```
  https://www.aqistudy.cn/historydata/daydata.php?city=%E5%B9%BF%E5%B7%9E&month=202008
  右键可用chrome插件恢复
  1. 在network中点击对应的请求然后右键（Save for Overrides），重写页面文件，保存在source->Overrides中。（需要提前在Overrides中新建一个目录，不然请求右键不会有Save for Overrides
  2. 保存后刷新页面即可看到请求，如果没有多试下其他页面
  3. 然后就是找到ajax的发送和success回调的地方完成解密
```

# 7. chrome 中技巧

## 7.1. 可以在dom元素上打断点
## 7.2. 在控制台打印的东西可以直接定位到

* 7.1. 在控制台输入copy(变量)，可以直接复制变量。
* Network中Initiator可以查看发请求的流程，可通过该流程定位打断点。
* 常用函数翻译
```js
function btoa(str) {
  if (Buffer.byteLength(str) !== str.length)
    throw new Error('bad string!');
  return Buffer(str, 'binary').toString('base64');
}

function atob(str) {
    return Buffer.from(str, `base64`).toString(`binary`)
}
```

# 8. 模拟登陆相关知识

## 8.1. [模拟登陆检测网站](https://bot.sannysoft.com/)

# 9. 自执行函数(定义完成后就马上调)

```
  !function () { /* ... */ }();
  ~function () { /* ... */ }();
  -function () { /* ... */ }();
  +function () { /* ... */ }();
  void function () { /* ... */ }();
  (function (){/*...*/}());
  (function (){/*...*/})();
```


# 10. call 和 apply
```text
第一个参数是this, 修改接下来运行环境的this
apply的第二个参数是数组, call是常规的用逗号分割开来的.
```


# 11. 扣代码心得
```javascript
1. 遇到如果函数没有传参数的直接使用返回值看看. (可以将值替换到源码中看运行结果)
2. 注意try catch, 或者一些条件分支的地方, 防止蜜罐和内存爆破
3. 注意delete的地方, 防止window这些变量被删除
4. 扣代码的时候最好取运行时的数据, 比如有个初始化定义的数组, 在运行中改变了, 扣代码的时候扣的是初始化的时候, 就会有问题.

```




# 12. webpack

## 12.1. 特征标识
```js
// webpack的加载器, 一般在自执行函数中, 加载器的后边一般是加载模块
function n(r) {
    if (t[r])
        return t[r].exports;
    var i = t[r] = {
        exports: {}
    };
    return e[r].call(i.exports, i, i.exports, n),
        i.exports
}

// 加载模块
var e = {
    454: ()=>{},
    772: ()=>{},
}
// 或者加载模块是个数组
var e = [函数1, 函数2]
```

## 12.2. bota函数定义
```js
window.btoa = window.btoa ? window.btoa : function btoa(str) {
    var buffer;
    if (str instanceof Buffer) {
        buffer = str;
    } else {
        buffer = Buffer.from(str.toString(), 'binary');
    }
    return buffer.toString('base64');
}

```
## 12.3. 如何扣代码
```
一般是将加载器抠出来, 然后加载的模块缺啥补啥
```

# 13. 一些函数使用
## 13.1. 数组解码
```js
let utf8decoder = new TextDecoder(); // default 'utf-8' or 'utf8'

let u8arr = new Uint8Array([240, 160, 174, 183]);
let i8arr = new Int8Array([-16, -96, -82, -73]);
let u16arr = new Uint16Array([41200, 47022]);
let i16arr = new Int16Array([-24336, -18514]);
let i32arr = new Int32Array([-1213292304]);

console.log(utf8decoder.decode(u8arr));
console.log(utf8decoder.decode(i8arr));
console.log(utf8decoder.decode(u16arr));
console.log(utf8decoder.decode(i16arr));
console.log(utf8decoder.decode(i32arr));
```

# 14. 错误记录
## 14.1. execjs报错 UnicodeEncodeError: 'gbk' codec can't encode character
```javascript
// 将文件的打开编码重新定义下
import subprocess
from functools import partial
subprocess.Popen = partial(subprocess.Popen, encoding="utf-8")
import execjs
```
