
  var userSetObj = new PageController({
	   'name': 'userSet',
	   'tpl' : 'template/set/userSet.html'
    });

  userSetObj.createDomObj = function(){
    this.wrapperObj = $("#userSet_wrapperObj");
    this.tipsObj = $("#userSet_tipsObj");
	this.prizeNotifyObj = $('#userSet_prizeNotify');
	this.noPwdPayObj = $('#userSet_noPwdPay');
  }

  userSetObj.createEvent = function(){
    this.wrapperObj.unbind('tap').tap(function(e){
	  var liObj = $.oto_checkEvent(e,"LI");
      if(liObj){
        var thisObj = $(liObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "set" : userSetObj.setFun(thisObj);return true;
        }
      }
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "back" : userSetObj.goBack();return true;
        }
      }
    });
	
	$('#userSet_pushSet').unbind('tap').tap(function(){
		userSetObj.goPushSet();
	})
  }
  
  userSetObj.goPushSet = function(){
	 prizeNotifyObj.goBack = function(){
		prizeNotifyObj.destroy();
		userSetObj.show(); 
	 }
	 prizeNotifyObj.show('',function(){
		prizeNotifyObj.getData(); 
	 });
  }

  userSetObj.setFun = function(obj){
    var thisC = obj.attr("data-c");
    var thisV = obj.attr("data-v");
    if(thisV == "on"){
      var newV = "off";
      obj.children('p').children('em').eq(1).removeClass("move");
    }else{
      var newV = "on";
      obj.children('p').children('em').eq(1).addClass("move");
    }
    if(thisC == "noPwdPay" && newV == "on"){
      this.goNoPwdPay();
      return true;
    }
    obj.attr("data-v",newV);
	var postData = {
		'item_name' : thisC,
		'opt_type' : newV,
		'access_token' : loginObj.access_token	
	}
    $.ajax({
      url : ConfigObj.localSite + '?version=1&m=user.Settings.customize',   
      data : postData,
      dataType : "json",
      type : "post",
      success : function(msg){
		//console.log('用户使用设置处理接口返回', msg);
        if(msg.code !== "0000"){
          $.alertMsg(msg.code_str);
          return false;
        }
        userSetObj.createTips(thisC,newV);
      }
    });
  }

  userSetObj.createTips = function(k,type){
    var v = type == "off" ? 0 :1;
    var tipsHtml = this.tipsHtml[k][v];
    if(!tipsHtml)return false;
    this.tipsObj.children('div').html(tipsHtml);
    this.tipsObj.show();
    if(this.setTimeObj)clearTimeout(this.setTimeObj);
    this.setTimeObj = setTimeout(function(){
      userSetObj.tipsObj.hide();
      userSetObj.setTimeObj = "";
    },2000);
  }
  
  userSetObj.goNoPwdPay = function(){
	  noPwdPayObj.goBack = function(){
		 noPwdPayObj.destroy();
		 userSetObj.show('reload');  
	  }
	  noPwdPayObj.show();
  }
  
  userSetObj.getData = function(){
	  var dataObj = {
		'access_token' : loginObj.access_token  
	  }
	  $.ajax({
		 url : ConfigObj.localSite + '?version=1&m=user.Settings.getInfoStatus',   
		 data:dataObj,
		 type:'POST',
		 dataType:'json',
		 success:function(obj){
			//console.log('获取我的设置状态 ' ,obj);
			if(obj.code == '0000'){
				if(obj.info.prizeNotify){   //中奖通知
					if(obj.info.prizeNotify.status == 'on'){
						userSetObj.prizeNotifyObj.attr('data-v','on');
						userSetObj.prizeNotifyObj.children('p').children('em').eq(1).addClass("move");
					}else{
						userSetObj.prizeNotifyObj.attr('data-v','off');
						userSetObj.prizeNotifyObj.children('p').children('em').eq(1).removeClass("move");
					}
				}
				
				if(obj.info.noPwdPay){   //小额免密码
					if(obj.info.noPwdPay.status == 'on'){
						userSetObj.noPwdPayObj.attr('data-v','on');
						userSetObj.noPwdPayObj.children('p').children('em').eq(1).addClass("move");
					}else{
						userSetObj.noPwdPayObj.attr('data-v','off');
						userSetObj.noPwdPayObj.children('p').children('em').eq(1).removeClass("move");
					}
				}
			}else{
				$.alertMsg(obj.code_str);	
			}
		 }
	  })
  }

  userSetObj.onloadExecution = function(){
	this.setDefConfig();
    this.createDomObj();
    this.createEvent();
	this.getData();  //从后端获取用户设置初始数据
  }

  userSetObj.init = function(){
      userSetObj.onloadExecution();
  }
  
  userSetObj.setDefConfig = function(){
	  userSetObj.tipsHtml = new Object();
	  userSetObj.tipsHtml.qp = ['取票通知关闭。','取票通知打开。'];
	  userSetObj.tipsHtml.zh = ['追号通知关闭','追号任务到期第一时间通知'];
	  userSetObj.tipsHtml.aq = ['帐户安全关闭','帐户安全打开'];
	  userSetObj.tipsHtml.noPwdPay = ['小额免密已关闭','小额免密打开'];
	  userSetObj.tipsHtml.tx = ['提现通知关闭','提现通知打开'];
	  userSetObj.tipsHtml.yj = ['夜间模式关闭','夜间模式打开'];
	  userSetObj.tipsHtml.prizeNotify =['中奖通知已关闭','中奖通知已打开'];
	
	  userSetObj.setTimeObj = "";
  }
	
 
