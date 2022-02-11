
- [1. Solidity 合约编写](#1-solidity-合约编写)
  - [1.1. 一些全局变量](#11-一些全局变量)
  - [1.2. 地址类对象的方法和属性](#12-地址类对象的方法和属性)
  - [1.3. 合约函数定义相关](#13-合约函数定义相关)
  - [1.4. 交易 Transactions](#14-交易-transactions)
  - [1.5. 调用 Calls](#15-调用-calls)
  - [1.6. 调用其他合约](#16-调用其他合约)
  - [1.7. 创建合约实列](#17-创建合约实列)
  - [1.8. 估算某个方法的gas开销](#18-估算某个方法的gas开销)
  - [1.9. 类型转换](#19-类型转换)
  - [1.10. 汇编相关代码](#110-汇编相关代码)
  - [1.11. 数字安全性](#111-数字安全性)
  - [1.12. 自定义错误](#112-自定义错误)
  - [1.13. 1wei = 数字 1 = unit256 1](#113-1wei--数字-1--unit256-1)
  - [1.14. view函数](#114-view函数)
  - [1.15. prue函数](#115-prue函数)
  - [1.16. 继承相关](#116-继承相关)
  - [1.17. 数组](#117-数组)
  - [1.18. 合约向其他地方转账的3种方式](#118-合约向其他地方转账的3种方式)
  - [1.19. 合约接收eth](#119-合约接收eth)
  - [1.20. 合约查看剩余gas gasleft()](#120-合约查看剩余gas-gasleft)
  - [1.21. call函数的使用](#121-call函数的使用)
  - [1.22. delegatecall](#122-delegatecall)
  - [1.23. 调用另外一个函数](#123-调用另外一个函数)
  - [1.24. 在合约中创建另外一个合约](#124-在合约中创建另外一个合约)
  - [1.25. library](#125-library)

# 1. Solidity 合约编写
## 1.1. 一些全局变量
```
1. msg
    msg.sender: 发起合约调用的以太坊地址
    msg.value: 调用方发送的以太币(wei单位)
    msg.data: 调用合约传入的数据
    msg.sig: 传输数据的前4个字节, 这是一个函数选择器
    当一个合约调用另外一个合约的时候, msg的值会发全部发生变化, 体现出新调用方的信息.可以使用delegatecall函数进行阻止该操作.
    
2. tx
    tx.graprice: 调用交易的gas价格
    tx.origin: 发起这个交易的外部账户地址, 不安全
3. block
    block.coinbase: 当前区块的矿工地址.
    block.difficulty: 当前区块的工作量证明
    block.gaslimit: 
    block.number: 区块编号
    block.timestamp: 矿工写入的时间戳
```
## 1.2. 地址类对象的方法和属性
```
address.balance
address.delegatecall() 可以用来调用库合约

```

## 1.3. 合约函数定义相关
````
定义: 
    function FunctionName(parameters){public private internal external} [pure constant view payable] [modifiers] [returns(return types)]
1. 回退函数定义的时候不需要提供名字, 在调用合约的时候没有指明函数名字时会调用的方法.
2. external 不能再合约内部调用, 除非在调用的时候用关键字this
3. internal 不能被外部调用,只能在合约内部调用, 或者派生的子合约中调用
4. private 类似internal 但是无法被当前合约派生的子合约调用.

5. constant 或 view 表示不对任何状态进行修改
6. pure 表明这个函数不会在区块链存储中读取或写入任何数据
7. payable 函数用于接收外部的支付。未声明为payable的函数不能接收任何以太币支付。但是由于EVM的设计决策,有两种意外情况:区块挖矿的奖励支付和SELFDESTRUCT的合约注销

8. 构造函数, 可以和函数同名, 或者使用关键字constructor, 在合约创建的过程中执行一次.
9. 析构函数 selfdestruct(address recipient) 参数为接收以太币的地址
10. modifier 修饰符函数 在修饰符内部, 修饰符所作用到的函数能够访问所有变量和参数。
11. 使用 is 关键字来指定父合约
    constract Child is Parent1, parent2 {
    ... 
    }
12. 错误处理 assert require 
    assert(bool condition) : 用来判断条件为真的情况, 一般用于合约内部。
    require: 一般用来测试输入对外部变量的期望。提供第二个参数,用来写入日志信息。
13. 事件
````

## 1.4. 交易 Transactions
```
消耗Gas 费用（以太） 
会更改网络状态 
不会立即执行（需要等待网络矿工打包） 

会返回一个res对象, 其中res.logs[0].event查看事件的名称了res.logs[0].args查看事件的参数
```

## 1.5. 调用 Calls
```
免费（不消耗 Gas） 
不改变网络状态
立即执行 
有返回值
```

## 1.6. 调用其他合约
```
send
call 危险 会把msg的上下文变成发起调用的合约
callcode 危险 将被废弃
delegatecall msg上下文保持不变 库合约也是使用这种方式调用的, 库合约代码始终运行在调用发起方的上下文


调用IThrow1函数?
address(this).call(abi.encodePacked(this.IThrow1.selector));
```

## 1.7. 创建合约实列
```
_faucet = new Faucet()
new关键字也接收可选的参数,这些参数用来指定合约创建时转入的以太币数量,以及可能需要传递给新合约构造函数的一些参数
_faucet = (new Faucet).value(0.5 ether)
使用输入传递的地址并将他们转换为特定对象, 这样做非常危险
_faucet = Faucet(_f)
```

## 1.8. 估算某个方法的gas开销
```
估算某个方法的gas开销
var contract = web3.eth.contract(abi).at(address); 
var gasEstimate = contract.myAweSomeMethod.estimateGas(arg1, arg2, {from:account});
查看某个方法的部署gas
Contract.new.estimateGas()


获取当前网格中的gas价格
var gasPrice = web3.eth.getGasPrice();

估算一个调用的gas开销
var gasCostInEther = web3.fromWei((gasEstimate * gasPrice), 'ether')


```


## 1.9. 类型转换
```
https://me.tryblockchain.org/solidity-conversions.html

address payable addr1 = msg.sender;
address addr2 = addr1; // 隐式转
address addr3 = address(addr1); // 显式转

// 直接声明一个地址
address _owner = 0xDF12793CA392ff748adF013D146f8dA73df6E304;

uint160 => address
uint160 _ownerUint = 1273516916528256943268872459582090959717186069252;
address(_ownerUint)
```

## 1.10. 汇编相关代码
```
1. mload 加载对应的内存地址的值. 
   在EVM中, 前6个字节为保留字节, 其中0x40-0x40中存储着可用内存地址的值
   let memValue := mload(0x04) // 将0x40处的值加载到memValue中,从0x40中加载32字节
2. mstore(p, v)  mem[p…(p+32)) := v 将数据存储到对应地址 
3. calldatacopy(t, f, s) : 从f地址复制s个bytes到t
4. calldatasize 交易调用时候的data大小, 以bytes表示
5. call callcode delegatecall 调用函数, 返回值0表示失败, 1表示成功. 调用的地址返回值存储在out地址, 大小为outsize, 使用如下可以访问返回值:
  let size := returndatasize  // 读取返回值大小
  returndatacopy(ptr, 0, size) // 将返回值copy到ptr处
```

## 1.11. 数字安全性
```
在0.8版本之前, 数字的溢出并不会报错, 在0.8之后会报错
如果不需要报错, 可以使用unchecked
uint x = 0;
unchecked { x--; }
```

## 1.12. 自定义错误
```
通过自定义错误的error 会比使用revert('error') 消耗更少的gas.
error Unauthorized(address ret);  // 写在函数外或者合同的外部都可以 Unauthorized为自己去的名字
revert Unauthorized(...); // 函数内使用
```

## 1.13. 1wei = 数字 1 = unit256 1
```
bool public isOneWei = 1 wei == 1; // true
bool public isOneEther = 1 ether == 1e18;
```

## 1.14. view函数
```
1. view 函数不会修改内部的状态
2. 可以使用opcode的STATICCALL进行view函数的调用, 如果使用DELEGATECALL调用view不会检查状态的改变, 这不会对调用view函数有安全影响, 因为在编译阶段就已经检查了.
3. view 函数以下情景会被认为是状态的改变
   * 对于state变量的修改
   * 产生了事件
   * 创建另外一个合约
   * 使用了selfdestruct
   * 发送了eth
   * 调用了非view 或者 pure修饰的函数
   * 使用低级调用。
   * 使用包含特定操作码的内联汇编。
```

## 1.15. prue函数
```
1. 承诺不修改也不读取状态
2. STATICCALL不能保证状态不被阅读, 但能保证状态不被修改
3. 同view一样的修改状态的情景, 还包括一下
   * 读取了state变量
   * 访问 address(this).balance 或者 <address>.balance
   * 访问 block，tx， msg 中任意成员 （除 msg.sig 和 msg.data 之外）。
   * 调用任何未标记为 pure 的函数。
   * 使用包含某些操作码的内联汇编。

4. 在EVM层面无法保证状态的读取.
```


## 1.16. 继承相关
```solidity
1. 继承合约的2种初始化父函数的方式
    // Pass the parameters here in the inheritance list.
    contract B is X("Input to X"), Y("Input to Y") {

    }
    contract C is X, Y {
        // Pass the parameters here in the constructor,
        // similar to function modifiers.
        constructor(string memory _name, string memory _text) X(_name) Y(_text) {}
    }
2. 多重继承的时候, 父函数的构造函数调用顺序为is的时候填写的顺序, 不会管在构造函数的时候指定的顺序, 以下会依次调用X Y E
  contract E is X, Y {
      constructor() Y("Y was called") X("X was called") {}
  }

3. 继承顺序应该从 base to drived

4. 多继承搜索函数的时候按照right to left, and in depth-first manner.顺序搜索.

5. 2种调用父函数的方式
   * 直接通过A.foo()方式调用
   * 通过super.foo(), 这种方式会调用所有父函数的方法.

6. 对于state 变量, 子合约中直接赋值的话不会修改父合约该变量的值, 需要通过在构造函数中赋值.
```

## 1.17. 数组
```
1. array.push(i) // 添加一个数据
2. array.pop()  // 末尾删除一个数据
3. array.length // 长度
4. delete array[index] // 移除index处的函数设置成0, 这个并不会删除那个位置的元素, 数组长度也不会变.
```

## 1.18. 合约向其他地方转账的3种方式
```
1. transfer 出错会直接异常, 对于回退函数的调用有2300gas的限制
2. send     返回bool, 对于回退函数有2300gas的限制
3. call     返回bool, 和data数据. 丢与fallback函数的gas limit为这次合约调用的limit
   (bool sent, bytes memory data) = _to.call{value: msg.value}("");
   
```

## 1.19. 合约接收eth
```
至少要有以下2个函数
receive() external payable
fallback() external payable
receive() is called if msg.data is empty, otherwise fallback() is called.
```

## 1.20. 合约查看剩余gas gasleft()

## 1.21. call函数的使用
```
1. 调用另外一个合约的函数
    (bool success, bytes memory data) = _addr.call{value: msg.value, gas: 5000}(
                abi.encodeWithSignature("foo(string,uint256)", "call foo", 123)
            );
```
##  1.22. delegatecall
```
1.该调用的上下文为调用方的上下文, 比如a合约通过delegatecall调用b合约的一个函数, 如果x变量在a和b中都有, 那么调用的b合约中的函数修改x的值, 修改的是a合约中的值.
2.b合约中如果有修改a合约中的变量, 那么b合约的变量声明顺序要和a合约一样
```

## 1.23. 调用另外一个函数
```
1. 可以直接通过合约名来初始化另外一个函数并调用, 以下函数第一个参数直接传入合约地址就可以.Callee是一个合约
     function setX(Callee _callee, uint _x) public {
        uint x = _callee.setX(_x);
    }

    // 或者传入合约地址, 显示的初始化.
    function setXFromAddress(address _addr, uint _x) public {
        Callee callee = Callee(_addr);
        callee.setX(_x);
    }

    // 调用函数的时候并发送eth
    function setXandSendEther(Callee _callee, uint _x) public payable {
        (uint x, uint value) = _callee.setXandSendEther{value: msg.value}(_x);
    }

2. 或者通过上面call和delegatecall调用也可以

3. 传入地址的时候需要注意, 如果是另外一个地址(别的合约), 也刚好有这个函数, 那么也能调用成功
```


## 1.24. 在合约中创建另外一个合约
```
1. 通过new
    Car car = new Car(_owner, _model);
2. 创建合约的时候发送eth
    Car car = (new Car){value: msg.value}(_owner, _model);
```

## 1.25. library
```
1. 直接使用名字来试用library
2. 向某个已知类注入额外功能, using A for B;
    将A的功能注入到B中, 比如using Array for uint[];  Array中有个remove函数, 那么uint的变量就可以直接使用, 或者通过library名字来调用也可以
    uint[] public arr;
    arr.remove(1);  
    Array.remove(arr, 1);
```

