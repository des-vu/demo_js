var wrapper = document.getElementsByClassName('wrapper')[0];
var img = document.getElementsByTagName('img');
render();

function render() {
    for (var i = 0; i < img.length; i++) {
        var index = img[i].getAttribute('index');
        switch (index) {
            case '1':
                img[i].style.transform = 'translateX(-400px) translateZ(-100px) rotateY(40deg)';
                break;
            case '2':
                img[i].style.transform = 'translateX(-200px) rotateY(20deg)';
                break;
            case '3':
                img[i].style.transform = 'translateZ(100px)';
                break;
            case '4':
                img[i].style.transform = 'translateX(200px) rotateY(-20deg)';
                break;
            case '5':
                img[i].style.transform = 'translateX(400px) translateZ(-100px) rotateY(-40deg)';
                break;
        }
    }
}
wrapper.onclick = function(e) {
    var index = Number(e.target.getAttribute('index'));
    switch (index) {
        case 1:
        case 2:
            for (var i = 0; i < img.length; i++) {
                var index = Number(img[i].getAttribute('index'));
                index++;
                if (index == 6) {
                    index = 1;
                }
                img[i].setAttribute('index', index);
            }
            render();
            break;
        case 4:
        case 5:
            for (var i = 0; i < img.length; i++) {
                var index = Number(img[i].getAttribute('index'));
                index--;
                if (index == 0) {
                    index = 5;
                }
                img[i].setAttribute('index', index);
            }
            render();
            break;
    }
}
var timer;

function autoMove() {
    timer = setInterval(function() {
        for (var i = 0; i < img.length; i++) {
            var index = Number(img[i].getAttribute('index'));
            index--;
            if (index == 0) {
                index = 5;
            }
            img[i].setAttribute('index', index);
        }
        render();
    }, 2000)
}
autoMove();
wrapper.onmouseover = function() {
    clearInterval(timer);
}
wrapper.onmouseout = function() {
    autoMove();
}