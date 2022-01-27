const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types")
const generator = require("@babel/generator").default;
const jscode = `
var a = 'a' + 'b' + 'c' + d + 'e' + 'f';
`;
let ast = parser.parse(jscode);
const visitor = {
    // "BinaryExpression"(path){
    //     console.log(path.toString())
    //     const {confident, value} = path.evaluate();
    //     confident && path.replaceInline(t.valueToNode(value))
    // }

    "BinaryExpression": {
        exit: function (path) {
            console.log(path.toString())
            const {confident, value} = path.evaluate();
            confident && path.replaceInline(t.valueToNode(value))
        }
    }
}

traverse(ast, visitor);
let result_js_code = generator(ast).code;
console.log(result_js_code);
