var canvas = document.getElementsByTagName('canvas')[0]; //画布
var ctx = canvas.getContext('2d'); //canvasRenderingContext2d 画笔
var imgArr = [];
canvas.onmousedown = function(e) {
    ctx.beginPath(); //重新绘制
    ctx.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop); //落笔点
    var imgData = ctx.getImageData(0, 0, 600, 400); //记录当前绘制
    imgArr.push(imgData);
    canvas.onmousemove = function(e) {
        ctx.lineTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop); //连线点
        ctx.lineCap = 'round'; //线条起始样式
        ctx.lineJoin = 'round'; //线条转弯处样式圆滑
        ctx.stroke(); //绘制  描边 ctx.fill()填充
    }
    document.onmouseup = function() {
        ctx.closePath(); //结束绘制 自动闭合
        canvas.onmousemove = null;
    }
}
var line = document.getElementsByClassName('line')[0];
var color = document.getElementsByClassName('color')[0];
var clear = document.getElementsByClassName('clear')[0];
var rescind = document.getElementsByClassName('rescind')[0];
var eraser = document.getElementsByClassName('eraser')[0];
color.onchange = function() {
    ctx.strokeStyle = color.value + ''; //绘制线条颜色
}
clear.onclick = function() {
    ctx.clearRect(0, 0, 600, 400); //清空画布
}
line.onchange = function() {
    ctx.lineWidth = line.value; //画笔粗细
}
eraser.onclick = function() {
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = '12';
}
rescind.onclick = function() {
    if (imgArr.length) {
        ctx.putImageData(imgArr.pop(), 0, 0); //展示记录的绘制
    }
}