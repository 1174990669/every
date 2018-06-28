
  var qupiaoSetObj = new PageController({
	   'name': 'qupiaoSet',
	   'tpl' : 'template/station/qupiaoSet.html'
    });

 
  qupiaoSetObj.createDomObj = function(){
  	 this.progressCon = $('#qupiaoSet_progressCon'); //出票过程进度条容器
	 this.progressEnd = $('#qupiaoSet_progressEnd');  //出票完成标志
	 this.qupiaoSetBtn = $('#qupiaoSet_qupiaoBtn'); //取票按钮
	 this.refreshBtn = $('#qupiaoSet_refreshBtn');  //刷新状态按钮 
	 this.confirmBtn = $('#qupiaoSet_confirmBtn');  //取票确认按钮
	 this.cancelBtn = $('#qupiaoSet_cancelBtn');    //取票取消按钮
	 this.confirmLayer = $('#qupiaoSet_confirmLayer'); //取票弹出层
	 this.successLayer = $('#qupiaoSet_successLayer');  //出票成功弹出层
	 this.failLayer = $('#qupiaoSet_failLayer');     //出票失败弹出层
	 this.topTit = $('#qupiaoSet_topTit');
  }

  qupiaoSetObj.createEvent = function(){
	  this.refreshBtn.unbind('tap').tap(function(){
		 qupiaoSetObj.delayRefresh();  
	  })
	  this.qupiaoSetBtn.unbind('tap').tap(function(){
		  qupiaoSetObj.checkQupiao()
	  })
	  this.cancelBtn.unbind('tap').tap(function(){
		  qupiaoSetObj.hideConfirmLayer();
	  })
	  this.confirmBtn.unbind('tap').tap(function(){
		  qupiaoSetObj.checkReal();  
	  })
	  $('#qupiaoSet p[data-t=backbtn]').unbind('tap').tap(function(){
		  qupiaoSetObj.goBack();  
	  })
	  $('#qupiaoSet a[data-t=jsGoHome]').unbind('tap').tap(function(){
		  qupiaoSetObj.goHome();
	  })
	   $('#qupiaoSet a[data-t=jsGoRecord]').unbind('tap').tap(function(){
		  qupiaoSetObj.goRecord();
	  })
	  $('#qupiaoSet a[data-t=jsGoProjectDetail]').unbind('tap').tap(function(){
		  if(qupiaoSetObj.product_type == 'plan'){
			qupiaoSetObj.goPlanDetail();  
		  }else{
		  	qupiaoSetObj.goProjectDetail();
		  }
	  })
  }
  
  qupiaoSetObj.delayRefresh = function(){
	  this.count = 0;
	  this.refreshBtn.hide();
	 // this.startTimer();   
	  this.needStop = false;
	  this.updateStatus('process');
	  this.updateProgress({time:0});
	  setTimeout(function(){
		  qupiaoSetObj.getTicketStatus();
	  },5000)
  }
  
  //跳转到投注记录页
  qupiaoSetObj.goRecord = function(){
		 Global.GC();
		 betRecordObj.goBack = function(){
			if(ConfigObj.from == 'ios'){
		 		ConfigObj.from = '';
		 		location.href = ConfigObj.iosAppSite + '?pageName=home';  //跳回到iosApp 
			}else{
				betRecordObj.destroy();
				homeObj.show(); 
			}
		 }
		 betRecordObj.show('reload');
  }
  
  qupiaoSetObj.goHome = function(){
	 if(ConfigObj.from == 'ios'){
		 ConfigObj.from = '';
		 location.href = ConfigObj.iosAppSite + '?pageName=home';  //跳回到iosApp 
	 }else{
	 	Global.GC();
	 	homeObj.show();  
	 }
  }
  
  qupiaoSetObj.goPlanDetail = function(){
	 var product_id = qupiaoSetObj.product_id;
	 var typeCn = qupiaoSetObj.lotteryTypeCn;
	 Global.GC();
	 planDetailObj.goBack = function(){
	    Global.backLottery(typeCn);
	 }
	 planDetailObj.show('reload',function(){
		 planDetailObj.getData(product_id);
	 })
  }
  
  qupiaoSetObj.goProjectDetail = function(){
	  var product_id = qupiaoSetObj.product_id;
	  var typeCn = qupiaoSetObj.lotteryTypeCn;
	  Global.GC();
	 // projectDetailObj.goBack = function(){
//		 /* if(ConfigObj.from == 'ios'){
//			ConfigObj.from = '';
//			location.href = ConfigObj.iosAppSite + '?pageName=home';  //跳回到iosApp 
//		  }else{
//			var self = this;
//			self.popRoute();
//		  }*/
//		  Global.backLottery(typeCn);
//  	  }
	  projectDetailObj.show('reload',function(){
		  projectDetailObj.getData(product_id); 
		/*projectDetailObj.pushRoute(function(){  //路由机制
		  homeObj.show();
	    })*/
		  projectDetailObj.pushRoute(function(){
				Global.backLottery(typeCn);
		  })
	  });
  }
  
  qupiaoSetObj.startTimer = function(){
	  qupiaoSetObj.getTicketStatus('first');
	  qupiaoSetObj.count = 0;
	  qupiaoSetObj.ticket_timer = setInterval(function(){
		  qupiaoSetObj.getTicketStatus();
	  },6000);
	  qupiaoSetObj.updateProgress({time:0});
  }
  //type==first 表示是第一次请求
  qupiaoSetObj.getTicketStatus = function(type){
	  var self = this;
	  self.count = self.count +1;
	  //console.log(self.count);
	  var dataObj = {
		 'pay_id': self.pay_id,
		 //'product_type': self.product_type,
		 //'product_id': self.product_id
	  }
	  $.ajax({
		url : ConfigObj.localSite +  '?version=1&m=cashier.watch.buyStatus',
		type:'post', 
		data:dataObj,
		dataType:'json',
		success:function(obj){
			//console.log('出票情况接口返回： ',obj);
			if(obj.code == '0000'){
				/*obj.info = {
					'print_status':'delay',
				}  //测试代码 zhangw*/
				if(obj.info.print_status == 'not'){  
					if(type == 'first'){
						self.startPoint = 0;
						self.endPoint = 100;
						//self.totalTime = parseInt(obj.info.time);	
						self.totalTime = 0;  //循环动画	
					}
					self.updateStatus('process');
				}else if(obj.info.print_status == 'yes'){   
					self.updateStatus('success');   //修改为走完动画效果
					self.stopProgress();
				}else if(obj.info.print_status == 'fail'){  
					self.updateStatus('fail');  
					self.stopProgress();	
				}else if(obj.info.print_status == 'suc_part'){
					self.updateStatus('suc_part'); 	
					self.stopProgress();
				}else if(obj.info.print_status == 'delay'){
					self.updateStatus('delay');	
					self.stopProgress();
				}
			}else{
				$.alertMsg(obj.code_str);
				qupiaoSetObj.updateStatus('fail'); 	
			}
		}
	  })
  }
  
  qupiaoSetObj.updateProgress = function(obj){
	  if(this.needStop) return;
	  if(!qupiaoSetObj.progress){
		  qupiaoSetObj.progress = new CircularProgress({
			radius: 60,
			lineWidth: 10,
			strokeStyle:'#30a1f7'
		  });
		  qupiaoSetObj.progressCon.get(0).appendChild(qupiaoSetObj.progress.el);
	  }
	  var passTime = qupiaoSetObj.totalTime - parseInt(obj.time);
	  qupiaoSetObj.endPoint = (qupiaoSetObj.totalTime == 0) ? 100 : Math.floor((passTime/qupiaoSetObj.totalTime)*100);  
	  qupiaoSetObj.progress.run(qupiaoSetObj.startPoint, qupiaoSetObj.endPoint, function(){
		   qupiaoSetObj.startPoint = qupiaoSetObj.endPoint;
		   if(qupiaoSetObj.endPoint == 100){
			   qupiaoSetObj.progressCon.find('canvas').remove();
			   qupiaoSetObj.progress = null;
			   qupiaoSetObj.startPoint = 0;
			   
				qupiaoSetObj.updateProgress({time:0});
		   }
	  })
  }
  
  qupiaoSetObj.stopProgress = function(){
	   qupiaoSetObj.progressCon.find('canvas').remove();
	   qupiaoSetObj.progress = null;
	   qupiaoSetObj.startPoint = 0;  
	   this.needStop = true;
  }
  
  // itm是正在出票数据对象
  qupiaoSetObj.updateStatus = function(type){
	 if(type == 'success'){  //出票完成
	 	this.progressCon.hide();
		this.failLayer.hide();
	 	this.progressEnd.show(); 
		this.progressEnd.find('.state2').html('<span class="succeed statebg">出票完成</span>'); 
        if(qupiaoSetObj.ticket_timer){ 
			clearInterval(qupiaoSetObj.ticket_timer);
			qupiaoSetObj.ticket_timer = '';
		}
	 }else if(type == 'suc_part'){
		this.progressCon.hide();
		this.failLayer.hide();
	 	this.progressEnd.show();  
		this.progressEnd.find('.state2').html('<span class="suc_part statebg">部分成功</span>'); 
        if(qupiaoSetObj.ticket_timer){ 
			clearInterval(qupiaoSetObj.ticket_timer);
			qupiaoSetObj.ticket_timer = '';
		} 
	 }else if(type == 'fail'){  //出票失败
		this.progressCon.hide();
		this.progressEnd.hide();
        this.successLayer.hide();
		this.qupiaoSetBtn.hide();
		this.failLayer.show();
        if(qupiaoSetObj.ticket_timer){ 
		 	clearInterval(qupiaoSetObj.ticket_timer);
			qupiaoSetObj.ticket_timer = '';
		}
	 }else if(type == 'process'){ //出票正在进行
	    this.failLayer.hide();
		this.progressEnd.hide();
		this.progressCon.show();
		var html = '<p class="state1 pt35">'+
							'<span>'+ '正在出票' +'</span>'+
							//'<span class="font12">还剩'+ itm.time_desc +'</span>'+
						'</p>'+
					'</div>'
		this.progressCon.find('.inner').html(html); 
	 }else if(type == 'delay'){
		this.failLayer.hide();
		this.progressEnd.hide();
		this.progressCon.show();
		var html = '<p class="state1 pt35">'+
							'<span>'+ '出票延迟' +'</span>'+
							//'<span class="font12">还剩'+ itm.time_desc +'</span>'+
						'</p>'+
					'</div>'
		this.progressCon.find('.inner').html(html); 
		this.qupiaoSetBtn.hide();
		this.refreshBtn.show();  //刷新状态按钮
		if(qupiaoSetObj.ticket_timer){ 
		 	clearInterval(qupiaoSetObj.ticket_timer);
			qupiaoSetObj.ticket_timer = '';
		}
	 }
  }
  
  qupiaoSetObj.checkQupiao = function(){
	  qupiaoSetObj.showConfirmLayer();
  }
  
  qupiaoSetObj.checkReal = function(){
	  var self = this;
	  if(loginObj.userInfo && loginObj.userInfo.is_real == 'Y'){
		  self.qupiaoFun();
	  }else{
		  $.alertMsg('请先完成实名');
		  regRealNameObj.goBack=function(){
			 regRealNameObj.destroy();
			 self.show();  
		  }
		  regRealNameObj.show('reload',function(){
			  var data = {
				'accountName': loginObj.userInfo.user_name,
				'from' : 'buy',  
			  }
			  regRealNameObj.setData(data);
		  });
	  }	  
  }
  
  //发送取票请求到后端
  qupiaoSetObj.qupiaoFun = function(){
	  var dataObj = {
		  'product_id': this.product_id,
		  'access_token': loginObj.access_token
	  }
	  if(this.product_type == 'plan'){
		 var url =  ConfigObj.localSite +  '?version=1&m=user.account.setPlanTicketSelfGet';
	  }else{
		 var url = ConfigObj.localSite +  '?version=1&m=user.account.setTicketSelfGet';
	  }
	  $.ajax({   
		 url : url,
		 type:'post',
		 data:dataObj,
		 dataType:'json',
		 success:function(obj){
			if(obj.code == '0000'){
				qupiaoSetObj.hideConfirmLayer();
				qupiaoSetObj.qupiaoSetBtn.hide();
				qupiaoSetObj.formatSuccessLayer(obj.info);
			}else{
				qupiaoSetObj.hideConfirmLayer();
				$.alertMsg(obj.code_str);	
			}
		 }
		  
	  })
  }
  
  qupiaoSetObj.formatSuccessLayer = function(obj){
	  if(!obj) return;
	  var html = '<p class="center mb10 font16">请于60日内完成取票</p>'+
				'<div class="site_info">'+
					'<div class="site_box">'+
						'<div class="boxlf">'+
							'<p class="clearfix">'+
								'<span class="fl font16 mb10">'+ obj.station_username +  '   ' + (obj.station_mobile ? obj.station_mobile : '')  + '</span>'+
								'<span class="fr gray font12">No.'+ obj.station_id +'</span>'+
							'</p>'+
							'<p class="gray font12">'+ obj.station_address +'</p>'+
						'</div>'+
						'<div class="boxrt"><span class="infon_arrow"></span><span class="white_bg"></span></div>'+
					'</div>'+
				'</div>';
	  this.successLayer.html(html).show();
  }
  
  qupiaoSetObj.formatFailLayer = function(txt){
	  this.failLayer.show();
	  this.failLayer.html(txt);  
  }

   qupiaoSetObj.showConfirmLayer = function(){
		 this.confirmLayer.show();
   }
   qupiaoSetObj.hideConfirmLayer = function(){
		 this.confirmLayer.hide();
   }
  

  qupiaoSetObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
	
  }

  qupiaoSetObj.init = function(){
	  qupiaoSetObj.setDefConfig();
      qupiaoSetObj.onloadExecution();
  }
  
  qupiaoSetObj.setData  = function(obj){
	 //console.log('取票设置页面 setData ', obj);
	 this.pay_id = obj.pay_id;
	 this.product_id = obj.product_id;
	 this.product_type = obj.product_type; 	
	 this.lotteryType = obj.lotteryType;
	 this.lotteryTypeCn = obj.lotteryTypeCn ? obj.lotteryTypeCn : ''; 
	 //var type =  obj.lotteryType ? obj.lotteryType.toLowerCase() : '';
	 //var cnName = Global.lotteryTypeCn[type] ? Global.lotteryTypeCn[type] : ''; 
	 $('#qupiaoSet_topTit').html(qupiaoSetObj.lotteryTypeCn);
	 if(this.product_type == 'plan'){
		this.updateStatus('success');
	 	this.progressEnd.find('.state2').html('<span class="succeed statebg">付款完成</span>'); 
	 }else{
		 this.startTimer();
	 }
  }
  
  
  
  
  qupiaoSetObj.setDefConfig = function(){
	 this.pay_id = '';
	 this.product_id = '' ;
	 this.product_type = ''; 
	 this.startPoint = 0;
	 this.totalTime = 0;
	 this.endPoint = 100;
	 this.progress = '';   //进度条实例
	 this.lotteryType = '';
	 this.count = 0;
	 this.needStop = false;
	 if(qupiaoSetObj.ticket_timer){
	 	clearInterval(qupiaoSetObj.ticket_timer); 
		qupiaoSetObj.ticket_timer = '';
	 }
  }

  
