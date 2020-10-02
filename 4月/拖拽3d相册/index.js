var img = document.getElementsByTagName('img');
var len = img.length;
var deg = 360 / len;
for (var i = 0; i < len; i++) {
    img[i].style.transform = `rotateY(${deg*i}deg) translateZ(250px)`;
    img[len - 1 - i].style.transitionDelay = 0.1 * i + 's';
}
var div = document.getElementsByClassName('wrapper')[0];
var degPx = 270 / 500;
var xDown,
    yDown,
    xMove,
    yMove,
    disX,
    disY,
    rotateX = 0,
    rotateY = 0;
document.onmousedown = function(e) {
    xDown = e.clientX;
    yDown = e.clientY;
    document.onmousemove = function(e) {
        xMove = e.clientX;
        yMove = e.clientY;
        disX = xMove - xDown;
        disY = yMove - yDown;
        xDown = xMove;
        yDown = yMove;
        rotateX += -disY * 0.1;
        rotateY += disX * degPx;
        div.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
    document.onmouseup = function() {
        document.onmousemove = null;
        var timer = setInterval(function() {
            disX *= 0.95;
            console.log(disX);
            rotateY += disX * degPx;
            div.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            if (Math.abs(disX) < 0.1) {
                clearInterval(timer);
            }
        }, 19)
    }
}
for (var i = 0; i < len; i++) {
    img[i].onmousedown = function(e) {
        e.stopPropagation();
    }
}