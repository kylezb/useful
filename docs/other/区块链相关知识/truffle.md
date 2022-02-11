- [1. truffle 使用](#1-truffle-使用)
  - [1.1. 报错:Unbox failed!  Error: getaddrinfo ENOENT raw.githubusercontent.com](#11-报错unbox-failed--error-getaddrinfo-enoent-rawgithubusercontentcom)
  - [1.2. migrations](#12-migrations)
  - [1.3. 测试合约](#13-测试合约)
  - [1.4. 控制台](#14-控制台)
    - [1.4.1. 进入控制台的方式](#141-进入控制台的方式)
    - [1.4.2. truffle develop 使用](#142-truffle-develop-使用)
  - [1.5. 对于重载函数可以使用如下区分](#15-对于重载函数可以使用如下区分)
  - [1.6. @truffle/contract](#16-trufflecontract)
# 1. truffle 使用
## 1.1. 报错:Unbox failed!  Error: getaddrinfo ENOENT raw.githubusercontent.com
```
替换host文件为:
199.232.68.133  raw.githubusercontent.com
```

## 1.2. migrations
```
1. artifacts.require(name) name为合约的名称

迁移为啥不重新部署一个新合约
用--reset设置后, 老的合约去哪了
```

## 1.3. 测试合约
```
1. 可以直接使用合约名字来访问合约抽象实列
2. const instance = await MyContract.deployed();可以获取合约的实列
```

## 1.4. 控制台
### 1.4.1. 进入控制台的方式
```
1. truffle console
2. truffle develop  会启动一个临时的区块链运行在 127.0.0.1:9545上
```
### 1.4.2. truffle develop 使用
```
compile
migrage
Faucet.deployed().then(i => {FaucetDeployed = i}) // 实列化了合约Faucet的地址,保存到了变量FaucetDeployed中

FaucetDeployed.send(***).then(res => {console.log(res)}) // 可以通过FaucetDeployed直接调用相关函数

```

## 1.5. 对于重载函数可以使用如下区分
```
const instance = await MyContract.deployed();
instance.methods['setValue(uint256)'](123);
instance.methods['setValue(uint256,uint256)'](11, 55);
```


## 1.6. @truffle/contract
```
* MyContract.link(instance): 链接一个合约库, 这种链接方式会消费和报告链接库中的事件
* MyContract.link(name, address) : 这种方式链接一个库,链接库中的事件不会被消费
* MyContract.link(object): 一次链接多个库{name: address, name2: address2}, 链接库中的事件不会被消费

* MyContract.setProvider(provider): 设置web3用来交易
* MyContract.defaults([new_defaults]): 设置通过该抽象合约实列化对象的默认交易值
    MyContract.defaults({
      from: ...,
      gas: ...,
      gasPrice: ...,
      value: ...
    })


* instance.setValue.call(5).then(***); 这种方式只是call不是一个transaction, 不会造成状态的改变.
* 如果一个函数被修饰为view 或者 pure 那么可以不用call来调用, 直接调用函数名. truffle自动会知道这是一个call不是transaction.

* instance.sendTransaction({}).then(result =>{}); 会触发合约的fallback函数
* instance.MyMethod.sendTransaction(函数参数); 强制某个函数调用为transaction
* instance.send(web3.toWei(1, "ether")).then(result => {}); // 只是发送eth
```

















