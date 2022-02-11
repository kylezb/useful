- [1. 基础语法](#1-基础语法)
  - [1.1. : @ v-model](#11---v-model)
  - [1.2. 双花括号 双大括号](#12-双花括号-双大括号)
- [2. elementui 使用](#2-elementui-使用)


# 1. 基础语法
## 1.1. : @ v-model
```
1. v-on 缩写 @ , 用于事件
2. v-bind 缩写 : , 用户变量和值得绑定, 比如可以:value="data", 这时候class的值单方面的绑定到了data是哪个
3. v-model: 在<input>、<textarea> 及 <select> 元素上创建双向数据绑定,它会根据控件类型自动选取正确的方法来更新元素。

v-bind+v-on 可以实现一个v-model, 先是v-bind先绑定一个值, 当值发生改变的时候使用v-on绑定的函数进行修改
```

## 1.2. 双花括号 双大括号
```
{{}} 用于解析值

<span>Message: {{ msg }}</span>

```



# 2. elementui 使用

##给表单添加校验
```vue
<el-form ref="dataForm" :model="form" :rules="rules" label-width="250px">
    <el-form-item  label="aa" prop="pickup_page"> 
        <el-input v-model.trim="form.pickup_page" @input="myinput"/>
    </el-form-item>
</el-form>

<script>
export default {
    data() {
        return {
            // 添加规则， rules，key是form中的prop， validator是自定义的验证器，trigger是触发验证的时机，默认blur可以自动触发，如果需要在其它时候触发，需要在其它触发函数中主动调用验证，比如当输入值改变的时候调用自定义的myinput函数然后主动触发
            rules: {
                pickup_page: [ {required: true,message: '请输入小写英文',trigger: 'blur', validator: this.pickupValiator}]
            }
        }      
    },
   
    methods: {
        myinput(a, b) { 
          console.log(this.refs, this.$refs)
          this.$refs.dataForm.validateField('pickup_page') // 主动触发函数
        },
    
        // 自定义的校验函数
        pickupValiator(rule, value, callback){
          const isMatched = value.match(/^[a-z]+$/)
          console.log(isMatched, 'asdf')
          if (!isMatched) {
            callback(new Error('格式不正确'))
          }
          callback() // 一定要写，不然其它调用可能会有点问题
        }
    }
}
</script>

```