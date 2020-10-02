var li = document.getElementsByTagName('li');
var label = document.getElementsByTagName('label');
var sel = document.getElementsByClassName('selector')[0];
var button = document.getElementsByTagName('button')[0];
button.onclick = function() {
    change();
}

function change() {
    sel.classList.toggle('open');
    var deg = 360 / li.length;
    for (var i = 0; i < li.length; i++) {
        var d = deg * i;
        if (sel.classList.contains('open')) {
            li[i].style.transform = `rotate(${d}deg)`;
            label[i].style.transform = `rotate(${-d}deg)`;
        } else {
            li[i].style.transform = `rotate(-360deg)`;
            label[i].style.transform = `rotate(360deg)`;
        }
    }
}
setTimeout(function() {
    change();
}, 300)