
  var prizeNotifyObj = new PageController({
	   'name': 'prizeNotify',
	   'tpl' : 'template/set/prizeNotify.html'
    });

  prizeNotifyObj.createDomObj = function(){
     this.wrapperObj = $("#prizeNotify_wrapperObj");
    this.prizeObj = $("#prizeNotify_prizeObj");
    this.openObj = $("#prizeNotify_openObj");
    this.tipsObj = $("#prizeNotify_tipsObj");
  }

  prizeNotifyObj.createEvent = function(){
     this.wrapperObj.tap(function(e){
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "back" :  prizeNotifyObj.goBack();return true;
        }
      }
      var liObj = $.oto_checkEvent(e,"LI");
      if(liObj){
        var thisObj = $(liObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "setAll" : prizeNotifyObj.setAll(thisObj);return true;
          case "lottery" : prizeNotifyObj.setLottery(thisObj);return true;
        }
      }
    });
  }
  
  //总开关
  prizeNotifyObj.setAll = function(obj){
    var thisV = obj.attr("data-v");
    var thisK = obj.attr("data-k");   //open | prize
    if(thisV === 'on'){
      var newV = 'off';
      obj.find('.js_toggle').removeClass('move');
      $('#prizeNotify_openObj').hide();
	  $('#prizeNotify_openObj li').attr('data-v','off');
	  $('#prizeNotify_openObj').find('.js_toggle').removeClass('move');
    }else{
      var newV = 'on';
      obj.find('.js_toggle').addClass('move');
	  $('#prizeNotify_openObj li').attr('data-v','off');
	  $('#prizeNotify_openObj').find('.js_toggle').removeClass('move');
      $('#prizeNotify_openObj').show();
    }
    obj.attr("data-v",newV);
	var totalType = '';
	if(thisK == 'open'){
		totalType = 'openPrize';
	}
	if(newV == 'on'){
		//this.subFun(totalType,'',newV);	  //订阅
	}else{
		this.unsubFun(totalType,'',newV);   //取消订阅
	}

  }  
  
   prizeNotifyObj.setLottery = function(obj){
    var thisV = obj.attr("data-v");
    var thisK = obj.attr("data-k");
    var thisL = obj.attr("data-l");
    if(thisV === 'on'){
      var newV = 'off';
      obj.find('.js_toggle').removeClass('move');
    }else{
      var newV = 'on';
      obj.find('.js_toggle').addClass('move');
    }
    obj.attr("data-v",newV);
    var totalType = '';
	if(thisK == 'open'){
		totalType = 'openPrize';
	}
	if(newV == 'on'){
		this.subFun(totalType,thisL,newV);	  //订阅
	}else{
		this.unsubFun(totalType,thisL,newV);   //取消订阅
	}
  }
  
  //type  总类型: [开奖|中奖]
  //lottery 彩种
  //val on|off
  prizeNotifyObj.subFun = function(type,lottery,val){
	var postData = {
	   category : type,
	   summary : lottery,
	   access_token : loginObj.access_token	
	}
    $.ajax({
      url : ConfigObj.localSite + '?version=1&m=user.settings.subscribe',    
      data : postData,
      dataType : "json",
      type : "post",
      success : function(msg){
      	//console.log(msg);
        if(msg.code !== "0000"){
          $.alertMsg(msg.code_str);
          return false;
        }
        prizeNotifyObj.createTips(type,val,lottery);
		
      }
    });
  }
  
  prizeNotifyObj.unsubFun = function(type,lottery,val){
	var postData = {
	   category : type,
	   summary : lottery,
	   access_token : loginObj.access_token	
	}
    $.ajax({
      url : ConfigObj.localSite + '?version=1&m=user.settings.unSubscribe',    
      data : postData,
      dataType : "json",
      type : "post",
      success : function(msg){
      	//console.log(msg);
        if(msg.code !== "0000"){
          $.alertMsg(msg.code_str);
          return false;
        }
        prizeNotifyObj.createTips(type,val,lottery);
      }
    });
  }
  
  prizeNotifyObj.createTips = function(t,v,l){
    var typeHtml = t=="openPrize" ? "开奖通知" : "中奖通知";
	if(v == 'on'){
    	var tipsHtml = this.tipsHtml[l] ? this.tipsHtml[l][1] : '';
	}else{
		var tipsHtml = this.tipsHtml[l] ? this.tipsHtml[l][0] : '';
	}
    if(!tipsHtml)return false;
	tipsHtml = tipsHtml.replace("type",typeHtml);
    this.tipsObj.children('div').html(tipsHtml);
    this.tipsObj.show();
    if(this.setTimeObj)clearTimeout(this.setTimeObj);
    this.setTimeObj = setTimeout(function(){
      prizeNotifyObj.tipsObj.hide();
      prizeNotifyObj.setTimeObj = "";
    },2000);
  }

  prizeNotifyObj.getData = function () {
      Global.post('?m=user.settings.subscribeStatus', {access_token: loginObj.access_token}, function (msg) {
          //console.log('推送设置初始状态', msg);
          if (msg.code == "0000") {
              //setTimeout(function(){
              prizeNotifyObj.initStatus(msg.info);
              //},1000)
          } else {
              $.alertMsg(msg.code_str);
          }
      });
  },
  
  prizeNotifyObj.initStatus = function(obj){
	 /*
	  if(obj.openPrize){
		 var itm = obj.openPrize;
		 if(itm.status == 'off'){
			$('#prizeNotify_open_total').find('.js_toggle').removeClass('move'); 
			$('#prizeNotify_openObj').hide();
		 }else{
		 	$('#prizeNotify_open_total').find('.js_toggle').addClass('move');  
			$('#prizeNotify_openObj').show();
		 }
		 $('#prizeNotify_open_total').attr('data-v',itm.status);
		 $('#prizeNotify_openObj li').each(function(idx,dom){
			 var ele = $(dom);
			 var type = ele.attr('data-l');
			 if(itm.summary[type]){
				ele.attr('data-v', itm.summary[type].status);
				if(itm.summary[type].status == 'off'){
					ele.find('.js_toggle').removeClass('move');	
				}else{
					ele.find('.js_toggle').addClass('move');	
				}
			 }
		 })
	  }
	  setTimeout(function(){
	  	$('#prizeNotify_load').hide();
	  	$('#prizeNotify_total').show();
	  },500)
      */
	 //console.log(obj.openPrize);

      if (obj.openPrize) {
          var itm = obj.openPrize;
          this.openObj.show();
          $('#prizeNotify_openObj li').each(function (idx, dom) {
              var ele = $(dom);
              var type = ele.attr('data-l');
              if (itm.summary[type]) {
                  ele.attr('data-v', itm.summary[type].status);
                  if (itm.summary[type].status == 'off') {
                      ele.find('.js_toggle').removeClass('move');
                  } else {
                      ele.find('.js_toggle').addClass('move');
                  }
              }
          });
      }

      setTimeout(function(){
          $('#prizeNotify_load').hide();
          $('#prizeNotify_total').show();
      },500);
  }
  

  prizeNotifyObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
  }

  prizeNotifyObj.init = function(){
	  prizeNotifyObj.setDefConfig();
      prizeNotifyObj.onloadExecution();
  }
  
  prizeNotifyObj.goBack = function(){	
  }

  prizeNotifyObj.setDefConfig = function () {
      this.tipsHtml = new Object();
      this.tipsHtml.all = ['关闭type', '打开type'];
      this.tipsHtml.ssq = ['双色球type关闭', '双色球type打开'];
      this.tipsHtml.dlt = ['大乐透type关闭', '大乐透type打开'];
      this.tipsHtml.jczq = ['竞彩足球type关闭', '竞彩足球type打开'];
      this.tipsHtml.jz2x1 = ['竞足2选1type关闭', '竞足2选1type打开'];
      this.tipsHtml.spf14 = ['胜负彩type关闭', '胜负彩type打开'];
      this.tipsHtml.spf9 = ['任选九type关闭', '任选九type打开'];
      this.tipsHtml.d3 = ['福彩3Dtype关闭', '福彩3Dtype打开'];
      this.tipsHtml.pl3 = ['排列三type关闭', '排列三type打开'];
      this.tipsHtml.pl5 = ['排列五type关闭', '排列五type打开'];
      // this.tipsHtml.qxc = ['七星彩type关闭', '七星彩type打开'];
      // this.tipsHtml[ConfigObj.fastLotType] = ['11选5type关闭', '11选5type打开'];
      this.setTimeObj = "";
  }

  prizeNotifyObj.dirShow = function () {
      prizeNotifyObj.show(false, function () {
          prizeNotifyObj.getData();
      });
  }
  
  
  
  
  
  
 

