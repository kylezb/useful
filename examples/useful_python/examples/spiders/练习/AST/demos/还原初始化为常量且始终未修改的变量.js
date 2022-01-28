const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types")
const generator = require("@babel/generator").default;

/*
将未修改的变量直接替换为该变量的值

思路: 遍历VariableDeclarator节点, 如果是常量, 且被引用了, 直接修改引用的地方.

 */


function replaceConstant(astCode) {
    const visitor = {
        "VariableDeclarator"(path) {
            // let _bindings = path.scope.bindings

            let {id, init} = path.node;
            if (!init || !t.isIdentifier(id)) {
                // 如果没有值, 或者不是Identifier类型的, 不考虑
                return
            }

            let initPath = path.get("init")
            let initPathNode = initPath.node

            if (t.isUnaryExpression(initPathNode, {operator: "+"}) ||
                t.isUnaryExpression(initPathNode, {operator: "-"})) {// -5或者 +"3" 也可以算作是字面量
                if (!t.isLiteral(init.argument)) return;
            }
                //如果初始值非Literal节点或者Identifier节点，不做还原
            //有时候为MemberExpression节点时，也可以还原，视情况而论
            else if (!t.isLiteral(initPathNode) &&
                !t.isIdentifier(initPathNode)) {
                return;
            }

            // 在有值得情况才进行替换
            let name = id.name
            let _binding = path.scope.getBinding(name)
            if (_binding && _binding.references > 0 && _binding.constant === true) {
                // 没有被修改, 且被引用了, 替换引用的变量
                let referencePaths = _binding.referencePaths
                for (let rPath of referencePaths) {
                    rPath.replaceInline(init)
                }
                path.remove()
            }
        }
    }
    traverse(astCode, visitor);
}

if (require.main === module) {
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
    replaceConstant(ast)
    let result_js_code = generator(ast).code;
    console.log(result_js_code);
}

module.exports = {replaceConstant}
