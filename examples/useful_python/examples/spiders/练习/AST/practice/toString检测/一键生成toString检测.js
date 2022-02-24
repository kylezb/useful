const fs = require('fs');
const parser    = require("@babel/parser");
const traverse  = require("@babel/traverse").default;
const types     = require("@babel/types");
const t         = require("@babel/types");
const generator = require("@babel/generator").default;

//将源代码解析为AST
process.argv.length > 2 ? encodeFile = process.argv[2]: encodeFile ="./encode.js";
process.argv.length > 3 ? decodeFile = process.argv[3]: decodeFile ="./decodeResult.js";

let sourceCode = fs.readFileSync(encodeFile, {encoding: "utf-8"});
let ast    = parser.parse(sourceCode);


let funStringPointArray = {};

const saveFuncString = 
{//保存函数源代码，不要用toString和compact，非原始混淆代码。
	"FunctionDeclaration"(path)
	{
		let {id,start,end} = path.node;
		funStringPointArray[id.name] = [start,end];
	},
	"VariableDeclarator"(path)
	{
		let {id,init} = path.node;
		if (types.isFunctionExpression(init))
		{
			let {start,end} = init;
			funStringPointArray[id.name] = [start,end];
			
			if (init.id != null)
			{
				funStringPointArray[init.id.name] = [start,end];
			}
		}
		if (types.isCallExpression(init) && types.isFunctionExpression(init.callee))
		{
			let {start,end} = init.callee;
			funStringPointArray[id.name] = [start,end];
		}
	}
}


traverse(ast, saveFuncString);


var funStringArray = {};
for ( var funName in funStringPointArray) {
   funStringArray[funName] = sourceCode.substring(funStringPointArray[funName][0],funStringPointArray[funName][1]);
}



let  data = `var _old = Function.prototype.toString.call;
var tostringData =
`

data += JSON.stringify(funStringArray);

data += `

Function.prototype.toString.call = function (arg) {
    if(tostringData.hasOwnProperty(arg.name)){
        return tostringData[arg.name];
    }
    return _old.call(this, arg);
};
`


fs.writeFile('strData.js', data, (err) => {});