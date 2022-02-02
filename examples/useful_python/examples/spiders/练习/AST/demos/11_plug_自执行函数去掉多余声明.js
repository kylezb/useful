const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types")
const generator = require("@babel/generator").default;

/*
官方插件地址:

https://babeljs.io/docs/en/babel-plugin-transform-member-expression-literals
https://babeljs.io/docs/en/babel-plugin-transform-property-literals
 */

function objectUnifyHandler(astCode) {
    const visitor = {
        UnaryExpression(path) {
            let {operator, argument} = path.node;
            if (operator != "!" || !t.isCallExpression(argument)) return;
            let {arguments, callee} = argument;
            if (arguments.length != 0 || !t.isFunctionExpression(callee)) return;

            let {id, params, body} = callee;
            if (id != null || params.length != 0 || !t.isBlockStatement(body)) return;
            path.replaceWithMultiple(body.body);
        },
    }
    traverse(astCode, visitor);
}

if (require.main === module) {
    const jscode = `

!(function()
{
  a = b;
})();
        `;
    let ast = parser.parse(jscode);
    objectUnifyHandler(ast)
    let result_js_code = generator(ast).code;
    console.log(result_js_code);
}

module.exports = {objectUnifyHandler}
