
  var settingObj = new PageController({
	   'name': 'setting',
	   'tpl' : 'template/set/setting.html'
    });

  settingObj.createDomObj = function(){
    this.wrapperObj = $("#setting_wrapperObj");
    this.logoutObj = $("#setting_logoutObj");
    this.centerWrap = $('section.centerWrap');
    this.settingCover = $('#setting_cover');
	this.switchLoginDom();
  }
  
  settingObj.switchLoginDom = function(){
	if(loginObj.isLogin){
		this.wrapperObj.find('li[data-t="login"]').hide();
		this.wrapperObj.find('li[data-t="logout"]').show();	
		this.wrapperObj.find('li[data-t="use"]').show();
		this.wrapperObj.find('li[data-t="feedback"]').show();
		this.wrapperObj.find('li[data-t="noPwd"]').show();
	}else{
        $('#setting_openPrize').hide();
        $('#setting_noPwdPay').hide();
		this.wrapperObj.find('li[data-t="login"]').show();
		this.wrapperObj.find('li[data-t="logout"]').hide();	
		this.wrapperObj.find('li[data-t="use"]').hide();
		this.wrapperObj.find('li[data-t="noPwd"]').hide();
		//this.wrapperObj.find('li[data-t="feedback"]').hide();
	}
  }

  settingObj.createEvent = function(){
	  
	$('#setting_close').unbind('tap').tap(function(){
		$('#setting_shareWrap').hide();	
	})
	
    this.wrapperObj.tap(function(e){
      var aObj = $.oto_checkEvent(e,"A");
      if(aObj){
        var thisObj = $(aObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "clearLog" :settingObj.hideLogout();return true;
          case "logout" :settingObj.logout();return true;
		  case 'showTel' : $('#setting_telTip').show();return true;
		  case "clearTelTip": $('#setting_telTip').hide();return true;
        }
      }
      var liObj = $.oto_checkEvent(e,"LI");
      if(liObj){
        var thisObj = $(liObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "login" : settingObj.goLogin();return true;
          case "logout" : settingObj.showLogout();return true;
          case "use" : settingObj.goUserSet();return true;
		  		case "noPwd" : settingObj.goNoPwd();return true;
		  //case 'use' : settingObj.goPrizeNotify();return true;
          case "help" : settingObj.goHelp();return true;
          case "feedback" : settingObj.goFeedback();;return true;
          case "about" : settingObj.goAboutUs();return true;
		  		case "share" : settingObj.share();return true;
          case 'setOpenPrize': settingObj.setOpenPrize();return true;
          case 'setNoPwdPay': settingObj.setNoPwdPay();return true;
          case 'gx': Global.checkUpdate(true); return true;
        }
      }
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "backbtn" : settingObj.goBack();return true;
        }
      }
      var divObj = $.oto_checkEvent(e,"DIV");
      if(divObj){
        var thisObj = $(divObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "nohide" : return true;
          case "hideLog" : settingObj.hideLogout();return true;
        }
      }
    });
  }

  settingObj.getData = function () {
      Global.getDataPrefCache('?version=1&m=user.settings.getSettingStatus', {'access_token': loginObj.access_token}, function (data) {
          changePage(data);
      }, function (data) {
          changePage(data);
      });

      function changePage(data) {
          if (data.code == '0000') {
              // 小额免密
              var $settingNoPwdPay = $('#setting_noPwdPay');

              if (data.info.noPwdPayStatus == 'on') {
                  $settingNoPwdPay.attr('data-v', 'on');
                  $settingNoPwdPay.children('p').children('em').eq(1).addClass("move");
              } else {
                  $settingNoPwdPay.attr('data-v', 'off');
                  $settingNoPwdPay.children('p').children('em').eq(1).removeClass("move");
              }

              // 开奖同志
              var $settingOpenPrize = $('#setting_openPrize');
              if (data.info.openPrizeStatus == 'on') {
                  $settingOpenPrize.attr('data-v', 'on');
                  $settingOpenPrize.children('p').children('em').eq(1).addClass("move");
              } else {
                  $settingOpenPrize.attr('data-v', 'off');
                  $settingOpenPrize.children('p').children('em').eq(1).removeClass("move");
              }
          }
      }

      /*
      $.post(ConfigObj.localSite + '?m=user.settings.getSettingStatus', {'access_token': loginObj.access_token}, function (data) {

          // 小额免密
          var $settingNoPwdPay = $('#setting_noPwdPay');

          if (data.info.noPwdPayStatus == 'on') {
              $settingNoPwdPay.attr('data-v', 'on');
              $settingNoPwdPay.children('p').children('em').eq(1).addClass("move");
          } else {
              $settingNoPwdPay.attr('data-v', 'off');
              $settingNoPwdPay.children('p').children('em').eq(1).removeClass("move");
          }
      }, 'json');
      */
  };

  /**
   * 设置开奖通知
   */
  settingObj.setOpenPrize = function () {
      /*呜呜呜，又变了
      prizeNotifyObj.goBack = function () {
          prizeNotifyObj.destroy();
          settingObj.show('reload');
      };
      prizeNotifyObj.dirShow();
      */

      var $settingOpenPrize = $('#setting_openPrize');
      var oldValue = $settingOpenPrize.attr('data-v');
      var newValue = oldValue == 'on' ? 'off' : 'on';

      if (newValue == 'on') {
          // 开启开奖通知
          prizeNotifyObj.goBack = function () {
              prizeNotifyObj.destroy();
              settingObj.show(true, settingObj.getData());
          };

          prizeNotifyObj.dirShow();
      } else {
          // 关闭开奖通知
          Global.post('?version=1&m=user.settings.unSubscribe', {
              category: 'openPrize',
              access_token: loginObj.access_token
          }, function (data) {

              if (data.code == '0000') {
                  $.alertMsg(data.code_str, true);
                  $settingOpenPrize.attr('data-v', newValue);
                  $settingOpenPrize.children('p').children('em').eq(1).removeClass("move");
              } else {
                  $.alertMsg(data.code_str);
              }
          });
      }
  };

  /**
   * 设置小额免密
   */
  settingObj.setNoPwdPay = function () {
      var $settingNoPwdPay = $('#setting_noPwdPay');
      var oldValue = $settingNoPwdPay.attr('data-v');
      var newValue = oldValue == 'on' ? 'off' : 'on';

      if (newValue == 'on') {
          // 开启小额免密需要输入密码
          noPwdPayObj.goBack = function () {
              noPwdPayObj.destroy();
              settingObj.show('reload', settingObj.getData());
          };

          noPwdPayObj.show();
      } else {
          var postData = {
              'access_token': loginObj.access_token,
              'opt': newValue
          };

          $.post(ConfigObj.localSite + '?version=1&m=user.settings.setNoPwdPay', postData, function (data) {

              if (data.code == '0000') {
                  $.alertMsg(data.code_str, true);
                  $settingNoPwdPay.attr('data-v', newValue);
                  $settingNoPwdPay.children('p').children('em').eq(1).removeClass("move");
              } else {
                  $.alertMsg(data.code_str);
              }
          }, 'json');
      }

  };

 /* settingObj.goNoPwd = function(){
	 noPwdPayObj.goBack=function(){
		noPwdPayObj.destroy();
		settingObj.show(); 
	 }
	 noPwdPayObj.show();
  }*/
  
  settingObj.goPrizeNotify = function(){
	  prizeNotifyObj.goBack = function(){
		prizeNotifyObj.destroy();
		settingObj.show(); 
	 }
	 prizeNotifyObj.show('',function(){
		prizeNotifyObj.getData(); 
	 });  
  }
  

  settingObj.share = function(){
	   var obj = {
		//'url': ConfigObj.touchWebSite  + 'System/DownLoad/page?sharefrom=app',  
		'domId': 'setting',
	  }
	  Global.socialShare(obj)
  }
  
  
  settingObj.goFeedback = function(){
	 feedbackObj.show('',function(){
		feedbackObj.pushRoute(function(){
			settingObj.show('reload');
		})
	 })
  }
  
  
  settingObj.goHelp = function(){
	 helpObj.goBack = function(){
		helpObj.destroy();
		settingObj.show(); 
	 }
	 helpObj.show('reload');
  }
  
  settingObj.goUserSet = function(){
	  userSetObj.goBack = function(){
		  userSetObj.destroy();
		  settingObj.show();  
	  }
	  userSetObj.show();
  }
  
  settingObj.goAboutUs = function(){
	  aboutUsObj.goBack = function(){
		 aboutUsObj.destroy();
		 settingObj.show();  
	  }
	  aboutUsObj.show();
  }
  
  settingObj.goLogin = function(){
	  loginObj.show();
	  loginObj.goForward = function(){
		  Global.GC();
		  homeObj.show('reload');
		 //settingObj.show('reload');  
	  }
	  loginObj.goBack = function(){
		  //Global.GC();
		  //homeObj.show('reload');
		 settingObj.show('reload');  
	  }
  }

  settingObj.showLogout = function(){
    this.logoutObj.show();
  }

  settingObj.hideLogout = function(){
    this.logoutObj.hide();
  }

  settingObj.logout = function () {
      // 直接清空数据，然后发送请求
      loginObj.tokenFail();
      settingObj.switchLoginDom();
      settingObj.hideLogout();

      Global.GC();
      userCenterObj.show();
      console.log(454)
      // 清除所有缓存
      window.localStorage.clear();


      $.ajax({
          url: ConfigObj.localSite + '?version=1&m=user.account.logout',
          data: {'access_token': loginObj.access_token},
          type: "post",
          dataType: "json",
          success: function (msg) {
          }
      });
  }

	settingObj.checkUpdate = function () {
		$('#setting_update2').html("V "+ConfigObj.version);
		var postData = {
            'version' : ConfigObj.version,
            'appKey': ConfigObj.appkey,
        }
	  Global.post('?version=1&m=system.AppInfo.getApp', postData, function (data) {
	      if (data.info.package.version > ConfigObj.version) {
	          // 有新的版本
	          $('#setting_update1').show();
	//            $('#setting_update2').html("V"+data.info.package.version);
	      } else {
	          $('#setting_update1').hide();
	      }
	  }, function () {});
	}

  settingObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
    this.getData();
    this.checkUpdate();
  }

  settingObj.init = function(){
      settingObj.onloadExecution();
  }
  
    settingObj.setDefConfig = function(){
		 
	}
	
   
  
  
  