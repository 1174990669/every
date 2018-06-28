
	var verifyIdObj = new PageController({
	   'name': 'verifyId',
	   'tpl' : 'template/user/verifyId.html'
    }); 

	verifyIdObj.createDomObj = function(){
		this.userNumObj = $("#verifyId_userNumObj");
		this.pwdObj = $("#verifyId_pwdObj");
		this.submitObj = $("#verifyId_submitObj");
		this.backObj = $("#verifyId_backObj");
		if (verifyIdObj.realType == 'passport') {
			$('#verifyId_realType').html('证件号码：');
			$('#verifyId_userNumObj').attr('placeholder', '请输入证件号码');
		}
	}

	verifyIdObj.createEvent = function(){
		this.userNumObj.add(this.pwdObj).unbind('focus').focus(function(){
			$(this).parent().addClass('focus');
		});
		this.userNumObj.add(this.pwdObj).unbind('blur').blur(function(){
			$(this).parent().removeClass('focus');
		});

		this.submitObj.unbind('tap').tap(function(){
			if(verifyIdObj.fromPage == 'modifyPwd'){
				verifyIdObj.checkId();
			}else{
				verifyIdObj.submitUserInfo();
			}
		});

		this.backObj.unbind('tap').tap(function(){
			verifyIdObj.goBack();
		});
	}
	
    verifyIdObj.checkId = function(){
		var userNumVal = $.trim(this.userNumObj.val());	
		if(userNumVal===""){
			$.alertMsg("号码不能为空");
			return false;
		}
		if(userNumVal == loginObj.userInfo.idcard){
			$.alertMsg("验证成功",true);
			setTimeout(function(){
				modifyPwdObj.goBack=function(){
					modifyPwdObj.destroy();
					verifyIdObj.destroy();
					userInfoObj.show('reload');
				}
				modifyPwdObj.show();
			},2000);	
		}else{
			$.alertMsg("验证失败");
		}
	}
	
	verifyIdObj.switchDom = function(){
		if(this.fromPage == 'modifyPwd'){
			$('#verifyId_pwdObj').parents('li').hide();	
		}else{
			$('#verifyId_pwdObj').parents('li').show();
		}
	}
	
	verifyIdObj.submitUserInfo = function(){
		var self = this;
		var userNumVal = this.userNumObj.val();
		var pwdVal = this.pwdObj.val();
		////console.log(pwdVal);
		if(userNumVal===""){
			$.alertMsg("号码不能为空");
			return false;
		}else if(pwdVal===""){
			$.alertMsg("登录密码不能为空");
			return false;
		}
		// cardType：证件类型，idcard-身份证、passport-护照
        var postData = {
			'cardNo': userNumVal,
			'cardType': this.realType ? this.realType : 'idcard',
			'passWord' : hex_md5(pwdVal),
			'access_token' : loginObj.access_token		
		}
		$.ajax({
			//url : "/account/verify",
			url : ConfigObj.localSite +  '?version=1&m=user.account.verify',
			dataType : "json",
			type : "post",
			data : postData,
			success : function(msg){
				if(Number(msg.code)===0){
					$.alertMsg("验证成功",true);
					if(!self.fromPage){
						setTimeout(function(){
							//verifyIdObj.goBack();
							verifyInfoObj.goBack=function(){
								verifyInfoObj.destroy();
								verifyIdObj.destroy();
								userInfoObj.show('reload');	
							}
							verifyInfoObj.show();
						},2000);
					}else if(self.fromPage == 'modifyPhone'){  //从修改手机号而来
					    setTimeout(function(){
							modifyPhoneObj.goBack=function(){
								modifyPhoneObj.destroy();
								verifyIdObj.destroy();
								userInfoObj.show('reload');
							}
							modifyPhoneObj.show();
						},2000);
					}else if(self.fromPage == 'modifyPwd'){  //从修改密码而来
					    setTimeout(function(){
							modifyPwdObj.goBack=function(){
								modifyPwdObj.destroy();
								verifyIdObj.destroy();
								userInfoObj.show('reload');
							}
							modifyPwdObj.show();
						},2000);
					}
				}else{
					$.alertMsg(msg.code_str);
					
				}
			}
		});
	}

	verifyIdObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
	}

	verifyIdObj.init = function(){
		verifyIdObj.onloadExecution();
	}
	
	verifyIdObj.setDefConfig = function(){
		this.fromPage = '';
	}

    verifyIdObj.setConfigData = function (data) {
        if (!data) return;
      	this.realType = data.realType;
    }