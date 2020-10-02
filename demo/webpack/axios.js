class Axios {
    constructor() {
        this.xhr = null;
        try {
            this.xhr = new XMLHttpRequest();
        } catch (err) {
            this.xhr = new ActiveXObject('Microsoft.XML');
        }
    }
    serialize(data) {
        if (!data) return '';
        var pairs = [];
        for (var name in data) {
            if (!data.hasOwnProperty(name)) continue;
            if (typeof data[name] === 'function') continue;
            var value = data[name].toString()
            name = encodeURIComponent(name);
            value = encodeURIComponent(value);
            pairs.push(name + '=' + value);
        }
        return pairs.join('&');
    }
    $http({
        type = 'get',
        data = {},
        url = '',
        async = true,
        header = {
            'Content-type': 'application/x-wwww-form-urlencoded'
        }
    }) {
        var xhr = this.xhr;
        return new Promise((resolve, reject) => {
            if (type == 'get') {
                url += '?' + this.serialize(data);
            }
            xhr.open(type, url, async);
            if (type == 'post') {
                for (let x in header) {
                    xhr.setRequestHeader(x, header[x]);
                }
                xhr.send(this.serialize(data));
            } else {
                xhr.send();
            }
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    resolve(JSON.parse(xhr.responseText));
                }
                if (xhr.status !== 200) {
                    reject(new Error({
                        status: xhr.status,
                        tips: '数据调用错误'
                    }))
                }
            }
        })
    }
}

export default new Axios()