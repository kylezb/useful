const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types")
const generator = require("@babel/generator").default;
const template = require("@babel/template");

function constantFolding(astCode) {
    const visitor = {
        // 将eval中的内容重新构造成ast节点, 然后替换
        // CallExpression: {
        //     exit(path) {
        //         let {callee, arguments} = path.node;
        //         if (arguments.length != 1 || !t.isLiteral(arguments[0]))
        //             return;
        //         if (!t.isIdentifier(callee, {name: "eval"})) {
        //             return;
        //         }
        //         console.log(generator(arguments[0]).code);
        //
        //         let temp = generator(arguments[0]).code
        //         temp = temp.slice(1, temp.length - 1)
        //         let newAst = parser.parse(temp)
        //         // path.replaceWithSourceString(temp);
        //         path.replaceInline([newAst])
        //     }
        // },

        CallExpression: {
            exit: function (path) {
                let {callee, arguments} = path.node;
                if (arguments.length !== 1 ||
                    !t.isLiteral(arguments[0])) return;
                if (t.isIdentifier(callee, {name: "eval"})) {
                    const evalNode = template.statements.ast(arguments[0].value);
                    // let evalNode = parser.parse(arguments[0].value)
                    // const importNode = template.statement.ast`import all from "./logic/all"`;
                    // console.log(evalNode)
                    path.replaceInline(evalNode);
                }
            },
        }
    }
    traverse(astCode, visitor);
}

if (require.main === module) {
    const jscode = `
let a = 10
function bb(){
  eval("a += 10; a+=20; console.log(a)")
}
        `;
    let ast = parser.parse(jscode);
    constantFolding(ast)
    let result_js_code = generator(ast).code;
    console.log(result_js_code);
}

module.exports = {constantFolding}
