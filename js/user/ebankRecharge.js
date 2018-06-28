
	var ebankRechargeObj = new PageController({
	   'name': 'ebankRecharge',
	   'tpl' : 'template/user/ebankRecharge.html'
  });

	

	ebankRechargeObj.createDomObj = function(){
		this.wrapObj = $("#ebankRecharge_wrapObj");
		this.moneyObj = $("#ebankRecharge_moneyObj");
		this.keyObj = $("#ebankRecharge_keyObj");
		this.backObj = $("#ebankRecharge_backObj");
		this.showObj = $("#ebankRecharge_showObj");
		this.zdbackObj = $("#ebankRecharge_zdbackObj");
	}

	ebankRechargeObj.createEvent = function(){
		this.wrapObj.unbind('tap').tap(function(e){
			ebankRechargeObj.updateMoneyEvent(e);
		});

		this.backObj.unbind('tap').tap(function(){
			ebankRechargeObj.goBack();
		});
	}

	ebankRechargeObj.updateMoneyEvent = function(e){
		var aObj = $.oto_checkEvent(e,"A");
		if(aObj){
			var thisObj = $(aObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "sub" : this.subPay();return true;;
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
				case "showzd" : this.hrefInfo(thisObj);return true;
				case "mybank" : this.goEbankList(thisObj);return true;
			}
		}

		var divObj = $.oto_checkEvent(e,"DIV");
		if(divObj){
			if(divObj.id=="keyObj")return true;
			ebankRechargeObj.hidekey();
		}
	}
	
	//跳转到我的银行列表，选择银行
	ebankRechargeObj.goEbankList = function(obj){
		var self = this;
		ebankListObj.goBack = function(){
			ebankListObj.destroy();
			self.show();
		}
		ebankListObj.show('reload',function(){
			ebankListObj.getData();
		});
	}
	

	ebankRechargeObj.hrefInfo = function(obj){
		var thisV = obj.attr("data-v");
		//window.location.href = "/account/getStationInfo?id="+thisV;
	}

	ebankRechargeObj.updPay = function(obj){
		var v = obj.attr("data-v");
		//window.location.href = "?channel="+v;
	}

	ebankRechargeObj.delKeyMoney = function(){
		this.money = Number(this.money.toString().slice(0,-1));
		this.updateMoney();
	}

	ebankRechargeObj.keytUpdateMoney = function(obj){
		var thisV = obj.attr("data-v");
		this.money += thisV.toString();
		this.money = Number(this.money);
		this.updateMoney();
	}

	ebankRechargeObj.showKey = function(){
		this.keyObj.show();
		this.showObj.addClass('focus')
	}

	ebankRechargeObj.hidekey = function(){
		if(this.money<5){
			$.alertMsg("最小金额5元");
			this.money = 5;
			this.updateMoney();
		}
		this.keyObj.hide();
		this.showObj.removeClass('focus')
	}

	ebankRechargeObj.setMoney = function(obj){
		var thisV = Number(obj.attr("data-v"));
		obj.siblings().removeClass("selected");
		obj.addClass('selected')
		this.money = thisV;
		this.updateMoney();
	}

	ebankRechargeObj.updateMoney = function(){
		this.updateKjClass();
		this.moneyObj.html(this.money+"元");
	}

	ebankRechargeObj.updateKjClass = function(){
		var spanObj = $("#ebankRecharge span[data-t='setMoney']");
		for(var i=0,ilen=spanObj.length;i<ilen;i++){
			var thisV = Number(spanObj.eq(i).attr("data-v"));
			if(thisV != this.money){
				spanObj.eq(i).removeClass("selected");
			}else{
				spanObj.eq(i).addClass("selected");
			}
		}
	}

	ebankRechargeObj.showErrMsg = function(msg){
		$.alertMsg(msg);
	}

	ebankRechargeObj.subPay = function(){
		//todo zhangw  暂无此功能
		this.hidekey();
		/*$.ajax({
			url : "/cashier/deposit",
			data : "channel="+this.channel+"&amount="+this.money+"&pay_id="+this.pay_id,
			type : "post",
			dataType : "json",
			success : function(msg){
				if(msg.code !== "0000"){
					ebankRechargeObj.showErrMsg(msg.code_str);
					return false;
				}
				window.location.href = msg.return_url;
			}
		});*/
		cashierObj.goBack=function(){
			Global.GC();
			homeObj.show();	
		}
		cashierObj.show('reload');  
	}

	ebankRechargeObj.setDefConfig = function(){
	    ebankRechargeObj.money = 10;
	}

	ebankRechargeObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
	}

	ebankRechargeObj.init = function(){
		this.setDefConfig();
		ebankRechargeObj.onloadExecution();
	}
	
	
