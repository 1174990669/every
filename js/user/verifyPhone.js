
	var verifyPhoneObj = new PageController({
	   'name': 'verifyPhone',
	   'tpl' : 'template/user/verifyPhone.html'
    }); 
	

	verifyPhoneObj.createDomObj = function(){
		this.telObj = $("#verifyPhone_tel");
		this.checkCodeObj = $("#verifyPhone_checkCodeObj");
		this.getCodeObj = $("#verifyPhone_getCodeObj");
		this.submitObj = $("#verifyPhone_submitObj");
		this.backObj = $("#verifyPhone_backObj");
	}

	verifyPhoneObj.createEvent = function(){
		this.telObj.add(this.checkCodeObj).unbind('focus').focus(function(){
			$(this).parent().addClass('focus');
		});

		this.telObj.add(this.checkCodeObj).unbind('blur').blur(function(){
			$(this).parent().removeClass('focus');
		});
		
		this.getCodeObj.unbind('tap').tap(function(){
			verifyPhoneObj.checkPhone();
		});

		this.submitObj.unbind('tap').tap(function(){
			verifyPhoneObj.submitData();
		});

		this.backObj.unbind('tap').tap(function(){
			verifyPhoneObj.goBack();
		});

	}
	
	verifyPhoneObj.validePhone = function(telVal){
		if(telVal === ""){
			$.alertMsg("手机号码不能为空");
			return false;
		}else if(!((/[0-9]{11}/g).test(Number(telVal))) ){
			$.alertMsg("请输入正确的手机号码");
			return false;
		}
		return true;
		
	}

	verifyPhoneObj.submitData = function(){
		var telVal = this.telObj.val();
		var checkCodeVal = this.checkCodeObj.val();
         
		if(!verifyPhoneObj.validePhone(telVal)){
			return false;	
		}
		 
		if(checkCodeVal === ""){
			$.alertMsg("验证码不能为空");
			return false;
		}
		
		var postData = {
			'phone' : telVal,
			'sms_code' : checkCodeVal,
			'sms_type': 'findloginpwd',
			'access_token': loginObj.access_token
		}

		$.ajax({
			url : ConfigObj.localSite +  '?version=1&m=user.account.verifySmsCode ',  
			data : postData,
			dataType : "json",
			type : "post",
			success : function(msg){
				if(Number(msg.code)===0){
					$.alertMsg('验证成功',true);
					modifyPwdObj.goBack = function(){
						modifyPwdObj.destroy();
						verifyPhoneObj.destroy();
						userInfoObj.show('reload');	
					}
					setTimeout(function(){
						modifyPwdObj.show();
					}, 1500)
				}else{
					$.alertMsg(msg.code_str);
				}
			}
		});
	}

	verifyPhoneObj.checkPhone = function(){
		if(this.getCodeObj.hasClass('noover')){
			return false;
		}
		var phoneNum = this.telObj.val();
		if(!verifyPhoneObj.validePhone(phoneNum)){
			return false;	
		}
		verifyPhoneObj.getCode();
	}

	verifyPhoneObj.getCode = function(){
		if(this.getCodeObj.hasClass('noover')){
			return false;
		}
		var phoneNum = this.telObj.val();
		if(!verifyPhoneObj.validePhone(phoneNum)){
			return false;	
		}
		this.setTime = verifyPhoneObj.defSetTime;
		this.getCodeObj.addClass('noover');
		this.getCodeObj.html("请稍等");
		
		var postData = {
			'userName' : loginObj.userInfo.user_name,
			'access_token' : loginObj.access_token,
			'phone': phoneNum,
			'summary' : 'findPwd',	
		}
		$.ajax({
			url : ConfigObj.localSite +  '?version=1&m=user.account.sendMobileCode',  
			data : postData,
			dataType : "json",
			type : "post",
			success : function(msg){
				if(Number(msg.code)!==0){
					$.alertMsg(msg.code_str);
					verifyPhoneObj.getCodeObj.html("获取短信验证码");
					verifyPhoneObj.getCodeObj.removeClass('noover');
					return false;
				}
				verifyPhoneObj.setTimeCheck();
			}
		});
	}

	verifyPhoneObj.setTimeCheck = function(){
		this.getCodeObj.html(this.setTime+"秒后重新获取");
		verifyPhoneObj.timer = setTimeout(function(){
			verifyPhoneObj.setTime--;
			if(verifyPhoneObj.setTime<=0){
				verifyPhoneObj.getCodeObj.html("获取短信验证码");
				verifyPhoneObj.getCodeObj.removeClass('noover');
				return false;
			}
			verifyPhoneObj.setTimeCheck();
		},1000);
	}

	verifyPhoneObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
	}

	verifyPhoneObj.init = function(){
		verifyPhoneObj.setDefConfig();
		verifyPhoneObj.onloadExecution();
	}
	
	verifyPhoneObj.setDefConfig = function(){
		 verifyPhoneObj.defSetTime = 120;
		 verifyPhoneObj.setTime = 120;
		 if(verifyPhoneObj.timer){
			clearTimeout(verifyPhoneObj.timer);
		 	verifyPhoneObj.timer = '';
		 }
	}
	

