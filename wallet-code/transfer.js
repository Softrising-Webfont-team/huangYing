var currency = document.querySelectorAll(".currency p span"),
    choice = document.querySelector('.choice'),
    account = document.querySelectorAll('.keyboard-left input'),
    keyboard = document.querySelector('.keyboard-display'),
    addressInput = document.querySelector('.transfer-input'),
    accountInput = document.querySelector('.account-input'),
    currencyClick = true,
    deleteAccout = document.getElementById('delete'),
    confirm = document.getElementById('confirm'),
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


(function() {
    for (var i = 0; i < currency.length; i++) {
        (function (i) {
            currency[i].onclick = function () {
                choice.value = currency[i].innerText;
                document.querySelector('.currency-display').style.display = 'none';
                currencyClick = !currencyClick;
            }
        })(i);
    }
})();


accountInput.onclick = function (event) {
    event.stopPropagation();
    keyboard.style.display = 'block';
}
accountInput.onfocus = function (event) {
    event.stopPropagation();
    keyboard.style.display = 'block';
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

accountInput.onblur = function (event) {
    return false;
};

document.onclick = function () {
    keyboard.style.display = 'none';
};

(function() {
    for (var i = 0; i < account.length - 1; i++) {
        (function(i) {
            account[i].onclick = function (event) {
                accountInput.value = accountInput.value + account[i].value;
                event.stopPropagation();
                keyboard.style.display = 'block';
            }
        })(i);
    }
})();

account[account.length - 1].onclick = function () {
    keyboard.style.display = 'none';
};

deleteAccout.onclick = function (event) {
    event.stopPropagation();
    accountInput.value = accountInput.value.substring(0, accountInput.value.length - 1);
}

confirm.onclick = function () {
    submission();
}

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

    var disagree = /^[.]/;
    if (disagree.test(accountInput.value)) {
        alert('金额格式不合要求');
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
        success: function () {
            alert('success');
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
    });
}