
  var sendPrizeObj = new PageController({
	   'name': 'sendPrize',
	   'tpl' : 'template/activity/sendPrize.html'
    });

  sendPrizeObj.createDomObj = function(){
    this.wrapperObj = $("#sendPrize_wrapperObj");
  }

  sendPrizeObj.createEvent = function(){
    this.wrapperObj.tap(function(e){
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "back" : sendPrizeObj.goBack();return true;
        }        
      }
	  var aObj = $.oto_checkEvent(e,"A");
	  if(aObj){
        var thisObj = $(aObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "check" : sendPrizeObj.checkFun();return true;
		  case 'cancel' : $('#sendPrize_confirmTip').hide();return true;
		  case 'commit' : sendPrizeObj.sendFun();return true;
		  case 'share' : sendPrizeObj.share();return true;
		  case 'continue' : sendPrizeObj.continueFun();return true;
        }        
      }
     
    });
	
	$('#sendPrize_get').unbind('tap').tap(function(){
		$('#sendPrize_info').show();
	})
	$('#sendPrize_info').unbind('tap').tap(function(){
		$('#sendPrize_info').hide();
	})
	
  }
  
  sendPrizeObj.continueFun = function(){

	  Global.GC();
	  scorePrizeObj.goBack=function(){
		 scorePrizeObj.destroy();
		 homeObj.show();  
	  }
	  scorePrizeObj.show('',function(){
		 scorePrizeObj.getData(-1)  
	  });
  }
  
  sendPrizeObj.share = function(){
	  var obj = {
		//'url': ConfigObj.touchWebSite  + 'System/DownLoad/page?sharefrom=app',  
		'domId': 'sendPrize',
	  }
	  Global.socialShare(obj);  
	  
  }
  
  sendPrizeObj.sendFun = function(){
	  $('#sendPrize_confirmTip').hide();
	 var self = this;
	 var dataObj = {
		getprizeid : self.getprizeid,
		prizeid : self.prizeid,
		realName : $('#sendPrize_username').val(),
		mobile : $('#sendPrize_phone').val(),
		address : $('#sendPrize_address').val(),
		access_token : loginObj.access_token
	 }
	 $.ajax({
		  url : ConfigObj.localSite + '?version=1&m=user.activity.addContactInfo',
		  data : dataObj,
		  dataType : "json",
		  type : "post",
		  success : function(msg){
			  //console.log('发送地址返回',msg);
			  if(msg.code == '0000'){
				 $('#sendPrize_notGet').hide();
			     sendPrizeObj.getSendStatus();
			  }else{
				 $.alertMsg(msg.code_str);
			  }
		  }
	});  
  }
  
  sendPrizeObj.checkFun = function(){
	  if( $('#sendPrize_username').val() == ''){
		$.alertMsg('请填写真实姓名');
		return false;  
	  }
	  if( $('#sendPrize_phone').val() == ''){
		$.alertMsg('请填写手机号码');
		return false;  
	  }
	  if( $('#sendPrize_address').val() == ''){
		$.alertMsg('请填写详细收件地址');
		return false;  
	  }
	  $('#sendPrize_confirmTip').show();
  }
  
  
  sendPrizeObj.getData = function(obj){
	 //console.log(obj);
	 if(obj){
		var html = '<span class="cop1">'+  obj.prizeLevelText +'</span>'+
				   '<span class="cop2">'+ obj.prizeName + '</span>';
		$('#sendPrize_prizeInfo').html(html);
		this.getprizeid = obj.getprizeid;
		this.prizeid = obj.prizeid;
		this.status = obj.status;
		if(this.status == 'prize'){   //已领取
			$('#sendPrize_notGet').hide();
			this.getSendStatus();
		}else{
			$('#sendPrize_notGet').show();
			$('#sendPrize_get').hide();
		}
	 }
  }
  
  sendPrizeObj.getSendStatus = function(){
	 var self = this;
	 var dataObj = {
		getprizeid : self.getprizeid,
		access_token : loginObj.access_token
	 }
	 $.ajax({
		  url : ConfigObj.localSite + '?version=1&m=user.activity.myContactInfo',
		  data : dataObj,
		  dataType : "json",
		  type : "post",
		  success : function(msg){
			  //console.log('发送地址返回',msg);
			  if(msg.code == '0000'){
				 $('#sendPrize_get').show();
				 var html = '';
				 html += msg.info.realName + ' ' + msg.info.mobile + '<br>' + msg.info.address;
				 $('#sendPrize_infoCon').html(html);
				 if(msg.info.status == 'prize'){  //接口待修改 zhangw
					 $('#sendPrize_sendImg').removeClass('over');
					 $('#sendPrize_sendTxt').html('等待发出');
				 }else if(msg.info.status == 'onsend'){
					 $('#sendPrize_sendImg').addClass('over');
					 $('#sendPrize_sendTxt').html('已发出');
				 }
			  }else{
				 $.alertMsg(msg.code_str);
			  }
		  }
	});  
  }
  
  sendPrizeObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
  }

  sendPrizeObj.init = function(){
	  this.setDefConfig();
      sendPrizeObj.onloadExecution();
  }
  
  sendPrizeObj.goBack = function(){	
  }
  
  sendPrizeObj.setDefConfig = function(){
	 this.getprizeid = '';  
	 this.prizeid = '';
	 this.status = '';
  }
	
  sendPrizeObj.dirShow = function(){  //测试代码 zhangw
	/*var obj = {level: "五等奖", name: "中兴", getprizeid: "1472200931859c41e4874-b29d-4b9e-bc03-161fef2b3e5e-5", prizeid: "106", status: "prize"}
	sendPrizeObj.show('',function(){
		sendPrizeObj.getData(obj);
	}); */
	 
  }

