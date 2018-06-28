
	var wechatDrawObj = new PageController({
	   'name': 'wechatDraw',
	   'tpl' : 'template/user/wechatDraw.html'
    });


	wechatDrawObj.createDomObj = function(){
		this.wrapObj = $("#wechatDraw_wrapObj");
		this.moneyObj = $("#wechatDraw_moneyObj");
		this.keyObj = $("#wechatDraw_keyObj");
		this.backObj = $("#wechatDraw_backObj");
		this.showObj = $("#wechatDraw_showObj");
//		this.recordObj = $('#wechatDraw_listObj');

	}

	wechatDrawObj.createEvent = function(){
		this.wrapObj.unbind('tap').tap(function(e){
			wechatDrawObj.updateMoneyEvent(e);
		});


		this.backObj.unbind('tap').tap(function(){
			wechatDrawObj.goBack();
		});
//		this.recordObj.unbind('tap').tap(function(){
//			wechatDrawObj.goRecord();
//		})
	}
	
//	wechatDrawObj.goRecord = function() {
//	    withdrawRecordObj.goBack = function() {
//	        withdrawRecordObj.destroy();
//	        wechatDrawObj.show();
//	    }
//	    withdrawRecordObj.show('reload');
//	}

	wechatDrawObj.updateMoneyEvent = function(e){
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
//			console.log(thisT)
			switch(thisT){
				case "showkey" : this.showKey();return true;
				case "drawAll" : this.drawAll();return true;
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

		var divObj = $.oto_checkEvent(e,"DIV");
		if(divObj){
			if(divObj.id=="keyObj")return true;
            if($(divObj).attr("data-t")=="nohide")return true;
			wechatDrawObj.hidekey();
		}
	}
    
	wechatDrawObj.delKeyMoney = function(){
		this.money = Number(this.money.toString().slice(0,-1));
		this.updateMoney();
	}

    /**
	 * 更新提现金额
     * @param obj
     */
	wechatDrawObj.keytUpdateMoney = function(obj){
		var thisV = obj.attr("data-v");
		if(this.checkTipsShow){
      		this.checkTipsShow = false;
			this.money = thisV.toString();
    	}else{
			this.money += thisV.toString();
		}
		if (Number(this.money) > 10000) {
			Global.msg('每次最多提现 10000 元');
            this.money = 10000;
		}
		this.money = Number(this.money);
		this.updateMoney();
	}

	wechatDrawObj.showKey = function(){

		this.keyObj.show();
		this.showObj.addClass('focus');
		this.checkTipsShow = true;
	}

    wechatDrawObj.hidekey = function () {
        if (this.money < 1) {
            Global.msg('提现最小金额 1 元');
            this.money = 1;
            this.updateMoney();
        }
        this.keyObj.hide();
        this.showObj.removeClass('focus');
        this.checkTipsShow = false;
    }

	wechatDrawObj.setMoney = function(obj){
		var thisV = Number(obj.attr("data-v"));
		obj.siblings().removeClass("selected");
		obj.addClass('selected')
		this.money = thisV;
		this.updateMoney();
	}
	
	wechatDrawObj.drawAll = function(){
		
		this.money =  this.totalMoney;
		if (Number(this.money) > 10000) {
			Global.msg('每次最多提现 10000 元');
            this.money = 10000;
		}
		this.money = Math.floor(this.money);
		this.moneyObj.html(this.money+"元");
	}
	
	wechatDrawObj.updateMoney = function(){
		this.moneyObj.html(this.money+"元");
	}


	wechatDrawObj.showErrMsg = function(msg){
		$.alertMsg(msg);
	}
	
	wechatDrawObj.subPay = function(){
	  var self = this;
		  self.subPayFun();
	}
	

	wechatDrawObj.subPayFun = function(){

		if (this.money < 1) {
                // 小于 1 元时不直接提交
                this.hidekey();
                return;
		}
		var postData = {
            'channel': this.channel,
            'amount': this.money,
            'pay_id': this.pay_id
        };
        var secretData = {
			'para' : Global.encrypt(postData),
			'access_token': loginObj.access_token
		}; 
     console.log(postData);
        $.ajax({
        	url : ConfigObj.localSite +  '?version=1&m=cashier.withdraw.getDraw',
			data : secretData,
			type : 'post',
			dataType : 'json',
			success : function(obj){
				console.log("微信提现提交返回",obj)
				
				if(obj.code == "0000"){
					obj.info = $.parseJSON(Global.crypt(obj.info));
					wechatdrawSucObj.goBack = function () {
			            wechatdrawSucObj.destroy();
			            userCenterObj.show('reload');
			        };
    				wechatdrawSucObj.show(true);
    				return;
				} else{
					wechatDrawObj.showErrMsg(obj.code_str);
					setTimeout(function(){
						Global.GC();
	                	userCenterObj.show('reload');
					},2000)	 ;
	                return false;
				}
//				if (msg.code !== "0000") {
//	                wechatDrawObj.showErrMsg(msg.code_str);
//	                return false;
//	            }
//	            withdrawDetailObj.goBack = function() {
//	                Global.GC();
//	                userCenterObj.show('reload');
//	            }
//	            withdrawDetailObj.show('reload', function() {
//	                withdrawDetailObj.getData(msg.info.order_id);
//	            });
			}
        });
    };

	wechatDrawObj.getData = function(){
//	
		$("#wechatDraw_moneyObj").html(this.money+"元");
		var postData = {
			'channel_number': ConfigObj.zdid
		}
		var secretData = {
			'para':Global.encrypt(postData),
			'access_token': loginObj.access_token
		}
	    $.ajax({
			url : ConfigObj.localSite +  '?version=1&m=cashier.withdraw.WechatIndex',
			data : secretData,
			type : 'post',
			dataType : 'json',
			success : function(obj){
				$('#wechatDraw_loading').hide();
//				console.log('微信提现页面返回', obj);
				obj.info = $.parseJSON(Global.crypt(obj.info));
				if(obj.code == '0000'){
					$('#wechatDraw_loading').hide();
					wechatDrawObj.channel = obj.info.channel;
					wechatDrawObj.pay_id = obj.info.pay_id;
//					wechatDrawObj.formatHtml(obj.info);
					$("#wechatDraw_totalMoney").html(obj.info.available_cash);
					wechatDrawObj.totalMoney = obj.info.available_cash;
				}else{
					$.alertMsg(obj.code_str);	
				}
			}
		}); 	
	}

    wechatDrawObj.setDefConfig = function(){
		this.channel = '';
		this.money = 1;
		this.totalMoney = "";
		this.pay_id = '';
		this.checkTipsShow = false;
	}

	wechatDrawObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
		this.getData();
	}

	wechatDrawObj.init = function(){
		this.setDefConfig();
		this.onloadExecution();
	}

