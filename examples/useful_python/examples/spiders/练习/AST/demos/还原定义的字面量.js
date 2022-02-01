const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types")
const generator = require("@babel/generator").default;
const template = require("@babel/template");


/*

 */
function constantFolding(astCode) {
    const visitor = {
        VariableDeclarator(path) {

            const {id, init} = path.node;
            if (!t.isLiteral(init)) return;//只处理字面量
            const binding = path.scope.getBinding(id.name);
            // console.log(path.scope.dump())
            if (!binding || binding.constantViolations.length > 0) {//如果该变量的值被修改则不能处理
                return;
            }
            for (const refer_path of binding.referencePaths) {
                refer_path.replaceWith(init);
            }
            // console.log(path.toString())
            // path.remove(); // 该函数也会将对应的scope删除, 也就是说F(s,s)不会被替换
            // console.log(path.scope.dump())
        },

        // FunctionDeclaration(path){
        //     path.remove()
        // }

        // "Identifier"(path) {
        //
        //     const {confident, value} = path.evaluate();
        //
        //     confident && path.replaceInline(t.valueToNode(value));
        //
        // },

    }


    traverse(astCode, visitor);
}

if (require.main === module) {
    const jscode = `
function a(){
  var s=92
  b=Z(1324801,s);
}

let s = 20
c = F(s,s) 
        `;
    let ast = parser.parse(jscode);
    constantFolding(ast)
    let result_js_code = generator(ast).code;
    console.log(result_js_code);
}

module.exports = {constantFolding}
