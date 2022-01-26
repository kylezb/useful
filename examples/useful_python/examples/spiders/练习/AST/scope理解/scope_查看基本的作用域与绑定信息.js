const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

const jscode = `
function squire(i){
    return i * i * i;
}
function i()
{
    var i = 123;
    i += 2;
    i += 2;
    return 123;
}
`;
let ast = parser.parse(jscode);
const visitor = {
    "FunctionDeclaration"(path){
        console.log("\n\n这里是函数 ", path.node.id.name + '()')
        path.scope.dump();
    }
}

traverse(ast, visitor);

// constant 声明后，是否会被修改
// references 被引用次数
// violations 被重新定义的次数
// kind 函数声明类型。param 参数, hoisted 提升，var 变量， local 内部