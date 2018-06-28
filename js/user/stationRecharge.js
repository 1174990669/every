
	var stationRechargeObj = new PageController({
	   'name': 'stationRecharge',
	   'tpl' : 'template/user/stationRecharge.html'
    });

	

	stationRechargeObj.createDomObj = function(){
		this.wrapObj = $("#stationRecharge_wrapObj");
		this.moneyObj = $("#stationRecharge_moneyObj");
		this.keyObj = $("#stationRecharge_keyObj");
		this.backObj = $("#stationRecharge_backObj");
		this.showObj = $("#stationRecharge_showObj");
		this.zdbackObj = $("#stationRecharge_zdbackObj");
		this.info1Obj = $('#stationRecharge_info1');
		this.info2Obj = $('#stationRecharge_info2');
		this.userNameObj = $('#stationRecharge_userName');
	}

	stationRechargeObj.createEvent = function(){
		this.wrapObj.unbind('tap').tap(function(e){
			stationRechargeObj.updateMoneyEvent(e);
		});

		this.zdbackObj.unbind('tap').tap(function(){
			//window.location.href = '/cashier/deposit';
		});

		this.backObj.unbind('tap').tap(function(){
			stationRechargeObj.goBack();
		});
	}

	stationRechargeObj.updateMoneyEvent = function(e){
		var aObj = $.oto_checkEvent(e,"A");
		if(aObj){
			var thisObj = $(aObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "sub" : this.subPay();return true;
				case "clearAuthTips": $('#stationRecharge_authTipsObj').hide();return true;
		        case "toAuthTips": $('#stationRecharge_authTipsObj').hide();this.checkReal();return true;
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
				//case "showzd" : this.goStationInfo();return true;
			}
		}

		var divObj = $.oto_checkEvent(e,"DIV");
		if(divObj){
			if(divObj.id=="keyObj")return true;
			stationRechargeObj.hidekey();
		}
	}

	stationRechargeObj.goStationInfo = function(obj){
		var self = this;
		var sid = this.stationId;
		
		stationInfoObj.goBack = function(){
			stationInfoObj.destroy();
			self.show();	
		}
		stationInfoObj.show('reload',function(){
			stationInfoObj.getData(sid);
		})
	}

	stationRechargeObj.updPay = function(obj){
		var v = obj.attr("data-v");
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

	stationRechargeObj.delKeyMoney = function(){
		this.money = Number(this.money.toString().slice(0,-1));
		this.updateMoney();
	}

	stationRechargeObj.keytUpdateMoney = function(obj){
		var thisV = obj.attr("data-v");
		if(this.checkTipsShow){
      		this.checkTipsShow = false;
			this.money = thisV.toString();
    	}else{
			this.money += thisV.toString();
		}
		this.money = Number(this.money);
		this.updateMoney();
	}

	stationRechargeObj.showKey = function(){
		this.keyObj.show();
		this.showObj.addClass('focus');
		this.checkTipsShow = true;
	}

	stationRechargeObj.hidekey = function(){
		/*if(this.money<5){
			$.alertMsg("最小金额5元");
			this.money = 5;
			this.updateMoney();
		}*/
		this.keyObj.hide();
		this.showObj.removeClass('focus');
		this.checkTipsShow = false;
	}

	stationRechargeObj.setMoney = function(obj){
		var thisV = Number(obj.attr("data-v"));
		obj.siblings().removeClass("selected");
		obj.addClass('selected')
		this.money = thisV;
		this.updateMoney();
	}

	stationRechargeObj.updateMoney = function(){
		this.updateKjClass();
		this.moneyObj.html(this.money+"元");
	}

	stationRechargeObj.updateKjClass = function(){
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

	stationRechargeObj.showErrMsg = function(msg){
		$.alertMsg(msg);
	}
	
	stationRechargeObj.checkReal = function(){
		  var self = this;
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
	
	stationRechargeObj.subPay = function(){
		var $sub = $('#stationRecharge_sub');
		if ($sub.hasClass('gray')) {
			return;
		}
        $sub.addClass('gray');
	  var self = this;
	   self.subPayFun();
	  /*if(loginObj.userInfo && loginObj.userInfo.real_status == 'Y'){
		 self.subPayFun();
		 }else{
		 $('#stationRecharge_authTipsObj').show();
		 }	*/
	}

	stationRechargeObj.subPayFun = function(){
		this.hidekey();
		var postData = {
			'channel': this.channel,
			'amount' : this.money,
			'pay_id' : this.pay_id,
			'access_token': loginObj.access_token	
		}
		$.ajax({
			url : ConfigObj.localSite +  '?version=1&m=cashier.deposit.depositInfo', 
			data : postData,
			type : "post",
			dataType : "json",
			success : function(msg){

				//console.log('客服代充提交接口返回',msg);
				if(msg.code !== "0000"){
                    $('#stationRecharge_sub').removeClass('gray');
					stationRechargeObj.showErrMsg(msg.code_str);
					return false;
				}
				rechargeStatusObj.goBack = function(){
					rechargeStatusObj.destroy();
					stationRechargeObj.show(true, function () {
                        stationRechargeObj.getData();
                    });
				};
                rechargeStatusObj.show(true, function () {
                    rechargeStatusObj.getData(msg.info.order_id)
                });
			}
		});
	}
	
	stationRechargeObj.formatHtml = function(obj){
		this.info1Obj.html(obj.station_info.real_name + ' ' + obj.station_info.mobile);
		this.info2Obj.html(obj.station_info.address);
		this.userNameObj.html(obj.scene_owner_name);
		
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
		$('#stationRecharge_other').html(html);
	}
	
	stationRechargeObj.getData = function(type){
		var postData = {
			'channel': this.channel,
			'access_token': loginObj.access_token	
		}
		$.ajax({
			url : ConfigObj.localSite +  '?version=1&m=cashier.deposit.index',
			data : postData,
			type : 'post',
			dataType : 'json',
			success : function(obj){
				//console.log('客服代充页面返回', obj);
				if(obj.code == '0000'){
					stationRechargeObj.stationId = obj.info.station_info.id;
					stationRechargeObj.pay_id = obj.info.pay_id;
					stationRechargeObj.channel = obj.info.channel;
					
					if(obj.info.is_usable=='Y'){

						$('#otherchannel_is_usable').show();
					}
					stationRechargeObj.formatHtml(obj.info);
				}else{
					$.alertMsg(obj.code_str);	
				}
			}
		}); 	
	}

    stationRechargeObj.setDefConfig = function(){
		this.channel = 'stationAgent';
		this.money = 10;
		this.pay_id = '';
		this.stationId = '';   //站点id
		this.checkTipsShow = false;
	}

	stationRechargeObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
	}

	stationRechargeObj.init = function(){
		this.setDefConfig();
		stationRechargeObj.onloadExecution();
	}
	
	
  
