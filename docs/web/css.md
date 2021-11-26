# 2. css

## 2.1. 选择器
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
    ```


## 2.2. boder 边框 
    ```
    img {
        border-color: green;
        border-width: 10px;
        border-style: solid;
        border-radius:10px;(50%)
      }
    
    ```
    
## 2.3. background-color：背景颜色
    ```
    background-color: gray;
    ```

## 2.4. padding: 内边距
    ```
    
    ```


## 2.5. margin: 外边距
    ```
    
    ```

## 2.6. transform
```
    # 对于x，y的平移
    transform: translate(0,100px);
```



## inline inline-block
```
inline: 可以多个标签存在一行，对宽高属性值不生效，完全靠内容撑开宽高。
 inline-block: 结合的行内和块级的优点，既可以设置长宽，可以让padding和margin生效，又可以和其他行内元素并排。
```
# flex 布局
```javascript
justify-content: 用来存在剩余空间时,设置间距的方式
align-items: 元素在交叉轴上的对齐方式, 如果设置了wrap,有多行, 会每一行都会以该方式对齐
align-content: 只适用多行的flex容器, 元素整体在交叉轴上的方式对齐
flex-basis: 设置在主轴上的基准值
flex-grow: 剩余空间扩展比列, 如果排列后有剩余的空间, 会暗战设置的该值分配扩展比列. 如果有2个元素设置了该值, 第一个为1,第二个为3, 表明第一个站1分, 第二个占3份.
flex-shrink: 子元素缩小比列, 0为不允许缩小

```


## [文本多余用省略号，隐藏多余文本](https://codepen.io/Guiyu92/pen/MWowrZQ)


## 单词换行
* overflow-wrap: 是用来说明当一个不能被分开的字符串太长而不能填充其包裹盒时，为防止其溢出，浏览器是否允许这样的单词中断换行。
*  word-break: 指定了怎样在单词内断行。
```
break-all: 会在单词中间进行断行
break-word: 只会以word进行断行
```


## 

