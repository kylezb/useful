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
    "VariableDeclarator"(path) {
        // let _bindings = path.scope.bindings

        let {id, init} = path.node;
        if (!path.node.init || !t.isIdentifier(path.node.id)) {
            // 如果没有值, 或者不是Identifier类型的, 不考虑
            return
        }

        let initPath = path.get("init")

        if (t.isUnaryExpression(initPath.node, {operator: "+"}) ||
            t.isUnaryExpression(initPath.node, {operator: "-"})) {// -5或者 +"3" 也可以算作是字面量
            if (!t.isLiteral(init.argument)) return;
        }
            //如果初始值非Literal节点或者Identifier节点，不做还原
        //有时候为MemberExpression节点时，也可以还原，视情况而论
        else if (!t.isLiteral(initPath.node) &&
            !t.isIdentifier(initPath.node)) {
            return;
        }

        // 在有值得情况才进行替换
        // let initValue = path.node.init.value
        let rightInit = path.node.init
        let name = path.node.id.name
        let _binding = path.scope.getBinding(name)
        if (_binding?.references > 0 && _binding?.constant === true) {
            // 没有被修改, 且被引用了, 替换引用的变量
            let referencePaths = _binding.referencePaths
            for (let rPath of referencePaths) {
                rPath.replaceInline(rightInit)
            }
            path.remove()
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
