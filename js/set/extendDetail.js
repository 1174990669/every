
  var extendDetailObj = new PageController({
	   'name': 'extendDetail',
	   'tpl' : 'template/set/extendDetail.html'
    });

  extendDetailObj.createDomObj = function(){
    this.wrapperObj = $("#extendDetail_wrapperObj");
  }

  extendDetailObj.createEvent = function(){
    this.wrapperObj.tap(function(e){
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "back" : extendDetailObj.goBack();return true;
		   case "share" : extendDetailObj.share();return true;
        }        
      }
	  var fObj = $.oto_checkEvent(e,"FIELDSET");
      if(fObj){
        var thisObj = $(fObj);
        var thisT = thisObj.attr("data-t");

        switch(thisT){
          case "adUrl" : extendDetailObj.goAd(thisObj);return true;
        }        
      }
     
    });
	
	$('#extendDetail_wrap').dropload({  
			scrollArea : window,
			distance : 200,
			loadUpFn:function(me){
			    extendDetailObj.getData(extendDetailObj.id);
				//me.resetload();
				extendDetailObj.pullLoad = me;
			}
	 })   
  }
  
  extendDetailObj.goAd = function(node){
	  var val = node.attr('data-v');
	  var urlType = node.attr('data-type');
	  if(!val) return false;
	  if(urlType && urlType == 'in'){
	  	 homeObj.lotteryHref(node);
	  }else{
	  	 Global.openUrl(val);  
	  }
  }
  
  
   extendDetailObj.share = function(){
	 // alert(1);
	  var obj = {
		'url': extendDetailObj.shareUrl ? extendDetailObj.shareUrl : '', 
		'title' : extendDetailObj.shareTitle, 
		'content' :  extendDetailObj.shareContent,
		'domId': 'extendDetail',
		//'imagePath' : extendDetailObj.shareImg ? extendDetailObj.shareImg : ''
	  }
	  //console.log(obj);
	  Global.socialShare(obj);  
  }
  
  extendDetailObj.getData = function(id,type){
	this.id = id;
	var postData = {
		uuid: id,
		category_id : type,
		access_token : loginObj.access_token
	}
    $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=user.news.getDetail',
      data : postData,
      type : "post",
      dataType : "json",
      success : function(msg){
		//console.log('新闻详情信息', msg);
		if(msg.code == '0000'){
			extendDetailObj.formatHtml(msg.info, msg);
			//extendDetailObj.getAd();
		}else{
			$.alertMsg(msg.code_str);	
		}
		if(extendDetailObj.pullLoad){
			extendDetailObj.pullLoad.resetload();	
		}
      }
    });  
  }
  
  extendDetailObj.formatHtml = function(obj, msg){
	var html = '';
	$('#extendDetail_topTit').html(obj.catname);
	$('#extendDetail_title').html(obj.title);
	$('#extendDetail_time').html(obj.add_time);
	$('#extendDetail_source').html(obj.source);
	$('#extendDetail_content').html(obj.content.replace('请长按扫描下方二维码', '请扫描下方二维码'));
	$('#extendDetail_qrcode').html(msg.qr_codeurl);
	//$('#extendDetail_list').html(html);

	// 图片居中
    $('#extendDetail_content').find('img').forEach(function (item) {
        $(item).closest('p').css('text-align', 'center');
    });

	this.shareTitle = obj.title;
	this.shareUrl = obj.share_url;
	var tempUid = (loginObj.userInfo && loginObj.userInfo.station_user_id) ? loginObj.userInfo.station_user_id : '';
	var userId = (this.shareUrl && this.shareUrl.indexOf('?')!=-1) ? '&station_uid=' + tempUid : '?station_uid=' + tempUid;
	////console.log(userId);
	this.shareUrl = this.shareUrl ? this.shareUrl + userId  : '';
	this.shareImg = obj.thumb;
	if($('#extendDetail_content').find('p')[0]){
		var con = $('#extendDetail_content').find('p')[0];
		var txt = $(con).text();
		if(txt.length > 50){
			txt = txt.substr(0,50) + '...';	
		}
		this.shareContent = txt;
	}
	if(obj.carousel){
		$('#extendDetail_img').css('background-image','url(' + obj.carousel + ')');	
	}
	////console.log(this.shareContent);
  }
  
  extendDetailObj.getAd = function(){
	var postData = {
		limit : 1,
		access_token : loginObj.access_token	
	}
	$.ajax({
      url : ConfigObj.localSite +  '?version=1&m=User.News.getAdvertInfo',
      data : postData,
      type : "post",
      dataType : "json",
      success : function(msg){
		//console.log('新闻详情广告信息', msg);
		if(msg.code == '0000'){
			//$('#extendDetail_ad').find('img').attr('src
			extendDetailObj.formatAdHtml(msg.list);
		}else{
			$.alertMsg(msg.code_str);	
		}
		if(extendDetailObj.pullLoad){
			extendDetailObj.pullLoad.resetload();	
		}
      }
    });   
  }
  
  extendDetailObj.formatAdHtml = function(obj){
	 var html = '';
	 //console.log(obj);
	 if(obj.length > 0){
		 for(var i=0;i<obj.length;i++){
			html += '<fieldset class="news-ad" data-t="adUrl" data-type="'+ obj[i].app_url_type  +'" data-v="'+ obj[i].app_url +'">'+
						'<legend>赞助商提供</legend>'+
						'<div>'+
							'<img src="'+ obj[i].img_url +'">'+
						'</div>'+
						'<span class="ad-tag">广告</span>'+
					 '</fieldset>';
		 }
		$('#extendDetail_ad').html(html).show();
	 }else{
		$('#extendDetail_ad').html('').hide(); 
	 }
  }
  
  

  extendDetailObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
  }

  extendDetailObj.init = function(){
	  this.setDefConfig();
      extendDetailObj.onloadExecution();
  }
  
  extendDetailObj.setDefConfig = function(){
	 this.shareUrl = '';  
	 this.shareTitle = '';
	 this.shareImg = '';
	 this.shareContent = '';
  }
  
  extendDetailObj.dirShow = function(obj){
	  var self = this;
	  self.show('',function(){
		 self.getData(obj.id);  
	  })
   }
   
  
  

	
	
   
 

