
	var nobindwechatObj = new PageController({
	   'name': 'nobindwechat',
	   'tpl' : 'template/user/nobindwechat.html'
    });
    
	nobindwechatObj.createDomObj = function(){
		this.wrapObj = $("#nobindwechat_wrapObj");
		this.backObj = $("#nobindwechat_backObj");
		this.wechatObj = $("#wechat_number");
	}

	nobindwechatObj.createEvent = function(){
		this.backObj.unbind('tap').tap(function(){
			nobindwechatObj.goBack();
		});
		this.wechatObj.unbind('tap').tap(function(){
			nobindwechatObj.copy();
		});
	}
	
	nobindwechatObj.copy = function(){
		var copy_content = this.wechatObj.html();
		var copy_con = copy_content.replace(/\"/g,"");
		if(ConfigObj.platForm == 'android'){
			android_obj.copyTextToClipboard(copy_con);
			return;
		} else if(ConfigObj.platForm == 'ios'){
			ios_obj.copyTextToClipboard(copy_con);
			return;
		}
	}
	
	nobindwechatObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
	}

	nobindwechatObj.init = function(){
		this.onloadExecution();
	}
	