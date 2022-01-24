const {parse} = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
const types = require("@babel/types");

const fs = require("fs");
var js_code = fs.readFileSync('origin.js', {encoding: 'utf-8'});

const ast_code = parse(js_code);

const visitor = {
    StringLiteral(path){
        // console.log(path.node)
        delete path.node.extra
    },
};

traverse(ast_code, visitor)

const result_js_code = generator(ast_code, {compact:true}).code;
console.log(result_js_code);
fs.writeFileSync('decode.js', result_js_code)
