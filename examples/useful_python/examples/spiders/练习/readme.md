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
# 第10题
```text


过debugger 重写setInterval
setInterval_back = setInterval
setInterval = function (a, b){
    if(a.toString('yuanrenxue_161') < 0){
        setInterval_back(a, b)
    }
}



```

# 第13题

```text
类型: 动态cookie  
概要: 没有cookie的时候请求返回的是一个脚本, 然后运行脚本cookie就被设置了  
解决方法: python + execjs运行js脚本  
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



