const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types")
const {isElementsLiteral} = require("../utils/usefulPlugins");
const generator = require("@babel/generator").default;

function addBlockStatement(astCode) {


    const visitor = {
        "ForStatement|WhileStatement"(path) {
            let bodyPath = path.get("body")
            let bodyPathNode = bodyPath.node
            console.log(bodyPath.toString())
            if (t.isBlockStatement(bodyPathNode)) {
                return
            }
            // bodyPath.replaceInline(t.blockStatement([bodyPathNode]))
            bodyPath.replaceInline([t.valueToNode(10)])
        },
        "IfStatement"(path) {
            let consequentPath = path.get("consequent")
            consequentPath.replaceInline(t.blockStatement([consequentPath.node]))
        },
    }
    traverse(astCode, visitor);
}

if (require.main === module) {
    const jscode = `
for (var i=0; i<10086; i++)
  console.log(6666666);
console.log(7777777);

while (true)
  console.log(8888888);
  
if(true) console.log('ok')
        `;
    let ast = parser.parse(jscode);
    addBlockStatement(ast)
    let result_js_code = generator(ast).code;
    console.log(result_js_code);
}

module.exports = {addBlockStatement}
