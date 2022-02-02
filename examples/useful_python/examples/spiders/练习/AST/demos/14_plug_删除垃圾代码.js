const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types")
const generator = require("@babel/generator").default;


/*
不建议使用
 */

function badCodeRemoveHandler(astCode) {
    const visitor = {
        "VariableDeclarator|FunctionDeclaration"(path) {//在setTimeout函数或者eval函数里无法检测是否被引用，所以慎用。
            let {node, scope, parentPath} = path;
            let binding = scope.getBinding(node.id.name);
            if (binding && !binding.referenced && binding.constant) {//没有被引用，也没有被改变
                if (t.isVariableDeclarator(node)) {
                    if (parentPath.parentPath.isForInStatement()) {
                        //for (var key in arr){
                        //     console.log(arr[key]);
                        // }  这种情况不考虑
                        return;
                    }
                    path.remove();
                } else if (t.isFunctionDeclaration(node)){
                    path.remove();
                }

            }

        },
    }
    traverse(astCode, visitor);
}

if (require.main === module) {
    const jscode = `
var a = 12345,b;
const c = 5;
a += 5 ;

function d(){
}

        `;
    let ast = parser.parse(jscode);
    badCodeRemoveHandler(ast)
    let result_js_code = generator(ast).code;
    console.log(result_js_code);
}

module.exports = {badCodeRemoveHandler}
