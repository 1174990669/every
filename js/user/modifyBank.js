
	var modifyBankObj = new PageController({
	   'name': 'modifyBank',
	   'tpl' : 'template/user/modifyBank.html'
    });

	modifyBankObj.createDomObj = function(){
		this.bankLIistObj = $("#modifyBank_bankLIistObj");
		this.bankAddressObj = $("#modifyBank_bankAddressObj");
		this.bankCardNumObj = $("#modifyBank_bankCardNumObj");
		this.bankCardPwdObj = $("#modifyBank_bankCardPwdObj");
		this.submitObj = $("#modifyBank_submitObj");
		this.backObj = $("#modifyBank_backObj");
		this.cardWrap = $('#modifyBank_cardWrap');
		this.showBankListObj = $("#modifyBank_showBankListObj");
		
		this.cityPickerCtrl = $('#cityPickerCtrl');
	}
	modifyBankObj.createEvent = function(){
		var self = this;
		this.bankAddressObj.add(this.bankCardNumObj).add(this.bankCardPwdObj).unbind('focus').focus(function(){
			$(this).parent().addClass('focus');
		});
		this.bankAddressObj.add(this.bankCardNumObj).add(this.bankCardPwdObj).unbind('blur').blur(function(){
			$(this).parent().removeClass('focus');
		});

		this.submitObj.unbind('tap').tap(function(){
			modifyBankObj.submitData();
		});

		this.backObj.unbind('tap').tap(function(){
			modifyBankObj.goBack();
		});
		
		this.showBankListObj.unbind('tap').tap(function() {
            modifyBankObj.bankLIistObj.mobiscroll('show');
        });
        this.bankCardNumObj.unbind('keyup').keyup(function() {
            var thisV = this.value.replace(/\s/g, "");
            if (isNaN(thisV)) {
                thisV = thisV.replace(/[^0-9]*/g, "");
            }
            if (thisV.length > 19) {
                $.alertMsg("银行卡号最多19位");
                thisV = thisV.substr(0, 19);
            }
            var newV = new Array();
            var temV = [];
            for (var i = 0, ilen = thisV.length; i < ilen; i++) {
                temV.push(thisV[i]);
                if (temV.length == 4) {
                    newV.push(temV.join(""));
                    temV = [];
                }
            }
            if (temV.length) {
                newV.push(temV.join(""));
            }
            this.value = newV.join(" ");
        });
        this.cityPickerCtrl.unbind('tap').tap(function(){ //展示选择地址的弹窗及渲染省份列表
        	cityPicker.showPicker($(this));
        })
	}
	
	modifyBankObj.submitData = function(){
		var bankName = this.bankLIistObj.val();
        var bankAddressVal = this.bankAddressObj.val();
        var bankProvinceVal = this.cityPickerCtrl.data("province");
		var bankCityVal = this.cityPickerCtrl.data("city")
        var bankCardNumVal = this.bankCardNumObj.val().replace(/\s/g,"");
        if (bankCardNumVal.length < 16 || bankCardNumVal.length > 19) {
            $.alertMsg("银行卡格式为16位到19位");
            return false;
        }
        var bankCardPwdVal = this.bankCardPwdObj.val();
        if(bankAddressVal===""){
			$.alertMsg("开户行名称不能为空");
			return false;
		}else if(!bankProvinceVal||!bankCityVal){
			$.alertMsg("请选择省份城市");
			return false;
		}else if(bankCardNumVal===""){
			$.alertMsg("银行卡号不能为空");
			return false;
		}else if(bankCardPwdVal===""){
			$.alertMsg("登录密码不能为空");
			return false;
		}
		
		var postData = {
			'id' : modifyBankObj.id,
			'bankCode' : bankName,
			'subBranch' : bankAddressVal,
			'province': bankProvinceVal,
			'city': bankCityVal,
			'cardNo': bankCardNumVal,
			'passWord' : hex_md5(bankCardPwdVal),
			'access_token' : loginObj.access_token
		}
		$.ajax({
			url : ConfigObj.localSite +  '?version=1&m=user.wallet.modifybankcard',
			data : postData,
			dataType : "json",
			type : "post",
			success : function(msg){
				if(msg.code == '0000'){
					$.alertMsg("修改成功",true);
					setTimeout(function(){
						modifyBankObj.goBack();
					},2000);
					
				}else{
					$.alertMsg(msg.code_str);
				}
			}
		});
	}

	modifyBankObj.bindScroll = function(){
		this.bankLIistObj.mobiscroll().select({
	        theme: 'mobiscroll',
            //headerText: "发卡银行",
            lang: 'zh',
            rows: 4,
            display: 'bottom'
	    });
	}
	
	modifyBankObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
		//this.bindScroll();
		this.getBankData();
		
	}

	modifyBankObj.init = function(){
		modifyBankObj.setDefConfig();
		modifyBankObj.onloadExecution();
		cityPicker.init(ConfigObj.localSite+"?version=1&m=user.account.getLocationInfo")
	}
     
	modifyBankObj.setData = function(obj){
		if(obj){
			this.id = obj.id;
			this.cardInfo = obj.cardInfo ? obj.cardInfo : {};
			this.fromPage = obj.fromPage;   //从哪里来
			if(this.cardInfo){
				this.formatHtml(this.cardInfo);
			}
		}
		
	}
	
	modifyBankObj.formatHtml = function(obj){
		this.bankAddressObj.val(obj.subbranch);
		this.bankCardNumObj.val(obj.card_no);
		var city = obj.city ? obj.city:"";
		var province = obj.province?obj.province:"";
		this.cityPickerCtrl.attr({
			"data-province":province,
			"data-city":city
		});
		this.cityPickerCtrl.find("input").val(province+" "+city)
		this.formatCardNo();
	}
	
	modifyBankObj.formatCardNo = function(){
		var val = this.bankCardNumObj.val();
		if(val){
			var c = '';
			for(var i=0;i<val.length;i++){
				if((i+1)%4 == 0){
					c += val[i] + ' ';	
				}else{
					c += val[i]
				}
			}
			this.bankCardNumObj.val(c);	
		}
	}
	
	modifyBankObj.getBankData = function(){
		var self = this;
		var postData = {
			'access_token': loginObj.access_token	
		}
		$.ajax({
			url : ConfigObj.localSite +  '?version=1&m=user.account.bindBankCard',
			data : postData,
			dataType : "json",
			type : "post",
			success : function(msg){
				console.log('可绑定银行卡列表数据 ', msg);
				
//				console.log('可绑定的银行卡列表数据 ', msg);
				if(msg.code=='0000'){
					msg.info = $.parseJSON(Global.crypt(msg.info));
					var html = '';
//					console.log(self.cardInfo.bank_type)
					for(var i in msg.info){
						var selected =  self.cardInfo.bank_type == i ? 'selected' : '';
						html += '<option value="'+ i +'"' +' '+ selected + '>'+ msg.info[i]  +'</option>';	
					}
					self.cardWrap.html(html);
					self.bindScroll();
				}else{
					$.alertMsg(msg.code_str);
				}
			}
		});		
	}
	
	
	modifyBankObj.setDefConfig = function(){
		this.id = '';   //要修改的银行卡卡号
		this.cardInfo = '';
	}
	
  
  