function createPage(page, pageCount, current) {
    page.innerHTML = '';
    page.style.textAlign = 'center';
    //首页
    createDom('首页', 'first');
    //上一页
    createDom('上一页', 'previous');
    //中间页码
    for (var i = current - 4; i <= current + 4; i++) {
        if (i <= 0 || i > pageCount) {
            continue;
        }
        createDom(i, 'number');
    }
    //下一页
    createDom('下一页', 'next');
    //尾页
    createDom('尾页', 'last');
    // 总页数
    var span = document.createElement('span');
    span.innerHTML = '总页数：' + pageCount;
    page.appendChild(span);

    function createDom(pageNumber, name) {
        var a = document.createElement('a');
        a.style.display = 'inline-block';
        a.style.padding = '5px 8px';
        a.style.border = 'solid 1px #ccc';
        a.style.borderRadius = '5px';
        a.style.marginRight = '10px';
        a.style.cursor = 'pointer';
        a.style.color = 'blue';

        a.innerHTML = pageNumber;
        page.appendChild(a);
        if (current == 1 && (name == 'first' || name == 'previous')) {
            a.style.color = '#ccc';
            a.classList.add('disable');
        }
        if (current == pageCount && (name == 'last' || name == 'next')) {
            a.style.color = '#ccc';
            a.classList.add('disable');
        }
        if (pageNumber == current) {
            a.style.backgroundColor = 'skyblue';
            a.style.color = 'white';
        }
        clickEvent(a, pageNumber, name);
    }

    function clickEvent(dom, pageNumber, name) {
        dom.onclick = function() {
            if (dom.classList.contains('disable')) {
                return;
            }
            switch (name) {
                case 'number':
                    createPage(page, pageCount, pageNumber);
                    break;
                case 'first':
                    createPage(page, pageCount, 1);
                    break;
                case 'last':
                    createPage(page, pageCount, pageCount);
                    break;
                case 'next':
                    createPage(page, pageCount, current + 1);
                    break;
                case 'previous':
                    createPage(page, pageCount, current - 1);
                    break;
            }
        }
    }
}