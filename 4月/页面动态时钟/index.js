var ten = document.getElementsByClassName('ten');
var six = document.getElementsByClassName('six');
var column = document.getElementsByClassName('column');

function Index(dom, use24) {
    this.column = Array.from(dom);
    this.use24 = use24;
    this.classList = ['visible', 'close', 'far', 'far', 'distance', 'distance'];
    this.createDom();
    this.start();
}

Index.prototype.start = function() {
    var self = this;
    setInterval(function() {
        var c = self.getClock();
        self.column.forEach(function(ele, index) {
            var n = +c[index];
            var offset = n * 70;
            var offsetY = 'translateY(calc(50vh - ' + offset + 'px - 35px))';
            ele.style.transform = offsetY;
            Array.from(ele.children).forEach(function(ele2, index2) {
                var className = self.getClass(n, index2);
                ele2.setAttribute('class', className);
            });
        });
    }, 500);
}
Index.prototype.getClass = function(n, i) {
    var className = this.classList.find(function(ele, index) {
        return i - index === n || i + index === n;
    });
    return className || '';
}
Index.prototype.getClock = function() {
    var d = new Date();
    return [this.use24 ? d.getHours() : d.getHours() % 12 || 12, d.getMinutes(), d.getSeconds()].reduce(function(p, n) {
        return p + ('0' + n).slice(-2);
    }, '');
}

Index.prototype.createDom = function() {
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < six.length; j++) {
            var oDiv = document.createElement('div');
            oDiv.innerHTML = i;
            six[j].appendChild(oDiv);
        }
    }
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < ten.length; j++) {
            var iDiv = document.createElement('div');
            iDiv.innerHTML = i;
            ten[j].appendChild(iDiv);
        }
    }
}

new Index(column, true);