
  var searchPlanResultObj = new PageController({
	   'name': 'searchPlanResult',
	   'tpl' : 'template/record/searchPlanResult.html'
    }); 

  searchPlanResultObj.createDom = function(){
    this.wrapperObj = $("#searchPlanResult_wrapperObj");
    this.searchListObj = $("#searchPlanResult_searchListObj");
    this.noTipsObj = $("#searchPlanResult_noTipsObj");
  }

  searchPlanResultObj.createEvent = function(){
    this.wrapperObj.unbind('tap').tap(function(e){
      var spanObj = $.oto_checkEvent(e,"SPAN");
      if(spanObj){
        var thisObj = $(spanObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "fk" : searchPlanResultObj.hrefPay(thisObj);return true;
        }
      }

      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "back" : searchPlanResultObj.goBack();return true;
        }
      }

      var divObj = $.oto_checkEvent(e,"DIV");
      if(divObj){
        var thisObj = $(divObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "detail" : searchPlanResultObj.hrefDetail(thisObj);return true;
        }
      }
    });

    window.onscroll = function(){
	  if(window.scrollY !== 0){
	  	searchPlanResultObj.scrollTop = window.scrollY;
	  }
      if(!searchPlanResultObj.checkPage)return false;
	  if($('#searchPlanResult').css('display') == 'none') return false;
	  
      searchPlanResultObj.updatePage();
    }
  }

  searchPlanResultObj.hrefPay = function(obj){
    var pid = obj.attr("data-p");
     var money = obj.attr("data-m");
	 var type = obj.attr('data-y') ? obj.attr('data-y').toLowerCase() : '';
     var postData = {
		 'product_id' : pid,
		 'pay_amount' : money,
		 'lotteryType' : type, 
	 }
	 buyConfirmObj.goBack=function(){
		 buyConfirmObj.destroy();
		  searchPlanResultObj.show();
	 }
	 buyConfirmObj.show('reload',function(){
		 buyConfirmObj.setData(postData); 
	 })
  }

  searchPlanResultObj.updatePage = function(){
    var scrollTop = document.body.scrollTop;
    var bodyHeight = this.wrapperObj.height();
    if(scrollTop + this.clientHeight > bodyHeight - this.clientHeight/2){
      this.page+=1;
      this.getListData();
    }
  }

  searchPlanResultObj.hrefDetail = function(obj){
     var id = obj.attr("data-v");
	 planDetailObj.goBack = function(){
		planDetailObj.destroy();
		searchPlanResultObj.show(); 
	 }
	 planDetailObj.show('reload',function(){
		 planDetailObj.getData(id);
	 })
  }

  searchPlanResultObj.getListData = function(){
    this.checkPage = false;
    var postData = this.searchData;
	postData.page = this.page;
	var secretData = {
		'para': Global.encrypt(postData),
		'access_token': loginObj.access_token
	}
    $.ajax({
      url : ConfigObj.localSite + '?version=1&m=user.record.getPlanList',
      type : "post",
      data : secretData,
      dataType : "json",
      success : function(msg){
		if(msg.code == '0000'){
			if(msg.info.page != searchPlanResultObj.page)return false;
			if(msg.info.list.length){
			  searchPlanResultObj.noTipsObj.hide();
			}else if(Number(msg.info.page) == 0){
			  searchPlanResultObj.noTipsObj.show();
			  return false;
			}
			if(msg.info.list.length<searchPlanResultObj.minListNum){
			  searchPlanResultObj.checkPage = false;
			}else{
			  searchPlanResultObj.checkPage = true;
			}
			searchPlanResultObj.createListHtml(msg.info.list);
		}else{
			$.alertMsg(msg.code_str);	
		}
      }
    });
  }

  searchPlanResultObj.createListHtml = function(data){
     var html = [];
    for(var i=0,ilen=data.length;i<ilen;i++){
      html.push('<div class="orderlist"><div class="slf"><span class="dot"></span><span class="line"></span></div><div class="srt"><p class="gray mb8">'+data[i]['create_time']+'</p><div class="orderbox mb20" data-t="detail" data-v="'+data[i]['plan_id']+'"><h3 class="mb10 clearfix"><span class="fl">'+data[i]['lottery_type_cn']+'</span><span class="fr font12">追'+data[i]['actual_exec_count']+'<em class="gray">/'+data[i]['expect_exec_count']+'期</em></span></h3><p class="font12 clearfix"><span class="fl fontred">￥'+data[i]['money']+'</span><span '+(data[i]['run_status_cn'] == "等待付款" ? "class='fr fontblue' data-t='fk' data-m="+data[i]['money']+" data-p="+data[i]['plan_id'] : ((data[i]['run_status_cn'] == "出票失败" || data[i]['run_status_cn'].indexOf("累计中奖")==0 || data[i]['run_status_cn'].indexOf("大奖")==0) ? "class='fr fontred'" : 'class="fr"'))+'>'+data[i]['run_status_cn']+'</span></p></div></div></div>');
    }
    this.searchListObj.append(html.join(""));
  }

  searchPlanResultObj.getTypeHtml = function(type){
    switch(type){
      case "buy" : return '<a href="javascript:void(0)" class="fontblue">支付</a>';break;
      case "gq" : return '已过期';break;
      case "jy" : return '交易中';break;
      case "sb" : return '已失败';break;
    }
  }

  searchPlanResultObj.onloadExecution = function(){
    this.createDom();
    this.createEvent();
    //this.getListData();
  }

  searchPlanResultObj.init = function(){
	  this.setDefConfig();
      searchPlanResultObj.onloadExecution();
  }
  
  searchPlanResultObj.setData = function(obj){
	 this.searchData = obj;
  }
  
  searchPlanResultObj.setDefConfig = function(){
	  searchPlanResultObj.page = 0;
	  searchPlanResultObj.checkPage = true;
	  searchPlanResultObj.clientHeight = document.documentElement.clientHeight;
	  searchPlanResultObj.minListNum = 2;
	  searchPlanResultObj.recordType = {"zt":"直投","zh":"追号","hm":"合买"};
	  this.searchData = null;
  }
	
  searchPlanResultObj.destroy = function(){
	  this.setDefConfig();
	  $('#searchPlanResult').html('').remove();
	  window.onscroll = null;
	  searchPlanResultObj.scrollTop = 0;
   }
  
  
  