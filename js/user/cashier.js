
  var cashierObj = new PageController({
	   'name': 'cashier',
	   'tpl' : 'template/user/cashier.html'
    });


  cashierObj.createDomObj = function(){
  	 this.progressCon = $('#cashier_progressCon'); //扣款过程进度条容器
	 this.progressEnd = $('#cashier_progressEnd');  //扣款完成标志
	 this.backBtn = $('#cashier_backbtn');
	 this.topTit = $('#cashier_topTit');   
	 this.botLink = $('#cashier_botLink');
	 this.homeLink = $('#cashier_home');
	 this.recordLink = $('#cashier_record');
	 //this.projectLink = $('#cashier_project');
	 this.productLink = $('#cashier_product');
	  this.authRealLink = $('#cashier_authreal');
	 
	 cashierObj.goDetail
	 this.refreshBtn = $('#cashier_refreshBtn');
	 this.tryBtn = $('#cashier_tryBtn');
  }

  cashierObj.createEvent = function(){
	  this.backBtn.unbind('tap').tap(function(){
		  cashierObj.goBack();  
	  })
	  this.homeLink.unbind('tap').tap(function(){
		  Global.GC();
		  homeObj.show();  
	  })
//	  this.projectLink.unbind('tap').tap(function(){
//		  cashierObj.goProjectDetail()  
//	  })
	  this.productLink.unbind('tap').tap(function(){
		  cashierObj.goProductDetail()  
	  })
	  
	  //bcy
	  this.authRealLink.unbind('tap').tap(function(){
		  cashierObj.goAuthReal() 
	  })
	  
	  this.refreshBtn.unbind('tap').tap(function(){
		   cashierObj.delayRefresh(); 
	  })
	  this.tryBtn.unbind('tap').tap(function(){  //继续付款
	  	   cashierObj.tryAgain();
	  })
  }
  
  //继续付款
  cashierObj.tryAgain = function(){
	   var type = cashierObj.lotteryType.toLowerCase(); 
	   cashierObj.destroy();
	   buyConfirmObj.destroy();
	   switch(type){
		  case 'dlt' :
			  dltConfirmObj.show();
			  break;  
		  case 'pl3':
		  	  pl3ConfirmObj.show();
			  break;
		  case 'pl5':
		  	  pl5ConfirmObj.show();
		  	  break;
		  case  'qxc':
		  	  qxcConfirmObj.show();
			  break;
		  case ConfigObj.fastLotType:
		  	  fastBetConfirmObj.show();
			  break;
		  case 'ftfh':
		  	  soccerMixObj.show();
			  break;
		  case 'spf14':
		  	  soccerTotoObj.show();
			  break;
		  case 'spf9':	
		      soccerR9Obj.show()
			  break;
		   default:
		   	  homeObj.show('reload');
			  break;
	   }
  }
  
  cashierObj.delayRefresh = function(){
	  this.count = 0;
	  this.refreshBtn.hide();
	  this.startTimer(); 
  }
  
  cashierObj.startTimer = function(){
	  setTimeout(function(){
		cashierObj.count = 0;
	  	cashierObj.getPayStatus('first');
	  },200)
	  cashierObj.ticket_timer = setInterval(function(){
		  cashierObj.getPayStatus();
	  },6000);
  }
  //type==first 表示是第一次请求
  cashierObj.getPayStatus = function(type){
	  var self = this;
	  var dataObj = {
		'pay_id' : this.pay_id, 
		'channel' : ''	    //支付渠道		默认为空
	  }
	  var secretData = {
	  	'para': Global.encrypt(dataObj)
	  }
	  self.count = self.count + 1;
	  //console.log(self.count);
	  $.ajax({
		url : ConfigObj.localSite +  '?version=1&m=cashier.check.status',
		type:'post',
		data:secretData,
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
				obj.info = $.parseJSON(Global.crypt(obj.info));
//				console.log(obj)
				cashierObj.consign_type = obj.info.product_info.consign_type;
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
					/*if(self.count> 10){
						if(self.ticket_timer){
					   		clearInterval(self.ticket_timer); 
					   		self.ticket_timer = '';
				    	} 
						self.updateStatus('delay',tempObj);
					}else{
						self.updateProgress(tempObj);
						self.updateStatus('process',tempObj);
					}*/
				}else if(obj.info.status == 'succ'){  
					self.updateStatus('success',obj.info);
					if(self.ticket_timer){
					   clearInterval(self.ticket_timer); 
					   self.ticket_timer = '';
				    }
				    
				  //bcy 添加实名认证的提示
				  if(loginObj.userInfo && loginObj.userInfo.real_status == 'N'){  //未实名	
				  	$('#cashier_Success_realname').show();
				  }

				    /**
					 * TODO 由于支付状态页面和订单详情页面出票状态不一致的问题，现在在支付状态页面不在检查出票状态
                    // 检查出票状态

                    self.ticket_status_timer = '';
                    self.ticket_status_timer_num = 0;

                    var checkBuyStatus = function () {
                    	if (self.ticket_status_timer_num > 30) return;

						self.ticket_status_timer_num++;
                        $.post(ConfigObj.localSite + '?m=cashier.watch.buyStatus', {pay_id: obj.info.pay_id}, function (printObj) {
                            //console.log('检查出票状态返回数据', printObj);
                            if (printObj.code == '0000') {
                                var printStatus = printObj.info.print_status;
                                var printStatusCn = printObj.info.print_statuscn;
                                if (printStatus == 'yes') {
                                    clearInterval(self.ticket_status_timer);
                                    $('#cashier_ticketStatus').html('系统已成功出票，请及时关注订单状态！');
                                } else if (printStatus == 'fail') {
                                    clearInterval(self.ticket_status_timer);
                                    $('#cashier_ticketStatus').html(printStatusCn + '，请及时关注订单状态！');
                                } else if (printStatus == 'part_succ') {
                                    $('#cashier_ticketStatus').html('部分出票成功，请及时关注订单状态！');
                                }
                            }
                        }, 'json');
                    };

                    checkBuyStatus();

                    self.ticket_status_timer = setInterval(function () {
                        checkBuyStatus();
                    }, 2000);
					 */

                    Global.pv('buySuccess', {lotteryType: obj.info.product_info.lottery_type});

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
  cashierObj.updateProgress = function(obj){
	  /*if(obj.time == 0){
		 clearInterval(cashierObj.ticket_timer);  
	  }*/
	  if(!cashierObj.progress){
		  cashierObj.progress = new CircularProgress({
			radius: 60,
			lineWidth: 10,
			strokeStyle:'#30a1f7'
		  });
		  cashierObj.progressCon.find('.outer').get(0).appendChild(cashierObj.progress.el);
	  }
	  var passTime = cashierObj.totalTime - parseInt(obj.time);
	  cashierObj.endPoint = (cashierObj.totalTime == 0) ? 100 : Math.abs((passTime/cashierObj.totalTime)*100);  
	 // //console.log('过去的时间: '+ passTime);
	 // //console.log('当前开始的百分比: '+ cashierObj.startPoint);
	 // //console.log('当前结束的百分比: '+ cashierObj.endPoint);
	  cashierObj.progress.run(cashierObj.startPoint, cashierObj.endPoint, function(){
		   cashierObj.startPoint = cashierObj.endPoint;
		   if(cashierObj.endPoint == 100){
			   cashierObj.progressCon.find('canvas').remove();
			   cashierObj.progress = null;
			   cashierObj.startPoint = 0;
		   }
	  })
  }
  
  // itm是正在扣款数据对象
  cashierObj.updateStatus = function(type,itm){
	  var self = this;
	 if(type == 'success'){  //扣款完成
		this.progressCon.hide();
		this.progressEnd.show();
		this.botLink.show();
		//this.goQupiaoSet();
		//this.goDetail();   //点石彩修改为不直接跳转订单详情
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
  
  cashierObj.goQupiaoSet = function(){
	    var self = this;
	    qupiaoSetObj.goBack=function(){
		  Global.backLottery(cashierObj.lotteryTypeCn);
		}
		qupiaoSetObj.show('reload',function(){
			qupiaoSetObj.setData({
				pay_id : self.pay_id,
				product_id : self.product_id,
				product_type : self.product_type,
				lotteryType : self.lotteryType,
				lotteryTypeCn : self.lotteryTypeCn  
			})	
		});  
  }
  
  cashierObj.goProductDetail = function(){
	  
	  var product_id = cashierObj.product_id;
	  var product_type = cashierObj.product_type;
	  var consign_type = cashierObj.consign_type;
//	  console.log(consign_type);
	  if(consign_type == "together"){
	  	$('#cashier_product').val("合买详情");
	  	this.goHemai();
	  	return;
	  }else{
	  	if(product_type=='plan'){
			  this.goPlanDetail();
		  }else{
			  this.goProjectDetail(); 
		  }
		  return;
	  }
	  
  }
  
  cashierObj.goHemai = function(){
  	var pid = this.product_id;
  	hemaiDetailObj.goBack = function(){
			 hemaiDetailObj.destroy();
			 userCenterObj.show();
		 }
		hemaiDetailObj.show(true,function(){
			hemaiDetailObj.setData(pid);
		});
  }
  
   cashierObj.goProjectDetail = function(){
	 
	  var product_id = cashierObj.product_id;
	  Global.GC();
	  projectDetailObj.show('reload',function(){
		  projectDetailObj.getData(product_id);
		  projectDetailObj.pushRoute(function(){  //路由机制
			 homeObj.show();
		  })  
	  });
	  
  }
  
  cashierObj.goPlanDetail = function(){
	  var product_id = cashierObj.product_id;
	  Global.GC();
	  planDetailObj.goBack = function(){
		 planDetailObj.destroy();
		 homeObj.show(); 
	  }
	  planDetailObj.show('reload',function(){
		  planDetailObj.getData(product_id);
		  planDetailObj.pushRoute(function(){  //路由机制
			 homeObj.show();
		  })  
	  });
	  
  }
  
 
  
 	 	//bcy
  	cashierObj.goAuthReal = function(){
  	
  	regRealNameObj.goBack = function(){
				Global.GC();
				homeObj.show();	
			}
			var obj = {
				'from': 'cashier',
					'accountName': 	loginObj.userInfo.user_name
			}
			regRealNameObj.show(true,function(){
				regRealNameObj.setData(obj)
			});
			
			
	  
  }
  
    

  cashierObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
	
  }

  cashierObj.init = function(){
	  cashierObj.setDefConfig();
      cashierObj.onloadExecution();
  }
  
  cashierObj.setDefConfig = function(){
	 this.pay_id = '';  
	 this.product_id = '';
	 this.product_type = ''; 	
	 this.lotteryType = '';  
	 this.lotteryTypeCn = '';
	 this.count = 0;    //单个流程中取状态的次数,超过10个即认为是延迟状态
	 this.startPoint = 0;
	 this.endPoint = 100;
	 this.progress = '';   //进度条实例
	 this.consign_type = '';
	 if(cashierObj.ticket_timer){
		clearInterval(cashierObj.ticket_timer); 
		cashierObj.ticket_timer = '';
	 }
  }
  
  cashierObj.setData = function(obj){
	 //console.log(obj);
	 this.pay_id = obj.pay_id;
	 this.product_id = obj.product_id;
	 this.product_type = (obj.product_type == 'plan') ? 'plan' : 'project';
	 this.lotteryType = obj.lotteryType; 
	 this.lotteryCn = obj.lotteryCn ? obj.lotteryCn : '';
	 cashierObj.startTimer();
	 $('#cashier_topTit').html(this.lotteryCn);
  }
  
  cashierObj.goDetail = function(){
	 if(this.product_type == 'plan'){
		this.goPlanDetail();
	 }else{
		this.goProjectDetail(); 
	 }
  }
  
   
  cashierObj.dirShow = function(obj){
	var self = this;
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
	});  
  }
