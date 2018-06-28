
	var hemaiDetailObj = new PageController({
	   'name': 'hemaiDetail',
	   'tpl' : 'template/hemai/hemaiDetail.html',
	   'initScrollTop':true
    }); 

	hemaiDetailObj.createDomObj = function(){
		this.wrapObj = $("#hemaiDetail_wrapObj");
		this.wrapA = $("#hemaiDetail_wrapAObj");
		this.wrapB = $('#hemaiDetail_wrapBObj');
		this.wrapC = $('#hemaiDetail_wrapCObj')
		this.overNumObj = $("#hemaiDetail_overNumObj");
		this.overInputObj = $("#hemaiDetail_moneyObj");
		this.copObj = $("#hemaiDetail_copObj");
		this.buyObj = $('#hemaiDetail_buyObj');
	}

	hemaiDetailObj.createEvent = function(){

		this.wrapObj.unbind('tap').tap(function(e){
			hemaiDetailObj.updateMoneyEvent(e);
		});
		
	}

	hemaiDetailObj.updateMoneyEvent = function(e){
		var aObj = $.oto_checkEvent(e,"A");
		if(aObj){
			var thisObj = $(aObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "xy" : this.goHemaixy();return true;
			}
		}
		
		var sObj = $.oto_checkEvent(e,"SPAN");
		if(sObj){
			var thisObj = $(sObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "reduce" : this.reduceNum();return true;
				case "per" : this.showOverNum();return true;
				case "increase" : this.addNum();return true;
				case "od"  : this.delOverVal();break;
        		case "os"  : this.hideOverTips();break;
        		case "on"  : this.updateOverVal(thisObj);break;
        		case "goList" : this.goList();return true;
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
	
	hemaiDetailObj.reduceNum = function(){
		if(this.overNum > 1){
			this.overNum = this.overNum - 1;
			this.overInputObj.html(this.overNum);
    		this.copObj.html(this.overNum+"份");
		}
	}
	
	hemaiDetailObj.addNum = function(){
		this.overNum = this.overNum + 1;
		if(this.overNum>this.allNum)this.overNum = this.allNum;
		this.overInputObj.html(this.overNum);
		this.copObj.html(this.overNum+"份");
	}	
	
	hemaiDetailObj.showOverNum = function(){
		this.overNumObj.show();
		this.checkTipsShow = true;
	}
	
	hemaiDetailObj.goList = function(){
		var data = {
			'pid':this.productId
		}
		hmUserlistObj.goBack = function(){
			 hmUserlistObj.destroy();
			 hemaiDetailObj.show();
		 }
		hmUserlistObj.show(true,function(){
			hmUserlistObj.setData(data);
		});
	}
	
	hemaiDetailObj.updateOverVal = function(obj){
    if(this.checkTipsShow){
      this.overNum = 0;
      this.checkTipsShow = false;
    }
    var thisV = obj.attr("data-v");
    this.overNum = Number(this.overNum+""+thisV);
    if(this.overNum>this.allNum)this.overNum = this.allNum;
    this.overInputObj.html(this.overNum);
    this.copObj.html(this.overNum+"份");
  }
	
  hemaiDetailObj.delOverVal = function(){
    this.overNum = Number((this.overNum+"").slice(0,-1));
    this.overInputObj.html(this.overNum);
     this.copObj.html(this.overNum+"份");
  }

  hemaiDetailObj.hideOverTips = function(){
    if(this.overNum<1)this.overNum=1;
    this.overInputObj.html(this.overNum);
    this.copObj.html(this.overNum+"份");
    this.overNumObj.hide();
    this.checkTipsShow = false;
    this.overInputObj.removeClass('fontblue');
  }
	
	hemaiDetailObj.goHemaixy = function(){
		 hemaixyObj.goBack = function(){
			 hemaixyObj.destroy();
			 hemaiDetailObj.show();
		 }
		 hemaixyObj.show();
	}

	  hemaiDetailObj.countdownTick = function () {
			
		  var endTime = this.endTime;
	      if (window.__numLottryCountdownInterval) clearInterval(window.__numLottryCountdownInterval);
	
	      var end = Date.parse(endTime.replace(/-/g, '/')); // end timestamp
	      function set() {
	          var now = Date.now(); // now timestamp
	          if (now >= end) {
	            $('#hemaiDetail_countdown').html('已截止');
	            clearInterval(window.__numLottryCountdownInterval);
	          } else {
	              now = now - 1000;
	              var interval = (end - now) / 1000; // seconds of interval
	              var h = Math.floor(interval / 3600); // hours
	              h = h < 10 ? '0' + h : h;
	              var m = Math.floor((interval - h * 3600) / 60); // minutes
	              m = m < 10 ? '0' + m : m;
	              var s = Math.floor(interval - h * 3600 - m * 60); // seconds
	              s = s < 10 ? '0' + s : s;
	              $('#hemaiDetail_countdown').html('距离截止' + h + ':' + m + ':' + s);
	          }
	      }
	      window.__numLottryCountdownInterval = setInterval(function () {set();}, 1000);
	  }

	hemaiDetailObj.buyAll = function(){
		this.overNum = this.allNum;
		this.overInputObj.html(this.overNum);
    	this.copObj.html(this.overNum+"份");
	}


	hemaiDetailObj.setData = function(obj){
		var self = this;
		self.pid = obj;
        var postData = {
			'pid': self.pid
		}
        var secretData = {
        	'para': Global.encrypt(postData),
        	'access_token': loginObj.access_token
        }
		$.ajax({
			url : ConfigObj.localSite +  '?version=1&m=user.project.TogetherProjectInfo',
			data : secretData,
			type : "post",
			dataType : "json",
			success : function(obj){
				//console.log(obj);
				if(obj.code == '0000'){
					self.lotteryInfo = obj.info;
					self.lotteryType = obj.info.lotteryType.toLowerCase();
					self.endTime = obj.info.endTime;
					self.allNum = obj.info.completeNum;
					self.lotteryNo = obj.info.lotteryNo;
					self.productId = obj.info.lotteryId;
					self.countdownTick();
					hemaiDetailObj.formatHtmlA(obj.info);
					hemaiDetailObj.formatHtmlB(obj.info);
					hemaiDetailObj.formatHtmlC(obj.info);
					hemaiDetailObj.infoOpen(obj.info);
				}else{
					$.alertMsg(obj.code_str);
				}
				
			}

		});
	}

	hemaiDetailObj.infoOpen = function(obj){
		var infoOpen = obj.open;
		if(infoOpen == "open"){
			$('#hemaiDetail_openObj').html('完全公开');
			 this.wrapA.show();
		}else if(infoOpen == "follow"){
			$('#hemaiDetail_openObj').html('跟单可见');
			if(obj.shareNum > 0 || obj.goodsStatus == 'end' || obj.goodsStatus == 'fail' || obj.goodsStatus == 'cancel'){
				this.wrapA.show();
			}
		}else if(infoOpen == "sell"){
			$('#hemaiDetail_openObj').html('截止后公开');
			if(loginObj.userId == obj.ownerId){
				this.wrapA.show();
			};
			var end = Date.parse(this.endTime.replace(/-/g, '/'));
			var now = Date.now();
			if(now >= end){
				this.wrapA.show();
			};
		};
	};

	
	
	hemaiDetailObj.formatHtmlB = function(obj){
		var html = '';
		html += '<span>'+obj.user_name+'</span>'+
				'<span>'+obj.percent+'%</span>'+
				'<span>'+obj.wagerMultiple+'倍</span>'+
				'<span>'+obj.totalMoney+'元</span>'+
				'<span>'+obj.addTime+'</span>'+
				'<span>'+obj.endTime+'</span>'+
				'<span>'+obj.lotteryId+'</span>'+
				'<span id="hemaiDetail_state"></span>'+
				'<span>'+obj.msg+'</span>';
		
		this.wrapB.html(html);
		if(obj.goodsStatus == "on"){
			$('#hmDet_listObj').show();
			$('#hemaiDetail_state').html('进行中');
			this.buyObj.show();
		}else if(obj.goodsStatus == "deal"){
			$('#hmDet_listObj').show();
			if(obj.printed == "yes"){
				$('#hemaiDetail_state').html('待开奖');
			}else if(obj.printed == "not"){
				$('#hemaiDetail_state').html('待出票');
			}else{
				$('#hemaiDetail_state').html('出票中');
			}
		}else if(obj.goodsStatus == "cancel"){
			$('#hemaiDetail_state').html('已撤单');
		}else if(obj.goodsStatus == "end"){
			$('#hmDet_listObj').show();
			if (obj.prizeStatus == "Prize") {
				if (obj.netPrize > 0) {
					$('#hemaiDetail_state').html('已中奖');
				} else{
					$('#hemaiDetail_state').html('未中奖');
				}
			} else if(obj.prizeStatus == "Not"){
				$('#hemaiDetail_state').html('待开奖');
			} else{
				$('#hemaiDetail_state').html('待派奖');
			}
		}else if(obj.goodsStatus == "fail"){
			$('#hemaiDetail_state').html('已流单');
		}
		
	}
	
	hemaiDetailObj.formatHtmlC = function(obj){
		var html = '';
		html += '<div class="hmDet_head_t">'+
					'<div class="content6 hmDet_lottery">'+
						'<span style="margin:7px 4px 0 0;" class="lot_icon '+obj.lotteryType+'02 fl hmLot_icon"></span>'+
						'<p>'+obj.lotteryTypeCn+'</p>'+
					'</div>'+
					'<div class="content6 hmDet_number">'+
						'<p id="hemaiDetail_updataPlayObj">期号:'+obj.lotteryNo+'</p>'+
					'</div>'+
					'<div class="content6 hmDet_date">'+
						'<span id="hemaiDetail_countdown"></span>'+
					'</div>'+
				'</div>'+
				'<div class="hmDet_head_b clearfix">'+
					'<div class="content1 hmDet_head_list">'+
						'<p>当前进度</p>'+
						'<span>'+obj.completerate+'%</span>'+
						
					'</div>'+
					'<div class="content1 hmDet_head_list">'+
						'<p>保底份数</p>'+
						'<span>'+obj.assure_num+'份</span>'+
					'</div>'+
					'<div class="content1 hmDet_head_list">'+
						'<p>剩余份数</p>'+
						'<span>'+obj.completeNum+'份</span>'+
					'</div>'+
					'<div class="content1 hmDet_head_list">'+
						'<p>每份金额</p>'+
						'<span>1元</span>'+
					'</div>'+
					'<div class="content1 hmDet_head_list">'+
						'<p>我的跟单</p>'+
						'<span>'+obj.shareNum+'份</span>'+
					'</div>'+
				'</div>';
		this.wrapC.html(html);
	}
	
	hemaiDetailObj.formatHtmlA = function(obj){
	  var html = '';
	  if(this.isNumLottery()){  //包括高频
//	  	//console.log(ConfigObj.fastK3Type);
		   if(!this.isFastLottery() || this.lotteryType == 'jxk3' || this.lotteryType == 'jlk3'){   //普通数字彩
			   // 快三的方案详情已经用 PHP 生成好了
	  	   		html = '<div">'+
	             	     '' + obj.wagerList +
	  			       '</div>';
		   }else{  //高频
			   if (this.lotteryType != "jxk3" || this.lotteryType != "jlk3") {
                   html = this.getFastBetHtml(obj);
			   }

		   }
	  }else if(this.isSportLottery()){
		   html = this.getSportBetHtml(obj);  
	  }else if(this.isTotoLottery()){
		   html = this.getTotoBetHtml(obj);  
	  }
	  this.wrapA.html(html);
	 
  }
	
	hemaiDetailObj.isFastLottery = function(){
	  	var arr = ['tjsyy','gd11x5', 'gx11x5','xj11x5', 'sd11x5', 'gxk3','jxk3','jlk3'];
	  	var type = this.lotteryType;
	  	if($.inArray(type,arr) != -1){
				return true;  
	  	}
	  	return false;
  	}

//判断当前彩种是否数字彩
  hemaiDetailObj.isNumLottery = function(){
	    var self = this;
	    var arr = ['dlt','pl5','pl3','qxc','tjsyy','gd11x5','gx11x5','jx11x5','hub11x5','xj11x5', 'sd11x5', 'hn4j1','ssq','gxk3','jxk3','d3','jlk3'];   //数字彩[包括高频]
		var isNum = $.inArray(self.lotteryType, arr) != -1 ? true : false;
		return isNum;
  }
  
  //判断当前彩种是否竞彩
  hemaiDetailObj.isSportLottery = function(){   //竞彩彩种
	    var self = this;
	    var arr = ['ftbrqspf','ftspf','ftfh','bskfh'];   
		var isSport = $.inArray(self.lotteryType, arr) != -1 ? true : false;
		return isSport;
  }
  
  //判断当前彩种是否是体彩[老足彩 toto r9]
  hemaiDetailObj.isTotoLottery = function(){
	    var self = this;
	    var arr = ['spf14','spf9'];   
		var isToto = $.inArray(self.lotteryType, arr) != -1 ? true : false;
		return isToto;
  }

  //获取竞技彩投注内容
  hemaiDetailObj.getSportBetHtml = function(obj){
	  var self = this;
	  var html = '<div class="detail_con jz_detail">'+
					//'<div class="listbg"></div>'+
					'<div class="listwrap">'+
						'<div class="lists">';
	  for(var i in obj.wagerList){
		  var itm = obj.wagerList[i];
		  var subScore = '';
		  if(self.lotteryType == 'bskfh'){
			  subScore =  '<em class="font12 gray">总分:'+itm.totalResult + ' 分差:' + itm.diffResult + ' </em>';
			  //subScore = '';
		  }else{
			  subScore = '<em class="font12 gray">半全场：'+ itm.bqcResult + '</em>'; 
		  }
		  html += '<div class="libox clearfix">'+
						'<div class="fl font12 gray w10 center">'+
							'<p>'+ itm.week + '</p>'+
							'<p>'+ itm.subOid + '</p>'+
							'<p>'+ (itm.isAbs=='Y' ? '<span class="jzdan on"><em>胆</em></span>' : '') + '</p>'+
						'</div>'+ 
						'<div class="w80 fr">'+
							'<p class="mb10 center detop clearfix">'+
								'<span style="width:28%">'+ itm.homeName + '</span>';
								if(itm.bet_result == -1){
									html += '<span class="fontred">延期</span>';
								}else if(itm.score){
									html += '<span class="fontred" style="width:44%">'+
												'<em class="score">'+ itm.score + '</em>'+
												subScore +
											'</span>';	
								}else{
									html += '<span class="font12" >'+ itm.matchTime + '</span>';	
								}
					   html += '<span style="width:28%">' + itm.awayName + '</span>'+
							 '</p>';
					   if(itm.FTBRQSPF){
							html += '<div class="match_detail jzhg center mb10 clearfix">'+ 
										'<span class="rq">让<em>0</em></span>';
							for(var j=0;j<itm.FTBRQSPF.wager.length;j++){
								var bet = itm.FTBRQSPF.wager[j];   
								html += '<div class="opt_jz selected ' + self.getMixBetClass(bet,itm,'FTBRQSPF') + ' ">'+
								'<span><i class="font12">'+ bet +'</i><i>' + itm.FTBRQSPF.odds[bet] + '</i></span></div>';
								
							}
							html += '</div>';
					   }
					   if(itm.FTSPF){
							html += '<div class="match_detail jzhg center mb10 clearfix">' +
									  '<span class="rq">让<em>'+ itm.rq + '</em></span>';
							for(var j=0;j<itm.FTSPF.wager.length;j++){
								var bet = itm.FTSPF.wager[j];
								html += '<div class="opt_jz selected ' + self.getMixBetClass(bet,itm,'FTSPF') + ' ">'+
								'<span><i class="font12">'+ bet +'</i><i>' + itm.FTSPF.odds[bet] + '</i></span></div>';
								
							}
							html += '</div>';
							   
					   }
					  if(itm.FTBF){
							html += '<div class="match_detail jzhg jz_score center mb10 clearfix">'+
									  '<span class="rq">比分</span>';
							for(var j=0;j<itm.FTBF.wager.length;j++){
								var bet = itm.FTBF.wager[j];
								html += '<div class="opt_jz selected ' + self.getMixBetClass(bet,itm,'FTBF') + ' ">'+
								'<span><i class="font12">'+ bet +'</i><i>' + itm.FTBF.odds[bet] + '</i></span></div>';
								
							}
							html += '</div>';
					  }
					  if(itm.FTBQC){
							html +=  '<div class="match_detail jzhg jz_score center mb10 clearfix">'+
									 '<span class="rq pt1">半全场</span>';
							for(var j=0;j<itm.FTBQC.wager.length;j++){
								var bet = itm.FTBQC.wager[j];
								html += '<div class="opt_jz selected ' + self.getMixBetClass(bet,itm,'FTBQC') + ' ">'+
								'<span><i class="font12">'+ bet +'</i><i>' + itm.FTBQC.odds[bet] + '</i></span></div>';
								
							}
							html += '</div>';
						  
					  }
					  if(itm.FTJQS){
						   html += '<div class="match_detail jzhg jz_score center clearfix">'+
									 '<span class="rq pt1">总进球</span>';
						   for(var j=0;j<itm.FTJQS.wager.length;j++){
								var bet = itm.FTJQS.wager[j];
								html += '<div class="opt_jz selected ' + self.getMixBetClass(bet,itm,'FTJQS') + ' ">'+
								'<span><i class="font12">'+ bet +'</i><i>' + itm.FTJQS.odds[bet] + '</i></span></div>';
								
							}
							html += '</div>'; 
						  
					  }
					  /* ------------------------------------- 篮彩 -------------------------------- */
					  if(itm.BSKSF){
							html += '<div class="match_detail jzhg mb10 center clearfix">'+
										'<span class="rq">胜负</span>';
										for(var j=0;j<itm.BSKSF.wager.length;j++){
										   var bet = itm.BSKSF.wager[j];
										   html += '<div class="opt_lq selected ' + self.getMixBetClass(bet,itm,'BSKSF') + ' ">'+
								                   '<span><i class="font12">'+ bet +'</i> <i class="cc">' + itm.BSKSF.odds[bet] + '</i></span></div>';
										}
										
							html +=	'</div>';
					  }
					  if(itm.BSKRFSF){
						  html += '<div class="match_detail jzhg center mb10 clearfix">'+
										'<span class="rq">让分</span>';
										for(var j=0;j<itm.BSKRFSF.wager.length;j++){
										   var bet = itm.BSKRFSF.wager[j];
										   html += '<div class="opt_lq selected ' + self.getMixBetClass(bet,itm,'BSKRFSF') + ' ">'+
								                   '<span><i class="font12">'+ bet +'</i> <i>'+ itm.rq +'</i> <i class="cc">' + itm.BSKRFSF.odds[bet] + '</i></span></div>';
										}
										
							html +=	'</div>'; 
					  }
					  if(itm.BSKDXF){
						  html += '<div class="match_detail jzhg center mb10 clearfix">'+
										'<span class="rq pt1">大小分</span>';
										for(var j=0;j<itm.BSKDXF.wager.length;j++){
										   var bet = itm.BSKDXF.wager[j];
										   html += '<div class="opt_lq selected ' + self.getMixBetClass(bet,itm,'BSKDXF') + ' ">'+
								                   '<span><i class="font12">'+ bet +'</i><i>'+ itm.dxf +'</i> <i class="cc">' + itm.BSKDXF.odds[bet] + '</i></span></div>';
										}
										
						 html +=	'</div>'; 
					  }
					  if(itm.BSKSFC){
						  html += '<div class="match_detail jzhg center mb10 clearfix">'+
										'<span class="rq pt1">胜分差</span>';
										for(var j=0;j<itm.BSKSFC.wager.length;j++){
										   var bet = itm.BSKSFC.wager[j];
										   html += '<div class="opt_lq selected ' + self.getMixBetClass(bet,itm,'BSKSFC') + ' ">'+
								                   '<span><i class="font12">'+ bet +'</i> <i class="cc">' + itm.BSKSFC.odds[bet] + '</i></span></div>';
										}
						 html +=	'</div>'; 
					  }
					  /* -------------------------------------END 篮彩 -------------------------------- */
					  
		 html += '</div></div>';				
	  }
	  html += '	</div>'+
				'</div>'+
			'</div>'+
			//(obj.manner == '1' ?  '<p class="right w94"><a href="javascript:void(0);" data-id="'+ obj.lotteryId +'" data-t="goDetail" class="fontblue">奖金优化详情&gt;</a></p>' : '') +
			'<div class="w94">'+
				'<p class="font12 gray">上述赔率仅为投注时的参考值，非计奖赔率</p>'+
			'</div>'+
			'<div style="height:70px;"></div>';
	  return html;
  }

  hemaiDetailObj.getTotoBetHtml = function(obj){
	  var self = this;
	  var html = '<div class="detail_con jz_detail">'+
					//'<div class="listbg"></div>'+
					'<div class="listwrap">'+
						'<div class="lists">';
	  if(obj.wagerList && obj.wagerList.length > 0){
		  for(var i=0;i<obj.wagerList.length;i++){
			 var itm = obj.wagerList[i];
			 html += '<div class="libox clearfix">'+
						'<div class="fl font12 gray w15  center">'+
						    '<p style="height:35px;">'+ (itm.isAbs=='Y' ? '<span class="jzdan on"><em>胆</em></span>' : '') + '</p>'+
							'<p>第'+ itm.subOid +'场</p>'+
							'<p>' + itm.leagueName + '</p>'+
						'</div>'+	
						'<div class="w80 fr">'+
							'<p class="mb10 center detop clearfix">'+
								'<span>'+ itm.homeName + '</span>'+
		    (!itm.score ? (itm.bet_result == -1 ? '<span class="font12">延期</span>' : '<span class="font12">' + itm.match_time_q + '</span>') : '<span class="fontred"><strong>'+ itm.score+'</strong></span>')+
								
								'<span>' + itm.awayName + '</span>'+
							'</p>'+
							'<div class="match_detail zc_detail center clearfix">'+
								'<p class="opt_jz '+ self.getBetClass('3',itm) +'"><span><em class="font12 gray">主胜</em> '+ itm.odds[0] + '</span></p>'+
								'<p class="opt_jz '+ self.getBetClass('1',itm) +'"><span><em class="font12 gray">平</em> '+ itm.odds[1] + '</span></p>'+
								'<p class="opt_jz '+ self.getBetClass('0',itm) +'"><span><em class="font12 gray">客胜</em>'+ itm.odds[2] + '</span></p>'+
							'</div>'+
						'</div>'+
					'</div>';
		  }
	  }
	  html +=  '		</div>'+
				    '</div>'+
			     '</div>'+
		'<div style="height:70px;"></div>';
	  return html;
  }

  hemaiDetailObj.getMixBetClass = function(bet,itm,type){
	  //////console.log(arguments)
	  var cls = ''
	  if(type == 'FTBRQSPF'){
		 if(itm.bet_result == -1){
			 cls = 'on';
		 }else{
			 if(itm.brqResult){
				if(bet == itm.brqResult ){
					cls = 'on';	
				}else{
					cls = 'out';	
				}
			 }
		 }
		// ////console.log(cls);
	  }else if(type == 'FTSPF'){
		  if(itm.bet_result == -1){
			 cls = 'on';
		 }else{
			 if(itm.rqResult){
				if(bet == itm.rqResult ){
					cls = 'on';	
				}else{
					cls = 'out';	
				}
			 }
		 }
	  }else if(type == 'FTBF'){
		 if(itm.bet_result == -1){
			 cls = 'on';
		 }else{
			 if(itm.bfResult){
				if(bet == itm.bfResult ){
					cls = 'on';	
				}else{
					cls = 'out';	
				}
			 }
		 }  
	  }else if(type == 'FTBQC'){
		 if(itm.bet_result == -1){
			 cls = 'on';
		 }else{
			 if(itm.bqcResult){
				if(bet == itm.bqcResult ){
					cls = 'on';	
				}else{
					cls = 'out';	
				}
			 }
		 }  	  
	  }else if(type == 'FTJQS'){
		 if(itm.bet_result == -1){
			 cls = 'on';
		 }else{
			 if(itm.jsqResult){
				if(bet == itm.jsqResult ){
					cls = 'on';	
				}else{
					cls = 'out';	
				}
			 }
		 }  	  
	  }else if( type == 'BSKSF'){
		 if(itm.bet_result == -1){
			 cls = 'on';
		 }else{
			 if(itm.sfResult){
				if(bet == itm.sfResult ){
					cls = 'on';	
				}else{
					cls = 'out';	
				}
			 }
		 }  	  
	  }else if(type == 'BSKRFSF'){
		  if(itm.bet_result == -1){
			 cls = 'on';
		 }else{
			 if(itm.rfsfResult){
				if(bet == itm.rfsfResult ){
					cls = 'on';	
				}else{
					cls = 'out';	
				}
			 }
		 }  	  
	  }else if(type == 'BSKDXF'){
		  if(itm.bet_result == -1){
			 cls = 'on';
		 }else{
			 if(itm.dxfResult){
				if(bet == itm.dxfResult ){
					cls = 'on';	
				}else{
					cls = 'out';	
				}
			 }
		 }  	  
	  }else if(type == 'BSKSFC'){
		  if(itm.bet_result == -1){
			 cls = 'on';
		 }else{
			 if(itm.sfcResult){
				if(bet == itm.sfcResult ){
					cls = 'on';	
				}else{
					cls = 'out';	
				}
			 }
		 }  	  
	  }
	  return cls;
  }
  
   hemaiDetailObj.getBetClass = function(bet,itm){
	   var className = '';  
	   if($.inArray(bet, itm.wager) != -1){
		   className += ' selected';   
	   }
	   //if(itm.bet_result == -1){
	//	   className += 'on';
	  // }else{
		   if(itm.bet_result !==''){
			  if(itm.bet_result ==  bet){
				 className += ' on';  
			  }else if(itm.bet_result == -1){   //延期
				  if(className.indexOf('selected') != -1){
					  className += ' on'; 
				  }
			  }else{
				 className += ' out';
			  }
		   }
	   //}
	   return className;
   }
  
  
  	hemaiDetailObj.goPay = function(){
  		
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
  		
  		var data = {
			'lotteryType': this.lotteryType.toUpperCase(), 
			'lotteryNo' : this.lotteryNo, 
			'product_id' : this.productId,
			'product_type': this.productType,
			'pay_amount': this.overNum,
			'assure_amount': -1
		}
  		//console.log(data)
  		buyConfirmObj.goBack=function(){
  			buyConfirmObj.destroy();
  			hemaiDetailObj.show();
  		};
  		setTimeout(function(){
            buyConfirmObj.show(true, function () {
                buyConfirmObj.setData(data);
            });
		},300)   //防止未登录流程多页面连续切换，由动画延迟导致的切换问题 zhangw
	  //}

//    // 缓存购买数据
//    if (obj['product_id']) Global.setCache('confirm_product', obj);
//    if (obj['product_id']) Global.cache['confirm_product'] = obj;
  	}

	hemaiDetailObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
//		this.getData();
//		this.countdownTick();
	}

	hemaiDetailObj.setDefConfig = function(){
		this.overNum = 1;
		this.allNum = "";
		this.checkTipsShow = false;
		this.end_time = "";
		this.open = "";
		this.lotteryType = "";
		this.lotteryNo = "";
		this.productId = "";
		this.productType = "";
		
	}

	hemaiDetailObj.init = function(){
		hemaiDetailObj.onloadExecution();
		hemaiDetailObj.setDefConfig();
	}
	
	