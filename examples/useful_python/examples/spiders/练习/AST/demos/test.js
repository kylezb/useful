// 将通用demo串联起来
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const types = require("@babel/types")
const {replaceConstant} = require("./还原初始化为常量且始终未修改的变量");
const generator = require("@babel/generator").default;


const jscode = `
        var a = [1,2,3,[1213,234],{"code":"666"},window];
b = a[1] + a[2] + a[3];
c = a[4];
d = a[5];
        `;
let ast = parser.parse(jscode);
const replaceArrayElements =
    {//数组还原
        VariableDeclarator(path) {
            let {node, scope} = path;
            let {id, init} = node;
            if (!types.isArrayExpression(init)) return;
            path.replaceWithSourceString

            const binding = scope.getBinding(id.name);
            if (!binding || !binding.constant) {
                return;
            }

            for (let referPath of binding.referencePaths) {
                let {node, parent} = referPath;
                if (!types.isMemberExpression(parent, {object: node}) || !types.isNumericLiteral(parent.property)) {
                    return;
                }
                ;
            }

            for (let referPath of binding.referencePaths) {
                let {parent, parentPath} = referPath;
                let index = parent.property.value;
                parentPath.replaceWith(init.elements[index]);
            }
            path.remove();
        },
    }

traverse(ast, replaceArrayElements);


let result_js_code = generator(ast).code;
console.log(result_js_code);

