
  var openTicketRecordObj = new PageController({
	   'name': 'openTicketRecord',
	   'tpl' : 'template/record/openTicketRecord.html'
    }); 
  
  openTicketRecordObj.createDom = function(){
    this.wrapObj = $("#openTicketRecord_wrapObj");
    this.listObj = $("#openTicketRecord_listObj");
	//this.goTop = $('#openTicketRecord_goTop');
  }

  openTicketRecordObj.createEvent = function(){
	/*this.goTop.unbind('tap').tap(function(){
		window.scrollTo(0,0);
		openTicketRecordObj.scrollTop = 0;
	})*/
    this.wrapObj.tap(function(e){
        var pObj = $.oto_checkEvent(e,"P");
        if(pObj){
          var thisObj = $(pObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "back" : openTicketRecordObj.goBack();return true;
            case "buy" : openTicketRecordObj.goBuy();return true;
          }
        }

        var liObj = $.oto_checkEvent(e,"LI");
        if(liObj){
          var thisObj = $(liObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "update" : openTicketRecordObj.updateType(thisObj);return true;
          }
        }
        var divObj = $.oto_checkEvent(e,"DIV");
        if(divObj){
          var thisObj = $(divObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "detail" : openTicketRecordObj.goDetail(thisObj);return true;
          }
        }
    });
	
	window.onscroll = null;
    window.onscroll = function(){
	  /*if(window.scrollY !== 0){
	  	openTicketRecordObj.scrollTop = window.scrollY;
	  }
      if(!openTicketRecordObj.checkPage)return false;
      openTicketRecordObj.updatePage();*/
    }
	
	/*this.listObj.dropload({  
			scrollArea : window,
			distance : this.pullDistance,
			loadUpFn:function(me){
				openTicketRecordObj.page = 0;
				openTicketRecordObj.getListData();
				me.resetload();
			}
	 })   */
  }
  
  openTicketRecordObj.goBuy = function(){
	 
	  buyOpenTicketObj.show('',function(){
		  buyOpenTicketObj.pushRoute(function(){
			   openTicketRecordObj.show();
		  })
	  });
  }

  openTicketRecordObj.goDetail = function(obj){
    var type = obj.attr("data-p");
    var pid = obj.attr("data-i");
    var con = obj.attr("data-c");
    if (con == "together") {
      hemaiDetailObj.goBack = function(){
        hemaiDetailObj.destroy();
        openTicketRecordObj.show();
      }
      hemaiDetailObj.show(true,function(){
        hemaiDetailObj.setData(pid);
      });
      return;
    }
   /* switch(type){
	   case 'Project':
	 
		  projectDetailObj.show('reload',function(){
			  projectDetailObj.getData(pid); 
			  projectDetailObj.pushRoute(function(){  //路由机制
				openTicketRecordObj.show();
			  })  
		  })
		  break;
		case 'Order':
			rechargeStatusObj.goBack = function(){
				rechargeStatusObj.destroy();
				openTicketRecordObj.show();	
			}
			rechargeStatusObj.show('reload',function(){
				rechargeStatusObj.getData(pid);
			})
			break;
	}*/
	
  }

  openTicketRecordObj.updatePage = function(){
    var scrollTop = document.body.scrollTop;
    var bodyHeight = this.wrapObj.height();
    if(scrollTop + this.clientHeight > bodyHeight - this.clientHeight/2){
      this.page+=1;
      this.getListData();
    }
	//scrollTop>this.clientHeight*2 ? this.goTop.show() : this.goTop.hide();
  }

  

  openTicketRecordObj.getListData = function(){
    openTicketRecordObj.checkPage = false;
	var postData = {
		'page' : this.page,
		'page_size' : this.minListNum,
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
			if(msg.info.page != openTicketRecordObj.page)return false;
			if(msg.info.list.length<openTicketRecordObj.minListNum){
			  openTicketRecordObj.checkPage = false;
			}else{
			  openTicketRecordObj.checkPage = true;
			}
			openTicketRecordObj.createListHtml(msg.info.list);
			if(!openTicketRecordObj.checkPage){
				openTicketRecordObj.listObj.append('<div class="center endtip_1">已显示全部</div>');
			}
		}else{
			$.alertMsg(msg.code_str);	
		}
		
      }
    });
  }

  openTicketRecordObj.createListHtml = function(data){
    var html = [];
    for(var i=0,ilen=data.length;i<ilen;i++){
      html.push('<div class="orderlist"><div class="slf"><span class="dot'+(this.timeTem != data[i]['create_date'] ? ' blur' : '')+'"></span><span class="line"></span></div><div class="srt"><p class="gray mb8">'+data[i]['create_date']+'</p><div class="orderbox mb20" data-t="detail" data-p="'+data[i]['target_type']+'" data-c="'+data[i]['consign_type']+'" data-i="'+data[i]['target_id']+'"><h3 class="mb10">'+data[i]['item_cn']+'</h3><p class="font12 gray">'+data[i]['create_time']+'</p><p class="cash_change"><span class="'+ (Number(data[i]['amount'])>0 ? "fontred" : "fontgreen")+(data[i]['target_type'] && data[i]['target_id'] ? '' : ' mr22')+'">'+data[i]['amount']+'元'+(data[i]['target_type'] && data[i]['target_id'] ? '<em class="icon rtarrow"></em>' : '')+'</span></p></div></div></div>');
      this.timeTem = data[i]['create_date'];
    }
	if(this.page == 0){
		this.listObj.html(html.join(""));
	}else{
    	this.listObj.append(html.join(""));
	}
  }

  openTicketRecordObj.onloadExecution = function(){
    this.createDom();
    this.createEvent();
    //this.getListData();   //暂时注释 待开发 zhangw
  }

  openTicketRecordObj.init = function(){
	openTicketRecordObj.setDefConfig();
    openTicketRecordObj.onloadExecution();
  }
  
  openTicketRecordObj.setDefConfig = function(){
	  openTicketRecordObj.page = 0;
	  openTicketRecordObj.checkPage = true;
	  openTicketRecordObj.clientHeight = document.documentElement.clientHeight;
	  openTicketRecordObj.minListNum = 20;
	  openTicketRecordObj.timeTem = ""; 
	  
	  window.onscroll = null;
	  openTicketRecordObj.scrollTop = 0;
  }
  
  openTicketRecordObj.goBack = function(){
	  var self = this;
	  self.popRoute();
  }
  
  openTicketRecordObj.destroy = function(){
	  this.setDefConfig();
	  $('#openTicketRecord').html('').remove();
	  this.routeArr = [];
	  //console.log('即开票订单列表页面销毁全部路由关系------------------------------');
  }
	
