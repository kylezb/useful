


# 1. html css笔记

[返回上一级](../README.md)


- [1. html css笔记](#1-html-css笔记)
- [2. css](#2-css)
  - [2.1. 选择器](#21-选择器)
  - [2.2. boder 边框](#22-boder-边框)
  - [2.3. background-color：背景颜色](#23-background-color背景颜色)
  - [2.4. padding: 内边距](#24-padding-内边距)
  - [2.5. margin: 外边距](#25-margin-外边距)
  - [2.6. transform](#26-transform)
- [3. html](#3-html)
  - [3.1. <h>：代表标题， h1主标题， h2副标题，依次类推。](#31-h代表标题-h1主标题-h2副标题依次类推)
  - [3.2. <p>：代表段落](#32-p代表段落)
  - [3.3. 给标签添加样式：](#33-给标签添加样式)
  - [3.4. 可以应用多个class到一个元素，用空格分开即可](#34-可以应用多个class到一个元素用空格分开即可)
  - [3.5. 报warning，可以设置 href="#" 为死链接](#35-报warning可以设置-href-为死链接)
  - [3.6. 每一张图片都应该有一个alt属性，该属性会被搜索引擎搜索。](#36-每一张图片都应该有一个alt属性该属性会被搜索引擎搜索)
  - [3.7. 每个页面都有一个body元素， 并且所有其他元素将继承body元素的样式。](#37-每个页面都有一个body元素-并且所有其他元素将继承body元素的样式)
  - [3.8. HTML DOM Element 对象](#38-html-dom-element-对象)
    - [3.8.1. textContent 设置或返回节点及其后代的文本内容。](#381-textcontent-设置或返回节点及其后代的文本内容)
- [svg](#svg)
  - [text-anchor](#text-anchor)




# 3. html
## 3.1. <h>：代表标题， h1主标题， h2副标题，依次类推。

## 3.2. <p>：代表段落


## 3.3. 给标签添加样式: 
    ```
    1.内联样式
    <h2 style="color: blue">what</h2> 
    
    
    2.统一设置(以下选择h2标签设置)
    
    <style>
      h2 {color:blue;}
    </style>
    
    <h2>cat</h2>
    ```
    
## 3.4. 可以应用多个class到一个元素，用空格分开即可
    ```
    <img class="class1 class2">
    ```
    
## 3.5. 报warning，可以设置 href="#" 为死链接


## 3.6. 每一张图片都应该有一个alt属性，该属性会被搜索引擎搜索。

## 3.7. 每个页面都有一个body元素， 并且所有其他元素将继承body元素的样式。

## 3.8. HTML DOM Element 对象
### 3.8.1. textContent 设置或返回节点及其后代的文本内容。  




# tailwindcss
## 在css文件中定义属性可以写在@tailwind utilities 之前, 这样后续样式px-10这些可用, 如下, 如果写在btn后面,那么px-10就没有用
```
css文件
@tailwind utilities;
.btn{
   @apply inline-block
}

html文件中
<div class="btn px-10"> </div>

```

## 为了避免上诉的情况可以告诉tailwindcss该css在哪层,用@layer
```
  @layer components {
      .btn{
       @apply inline-block
    }
  }
```

## 查看tailwind齐全的配置文档
```
npx tailwindcss init tailwind-full.config.js --full
```

## 实时查看编译的css
```
文件是被编译到build.css下的
npm run postcss:watch
```

## 3.0特性
```
1. aspect-*** 横纵比值
2. snap-center 滚动对齐 
3. 使用file修饰符
    <input type="file" class="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "/>
4. open当 a <details>or<dialog>元素处于打开状态时，使用修饰符有条件地添加样式：
    <details class="open:bg-white open:ring-1 open:ring-black/5 open:shadow-lg p-6 rounded-lg" open>
    <summary class="text-sm leading-6 text-gray-900 font-semibold select-none">
      Why do they call it Ovaltine?
    </summary>
    <div class="mt-3 text-sm leading-6 text-gray-600">
      <p>The mug is round. The jar is round. They should call it Roundtine.</p>
    </div>
  </details>
5. Arbitrary properties
```












