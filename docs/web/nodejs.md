

- [1. npm和yarn命令对比](#1-npm和yarn命令对比)
- [2. nodejs 升级](#2-nodejs-升级)
- [3. npm 安装不上的时候 删除/root/.npm目录下的文件看下](#3-npm-安装不上的时候-删除rootnpm目录下的文件看下)
- [4. 一些环境变量设置](#4-一些环境变量设置)
- [5. uncaughtException 原因](#5-uncaughtexception-原因)
- [6. async包的用法](#6-async包的用法)
  - [6.1. series](#61-series)
- [7. 内存泄漏的原因](#7-内存泄漏的原因)


# 1. npm和yarn命令对比
```
npm install						->  yarn
npm install react --save		->  yarn add react
npm uninstall react --save		->  yarn remove react
npm install react --save-dev	->  yarn add react --dev
npm update --save				->  yarn upgrade
```


# 2. nodejs 升级
```
    第一步：
    curl --silent --location https://rpm.nodesource.com/setup_10.x | sudo bash -
    第二步：
    sudo yum -y install nodejs

    如果以上步骤不能安装 最新版 node，执行以下命令后再执行第二步：
    sudo yum clean all
    如果存在多个 nodesoucre，执行以下命令删除，然后重新执行第一第二步：

    sudo rm -fv /etc/yum.repos.d/nodesource*
```


# 3. npm 安装不上的时候 删除/root/.npm目录下的文件看下


# 4. 一些环境变量设置
```

    // 关闭https认证
    NODE_TLS_REJECT_UNAUTHORIZED=0


    // 代理设置
    HTTP_PROXY=http://127.0.0.1:10809
    HTTPS_PROXY=http://127.0.0.1:6152
    ALL_PROXY=SOCKS5://127.0.0.1:6153
    NO_PROXY=localhost,127.0.0.1
```


# 5. uncaughtException 原因
```
const Promise = require('bluebird')

async function a(){
	try{
		new Promise(() => {
			throw new Error('Catch me');
		})

		// throw new Error('Catch me');

	}
	catch (e){
		console.log('***', e)
	}
}
a()

```


# 6. async包的用法
## 6.1. series 
```
    var async = require('async');

    async.series([
        function(callback) {
            // do some stuff ...
            callback(null, 'one');
        },
        function(callback) {
            // do some more stuff ...
            callback(null, 'two');
        }
    ],
    // optional callback
    function(err, results) {
        // results is now equal to ['one', 'two']
    });

    async.series({
        one: function(callback) {
            setTimeout(function() {
                console.log("ok1")
                callback(null, 1);
            }, 2000);
        },
        two: function(callback){
            setTimeout(function() {
                console.log("ok2")
                callback(null, 2);
            }, 3000);
        }
    }, function(err, results) {
        // results is now equal to: {one: 1, two: 2}
        console.log(results)
        console.log("ok")
    });
```



# 7. 内存泄漏的原因
```
1. 数组的不断添加
2. nodejs中一些实列未被释放, 需要明确手动释放. 因为可能实列中有些setInterval函数的一直在执行
3. 如果使用了EventEmitter类, 那么需要注意事件的监听函数是否添加过多
4. 查看使用的基础服务建立的链接数是否过高, 比如连接redis, mongo. , 连接过高, 是由于不断的在初始化链接然后使用链接, 正常来说, 应该初始化一个链接,然后该链接后续一直使用. 
5. 查找技巧: 全局查找new的地方, 对于数组变量查看是否正常, 查看服务连接数量, 查看网络句柄, 文件句柄是否正常. 二分查找, 查看是否有一直循环的地方. 打印堆栈进行数据的对比.
```