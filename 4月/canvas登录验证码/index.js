var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');
var submit = document.getElementsByClassName('submit')[0];
var reset = document.getElementsByTagName('i')[0];
var text = document.getElementsByClassName('text')[0];
var error = document.getElementsByClassName('error')[0];
var span = document.getElementsByTagName('span')[0];
var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var value;
// 65~90  97~122 a-z A-Z
for (var i = 65; i < 122; i++) {
    if (i > 90 && i < 97) {
        continue;
    }
    arr.push(String.fromCharCode(i));
}

function createCanvas() {
    ctx.clearRect(0, 0, 300, 80);
    var canvas = '';
    value = '';
    for (var i = 0; i < 6; i++) {
        var a = arr[Math.floor(Math.random() * arr.length)];
        canvas += a + ' ';
        value += a;
    }
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ccc';
    ctx.font = '40px Roboto Slab';
    ctx.setTransform(1, -0.12, 0.3, 1, 0, 12);
    ctx.fillText(canvas, 150, 60);
}
createCanvas();
reset.onclick = function() {
    createCanvas();
    error.style.display = 'none';
    span.style.display = 'none';
}
submit.onclick = function() {
    if (text.value == value || text.value == value.toLowerCase()) {
        error.style.display = 'none';
        span.style.display = 'inline-block';
        span.style.background = 'url(../images/success.png)';
    } else {
        error.style.display = 'block';
        span.style.display = 'inline-block';
        span.style.background = 'url(../images/error.png)';
        createCanvas();
    }
}