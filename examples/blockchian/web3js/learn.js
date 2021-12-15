const Web3 = require('web3')
const HDWalletProvider = require("@truffle/hdwallet-provider");


const web3 = new Web3('https://mainnet.infura.io/v3/d98fda95c7fe411caf3f4fa39247b94a')
// let web3 = new Web3('ws://localhost:8546')
// var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7574"));
// console.log(web3)



const provider = new HDWalletProvider({
    mnemonic: {
        phrase: 'off between chat hawk behave receive load remain learn mosquito degree maximum much cluster twist move bottom client question hello bean diamond saddle father'
    },
    numberOfAddresses: 5,
    addressIndex: 0,
    providerOrUrl: 'https://mainnet.infura.io/v3/d98fda95c7fe411caf3f4fa39247b94a'
})
web3.setProvider(provider)

web3.eth.getAccounts().then(i => {
    console.log(i)
})

web3.eth.sign('ok', '0x82f155fdaf1fd357c67740961dc41f3e2edb4b8e').then(console.log)