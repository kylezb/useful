const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types")
const generator = require("@babel/generator").default;


function globalCalculHandler(astCode) {
    const visitor = {
        "CallExpression"(path) {
            let {callee, arguments} = path.node;
            if (!t.isIdentifier(callee) || callee.name == "eval") return;
            if (!arguments.every(arg => t.isLiteral(arg))) return;

            let func = global[callee.name];
            if (typeof func !== "function") return;

            let args = [];
            arguments.forEach((ele, index) => {
                args[index] = ele.value;
            });

            let value = func.apply(null, args);
            if (typeof value == "function") return;
            path.replaceInline(t.valueToNode(value));
        },
    }
    traverse(astCode, visitor);
}

if (require.main === module) {
    const jscode = `

var a = parseInt("12345",16),b = Number("123"),c = String(true),d = unescape("hello%2CAST%21");
eval("a = 1");
        `;
    let ast = parser.parse(jscode);
    globalCalculHandler(ast)
    let result_js_code = generator(ast).code;
    console.log(result_js_code);
}

module.exports = {globalCalculHandler}
