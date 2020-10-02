var obj = {
    moon: document.getElementsByClassName('moon')[0],
    sun: document.getElementsByClassName('sun')[0],
    body: document.getElementsByTagName('body')[0],
    perVolume: document.getElementsByClassName('per')[0],
    init: function() {
        this.bindEvent();
    },
    bindEvent: function() {
        var self = this;
        var moon = this.moon;
        var dis,
            flag = false;
        moon.onmousedown = function(e) {
            flag = true;
            dis = e.clientX - moon.offsetLeft;
        };
        document.onmousemove = function(e) {
            if (!flag) {
                return;
            }
            moon.style.left = e.clientX - dis + 'px';
            self.getPer();
        };
        document.onmouseup = function() {
            flag = false;
        };
    },
    getPer: function() {
        var per;
        var d = this.moon.clientWidth,
            ml = this.moon.offsetLeft,
            mr = this.moon.offsetLeft + d,
            sl = this.sun.offsetLeft,
            sr = this.sun.offsetLeft + d;
        if (mr < sl || ml > sr) {
            per = 0;
        } else {
            if (sl < ml) {
                per = (sr - ml) / d;
            } else {
                per = (mr - sl) / d;
            }
        }
        this.change(per);
        this.perVolume.innerText = "Volume: " + Math.floor(per * 100) + "%";
    },
    change: function(per) {
        var audio = document.getElementsByTagName('audio')[0];
        per > 0 ? audio.play() : audio.pause();
        audio.volume = per;
        this.moon.style.background = "hsl(194, 66%, " + (1 - per) * 60 + "%)";
        this.body.style.background = "hsl(" + (194 + Math.floor(166 * per)) + ", 66%, " + (1 - per) * 50 + "%)";
    }
}
obj.init();