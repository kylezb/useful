[返回上一级](../../README.md)


- [1. mongo常用命令：](#1-mongo常用命令)
- [2. 启动mongo服务：](#2-启动mongo服务)
- [3. 创建索引：db.company_contact.createIndex({"companyName": 1, "source": 1}, {"background": true, "unique":true})](#3-创建索引dbcompany_contactcreateindexcompanyname-1-source-1-background-true-uniquetrue)
- [4. 查看当前索引：db.sentiment.getIndexes()](#4-查看当前索引dbsentimentgetindexes)
- [5. 其他：](#5-其他)
- [6. 常用查询](#6-常用查询)
  - [6.1. 模糊查询](#61-模糊查询)
  - [6.2. 列表类型的一些操作](#62-列表类型的一些操作)
  - [6.3. remove操作](#63-remove操作)
  - [6.4. 数据中对象查询](#64-数据中对象查询)
  - [6.5. 聚合查询](#65-聚合查询)
- [7. 导入导出](#7-导入导出)
- 
# 1. mongo常用命令：
# 2. 启动mongo服务：
    * 启动docker：docker run -itd --name mongo -p 27017:27017 mongo --auth
    * 进入shell，选择admin用户：docker exec -it mongo mongo admin
    * 创建用户(在哪个库下创建的用户，登录的时候需要指定这个数据库)：db.createUser({ user:'admin',pwd:'123456',roles:[ { role:'userAdminAnyDatabase', db: 'admin'}]});
    * 授权链接： db.auth('admin', '123456')
    * 创建一般用户：db.createUser({user: "pgy",pwd: "******",roles: [{role: "readWrite",db: "hope"}]})
    * 更新权限：db.grantRolesToUser("pgy", [{role:"root", db:"admin"}])
# 3. 创建索引：db.company_contact.createIndex({"companyName": 1, "source": 1}, {"background": true, "unique":true})
# 4. 查看当前索引：db.sentiment.getIndexes()
# 5. 其他：
    * show dbs
    * show users
# 6. 常用查询
## 6.1. 模糊查询
        ```
            1.查询包含XXX:{name:/xxx/}
            2.查询以XXX开头:{name:/^xxx/}
            3.查询以XXX结尾:{name:/xxx^/}
            4.查询忽略大小写:{name:/xxx/i}
        
            db.contacts.find({
                contact_type:3,
                contact_info:{ $regex:/.../}
            }).count()
        ```
## 6.2. 列表类型的一些操作
        ```
        sources是个列表类型，其中存的是字典,查询字段是否存在
        {
            ***:***
            "sources" : [
                {
                    "c" : "year",
                    "s" : "***",
                    "s_url" : "***"
                },
                {
                    "c" : "date",
                    "s" : "***",
                    "s_date" : ***,
                    "s_url" : "***"
                }
            ],
        }
        db.contacts.find({"sources.s_date":{$exists: true}})
           
        对sources.source_date为空的字段进行删除，应该可以直接单独使用unset进行操作
        db.contacts.update(
           { },
           { $unset: { "sources.$[elem].source_date" : "" } },
           { multi: true,
             arrayFilters: [ { "elem.source_date": "" } ]
           }
        )
        ```
  
## 6.3. remove操作
    ```
        db.contacts.remove({
            type:3,
            info:{ $regex:/.../}
        })
    ```
    
## 6.4. 数据中对象查询
        ```
            //插入测试数据
            db.test_pgy.insert(
                [
                    {
                    "sources":[{"category":"o2o"}]
                    },
                
                    {
                    "sources":[{"category":"b2b"}]
                    },
                
                    {
                    "sources":[{"category":"o2o"}, {"category":"b2b"}]
                    },
                    
                    {
                    "sources":[{"category":"o2o"}, {"category":"b2b"}]
                    },
                ]
            )
     
            //数组中如果有一个元素匹配的上，该集合就有效
            db.test_pgy.find({"sources":{ $elemMatch:{   category:{$ne:"b2b"}}       }          }   )
            
            
            //等于条件只要数组中有一个等于，该集合就匹配。
            //不等于条件需要数组中全部数据都不等于才匹配。
            db.test_pgy.find({"sources.category":{$ne:"b2b"}}   )
            db.test_pgy.find({"sources.category":{$eq:"b2b"}}   )

            //统计数组中符合条件的个数
            db.test_pgy.aggregate(
                [
                    {"$match":{"sources":{ $elemMatch:{   category:{$ne:"b2b"}}}}},
                    {"$project": {"sources":1}},
                    {"$unwind": "$sources"},
                    {"$match":{"sources.category":{$ne:"b2b"}}},
                ]
            
            )
     
     
        ```
     
## 6.5. 聚合查询
        ```
            $project: 过滤字段
            $match：匹配条件
            $unwind：拆分字段
        ```
      // 统计账号aaa的price和
    db.buy_history.aggregate( [{ $match : { "account_name":"aaa" }},{ $group: { _id: null, count: { $sum: "$price" } } }] );
      
      



# 7. 导入导出
    工具包: https://www.runoob.com/mongodb/mongodb-linux-install.html
    export PATH=/usr/local/mongodb/bin:$PATH`
```
    mongoexport --authenticationDatabase nbd_cloud_st -h dds-2ze1ef8846dcb504118410.mongodb.rds.aliyuncs.com:3717 -u nbd_cloud_st -p '***'  -d nbd_cloud_st -c clue_social_qixinbao -o  ./clue_social_qixinbao.json
    
    mongoimport --authenticationDatabase data_rawdb -h dds-2ze1ef8846dcb504118410.mongodb.rds.aliyuncs.com:3717 -u data_rawdb -p '***'  -d data_rawdb -c statistics --file ./a.json


    # windows 下恢复bson文件， -d为目标数据库， data为bson目录
    ./mongorestore.exe -d haidaoconfirm .\data\

    根据条件导出:
    以下shopId 是ObjectId类型的, 需要试用$oid来导出
    mongoexport -h 127.0.0.1 --port 27017 -d steamconfirmbot -c markettasks --type=csv -f asset.market_name -q '{"shopId":{"$oid": "613043eeb074b233ade96e44"}}' -o ./out.csv

    根据日期导出
    mongoexport -d fiscans -c herotrades --type=json --query='{"updatedAt":{"$gt":{ "$date": "2021-12-18T00:00:00.001Z" }}}' -o herotrades.json 

```




[返回上一级](../../README.md)