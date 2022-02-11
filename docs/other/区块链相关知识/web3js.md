- [1. web3js 使用](#1-web3js-使用)
  - [1.1. web3.eth.Contract 相关](#11-web3ethcontract-相关)
    - [1.1.1. 创建一个合约](#111-创建一个合约)
    - [1.1.2. 默认账号, 默认用于from参数](#112-默认账号-默认用于from参数)
    - [1.1.3. 一些配置信息 和 函数](#113-一些配置信息-和-函数)
    - [1.1.4. 部署合约](#114-部署合约)
    - [1.1.5. 调用合约方法 调用函数](#115-调用合约方法-调用函数)
    - [1.1.6. send方法可监听的事件](#116-send方法可监听的事件)
    - [1.1.7. 事件监听](#117-事件监听)
  - [1.2. web3.eth](#12-web3eth)
# 1. web3js 使用
## 1.1. web3.eth.Contract 相关
### 1.1.1. 创建一个合约
```js
new web3.eth.Contract(jsonInterface[, address][, options]);

// 或者如下
var Contract = require('web3-eth-contract');
var contract = new Contract(jsonInterface, address);

// jsonInterface为合约的abi json文件
options = {
  from, // 调用的发起方
  gasPrice, //
  gas,  // 交易最大的gas上线
  data, 合约的二进制
}
```
### 1.1.2. 默认账号, 默认用于from参数
```
web3.eth.Contract.defaultAccount
contractInstance.defaultAccount
```
### 1.1.3. 一些配置信息 和 函数
```
以下web3.eth都可以替换为contractInstance

web3.eth.defaultBlock //指定区块
web3.eth.defaultHardfork
web3.eth.defaultChain // 本地签名交易的时候用的链
web3.eth.defaultCommon
web3.eth.transactionBlockTimeout // 会被用在基于套接字的连接上, 该属性定义了直到第一次确认发生的区块等待数量
web3.eth.transactionConfirmationBlocks //定义了确认交易所需要的区块确认数。
web3.eth.transactionPollingTimeout // 基于HTTP的链接 这个选项定义了 Web3 等待确认交易被网络挖出的收据的秒数。

contractInstance.options.address // 合约地址
contractInstance.copy // 复制一个合约实列
```
### 1.1.4. 部署合约
```js
contractInstance.deploy(options) // 部署一个合约
options = {
  data, // 合约的二进制代码
  arguments, // 构造函数的参数
}

返回值:
  {
    Array, // 传入的参数
    send(Function), // 部署合约, 使用该方法真正部署合约
    estimateGas(Function), // 估算部署要的gas
    encodeABI(Function), // 
  }

demo:
myContract.deploy({
    data: '0x12345...',
    arguments: [123, 'My String']
})
.send({
    from: '0x1234567890123456789012345678901234567891',
    gas: 1500000,
    gasPrice: '30000000000000'
}, function(error, transactionHash){ ... })
.on('error', function(error){ ... })
.on('transactionHash', function(transactionHash){ ... })
.on('receipt', function(receipt){
   console.log(receipt.contractAddress) // 包含新合约地址
})
.on('confirmation', function(confirmationNumber, receipt){ ... })
.then(function(newContractInstance){
    console.log(newContractInstance.options.address) // 带有新合约地址的合约实例
});
```

### 1.1.5. 调用合约方法 调用函数
```js
1. contractInstance.methods.myMethod([param1[, param2[, ...]]])

2. 以下3种方法都可以访问合约函数
   * 方法名: myContract.methods.myMethod(123)
   * 带参数的方法名: myContract.methods['myMethod(uint256)'](123)
   * 方法签名: myContract.methods['0x58cf5f10'](123)


3. 返回值
   object = {
     Array,
     call(Function),
     send(Function),
     estimateGas(Function),
     encodeABI(Function)
   }

4. demo
和使用deploy方法不同, send方法返回的是receipt
send后可以监听事件

myContract.methods.myMethod(123).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'}, function(error, result){
    ...
});

// 或者发生交易并使用 promise
myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
.then(function(receipt){
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
});

// 或者发送交易并使用事件
myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('confirmation', function(confirmationNumber, receipt){
    ...
})
.on('error', function(error, receipt) {
    ...
});
```

### 1.1.6. send方法可监听的事件
```
sending: 在发送交易请求之前触发
  返回值: object
sent: 在发送交易请求且transaction hash未接收到的时候触发
  返回值: object
transactionHash : transaction hash生成了
  返回值: transactionHash: String
receipt:
  返回值: object
confirmation: 每次被确认都会被触发, 会触发24次
  返回值: confirmation: number, receipt:object
error: 
  返回值: error, receipt
```


### 1.1.7. 事件监听
```
myContract.once('MyEvent', {
    filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, 
    // 使用数组表示 或：比如 20 或 23。
    fromBlock: 0
}, function(error, event){ console.log(event); });
```




## 1.2. web3.eth
###连接区块链 geth等
```jsvar Web3 = require('web3');
var web3 = new Web3('http://localhost:8545');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// 改变提供者
web3.setProvider('ws://localhost:8546');
web3.setProvider(new Web3.providers.WebsocketProvider('ws://localhost:8546'));

// 使用本地进程
var net = require('net');
var web3 = new Web3('/Users/myuser/Library/Ethereum/geth.ipc', net); // mac os path
var web3 = new Web3(new Web3.providers.IpcProvider('/Users/myuser/Library/Ethereum/geth.ipc', net)); // mac os path
// on windows the path is: "\\\\.\\pipe\\geth.ipc"
// on linux the path is: "/users/myuser/.ethereum/geth.ipc"

// 连接远程提供
// Using a remote node provider, like Alchemy (https://www.alchemyapi.io/supernode), is simple.
var Web3 = require('web3');
var web3 = new Web3("https://eth-mainnet.alchemyapi.io/v2/your-api-key");
```