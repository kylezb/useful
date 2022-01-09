let $_ts = {}



atob = (b64Str) => Buffer.from(b64Str, `base64`).toString(`binary`)

function decode_ts(a59) {
    let yuanrenxue_59 = a59
    let yuanrenxue_36 = ''
    for (let yuanrenxue_229 = 0; yuanrenxue_229 < $_ts["dfe1683"]["length"]; yuanrenxue_229++) {
        yuanrenxue_36 += String["fromCharCode"]($_ts["dfe1683"][yuanrenxue_229]["charCodeAt"]() - yuanrenxue_229 % yuanrenxue_59 - 50);
    }

    return atob(yuanrenxue_36)
};




// console.log(decode_ts(1413))


