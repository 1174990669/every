
  var ticketCashierObj = new PageController({
	   'name': 'ticketCashier',
	   'tpl' : 'template/user/ticketCashier.html'
    });


  ticketCashierObj.createDomObj = function(){
  	 this.progressCon = $('#ticketCashier_progressCon'); //扣款过程进度条容器
	 this.progressEnd = $('#ticketCashier_progressEnd');  //扣款完成标志
	 this.backBtn = $('#ticketCashier_backbtn');
	 this.topTit = $('#ticketCashier_topTit');   
	 this.botLink = $('#ticketCashier_botLink');
	 this.homeLink = $('#ticketCashier_home');
	 this.recordLink = $('#ticketCashier_record');
	 this.refreshBtn = $('#ticketCashier_refreshBtn');
	 this.tryBtn = $('#ticketCashier_tryBtn');
  }

  ticketCashierObj.createEvent = function(){
	  this.backBtn.unbind('tap').tap(function(){
		  ticketCashierObj.goBack();  
	  })
	  this.homeLink.unbind('tap').tap(function(){
		  ticketCashierObj.destroy();
		 /* buyOpenTicketObj.goBack = function(){
			  buyOpenTicketObj.destroy();
			  homeObj.show();
		  }*/
		  buyOpenTicketObj.show('reload',function(){
			 buyOpenTicketObj.pushRoute(function(){
				homeObj.show(); 
			 })
		  }); 
	  })
	  
	  this.refreshBtn.unbind('tap').tap(function(){
		   ticketCashierObj.delayRefresh(); 
	  })
	  this.tryBtn.unbind('tap').tap(function(){  //继续付款
	  	   ticketCashierObj.tryAgain();
	  })
	  
	  this.recordLink.unbind('tap').tap(function(){
		  ticketCashierObj.destroy();
		  
		  openTicketRecordObj.show('',function(){
			   openTicketRecordObj.pushRoute(function(){
				 	userCenterObj.show();  
			   })
		  });
	  })
	  
	  
  }
  
  //继续付款
  ticketCashierObj.tryAgain = function(){
	  
  }
  
  ticketCashierObj.delayRefresh = function(){
	  this.count = 0;
	  this.refreshBtn.hide();
	  this.startTimer(); 
  }
  
  ticketCashierObj.startTimer = function(){
	  setTimeout(function(){
		ticketCashierObj.count = 0;
	  	ticketCashierObj.getPayStatus('first');
	  },200)
	  ticketCashierObj.ticket_timer = setInterval(function(){
		  ticketCashierObj.getPayStatus();
	  },6000);
  }
  //type==first 表示是第一次请求
  ticketCashierObj.getPayStatus = function(type){
	  var self = this;
	  var dataObj = {
		'pay_id' : this.pay_id, 
		'channel' : ''	    //支付渠道		默认为空
	  }
	  self.count = self.count + 1;
	  //console.log(self.count);
	  $.ajax({
		url : ConfigObj.localSite +  '?version=1&m=ticketCashier.check.status',
		type:'post',
		data:dataObj,
		dataType:'json',
		success:function(obj){
			//console.log('扣款情况数据 ', obj);
			/*var obj = {
				code : '0000',
				info:{
					status : 'delay',
					status_cn : '付款延迟'
				}
			}  //测试代码 zhangw */
			if(obj.code == '0000'){
				if(obj.info.product_info){
					self.lotteryTypeCn = obj.info.product_info.lottery_type_cn;	
				}
				if(obj.info.status == 'not'){  
					if(type == 'first'){
						self.startPoint = 0;
						self.endPoint = 100;
						self.totalTime = 0;		
					}
					var tempObj = {
						time : 0	  
					}
					self.updateProgress(tempObj);
					self.updateStatus('process',tempObj);
				}else if(obj.info.status == 'succ'){  
					self.updateStatus('success',obj.info);
					if(self.ticket_timer){
					   clearInterval(self.ticket_timer); 
					   self.ticket_timer = '';
				    } 
				}else if(obj.info.status == 'fail'){ 
					self.updateStatus('fail',obj.info);
					if(self.ticket_timer){
					   clearInterval(self.ticket_timer); 
					   self.ticket_timer = '';
				    }  	
				}else if(obj.info.status == 'delay'){
					self.updateStatus('delay',obj.info);
					if(self.ticket_timer){
						clearInterval(self.ticket_timer); 
						self.ticket_timer = '';
					} 
				}
			}else{
				$.alertMsg(obj.code_str);	
			}
		}
	  })
  }
  
  //obj.time //还剩下多少时间完成
  ticketCashierObj.updateProgress = function(obj){
	 
	  if(!ticketCashierObj.progress){
		  ticketCashierObj.progress = new CircularProgress({
			radius: 60,
			lineWidth: 10,
			strokeStyle:'#30a1f7'
		  });
		  ticketCashierObj.progressCon.find('.outer').get(0).appendChild(ticketCashierObj.progress.el);
	  }
	  var passTime = ticketCashierObj.totalTime - parseInt(obj.time);
	  ticketCashierObj.endPoint = (ticketCashierObj.totalTime == 0) ? 100 : Math.abs((passTime/ticketCashierObj.totalTime)*100);  
	 // //console.log('过去的时间: '+ passTime);
	 // //console.log('当前开始的百分比: '+ ticketCashierObj.startPoint);
	 // //console.log('当前结束的百分比: '+ ticketCashierObj.endPoint);
	  ticketCashierObj.progress.run(ticketCashierObj.startPoint, ticketCashierObj.endPoint, function(){
		   ticketCashierObj.startPoint = ticketCashierObj.endPoint;
		   if(ticketCashierObj.endPoint == 100){
			   ticketCashierObj.progressCon.find('canvas').remove();
			   ticketCashierObj.progress = null;
			   ticketCashierObj.startPoint = 0;
		   }
	  })
  }
  
  // itm是正在扣款数据对象
  ticketCashierObj.updateStatus = function(type,itm){
	  var self = this;
	 if(type == 'success'){  //扣款完成
		this.progressCon.hide();
		this.progressEnd.show();
		this.botLink.show();
	 }else if(type == 'process'){ //扣款正在进行
		this.progressEnd.hide();
		this.progressCon.show();
		var html = '<p class="state1 pt25">'+
							'<span>'+ '正在付款' +'</span>'+
						'</p>';
		this.progressCon.find('.inner').html(html); 
	 }else if(type == 'fail'){  //扣款失败
		var html = '<p class="state1 pt25">'+
							'<span>'+ itm.status_cn +'</span>'+
						'</p>';
		this.progressCon.find('.inner').html(html); 
		this.botLink.show();
		this.refreshBtn.hide();
		this.tryBtn.show();
	 }else if(type == 'delay'){
		this.progressEnd.hide();
		this.progressCon.show();
		var html = '<p class="state1 pt25">'+
							'<span>'+ itm.status_cn +'</span>'+
						'</p>';
		this.progressCon.find('.inner').html(html); 
		this.refreshBtn.show();
		this.tryBtn.hide();
	 }
  }
  

  

  ticketCashierObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
	
  }

  ticketCashierObj.init = function(){
      ticketCashierObj.onloadExecution();
  }
  
  ticketCashierObj.setDefConfig = function(){
	 this.pay_id = '';  
	 this.product_id = '';
	 this.product_type = ''; 	
	 this.lotteryType = '';  
	 this.lotteryTypeCn = '';
	 this.count = 0;    //单个流程中取状态的次数,超过10个即认为是延迟状态
	 if(ticketCashierObj.ticket_timer){
		clearInterval(ticketCashierObj.ticket_timer); 
		ticketCashierObj.ticket_timer = '';
	 }
  }
  
  
  
  ticketCashierObj.setData = function(obj){
	 //console.log(obj);
	 this.pay_id = obj.pay_id;
	 this.product_id = obj.product_id;
	 this.product_type = obj.product_type ;
	 this.lotteryType = obj.lotteryType; 
	 this.startPoint = 0;
	 this.endPoint = 100;
	 this.progress = '';   //进度条实例
	 //ticketCashierObj.startTimer();  //demo功能暂时注释　zhangw
  }
  
  ticketCashierObj.demo = function(){
	 this.setData({});
	 this.updateProgress({'time':0});
	 setTimeout(function(){
		 ticketCashierObj.updateStatus('success');
	 },5000)
  }
  
   
  ticketCashierObj.dirShow = function(obj){
	/*var self = this;
	var tempFun = function(){
		var type = (obj && obj.type) ? obj.type : '';
		if(type == 'recharge'){
			var pay_id = obj.pay_id;
			var param = {
				'pay_id' : pay_id,
			}
			self.setData(param); 	
		}else if (type == 'pay'){
			var lotteryType = obj.lotteryType;	
			var pay_id = obj.pay_id;
			var product_id = obj.product_id;
			var param = {
				'pay_id' : pay_id,
				'lotteryType': lotteryType,
				'product_id': product_id	
			}
			self.setData(param);
		}
	}
	self.show('reload',function(){
		tempFun();	
	});  */
  }
