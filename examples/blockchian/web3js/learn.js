
const Web3 = require('web3')

const web3 = new Web3('http://localhost:7545')
// let web3 = new Web3('ws://localhost:8546')
// var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7574"));
// console.log(web3)

web3.eth.getAccounts().then(i => {console.log(i)})


