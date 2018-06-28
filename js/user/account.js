
	var accountObj =  new PageController({
	   'name': 'account',
	   'tpl' : 'template/user/account.html'
    });

	accountObj.createDomObj = function(){
		this.backObj = $('#account_backbtn');
	}

	accountObj.createEvent = function(){
		$('#account_wrapperObj').unbind('tap').tap(function(e){
			var liObj = $.oto_checkEvent(e,"LI");
			if(liObj){
				var thisObj = $(liObj);
				var thisT = thisObj.attr("data-t");
				switch(thisT){
					case 'money':  accountObj.goCashRecord();return true;
					case 'redbag': accountObj.goBonusRecord();return true;
					case 'score': accountObj.goScoreRecord();return true;
				}
			}
			var aObj = $.oto_checkEvent(e,"A");
			if(aObj){
				var thisObj = $(aObj);
				var thisT = thisObj.attr("data-t");
				switch(thisT){
					case "recharge" : accountObj.goRecharge();return true;
					case "withdraw" : accountObj.goWithDraw();return true;
					case "clearAuthTips": $('#account_authTipsObj').hide();return true;
		        	case "toAuthTips": accountObj.checkReal();return true;
				}
			}
		});
		
		$('#account_back').unbind('tap').tap(function(){
			accountObj.goBack();
		})
		$('#account_freezeWrap').unbind('tap').tap(function(){
			accountObj.goFreezeRecord();
		})
	}
	
	//冻结
	accountObj.goFreezeRecord = function(){
		freezeRecordObj.goBack = function(){
			freezeRecordObj.destroy();
			accountObj.show();	
		}
		freezeRecordObj.show();	
	}
	
	//现金
	accountObj.goCashRecord = function(){
		cashRecordObj.goBack = function(){
			cashRecordObj.destroy();
			accountObj.show();	
		}
		cashRecordObj.show();	
	}
	
	//红包
	accountObj.goBonusRecord = function(){
		bonusRecordObj.goBack = function(){
			bonusRecordObj.destroy();
			accountObj.show();	
		}
		bonusRecordObj.show();	
	}
	
	//积分
	accountObj.goScoreRecord = function(){
		scoreRecordObj.goBack = function(){
			scoreRecordObj.destroy();
			accountObj.show();	
		}
		scoreRecordObj.show();
	}

    //跳转到充值页面
    accountObj.goRecharge = function () {
		// 不用判断是否已经登录，因为这个页面登录后才能进入
		/* bcy
        Global.checkRealStatus({
			from: 'userInfo',
            yes: function () {
            		/* bcy
                wechatpayAppObj.goBack = function () {
                    wechatpayAppObj.destroy();
                    accountObj.show(true);
                };
                wechatpayAppObj.show(true);
                ***
                
                wechatpayWebObj.goBack = function () {
                    wechatpayWebObj.destroy();
                    accountObj.show(true);
                };
                // 来源为 用户中心
                wechatpayWebObj.dirShow({'from': 'account'});
                
            },
            realAuthBack: function () {
                accountObj.show(true, function () {
                    accountObj.getData();
                });
            }

        });
        */
        
                wechatpayWebObj.goBack = function () {
                    wechatpayWebObj.destroy();
                    accountObj.show(true);
                };
                // 来源为 用户中心
                wechatpayWebObj.dirShow({'from': 'account'});        
        
        

		/**
		alipayWapObj.goBack=function(){
			alipayWapObj.destroy();
			accountObj.show();	
		}
		alipayWapObj.show();
		 **/
	}
	
	//跳转到提款页面
	accountObj.goWithDraw = function(){
//		if(loginObj.userInfo && loginObj.userInfo.real_status == 'Y'){
//	       withDrawObj.goBack=function(){
//			  withDrawObj.destroy();
//			  accountObj.show();   
//		   }
//		   withDrawObj.show('reload',function(){
//				withDrawObj.getData();   
//				//console.log("111");
//		   })
//		}else if(loginObj.userInfo && loginObj.userInfo.real_status == 'Ing'){
//			$.alertMsg('您的实名认证正在审核中');
//		}else if(loginObj.userInfo && loginObj.userInfo.real_status == 'N'){
//			$('#account_authTipsObj').show();	
//		}
		if(!loginObj.isLogin ){
            userCenterObj.goLogin();
            return false;
        }

        if (loginObj.userInfo) {
            var rs = loginObj.userInfo.real_status;
            //console.log(rs);
            if (rs === 'Y') {
                withDrawObj.goBack = function () {
                    withDrawObj.destroy();
                    accountObj.show('reload');
                };
                withDrawObj.show(true);
            } else if (rs === 'Ing') {
                $.alertMsg('您的实名认证正在审核中');
            } else if (rs === 'N' || rs === 'Fail') {
                $('#userCenter_authTipsObj').show();
            }
        }
	}
	
	accountObj.checkReal = function(){
		var self = this;
		 $('#account_authTipsObj').hide();
		 regRealNameObj.goBack=function(){
			 regRealNameObj.destroy();
			 self.show();  
		  }
		  regRealNameObj.show('reload',function(){
			  var data = {
				'accountName': loginObj.userInfo.user_name,
				'from' : 'buy',  
			  }
			  regRealNameObj.setData(data);
		  });	
	}


	accountObj.setData = function(obj){
		//console.log(obj);
		this.info = obj;
		this.formatHtml(obj);	
	}
	
	accountObj.formatHtml = function(obj){
		$('#account_total').html(obj.cash.total);
		$('#account_freezecash').html(obj.cash.freezing);
        $('#account_freezebonus').html(obj.bonus.freezing);
		$('#account_money').html(obj.cash.remain);
		$('#account_redbag').html(obj.bonus.remain);
		$('#account_score').html(obj.score.remain);
	}
	
	accountObj.getData = function(){
//		console.trace();
		var postData = {
			'access_token':loginObj.access_token	
		}
		$.ajax({
		  url : ConfigObj.localSite +  '?version=1&m=user.account.myAccount',  
		  data : postData,
		  type : "post",
		  dataType : "json",
		  success : function(msg){
		  	//console.log(msg);
		  	
			if(msg.code=='0000'){
			  msg.info = $.parseJSON(Global.crypt(msg.info));
			  accountObj.formatHtml(msg.info);
			}else{
			  $.alertMsg(msg.code_str); 
			}
		  }
		}); 		
	}

	accountObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
		this.getData();
	}

	accountObj.init = function(){
		accountObj.setDefConfig();
		accountObj.onloadExecution();
	}
	
	accountObj.setDefConfig = function(){
		this.info = ''; 
	}

    accountObj.dirShow = function (obj) {
        this.show(true, function () {
            obj = obj || {};
            for (var p in obj) {
                if (!obj.hasOwnProperty(p)) continue;

                this[p] = obj[p]; // 设置属性
                if (p === 'back') this.goBack = function () {
                    Global.open(obj['back']);
                }
            }
        }.bind(this));
    };
	
   