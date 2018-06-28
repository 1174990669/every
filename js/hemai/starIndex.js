
	var starIndexObj = new PageController({
	   'name': 'starIndex',
	   'tpl' : 'template/hemai/starIndex.html'
    }); 

	starIndexObj.createDomObj = function(){
		this.wrapObj = $("#starIndex_wrapObj");
		this.buyObj = $("#starIndex_buyObj");
		this.overNumObj = $("#starIndex_overNumObj");
		this.overInputObj = $("#starIndex_moneyObj");
		this.copObj = $("#starIndex_copObj");
	}

	starIndexObj.createEvent = function(){

		this.wrapObj.unbind('tap').tap(function(e){
			starIndexObj.updateMoneyEvent(e);
		});
		
	}

	starIndexObj.updateMoneyEvent = function(e){
		
		var aObj = $.oto_checkEvent(e,"A");
		if(aObj){
			var thisObj = $(aObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "xy" : this.goHemaixy();return true;
			}
		}
		
		var dObj = $.oto_checkEvent(e,"DL");
		if(dObj){
			var thisObj = $(dObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "godetail" : this.goDetail(thisObj);return true;
			}
		}
		
		var sObj = $.oto_checkEvent(e,"SPAN");
		if(sObj){
			var thisObj = $(sObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "moreList" : this.moreList(thisObj);return true;
				case "gobuy" : this.gobuy(thisObj);return true;
				case "reduce" : this.reduceNum();return true;
				case "per" : this.showOverNum();return true;
				case "increase" : this.addNum();return true;
				case "od"  : this.delOverVal();break;
        		case "os"  : this.hideOverTips();break;
        		case "on"  : this.updateOverVal(thisObj);break;
        		case "atn" : this.atn(thisObj);break;
			}
		}
		
		var pObj = $.oto_checkEvent(e,"P");
		if(pObj){
			var thisObj = $(pObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "backbtn" : this.goBack();return true;
				case "buyAll" : this.buyAll();return true;
				case "submit" : this.goPay();return true;
			}
		}
	}
	
	starIndexObj.goDetail = function(obj){
		var thisV = obj.attr('data-v');
		hemaiDetailObj.goBack = function(){
			 hemaiDetailObj.destroy();
			 starIndexObj.show();
		 }
		hemaiDetailObj.show(true,function(){
			hemaiDetailObj.setData(thisV);
		});
	}
	
	starIndexObj.gobuy = function(obj){
		
		if(!loginObj.isLogin ){
			$.alertMsg("请先登录！",false)
			setTimeout(function(){
				loginObj.goBack = function () {
			        userCenterObj.show(true);
			    };
			    loginObj.goForward = function () {
			        userCenterObj.show(true);
			    };
			    
			    loginObj.show(true);
			},2000);
			return false;	
		}
		
		var parent = $('#starIndex');
		var buyWrap = parent.find('#starIndex_buyObj');
//		////console.log(buyWrap)
		if (buyWrap.length > 0) {
            if (buyWrap.css('display') == 'none') {
                addBgLayer();
                buyWrap.show();
            } else {
                $('#starIndex_buyObj').hide();
                $('#buy_bgLayer').remove();
            }
        } 
		
		function addBgLayer() {
            var bg = '<div style="width:100%;height:100%;background:transparent;position:fixed;left:0;top:0;z-index:90" id="buy_bgLayer"></div>';
//          ////console.log($('#global_bgLayer').length)
            if ($('#buy_bgLayer').length == 0) {
                parent.append(bg);
                $('#buy_bgLayer').css({ 'height': document.documentElement.scrollHeight || document.body.scrollHeight })
                $('#buy_bgLayer').unbind('tap').tap(function() {
                    $('#starIndex_buyObj').hide();
                    $('#buy_bgLayer').remove();
                })
            }
        }
		this.lotteryType = obj.attr('data-k');
		this.lotteryNo = obj.attr('data-n');
		this.productId = obj.attr('data-v');
		this.allNum = obj.attr('data-b');
		this.overNum = 1;
		this.copObj.html(this.overNum+"份");
		this.overInputObj.html(this.overNum);
		////console.log(this.overNum);
	}
	
	starIndexObj.reduceNum = function(){
		if(this.overNum > 1){
			this.overNum = this.overNum - 1;
			this.overInputObj.html(this.overNum);
    		this.copObj.html(this.overNum+"份");
		}
	}
	
	starIndexObj.addNum = function(){
		this.overNum = this.overNum + 1;
		this.overInputObj.html(this.overNum);
		this.copObj.html(this.overNum+"份");
	}	
	
	starIndexObj.showOverNum = function(){
		this.overNumObj.show();
		this.checkTipsShow = true;
	}
	
	starIndexObj.goList = function(){
		hmUserlistObj.goBack = function(){
			 hmUserlistObj.destroy();
			 starIndexObj.show();
		 }
		hmUserlistObj.show();
	}
	
	starIndexObj.updateOverVal = function(obj){
    if(this.checkTipsShow){
      this.overNum = 0;
      this.checkTipsShow = false;
    }
    var thisV = obj.attr("data-v");
    this.overNum = Number(this.overNum+""+thisV);
    if(this.overNum>this.maxOver)this.overNum = this.maxOver;
    this.overInputObj.html(this.overNum);
    this.copObj.html(this.overNum+"份");
  }
	
  starIndexObj.delOverVal = function(){
    this.overNum = Number((this.overNum+"").slice(0,-1));
    this.overInputObj.html(this.overNum);
     this.copObj.html(this.overNum+"份");
  }

  starIndexObj.hideOverTips = function(){
    if(this.overNum<1)this.overNum=1;
    this.overInputObj.html(this.overNum);
    this.copObj.html(this.overNum+"份");
    this.overNumObj.hide();
    this.checkTipsShow = false;
    this.overInputObj.removeClass('fontblue');
  }
	
	starIndexObj.goHemaixy = function(){
		 hemaixyObj.goBack = function(){
			 hemaixyObj.destroy();
			 starIndexObj.show();
		 }
		 hemaixyObj.show();
	}
	
	starIndexObj.moreList = function(obj){
		var thisV = obj.attr("data-v");
		////console.log(thisV)
		var user_id = this.id;
		//console.log(this.id)
		hemaiListObj.goBack = function(){
			 hemaiListObj.destroy();
			 starIndexObj.show();
		 }
		hemaiListObj.show(true,function(){
			
			hemaiListObj.setData({
				'status':thisV,
				'user_id':user_id
			});
		});
	}
	
	starIndexObj.buyAll = function(){
		this.overNum = this.allNum;
		this.overInputObj.html(this.overNum);
    	this.copObj.html(this.overNum+"份");
	}
	
	starIndexObj.atn = function(obj){
		if(!loginObj.isLogin ){
			$.alertMsg("请先登录！",false)
			setTimeout(function(){
				loginObj.goBack = function () {
			        userCenterObj.show(true);
			    };
			    loginObj.goForward = function () {
			        userCenterObj.show(true);
			    };
			    loginObj.show(true);
			},2000);
			return false;	
		};
		var type = obj.attr('data-v');
		var id = obj.attr('data-k');
		if(type == "no"){
			obj.addClass('y_btn');
			obj.attr('data-v','yes');
			obj.html('取消关注');
			$('#star_fans').html(this.fans_num + 1);
			this.fans_num = this.fans_num + 1;
			this.relation_type = "build";
		}else if(type == "yes"){
			obj.removeClass('y_btn');
			obj.attr('data-v','no');
			obj.html('关注');
			$('#star_fans').html(this.fans_num - 1);
			this.fans_num = this.fans_num - 1;
			this.relation_type = "cancel";
		}
		var data = {
			'user_id': id,
			'relation_type': this.relation_type
		}
		////console.log(data)
		var secretData = {
			'para': Global.encrypt(data),
			'access_token': loginObj.access_token
		}
		$.ajax({
			url : ConfigObj.localSite +  '?version=1&m=user.account.setRelation',
			data : secretData,
			type : "post",
			dataType : "json",
			success : function(msg){
				////console.log(msg);
				$.alertMsg(msg.code_str,true);
			}
		});
	}
	
	starIndexObj.goPay = function(){
		
		var data = {
			'lotteryType': this.lotteryType.toUpperCase(), 
			'lotteryNo' : this.lotteryNo, 
			'product_id' : this.productId,
			'product_type': this.productType,
			'pay_amount': this.overNum,
			'assure_amount': -1
		}
		////console.log(postData)
		buyConfirmObj.goBack=function(){
  			buyConfirmObj.destroy();
  			starIndexObj.show();
  		};
  		setTimeout(function(){
            buyConfirmObj.show(true, function () {
                buyConfirmObj.setData(data);
            });
		},300)   //防止未登录流程多页面连续切换，由动画延迟导致的切换问题 zhangw
	}
	
	starIndexObj.setData = function(obj){
		this.id = obj.owner_id;
		starIndexObj.getData();
	}
	
	starIndexObj.getData = function(){
		
        var postData = {
			'user_id':this.id
		}
        var secretData = {
        	'para':Global.encrypt(postData),
        	'access_token':loginObj.access_token
        }
        ////console.log(postData)
		$.ajax({
			url : ConfigObj.localSite +  '?version=1&m=lottery.lottery.TogetherUserInfo',
			data : secretData,
			type : "post",
			dataType : "json",
			success : function(msg){
				//console.log(msg);
				if(msg.code == '0000'){
					starIndexObj.formatHtmlA(msg.info);
					starIndexObj.formatHtmlB(msg.info.project_info.on);
					starIndexObj.formatHtmlC(msg.info.project_info.end);
				}else{
					$.alertMsg(msg.code);
					return false;
				}
				
			}

		});
	}

	starIndexObj.formatHtmlA = function(obj){
		var data = obj;
		$('#starIndex_name').html(data.user_name);
//		$('#starIndex_option').html('<span class="starAtn_btn y_btn" data-t="">取消关注</span>')
		$('#star_follow').html(data.follow_num);
		$('#star_fans').html(data.fans_num);
		this.fans_num = parseFloat(data.fans_num);
		$('#starIndex_buyMoney').html(data.project_total_money);
		$('#starIndex_prizeMoney').html(data.prize_total_money);
		if(data.follow_status == 1){
			$('#starIndex_option').html('<span class="starAtn_btn y_btn" data-t="atn" data-v="yes" data-k="'+this.id+'">取消关注</span>')
		}else{
			$('#starIndex_option').html('<span class="starAtn_btn" data-t="atn" data-v="no" data-k="'+this.id+'">关注</span>')
		}
	}

	starIndexObj.formatHtmlB = function(obj){
		if(obj.length == 0){
			var html = [];
			html.push('<div class="hemaiIndex_option option_white"><p>暂无推荐信息！</p></div>');
			$('#recomRecord').html(html.join(""));
			$('#starIndex_onlist').hide();
			return false;
		}
		var html = ''; 
		for (var i=0,ilen=obj.length;i<ilen;i++) {
			var itm = obj[i];
			////console.log(itm)
			html += '<div class="myRecord_list">'+
						'<div class="myRecord_list_t clearfix">'+
							'<div class="content1">'+
								'<p style="font-size:12px;">'+itm.lottery_type_cn+'</p>'+
							'</div>'+
							'<div class="content5">'+
								'<p>'+itm.sell_end_time+'截止</p>'+
							'</div>'+
							'<div class="content2 myRecord_btn">'+
								'<span data-t="gobuy" data-v="'+itm.lottery_id+'" data-k="'+itm.lottery_type+'" data-n="'+itm.lottery_no+'" data-b="'+itm.completeNum+'">立即跟单</span>'+
							'</div>'+
						'</div>'+
						'<dl class="hm_list_b" data-t="godetail" data-v="'+itm.lottery_id+'">'+
							'<div class="content3 hmPace" style="text-align: center;">'+
								'<canvas id="a'+itm.lottery_id+'" class="hm_scale" width="120px" height="120px" style="width: 60px;height: 60px;"></canvas>'+
								'<div class="hm_pace">'+
									'<p>'+itm.completerate+'%</p>'+
									'<span>保'+itm.assure_rate+'%</span>'+
								'</div>'+
							'</div>'+
							'<div class="content3 hm_info">'+
								'<p>总金额</p>'+
								'<span>'+itm.money+'</span>'+
							'</div>'+
							'<div class="content3 hm_info">'+
								'<p>参与人数</p>'+
								'<span>'+itm.share_user_num+'</span>'+
							'</div>'+
							'<div class="content3 hm_info">'+
								'<p>剩余份数</p>'+
								'<span>'+itm.completeNum+'</span>'+
							'</div>'+
							'<div class="content4 hmIndex_arr"></div>'+
						'</dl>'+
					'</div>';
		};
		$('#recomRecord').html(html);
		for (var k=0,ilen=obj.length;k<ilen;k++) {
			var canvasId = "a"+obj[k].lottery_id;
			drawCircle({
			    id: canvasId,
			    color: '#e04241',
			    angle: obj[k].completerate/100,
			    lineWidth: 4
			});
		};
	}

	starIndexObj.formatHtmlC = function(obj){
		if(obj.length == 0){
			var html = [];
			html.push('<div class="hemaiIndex_option option_white"><p>暂无合买信息！</p></div>');
			$('#recentRecord').html(html.join(""));
			$('#starIndex_endlist').hide();
			return false;
		}
		var html = '';
		for (var i=0,ilen=obj.length;i<ilen;i++) {
			var itm = obj[i];
			html += '<dl class="myRecord_list clearfix" data-t="godetail" data-v="'+itm.lottery_id+'">'+
						'<div class="content3 hm_info">'+
							'<p>彩种</p>'+
							'<span>'+itm.lottery_type_cn+'</span>'+
						'</div>'+
						'<div class="content3 hm_info">'+
							'<p>总金额</p>'+
							'<span>'+itm.money+'</span>'+
						'</div>'+
						'<div class="content3 hm_info">'+
							'<p>参与人数</p>'+
							'<span>'+itm.share_user_num+'</span>'+
						'</div>'+
						'<div class="content3 hm_info">'+
							'<div class="hemai_result '+(itm.net_prize > 0 ? 'result_y':'')+'">'+(itm.net_prize > 0 ? '已中奖':'未中奖')+'</div>'+
						'</div>'+
						'<div class="content4 hmIndex_arr"></div>'+
					'</dl>';
		};
		$('#recentRecord').html(html);
		
	}

	starIndexObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
//		this.getData();
//		this.setHtml();
	}

	starIndexObj.setDefConfig = function(){
		this.overNum = 1;
		this.allNum = '';
		this.id = '';
		this.productId = '';
		this.lotteryNo = '';
		this.lotteryType = '';
		this.productType = '';
		this.fans_num = '';
	}

	starIndexObj.init = function(){
		starIndexObj.onloadExecution();
		starIndexObj.setDefConfig();
	}
	
	