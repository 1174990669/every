
	var wechatdrawSucObj = new PageController({
	   'name': 'wechatdrawSuc',
	   'tpl' : 'template/user/wechatdrawSuc.html'
    });


	wechatdrawSucObj.createDomObj = function(){
		this.returnObj = $("#return_home");
		this.backObj = $("#wechatdrawSuc_backbtn");

	}

	wechatdrawSucObj.createEvent = function(){
	
		this.backObj.unbind('tap').tap(function(){
			wechatdrawSucObj.goBack();
		});
		this.returnObj.unbind('tap').tap(function(){
			wechatdrawSucObj.goReturn();
		})
	}
	
	wechatdrawSucObj.goReturn = function(){
		Global.GC();
	    userCenterObj.show('reload');
	}
	
	wechatdrawSucObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
	}

	wechatdrawSucObj.init = function(){
		this.onloadExecution();
	}