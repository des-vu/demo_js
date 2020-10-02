var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d'); //取到上下文对象，画笔

// 画笔的颜色，宽度  canvas里绘图的API
ctx.strokeStyle = '#00ffff';
ctx.lineWidth = 17;
// 阴影偏移量及颜色
ctx.shadowBlur = 15;
ctx.shadowColor = '#00ffff';

function renderTime() {
    // 获取当前时间
    var date = new Date();
    var today = date.toDateString();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var ms = date.getMilliseconds();
    var rs = s + (ms / 1000);

    // 1背景  2圆弧（时分秒）  3文字时间日期
    // 实现渐变
    var gradient = ctx.createRadialGradient(250, 250, 5, 250, 250, 300); //径向渐变，圆
    // 规定渐变颜色  0 ~ 1
    gradient.addColorStop(0, '#03303a'); //开始
    gradient.addColorStop(1, '#000'); //结束
    ctx.fillStyle = gradient; //填充颜色到画布中
    ctx.fillRect(0, 0, 500, 500); //绘制矩形

    // 圆弧

    //hours
    ctx.beginPath();
    // 360 / 12 = 30;
    ctx.arc(250, 250, 200, deg(270), deg((h * 30) - 90)); //角度
    ctx.stroke(); //绘制

    //分
    ctx.beginPath();
    // 360 / 60 = 6;
    ctx.arc(250, 250, 170, deg(270), deg((m * 6) - 90)); //角度
    ctx.stroke(); //绘制

    //秒
    ctx.beginPath();
    // 360 / 60 = 6;
    ctx.arc(250, 250, 140, deg(270), deg((rs * 6) - 90)); //角度
    ctx.stroke(); //绘制

    //时间文字
    ctx.font = '25px Helvetica';
    ctx.fillStyle = 'rgba(0, 255, 255, 1)';
    ctx.fillText(today, 175, 250); //文字信息

    ctx.font = '25px Helvetica';
    ctx.fillStyle = 'rgba(0, 255, 255, 1)';
    h = ('0' + h).slice(-2);
    m = ('0' + m).slice(-2);
    s = ('0' + s).slice(-2);
    ctx.fillText(h + ':' + m + ':' + s + ':' + ms, 175, 280); //文字信息
}
setInterval(renderTime, 40);

// 将角度转换成弧度
function deg(deg) {
    var f = Math.PI / 180;
    return deg * f;
}