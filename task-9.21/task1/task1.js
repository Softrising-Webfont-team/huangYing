var container = document.getElementById('container');
//点击侧栏第一层
var sideLi = document.getElementsByClassName('side-li1');
var sideUl2 = document.getElementsByClassName('side-ul2');
(function(){
    var sideArr = [];
    for(var i=0;i<sideLi.length;i++){
        sideArr[i] = true;
        (function(i){
            sideLi[i].onclick = function(){
                if(sideArr[i]){
                    sideUl2[i].style.display = 'block';
                }else{
                    sideUl2[i].style.display = 'none';
                }
                sideArr[i] = !sideArr[i];
                overflowerShow();
            }
        })(i);
    }
})();
//显示标题
var sideLi2 = document.querySelectorAll('.side-ul2 li');
var navUl = document.getElementsByClassName('nav-ul')[0];
var navArr = [];
(function(){
    for(var i=0;i<sideLi2.length;i++){
        (function(i){
            sideLi2[i].onclick = function(){
                if(navArr.indexOf(i+'')!=-1){
                    document.querySelector('.content-main h1').innerHTML = this.innerText;
                    return;
                }
                navArr.push(i+'');
                var elLi = document.createElement('li');
                var elP = document.createElement('p');
                elP.innerText = this.innerText;
                elLi.appendChild(elP);
                if(document.querySelectorAll('.nav-ul li').length>=1){
                    var elSpan = document.createElement('span');
                    elSpan.innerText = '\u2716';
                    elSpan.className = 'nav-cancel';
                    elSpan.setAttribute("index",i);
                    elLi.appendChild(elSpan);
                }
                navUl.appendChild(elLi);
                document.querySelector('.content-main h1').innerHTML = this.innerText;
                //删除标题
                var navCancel = document.querySelectorAll('.nav-cancel');
                (function(){
                    for(var i=0;i<navCancel.length;i++){
                        (function(i){
                            navCancel[i].onclick = function(){
                                navUl.removeChild(this.parentNode);
                                var arrIndex = navArr.indexOf(this.getAttribute('index'));
                                var navArrDu = [];
                                for(var k = 0;k<navArr.length;k++){
                                    if(k!=arrIndex){
                                        navArrDu.push(navArr[k]);
                                    }
                                }
                                navArr = navArrDu;
                            }
                        })(i);
                    }
                })();
            }
        })(i)
    }
})();
//超出部分
var overClick = document.getElementById('click-bottom');
var allHeight = 0;
var chuHeight = 0;
function overflowerShow(){
    var ulHeight = 0;
    var ul = document.getElementsByClassName('side-ul2');
    for(var i=0;i<ul.length;i++){
        if(ul[i].style.display=='block'){
            ulHeight+=ul[i].offsetHeight;
        }
    }
    allHeight = sideLi[0].offsetHeight*sideLi.length+ulHeight;
    chuHeight = document.getElementsByClassName('side-ul1')[0].offsetHeight;
    console.log(allHeight);
    console.log(chuHeight);
    if(chuHeight<allHeight){
        overClick.style.display = 'block';
    }else{
        overClick.style.display = 'none';
    }
}
var ulTop = 0;
var sideUl1 = document.querySelector('.side-ul1');
overClick.onclick = function(){
    ulTop-=100;
    if(allHeight-ulTop>chuHeight){
        sideUl1.style.top = -allHeight+chuHeight+'px';
        upperShow();
    }else if(allHeight-ulTop<=chuHeight){
        sideUl1.style.top = ulTop+'px';
        upperShow();
    }
}
var upperOver = document.getElementById('click-top');
function upperShow(){
    console.log(sideUl1.style.top);
    if(sideUl1.style.top[0] == '-'){
        upperOver.style.display = 'block';
    }else{
        upperOver.style.display = 'none';
    }

}
upperOver.onclick = function(){
    console.log(parseInt(sideUl1.style.top));
    if(parseInt(sideUl1.style.top)<=-100){
        sideUl1.style.top = parseInt(sideUl1.style.top)+100+'px';
        ulTop += 100;
    }else if(parseInt(sideUl1.style.top)>-100){
        sideUl1.style.top = 0+'px';
        ulTop = 0;
    }
    upperShow();
}