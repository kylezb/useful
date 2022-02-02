const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types")
const generator = require("@babel/generator").default;

/*
官方插件地址:
https://babeljs.io/docs/en/babel-plugin-transform-literals
 */

function unicodeHandler(astCode) {
    const visitor = {
        NumericLiteral({node}) {
            if (node.extra && /^0[obx]/i.test(node.extra.raw)) {
                node.extra = undefined;
            }
        },
        StringLiteral({node}) {
            if (node.extra && /\\[ux]/gi.test(node.extra.raw)) {
                node.extra = undefined;
            }
        },
    }
    traverse(astCode, visitor);
}

if (require.main === module) {
    const jscode = `

var a = 0x25,b = 0b10001001,c = 0o123456,
d = "\x68\x65\x6c\x6c\x6f\x2c\x41\x53\x54",
e = "\u0068\u0065\u006c\u006c\u006f\u002c\u0041\u0053\u0054";
        `;
    let ast = parser.parse(jscode);
    unicodeHandler(ast)
    let result_js_code = generator(ast).code;
    console.log(result_js_code);
}

module.exports = {unicodeHandler}
