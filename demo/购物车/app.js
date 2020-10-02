var express = require('express');
var app = express();

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');

var bodyParse = require('body-parser');
app.use(bodyParse.urlencoded({
    extended: false
}));
app.use(bodyParse.json());

app.use('*', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', 'content-type')
    next()
})

app.use('/', indexRouter);
app.use('/user', userRouter);

app.listen('3000', '127.0.0.166', function() {
    console.log('服务器启动成功');
})