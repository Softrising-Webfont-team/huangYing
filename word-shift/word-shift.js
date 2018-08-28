function ajax(obj) {
    var ajaxRequest = new XMLHttpRequest();
    var method = obj.method.toUpperCase();
    var url = obj.url;
    var data = obj.data;

    if (method === "GET") {
        if (data) {
            url = url + "?";
            for (var i in data) {
                url = url + i + "=" + data[i] + "&";
            }
            url = url.substring(0, url.length - 1);
        }
        ajaxRequest.open(method, url);
        ajaxRequest.send();
    } else if (method === "POST") {
        ajaxRequest.open(method, url);
        ajaxRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajaxRequest.send(data);
    }

    ajaxRequest.onreadystatechange = function () {
        if (ajaxRequest.readyState == 4) {
            if (ajaxRequest.status == 200) {
                if (obj.success !== undefined) {
                    obj.success(ajaxRequest.responseText);
                }
            } else {
                if (obj.fail !== undefined) {
                    obj.fail(ajaxRequest.status);
                }
            }
        }
    }
}

var obj = {
    method: "GET",
    url: 'https://v1.hitokoto.cn/',
    data: {
        "encode": "json"
    },
    dataType: 'JSON',
    success: function (data) {
        console.log(data);
        var _data = JSON.parse(data);
        document.getElementById('word-p').innerText = _data.hitokoto;
        document.getElementById('word-author').innerText = "-「" + _data.from + "」";
        document.getElementById('word').style.animation = "1s jump forwards linear";
    },
    fail: function (status) {
        switch (status) {
            case "404":
                alert('找不到页面');
                break;
            case "500":
                alert('服务器错误');
                break;
            default:
                alert('未知错误');
        }
    }
}

var times = setInterval(function () {
    ajax(obj);
    document.getElementById('word').style.animation = "";
}, 6000);