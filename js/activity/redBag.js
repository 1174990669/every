
  var redBagObj = new PageController({
	   'name': 'redBag',
	   'tpl' : 'template/activity/redBag.html',
	   'initScrollTop': true
    });
  

  redBagObj.createDomObj = function(){
    this.activeObj = $("#redBag_activeObj");
    this.getObj = $("#redBag_getObj");
    this.succObj = $("#redBag_succObj");
	this.backBtn = $('#redBag_back');
	this.wrapCObj = $('#redBag_wrapC');
	this.wrapTotal = $('#redBag_wrapTotal');
  }

  redBagObj.createEvent = function(){
	$('#redBag_share').unbind('tap').tap(function(){
	  var obj = {
		'url': ConfigObj.touchWebSite  +'activity/info/' + redBagObj.id + '?sharefrom=app',   
		'domId': 'redBag',
	  }
	  Global.socialShare(obj)
	})
	$('#redBag_close').unbind('tap').tap(function(){
		redBagObj.switchPanel()
		$('#redBag_shareWrap').hide();
	})
	this.backBtn.unbind('tap').tap(function(){
		redBagObj.goBack();
	})
	
    this.wrapTotal.unbind('tap').tap(function(e){
      var aObj = $.oto_checkEvent(e,"A");
      if(aObj){
        var thisObj = $(aObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "get" : redBagObj.getAjax();return true;
          case "url" : redBagObj.hrefUrl(thisObj);return true;
		  case "use" : redBagObj.goHome(thisObj);return true;
		  case "stationUse" : redBagObj.showUseTip(thisObj);return true;
			case "target": redBagObj.goTarget(thisObj);return true;
        }
      }
	  
    });
  }

  redBagObj.hrefUrl = function(obj){
	var self = this;
    var thisH = obj.attr("data-v");
    switch(thisH){
		case 'record':
			if(obj.hasClass('disabled')) return;
			/*Global.GC();    //原代码
			bonusRecordObj.goBack=function(){
				bonusRecordObj.destroy();
				homeObj.show();	
			}
			bonusRecordObj.show();*/
			bonusRecordObj.goBack=function(){
				bonusRecordObj.destroy();
				self.show();	
			}
			bonusRecordObj.show();
			break;	
		case 'home':
			Global.GC();
			homeObj.show();
	}
  }
  
  
  
  redBagObj.getData = function(id,from){
	  this.id = id;
	  this.from = from;

	  var api = '?version=1&m=user.activity.info';
	  if (from === 'record') api = '?version=1&m=user.record.bonusDetail'

	  var postData = {
		'access_token' :  loginObj.access_token,
		'id': id
	  }
	  var self = this;
	  $.ajax({
          url: ConfigObj.localSite + api,
		  data : postData,
		  type : "post",
		  dataType : "json",
		  success : function(msg){
//				console.log('红包详情', msg);
				if(msg.code == "0000"){
					//console.log(msg.info.event)
				  self.formatHtmlA(msg.info.event);
	        self.formatHtmlB(msg.info.event);
	        self.formatHtmlC(msg.info.bonus_detail);
	        self.toggleBottom(msg.info.event);
			if (msg.type== "yes") {
			   	$('#redBag_get').css('background','gray');
			   	$('#redBag_get').css('color','#fff');
			   	$('#redBag_get').text('已领取');
			}else{
			   	$('#redBag_get').css('background','#fcdd52');
			   	$('#redBag_get').css('color','#333');
			   	$('#redBag_get').text('立即领取');
			   }
					if(redBagObj.flag){
					  loginObj.goBack=function(){   //解决一个bug的变通方法 防止形成死链接
						  homeObj.show();   
					  }
					  stationDetailObj.goBack = function(){   //解决一个bug的变通方法 防止形成死链接
						  Global.GC();
						  homeObj.show();
					  }
				  }
				}else{
				  $.alertMsg(msg.code_str);
				}
		  }
	  });  
  }
  
  redBagObj.formatHtmlA = function(itm){
	  var html = '';
	  var timeStatus = '';
	  var disCls = '';
	  //console.log(itm);
	  if(itm.is_enable == 'N'){
		  timeStatus = '【已结束】';
		  disCls = 'actDisable_1';
	  }else{
		  if(itm.time_status == 2){
			timeStatus = '【即将开始】';
		  }else if(itm.time_status == 0){
			 timeStatus = '【已结束】';
		  	 disCls = 'actDisable_1'; 
		  }else{
			timeStatus = '【进行中】';  
		  }
	  }
//	  html += '<div class="act_li" >'+
//						'<div class="pboxwrap coup-'+ itm.bonus_scene  +' ' + disCls + '">'+
//							'<div class="pwdbox">'+
//								'<span class="coup-style">'+ itm.bonus_scene_text + '</span>'+
//								'<span class="bigdot b1"></span>'+
//								'<span class="bigdot b2"></span>'+
//								'<p class="smdots s1"><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span>'+
//								'</p>'+
//								'<p class="smdots s2"><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span>'+
//								'</p>'+
//								'<div class="coup-info center">'+
//									'<p class="font16">'+ itm.single_bagmoney + '元</p>'+
//									'<p class="font16">'+ itm.rule_title + '</p>'+
//									'<p class="font12">' + timeStatus +' '+  (loginObj.isLogin && itm.activation_time ? itm.activation_time + '领取' : '') +'<p>'+
//								'</div>'+
//							'</div>'+
//						'</div>'+
//						'<p class="font12 gray center">活动时间：'+ itm.begin_time.substr(0,10) + '至' + itm.end_time.substr(0,10) + '</p>'+
//				'</div>'; 	 
				
		html += '<div class="act_li">' +
	        		'<div class="act_bg" id="act_bg">'+
	        			'<div class="act_inbg clearfix" id="act_inbg">'+
	        				'<div class="act_money fl">'+
	        					'<p>¥</p>'+
	        					'<span>' + itm.single_bagmoney + '</span>'+
	        				'</div>'+
	        				'<div class="act_content fl">'+
	        					'<h4>' + itm.rule_title + '</h4>'+
	        					'<p>' + itm.bonus_conditions_text.amount + '</p>'+
	        					'<span>活动时间：' + itm.begin_time.substr(0, 10) + '至' + itm.end_time.substr(0, 10) + '</span>'+
	        				'</div>'+
	        			'</div>'+
	        			'<div class="act_pt">'+
	        				'<p>平台</br>通用</p>'+
	        			'</div>'+
	        		'</div>'+
	        	'</div>';
				
	  $('#redBag_wrapA').html(html); 
	 
  }
  
  redBagObj.formatHtmlB = function(itm){
	  var html = '';
	  html +=   '<h2 class="font16"　>红包规则</h2>'+
	            '<div class="rules-txt" >'+
//	            '<b class="dot">·</b> 活动发起：'+ itm['rule_sponsor'] + '<br/>'+
                '<b class="dot">·</b> 有效时间：'+ itm['bonus_conditions_text']['datetime'] + '<br/>'+
                '<b class="dot">·</b> 领取用户：'+ itm['bonus_property_text'] + '<br/>'+
                '<b class="dot">·</b> 彩种限制：购买' + itm['bonus_conditions_text']['lottery'] + '可用<br/>'+
                '<b class="dot">·</b> 订单金额：'+ itm['bonus_conditions_text']['amount'] + '<br/>'+
                '<b class="dot">·</b> 使用次数：' + itm['bonus_conditions_text']['times'] + '<br/>'+
                '<b class="dot">·</b> 红包描述：'+ itm['bonus_content'] + '<br/>'+
                //'<b class="dot">·</b> 如有疑问请联系客服 <a href="tel://400-968-3766">400-968-3766</a><br/>'+
				'</div>';
				
	  $('#redBag_wrapB').html(html);
	  $('#redBag_wrapB').get(0).className = 'hbrule coup-'+ itm.bonus_scene;
	  if(itm.attended == 'yes'){
		 $('#redBag_get').text('已领取').addClass('got');  
		// $('#redBag_wrapB').parent().addClass('disable_rb');
	  }else if(itm.time_status == 0 || itm.time_status == 2){
		 $('#redBag_get').text('立即领取').addClass('got');
		 if(itm.time_status == 0){
		 	$('#redBag_wrapB').addClass('disable_rb');
		 }
	  }else{
	  	 $('#redBag_get').text('立即领取').removeClass('got');  
	  }
  }

  redBagObj.formatHtmlC = function (obj) {
      //console.log(obj);
      if(this.from == undefined){
      	$('#redBag_Record').hide();
      	return false;
      };
      if (!obj.info.length) {
          var html = '<p class="gray norecord">暂无使用记录</p>';
      } else {
          var trs = '<tr><th width="30%">时间</th><th width="22%">使用金额</th><th width="22%">退回金额</th><th>状态</th></tr>';
          obj.info.forEach(function (v) {
              trs += '<tr><td>' + v.create_time + '</td><td>' + v.coin_out + '</td><td>' + v.coin_in + '</td><td><a  data-t="target" data-type="' + v.target_type + '" data-id="' + v.target_id + '">成功<em class="r-arrow"></em></a></td></tr>';
          });

          html = '<table cellpadding="0" cellspacing="0" border="0" width="100%" class="center"><tbody>' + trs + '</tbody></table>';
      }

      $('#redBag_useRecord').html(html);
  }

  redBagObj.getAjax = function(){
	if($('#redBag_get').hasClass('got')) return false;
	if(!loginObj.isLogin){
		loginObj.goBack = function(){
			redBagObj.show();	
		}
//		console.log(redBagObj.id)
		var id = redBagObj.id;
		var from = redBagObj.from;
		loginObj.goForward = function(){
			redBagObj.show('reload',function(){
				redBagObj.flag = true;  //不重要，解决一个bug的变通
				redBagObj.getData(id,from);	
			});	
		}
		$.alertMsg('请先登录',false);
		loginObj.show();
		return;	
	}
	var postData = {
		'id' : redBagObj.id,
		'access_token' : loginObj.access_token
	}
    $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=user.activity.receive',
      data : postData,
      type : "post",
      dataType : "json",
      success : function(msg){
		//console.log('红包获取',msg);
        if(msg.code == "0000"){
          $.alertMsg(msg.code_str,true);
		  $('#redBag_get').addClass('got');
        }else{
          $.alertMsg(msg.code_str);
        }
      }
    });
  }

  redBagObj.toggleBottom = function(obj){
	   var self = this;
	   if(self.from == 'record'){
		    var html = '';
			html += '<span class="first gray">还剩<em class="fontred">'+ obj.use_money  +'元</em></span>';
			if(obj.get_bonus_status == 'yes' && (Number(obj.use_money) > 0)){
				//html += '<a data-t="stationUse" href="javascript:void(0)">站点使用</a>';
                html += '<a>&nbsp;</a>';
				html += '<a data-t="use" href="javascript:void(0)" class="act-btn fr">立即使用</a>';
			}else{
				//html += '<a data-t="stationUse" href="javascript:void(0)" class="disabled">站点使用</a>';
                html += '<a>&nbsp;</a>';
				html += '<a data-t="use" href="javascript:void(0)" class="disabled fr">立即使用</a>';
			}
			if(obj.bonus_type && obj.bonus_type == 'QRCode'){
				var str = '<img src="'+ obj.QrCode +'" />';
				$('#redBag_stationTip').find('p').html(str);
			}else{
				if(obj.key_code){
					var str = '';
					str += '<span class="mr10">序列号:'+ obj.key_code.key +  '</span><span>验证码:'+ obj.key_code.code + '</span>'	;
					$('#redBag_stationTip').find('p').html(str);
				}
			}
			$('#redBag_wrapD').html(html);
			$('#redBag_wrapC').hide();
			$('#redBag_wrapD').show();   
			
	   }else{
		    $('#redBag_wrapC').show();
			$('#redBag_wrapD').hide();   
	   }
	   
	   if(loginObj.isLogin){
		  $('#redBag_my').removeClass('disabled');   
	   }else{
		  $('#redBag_my').addClass('disabled'); 
	   }
  }
  
  redBagObj.goHome = function(obj){
	  if(obj.hasClass('disabled')) return;
	  Global.GC();
	  homeObj.show();  
  }

  redBagObj.goTarget = function (obj) {
      var type = obj.attr('data-type').toLowerCase();
      var id = obj.attr('data-id');
      var redBagId = redBagObj.id;
      switch (type) {
          case 'plan':
              planDetailObj.goBack = function () {
				  redBagObj.show(); // 返回不重载
                  planDetailObj.destroy();
              };

              planDetailObj.show('reload', function () {
                  planDetailObj.getData(id);
              });
              break;
          case 'project':

              projectDetailObj.goBack = function () {
                  redBagObj.show();  // 返回不重载
                  projectDetailObj.destroy();
              };

              projectDetailObj.show('reload', function () {
                  projectDetailObj.getData(id);
              });
              break;
      }
  }

  redBagObj.showUseTip = function(obj){
	 if(obj.hasClass('disabled')) return;
	 if( $('#redBag_stationTip').css('display') == 'none'){
		 $('#redBag_stationTip').show();
		 redBagObj.addBgLayer($('#redBag_stationTip'))
	 }else{
		 $('#redBag_stationTip').hide();
		 redBagObj.removeBgLayer();
		redBagObj.switchPanel();
	 }
  }
  
  redBagObj.addBgLayer = function(layer){
    var bg = '<div style="width:100%;height:100%;background:transparent;position:absolute;left:0;top:0;z-index:99" id="redBag_bgLayer"></div>';
    if($('#redBag_bgLayer').length == 0){
      $('#redBag').append(bg);
      $('#redBag_bgLayer').css({'height':document.documentElement.scrollHeight || document.body.scrollHeight})
      $('#redBag_bgLayer').unbind('tap').tap(function(){
        layer.hide();
        $('#redBag_bgLayer').remove();
      })
    }
  }
  
  redBagObj.removeBgLayer = function(){
	   $('#redBag_bgLayer').remove();
  }
  
  redBagObj.switchPanel = function(){
	  if(redBagObj.from == 'record'){
			$('#redBag_wrapC').hide();
			$('#redBag_wrapD').show();	
		}else{
			$('#redBag_wrapC').show();
			$('#redBag_wrapD').hide();	
		}
  }

  redBagObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
  }

  redBagObj.init = function(){
	  redBagObj.setDefConfig();
      redBagObj.onloadExecution();
  }
  
  redBagObj.setDefConfig = function(){
	 this.id = '';
	 this.from = '';
	 this.flag = false;
  }

  redBagObj.dirShow = function (obj) {
      var self = this;
      self.show(true, function () {
          // 默认从 我的红包 页面过来
          self.getData(obj.id, 'record');
      });
  }
	
  redBagObj.goBack = function(){
	  var self = this;
	  self.popRoute();
  }
  
  redBagObj.destroy = function(){
	  this.setDefConfig();
	  $('#redBag').html('').remove();
	  this.routeArr = [];
	  //console.log('红包详情页面销毁全部路由关系------------------------------');
  }
	
  

