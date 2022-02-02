// 目前某混淆会对多余的括号进行检测，babel库在解析时会自动去掉，加上后再替换没有问题

const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types")
const generator = require("@babel/generator").default;


function badCodeRemoveHandler(astCode) {
    const visitor = {
        // Program(path){
        //     let body = path.node.body
        //
        //     body.push(t.parenthesizedExpression(t.expressionStatement(body[0])))
        // }
        ExpressionStatement(path){
            // console.log(path.toString())
            // path.insertBefore(t.parenthesizedExpression(path.node.expression))
            path.insertBefore(t.sequenceExpression([path.node.expression]))
            // path.replaceInline(t.parenthesizedExpression(path.node))
            // console.log()
            // path.insertBefore(t.valueToNode("10"))
        }
    }
    traverse(astCode, visitor);
}

if (require.main === module) {
    const jscode = `
    let a = {};
   a['a'] = 10;
        `;
    let ast = parser.parse(jscode, {
        sourceType: "script",
        createParenthesizedExpressions: true
    });
    badCodeRemoveHandler(ast)
    let result_js_code = generator(ast).code;
    console.log(result_js_code);
}

module.exports = {badCodeRemoveHandler}
