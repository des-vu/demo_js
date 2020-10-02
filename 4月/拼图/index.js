var imgArea = document.getElementsByClassName('imgArea')[0];
var button = document.getElementsByTagName('button')[0];
var divArr = [],
    divIndex = [],
    orderArr = [],
    key = true;
for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 8; j++) {
        divIndex.push(i * 8 + j);
        orderArr.push(i * 8 + j);
        var div = document.createElement('div');
        div.style.left = 80 * j + 'px';
        div.style.top = 90 * i + 'px';
        div.style.transition = '.4s';
        div.style.backgroundPosition = -80 * j + 'px ' + (-90 * i + 'px');
        div.value = i * 8 + j;
        imgArea.appendChild(div);
        divArr.push(div);
    }
}
button.onclick = function() {
    if (key) {
        button.innerHTML = '复原';
        orderArr.sort(function() {
            return 0.5 - Math.random();
        });
        divOrder(orderArr);
        key = false;
    } else {
        button.innerHTML = '开始';
        divOrder(divIndex);
        key = true;
    }
}

function divOrder(arr) {
    for (var i = 0; i < arr.length; i++) {
        var n = arr[i];
        divArr[i].style.left = n % 8 * 80 + 'px';
        divArr[i].style.top = Math.floor(n / 8) * 90 + 'px';
    }
}

var x1,
    x2,
    y1,
    y2;
for (let i = 0; i < divArr.length; i++) {
    divArr[i].onmousedown = function(e) {
        var firstTime = new Date().getTime();
        if (!key) {
            divArr[i].style.transition = 'none';
            x1 = e.pageX - imgArea.offsetLeft - this.offsetLeft;
            y1 = e.pageY - imgArea.offsetTop - this.offsetTop;
        }
        document.onmousemove = function(e) {
            if (!key) {
                x2 = e.pageX - imgArea.offsetLeft - x1;
                y2 = e.pageY - imgArea.offsetTop - y1;
                divArr[i].style.left = x2 + 'px';
                divArr[i].style.top = y2 + 'px';
                divArr[i].style.zIndex = '99';
            }
        }
        document.onmouseup = function() {
            var lastTime = new Date().getTime();
            document.onmousemove = null;
            if (!key) {
                divArr[i].style.transition = '.4s';
                divArr[i].style.zIndex = '1';
                var r = Math.round(y2 / 90),
                    c = Math.round(x2 / 80),
                    value = r * 8 + c;
                if (r < 0 || c < 0 || r > 3 || c > 7 || lastTime - firstTime <= 200) {
                    var n = orderArr[i];
                    divArr[i].style.left = n % 8 * 80 + 'px';
                    divArr[i].style.top = Math.floor(n / 8) * 90 + 'px';
                } else if (lastTime - firstTime > 200) {
                    var n = orderArr[i];
                    divArr[i].style.left = c * 80 + 'px';
                    divArr[i].style.top = r * 90 + 'px';
                    divArr[orderArr.indexOf(value)].style.left = n % 8 * 80 + 'px';
                    divArr[orderArr.indexOf(value)].style.top = Math.floor(n / 8) * 90 + 'px';
                    var third = orderArr.indexOf(value);
                    orderArr[orderArr.indexOf(n)] = value;
                    orderArr[third] = n;
                    if (divIndex.toString() == orderArr.toString()) {
                        setTimeout(function() {
                            alert('游戏胜利');
                        }, 500);
                        button.innerHTML = '开始';
                        key = true;
                    }
                }
            }
        }
    }
}