export {}


let a = [1, 2, 3, 4, 5]

//find函数可能会返回数值或者undefined
let ret = a.find(r => r > 0)


// console.log(ret * ret)


//断言

let num1 = ret as number

let num2 = <number>ret

console.log(num1 * num2)


