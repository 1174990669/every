
	var ebankListObj = new PageController({
	   'name': 'ebankList',
	   'tpl' : 'template/user/ebankList.html'
    });

	ebankListObj.createDomObj = function(){
		this.wrapObj = $("#ebankList_wrapObj");
		this.ebankList = $('#ebankList_bankListObj');
		this.delConfirm = $('#ebankList_delTipsObj');
	} 

	ebankListObj.createEvent = function(){
		this.wrapObj.unbind('tap').tap(function(e){
			var pObj = $.oto_checkEvent(e,"P");
			if(pObj){
				var thisObj = $(pObj);
				var thisT = thisObj.attr("data-t");
				switch (thisT){
					case "backbtn" : ebankListObj.goBack();return true;
				}
			}
			
			var spanObj = $.oto_checkEvent(e,"SPAN");
			if(spanObj){
				var thisObj = $(spanObj);
				var thisT = thisObj.attr("data-t");
				switch (thisT){
					case "edit" : ebankListObj.editBank(thisObj);break;
					case "del"  : ebankListObj.showConfirm(thisObj);break;
				}
			}

			var dlObj = $.oto_checkEvent(e,"DL");
			if(dlObj){
				var thisObj = $(dlObj);
				var thisT = thisObj.attr("data-t");
				switch(thisT){
					case "addbank" : ebankListObj.addbank();return true;
					case "selbank" : ebankListObj.selBank(thisObj);return true;   //提款页面选择银行
				}
			}
			
			var spanObj = $.oto_checkEvent(e,"A");
			if(spanObj){
				var thisObj = $(spanObj);
				var thisT = thisObj.attr("data-t");
				switch (thisT){
					case 'clearDel' : ebankListObj.hideConfirm();break;
					case 'subDel' : ebankListObj.delBank(thisObj);break;
				}
			}
		});
	}
	
	ebankListObj.selBank = function(obj){
		ebankListObj.bankId = obj.attr('data-v');
		var postData = {
			'card_id' : ebankListObj.bankId,
			'access_token': loginObj.access_token	
		}
		console.log(postData)
		$.ajax({   
			url : ConfigObj.localSite +  '?version=1&m=cashier.withdraw.choicebankcard',
			data : postData,
			type : "post",
			dataType : "json",
			success : function(msg){
				console.log('提现选择银行卡接口返回',msg); 
				if(msg.code == '0000'){
					$.alertMsg('设置成功',true);
					ebankListObj.ebankList.find('.selctedicon').removeClass('selctedicon');
					obj.find('span.icon').addClass('selctedicon');
					setTimeout(function(){
						ebankListObj.goBack();
					},1000)
				}else{
					$.alertMsg(msg.code_str);
				}
			}
		});
	}
	
	ebankListObj.editBank = function(obj){
		var thisV = obj.attr("data-v");
		modifyBankObj.goBack = function(){
			modifyBankObj.destroy();
			ebankListObj.show('reload',function(){
				ebankListObj.getData();
			});	
		}
		var cardInfo = {};
		if(this.cardInfo){
			for(var i=0;i<this.cardInfo.length;i++){
				if(thisV == this.cardInfo[i].card_id){
					cardInfo = this.cardInfo[i];
				}
			}
		}
		var tempFun  = function(){
			modifyBankObj.setData({'id':thisV,'cardInfo':cardInfo});	
		}
		modifyBankObj.show('reload',tempFun);
	}
	
	ebankListObj.showConfirm = function(obj){
		this.delConfirm.show();
		this.delId = obj.attr("data-v");
		this.delObj = obj;
	}
	
	ebankListObj.hideConfirm = function(){
		this.delConfirm.hide();
		this.delId = '';
		this.delObj = '';
	}
	
	

	ebankListObj.delBank = function(){
		var self = this;
		var postData = {
			'id' : this.delId,
			'access_token' : loginObj.access_token	
		}
		
		$.ajax({
			url : ConfigObj.localSite +  '?version=1&m=user.wallet.delBankCard',
			data : postData,
			dataType : "json",
			type : "post",
			success : function(msg){
				if(Number(msg.code) === 0){
					self.delObj.parents('dl').remove();
					self.delObj = '';
					self.delId = '';
					self.delConfirm.hide();
				}else{
					$.alertMsg(msg.code_str);
				}
			}
		});
	}
    
	

	ebankListObj.addbank = function(){
		//添加银行卡
		bindBankObj.goBack = function(){
			bindBankObj.destroy();
			ebankListObj.show('reload',function(){
				ebankListObj.getData();	
			});	
		}
		bindBankObj.show();
		
	}
	
	ebankListObj.getData = function(){
	  var self = this;
	  var postData = {
		'access_token': loginObj.access_token
	  }
	  $.ajax({
			url : ConfigObj.localSite +  '?version=1&m=user.account.getMyBankList',
			data : postData,
			dataType : "json",
			type : "post",
			success : function(msg){
				
				if(msg.code == '0000'){
					msg.info = $.parseJSON(Global.crypt(msg.info));
					console.log('网银列表返回数据 ',msg);
					if(self.fromPage == 'withdraw'){
						self.formatHtmlW(msg.info);
					}else{
						self.formatHtml(msg.info);
					}
					self.cardInfo = msg.info;
				}else{
					$.alertMsg(msg.code_str);
				}
			}
		});
	}
	
	//提款选择银行卡
	ebankListObj.formatHtmlW = function(arr){
		var html = '';
		for(var i=0;i<arr.length;i++){
			var itm = arr[i];
			html += '<dl class="clearfix sel_bank" data-t="selbank" data-v="'+ itm.card_id +'">'+
						'<dt><span class="bank '+  (itm.bank_type ? itm.bank_type.toLowerCase() : '')  +'"></span></dt>'+
						'<dd>'+
							'<p class="font16">' + itm.bank_typecn+ '</p>'+
							'<p class="font12 gray">'+ itm.card_desc + ' ' +  itm.card_typecn +'</p>'+
							'<span class="'+ (this.bankId && this.bankId ==itm.card_id ? 'selctedicon ' : (!this.bankId && itm.is_default == 'Y' ? 'selctedicon ' : ''))  + 'icon"></span>'+
						'</dd>'+
					'</dl>';
		}
		this.ebankList.html(html);
	}
	
	ebankListObj.formatHtml = function(arr){
		var html = '';
		for(var i=0;i<arr.length;i++){
			var itm = arr[i];
			html += '<dl class="clearfix">'+
						'<dt><span class="bank '+  (itm.bank_type ? itm.bank_type.toLowerCase() : '')  +'"></span></dt>'+
						'<dd>'+
							'<p class="font16">' + itm.bank_typecn+ '</p>'+
							'<p class="font12 gray">'+ itm.card_desc + ' ' +  itm.card_typecn +'</p>'+
							'<p class="spanwrap">'+
								'<span data-t="del" data-v="'+ itm.card_id +'" class="spanbox"><em class="delicon icon"></em></span>'+
							'</p>'+
						'</dd>'+
					'</dl>';
		}
		this.ebankList.html(html);
	}

	ebankListObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
		//this.getData();
	}
	

	ebankListObj.init = function(){
		ebankListObj.onloadExecution();
	}
	
	ebankListObj.setDefConfig = function(){
		this.cardInfo = '';
		this.fromPage = '';	
		this.bankId = '';
	}
  
   

