
  var planSubDetailObj = new PageController({
	   'name': 'planSubDetail',
	   'tpl' : 'template/record/planSubDetail.html'
    });

  planSubDetailObj.createDom = function(){
    this.wrapperObj = $("#planSubDetail_wrapperObj");
	this.wrapA = $('#planSubDetail_wrapA');
	this.wrapB = $('#planSubDetail_wrapB');
	this.wrapC = $('#planSubDetail_wrapC');
	this.wrapD = $('#planSubDetail_wrapD');

  }
// projectSubDetail 
  planSubDetailObj.createEvent = function(){
  	
    this.wrapperObj.unbind('tap').tap(function(e){
     
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "backbtn" : planSubDetailObj.goBack();return true;
			case 'fk': planSubDetailObj.continuePay(thisObj);return true;
        }
      }
	  
	  var divObj = $.oto_checkEvent(e,"DIV");
      if(divObj){
        var thisObj = $(divObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "ticketDetail" : planSubDetailObj.goTicketDetail(thisObj.attr('data-v'));return true;
        }
      }
    });
  }

  /**
   * 继续付款
   * @param {jQuery} element
   */
  planSubDetailObj.continuePay = function (element) {
      var money = element.attr('data-money');
      var planId = element.attr('data-planId');
      var lotteryType = element.attr('data-lotteryType');

      //console.log(money, planId, lotteryType);

      buyConfirmObj.goBack = function () {
          buyConfirmObj.destroy();
          planSubDetailObj.show();
      };

      buyConfirmObj.show(true, function () {
          buyConfirmObj.setData({
              'product_id': planId,
              'pay_amount': money,
              'lotteryType': lotteryType,
              'product_type': 'plan'
          });
      })
  };
  
  planSubDetailObj.goTicketDetail = function(id){
	  ticketDetailObj.goBack = function(){
		 ticketDetailObj.destroy();
		 planSubDetailObj.show();  
	  }
	  ticketDetailObj.show('reload',function(){
		 ticketDetailObj.setData(id);
		 ticketDetailObj.getData();  
	  });
  }

  planSubDetailObj.onloadExecution = function(){
    this.createDom();
    this.createEvent();
  }

  planSubDetailObj.init = function(){
      planSubDetailObj.onloadExecution();
  }
  
  planSubDetailObj.setDefConfig = function(){
	 this.plan_id = '';   //方案id 
  }
  
  planSubDetailObj.getData = function(id){
	  var self = this;
	  this.plan_id = id;  
	  var postData = {
		'planid' : id 
	  }
	  $.ajax({
		url : ConfigObj.localSite +  '?version=1&m=user.plan.pace',
		type:'post',
		data: postData,
		dataType:'json',
		success:function(obj){
			//console.log('追号详情子页面subDetail返回数据: ', obj);
			if(obj.code == '0000'){
				self.formatHtmlA(obj.info);
				self.formatHtmlB(obj.info);
				self.formatHtmlC(obj.info);
				self.formatHtmlD(obj.info);
			}else{
				$.alertMsg(obj.code_str);
			}
		}
	  })
  }
  
  planSubDetailObj.formatHtmlA = function(obj){
	 var data = obj.head;
	 var html = '<p class="pt15">投注金额</p>'+
			    '<p class="font12 gray">'+ data.create_time  +'</p>'+
			    '<span class="font16 fontred money">'+ data.money +'元</span>';  
	 this.wrapA.html(html); 
  }
  
  planSubDetailObj.formatHtmlB = function(obj){
	  $('#planSubDetail_pid').html(obj.head.plan_id);
	  var status = obj.head.run_status;
	  var html =  '<span class="line line_over"><em class="dot dot_over"></em></span>';
	  if(status == 'Run' || status == 'Stop'){
		  html +=  '<span class="line line_over"><em class="dot dot_over"></em></span>'; 
	  }else{
		  html +=  '<span class="line "><em class="dot "></em></span>';
	  }
	  if(status == 'Run' || status == 'Stop'){
		  html +=  '<span class="line line_over"><em class="dot dot_over"></em></span>'; 
	  }else{
		  html +=  '<span class="line "><em class="dot "></em></span>';
	  }
	  this.wrapB.html(html);
  }
  
  planSubDetailObj.formatHtmlC = function(obj){
	 var html = '';
	 var data = obj.content;
	 html += '<div class="jdli">'+
				  '<p class="">'+ data.submit_info.msg +'</p>'+
				  '<p class="font12 gray">'+ data.submit_info.time_desc + '</p>'+
			  '</div>'+
			  '<div class="jdli">'+
				  '<p class="">'+ data.pay_info.msg + '</p>'+
				  '<p class="font12 gray">'+ data.pay_info.time_desc + '</p>'+
			  '</div>'+
			  <!-- 完成状态 -->
			  '<div class="jdli">'+
				  '<p class="">'+ data.com_info.msg + '</p>'+
				  '<p class="font12 gray">'+ data.com_info.time_desc + '</p>'+
			  '</div>';				 
	 this.wrapC.html(html);
	  
  }
  
  planSubDetailObj.formatHtmlD = function(obj){
  	  var html = '';
	  if(obj.tail.current_status == "succ"){
		 html += '<p class="smtip font16"><span class="suc_icon tipicon"></span>' + obj.tail.current_statuscn + '</p>';
	  }else if( obj.tail.current_status=="pay"){
          html += '<p class="smtip font16" data-t="fk" data-money="' + obj.head.money + '" data-planId="' + obj.head.plan_id + '" data-lotteryType="' + obj.head.lottery_type + '"><span class="wait_icon tipicon"></span>' + obj.tail.current_statuscn + '</p>';
	  }else if(obj.tail.current_status=="close"){
		 html += '<p class="smtip font16"><span class="err_icon tipicon"></span>' + obj.tail.current_statuscn+ '</p>';
	  }
	  this.wrapD.html(html);
  }
  
  planSubDetailObj.dirShow = function(obj){
	var self = this;
	self.show('reload',function(){
		self.getData(obj.pid);	
	});  
	
  }
  
  
