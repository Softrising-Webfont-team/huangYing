var tabContent = document.querySelectorAll('.tab-content>div');
var tabNav = document.querySelectorAll('.tab-nav p');
var timer;
var shiftfFlag = 0;
tabContent[0].style.display = 'block';

(function(){
    for(var i=0;i<tabNav.length;i++){
        (function(i){
            tabNav[i].onmouseenter = function(){
                shiftfFlag=i;
                shift(shiftfFlag);
            }
        })(i);
    }
})();

timer = setInterval(function(){
    if(shiftfFlag==tabNav.length){
        shiftfFlag=0;
    }
    shift(shiftfFlag);
    shiftfFlag++;
},1000);

//鼠标移入 移出
document.getElementById('box').onmouseenter = function(){
    clearInterval(timer);
}
document.getElementById('box').onmouseleave = function(){
    timer = setInterval(function(){
        if(shiftfFlag==tabNav.length){
            shiftfFlag=0;
        }
        shift(shiftfFlag);
        shiftfFlag++;
    },1000);
}

function shift(i){
    for(var k=0;k<tabNav.length;k++){
        tabNav[k].className = '';
        tabContent[k].style.display = 'none';
    }
    tabNav[i].className = 'tab-nav-move';
    tabContent[i].style.display = 'block';
}