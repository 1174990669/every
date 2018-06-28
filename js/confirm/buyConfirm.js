
  var buyConfirmObj = new PageController({
	   'name': 'buyConfirm',
	   'tpl' : 'template/confirm/buyConfirm.html'
  });
//cashier.pay.pay buyConfirmObj.setData 
  buyConfirmObj.setDefConfig = function(){
    this.money = 0;//购买需要金额
    this.hbVal = 0; //红包
    this.cjVal = 0;//彩金
    this.yeVal = 0;//余额
    this.useYeVal = 0;//使用余额
    this.hbId = new Array();
	this.cjId = new Array();
    this.payVal = 0; 
	this.pay_id = '';
    this.payType = "";
    this.nopwdswitch_status = 'N';
	this.product_id = '';
	this.product_type = 'project';  //默认为方案
	this.is_fit_nopwdrules = '';
	this.show_pwd = 'Y';
	this.useOtherChannel = '';  //余额是否足够，是否需要其他支付渠道 
	this.lotteryCn = '';
	this.lotteryNo = '';
	this.product_info = '';
	this.subMoney = '';
	this.assure_amount = "";
  }
  
  //数据初始化
  buyConfirmObj.setData = function(obj){
    console.log(obj)
	  var self = this;
	  self.data = obj;
//	  console.log('buyConfirm页面 setData ',obj); backbtn sub
	  self.product_id = obj.product_id;
	  self.lotteryType = obj.lotteryType;
	  self.lotteryNo = obj.lotteryNo ? obj.lotteryNo : '';
	  // self.lotteryCn = Global.lotteryTypeCn[self.lotteryType.toLowerCase()] ? Global.lotteryTypeCn[self.lotteryType.toLowerCase()] : ''; 
	  self.product_type = (obj.product_type == 'plan') ? 'plan' : 'project';
	  self.subMoney = obj.pay_amount;
	  self.assure_amount = obj.assure_amount;
	  if(self.product_id){  
	  	self.setProjectData(); 
	  }
	  
  }
  
  buyConfirmObj.setProjectData = function(){
	 var self = this;
	 var data = {
		'product_id': self.product_id,
		'product_type': self.product_type,
		'money': self.subMoney,
		'assure_amount': self.assure_amount,
		'channel_number': ConfigObj.zdid
	 }
	 var secretData = {
	 	'para': Global.encrypt(data),
	 	'access_token': loginObj.access_token
	 }
   // console.log(this.MoneyObj.html(htmlA)) 
   // console.log(data)
//	 console.log("支付初始化提交数据",data)
	 $.ajax({
		  url : ConfigObj.localSite +  '?version=1&m=cashier.pay.init',
		  data : secretData,
      timeout: 5000,
		  dataType : "json",
		  type : "post",
		  success : function(obj){
        // console.log(obj)
        // alert(1)
        // obj.info = $.parseJSON(Global.crypt(obj.info)); buyConfirm_MoneyObj
		  	// var fo = $.parseJSON(Global.crypt(obj.info)); cashier.deposit.number
        if(obj.code == '0000'){
          obj.info = $.parseJSON(Global.crypt(obj.info));
          // console.log(obj.info)
          mony = obj.info.total_pay_amount
          // 去掉遮罩层
          self.initShadow.hide();
          self.initObj.show();

        if(obj.info.lotteryTypeCn){
          self.lotteryCn = obj.info.lotteryTypeCn;
          // console.log(obj.info.lotteryTypeCn)
        }
        if(obj.info.product_info){
          // console.log(obj.info.product_info)
          self.product_info = obj.info.product_info;
        }
        self.initPayData(obj.info);
        self.formatHtml(obj.info);
        self.calPayMoney();
          self.checkDom();
      }else{
          $.alertMsg(obj.code_str);
      }

        var secDat = {//发起支付次数
          'channel_id': '9',
          'type': 'pay_fre_zf',
          // 'type':ConfigObj.zdid,
          'ip':returnCitySN["cip"]
        }
      $.ajax({
        url:ConfigObj.localSite +'?version=1&m=cashier.deposit.number',
        data:secDat,
        dataType:'json',
        type:'post',
        success: function(obj){
          // alert(2)
              var sDat = {//发起支付次数
                'channel_id': '9'
              }
              $.ajax({//次数接口
                url:ConfigObj.localSite +'?version=1&m=cashier.deposit.number_list',
                data:sDat,
                dataType:'json',
                type:'post',
                success: function(obj){
                  // console.log(JSON.stringify(aadd));
                  android_obj.countFrequency('startLotPayCount');
                },
                error:function(re){
                  return false;
                }
              });
        }
      });
      var secData = { //发起支付金额
          'channel_id': '9',
          'type': 'pay_mon_zf',
          'pay_money':obj.info.total_pay_amount,
          'ip':returnCitySN["cip"]
        }
          // console.log(obj.info.total_pay_amount)
      $.ajax({
        url:ConfigObj.localSite +'?version=1&m=cashier.deposit.number',
        data:secData,
        dataType:'json',
        type:'post',
        success: function(obj){
          // alert(5)
              var sDat = {//发起支付金额
                'channel_id': '9'
              }
              $.ajax({//次数接口
                url:ConfigObj.localSite +'?version=1&m=cashier.deposit.number_list',
                data:sDat,
                dataType:'json',
                type:'post',
                success: function(obj){
                  android_obj.calculateFrequency('startLotPaySum',mony)
                }
              });
        },
        error:function(re){
            return false;
          }
      });
			/*if(obj.code == '0000'){
					obj.info = $.parseJSON(Global.crypt(obj.info));
          console.log(obj.info)
          // mony = obj.info.total_pay_amount
			    // 去掉遮罩层
			    self.initShadow.hide();
			    self.initObj.show();

				if(obj.info.lotteryTypeCn){
					self.lotteryCn = obj.info.lotteryTypeCn;
          // console.log(obj.info.lotteryTypeCn)
				}
				if(obj.info.product_info){
          // console.log(obj.info.product_info)
					self.product_info = obj.info.product_info;
				}
				self.initPayData(obj.info);
				self.formatHtml(obj.info);
				self.calPayMoney();
    			self.checkDom();
			}else{
			    $.alertMsg(obj.code_str);
			}*/
		  },
      error:function(re){
        return false;
      },
      complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
          return false;
// 　　　　　  console.log("请求超时");
　　　　}else{}
　　}
    });  
  }
  
  buyConfirmObj.initPayData = function(obj){
	 this.money = obj.total_pay_amount;  //订单金额
	 this.assure_amount = obj.account_channel.pay_assure_amount;  //保底金额
	 this.cjVal = obj.account_channel.pay_handsel_amount;  //彩金
	 this.hbVal = obj.account_channel.pay_bonus_amount;   //红包
	 this.hbId = eval('(' +obj.bonus_id_json + ')');       //红包id
	 this.yeVal = obj.account_channel.available_cash_remain;  //现金余额
	 this.useYeVal = obj.account_channel.pay_cash_amount;  //现金支付数额
	 this.payVal = obj.account_channel.other_pay_amount;   //其他方式支付数额
	 this.nopwdswitch_status = obj.nopwdswitch_status;
	 this.payType = obj.default_other_channel;
	 this.pay_id = obj.pay_id;
	 this.is_fit_nopwdrules = obj.is_fit_nopwdrules;
	 this.product_id = obj.product_id; 
	 this.show_pwd = obj.show_pwd;
	 this.otherChannel = obj.other_channel;
	 this.hmhb = obj.account_channel.pay_bonus_amount;
  }
  
  buyConfirmObj.formatHtml = function(obj){
	  var self = this;
	  var html = '';
	  var htmlA = '';
	  if(obj.account_channel.pay_assure_amount > 0){
	  	htmlA += '<span class="buyConfirm_tzmoney font16 fl" style="width:50%;">投注金额 : <em class="fontred">'+self.money+'元</em><p class="buyConfirm_bdmoney">其中保底金额：<em class="fontred">'+obj.account_channel.pay_assure_amount+'元</em></p></span>'+
	  					'<span class="fr gray font12">'+obj.product_info.lottery_no+'期  '+obj.product_info.lottery_type_cn+'</span>';
	  	this.MoneyObj.html(htmlA);
	  	$('#hemai_options').show();
	  }else{
	  	if(this.product_type == "plan"){
	  		htmlA += '<div style="line-height:16px;padding-top:10px;"><span class="gray font12">'+(obj.product_info ? obj.product_info.begin_lottery_no+"-"+obj.product_info.end_lottery_no+'期  '+obj.product_info.lottery_type_cn : "")+'</span></div>'+
	  					'<div style="line-height:30px"><span class="buyConfirm_tzmoney font16 fl">投注金额 :'+self.money+'元<em class="fontred"></em></span></div>';
	  					
	  	}else{
	  		htmlA += '<span class="buyConfirm_tzmoney font16 fl">投注金额 :'+self.money+'元<em class="fontred"></em></span>'+
	  					'<span class="fr gray font12">'+(obj.product_info ? obj.product_info.lottery_no+'期  '+obj.product_info.lottery_type_cn : "")+'</span>';
	  	}
	  	this.MoneyObj.html(htmlA);
	  }
	  
	  if(obj.account_channel.usable_bonus_info.count > 0){
		  for(var i=0;i<obj.account_channel.usable_bonus_info.valid_list.length;i++){
		  	  var itm =  obj.account_channel.usable_bonus_info.valid_list[i];
			  var selected = $.inArray(itm.bag_account_id, obj.bonus_id_list) != -1 ? 'sel_bank' : '';
			  html += '<dl class="clearfix '+ selected +'"  data-t="selecthb" data-id="'+itm.bag_account_id+'" data-v="'+itm.use_money+'">'+
							'<dt>'+
								'<p class="handsel_bg font12"><span class="font14">'+itm.bonus_money+'</span>元</p>'+
							'</dt>'+
							'<dd>'+
								'<p class="clearfix">'+
									'<span class="fl">'+ itm.bag_activity_name+'</span>'+
									'<span class="fr gray font12">还剩<em class="fontred">'+itm.use_money+'元</em></span>'+
								'</p>'+
								'<p class="clearfix">'+
									'<span class="fl font12 gray">有效期：'+ itm.expire_date +'</span>'+
									'<span class="selctedicon icon"></span>'+
								'</p>'+
							'</dd>'+
						'</dl>';
		  }
		  this.hbWrap.html(html);
	  }
	  
	  var html2 = '';
	  for(var i in obj.other_channel){
		 var itm = obj.other_channel[i];
		 var selected = itm.is_default == 'Y' ? 'sel_bank' : '';
		 html2 += '<dl class="clearfix '+ selected +'" data-t="payType" data-v="'+ i +'">'+
							'<dt><span class="'+ i +' payicon"></span></dt>'+
							'<dd>'+
								'<p class="font16">'+ itm.channel_cn + '</p>'+
								'<p class="font12 gray">描述'+ itm.channel_desc+ '</p>'+
								'<span class="selctedicon icon"></span>'+
							'</dd>'+
						'</dl>';  
	  }
	  this.payTypeList.html(html2);
  }
  

  buyConfirmObj.createDomObj = function(){
    this.payconfirmObj = $("#buyConfirm_wrapObj");
    this.hbObj = $("#buyConfirm_hbObj");
    this.cjObj = $("#buyConfirm_cjObj");
    this.yeObj = $("#buyConfirm_yeObj");
    this.payObj = $("#buyConfirm_payObj");
    this.payTypeObj = $("#buyConfirm_payTypeObj").hide();
    this.pwdObj = $("#buyConfirm_pwdObj");
    this.betMoneyObj = $("#buyConfirm_betMoneyObj");
	this.initObj = $('#buyConfirm_initCon');
    this.payTipsObj = $("#buyConfirm_payTipsObj");
    this.hideTipsObj = $("#buyConfirm_hideTipsObj");
	this.hbWrap = $('#buyConfirm_hbListWrap');
	//this.pwdWrap = $('#buyConfirm_pwdWrap'); cashier.pay.init
	//this.nopwdWrap = $('#buyConfirm_nopwdWrap');
	//this.pwdCheck =  $('#buyConfirm_pwdCheck');
	this.payTypeList = $('#buyConfirm_paytypeList');
	this.betInfoObj = $('#buyConfirm_betInfo');
	this.authTipsObj = $('#buyConfirm_authTipsObj');
	this.initShadow = $('#buyConfirm_initShadow');
	this.MoneyObj = $('#buyConfirm_MoneyObj');
  }

  buyConfirmObj.createEvent = function(){
    this.payconfirmObj.unbind('tap').tap(function(e){
      buyConfirmObj.confirmEvent(e);
	});
    this.pwdObj.unbind('focus').focus(function(){
      $(this).parent().addClass('focus');
    });
    this.pwdObj.unbind('blur').blur(function(){
      $(this).parent().removeClass('focus');
    });
  }

  buyConfirmObj.confirmEvent = function(e){
    var emObj = $.oto_checkEvent(e,"EM");
    if(emObj){
      var thisObj = $(emObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "hidePwd" : this.hidePwd(thisObj);return true;
      }
    }

    var aObj = $.oto_checkEvent(e,"A");
    if(aObj){
      var thisObj = $(aObj);
      var thisT = thisObj.attr("data-t");
      console.log(thisT)
      switch(thisT){
        case "sub" : this.checkReal();return true;
		case "clearTips" : this.hideTipsObj.hide();return true;
        case "subTips" :this.checkReal();this.hideTipsObj.hide();return true;
		case "clearAuthTips": this.authTipsObj.hide();return true;
		case "toAuthTips": this.goRegRealName();return true;
      }
    }

    var pObj = $.oto_checkEvent(e,"P");
    if(pObj){
      var thisObj = $(pObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "backbtn" : this.goBack();return true;
        case "showhb": this.showhb(thisObj);return true; 
      }
    }

    var dlObj = $.oto_checkEvent(e,"DL");
    if(dlObj){
      var thisObj = $(dlObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "selecthb" : this.selectHB(thisObj);this.calPayMoney();return true; 
        case "payType" : this.updatePayType(thisObj);return true;
      }
    }
    var divObj = $.oto_checkEvent(e,"DIV");
    if(divObj){
      if($(divObj).attr("data-t")=="nohide")return true;
      buyConfirmObj.hideTipsObj.hide();
    }
  }

  buyConfirmObj.selectHB = function(obj){
    var thisV = Number(obj.attr("data-v"));
    var thisId = obj.attr("data-id");
    if(obj.hasClass('sel_bank')){
      obj.removeClass('sel_bank');
      this.hbVal = 0;
      var temId = [];
      for(var i=0,ilen=this.hbId.length;i<ilen;i++){
        if(this.hbId[i]!==thisId)temId.push(this.hbId[i]);
      }
      this.hbId = temId;
    }else{
    	if(this.assure_amount > 0){
    		this.hbVal = this.hmhb;
    	}else{
    		this.hbVal = thisV;
    	}
      obj.siblings().removeClass('sel_bank');
      obj.addClass('sel_bank');
      this.hbId = [thisId];
    }
  }

  buyConfirmObj.calPayMoney = function(){
//  this.betMoneyObj.html(this.money+"元");
//	if(this.product_type == 'plan'){
//		this.betInfoObj.html((this.product_info ? '第' + this.product_info.begin_lottery_no + '-' + this.product_info.end_lottery_no + '期' : '') + ' ' + this.lotteryCn);
//	}else{
//		this.betInfoObj.html((this.product_info? this.product_info.lottery_no + '期' : '') + ' ' +  this.lotteryCn );
//	}
    this.cjObj.html(this.cjVal+"元");
	var userHbVal = this.hbVal > this.money ? this.money : this.hbVal;
    this.hbObj.html(userHbVal+"元");

    var thisye = this.money - this.cjVal - userHbVal < this.yeVal ? this.money - this.cjVal - userHbVal : this.yeVal;
    this.yeObj.html(thisye + "元");
    this.useYeVal = thisye;

    if(thisye){
      this.yeObj.parent().show();
    }else{
      this.yeObj.parent().hide();
    }

    var thisPay = (this.money-this.cjVal-userHbVal-thisye).toFixed(2);
    if(thisPay == 0){
      this.payObj.parent().hide();
      this.payTypeObj.hide();
	
			/* bcy 不要免密支付
      if(this.nopwdswitch_status == "N"){
        this.pwdObj.parent().show();
        this.pwdObj.parent().next().show();
      }else if(Number(this.is_fit_nopwdrules) < 0){
        this.pwdObj.parent().show();
        this.pwdObj.parent().next().hide();
      }else{
        this.pwdObj.parent().hide();
        this.pwdObj.parent().next().hide();
      }
      */
       this.pwdObj.parent().hide();
        this.pwdObj.parent().next().hide();
        
        
        
       this.useOtherChannel = '';
    }else{  //需要其他支付方式补足
      this.payObj.parent().show();
      this.payTypeObj.show();

      this.pwdObj.parent().hide();
      this.pwdObj.parent().next().hide();
	  this.useOtherChannel = this.payType;
    }
    this.payVal = thisPay;
    this.payObj.html(thisPay+"元");

    if (this.otherChannel.length == 0) {
        this.payTypeObj.hide();
	}
  }
  

  buyConfirmObj.hidePwd = function(obj){
    if(obj.hasClass('checked')){
      obj.removeClass('checked');
      //this.pwdObj.parent().show();
      this.nopwdswitch_status = 'N';
    }else{
      obj.addClass('checked');
      this.nopwdswitch_status = 'Y';
      //this.pwdObj.parent().hide();
    }
  }

  buyConfirmObj.updatePayType = function(obj){
    if(obj.hasClass('sel_bank'))return true;
    obj.siblings().removeClass('sel_bank');
    obj.addClass('sel_bank');
    this.payType = obj.attr("data-v");
  }
;

  buyConfirmObj.showhb = function(obj){
    if(obj.hasClass('showObj')){
      obj.removeClass('showObj');
      obj.next().hide();
      obj.find("em").eq(1).removeClass('trans');
    }else{
      obj.addClass('showObj');
      obj.next().show();
      obj.find("em").eq(1).addClass('trans');
    }
  }

  /**
   * 检查实名认证
   */
buyConfirmObj.checkReal = function () {
      var self = this;
     
//    Global.checkRealStatus({
//        reload: true,
//        yes: function () {self.subData();},
//        realAuthBack: function () {self.show();}
//    });
      
      self.subData();
      
};

  buyConfirmObj.subData = function(){
			var self = this;

      // 清空缓存的购买数据
      window.localStorage.removeItem(self.lotteryType + 'lotteryBetData');
      window.localStorage.removeItem(self.lotteryType + 'lotteryAllBetData');
      window.localStorage.removeItem(self.lotteryType + 'MulAndPer');

	/* bcy 不要免密支付
    var pwd = this.pwdObj;
    if(this.pwdObj.parent().css("display") !="none" && !pwd){
      $.alertMsg("请输入登录密码");
      return false;
    }
    */
    /** bcy
    if(loginObj.userInfo && loginObj.userInfo.real_status != 'Y'){  //未实名
		self.authTipsObj.show();
		return false;
	}
	*/

      if (this.payVal > 0) {
          
          $.alertMsg('余额不足，请充值');
          // 跳转到充值页面
          setTimeout(function () {
              // userCenterObj.goRecharge();
              wechatpayWebObj.goBack = function () {
                  wechatpayWebObj.destroy();
                  buyConfirmObj.dirShow();
              };

              // 来源为 支付确认页面
              wechatpayWebObj.dirShow({'from': 'buyConfirm'});
          }, 2000);
          return false;
          

//        var originalProduct = {
//            pay_id: self.pay_id,
//            product_id: self.product_id,
//            product_type: self.product_type,
//            handsel_amount: self.cjVal,
//            bonus_amount: self.hbVal,
//            bonus_id: self.hbId.join(','),
//            cash_amount: self.useYeVal,
//            channel_type: self.payType,
//            channel_amount: self.payVal,
//            nopwdswitch_status: self.nopwdswitch_status,
//            pwd_val: "",
//            access_token: loginObj.access_token
//        };
//
//        // 直接支付
//        wechatpayWebObj.dirPay(this.payVal, self.product_type, self.product_id, originalProduct);
//        return false;
      }

    if(this.payTipsObj.hasClass('paying_txt'))return true;
    this.payTipsObj.html("正在支付");
    this.payTipsObj.addClass('paying_txt');
    
   	var data = {
		 'pay_id' : this.pay_id,
		 'product_id' : this.product_id,
		 'handsel_amount' : this.cjVal,
		 'bonus_amount': this.hbVal,
		 'bonus_id': this.hbId.join(','),  
		 'cash_amount' : this.useYeVal,
		 'channel_type' : this.payType,
		 'channel_amount' : this.payVal,
		 'nopwdswitch_status' : this.nopwdswitch_status,
		 'assure_amount' : this.assure_amount,
		 'pwd_val' : ""
	  };
	  
//	  console.log(data)
    
    var secretData = {
    	'para': Global.encrypt(data),
    	'access_token': loginObj.access_token
    }
    console.log(data.cash_amount)
        fMoney = data.cash_amount

    $.ajax({
		  url : ConfigObj.localSite +  '?version=1&m=cashier.pay.pay',
		  data : secretData,
      type : "post",
      dataType : "json",
      success : function(msg){
        // console.log(msg)
    // console.log(fMoney) cashier.pay.init
        var secData = { //购彩金额
          'channel_id': '9',
          'type': 'pay_mon_gc',
          'pay_money':fMoney,
          'ip':returnCitySN["cip"]
        }
      $.ajax({
        url:ConfigObj.localSite +'?version=1&m=cashier.deposit.number',
        data:secData,
        dataType:'json',
        type:'post',
        success: function(obj){
          console.log(obj)
              var sDat = {//发起购彩金额
                'channel_id': '9'
              }
              $.ajax({//购彩金额次数接口
                url:ConfigObj.localSite +'?version=1&m=cashier.deposit.number_list',
                data:sDat,
                dataType:'json',
                type:'post',
                success: function(obj){
                  /*for (var i = 0; i < obj.info.length; i++) {
                    android_obj.countFrequency(obj.info[i].type)
                    android_obj.calculateFrequency(obj.info[i].type,obj.info[i].pay_money)
                  }*/
                }
              });
        }
      });

      	// console.log(msg) 
			if(msg.code === "-6008" || msg.code === "-6106"){
				self.hideTipsObj.show();
				self.payTipsObj.html("确认支付");
				self.payTipsObj.removeClass('paying_txt');
				return false;
			}		
			if(msg.code == '-1003'){   //连续输错密码 账户锁定
				Global.GC();
				$.alertMsg(msg.code_str);	
				loginObj.logout();
				return false;	
			}
			
			if(msg.code == "0000"){  //成功
				////console.log(self.payType); 
				msg.info = $.parseJSON(Global.crypt(msg.info));
//				console.log(msg)
				if(self.useOtherChannel == 'alipayWap'){  //支付宝支付跳转 todo zhangw
					location.href = msg.info.return_url;
				}else{
					self.payTipsObj.html("确认支付");
					self.payTipsObj.removeClass('paying_txt');
					cashierObj.goBack=function(){   
						/*if(ConfigObj.from == 'ios'){
							ConfigObj.from = '';
							location.href = ConfigObj.iosAppSite ;  //跳回到iosApp 
						}else{ *///跳转到取票设置[中转页],不可逆，点击回退默认到首页。 
							Global.GC();
							homeObj.show();	
						//}
					}
					var data = {
						'pay_id' : self.pay_id,
						'product_id' : self.product_id,
						'product_type': self.product_type,
						'lotteryType' : self.lotteryType,
						'lotteryCn': self.lotteryCn 	
					}
	        cashierObj.show(true, function () {
	            cashierObj.setData(data);
	        });
				}
			}else{
				self.payTipsObj.html("确认支付");
				self.payTipsObj.removeClass('paying_txt');
				$.alertMsg(msg.code_str);	
				
			}
    	    
      }
    });
  }
  
  buyConfirmObj.checkDom = function(){
    if(this.cjVal == 0){
      this.cjObj.parent().parent().parent().hide();
    }
    if(this.hbVal == 0){
      this.hbObj.parent().parent().parent().hide();
    }
    if(this.useYeVal == 0){
      this.yeObj.parent().hide();
    }
  }

  

  buyConfirmObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
	
  }

  buyConfirmObj.init = function(){
    this.setDefConfig();
    buyConfirmObj.onloadExecution();
  }

  buyConfirmObj.dirShow = function (obj) {
      obj = obj || {};
      // 取缓存的数据
      var v = Global.getCache('confirm_product');
      if (!v) v = Global.cache['confirm_product'];
      for (var p in v)
          obj[p] = v[p];

      console.clear();
//    //console.log(v);

      if (obj && obj.from == 'ios') {
          ConfigObj.from = 'ios';
          buyConfirmObj.goBack = function () {
              ConfigObj.from = '';
              location.href = ConfigObj.iosAppSite;  //跳回到iosApp
              //window.open(ConfigObj.iosAppSite , '_system');
          }
      }
      buyConfirmObj.show('reload', function () {
          buyConfirmObj.setData(obj);
      })
  }
  
  
 
