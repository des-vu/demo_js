var mongodb = require('mongodb')
var MongoClient = mongodb.MongoClient
var url = 'mongodb://127.0.0.1:27017'
var dbName = 'p3'

var find = function(client, collection, selector, callback) {
        // 查找
        collection.find(selector).toArray(function(err, reslult) {
            if (err) throw err
            console.log('查询成功')
            callback(reslult)
            client.close()
        })
    }
    // 增加一个
var insert = function(client, collection, selector, callback) {
        collection.insertOne(selector, function(err, result) {
            if (err) throw err
            console.log('添加成功')
            callback(result)
            client.close() //释放链接
        })
    }
    // 删除一个 作业
var del = function(client, collection, selector, callback) {
        collection.deleteOne(selector, function(err, result) {
            if (err) throw err
            console.log('删除成功')
            callback(result)
            client.close()
        })
    }
    // 修改一个 方法
var update = function(client, collection, selector, callback) {
        //                  修改条件              修改内容
        collection.updateOne(selector[0], {
            $set: selector[1]
        }, function(
            err,
            result
        ) {
            if (err) throw err
            console.log('修改成功')
            callback(result)
            client.close()
        })
    }
    // 更新多个
    // 修改一个 方法
var updateMany = function(client, collection, selector, callback) {
        //                  修改条件              修改内容
        collection.updateMany(selector[0], {
            $set: selector[1]
        }, function(
            err,
            result
        ) {
            if (err) throw err
            console.log('修改成功')
            callback(result)
            client.close()
        })
    }
    //删除多个
var delMany = function(client, collection, selector, callback) {
        collection.deleteMany(selector, function(err, result) {
            if (err) throw err
            console.log('删除成功')
            callback(result)
            client.close()
        })
    }
    // 增加多个
var insertMany = function(client, collection, selector, callback) {
        collection.insertMany(selector, function(err, result) {
            if (err) throw err
            console.log('添加成功')
            callback(result)
            client.close() //释放链接
        })
    }
    //把封装方法 放到对象中
var methodType = {
    find: find,
    insert: insert,
    del: del,
    update: update,
    updateMany: updateMany,
    delMany: delMany,
    insertMany: insertMany
}

// type  数据库操作类型
//collections 操作的表名
//selector   操作条件
//callback 操作成功回调
module.exports = function(type, collections, selector, callback) {
    MongoClient.connect(url, function(err, client) {
        var db = client.db(dbName) //链接库名
        var collection = db.collection(collections) //连接表
        methodType[type](client, collection, selector, callback)
    })
}