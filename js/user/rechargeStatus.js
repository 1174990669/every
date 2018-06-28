
	var rechargeStatusObj = new PageController({
	   'name': 'rechargeStatus',
	   'tpl' : 'template/user/rechargeStatus.html'
    });

	rechargeStatusObj.createDomObj = function(){
		this.wrapperObj = $("#rechargeStatus_wrapperObj");
		this.backObj = $('#rechargeStatus_backbtn');
		this.rechargeIdxObj = $('#rechargeStatus_rechargeIdx');
		this.betIdxObj = $('#rechargeStatus_betIdx');
		this.wrapA = $('#rechargeStatus_wrapA');
		this.wrapB = $('#rechargeStatus_wrapB');
		this.wrapC = $('#rechargeStatus_wrapC');
	}

	rechargeStatusObj.createEvent = function(){
		this.backObj.unbind('tap').tap(function(){
			rechargeStatusObj.goBack();
		})
		//跳转到继续充值
		this.rechargeIdxObj.unbind('tap').tap(function(){
			
			wechatpayWebObj.goBack = function () {
    		wechatpayWebObj.destroy();
    		userCenterObj.show(true);
      };
      // 来源为 用户中心
      wechatpayWebObj.dirShow({'from': 'rechargeStatus'});
			
			/*  bcy
			wechatpayAppObj.goBack = function(){
				wechatpayAppObj.destroy();
				userCenterObj.show()	
			}
			rechargeStatusObj.destroy();
			wechatpayAppObj.show(true);
			
			*/ 
//			alipayWapObj.goBack = function(){
//				alipayWapObj.destroy();
//				userCenterObj.show()	
//			}
//			rechargeStatusObj.destroy();
//			alipayWapObj.show();
		})
		
		//跳转到继续投注[首页]
		this.betIdxObj.unbind('tap').tap(function(){
			Global.GC();
			homeObj.show();
		})
	}
	
	rechargeStatusObj.formatHtmlA = function(obj){
		var colorCls = 'fontred';
        if (['not', 'cancel', 'Audited', 'Closed'].indexOf(obj.current_status) !== -1) colorCls = 'gray';

	 	var html = '<p class="pt15">订单号:' + obj.order_id + '</p>'+
					'<p class="font12 gray">' + obj.create_time + '</p>'+
					'<span class="font16 ' + colorCls + ' money">';
		if(obj.income_type){
			if(obj.income_type=='in'){
				html += '+';	
			}else{
				html += '-';
			}
		}
		html += obj.amount + '元</span>';
		this.wrapA.html(html);		
	}
	
	rechargeStatusObj.formatHtmlB = function(obj){
	 	var html = '<span class="line line_over"><em class="dot dot_over"></em></span>';
		if(obj.current_status == 'not'){
			html += '<span class="line"><em class="dot dot_half"></em></span>';	
		}else if(obj.current_status=='succeed' || obj.current_status=='payed' || obj.current_status=='close'){
			html += '<span class="line line_over"><em class="dot dot_over"></em></span>';
		}else if(obj.current_status=='cancel'){
			html += '<span class="line"><em class="dot"></em></span>';
		}else{
			html += '<span class="line"><em class="dot"></em></span>';	
		}
		
		if(obj.current_status=='succeed' || obj.current_status=='close'){
			html += '<span class="line"><em class="dot dot_over"></em></span>';
		}else if( obj.current_status=='cancel'){
			html += '<span class="line"><em class="dot"></em></span>';
		}else{
			html += '<span class="line"><em class="dot"></em></span>';
		}
		this.wrapB.html(html);				
	}
	
	rechargeStatusObj.formatHtmlC = function(obj){
	 	var html =	'<div class="jdli">'+
						'<p class="font16">' + obj.create_info.item_cn + '</p>'+
						'<p class="font12 gray" '+ (obj.create_info.notice_msg=='' ? ' style="display:none" ' : '') + '>'+
						 obj.create_info.notice_msg + '</p>'+
						'<p class="font12 gray">' + obj.create_info.time_desc + '</p>'+
					'</div>'+

					'<div class="jdli">'+
						'<p class="font16">'+ obj.process_info.item_cn + '</p>'+
						'<p class="font12 gray" ' + (obj.process_info.notice_msg=='' ? 'style="display:none"' : '')+ '>'+
						obj.process_info.notice_msg + '</p>'+
						'<p class="font12 gray">' + obj.process_info.time_desc + '</p>'+
					'</div>'+

					'<div class="jdli">'+
						'<p class="font16">' + obj.end_info.item_cn + '</p>'+
						'<p class="font12 gray">' + obj.end_info.time_desc + '</p>'+
					'</div>';
		this.wrapC.html(html);	
	}

	rechargeStatusObj.getData = function(id){
		var postData = {
			'oid':id	
		}
		var secretData = {
			'para': Global.encrypt(postData),
			'access_token': loginObj.access_token
		}
//		console.log(postData)
		$.ajax({
			url : ConfigObj.localSite +  '?version=1&m=user.order.save',   
			data : secretData,
			type : 'post',
			dataType : 'json',
			success : function(obj){
//				console.log('充值订单详情页面返回', obj);
				if(obj.code == '0000'){
					obj.info = $.parseJSON(Global.crypt(obj.info));
					rechargeStatusObj.formatHtmlA(obj.info);
					rechargeStatusObj.formatHtmlB(obj.info);
					rechargeStatusObj.formatHtmlC(obj.info);
					$('#rechargeStatus_topTit').html(obj.info.template_title);
				}else{
					$.alertMsg(obj.code_str);	
				}
			}
		});	
	}

	rechargeStatusObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
	}

	rechargeStatusObj.init = function(){
		rechargeStatusObj.onloadExecution();
	}
	
	rechargeStatusObj.setDefConfig = function(){
		 
	}
	
   
   
  rechargeStatusObj.dirShow = function(obj){
	this.show();  
	var id = (obj && obj.id) ? obj.id : '';
	this.getData(id); 
  }