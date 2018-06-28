
	var resetPwdObj = new PageController({
	   'name': 'resetPwd',
	   'tpl' : 'template/user/resetPwd.html'
    }); 

	resetPwdObj.createDomObj = function(){
		this.newPwdObj = $("#resetPwd_newPwdObj");
		this.resnewPwdObj = $("#resetPwd_resnewPwdObj");
		this.submitObj = $("#resetPwd_submitObj");
		this.backObj = $("#resetPwd_backObj");
	}

	resetPwdObj.createEvent = function(){
		this.newPwdObj.add(this.resnewPwdObj).unbind('focus').focus(function(){
			$(this).parent().addClass('focus');
		});
		this.newPwdObj.add(this.resnewPwdObj).unbind('blur').blur(function(){
			$(this).parent().removeClass('focus');
		});

		this.submitObj.unbind('tap').tap(function(){
			resetPwdObj.submitPwd();
		});

		this.backObj.unbind('tap').tap(function(){
			resetPwdObj.goBack();
		});
		
		$('#resetPwd_ask').unbind('tap').tap(function(){
			 feedbackObj.show('',function(){
				feedbackObj.pushRoute(function(){
					resetPwdObj.show();
				})
			 })
		})
	}

	resetPwdObj.submitPwd = function(){
		var newPwdVal = this.newPwdObj.val();
		var resnewPwdVal = this.resnewPwdObj.val();

		if(newPwdVal===""){
			$.alertMsg("新密码不能为空");
			return false;
		}else if(newPwdVal.length<6){
			$.alertMsg("新密码长度最少为6位");
			return false;
		}else if(newPwdVal.length>16){
			$.alertMsg("新密码长度最大为16位");
			return false;
		}else if(resnewPwdVal===""){
			$.alertMsg("确认密码不能为空");
			return false;
		}else if(resnewPwdVal.length<6){
			$.alertMsg("确认密码长度最少为6位");
			return false;
		}else if(resnewPwdVal.length>16){
			$.alertMsg("确认密码长度最大为16位");
			return false;
		}else if(newPwdVal!==resnewPwdVal){
			$.alertMsg("新密码和确认密码不一致");
			return false;
		}
		var reg = /^[0-9a-zA-Z]*$/g;
		if(!reg.test(newPwdVal)){
			$.alertMsg("密码只能为数字或字母");
			return false;
		}
		
		var postData = {
			'passWord1' : hex_md5(newPwdVal),
			'passWord2' : hex_md5(resnewPwdVal),	
			'channelType': resetPwdObj.type,
			'userName': resetPwdObj.userName
		}

		$.ajax({
			//url : "/account/resetPwd",
			url : ConfigObj.localSite +  '?version=1&m=user.account.findPwd',
			dataType : "json",
			type : "post",
			data : postData,
			success : function(msg){
				console.log(msg)
				// return false;
				if(Number(msg.code)===0){
					$.alertMsg("修改成功",true);
					setTimeout(function(){
						//window.location.href = "/account/login";
						loginObj.goBack=function(){
							//Global.GC();
							//userCenterObj.show();
						}
						loginObj.goForward = function(){
							Global.GC();
							userCenterObj.show();	
						}
						loginObj.show(true, function () {
							$('#login_backBtn span').addClass('.opa4');
                        });
						
					},2000);
					
				}else{
					$.alertMsg(msg.code_str);
				}
			}
		});
	}
	
	resetPwdObj.setData = function(obj){
		if(obj){
			this.type = obj.type;
			this.userName = obj.userName	
		}
		if(this.type){
			$('#resetPwd_title').html('密码找回');	
		}else{
			$('#resetPwd_title').html('修改密码');
		}
	}
	
	resetPwdObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
	}

	resetPwdObj.init = function(){
		this.setDefConfig();
		resetPwdObj.onloadExecution();
	}
	
	resetPwdObj.setDefConfig = function(){
		this.userName = '';	
		this.type = '';
	}
