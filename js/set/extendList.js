
  var extendListObj = new PageController({
	   'name': 'extendList',
	   'tpl' : 'template/set/extendList.html'
    }); 

  extendListObj.createDom = function(){
    this.wrapObj = $("#extendList_wrapObj");
    this.betListObj = $("#extendList_listObj");
  }

  extendListObj.createEvent = function(){
	
    this.wrapObj.unbind('tap').tap(function(e){
        var pObj = $.oto_checkEvent(e,"P");
        if(pObj){
          var thisObj = $(pObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "back" : extendListObj.goBack();return true;
          }
        }
        var dlObj = $.oto_checkEvent(e,"DL");
        if(dlObj){
          var thisObj = $(dlObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "detail" : extendListObj.goDetail(thisObj);return true;
          }
        }
		var aObj = $.oto_checkEvent(e,"A");
        if(aObj){
          var thisObj = $(aObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
         
          }
        }
		
    });

    window.onscroll = function(){
	  if(window.scrollY !== 0){
	  	extendListObj.scrollTop = window.scrollY;
	  }
      if(!extendListObj.checkPage)return false;
      extendListObj.updatePage();
    }
	 
	this.betListObj.dropload({  
			scrollArea : window,
			distance : this.pullDistance,
			loadUpFn:function(me){
				extendListObj.page = 0;
				extendListObj.getListData();
				me.resetload();
			}
	 })   
  }
 
 

  extendListObj.goDetail = function(obj){
    var id = obj.attr("data-id");
	var type = obj.attr('data-cat');
	extendDetailObj.goBack=function(){
		extendDetailObj.destroy();
	    extendListObj.show();
	}
	extendDetailObj.show('',function(){
		extendDetailObj.getData(id,type);
	})
  }

  extendListObj.updatePage = function(){
    var scrollTop = document.body.scrollTop;
    var bodyHeight = this.rechargeObj.height();
    if(scrollTop + this.clientHeight > bodyHeight - this.clientHeight/2){
      this.page+=1;
      this.getListData();
    }
  }

  extendListObj.getListData = function(){
    extendListObj.checkPage = false;
	var postData = {
		'page' : this.page,
		'page_size': this.minListNum,
		'access_token': loginObj.access_token	
	}
	
    $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=user.news.getAgentList',    
      type : "post",
      data : postData,
      dataType : "json",
      success : function(msg){
		//console.log('推广列表数据', msg);
		if(msg.code == '0000'){
			if(msg.page != extendListObj.page)return false;
			if(msg.list.length<extendListObj.minListNum){
			  extendListObj.checkPage = false;
			}else{
			  extendListObj.checkPage = true;
			}
			extendListObj.createListHtml(msg.list);
			if(!extendListObj.checkPage){
				extendListObj.betListObj.append('<div class="center endtip_1">已显示全部</div>');
			}
		}else{
			//$.alertMsg(msg.code_str);	
		}
      }
    });
  }

  extendListObj.createListHtml = function(data){
	var self = this;
    var html = '';
    for(var i=0,ilen=data.length;i<ilen;i++){
		var itm = data[i];
    	html += '<dl class="clearfix" data-t="detail" data-cat="'+ itm.catid +'" data-id="'+ itm.uuid +'" data-url="">'+
					'<dt><img src="'+ itm.thumb +'" /></dt>'+
					'<dd><h3>'+ itm.title +'</h3><p class="font9 font12">'+ itm.description +'</p></dd>'+
				'</dl>';
    }
	if(this.page == 0){
		this.betListObj.html(html);
	}else{
    	this.betListObj.append(html);
	}
  }

  extendListObj.onloadExecution = function(){
    this.createDom();
    this.createEvent();
    this.getListData();
  }

  extendListObj.init = function(){
	  extendListObj.setDefConfig();
      extendListObj.onloadExecution();
  }
  
  extendListObj.setDefConfig = function(){
	  extendListObj.page = 0;
	  extendListObj.checkPage = true;
	  extendListObj.clientHeight = document.documentElement.clientHeight;
	  extendListObj.minListNum = 20;
	  extendListObj.timeTem = "";
	  window.onscroll = null;
	  extendListObj.scrollTop = 0;
	 
  }
  
  
