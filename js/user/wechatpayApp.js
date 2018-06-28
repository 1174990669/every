
	var wechatpayAppObj = new PageController({
	   'name': 'wechatpayApp',
	   'tpl' : 'template/user/wechatpayApp.html'
    });


	wechatpayAppObj.createDomObj = function(){
		this.wrapObj = $("#wechatpayApp_wrapObj");
		this.moneyObj = $("#wechatpayApp_moneyObj");
		this.keyObj = $("#wechatpayApp_keyObj");
		this.backObj = $("#wechatpayApp_backObj");
		this.showObj = $("#wechatpayApp_showObj");
		this.zdbackObj = $("#wechatpayApp_zdbackObj");
		this.hideTipsObj = $("#wechatpayApp_hideTipsObj");
		this.recordObj = $('#wechatpayApp_listObj');

		if (this.allowOneCent) $('#wechatpayApp_testmoney').show();
	}

	wechatpayAppObj.createEvent = function(){
		this.wrapObj.unbind('tap').tap(function(e){
			wechatpayAppObj.updateMoneyEvent(e);
		});

		this.zdbackObj.unbind('tap').tap(function(){
			//window.location.href = '/cashier/deposit';
		});

		this.backObj.unbind('tap').tap(function(){
			wechatpayAppObj.goBack();
		});
		this.recordObj.unbind('tap').tap(function(){
			wechatpayAppObj.goRecord();
		})
	}
	
	wechatpayAppObj.goRecord = function(){
		rechargeRecordObj.goBack = function(){
			rechargeRecordObj.destroy();
			wechatpayAppObj.show();	
		}
		rechargeRecordObj.show('reload');
	}

	wechatpayAppObj.updateMoneyEvent = function(e){
		var aObj = $.oto_checkEvent(e,"A");
		if(aObj){
			var thisObj = $(aObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "sub" : this.subPay();return true;;
                case "clearTips" : this.hideTipsObj.hide();return true;
				case "clearAuthTips": $('#wechatpayApp_authTipsObj').hide();return true;
		        case "toAuthTips": this.checkReal();return true;
			}
		}

		var pObj = $.oto_checkEvent(e,"P");
		if(pObj){
			var thisObj = $(pObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "showkey" : this.showKey();return true;;
			}
		}

		var spanObj = $.oto_checkEvent(e,"SPAN");
		if(spanObj){
			var thisObj = $(spanObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "setMoney" : this.setMoney(thisObj);return true;;
				case "showkey" : this.showKey();return true;;
				case "hidekey" : this.hidekey();return true;;
				case "key" : this.keytUpdateMoney(thisObj);return true;;
				case "delkey" : this.delKeyMoney();return true;;
			}
		}

		var dlObj = $.oto_checkEvent(e,"DL");
		if(dlObj){
			var thisObj = $(dlObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "updPay" : this.updPay(thisObj);return true;
			}
		}

		var divObj = $.oto_checkEvent(e,"DIV");
		if(divObj){
			if(divObj.id=="keyObj")return true;
            if($(divObj).attr("data-t")=="nohide")return true;
			wechatpayAppObj.hidekey();
            wechatpayAppObj.hideTipsObj.hide();
		}
	}
    
	//跳转到其他支付方式
	wechatpayAppObj.updPay = function(obj){
		var v = obj.attr("data-v");
		var id = obj.attr('data-id');
		if(v == 'stationAgent'){//客服代充
			stationRechargeObj.goBack = function(){
				stationRechargeObj.destroy();
				userCenterObj.show();	
			}
			stationRechargeObj.show('reload',function(){
				stationRechargeObj.getData();	
			});
		}else if(v == 'wechatpayApp'){//微信充值
			
			wechatpayAppObj.goBack = function(){
				wechatpayAppObj.destroy();
				userCenterObj.show();
			}
			wechatpayAppObj.show('reload',function(){
				wechatpayAppObj.getData();	
			});
			
		}
	}

	wechatpayAppObj.delKeyMoney = function(){
		this.money = Number(this.money.toString().slice(0,-1));
		this.updateMoney();
	}

    /**
	 * 更新充值金额
     * @param obj
     */
	wechatpayAppObj.keytUpdateMoney = function(obj){
		var thisV = obj.attr("data-v");
		if(this.checkTipsShow){
      		this.checkTipsShow = false;
			this.money = thisV.toString();
    	}else{
			this.money += thisV.toString();
		}

		if (Number(this.money) > 50000) {
			Global.msg('每次最多充值 50000 元');
            this.money = 50000;
		}
		this.money = Number(this.money);
		this.updateMoney();
	}

	wechatpayAppObj.showKey = function(){
		this.keyObj.show();
		this.showObj.addClass('focus');
		this.checkTipsShow = true;
	}

    wechatpayAppObj.hidekey = function () {
        if (this.money < 5) {
        	if (wechatpayAppObj.allowOneCent && 0.01 === this.money) {
				// 可以使用 测试1分
			} else {
                Global.msg('充值最小金额 5 元');
                this.money = 5;
                this.updateMoney();
			}
        }
        this.keyObj.hide();
        this.showObj.removeClass('focus');
        this.checkTipsShow = false;
    }

	wechatpayAppObj.setMoney = function(obj){
		var thisV = Number(obj.attr("data-v"));
		obj.siblings().removeClass("selected");
		obj.addClass('selected')
		this.money = thisV;
		this.updateMoney();
	}

	wechatpayAppObj.updateMoney = function(){
		this.updateKjClass();
		this.moneyObj.html(this.money+"元");
	}

	wechatpayAppObj.updateKjClass = function(){
		var spanObj = $("span[data-t='setMoney']");
		for(var i=0,ilen=spanObj.length;i<ilen;i++){
			var thisV = Number(spanObj.eq(i).attr("data-v"));
			if(thisV != this.money){
				spanObj.eq(i).removeClass("selected");
			}else{
				spanObj.eq(i).addClass("selected");
			}
		}
	}

	wechatpayAppObj.showErrMsg = function(msg){
		$.alertMsg(msg);
	}
	
	wechatpayAppObj.subPay = function(){
	  var self = this;
	  if(loginObj.userInfo && loginObj.userInfo.real_status == 'Y'){
		  self.subPayFun();
	  }else{
		  $('#wechatpayApp_authTipsObj').show();
	  }	
		
	}
	
	wechatpayAppObj.checkReal = function(){
		 var self = this;
		 $('#wechatpayApp_authTipsObj').hide();
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

	wechatpayAppObj.subPayFun = function(){     //支付

		if (this.money < 5) {
            if (this.money == 0.01 && this.allowOneCent) {
			} else {
                // 小于 5 元时不直接提交
                this.hidekey();
                return;
			}
		}

        var postData = {
            'channel': this.channel,
            'amount': this.money,
            'pay_id': this.pay_id,
            'access_token': loginObj.access_token
        };

		Global.post('?version=1&m=user.account.checkIsVaild', {access_token: loginObj.access_token}, function (req) {
			if (req.code != '0000') {
				Global.msg('用户状态异常');
				setTimeout(function () {
                    // 直接清空数据，然后发送请求
                    loginObj.tokenFail();

                    loginObj.show();
                    Global.GC();

                    // 清除所有缓存
                    window.localStorage.clear();
					//注销
                    $.ajax({
                        url: ConfigObj.localSite + '?version=1&m=user.account.logout',
                        data: {'access_token': loginObj.access_token},
                        type: "post",
                        dataType: "json",
                        success: function (msg) {
                        }
                    });
                }, 1000);
			} else {
                // 支付唯一 id
                ConfigObj.pay_id = wechatpayAppObj.pay_id;

                payStatusObj.goBack = function () {
                    payStatusObj.destroy();
                    wechatpayAppObj.show(true);
                };

                // 进入支付扣款状态页面
                payStatusObj.show(true, function () {
                    $.ajax({
                        url: ConfigObj.localSite + '?version=1&m=cashier.deposit.depositInfo',
                        data: postData,
                        type: "post",
                        dataType: "json",
                        success: function (msg) {
                            if (msg.code !== "0000") {
                                $.alertMsg(msg.code_str);
                                return false;
                            }

                            payStatusObj.setData({
                                pay_id: postData.pay_id,
                                target_type: msg.info.target_type,
                                target_id: msg.info.target_id
                            });

                            if (msg.info.respond_type == 'data') {
                                //console.log('微信充值数据', msg.info);
                                if (ConfigObj.platForm == 'android' && typeof android_obj != 'undefined') {
                                    android_obj.payWeixin(msg.info.respond_data.app_id, msg.info.respond_data.token_id);
                                } else if (ConfigObj.platForm == 'ios' && typeof ios_obj != 'undefined') {
                                    ios_obj.payWeixin(msg.info.respond_data.amount, msg.info.respond_data.token_id);
                                }
                            } else if (msg.info.respond_type == 'url') {
                                location.href = msg.info.return_url;
                            }
                        }
                    });
                });
			}
        });
    };
	
	wechatpayAppObj.getData = function(){
		
		var postData = {
			'access_token':loginObj.access_token,
			'terminal': ConfigObj.platForm === 'ios' ? 3 : 2
		}
	    $.ajax({
			url : ConfigObj.localSite +  '?version=1&m=cashier.deposit.index',
			data : postData,
			type : 'post',
			dataType : 'json',
			success : function(obj){
				$('#wechatpayApp_loading').hide();
				//console.log('微信充值页面返回', obj);
				if(obj.code == '0000'){
					wechatpayAppObj.channel = obj.info.channel;
					wechatpayAppObj.pay_id = obj.info.pay_id;
					wechatpayAppObj.formatHtml(obj.info);
					
					if(obj.info.otherchannel_is_usable=='Y'){

						$('#wechatpayApp_area').show();
					}
				}else{
					$.alertMsg(obj.code_str);	
				}
			}
		}); 	
	}
	
	wechatpayAppObj.formatHtml = function(obj){
		$('#wechatpayApp_username').html(obj.scene_owner_name);
		var html = '';
		for(var i in obj.other_channel){
		   var itm = obj.other_channel[i];
		   var data_id = (itm.station_info && itm.station_info.id)  ?  itm.station_info.id : '';
		   
		   if(itm.is_usable=='N'){

			   continue;
		   }
		   html +=    '<dl class="clearfix" data-t="updPay" data-v="'+ i +'" data-id="'+ data_id +'">'+
			'<dt><span class="'+ i +' payicon"></span></dt>'+
			'<dd>'+
				'<p class="font16">'+ itm.channel_cn + '</p>'+
				'<p class="font12 gray">'+ itm.channel_desc + '</p>'+
			'</dd>'+
				'</dl>';
		}
		$('#wechatpayApp_other').html(html);
	}

    wechatpayAppObj.setDefConfig = function(){
		this.channel = '';
		this.money = 10;
		this.pay_id = '';
		this.station_info = '';
		this.checkTipsShow = false;
		this.allowOneCent = false; // 是否允许测试充值1分
	}

	wechatpayAppObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
		this.getData();
	}

	wechatpayAppObj.init = function(){
		this.setDefConfig();
		wechatpayAppObj.onloadExecution();
	}
	
	
