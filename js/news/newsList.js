
  var newsListObj = new PageController({
	   'name': 'newsList',
	   'tpl' : 'template/news/newsList.html'
    });

  newsListObj.createDomObj = function(){
    this.wrapperObj = $("#newsList_wrapperObj");
  }

  newsListObj.createEvent = function(){
    this.wrapperObj.tap(function(e){
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "back" : newsListObj.goBack();return true;
        }        
      }
      
	  var dlObj = $.oto_checkEvent(e,"DL");
      if(dlObj){
        var thisObj = $(dlObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
           case 'detail':  newsListObj.goDetail(thisObj);return true;
        }        
      }
    });
	
	window.onscroll = function() {
         if (!newsListObj.checkPage) return false;
		 if($('#newsList').css('display') != 'none'){
         	newsListObj.updatePage();
		 }
    }
	
	$('#newsList_wrap').dropload({  
			scrollArea : window,
			distance : 200,
			loadUpFn:function(me){
			    newsListObj.page = 0;
				newsListObj.getData();
				//me.resetload();
				newsListObj.pullLoad = me;
			}
	 })   
  }
  
  newsListObj.updatePage = function(){
	    var scrollTop = document.body.scrollTop;
        var bodyHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        if (scrollTop + this.clientHeight > bodyHeight - this.clientHeight /2) {
            this.page += 1;
            this.getData();
        }  
  }
  
  
  
  newsListObj.goDetail = function(obj){
	 var id = obj.attr('data-id');
	 newsDetailObj.goBack = function(){
		newsDetailObj.destroy();
		newsListObj.show(); 
	 }
	 newsDetailObj.show('',function(){
		newsDetailObj.getData(id, newsListObj.type); 
	 })
  }
  
  
  newsListObj.getData = function(type,title){
  	//console.log(title);
	if(type){
	  this.type = type;	
	}
	if(title){
		this.title = title;	
	}
	this.checkPage = false;
	var postData = {
		category_id : newsListObj.type ? newsListObj.type : '' ,
		page : newsListObj.page,
		page_size : newsListObj.page_size,
		access_token : loginObj.access_token
	}
	//console.log(postData);
    $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=user.news.getList',
      data : postData,
      type : "post",
      dataType : "json",
      success : function(msg){
		console.log('新闻列表信息', msg);
		if(msg.code == '0000'){
			if (msg.list.length < newsListObj.page_size) {
				newsListObj.checkPage = false;
			} else {
				newsListObj.checkPage = true;
			}
			newsListObj.formatHtml(msg.list);
		}else{
			$.alertMsg(msg.code_str);	
		}
		if(newsListObj.pullLoad){
			newsListObj.pullLoad.resetload();	
		}
      }
    });    
  }
  
  
  
  newsListObj.formatHtml = function(obj){
	if(!obj.length) return;
	var html = '';
	for(var i=0;i<obj.length;i++){
		var itm = obj[i];
		html += '<dl class="clearfix" data-t="detail" data-id="'+ itm.uuid +'" data-url="'+ itm.detailurl +'">'+
					'<dt><img src="'+ itm.thumb +'"></dt>'+
					'<dd>'+
						'<h3>'+ itm.title +'</h3>'+
						'<p class="font9 font12">'+ itm.description +'</p>'+
					'</dd>'+
				'</dl>';
			
	}
	
	if(this.page == 0){
		$('#newsList_list').html(html);  
	}else{
		$('#newsList_list').append(html);	
	}
	$('#newsList_topTit').html(newsListObj.title);
	$('#newsList_list .loading_1').remove();
  }
  
 
  
  newsListObj.setDefConfig = function(){
	 this.page = 0;
	 this.type = '';
	 this.title = '';
	 this.page_size = 10;
	 window.onscroll = null;
  }
  

  newsListObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
	this.getData();
  }

  newsListObj.init = function(){
	  newsListObj.setDefConfig();
      newsListObj.onloadExecution();
  }
  

	
	
   
 

