
  var betRecordObj = new PageController({
	   'name': 'betRecord',
	   'tpl' : 'template/record/betRecord.html'
    }); 

  betRecordObj.createDom = function(){
	this.wrapObj = $('#betRecord_recordObj');
    this.recordObj = $("#betRecord_recordObj");
    this.noTipsObj = $("#betRecord_noTipsObj"); //无订单时显示暂无投注
    this.recordListObj = $("#betRecord_recordListObj");
    this.titleObj = $("#betRecord_titleObj");
	this.goTop = $('#betRecord_goTop');
	this.updataPlayObj = $("#betRecord_updataPlayObj");
	this.playTitleObj = $("#betRecord_playTitleObj");
	this.contentObj = $("#betRecord_content");
  }

  betRecordObj.createEvent = function(){
	this.goTop.unbind('tap').tap(function(){
		window.scrollTo(0,0);
		betRecordObj.scrollTop = 0;
	})
    this.recordObj.unbind('tap').tap(function(e){
      var spanObj = $.oto_checkEvent(e,"SPAN");
        if(spanObj){
          var thisObj = $(spanObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "fk" : betRecordObj.hrefPay(thisObj);return true;
			case "showupdplay" : betRecordObj.showUpdPlay(thisObj);return true;
          }
        }

        var pObj = $.oto_checkEvent(e,"P");
        if(pObj){
          var thisObj = $(pObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "backbtn" : betRecordObj.goBack();return true;
            case "search" : betRecordObj.goSearch();return true;//window.location.href='/order-inquiry.html';return true;
            case "betDlt" : betRecordObj.goDlt();return true;
			case "updatelottery" : betRecordObj.updatePlay(thisObj);return true;
          }
        }

        var liObj = $.oto_checkEvent(e,"LI");
        if(liObj){
          var thisObj = $(liObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "update" : betRecordObj.updateType(thisObj);return true;
          }
        }

        var divObj = $.oto_checkEvent(e,"DIV");
        if(divObj){
          var thisObj = $(divObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "detail" : betRecordObj.hrefDetail(thisObj);return true;
          }
        }
    });

    window.onscroll = function(){
	  if(window.scrollY !== 0){
	  	betRecordObj.scrollTop = window.scrollY;
	  }
      if(!betRecordObj.checkPage){
		return false;  
	  }
      betRecordObj.updatePage();
    }
	betRecordObj.pullRefresh();
	
  }
  
  betRecordObj.pullRefresh = function(){
	  this.recordListObj.dropload({  
			scrollArea : window,
			distance : this.pullDistance,
			loadUpFn:function(me){
				betRecordObj.page = 0;
				betRecordObj.getListData();
				me.resetload();
			}
	 })   
  }
  
  
  betRecordObj.goSearch = function(){
	  searchRecordObj.goBack = function(){
		 searchRecordObj.destroy();
		 betRecordObj.show();  
	  }
	  searchRecordObj.show();
	  betRecordObj.destroy();
  }
  
  betRecordObj.updatePlay = function(obj){
    var thisV = obj.attr("data-v");
    if(thisV == "P"){
     // betRecordObj.show('reload');
	  betRecordObj.showUpdPlay(betRecordObj.playTitleObj);
    }else if(thisV == "Z"){
      planRecordObj.goBack = function () {
          planRecordObj.destroy();
          userCenterObj.show();
      };
      planRecordObj.show('reload');
    }
  }

  betRecordObj.hrefPay = function(obj){
	 var pid = obj.attr("data-p");
     var money = obj.attr("data-m");
	 var type = obj.attr('data-y') ? obj.attr('data-y').toLowerCase() : '';
     var postData = {
		 'product_id' : pid,
		 'pay_amount' : money,
		 'lotteryType' : type, 
	 }
	 /*if(ConfigObj.platForm == 'ios'){
		 Global.iosBuy(postData);
	 }else{ */
		 buyConfirmObj.goBack=function(){
			 buyConfirmObj.destroy();
			 betRecordObj.show();
			 //Global.GC();
			 //homeObj.show(); 
		 }
		 buyConfirmObj.show('reload',function(){
			 buyConfirmObj.setData(postData); 
		 })
	 //}
  }

  betRecordObj.updatePage = function(){
    var scrollTop = document.body.scrollTop;
    if(scrollTop == 0){
	  		scrollTop = document.documentElement.scrollTop;
	  	}
    var bodyHeight = this.recordObj.height();
    if(scrollTop + this.clientHeight > bodyHeight - this.clientHeight/2){
	  if($('#betRecord').length > 0 && $('#betRecord').css('display') != 'none'){ 
      	this.page+=1;
      	this.getListData();
	  }
    }
	scrollTop>this.clientHeight*2 ? this.goTop.show() : this.goTop.hide();
  }

  betRecordObj.updateType = function(obj){
    var thisT = obj.attr("data-v");
    if(thisT == this.recordListType)return false;
    obj.siblings().removeClass("on");
    obj.addClass('on');

    this.recordListType = thisT;
    this.page = 0;
    this.checkPage = true;

    this.recordListObj.html("");
    this.getListData();
  }

  betRecordObj.getListData = function(){
    betRecordObj.checkPage = false;
	var postData = {
		'type': this.recordListType,
		'page' : this.page,
		'pageSize' : this.minListNum
	}
	var secretData = {
		'access_token' : loginObj.access_token,
		'para' : Global.encrypt(postData)
	};
//	//console.log(postData.type);
    $.ajax({
	  url : ConfigObj.localSite +  '?version=1&m=user.record.getLaunchList',
      type : "post",
      data : secretData,
      dataType : "json",
      success : function(msg){
      	
		console.log('投注记录列表数据 ' ,msg);
        if(msg.code !== '0000'){
          $.alertMsg(msg.code_str);
          return false;
        }
        msg.info = $.parseJSON(Global.crypt(msg.info));
//      console.log('投注记录列表数据 ' ,msg)
        if(msg.info.type != betRecordObj.recordListType)return false;
        if(msg.info.page != betRecordObj.page)return false;
        // console.log(betRecordObj.page)
        // console.log(msg.info.list.length)
        if(msg.info.list.length){
          betRecordObj.noTipsObj.hide();
          // console.log(198)
        }else if(betRecordObj.page == 0){
          betRecordObj.noTipsObj.show();
          // console.log(201)
          return false;
        }
        if(msg.info.list.length<betRecordObj.minListNum){
          betRecordObj.checkPage = false;
        }else{
          betRecordObj.checkPage = true;
        }
        betRecordObj.createListHtml(msg.info.list);
		if(!betRecordObj.checkPage){
			betRecordObj.recordListObj.append('<div class="center endtip_1">已显示全部</div>');
		}
      },
      error:function(ms){
        // console.log(217)
        betRecordObj.noTipsObj.show()
      }
    });
  }

  betRecordObj.createListHtml = function(data){
	var html = [];
    for(var i=0,ilen=data.length;i<ilen;i++){
      html.push('<div class="orderlist"><div class="slf"><span class="dot"></span><span class="line"></span></div><div class="srt"><p class="gray mb8">'+data[i]['time']+'</p><div class="orderbox mb20" data-t="detail" data-k = "'+data[i]['lotteryType']+'" data-v="'+data[i]['lotteryId']+'"><h3 class="mb10 clearfix"><span class="fl">'+ data[i].lotteryTypeCn +'</span><span class="fr font12">'+data[i]['lotteryNo']+'期<em class="gray"> · '+data[i]['recordType']+'</em></span></h3><p class="font12 clearfix"><span class="fl fontred">￥'+data[i]['money']+'</span><span '+(data[i]['status'] == "等待付款" ? "class='fr fontblue' data-t='fk' data-m="+data[i]['money']+" data-p="+data[i]['lotteryId'] : ((data[i]['status'] == "出票失败" || data[i]['status'].indexOf("中奖")==0 || data[i]['status'].indexOf("大奖")==0) ? "class='fr fontred'" : 'class="fr"'))+'>'+data[i]['status']+'</span></p></div></div></div>');
    }
		if(this.page == 0){
			this.recordListObj.html(html.join(""));
		}else{
	    this.recordListObj.append(html.join(""));
		}
  }
  
  
  
  betRecordObj.showUpdPlay = function(obj){
    if(Number(obj.attr("data-s"))){
      this.updataPlayObj.hide();
	  obj.attr("data-s",0);
	  this.updataPlayObj.removeClass('centerWrap_2');
	  this.titleObj.css({'position':'fixed'})
	  this.contentObj.addClass('centerWrap');
	  if($('#betRecord_upBGObj').length > 0){
		  $('#betRecord_upBGObj').remove();
	  }
    }else{
	  window.scrollTo(0,1);
      this.updataPlayObj.show();
      obj.attr("data-s",1);
	  this.updataPlayObj.addClass('centerWrap_2');
	  this.titleObj.css({'position':'static'});
	  this.contentObj.removeClass('centerWrap');
	  if($('#betRecord_upBGObj').length == 0){
		var bodyHeight = document.body.scrollHeight;
		var divObj = $('<div id="betRecord_upBGObj" style="width: 100%; height: '+bodyHeight+'px; position: absolute; left: 0px; top: 0px; z-index: 98; background: transparent;" ></div>');
		this.wrapObj.append(divObj);
		divObj.unbind('tap').tap(function(){
		  betRecordObj.updataPlayObj.hide();
		  betRecordObj.playTitleObj.attr("data-s","0");
		  betRecordObj.updataPlayObj.removeClass('centerWrap_2');
		  betRecordObj.titleObj.css({'position':'fixed'})
		  betRecordObj.contentObj.addClass('centerWrap');
		  divObj.remove();
		});
	  }
    }
    
  }

  betRecordObj.hrefDetail = function(obj){
//  console.log(obj)
    var id = obj.attr("data-v");
    var lottery = obj.attr("data-k").toLowerCase();
    if(lottery == "jxk3" || lottery == "gxk3" || lottery == "jlk3") ConfigObj.fastK3Type = lottery;
    if(lottery == "gd11x5" || lottery == "gx11x5" || lottery == "jx11x5" || lottery == "hub11x5") ConfigObj.fastLotType = lottery;
	if(ConfigObj.from == 'ios'){
		projectDetailObj.goBack = function(){
			ConfigObj.from == '';
			location.href = ConfigObj.iosAppSite + '?pageName=home';  //跳回到iosApp 
		}
		projectDetailObj.show('reload',function(){
			projectDetailObj.getData(id);
		})	
	}else{
		projectDetailObj.show('reload',function(){
			projectDetailObj.getData(id);
			projectDetailObj.pushRoute(function(){  //路由机制
				betRecordObj.show();
			})
		})
	}
  }

  betRecordObj.onloadExecution = function(){
    this.createDom();
   // this.getType();
    this.createEvent();
    this.getListData();
  }

  betRecordObj.getType = function(){
    var liObj = this.titleObj.children('li');
    for(var i=0,ilen=liObj.length;i<ilen;i++){
      if(liObj.eq(i).hasClass('on')){
        this.recordListType = liObj.eq(i).attr("data-v");
        return false;
      }
    }
  }

  betRecordObj.init = function(){
	  betRecordObj.setDefConfig();
      betRecordObj.onloadExecution();
  }
  
  betRecordObj.goDlt = function(){
	  dltObj.goBack=function(){
		 dltObj.destroy();
		 betRecordObj.show();  
	  }
	  dltObj.show();
  }
  
  betRecordObj.getData = function(type){
	 var node = this.titleObj.find('li').filter('[data-v="' + type + '"]');
	// //console.log(node);
	 this.updateType(node);
  }
  
  betRecordObj.setDefConfig = function(){
	  betRecordObj.recordListType = "all";
	  betRecordObj.page = 0;
	
	  betRecordObj.checkPage = true;
	  betRecordObj.clientHeight = document.documentElement.clientHeight;
	  betRecordObj.minListNum = 10;
	
	  betRecordObj.lotteryCnType = {"dlt" : "大乐透","pl3":"排列3","pl5":"排列5","qxc":"七星彩","ftbrqspf":"竞彩足球胜平负","ftspf":"竞彩足球胜平负","ftfh":"竞足混投","spf14":"胜负彩","spf9":"任选9"}; 
	  window.onscroll = null;
	  betRecordObj.scrollTop = 0;
	  betRecordObj.pageEnd = false;
  }
	
 

