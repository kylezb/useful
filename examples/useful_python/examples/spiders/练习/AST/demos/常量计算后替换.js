const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types")
const generator = require("@babel/generator").default;


function constantFolding(astCode) {
    // let myMap = {}
    const visitor = {
        "BinaryExpression|UnaryExpression|ConditionalExpression|CallExpression|MemberExpression|SequenceExpression"(path) {
            if (path.isUnaryExpression() && [ "+", "!" ].indexOf(path.node.operator) === -1) {
                return;
            }
            const {confident, value} = path.evaluate();
            confident && path.replaceInline(t.valueToNode(value))
        }
    }
    traverse(astCode, visitor);
}

if (require.main === module) {
    const jscode = `
var a = !![],b = 'Hello ' + 'world' + '!',c = 2 + 3 * 50,d = Math.abs(-200) % 19,e = true ? 123:456;
let bb = -10
        `;
    let ast = parser.parse(jscode);
    constantFolding(ast)
    let result_js_code = generator(ast).code;
    console.log(result_js_code);
}

module.exports = {constantFolding}
