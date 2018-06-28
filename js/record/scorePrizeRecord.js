
  var scorePrizeRecordObj = new PageController({
	   'name': 'scorePrizeRecord',
	   'tpl' : 'template/record/scorePrizeRecord.html'
    }); 
  
  scorePrizeRecordObj.createDom = function(){
    this.wrapperObj = $("#scorePrizeRecord_wrapperObj");
    this.listObj = $("#scorePrizeRecord_listObj");
  }

  scorePrizeRecordObj.createEvent = function(){
	
    this.wrapperObj.tap(function(e){
        var pObj = $.oto_checkEvent(e,"P");
        if(pObj){
          var thisObj = $(pObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "back" : scorePrizeRecordObj.goBack();return true;
          }
        }
        var divObj = $.oto_checkEvent(e,"DIV");
        if(divObj){
          var thisObj = $(divObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "detail" : scorePrizeRecordObj.goDetail(thisObj);return true;
          }
        }
    });
	
	window.onscroll = null;
    window.onscroll = function(){
	  if(window.scrollY !== 0){
	  	scorePrizeRecordObj.scrollTop = window.scrollY;
	  }
      if(!scorePrizeRecordObj.checkPage)return false;
      scorePrizeRecordObj.updatePage();
    }
	
	this.listObj.dropload({  
			scrollArea : window,
			distance : this.pullDistance,
			loadUpFn:function(me){
				scorePrizeRecordObj.page = 0;
				scorePrizeRecordObj.getListData();
				me.resetload();
			}
	 })   
  }
  


  scorePrizeRecordObj.goDetail = function(obj){
     var type = obj.attr('data-type');
	 var status = obj.attr('data-status');
	 if(type == 'valuable' && status != 'past'){  //实物
		 sendPrizeObj.goBack = function(){
			 sendPrizeObj.destroy();
			 scorePrizeRecordObj.destroy();
			 scorePrizeRecordObj.show();
		 }
		 var dataObj = {
			'prizeLevelText' : obj.attr('data-level'),
			'prizeName' : obj.attr('data-name'),
			'getprizeid': obj.attr('data-getprizeid'), 
			'prizeid' : obj.attr('data-prizeid'),
			'status' :obj.attr('data-status')
		 }
		 sendPrizeObj.show('',function(){
			sendPrizeObj.getData(dataObj); 
		 })
	 }else if(type == 'score'){
		scoreRecordObj.goBack = function(){
			scoreRecordObj.destroy();
			scorePrizeRecordObj.show();	
		}
		scoreRecordObj.show();
	 }
  }

  scorePrizeRecordObj.updatePage = function(){
    var scrollTop = document.body.scrollTop;
    var bodyHeight = this.wrapperObj.height();
    if(scrollTop + this.clientHeight > bodyHeight - this.clientHeight/2){
      this.page+=1;
      this.getListData();
    }
	//scrollTop>this.clientHeight*2 ? this.goTop.show() : this.goTop.hide();
  }

  scorePrizeRecordObj.updateType = function(obj){
    var thisT = obj.attr("data-v");
    if(thisT == this.cashListType)return false;
    obj.siblings().removeClass("on");
    obj.addClass('on');

    this.cashListType = thisT;
    this.page = 0;
    this.checkPage = true;
    this.timeTem = "";

    this.listObj.html("");
    this.getListData();
  }

  scorePrizeRecordObj.getListData = function(){
    scorePrizeRecordObj.checkPage = false;
	var postData = {
		'page' : this.page,
		'page_size' : this.minListNum,
		'access_token' : loginObj.access_token	
	}
    $.ajax({
	  url : ConfigObj.localSite +  '?version=1&m=user.activity.myPrize',
      type : "post",
      data : postData,
      dataType : "json",
      success : function(msg){
		//console.log('奖品记录列表数据返回 ', msg);
		if(msg.code == '0000'){
			//if(msg.info.page != scorePrizeRecordObj.page)return false;
			if(msg.info.length<scorePrizeRecordObj.minListNum){
			  scorePrizeRecordObj.checkPage = false;
			}else{
			  scorePrizeRecordObj.checkPage = true;
			}
			scorePrizeRecordObj.createListHtml(msg.info);
			if(!scorePrizeRecordObj.checkPage){
				scorePrizeRecordObj.listObj.append('<div class="center endtip_1">已显示全部</div>');
			}
		}else{
			$.alertMsg(msg.code_str);	
		}
		
      }
    });
  }

  scorePrizeRecordObj.createListHtml = function(data){
    var html = '';
    for(var i=0,ilen=data.length;i<ilen;i++){
	   var itm = data[i];
	   var receiveHtml = '';
	   if(itm.prizeType == 'valuable'){
		   if(itm.status == 'open'){
			  receiveHtml = '<span class="un-received disbg"></span>';
		   }else if(itm.status == 'prize'){
			  receiveHtml = '<span class="received disbg"></span>';  
		   }else if(itm.status == 'past'){
			  receiveHtml = '<span class="expire"></span>'; 
		   }
	   }
       html += '<div class="orderlist" >'+
				'<div class="slf">'+
					'<span class="dot"></span>'+
					'<span class="line"></span>'+
				'</div>'+
				'<div class="srt" >'+
					'<p class="gray mb8">'+ itm.createtime + '</p>'+
					'<div class="orderbox mb20" data-t="detail" data-status="'+ itm.status +'" data-type="'+ itm.prizeType +'" data-prizeid="'+ itm.prizeid +'" data-getprizeid="'+ itm.getprizeid +'" data-level="'+ itm.prizeLevelText + '" data-name="'+itm.prizeName+'">'+
						'<h3 class="mb10 clearfix">'+
							'<span class="fl">'+ itm.prizeLevelText + '</span>'+
	(itm.prizeType == 'score' ? '<span class="fr fontred">+'+ itm.prizeName + itm.prizeTypeText + '</span>' : '<span class="fr fontred">'+ itm.prizeName + '</span>') +
							
						'</h3>'+
						'<p class="font12 clearfix">'+
	(itm.prizeType == 'valuable' ? '<span class="fl gray">有效期：'+ itm.expireDate + '</span>' : '') +
							'<span class="fr">'+
	((itm.prizeType == 'valuable' && itm.status != 'past') ? '<a href="javascript:void(0)" class="fontblue">查看</a>' : '') +
						'</span></p>'+
	                     receiveHtml + 
					'</div>'+
				'</div>'+
			'</div>';
    }
	if(this.page == 0){
		this.listObj.html(html);
	}else{
    	this.listObj.append(html);
	}
  }

  scorePrizeRecordObj.onloadExecution = function(){
    this.createDom();
    this.createEvent();
    this.getListData();
  }

  scorePrizeRecordObj.init = function(){
	scorePrizeRecordObj.setDefConfig();
    scorePrizeRecordObj.onloadExecution();
  }
  
  scorePrizeRecordObj.setDefConfig = function(){
	  scorePrizeRecordObj.cashListType = "";
	  scorePrizeRecordObj.page = 0;
	  scorePrizeRecordObj.checkPage = true;
	  scorePrizeRecordObj.clientHeight = document.documentElement.clientHeight;
	  scorePrizeRecordObj.minListNum = 20;
	  scorePrizeRecordObj.timeTem = ""; 
	  window.onscroll = null;
	  scorePrizeRecordObj.scrollTop = 0;
  }
	
