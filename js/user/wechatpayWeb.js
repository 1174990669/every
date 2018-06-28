
	var wechatpayWebObj = new PageController({
	   'name': 'wechatpayWeb',
	   'tpl' : 'template/user/wechatpayWeb.html' 
    });


	wechatpayWebObj.createDomObj = function(){
		this.wrapObj = $("#wechatpayApp_wrapObj");
		this.moneyObj = $("#wechatpayApp_moneyObj");  //充值的金额  wechatpayWap
		this.keyObj = $("#wechatpayApp_keyObj");  //chongzhi 
		this.backObj = $("#wechatpayApp_backObj"); //充值返回 
		this.showObj = $("#wechatpayApp_showObj");
		this.zdbackObj = $("#wechatpayApp_zdbackObj");
		this.hideTipsObj = $("#wechatpayApp_hideTipsObj");
		this.recordObj = $('#wechatpayApp_listObj');
		console.log(this.moneyObj)

		if (this.allowOneCent) $('#wechatpayApp_testmoney').show();
	}

	wechatpayWebObj.createEvent = function(){
		this.wrapObj.unbind('tap').tap(function(e){
			wechatpayWebObj.updateMoneyEvent(e);
		});

		this.zdbackObj.unbind('tap').tap(function(){
			//window.location.href = '/cashier/deposit'; cashier.deposit.index
		});

		this.backObj.unbind('tap').tap(function(){
			wechatpayWebObj.goBack();
			console.log(33)
		});
		this.recordObj.unbind('tap').tap(function(){
			wechatpayWebObj.goRecord();
		})
	}
	
	wechatpayWebObj.goRecord = function(){
		rechargeRecordObj.goBack = function(){
			rechargeRecordObj.destroy();
			wechatpayWebObj.show();	
		}
		rechargeRecordObj.show('reload');
	}

	wechatpayWebObj.updateMoneyEvent = function(e){
		var aObj = $.oto_checkEvent(e,"A");
		if(aObj){
			var thisObj = $(aObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "wechatpayWap" : this.subPay(thisObj);return true; //微信充值
				case "alipayWap": this.subAlipay(thisObj);return true;  //支付宝充值
				case "kjpayWap": this.subApay(thisObj);return true;  //快捷支付
				case "wechatpayWaptwo": this.subApaytwo(thisObj);return true;  //支付
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
				case "showkey" : this.showKey(thisObj);return true;;
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
			wechatpayWebObj.hidekey();
            wechatpayWebObj.hideTipsObj.hide();
		}
	}
    
	//跳转到其他支付方式
	wechatpayWebObj.updPay = function(obj){
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
			
			wechatpayWebObj.goBack = function(){
				wechatpayWebObj.destroy();
				userCenterObj.show();
				// console.log(120)
			}
			wechatpayWebObj.show('reload',function(){
				wechatpayWebObj.getData();	
			});
			
		}
	}

	wechatpayWebObj.delKeyMoney = function(){
		this.money = Number(this.money.toString().slice(0,-1));
		this.updateMoney();
	}

    /**
	 * 更新充值金额
     * @param obj
     */
	wechatpayWebObj.keytUpdateMoney = function(obj){
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

	wechatpayWebObj.showKey = function(){

		this.keyObj.show();
		this.showObj.addClass('focus');
		this.checkTipsShow = true;
		this.moneyObj.html("0元");
		$('#wechatpayApp_btnObj span').removeClass("selected");
	}

    wechatpayWebObj.hidekey = function () {
        if (this.money < 1) {
        	if (wechatpayWebObj.allowOneCent && 0.01 === this.money) {
				// 可以使用 测试1分  delkey
			} else {
                Global.msg('充值最小金额 1 元');
                this.money = 1;
                this.updateMoney();
			}
        }
        this.keyObj.hide();
        this.showObj.removeClass('focus');
        this.checkTipsShow = false;
    }

	wechatpayWebObj.setMoney = function(obj){
		console.log(obj)
		// console.log()
		var thisV = Number(obj.attr("data-v"));
		obj.siblings().removeClass("selected");
		obj.addClass('selected')
		this.money = thisV;
		this.updateMoney();
		// moe = this.money
		// console.log(this.showObj) wechatpayApp_moneyObj
		console.log(this.money)
	}

	wechatpayWebObj.updateMoney = function(){
		this.updateKjClass();
		this.moneyObj.html(this.money+"元");
		console.log(this.money+"元")
	}

	wechatpayWebObj.updateKjClass = function(){
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

	wechatpayWebObj.showErrMsg = function(msg){
		$.alertMsg(msg);
	}
	//微信充值
	wechatpayWebObj.subPay = function(obj){
	  var self = this;
	  var type = obj.attr('data-v');
	  /* bcy
	  if(loginObj.userInfo && loginObj.userInfo.real_status == 'Y'){
	  */
	  if(loginObj.userInfo){
		  self.subPayFun(type);
	  }else{
		  $('#wechatpayApp_authTipsObj').show();
	  }	
		
	}
	//支付
	wechatpayWebObj.subApaytwo = function(obj){
	  var self = this;
	  var type = obj.attr('data-v');
	  /* bcy
	  if(loginObj.userInfo && loginObj.userInfo.real_status == 'Y'){
	  */
	  if(loginObj.userInfo){
		  self.subPayFuntwo(type);
	  }else{
		  $('#wechatpayApp_authTipsObj').show();
	  }	
		
	}
	// 快捷支付
	wechatpayWebObj.subApay = function(obj){
	  var self = this;
	  var type = obj.attr('data-v');
	  /* bcy
	  if(loginObj.userInfo && loginObj.userInfo.real_status == 'Y'){
	  */
	  if(loginObj.userInfo){
		  self.subApayFun(type);
	  }else{
		  $('#wechatpayApp_authTipsObj').show();
	  }	
		
	}
	// 支付宝充值
	wechatpayWebObj.subAlipay = function(obj){
		var self = this;
		var type = obj.attr('data-v');
	  /* bcy
	  if(loginObj.userInfo && loginObj.userInfo.real_status == 'Y'){
	  */
	  if(loginObj.userInfo){
		  self.subAlipayFun(type);
	  }else{
		  $('#wechatpayApp_authTipsObj').show();
	  }	
	}
	
	wechatpayWebObj.checkReal = function(){
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

	wechatpayWebObj.subAlipayFun = function(obj){
		this.channel = obj;
//		console.log(this.channel);
		if (this.money < 1) {
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
            'pay_id': this.pay_id
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
                ConfigObj.pay_id = postData.pay_id;
                ConfigObj.pay_channel = postData.channel;
				
				payStatusObj.goBack = function () {
                    payStatusObj.destroy();
                    wechatpayWebObj.dirShow({'from': wechatpayWebObj.from});
                };
				
				function genFromUrl(from, pay_id) {

                    if (from == 'userCenter') {
                        // 来源页面是用户中心
                        var a = {
                            pageName: 'userCenter'
                        };

                        var b = {
                            pageName: 'wechatpayWeb',
                            back: '?_base64obj=' + serialize(a)
                        };

                        var c = {
                            pageName: 'payStatus',
                            pay_id: pay_id,
                            back: '?_base64obj=' + serialize(b),
                            timeOut: 2000,
                            timeOutBack: '?_base64obj=' + serialize(a)
                        };

                        return '?_base64obj=' + serialize(c);
                    }

                    if (from == 'account') {
//                      // 来源页面是用户中心
                        var a = {
                            pageName: 'userCenter'
                        };

                        var b = {
                            pageName: 'account',
                            back: '?_base64obj=' + serialize(a)
                        };

                        var c = {
                            pageName: 'wechatpayWeb',
                            back: '?_base64obj=' + serialize(b)
                        };

                        var d = {
                            pageName: 'payStatus',
                            pay_id: pay_id,
                            back: '?_base64obj=' + serialize(c),
                            timeOut: 2000,
                            timeOutBack: '?_base64obj=' + serialize(b)
                        };

                        return '?_base64obj=' + serialize(d);
                    }

                    if (from == 'buyConfirm') {
                        var a = {
                            pageName: 'buyConfirm'
                        };

                        var b = {
                            pageName: 'wechatpayWeb',
                            back: '?_base64obj=' + serialize(a)
                        };

                        var c = {
                            pageName: 'payStatus',
                            pay_id: pay_id,
                            back: '?_base64obj=' + serialize(b),
                            timeOut: 2000,
                            timeOutBack: '?_base64obj=' + serialize(a)
                        };

                        return '?_base64obj=' + serialize(c);
                    }
                }
				console.log(postData)
				var secretData = {
					'para' : Global.encrypt(postData),
					'from': wechatpayWebObj.from,
					'access_token': loginObj.access_token
				};
				
                secretData['from'] = genFromUrl(wechatpayWebObj.from, wechatpayWebObj.pay_id);
				payStatusObj.show(true, function () {
                    payStatusObj.from = wechatpayWebObj.from;
					$.ajax({
	                    url: ConfigObj.localSite + '?version=1&m=cashier.deposit.depositInfo',
	                    data: secretData,
	                    type: "post",
	                    dataType: "json",
	                    success: function (msg) {
					        console.log(msg)
					        // android_obj.countFrequency('startPayCount');
                    		// android_obj.calculateFrequency('startPaySum',postData.amount)
	                    	var secData2 = {//充值次数 wechatpayApp_showObj
					          'channel_id': '9',
					          'type': 'pay_fre_zf',
					          'ip':returnCitySN["cip"]
					        }
					      $.ajax({
					        url:'http://a.xxyya.cn:8269/api?version=1&m=cashier.deposit.number',
					        data:secData2,
					        dataType:'json',
					        type:'post',
					        success: function(obj){
					          // console.log(obj)
					          
					        }
					      });
					      var secData = {//充值金额 cashier.deposit.number
					          'channel_id': '9',
					          'type': 'pay_mon_zf',
					          'pay_money':postData.amount,
					          'ip':returnCitySN["cip"]
					        }

					      $.ajax({
					        url:'http://a.xxyya.cn:8269/api?version=1&m=cashier.deposit.number',
					        data:secData,
					        dataType:'json',
					        type:'post',
					        success: function(obj){
					          
					        }
					      });
	                        if (msg.code !== "0000") {
	                            $.alertMsg(msg.code_str);
	                            return false;
	                        }
	                        msg.info = $.parseJSON(Global.crypt(msg.info));
//	                        console.log(msg.info.form)
	                        payStatusObj.setData({
	                            pay_id: postData.pay_id,
	                            target_type: msg.info.target_type,
	                            target_id: msg.info.target_id,
	                            channel: this.channel
	                        });
	                        if (ConfigObj.platForm == 'android' && typeof android_obj != 'undefined') {
	                        	var backUrl = "cptoback://?pageName=payStatus&"+postData.pay_id+"&"+postData.channel;
	                            // android_obj.aliPay(msg.info.form , backUrl);
	                            android_obj.openWebUrl(msg.info.return_url); 

	                        }else if(ConfigObj.platForm == 'ios' && typeof ios_obj != 'undefined'){
	                        	var backUrl = "cptoback://?pageName=payStatus&"+postData.pay_id+"&"+postData.channel;
	                            // ios_obj.aliPay(msg.info.form , backUrl);
	                            ios_obj.openWebUrl(msg.info.return_url);
	                            // ios_obj.controlViewControllerWithType(NSString *)type userId(NSString *)userID
	                            // ios_obj.controlViewControllerWithType:(NSString *)type userId:(NSString *)userID

	                        }
	                            console.log(msg.info.return_url)

	                    }
	                });
		        });      
			}
        });
    };
	
// 微信充值  
	wechatpayWebObj.subPayFun = function(obj){
		this.channel = obj;
		if (this.money < 1) {
            if (this.money == 0.01 && this.allowOneCent) {
			} else {
                // 小于 5 元时不直接提交
                this.hidekey();
                // alert(5)
                // $.alertMsg()
                return;
			}
		}

        var postData = {
            'channel': this.channel,
            'amount': this.money,
            'pay_id': this.pay_id
        };
        console.log(postData.amount)

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
                ConfigObj.pay_id = postData.pay_id;
                ConfigObj.pay_channel = postData.channel;

                payStatusObj.goBack = function () {
                    payStatusObj.destroy();
                    wechatpayWebObj.dirShow({'from': wechatpayWebObj.from});
                };

                function genFromUrl(from, pay_id) {

                    if (from == 'userCenter') {
                        // 来源页面是用户中心
                        var a = {
                            pageName: 'userCenter'
                        };

                        var b = {
                            pageName: 'wechatpayWeb',
                            back: '?_base64obj=' + serialize(a)
                        };

                        var c = {
                            pageName: 'payStatus',
                            pay_id: pay_id,
                            back: '?_base64obj=' + serialize(b),
                            timeOut: 2000,
                            timeOutBack: '?_base64obj=' + serialize(a)
                        };

                        return '?_base64obj=' + serialize(c);
                    }

                    if (from == 'account') {
//                      // 来源页面是用户中心
                        var a = {
                            pageName: 'userCenter'
                        };

                        var b = {
                            pageName: 'account',
                            back: '?_base64obj=' + serialize(a)
                        };

                        var c = {
                            pageName: 'wechatpayWeb',
                            back: '?_base64obj=' + serialize(b)
                        };

                        var d = {
                            pageName: 'payStatus',
                            pay_id: pay_id,
                            back: '?_base64obj=' + serialize(c),
                            timeOut: 2000,
                            timeOutBack: '?_base64obj=' + serialize(b)
                        };

                        return '?_base64obj=' + serialize(d);
                    }
                    if (from == 'buyConfirm') {
                        var a = {
                            pageName: 'buyConfirm'
                        };

                        var b = {
                            pageName: 'wechatpayWeb',
                            back: '?_base64obj=' + serialize(a)
                        };

                        var c = {
                            pageName: 'payStatus',
                            pay_id: pay_id,
                            back: '?_base64obj=' + serialize(b),
                            timeOut: 2000,
                            timeOutBack: '?_base64obj=' + serialize(a)
                        };

                        return '?_base64obj=' + serialize(c);
                    }
                }
				var secretData = {
					'para' : Global.encrypt(postData),
					'from': wechatpayWebObj.from,
					'access_token': loginObj.access_token
				};
                secretData['from'] = genFromUrl(wechatpayWebObj.from, wechatpayWebObj.pay_id);
				
//              //console.log(postData['from']); 
              // 进入支付扣款状态页面 cashier.deposit.index
                payStatusObj.show(true, function () {
                    payStatusObj.from = wechatpayWebObj.from;
					$.ajax({
                        url: ConfigObj.localSite + '?version=1&m=cashier.deposit.depositInfo',
                        data: secretData,
                        type: "post",
                        dataType: "json",
                        success: function (msg) {
                        	console.log(msg)
                        	var secData2 = {//充值次数 wechatpayApp_showObj
					          'channel_id': '9',
					          'type': 'pay_fre_zf',
					          'ip':returnCitySN["cip"]
					        }
					      $.ajax({
					        url:'http://a.xxyya.cn:8269/api?version=1&m=cashier.deposit.number',
					        data:secData2,
					        dataType:'json',
					        type:'post',
					        success: function(obj){
					          console.log(obj)
					          if (obj.code == '0000') {
					          }else{}
					        }
					      });
					      var secData = {//充值金额 cashier.deposit.number
					          'channel_id': '9',
					          'type': 'pay_mon_zf',
					          'pay_money':postData.amount,
					          'ip':returnCitySN["cip"]
					        }
					      $.ajax({
					        url:'http://a.xxyya.cn:8269/api?version=1&m=cashier.deposit.number',
					        data:secData,
					        dataType:'json',
					        type:'post',
					        success: function(obj){
					          // console.log(obj)
					          if (obj.code == '0000') {
					          }else{}
					        }
					      });
                            if (msg.code !== "0000") {
                                $.alertMsg(msg.code_str);
                                return false;
                            }
							msg.info = $.parseJSON(Global.crypt(msg.info));
//							console.log(msg) wechatpayApp_paybtnObj
                            payStatusObj.setData({
                                pay_id: postData.pay_id,
                                target_type: msg.info.target_type,
                                target_id: msg.info.target_id,
                                channel: this.channel
                            });
                            
                            if (msg.info.respond_type == 'data') {
                                if (ConfigObj.platForm == 'android' && typeof android_obj != 'undefined') {
                                    android_obj.payWeixin(msg.info.respond_data.app_id, msg.info.respond_data.token_id);
                                } else if (ConfigObj.platForm == 'ios' && typeof ios_obj != 'undefined') {
                                    ios_obj.payWeixin(msg.info.respond_data.amount, msg.info.respond_data.token_id);
                                }
                            } else if (msg.info.respond_type == 'url') {
                                // if (msg.info && msg.info.return_url) window.location.href = msg.info.return_url;
                                if (ConfigObj.platForm == 'android' && typeof android_obj != 'undefined') {
                                    android_obj.openWebUrl(msg.info.return_url);
                                }
                                else if (ConfigObj.platForm == 'ios' && typeof ios_obj != 'undefined') {
                                    ios_obj.openWebUrl(msg.info.return_url);
                                }
                            }
                            console.log(msg.info.return_url)
                        }
                    });
                });
			}
        });
    };
//支付
wechatpayWebObj.subPayFuntwo = function(obj){
		this.channel = obj;
		if (this.money < 1) {
            if (this.money == 0.01 && this.allowOneCent) {
			} else {
                // 小于 5 元时不直接提交
                this.hidekey();
                // alert(5)
                // $.alertMsg()
                return;
			}
		}

        var postData = {
            'channel': this.channel,
            'amount': this.money,
            'pay_id': this.pay_id
        };
        // console.log(postData.amount)

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
                ConfigObj.pay_id = postData.pay_id;
                ConfigObj.pay_channel = postData.channel;

                payStatusObj.goBack = function () {
                    payStatusObj.destroy();
                    wechatpayWebObj.dirShow({'from': wechatpayWebObj.from});
                };

                function genFromUrl(from, pay_id) {

                    if (from == 'userCenter') {
                        // 来源页面是用户中心
                        var a = {
                            pageName: 'userCenter'
                        };

                        var b = {
                            pageName: 'wechatpayWeb',
                            back: '?_base64obj=' + serialize(a)
                        };

                        var c = {
                            pageName: 'payStatus',
                            pay_id: pay_id,
                            back: '?_base64obj=' + serialize(b),
                            timeOut: 2000,
                            timeOutBack: '?_base64obj=' + serialize(a)
                        };

                        return '?_base64obj=' + serialize(c);
                    }

                    if (from == 'account') {
//                      // 来源页面是用户中心
                        var a = {
                            pageName: 'userCenter'
                        };

                        var b = {
                            pageName: 'account',
                            back: '?_base64obj=' + serialize(a)
                        };

                        var c = {
                            pageName: 'wechatpayWeb',
                            back: '?_base64obj=' + serialize(b)
                        };

                        var d = {
                            pageName: 'payStatus',
                            pay_id: pay_id,
                            back: '?_base64obj=' + serialize(c),
                            timeOut: 2000,
                            timeOutBack: '?_base64obj=' + serialize(b)
                        };

                        return '?_base64obj=' + serialize(d);
                    }
                    if (from == 'buyConfirm') {
                        var a = {
                            pageName: 'buyConfirm'
                        };

                        var b = {
                            pageName: 'wechatpayWeb',
                            back: '?_base64obj=' + serialize(a)
                        };

                        var c = {
                            pageName: 'payStatus',
                            pay_id: pay_id,
                            back: '?_base64obj=' + serialize(b),
                            timeOut: 2000,
                            timeOutBack: '?_base64obj=' + serialize(a)
                        };

                        return '?_base64obj=' + serialize(c);
                    }
                }
				var secretData = {
					'para' : Global.encrypt(postData),
					'from': wechatpayWebObj.from,
					'access_token': loginObj.access_token
				};
                secretData['from'] = genFromUrl(wechatpayWebObj.from, wechatpayWebObj.pay_id);
				
//              //console.log(postData['from']);  cashier.deposit.depositInfo
              // 进入支付扣款状态页面 cashier.deposit.index 
                payStatusObj.show(true, function () {
                    payStatusObj.from = wechatpayWebObj.from;
					$.ajax({
                        url: ConfigObj.localSite + '?version=1&m=cashier.deposit.depositInfo',
                        data: secretData,
                        type: "post",
                        dataType: "json",
                        success: function (msg) {
                        	console.log(msg)
                        	var secData2 = {//充值次数 wechatpayApp_showObj
					          'channel_id': '9',
					          'type': 'pay_fre_zf',
					          'ip':returnCitySN["cip"]
					        }
					      $.ajax({
					        url:'http://a.xxyya.cn:8269/api?version=1&m=cashier.deposit.number',
					        data:secData2,
					        dataType:'json',
					        type:'post',
					        success: function(obj){
					          console.log(obj)
					          if (obj.code == '0000') {
					          }else{}
					        }
					      });
					      var secData = {//充值金额 cashier.deposit.number
					          'channel_id': '9',
					          'type': 'pay_mon_zf',
					          'pay_money':postData.amount,
					          'ip':returnCitySN["cip"]
					        }
					      $.ajax({
					        url:'http://a.xxyya.cn:8269/api?version=1&m=cashier.deposit.number',
					        data:secData,
					        dataType:'json',
					        type:'post',
					        success: function(obj){
					          // console.log(obj)
					          if (obj.code == '0000') {
					          }else{}
					        }
					      });
                            if (msg.code !== "0000") {
                                $.alertMsg(msg.code_str);
                                return false;
                            }
							msg.info = $.parseJSON(Global.crypt(msg.info));
//							console.log(msg) wechatpayApp_paybtnObj
                            payStatusObj.setData({
                                pay_id: postData.pay_id,
                                target_type: msg.info.target_type,
                                target_id: msg.info.target_id,
                                channel: this.channel
                            });
                            
                            if (msg.info.respond_type == 'data') {
                                if (ConfigObj.platForm == 'android' && typeof android_obj != 'undefined') {
                                    android_obj.payWeixin(msg.info.respond_data.app_id, msg.info.respond_data.token_id);
                                } else if (ConfigObj.platForm == 'ios' && typeof ios_obj != 'undefined') {
                                    ios_obj.payWeixin(msg.info.respond_data.amount, msg.info.respond_data.token_id);
                                }
                            } else if (msg.info.respond_type == 'url') {
                                // if (msg.info && msg.info.return_url) window.location.href = msg.info.return_url;
                                if (ConfigObj.platForm == 'android' && typeof android_obj != 'undefined') {
                                    android_obj.openWebUrl(msg.info.return_url);
                                }
                                else if (ConfigObj.platForm == 'ios' && typeof ios_obj != 'undefined') {
                                    ios_obj.openWebUrl(msg.info.return_url);
                                }
                            }
                            console.log(msg.info.return_url)
                        }
                    });
                });
			}
        });
    };
// 快捷支付
		wechatpayWebObj.subApayFun = function(obj){
		this.channel = obj;
		if (this.money < 1) {
            if (this.money == 0.01 && this.allowOneCent) {
			} else {
                // 小于 5 元时不直接提交
                this.hidekey();
                // $.alertMsg('快捷支付最少充值十元')
                return;
			}
		}

        var postData = {
            'channel': this.channel,
            'amount': this.money,
            'pay_id': this.pay_id
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
                ConfigObj.pay_id = postData.pay_id;
                ConfigObj.pay_channel = postData.channel;

                payStatusObj.goBack = function () {
                    payStatusObj.destroy();
                    wechatpayWebObj.dirShow({'from': wechatpayWebObj.from});
                };

                function genFromUrl(from, pay_id) {

                    if (from == 'userCenter') {
                        // 来源页面是用户中心
                        var a = {
                            pageName: 'userCenter'
                        };

                        var b = {
                            pageName: 'wechatpayWeb',
                            back: '?_base64obj=' + serialize(a)
                        };

                        var c = {
                            pageName: 'payStatus',
                            pay_id: pay_id,
                            back: '?_base64obj=' + serialize(b),
                            timeOut: 2000,
                            timeOutBack: '?_base64obj=' + serialize(a)
                        };

                        return '?_base64obj=' + serialize(c);
                    }

                    if (from == 'account') {
//                      // 来源页面是用户中心
                        var a = {
                            pageName: 'userCenter'
                        };

                        var b = {
                            pageName: 'account',
                            back: '?_base64obj=' + serialize(a)
                        };

                        var c = {
                            pageName: 'wechatpayWeb',
                            back: '?_base64obj=' + serialize(b)
                        };

                        var d = {
                            pageName: 'payStatus',
                            pay_id: pay_id,
                            back: '?_base64obj=' + serialize(c),
                            timeOut: 2000,
                            timeOutBack: '?_base64obj=' + serialize(b)
                        };

                        return '?_base64obj=' + serialize(d);
                    }
                    if (from == 'buyConfirm') {
                        var a = {
                            pageName: 'buyConfirm'
                        };

                        var b = {
                            pageName: 'wechatpayWeb',
                            back: '?_base64obj=' + serialize(a)
                        };

                        var c = {
                            pageName: 'payStatus',
                            pay_id: pay_id,
                            back: '?_base64obj=' + serialize(b),
                            timeOut: 2000,
                            timeOutBack: '?_base64obj=' + serialize(a)
                        };

                        return '?_base64obj=' + serialize(c);
                    }
                }
				var secretData = {
					'para' : Global.encrypt(postData),
					'from': wechatpayWebObj.from,
					'access_token': loginObj.access_token
				};
                secretData['from'] = genFromUrl(wechatpayWebObj.from, wechatpayWebObj.pay_id);
				
//              //console.log(postData['from']); 
              // 进入支付扣款状态页面 cashier.deposit.index
                payStatusObj.show(true, function () {
                    payStatusObj.from = wechatpayWebObj.from;
					$.ajax({
                        url: ConfigObj.localSite + '?version=1&m=cashier.deposit.depositInfo',
                        data: secretData,
                        type: "post",
                        dataType: "json",
                        success: function (msg) {
                        	console.log(msg)
                        	var secData2 = {//充值次数 wechatpayApp_showObj
					          'channel_id': '9',
					          'type': 'pay_fre_zf',
					          'ip':returnCitySN["cip"]
					        }
					      $.ajax({
					        url:'http://a.xxyya.cn:8269/api?version=1&m=cashier.deposit.number',
					        data:secData2,
					        dataType:'json',
					        type:'post',
					        success: function(obj){
					          console.log(obj)
					          if (obj.code == '0000') {
					          }else{}
					        }
					      });
					      var secData = {//充值金额 cashier.deposit.number
					          'channel_id': '9',
					          'type': 'pay_mon_zf',
					          'pay_money':postData.amount,
					          'ip':returnCitySN["cip"]
					        }
					      $.ajax({
					        url:'http://a.xxyya.cn:8269/api?version=1&m=cashier.deposit.number',
					        data:secData,
					        dataType:'json',
					        type:'post',
					        success: function(obj){
					          // console.log(obj)
					          if (obj.code == '0000') {
					          }else{}
					        }
					      });
                            if (msg.code !== "0000") {
                                $.alertMsg(msg.code_str);
                                return false;
                            }
							msg.info = $.parseJSON(Global.crypt(msg.info));
//							console.log(msg) wechatpayApp_paybtnObj
                            payStatusObj.setData({
                                pay_id: postData.pay_id,
                                target_type: msg.info.target_type,
                                target_id: msg.info.target_id,
                                channel: this.channel
                            });
                            window.location.href= msg.info.return_url;
                           /* 
                            if (msg.info.respond_type == 'data') {
                                if (ConfigObj.platForm == 'android' && typeof android_obj != 'undefined') {
                                    android_obj.payWeixin(msg.info.respond_data.app_id, msg.info.respond_data.token_id);
                                } else if (ConfigObj.platForm == 'ios' && typeof ios_obj != 'undefined') {
                                    ios_obj.payWeixin(msg.info.respond_data.amount, msg.info.respond_data.token_id);
                                }
                            } else if (msg.info.respond_type == 'url') {
                                // if (msg.info && msg.info.return_url) window.location.href = msg.info.return_url;
                                if (ConfigObj.platForm == 'android' && typeof android_obj != 'undefined') {
                                    android_obj.openWebUrl(msg.info.return_url);
                                }
                                else if (ConfigObj.platForm == 'ios' && typeof ios_obj != 'undefined') {
                                    ios_obj.openWebUrl(msg.info.return_url);
                                }
                            }*/

                            console.log(msg.info.return_url)
                        }
                    });
                });
			}
        });
    };
// 支付宝充值
	wechatpayWebObj.getData = function(){
		
		var postData = {
			'channel_number': ConfigObj.zdid,
			'from': wechatpayWebObj.from, // 来源页面，目前有两种：用户中心 userCenter，支付确认 buyConfirm，我的账户 account
			'terminal_id': ConfigObj.platForm === 'ios' ? 3 : 2
		}
		var secretData = {
			'access_token':loginObj.access_token,
			'para' : Global.encrypt(postData)
		};
//		console.log(postData)
	    $.ajax({
			url : ConfigObj.localSite +  '?version=1&m=cashier.deposit.index',
			data : secretData,
			type : 'post',
			dataType : 'json',
			success : function(obj){

				$('#wechatpayApp_loading').hide();
				console.log('微信充值页面返回', obj);

				var secreData = {
			        'channel_id': '9',
					'type': 'rech_num',
					'ip':returnCitySN["cip"]
			      };//充值进来的
			      $.ajax({
			        url:'http://a.xxyya.cn:8269/api?version=1&m=cashier.deposit.number',
			        data:secreData,
			        dataType:'json',
			        type:'post',
			        success: function(obj){
			          console.log(obj)
				          var sDat = {//发起支付次数
			                'channel_id': '9'
			              }
			              $.ajax({//次数接口
			                url:'http://a.xxyya.cn:8269/api?version=1&m=cashier.deposit.number_list',
			                data:sDat,
			                dataType:'json',
			                type:'post',
			                success: function(obj){
			                  // console.log(obj) 
			                  // var zf8 = obj.info[8].num
			                  // console.log() wechatpayApp_backObj
			                  // android_obj.countFrequency('viewPayCount');
			                  // countFrequency("zf4",startPayCount)
			                    // android_obj.countFrequency(String startPayCount) 
			                }
			              });
			        }
			      });
			      // console.log(45)
				if(obj.code == '0000'){
					obj.info = $.parseJSON(Global.crypt(obj.info));
					if(obj.info.channel == "wechatpayWap"){
//						$('#wechatpayBtn') cashier.deposit.depositInfo
					}
					wechatpayWebObj.channel = obj.info.channel;
					wechatpayWebObj.pay_id = obj.info.pay_id;
					wechatpayWebObj.formatHtml(obj.info);
					console.log(obj.info)

				}else{
					$.alertMsg(obj.code_str);	
				}
			}
		}); 	
	}
	
	wechatpayWebObj.formatHtml = function(obj){
		console.log(obj)
		var html = '';
		for(var i in obj.other_channel){
		   var itm = obj.other_channel[i];
		   if(itm.is_usable=='N'){

			   continue;
		   }
		   html += '<a href="javascript:void(0);" data-v="'+itm.channel+'" data-t="'+itm.channel+'" class="btn btn_big '+itm.channel+'Btn">'+itm.channel_cn+'</a>';
		}
		$('#wechatpayApp_paybtnObj').html(html);
		console.log(html)
	}

    wechatpayWebObj.setDefConfig = function(){
		this.channel = '';
		this.money = 100; //充值默认金额
		this.pay_id = '';
		this.station_info = '';
		this.checkTipsShow = false;
		this.allowOneCent = true; // 是否允许测试充值1分
		this.from = 'userCenter'; // 来源页面，默认是用户中心
	}

	wechatpayWebObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
		//this.getData();
	}

	wechatpayWebObj.init = function(){
		this.setDefConfig();
		wechatpayWebObj.onloadExecution();
	}

    wechatpayWebObj.dirShow = function (obj) {
        this.show(true, function () {
            obj = obj || {};
            for (var p in obj) {
                if (!obj.hasOwnProperty(p)) continue;

                this[p] = obj[p]; // 设置属性
                if (p === 'back') this.goBack = function () {
                    Global.open(obj['back']);
                }
            }
            wechatpayWebObj.getData();
        }.bind(this));
    };

    /**
	 * 直接支付
     * @param {Number} amount 金额，单位是元
     * @param targetType
     * @param targetId
	 * @param originalProduct
     */
    wechatpayWebObj.dirPay = function (amount, targetType, targetId, originalProduct) {

        payStatusObj.show(true, function () {

            // 获取支付信息
        	var data1 = {
                'terminal_id': ConfigObj.platForm === 'ios' ? 3 : 2
            };
			var secretData1 = {
			'access_token':loginObj.access_token,
			'para' : Global.encrypt(postData)
			};
            Global.post('?m=cashier.deposit.index', secretData1, function (res1) {
            	console.log(res1)
                if (res1.code != '0000') return;

                // 设置支付状态页面
                payStatusObj.setDirPay();
								res1.info = $.parseJSON(Global.crypt(res1.info));
								ConfigObj.pay_id = res1.info.pay_id;
				//console.log(ConfigObj.pay_id);
				
                var pData = {
                    pay_id: res1.info.pay_id, // 付款 pay_id
                    target_type: targetType, // 方案 或追号
                    target_id: targetId // projectId 或 planId
                };

                payStatusObj.setData(pData);

                // 将支付状态数据存在本地
                window.localStorage.setItem('directPayStatusData', JSON.stringify(pData));

                var from = '?_base64obj=' + serialize({
                        pageName: 'payStatus',
                        pay_id: res1.info.pay_id,
                        target_type: targetType,
                        target_id: targetId,
                        direct: true
                    });

////              //console.log({
////                  pageName: 'payStatus',
////                  pay_id: res1.info.pay_id,
////                  target_type: targetType,
////                  target_id: targetId,
////                  direct: true
//              });

                // 请求进行支付
                var data2 = {
                    'channel': 'wechatpayWap',
                    'amount': amount, // 支付金额 TODO
                    'pay_id': res1.info.pay_id,
                    'originalProduct': originalProduct
                };
				var secretData2 = {
				'access_token':loginObj.access_token,
				'from': from,
				'para' : Global.encrypt(postData)
				};
				
				
                Global.post('?version=1&m=cashier.deposit.depositInfo', secretData2, function (res2) {
                	console.log(res2)
                    if (res2.code != '0000') return;
                    res2.info = $.parseJSON(Global.crypt(res2.info));
                    if (!res2.info || !res2.info.respond_type || res2.info.respond_type != 'url')return;

                    if (ConfigObj.platForm == 'android' && typeof android_obj != 'undefined')
                        android_obj.openWebUrl(res2.info.return_url); // 安卓 web 支付
                    else if (ConfigObj.platForm == 'ios' && typeof ios_obj != 'undefined')
                        ios_obj.openWebUrl(res2.info.return_url); // ios web 支付
                }, function () {
                });
            }, function () {
            });
        });
    };  //wechatpayApp_keyObj
	
	
