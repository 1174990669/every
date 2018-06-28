
  var searchCashResultObj = new PageController({
	   'name': 'searchCashResult',
	   'tpl' : 'template/record/searchCashResult.html'
    }); 

  searchCashResultObj.createDom = function(){
    this.wrapperObj = $("#searchCashResult_wrapperObj");
    this.searchListObj = $("#searchCashResult_searchListObj");
    this.noTipsObj = $("#searchCashResult_noTipsObj");
  }

  searchCashResultObj.createEvent = function(){
    this.wrapperObj.unbind('tap').tap(function(e){
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "back" : searchCashResultObj.goBack();return true;
        }
      }

      var divObj = $.oto_checkEvent(e,"DIV");
      if(divObj){
        var thisObj = $(divObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "detail" : searchCashResultObj.showDetail(thisObj);return true;
        }
      }
    });
	
	window.onsroll = null;
    window.onscroll = function(){
	  if(window.scrollY !== 0){
	  	searchCashResultObj.scrollTop = window.scrollY;
	  }
      if(!searchCashResultObj.checkPage)return false;
	  if($('#searchCashResult').css('display') == 'none') return false;
      searchCashResultObj.updatePage();
    }
  }

  searchCashResultObj.updatePage = function(){
    var scrollTop = document.body.scrollTop;
    var bodyHeight = this.wrapperObj.height();
    if(scrollTop + this.clientHeight > bodyHeight - this.clientHeight/2){
      this.page+=1;
      this.getListData();
    }
  }

  searchCashResultObj.showDetail = function(obj){
    var thisP = obj.attr("data-p");
    var pid = obj.attr("data-i");
    var con = obj.attr("data-c");
    if (con == "together") {
      hemaiDetailObj.goBack = function(){
        hemaiDetailObj.destroy();
        cashRecordObj.show();
      }
      hemaiDetailObj.show(true,function(){
        hemaiDetailObj.setData(pid);
      });
      return;
    }
    if(!!!thisP || !!!pid)return true;
	if(thisP == 'Project'){
		
		projectDetailObj.show('reload',function(){
			projectDetailObj.getData(pid); 
			projectDetailObj.pushRoute(function(){  //路由机制
				searchCashResultObj.show();
			})  
		})
		//searchCashResultObj.destroy();
	}else if(thisP == 'Order'){
		rechargeStatusObj.goBack = function(){
			rechargeStatusObj.destroy();
			searchCashResultObj.show();	
		}
		rechargeStatusObj.show('reload',function(){
			rechargeStatusObj.getData(pid);
		})	
	}
	
  }

  searchCashResultObj.getListData = function(){
    this.checkPage = false;
    var postData = this.searchData;
    postData.page = this.page;
    var secretData = {
			'para' : Global.encrypt(postData),
			'access_token' : loginObj.access_token
		};
	
		
    $.ajax({
       url : ConfigObj.localSite +  '?version=1&m=user.record.cash',
      type : "post",
      data : secretData,
      dataType : "json",
      success : function(msg){
      	
		if(msg.code == '0000'){
//			console.log(msg)
			msg.info = $.parseJSON(Global.crypt(msg.info));
			if(msg.info.page != searchCashResultObj.page)return false;
			if(msg.info.list.length){
			  searchCashResultObj.noTipsObj.hide();
			}else if(Number(msg.info.page) == 0){
			  searchCashResultObj.noTipsObj.show();
			  return false;
			}
			if(msg.info.list.length<searchCashResultObj.minListNum){
			  searchCashResultObj.checkPage = false;
			}else{
			  searchCashResultObj.checkPage = true;
			}
			searchCashResultObj.createListHtml(msg.info.list);
		}else{
			$.alertMsg(msg.code_str);
		}
      }
    });
  }

  searchCashResultObj.createListHtml = function(data){
    var html = [];
    for(var i=0,ilen=data.length;i<ilen;i++){
      html.push('<div class="orderlist"><div class="slf"><span class="dot'+(this.timeTem != data[i]['create_date'] ? ' blur' : '')+'"></span><span class="line"></span></div><div class="srt"><p class="gray mb8">'+data[i]['create_date']+'</p><div class="orderbox mb20" data-t="detail" data-p="'+data[i]['target_type']+'" data-c="'+data[i]['consign_type']+'" data-i="'+data[i]['target_id']+'"><h3 class="mb10">'+data[i]['item_cn']+'</h3><p class="font12 gray">'+data[i]['create_time']+'</p><p class="cash_change"><span class="'+(Number(data[i]['amount'])>0 ? "fontred" : "fontgreen")+(data[i]['target_type'] && data[i]['target_id'] ? '' : ' mr22')+'">'+data[i]['amount']+'元<em class="icon rtarrow"></em></span></p></div></div></div>');
      this.timeTem = data[i]['create_date'];
    }
    this.searchListObj.append(html.join(""));
  }

  searchCashResultObj.getTypeHtml = function(type){
    switch(type){
      case "buy" : return '<a href="javascript:void(0)" class="fontblue">支付</a>';break;
      case "gq" : return '已过期';break;
      case "jy" : return '交易中';break;
      case "sb" : return '已失败';break;
    }
  }
  
  searchCashResultObj.setData = function(obj){
	 this.searchData = obj;
  }

  searchCashResultObj.onloadExecution = function(){
    this.createDom();
    this.createEvent();
  }

  searchCashResultObj.init = function(){
	  searchCashResultObj.setDefConfig();
      searchCashResultObj.onloadExecution();
  }
  
  searchCashResultObj.setDefConfig = function(){
	searchCashResultObj.page = 0;
  	searchCashResultObj.checkPage = true;
  	searchCashResultObj.clientHeight = document.documentElement.clientHeight;
  	searchCashResultObj.minListNum = 2;
  	searchCashResultObj.timeTem = "";
	window.onsroll = null;
	searchCashResultObj.scrollTop = 0;
  }
	
  
  
  

