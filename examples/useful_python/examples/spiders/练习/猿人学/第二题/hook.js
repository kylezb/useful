// ==UserScript==
// @name        2 hook
// @namespace   http://match.yuanrenxue.com/
// @match       http://match.yuanrenxue.com/
// @version     0.1
// @description try to take over the world!
// @author      You
// @include     *
// @grant       none
// @run-at      document-start
// ==/UserScript==


Object.defineProperty(document, ' cookie', {
    get: function () {
        console.log("***")
        return "";
    },
    set: function (val) {
        console.log('Setting cookie', val);
        // 填写cookie名
        if (val.indexOf('m') != -1) {
            debugger;
        }
        return value
    }
});