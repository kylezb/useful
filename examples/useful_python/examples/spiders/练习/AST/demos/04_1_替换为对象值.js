const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types")
const generator = require("@babel/generator").default;


function objectReplaceToValue(astCode) {

    const vis = {
        VariableDeclarator(path) {

            const {id, init} = path.node;

            if (!t.isObjectExpression(init)) return;

            let name = id.name;

            let properties = init.properties;


            let all_next_siblings = path.parentPath.getAllNextSiblings();


            for (let next_sibling of all_next_siblings) {


                if (!next_sibling.isExpressionStatement()) break;


                let expression = next_sibling.get('expression');


                if (!expression.isAssignmentExpression()) break;


                let {operator, left, right} = expression.node;


                if (operator != '=' || !t.isMemberExpression(left) || !t.isIdentifier(left.object, {name: name})) {


                    break;

                }


                properties.push(t.ObjectProperty(left.property, right));


                next_sibling.remove();


            }

        },
    }
    traverse(astCode, vis);
    const visitor = {
        VariableDeclarator(path) {

            const {id, init} = path.node;

            //特征判断，对象为空则不处理

            if (!t.isObjectExpression(init) || init.properties.length == 0) return;


            let name = id.name;

            let scope = path.scope;


            for (const property of init.properties) {//遍历key、value

                let key = property.key.value;

                let value = property.value;


                //一般ob混淆，key长度都是5，也有是3的，大家调整即可。

                if (key.length !== 5) return;


                if (t.isLiteral(value)) {//如果是字面量
                    console.log(scope.block)
                    scope.traverse(scope.block, {

                        MemberExpression(_path) {//遍历MemberExpression，找出与key相同的表达式

                            let _node = _path.node;

                            if (!t.isIdentifier(_node.object, {name: name})) return;

                            if (!t.isLiteral(_node.property, {value: key})) return;

                            _path.replaceWith(value);

                        },

                    })

                } else if (t.isFunctionExpression(value)) {//如果是函数表达式

                    let ret_state = value.body.body[0];

                    //特征判断，如果不是return表达式

                    if (!t.isReturnStatement(ret_state)) continue;

                    scope.traverse(scope.block, {

                        CallExpression: function (_path) {

                            //遍历CallExpression

                            let {callee, arguments} = _path.node;

                            // callee 应该是个a["iwvEK"], 是个MemberExpression
                            if (!t.isMemberExpression(callee)) return;


                            if (!t.isIdentifier(callee.object, {name: name})) return;

                            if (!t.isLiteral(callee.property, {value: key})) return;


                            if (t.isCallExpression(ret_state.argument) && arguments.length > 0) {

                                //构造节点

                                _path.replaceWith(t.callExpression(arguments[0], arguments.slice(1)));

                            } else if (t.isBinaryExpression(ret_state.argument) && arguments.length === 2) {

                                //构造节点

                                let replace_node = t.binaryExpression(ret_state.argument.operator, arguments[0], arguments[1]);

                                _path.replaceWith(replace_node);

                            } else if (t.isLogicalExpression(ret_state.argument) && arguments.length === 2) {

                                //构造节点

                                let replace_node = t.logicalExpression(ret_state.argument.operator, arguments[0], arguments[1]);

                                _path.replaceWith(replace_node);

                            }

                        }

                    })

                }

            }

        },
    }
    traverse(astCode, visitor);
}

if (require.main === module) {
    const jscode = `
    
 // ob混淆key的长度一般是固定的
var a = {
    "YJJox": "object",
    "sbTga": function (b, c) {
      return b | c;
    },
    "iwvEK": function (b, c) {
      return b && c;
    },
    "HqkiD": function (b, c) {
      return b(c);
    },
};
b = a["iwvEK"](1, 3),c = a["sbTga"](111,222),d = a["YJJox"],e = a["HqkiD"](String.fromCharCode,49)


// 对象key value定义在外边的
var h = {};
h["bbbba"] = "hello wolrd";
h["bbbbb"] = function (a,b)
{
   return a | b;
}

cc = h['bbbbb'](1, 2)
        `;
    let ast = parser.parse(jscode);
    objectReplaceToValue(ast)
    let result_js_code = generator(ast).code;
    console.log(result_js_code);
}

module.exports = {objectReplaceToValue}
