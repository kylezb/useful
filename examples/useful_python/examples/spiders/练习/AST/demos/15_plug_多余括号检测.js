// 目前某混淆会对多余的括号进行检测，babel库在解析时会自动去掉，加上后再替换没有问题

const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types")
const generator = require("@babel/generator").default;


function parenthesizedDetectionHandler(astCode) {
    const visitor = {
        ParenthesizedExpression: {
            exit: [
                function (path) {
                // console.log('ok', path.toString())
                    if (path.node.expression.type === 'SequenceExpression') {
                        path.replaceWith(path.get('expression'))
                    }
                }
            ]
        }
    }
    traverse(astCode, visitor);
}

if (require.main === module) {
    const jscode = `
let a = 10;
(a = 10, b = 20, c= 30, d['a'] = 'ok');
(a=30);
a = 30
        `;

    // let ast = parser.parse(jscode);
    let ast = parser.parse(jscode, {
        sourceType: "script",
        createParenthesizedExpressions: true
    });
    parenthesizedDetectionHandler(ast)
    let result_js_code = generator(ast).code;
    console.log(result_js_code);
}

module.exports = {parenthesizedDetectionHandler}
