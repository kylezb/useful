[返回主目录](../../README.md)

- [1. js对象拷贝](#1-js对象拷贝)
- [2. 数组遍历：](#2-数组遍历)
- [3. Array:](#3-array)
- [4. 正则的使用](#4-正则的使用)
  - [exec 正则提取字符串](#exec-正则提取字符串)
- [5. Js中读取Json文件](#5-js中读取json文件)
- [6. 对象转换为Json字符串，和Json字符串转换成js对象](#6-对象转换为json字符串和json字符串转换成js对象)
- [7. 数组去重](#7-数组去重)
- [8. 读取本地文件](#8-读取本地文件)
- [9. 方括号 和花括号[], {}](#9-方括号-和花括号-)
- [10. async await Promise](#10-async-await-promise)
  - [10.1. 参考资料](#101-参考资料)
  - [10.2. async 是一个修饰符，async 定义的函数会默认的返回一个Promise对象resolve的值，因此对async函数可以直接进行then操作,返回的值即为then方法的传入函数](#102-async-是一个修饰符async-定义的函数会默认的返回一个promise对象resolve的值因此对async函数可以直接进行then操作返回的值即为then方法的传入函数)
  - [10.3. await 关键字 只能放在 async 函数内部， await关键字的作用 就是获取 Promise中返回的内容， 获取的是Promise函数中resolve或者reject的值, 等待异步函数的执行结果。](#103-await-关键字-只能放在-async-函数内部-await关键字的作用-就是获取-promise中返回的内容-获取的是promise函数中resolve或者reject的值-等待异步函数的执行结果)
  - [10.4. Promise中的Promise,这时p1的状态决定p2的状态](#104-promise中的promise这时p1的状态决定p2的状态)
  - [10.5. resolve后面的函数还会执行，resolve加上return，后面的不会再执行](#105-resolve后面的函数还会执行resolve加上return后面的不会再执行)
  - [10.6. then方法返回的是一个新的Promise实例，因此可以采用链式方法。 第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。](#106-then方法返回的是一个新的promise实例因此可以采用链式方法-第一个回调函数完成以后会将返回结果作为参数传入第二个回调函数)
  - [10.7. async/await Promise 被抛出的异步异常无法捕获](#107-asyncawait-promise-被抛出的异步异常无法捕获)
- [11. yield 一个Generator函数与普通function的区别就是函数名前面多了一个星号 * 但是执行时有很大不同，与yield命令配合，可以实现暂停执行的功能](#11-yield-一个generator函数与普通function的区别就是函数名前面多了一个星号--但是执行时有很大不同与yield命令配合可以实现暂停执行的功能)
- [12. flat(), map(), flatmap()](#12-flat-map-flatmap)
- [13. arguments 类数组](#13-arguments-类数组)
- [14. 对象的一些操作](#14-对象的一些操作)
  - [14.1. hasOwnProperty(判断自身属性与继承属性)](#141-hasownproperty判断自身属性与继承属性)
- [15. 随机数 m-n的随机数，不包括n](#15-随机数-m-n的随机数不包括n)
- [16. 常用函数](#16-常用函数)
  - [16.1. encodeURIComponent(***) 用于url的加密](#161-encodeuricomponent-用于url的加密)
  - [16.2.](#162)
- [sleep 等待5s](#sleep-等待5s)


# 1. js对象拷贝  
    浅拷贝： 
    ```js
    <!-- Object.assign -->
    var obj = { foo: "foo", bar: "bar" };
    var copy = Object.assign({}, obj);
    <!-- ... -->
    var obj = { foo: "foo", bar: "bar" };
    var copy = { ...obj };
    ```
    深拷贝：
    ```js
    <!-- 这个方法只在对象包含可序列化值，并且没有循环引用的时候有用。其中一个不可序列化的类型的就是日期对象 - 尽管它显示出来是字符串化的ISO格式,JSON.parse只会把它解析成为一个字符串,而不是日期类型 -->
    var obj = { a: 0, b: { c: 0 } };
    var copy = JSON.parse(JSON.stringify(obj));


    <!-- 自定义深度拷贝 -->
    function deepClone(obj) {
        var copy;
        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;
        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length;
                i < len;
                i++) {
                copy[i] = deepClone(obj[i]);
            }
            return copy;
        }

        // Handle Function
        if (obj instanceof Function) {
            copy = function () {
                return obj.apply(this, arguments);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = deepClone(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj as type isn't supported " + obj.constructor.name);
    }

    ```
#  2. 数组遍历：  
    ```javascript
    a = [1,2,3,4];
    b = a.map((item, index) => {
     return item+1
    });
  
    //结果 b = [2,3,4,5]
    ```
    
#  3. Array:  

    *  Array.from(arrayLike[, mapFunction[, thisArg]])  
        * arrayLike：必传参数，想要转换成数组的伪数组对象或可迭代对象。  
        * mapFunction：可选参数，mapFunction(item，index){…} 是在集合中的每个项目上调用的函数。返回的值将插入到新集合中。  
        * thisArg：可选参数，执行回调函数 mapFunction 时 this 对象。这个参数很少使用  
        
        
    ``` javascript
    
    
    //浅拷贝一个数组
    const numbers = [3, 6, 9];
    const numbersCopy = Array.from(numbers);
    
    numbers === numbersCopy; // => false
    
    
    //使用值填充数组
    const length = 3;
    const init   = 0;
    const result = Array.from({ length }, () => init);
    
    result; // => [0, 0, 0]

    const length = 3;
    
    // 使用对象填充数组(fill() 方法创建的 resultB 使用相同的空对象实例进行初始化。不会跳过空项。)
    const resultA = Array.from({ length }, () => ({}));
    const resultB = Array(length).fill({});
    
    resultA; // => [{}, {}, {}]
    resultB; // => [{}, {}, {}]
    
    resultA[0] === resultA[1]; // => false
    resultB[0] === resultB[1]; // => true


    //map() 方法会跳过空项
    const length = 3;
    const init   = 0;
    const result = Array(length).map(() => init);
    result; // => [undefined, undefined, undefined]
    ```
    
# 4. 正则的使用  
    * 主要函数有match、test、exec、search、split、replace
    * pattern组成为:\正则\匹配模式  
    * 匹配模式如下：    
        * i:执行对大小写不敏感的匹配  
        * g:执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。  
        * m:执行多行匹配。  
    * 注意：多行匹配和匹配换行是2个东西
    ```
  
      var content = '<a href="javascript:void(0);" id="js_name">\n\rCSDN              \n       </a>';
  
      var author = content.match(/"js_name">\s+(.*?)\s*</mi);
      if(author !== null){
       console.log(author[1])
      }
      
    ```
## exec 正则提取字符串
```
    * 使用指定的正则表达式模式去字符串中查找匹配项，并以数组形式返回，如果未查找到则返回null
    * 原型：regExp.exec(stringObj)
    
    exmaple:
        let a = "http://127.0.0.1:8080"
        // let a = "http:adsfadsdf"
        let pattern = /\/\/(.*?):/
        let ret = pattern.exec(a)
        if(ret){
            console.log(ret)
        }
        // 如果有值得话直接用数组下标进行访问
        ret[0] ret[1]

    output:
        [
            '//127.0.0.1:',
            '127.0.0.1',
            index: 5,
            input: 'http://127.0.0.1:8080',
            groups: undefined
        ]


```

  
# 5. Js中读取Json文件
    ```
    var fs  = require("fs")

    //异步的方式读取
    fs.readFile('./data.json',function(err,data){
        if(err){
            return console.error(err);
        }
        var companys = data.toString();//将二进制的数据转换为字符串
        companys = JSON.parse(companys);//将字符串转换为json对象
        
        console.log("***", companys)
        
    })
    
    
    //同步的方式读取
    var companys = JSON.parse(fs.readFileSync('./data.json'))
    
    console.log(companys)
    ```
  
  
# 6. 对象转换为Json字符串，和Json字符串转换成js对象
    * JOSN.stringify()
    * JSON.parse()
    
    

# 7. 数组去重
```
    Array.from( new Set(data.map( d => d['日期']) )); 
```

# 8. 读取本地文件
```

    # html中使用
    function load(name) {
        let xhr = new XMLHttpRequest(),
            okStatus = document.location.protocol === "file:" ? 0 : 200;
        xhr.open('GET', name, false);
        xhr.overrideMimeType("text/html;charset=utf-8");//默认为utf-8
        xhr.send(null);
        return xhr.status === okStatus ? xhr.responseText : null;
    }

    let text = load("test.txt");
```

# 9. 方括号 和花括号[], {}
```
    用于解析对应数组或字典中的数据
    a = [2,3,4]
    b = {"t":10, "d":20}

    const {d} = b;
    const [e,f] = a
    const [,g] = a
    console.log(d, e, f)

    # 输出
    20, 2, 3
    
```

# 10. async await Promise
## 10.1. 参考资料
```
    https://juejin.im/post/6868138778306412552
    https://juejin.im/post/6844904180096712711
```
## 10.2. async 是一个修饰符，async 定义的函数会默认的返回一个Promise对象resolve的值，因此对async函数可以直接进行then操作,返回的值即为then方法的传入函数
```
    async function fun0() {
        console.log(1)
        return 1
    }
    fun0().then( x => { console.log(x) })  //  输出结果 1， 1，


    1.内置执行器
    2.async函数返回的是 Promise 对象,Promise可以作为await命令的参数
    3.比起星号和yield，更好的语义
    4.await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）
    5.await必须写在async函数中
    6.async函数内部return语句返回的值，会成为then方法回调函数的参数。
```
## 10.3. await 关键字 只能放在 async 函数内部， await关键字的作用 就是获取 Promise中返回的内容， 获取的是Promise函数中resolve或者reject的值, 等待异步函数的执行结果。
```
    const bbb = function(){ return 'string'}

    async function funAsy() {
       const a = await 1
       const b = await new Promise((resolve, reject)=>{
            setTimeout(function(){
               resolve('time')
            }, 3000)
       })
       const c = await bbb()
       console.log(a, b, c)
    }
    
    funAsy() //  运行结果是 3秒钟之后 ，输出 1， time , string,
```
## 10.4. Promise中的Promise,这时p1的状态决定p2的状态
```
    const p1 = new Promise(function (resolve, reject) {
        setTimeout(() => reject(new Error('fail')), 3000)
    })

    const p2 = new Promise(function (resolve, reject) {
        setTimeout(() => resolve(p1), 1000)
    })

    p2.then(result => console.log('success', result)).catch(error => console.log('error',error))
```
## 10.5. resolve后面的函数还会执行，resolve加上return，后面的不会再执行
```
    new Promise((resolve, reject) => {
        resolve(1); //如果是return resolve(1) 下面的打印不会执行
        console.log(2);
    }).then(r => {
        console.log(r);
    });
    // 2
    // 1

```
## 10.6. then方法返回的是一个新的Promise实例，因此可以采用链式方法。 第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。

## 10.7. async/await Promise 被抛出的异步异常无法捕获
```
    比如如下异常在一般的catch中无法捕获，可在全局中捕获
    let asyncError = () => {
        setTimeout(function () {
            throw new Error('Async Error')
    }, 100)
}
```


# 11. yield 一个Generator函数与普通function的区别就是函数名前面多了一个星号 * 但是执行时有很大不同，与yield命令配合，可以实现暂停执行的功能
```
    let go = function*(x) {
      console.log('x', x);
      let a = yield x;
      console.log('xx', x);

      console.log('a', a);

      let b = yield (x + 1) + a;

      yield a + b;

      console.log('a + b =', a + b);

      return a + b;
    }
    go(10);
    let g = go(10);
    console.log(g.next());
    console.log(g.next(1000).value);
    console.log(g.next(50));
    console.log(g.next(8));
    console.log(g.next(8));

    # 结果
    x 10
    { value: 10, done: false }
    xx 10
    a 1000
    1011
    { value: 1050, done: false }
    a + b = 1050
    { value: 1050, done: true }
    { value: undefined, done: true }
```


# 12. flat(), map(), flatmap()
```
    // map() 对于每个元素返回新的处理
    const nestedArraysOhMy = [ "a", ["b", "c"], ["d", ["e", "f"]]];
    const huh = scattered.map( chunk => chunk.split( " " ) );
    console.log( huh ); // [ [ "my", "favorite" ], [ "hamburger" ], [ "is", "a" ], [ "chicken", "sandwich" ] ]
    

    const scattered = [ "my favorite", "hamburger", "is a", "chicken sandwich" ];
    // 如果函数处理后是数组，则flat下
    const better = scattered.flatMap( chunk => chunk.split( " " ) );
    console.log( better ); // [ "my", "favorite", "hamburger", "is", "a", "chicken", "sandwich" ]
    
    const nestedArraysOhMy = [ "a", ["b", "c"], ["d", ["e", "f", ["dd", "dd"]]]];
    // .flat() 接收一个可选的深度（deep）参数
    const ahhThatsBetter = nestedArraysOhMy.flat( 2 );
    console.log( ahhThatsBetter ); // [ "a", "b", "c", "d", "e", "f" ]
```


# 13. arguments 类数组
```
    函数 arguments 对象是所有（非箭头）函数中都可用的局部变量, 是一个类似数组的对象。你可以使用arguments对象在函数中引用函数的（实际）参数。

    function foo() {
        console.log(arguments);
    }
    ​
    foo(1, "foo", false, {name: "bar"}); // [1, "foo", false, object]
    function foo() {
        console.log(typeof arguments);
}
```


# 14. 对象的一些操作
## 14.1. hasOwnProperty(判断自身属性与继承属性)
```
    判断自身属性与继承属性
    function foo() {
    this.name = 'foo'
    this.sayHi = function () {
        console.log('Say Hi')
    }
    }

    foo.prototype.sayGoodBy = function () {
    console.log('Say Good By')
    }

    let myPro = new foo()

    console.log(myPro.name) // foo
    console.log(myPro.hasOwnProperty('name')) // true
    console.log(myPro.hasOwnProperty('toString')) // false
    console.log(myPro.hasOwnProperty('hasOwnProperty')) // fasle
    console.log(myPro.hasOwnProperty('sayHi')) // true
    console.log(myPro.hasOwnProperty('sayGoodBy')) // false
    console.log('sayGoodBy' in myPro) // true


    JavaScript 并没有保护 hasOwnProperty 属性名，因此，可能存在于一个包含此属性名的对象，有必要使用一个可扩展的hasOwnProperty方法来获取正确的结果：
    var foo = {
        hasOwnProperty: function() {
            return false;
        },
        bar: 'Here be dragons'
    };

    foo.hasOwnProperty('bar'); // 始终返回 false

    // 如果担心这种情况，可以直接使用原型链上真正的 hasOwnProperty 方法
    // 使用另一个对象的`hasOwnProperty` 并且call
    ({}).hasOwnProperty.call(foo, 'bar'); // true

    // 也可以使用 Object 原型上的 hasOwnProperty 属性
    Object.prototype.hasOwnProperty.call(foo, 'bar'); // true
```



# 15. 随机数 m-n的随机数，不包括n
```

    // 取0-n的随机数
    Math.floor(Math.random() * n)

    function sum (m,n){
    　　var num = Math.floor(Math.random()*(m - n) + n);
    　　console.log(num)
    }

    servers[Math.floor(Math.random() * servers.length)]
```



# 16. 常用函数
* encodeURIComponent(***) 用于url的编码
* encodeURI(***) 整体编码




# sleep 等待5s
```
    const Promise = require('bluebird')
    await Promise.delay(5*1000)
    
    或者直接用原生的Promise
    await new Promise(res => setTimeout(res, 5000));
```


# commonjs 和 es6的 import 和 export
## commonjs 的 import 和 export
```js
module.exports = {a,b,c}
exports.counter = counter;
var b = require('b');
```
## es6的import和export
```js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;

// 或者
export { firstName, lastName, year };

import { firstName, lastName, year } from './profile.js';
import { lastName as surname } from './profile.js';
```

# 空值运算符  leftExpr ?? rightExpr
```js
if(value??'' !== ''){
    
}

// 等价于
if(value !== null && value !== undefined && value !== ''){
    
}
```

# prototype __proto__ constructor
```
1. 我们需要牢记两点：①__proto__和constructor属性是对象所独有的；② prototype属性是函数所独有的，因为函数也是一种对象，所以函数也拥有__proto__和constructor属性。

2. __proto__属性的作用就是当访问一个对象的属性时，如果该对象内部不存在这个属性，那么就会去它的__proto__属性所指向的那个对象（父对象）里找，一直找，直到__proto__属性的终点null，再往上找就相当于在null上取值，会报错。通过__proto__属性将对象连接起来的这条链路即我们所谓的原型链。

3. prototype属性的作用就是让该函数所实例化的对象们都可以找到公用的属性和方法，即f1.__proto__ === Foo.prototype。

4. constructor属性的含义就是指向该对象的构造函数，所有函数（此时看成对象了）最终的构造函数都指向Function

chrome 中的[[Prototype]] 个人理解为指向的是上一级的prototype
比如:
let a = {}
a.__proto__ === Object.prototype

所有的函数都可以看成是构造函数Function()的new操作的实例化对象。那么，Function可以看成是调用其自身的new操作的实例化的结果
所以，如果Function作为实例对象，其构造函数是Function，其原型对象是Function.prototype
console.log(Function.__proto__ === Function.prototype);//true
console.log(Function.prototype.constructor === Function);//true
console.log(Function.prototype === Function.prototype);//true
如果Function.prototype作为实例对象的话，其原型对象是什么呢？和前面一样，所有的对象都可以看成是Object()构造函数的new操作的实例化结果。所以，Function.prototype的原型对象是Object.prototype，其原型函数是Object()
console.log(Function.prototype.__proto__ === Object.prototype);//true
```

# (0 , function)(param) 
```javascript
简单来说就是改变了function的this指向, 将this指向了全局
https://blog.csdn.net/qq_39446719/article/details/103838706
```

[返回主目录](../../README.md)




