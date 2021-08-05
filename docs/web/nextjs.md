

# 获取数据
* getStaticProps(context) 
```
服务端运行的函数
传入参数:context包含:
    1. params, 从 getStaticPaths 获取的数据
    2. preview
    3. previewData 
    4. locale
    5. locales 
    6. defaultLocale 
    7. redirect 
        redirect : {
        destination: '/',
        permanent: false,
      }
    
返回值:
    1. props, 一个对象, 其中包含具体的数据
    2. revalidate 从新生成页面时间, 比如设置为 10, 那么10秒内的数据都用上回缓存的, 当10秒后的第一个请求到来, 后端会重新生成页面.
    3. notFound : boolean, 返回404状态

```

* getStaticPaths()
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
    
    

```

* getServerSideProps() 
```
服务端渲染函数
参数和getStaticProps类似, 多以下几个:
    1. req
    2. res
    3. query
    4. resolvedUrl
```



# 样式
* 全局样式需要在page下创建_app.js进行导入