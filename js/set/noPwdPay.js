
  var noPwdPayObj = new PageController({
	   'name': 'noPwdPay',
	   'tpl' : 'template/set/noPwdPay.html'
    });

  noPwdPayObj.createDomObj = function(){
    this.wrapperObj = $("#noPwdPay_wrapperObj");
    this.pwdObj = $("#noPwdPay_pwdObj");
  }

  noPwdPayObj.createEvent = function(){
    this.wrapperObj.unbind('tap').tap(function(e){
      var aObj = $.oto_checkEvent(e,"A");
      if(aObj){
        var thisObj = $(aObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "sub" :noPwdPayObj.subData();return true;
        }
      }
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "back" : noPwdPayObj.goBack();return true;
        }
      }
    });

    this.pwdObj.unbind('focus').focus(function(){
      $(this).parent().addClass('focus');
    });
    this.pwdObj.unbind('blur').blur(function(){
      $(this).parent().removeClass('focus');
    });
  }

  noPwdPayObj.subData = function(){
    this.noPwdPay();
  }

  noPwdPayObj.noPwdPay = function(){
    var pwdVal = this.pwdObj.val();
    if(!pwdVal){
      $.alertMsg("密码不能为空");
      return false;
    }
	var postData = {
		'opt' : 'on',
		'pwd' : hex_md5(pwdVal),
		'access_token': loginObj.access_token 
	}
    $.ajax({
	  url : ConfigObj.localSite + '?version=1&m=user.settings.setNoPwdPay',
      data : postData,
      dataType : "json",
      type : "post",
      success : function(msg){
        if(msg.code == "0000"){
         	$.alertMsg("设置成功",true);
			setTimeout(function(){
			  noPwdPayObj.goBack();
			},2000);
        }else{
		    $.alertMsg(msg.msg);
		}
       
      }
    });
  }

  noPwdPayObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
  }

  noPwdPayObj.init = function(){
      noPwdPayObj.onloadExecution();
  }

  noPwdPayObj.setDefConfig = function(){
		 
  }
	
  