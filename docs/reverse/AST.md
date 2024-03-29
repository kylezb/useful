[返回上一级](../../README.md)


- [1. ob混淆](#1-ob混淆)
- [2. 在线AST](#2-在线ast)
- [3. 节点详解](#3-节点详解)
- [4. @babel/types文档, 和其他一些babel文档](#4-babeltypes文档-和其他一些babel文档)
- [5. 混淆环境](#5-混淆环境)
- [6. AST还原需要安装的包](#6-ast还原需要安装的包)
- [7. 逆向大纲](#7-逆向大纲)
- [8. AST笔记](#8-ast笔记)
- [9. visitor 使用](#9-visitor-使用)
- [10. traverse](#10-traverse)
  - [10.1. 遍历的时候的path对象](#101-遍历的时候的path对象)
- [11. path.node](#11-pathnode)
- [12. parse](#12-parse)
- [13. types 库: 用于生成节点](#13-types-库-用于生成节点)
- [14. generator](#14-generator)
  - [14.1. 常用参数](#141-常用参数)
- [15. ob, 将解混淆函数加入到内存中](#15-ob-将解混淆函数加入到内存中)
- [16. scope](#16-scope)
  - [16.1. 简单理解](#161-简单理解)
  - [16.2. 绑定](#162-绑定)
- [17. 删除节点](#17-删除节点)
- [18. 一些常见情况](#18-一些常见情况)
  - [18.1. BlockStatement](#181-blockstatement)
  - [18.2. IfStatement](#182-ifstatement)
  - [18.3. ArrayPattern ObjectPattern](#183-arraypattern-objectpattern)
  - [18.4. VariableDeclarator](#184-variabledeclarator)
  - [18.5. MemberExpression](#185-memberexpression)
  - [18.6. 实参节点, 形参节点](#186-实参节点-形参节点)
  - [18.7. 将源码替换为字符串, eval中的源码替换出来](#187-将源码替换为字符串-eval中的源码替换出来)
  - [18.8. 注意点](#188-注意点)
    - [18.8.1. replaceInline的使用](#1881-replaceinline的使用)
    - [18.8.2. path.scope.getBinding(name)](#1882-pathscopegetbindingname)
    - [18.8.3. path.remove()](#1883-pathremove)
    - [18.8.4. 对同一个节点进行多个方法操作](#1884-对同一个节点进行多个方法操作)

目录：JS逆向/JS混淆测试

* 参考链接
    * https://www.jianshu.com/p/47d9b2a365c5

    
# 1. [ob混淆](https://obfuscator.io/)
# 2. [在线AST](https://astexplorer.net/)
# 3. [节点详解](https://github.com/babel/babylon/blob/master/ast/spec.md)
# 4. [@babel/types文档, 和其他一些babel文档](https://babeljs.io/docs/en/babel-types)
# 5. 混淆环境

* npm install esprima estraverse escodegen -S

# 6. AST还原需要安装的包
* npm install @babel/parser @babel/traverse @babel/generator @babel/types
* 
# 7. 逆向大纲

* hello world，console.log 混淆解密
* 利用AST去除debugger无限循环

# 8. AST笔记



* AST小结
    ```
    Esprima 本质上将 js 代码解析成了两大部分：
    
    1. 3 种变量声明（函数、变量和类）
    2. 表达式
  
    其中表达式又被分为了两大类：
    1.关键字组成的 statement，如 IfStatement, ForStatement等，这里面的BlockStatement有些特殊，因为其body又是 StatementListItem，产生递归。
    2.运算语句（赋值、计算之类的操作）组成的 ExpressionStatement
    
  
    利用path.toString()可以将当前AST对应的源码打印出来
  
    ```

# 9. visitor 使用

```js
const visitor = {
    "SwitchStatement|ReturnStatement"() {
        // 这样写可以同时进入2种表达式
    },
    // 
    SwitchStatement(path) {
        console.log(path.toString()) // 利用path.toString()可以将当前AST对应的源码打印出来
        console.log(generate(path.node).code) // 利用generate还原源码
    },

    SwitchStatement: {
        // 进入离开都hook, 不写默认是enter
        enter(path) {

        },
        exit(path) {
            
        }
    }

}
```

# 10. traverse

```js
// 是深度遍历的方式的
```

## 10.1. 遍历的时候的path对象
```js
path.node // 获取当前节点
path.parent // 返回父节点, 是一个node
path.stop() //停止递归遍历
path.replaceWith(types.valueToNode('123')) // 替换节点

// 替换节点
path.replaceInline(nodes)

path.replaceWithSourceString(...) // 节点替换为源码字符串
path.remove() //删除节点
result = path.findParent(function(result) {return result.isSwitchStatement()}) // 向上查找满足回调函数的节点并返回节点
path.find((result)=>{p.isFunction()}) // 类似 findParent, 但是包含当前节点
path.getFunctionParent() // 向上找函数
path.getStatementParent() //
path.getAncestry() // 获取所有父节点
path.isAncestor(...) // 判断当前节点是否是参数节点的祖先
path.isDescendant(...) // 判断当前节点是否是参数节点的子孙
path.container() // 获取当前容器节点, 比如如果遍历到数组中的数字的时候, 这时候可以通过这个方法获取数组节点
path.evaluate() // 获取到引用的值, 或者直接计算表达式, 比如 let a = 10; b = a; 这时候可以获取到b的值
    (path.evaluate().confident && path.evaluate().value) // 如果节点可以计算那么显示该值, 通过这种方式可以实现引用的替换

path.scope // 当前代码所在的作用域, 比如遍历到了函数内的一段赋值, 使用path.scope会返回函数处的AST
path.get(key) // 获取子节点, key为字符串, 可以用.进行分隔
path.parentPath // 获取上一级路径

// 在数组中, 获取同级的第几个节点, 这的path.key+1 表示获取下一个节点
path.getSibling(path.key+1) // path.key是个字符串的时候貌似没有意义


path.inList // let a = [1,2,3,4] 判断当前是否在数组中, 在数组中path.key为 0, 1, 2...

path.isIfStatement() // 判断当前path的类型, 不推荐, 推荐使用types进行节点类型的判断

path.insertAfter(nodes)
path.insertBefore(nodes) // 插入节点后面, 这2个一般用于[]节点类型, 比如BlockStatement的body中, 或者let a = 10; VariableDeclaration 下的declarations中使用, 遍历到了VariableDeclaration, insertBefore

path.parent // 父节点
path.parentPath // 父路径
path.parent===path.parentPath.node

// 在当前节点下遍历其他节点
path.traverse(...)

path.getAllPrevSiblings() // 获取所有前兄弟节点
path.getAllNextSiblings() // 获取所有后兄弟节点


path.evaluate() // 计算表达式的值
const {confident, value} = path.evaluate(); // confident为true时, value就是计算出来的节点


```

# 11. path.node
```javascript
// 如何获取当前节点所对应的源代码
const generator = require("@babel/generator").default;
let {code} = generator(node);

//删除节点，使用系统的 delete 方法
delete path.node.init; // path的删除是path.remove()
```

# 12. parse

```js
 // Parse 函数有个sourceType参数, 需要设置为module, 如果不设置, 那么出现import的话会报错
let ast_code = parse(js_code, {
    // sourceType: "module",   // 不加这句话的时候，如果解析的AST里面包含 import 等一些写法的话，就会报错。
});
```

# 13. types 库: 用于生成节点
```js
// 1. 用来判断节点类型
let node = path.node;
if (!types.isIfStatement(node)) return;

// 第二个参数可以传入一些限定的匹配条件
types.isIdentifier(_node.object, {name: name})
```

# 14. generator
## 14.1. 常用参数
```js
// Unicode转中文或者其他非ASCII码字符。
const output = generator(ast,opts = {jsescOption:{"minimal":true}},code);
// 代码压缩
const output = generator(ast,opts = {"compact":true},code);
// 删除所有注释
const output = generator(ast,opts = {"comments":false},code);
// 删除空行
const output = generator(ast,opts = {"retainLines":true},code);
```

# 15. ob, 将解混淆函数加入到内存中
```js
// 将代码片段弄到变量中, 然后运行
for(let i=0;i<=2;i++){
    member_decode_js += generator(AST_parse.program.body[i], {compact:true}).code
    delete AST_parse.program.body[i]
}
eval(member_decode_js);
```

# 16. scope
## 16.1. 简单理解
```
一个函数就是一个作用域
一个变量就是一个绑定, 依附在作用域是哪个
通过scope可以拿到该scope下的所有绑定变量及其信息
```
```js
遍历节点的时候可以path.scope 
// 当前代码所在的作用域, 比如遍历到了函数内的一段赋值, 使用path.scope会返回函数处的AST
path.scope.path.toString() // 还原当前scope的代码
path.scope.dump() // 打印应当前作用域
path.scope.rename(oldName, newName, block) // 变量重命名,会修改所有的变量绑定
path.scope.getBinding(name) // 获取name的绑定, getBinding先会在当前作用域下查找绑定, 如果没有查询到, 那么会去父路径查找
path.scope.getBinding(name).referenced // 是否会被引用
path.scope.getBinding(name).constantViolations //  被修改信息信息记录
path.scope.getBinding(name).referencePaths // 获取当前所有绑定路径
path.scope.bindings // 获取当前的所有bindings, 返回一个字符串, key是名字
```
## 16.2. 绑定
```javascript
path.scope.bindings
console.log('类型：', binding_.kind)
console.log('定义：', binding_.identifier)
console.log('是否为常量, 不被修改：', binding_.constant)
console.log('被修改信息信息记录', binding_.constantViolations.toString())
console.log('是否会被引用：', binding_.referenced)
console.log('被引用次数', binding_.references)  // 自身定义处不会计入引用次数
console.log('被引用信息NodePath记录', binding_.referencePaths[0].parentPath.toString())
```


# 17. 删除节点
```javascript
1. delete path.node.extras
2. path.remove() // 该函数也会将对应的scope删除, 具体查看还原定义的字面量
3. path.node.body.pop()// pop 是删除数组类型的, 删除数组的最后一项, 比如花括号中有3行语句, 删除的是第三行的
```


# 18. 一些常见情况
## 18.1. BlockStatement
```javascript
// BlockStatement 中的body是一个数组
// 对应代码
{
  a=10;
  b=20;
}
// 对应ast
let ast = {
    body: {
        type: 'BlockStatement',
        body: [
            ExpressionStatement, // 对应a=10
            ExpressionStatement, // 对应a=20
        ]
    }
}
```
## 18.2. IfStatement
```javascript
// 对应代码
if(a>10){
    a += 1
} else {
    a += 2
}
// 对应AST
let ast = {
    body: {
        type: 'IfStatement',
        test: { // if中的测试结果
            type: 'BinaryExpression' // 会有多种情况, 还会有UnaryExpression
        },
        consequent: { // 如果结果为真的代码片段
            type: '***' // 对应{a+=1}
        },
        alternate: { // 结果为假的代码片段, 也就是else中
            type: '***' // 对应{a+=2}
        }
    }
}
```
## 18.3. ArrayPattern ObjectPattern
```javascript
var [first, second, third] = someArray;
const {a, b} = {a:10, b:20}

[first, second, third]// 就是一个ArrayPattern, 在VariableDeclarator中
{a, b} // 是一个ObjectPattern, 在在VariableDeclarator中
```

## 18.4. VariableDeclarator
```
interface VariableDeclarator <: Node {
  type: "VariableDeclarator";
  id: Pattern;
  init: Expression | null;
}

let aa = 10;
var [first, second, third] = someArray;
const {a, b} = {a:10, b:20}

id就是 aa  [first, second, third]  {a, b}, 就是等号左边的类容,
是一个Patter类型, 这里的aa是Identifier类型, 他是继承Patter来的.

aa -> Identifier
[first, second, third] -> ArrayPattern
{a, b} -> ObjectPattern
```

## 18.5. MemberExpression
```javascript
let a = {}
let b = []

// 以下都为MemberExpression
a.a
b[1]

// 关键key
object: Expression | Super  // b
property: Expression // [1]
computed: boolean 

computed为true的情况是a[b], 为false的情况是a.b
```


## 18.6. 实参节点, 形参节点
```
形参节点, 为函数定义出的节点, 一般是key是params
实参节点, 为调用某个函数的节点, 一般key是arguments
```


## 18.7. 将源码替换为字符串, eval中的源码替换出来
```js
const evalNode = template.statements.ast('a += 1, a += 10');
path.replaceInline(evalNode);

// 可也以重新构造个AST节点
let newAst = parser.parse('a+=1, a+=10')
path.replaceInline([newAst])
```



## 18.8. 注意点
### 18.8.1. replaceInline的使用
```js
/* replaceInline 的参数需要注意, 如果是替换单个节点就传入单个节点, 不用出入数组, 比如如下有区别
    bodyPath.replaceInline(t.blockStatement([bodyPathNode]))
    bodyPath.replaceInline([t.blockStatement([bodyPathNode])]) // 该表达式会插入2个大括号, 也就是说如果参数是数组, 在某些情况下会自动插入大括号, 所以使用的时候一定要注意

*/
path.replaceInline(nodes)
```
### 18.8.2. path.scope.getBinding(name)
```js
// 先会在当前作用域下查找绑定, 如果没有查询到, 那么会去父路径查找, 比如如下代码
function i()
{
}
let c = 20
// 如果在FunctionDeclaration的path下无法查找到c, 那么就会去父路径下查找c, 可以查看:删除未被使用的函数.js
```

### 18.8.3. path.remove()
```
会将该path下的绑定变量从scope中删除, 如果scope中有其他重名的绑定, 那么使用该函数会有一定问题.
比如:
# FunctionDeclaration
 - s { constant: true, references: 1, violations: 0, kind: 'var' }
# Program
 - a { constant: true, references: 0, violations: 0, kind: 'hoisted' }
 - s { constant: true, references: 2, violations: 0, kind: 'let' }


当删除FunctionDeclaration中的s的path的时候, program中的s也会被删除, 具体查看:还原定义的字面量.js
```

### 18.8.4. 对同一个节点进行多个方法操作
```
traverse(ast, {

    CallExpression:

    {

        enter: [reduce_call_express,delete_empty_params]

    },

});
```

[返回上一级](../../README.md)