
  var withdrawDetailObj = new PageController({
	   'name': 'withdrawDetail',
	   'tpl' : 'template/record/withdrawDetail.html'
    }); 
  
  withdrawDetailObj.createDom = function(){
	this.wrapTotal = $('#withdrawDetail_wrapTotal');
	this.wrapA = $('#withdrawDetail_wrapA');
	this.wrapB = $('#withdrawDetail_wrapB');
	this.wrapC = $('#withdrawDetail_wrapC');
	this.wrapD = $('#withdrawDetail_wrapD');
  }
  
  withdrawDetailObj.createEvent = function(){
	this.wrapTotal.unbind('tap').tap(function(e){
		var AObj = $.oto_checkEvent(e,"A");
		if(AObj){
			var thisObj = $(AObj);
			var thisT = thisObj.attr("data-t");
			switch (thisT){
				case 'back' : withdrawDetailObj.goBack();return true;
				case 'home' : withdrawDetailObj.goHome();return true;
				case 'draw' : withdrawDetailObj.goDraw();return true; 
			}
		}	
	});  
	  
  }
  
  withdrawDetailObj.goHome = function(){
	 Global.GC();
	 homeObj.show();  
  }
  
  withdrawDetailObj.goDraw = function(){
	  Global.GC();
	  withdrawSelectObj.goBack = function(){
		 withdrawSelectObj.destroy();
		 homeObj.show();  
	  }
	  withdrawSelectObj.show('reload',function(){
		   withdrawSelectObj.getData();
	  });
  }
  
  withdrawDetailObj.onloadExecution = function(){
	  withdrawDetailObj.createDom();
	  withdrawDetailObj.createEvent();
  }
  
  withdrawDetailObj.getData = function(id){
	  var self = this;
	  console.log()
	  var postData = {
		 'oid' : id
	  }
	  var secretData = {
			'para' : Global.encrypt(postData),
			'access_token': loginObj.access_token
		};
	  $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=user.Order.index',
      type : "post",
      data : secretData,
      dataType : "json",
      success : function(msg){
		console.log('提现详情数据', msg);
		
//		console.log('提现详情数据', msg);
		if(msg.code == '0000'){
			msg.info = $.parseJSON(Global.crypt(msg.info));
//			console.log('提现详情数据', msg);
			$('#withdrawDetail_orderNum').html(msg.info.order_id);
			self.formatHtmlA(msg.info);
			self.formatHtmlB(msg.info);
			self.formatHtmlC(msg.info);
			self.formatHtmlD(msg.info.order_info.pay_method);
		}else{
			$.alertMsg(msg.code_str);	
		}
      }
    });
	  
  }
  
  withdrawDetailObj.formatHtmlA = function(data){
	  var obj = data.order_info;
	  var colorCls = 'fontred';
      if (['not', 'cancel', 'Audited', 'Closed'].indexOf(data.current_status) !== -1) colorCls = 'gray';
      //console.log(colorCls, data.current_status);
	  var html =    '<p class="pt15">'+obj.pay_method_cn+'</p>'+
					'<p class="font12 gray">' + obj.create_time + '</p>'+
					'<span class="font16 ' + colorCls + ' money">-'+ obj.amount +'元</span>';
	  this.wrapA.html(html);
  }
  
  withdrawDetailObj.formatHtmlB = function(data){
      var status = data.current_status;
      var html = '<span class="line line_over"><em class="dot dot_over"></em></span>';
		
		if(data.order_info.pay_method == "batchPayToWechat"){
			  if (status === 'not')
	      	html += '<span class="line"><em class="dot dot_half"></em></span>';
	      else if (status === 'succeed')
	      	html += '<span class="line line_over"><em class="dot dot_over"></em></span>';
	      else if (status === 'audited' || status === 'remited')
	      	html += '<span class="line"><em class="dot dot_over"></em></span>';
	      else if (status === 'cancel') {
	          if (data.order_info.send_status === 'Y' && data.order_info.batch_no != '')
	          	html += '<span class="line"><em class="dot dot_over"></em></span>';
	          else html += '<span class="line"><em class="dot "></em></span>';
	      } else html += '<span class="line"><em class="dot"></em></span>';
	      
		    if (status === 'cancel')
			      html += '<span class="line"><em class="dot"></em></span>';
			  else if (status === 'succeed')
			      html += '<span class="line"><em class="dot dot_over" ></em></span>';
			  else html += '<span class="line"><em class="dot"></em></span>';
			  
		} else{
				if (status === 'not')
	      	html += '<span class="line"><em class="dot dot_half"></em></span>';
	      else if (status === 'audited' || status === 'remited' || status === 'succeed')
	      	html += '<span class="line line_over"><em class="dot dot_over"></em></span>';
	      else if (status === 'cancel') {
	          if (data.order_info.send_status === 'Y' && data.order_info.batch_no != '')
	          	html += '<span class="line line_over"><em class="dot dot_over"></em></span>';
	          else html += '<span class="line"><em class="dot "></em></span>';
	      } else html += '<span class="line"><em class="dot"></em></span>';
	//
	      if (status === 'audited')
	          html += '<span class="line"><em class="dot dot_half"></em></span>';
	      else if (status === 'remited')
	          html += '<span class="line"><em class="dot dot_half"></em></span>';
	      else if (status === 'succeed')
	          html += '<span class="line line_over"><em class="dot dot_over"></em></span>';
	      else if (status === 'cancel')
	          html += '<span class="line"><em class="dot "></em></span>';
	      else html += '<span class="line"><em class="dot"></em></span>';
	//
	      if (status === 'cancel')
	          html += '<span class="line line_over"><em class="dot"></em></span>';
	      else if (status === 'succeed')
	          html += '<span class="line line_over"><em class="dot dot_over" ></em></span>';
	      else html += '<span class="line"><em class="dot"></em></span>';
		}

	  this.wrapB.html(html);
  }
  
  withdrawDetailObj.formatHtmlC = function(obj){
	   if(obj.order_info.pay_method == "batchPayToWechat"){
	   		var html = '<div class="jdli">'+
						'<p class="font16">'+ obj.create_info.item_cn + '</p>'+
//						'<p class="font12 gray"'+  (obj.create_info.notice_msg=='' ?  ' style="display:none"' : '') +'>'+
//						obj.create_info.notice_msg+'</p>'+
						'<p class="font12 gray">'+ obj.create_info.time_desc+ '</p>'+
					'</div>'+
					'<div class="jdli">'+
						'<p class="font16">' + obj.audit_info.item_cn + '</p>'+
						'<p class="font12 gray"'+  (obj.audit_info.notice_msg==''?' style="display:none"' : '') +'>'+
						obj.audit_info.notice_msg + '</p>'+
						'<p class="font12 gray">'+ obj.audit_info.time_desc + '</p>'+
					'</div>'+
					'<div class="jdli">'+
						'<p class="font16">'+ obj.deal_info.item_cn +'</p>'+
						'<p class="font12 gray"'+ (obj.deal_info.notice_msg=='' ? ' style="display:none"' :'') +'>'+
						obj.deal_info.notice_msg + '</p>'+
						'<p class="font12 gray">'+ obj.deal_info.time_desc +'</p>'+
					'</div>';
	   } else{
	   	 var html = '<div class="jdli">'+
						'<p class="font16">'+ obj.create_info.item_cn + '</p>'+
//						'<p class="font12 gray"'+  (obj.create_info.notice_msg=='' ?  ' style="display:none"' : '') +'>'+
//						obj.create_info.notice_msg+'</p>'+
						'<p class="font12 gray">'+ obj.create_info.time_desc+ '</p>'+
					'</div>'+
					'<div class="jdli">'+
						'<p class="font16">' + obj.audit_info.item_cn + '</p>'+
						'<p class="font12 gray"'+  (obj.audit_info.notice_msg==''?' style="display:none"' : '') +'>'+
						obj.audit_info.notice_msg + '</p>'+
						'<p class="font12 gray">'+ obj.audit_info.time_desc + '</p>'+
					'</div>'+
					'<div class="jdli" >'+
						'<p class="font16">'+ obj.pay_info.item_cn +'</p>'+
						'<p class="font12 gray"'+ (obj.pay_info.notice_msg=='' ? ' style="display:none"' : '') + '>'+
						obj.pay_info.notice_msg +'</p>'+
						'<p class="font12 gray">'+ obj.pay_info.time_desc +'</p>'+
					'</div>'+
					'<div class="jdli">'+
						'<p class="font16">'+ obj.deal_info.item_cn +'</p>'+
						'<p class="font12 gray"'+ (obj.deal_info.notice_msg=='' ? ' style="display:none"' :'') +'>'+
						obj.deal_info.notice_msg + '</p>'+
						'<p class="font12 gray">'+ obj.deal_info.time_desc +'</p>'+
					'</div>';
	   }
	  
		////console.log(html);
		this.wrapC.html(html);
  }
  
  withdrawDetailObj.formatHtmlD = function(obj){
	   if(obj == "batchPayToWechat" ){
	   		var html = '<div class="jdli">'+
						'<p class="font16 gray">申请</p>'+
					'</div>'+
					'<div class="jdli">'+
						'<p class="font16 gray">审核</p>'+
					'</div>'+
					'<div class="jdli">'+
						'<p class="font16 gray">到账</p>'+
					'</div>';
	   } else{
	   	 var html = '<div class="jdli">'+
						'<p class="font16 gray">申请</p>'+
					'</div>'+
					'<div class="jdli">'+
						'<p class="font16 gray">审核</p>'+
					'</div>'+
					'<div class="jdli">'+
						'<p class="font16 gray">处理</p>'+
					'</div>'+
					'<div class="jdli">'+
						'<p class="font16 gray">到账</p>'+
					'</div>';
	   }
	  
		////console.log(html);
		this.wrapD.html(html);
  }
  
  
  withdrawDetailObj.init = function(){
	 withdrawDetailObj.onloadExecution();
  }
  
   