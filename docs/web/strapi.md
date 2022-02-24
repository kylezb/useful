- [1. 二次开发](#1-二次开发)
  - [1.1. policy](#11-policy)
  - [1.2. controllers](#12-controllers)
  - [1.3. queries 查询](#13-queries-查询)
  - [1.4. model](#14-model)
  - [1.5. 常用的工具类和函数](#15-常用的工具类和函数)
- [2. Roles & Permissins](#2-roles--permissins)
  - [2.1. Authenticated 角色](#21-authenticated-角色)
  - [2.2. 设置jwt时间](#22-设置jwt时间)
- [3. API 查询](#3-api-查询)
  - [3.1. 使用qs库进行参数的构造](#31-使用qs库进行参数的构造)
- [4. ctx上的一些变量](#4-ctx上的一些变量)
  - [4.1. 认证的用户变量](#41-认证的用户变量)
  - [4.2. body数据](#42-body数据)
- [5. restful 接口](#5-restful-接口)
  - [5.1. 关联表查询, populate](#51-关联表查询-populate)
- [6. 国际化i18n](#6-国际化i18n)
- [7. 动态类型的查询](#7-动态类型的查询)
  - [7.1. restful中可以通过__component字段知道当前动态类型的名字](#71-restful中可以通过__component字段知道当前动态类型的名字)
  - [7.2. graphql中可以通过__typename字段知道当前动态类型的名字](#72-graphql中可以通过__typename字段知道当前动态类型的名字)

# 1. 二次开发
## 1.1. policy
* policy可以添加的目录
```ages that match this slug
  console.log("slug", slug)
  const gqlEndpoint = getStrapiURL("/graphql")
  const pagesRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        fragment FileParts on UploadFileEntityResponse {
          data {
            id
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

## 1.2. controllers
* 自定义的函数必须是async函数
* 第一个参数必须是ctx
* routes.json文件中handler字段指定了使用哪个controllers
```
"handler":"Hello.index"// 表明使用controllers下Hello.js文件中的index函数
```

## 1.3. queries 查询
* strapi.query('modelName', 'pluginName')
* 定制一些特殊查询, 需要访问model, strapi.query(modelName, plugin).model;

## 1.4. model
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


## 1.5. 常用的工具类和函数
strapi-utils中的
```
* parseMultipartData(...) 解析表单
* sanitizeEntity(...) 清理查询出的model数据
* isDraft(...) 查询是否为草稿
```




# 2. Roles & Permissins
## 2.1. Authenticated 角色
```
1. 创建用户时候的默认角色.
2. 创建用户的默认角色可以在 advanced settings 页面设置
```
## 2.2. 设置jwt时间
```js
// path: ./config/plugins.js

module.exports = ({ env }) => ({
  // ...
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
    },
  },
  // ...
});
```


# 3. API 查询
## 3.1. 使用qs库进行参数的构造
```js
const qs = require('qs');
const query = qs.stringify({
  sort: ['title:asc'],
  filters: {
    title: {
      $eq: 'hello',
    },
  },
  populate: '*',
  fields: ['title'],
  pagination: {
    pageSize: 10,
    page: 1,
  },
  publicationState: 'live',
  locale: ['en'],
}, {
  encodeValuesOnly: true, // prettify url
});

await request(`/api/books?${query}`);
// GET /api/books?sort[0]=title%3Aasc&filters[title][$eq]=hello&populate=%2A&fields[0]=title&pagination[pageSize]=10&pagination[page]=1&publicationState=live&locale[0]=en
 
```




# 4. ctx上的一些变量
## 4.1. 认证的用户变量
```js
 const { id } = ctx.state.user;
```
## 4.2. body数据
```js
ctx.request.body
```





# 5. restful 接口
## 5.1. 关联表查询, [populate](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/populating-fields.html#component-dynamic-zones)
```
1. 查询全部关联用 populate=*, 这样只能查询一级关联内容

2. 查询二级关联内容
    比如:有一张global表, 其中metadata字段是关联字段, 且在metadata中shareImage又是关联字段, 查询出这个字段可以用下面2个语句
    http://localhost:1337/api/global?populate[metadata][populate][0]=shareImage
    http://localhost:1337/api/global?populate[0]=metadata.shareImage

3. 查询二级的所有内容:(navbar是个component, 其中又有其他component组件)
    http://localhost:1337/api/global?populate[navbar][populate]=*
```



# 6. 国际化i18n
```
1. local 字段将会被加上
2. localizations, 通过populate=* 查询出来, 是一个数组, 有{id:**, attribute:**}, 其中id是其他语言的文章id
```



# 7. 动态类型的查询

## 7.1. restful中可以通过__component字段知道当前动态类型的名字
## 7.2. graphql中可以通过__typename字段知道当前动态类型的名字