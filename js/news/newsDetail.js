
  var newsDetailObj = new PageController({
	   'name': 'newsDetail',
	   'tpl' : 'template/news/newsDetail.html'
    });
//goNewsDetail
  newsDetailObj.createDomObj = function(){
    this.wrapperObj = $("#newsDetail_wrapperObj");
  }

  newsDetailObj.createEvent = function(){
    this.wrapperObj.tap(function(e){
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        console.log(thisT)
        switch(thisT){
          case "back" : newsDetailObj.goBack();return true;
		   case "share" : newsDetailObj.share();return true;
        }        
      }
	  var fObj = $.oto_checkEvent(e,"FIELDSET");
      if(fObj){
        var thisObj = $(fObj);
        var thisT = thisObj.attr("data-t");

        switch(thisT){
          case "adUrl" : newsDetailObj.goAd(thisObj);return true;
        }        
      }
     
    });
	
	$('#newsDetail_wrap').dropload({  
			scrollArea : window,
			distance : 200,
			loadUpFn:function(me){
			    newsDetailObj.getData(newsDetailObj.id);
				//me.resetload();
				newsDetailObj.pullLoad = me;
			}
	 })   
  }
  
  newsDetailObj.goAd = function(node){
	  var val = node.attr('data-v');
	  var urlType = node.attr('data-type');
	  if(!val) return false;
	  if(urlType && urlType == 'in'){
	  	 homeObj.lotteryHref(node);
	  }else{
	  	 Global.openUrl(val);  
	  }
  }
  
  
   newsDetailObj.share = function(){
	 // alert(1);
	  var obj = {
		'url': newsDetailObj.shareUrl ? newsDetailObj.shareUrl : '', 
		'title' : newsDetailObj.shareTitle, 
		'content' :  newsDetailObj.shareContent,
		'domId': 'newsDetail',
		//'imagePath' : newsDetailObj.shareImg ? newsDetailObj.shareImg : ''
	  }
	  //console.log(obj);
	  Global.socialShare(obj);  
  }
  
  newsDetailObj.getData = function(id,type){
	this.id = id;
	var postData = {
		category_id : newsIdxObj.type ? newsIdxObj.type : 1 ,
		page : newsIdxObj.page,
		page_size : newsIdxObj.page_size,
		access_token : loginObj.access_token
	}
	/*var postData = {
		uuid: id,
		category_id : type,
		access_token : loginObj.access_token
	}*/
    $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=user.news.getList',
      data : postData,
      type : "post",
      dataType : "json",
      success : function(msg){
		// console.log('新闻详情信息', msg);
		if(msg.code == '0000'){
			// console.log(12)
			// console.log(msg.info)
			newsDetailObj.formatHtml(msg.list);
//			newsDetailObj.getAd();
		}else{
			$.alertMsg(msg.code_str);	
		}
		if(newsDetailObj.pullLoad){
			newsDetailObj.pullLoad.resetload();	
		}
      }
    });  
  }
  
  newsDetailObj.formatHtml = function(obj){
	var html = '';
	console.log(obj)
	// for (var i = 0; i < obj.length; i++) {
		$('#newsDetail_topTit').html(obj[2].catname);
		$('#newsDetail_title').html(obj[2].title);
		$('#newsDetail_time').html(obj[2].add_time);
		$('#newsDetail_source').html(obj[2].source);
		$('#newsDetail_content').html(obj[2].content);
	// }
	/*$('#newsDetail_topTit').html(obj.catname);
	$('#newsDetail_title').html(obj.title);
	$('#newsDetail_time').html(obj.add_time);
	$('#newsDetail_source').html(obj.source);
	$('#newsDetail_content').html(obj.content);*/
	// $('#newsDetail_list').html(html);
	// console.log(obj[1].catname)
	
	//console.log(obj);
	this.shareTitle = obj.title;
	this.shareUrl = obj.share_url;
	this.shareImg = obj.thumb;
	if($('#newsDetail_content').find('p')[0]){
		var con = $('#newsDetail_content').find('p')[0];
		var txt = $(con).text();
		if(txt.length > 50){
			txt = txt.substr(0,50) + '...';	
		}
		this.shareContent = txt;
	}
	////console.log(this.shareContent);
  }
  
  newsDetailObj.getAd = function(){
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
			//$('#newsDetail_ad').find('img').attr('src
			newsDetailObj.formatAdHtml(msg.list);
		}else{
			$.alertMsg(msg.code_str);	
		}
		if(newsDetailObj.pullLoad){
			newsDetailObj.pullLoad.resetload();	
		}
      }
    });   
  }
  
  newsDetailObj.formatAdHtml = function(obj){
	 var html = '';
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
		$('#newsDetail_ad').html(html).show();
	 }else{
		$('#newsDetail_ad').html('').hide(); 
	 }
  }
  
  

  newsDetailObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
  }

  newsDetailObj.init = function(){
	  this.setDefConfig();
      newsDetailObj.onloadExecution();
  }
  
  newsDetailObj.setDefConfig = function(){
	 this.shareUrl = '';  
	 this.shareTitle = '';
	 this.shareImg = '';
	 this.shareContent = '';
  }
  
  newsDetailObj.dirShow = function(obj){
	  var self = this;
	  self.show('',function(){
		 self.getData(obj.id);  
	  })
   }
   
  
  

	
	
   
 

