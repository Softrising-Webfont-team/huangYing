var currency = document.querySelectorAll(".currency p span"),
    choice = document.querySelector('.choice'),
    account = document.querySelectorAll('.keyboard-left input'),
    keyboard = document.querySelector('.keyboard-display'),
    accountInput = document.querySelector('.account-input');
    currencyClick=true;

choice.onclick=function(){
    if(currencyClick) {
        document.querySelector('.currency-display').style.display = 'block';
        document.querySelector('.single').style.display = 'block';
        currencyClick=!currencyClick;
    } else {
        document.querySelector('.currency-display').style.display = 'none';
        document.querySelector('.single').style.display = 'none';
        currencyClick=!currencyClick;
    }
}
for(let i=0;i<currency.length;i++){
    currency[i].onclick=function(){
        choice.value=currency[i].innerText;
    }
}

keyboard.onclick=function(){
    console.log('aaa');
    accountInput.onfocus();
}
accountInput.onfocus=function(){
    keyboard.style.display = 'block';
}
// accountInput.onblur=function(){
//     keyboard.style.display = 'none';
// }

for(let i=0;i<account.length;i++){
    account[i].onclick=function(){
        accountInput.onfocus();
        accountInput.value=accountInput.value+account[i].value;
    }
}