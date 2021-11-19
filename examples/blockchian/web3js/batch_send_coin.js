// var Contract = require('web3-eth-contract')
// const {jsonapi} = require("./Adoption");
// Contract.setProvider("http://127.0.0.1:7545")
// let jsonInterface = jsonapi
// var contract = new Contract(jsonInterface, '0xbD39fcD8d68F4f0935D435dcfcB532c8b0b78aA5')
// // 调用函数
// // contract.methods.getAdopters().call().then(ret => {
// //     console.log(ret)
// // })
//
// // 交易函数
// // contract.methods.adopt(10).send({from: "0xF2FC45AAe8dB881Ec31b1621D9EbfecC609023F7"})
// //     .on("receipt", ret => {
// //         console.log(ret)
// //     })
//
// var contract2 = contract.clone()
// console.log(contract.options.address, contract2.address)


var Contract = require('web3-eth-contract')
const {batchsendapi} = require("./batch_send");
let Web3 = require("web3")
// let web3 = Web3(Web3.HTTPProvider('https://mainnet.infura.io/v3/d98fda95c7fe411caf3f4fa39247b94a'))
let web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/154350b255234ff6849eba9e883082b0'));
// let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
// Contract.setProvider("http://127.0.0.1:8545")
// var contract = new Contract(batchsendapi, '0xdd783744B4AeE7be6ecac8e5f48AC3Dce3287470')

let curTime = `0-${Date.now()}-10`

let unique = web3.utils.padRight(web3.utils.stringToHex(curTime), 64)

let yourData = web3.eth.abi.encodeFunctionCall({
    type: 'function',
    name: 'bulksendEther',
    inputs: [ {
        type: 'address[]',
        name: '_to'
    }, {
        type: 'uint256[]',
        name: '_values'
    }, {
        type: 'bytes32',
        name: '_uniqueId'
    } ]
}, [ [ "0xdd783744B4AeE7be6ecac8e5f48AC3Dce3287470", "0xCE328e331c3F142FfdaB15C1E0A3bf32858c7893", "0xF2FC45AAe8dB881Ec31b1621D9EbfecC609023F7" ],
    [ '200000000000000000', '100000000000000000', '100000000000000000' ],
    unique ]);

web3.eth.accounts.wallet.add('657486810681d69e148c94c3114349107a79f2a88c2e1f4b115dbf7300871ff2');
console.log(web3.eth.accounts)
web3.eth.sendTransaction({
    from: "0x0139235dD734350273E64B8a00A1d844d4F59C1D",
    to: "0xdd783744B4AeE7be6ecac8e5f48AC3Dce3287470",
    data: yourData,
    gas: 2172889,
    value:210000000000000000
}).on('transactionHash', function (hash) {
    console.log(hash)
}).on('receipt', function (receipt) {
        console.log(receipt)
}).on('confirmation', function (confirmationNumber, receipt) {
        console.log(confirmationNumber)
}).on('error', console.log); // If a out of gas error, the second parameter is the receipt.


// contract.methods['0x95c2c673'](
//     ["0xdd783744B4AeE7be6ecac8e5f48AC3Dce3287470",
// "0xCE328e331c3F142FfdaB15C1E0A3bf32858c7893",
// "0xF2FC45AAe8dB881Ec31b1621D9EbfecC609023F7"],
//     [200000000000000000,
//     100000000000000000,
//     100000000000000000,],
//     '0x302d313633363936313230333037652d37310000000000000000000000000000',
// ).send({from:"0x0139235dD734350273E64B8a00A1d844d4F59C1D"}).on('transactionHash', function(hash){
//     console.log(hash)
// })
// .on('receipt', function(receipt){
//     console.log(receipt)
// })
// .on('confirmation', function(confirmationNumber, receipt){
//     console.log(confirmationNumber)
// })
// .on('error', function(error, receipt) {
//     console.log(error)
// });


