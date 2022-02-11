



# npm和yarn命令对比
```
npm install						->  yarn
npm install react --save		->  yarn add react
npm uninstall react --save		->  yarn remove react
npm install react --save-dev	->  yarn add react --dev
npm update --save				->  yarn upgrade
```


# nodejs 升级
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


# npm 安装不上的时候 删除/root/.npm目录下的文件看下


# 一些环境变量设置
```

    // 关闭https认证
    NODE_TLS_REJECT_UNAUTHORIZED=0


    // 代理设置
    HTTP_PROXY=http://127.0.0.1:10809
    HTTPS_PROXY=http://127.0.0.1:6152
    ALL_PROXY=SOCKS5://127.0.0.1:6153
    NO_PROXY=localhost,127.0.0.1
```


# uncaughtException 原因
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


# async包的用法
## series 
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
