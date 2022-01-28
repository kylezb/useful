[返回上一级](../../README.md)

目录：JS逆向/JS混淆测试

* 参考链接
    * https://www.jianshu.com/p/47d9b2a365c5

    
# [ob混淆](https://obfuscator.io/)
# [在线AST](https://astexplorer.net/)
# [节点详解](https://github.com/babel/babylon/blob/master/ast/spec.md)
# [@babel/types文档](https://babeljs.io/docs/en/babel-types)
# 混淆环境

* npm install esprima estraverse escodegen -S

# AST还原需要安装的包
* npm install @babel/parser @babel/traverse @babel/generator @babel/types
* 
# 逆向大纲

* hello world，console.log 混淆解密
* 利用AST去除debugger无限循环

# AST笔记



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

# visitor 使用

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

# traverse

```js
// 是深度遍历的方式的
```

## 遍历的时候的path对象
```js
path.node // 获取当前节点
path.parent // 返回父节点, 是一个node
path.stop() //停止递归遍历
path.replaceWith(types.valueToNode('123')) // 替换节点
path.replaceInline(nodes)// 替换节点
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

# path.node
```javascript
// 如何获取当前节点所对应的源代码
const generator = require("@babel/generator").default;
let {code} = generator(node);

//删除节点，使用系统的 delete 方法
delete path.node.init; // path的删除是path.remove()
```

# parse

```js
 // Parse 函数有个sourceType参数, 需要设置为module, 如果不设置, 那么出现import的话会报错
let ast_code = parse(js_code, {
    // sourceType: "module",   // 不加这句话的时候，如果解析的AST里面包含 import 等一些写法的话，就会报错。
});
```

# types 库: 用于生成节点
```js
// 1. 用来判断节点类型
let node = path.node;
if (!types.isIfStatement(node)) return;
```


# ob, 将解混淆函数加入到内存中
```js
// 将代码片段弄到变量中, 然后运行
for(let i=0;i<=2;i++){
    member_decode_js += generator(AST_parse.program.body[i], {compact:true}).code
    delete AST_parse.program.body[i]
}
eval(member_decode_js);
```

# scope
## 简单理解
```
一个函数就是一个作用域
一个变量就是一个绑定, 依附在作用域是哪个
```
```js
遍历节点的时候可以path.scope 
// 当前代码所在的作用域, 比如遍历到了函数内的一段赋值, 使用path.scope会返回函数处的AST
path.scope.path.toString() // 还原当前scope的代码
path.scope.dump() // 打印应当前作用域
path.scope.rename(oldName, newName, block) // 变量重命名,会修改所有的变量绑定
path.scope.getBinding(name) // 获取name的绑定
path.scope.getBinding(name).referenced // 是否会被引用
path.scope.getBinding(name).constantViolations //  被修改信息信息记录
path.scope.getBinding(name).referencePaths // 获取当前所有绑定路径
path.scope.bindings // 获取当前的所有bindings
```
## 绑定
```javascript
path.scope.bindings
console.log('类型：', binding_.kind)
console.log('定义：', binding_.identifier)
console.log('是否为常量, 不被修改：', binding_.constant)
console.log('被修改信息信息记录', binding_.constantViolations.toString())
console.log('是否会被引用：', binding_.referenced)
console.log('被引用次数', binding_.references)
console.log('被引用信息NodePath记录', binding_.referencePaths[0].parentPath.toString())
```


# 删除节点
```javascript
1. delete path.node.extras
2. path.remove()
3. path.node.body.pop()// pop 是删除数组类型的, 删除数组的最后一项, 比如花括号中有3行语句, 删除的是第三行的
```


# 一些常见情况
## BlockStatement
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
## IfStatement
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
## ArrayPattern ObjectPattern
```javascript
var [first, second, third] = someArray;
const {a, b} = {a:10, b:20}

[first, second, third]// 就是一个ArrayPattern, 在VariableDeclarator中
{a, b} // 是一个ObjectPattern, 在在VariableDeclarator中
```

## VariableDeclarator
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

## MemberExpression
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


[返回上一级](../../README.md)