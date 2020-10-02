var solider = {
    li: document.getElementsByTagName('li'),
    init: function() {
        for (var i = 0; i < this.li.length; i++) {
            var li = this.li[i];
            this.bindEvent(li);
        }
    },
    bindEvent: function(li) {
        var self = this;
        li.onmouseenter = function(e) {
            var d = self.direction(this, e);
            this.className = 'in' + d;
        };
        li.onmouseleave = function(e) {
            li.className = '';
            var d = self.direction(this, e);
            this.className = 'out' + d;
        }
    },
    direction: function(li, e) {
        var t = li.offsetTop,
            l = li.offsetLeft,
            w = li.offsetWidth / 2,
            h = li.offsetHeight / 2,
            x = e.pageX - l - w,
            y = e.pageY - t - h;
        var d = Math.round(((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90) + 3) % 4;
        switch (d) {
            case 0:
                d = '-top';
                break;
            case 1:
                d = '-right';
                break;
            case 2:
                d = '-bottom';
                break;
            case 3:
                d = '-left';
                break;
        }
        return d;
    }
};
solider.init();