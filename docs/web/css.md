- [1. css](#1-css)
  - [1.1. 选择器](#11-选择器)
  - [1.2. css图谱](#12-css图谱)
  - [1.3. boder 边框](#13-boder-边框)
  - [1.4. background-color：背景颜色](#14-background-color背景颜色)
  - [1.5. padding: 内边距](#15-padding-内边距)
  - [1.6. margin: 外边距](#16-margin-外边距)
  - [1.7. transform](#17-transform)
  - [1.8. inline inline-block](#18-inline-inline-block)
  - [1.9. 元素位置](#19-元素位置)
  - [1.10. float元素会脱离正常的文档流，使父元素的正常文档流中空无一物，在没有设置父元素高度的情况下造成父元素的高度塌陷。](#110-float元素会脱离正常的文档流使父元素的正常文档流中空无一物在没有设置父元素高度的情况下造成父元素的高度塌陷)
  - [1.11. span是行内元素，没有宽高的，margin-top和margin-bottom无效。可以给span加一个display:inline-block或者直接display:block或者设置float属性。](#111-span是行内元素没有宽高的margin-top和margin-bottom无效可以给span加一个displayinline-block或者直接displayblock或者设置float属性)
  - [1.12. 元素居中](#112-元素居中)
- [2. 文字垂直居中](#2-文字垂直居中)
  - [2.1. 文字两端对齐：](#21-文字两端对齐)
  - [2.2. animation-fill-mode属性值](#22-animation-fill-mode属性值)
- [3. flex 布局](#3-flex-布局)
  - [3.1. 使用flex布局后，图片变小，变形](#31-使用flex布局后图片变小变形)
- [4. 文本多余用省略号，隐藏多余文本](#4-文本多余用省略号隐藏多余文本)
- [5. 单词换行](#5-单词换行)
- [6. 深度搜索class](#6-深度搜索class)
- [7. 子class定位](#7-子class定位)
- [8. tailwindcss](#8-tailwindcss)
  - [8.1. 在css文件中定义属性可以写在@tailwind utilities 之前, 这样后续样式px-10这些可用, 如下, 如果写在btn后面,那么px-10就没有用](#81-在css文件中定义属性可以写在tailwind-utilities-之前-这样后续样式px-10这些可用-如下-如果写在btn后面那么px-10就没有用)
  - [8.2. 为了避免上诉的情况可以告诉tailwindcss该css在哪层,用@layer](#82-为了避免上诉的情况可以告诉tailwindcss该css在哪层用layer)
  - [8.3. 查看tailwind齐全的配置文档](#83-查看tailwind齐全的配置文档)
  - [8.4. 实时查看编译的css](#84-实时查看编译的css)
  - [8.5. 3.0特性](#85-30特性)
  - [8.6. 如果pycharm没有自动补全tailwindcss](#86-如果pycharm没有自动补全tailwindcss)


# 1. css

## 1.1. 选择器
    ```
    以下{...} 为样式
    1. 元素选择器：直接元素名字
        元素名称 {...}
        p {color: blue} 
        
    2. 类选择器：类名前边加个点
          .类名称 {...}
          .blue-text {
            color: blue;
          }
    3. id选择器：以#号开头
  
    4. :first-of-type 选择器匹配元素其父级是特定类型的第一个子元素。


    通用选择器：*
        
    id选择器：#header{}
    
    class选择器：.header{}
    
    元素选择器：div{}
    
    子选择器：ul > li{}
    
    后代选择器：div p{}
    ```

## 1.2. css图谱
    * ![avatar](../imgs/css.png)
## 1.3. boder 边框 
    ```
    img {
        border-color: green;
        border-width: 10px;
        border-style: solid;
        border-radius:10px;(50%)
      }
    
    ```
    
## 1.4. background-color：背景颜色
    ```
    background-color: gray;
    ```

## 1.5. padding: 内边距
    ```
    
    ```


## 1.6. margin: 外边距
    ```
    
    ```

## 1.7. transform
```
    # 对于x，y的平移
    transform: translate(0,100px);
```



## 1.8. inline inline-block
```
inline: 可以多个标签存在一行，对宽高属性值不生效，完全靠内容撑开宽高。
 inline-block: 结合的行内和块级的优点，既可以设置长宽，可以让padding和margin生效，又可以和其他行内元素并排。
```


## 1.9. 元素位置
```
1. position:  (https://blog.csdn.net/zzz365zz/article/details/79104063)
2. relative:  定位为relative的元素脱离正常的文本流中，但其在文本流中的位置依然存在。定位的层总是相对于其最近的父元素，无论其父元素是何种定位方式。  
![avatar](../imgs/position_relative.png)
3. absolute:
定位为absolute的层脱离正常文本流，但与relative的区别是其在正常流中的位置不在存在。定位的层总是相对于其最近的定义为absolute或relative的父层,如果其父层中都未定义absolute或relative，则其将相对body进行定位。如果有子项，那么absolute的宽高会自动适应(
具体查看demo下SearchInfo组件)。  
![avatar](../imgs/position_absolute.png)

```


## 1.10. float元素会脱离正常的文档流，使父元素的正常文档流中空无一物，在没有设置父元素高度的情况下造成父元素的高度塌陷。

## 1.11. span是行内元素，没有宽高的，margin-top和margin-bottom无效。可以给span加一个display:inline-block或者直接display:block或者设置float属性。
## 1.12. 元素居中
```css
/* 一般元素 */
text-align: center;

/* 定位为absolute元素的居中 */
{
    position:absolute;
    top:50%; 
    left:50%;
    width:480px;
    height:480px;
    margin-top:-100px;(元素高度的一半)
    margin-left:-240px;(元素宽度的一半)
}
```

# 2. 文字垂直居中
```css
1.高度为具体的数值的情况，line-height 只需要设置具体的高度即可。

2.利用表格和单元格的特性，让文字垂直居中。
{
    display: table-cell;
    height: 100px;
    vertical-align: middle;
}
```

## 2.1. 文字两端对齐：
    ```css
    // html
    <div>姓名</div>
    <div>手机号码</div>
    <div>账号</div>
    <div>密码</div>

    // css
    div {
        margin: 10px 0; 
        width: 100px;
        border: 1px solid red;
        text-align: justify;
        text-align-last:justify
    }
    div:after{
        content: '';
        display: inline-block;
        width: 100%;
    }
    ```
  ![avatar](../imgs/css_text_align.png)


## 2.2. animation-fill-mode属性值  
  none: 默认值，播放完动画后，画面停在起始位置。  
  forwards: 播放完动画，停在animation定义的最后一帧。  
  backwards: 如果设置了animation-delay，在开始到delay这段时间，画面停在第一帧。如果没有设置delay，画面是元素设置的初始值。
    ```
    .hide{
        animation: hide-item 2s ease-in  forwards;
    }
    ```
* @keyframes创建动画(然后可以在animation上使用)
    ```css
    @keyframes hide-item{
        0% {
            opacity: 1;
            color: red;
        }
        50% {
            opacity: 0.5;
            color: green
        }
        100% {
            opacity: 0;
            color: blue 
        }
    }

    ```

# 3. flex 布局
```javascript
justify-content: 用来存在剩余空间时,设置间距的方式
align-items: 元素在交叉轴上的对齐方式, 如果设置了wrap,有多行, 会每一行都会以该方式对齐
align-content: 只适用多行的flex容器, 元素整体在交叉轴上的方式对齐
flex-basis: 设置在主轴上的基准值
flex-grow: 剩余空间扩展比列, 如果排列后有剩余的空间, 会暗战设置的该值分配扩展比列. 如果有2个元素设置了该值, 第一个为1,第二个为3, 表明第一个站1分, 第二个占3份.
flex-shrink: 子元素缩小比列, 0为不允许缩小

```

## 3.1. 使用flex布局后，图片变小，变形
    ```
    一、flex-shrink: 0
    给 img 设置 flex-shrink: 0;
    flex-shrink 的默认值为1，如果没有显示定义该属性，将会自动按照默认值1在所有因子相加之后计算比率来进行空间收缩。设置为0表示不收缩。
    flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值。注意：如果元素不是弹性盒对象的元素，则 flex-shrink 属性不起作用。
    缺点：仅兼容IE11
    
    二、height: 100%
    在父元素没有设置高度的情况下，给图片设置 height: 100%;
    
    三、外层div标签包裹
    用div标签包裹图片，这种方案比较通用，缺点：产生无用标签。
    ``` 

# 4. [文本多余用省略号，隐藏多余文本](https://codepen.io/Guiyu92/pen/MWowrZQ)


# 5. 单词换行
* overflow-wrap: 是用来说明当一个不能被分开的字符串太长而不能填充其包裹盒时，为防止其溢出，浏览器是否允许这样的单词中断换行。
*  word-break: 指定了怎样在单词内断行。
```
break-all: 会在单词中间进行断行
break-word: 只会以word进行断行
```


# 6. 深度搜索class
```css
/* 修改element样式, 在<style scoped>中使用, 可以不污染其他样式*/
/deep/ .el-input {
    margin-bottom: 10px;
  }
```

# 7. 子class定位
```css
/*选取formItem 下的el-form-item__content*/
.formItem .el-form-item__content
```




# 8. tailwindcss
## 8.1. 在css文件中定义属性可以写在@tailwind utilities 之前, 这样后续样式px-10这些可用, 如下, 如果写在btn后面,那么px-10就没有用
```
css文件
@tailwind utilities;
.btn{
   @apply inline-block
}

html文件中
<div class="btn px-10"> </div>

```

## 8.2. 为了避免上诉的情况可以告诉tailwindcss该css在哪层,用@layer
```
  @layer components {
      .btn{
       @apply inline-block
    }
  }
```

## 8.3. 查看tailwind齐全的配置文档
```
npx tailwindcss init tailwind-full.config.js --full
```

## 8.4. 实时查看编译的css
```
文件是被编译到build.css下的
npm run postcss:watch
```

## 8.5. 3.0特性
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


## 8.6. 如果pycharm没有自动补全tailwindcss
```
npm install tailwindcss --save
```











