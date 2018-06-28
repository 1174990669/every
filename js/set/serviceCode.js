
  var serviceCodeObj = new PageController({
	   'name': 'serviceCode',
	   'tpl' : 'template/set/serviceCode.html'
    });

  serviceCodeObj.createDomObj = function(){
    this.wrapperObj = $("#serviceCode_wrapperObj");
  }

  serviceCodeObj.createEvent = function(){
    this.wrapperObj.tap(function(e){
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "back" : serviceCodeObj.goBack();return true;
        }        
      }
      
    });
	
	$('#serviceCode_getInfo').unbind('tap').tap(function(){
		serviceCodeObj.getData();
	})
	$('#serviceCode_cancel').unbind('tap').tap(function(){
		$('#serviceCode_layer').hide();
	})
	$('#serviceCode_submit').unbind('tap').tap(function(){
		serviceCodeObj.submitFun();
	})
  }
  
  serviceCodeObj.submitFun = function(){
	  $('#serviceCode_layer').hide(); 
	  $.ajax({
			url : ConfigObj.localSite +  '?version=1&m=user.account.setMyCustomer',
			data : {'zdid': $('#serviceCode_code').val(),'access_token':loginObj.access_token},
			dataType : "json",
			type : "post",
			success : function(msg){
				//console.log('邀请提交返回',msg);
				if(msg.code == '0000'){
					$.alertMsg('绑定成功', true, 1000);
					setTimeout(function () {
                        loginObj.userInfo.s_id = msg.info.s_id;
                        serviceObj.goBack = function(){
                            Global.GC();
                            Global.delCache('?version=1&m=user.account.center');
                            userCenterObj.show(true);
                        };
                        serviceObj.show(true, function () {
                            serviceObj.getData(loginObj.userInfo.s_id);
                        });
                    }, 1000);
				}else{
                    $.alertMsg(msg.msg);
				}
			}
	  });   
  }
  
  serviceCodeObj.getData = function(){
	 var self = this;
	  if(!$('#serviceCode_code').val()){
		  $.alertMsg('请输入邀请码');
		  return false;
	  }
	  
	  $.ajax({
			url : ConfigObj.localSite +  '?version=1&m=user.account.getCustomer',
			data : {'zdid': $('#serviceCode_code').val(),'access_token':loginObj.access_token},
			dataType : "json",
			type : "post",
			success : function(msg){
				//console.log('客服信息返回',msg);
				if(msg.code == '0000'){
					self.formatHtml(msg.info);
				}else{
					$.alertMsg(msg.msg);
				}
			}
	 });  
  }
  
  serviceCodeObj.formatHtml = function(obj){
	  $('#serviceCode_name').html(obj.realName);
	  $('#serviceCode_layer').show(); 
  }

  serviceCodeObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
  }

  serviceCodeObj.init = function(){
      serviceCodeObj.onloadExecution();
  }
  
  serviceCodeObj.goBack = function(){	
  }
	
	
   
  serviceCodeObj.dirShow = function(){
	serviceCodeObj.show();  
  }

