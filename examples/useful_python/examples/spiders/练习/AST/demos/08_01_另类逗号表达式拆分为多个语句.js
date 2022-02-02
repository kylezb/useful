const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types")
const generator = require("@babel/generator").default;
const template = require("@babel/template");

function commaExpression(astCode) {
    const visitor = {
        SequenceExpression: {

            exit(path) {

                let expressions = path.get('expressions');

                let last_expression = expressions.pop();

                let statement = path.getStatementParent();

                if (statement) {

                    for (let expression of expressions) {

                        statement.insertBefore(t.ExpressionStatement(expression = expression.node));

                    }

                    path.replaceInline(last_expression);

                }

            }

        },
    }
    traverse(astCode, visitor);
}

if (require.main === module) {
    const jscode = `
function test(u){

    return function(n,r, t){

      return (t = (r = n.B(0),n).B(1),u)(r, t);

    }

  } 

        `;
    let ast = parser.parse(jscode);
    commaExpression(ast)
    let result_js_code = generator(ast).code;
    console.log(result_js_code);
}

module.exports = {commaExpression}
