var container = document.getElementsByClassName('container')[0];
var scrollBar = document.getElementsByClassName('scroll-bar')[0];
var up = document.getElementsByClassName('fa-angle-up')[0];
var down = document.getElementsByClassName('fa-angle-down')[0];
var bar = document.getElementsByClassName('bar')[0];
var box = document.getElementsByClassName('box')[0];
var barH = Math.ceil((box.offsetHeight / container.offsetHeight) * scrollBar.offsetHeight);
bar.style.height = barH + 'px';
bar.onmousedown = function(e) {
    var barTop = bar.offsetTop;
    var topY = e.pageY;
    document.onmousemove = function(e) {
        var chaY = e.pageY - topY;
        if (bar.offsetTop >= 0 && bar.offsetTop <= 371 - barH) {
            bar.style.top = chaY + bar.offsetTop + 'px';
            if (bar.offsetTop < 0) {
                bar.style.top = '0px';
            } else if (bar.offsetTop > 371 - barH) {
                bar.style.top = 371 - barH + 'px';
            }
            var y = bar.offsetTop - barTop;
            var conY = Math.ceil(container.offsetHeight / scrollBar.offsetHeight * y);
            if (container.offsetTop >= -1145) {
                container.style.top = -conY + container.offsetTop + 'px';
                if (bar.offsetTop == 0) {
                    container.style.top = '15px';
                }
            }
            if (container.offsetTop < -1145) {
                container.style.top = '-1145px';
            }
        }
        topY = e.pageY;
        barTop = bar.offsetTop;
    };
    document.onmouseup = function() {
        document.onmousemove = null;
    }
};
var y1, y2;
down.onclick = function() {
    y1 = bar.offsetTop;
    y2 = container.offsetTop;
    y1 += 20;
    y2 -= 80;
    bar.style.top = y1 + 'px';
    container.style.top = y2 + 'px';
    if (bar.offsetTop > (371 - barH)) {
        bar.style.top = 371 - barH + 'px';
    }
    if (bar.offsetTop == 371 - barH) {
        container.style.top = '-1138px';
    }
}
up.onclick = function() {
    y1 = bar.offsetTop;
    y2 = container.offsetTop;
    y1 -= 20;
    y2 += 80;
    bar.style.top = y1 + 'px';
    container.style.top = y2 + 'px';
    if (bar.offsetTop < 0) {
        bar.style.top = '0px';
    }
    if (bar.offsetTop == 0) {
        container.style.top = '15px';
    }
}