var bar = document.getElementsByClassName('bar')[0];
var pageLoading = document.getElementsByClassName('pageLoading')[0];
var text = document.getElementsByClassName('text')[0];
var per = 0;
var timer = setInterval(function() {
    per += 1;
    bar.style.width = per + '%';
    if (per > 100) {
        clearInterval(timer);
        pageLoading.classList.add('complete');
        setTimeout(function() {
            text.innerHTML = 'Hello<br><h2>We are monster</h2>';
        }, 3000)
    }
}, 30)