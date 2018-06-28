
  var scoreRecordObj = new PageController({
	   'name': 'scoreRecord',
	   'tpl' : 'template/record/scoreRecord.html'
    }); 

  scoreRecordObj.createDom = function(){
    this.scoreObj = $("#scoreRecord_scoreObj");
    //this.noTipsObj = $("#noTipsObj");
    this.scoreListObj = $("#scoreRecord_scoreListObj");
    this.allScoreObj = $("#scoreRecord_allScoreObj");
  }

  scoreRecordObj.createEvent = function(){
    this.scoreObj.unbind('tap').tap(function(e){
        var pObj = $.oto_checkEvent(e,"P");
        if(pObj){
          var thisObj = $(pObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "back" : scoreRecordObj.goBack();return true;
            case "search" : scoreRecordObj.goSearch();return true;
          }
        }

        var liObj = $.oto_checkEvent(e,"LI");
        if(liObj){
          var thisObj = $(liObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "update" : scoreRecordObj.updateType(thisObj);return true;
          }
        }

        var divObj = $.oto_checkEvent(e,"DIV");
        if(divObj){
          var thisObj = $(divObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "detail" : scoreRecordObj.hrefDetail(thisObj);return true;
          }
        }
    });

    window.onscroll = function(){
	  if(window.scrollY !== 0){
	  	scoreRecordObj.scrollTop = window.scrollY;
	  }
      if(!scoreRecordObj.checkPage)return false;
	  if($('#scoreRecord').css('display') == 'none') return false;
	  
      scoreRecordObj.updatePage();
    }
	
	this.scoreListObj.dropload({  
			scrollArea : window,
			distance : this.pullDistance,
			loadUpFn:function(me){
				scoreRecordObj.page = 0;
				scoreRecordObj.getListData();
				me.resetload();
			}
	 })   
  }
  
  //高级查询
  scoreRecordObj.goSearch = function(){
	  searchScoreRecordObj.goBack = function(){
		 searchScoreRecordObj.destroy();
		 scoreRecordObj.show();  
	  }
	  searchScoreRecordObj.show();
  }

  scoreRecordObj.hrefDetail = function(obj){
    var thisP = obj.attr("data-p");
    var thisI = obj.attr("data-i");
    var con = obj.attr("data-c");
    if (con == "together") {
      hemaiDetailObj.goBack = function(){
        hemaiDetailObj.destroy();
        scoreRecordObj.show();
      }
      hemaiDetailObj.show(true,function(){
        hemaiDetailObj.setData(thisI);
      });
      return;
    }
    if(!!!thisP || !!!thisI)return true;
    switch(thisP){
	   case 'Project':
	      
		  projectDetailObj.show('reload',function(){
			  projectDetailObj.getData(thisI);
			  projectDetailObj.pushRoute(function(){  //路由机制
				scoreRecordObj.show();
			 })   
		  })
		  break;
	}
  }

  scoreRecordObj.updatePage = function(){
    var scrollTop = document.body.scrollTop;
    var bodyHeight = this.scoreObj.height();
    if(scrollTop + this.clientHeight > bodyHeight - this.clientHeight/2){
      this.page+=1;
      this.getListData();
    }
  }

  scoreRecordObj.updateType = function(obj){
    var thisT = obj.attr("data-v");
    if(thisT == this.scoreListType)return false;
    obj.siblings().removeClass("on");
    obj.addClass('on');

    this.scoreListType = thisT;
    this.page = 0;
    this.checkPage = true;
    this.timeTem = "";

    this.scoreListObj.html("");
    this.getListData();
  }

  scoreRecordObj.getListData = function(){
    scoreRecordObj.checkPage = false;
	var postData = {
		'para': Global.encrypt({
			'income_type' : this.scoreListType,
			'page': this.page,
			'page_size' : this.minListNum,
			'period' : '-3_months'
		}),
		'access_token' : loginObj.access_token
	}
    $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=user.record.score',
      type : "post",
      data : postData,
      dataType : "json",
      success : function(msg){
//		console.log('积分记录列表 ' ,msg);
		
		if(msg.code == '0000'){
			msg.info = $.parseJSON(Global.crypt(msg.info));
			if(msg.info.income_type != scoreRecordObj.scoreListType)return false;
			if(msg.info.page != scoreRecordObj.page)return false;
			if(msg.info.list.length<scoreRecordObj.minListNum){
			  scoreRecordObj.checkPage = false;
			}else{
			  scoreRecordObj.checkPage = true;
			}
			scoreRecordObj.allScoreObj.html(msg.info.remain+'分');
			scoreRecordObj.createListHtml(msg.info.list);
			if(!scoreRecordObj.checkPage){
				scoreRecordObj.scoreListObj.append('<div class="center endtip_1">已显示全部</div>');
			}
		}else{
			$.alertMsg(msg.code_str);	
		}
      }
    });
  }

  scoreRecordObj.createListHtml = function(data){
    var html = [];
    for(var i=0,ilen=data.length;i<ilen;i++){
    
      html.push('<div class="orderlist"><div class="slf"><span class="dot'+(this.timeTem != data[i]['create_date'] ? ' blur' : '')+'"></span><span class="line"></span></div><div class="srt"><p class="gray mb8">'+data[i]['create_date']+'</p><div class="orderbox mb20" data-t="detail" data-p="'+data[i]['target_type']+'" data-c="'+data[i]['consign_type']+'" data-i="'+data[i]['target_id']+'"><h3 class="mb10">'+data[i]['item_cn']+'</h3><p class="font12 gray">'+data[i]['create_time']+'</p><p class="cash_change"><span class="'+(Number(data[i]['amount'])>0 ? "fontred" : "fontgreen")+(data[i]['target_type'] && data[i]['target_id'] ? '' : ' mr22')+'">'+data[i]['amount']+'分'+(data[i]['target_type'] && data[i]['target_id'] ? '<em class="icon rtarrow"></em>' : '')+'</span></p></div></div></div>');
      this.timeTem = data[i]['create_date'];
    }
	if(this.page == 0){
		this.scoreListObj.html(html.join(""));
	}else{
    	this.scoreListObj.append(html.join(""));
	}
  }

  scoreRecordObj.onloadExecution = function(){
    this.createDom();
    this.createEvent();
    this.getListData();
  }

  scoreRecordObj.init = function(){
	  scoreRecordObj.setDefConfig();
      scoreRecordObj.onloadExecution();
  }
  
  scoreRecordObj.setDefConfig = function(){
	  scoreRecordObj.scoreListType = "";
	  scoreRecordObj.page = 0;
	  scoreRecordObj.checkPage = true;
	  scoreRecordObj.clientHeight = document.documentElement.clientHeight;
	  scoreRecordObj.minListNum = 20;
	  scoreRecordObj.timeTem = "";
	   window.onscroll = null;
	  scoreRecordObj.scrollTop = 0;
  }
  
 
