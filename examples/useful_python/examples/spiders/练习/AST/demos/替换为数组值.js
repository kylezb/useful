const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types")
const generator = require("@babel/generator").default;


function arrayReplactToValue(astCode) {
    // let myMap = {}
    const visitor = {
        "VariableDeclarator"(path) {
            let {init: initNode, id: idNode} = path.node
            if (!t.isArrayExpression(initNode) || !t.isIdentifier(idNode)) return
            // 只处理ArraryExpression的变量
            let name = idNode.name
            let elements = initNode.elements
            let binding = path.scope.getBinding(name)

            if(!binding && !binding.constant) return

            for (let rPath of binding.referencePaths) {
                let parentPath= rPath.parentPath
                // 判断父类是不是memberexpress, 和父类的property是不是isNumericLiteral
                if(!t.isMemberExpression(parentPath.node) || !t.isNumericLiteral(parentPath.node.property)) continue;
                let index = parentPath.node.property.value
                rPath.parentPath.replaceInline([elements[index]])
            }
        },
        // "MemberExpression"(path) {
        //     let {object: objectNode, property: propertyNode} = path.node
        //     if (!t.isIdentifier(objectNode) || !t.isNumericLiteral(propertyNode)) return
        //     let leftName = objectNode.name
        //     let rightValue = propertyNode.value
        //     try {
        //         let replaceNode = myMap[leftName][rightValue]
        //         path.replaceInline([ replaceNode ])
        //     } catch (err) {
        //         console.log(err)
        //     }
        // }
    }
    traverse(astCode, visitor);
}

if (require.main === module) {
    const jscode = `
var a = [1,2,3,[1213,234],{"code":"666"},window];
b = a[1] + a[2] + a[3];
c = a[4];
d = a[5];
        `;
    let ast = parser.parse(jscode);
    arrayReplactToValue(ast)
    let result_js_code = generator(ast).code;
    console.log(result_js_code);
}

module.exports = {arrayReplactToValue}
