
	var bindPhoneObj = new PageController({
	   'name': 'bindPhone',
	   'tpl' : 'template/user/bindPhone.html'
    }); 
	

	bindPhoneObj.createDomObj = function(){
		this.newTelObj = $("#bindPhone_newTelObj");
		this.checkCodeObj = $("#bindPhone_checkCodeObj");
		this.getCodeObj = $("#bindPhone_getCodeObj");
		this.submitObj = $("#bindPhone_submitObj");
		this.backObj = $("#bindPhone_backObj");
	}

	bindPhoneObj.createEvent = function(){
		this.newTelObj.add(this.checkCodeObj).unbind('focus').focus(function(){
			$(this).parent().addClass('focus');
		});
//bindPhone_newTelObj  
		this.newTelObj.add(this.checkCodeObj).unbind('blur').blur(function(){
			$(this).parent().removeClass('focus');
		});
		
		this.getCodeObj.unbind('tap').tap(function(){
			bindPhoneObj.checkPhone();
		});

		this.submitObj.unbind('tap').tap(function(){
			bindPhoneObj.submitData();
		});

		this.backObj.unbind('tap').tap(function(){
			bindPhoneObj.goBack();
		});

	}

	bindPhoneObj.submitData = function(){
		var newTelVal = this.newTelObj.val();
		var checkCodeVal = this.checkCodeObj.val();

		if(newTelVal === ""){
			$.alertMsg("手机号码不能为空");
			return false;
		}else if(!((/[0-9]{11}/g).test(Number(newTelVal))) ){
			$.alertMsg("请输入正确的手机号码");
			return false;
		}else if(checkCodeVal === ""){
			$.alertMsg("验证码不能为空");
			return false;
		}
//bindPhone_submitObj
		var url = '?version=1&m=user.account.bindPhone';
		var alertmsg = '手机号码绑定成功';

		if (bindPhoneObj.preBindStatus) {
            url = '?version=1&m=user.account.modifyPhone';
            alertmsg = '手机号码修改成功';
		}

        var postData = {
        	'para':Global.encrypt({
        		'mobile': newTelVal,
            	'sms_code': checkCodeVal
        	}),
            'access_token': loginObj.access_token
        };
        console.log(postData)
        $.ajax({
            url: ConfigObj.localSite + url,
            data: postData,
            dataType: "json",
            type: "post",
            success: function (msg) {
            	// console.log(msg)
                if (Number(msg.code) === 0) {
                    $.alertMsg(alertmsg, true);
                    setTimeout(function () {
                        setPwdObj.show();
                    }, 2000);
					
                } else {
                    $.alertMsg(msg.msg);
                }
            }
        });
    }

	bindPhoneObj.checkPhone = function(){
		if(this.getCodeObj.hasClass('noover')){
			return false;
		}
		var phoneNum = this.newTelObj.val();
		if(phoneNum === ""){
			$.alertMsg("新手机号码不能为空");
			return false;
		}else if(!((/[0-9]{11}/g).test(Number(phoneNum))) ){
			$.alertMsg("请输入正确的手机号码");
			return false;
		}
		
		bindPhoneObj.getCode();

	}

	bindPhoneObj.getCode = function(){
		if(this.getCodeObj.hasClass('noover')){
			return false;
		}
		var phoneNum = this.newTelObj.val();
		if(phoneNum === ""){
			$.alertMsg("新手机号码不能为空");
			return false;
		}else if(!((/[0-9]{11}/g).test(Number(phoneNum))) ){
			$.alertMsg("请输入正确的手机号码");
			return false;
		}
		this.setTime = bindPhoneObj.defSetTime;
		this.getCodeObj.addClass('noover');
		this.getCodeObj.html("请稍等");
        var postData = {
            'access_token': loginObj.access_token,
            'phone': phoneNum,
            'summary': bindPhoneObj.preBindStatus ? 'modifyPhone' : 'bindPhone'
        }
		$.ajax({
			url : ConfigObj.localSite +  '?version=1&m=user.account.sendMobileCode',
			data : postData,
			dataType : "json",
			type : "post",
			error:function(ms){console.log(454)},
			success : function(msg){
				// console.log(msg) 
				if (msg.code == '0000') $.alertMsg('短信验证码发送成功', true);
				if(Number(msg.code)!==0){
					$.alertMsg(msg.code_str);
					bindPhoneObj.getCodeObj.html("获取短信验证码");
					bindPhoneObj.getCodeObj.removeClass('noover');
					return false;
				}
				bindPhoneObj.setTimeCheck();
			}
		});
	}
//user.account.modifyPhone
	bindPhoneObj.setTimeCheck = function(){
		this.getCodeObj.html(this.setTime+"秒后重新获取");
		bindPhoneObj.timer = setTimeout(function(){
			bindPhoneObj.setTime--;
			if(bindPhoneObj.setTime<=0){
				bindPhoneObj.getCodeObj.html("获取短信验证码");
				bindPhoneObj.getCodeObj.removeClass('noover');
				return false;
			}
			bindPhoneObj.setTimeCheck();
		},1000);
	}

	bindPhoneObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
	}

	bindPhoneObj.init = function(){
		bindPhoneObj.setDefConfig();
		bindPhoneObj.onloadExecution();
	}

    bindPhoneObj.setDefConfig = function (obj) {
		obj = obj || {};
        bindPhoneObj.preBindStatus = obj['preBindStatus'] || false;
        bindPhoneObj.defSetTime = obj['defSetTime'] || 120;
        bindPhoneObj.setTime = obj['setTime'] || 120;
        if (bindPhoneObj.timer) {
            clearTimeout(bindPhoneObj.timer);
            bindPhoneObj.timer = '';
        }
    }
	

