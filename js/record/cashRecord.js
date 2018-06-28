
  var cashRecordObj = new PageController({
	   'name': 'cashRecord',
	   'tpl' : 'template/record/cashRecord.html'
    }); 
  
  cashRecordObj.createDom = function(){
    this.cashObj = $("#cashRecord_cashObj");
    //this.noTipsObj = $("#noTipsObj");
    this.cashListObj = $("#cashRecord_cashListObj");
    this.allMoneyObj = $("#cashRecord_allMoneyObj");
	this.goTop = $('#cashRecord_goTop');
  }

  cashRecordObj.createEvent = function(){
	this.goTop.unbind('tap').tap(function(){
		window.scrollTo(0,0);
		cashRecordObj.scrollTop = 0;
	})
    this.cashObj.tap(function(e){
        var pObj = $.oto_checkEvent(e,"P");
        if(pObj){
          var thisObj = $(pObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "backbtn" : cashRecordObj.goBack();return true;
            case "search" : cashRecordObj.goSearch();return true;
          }
        }

        var liObj = $.oto_checkEvent(e,"LI");
        if(liObj){
          var thisObj = $(liObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "update" : cashRecordObj.updateType(thisObj);return true;
          }
        }
        var divObj = $.oto_checkEvent(e,"DIV");
        if(divObj){
          var thisObj = $(divObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "detail" : cashRecordObj.goDetail(thisObj);return true;
          }
        }
    });
	
	window.onscroll = null;
    window.onscroll = function(){
	  if(window.scrollY !== 0){
	  	cashRecordObj.scrollTop = window.scrollY;
	  }
      if(!cashRecordObj.checkPage)return false;
      cashRecordObj.updatePage();
    }
	
	this.cashListObj.dropload({  
			scrollArea : window,
			distance : this.pullDistance,
			loadUpFn:function(me){
				cashRecordObj.page = 0;
				cashRecordObj.getListData();
				me.resetload();
			}
	 })   
  }
  
  cashRecordObj.goSearch = function(){
	  searchCashRecordObj.goBack = function(){
		 searchCashRecordObj.destroy();
		 cashRecordObj.show('reload');  
	  }
	  searchCashRecordObj.show();
	  cashRecordObj.destroy();
  }

  cashRecordObj.goDetail = function(obj){
    var type = obj.attr("data-p");
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
    switch(type){
	   case 'Project':
		    projectDetailObj.show('reload',function(){
			  projectDetailObj.getData(pid); 
			  projectDetailObj.pushRoute(function(){  //路由机制
				cashRecordObj.show();
			  })  
		  })
		  break;
		case 'Order':
			rechargeStatusObj.goBack = function(){
				rechargeStatusObj.destroy();
				cashRecordObj.show();	
			}
			rechargeStatusObj.show('reload',function(){
				rechargeStatusObj.getData(pid);
			})
			break;
		case 'Draw':
			withdrawDetailObj.goBack = function(){
				withdrawDetailObj.destroy();
				cashRecordObj.show();	
			}
			
			withdrawDetailObj.show('reload',function(){
				withdrawDetailObj.getData(pid);
			})
			break;
	}
	
  }

  cashRecordObj.updatePage = function(){
    var scrollTop = document.body.scrollTop;
    var bodyHeight = this.cashObj.height();
    if(scrollTop + this.clientHeight > bodyHeight - this.clientHeight/2){
      this.page+=1;
      this.getListData();
    }
	scrollTop>this.clientHeight*2 ? this.goTop.show() : this.goTop.hide();
  }

  cashRecordObj.updateType = function(obj){
    var thisT = obj.attr("data-v");
    if(thisT == this.cashListType)return false;
    obj.siblings().removeClass("on");
    obj.addClass('on');

    this.cashListType = thisT;
    this.page = 0;
    this.checkPage = true;
    this.timeTem = "";

    this.cashListObj.html("");
    this.getListData();
  }

  cashRecordObj.getListData = function(){
    cashRecordObj.checkPage = false;
	var postData = {
		'para': Global.encrypt({
			'income_type' : this.cashListType,
			'page' : this.page,
			'page_size' : this.minListNum,
			'period' : '-3_months'
		}),
		'access_token' : loginObj.access_token	
	}
    $.ajax({
	  url : ConfigObj.localSite +  '?version=1&m=user.record.cash',
      type : "post",
      data : postData,
      dataType : "json",
      success : function(msg){
      	
//		console.log('现金记录列表数据返回 ', msg);
		if(msg.code == '0000'){
			msg.info = $.parseJSON(Global.crypt(msg.info));
//			 console.log('现金记录列表数据返回 ', msg);
			if(msg.info.income_type != cashRecordObj.cashListType) return false;
			if(msg.info.page != cashRecordObj.page)return false;
			if(msg.info.list.length<cashRecordObj.minListNum){
			  cashRecordObj.checkPage = false;
			}else{
			  cashRecordObj.checkPage = true;
			}
			cashRecordObj.allMoneyObj.html(msg.info.remain+'元');
			cashRecordObj.createListHtml(msg.info.list);
			if(!cashRecordObj.checkPage){
				cashRecordObj.cashListObj.append('<div class="center endtip_1">已显示全部</div>');
			}
		}else{
			$.alertMsg(msg.code_str);	
		}
		
      }
    });
  }

  cashRecordObj.createListHtml = function(data){
    var html = [];
    for(var i=0,ilen=data.length;i<ilen;i++){
      html.push('<div class="orderlist"><div class="slf"><span class="dot'+(this.timeTem != data[i]['create_date'] ? ' blur' : '')+'"></span><span class="line"></span></div><div class="srt"><p class="gray mb8">'+data[i]['create_date']+'</p><div class="orderbox mb20" data-t="detail" data-p="'+data[i]['target_type']+'" data-c="'+data[i]['consign_type']+'" data-i="'+data[i]['target_id']+'"><h3 class="mb10">'+data[i]['item_cn']+'</h3><p class="font12 gray">'+data[i]['create_time']+'</p><p class="cash_change"><span class="'+ (Number(data[i]['amount'])>0 ? "fontred" : "fontgreen")+(data[i]['target_type'] && data[i]['target_id'] ? '' : ' mr22')+'">'+data[i]['amount']+'元'+(data[i]['target_type'] && data[i]['target_id'] ? '<em class="icon rtarrow"></em>' : '')+'</span></p></div></div></div>');
      this.timeTem = data[i]['create_date'];
    }
	if(this.page == 0){
		this.cashListObj.html(html.join(""));
	}else{
    	this.cashListObj.append(html.join(""));
	}
  }

  cashRecordObj.onloadExecution = function(){
    this.createDom();
    this.createEvent();
    this.getListData();
  }

  cashRecordObj.init = function(){
	cashRecordObj.setDefConfig();
    cashRecordObj.onloadExecution();
  }
  
  cashRecordObj.setDefConfig = function(){
	  cashRecordObj.cashListType = "";
	  cashRecordObj.page = 0;
	  cashRecordObj.checkPage = true;
	  cashRecordObj.clientHeight = document.documentElement.clientHeight;
	  cashRecordObj.minListNum = 20;
	  cashRecordObj.timeTem = ""; 
	  
	  window.onscroll = null;
	  cashRecordObj.scrollTop = 0;
  }
	
