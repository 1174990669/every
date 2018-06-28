
	var hemaiObj = new PageController({
	   'name': 'hemai',
	   'tpl' : 'template/hemai/hemai.html'
    }); 

	hemaiObj.createDomObj = function(){
		this.wrapObj = $("#hemai_wrapObj");
		this.lotteryObj = $("hemai_lotteryObj");
		this.timeObj = $("#hemai_timeObj");
		this.totalMoneyObj = $("#hm_totalMoney");
		this.totalNumObj = $("#hm_totalNum");
	}

	hemaiObj.createEvent = function(){

		this.wrapObj.unbind('tap').tap(function(e){
			hemaiObj.updateMoneyEvent(e);
		});
		
		$("#hemaiInput").live("blur",function(){  
		    _filter_method($(this));  
		}); 
		
		var keywords = ['V信','微信','WeChat','wechat','qq','QQ','群','qun','群号','V+信','手机号','公众号','阅读号','weixin','WEIXIN'];
		
		function _filter_method(obj){  
		    var value = $(obj).val();  
		    for(var i=0;i<keywords.length;i++){  
		        var reg = new RegExp(keywords[i],"g");  
		        if(value.indexOf(keywords[i])!=-1){  
		            var result = value.replace(reg,"**");  
		            value = result;  
		            $(obj).val(result);  
		        }  
		    }  
		}  
		
	}

	hemaiObj.updateMoneyEvent = function(e){
		var liObj = $.oto_checkEvent(e,"A");
		if(liObj){
			var thisObj = $(liObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "planBtn" : this.planBtn(thisObj);return true;
			}
		}
		
		var pObj = $.oto_checkEvent(e,"P");
		if(pObj){
			var thisObj = $(pObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "lottery" : this.lottery(thisObj);return true;
				case "backbtn" : this.goBack();return true;
				case "submit" : this.goSubmit();return true;
			}
		}
	}

	

	hemaiObj.planBtn = function(obj){
		var thisV = obj.attr("data-v");
		obj.siblings().removeClass("selected");
		obj.addClass('selected')
		this.openType = thisV;
	}


	hemaiObj.change = function(){
		var totalNum = this.totalNum;
		$('#hm_myBuy').bind('input propertychange', function() {
            var myBuy = $('#hm_myBuy').val();
            var reg = /^[1-9]\d*$|^0$/;
            if(reg.test(myBuy) == false){
            	$.alertMsg("份数只能为整数",false);
            	$('#hm_myBuy').val("");
            	$('#myBuy_pro').html("");
            	return;
            }
            if(myBuy > totalNum){
            	$.alertMsg("自购份数不能超过总份数",false);
            	$('#hm_myBuy').val("");
            	$('#myBuy_pro').html("");
            	return;
            }
            var pro = (myBuy/totalNum)*100;
            var mybuyPro = pro.toFixed(2);
            mybuyPro+="%";
            $('#myBuy_pro').html(mybuyPro);
        }); 
        
        $('#hm_myCom').bind('input propertychange', function() {
        	var myCom = $('#hm_myCom').val();
        	var reg = /^[0-9]*$/;
        	if(reg.test(myCom) == false){
        		$.alertMsg("提成只能为0-8的整数",false);
        		$('#hm_myCom').val("");
        		return;
        	}
        	if(myCom > 8){
        		$.alertMsg("提成只能为0-8的整数",false);
        		$('#hm_myCom').val("");
        		return;
        	}
        });
        
        $('#hm_myMin').bind('input propertychange', function() {
            var myBuy = $('#hm_myBuy').val();
            var myMin = $('#hm_myMin').val();
            var reg = /^[1-9]\d*$|^0$/;
            if(reg.test(myMin) == false){
            	$.alertMsg("份数只能为整数",false);
            	$('#hm_myMin').val("");
            	$('#myMin_pro').html("");
            	return;
            }
            if(myMin > (totalNum - myBuy) ){
            	$.alertMsg("保底份数不能超过剩余份数",false);
            	$('#hm_myMin').val("");
            	$('#myMin_pro').html("");
            	return;
            }
            var pro = (myMin/totalNum)*100;
            var myminPro = pro.toFixed(2);
            myminPro+="%";
            $('#myMin_pro').html(myminPro);
        }); 
	}

	hemaiObj.goSubmit = function(){
		var self = this;
		var postData = this.createSubData;
		self.lotteryType = postData.lotteryType;
		self.lotteryNo = postData.lotteryNo;
		self.manner = postData.manner;
		postData.consignType = "together";
		postData.openType = this.openType;
		postData.subNum = parseInt($('#hm_myBuy').val());
		postData.percent = parseInt($('#hm_myCom').val()) ? parseInt($('#hm_myCom').val()):0;
		postData.assure = parseInt($('#hm_myMin').val()) ? parseInt($('#hm_myMin').val()):0;
		self.assure = parseInt($('#hm_myMin').val()) ? parseInt($('#hm_myMin').val()):0;
		postData.msg = $('#hemaiInput').val() ? $('#hemaiInput').val():"大咖很懒，只想着中奖！";
		if(!postData.subNum){
			$.alertMsg("认购份数不能小于1份！",false);
			return false;
		};
		var numType = ["SSQ","DLT","PL3","PL5","D3"];
		var sportsType = ["FTFH","SPF9","SPF14","BSKFH"]
		if($.inArray(postData.lotteryType, numType) != -1){
			url = ConfigObj.localSite +  "?version=1&m=lottery.lottery.numProcess";
		}else if($.inArray(postData.lotteryType, sportsType) != -1){
			url = ConfigObj.localSite +  "?version=1&m=lottery.lottery.sportteryprocess";
		};
		postData.channel_number = ConfigObj.zdid;
		var secretData = {
			"para":Global.encrypt(postData),
			"access_token": loginObj.access_token
		};
		$.ajax({
			url : url,
			data : secretData,
			type : "post",
			dataType : "json",
			success : function(obj){
				console.log(obj)
				if(obj.code == "0000"){
					obj.info = $.parseJSON(Global.crypt(obj.info));
					
					self.pid = obj.info.productId;
					var data = {
						'lotteryType': self.lotteryType, 
						'lotteryNo' : self.lotteryNo, 
						'product_id' : obj.info.productId,
						'product_type': obj.info.productType,
						'pay_amount': obj.info.money,
						'assure_amount': self.assure
					}
					self.buyFun(data);
				}
			}
		});
	};
	
	hemaiObj.buyFun = function(obj){
		var self = this;
		buyConfirmObj.goBack=function(){
			switch(self.lotteryType){
				case 'dlt':
					dltObj.show('reload');
					break;
				case 'ssq':
					ssqObj.show('reload');
					break;	
				case 'pl3':
					pl3Obj.show('reload');
					break;
				case 'd3':
					d3Obj.show('reload');
					break;
				case 'pl5':
					pl5Obj.show('reload');
					break;
				case 'qxc':
					qxcObj.show('reload');
					break;
				case 'FTFH':
					soccerMixObj.show('reload',function(){
				    		soccerMixObj.getData(); 
					});
					if(self.manner == 2){
					    soccer2x1Obj.show();
					}else{
						soccerMixObj.show();
					}
					break;
				case 'SPF14':
					soccerTotoObj.show('reload',function(){
						soccerTotoObj.getData();
					})
					soccerTotoObj.show();
					break;
				case 'SPF9':
					soccerR9Obj.show('reload',function(){
						soccerR9Obj.getData();
					})
					soccerR9Obj.show();
					break;
				default:
					homeObj.show();
					break;	
			}
			self.destroy();
			buyConfirmObj.destroy();	
		}
		setTimeout(function(){
	        buyConfirmObj.show(true, function () {
	            buyConfirmObj.setData(obj);
	        });
		},300);

      	if (obj['product_id']) Global.setCache('confirm_product', obj);
      	if (obj['product_id']) Global.cache['confirm_product'] = obj;
  };
	
	hemaiObj.setData = function(obj){
		var data = obj.data;
		this.subData = obj.createSubData;
		this.totalMoney = data.totalMoney;
		this.totalNum = data.totalNum;
		this.lotteryType_cn = data.lottery_tyoe_cn;
		this.endTime = data.endTime;
	};
	
	hemaiObj.initDom = function(){
		$("#hemai_lotteryObj").text(this.lotteryType_cn);
		$("#hemai_timeObj").text(this.endTime);
		$("#hm_totalMoney").text(this.totalMoney);
		$("#hm_totalNum").text(this.totalNum);
		this.createSubData = this.subData;
	};
	
	hemaiObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
		this.change();
		this.initDom();
	};

	hemaiObj.setDefConfig = function(){
		this.openType = "open";
		this.totalMoney = "";
		this.totalNum = "";
		this.lotteryType = "";
		this.endTime = "";
		this.subData = new Array();
		this.pid = "";
		this.manner = "";
		
	};

	hemaiObj.init = function(){
		hemaiObj.onloadExecution();
		hemaiObj.setDefConfig();
	};
	
	


	