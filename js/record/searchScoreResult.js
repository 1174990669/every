
  var searchScoreResultObj = new PageController({
	   'name': 'searchScoreResult',
	   'tpl' : 'template/record/searchScoreResult.html'
    }); 

  searchScoreResultObj.createDom = function(){
    this.wrapperObj = $("#searchScoreResult_wrapperObj");
    this.searchListObj = $("#searchScoreResult_searchListObj");
    this.noTipsObj = $("#searchScoreResult_noTipsObj");
  }

  searchScoreResultObj.createEvent = function(){
    this.wrapperObj.unbind('tap').tap(function(e){
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "back" : searchScoreResultObj.goBack();return true;
        }
      }

      var divObj = $.oto_checkEvent(e,"DIV");
      if(divObj){
        var thisObj = $(divObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "detail" : searchScoreResultObj.showDetail(thisObj);return true;
        }
      }
    });

    window.onscroll = function(){
	  if(window.scrollY !== 0){
	  	searchScoreResultObj.scrollTop = window.scrollY;
	  }
      if(!searchScoreResultObj.checkPage)return false;
	  if($('#searchScoreResult').css('display') == 'none') return false;
      searchScoreResultObj.updatePage();
    }
  }

  searchScoreResultObj.updatePage = function(){
    var scrollTop = document.body.scrollTop;
    var bodyHeight = this.wrapperObj.height();
    if(scrollTop + this.clientHeight > bodyHeight - this.clientHeight/2){
      this.page+=1;
      this.getListData();
    }
  }

  searchScoreResultObj.showDetail = function(obj){
    var thisP = obj.attr("data-p");
    var thisI = obj.attr("data-i");
    if(!!!thisP || !!!thisI)return true;
    if(thisP == 'Project'){
		projectDetailObj.show('reload',function(){
			projectDetailObj.getData(thisI); 
			projectDetailObj.pushRoute(function(){  //路由机制
				searchScoreResultObj.show();
			}) 
		})
	}
  }

  searchScoreResultObj.getListData = function(){
    this.checkPage = false;
    var postData = this.searchData;
    postData.page = this.page;
    var secretData = {
			'para' : Global.encrypt(postData),
			'access_token' : loginObj.access_token
		};
    $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=user.record.score',
      type : "post",
      data : secretData,
      dataType : "json",
      success : function(msg){
        //console.log('积分记录查询结果 ',msg);
        
		if(msg.code == '0000'){
			msg.info = $.parseJSON(Global.crypt(msg.info));
			if(msg.info.page != searchScoreResultObj.page)return false;
			if(msg.info.list.length){
			  searchScoreResultObj.noTipsObj.hide();
			}else if(Number(msg.info.page) == 0){
			  searchScoreResultObj.noTipsObj.show();
			  return false;
			}
			if(msg.info.list.length<searchScoreResultObj.minListNum){
			  searchScoreResultObj.checkPage = false;
			}else{
			  searchScoreResultObj.checkPage = true;
			}
			searchScoreResultObj.createListHtml(msg.info.list);
		}else{
			$.alertMsg(msg.code_str);	
		}
      }
    });
  }

  searchScoreResultObj.createListHtml = function(data){
    var html = [];
    for(var i=0,ilen=data.length;i<ilen;i++){
      html.push('<div class="orderlist"><div class="slf"><span class="dot'+(this.timeTem != data[i]['create_date'] ? ' blur' : '')+'"></span><span class="line"></span></div><div class="srt"><p class="gray mb8">'+data[i]['create_date']+'</p><div class="orderbox mb20" data-t="detail" data-p="'+data[i]['target_type']+'" data-i="'+data[i]['target_id']+'"><h3 class="mb10">'+data[i]['item_cn']+'</h3><p class="font12 gray">'+data[i]['create_time']+'</p><p class="cash_change"><span class="'+(Number(data[i]['amount'])>0 ? "fontred" : "fontgreen")+(data[i]['target_type'] && data[i]['target_id'] ? '' : ' mr22')+'">'+data[i]['amount']+(data[i]['target_type'] && data[i]['target_id'] ? '<em class="icon rtarrow"></em>' : '')+'</span></p></div></div></div>');
      this.timeTem = data[i]['create_date'];
    }
    this.searchListObj.append(html.join(""));
  }

  searchScoreResultObj.getTypeHtml = function(type){
    switch(type){
      case "buy" : return '<a href="javascript:void(0)" class="fontblue">支付</a>';break;
      case "gq" : return '已过期';break;
      case "jy" : return '交易中';break;
      case "sb" : return '已失败';break;
    }
  }
  
  searchScoreResultObj.setData = function(obj){
	   this.searchData = obj;
  }
   
  searchScoreResultObj.onloadExecution = function(){
    this.createDom();
    this.createEvent();
  }

  searchScoreResultObj.init = function(){
	  this.setDefConfig();
      searchScoreResultObj.onloadExecution();
  }
  
  searchScoreResultObj.setDefConfig = function(){
	  searchScoreResultObj.page = 0;
  	  searchScoreResultObj.checkPage = true;
      searchScoreResultObj.clientHeight = document.documentElement.clientHeight;
      searchScoreResultObj.minListNum = 2;
	  window.onscroll = null;
	  searchScoreResultObj.scrollTop = 0;
  }
