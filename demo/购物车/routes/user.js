var express = require('express');
var router = express.Router();
var mongo = require('./mongo');

router.post('/add_car-list', function(req, res) {
    var obj = {
        sp_id: req.body.sp_id,
        is_checked: 'true',
        img: req.body.img,
        sp_name: req.body.sp_name,
        price: req.body.price,
        z_price: req.body.z_price,
        num: 1
    }
    mongo('find', 'car_list', {
        sp_id: req.body.sp_id
    }, function(data) {
        if (data.length == 0) {
            mongo('insert', 'car_list', obj, function(data) {
                res.send({
                    success: '已成功添加购物车'
                });
            })
        } else {
            res.send({
                success: '购物车中已有该商品'
            });
        }
    })
})

router.post('/car_show', function(req, res) {
    mongo('find', 'car_list', {}, function(data) {
        res.send(data);
    })
})

router.post('/car_del', function(req, res) {
    var key = true;
    var arr = JSON.parse(req.body.sp_id)
    for (var i = 0; i < arr.length; i++) {
        mongo('del', 'car_list', {
            sp_id: arr[i]
        }, function(result) {
            if (result.n != 1) {
                key = false;
            }
        })
    }
    if (key) {
        res.send({
            success: '删除成功'
        });
    } else {
        res.send({
            err: '未能删除'
        });
    }
})

router.post('/car_num_update', function(req, res) {
    mongo('update', 'car_list', [{
        sp_id: req.body.sp_id
    }, {
        num: Number(req.body.num)
    }], function(data) {
        if (data.result.n == 1) {
            res.send({
                success: 'ok'
            })
        }
    })
})

router.post('/checked_update', function(req, res) {
    var key = true;
    var arrId = JSON.parse(req.body.sp_id);
    for (var i = 0; i < arrId.length; i++) {
        mongo('update', 'car_list', [{
            sp_id: arrId[i]
        }, {
            is_checked: req.body.is_checked
        }], function(result) {
            if (result.n != 1) {
                key = false;
            }
        })
    }
    if (key) {
        res.send({
            success: 'ok'
        });
    } else {
        res.send({
            err: '未能错误'
        });
    }
})

module.exports = router;