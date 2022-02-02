const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types")
const {isElementsLiteral} = require("../utils/usefulPlugins");
const generator = require("@babel/generator").default;


//isElementsLiteral对于么有列表为空的, 返回的是false, 如果需要处理参数为空的情况, 改下就行
//对于函数替换可能不通用, 脚本的纯函数判断可能不够完善

function callReplaceToResult(astCode) {
    const visitor = {
        "FunctionDeclaration"(path) {
            let curPathNode = path.node
            let {id: idNode} = curPathNode
            let nameFunction = null
            if (idNode) {
                // 表明是直接定义的函数
                nameFunction = curPathNode.id.name
            }

            // 在父路径中查找该函数的绑定
            let parentPath = path.parentPath
            let bindInfo = parentPath.scope.getBinding(nameFunction)
            if (!bindInfo?.constant) {
                return
            }
            let sourceCode = path.toString()
            if (sourceCode.includes("try") ||
                sourceCode.includes("random") ||
                sourceCode.includes("Date")
            ) {//返回值不唯一不做处理
                return;
            }

            eval(sourceCode)

            let referencePaths = bindInfo.referencePaths
            for (let rPath of referencePaths) {
                let referenceParentPath = rPath.parentPath
                let referenceParentPathNode = referenceParentPath.node
                if (!t.isCallExpression(referenceParentPathNode)) {
                    continue
                }
                if (!isElementsLiteral(referenceParentPath)) {
                    continue
                }
                // 是一个CallExpression且参数都为字面量
                let retVal = eval(referenceParentPath.toString())
                if (typeof retVal == "function" || typeof retVal == "undefined") {
                    continue
                }
                referenceParentPath.replaceInline(t.valueToNode(retVal));

            }
        }
    }
    traverse(astCode, visitor);
}

if (require.main === module) {
    const jscode = `
function add(a,b)
{
  return a+b;
}
function c(){
   return 10;
}
s = add(1,2) + add(111,222) - c();
        `;
    let ast = parser.parse(jscode);
    callReplaceToResult(ast)
    let result_js_code = generator(ast).code;
    console.log(result_js_code);
}

module.exports = {callReplaceToResult}
