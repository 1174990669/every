
  var searchSiteObj = new PageController({
	   'name': 'searchSite',
	   'tpl' : 'template/station/searchSite.html'
    });
   
  searchSiteObj.getSites=function(){
	  var dataObj = {
		 city :  $('#searchSite_searchCityList_dummy').val(),
		 address : $('#searchSite_searchAddress').val(),
		 fromPage : 'searchSite'
	  }
	  
	  localSiteObj.show('reload',function(){
		  localSiteObj.setData(dataObj);  
		  localSiteObj.pushRoute(function(){
			  searchSiteObj.show();  
		  })
	  }) 
  };
  
  searchSiteObj.getData = function(){
	 
	 $.ajax({
		url : ConfigObj.localSite +  '?version=1&m=user.station.searchStation',
		type:'post',
		data:'',
		dataType:'json',
		success:function(obj){
			//console.log('搜索站点城市区域接口返回 :',obj);
			if(obj.code == '0000'){
				searchSiteObj.formatHtml(obj.info);	
			}else{
				$.alertMsg(obj.code_str);
			}
		},
		
	  })  
	  
  }
  
  searchSiteObj.formatHtml = function(obj){
	  var html = '';
	  for(var i=0;i<obj.length;i++){
		 var itm = obj[i];
		 html += ' <option value="' + itm + '">'+ itm  +'</option>'  
	  }
	  $('#searchSite_searchCityList').html(html);
	  $('#searchSite_searchCityList').mobiscroll().select({
        theme: 'mobiscroll',
        lang: 'zh',
        display: 'bottom',
        fixedWidth: [100, 170]
      });
  }
  
  
  /*var dlObj = $.oto_checkEvent(e,"DL"); 
		if(dlObj){
			var thisObj = $(dlObj);
			var thisT = thisObj.attr("data-t");
			switch (thisT){
				case "userinfo" : this.goUserInfo();return true;
				case 'message' : this.goIm();return true;
				case 'security' : $.alertMsg('正在建设中');return true;
				case 'station' : this.goStation();return true;
				case 'memberBet' : this.goMemberBet();return true;
				case 'service': this.goService(thisObj);return true;
				case 'account': this.goAccount();return true;
				case "huodong" : this.goActivity();return true;
				case 'feedback': this.goFeedback();return true;
				case "hemai" : this.goHemai();return true;
				case 'share': Global.socialShare({'domId': 'userCenter'}); return true;
			}
		}*/
  searchSiteObj.onloadExecution = function(){
  	
	  $("#div_zhuan").unbind('tap').tap(function(){  //中大奖专栏测试
	  	// console.log(79)
	  	// bindPhoneObj.show() //测试微信登录绑定手机
	  	// dltnewBounObj.show() //中大奖专栏测试
	  	// dltnewBonuObj.createDomObj()
	  	// userCenterObj.goActivity()
	  	// activityIdxObj.show()
	  	// activityIdxObj.getData()
	  });


	  $('#div_hemaiIndex').unbind('tap').tap(function(){  //合买 
		// hemaiIndexObj.show()
		Global.GC();
        hemaiIndexObj.show();
	  }) 
	  
	  $('#div_star').unbind('tap').tap(function(){  //大神推荐
	  	hemaiIndexObj.goStar();return true; 
		  /*hotBigcafeObj.show()  
		  hotBigcafeObj.getData()//活动数据获取
		  hotBigcafeObj.atn()  //关注取消与否*/
	  })
	  /*$("#div_newsIdx").unbind('tap').tap(function(){  //热门资讯 activityIdx_back
	  	newsIdxObj.show()
	  });*/
	  $("#div_newsIdx").tap(function(){  //热门资讯
	  	// console.log(90)
			if (ConfigObj.platForm == 'android') {
				var poData= {access_token: loginObj.access_token}
		      	$.ajax({
		      		url:ConfigObj.localSite + '?version=1&m=user.account.center',
		      		data : poData,
		      		type : "post",
		      		dataType : "json",
		      		success:function(res){
		      			// console.log(res)
		      			var user_id = '';
		      			var type = true;
		      			if (res.code == 0000) {
		      				// console.log($.parseJSON(Global.crypt(res.info)))
		      				re = $.parseJSON(Global.crypt(res.info))
		      				var user_id = re.uId;
		      				// console.log(user_id)
		      				android_obj.sendNative(user_id, 2);
		      				// android_obj.sendNative('Uid','33');
		      			}else{
		      				// console.log(123)
		      				if (type==ConfigObj.showWhere) {//购彩版本
		      					android_obj.sendNative('Uid','2');
		      				}else{ //资讯版本
		      					android_obj.sendNative('Uid','1');
		      				}
		      				
		      			}
		      		}
		      	})
		    }
	  });
	  $("#div_huodong").unbind('tap').tap(function(){  //活动礼品
	  	userCenterObj.goActivity()
	  	// activityIdxObj.show()
	  	// activityIdxObj.getData()
	  });
	  $("#searchSite_backObj").unbind('tap').tap(function(){
	  	  searchSiteObj.goBack();
	  });
      $("#searchSite_stationObj").unbind('tap').tap(function(){
		 localSiteObj.pushRoute(function(){  //路由机制
			searchSiteObj.show();
		 }) 
		 // localSiteObj.show('reload');
      });
  }
  
  searchSiteObj.init = function(){
	 searchSiteObj.onloadExecution();
	 searchSiteObj.getData();
  }
  
 
   
   