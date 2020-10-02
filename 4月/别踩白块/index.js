var go = document.getElementsByClassName('go')[0];
var main = document.getElementsByClassName('main')[0];
var speed = 4,
    num = 0,
    timer;
go.onclick = function() {
    go.style.display = "none";
    move();
};

function move() {
    creat();
    timer = setInterval(function() {
        var len = main.childNodes.length;
        var moveMain = main.offsetTop + speed;
        main.style.top = moveMain + 'px';
        if (moveMain >= 0) {
            main.style.top = '-150px';
            creat();
        }
        if (main.childNodes[len - 1].offsetTop > 600) {
            for (var i = 0; i < 4; i++) {
                if (main.childNodes[len - 1].childNodes[i].className == 'i') {
                    clearInterval(timer);
                    main.onmousedown = null;
                    setTimeout(function() {
                        alert('游戏结束，得分' + num);
                    }, 20);
                }
            }
            main.childNodes[len - 1].remove();
        }
    }, 20);
}

function creat() {
    var oDiv = document.createElement('div');
    var index = Math.floor(Math.random() * 4);
    oDiv.setAttribute('class', 'row');
    for (var i = 0; i < 4; i++) {
        var iDiv = document.createElement('div');
        oDiv.appendChild(iDiv);
    }
    if (main.childNodes.length == 0) {
        main.appendChild(oDiv);
    } else {
        main.insertBefore(oDiv, main.childNodes[0]);
    }
    var clickDiv = main.childNodes[0].childNodes[index];
    clickDiv.setAttribute('class', 'i');
    clickDiv.style.background = 'black';
    main.onmousedown = function(e) {
        if (e.target.className == 'i') {
            num++;
            e.target.className = 't';
            e.target.style.background = '#ccc';
        } else if (e.target.className == '') {
            clearInterval(timer);
            main.onmousedown = null;
            setTimeout(function() {
                alert('游戏结束，得分' + num);
            }, 20);
        }
        if (num % 10 == 0) {
            speed++;
        }
    }
}