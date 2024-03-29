- [1. 获取数据](#1-获取数据)
  - [1.1. getStaticProps(context)](#11-getstaticpropscontext)
  - [1.2. getStaticPaths()](#12-getstaticpaths)
  - [1.3. getServerSideProps()](#13-getserversideprops)
  - [1.4. next/image](#14-nextimage)
- [2. 样式](#2-样式)
  - [2.1. _app.js](#21-_appjs)
  - [2.2. _document.js](#22-_documentjs)
  - [2.3. link](#23-link)
  - [2.4. useRouter](#24-userouter)
  - [2.5. 使用配置中的内容](#25-使用配置中的内容)
- [3. getInitialProps](#3-getinitialprops)
  - [3.1. 返回一个对象, 在页面函数中可以解析出来它的值](#31-返回一个对象-在页面函数中可以解析出来它的值)
  - [3.2. 添加全局样式](#32-添加全局样式)
  - [3.3. 允许从node_modules加载css样式](#33-允许从node_modules加载css样式)
- [4. next/image的使用](#4-nextimage的使用)
  - [4.1. 加载本地图片](#41-加载本地图片)
  - [4.2. domains配置](#42-domains配置)
  - [4.3. Priority](#43-priority)
  - [4.4. 图片的宽高](#44-图片的宽高)
  - [给图片进行style](#给图片进行style)
  - [4.5. 属性](#45-属性)
    - [4.5.1. placeholder](#451-placeholder)
- [5. next-seo](#5-next-seo)

# 1. 获取数据
## 1.1. getStaticProps(context) 
```
服务端运行的函数, 在构建时候生成所有数据
1. 传入参数:context包含:
    1. params, 从 getStaticPaths 获取的数据
    2. preview
    3. previewData
    4. locale
    5. locales 
    6. defaultLocale 
    
2. 返回值:
    1. props, 一个对象, 其中包含具体的数据
    2. revalidate 从新生成页面时间, 比如设置为 10, 那么10秒内的数据都用上回缓存的, 当10秒后的第一个请求到来, 后端会重新生成页面.
    3. notFound : boolean, 返回404状态
    4. redirect  
        redirect : {
          destination: '/',
          permanent: false,
          // statusCode: 301
        }

3. 可以在该函数中读取文件, 使用process.cwd()
```

## 1.2. getStaticPaths()
```
用于生成动态路径
1. pages/posts/[id].js 可用以下返回
    return {
      paths: [
        { params: { id: '1' } },
        { params: { id: '2' } }
      ],
      fallback: ...
    }

2. pages/posts/[postId]/[commentId] 
    return {
      paths: [
        { params: { postId: '1', commentId:'1'} },
        { params: { postId: '2' , commentId: '2'} }
      ],
      fallback: ...
    }
    
3. pages/[...slug]  || pages/foo/bar
    return {
      paths: [
        { params: { slug : ['foo', 'bar']} },
        { params: { slug : ['foo', 'bar2']} }
      ],
      fallback: ...
    }
    
4. pages/[[...slug]] 可选的catch-all, slug为null, [], undefined or false, 那么会渲染为 / 路径

5. fallback
    1. false , 没有被getStaticPaths返回的页面都会返回404, 适用于少量页面
    2. true, 对于没有的页面会先显示一个fallback页面, 当数据加载完成会显示全部页面, 在用户角度来看就像在加载数据 不会更新页面如果要更新结合revalidate使用
        // pages/posts/[id].js
        import { useRouter } from 'next/router'
        
        function Post({ post }) {
          const router = useRouter()
        
          // If the page is not yet generated, this will be displayed
          // initially until getStaticProps() finishes running
          if (router.isFallback) {
            return <div>Loading...</div>
          }
        
          // Render post...
        }
    3. blocking, 对于未返回的新路径, 会等待服务端生成新页面,然后显示, 生成的新页面会加入到预渲染列表中, 下回请求直接使用预渲染的. 不会更新页面如果要更新结合revalidate使用
    
    4. 使用 router.isFallback 可以判断当前页面是否是fallback

```

## 1.3. getServerSideProps() 
```
服务端渲染函数, 在每回请求的时候生成数据
参数和getStaticProps类似, 多以下几个:
    1. req
    2. res
    3. query
    4. resolvedUrl
```


## 1.4. next/image
```
属性: layout="fill" , 图片的宽度和高度会被拉伸到 父元素的尺寸, 也就是说如果父元素没有空间了, 那么不会显示出图片
```


# 2. 样式
* 全局样式需要在page下创建_app.js进行导入

## 2.1. _app.js
```
1. 定义页面通用布局
2. 给页面注入额外公共数据
3. 导入全局样式、通用错误处理等

如果有getInitialProps函数, automatic static optimization会在没有getStaticProps的页面关闭
```

## 2.2. _document.js
```
1. 只会在服务端渲染时调用

```


## 2.3. link
```
import Link from 'next/link'

内部链接跳转使用
<Link href="/about" />
```

## 2.4. useRouter
```
import { useRouter } from 'next/router'
const router = useRouter()
console.log(router.pathname)  

output: /about
```

## 2.5. 使用配置中的内容
``` js
# 在next.config.js文件中配置
module.exports = {
    publicRuntimeConfig: {
        API_URL: process.env.API_URL,
    },
}

# 使用
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
publicRuntimeConfig.API_URL
```




# 3. getInitialProps
## 3.1. 返回一个对象, 在页面函数中可以解析出来它的值
```js

// 
const MyApp = ({ Component, router, a, b }) => {console.log(a, b)}


MyApp.getInitialProps = async (appContext) => {
  return {
    a:'10',
    b:'20
  }
}
```

#样式
## 3.2. 添加全局样式
```test
直接在_app.js文件中import
比如有一个styles.css文件的样式, 那么在_app.js文件import './styles.css' 文件就相当于引入
```
## 3.3. 允许从node_modules加载css样式



# 4. next/image的使用
```
优点:
1. 更快的性能
2. 视图更加稳定, 防止cls发生
3. 更快的记载速度, 提供模糊图片的占位符
4. 多种访问图片的方式
```
## 4.1. 加载本地图片
```js
// 图片的宽高会自动导入
import profilePic from '../public/me.png'
<Image
        src={profilePic}
        alt="Picture of the author"
        // width={500} automatically provided
        // height={500} automatically provided
        // blurDataURL="data:..." automatically provided
        // placeholder="blur" // Optional blur-up while loading
      />
```

## 4.2. domains配置
```js
// 在配置文件中设置哪些域名是允许访问的
module.exports = {
  images: {
    domains: ['assets.vercel.com'],
  },
}

```

## 4.3. Priority
```js
// 对于LCP的优化, 指明当前内容为高优先级, 优先加载.
<Image
  src="/me.png"
  alt="Picture of the author"
  width={500}
  height={500}
  priority
/>
```

## 4.4. 图片的宽高
```js
图片的宽高必须指定, 这样会优化cls, 如果没有指定, 可以使用layout='fill'
```

## 给图片进行style
```js
1. 该<Image>结构都是一个<img>标签被<span>标签包裹
2. 只需要在<Image> 上设置className, 该值会被传递给内部的<img>上
3. 使用layout='fill'时，父元素必须有position: relative
4. 使用layout='responsive'时，父元素必须有display: block, block是<div>默认的行为
```

## 4.5. 属性
### 4.5.1. placeholder
```
当图片还没有加载完成的时候是有占位的模糊图片, 如果有, 需要配合blurDataURL填写模糊图片的地址
```







# 5. next-seo