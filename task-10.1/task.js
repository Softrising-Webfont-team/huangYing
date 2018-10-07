document.getElementById('container').style.width = document.documentElement.clientWidth + 'px';

//轮播
var sliderImg = document.querySelectorAll('.slider-img img');
var sliderWidth = document.getElementById('slider').clientWidth;
var sliderTimer;
(function(){
    for(var i = 0;i<sliderImg.length;i++){
        sliderImg[i].style.left = i*sliderWidth + 'px';
        setPager();
    }
})();
var pager = document.querySelectorAll('.pager p');
sliderTimer = setInterval(function(){sliderSet(1);},3000);
document.getElementById('slider').onmouseenter = function(){
    document.getElementsByClassName('arron1')[0].style.display = 'block';
    document.getElementsByClassName('arron2')[0].style.display = 'block';
    clearInterval(sliderTimer);
};
document.getElementById('slider').onmouseleave = function(){
    document.getElementsByClassName('arron1')[0].style.display = 'none';
    document.getElementsByClassName('arron2')[0].style.display = 'none';
    sliderTimer = setInterval(function(){sliderSet(1);},3000);
};
//切换图片
function sliderSet(x){  //x=1 left , x=2 right
    for(var i = sliderImg.length-1;i>=0;i--){
        var str = sliderImg[i].style.left.slice(0,sliderImg[i].style.left.length-2);
        if(x===1){
            var k = i+1;
            if(k>=sliderImg.length){
                k=0;
            }
            if(str <= 0){
                sliderImg[i].style.left = sliderWidth*(sliderImg.length-1) + 'px';
                pager[k].className = 'p-style';
                continue;
            }
            sliderImg[i].style.left = (parseInt(str)-sliderWidth) + 'px';
            pager[k].className = '';
        }else if(x===2){
            if(str >= (sliderImg.length-1)*sliderWidth){
                sliderImg[i].style.left = 0 +'px';
                pager[i].className = 'p-style';
                continue;
            }
            sliderImg[i].style.left = (parseInt(str)+sliderWidth) + 'px';
            pager[i].className = '';
        }

    }
}
//箭头
document.getElementsByClassName('arron1')[0].onclick = function(){
    sliderSet(2);
};
document.getElementsByClassName('arron2')[0].onclick = function(){
    sliderSet(1);
};
//设置页数
function setPager(){
    var pEl = document.createElement('p');
    document.querySelector('.pager').appendChild(pEl);
}
//点击 pager
(function(){
    for(var i=0;i<pager.length;i++){
        (function(i){
            pager[i].onclick = function(){
                for(var k = 0;k<sliderImg.length;k++){
                    pager[k].className = '';
                    if(k<i){
                        sliderImg[k].style.left = (sliderImg.length-i+k)*sliderWidth + 'px';
                    }else if(k===i){
                        sliderImg[i].style.left = 0+"px";
                    }else if(k>i){
                        sliderImg[k].style.left = (k-i)*sliderWidth + 'px';
                    }
                }
                pager[i].className = 'p-style';
            }
        })(i);
    }
})();


//选框的点击
var basicInput1 = document.querySelectorAll('.basic-input1 p span');
var basicInput2 = document.querySelectorAll('.basic-input2 p span');
(function(){
    for(var i=0;i<basicInput1.length;i++){
        (function(i){
            basicInput1[i].setAttribute('spanchoice','false');
            basicInput1[i].onclick = function(){
                if(this.className[0]==='u'){
                    return;
                }
                var bo = this.getAttribute('spanchoice') === 'false' ? 'true' : 'false';
                this.setAttribute('spanchoice',bo);
                clickSpan(basicInput1,'checked-span','checked-p');
            }
        })(i);
    }
})();

(function(){
    for(var i=0;i<basicInput2.length;i++){
        (function(i){
            basicInput2[i].setAttribute('spanchoice','false');
            basicInput2[i].onclick = function(){
                if(this.className[0]==='u'){
                    return;
                }
                var bo = this.getAttribute('spanchoice') === 'false' ? 'true' : 'false';
                this.setAttribute('spanchoice',bo);
                clickSpan(basicInput2,'checked-span','checked-p');
            }
        })(i);
    }
})();

function clickSpan(el,c,p){
    for(var i=0;i<el.length;i++){
        if(el[i].className[0]==='u'){
            continue;
        }
        if(el[i].getAttribute('spanchoice')==='true'){
            el[i].parentNode.className = p;
            el[i].className = c;
        }else{
            el[i].parentNode.className = '';
            el[i].className = '';
        }
    }
}


//input 失焦
var basicInput3 = document.querySelectorAll('.basic-input3 input[type="text"]');
(function(){
    for(var i=0;i<basicInput3.length;i++){
        (function(i){
            basicInput3[i].onblur = function(){
                var inputValue = basicInput3[i].value;
                if(inputValue === ''){
                    basicInput3[i].parentNode.className = '';
                }else if(inputValue.length<7){
                    basicInput3[i].parentNode.className = 'input-error';
                    alert('输入长度不小于7');
                }else{
                    basicInput3[i].parentNode.className = 'input-suc';
                }
            }
        })(i);
    }
})();


//input range
var inputRange = document.querySelectorAll('.basic-input4 input[type="range"]');
var rangeText = document.querySelectorAll('.basic-input4 input[type="text"]');
(function(){
    for(var i=0;i<inputRange.length;i++){
        (function(i){
            inputRange[i].onmousedown = function(){
                var _this = this;
                this.onmousemove = function(){
                    _this.style.backgroundSize = _this.value/10+"% 100%";
                    rangeText[i].value = "$"+_this.value;
                }
            };
            inputRange[i].onmouseup = function(){
                this.onmousemove = null;
                this.style.backgroundSize = this.value/10+"% 100%";
                rangeText[i].value = "$"+this.value;
            }
        })(i);
    }
})();