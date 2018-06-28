
	var verifyPwdObj = new PageController({
	   'name': 'verifyPwd',
	   'tpl' : 'template/user/verifyPwd.html'
    }); 

	verifyPwdObj.createDomObj = function(){
		this.pwdObj = $("#verifyPwd_pwdObj");
		this.submitObj = $("#verifyPwd_submitObj");
		this.backObj = $("#verifyPwd_backObj");
	}

	verifyPwdObj.createEvent = function(){
		this.pwdObj.unbind('focus').focus(function(){
			$(this).parent().addClass('focus');
		});
		this.pwdObj.unbind('blur').blur(function(){
			$(this).parent().removeClass('focus');
		});

		this.submitObj.unbind('tap').tap(function(){
			verifyPwdObj.submitUserInfo();
		});

		this.backObj.unbind('tap').tap(function(){
			verifyPwdObj.goBack();
		});
	}

	verifyPwdObj.submitUserInfo = function(){
		var self = this;
		var pwdVal = this.pwdObj.val();
		////console.log(pwdVal);
		if(pwdVal===""){
			$.alertMsg("登录密码不能为空");
			return false;
		}
		var postData = {
			'passWord' : hex_md5(pwdVal),
			'access_token' : loginObj.access_token		
		}
		$.ajax({
			url : ConfigObj.localSite +  '?version=1&m=user.account.verify', 
			dataType : "json",
			type : "post",
			data : postData,
			success : function(msg){
				if(msg.code == '0000'){
					modifyPhoneObj.goBack=function(){
						modifyPhoneObj.destroy();
						verifyPwdObj.destroy();
						userInfoObj.show('reload');
					}
					modifyPhoneObj.show();
				}else{
					$.alertMsg(msg.code_str);	
				}
			}
		})
		
	}

	verifyPwdObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
	}

	verifyPwdObj.init = function(){
		verifyPwdObj.onloadExecution();
	}
	
	verifyPwdObj.setDefConfig = function(){
	}

