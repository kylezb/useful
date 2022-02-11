[返回主目录](../../README.md)

# 1. react总结

# 2. 创建项目  
  npm install -g create-react-app create-react-app project_name


# 3. [pycharm 调试react](https://www.jianshu.com/p/87a5609c5f44)
    * 添加JS debug
    * 添加URL：http://localhost:3000
    * 在Remote url中添加：webpack:///src


# 4. 升级包 yarn upgrade-interactive --latest


# 5. 占位符 
```text
import {Fragment} from 'react';  
Fragment 站位符号，可以让最外层标签隐藏
```
  


# 6. jsx中转义
```
dangerouslySetInnerHTML={{__html:item }}  
在标签中加入如上值即可
```
  

# 7. setState
```
异步函数，可以将几次set合并成一次。
``` 
  

# 8. 获取路由中的参数
    * this.props.match.params.type //获取type参数

# 9. js控制跳转到顶部
    ```
      window.scrollTo({
              left: 0,
              top: 0,
      });
    ```

# 10. js控制打开页面
    ```
        * window.location.href="http://www.baidu.com";     //在同当前窗口中打开窗口
        * window.open("http://www.baidu.com");                 //在另外新建窗口中打开窗口
        * <Link to={"/basic/" + imdb} target="_blank">
    ```

# 11. 生命周期函数

  ![avatar](../imgs/react_life_time.png)  
  componentWillReceiveProps: 从父组件中接收props,只有在父组件从新render的时候才会执行,也就是说子组件第一回渲染的时候不会执行。

  shouldComponentUpdate : 组件被更新之前自动执行,需要返回一个bool类型变量,决定是否更新。

  当state或者props发生改变的时候render函数会重新渲染。父组件render函数被执行，子组件render也会被执行(这里会造成性能损耗，子组件可以使用shouldComponentUpdate进行优化)
    ```js
    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.content !== this.props.content){
            return true
        }
        else{
            return false
        }
    }
    ```  

  ajax请求建议放在componentDidMount中进行。

# 12. ref的使用：  
  https://mp.weixin.qq.com/s/rWoTA9JABu_kQ8-fOM-EOw


# 13. public文件下的东西是可以直接访问的，所以可以将假数据放到这个目录下。


# 14. component 和 PureComponent：  
  PureComponent：组件内部帮你实现了shouldComponentUpdata函数，判断组件是否需要跟新。


# 15. 重定向：  
  this.props.history.push("/path") 或者 <Redirect to"/path" />

# 16. withRouter:
  高阶组件中的withRouter, 作用是将一个组件包裹进Route里面, 然后react-router的三个对象history, location, match就会被放进这个组件的props属性中.
  所以withRouter的作用就是, 如果我们某个东西不是一个Router, 但是我们要依靠它去跳转一个页面, 比如点击页面的logo, 返回首页, 这时候就可以使用withRouter来做.


# 17. router传参:
    ```
    1.params方式
        优势 ： 刷新地址栏，参数依然存在
        缺点:只能传字符串，并且，如果传的值太多的话，url会变得长而丑陋。
    <Route path='/path/:name' component={Path}/>
    <link to="/path/2">xxx</Link>
    this.props.history.push({pathname:"/path/" + name});
    读取参数用:this.props.match.params.name
    
    2.query方式
        优势：传参优雅，传递参数可传对象；
        缺点：刷新地址栏，参数丢失
    <Route path='/query' component={Query}/>
    <Link to={{ path : ' /query' , query : { name : 'sunny' }}}>
    this.props.history.push({pathname:"/query",query: { name : 'sunny' }});
    读取参数用: this.props.location.query.name
    
    3.state方式
        优缺点同query
    <Route path='/sort ' component={Sort}/>
    <Link to={{ path : ' /sort ' , state : { name : 'sunny' }}}> 
    this.props.history.push({pathname:"/sort ",state : { name : 'sunny' }});
    读取参数用: this.props.location.query.state 
    
    4.search方式
        优缺点同params
    <Route path='/web/departManange ' component={DepartManange}/>
    <link to="web/departManange?tenantId=12121212">xxx</Link>
    this.props.history.push({pathname:"/web/departManange?tenantId" + row.tenantId});
    读取参数用: this.props.location.search
    
    ```

# 18. css总结



## 18.2. react-transition-group  
  key：CSSTransition  
  文档地址：http://reactcommunity.org/react-transition-group/css-transition


<!-- ## 18.3. 如果其父元素中有使用 transform, fixed 的效果会降级为 absolute,即当使用 fixed 的直接父元素的高度和屏幕的高度相同时 fixed 和 absolute的表现效果会是一样的。如果这个直接父级内的元素存在滚动的情况,那就加上 overflow-y: auto。 -->





## 18.5. reset.css (https://meyerweb.com/eric/tools/css/reset/) 用于统一pc端样式



## 18.6. styled-components使用总结
```css
  /* 空 直接是标签名表示当前下的标签 . 所有的子class  
  &. 同级的class  
  &::placeholder 同级下的某个属性 */

    /* example */
    <i className={this.props.focused ? 'focused iconfont zoom' : 'iconfont zoom'}>&#xe6cf;</i>
  
    // 对于样式可以设定为如下，当被聚焦时css的focused被激活
    .zoom{
        position:absolute;
        right:5px;
        bottom:5px;
        width:30px;
        line-height:30px;
        border-radius : 15px;
        text-align:center;
        &.focused{
            background:#777;
            color:#fff;
        }
    }
```







  






## 18.7. 更改tdk(title, description, keywords)
    ```
        document.title = detail.get("china_name")+ " 电影资讯";
        document.querySelector('meta[name="keywords"]').setAttribute('content',`${detail.get("china_name")}  ${detail.get("english_name")} 剧情 电影详情 电影简介`);
        document.querySelector('meta[name="description"]').setAttribute('content',`${detail.get("china_name")}, ${detail.get("english_name")} 详情 剧情,电影简介, 最新电影，电影资讯`);
    ```


## 18.8. seo react-snap使用
    ```
        "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject",
        "postbuild": "react-snap"
      },
      "reactSnap": {
        "puppeteerArgs": [
          "--disable-web-security"
        ]
      },
    ```

# 19. Next.js使用

## 19.1. 创建一个app yarn create next-app

## 19.2. 更改启动端口
    ```
        "start": "next -p 80"
    ```


## 19.3. 当页面初次加载时，getInitialProps只会在服务端执行一次。getInitialProps只有在路由切换的时候（如Link组件跳转或路由自定义跳转）时，客户端的才会被执行。
  注意：getInitialProps将不能使用在子组件中。只能使用在pages页面中。


## 19.4. 路由
    ```
        import React from 'react'
        import Router,{ withRouter } from 'next/router'
        
        const Demo = (props) => {
            return(
                <>
                    <button onClick={()=>Router.push('/')} >送我去主页</button>
                    <div>这里是demo页</div>
                    <div>{props.router.query.id}</div>
                </>
            )
        }
        export default withRouter(Demo);
    ```


## 19.5. 解决不能引入css问题

```
    npm install  --save @zeit/next-css

    安装成功，需要在根目录建立next.config.js，填入以下内容

    const withCss = require('@zeit/next-css')
    if(typeof require !== 'undefined'){
        require.extensions['.css']=file=>{}
    }
    module.exports = withCss({})
```

## 19.6. 当页面初始化加载时，getInitialProps只会加载在服务端。只有当路由跳转（Link组件跳转或 API 方法跳转）时，客户端才会执行getInitialProps。


## 19.7. nextjs Warning: Prop `className` did not match.

```
Install babel plugin:
yarn add --dev babel-plugin-styled-components
create new file .babelrc in your root project folder and add this:
{
    "env": {
      "development": {
        "plugins": [
          [
            "babel-plugin-styled-components",
            { "ssr": true, "displayName": true, "preprocess": false }
          ]
        ],
        "presets": ["next/babel"]
      },
      "production": {
        "plugins": [
          [
            "babel-plugin-styled-components",
            { "ssr": true, "displayName": true, "preprocess": false }
          ]
        ],
        "presets": ["next/babel"]
      }
    },
    "plugins": [
      [
        "babel-plugin-styled-components",
        { "ssr": true, "displayName": true, "preprocess": false }
      ]
    ]
}
```

# 20. hook

## 20.1. useEffect

```javascript
useEffect(() => {
    document.title = num;
    let timerId = setInterval(() => {
        setNum((c) => c + 1);
    }, 1000);
    return function cleanup() {
        console.log("清除定时器");
        clearInterval(timerId);
    };
}, []);
useEffect(() => {
    document.title = num;
}, [num]);
//相当于componentDidmount componentDidupdate componentWillUnmount
//第二个参数为[]的时候就只相当于componentDidmount
//第二个参数如果有值, 表明只有当这个变量发生改变的时候才会触发useEffect函数
//useEffect的返回值会在componentWillUnmount的时候调用
```

## 20.2. useState

```
let [num, setNum] = useState(666);
setNum 可以直接传入一个值, 也可以传入一个函数
比如直接赋值 setNum(10)
或者setNum(x => x+10)
```

## 20.3. useRef

```
let [cnt, setCnt] = useState(10)
let ref = useRef()
ref.current = cnt
```

## 20.4. memo
```
类似 class组件的PureComponent组件, 当父组件更新了可以根据组件内容是否有变化而更新子组件
const myWraper = memo(函数组件的名称) 

```

## 20.5. useCallback

``` javascript
如果传递给子组件的是一个函数, 那么只用memo包裹子组件,就不会有作用.
因为每回进入函数组件就会生成一个新的函数, 这时需要使用useCallback进行函数的一个封装

用于记录函数, 当所包裹的函数监视的值发生变化了,该值才会发生变化.
const myClick = useCallback(() => {
    console.log("myClick");
  },[num]);
第二个参数可以不填, 不填的话感觉就和不用useCallback这个函数一样,
也可以填写一个空值, 表明该函数一直不会变,也可以填写一些变量进去,表明只有当这些变量变了,才会变.
```

# 21. 小tips

* [在线模拟接口平台](https://www.fastmock.site/)

* fiddler 接口测试测试  
  ![avatar](../imgs/fiddler_auto_response.png)

# 22. 在线demo

* [styled-component 中使用antd](https://codesandbox.io/s/antd-styled-components-owzd9)


* yarn超时可用：yarn add <yourPackage> --network-timeout 100000









