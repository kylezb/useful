const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types")
const generator = require("@babel/generator").default;


function callExpressionHandler(astCode) {
    const visitor = {
        VariableDeclarator(path) {
            const initPath = path.get("init")
            if (!t.isFunctionExpression(initPath.node)) {
                return
            }
            const {init: initNode, id: idNode} = path.node
            const name = idNode.name
            // 获取参数，并判断长度:
            const params = initNode.params;
            if (params.length !== 2) return;
            let firstArg = params[0].name;
            let secondArg = params[1].name;
            // 判断函数体长度是否为1:
            const body = initNode.body;
            if (!body.body || body.body.length !== 1) return;

            // 判断 ReturnStatement 及其 参数类型
            let returnBody = body.body[0];
            let argument = returnBody.argument;
            if (!t.isReturnStatement(returnBody) ||
                !t.isBinaryExpression(argument)) {
                return;
            }

            //判断函数的参数与 return语句的参数是否一致:
            let {left, right, operator} = argument;
            if (!t.isIdentifier(left, {name: firstArg}) ||
                !t.isIdentifier(right, {name: secondArg})) {
                return;
            }
            // 函数声明所在的作用域:

            let scope = path.scope;
            // 遍历作用域块节点，找出所有 CallExpression 判断成功后替换:

            traverse(scope.block, {
                CallExpression: function (_path) {
                    let _node = _path.node;
                    let args = _path.node.arguments;
                    if (args.length === 2 && t.isIdentifier(_node.callee, {name: name})) {
                        _path.replaceWith(t.binaryExpression(operator, args[0], args[1]))
                    }
                },
            })
        }
    }
    traverse(astCode, visitor);
}

if (require.main === module) {
    const jscode = `

var Xor = function (p,q)
{
  return p ^ q;
}

let a = Xor(111,222);
        `;
    let ast = parser.parse(jscode);
    callExpressionHandler(ast)
    let result_js_code = generator(ast).code;
    console.log(result_js_code);
}

module.exports = {callExpressionHandler}
