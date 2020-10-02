/**
 * 
 * @param {*} areaDom 轮播图区域，是一个dom元素
 * @param {*} options 轮播图配置
 */
function createBannerArea(areaDom, options) {
    var imgArea = document.createElement('div'); //图片区域的div
    var numberArea = document.createElement('div'); //角标区域的div
    var curIndex = 0; //当前显示的是第几张轮播图
    var changeTimer = null; //自动切换的计时器
    var changeDuration = 3000; //3秒钟切换间隔
    var timer = null; //动画计时器
    //1. 创建一个区域，用于显示图片
    initImgs();
    //2. 创建一个区域，用于显示角标
    initNumbers();
    //3. 设置状态
    setStatus();
    //4. 自动切换
    autoChange();

    // 局部函数
    /**
     *初始化图片区域
     */
    function initImgs() {
        imgArea.style.width = "100%";
        imgArea.style.height = "100%";
        imgArea.style.display = "flex";
        imgArea.style.overflow = "hidden";
        for (var i = 0; i < options.length; i++) {
            var obj = options[i];
            var img = document.createElement('img');
            img.src = obj.imgUrl;
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.marginLeft = '0';
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                location.href = options[i].link;
            });
            imgArea.appendChild(img);
        }
        imgArea.addEventListener('mouseenter', function() {
            clearInterval(changeTimer);
            changeTimer = null;
        });
        imgArea.addEventListener('mouseleave', function() {
            autoChange();
        });
        areaDom.appendChild(imgArea);
    }
    /**
     *初始化角标区域
     */
    function initNumbers() {
        numberArea.style.textAlign = 'center';
        numberArea.style.marginTop = '-25px';
        for (let i = 0; i < options.length; i++) {
            var sp = document.createElement('span');
            sp.style.display = 'inline-block';
            sp.style.width = '12px';
            sp.style.height = '12px';
            sp.style.background = 'lightgray';
            sp.style.margin = '0 7px';
            sp.style.borderRadius = '50%';
            sp.style.cursor = 'pointer';
            sp.addEventListener('click', function() {
                curIndex = i;
                setStatus();
            });
            numberArea.appendChild(sp);
        }
        areaDom.appendChild(numberArea);
    }
    /**
     *设置整个区域的状态
     */
    function setStatus() {
        //1. 设置圆圈的背景颜色
        for (var i = 0; i < options.length; i++) {
            if (i === curIndex) {
                //设置背景颜色为选中状态
                numberArea.children[i].style.background = '#be926f';
            } else {
                //设置背景颜色为普通状态
                numberArea.children[i].style.background = 'lightgray';
            }
        }
        //2. 显示图片
        var start = parseInt(imgArea.children[0].style.marginLeft);
        var end = curIndex * -100;
        var dis = end - start;
        var duration = 500;
        var speed = dis / duration;
        if (timer) {
            clearInterval(timer);
        }
        timer = setInterval(function() {
            start += speed * 20;
            imgArea.children[0].style.marginLeft = start + '%';
            if (Math.abs(end - start) < 1) {
                imgArea.children[0].style.marginLeft = end + '%';
                clearInterval(timer);
            }
        }, 20);
    }
    /**
     *自动切换轮播图
     */
    function autoChange() {
        if (changeTimer) {
            return;
        }
        changeTimer = setInterval(function() {
            if (curIndex === options.length - 1) {
                curIndex = 0;
            } else {
                curIndex++;
            }
            setStatus();
        }, changeDuration);
    }
}