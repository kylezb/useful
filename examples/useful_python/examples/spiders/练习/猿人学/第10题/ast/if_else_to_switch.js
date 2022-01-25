const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types")
const generator = require("@babel/generator").default;
const fs = require("fs");

// npm install @babel/core 安装依赖
var jscode = fs.readFileSync('origin.js').toString()


// jscode = 'let a = 10;\n' +
//     'while(true){\n' +
//     '  if(a>10) console.log(\'ok\')\n' +
//     '  else if(a>10) a += 10\n' +
//     '}'

const ast = parser.parse(jscode);
// console.log(JSON.stringify(ast))

function replaceifstate2block(path) {
    // 对alternate是IfStatement套一个blockStatement
    let alternate_path = path.get('alternate');
    let node = alternate_path.node;
    if(!path.isIfStatement()) return
    if (!t.isIfStatement(node)) return;
    alternate_path.replaceWith(t.blockStatement([ node ]))
}

function addblockwrap(path) {
    let node = path.node;
    let parentNode = path.parent;
    // 当前节点的父节点也是IfStatement的情况
    if (t.isIfStatement(parentNode)) {
        path.replaceWith(t.blockStatement([ node ]));
    }
}


traverse(ast, {
    IfStatement: replaceifstate2block,
})

traverse(ast, {
    ExpressionStatement: addblockwrap,
})


// let result_js_code = generator(ast).code;
// console.log(result_js_code);


function replaceWhile(path) {
    // 反控制流平坦化
    var node = path.node;
    // 判断是否是目标节点
    if (!(t.isBooleanLiteral(node.test) || t.isUnaryExpression(node.test) || t.isLiteral(node.test)))
        // 如果while中不为true或!![]
        return;
    if (!(node.test.prefix || node.test.value))
        // 如果while中的值不为true
        return;
    var body = node.body.body;  //node是一个whilestatement,  whilestatement 的 body是一个 blockstatement, blockstatement的body又是一个数组
    // var body = node.body;
    // console.log(t.isBlockStatement(body))
    if (!t.isIfStatement(body[1]))
        return;
    var ifstat = body[1];
    var caseList = [];
    solveIfStat(ifstat)

    function solveIfStat(ifstat) {
        if (t.isBinaryExpression(ifstat.test)) {
            var consequentstat = ifstat.consequent;
            var alternatestat = ifstat.alternate;
            solveConsequentStat(consequentstat);
            solveAlternateStat(alternatestat);
        } else {
            //其他非控制流的if表达式
            caseList.push(ifstat)
        }

    }

    function solveConsequentStat(consequentstat) {
        if (!t.isBlockStatement(consequentstat)) return
        // ConsequentStat中肯定是一个blockstat, 其中有2种情况, 一种是继续是一个ifstat, 另外已经是一个expstat了
        if (t.isIfStatement(consequentstat.body[0])) {
            solveIfStat(consequentstat.body[0])
        } else {
            // 对于consequentstat.body 只有一个元素的把外面的括号拆了
            if (consequentstat.body.length == 1) {
                console.log(consequentstat.body[0].type)
                caseList.push(consequentstat.body[0]);
            } else {
                caseList.push(consequentstat);
            }
        }
    }

    function solveAlternateStat(alternatestat) {
        if (!t.isBlockStatement(alternatestat)) return
        if (t.isIfStatement(alternatestat.body[0])) {
            solveIfStat(alternatestat.body[0])
        } else {
            if (alternatestat.body.length == 1) {
                caseList.push(alternatestat.body[0]);
            } else {
                caseList.push(alternatestat);
            }
        }
    }

    // console.log(caseList)
    console.log(caseList.length)
    // 自增表达式
    let discriminNode = body[0].expression; // body是whilestate中的blockstate的body数组
    for (let index = 0; index < caseList.length; index++) {
        let testNode = t.valueToNode(index);
        let consequent = [ caseList[index], t.breakStatement() ];
        let SwitchCaseNode = t.switchCase(testNode, consequent);
        caseList[index] = SwitchCaseNode;
    }
    let switchNode = t.switchStatement(discriminNode, caseList);
    path.get('body.body')[1].replaceWith(switchNode)
    path.get('body.body')[0].remove()
}

traverse(ast, {WhileStatement: {exit: [ replaceWhile ]},})


result_js_code = generator(ast).code;
console.log(result_js_code);



