

# 二次开发
## policy
* policy可以添加的目录
```
api或插件上policy
添加目录: ./api/**/config/policies -> 代码访问:strapi.api.**.config.policies 或者 strapi.plugins.**.config.policies 访问

全局prolicy 
添加目录: ./config/policies/  -> 代码访问:strapi.config.policies



1. 全局policy添加到路由中, 如下: 
global::is-authenticated
2. api policy 添加到路由中,直接写policy的文件名: isAdmin
3. api使用其他api目录下的policy: restaurand.isAdmin
4. 添加

```

## controllers
* 自定义的函数必须是async函数
* 第一个参数必须是ctx
* routes.json文件中handler字段指定了使用哪个controllers
```
"handler":"Hello.index"// 表明使用controllers下Hello.js文件中的index函数
```

## queries 查询
* strapi.query('modelName', 'pluginName')
* 定制一些特殊查询, 需要访问model, strapi.query(modelName, plugin).model;

## model
* model的文件要小写
* strapi.models / strapi.api.**.models 可以访问具体model
* settings.json文件中的globalId,  用于全局可访问的名字, 如果没有指定,就以文件名来确认
* lifecycles, 写在model的json文件中, 用户hook一些操作
``` javascript
1. 一般用法
module.exports = {
  lifecycles: {
    beforeCreate(data) {
      // 有效重新赋值
      data.name = 'Some fixed name';
      // 无效赋值
      data = {
        ...data,
        name: 'Some fixed name',
      };
    },
  },
};

2. 直接调用生命周期函数
const ORMModel = strapi.query(modelName).model;
ORMModel.lifecycles.afterCreate(newCustomEntry.toJSON());
```


## 常用的工具类和函数
strapi-utils中的
```
* parseMultipartData(...) 解析表单
* sanitizeEntity(...) 清理查询出的model数据
* isDraft(...) 查询是否为草稿
```

