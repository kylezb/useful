const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types")
const generator = require("@babel/generator").default;
const jscode = `
var a = 123;
const b = -5;
let c = window;
function d()
{
  var f = c.btoa("hello,AST!");
  return a + b + f ;
}
`;
let ast = parser.parse(jscode);
const visitor = {
    "VariableDeclarator"(path){
        let _bindings = path.scope.bindings
        for(let name in _bindings){
            let singleBinding = _bindings[name];
            if(singleBinding.references > 0){
                console.log(singleBinding.referencePaths)
            }
        }
    }

    // "Identifier": {
    //     exit: function (path) {
    //         let name = path.node.name
    //         let bindInfo = path.scope.getBinding(name)
    //         console.log(bindInfo)
    //     }
    // }
}

traverse(ast, visitor);
let result_js_code = generator(ast).code;
console.log(result_js_code);
