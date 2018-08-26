function keyClick() {
    var value;
    var keyInput = document.querySelector('#key-input input');
    var keyOpen = document.getElementById('key-open');
    keyOpen.onclick = function () {
        value = document.getElementById('key-password').value;
        if (value.length !== 16) {
            alert('字符密钥长度不符，请输入16字符密钥');
            keyInput.value = '';
        } else {
            keyObj = {
                method: 'POST',
                url: '',
                dataType: "JSON",
                data: {
                    keyValue: value
                },
                success: function (data) {
                    alert('success');
                    window.location.href = "";
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
                    keyInput.value = '';
                }
            };
            ajax(keyObj);
        }
    }
}

keyClick();