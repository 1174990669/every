
  var projectDetailObj = new PageController({
	   'name': 'projectDetail',
	   'tpl' : 'template/record/projectDetail.html'
    });
 // projectDetail_wrapA pay
  projectDetailObj.createDom = function(){
    this.wrapperObj = $("#projectDetail_wrapperObj");
	this.wrapA = $('#projectDetail_wrapA');   //方案状态相关
	// this.wrapF = $('#a_fuk');   //方案状态相关 pay
	this.wrapB = $('#projectDetail_wrapB');   //方案内容相关
	this.wrapC = $('#projectDetail_wrapC');   //继续守号相关
	this.wrapD = $('#projectDetail_wrapD');   //方案编号相关
  }

  projectDetailObj.createEvent = function(){
    this.wrapperObj.unbind('tap').tap(function(e){
      var aObj = $.oto_checkEvent(e,"A");
      if(aObj){
        var thisObj = $(aObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "bet" : projectDetailObj.goAllBet();return true;
		  case "qp" : projectDetailObj.goGetTicket(thisObj);return true;
		  case "goDetail" : projectDetailObj.goDetail(thisObj);return true;  //奖金优化详情
		  case 'sendStation': projectDetailObj.sendStation(thisObj);return true;  //找客服
		  case 'hideTip': $('#projectDetail_sucTip').hide();return true;
		  case 'goStation': projectDetailObj.goStation();return true;
		  case "pay2"  : projectDetailObj.postPay(aObj);return true;
        }
      }
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "backbtn" : projectDetailObj.goBack();return true;
        }
      }
	  var spanObj = $.oto_checkEvent(e,"SPAN");
      if(spanObj){
        var thisObj = $(spanObj);
        var thisT = thisObj.attr("data-t");
        // console.log(thisT)
        switch(thisT){
          case "fail" : projectDetailObj.showFail(thisObj);return true;
          case "pay"  : projectDetailObj.postPay(thisObj);return true;
        }
      }
	  
      var LIObj = $.oto_checkEvent(e,"LI");
      if(LIObj){
        var thisObj = $(LIObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "st"   : projectDetailObj.goSubDetail();return true;
        }
      }
    });
	
	this.wrapperObj.dropload({  
			scrollArea : window,
			distance : this.pullDistance || 200,
			loadUpFn:function(me){
				projectDetailObj.getData(projectDetailObj.product_id);
				me.resetload();
			}
	 })   
  }
  
  //奖金优化详情
  projectDetailObj.goDetail = function(obj){
	  var id = obj.attr('data-id');
	  prizeReviewDetailObj.goBack = function(){
		 prizeReviewDetailObj.destroy();
		 projectDetailObj.show();  
	  }
	  prizeReviewDetailObj.show('reload',function(){
		   prizeReviewDetailObj.setData(id);
		   prizeReviewDetailObj.getData(); 
	  });
  }
  
  projectDetailObj.goGetTicket = function(obj){
    var id = obj.attr('data-v');
	qupiaoPwdObj.goBack=function(){
		qupiaoPwdObj.destroy();
		projectDetailObj.show();	
	}
	qupiaoPwdObj.show('reload',function(){
		var arr = [];
		arr.push(id);
		qupiaoPwdObj.setData(arr);
	})
  }

  projectDetailObj.goSubDetail = function(){
	 
    var pid = this.product_id;
	if(this.lotteryInfo.consignType == 'save'){  //保存
		ticketDetailObj.goBack = function(){
		 ticketDetailObj.destroy();
		 projectDetailObj.show();  
	  }
	  ticketDetailObj.show('reload',function(){
		 ticketDetailObj.setData(pid,'save');
		 ticketDetailObj.getData();  
	  });
	}else{
		projectSubDetailObj.goBack=function(){
			projectSubDetailObj.destroy();
			projectDetailObj.show();	
		}
		projectSubDetailObj.show('reload',function(){
			projectSubDetailObj.getData(pid);	
		});
	}
  }
 
  //点击待付款
  projectDetailObj.postPay = function(obj){
     var pid = obj.attr("data-p");
     var money = obj.attr("data-m");
     var postData = {
		 'product_id' : pid,
		 'pay_amount' : money,
		 'lotteryType' : this.lotteryType.toLowerCase() 
	 }
	 ty = this.lotteryType.toLowerCase()
	 projectSubDetailObj.formatljzf()
	 // console.log(postData)
	 buyConfirmObj.goBack=function(){
		 Global.GC();
		 homeObj.show(); 
	 }
	 buyConfirmObj.show('reload',function(){
		 buyConfirmObj.setData(postData); 
	 })
  }

  projectDetailObj.showFail = function(obj){
    if(obj.hasClass('showObj')){
      obj.removeClass('showObj')
      obj.next().hide();
    }else{
      obj.addClass('showObj')
      obj.next().show();
    }
  }
  
  projectDetailObj.goAllBet = function(){
	 if(this.isNumLottery()){
		this.goBet(); 
	 }else{
		var type = this.lotteryInfo.lotteryType;
		var subType = this.lotteryInfo.lotterySubType;
		Global.GC();
		if(type == 'FTFH' && subType != 'jz2x1'){
		   soccerMixObj.goBack = function(){
			  soccerMixObj.destroy();
			  homeObj.show();	   
		   }
		   soccerMixObj.show('reload',function(){
			soccerMixObj.getData(); 
		   });
		}else if(type == 'FTFH' && subType == 'jz2x1'){
		   soccer2x1Obj.goBack = function(){
			  soccer2x1Obj.destroy();
			  homeObj.show();   
		   }
		   soccer2x1Obj.show('reload',function(){
			  soccer2x1Obj.getData(); 
		   })
		}else if(type == 'SPF9'){
			soccerR9Obj.goBack = function(){
				soccerR9Obj.destroy();
				homeObj.show(); 
			}
			soccerR9Obj.show('reload',function(){
				soccerR9Obj.getData(); 
			})
		}else if(type == 'SPF14'){
			 soccerTotoObj.goBack = function(){
				soccerTotoObj.destroy();
				homeObj.show(); 
			 }
			 soccerTotoObj.show('reload',function(){
				soccerTotoObj.getData(); 
			 })
		}else if(type == 'BSKFH'){
			 basketMixObj.goBack = function(){
				basketMixObj.destroy();
				homeObj.show(); 
			 }
			 basketMixObj.show('reload',function(){
				basketMixObj.getData(); 
			 })	
		}
	 }
  }
  
  
  //继续守号
  projectDetailObj.goBet = function(){
	 var self = this;
	 var wagerStore = self.lotteryInfo.wagerStore;
	 var nowLotteryNo = self.lotteryInfo.nowLotteryNo;
	 var lotteryType = self.lotteryInfo.lotteryType.toLowerCase();
	 if(!wagerStore || !lotteryType || !nowLotteryNo){
        $.alertMsg("数据错误");
        return false;
     }
	 var wagerArr = wagerStore.split(";");  
	 for(var i=0;i<wagerArr.length;i++){ //高频胆拖 zhangw
		if( wagerArr[i].indexOf('$') >=0 && (lotteryType == ConfigObj.fastLotType || lotteryType == ConfigObj.fastK3Type)){
			var temA  = wagerArr[i].split('|');
			temA[temA.length -2] = temA[temA.length -2] + '_D';
			//temA[temA.length -2] = temA[temA.length -2].replace(/\D$/,'_D');
			wagerArr[i] = temA.join('|');
		}
		var betArr = wagerArr[i].split("|");
		//console.log(betArr);
		//console.log(betArr[1]);
		var nowLotteryPlay = betArr[1];
		if(wagerArr[i].indexOf('TXD2') != -1){
			wagerArr[i] = wagerArr[i].replace(/\:/g,'|');	
		}
	 }
	 var wagetTem = new Array();
	 for(var i=0,ilen=wagerArr.length;i<ilen;i++){
		if(this.lotteryType != ConfigObj.fastK3Type){
			wagerArr[i] = wagerArr[i].replace(/\+/g,"|");
		}
		if(wagerArr[i].indexOf("$")<0)continue;
		var betArr = wagerArr[i].split("|");
		for(var k=0,klen=betArr.length;k<klen;k++){
		  if(betArr[k].indexOf("$")<0) continue;
		  var data = betArr[k].split("$");
		  var temdata = new Array();
		  var danArr = data[0].split(",");
		  for(var d=0,dlen=danArr.length;d<dlen;d++){
			temdata.push("d-"+danArr[d]);
		  }
		  data[0] = temdata.join(",");
		  betArr[k] = data.join(",");
		}
		wagerArr[i] = betArr.join("|");
	  }
	  var wagerData = wagerArr.join(";");
	  

	  if(wagerData.length > 800){
		$.alertMsg("当前方案太复杂暂不支持");
		return false;
	  }
	 //先清空旧有数据
	 window.localStorage.removeItem(lotteryType + 'lotteryBetData');
	 window.localStorage.removeItem(lotteryType + 'lotteryAllBetData');
	 window.localStorage.removeItem(lotteryType + 'MulAndPer');
	 
	 //路由待优化 zhangw
//	 //console.log(self.lotteryInfo);
	 var confirmData = {
			'lotteryType': lotteryType,
			'lotteryCnName': self.lotteryInfo.lotteryTypeCn,
			'lotteryNo' : nowLotteryNo,
			'lotteryPlay': nowLotteryPlay
	 }
	 //console.log(confirmData);
	 Global.GC();
//	 //console.log('数字彩守号wagerStore', wagerData);
	 window.localStorage.setItem(lotteryType + "lotteryBetData", wagerData);
	 var betType = lotteryType;

      if (ConfigObj.syx5Type.indexOf(lotteryType) !== -1) {
          ConfigObj.fastLotType = lotteryType;
          betType = 'fastBet';
      }
		//console.log(ConfigObj.fastK3Type);
	 if(lotteryType == ConfigObj.fastK3Type){
	 	betType = 'fastK3'; 
	 }

      window[betType + 'ConfirmObj'].show('reload',function(){
          window[betType + 'ConfirmObj'].setData(confirmData)
          //projectDetailObj.destroy();
      });

	 window[betType + 'ConfirmObj'].goBack = function(){
		  window[betType + 'Obj'].show('reload');
	 }
	 window[betType + 'Obj'].goBack = function(){
		  Global.GC();
		  homeObj.show(); 
	 }
  }

  projectDetailObj.onloadExecution = function(){
    this.createDom();
    this.createEvent();
  }

  projectDetailObj.init = function(){
      projectDetailObj.onloadExecution();
  }
  
  projectDetailObj.setDefConfig = function(){
	 this.product_id = '';   //方案id 
	 this.lotteryType = '';
	 this.lotteryInfo = ''; 
	 this.routeArr = [];
	 this.addExtHeight = false;
	 this.firstFix = false;
  }
  
  projectDetailObj.getData = function(id){
	  var self = this;
	  self.product_id = id;  //方案id  请求方案数据，生成html  
//	  //console.log('方案详情project_id : ' + projectDetailObj.product_id);
	  var postData = {
		 'pid': id
	  }
	  //console.log(postData);
	  var secretData = {
	  	'para': Global.encrypt(postData),
	  	'access_token': loginObj.access_token
	  }
	  $.ajax({
		url : ConfigObj.localSite +  '?version=1&m=user.project.index',
		type:'post',
		data: secretData,
		dataType:'json',
		success:function(obj){
				// console.log('方案详情返回数据: ', obj);
				if(obj.code == '0000'){
					obj.info = $.parseJSON(Global.crypt(obj.info));
					self.lotteryInfo = obj.info;
					self.lotteryType = obj.info.lotteryType.toLowerCase();
					self.formatHtmlA(obj.info);
					self.formatHtmlB(obj.info);
					self.formatHtmlC(obj.info);
					self.formatHtmlD(obj.info);
					self.addResultHeight();
					projectSubDetailObj.formatljzf(self.lotteryType)
				}else{
					$.alertMsg(obj.code_str);
				}
			}
	  })
  }
  
  projectDetailObj.addResultHeight = function(){
	 if(this.addExtHeight){
		var box = $('#projectDetail .jsCalcHeight');
		for(var i=0,len=box.length;i<len;i++){
			var height = parseInt($(box[i]).css('top'),10);
			if(height){
				var newHeight = height + 80;
				$(box[i]).css({'top':newHeight});
			}
		}
		this.firstFix = true;
		this.addExtHeight = false;
	 }
  }
  
  projectDetailObj.getPrizeHtml = function(obj){
	 var html = '';
	 if(this.lotteryInfo.consignType == 'save'){
		  if(obj.prizeStatus=='Not'){
			  html += '<span class="fr posi_span">待开奖</span>';
		 }else if(obj.prizeStatus=='Open' || obj.prizeStatus=='Prize'){
			  if(obj.rawPrize > 0){
				  var prizeCls = obj.rawPrize > 0 ? 'fr fontred' : 'fr gray';
				  html += '<span class="' + prizeCls + '">';
				  if(obj.netPrize>0){
					  if(obj.netPrize>=10000){
						  html += '<strong>大奖'+ obj.netPrize + '</strong>';	
					  }else{
						  html += '<strong>中奖'+ obj.netPrize + '</strong>';	
					  }
				  }
				  html += '</span>';
			  }else if(obj.netPrize == 0){
				  html += '<span class="fr gray posi_span"><strong>未中奖</strong></span>	';
			  }
		}
	 }else{
		 if(obj.prizeStatus=='Not'){
			  if(obj.desc == 	"出票成功" || obj.desc =="部分成功"){
				  html += '<span class="fr posi_span"><strong>待开奖</strong></span>';
			  }else{
				  html += '<span class="fr posi_span">待开奖</span>'; 
			  }
		 }else if(obj.prizeStatus=='Open' || obj.prizeStatus=='Prize'){
			  if(obj.netPrize > 0){
				  var prizeCls = ((obj.desc=="出票成功" || obj.desc=="部分成功") && obj.realPrize) > 0 ? 'fr fontred' : 'fr gray';
				  html += '<span class="' + prizeCls + '">';
				  if(obj.realPrize>0){
					  if(obj.netPrize>=10000){
						  html += '<strong>大奖'+ obj.netPrize + '</strong>';	
					  }else{
						  html += '<strong>中奖'+ obj.netPrize + '</strong>';	
					  }
				  }else{
					  if(obj.netPrize>=10000){
						  html += '<strong>大奖'+ obj.netPrize + '</strong>';	
					  }else{
						  html += '<strong>中奖'+ obj.netPrize + '</strong>';	
					  }	
				  }
				  html += '</span>';
			  }else if(obj.netPrize == 0){
				  html += '<span class="fr gray posi_span"><strong>未中奖</strong></span>	';
			  }
		}
	 }
	 return html;  
  }
  
  projectDetailObj.formatHtmlA = function(obj){
  	// console.log(obj)
	  // var html1 = '';
	  var self = this;
	  var html = '<li class="clearfix font12">'+
					  '<p class="fl">'+
						  '<span class="font14">'+ obj.lotteryTypeCn + ' ' +  obj.lotteryNo +'期</span>'+
					  '</p>'+
					  '<p class="fr font12">订单编号：'+ obj.lotteryId + '</p>'+
				  '</li>'+
				  '<li class="clearfix pr35 font12"  data-t="st" data-p="'+ obj.lotteryId + '">'+
					  '<p class="clearfix mb10">'+
						  '<span class="fl fontred">'+
							  '投注金额：￥'+ obj.totalMoney + 
							  (obj.desc == '部分成功' ? ' (出票￥' + obj.realMoney + ')'  : '') +
						  '</span>';
	html += this.getPrizeHtml(obj);
	html += '</p>';
	html += '<p class="clearfix">';
	html += self.getTicketHtml(obj) ; 
	// console.log(self.getTicketHtml(obj))
	html += '<span class="fr pos_fix" ' + (obj.canbuy== 'Y' ? ' data-t="pay" ' : '') + ' data-p="' + obj.lotteryId + '" data-m="' + obj.totalMoney + '" >';
	//html += '<span class="fr" >'; 
	html += self.getBuyStatusHtml(obj);
	html += '</span>';
	html +=	'</p>'+
			// '<span class="arrowbox"><em class="rtarrow icon"></em></span>'+
	 			'<span class="arrowbox"><em class="rtarrow icon"></em></span>'+
			 '</li>';
	if(this.isNumLottery() && obj.lotteryResult ){
		html += '<li class="clearfix">'+
					'<p class="mb8">开奖号码</p>'+
					'<p class="kjlist clearfix">'+ (this.isFastLottery() ? projectDetailObj.getFastResultHtml(obj.lotteryResult) : obj.lotteryResult) + '</p>'+
				'</li>';
		if(!this.firstFix){
			this.addExtHeight = true;  //为了模拟滚动条额外计算高度[有没有彩果高度不一样] 等待付款
		}
	}			
	this.wrapA.html(html);	  
  }
  
  projectDetailObj.getBuyStatusHtml = function(obj){
  	// console.log(obj)
	var html = '';
	//html += '<em>票样详情</em><em class="arrow arrow_2"></em>'; 
	if(obj.consignType == 'save'){
		html += '<em>票样详情</em><em class="arrow arrow_2"></em>';
	}else{
		html += '<em ';
		if(obj.desc == '等待付款'){
			html += ' class="fontblue"';	
		}else if(obj.desc == '出票失败'){
			html += ' class="fontred"';
		}
		html += ' >';
		if (obj.desc == '等待付款') {
			html += '立即支付';
		}else{
			html += obj.desc;
		}
		// html += obj.desc;
		html += '</em>';  
	}
	return html;
  }
  
  projectDetailObj.getTicketHtml = function(obj){
	var html = '';
	/*if(obj.consignType != 'save'){  //购买的方案显示出票情况
		html += '<span class="fl"><em class="gray">取票情况：</em>';
		if(obj.getTicketSelf == "Y"){
			if(obj.desc=="出票失败" || obj.desc=="等待出票"){
				html += '<em class="gray">取票</em>';	
			}else if(obj.desc=="出票成功" || obj.desc=="部分成功"){
				if(obj.optstatus_desc == "已过期"){
					html += '<em class="gray">已过期</em>';
				}else if(obj.optstatus_desc == "已完成"){
					html += '<em class="gray">已取完</em>';	
				}else{
					html += '<a data-t="qp" id="projectDetail_qpObj" data-v="'+ obj.get_ticket_order_id+ '" href="javascript:void(0);" class="fontblue">取票</a>';	
				}
			}
		}else{
			html += '不取票';
		}
		html += '</span>';
	}else{    //保存方案 */
		html += '<span class="fl"><em class="gray">注数倍数：</em>';
		html += '<em>' + obj.wagerCount + '注' + obj.wagerMultiple + '倍</em>';	
		html += '</span>';
	//}
	return html;
  }
  
  projectDetailObj.isFastLottery = function(){
	  var arr = ['tjsyy','gd11x5', 'gx11x5','hub11x5','jx11x5','xj11x5', 'sd11x5', 'gxk3','jxk3','jlk3'];
	  var type = this.lotteryType;
	  if($.inArray(type,arr) != -1){
			return true;  
	  }
	  return false;
  }
  
  projectDetailObj.getFastResultHtml = function(obj){
	  var html = '';
	  
	  if(obj.bet_result_list){
	  	
	  	var aaa = obj.bet_result_list[0];
		  if(aaa.indexOf(';') > -1){
		  	var bbb = new Array;
		  	bbb = aaa.split(";");
		  	obj.bet_result_list = bbb;
		  }
//	  	console.log(obj.bet_result_list)
		  for(var i =0;i<obj.bet_result_list.length;i++){
			 html += '<span class="ball redball">'+ obj.bet_result_list[i]  +'</span>'  
		  }
	  }
	  return html;
  }
  
  
  projectDetailObj.formatHtmlB = function(obj){
	  var html = ''
	  if(this.isNumLottery()){  //包括高频
//	  	console.log(ConfigObj.fastK3Type);
		   if(!this.isFastLottery() || this.lotteryType == 'jxk3' || this.lotteryType == 'jlk3'){   //普通数字彩
			   // 快三的方案详情已经用 PHP 生成好了
			   // console.log(obj.wagerList)
	  	   		html = '<div class="betlist detail_con">'+
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
	  this.wrapB.html(html);
	 
  }
  
  projectDetailObj.formatHtmlC = function(obj){
  	// console.log(obj)
  	var html1 = '';
	  if(this.isNumLottery() && ConfigObj.from != 'ios'){
	// console.log(html1)
		  var html = '<a href="javascript:void(0)" data-t="bet">继续守号</a>';
//		  if(loginObj.userInfo && loginObj.userInfo.user_type == 'Normal'){
//			  html +=  '<a href="javascript:void(0)" data-t="sendStation" class="spe">找店主</a>';
//		  }
		  this.wrapC.html(html).show();
	  }else{
		  if(this.lotteryInfo.manner == '1' || this.lotteryInfo.manner == '3' ){  //manner:1 竞彩混关奖金优化 manner:3 竞彩2选1奖金优化
			 var html = '<a   href="javascript:void(0)" data-t="bet">继续选号</a>'+
  			            '<a  href="javascript:void(0);" class="spe"  data-t="goDetail"  data-id="'+ this.lotteryInfo.lotteryId +'">奖金优化</a>';  
		  }else{
			 var html =  '<a  class="fontblue" href="javascript:void(0)" data-t="bet">继续选号</a>';
		  }
//		  if(loginObj.userInfo && loginObj.userInfo.user_type == 'Normal'){
//			  html +=  '<a href="javascript:void(0)" data-t="sendStation" class="spe">找店主</a>';
//		  }
		  this.wrapC.html(html).show();
	  }
	  var rate = Math.round(100/this.wrapC.find('a').length)-1 + '%';
	  this.wrapC.find('a').css({'width': rate});
  }
  //user.project.index
  projectDetailObj.formatHtmlD = function(obj){
	 var self = this;
	 var html = '';
	 if(self.isNumLottery()){
		var html = '<p class="detail_tit clearfix">'+
						'<span class="fl">方案内容</span>'+
						'<span class="fr font12"><em class="gray"> 共'+ obj.wagerCount+'注 '+ obj.wagerMultiple+'倍 </em></span>'+
				   '</p>'; 
	 }else if(self.isSportLottery()){
		var html = '<p class="detail_tit clearfix">'+
						'<span class="fl">投注信息</span>'+
						'<span class="fr font12">'+ obj.matchCount +'场 '+ obj.passTypeCn +  '</span>'+
					'</p>';
	 }else if(self.isTotoLottery()){
		 var html = '<p class="detail_tit clearfix">'+
						'<span class="fl">投注信息</span>'+
						'<span class="fr font12">'+ obj.wagerCount +'注 '+ ' ' + obj.wagerMultiple+'倍</span>'+
					'</p>';
	 }
	 this.wrapD.html(html);
	 // console.log(this.wrapD.html(html))
  }
  
  //获取高频投注内容
  projectDetailObj.getFastBetHtml = function(obj){
	  var self = this;
	  var redballs = obj.lotteryResult && obj.lotteryResult.bet_result_list  ? obj.lotteryResult.bet_result_list : [];   
	  var fc2_redballs = obj.lotteryResult && obj.lotteryResult.bet_result_list ? obj.lotteryResult.bet_result_list.slice(0,2) : [];  
	  var fc3_redballs = obj.lotteryResult && obj.lotteryResult.bet_result_list ? obj.lotteryResult.bet_result_list.slice(0,3) : []; 
	  var html = '<div class="betlist detail_con">'+
					//'<div class="listbg"></div>'+
			        '<div class="listwrap"><div class="lists font12">';
	  for(var type in obj.wagerList){
		  var itm = obj.wagerList[type];
		  if(type == 'FP1' || type == 'FP2' || type == 'FP3'){
			 for(var i=0;i<itm.length;i++){
				 var itm2 = itm[i];
				 html += '<div class="libox"><p class="number">';
				 html += '<span class="gray">';
				 if(itm2['0']){
					for(var j=0;j<itm2['0'].length;j++){
						html += '<i ' + (itm2['0'][j] == redballs[0] ? 'class="fontred"'  : '') + '>' + itm2['0'][j] + '</i>';	
					}
				 }
				 html += '</span>';
				 if(itm2['1']){
					html += '<em>|</em><span class="gray">';
					for(var j=0;j<itm2['1'].length;j++){
						html += '<i ' + (itm2['1'][j] == redballs[1] ? 'class="fontred"'  : '') + '>' + itm2['1'][j] + '</i>';	
					} 
					html += '</span>';
				 }
				 if(itm2['2']){
					html += '<em>|</em><span class="gray">';
					for(var j=0;j<itm2['2'].length;j++){
						html += '<i ' + (itm2['2'][j] == redballs[2] ? 'class="fontred"'  : '') + '>' + itm2['2'][j] + '</i>';	
					} 
					html += '</span>';
				 }
				 var tempStr = (itm2.count *1 > 1) ? '复式' : '单式';
				 html += '</p>'+
				         '<div class="clearfix"><p class="zhushu fl"><span>' + itm2.wagerType  + '</span><span>' + tempStr + '</span>'+
				 		 '<span>'+ itm2.count + '注</span><span>'+ itm2.count * 2 + '元</span></p>';
				 html += self.getFastPrizeHtml(itm2);
				 html += '</div></div>';	 
			 }
		  }else{
			  for(var i=0;i<itm.length;i++){
				    var itm2 = itm[i];
				    html += '<div class="libox"><p class="number">'; 
				    if(type == 'FC2'){
						if(itm2.dan){
							html += '<span class="fontblack">(';
							for(var j=0;j<itm2.dan.length;j++){
							   html += 	'<i '+ ($.inArray(itm2.dan[j],fc2_redballs) != -1 ? 'class="fontred"' : '') + '>'+ itm2.dan[j] + '</i>';
							}
							html += ')</span>';
						}
						html += '<span class="gray">';
					    for(var j=0;j<itm2.tuo.length;j++){
							html += '<i '+ ($.inArray(itm2.tuo[j],fc2_redballs) != -1 ? 'class="fontred"' : '') + '>'+ itm2.tuo[j] + '</i>';	
						}
						html += '</span>';
				   }else if(type == 'FC3'){
						if(itm2.dan){
							html += '<span class="fontblack">(';
							for(var j=0;j<itm2.dan.length;j++){
								html += '<i '+ ($.inArray(itm2.dan[j],fc3_redballs) != -1 ? 'class="fontred"' : '') + '>'+ itm2.dan[j] + '</i>';		
							}
							html += ')</span>';
						}
						if(itm2.tuo){
							 html += '<span class="gray">';
							 for(var j=0;j<itm2.tuo.length;j++){
								html += '<i '+ ($.inArray(itm2.tuo[j],fc3_redballs) != -1 ? 'class="fontred"' : '') + '>'+ itm2.tuo[j] + '</i>';	
							 }
							 html += '</span>';	
						}
				   }else{
						if(itm2.dan){
							html += '<span class="fontblack">(';
							for(var j=0;j<itm2.dan.length;j++){
								html += '<i '+ ($.inArray(itm2.dan[j],redballs) != -1 ? 'class="fontred"' : '') + '>'+ itm2.dan[j] + '</i>';		
							}
							html += ')</span>';
						}   
					     html += '<span class="gray">';
						 for(var j=0;j<itm2.tuo.length;j++){
							html += '<i '+ ($.inArray(itm2.tuo[j],redballs) != -1 ? 'class="fontred"' : '') + '>'+ itm2.tuo[j] + '</i>';	
						 }
						 html += '</span>';	
				   }
				    html += '</p>';
					var tempStr = (itm2.count *1 > 1 ) ? '<span>复式</span>' : '<span>单式</span>';
					if(itm2.dan){
						tempStr = '';	
					}
  					html += '<div class="clearfix">'+
					           '<p class="zhushu fl">'+
							   '<span>'+ itm2.wagerType + '</span> '+ tempStr + (itm2.dan ? '<span>胆拖</span>' : '')+ 
						       '<span>'+ itm2.count + '注</span><span>'+ itm2.count * 2 + '元</span>'+
							   '</p>';
					html += self.getFastPrizeHtml(itm2);
					html +=  '</div>'+
					        '</div>';
			  }
			  
		  }
		  
	  }
	  html += '</div></div></div>';
	  return html;		
  }
  
  projectDetailObj.getFastPrizeHtml = function(obj){
	  var  html = '';
	  if(this.lotteryInfo.consignType != 'save'){
		  if(obj.netPrize > 0){
			  html += '<p class="fr">'+
						  '<span class="' + (obj.realPrize > 0 ? 'fontred' : 'gray') +'" >'+
						  '<strong>'+
						  (obj.rawPrize != obj.netPrize ? '大奖' : '中奖') + obj.netPrize + '元'+
						  '</strong>'+
						  '</span>'+
					  '</p>';	
		  }
	  }else{
		  if(obj.rawPrize > 0){
			  html += '<p class="fr">'+
						  '<span class="fontred" >'+
						  '<strong>'+
						  (obj.rawPrize != obj.netPrize ? '大奖' : '中奖') + obj.netPrize + '元'+
						  '</strong>'+
						  '</span>'+
					  '</p>';	
		  } 
	  }
	  return html;
  }
  
  //获取竞技彩投注内容
  projectDetailObj.getSportBetHtml = function(obj){
	  var self = this;
	  var html = '<div class="betlist detail_con jz_detail">'+
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
  
  projectDetailObj.getTotoBetHtml = function(obj){
	  var self = this;
	  var html = '<div class="betlist detail_con jz_detail">'+
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
  
  projectDetailObj.getMixBetClass = function(bet,itm,type){
	  ////console.log(arguments)
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
		// //console.log(cls);
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
  
   projectDetailObj.getBetClass = function(bet,itm){
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
  
  
  //判断当前彩种是否数字彩
  projectDetailObj.isNumLottery = function(){
	    var self = this;
	    var arr = ['dlt','pl5','pl3','qxc','tjsyy','gd11x5','gx11x5','hub11x5','jx11x5','xj11x5', 'sd11x5', 'hn4j1','ssq','gxk3','jxk3','jlk3','d3'];   //数字彩[包括高频]
		var isNum = $.inArray(self.lotteryType, arr) != -1 ? true : false;
		return isNum;
  }
  
  //判断当前彩种是否竞彩
  projectDetailObj.isSportLottery = function(){   //竞彩彩种
	    var self = this;
	    var arr = ['ftbrqspf','ftspf','ftfh','bskfh'];   
		var isSport = $.inArray(self.lotteryType, arr) != -1 ? true : false;
		return isSport;
  }
  
  //判断当前彩种是否是体彩[老足彩 toto r9]
  projectDetailObj.isTotoLottery = function(){
	    var self = this;
	    var arr = ['spf14','spf9'];   
		var isToto = $.inArray(self.lotteryType, arr) != -1 ? true : false;
		return isToto;
  }
  
  //提交店主
  projectDetailObj.sendStation = function(){
	  var self = this;
	  var postData = {
		  access_token : loginObj.access_token,	
		  lottery_id : self.product_id,
		  user_id : loginObj.userInfo.user_id,
		  station_id : loginObj.userInfo.station_user_id
	  }
	  $.ajax({
		  url : ConfigObj.localSite +  '?version=1&m=user.Station.refer',
		  data: postData,
		  type: 'post',
		  dataType:'json',
		  success:function(obj){
//			 //console.log('提交客服接口返回 ' ,obj);
			 if(obj.code == '0000'){
				$('#projectDetail_sucTip').show();
			 }else{
				$.alertMsg(obj.code_str);
			 }
		  }
		  
	  })
	  
  }
  
  //跳到彩站
  projectDetailObj.goStation = function(){
	  $('#projectDetail_sucTip').hide();
	  stationDetailObj.goBack = function(){
	  	 stationDetailObj.destroy();
		 projectDetailObj.show();
	  }
	  stationDetailObj.show('',function(){
		stationDetailObj.getData(loginObj.userInfo.s_id);  
	  });
  }
  
  
  
  projectDetailObj.goBack = function(){
	  var self = this;
	  self.popRoute();
  }
  
  
  
  
  
  projectDetailObj.destroy = function(){
	  this.setDefConfig();
	  $('#projectDetail').html('').remove();
	  this.routeArr = [];
//	  //console.log('方案详情页面销毁全部路由关系------------------------------');
  }
  
   
  projectDetailObj.dirShow = function(obj){
	var self = this;
	self.show('reload',function(){
		self.product_id = (obj && obj.pid) ? obj.pid : '';
		self.getData(self.product_id);	
	});  
	
  }
