
  var stationDetailObj = new PageController({
	   'name': 'stationDetail',
	   'tpl' : 'template/station/stationDetail.html'
  });

  

  stationDetailObj.createDom = function(){
	this.headObj = $('#stationDetail_header');
	this.backObj = $('#stationDetail_backbtn');
  }
  
  stationDetailObj.createEvent = function(){
	  this.backObj.unbind('tap').tap(function(){
		 stationDetailObj.goBack();  
	  })
	  
	  $('#stationDetail_wrap').unbind('tap').tap(function(e){
		 var aObj = $.oto_checkEvent(e,"A");
		 if(aObj){
			var thisObj = $(aObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "clearTelTip": $('#stationDetail_telTip').hide();return true;
		       // case "toTelTip": $('#stationDetail_telTip').hide();break;
			}
		 }  
	  })
	  
	  $('#stationDetail_bind').unbind('tap').tap(function(){
		  if(loginObj.isLogin){
			  var sid = $(this).attr('data-sid');
			  if(sid == loginObj.userInfo.station_id){
				$.alertMsg('您已经绑定该站点');  
			  }else{
				$.alertMsg('请勿重复绑定站点');
			  }
		  }else{
			  var sid = $(this).attr('data-sid');
			  regByMobileObj.goBack=function(){
				Global.GC();
				homeObj.show();  
			  }
			  regByMobileObj.show();
			  setTimeout(function(){
				regByMobileObj.setSid(sid);
			  },500)
		  }
	  })
	  $('#stationDetail_phone,#stationDetail_phone2').unbind('tap').tap(function(){
		   $('#stationDetail_telTip').show();
	  })
	   $('#stationDetail_im').unbind('tap').tap(function(){
		   stationDetailObj.goIm();
	  })
	  $('#stationDetail_location').unbind('tap').tap(function(){
		   stationInfoObj.goBack = function(){
				stationInfoObj.destroy();
				stationDetailObj.show();   
		   }
		   stationInfoObj.show('reload',function(){
			  stationInfoObj.getData(stationDetailObj.sid);  
		   })
	  })
	  
	  $('#stationDetail_share').unbind('tap').tap(function(){
		    var obj = {
			//'url':stationDetailObj.shareUrl, 
			'domId': 'stationDetail',
			'title':stationDetailObj.shareTitle,
			'content' : stationDetailObj.shareContent,
			//'imagePath' :  stationDetailObj.shareImg
		  }
		  Global.socialShare(obj);
	  })
	  
	  $('#stationDetail_codeImg').unbind('tap').tap(function(){
		  stationCodeObj.goBack = function(){
			 stationCodeObj.destroy();
			 stationDetailObj.show();  
		  }
		  stationCodeObj.show('reload',function(){
			 stationCodeObj.setData({'image':stationDetailObj.codeUrl,'id':stationDetailObj.sid })  
		  })
	  })
	  
	  //站主端查看会员做单
	  $('#stationDetail_order').unbind('tap').tap(function(){
			memberBetRecordObj.goBack = function(){
				memberBetRecordObj.destroy();
				stationDetailObj.show();	
			}
			memberBetRecordObj.show();
	  })
	  //管理站点
	  $('#stationDetail_manage').unbind('tap').tap(function(){
		  if(stationDetailObj.noEdit == 'wait'){
			$.alertMsg('您上次提交的资料尚在审核中');
			return false;  
		  }
		  modifyStationInfoObj.goBack = function(){
			 modifyStationInfoObj.destroy();
			  var sid = stationDetailObj.sid;
			  stationDetailObj.show('reload',function(){
				stationDetailObj.getData(sid);   
		      });	
		  }
		  modifyStationInfoObj.show('reload',function(){
			 modifyStationInfoObj.getData(stationDetailObj.info.station_id)  
		  })
	  })
  }
  
  stationDetailObj.formatHtml = function(obj){
	  //console.log(obj);
	$('#stationDetail_toTel').attr('href','tel:' + obj.phone);
	$('#stationDetail_telNum').html(obj.phone);
	$('#stationDetail_id').html(obj.station_id);
	$('#stationDetail_status').html(obj.work_status_cn);
	$('#stationDetail_time').html(obj.open_time + '-' + obj.rest_time );
	$('#stationDetail_address').html(obj.address);
	$('#stationDetail_bind').attr('data-sid', obj.station_id);
	if(obj.describe){
		$('#stationDetail_desc').html(obj.describe);
	}
	if(obj.code_url){
		$('#stationDetail_codeImg').html('<img src="' + obj.code_url + '" />');	
	}
	this.codeUrl = obj.code_url;
	if(loginObj.isLogin && loginObj.userInfo.user_type == 'Station' && loginObj.userInfo.station_id == obj.station_id){  //站主端
		$('#stationDetail_part1').hide();
		$('#stationDetail_part3').show();
		$('#stationDetail_todayBet').html(obj.tostationCount);
		$('#stationDetail_manage').show();
	}else{  //会员端
		$('#stationDetail_part1').show();
		$('#stationDetail_part3').hide();
		$('#stationDetail_manage').hide();
	}
		if(obj.image && obj.image.length > 0){
		this.shareImg = obj.image[0];
	}
	//this.shareContent = 'NO.'  + obj.station_id + '彩票站，营业时间为' + obj.open_time + '-' + obj.rest_time +'。为您的购彩提供服务';
    this.shareContent = 'NO.'  + obj.station_id + '彩票站为您的购彩提供服务';
    this.shareTitle = '广东体彩云，为您找到身边的投注站';
	this.shareUrl = obj.share_url;
	this.noEdit = obj.audit_status;
	
  }
  
  stationDetailObj.createBanner = function(arr){
	  var html = '';
	  for(var i=0;i<arr.length;i++){
		 html += '<li><a href="javascript:void(0)"><img src="'+ arr[i]  +'"></a></li>'  
	  }
	  $('#stationDetail_bannerObj').find('ul').html(html);
	  $('#stationDetail_total').html(arr.length);
	  $("#stationDetail_nowNumObj").html('1');
	  $("#stationDetail_bannerObj").height(170).swipeSlide({
		  continuousScroll:true,
		  speed:6000,
		  lazyLoad:true,
		  endCallBack : function(i){ 
			$("#stationDetail_nowNumObj").html(i+1);
		  },
		  callback:function(i){
			$("#stationDetail_nowNumObj").html(i+1);  
		  }
	  });
	  $("#stationDetail_bannerObj").find('img').css({'height':170});
  }
  
  //去原生聊天
  stationDetailObj.goIm = function(){
	  if(loginObj.isLogin){
		  if(ConfigObj.platForm == 'android'){
			  if(typeof android_obj != 'undefined'){
				  if(this.info && this.info.chatUserInfo){
					//android_obj.intentConversationDetail(this.info.chatUserInfo.userId,this.info.chatUserInfo.name);
				  }
			  }
		  }else if(ConfigObj.platForm == 'ios'){
			  if(typeof ios_obj != 'undefined'){
				  if(this.info && this.info.chatUserInfo){
					ios_obj.intentConversationDetail(this.info.chatUserInfo.userId,this.info.chatUserInfo.name);
				  }
			  }
		  }  
	  }else{
		loginObj.goBack = function(){
			stationDetailObj.show();	
		}
		loginObj.goForward = function(){
			stationDetailObj.show('',function(){
				stationDetailObj.getData(stationDetailObj.sid)	
			});	
		}
		loginObj.show();
	  }
  }

  stationDetailObj.onloadExecution = function(){
    this.createDom();
	this.createEvent();
  }

  stationDetailObj.init = function(){
     this.setDefConfig();
     stationDetailObj.onloadExecution();
  }
   
  stationDetailObj.createBonus = function(data){
	 var html = '';
	 if(!data.length){
		$('#stationDetail_bonus').hide();
		return; 
	 }
	 for(var i=0;i<data.length;i++){
		 var itm = data[i];
		 var cls = '';
		 var statusText = itm.statusText;
		 if(itm.status == 2){  //已结束
			 cls = 'got'; 
		 }else if(itm.status == 1){  //正在进行
			 if(itm.getBonusStatus && itm.getBonusStatus != 'not'){
				cls = 'got'; 
			 }else{
				cls = (itm.bonusScene == 'plat') ? 'cps-s2' : 'cps-s1'; 
			 }
		 }else{
			 cls = (itm.bonusScene == 'plat') ? 'cps-s2' : 'cps-s1'; 
		 }
		 html += '<li class="c-item cps '+ cls +'" data-v="'+ itm.bagRuleId +'">'+
						'<a href="javascript:void(0)">'+
							'<p class="cps-txt center font12">'+
								itm.ruleTitle +
								'<br><span class="font16">'+ itm.singleBagmoney + '</span>元'+
							'</p>'+
						'</a>'+
						'<span class="cps-rt font12">'+ itm.statusText + '</span>'+
					'</li>'
	 }
	 var width = 120 * data.length;
	 $('#stationDetail_bonus').find('ul').html(html).css({'width':width});
	 $('#stationDetail_bonus').find('li').tap(function(){
		  var id = $(this).attr('data-v');
		 /* redBagObj.goBack=function(){
			  redBagObj.destroy();
			  stationDetailObj.show('reload',function(){
				 stationDetailObj.getData(stationDetailObj.sid); 
			  });  
		  }*/
		  redBagObj.show('',function(){
			 redBagObj.getData(id);
			 redBagObj.pushRoute(function(){
				 stationDetailObj.getData(stationDetailObj.sid); 
			 })
		  })
	 })
	 
  }
  
  
  //根据sid ajax获取站点信息
  stationDetailObj.getData = function(sid){
	  var self = this;
	  self.sid = sid;
	  $.ajax({
			//url : ConfigObj.localSite +  '?m=user.station.getStationInfo',
			url : ConfigObj.localSite +  '?version=1&m=user.station.index',
			data : {'sid': sid,'access_token':loginObj.access_token},
			dataType : "json",
			type : "post",
			success : function(msg){
				//console.log('站点信息返回',msg);
				if(msg.code == '0000'){
					self.formatHtml(msg.info);
					if(msg.info.image && msg.info.image.length > 0){ 
						self.createBanner(msg.info.image);
					}
					//if(msg.info.bonus_list && msg.info.bonus_list.length > 0){
						self.createBonus(msg.info.bonus_list);	
					//}
					self.info = msg.info;
				}else{
					$.alertMsg(msg.code_str);
				}
			}
		});
	  
  }
  
    stationDetailObj.setDefConfig = function(){
		this.sid = '';
		this.info = '';
		this.shareImg = '';
		this.shareTitle = '';
		this.shareConent = '';
		this.shareUrl = '';	
		this.noEdit = '';
   }
	
	stationDetailObj.dirShow = function(obj){
		var self = this;
		self.show('reload',function(){
			self.getData(obj.sid);	
		});  
	}
	
	
