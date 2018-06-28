
  var scorePrizeObj = new PageController({
	   'name': 'scorePrize',
	   'tpl' : 'template/activity/scorePrize.html'
    });

  scorePrizeObj.createDomObj = function(){
    this.wrapperObj = $("#scorePrize_wrapperObj");
  }

  scorePrizeObj.createEvent = function(){
    this.wrapperObj.tap(function(e){
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "back" : scorePrizeObj.goBack();return true;
        }        
      }
	  var aObj = $.oto_checkEvent(e,"A");
      if(aObj){
        var thisObj = $(aObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "start" : scorePrizeObj.checkLogin();return true;
		  case 'closeTip': $('#scorePrize_alertTip').html('').hide();return true;
		  case 'sendPrize' : scorePrizeObj.goSendPrize(thisObj);return true;
		  case 'myPrize' : scorePrizeObj.goScorePrizeRecord();return true;
		  case 'share' : scorePrizeObj.share();return true;
		  case 'sharePrize' : scorePrizeObj.sharePrize();return true;
        }        
      }
     
    });
  }
  
  scorePrizeObj.goScorePrizeRecord = function(){
	  if(loginObj.isLogin){
		  scorePrizeRecordObj.goBack = function(){
			 scorePrizeRecordObj.destroy();
			 scorePrizeObj.show();  
		  }
		  scorePrizeRecordObj.show();
	  }else{
		  $.alertMsg('请先登录');
		  loginObj.goForward = function(){
			scorePrizeObj.show('reload',function(){
				scorePrizeObj.getData(-1);	
			}); 
		  }
		  loginObj.goBack = function(){
			  scorePrizeObj.show();  
		  }
		  loginObj.show();
	  }
  }
  
  scorePrizeObj.share = function(){
	  var obj = {
		//'url': ConfigObj.touchWebSite  + 'System/DownLoad/page?sharefrom=app',  
		//'url' : ConfigObj.touchWebSite  + 'activity/luckDraw',
		'content' : '套路少一点，真诚多一点，现在注册就送抽奖积分，快来试试手气吧！ ',
		'title' : '幸运大转盘，好礼送不断。',
		'imagePath' : ConfigObj.touchWebSite + 'Public/images/luckydraw_1.png',
		'domId': 'scorePrize'
	  }
	  Global.socialShare(obj);
  }
  
  scorePrizeObj.sharePrize = function(){
	    var obj = {
			//'url': ConfigObj.touchWebSite  + 'System/DownLoad/page?sharefrom=app',  
			//'url' : ConfigObj.touchWebSite  + 'activity/luckDraw',
			'content' : '我在广东体彩云客户端参加积分抽奖中奖啦，小伙伴们速速来围观! ',
			'title' : '幸运大转盘，我中奖啦！',
			'imagePath' : ConfigObj.touchWebSite + 'Public/images/luckydraw_1.png',
			'domId': 'scorePrize'
		  } 
		  Global.socialShare(obj);
  }
  
  scorePrizeObj.goSendPrize = function(obj){
	 var self = this;
	 $('#scorePrize_alertTip').hide();
	 var dataObj = self.prizeInfo; 
	 sendPrizeObj.goBack = function(){
		sendPrizeObj.destroy();
		self.show(); 
	 }
	 sendPrizeObj.show('',function(){
		sendPrizeObj.getData(dataObj); 
	 })
  }
  
  
  scorePrizeObj.getData = function(id){
	  var self = this;
	  self.id = id;
	  $.ajax({
			url : ConfigObj.localSite + '?version=1&m=user.activity.luckyDrawInfo',
			data : {'id': id, 'access_token':loginObj.access_token},
			dataType : "json",
			type : "post",
			success : function(msg){
//				//console.log('抽奖活动初始化信息返回',msg);
				scorePrizeObj.hideLoading();
				if(msg.code == '0000'){
					self.id = msg.info.activeId;
					self.info = msg.info;
					self.chance = msg.info.chance;
					self.formatHtml(msg.info,true);
					$('#scorePrize_share').show();
				}else{
					$.alertMsg(msg.code_str);
					$('#scorePrize_share').hide();
				}
			},
			failure: function(){
				scorePrizeObj.hideLoading();	
			}
		});
  }
  
  scorePrizeObj.formatHtml = function(obj,isInit){
	 if(loginObj.isLogin){
		$('#scorePrize_chance').html(obj.chance + '次机会').show(); 
		$('#scorePrize_title').addClass('multirow');
	 }else{
		$('#scorePrize_chance').hide(); 
		$('#scorePrize_title').removeClass('multirow');
	 }
	 if(isInit && obj.prizeLevel){
		//$('#scorePrize_circle').css('background-image','url(' + obj.activePic + ')'); 
		var html = '';
		for(var i=0;i<obj.prizeLevel.length;i++){
			var itm = obj.prizeLevel[i];
			html += '<p class="g-pos g' + (i+1) + '">';
			if(itm.prizeName == '0'){
				html += '<em>'+ itm.prizeLevelText + '</em>'	
			}else{
				html += '<span>'+ itm.prizeLevelText  +'</span>'+
						'<span>' + itm.prizeName + (itm.prizeTypeText!='实物' ? itm.prizeTypeText : '') +  '</span>';
			}
			html += '</p>'
		}
		$('#scorePrize_circle').html(html);
	 }
	 if(obj.rule){
		//console.log(obj.rule);
		$('#scorePrize_rules').html(obj.rule); 
		if(ConfigObj.platForm == 'ios'){
		   	$('#scorePrize_rules').append('<p>本次活动由天天中彩发起，与苹果公司(apple.com)无关</p>');
		}
	 }
	 if(obj.recentPrizeList && obj.recentPrizeList.length){
		var html = '';
		var arr = obj.recentPrizeList;
		for(var i=0;i<arr.length;i++){
			html += '<li>'+ arr[i] + '</li>';	
		}
		$('#scorePrize_list1').html(html);
		if(arr.length >= 3){
			setTimeout(function(){ scorePrizeObj.initScroll();},1500);
		}
	 }
  }
  scorePrizeObj.initScroll = function(){
	   var self = this;
	   this.box = document.getElementById('scorePrize_box');
	   this.list1 = document.getElementById('scorePrize_list1');
	   this.list2 = document.getElementById('scorePrize_list2');
	   if(this.list1 && this.list2){
		   this.list2.innerHTML = this.list1.innerHTML;
		   if(this.marque){
			  clearInterval(scorePrizeObj.marque); 
		   }
		   this.marque = setInterval(function(){
			   self.scrollFun()
		   }, self.speed);
	   }
		 
   }
	  
   scorePrizeObj.scrollFun = function(){
	   if(this.list2.offsetTop-this.box.scrollTop <= 24){
		  this.box.scrollTop -= this.list1.offsetHeight
	   }else{
		  this.box.scrollTop +=1;
	   }
  }
  
  scorePrizeObj.checkLogin = function(){
	 var self = this;
	 if(loginObj.isLogin){
		self.startFun();
		$('#scorePrize_btn').addClass('disabled');
	 }else{
		$.alertMsg('请先登录');
		loginObj.goForward=function(){
			self.show('reload',function(){
				self.getData(-1);	
			});
		}
		loginObj.goBack=function(){
			self.show();
		}
		loginObj.show();
	 }
  }
  
  scorePrizeObj.hideLoading = function(){
	   $('#scorePrize_loading').hide();
	   $('#scorePrize_content').show();
  }
  
  scorePrizeObj.startFun = function(){
	 var self = this;
	 if($('#scorePrize_btn').hasClass('disabled')) return false;
	 $.ajax({
		  url : ConfigObj.localSite + '?version=1&m=user.activity.luckyDrawJoin',
		  data : {'id': self.id, 'access_token':loginObj.access_token},
		  dataType : "json",
		  type : "post",
		  success : function(msg){
			  //console.log('抽奖请求返回',msg);
			 /* msg = {      //测试代码 zhangw
				 code : '0000',
				 info : {
					//prizeLevel : Math.round(Math.random() * (6-1) +1),
					prizeLevel : 1,
					chance : 500,
					getprizeid: "1473319629980f87a9c55-dc02-4374-a479-8a7e252c52dd-4",
					prizeid : 4,
					status : 'open',
					prizeLevelText :'一等奖',
					prizeName :'一瓶红酒'
				 }
			  }*/
			  if(msg.code == '0000'){
				 self.chance = msg.info.chance;
				 self.prizeInfo = msg.info;
				 self.rotate(msg.info.prizeLevel);
				 self.rotNum +=1 ;
				 setTimeout(function(){
					$('#scorePrize_btn').removeClass('disabled');
				 	$('#scorePrize_chance').html(msg.info.chance + '次机会').show(); 
					if(msg.info.prizeLevel == 6 && msg.info.win == 0){  //未中奖
						self.showFailTip(msg.info);
					}else{
						self.showSucTip(msg.info);
					}
					self.formatHtml(msg.info); //更新中奖信息
				 },6700)
			  }else{
				  $('#scorePrize_btn').removeClass('disabled');
				  if(msg.code == '-1002'){    
					  self.showErrorTip('积分余额不足');   //余额不足
				  }else if(msg.code == '-1013'){ 
					  self.showErrorTip('抽奖活动已经结束');   //过期
				  }else{
					 $.alertMsg(msg.code_str);  
				  }
			  }
		  }
	});
  }
  
  
  scorePrizeObj.showSucTip = function(obj){
	  var prizeHtml = '';
	  if(obj.prizeType != 'score'){
		  prizeHtml =  '<div class="coupon-box mb10">'+
							'<span class="cop1">'+ obj.prizeLevelText  +'</span>'+
							'<span class="cop2">'+ obj.prizeName +'</span>'+
						'</div>'+
						'<p class="gray mb10 font12">已放入【我的奖品】</p>'+
						'<a href="javascript:void(0);" class="btn btn_big sm" data-t="sendPrize" data-prizeid="'+ obj.prizeid +'" data-getprizeid="'+ obj.getprizeid +'" data-status="'+ obj.status +'">马上领取</a>';
	  }else{
		  prizeHtml = '<div class="coupon-box mb30">'+
						'<span class="cop1">'+ obj.prizeLevelText  +'</span>'+
						'<span class="cop2">'+ obj.prizeName + obj.prizeTypeText +'</span>'+
					 '</div>'+
					 '<a href="javascript:void(0);" class="btn btn_big sm" data-t="sharePrize">晒中奖</a>'
	  }
	  
	  var html = '<div class="tckwrap">'+
					'<div class="tckbox winbox">'+
						'<a href="javascript:void(0)" data-t="closeTip"><span class="close">×</span></a>'+
						'<div class="tit">'+
							'<p>中奖啦 !</p>'+
						'</div>'+
						'<div class="tckcon center">'+
							prizeHtml
						'</div>'+
					'</div>'+
				'</div>';
	  
	  $('#scorePrize_alertTip').html(html).show();  
  }
  
  scorePrizeObj.showFailTip = function(){
	 var html = '<div class="tckwrap">'+
					'<div class="tckbox winbox">'+
						'<a href="javascript:void(0)" data-t="closeTip"><span class="close">×</span></a>'+
						'<div class="tit">'+
							'<p>未中奖 !</p>'+
						'</div>'+
						'<div class="tckcon center">'+
							'<span class="sad-img"></span>'+
							'<p class="sad-txt">谢谢参与</p>'+
						'</div>'+
					'</div>'+
				'</div>';
	  $('#scorePrize_alertTip').html(html).show();    
  }
  
  scorePrizeObj.showErrorTip = function(type){
	     var html = '';
		 html = '<div class="tckwrap">'+
					'<div class="tckbox">'+
						'<a href="javascript:void(0)" data-t="closeTip"><span class="close">×</span></a>'+
						'<div class="tckcon center">'+
							'<p>'+ type +'</p>'+
							'<div class="waybox font12">'+
								'<p class="tit">赚取积分方法：</p>'+
								'<p>'+
									'1、每天登录APP奖励积分<br />'+
									'2、连续7天登录会额外奖励积分<br />'+
									'3、分享活动页面奖励积分'+
								'</p>'+
							'</div>'+
							'<a href="javascript:void(0);" class="btn btn_big sm" data-t="closeTip">知道啦</a>'+
						'</div>'+
					'</div>'+
				'</div>';
		$('#scorePrize_alertTip').html(html).show();  
	 
  }
  
  scorePrizeObj.rotate = function(level){
	    if(typeof level == 'undefined') level = 6;
	    var self = this;
	    var angles = self.getAngles(level);
	    var degValue = 'rotate('+angles+'deg'+')';
		$('#scorePrize_circle').css('-o-transform',degValue);           //Opera
		$('#scorePrize_circle').css('-moz-transform',degValue);         //Firefox
		$('#scorePrize_circle').css('-webkit-transform',degValue);      //Chrome和Safari
		$('#scorePrize_circle').css('transform',degValue); 
  }
  
  scorePrizeObj.getAngles = function(num){
	    //console.log('奖级 :' + num);
	    var self = this;
	    var angles = 2160;
	    if (num == 1 ) {  //1等奖
			angles = 2160 * self.rotNum  + 1800;
			//console.log(angles);
		}else if ( num == 6 ) {  //谢谢参与
			angles = 2160 * self.rotNum   + 1860;
		}else if ( num == 5 ) {
			angles = 2160 * self.rotNum + 1920;
		}else if ( num == 4 ) {
			angles = 2160 * self.rotNum  + 1980;
		}else if ( num == 3 ) {
			angles = 2160 * self.rotNum  + 2040;
		}else if ( num == 2 ) {
			angles = 2160 * self.rotNum  + 2100;
		}  
		return angles;
  }
  

  scorePrizeObj.onloadExecution = function(){
    this.setDefConfig();
	this.createDomObj();
    this.createEvent();
  }

  scorePrizeObj.init = function(){
      scorePrizeObj.onloadExecution();
  }
  
  scorePrizeObj.goBack = function(){
	  	
  }
	
  scorePrizeObj.setDefConfig = function(){
	  this.id = '';
	  this.info = ''; 
	  this.chance = 0; 
	  this.prizeInfo = {};
	  this.rotNum = 0;
	  if(this.marque){
		 clearInterval(scorePrizeObj.marque); 
	  }
	  this.marque = '';
	  this.speed = 80;
  }
   
  scorePrizeObj.dirShow = function(obj){
		var self = this;
		self.show('reload',function(){
			self.getData(obj.id);	
		});  
  }

