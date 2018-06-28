
  var serviceObj = new PageController({
	   'name': 'service',
	   'tpl' : 'template/set/service.html'
    });

  serviceObj.createDomObj = function(){
    this.wrapperObj = $("#service_wrapperObj");
    if (userCenterObj.userInfo.user_type == 'Station') {
        $('#service_stationOpt').show();
    }
  }

  serviceObj.createEvent = function(){
    this.wrapperObj.tap(function(e){
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "back" : serviceObj.goBack();return true;
        }        
      }

	  var aObj = $.oto_checkEvent(e,"A");
      if(aObj){
        var thisObj = $(aObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case 'wx' :  serviceObj.showLayer('wx');return true;
		  case  'qq':  serviceObj.showLayer('qq');return true;
		  case  'tel': serviceObj.showLayer('tel');return true; 
		  case 'clearTip': $('#service_layer').hide();return true;
		  case 'confirmTip': serviceObj.confirmTip(thisObj);return true;
          case 'manage': serviceObj.goManage(thisObj);return true;
		  case 'extend': serviceObj.goExtendList(thisObj);return true;
          case 'qrcode': serviceObj.goSweep();return true;
        }        
      }
    });
  }
  
  serviceObj.showLayer = function(type){
	  if(type == 'wx' && this.info.wx){
		  $('#service_layer').show();
		  var html = '<p class="font14 center">是否添加<span class="weixinicon_1"></span> '+ this.info.wx +'</p>';
		  $('#service_layerCon').html(html);
		  //$('#service_linkBtn').attr('href','wx://');
          $('#service_linkBtn').attr('data-c', 'wx');
		  $('#service_confirmBtn').html('复制号码');
	  }else if(type == 'qq' && this.info.qq){
		  $('#service_layer').show();
		  var html = '<p class="font14 center">是否添加<span class="qqicon_1"></span> '+ this.info.qq +'</p>';
		  $('#service_layerCon').html(html);
		  //$('#service_linkBtn').attr('href','qq://');
          $('#service_linkBtn').attr('data-c', 'qq');
		  $('#service_confirmBtn').html('复制号码');
	  }else if(type == 'tel' && this.info.phone){
		  $('#service_layer').show();
		  var html = '<p class="font14 center">致电给 '+ this.info.phone +'</p>';
		  $('#service_layerCon').html(html);
		  $('#service_linkBtn').attr('data-c', 'phone');
		  $('#service_confirmBtn').html('确认'); 
	  }
  }

  serviceObj.goManage = function () {
        manageInfoObj.goBack = function () {
            manageInfoObj.destroy();
            serviceObj.show('',function(){
				serviceObj.getData(serviceObj.sid);	
			});
        };
      manageInfoObj.show(true);
  }

  serviceObj.goSweep = function () {
      sweepObj.goBack = function () {
          serviceObj.show();
      };
      sweepObj.show(true, function () {
          sweepObj.setData({image: serviceObj.info.code_url, stationId: serviceObj.info.station_id});
      })
  }
  
  serviceObj.goExtendList = function () {
        extendListObj.goBack = function () {
            extendListObj.destroy();
            serviceObj.show('',function(){
				serviceObj.getData(serviceObj.sid);	
			});
        };
      extendListObj.show();
  }

  /**
   * 获取站点信息
   * @param sid 站点 id，即数据库的 account.station_info.id 字段
   */
  serviceObj.getData = function(sid){
	 var self = this;
	 self.sid = sid;
	  $.ajax({
			url : ConfigObj.localSite +  '?version=1&m=user.station.index',
			data : {'sid': sid,'access_token':loginObj.access_token},
			dataType : "json",
			type : "post",
			success : function(msg){
                //console.log('站点信息返回', msg);

				if(msg.code == '0000'){
					self.formatHtml(msg.info);
					self.info = msg.info;
				}else{
					$.alertMsg(msg.code_str);
				}
			}
		});  
  }
  
  serviceObj.formatHtml = function(obj){
      $('#service_qrcode').attr('src', obj.code_url);
	  $('#service_address').html(obj.address);
	  $('#service_name').html(obj.chatUserInfo.realName);
	  $('#service_desc').html(obj.describe ? obj.describe : this.defDesc);
  }
  serviceObj.confirmTip = function ($obj) {
	  var c = $obj.attr('data-c');
	  if (c == 'wx') {
          if (!this.info['wx']) {
              $.alertMsg('专属客服没有设置微信');
              return false;
          }

          if (ConfigObj.platForm == 'android' && typeof android_obj != 'undefined') {
              android_obj.addCustomerService('wx', this.info.wx);
          } else if (ConfigObj.platForm == 'ios' && typeof ios_obj != 'undefined') {
              ios_obj.addCustomerService('wx', this.info.wx);
          }
      } else if (c == 'qq') {
          if (!this.info['wx']) {
              $.alertMsg('专属客服没有设置QQ');
              return false;
          }

          if (ConfigObj.platForm == 'android' && typeof android_obj != 'undefined') {
              android_obj.addCustomerService('qq', this.info.qq);
          } else if (ConfigObj.platForm == 'ios' && typeof ios_obj != 'undefined') {
              ios_obj.addCustomerService('qq', this.info.qq);
          }
      } else if (c == 'phone') {
          if (!this.info['wx']) {
              $.alertMsg('专属客服没有设置电话');
              return false;
          }
          if (ConfigObj.platForm == 'android' && typeof android_obj != 'undefined') {
              android_obj.addCustomerService('phone', this.info.phone);
          } else if (ConfigObj.platForm == 'ios' && typeof ios_obj != 'undefined') {
              ios_obj.addCustomerService('phone', this.info.phone);
          }
      }

      $('#service_layer').hide();
  };

  serviceObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
  }

  serviceObj.init = function(){
	  this.setDefConfig();
      serviceObj.onloadExecution();
  }
  
  serviceObj.setDefConfig = function(){
	  this.sid = '';
	  this.info = '';
	  this.defDesc = '以“取之于民 用之于民”为发行宗旨，坚守“公益彩票 乐善人生”的公益理念，提供各种最新的信息资料和合理建议，以诚相待，以礼相待。为彩民提供高效、便捷、舒畅的服务。';
  }
   
  serviceObj.dirShow = function(){
	serviceObj.show();  
  }

