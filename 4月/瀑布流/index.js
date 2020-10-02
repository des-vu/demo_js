function createWaterFall(dom, urls, width) {
    var colNumber,
        gap;
    createImgDoms();
    var timer = null;
    window.onresize = function() {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {
            setImgPosition();
        }, 500)
    }

    function createImgDoms() {
        for (var i = 0; i < urls.length; i++) {
            var url = urls[i];
            var img = document.createElement('img');
            img.src = url;
            img.style.width = width + 'px';
            img.style.position = 'absolute';
            img.onload = function() {
                setImgPosition();
            }
            dom.appendChild(img);
        }
    }

    function cal() {
        var domWidth = dom.offsetWidth;
        colNumber = Math.floor(domWidth / width);
        gap = (domWidth - colNumber * width) / (colNumber + 1);
    }

    function setImgPosition() {
        cal();
        var colY = new Array(colNumber);
        colY.fill(0);
        for (var i = 0; i < dom.children.length; i++) {
            var img = dom.children[i];
            var y = Math.min(...colY);
            var index = colY.indexOf(y);
            var x = gap * (index + 1) + width * index;
            img.style.left = x + 'px';
            img.style.top = y + 'px';
            colY[index] += img.height + gap;
        }
        var height = Math.max(...colY);
        dom.style.height = height + 'px';
    }
}