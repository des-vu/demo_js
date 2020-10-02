function createPage(dom, opt) {
    if (opt.current <= opt.pageCount && opt.current > 0) {
        fillHtml(opt);
        bindEvent();
    } else {
        alter('请输入正确页码');
    }

    function fillHtml(opt) {
        //上一页
        if (opt.current == 1) {
            var span = document.createElement('span');
            span.innerHTML = '上一页';
            span.setAttribute('class', 'disabled');
            dom.appendChild(span);
        } else {
            var a = document.createElement('a');
            a.href = "#";
            a.innerHTML = '上一页';
            a.setAttribute('class', 'prevPage');
            dom.appendChild(a);
        }
        //第一页
        if (opt.current > 4) {
            var a = document.createElement('a');
            a.href = "#";
            a.innerHTML = 1;
            a.setAttribute('class', 'num');
            dom.appendChild(a);
        }
        if (opt.current > 4 && opt.pageCount > 5) {
            var span = document.createElement('span');
            span.innerHTML = '...';
            dom.appendChild(span);
        }
        //中间页数
        var start = opt.current - 2;
        var end = opt.current + 2;
        for (; start <= end; start++) {
            if (start <= opt.pageCount && start >= 1) {
                if (start == opt.current) {
                    var a = document.createElement('a');
                    a.href = "#";
                    a.innerHTML = start;
                    a.style.background = 'skyblue';
                    a.style.color = 'white';
                    dom.appendChild(a);
                } else {
                    var a = document.createElement('a');
                    a.href = "#";
                    a.innerHTML = start;
                    a.setAttribute('class', 'num');
                    dom.appendChild(a);
                }
            }
        }
        //最后一页
        if (opt.current + 2 < opt.pageCount - 1 && opt.pageCount > 5) {
            var span = document.createElement('span');
            span.innerHTML = '...';
            dom.appendChild(span);
        }
        if (opt.current !== opt.pageCount && opt.current < opt.pageCount - 2 && opt.pageCount !== 4) {
            var a = document.createElement('a');
            a.href = "#";
            a.innerHTML = opt.pageCount;
            a.setAttribute('class', 'num');
            dom.appendChild(a);
        }
        //下一页
        if (opt.current == opt.pageCount) {
            var span = document.createElement('span');
            span.innerHTML = '下一页';
            span.setAttribute('class', 'disabled');
            dom.appendChild(span);
        } else {
            var a = document.createElement('a');
            a.href = "#";
            a.innerHTML = '下一页';
            a.setAttribute('class', 'nextPage');
            dom.appendChild(a);
        }
    }

    function bindEvent() {
        dom.onclick = function(e) {
            if (e.target.classList.contains('num')) {
                var cur = Number(e.target.innerHTML);
                changePage(cur);
            }
            if (e.target.classList.contains('prevPage')) {
                var cur = opt.current - 1;
                changePage(cur);
            }
            if (e.target.classList.contains('nextPage')) {
                var cur = opt.current + 1;
                changePage(cur);
            }
        }
    }

    function changePage(cur) {
        dom.innerHTML = '';
        opt.backFn(cur);
        fillHtml(opt);
    }
}