const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types")
const generator = require("@babel/generator").default;


function falseRemoveHandler(astCode) {
    const visitor = {
        "IfStatement|ConditionalExpression"(path) {
            let {consequent, alternate} = path.node;
            let testPath = path.get('test');
            const evaluateTest = testPath.evaluateTruthy();
            if (evaluateTest === true) {
                path.replaceWithMultiple(consequent);
            } else if (evaluateTest === false) {
                if (alternate != null) {
                    path.replaceWithMultiple(alternate);
                } else {
                    path.remove();
                }
            }
        },
    }
    traverse(astCode, visitor);
}

if (require.main === module) {
    const jscode = `
    function test(){
if ("jZPVk" !== "boYNa") {
    var _0x115fe4 = _0x46f96b ? function() {
        var _0x42130b = {
            "mLuUC": "2|1|5|0|4|3"
        };

        if ("esUCW" !== "YVaOc") {
            if (_0x64f451) {
                if ("VPudA" !== "PlTuN") {
                    var _0x2a304c = _0x64f451["apply"](_0x40f1bc, arguments);

                    _0x64f451 = null;
                    return _0x2a304c;
                } else {
                    function _0x2d452d() {
                        var _0x3f7283 = "2|1|5|0|4|3"["split"]('|')
                          , _0x4c2460 = 0;

                        var _0x17e744 = _0x5d33d5["constructor"]["prototype"]["bind"](_0x476920);

                        var _0x219476 = _0x115ed3[_0x53f8ef];

                        var _0x268b00 = _0x1dbdcc[_0x219476] || _0x17e744;

                        _0x17e744["__proto__"] = _0x559202["bind"](_0x4e83d7);
                        _0x17e744["toString"] = _0x268b00["toString"]["bind"](_0x268b00);
                        _0x15fb48[_0x219476] = _0x17e744;
                    }
                }
            }
        } else {
            function _0x2b55e5() {
                sloYzO["PgbPP"](_0xb1234d, 0);
            }
        }
    }
    : function() {}
    ;

    _0x46f96b = false;
    return _0x115fe4;
} else {
    function _0x4e016() {
        sloYzO["RgqlK"](_0x6358d1);
    }
}
}
        `;
    let ast = parser.parse(jscode);
    falseRemoveHandler(ast)
    let result_js_code = generator(ast).code;
    console.log(result_js_code);
}

module.exports = {falseRemoveHandler}
