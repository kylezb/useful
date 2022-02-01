const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types")
const {isBaseLiteral} = require("../utils/usefulPlugins");
const generator = require("@babel/generator").default;


function functionParamsReplace(astCode) {
    let paramsToArguments = {} // 实参和形参的对饮, key: 形参name, value: 实参的path

    function replaceParams(paths, nodes) {
        paths.forEach(function (path) {
            path.replaceInline(nodes)
        })
    }

    function removeBoth(paramsPath, argumentsPath) {
        paramsPath.remove()
        argumentsPath.remove()
    }

    const visitor = {
        "CallExpression"(path) {
            let curentNode = path.node;
            let calleePath = path.get("callee")
            if (!t.isFunctionExpression(curentNode.callee) || curentNode.arguments.length === 0) return
            let argumentsPaths = path.get("arguments")
            let calleeParamsPaths = calleePath.get("params")


            calleeParamsPaths.forEach((calleeParamsPath, index) => {
                if (index >= argumentsPaths.length) return
                let argumentsPath = argumentsPaths[index]
                let argumentsNode = argumentsPath.node
                let calleeParamsNode = calleeParamsPath.node
                if (!t.isIdentifier(calleeParamsNode)) return
                // paramsToArguments[calleeParamsNode.name] = argumentsPath[index]
                let paramsName = calleeParamsNode.name

                // 获取当前形参的绑定信息, 注意用的是calleePath的scope
                let bindInfo = calleePath.scope.getBinding(paramsName)
                console.log(calleePath.scope.dump(), paramsName, 'paramsName')

                if (!bindInfo?.constant) return


                if (!bindInfo.referenced) {
                    // 如果该参数没有查到引用, 那么直接删除
                    removeBoth(calleeParamsPath, argumentsPath)
                    return
                }

                let curParaRefPaths = bindInfo.referencePaths

                if (t.isIdentifier(argumentsNode) || isBaseLiteral(argumentsPath)) {
                    // 第一种情况, 如果实参是一个变量名或者是一个字面量, 那么直接替换
                    replaceParams(curParaRefPaths, [argumentsNode])
                    removeBoth(calleeParamsPath, argumentsPath)
                } else if (t.isArrayExpression(argumentsNode)) {
                    // 如果是一个数组, 那么替换为数组中的值
                    let elementsNodes = argumentsNode.elements
                    let canRemovedPath = true
                    for (let curParaRefPath of curParaRefPaths) {
                        let _curParentPath = curParaRefPath.parentPath
                        let _curParentPathNode = _curParentPath.node

                        if (!t.isMemberExpression(_curParentPathNode)) {
                            // 如果父节点不是一个MemberExpression, 不考虑
                            canRemovedPath = false
                            continue
                        }

                        let propertyPath = _curParentPath.get("property")
                        let propertyPathNode = propertyPath.node
                        if (!t.isNumericLiteral(propertyPath.node)) {
                            // 如果不是a[0], 这样的表达式不考虑
                            canRemovedPath = false
                            continue
                        }

                        let membIndex = propertyPathNode.value
                        if (membIndex >= elementsNodes.length) {
                            // 节点长度超长了
                            canRemovedPath = false
                            continue
                        }
                        // 满足条件, 将该节点替换
                        let replaceNode = elementsNodes[membIndex]
                        _curParentPath.replaceInline(replaceNode)
                    }
                    if (canRemovedPath) {
                        removeBoth(calleeParamsPath, argumentsPath)
                    }
                }


            })


        },

    }
    traverse(astCode, visitor);
}

if (require.main === module) {
    const jscode = `
let cc = 10;
(function(t,a,b,c,d,e, df, ff)
{
   console.log(a[0]+a[1]);
   console.log(b[0]-b[1]);
   console.log(c);
   console.log(d);
   console.log(df);
   console.log(ff);
   t = 123;

})(50,[1,2],[5,3],6,-5, 10, cc, 10);
let ff = 10
console.log(ff)
        `;
    let ast = parser.parse(jscode);
    functionParamsReplace(ast)
    let result_js_code = generator(ast).code;
    console.log(result_js_code);
}

module.exports = {functionParamsReplace}
