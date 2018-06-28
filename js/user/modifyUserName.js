
	var modifyUserNameObj = new PageController({
	   'name': 'modifyUserName',
	   'tpl' : 'template/user/modifyUserName.html'
    }); 

	modifyUserNameObj.createDomObj = function(){
		this.submitObj = $("#modifyUserName_submitObj");
		this.tipsObj = $("#modifyUserName_tipsObj");
		this.usernameObj = $("#modifyUserName_usernameObj");
		this.backObj = $("#modifyUserName_backObj");
		this.userLiObj = $("#modifyUserName_userLiObj");
		this.nowName = $('#modifyUserName_nowName');
		this.nowName.html(loginObj.userInfo.user_name);
	}

	modifyUserNameObj.createEvent = function(){
		this.submitObj.unbind('tap').tap(function(){
			modifyUserNameObj.showTips();
		});

		this.tipsObj.unbind('tap').tap(function(e){
			modifyUserNameObj.tipsEvent(e);
		});

		this.backObj.unbind('tap').tap(function(e){
			modifyUserNameObj.goBack();
		});

		

		this.userLiObj.unbind('tap').tap(function(e){
			modifyUserNameObj.usernameObj.focus();
		});
		
		this.usernameObj[0].addEventListener("input",function(){
	      if(this.value.length > 18){
	      	this.value = this.value.substr(0,18);
	      }	
	    },false);
	    
	    $("#modifyUserName_usernameObj").live("blur",function(){  
		    _filter_method($(this));  
		}); 
		
		var keywords = ['V信','微信','WeChat','wechat','qq','QQ','群','qun','群号','V+','手机号','公众号','阅读号','v+']
		
		function _filter_method(obj){  
		    var value = $(obj).val();  
		    for(var i=0;i<keywords.length;i++){  
		        var reg = new RegExp(keywords[i],"g");  
		        if(value.indexOf(keywords[i])!=-1){  
		            var result = value.replace(reg,"");  
		            value = result;  
		            $(obj).val(result);  
		        }  
		    }  
		}  
	    
	}

	modifyUserNameObj.tipsEvent = function(e){
		var aObj = $.oto_checkEvent(e,"A");
		if(aObj){
			var thisObj = $(aObj);
			var thisT = thisObj.attr("data-t");
			switch (thisT){
				case "close" : this.hideTips();break;
				case "sub" : this.subUserName();break;
			}
			return true;
		}

		var divObj = $.oto_checkEvent(e,"DIV");
		if(divObj){
			var thisObj = $(divObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "tips" :this.hideTips();
			}
		}
	}

	modifyUserNameObj.showTips = function(){
		this.usernameObj.blur();
		var userNameVal = this.usernameObj.val();
		if(!userNameVal){
			$.alertMsg("新用户名不能为空");
			return false;
		}
		if(userNameVal.length < 2 || userNameVal.length>7){
			$.alertMsg("用户名长度为2-7个字符");
			return false;
		}
		if(!isNaN(userNameVal)){
			$.alertMsg("用户名不能全部都是数字");
			return false;
		}
		var postData = {
			'userName' : userNameVal,
			'access_token': loginObj.access_token	
		}
		modifyUserNameObj.tipsObj.show();
	}

	modifyUserNameObj.hideTips = function(){
		this.tipsObj.hide();
	}

	modifyUserNameObj.subUserName = function(){
		var userNameVal = this.usernameObj.val();
        var postData = {
			'newName' : userNameVal,
			'access_token': loginObj.access_token	
		}
		console.log(postData) //user.account.modifyUserName
		$.ajax({
			url : ConfigObj.localSite +  '?version=1&m=user.account.modifyUserName',
			data : postData,
			type : "post",
			dataType : "json",
			success : function(msg){
				console.log(msg)
				if(msg.code == '0000'){
					$.alertMsg("修改成功",true);
					setTimeout(function(){
						modifyUserNameObj.goBack();
					},2000);
					
				}else{
					$.alertMsg(msg.code_str);
				}
				modifyUserNameObj.hideTips();
			}

		});
	}

	modifyUserNameObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
	}

	modifyUserNameObj.init = function(){
		modifyUserNameObj.onloadExecution();
	}
	
	
    
	
	