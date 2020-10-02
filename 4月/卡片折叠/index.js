var more = document.getElementsByClassName('more')[0];
var left = document.getElementsByClassName('left')[0];
var right = document.getElementsByClassName('right')[0];
var close = document.getElementsByClassName('close')[0];
more.onclick = function() {
    left.style.transition = '1s';
    right.style.transition = '1s';
    left.classList.add('open');
    setTimeout(function() {
        right.classList.add('open');
    }, 250);
}
close.onclick = function() {
    right.classList.remove('open');
    setTimeout(function() {
        left.classList.remove('open');
    }, 500);
}