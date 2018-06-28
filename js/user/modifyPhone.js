
	var modifyPhoneObj = new PageController({
	   'name': 'modifyPhone',
	   'tpl' : 'template/user/modifyPhone.html'
    }); 
	

	modifyPhoneObj.createDomObj = function(){
		this.oldTelObj = $("#modifyPhone_oldTelObj");
		this.newTelObj = $("#modifyPhone_newTelObj");
		this.checkCodeObj = $("#modifyPhone_checkCodeObj");
		this.getCodeObj = $("#modifyPhone_getCodeObj");
		this.submitObj = $("#modifyPhone_submitObj");
		this.backObj = $("#modifyPhone_backObj");
		var tempPhone = loginObj.userInfo.mobile ? loginObj.userInfo.mobile.substr(0,3) + '****' + loginObj.userInfo.mobile.substr(7) : '';
		$('#modifyPhone_nowPhone').html(tempPhone);
		
	}

	modifyPhoneObj.createEvent = function(){
		this.oldTelObj.add(this.newTelObj).add(this.checkCodeObj).unbind('focus').focus(function(){
			$(this).parent().addClass('focus');
		});

		this.oldTelObj.add(this.newTelObj).add(this.checkCodeObj).unbind('blur').blur(function(){
			$(this).parent().removeClass('focus');
		});

		/*
		this.oldTelObj.blur(function(){
			if(loginObj.userInfo.mobile && loginObj.userInfo.mobile != modifyPhoneObj.oldTelObj.val()){
				$.alertMsg('输入的旧手机号与实际不符');	
			}
		})
		*/

		this.getCodeObj.unbind('tap').tap(function(){
			modifyPhoneObj.checkPhone();
		});

		this.submitObj.unbind('tap').tap(function(){
			modifyPhoneObj.submitData();
		});

		this.backObj.unbind('tap').tap(function(){
			modifyPhoneObj.goBack();
		});

	}

    modifyPhoneObj.submitData = function () {
        var oldTelVal = this.oldTelObj.val();
        var newTelVal = this.newTelObj.val();
        var checkCodeVal = this.checkCodeObj.val().replace(/\s/g);

        if (oldTelVal === "") {
            $.alertMsg("旧手机号码不能为空");
            return false;
        } else if (newTelVal === "") {
            $.alertMsg("新手机号码不能为空");
            return false;
        } else if (!((/[0-9]{11}/g).test(Number(oldTelVal)))) {
            $.alertMsg("旧手机号码格式错误");
            return false;
        } else if (loginObj.userInfo.mobile !== oldTelVal) {
            $.alertMsg("请输入正确的旧手机号码");
            return false;
		} else if (!((/[0-9]{11}/g).test(Number(newTelVal)))) {
            $.alertMsg("新手机号码格式错误");
            return false;
        } else if (oldTelVal == newTelVal) {
            $.alertMsg("新手机号码不能和旧手机号码相同");
            return false;
        } else if (checkCodeVal === "") {
            $.alertMsg("验证码不能为空");
            return false;
        } else if (!this.getCodeObj.hasClass('noover')) {
            $.alertMsg("尚未获取验证码");
            return false;
		}

        var postData = {
        	'para':Global.encrypt({
        		'mobile': newTelVal,
				'old_mobile': oldTelVal,
	            'sms_code': checkCodeVal
        	}),
            'access_token': loginObj.access_token
        }
        console.log(newTelVal)
        console.log(oldTelVal)
        console.log(checkCodeVal)
        $.ajax({
            url: ConfigObj.localSite + '?version=1&version=1&m=user.account.modifyPhone',
            data: postData,
            dataType: "json",
            type: "post",
            success: function (msg) {
            	console.log(msg)
            	// return false; 
                if (msg.code == '0000') {
                    $.alertMsg("手机号码修改成功", true);
                    setTimeout(function () {
                        modifyPhoneObj.goBack();
                        userCenterObj.getData();
                    }, 2000);

                } else {
                    $.alertMsg(msg.msg);
                }
            }
        });
    }

	modifyPhoneObj.checkPhone = function(){
		if(this.getCodeObj.hasClass('noover')){
			return false;
		}
		var phoneNum = this.newTelObj.val();
		var oldTelVal = this.oldTelObj.val();
		if(oldTelVal === ""){
			$.alertMsg("旧手机号码不能为空");
			return false;
		}else if(phoneNum === ""){
			$.alertMsg("新手机号码不能为空");
			return false;
		}else if(!((/[0-9]{11}/g).test(Number(oldTelVal))) ){
			$.alertMsg("旧手机号码格式错误");
			return false;
		}else if (loginObj.userInfo.mobile !== oldTelVal) {
            $.alertMsg("请输入正确的旧手机号码");
            return false;
        }else if(!((/[0-9]{11}/g).test(Number(phoneNum))) ){
			$.alertMsg("新手机号码格式错误");
			return false;
		}else if(oldTelVal == phoneNum){
			$.alertMsg("新手机号码不能和旧手机号码相同");
			return false;
		}
		var postData = {
			'access_token' : loginObj.access_token,
			'phone': phoneNum,
			'summary': 'modifyPhone'
		}
		console.log(phoneNum)
		console.log(postData)

		this.setTime = modifyPhoneObj.defSetTime;
        this.getCodeObj.addClass('noover');
        this.getCodeObj.html("请稍等");

        $.ajax({
            url: ConfigObj.localSite + '?version=1&version=1&m=user.account.sendMobileCode',
            data: postData,
            dataType: "json",
            type: "post",
            success: function (msg) {
                if (msg.code == '0000') {
                    modifyPhoneObj.setTimeCheck();
                } else {
                    $.alertMsg(msg.code_str);
                    modifyPhoneObj.setTimeCheck();
                }
            }
        });

    }

    modifyPhoneObj.setTimeCheck = function () {
        this.getCodeObj.html(this.setTime + "秒后重新获取");
        modifyPhoneObj.timer = setTimeout(function () {
            modifyPhoneObj.setTime--;
            if (modifyPhoneObj.setTime <= 0) {
                modifyPhoneObj.getCodeObj.html("获取短信验证码");
                modifyPhoneObj.getCodeObj.removeClass('noover');
                return false;
            }
            modifyPhoneObj.setTimeCheck();
        }, 1000);
    };

	modifyPhoneObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
	}

	modifyPhoneObj.init = function(){
		modifyPhoneObj.setDefConfig();
		modifyPhoneObj.onloadExecution();
	}
	
	modifyPhoneObj.setDefConfig = function(){
		 modifyPhoneObj.defSetTime = 120;
		 modifyPhoneObj.setTime = 120;
		 if(modifyPhoneObj.timer){
			clearTimeout(modifyPhoneObj.timer);
		 	modifyPhoneObj.timer = '';
		 }
	}
	

