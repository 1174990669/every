
  var planRecordObj = new PageController({
	   'name': 'planRecord',
	   'tpl' : 'template/record/planRecord.html'
    }); 

  planRecordObj.createDom = function(){
	this.wrapObj = $('#planRecord_recordObj');
    this.recordObj = $("#planRecord_recordObj");
    this.noTipsObj = $("#planRecord_noTipsObj");
    this.recordListObj = $("#planRecord_recordListObj");
    this.titleObj = $("#planRecord_titleObj");
	this.goTop = $('#planRecord_goTop');
	this.updataPlayObj = $("#planRecord_updataPlayObj");
	this.playTitleObj = $("#planRecord_playTitleObj");
	this.contentObj = $("#planRecord_content");
  }

  planRecordObj.createEvent = function(){
	this.goTop.unbind('tap').tap(function(){
		window.scrollTo(0,0);
		planRecordObj.scrollTop = 0;
	})
    this.recordObj.unbind('tap').tap(function(e){
      var spanObj = $.oto_checkEvent(e,"SPAN");
        if(spanObj){
          var thisObj = $(spanObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "fk" : planRecordObj.hrefPay(thisObj);return true;
			case "showupdplay" : planRecordObj.showUpdPlay(thisObj);return true;
          }
        }

        var pObj = $.oto_checkEvent(e,"P");
        if(pObj){
          var thisObj = $(pObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "backbtn" : planRecordObj.goBack();return true;
            case "search" : planRecordObj.goSearch();return true;
            case "betDlt" : planRecordObj.goDlt();return true;
			case "updatelottery" : planRecordObj.updatePlay(thisObj);return true;
          }
        }

        var liObj = $.oto_checkEvent(e,"LI");
        if(liObj){
          var thisObj = $(liObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "update" : planRecordObj.updateType(thisObj);return true;
          }
        }

        var divObj = $.oto_checkEvent(e,"DIV");
        if(divObj){
          var thisObj = $(divObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "detail" : planRecordObj.hrefDetail(thisObj);return true;
          }
        }
    });

    window.onscroll = function(){
	  if(window.scrollY !== 0){
	  	planRecordObj.scrollTop = window.scrollY;
	  }
	  
      if(!planRecordObj.checkPage){
		return false;  
	  }
      planRecordObj.updatePage();
    }
	planRecordObj.pullRefresh();
	
  }
  
  planRecordObj.pullRefresh = function(){
	  this.recordListObj.dropload({  
			scrollArea : window,
			distance : this.pullDistance,
			loadUpFn:function(me){
				planRecordObj.page = 0;
				planRecordObj.getListData();
				me.resetload();
			}
	 })   
  }
  
  
  planRecordObj.goSearch = function(){
	  searchPlanObj.goBack = function(){
		 searchPlanObj.destroy();
		 planRecordObj.show();  
	  }
	  searchPlanObj.show();
	  planRecordObj.destroy();
  }
  
  planRecordObj.updatePlay = function(obj){
    var thisV = obj.attr("data-v");
    if(thisV == "P"){
	  betRecordObj.show('reload');
    }else if(thisV == "Z"){
      //planRecordObj.show('reload');
	   planRecordObj.showUpdPlay(planRecordObj.playTitleObj);
    }
  }

  planRecordObj.hrefPay = function(obj){
	 var pid = obj.attr("data-p");
     var money = obj.attr("data-m");
	 var type = obj.attr('data-y') ? obj.attr('data-y').toLowerCase() : '';
     var postData = {
		 'product_id' : pid,
		 'pay_amount' : money,
		 'lotteryType' : type, 
		 'product_type' : 'plan'
	 }
	 //console.log(postData);
	/* if(ConfigObj.platForm == 'ios'){
		 Global.iosBuy(postData);
	 }else{ */
		 buyConfirmObj.goBack=function(){
			 buyConfirmObj.destroy();
			 planRecordObj.show();
			 //Global.GC();
			 //homeObj.show(); 
		 }
		 buyConfirmObj.show('reload',function(){
			 buyConfirmObj.setData(postData); 
		 })
	// }
  }

  planRecordObj.updatePage = function(){
    var scrollTop = document.body.scrollTop;
    var bodyHeight = this.recordObj.height();
    if(scrollTop + this.clientHeight > bodyHeight - this.clientHeight/2){
	  if($('#planRecord').length > 0 && $('#planRecord').css('display') != 'none'){ 
      	this.page+=1;
      	this.getListData();
	  }
    }
	scrollTop>this.clientHeight*2 ? this.goTop.show() : this.goTop.hide();
  }

  planRecordObj.updateType = function(obj){
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

  planRecordObj.getListData = function(){
    planRecordObj.checkPage = false;
	var postData = {
		'type': this.recordListType,
		'page' : this.page,
		'pageSize' : this.minListNum
	}
	var secretData = {
		'para':Global.encrypt(postData),
		'access_token' : loginObj.access_token
	}
//	console.log(postData)
    $.ajax({
	  url : ConfigObj.localSite +  '?version=1&m=user.record.getPlanList',
      type : "post",
      data : secretData,
      dataType : "json",
      success : function(msg){
      	
//		console.log('追号投注记录列表数据 ' ,msg);
        if(msg.code != 0){
          $.alertMsg(msg.code_str);
          return false;
        }
        msg.info = $.parseJSON(Global.crypt(msg.info));
//      console.log('追号投注记录列表数据 ' ,msg);
        if(msg.info.type != planRecordObj.recordListType)return false;
        if(msg.info.page != planRecordObj.page)return false;
        if(msg.info.list.length){
          planRecordObj.noTipsObj.hide();
        }else if(planRecordObj.page == 0){
          planRecordObj.noTipsObj.show();
          return false;
        }
        if(msg.info.list.length<planRecordObj.minListNum){
          planRecordObj.checkPage = false;
        }else{
          planRecordObj.checkPage = true;
        }
        
        planRecordObj.createListHtml(msg.info.list);
		if(!planRecordObj.checkPage){
			planRecordObj.recordListObj.append('<div class="center endtip_1">已显示全部</div>');
		}
      }
    });
  }

  planRecordObj.createListHtml = function(data){
	 var html = [];
    for(var i=0,ilen=data.length;i<ilen;i++){
      html.push('<div class="orderlist"><div class="slf"><span class="dot"></span><span class="line"></span></div><div class="srt"><p class="gray mb8">'+data[i]['create_time']+'</p><div class="orderbox mb20" data-t="detail" data-v="'+data[i]['plan_id']+'"><h3 class="mb10 clearfix"><span class="fl">'+data[i]['lottery_type_cn']+'</span><span class="fr font12">追'+data[i]['actual_exec_count']+'<em class="gray">/'+data[i]['expect_exec_count']+'期</em></span></h3><p class="font12 clearfix"><span class="fl fontred">￥'+data[i]['money']+'</span><span '+(data[i]['run_status_cn'] == "等待付款" ? "class='fr fontblue' data-t='fk' data-m="+data[i]['money']+" data-p="+data[i]['plan_id'] : ((data[i]['run_status_cn'] == "出票失败" || data[i]['run_status_cn'].indexOf("累计中奖")!=-1 || data[i]['run_status_cn'].indexOf("大奖")!= -1) ? "class='fr fontred'" : 'class="fr"'))+'>'+data[i]['run_status_cn']+'</span></p></div></div></div>');
    }
	if(this.page == 0){
		this.recordListObj.html(html.join(""));
	}else{
    	this.recordListObj.append(html.join(""));
	}
  }
  
  planRecordObj.showUpdPlay = function(obj){
    if(Number(obj.attr("data-s"))){
      this.updataPlayObj.hide();
	  obj.attr("data-s",0);
	  this.updataPlayObj.removeClass('centerWrap_2');
	  this.titleObj.css({'position':'fixed'})
	  this.contentObj.addClass('centerWrap');
	  if($('#planRecord_upBGObj').length > 0){
		  $('#planRecord_upBGObj').remove();
	  }
    }else{
	  window.scrollTo(0,1);
      this.updataPlayObj.show();
      obj.attr("data-s",1);
	  this.updataPlayObj.addClass('centerWrap_2');
	  this.titleObj.css({'position':'static'});
	  this.contentObj.removeClass('centerWrap');
	  if($('#planRecord_upBGObj').length == 0){
		    var bodyHeight = document.body.scrollHeight;
			var divObj = $('<div id="planRecord_upBGObj" style="width: 100%; height: '+bodyHeight+'px; position: absolute; left: 0px; top: 0px; z-index: 98; background: transparent;" ></div>');
			this.wrapObj.append(divObj);
			divObj.unbind('tap').tap(function(){
			  planRecordObj.updataPlayObj.hide();
			  planRecordObj.playTitleObj.attr("data-s","0");
			  planRecordObj.updataPlayObj.removeClass('centerWrap_2');
			  planRecordObj.titleObj.css({'position':'fixed'})
			  planRecordObj.contentObj.addClass('centerWrap');
			  divObj.remove();
			});  
	  }
    }

    
  }

  planRecordObj.hrefDetail = function(obj){
    var id = obj.attr("data-v");
	if(ConfigObj.from == 'ios'){
		planDetailObj.goBack = function(){
			ConfigObj.from == '';
			location.href = ConfigObj.iosAppSite + '?pageName=home';  //跳回到iosApp 
		}
		planDetailObj.show('reload',function(){
			planDetailObj.getData(id);
		})	
	}else{
		planDetailObj.goBack=function(){
			planDetailObj.destroy();
			planRecordObj.show();	
		}
		planDetailObj.show('reload',function(){
			planDetailObj.getData(id);
		})
	}
  }

  planRecordObj.onloadExecution = function(){
    this.createDom();
   // this.getType();
    this.createEvent();
    this.getListData();
  }

  planRecordObj.getType = function(){
    var liObj = this.titleObj.children('li');
    for(var i=0,ilen=liObj.length;i<ilen;i++){
      if(liObj.eq(i).hasClass('on')){
        this.recordListType = liObj.eq(i).attr("data-v");
        return false;
      }
    }
  }

  planRecordObj.init = function(){
	  planRecordObj.setDefConfig();
      planRecordObj.onloadExecution();
  }
  
  planRecordObj.goDlt = function(){
	  dltObj.goBack=function(){
		 dltObj.destroy();
		 planRecordObj.show();  
	  }
	  dltObj.show();
  }
  
  planRecordObj.getData = function(type){
	 var node = this.titleObj.find('li').filter('[data-v="' + type + '"]');
	// //console.log(node);
	 this.updateType(node);
  }
  
  planRecordObj.setDefConfig = function(){
	  planRecordObj.recordListType = "all";
	  planRecordObj.page = 0;
	
	  planRecordObj.checkPage = true;
	  planRecordObj.clientHeight = document.documentElement.clientHeight;
	  planRecordObj.minListNum = 10;
	
	  planRecordObj.lotteryCnType = {"dlt" : "大乐透","pl3":"排列3","pl5":"排列5","qxc":"七星彩","ftbrqspf":"竞彩足球胜平负","ftspf":"竞彩足球胜平负","ftfh":"竞足混投","spf14":"胜负彩","spf9":"任选9"}; 
	  window.onscroll = null;
	  planRecordObj.scrollTop = 0;
	  planRecordObj.pageEnd = false;
  }
  
  planRecordObj.dirShow = function(){
	 planRecordObj.show('reload');  
  }
	
 

