
  var localSiteObj = new PageController({
	   'name': 'localSite',
	   'tpl' : 'template/station/localSite.html',
	   'initScrollTop': false
    });

  localSiteObj.createEvent = function(e){
  	$('#localSite_wrap').unbind('tap').tap(function(e){
  		var divObj = $.oto_checkEvent(e,"DIV");
	  	if(divObj){
	  		var thisObj = $(divObj);
	  		var thisT = thisObj.attr("data-t");
	  		switch(thisT){
	  			case "info" : localSiteObj.hrefInfo(thisObj); 
	  		}
	  	}
		var aObj = $.oto_checkEvent(e,"A");
	  	if(aObj){
	  		var thisObj = $(aObj);
	  		var thisT = thisObj.attr("data-t");
	  		switch(thisT){
	  			case "bind" : localSiteObj.checkBind(thisObj);return true; 
				case 'nobind' : $('#localSite_bindTip').hide();return true;
				case 'tobind' : $('#localSite_bindTip').hide();localSiteObj.bindSite(thisObj);return true;
	  		}
	  	}
		
  	});
  	$("#localSite_searchObj").unbind('tap').tap(function(){
  		localSiteObj.goSearchSite();
  	});
  	$("#localSite_stationObj").unbind('tap').tap(function(){
  		//window.location.href = "/User/Station/getNearStations";
  	});
	$("#localSite_reloadObj").unbind('tap').tap(function(){
  		localSiteObj.goMap();
  	});
	
  	$("#localSite_backObj").unbind('tap').tap(function(){
  		localSiteObj.goBack();
  	});
  	window.onscroll = function(){
  		var scrollTop = document.body.scrollTop;
	    var bodyHeight = $('#localSite_siteList').height();
	    if(scrollTop + localSiteObj.clientHeight > bodyHeight - localSiteObj.clientHeight/2){
		  if($('#localSite').css('display') != 'none'){
	      	localSiteObj.getSites();
		  }
	    }
    }
	
  }
  
  localSiteObj.dropload = function(){
	  $('#localSite_droploadWrap').dropload({  
			scrollArea : window,
			distance : localSiteObj.pullDistance,
			loadUpFn:function(me){
				
				 localSiteObj.setDefConfig();
				 localSiteObj.createEvent();
				 setTimeout(function(){
  				 	localSiteObj.getLocation();
				 },50);   
				 localSiteObj.pullLoad = me; 
				// me.resetload();
			}
	 })   
  }
  
  localSiteObj.bindSite = function(obj){
	      var sid = obj.attr('data-v');
		  regByMobileObj.goBack=function(){
			/*Global.GC();
			homeObj.show(); */ 
			regByMobileObj.destroy();
			localSiteObj.show();
		  }
		  regByMobileObj.show();
		  setTimeout(function(){
			regByMobileObj.setSid(sid);
		  },500) 
  }
  
  localSiteObj.checkBind = function(obj){
	  if(loginObj.isLogin){
		  var sid = obj.attr('data-v');
		  if(sid == loginObj.userInfo.station_id){
			$.alertMsg('您已经绑定该站点');  
		  }else{
		  	$.alertMsg('请勿重复绑定站点');
		  }
	  }else{
		  var sid = obj.attr('data-v');
		  $('#localSite_toBind').attr('data-v',sid);
		  $('#localSite_bindTip').show();
	  }
  }

  localSiteObj.hrefInfo = function(obj){
  	var thisId = obj.attr("data-i");
	 this.goStationDetail(thisId);
  }
  
  localSiteObj.goSearchSite = function(){
	 searchSiteObj.goBack = function(){
		searchSiteObj.destroy();
		localSiteObj.show(); 
	 }
	 searchSiteObj.show();
  }
  
  localSiteObj.goMap = function(){
	 if($('#localSite_siteList .sitelist').length == 0) return;
	 stationListMapObj.goBack = function(){
		stationListMapObj.destroy();
		localSiteObj.show(); 
	 }
	 var dataObj = [];
	 $('#localSite_siteList .sitelist').each(function(idx,ele){
		 var temp = [];
		 if($(ele).attr('data-lng')){
				temp.push($(ele).attr('data-lng'));
		 		temp.push($(ele).attr('data-lat'));
				dataObj.push(temp); 
		 }
	 })
	 stationListMapObj.show('reload',function(){
		 stationListMapObj.setData(dataObj,localSiteObj.posObj); 
	 });
  }
  
  localSiteObj.goStationDetail= function(sid){
		var self = this;
		stationDetailObj.goBack = function(){
			stationDetailObj.destroy();
			self.show();	
		}
		stationDetailObj.show('reload',function(){
			stationDetailObj.getData(sid);
		})
	}
  
  localSiteObj.getSites=function(){
  	if(this.checkAjaxPage)return false;   //已经是最后一页
	if(!this.posObj.lat) return false;
  	this.checkAjaxPage = true;
  	this.posObj.page = this.page;
  	this.posObj.pageSize = this.pageSize;
  	this.posObj.city = this.city;   
  	this.posObj.address = this.address;
	if(this.fromPage == 'searchSite'){  //如果是从搜索站点页面来的，则不需要经纬度进行查询 功能待确认 zhangw
		//this.posObj.lat = '';
		//this.posObj.lng = '';
	}
	////console.log(localSiteObj.posObj);
	 
	  $.ajax({
		url : ConfigObj.localSite +  '?version=1&m=user.station.getnearstations',
		type:'post',
		data:localSiteObj.posObj,
		dataType:'json',
		success:function(obj){
			//console.log('附近站点接口返回 :',obj);
			if(obj.code == '0000'){
				$("#localSite_reloadObj").show();
				localSiteObj.formatList(obj.info);
				localSiteObj.page+=1;
				if(obj.info.list.length<localSiteObj.pageSize){
					localSiteObj.checkAjaxPage = true;
				}else{
					localSiteObj.checkAjaxPage = false;
				}	
				////console.log(localSiteObj.getIosVer());
			}else{
				//$.alertMsg(obj.code_str);
				localSiteObj.checkAjaxPage = true;
				$('#localSite_loading').remove();
				if(!localSiteObj.posObj.lat){
					if(ConfigObj.platForm == 'ios' && (localSiteObj.getIosVer() > 7)){  //小于7,下面插件方法会报错
						$.alertMsg('请允许广东体彩云使用位置信息');
						setTimeout(function(){
							//cordova.plugins.diagnostic.switchToSettings(function(){},function(){});
						},1500);
					}
				}
			}
			if(localSiteObj.pullLoad){
				localSiteObj.pullLoad.resetload();		
			}
		},
		error : function(e){
			localSiteObj.checkAjaxPage = false;
		}
	  })
  };
  
  localSiteObj.getIosVer = function(){
	  var ver = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);  
      ver = parseInt(ver[1], 10);  
      return Number(ver);
  }
  
  localSiteObj.formatList=function(obj){
	 if(!obj.list) return;
	 var html = ''
	 if(obj.nowAdd && this.page == 0 ){
		 html += '<div class="sitelist mb15" id="localSite_nowAdd"><div class="slf"><span class="nearby-site icon"></span><span class="line"></span></div><div class="srt"><p class="gray pt10">当前：'+ obj.nowAdd + ' </p></div></div> '
	 }
	 //'<div class="sbox"><span class="uparrow"></span><div class="sbox-new txt-elps" data-t="info" data-i="'+itm.sid+'" ><p class="font14 mb10"><em class="icon site-name"></em>No.'+ itm.stationNo +'彩票站</p><p class="font12 gray"><em class="icon site-add"></em>'+ itm.address + '</p></div><span class="arrowbox"><a href="tel:'+ itm.phone +'"><em class="telicon icon"></em></a></span></div>'
	 if(obj.list.length){
		for(var i=0;i<obj.list.length;i++){
			var itm = obj.list[i];
			html += '<div class="sitelist" data-lng="'+ itm.loc[0] +'" data-lat="'+ itm.loc[1] +'"><div class="slf"><span class="dot"></span><span class="line"></span></div>'+
				    '<div class="srt"><p class="fontblue mb10">'+(itm.dis>1000 ? ((itm.dis/1000).toFixed(1)) : itm.dis) + 
					'<span class="font10">'+(itm.dis>1000 ? "km" : "m")+'</span></p>'+
					'<div class="sbox"><span class="uparrow"></span><div class="sbox-new txt-elps" data-t="info" data-i="'+itm.sid+'" ><p class="font14 mb10"><em class="icon site-name"></em>No.'+ itm.stationNo +'彩票站</p><p class="font12 gray"><em class="icon site-add"></em>'+ itm.address + '</p></div><span class="arrowbox"><a href="javascript:void(0)" data-t="bind" data-v="'+itm.stationNo+'"><em class="bindicon icon"></em></a></span></div>'+
					'</div></div>';
		}
		if(this.page == 0){
			$('#localSite_siteList').html(html);
		}else{
			$('#localSite_siteList').append(html);	
		}
	 }else{
		if(this.page == 0){
			var str = '<div class="noact center">'+
            				'<p class="mb15"><span class="disbg dis1"></span></p>'+
							'<p class="font14 gray">暂时没有站点哦~</p>'+
					   '</div>';
			$('#localSite_siteList').html(str);
		}
	 }
  };
  
  localSiteObj.getLocation = function(){
	if(ConfigObj.platForm == 'ios'){
		//$.alertMsg('请打开地理位置定位');	   //去掉会有问题 zhangw
	}
	var geolocation = new BMap.Geolocation();
	// console.time('start');
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			localSiteObj.posObj = {
				lat: r.point.lat,
				lng: r.point.lng,
			}
			//console.log(localSiteObj.posObj); 
			//console.timeEnd('start');
			localSiteObj.getSites(); 
		}else {
			localSiteObj.posObj = {
				lat: '',
				lng: '',	
			}
		} 
		//localSiteObj.getSites();    
	},{enableHighAccuracy: true})
  }
  
  localSiteObj.setData = function(obj){
	  this.city = obj.city;  
	  this.address = obj.address;
	  this.fromPage = obj.fromPage;
	  $('#localSite_siteList').html('');
  }
  
  localSiteObj.setDefConfig = function(){
	this.city = '';
	this.address = '';
	this.page = 0;
  	this.pageSize  = 10;
  	this.checkAjaxPage = false;
	this.fromPage = '';
	this.posObj = {};
  	this.clientHeight = document.documentElement.clientHeight; 
	this.geolocation = '';
	window.onscroll = null;
  }
  
  localSiteObj.onloadExecution = function(){
	this.setDefConfig();
  	this.createEvent();
  	this.getLocation();
  }
  
  localSiteObj.init = function(){
	  localSiteObj.onloadExecution();
  }
  
   
  
  //先请求模板，然后渲染
  //reload 是否重新渲染
  //callback 显示之后的回调函数
  localSiteObj.show = function(reload,callback){
	  window.scrollTo(0,0);
	  var activePage = Global.getActivePage();
	  if($('#localSite').length == 0 || reload){
		  $.ajax({
			 url:'template/station/localSite.html',
			 data:'t=' +new Date().getTime(),
			 dataType:'text',
			 success:function(obj){
				 var rx = /<body[^>]*>([\s\S]+?)<\/body>/i
				 var m = rx.exec(obj);
				 if (m) m = m[1];
				 var tplHtml = '<div class="page" style="display:none" id="localSite">' + m + '</div>';
				 $(document.body).append(tplHtml);
				 Global.pageSwitch($('#localSite'),$(activePage)); 
				 localSiteObj.setDefConfig();
				 if(callback) callback();   //主要是为了在获取动态数据之前setdata
  				 localSiteObj.createEvent();
				 localSiteObj.dropload();  //增加下拉刷新功能
  				 localSiteObj.getLocation();
				 Global.fixIos10Flag = 1;
			 }
		  })
	  }else{
		 Global.pageSwitch($('#localSite'),$(activePage)); 
	  }
	  this.pv();
  }
   
  localSiteObj.dirShow = function(){
	$(function(){
		localSiteObj.show();  
	})
  }
  
  localSiteObj.goBack = function(){
	  var self = this;
	  self.popRoute();
  }
  
  localSiteObj.destroy = function(){
	  this.setDefConfig();
	  $('#localSite').html('').remove();
	  this.routeArr = [];
   }
