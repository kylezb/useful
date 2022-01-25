const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types")
const generator = require("@babel/generator").default;
const fs = require("fs");

// npm install @babel/core 安装依赖
var jscode = fs.readFileSync('origin.js').toString()

const ast = parser.parse('let a = [1,2,3,5]');


t.isPrototypeOf()