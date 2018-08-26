function ajax(obj)
{

	//进行数据初始化
    var method=obj.method.toUpperCase()||'GET';
    var url=obj.url||'';
    var data='';
    var dataType=obj.dataType;
    var suc=obj.success;
    var fail=obj.fail;
    if(obj.data)
    {
    	var arr=[];
    	for(var key in obj.data)
    	{
    		arr.push(key+'='+obj.data[key])
    	}
    	data=arr.join('&');
    }
    if(data&&method=='GET')
    {
    	url+='?'+data;
    }
    
    //创建ajax对象
    if(window.XMLHttpRequest)
    {
    	var myAjax=new XMLHttpRequest();
    }
    else
    {
    	var myAjax=new ActiveXObject('Mcrosoft.XMLHTTP');
    }

    //链接服务器
    if(method=='GET')
    {
    	myAjax.open(method,url, true);
    	myAjax.send();
    }
    else if(method=='POST')
    {
    	myAjax.open(method,url,true);
    	myAjax.send(data);
    }
    
    myAjax.onreadystatechange=function()
    {
    	if(myAjax.readyState==4)
    	{
    		if (myAjax.status==200) 
    		{
    			suc(myAjax.responseText);
    		}

    	}
    	else
    	{
    		if(fail)
    		{
    			fail(myAjax.status);
    		}
    	}
    }

} 

