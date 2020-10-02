function Ban(id, options) {
    this.id = document.getElementById(id);
    this.options = options;
    this.imgArea = document.createElement('div');
    this.numberArea = document.createElement('div');
    this.curIndex = 0;
    this.index = 0;
    this.changeTimer = null;
    this.timer = null;
    this.init();
}
Ban.prototype.init = function() {
    this.initImgs();
    this.initNumber();
    this.setStatus();
    this.autoChange();
};
Ban.prototype.initImgs = function() {
    this.imgArea.style.width = '100%';
    this.imgArea.style.height = '100%';
    this.imgArea.style.display = 'flex';
    this.imgArea.style.overflow = 'hidden';
    this.imgArea.style.transition = '2s';
    for (var i = 0; i <= this.options.length; i++) {
        if (i === this.options.length) {
            var src = this.options[0].imgUrl;
        } else {
            var src = this.options[i].imgUrl;
        }
        var img = document.createElement('img');
        img.src = src;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.marginLeft = 0;
        img.style.transition = '.5s';
        this.imgArea.appendChild(img);
    }
    var self = this;
    this.id.onmouseenter = function() {
        clearInterval(self.changeTimer);
        clearInterval(self.timer);
        self.changeTimer = null;
    };
    this.id.onmouseleave = function() {
        self.autoChange();
    };
    this.id.appendChild(this.imgArea);
};
Ban.prototype.initNumber = function() {
    this.numberArea.style.textAlign = 'center';
    this.numberArea.style.marginTop = '-25px';
    for (let i = 0; i < this.options.length; i++) {
        var sp = document.createElement('span');
        sp.style.display = 'inline-block';
        sp.style.width = '15px';
        sp.style.height = '15px';
        sp.style.background = 'lightgray';
        sp.style.margin = '0 7px';
        sp.style.borderRadius = '50%';
        sp.style.cursor = 'pointer';
        sp.onclick = function() {
            this.curIndex = i;
            this.index = i;
            this.setStatus();
        }.bind(this);
        this.numberArea.appendChild(sp);
    }
    this.id.appendChild(this.numberArea);
};
Ban.prototype.setStatus = function() {
    for (var i = 0; i < this.options.length; i++) {
        if (i === this.curIndex) {
            this.numberArea.children[i].style.backgroundColor = '#be926f';
        } else {
            this.numberArea.children[i].style.backgroundColor = 'lightgray';
        }
    }
    // var start = parseInt(this.imgArea.children[0].style.marginLeft);
    // var end = this.curIndex * -100;
    // var dis = end - start;
    // var duration = 500;
    // var speed = dis / duration;
    // if (this.timer) {
    //     clearInterval(this.timer);
    // }
    // this.timer = setInterval(function() {
    //     start += speed * 20;
    //     this.imgArea.children[0].style.marginLeft = start + '%';
    //     if (Math.abs(end - start) < 1) {
    //         this.imgArea.children[0].style.marginLeft = end + '%';
    //         clearInterval(this.timer);
    //     }
    // }.bind(this), 20);
    this.imgArea.children[0].style.marginLeft = this.index * -100 + '%';
};
Ban.prototype.autoChange = function() {
    if (this.changeTimer) {
        return;
    }
    this.changeTimer = setInterval(function() {
        if (this.curIndex === this.options.length - 1) {
            this.curIndex = 0;
        } else {
            this.curIndex++;
        }
        this.setStatus();
    }.bind(this), 3000);
    this.timer = setInterval(function() {
        this.index++;
        if (this.index == 4) {
            this.index = 1;
        }
        this.imgArea.children[0].style.transition = '.5s';
        this.imgArea.children[0].style.marginLeft = this.index * -100 + '%';
        if (this.index == 3) {
            setTimeout(function() {
                this.imgArea.children[0].style.transition = '';
                this.imgArea.children[0].style.marginLeft = '0%';
            }.bind(this), 800);
        }
    }.bind(this), 3000)
};