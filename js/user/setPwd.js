
	var setPwdObj = new PageController({
	   'name': 'setPwd',
	   'tpl' : 'template/user/setPwd.html'
    }); 

	setPwdObj.createDomObj = function(){
		this.oldPwdObj = $("#setPwd_oldPwdObj");
		this.newPwdObj = $("#setPwd_newPwdObj");
		this.resnewPwdObj = $("#setPwd_resnewPwdObj");
		this.submitObj = $("#setPwd_submitObj");
		this.backObj = $("#setPwd_backObj");
	}

	setPwdObj.createEvent = function(){
		this.oldPwdObj.add(this.newPwdObj).add(this.resnewPwdObj).unbind('focus').focus(function(){
			$(this).parent().addClass('focus');
		});
		this.oldPwdObj.add(this.newPwdObj).add(this.resnewPwdObj).unbind('blur').blur(function(){
			$(this).parent().removeClass('focus');
		});

		this.submitObj.unbind('tap').tap(function(){
			setPwdObj.submitPwd();
		});

		this.backObj.unbind('tap').tap(function(){
			setPwdObj.goBack();
		});
	}

	setPwdObj.submitPwd = function(){
//		var oldPwdVal = this.oldPwdObj.val();
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
			'para' : Global.encrypt(hex_md5(newPwdVal)),	
			'access_token': loginObj.access_token
		}
		
		//console.log(postData);
		$.ajax({
			//url : "/account/modifypwd",
			url : ConfigObj.localSite +  '?version=1&m=user.account.setPwd',
			dataType : "json",
			type : "post",
			data : postData,
			success : function(msg){
				//console.log(msg);
				if(Number(msg.code)===0){
					$.alertMsg("设置密码成功",true);
					setTimeout(function(){
						userCenterObj.show();
						userCenterObj.getData();
					},2000);
				}else{
					$.alertMsg(msg.code_str);
				}
			}
		});
	}

	
	setPwdObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
	}

	setPwdObj.init = function(){
		setPwdObj.onloadExecution();
	}
	
