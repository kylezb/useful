const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types")
const generator = require("@babel/generator").default;
const jscode = `
let a = 3
if(a>10){
  console.log('f')
} else if(a){
  console.log('d')
}

`;
let ast = parser.parse(jscode);
const visitor = {
    "Identifier|BinaryExpression"(path){
        // path.evaluate();
        path.toString()
        const {confident, value} = path.evaluate();
        confident && path.replaceInline(t.valueToNode(value))
    }
}

traverse(ast, visitor);
let result_js_code = generator(ast).code;
console.log(result_js_code);
