var currency = document.querySelectorAll(".currency p span"),
    choice = document.querySelector('.choice'),
    account = document.querySelectorAll('.keyboard-left input'),
    keyboard = document.querySelector('.keyboard-display'),
    addressInput = document.querySelector('.transfer-input'),
    accountInput = document.querySelector('.account-input'),
    currencyClick = true,
    deleteAccout = document.getElementById('delete'),
    affirm = document.getElementById('confirm'),
    sub = document.getElementById('sub');

choice.onclick = function () {
    if (currencyClick) {
        document.querySelector('.currency-display').style.display = 'block';
        document.querySelector('.single').style.display = 'block';
        currencyClick = !currencyClick;
    } else {
        document.querySelector('.currency-display').style.display = 'none';
        document.querySelector('.single').style.display = 'none';
        currencyClick = !currencyClick;
    }
};

//选择币种
(function () {
    for (var i = 0; i < currency.length; i++) {
        (function (i) {
            currency[i].onclick = function () {
                choice.value = currency[i].innerText;
                document.querySelector('.currency-display').style.display = 'none';
                document.querySelector('.single').style.display = 'none';
                currencyClick = !currencyClick;
            }
        })(i);
    }
})();


accountInput.onclick = function (event) {
    event.stopPropagation();
    keyboard.style.display = 'block';
}
//输入金额 禁止键盘输入
accountInput.onfocus = function (event) {
    this.blur();
    event.stopPropagation();
    keyboard.style.display = 'block';
    event.preventDefault();
    accountInput.onkeydown = function () {
        return false;
    }
    accountInput.onkeypress = function () {
        return false;
    }
    accountInput.onkeyup = function () {
        return false;
    }
    accountInput.onpaste = function () {
        return false;
    }
}

accountInput.onblur = function () {
    return false;
};

document.getElementById('container').onclick = function () {
    keyboard.style.display = 'none';
};

(function () {
    for (var i = 0; i < account.length; i++) {
        (function (i) {
            account[i].onclick = function (event) {
                var re = /[0-9]|\./;
                if (re.test(account[i].value)) {
                    accountInput.value = accountInput.value + account[i].value;
                    event.stopPropagation();
                    keyboard.style.display = 'block';
                }
            }
        })(i);
    }
})();

//收起
document.getElementById('takeUp').onclick = function () {
    keyboard.style.display = 'none';
};

deleteAccout.onclick = function (event) {
    //禁止冒泡到document 防止收起键盘
    event.stopPropagation();
    accountInput.value = accountInput.value.substring(0, accountInput.value.length - 1);
}

//确认
affirm.onclick = function () {
    submission();
}

//确认金额
sub.onclick = function (event) {
    keyboard.style.display = 'none';
    event.stopPropagation();
}

function submission() {
    keyboard.style.display = 'none';
    if (addressInput.value === '' && accountInput.value === '') {
        alert('请输入地址和金额');
        return;
    } else {
        if (addressInput.value === '') {
            alert('请输入地址');
            return;
        } else if (accountInput.value === '') {
            alert('请输入金额');
            return;
        }
    }

    if (addressInput.value.length !== 16) {
        alert('地址应为16位');
        addressInput.value = '';
        return;
    }


    var disagree = /^[.]|\.$/;
    var disagree2 = /^[0-9]+(\.[0-9]{0,6})?$/;
    var disagree3 = /\./g;
    console.log(accountInput.value.match(disagree3));
    if(disagree.test(accountInput.value) || accountInput.value.match(disagree3).length>1){
        alert('金额格式不合');
        return;
    }
     if(!disagree2.test(accountInput.value)){
        alert('小数点后只能保留六位');
        return;
    }
    ajax({
        method: 'POST',
        url: '',
        data: {
            address: addressInput.value,
            account: accountInput.value
        },
        dataType: 'JSON',
        "success": function () {
            alert('success');
        },
        "fail": function (status) {
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
    });
}