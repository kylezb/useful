


# 1. html css笔记

[返回上一级](../README.md)


- [1. html css笔记](#1-html-css笔记)
- [2. html](#2-html)
  - [2.1. <h>：代表标题， h1主标题， h2副标题，依次类推。](#21-h代表标题-h1主标题-h2副标题依次类推)
  - [2.2. <p>：代表段落](#22-p代表段落)
  - [2.3. 给标签添加样式:](#23-给标签添加样式)
  - [2.4. 可以应用多个class到一个元素，用空格分开即可](#24-可以应用多个class到一个元素用空格分开即可)
  - [2.5. 报warning，可以设置 href="#" 为死链接](#25-报warning可以设置-href-为死链接)
  - [2.6. 每一张图片都应该有一个alt属性，该属性会被搜索引擎搜索。](#26-每一张图片都应该有一个alt属性该属性会被搜索引擎搜索)
  - [2.7. 每个页面都有一个body元素， 并且所有其他元素将继承body元素的样式。](#27-每个页面都有一个body元素-并且所有其他元素将继承body元素的样式)
  - [2.8. HTML DOM Element 对象](#28-html-dom-element-对象)
    - [2.8.1. textContent 设置或返回节点及其后代的文本内容。](#281-textcontent-设置或返回节点及其后代的文本内容)
- [3. 6种渲染模式 链接](#3-6种渲染模式-链接)
  - [3.1. 服务端渲染 SSR](#31-服务端渲染-ssr)
  - [3.2. 静态网站生成](#32-静态网站生成)
  - [3.3. SSR With hydration](#33-ssr-with-hydration)
  - [3.4. CSR with Pre-rendering (Client Side Rendering)](#34-csr-with-pre-rendering-client-side-rendering)
  - [3.5. CSR (Client Side Rendering)](#35-csr-client-side-rendering)




# 2. html
## 2.1. <h>：代表标题， h1主标题， h2副标题，依次类推。

## 2.2. <p>：代表段落


## 2.3. 给标签添加样式: 
    ```
    1.内联样式
    <h2 style="color: blue">what</h2> 
    
    
    2.统一设置(以下选择h2标签设置)
    
    <style>
      h2 {color:blue;}
    </style>
    
    <h2>cat</h2>
    ```
    
## 2.4. 可以应用多个class到一个元素，用空格分开即可
    ```
    <img class="class1 class2">
    ```
    
## 2.5. 报warning，可以设置 href="#" 为死链接


## 2.6. 每一张图片都应该有一个alt属性，该属性会被搜索引擎搜索。

## 2.7. 每个页面都有一个body元素， 并且所有其他元素将继承body元素的样式。

## 2.8. HTML DOM Element 对象
### 2.8.1. textContent 设置或返回节点及其后代的文本内容。  




# 3. 6种渲染模式 [链接](https://blog.csdn.net/lunahaijiao/article/details/108480541)
## 3.1. 服务端渲染 SSR
```
主要是服务端进行数据的填充, 将填充好的数据返回给前段, 前段再根据页面所需的js或css进行渲染.
```
## 3.2. 静态网站生成
```
静态网站生成类似于服务器端渲染，不同之处在于您在构建时而不是在请求时渲染页面。
```
## 3.3. SSR With hydration
```
hydration, 直译为水合。
将功能放回到已经在服务器端中呈现的HTML中的整个过程，称为水合。
换句话说就是，对曾经渲染过的HTML进行重新渲染的过程称为水合。
此方法试图通过同时进行客户端渲染和服务器渲染，达到一种平衡。


服务端渲染：在服务端注入数据，构建出组件树
序列化成 HTML：脱水成人干
客户端渲染：到达客户端后泡水，激活水流，变回活人

```
## 3.4. CSR with Pre-rendering (Client Side Rendering)
```
Pre-render 原理是：在构建阶段就将html页面渲染完毕，不会进行二次渲染。

也就是说，当初打包时页面是怎么样，那么预渲染就是什么样。

等到JS下载并完成执行，如果页面上有数据更新，那么页面会再次渲染。这时会造成一种数据延迟的错觉。
```
## 3.5. CSR (Client Side Rendering)
```
客户端渲染
```


