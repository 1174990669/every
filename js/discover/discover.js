
	var discoverObj =  new PageController({
	   'name': 'discover',
	   'tpl' : 'template/discover/discover.html'
    });

	discoverObj.createDomObj = function(){
		this.wrapperObj = $("#discover_wrapperObj");
		this.backObj = $('#discover_backbtn');
		//if(ConfigObj.platForm == 'ios'){
		//	$('#discover_checkVer').hide();
		//}else{
			$('#discover_checkVer').show();
		//}
	}
	discoverObj.createEvent = function(){
		this.backObj.unbind('tap').tap(function(){
			discoverObj.goBack();
		})
		this.wrapperObj.unbind('tap').tap(function(e){
			var dlObj = $.oto_checkEvent(e,"DL");
			if(dlObj){
				var thisObj = $(dlObj);
				var thisT = thisObj.attr("data-t");
				switch(thisT){
					case "huodong" : discoverObj.goActivity();return true;
					case "jifen" : $.alertMsg('正在建设中'); return true;
					case "zixun" : discoverObj.goNews();return true;
					case "zhandian" : discoverObj.goSites();return true;
					case "download" : discoverObj.goDownload();return true;
					case "feedback" : discoverObj.goFeedback();return true;
					case 'share': Global.socialShare({'domId': 'discover'}); return true;
				}
			}
			
			 var aObj = $.oto_checkEvent(e,"A");
			 if(aObj){
				var thisObj = $(aObj);
				var thisT = thisObj.attr("data-t");
				switch(thisT){
					case 'showTel' : $('#discover_telTip').show();return true;
					case "clearTelTip": $('#discover_telTip').hide();return true;
					//case "toTelTip": $('#discover_telTip').hide();return true;
				}
			 }  
		});
		
	}
	
	discoverObj.goActivity = function(){
		//$.alertMsg("正在建设中");
		//return false;
		activityIdxObj.goBack = function(){
			activityIdxObj.destroy();
			discoverObj.show();	
		}
//		payStatusObj.show('reload',function(){
//			payStatusObj.getPayStatus();
//		});	
//		//console.log(ConfigObj.pay_id);
		activityIdxObj.show('reload',function(){
			activityIdxObj.getData();
		})
	}
	
	discoverObj.goDownload = function(){
//		Global.checkUpdate(true);
	}
	
	discoverObj.goScore = function(){
		scoreActObj.goBack = function(){
			scoreActObj.destroy();
			discoverObj.show();	
		}
		scoreActObj.show('reload',function(){
			scoreActObj.getData();
		})
	}

	discoverObj.goNews = function(){

     newsIdxObj.goBack = function () {
         newsIdxObj.destroy();
         discoverObj.show();
     }
        newsIdxObj.show();
	}
	
	discoverObj.goSites = function(){
		localSiteObj.goBack = function(){
			localSiteObj.destroy();
			discoverObj.show();	
		}
		localSiteObj.show();
	}
	
	discoverObj.goFeedback = function(){
		 feedbackObj.show('',function(){
				feedbackObj.pushRoute(function(){
					discoverObj.show();
				})
		 })	
	}
//  discoverObj.checkUpdate = function () {     //自动检测新版本
//  	$('#discover_version').html("V "+ConfigObj.version);
//  	var postData = {
//          'version' : ConfigObj.version,
//          'appKey': ConfigObj.appkey,
//     }
//      Global.post('?m=system.AppInfo.getapp', postData, function (res) {
//          if (res.code == '0000') {
//              if (res.info.package.version > ConfigObj.version) {
//					// 有新版本，显示一个小红点和最新版本号
//					$('#discover_update').show();
////                  $('#discover_version').html(res.info.package.version);
//              }else{
//              	$('#discover_update').hide();
//              }
//          }
//      });
//  };

	discoverObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
//      this.checkUpdate();
	}

	discoverObj.init = function(){
		discoverObj.onloadExecution();
	}
	
	discoverObj.goBack = function(){	
	}
	
	discoverObj.setDefConfig = function(){
		 
	}
	
	
	
