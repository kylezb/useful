
- [1. tailwindcss](#1-tailwindcss)
  - [1.1. 在css文件中定义属性可以写在@tailwind utilities 之前, 这样后续样式px-10这些可用, 如下, 如果写在btn后面,那么px-10就没有用](#11-在css文件中定义属性可以写在tailwind-utilities-之前-这样后续样式px-10这些可用-如下-如果写在btn后面那么px-10就没有用)
  - [1.2. 为了避免上诉的情况可以告诉tailwindcss该css在哪层,用@layer](#12-为了避免上诉的情况可以告诉tailwindcss该css在哪层用layer)
  - [1.3. 查看tailwind齐全的配置文档](#13-查看tailwind齐全的配置文档)
  - [1.4. 实时查看编译的css](#14-实时查看编译的css)
  - [1.5. 3.0特性](#15-30特性)
- [2. flex 相关](#2-flex-相关)
  - [2.1. flex-1 flex-auto flex-initial flex-none](#21-flex-1-flex-auto-flex-initial-flex-none)
  - [2.2. flex 纵轴上的操作](#22-flex-纵轴上的操作)
    - [2.2.1. items-center  纵轴对齐](#221-items-center--纵轴对齐)
  - [2.3. flex 横轴上的操作](#23-flex-横轴上的操作)
    - [2.3.1. justify-between](#231-justify-between)
- [排版](#排版)
  - [whitespace-pre-line](#whitespace-pre-line)



# 1. tailwindcss
## 1.1. 在css文件中定义属性可以写在@tailwind utilities 之前, 这样后续样式px-10这些可用, 如下, 如果写在btn后面,那么px-10就没有用
```
css文件
@tailwind utilities;
.btn{
   @apply inline-block
}

html文件中
<div class="btn px-10"> </div>

```

## 1.2. 为了避免上诉的情况可以告诉tailwindcss该css在哪层,用@layer
```
  @layer components {
      .btn{
       @apply inline-block
    }
  }
```

## 1.3. 查看tailwind齐全的配置文档
```
npx tailwindcss init tailwind-full.config.js --full
```

## 1.4. 实时查看编译的css
```
文件是被编译到build.css下的
npm run postcss:watch
```

## 1.5. 3.0特性
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


# 2. flex 相关

## 2.1. flex-1 flex-auto flex-initial flex-none
```html
<!-- flex-1: 允许item的自动伸缩, 不考虑item的初始化大小, 比如下面的02 和 03 将会一样大小 -->
<div class="flex space-x-4">
  <div class="flex-none w-64 bg-red-600">01</div>
  <div class="flex-1 w-64 bg-red-300">02</div>
  <div class="flex-1 w-32 bg-red-300">03</div>
</div>

<!-- flex-auto: 允许item的自动伸缩, 考虑item的初始化大小 -->
<div class="flex space-x-4">
  <div class="flex-none w-64 bg-red-600">01</div>
  <div class="flex-auto w-64 bg-red-300">02</div>
  <div class="flex-auto w-32 bg-red-300">03</div>
</div>

<!-- flex-none: 阻止item的伸缩 -->
<div class="flex space-x-4">
  <div class="flex-none w-64 bg-red-600">01</div>
  <div class="flex-none w-64 bg-red-300">02</div>
  <div class="flex-auto w-32 bg-red-300">03</div>
</div>


<!-- flex-initial: 允许item的缩小, 不允许扩大 -->
<div class="flex space-x-4">
  <div class="flex-none w-64 bg-red-600">01</div>
  <div class="flex-initial w-64 bg-red-300">02</div>
  <div class="flex-initial w-32 bg-red-300">03</div>
</div>

```


## 2.2. flex 纵轴上的操作
### 2.2.1. items-center  纵轴对齐
```html
<div class="flex justify-between h-20 bg-orange-100 items-center">
  <div class="w-10 h-10 bg-red-300">01</div>
  <div class="w-10 h-10 bg-red-500">02</div>
  <div class="w-10 h-10 bg-red-900">03</div>
</div>

```

## 2.3. flex 横轴上的操作
### 2.3.1. justify-between
```html
<div class="flex justify-between h-20 bg-orange-100 items-center">
  <div class="w-10 h-10 bg-red-300">01</div>
  <div class="w-10 h-10 bg-red-500">02</div>
  <div class="w-10 h-10 bg-red-900">03</div>
</div>
```



# 排版
## whitespace-pre-line
```html
<!-- 空格将会被删除, 换行会被保留 -->
<div class="w-3/4 ">
  <div class="whitespace-pre-line ">大家好!@

我是zzh        us, or do we? Maybe the person writing this is an alien.

You will never know.
  </div>
</div>
```







