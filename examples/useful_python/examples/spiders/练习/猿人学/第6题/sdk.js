



function z(pwd, time) {
    var n = _n("jsencrypt");
    var g = (new n);
    var r = g.encode(pwd, time);
    return r;
}

console.log(z(1644392313000, 1))