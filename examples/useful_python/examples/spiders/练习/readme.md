
# 练习文件夹下有package.json



# 第1题

```text
简单js扣代码, 将扣出来的代码通过node 运行, 然后获取返回值
纯python代码
```

# 第2题

```text
类型: 动态cookie加密, 
概要: 加密cookie为m, 加密的地方为第一回请求的返回的script, script中有重写console.log, 直接扣取加密脚本运行. 
      
解决方法: 进行js运行环境的补充 + execjs 运行js
```

# 第3题

```text
类型: 访问逻辑和header顺序
概要: 访问真正的接口之前必须要访问一个特定的接口, 而且header必须要是一个固定的顺序
      
解决方法: 使用session进行header的顺序固定
```

# 第5题

```text
类型: cookie中的m参数和RM4hZBv0dDon443M参数加密
概要: 其中m参数直接采用扣代码的方式就可以弄出来, 不过m参数会生成5次, 每回生成需要的全局变量都不相同. 且生成5次的结果会组成一个字符串, 用于RM4hZBv0dDon443M参数的AES, ECB加密, 加密的密码为最后一回生成m的完整时间戳的base64, 然后取前16字节, 大概为MTY0MTI4NzkzMzUw. m参数最后取值为最后一次的生成, 注意填充的方式
    tips: 下回看到密码是MTY0MTI4NzkzMzUw类似的, 可以猜测是时间戳base64


解决方法: 模拟参数+aes ecb加密
```

# 第6题
```text

jsfuck jjencode aaencode
```



# 第10题
```text
概要: url中有个m的加密参数, 参考(https://github.com/skygongque/match-yuanrenxue/tree/master/match10)

加密参数m生成流程:
1. 首页html的加载https://match.yuanrenxue.com/match/10
2. 加载完首页会请求2个接口.
    /stati/mu/rsnkw2ksph : 该接口返回了一串js在首页的html中进行了解密, 然后eval, 重写的open函数就在该返回的类容中执行.
    /api/offset   : eval中执行的时候会有_yrxCxm['A' + 'c' + 'G' + 'e']的值的生成, 第一回的值是该接口返回的, 后续该值是通过每回接口请求生成的.
3. 发送请求的时候重写了xhr的open函数.

过debugger

Function.prototype.constructor_bak = Function.prototype.constructor
Function.prototype.constructor=function(x){
  if(x !== 'debugger'){
      return Function.prototype.constructor_bak(x)
  }
};
f_bak = Function
Function=function(x){
    console.log(x, 'function')
    if(x !== 'debugger'){
        return f_bak(a)
    }
}
setInterval=function(){}

eval_bak = eval
eval=function(x){
    debugger
    if(x !== 'debugger'){
        return eval_bak(x)
    }
    return ''
}

可以再脚本执行前将js注入(script断点)




其他分析和流程:
1. 通过重写eval函数, 在eval中加入断点, 可以很容易的找到接口返回的rsnkw2ksph数据转换成的eval代码
2. rsnkw2ksph接口返回的数据, 解密方法其实是每个字符串的ASCII依次减去一个值, 唯一需要注意的是, 这个值的生成和html返回的某个变量有关. 该题是yuanrenxue_59变量, 每回html页面该变量不同
3. 本地环境的搭建, 用于接口分析和固定的调试环境:
    1. 本地返回html, 注意, 需要同设置的cookie一并返回, 因为有些cookie会用于这回请求的其他接口数据. 代码的格式化也要注意下
    2. 执行的eval函数内容也可以替换一下
    3. 将ast代码的if else流程转换为switch, 在一些适当位置加上debugger断点进行调试, 这样每回进入的时候都可以断点住. eval函数的控制台的断点会在刷新后不存在.
    


等待研究的问题
将if转成switch

_yrxCxm[ // 值得第二回生成地方
Object.defineProperty(window, 'EBfC', {
    set: function(val){
        debugger
        console.log(val)
    }
})

set 函数如何正确返回?



```

# 第13题

```text
类型: 动态cookie  
概要: 没有cookie的时候请求返回的是一个脚本, 然后运行脚本cookie就被设置了  
解决方法: python + execjs运行js脚本  
```

# 第15题

```text
类型: wasm

```

# 第16题
```text
类型: js蜜罐, 扣出的代码运行结果不能使用

解决方法:
1. 破解控制台
    setInterval=()=>{}
2. 经过调试, 发现最终需要的加密的数组长度和浏览器中的不一样, 该数组是通过时间戳生成的.
3. 有时间戳类型的加密, 可能前端会有蜜罐, 将时间戳加密成不同的结果, 后端重新根据时间戳进行加密, 发现加密结果不一样.从而反爬
```

# 第19题
```text
类型: ja3指纹加密
通过特定库或浏览器请求的东西ja3指纹都是一定的, 通过修改CIPHERS可以修改该指纹
解决方法:
修改http请求指纹
1. 使用ja3adapter, 来每回都随机不同的指纹. 使用这个文件生成的指纹和浏览器的有一些差别, 太长
2. 或者可以设置requests.packages.urllib3.util.ssl_.DEFAULT_CIPHERS = 'ALL'
3. 人工配置加密套件https://support.huaweicloud.com/bestpractice-waf/waf_06_0012.html
```

# 正第1题 简单

```text
类型: 简单js混淆, 通过堆栈就可以找到加密地方, 然后控制台逆向, 后直接用python代码编写
概要: base64 + md5
解决方法: 纯python代码
```

# 正第2题 简单 补环境

```text
类型: 动态js加密
概要:获取页面的时候会有2次请求, 第一次请求没有cookie会返回一段script, 在返回的脚本中动态设置cookie.
解决方法: 这种情况可以打script断点, 进入生成cookie的地方.
         base64 + md5
         纯python代码
```

# 正第11题 简单 扣代码 补环境

```text
类型: 动态cookie加密  
概要: 获取页面的时候会有2次请求, 第一次请求没有cookie会返回一段script, 在这段script中有运行了一段eval函数  
解决方法: 真正设置cookie的方法在eval函数中, 而直接运行eval函数不会触发设置cookie的逻辑, 只有等到页面刷才会触发设置cookie逻辑, 所以需要找到设置cookie的方法, 然后手动调用, 该题是_N()函数
      还有就是运行环境的补充.  
      tips: 注意 try catch  
      tips:通过第一个请求在控制台拿到了一段脚本, 但是直接在控制台运行没有反应, 那是应为没有触发运行对应函数的条件.
      tips: 在控制台知道了eval的代码, 可以直接运行下, 这样可以将代码在vm中查看, 如果没有反应,可以添加些类容,让代码报错, 这样可以再vm中查看了
      
      
解决方法: 进行js运行环境的补充 + execjs 运行js
```



