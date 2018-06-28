
  var freezeRecordObj = new PageController({
	   'name': 'freezeRecord',
	   'tpl' : 'template/record/freezeRecord.html'
    }); 

  freezeRecordObj.createDom = function(){
    this.freezeObj = $("#freezeRecord_freezeObj");
    //this.noTipsObj = $("#noTipsObj");
    this.freezeListObj = $("#freezeRecord_freezeListObj");
    this.allfreezeObj = $("#freezeRecord_allfreezeObj");
  }

  freezeRecordObj.createEvent = function(){
    this.freezeObj.unbind('tap').tap(function(e){
        var pObj = $.oto_checkEvent(e,"P");
        if(pObj){
          var thisObj = $(pObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "back" : freezeRecordObj.goBack();return true;
          }
        }
        var divObj = $.oto_checkEvent(e,"DIV");
        if(divObj){
          var thisObj = $(divObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "detail" : freezeRecordObj.hrefDetail(thisObj);return true;
          }
        }
    });

    window.onscroll = function(){
	  if(window.scrollY !== 0){
	  	freezeRecordObj.scrollTop = window.scrollY;
	  }
      if(!freezeRecordObj.checkPage)return false;
      freezeRecordObj.updatePage();
    }
	
	 this.freezeListObj.dropload({  
			scrollArea : window,
			distance : this.pullDistance,
			loadUpFn:function(me){
				freezeRecordObj.page = 0;
				freezeRecordObj.getListData();
				me.resetload();
			}
	  })   
  }

  freezeRecordObj.hrefDetail = function(obj){
    var thisP = obj.attr("data-p");
    var thisI = obj.attr("data-i");
    if(!!!thisP || !!!thisI)return true;
    if(thisP == 'Order'){
		withdrawDetailObj.goBack = function(){
			withdrawDetailObj.destroy();
			freezeRecordObj.show();	
		}
		
		withdrawDetailObj.show('reload',function(){
			withdrawDetailObj.getData(thisI);
		})
	}
	if(thisP == 'Project'){
		  projectDetailObj.show('reload',function(){
			  projectDetailObj.getData(thisI);  
			  projectDetailObj.pushRoute(function(){  //路由机制
				freezeRecordObj.show();
			  })  
		  })
	}
	if(thisP == 'Plan'){
		  planDetailObj.goBack = function(){
			 planDetailObj.destroy();
			 freezeRecordObj.show();  
		  }
		  planDetailObj.show('reload',function(){
			  planDetailObj.getData(thisI);  
		  })
	}
  }

  freezeRecordObj.updatePage = function(){
    var scrollTop = document.body.scrollTop;
    var bodyHeight = this.freezeObj.height();
    if(scrollTop + this.clientHeight > bodyHeight - this.clientHeight/2){
      this.page+=1;
      this.getListData();
    }
  }

  freezeRecordObj.getListData = function(){
    freezeRecordObj.checkPage = false;
	var postData = {
		'page' : this.page,
		'page_size': this.minListNum,
		'access_token': loginObj.access_token	
	}
	
    $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=user.record.freeze',
      type : "post",
      data : postData,
      dataType : "json",
      success : function(msg){
		//console.log('冻结现金记录数据', msg);
		if(msg.code == '0000'){
			if(msg.info.page != freezeRecordObj.page)return false;
			if(msg.info.list.length<freezeRecordObj.minListNum){
			  freezeRecordObj.checkPage = false;
			}else{
			  freezeRecordObj.checkPage = true;
			}
			freezeRecordObj.allfreezeObj.html(msg.info.remain+"元");
			freezeRecordObj.createListHtml(msg.info.list);
			if(!freezeRecordObj.checkPage){
				freezeRecordObj.freezeListObj.append('<div class="center endtip_1">已显示全部</div>');
			}
		}else{
			$.alertMsg(msg.code_str);	
		}
      }
    });
  }

  freezeRecordObj.createListHtml = function(data){
    var html = [];
    for(var i=0,ilen=data.length;i<ilen;i++){
    	html.push('<div class="orderlist"><div class="slf"><span class="dot'+(this.timeTem != data[i]['create_date'] ? ' blur' : '')+'"></span><span class="line"></span></div><div class="srt"><p class="gray mb8">'+data[i]['create_date']+'</p><div class="orderbox mb20" data-t="detail" data-p="'+data[i]['target_type']+'" data-i="'+data[i]['target_id']+'"><h3 class="mb10">'+data[i]['reason_cn']+'</h3><p class="font12 gray">'+data[i]['create_time']+'</p><p class="cash_change"><span class="'+(Number(data[i]['amount'])>0 ? "fontred" : "fontgreen")+(data[i]['target_type'] && data[i]['target_id'] ? '' : ' mr22')+'">'+data[i]['amount']+'元'+(data[i]['target_type'] && data[i]['target_id'] ? '<em class="icon rtarrow"></em>' : '')+'</span></p></div></div></div>');
    	this.timeTem = data[i]['create_date'];
    }
	if(this.page == 0){
		this.freezeListObj.html(html.join(""));
	}else{
    	this.freezeListObj.append(html.join(""));
	}
  }

  freezeRecordObj.onloadExecution = function(){
    this.createDom();
    this.createEvent();
    this.getListData();
  }

  freezeRecordObj.init = function(){
	  freezeRecordObj.setDefConfig();
      freezeRecordObj.onloadExecution();
  }
  
  freezeRecordObj.setDefConfig = function(){
	  freezeRecordObj.freezeListType = "cash";
	  freezeRecordObj.page = 0;
	  freezeRecordObj.checkPage = true;
	  freezeRecordObj.clientHeight = document.documentElement.clientHeight;
	  freezeRecordObj.minListNum = 20;
	  freezeRecordObj.timeTem = "";
	  window.onscroll = null;
	  freezeRecordObj.scrollTop = 0;
  }
