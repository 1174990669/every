	var withdrawSelectObj = new PageController({
	   'name': 'withdrawSelect',
	   'tpl' : 'template/user/withDrawSelect.html'
    });

	withdrawSelectObj.createDomObj = function(){
		this.wrapperObj = $("#withdrawSelect_wrapperObj");
		this.recordObj = $('#withdrawSelect_recordObj');
	}
	
	withdrawSelectObj.createEvent = function(){
//		console.log("111")
		this.wrapperObj.unbind('tap').tap(function(e){
			withdrawSelectObj.sectionEvent(e);
		});
		this.recordObj.unbind('tap').tap(function(){
			withdrawSelectObj.goRecord();
		})
	}
	withdrawSelectObj.goRecord = function() {
	    withdrawRecordObj.goBack = function() {
	        withdrawRecordObj.destroy();
	        withdrawSelectObj.show();
	    }
	    withdrawRecordObj.show('reload');
	}
	withdrawSelectObj.sectionEvent = function(e){
		
		var aObj = $.oto_checkEvent(e,"A");
		if(aObj){
			var thisObj = $(aObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "wechat": this.wechatDraw();return true;
		        case "bank": this.bankDraw();return true;
		        case "back": this.goBack();return true;
			}
		}
		
	}
	
	withdrawSelectObj.wechatDraw = function(){
		if(withdrawSelectObj.wechatdraw == "Y"){
			wechatDrawObj.goBack = function () {
	            wechatDrawObj.destroy();
	            withdrawSelectObj.show('reload');
	        };
	        wechatDrawObj.show(true);
	        return;
		};
		
        nobindwechatObj.goBack = function () {
            nobindwechatObj.destroy();
            withdrawSelectObj.show('reload');
        };
    	nobindwechatObj.show(true);
	}
	
	withdrawSelectObj.bankDraw = function(){
		withDrawObj.goBack = function () {
                withDrawObj.destroy();
                withdrawSelectObj.show('reload');
            };
        withDrawObj.show(true);
	}
	
	withdrawSelectObj.goBack = function(){
        withdrawSelectObj.destroy();
        userCenterObj.show('reload');
	}
	
	withdrawSelectObj.getData = function(){
		var postData = {
			'zdid': ConfigObj.zdid
		}
		var secretData = {
			'para': Global.encrypt(postData),
			'access_token':loginObj.access_token
		}
//		console.log(postData) 
		$.ajax({
			url : ConfigObj.localSite +  '?version=1&m=cashier.withdraw.DrawCenter',
			data : secretData,
			type : 'post',
			dataType : 'json',
			success : function(obj){
				
				console.log('提现选择页面返回', obj);
//				obj.info = $.parseJSON(Global.crypt(obj.info));
				if(obj.code == '0000'){
					$('#draw_balance').html(obj.info.available_cash);
					withdrawSelectObj.wechatdraw = obj.info.WechatStatus;
					
				}
			}
		})
	}
	
	
	
	withdrawSelectObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
		this.getData();
	}

	withdrawSelectObj.init = function(){
		withdrawSelectObj.setDefConfig();
		withdrawSelectObj.onloadExecution();
	}
	
	withdrawSelectObj.setDefConfig = function(){
		withdrawSelectObj.pullLoad = '';
		withdrawSelectObj.wechatdraw = '';
		withdrawSelectObj.channel = new Array;
	}