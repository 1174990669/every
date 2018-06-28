
  var handselRecordObj = new PageController({
	   'name': 'handselRecord',
	   'tpl' : 'template/record/handselRecord.html'
    }); 

  handselRecordObj.createDom = function(){
    this.handselObj = $("#handselRecord_handselObj");
    //this.noTipsObj = $("#noTipsObj");
    this.handselListObj = $("#handselRecord_handselListObj");
    this.allMoneyObj = $("#handselRecord_allMoneyObj");
  }

  handselRecordObj.createEvent = function(){
    this.handselObj.unbind('tap').tap(function(e){
        var pObj = $.oto_checkEvent(e,"P");
        if(pObj){
          var thisObj = $(pObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "backbtn" : handselRecordObj.goBack();return true;
            case "jh" : $.alertMsg('正在建设中');return true;//window.location.href='jh';return true;
          }
        }

        var liObj = $.oto_checkEvent(e,"LI");
        if(liObj){
          var thisObj = $(liObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "update" : handselRecordObj.updateType(thisObj);return true;
          }
        }

        var divObj = $.oto_checkEvent(e,"DIV");
        if(divObj){
          var thisObj = $(divObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "detail" : handselRecordObj.goDetail(thisObj);return true;
          }
        }
    });
   
 
    window.onscroll = function(){
	  if(window.scrollY !== 0){
	  	handselRecordObj.scrollTop = window.scrollY;
	  }
      if(!handselRecordObj.checkPage)return false;
      handselRecordObj.updatePage();
    }
  }

  handselRecordObj.goDetail = function(obj){
      var type = obj.attr("data-p");
      var num = obj.attr("data-i");
      switch(type){
	   case 'Project':
		  projectDetailObj.show('reload',function(){
			  projectDetailObj.getData(num);  
		  })
		  projectDetailObj.pushRoute(function(){  //路由机制
				handselRecordObj.show();
		  })   
		  break;
	  }
  }

  handselRecordObj.updatePage = function(){
    var scrollTop = document.body.scrollTop;
    var bodyHeight = this.handselObj.height();
    if(scrollTop + this.clientHeight > bodyHeight - this.clientHeight/2){
      this.page+=1;
      this.getListData();
    }
  }

  handselRecordObj.updateType = function(obj){
    var thisT = obj.attr("data-v");
    if(thisT == this.handselListType)return false;
    obj.siblings().removeClass("on");
    obj.addClass('on');

    this.handselListType = thisT;
    this.page = 0;
    this.checkPage = true;
    this.timeTem = "";

    this.handselListObj.html("");
    this.getListData();
  }

  handselRecordObj.getListData = function(){
    handselRecordObj.checkPage = false;
    $.ajax({
      //url : "/urecord/handsel",
	  url : 'json/handselRecord.json', //测试代码 zhangw
      type : "post",
      data : "income_type="+this.handselListType+"&page="+this.page+"&page_size="+this.minListNum+"&period=-3_months",
      dataType : "text",
      success : function(msg){
		var msg = eval('(' + msg + ')');
        if(msg.income_type != handselRecordObj.handselListType)return false;
        if(msg.page != handselRecordObj.page)return false;
       
        if(msg.list.length<handselRecordObj.minListNum){
          handselRecordObj.checkPage = false;
        }else{
          handselRecordObj.checkPage = true;
        }
        handselRecordObj.allMoneyObj.html(msg.remain+'元');
        handselRecordObj.createListHtml(msg.list);
		if(!handselRecordObj.checkPage){
			handselRecordObj.handselListObj.append('<div class="center endtip_1">已显示全部</div>');
		}
      }
    });
  }

  handselRecordObj.createListHtml = function(data){
    var html = [];
    for(var i=0,ilen=data.length;i<ilen;i++){
      html.push('<div class="orderlist"><div class="slf"><span class="dot'+(this.timeTem != data[i]['create_date'] ? ' blur' : '')+'"></span><span class="line"></span></div><div class="srt"><p class="gray mb8">'+(data[i]['create_date'])+'</p><div class="orderbox mb20" data-t="detail" data-p="'+data[i]['target_type']+'" data-i="'+data[i]['target_id']+'"><h3 class="mb10 clearfix"><span class="fl">'+data[i]['item_cn']+'</span><span class="fr">'+data[i]['amount']+'元</span></h3><p class="font12 clearfix"><!--span class="fl gray">有效期：2015/12/31</span--><!--span class="fr"><em class="gray">已用1元/还剩</em><em class="fontred">9元</em></span--><!--span class="dated disbg"></span--></p></div></div></div>');
      this.timeTem = data[i]['create_date'];
    }
    this.handselListObj.append(html.join(""));
  }

  handselRecordObj.onloadExecution = function(){
    this.createDom();
    this.createEvent();
    this.getListData();
  }
  
  handselRecordObj.setDefConfig = function(){
	  handselRecordObj.handselListType = "";
	  handselRecordObj.page = 0;
	
	  handselRecordObj.checkPage = true;
	  handselRecordObj.clientHeight = document.documentElement.clientHeight;
	  handselRecordObj.minListNum = 20;
	
	  handselRecordObj.timeTem = ""; 
	  window.onscroll = null;
	  handselRecordObj.scrollTop = 0;
  }

  handselRecordObj.init = function(){
	  handselRecordObj.setDefConfig()
      handselRecordObj.onloadExecution();
  }
  
 
  
  
  
  
  
  
