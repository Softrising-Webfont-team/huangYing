//querySelector
Object.mySelector = function(el){
    //去掉左空格
    var el1 = el.replace(/^\s+/,'');
    //去掉右空格
    var el2 = el1.replace(/\s+$/,'');
    var elArr = el1.split(/[ {1}]/g);
    var returnEl = document;
    for(var i=0;i<elArr.length;i++){
        var elStr = elArr[i].slice(1,elArr[i].length);
        switch (elArr[i][0]){
            case "#":
                returnEl = returnEl.getElementById(elStr);
                break;
            case ".":
                returnEl = returnEl.getElementsByClassName(elStr)[0];
                break;
            default:
                returnEl = returnEl.getElementsByTagName(elArr[i])[0];
        }
    }
    return returnEl;
}


Object.addEvent = function(x,callback){
    switch(x){
        case 'click':
            this.onclick = function(){
                callback();
            }
            break;
        case 'mousemove':
            this.onmousemove = function(){
                callback();
            }
            break;
        case 'mouseenter':
            this.onmouseenter = function(){
                callback();
            }
            break;
        case 'mouseleave':
            this.onmouseleave = function(){
                callback();
            }
            break;
        case 'mousedown':
            this.onmousedowm = function(){
                callback();
            }
            break;

    }
}

var arr=[1,2,3];
//concat
Array.prototype.arrConcat = function(){
    var newArr = this;
    for(var i=0;i<arguments.length;i++){
        for(var k=0;k<arguments[i].length;k++){
            newArr[newArr.length] = arguments[i][k];
        }
    }
    return newArr;
}

//pop
Array.prototype.arrPop = function(){
    var last = this[this.length-1];
    this.length--;
    return last;
};
arr.arrPop();
console.log(arr);

//push
Array.prototype.arrPush = function(){
    for(var i=0;i<arguments.length;i++){
        this[this.length]=arguments[i];
    }
    return this.length;
}
arr.arrPush(3,4,1);
console.log(arr);

//join
Array.prototype.arrJoin = function(x){
    var str = '';
    if(arguments.length==0){
        addX = ',';
    }else{
        var addX = x;
    }
    for(var i = 0;i<this.length-1;i++){
        str += this[i]+addX;
    }
    str+=this[this.length-1];
    return str;
}
console.log(arr.arrJoin('-'));

//reverse
Array.prototype.arrReverse = function(){
    var arr = this;
    for(var i=0;i<this.length;i++){
        this[i]=arr[this.length-i-1];
    }
    return this;
}
arr.arrReverse();
console.log(arr);

//shift
Array.prototype.arrShift = function(){
    var first = this[0];
    for(var i=0;i<this.length-1;i++){
        this[i]=this[i+1];
    }
    this.length--;
    return first;
}
arr.arrShift();
console.log(arr);

//splice
Array.prototype.arrSplice = function(){
    var arr = this;
    if(this.length<arguments[0]+arguments[1]){
        return 'error';
    }
    //删除数 大于 添加数
    if(arguments[1]>=arguments.length-2){
        //先添加
        for(var i=0;i<arguments.length-2;i++){
            this[arguments[0]+i]=arguments[i+2];
        }
        //再将后面的值向前挪
        for(i=arguments[0]+arguments.length-2;i<this.length;i++){
            this[i] = this[i+arguments[1]-arguments.length+2];
        }
        this.length = this.length-arguments[1]+arguments.length-2;
    }else if(arguments[1]<arguments.length-2){       //删除数 小于 添加数
        this.length = this.length-arguments[1]+arguments.length-2;
        //先后挪
        for(i = this.length;i>arguments[0]+arguments.length-2;i--){
            this[i]=this[i-arguments.length-2-arguments[1]];
        }
        //再添加
        for(i=0;i<arguments.length-2;i++){
            this[arguments[0]+i]=arguments[i+2];
        }
    }

}
arr.arrSplice(1,3,1,1,1,1);
console.log(arr);


function addClass(className,parentEl){
    var el = document.getElementsByClassName(className)[0];
    var el2 = document.createElement('div');
    el2.className = className;
    el2.innerHTML=el.innerHTML;
    parentEl.appendChild(el2);
}
addClass('bbb',document.getElementById('aaa'));

function removeClass(className,parentEl){
    var el = document.getElementsByClassName(className)[0];
    parentEl.removeChild(el);
}
removeClass('bbb',document.getElementById('aaa'));

function cName(el){
    var a = el.getAttribute('class');
    return Boolean(a);
}
console.log(cName(document.getElementById('aaa')));