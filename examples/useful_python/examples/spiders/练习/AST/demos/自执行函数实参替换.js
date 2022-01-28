const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types")
const generator = require("@babel/generator").default;


function functionParamsReplace(astCode) {
    let myMap = {}
    const visitor = {
        "CallExpression"(path) {
            let node = path.node;
            if (!t.isFunctionExpression(node.callee)) return
            let arguments = node.arguments
            let calleeParamsNode = node.callee.params
            let index = 0
            for (let paramNode of calleeParamsNode) {
                if(!t.isIdentifier(paramNode)) return
                myMap[paramNode.name] = arguments[index]
                index += 1
            }
            // console.log(myMap)
        }
    }
    traverse(astCode, visitor);
}

if (require.main === module) {
    const jscode = `

(function(t,a,b,c,d)
{
   console.log(a[0]+a[1]);
   console.log(b[0]-b[1]);
   console.log(c);
   console.log(d);
   t = 123;

})(5,[1,2],[5,3],6,-5);
        `;
    let ast = parser.parse(jscode);
    functionParamsReplace(ast)
    let result_js_code = generator(ast).code;
    console.log(result_js_code);
}

module.exports = {functionParamsReplace}
