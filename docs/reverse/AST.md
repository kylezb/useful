[返回上一级](../../README.md)

目录：JS逆向/JS混淆测试

* 参考链接
    * https://www.jianshu.com/p/47d9b2a365c5


* 在线代码混淆
    * https://obfuscator.io/
    * https://astexplorer.net/

# 混淆环境

* npm install esprima estraverse escodegen -S

# AST还原需要安装的包
* npm install @babel/parser @babel/traverse @babel/generator @babel/types
* 
# 逆向大纲

* hello world，console.log 混淆解密
* 利用AST去除debugger无限循环

# AST笔记

* 节点含义

    * 可将混淆代码转换成AST树，从而替换节点，达到解密的目的。
    * CallExpression函数对应的AST和源码
      ![avatar](../../../../../docs/imgs/js_ast_tree_hello_word.png)
        ```
            _0x3137('0x1')
        ```
    * ExpressionStatement对应的源码
        ```
            console[_0x3137('0x1')](_0x3137('0x0'));
        ```

    * MemberExpression ：对应下方有object和property，object为对应的变量信息(如name表明对象名称)
      ，property为要读取的属性，property节点下又有value节点表明属性名称
        ```
        //源码
        _0x4e7910["PVc"]
        //对应AST中有object和property
        //AST
        "callee": {
              "type": "MemberExpression",
              "start": 15,
              "end": 31,
              "loc": {
                "start": {
                  "line": 3,
                  "column": 0
                },
                "end": {
                  "line": 3,
                  "column": 16
                }
              },
              "object": {
                "type": "Identifier",
                "start": 15,
                "end": 24,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 0
                  },
                  "end": {
                    "line": 3,
                    "column": 9
                  },
                  "identifierName": "_0x4e7910"
                },
                "name": "_0x4e7910"
              },
              "property": {
                "type": "StringLiteral",
                "start": 25,
                "end": 30,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 10
                  },
                  "end": {
                    "line": 3,
                    "column": 15
                  }
                },
                "extra": {
                  "rawValue": "PVc",
                  "raw": "\"PVc\""
                },
                "value": "PVc"
              },
              "computed": true
            },
        ```

    * VariableDeclarator：对应下方有id和init，id为变量信息(其中name表明标量名称)，init为初始化信息
        ```
        
        //源码
        var _0x3f0c99 = arguments
        //AST代码
        Node {
          type: 'VariableDeclarator',
          start: 37288,
          end: 37309,
          loc: SourceLocation {
            start: Position { line: 481, column: 12 },
            end: Position { line: 481, column: 33 }
          },
          id: Node {
            type: 'Identifier',
            start: 37288,
            end: 37297,
            loc: SourceLocation {
              start: [Position],
              end: [Position],
              identifierName: '_0x3f0c99'
            },
            name: '_0x3f0c99'
          },
          init: Node {
            type: 'Identifier',
            start: 37300,
            end: 37309,
            loc: SourceLocation {
              start: [Position],
              end: [Position],
              identifierName: 'arguments'
            },
            name: 'arguments'
          }
        }

        ```

    * CallExpression: 中有callee和arguments,callee中如果是Identifier会有name,  
      callee就是括号左边的值，如a\['a'\](),callee就是a\['a'\],是个MemberExpression。
        ```
        //源码
        _0x8787()
        //AST
        "expression": {
              "type": "CallExpression",
              "start": 163,
              "end": 172,
              "loc": {
                "start": {
                  "line": 6,
                  "column": 0
                },
                "end": {
                  "line": 6,
                  "column": 9
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 163,
                "end": 170,
                "loc": {
                  "start": {
                    "line": 6,
                    "column": 0
                  },
                  "end": {
                    "line": 6,
                    "column": 7
                  },
                  "identifierName": "_0x8787"
                },
                "name": "_0x8787"
              },
              "arguments": []
            }
        ```

    * NumericLiteral和StringLiteral：
        ```
        // 对于，16进制转换成人可读的数组和字符串，只需要去掉extra就可以
        // delete path.node.extra
        // 0xa3
        // '\x70\x75\x73\x68'
      
        //AST
        "expression": {
          "type": "NumericLiteral",
          "start": 185,
          "end": 189,
          "loc": {
            "start": {
              "line": 9,
              "column": 0
            },
            "end": {
              "line": 9,
              "column": 4
            }
          },
          "extra": {
            "rawValue": 163,
            "raw": "0xa3"
          },
          "value": 163
        }
      
      
      
      
      
        "expression": {
          "type": "StringLiteral",
          "start": 190,
          "end": 208,
          "loc": {
            "start": {
              "line": 10,
              "column": 0
            },
            "end": {
              "line": 10,
              "column": 18
            }
          },
          "extra": {
            "rawValue": "push",
            "raw": "'\\x70\\x75\\x73\\x68'"
          },
          "value": "push"
        }
        ```

    * WhileStatement和IfStatement
        ```
        //源码
        
        while(true){
          
        }
        if(true){
        }
      
        //AST
        {
            "type": "WhileStatement",
            "start": 179,
            "end": 196,
            "loc": {
              "start": {
                "line": 8,
                "column": 0
              },
              "end": {
                "line": 10,
                "column": 1
              }
            },
            "test": {
              "type": "BooleanLiteral",
              "start": 185,
              "end": 189,
              "loc": {
                "start": {
                  "line": 8,
                  "column": 6
                },
                "end": {
                  "line": 8,
                  "column": 10
                }
              },
              "value": true
            },
            "body": {
              "type": "BlockStatement",
              "start": 190,
              "end": 196,
              "loc": {
                "start": {
                  "line": 8,
                  "column": 11
                },
                "end": {
                  "line": 10,
                  "column": 1
                }
              },
              "body": [],
              "directives": []
            },
            "leadingComments": [
              {
                "type": "CommentBlock",
                "value": "*\n * Paste or drop some JavaScript here and explore\n * the syntax tree created by chosen parser.\n * You can use all the cool new features from ES6\n * and even more. Enjoy!\n ",
                "start": 0,
                "end": 177,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 6,
                    "column": 3
                  }
                }
              }
            ]
          },
          {
            "type": "IfStatement",
            "start": 200,
            "end": 211,
            "loc": {
              "start": {
                "line": 14,
                "column": 0
              },
              "end": {
                "line": 15,
                "column": 1
              }
            },
            "test": {
              "type": "BooleanLiteral",
              "start": 203,
              "end": 207,
              "loc": {
                "start": {
                  "line": 14,
                  "column": 3
                },
                "end": {
                  "line": 14,
                  "column": 7
                }
              },
              "value": true
            },
            "consequent": {
              "type": "BlockStatement",
              "start": 208,
              "end": 211,
              "loc": {
                "start": {
                  "line": 14,
                  "column": 8
                },
                "end": {
                  "line": 15,
                  "column": 1
                }
              },
              "body": [],
              "directives": []
            },
            "alternate": null
          }

        ```

    * SwitchStatement: 中有个discriminant，就是switch(d)中的d

    * ReturnStatement:中有个argument，为返回值

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
path.stop() //停止递归遍历
path.replaceWith(types.valueToNode('123')) // 替换节点
path.replaceWithSourceString(...) // 节点替换为源码字符串
path.remove() //删除节点
result = path.findParent(function(result) {return result.isSwitchStatement}) // 向上查找满足回调函数的节点并返回节点
path.find // 类似 findParent, 但是包含当前节点
path.getFunctionParent() // 向上找函数
path.getStatementParent() // 
path.getSibling(path.key+1) // 获取同级的第几个节点, 这的path.key+1 表示获取下一个节点
path.container() // 获取当前容器节点, 比如如果遍历到数组中的数字的时候, 这时候可以通过这个方法获取数组节点
path.evaluate() // 获取到引用的值, 或者直接计算表达式, 比如 let a = 10; b = a; 这时候可以获取到b的值
    (path.evaluate().confident && path.evaluate().value) // 如果节点可以计算那么显示该值, 通过这种方式可以实现引用的替换

path.scope // 当前代码所在的作用域, 比如遍历到了函数内的一段赋值, 使用path.scope会返回函数处的AST
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
```js
遍历节点的时候可以path.scope 
// 当前代码所在的作用域, 比如遍历到了函数内的一段赋值, 使用path.scope会返回函数处的AST
path.scope.path.toString() // 还原当前scope的代码
```

[返回上一级](../../README.md)