var ul = document.getElementsByTagName('ul')[0],
    ulW = parseInt(window.getComputedStyle(ul, null).width),
    ulH = parseInt(window.getComputedStyle(ul, null).height),
    liW = ulW / 5,
    liH = ulH / 5;
var liArr = [];
var arr = [];
creatDom();

function creatDom() {
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            var li = document.createElement('li');
            li.style.width = liW + 'px';
            li.style.height = liH + 'px';
            li.style.transform = 'scale(.9)';
            li.style.top = liH * i + 'px';
            li.style.left = liW * j + 'px';
            liArr.push(li);
            var div = document.createElement('div');
            div.className = 'box';
            li.style.transform = `
                rotate(${Math.random()*40-20}deg) 
                translateX(${30*j-60}px) 
                translateY(${30*i-60}px) 
                translateZ(${Math.random()*-600}px)`;
            var img = document.createElement('img');
            img.src = `../images/${i*5+j+1}.jpg`;
            div.appendChild(img);
            li.appendChild(div);
            ul.appendChild(li);
            bindEvent(li);
        }
    }
}

function bindEvent(li) {
    var change = true;
    li.onclick = function() {
        li.classList.toggle('show');
        if (change) {
            for (var key in liArr) {
                arr[key] = liArr[key].style.transform;
            }
            for (var i = 0; i < liArr.length; i++) {
                liArr[i].style.transform = '';
                liArr[i].style.opacity = '0';
            }
            li.style.width = ulW + 'px';
            li.style.height = ulH + 'px';
            change = false;
        } else {
            li.style.width = liW + 'px';
            li.style.height = liH + 'px';
            for (var i = 0; i < liArr.length; i++) {
                liArr[i].style.transform = arr[i];
                liArr[i].style.opacity = '1';
            }
            change = true;
        }
    }
}