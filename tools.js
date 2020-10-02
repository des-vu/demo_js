// 兼容性方法(IE),查看滚动条滚动距离
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    } else {
        return {
            // IE9及以下方法
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}
// 兼容性方法,查看浏览器可视窗口尺寸
function getViewportOffset() {
    if (window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    } else {
        // IE9及以下 标准模式下
        if (document.compatMode === "BackCompat") {
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight
            }
        } else { //怪异模式下
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            }
        }
    }
}
// 读取元素属性，prop必须输入字符串格式
// IE8及以下兼容
function getStyle(elem, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(elem, null)[prop];
    } else {
        return elem.currentStyle[prop];
    }
}
// 绑定事件兼容性方法
function addEvent(elem, type, handle) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handle, false);
    } else if (elem.attachEvent) {
        elem.attachEvent('on' + type, function() {
            handle.call(elem);
        })
    } else {
        elem['on' + type] = handle;
    }
}
// 取消事件冒泡
function stopBubble(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}
// 取消默认事件
function cancelHandler(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    } //return false不能封装进去
}
//封装函数insertAfter();功能类似insertBefore();
Element.prototype.insertAfter = function(targetNode, afterNode) {
    var beforeNode = afterNode.nextElementSibling;
    if (beforeNode == null) {
        this.appendChild(targetNode);
    } else {
        this.insertBefore(targetNode, beforeNode);
    }
}

//兼容IE，监听加载外部js完毕后，执行函数
function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    if (script.readyState) { //IE
        script.onreadystatechange = function() {
            if (script.readyState == "complete" || script.readyState == "loaded") {
                callback();
            }
        }
    } else {
        script.onload = function() {
            callback();
        }
    }
    script.src = url;
    document.head.appendChild('script');
}
//返回元素的第n层祖先元素节点
function retParent(elem, n) {
    while (elem && n) {
        elem = elem.parentElement;
        n--;
    }
    return elem;
}
//封装myChildren功能，兼容以前部分浏览器
Element.prototype.myChildren = function() {
    var child = this.childNodes;
    var len = child.length;
    var arr = [];
    for (var i = 0; i < len; i++) {
        if (child[i].nodeType == 1) {
            arr.push(child[i]);
        }
    }
    return arr;
}

//封装hasChildren()方法，不能用children属性
Element.prototype.hasChildren = function() {
    var child = this.childNodes;
    var len = child.length;
    for (var i = 0; i < len; i++) {
        if (child[i].nodeType == 1) {
            return true;
        }
    }
    return false;
}

//返回元素的第n个兄弟元素节点，n为正，返回后面的兄弟元素节点，n为负，返回前面的，n为0，返回自己
function retSibling(e, n) {
    while (e && n) {
        if (n > 0) {
            if (e.nextElementSibling) {
                e = e.nextElementSibling;
            } else {
                for (e = e.nextSibling; e && e.nodeType != 1; e = e.nextSibling);
            }
            n--;
        } else {
            if (e.previousElementSibling) {
                e = e.previousElementSibling;
            } else {
                for (e = e.previousSibling; e && e.nodeType != 1; e = e.previousSibling);
            }
            n++;
        }
    }
    return e;
}