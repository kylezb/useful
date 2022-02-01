const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types")
const generator = require("@babel/generator").default;
const template = require("@babel/template");


/*删除未使用过的函数, 注意如果函数内部有和函数同名的变量的情况下使用path.scope.getBinding(name)会无法正确获取绑定

path.scope.getBinding(name) 先是会在当前path下查找绑定的name, 如果没有找到, 会在父路径中查找

 */
function constantFolding(astCode) {
    const visitor = {

        // "VariableDeclarator|FunctionDeclaration"
        "FunctionDeclaration"(path) {

            const {id} = path.node;


            const binding = path.parentPath.scope.getBinding(id.name);

            if (!binding || binding.constantViolations.length > 0) {//如果变量被修改过，则不能进行删除动作。

                return;

            }

            if (binding.referencePaths.length === 0) {//长度为0，说明变量没有被使用过。

                path.remove();

            }

        },

    }


    traverse(astCode, visitor);
}

if (require.main === module) {
    const jscode = `
function i()
{
    var i = 123;
    i += 2;
    function b(){
        let c = 10;
    }
    return 123;
}

let c = 20
c += 20
let cc = 300
// i = 10
// console.log(i)

        `;
    let ast = parser.parse(jscode);
    constantFolding(ast)
    let result_js_code = generator(ast).code;
    console.log(result_js_code);
}

module.exports = {constantFolding}
