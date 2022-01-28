// 将通用demo串联起来
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types")
const {replaceConstant} = require("./还原初始化为常量且始终未修改的变量");
const generator = require("@babel/generator").default;


function serial(astCode){
    replaceConstant(astCode)
}

if (require.main === module) {
    const jscode = `
        var a = 123;
        const b = -5;
        let c = window;
        function d()
        {
          var f = c.btoa("hello,AST!");
          return a + b + f ;
        }
        `;
    let ast = parser.parse(jscode);
    serial(ast)
    let result_js_code = generator(ast).code;
    console.log(result_js_code);
}
