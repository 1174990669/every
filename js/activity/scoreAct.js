
  var scoreActObj = new PageController({
	   'name': 'scoreAct',
	   'tpl' : 'template/activity/scoreAct.html'
    });

  scoreActObj.createDomObj = function(){
    this.wrapperObj = $("#scoreAct_wrapperObj");
  }

  scoreActObj.createEvent = function(){
	var self = this;
    this.wrapperObj.tap(function(e){
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "back" : scoreActObj.goBack();return true;
        }        
      }
     
    });
	
	$('#scoreAct_reg').unbind('tap').tap(function(){
		self.checkRegScore($('#scoreAct_reg'));
	})
	$('#scoreAct_real').unbind('tap').tap(function(){
		self.checkRealScore($('#scoreAct_real'));
	})
	$('#scoreAct_login').unbind('tap').tap(function(){
		self.checkLoginScore($('#scoreAct_login'));
	})
	$('#scoreAct_share').unbind('tap').tap(function(){
		self.goScorePrize();
	})
  }
  
  scoreActObj.goScorePrize = function(){
	  scorePrizeObj.goBack = function(){
		 scorePrizeObj.destroy();
		 scoreActObj.show();  
	  }
	  scorePrizeObj.show('',function(){
		 scorePrizeObj.getData(-1);  
	  })
  }
  
  scoreActObj.goLogin = function(){
	  loginObj.goForward = function(){
		 setTimeout(function(){
			 scoreActObj.show('reload',function(){
				scoreActObj.getData(); 
			 })
		 },1200);
	  }
	  loginObj.goBack = function(){
		 scoreActObj.show();  
	  }
	  loginObj.show();
  }
  
  scoreActObj.checkRegScore = function(obj){
	 if(loginObj.isLogin){
		 var status = obj.attr('data-status');
		 if(status != '已领取'){   
			loginObj.addScore('register','',function(){
				scoreActObj.getData(); 	
			});  //正常来说会自动领取，此处是补漏 zhangw  
		 }
	  }else{
		 scoreActObj.goLogin();
	  }  
  }
  
  scoreActObj.checkRealScore = function(obj){
	 if(loginObj.isLogin){
		 var status = obj.attr('data-status');
		 if(status != '已领取'){
			 if(loginObj.userInfo && loginObj.userInfo.real_status == 'N' ){   
				regRealNameObj.goBack=function(){
				   regRealNameObj.destroy();
				   scoreActObj.show();  
				}
				regRealNameObj.show('reload',function(){
					var data = {
					  'accountName': loginObj.userInfo.user_name,
					  'from' : 'scoreAct',  
					}
					regRealNameObj.setData(data);
				});
		     }else if(loginObj.userInfo && loginObj.userInfo.real_status == 'Y'){
				 loginObj.addScore('real','',function(){
					scoreActObj.getData(); 	
				 });  //正常来说会自动领取，此处是补漏 zhangw  
			 }
		 }
	  }else{
		 scoreActObj.goLogin();
	  }  
  }
  
  scoreActObj.checkLoginScore = function(obj){
	 
	  if(loginObj.isLogin){
		 var status = obj.attr('data-status');
		 var subSts = obj.attr('data-subSts');
		 if(status != '已领取'){
			if(subSts){
				var msg = '注册首日不赠送登录积分';
				$.alertMsg(msg);
			}else{
				loginObj.addScore('login','',function(){
					scoreActObj.getData(); 	
				});  //正常来说会自动领取，此处是补漏 zhangw
			}
		 }
	  }else{
		  scoreActObj.goLogin();
	  }
  }
  
  scoreActObj.getData = function(){
	  var postData= {
	  	 access_token: loginObj.access_token
	  };
	  $.ajax({
		  url : ConfigObj.localSite +  '?version=1&m=user.Activity.scoreList',
		  data : postData,
		  type : "post",
		  dataType : "json",
		  success : function(msg){
			//console.log('积分攻略信息', msg);
			if(msg.code == '0000'){
				$('#scoreAct_content').show();
				$('#scoreAct_load').hide();
				scoreActObj.formatHtml(msg.info);
			}else{
				$('#scoreAct_content').show();
				$('#scoreAct_load').hide();
				//$.alertMsg(msg.code_str);	
			}
          }
      });  
  }
  
  scoreActObj.formatHtml = function(obj){
	   $('#scoreAct_reg').attr('data-status',obj.register.status);
	   $('#scoreAct_reg').find('span[data-t=coin]').html(obj.register.coin + '积分');
	   $('#scoreAct_reg').find('span[data-t=desc]').html(obj.register.desc);
	   $('#scoreAct_reg').find('a[data-t=status]').html(obj.register.status);
	   if(obj.register.status == '已领取'){
		  $('#scoreAct_reg').find('a[data-t=status]').addClass('over'); 
	   }else{
		  $('#scoreAct_reg').find('a[data-t=status]').removeClass('over'); 
	   }
	   
	   $('#scoreAct_real').attr('data-status',obj.perfectInfo.status);
	   $('#scoreAct_real').find('span[data-t=coin]').html(obj.perfectInfo.coin+ '积分');
	   $('#scoreAct_real').find('span[data-t=desc]').html(obj.perfectInfo.desc);
	   $('#scoreAct_real').find('a[data-t=status]').html(obj.perfectInfo.status);
	   if(obj.perfectInfo.status == '已领取'){
		  $('#scoreAct_real').find('a[data-t=status]').addClass('over'); 
	   }else{
		  $('#scoreAct_real').find('a[data-t=status]').removeClass('over'); 
	   }
	   
	   $('#scoreAct_login').attr('data-status',obj.everydayLogin.status);
	   $('#scoreAct_login').attr('data-subSts',obj.everydayLogin.false_status);
	   $('#scoreAct_login').find('span[data-t=coin]').html(obj.everydayLogin.coin+ '积分');
	   $('#scoreAct_login').find('span[data-t=desc]').html(obj.everydayLogin.desc);
	   $('#scoreAct_login').find('a[data-t=status]').html(obj.everydayLogin.status);
	   if(obj.everydayLogin.status == '已领取'){
		  $('#scoreAct_login').find('a[data-t=status]').addClass('over'); 
	   }else{
		  $('#scoreAct_login').find('a[data-t=status]').removeClass('over'); 
	   }
	   
	   
	   $('#scoreAct_7dayslogin').find('span[data-t=coin]').html(obj.login7.coin+ '积分');
	   $('#scoreAct_7dayslogin').find('span[data-t=desc]').html(obj.login7.desc);
	   $('#scoreAct_7dayslogin').find('a[data-t=status]').html(obj.login7.status);
	   if(obj.login7.status == '已领取'){
		  $('#scoreAct_7dayslogin').find('a[data-t=status]').removeClass('ongoing'); 
		  $('#scoreAct_7dayslogin').find('a[data-t=status]').addClass('over');
	   }else{
		  $('#scoreAct_7dayslogin').find('a[data-t=status]').removeClass('over');
		  $('#scoreAct_7dayslogin').find('a[data-t=status]').addClass('ongoing'); 
	   }
	   
	   
	   $('#scoreAct_share').find('span[data-t=coin]').html(obj.share.coin+ '积分');
	   $('#scoreAct_share').find('span[data-t=desc]').html(obj.share.desc);
	   $('#scoreAct_share').find('a[data-t=status]').html(obj.share.status);
	   //始终是未领取状态
  }
  


  scoreActObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
  }

  scoreActObj.init = function(){
      scoreActObj.onloadExecution();
  }
  
  scoreActObj.goBack = function(){	
  }
	
	
   
  scoreActObj.dirShow = function(){
	scoreActObj.show();  
  }

