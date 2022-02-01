const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types")
const generator = require("@babel/generator").default;
const template = require("@babel/template");

function commaExpression(astCode) {
    const visitor = {
        ExpressionStatement(path) {
            //****************************************特征判断
            let {expression} = path.node;
            if (!t.isSequenceExpression(expression)) return;
            let body = [];
            expression.expressions.forEach(express => {
                body.push(t.expressionStatement(express));
            })


            path.replaceInline(body);

        },
    }
    traverse(astCode, visitor);
}

if (require.main === module) {
    const jscode = `
var _0x4692f3 = {};

_0x4692f3[_0x46b8('0x89e')] = function(_0x4e1e7c, _0xd66178) {

    return _0x4e1e7c(_0xd66178);

},

_0x4692f3[_0x46b8('0x142')] = function(_0x2f2063, _0x25600f) {

    return _0x2f2063 > _0x25600f;

},
a += 10,
_0x4692f3[_0x46b8('0x872')] = _0x46b8('0x6cc'),

_0x4692f3[_0x46b8('0x49b')] = function(_0x161ed8, _0x10c423) {

    return _0x161ed8 > _0x10c423;

};
        `;
    let ast = parser.parse(jscode);
    commaExpression(ast)
    let result_js_code = generator(ast).code;
    console.log(result_js_code);
}

module.exports = {commaExpression}
