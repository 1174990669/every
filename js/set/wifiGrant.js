
  var wifiGrantObj = new PageController({
	   'name': 'wifiGrant',
	   'tpl' : 'template/set/wifiGrant.html'
    });

  wifiGrantObj.createDomObj = function(){
    this.wrapperObj = $("#wifiGrant_wrapperObj");
	
  }

  wifiGrantObj.createEvent = function(){
    this.wrapperObj.tap(function(e){
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "back" : wifiGrantObj.goBack();return true;
        }        
      }
    });
	
	$('#wifiGrant_connect').unbind('tap').tap(function(){
		 wifiGrantObj.connect();
	})
  }
  
  wifiGrantObj.showLoading = function(){
	 $('#wifiGrant_connect').hide();  
	 $('#wifiGrant_loading').show();
  }
  
  wifiGrantObj.hideLoading = function(){
	 $('#wifiGrant_connect').show();  
	 $('#wifiGrant_loading').hide();
  }
  
 
  wifiGrantObj.connect = function(){
	  
	  var str =  '';
	  for(var i in this.info){
		  if( i == 'pageName') continue;
		  str += '&' + i + '=' + this.info[i];
	  }
	  if(str.length > 0){
	  	str = str.substr(1);
	  }
	  //alert('测试接口数据  ' + str);
	  $.ajax({
		    //http://gd.lotterywifi.com/grant/appGetToken
			//http://gdwifitest.cailebang.com/grant/appGetToken
			//url : 'http://gdwifitest.cailebang.com/grant/appGetToken', 
			//url : 'http://gd.lotterywifi.com/grant/appGetToken', 
			url : ConfigObj.wifiSite + 'grant/appGetToken', 
			data : str,
			dataType : "json",
			type : "post",
			success : function(msg){
				//console.log('wifi认证返回',msg);
				if(msg.code == '0000'){
					wifiGrantObj.hideLoading();
					$.alertMsg(msg.code_str,true);
					wifiGrantObj.destroy();
					homeObj.show();
				}else{
					$.alertMsg(msg.code_str);
					wifiGrantObj.hideLoading();
				}
			}
	 });
  }
  
  wifiGrantObj.setData = function(obj){
	  //console.log('wifiGrant setData');
	  //console.log(obj);
	  this.info = obj;
  }
  

  wifiGrantObj.onloadExecution = function(){
	this.setDefConfig();
    this.createDomObj();
    this.createEvent();
  }

  wifiGrantObj.init = function(){
      wifiGrantObj.onloadExecution();
  }
  
  wifiGrantObj.goBack = function(){	
  }
	
  wifiGrantObj.setDefConfig = function(){
	 this.info = '';  
  }
   
  wifiGrantObj.dirShow = function(obj){
	wifiGrantObj.show('',function(){
		wifiGrantObj.setData(obj);	
	});  
  }

