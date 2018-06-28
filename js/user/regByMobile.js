
  var regByMobileObj = new PageController({
	   'name': 'regByMobile',
	   'tpl' : 'template/user/regByMobile.html'
   });
	
  regByMobileObj.createDomObj = function(){
    this.wrapperObj = $("#regByMobile_wrapperObj");
    this.smObj = $("#regByMobile_smObj");
    this.showPwdObj = $("#regByMobile_showPwdObj");
    this.switchObj = $("#regByMobile_switchObj");
    this.pwdDivObj = $("#regByMobile_pwdDivObj");
	this.toggleObj = $('#regByMobile_toggle');
  }

  regByMobileObj.createEvent = function(){
    this.wrapperObj.unbind('tap').tap(function(e){
      var spanObj = $.oto_checkEvent(e,"SPAN");
      if(spanObj){
        var thisObj = $(spanObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "updateCode" : regByMobileObj.updateCode(thisObj);break;
          case "updateMsg" : regByMobileObj.updateMsg(thisObj);break;
        }
      }
      var aObj = $.oto_checkEvent(e,"A");
      if(aObj){
        var thisObj = $(aObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "subReg" : regByMobileObj.subReg();break;
          case "fj" : regByMobileObj.goSite();break; 
          case "sm" : regByMobileObj.scan();break;
		  case "back": regByMobileObj.goBack();break;
		  case "login": regByMobileObj.goLogin();break;
		  case "proto" : regByMobileObj.goProto();break;
        }
      }
    });

    regByMobileObj.smObj.unbind('tap').tap(function(e){
      var divObj = $.oto_checkEvent(e,"DIV");
      if(divObj){
        if(divObj.id=="smObj"){
          regByMobileObj.smObj.hide();
        }
      }

      var aObj = $.oto_checkEvent(e,"A");
      if(aObj){
        var thisT = $(aObj).attr("data-t");
        switch(thisT){
          case "qux" :regByMobileObj.smObj.hide() ;break;
        //  case "qued" : window.location.href = "/System/DownLoad/index";break;
        }
      }
    });

    this.showPwdObj.unbind('tap').tap(function(){
      regByMobileObj.showPwd();
    });

    this.wrapperObj.find("input").unbind('focus').focus(function(){
      if(this.name=="login_pwd"){
        $(this).parent().parent().addClass('focus');
        return false;
      }
      $(this).parent().addClass('focus');
    });
    this.wrapperObj.find("input").unbind('blur').blur(function(){
      if(this.name=="login_pwd"){
        $(this).parent().parent().removeClass('focus');
        return false;
      }
      $(this).parent().removeClass('focus');
    });
	this.toggleObj.unbind('tap').tap(function(){
		if($('#regByMobile_sitewrap').css('display') != 'none'){
			regByMobileObj.toggleObj.find('em').addClass('trans');
			$('#regByMobile_sitewrap').hide();
		}else{
			regByMobileObj.toggleObj.find('em').removeClass('trans');
			$('#regByMobile_sitewrap').show();
		}
	})
  }
  
  regByMobileObj.goLogin = function(){
	 loginObj.show();  
  }
  
  regByMobileObj.goProto = function(){
	 protocolObj.goBack = function(){
		 protocolObj.destroy();
		 regByMobileObj.show();
	 }
	 protocolObj.show();
  }
  
  //扫描
  regByMobileObj.scan = function(){
	  if(ConfigObj.platForm == 'ios'){
		  cordova.plugins.barcodeScanner.scan(
			  function (result) {
				 if(result.text){
					var sid = '';
					var arr = result.text.split('?')[1];
					var arr2 = arr.split('&');
					for(var i=0;i<arr2.length;i++){
						var itm = arr2[i].split('=')[0];
						if(itm == 'station_no'){
							sid = 	arr2[i].split('=')[1]
						}
					}
					regByMobileObj.setSid(sid); 
				 }
			  }, 
			  function (error) {
				  alert("Scanning failed: " + error);
			  }
		   );
	  }else if(ConfigObj.platForm == 'android'){
		  android_obj.scanQRCode();
	  }
  }
  
  
  regByMobileObj.goSite = function(){
	 /* localSiteObj.goBack=function(){
		localSiteObj.destroy();
		regByMobileObj.show();  
	  }
	  localSiteObj.show();*/
	  localSiteObj.show('',function(){
		 localSiteObj.pushRoute(function(){
			 regByMobileObj.show(); 
		 })
	  });
  }

  regByMobileObj.showPwd = function(){
    if(this.switchObj.hasClass('move')){
      this.pwdDivObj.html('<input type="password" placeholder="6-16位字母/数字" id="regByMobile_password">');
      this.switchObj.removeClass('move');
      this.switchObj.prev().hide();
      this.switchObj.next().show();
    }else{
      this.pwdDivObj.html('<input type="text" placeholder="6-16位字母/数字" id="regByMobile_password">');
      this.switchObj.addClass('move');
      this.switchObj.prev().show();
      this.switchObj.next().hide();
    }
    this.pwdDivObj.find("input").focus(function() {
      regByMobileObj.pwdDivObj.parent().addClass('focus');
    });
    this.pwdDivObj.find("input").blur(function() {
      regByMobileObj.pwdDivObj.parent().removeClass('focus');
    });
  }

  regByMobileObj.updateCode = function(obj){
    if(!this.msgCheck)return false;
    var data = new Date().getTime();
    var imgObj = obj.children('img')[0];
    imgObj.src= imgObj.src.split("?")[0]+"?code="+data;
  }

  regByMobileObj.updateMsg = function(obj){
    if(obj.hasClass('load'))return false;
    obj.html("发送中");
    $.ajax({
	  url : ConfigObj.localSite + '?version=1&m=user.account.setRegSmsCode',       
      data : 'mobile='+ $.trim($("#regByMobile_mobile").val()),
      type : "post",
      dataType : "json",
      success : function(data){
        if(data.code!=="0000"){
          $.alertMsg(data.code_str);
          obj.html("获取短信验证码");
          return false;
        }
        regByMobileObj.successMsg(obj);
      }
    });
  }

  regByMobileObj.successMsg = function(obj){
    regByMobileObj.msgCheck = false;
    obj.addClass('load');
	if(regByMobileObj.timeObj){
		clearInterval(	regByMobileObj.timeObj);
	}
    regByMobileObj.timeObj = setInterval(function(){
      obj.html(regByMobileObj.msgTime+"秒后重新请求");
      regByMobileObj.msgTime--;
      if(regByMobileObj.msgTime==0){
        regByMobileObj.msgTime=120;
        regByMobileObj.msgCheck = true;
        //regByMobileObj.updateCode($("span[data-t='updateCode']"));
        obj.removeClass('load');
        obj.html("获取短信验证码");
        clearInterval(	regByMobileObj.timeObj);
      }
    },1000);
  }

  regByMobileObj.createRegData = function(){
    var inputObj = this.wrapperObj.find("input")
    var data = new Object();
    for(var i=0,ilen=inputObj.length;i<ilen;i++){
      var thisName = inputObj.eq(i).attr("name");
      if(!thisName)continue;
	  if(thisName == 'login_pwd'){
		 data[thisName] = hex_md5(inputObj.eq(i).val())
	  }else{
      	data[thisName] = $.trim(inputObj.eq(i).val());
	  }
    }
	if(ConfigObj.platForm == 'android'){
		data.terminal = 2;	
	}else if(ConfigObj.platForm == 'ios'){
		data.terminal = 3;	
	}
    return data;
  }

  regByMobileObj.subReg = function(){
	if($('#regByMobile_mobile').val() == ''){
		$.alertMsg('请输入手机号码',false);
		return false;	
	}
	if($('#regByMobile_code').val() == ''){
		$.alertMsg('请输入验证码',false);	
		return false;	
	}
	if($('#regByMobile_password').val() == ''){
		$.alertMsg('请输入密码',false);	
		return false;	
	}
	if($('#regByMobile_station').val() == ''){
		$.alertMsg('请输入站点编号',false);	
		return false;	
	}
	if(!this.checkPwd()){
		$.alertMsg('密码为6-16位的数字或字母，不包含空格');
		return false;	
	}
    $.ajax({
	  url : ConfigObj.localSite + '?version=1&m=user.account.regByMobile',      
      data : this.createRegData(),
      dataType : "json",
      type : "post",
      success : function(msg){
        if(msg.code=='0000'){
          $.alertMsg(msg.code_str,true); 
		  setTimeout(function(){
			  regRealNameObj.goBack=function(){
				 Global.GC();
				 homeObj.show();  
        // buyConfirm.show();   
        // loginObj.show();   
			  }
			  regRealNameObj.show('reload',function(){
				  var data = {
					'accountName': msg.info.account_name  
				  }
				  regRealNameObj.setData(data);
			  });
		  },1000)
          //window.location.href=msg.redirect_url;
        }else{
          $.alertMsg(msg.code_str); 
        }
      }
    });
  }
  
  regByMobileObj.checkPwd = function(){
	var val = $('#regByMobile_password').val();
	var reg = /^[a-zA-Z0-9]{6,16}$/;
	if(!reg.test(val)){
		return false;	
	}
	return true;
  }
  
  regByMobileObj.setSid = function(sid){
	 $('#regByMobile_station').val(sid) 
  }
  
  regByMobileObj.setDefConfig = function(){
	 regByMobileObj.msgTime = 120;
  	 regByMobileObj.msgCheck = true;  
	 if(regByMobileObj.timeObj){
		clearInterval(regByMobileObj.timeObj);
		regByMobileObj.timeObj = '';
	}
  }

  regByMobileObj.onloadExecution = function(){
	this.setDefConfig();
    this.createDomObj();
    this.createEvent();
  }

  regByMobileObj.init = function(){
      regByMobileObj.onloadExecution();
  }
  
  regByMobileObj.dirShow = function(obj){
	  regByMobileObj.show();
	  if(obj.sid){
		  setTimeout(function(){
			  regByMobileObj.setSid(obj.sid);
		  },500)
	  }
  }

