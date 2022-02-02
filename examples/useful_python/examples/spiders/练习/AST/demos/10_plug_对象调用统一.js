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
        MemberExpression:
            {
                exit({node}) {
                    const prop = node.property;
                    if (!node.computed && t.isIdentifier(prop)) {
                        node.property = t.stringLiteral(prop.name);
                        node.computed = true;
                    }
                }
            },
        ObjectProperty:
            {
                exit({node}) {
                    const key = node.key;
                    if (!node.computed && t.isIdentifier(key)) {
                        node.key = t.stringLiteral(key.name);
                    }
                }
            },
    }
    traverse(astCode, visitor);
}

if (require.main === module) {
    const jscode = `

var a = b.length;
var foo = {
  bar: function () {},
}
        `;
    let ast = parser.parse(jscode);
    objectUnifyHandler(ast)
    let result_js_code = generator(ast).code;
    console.log(result_js_code);
}

module.exports = {objectUnifyHandler}
