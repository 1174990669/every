
  var searchBetResultObj = new PageController({
	   'name': 'searchBetResult',
	   'tpl' : 'template/record/searchBetResult.html'
    }); 

  searchBetResultObj.createDom = function(){
    this.wrapperObj = $("#searchBetResult_wrapperObj");
    this.searchListObj = $("#searchBetResult_searchListObj");
    this.noTipsObj = $("#searchBetResult_noTipsObj");
  }

  searchBetResultObj.createEvent = function(){
    this.wrapperObj.unbind('tap').tap(function(e){
      var spanObj = $.oto_checkEvent(e,"SPAN");
      if(spanObj){
        var thisObj = $(spanObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "fk" : searchBetResultObj.hrefPay(thisObj);return true;
        }
      }

      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "back" : searchBetResultObj.goBack();return true;
		  case 'dlt' : searchBetResultObj.goDlt();return true;
        }
      }

      var divObj = $.oto_checkEvent(e,"DIV");
      if(divObj){
        var thisObj = $(divObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "detail" : searchBetResultObj.hrefDetail(thisObj);return true;
        }
      }
    });

    window.onscroll = function(){
	  if(window.scrollY !== 0){
	  	searchBetResultObj.scrollTop = window.scrollY;
	  }
      if(!searchBetResultObj.checkPage)return false;
	  if($('#searchBetResult').css('display') == 'none') return false;
	  
      searchBetResultObj.updatePage();
    }
  }
  
  searchBetResultObj.goDlt = function(){
	  Global.GC();
	  dltObj.goBack = function(){
		dltObj.destroy();
		homeObj.show();  
	  }
	  dltObj.show();
  }

  searchBetResultObj.hrefPay = function(obj){
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
		  searchBetResultObj.show();
	 }
	 buyConfirmObj.show('reload',function(){
		 buyConfirmObj.setData(postData); 
	 })
  }

  searchBetResultObj.updatePage = function(){
    var scrollTop = document.body.scrollTop;
    var bodyHeight = this.wrapperObj.height();
    if(scrollTop + this.clientHeight > bodyHeight - this.clientHeight/2){
      this.page+=1;
      this.getListData();
    }
  }

  searchBetResultObj.hrefDetail = function(obj){
    var id = obj.attr("data-v");
    
	 projectDetailObj.show('reload',function(){
		 projectDetailObj.getData(id);
		 projectDetailObj.pushRoute(function(){  //路由机制
			searchBetResultObj.show();
		})  
	 })
  }

  searchBetResultObj.getListData = function(){
    this.checkPage = false;
    var postData = this.searchData;
	postData.page = this.page;
	
	var url = ConfigObj.localSite +  '?version=1&m=user.record.getLaunchList';
	if(this.from == 'memberBet'){
		this.searchData['station_user_id'] = loginObj.userInfo.station_user_id;
		url =  ConfigObj.localSite +  '?version=1&m=user.Station.tostationList';
	}else{
		this.searchData['station_user_id'] = '';	
	}
	var secretData = {
		'access_token' : loginObj.access_token,
		'para' : Global.encrypt(postData)
	};
    $.ajax({
      url : url,
      type : "post",
      data : secretData,
      dataType : "json",
      success : function(msg){
		if(msg.code == '0000'){
			msg.info = $.parseJSON(Global.crypt(msg.info));
			if(msg.info.page != searchBetResultObj.page)return false;
			if(msg.info.list.length){
			  searchBetResultObj.noTipsObj.hide();
			}else if(Number(msg.info.page) == 0){
			  searchBetResultObj.noTipsObj.show();
			  return false;
			}
			if(msg.info.list.length<searchBetResultObj.minListNum){
			  searchBetResultObj.checkPage = false;
			}else{
			  searchBetResultObj.checkPage = true;
			}
			if(searchBetResultObj.from == 'memberBet'){
				searchBetResultObj.createMListHtml(msg.info.list);
			}else{
				searchBetResultObj.createListHtml(msg.info.list);
			}
		}else{
			$.alertMsg(msg.code_str);	
		}
      }
    });
  }

  searchBetResultObj.createListHtml = function(data){
    var html = [];
    for(var i=0,ilen=data.length;i<ilen;i++){
      html.push('<div class="orderlist"><div class="slf"><span class="dot"></span><span class="line"></span></div><div class="srt"><p class="gray mb8">'+data[i]['time']+'</p><div class="orderbox mb20" data-t="detail" data-v="'+data[i]['lotteryId']+'"><h3 class="mb10 clearfix"><span class="fl">'+data[i].lotteryTypeCn+'</span><span class="fr font12">'+data[i]['lotteryNo']+'期<em class="gray"> · '+data[i]['recordType']+'</em></span></h3><p class="font12 clearfix"><span class="fl fontred">￥'+data[i]['money']+'</span><span '+(data[i]['status'] == "等待付款" ? "class='fr fontblue' data-y="+ data[i]['lotteryType'] + "  data-t='fk' data-m="+data[i]['money']+" data-p="+data[i]['lotteryId'] : ((data[i]['status'] == "出票失败" || data[i]['status'].indexOf("中奖")==0 || data[i]['status'].indexOf("大奖")==0) ? "class='fr fontred'" : 'class="fr"'))+'>'+data[i]['status']+'</span></p></div></div></div>');
    }
    this.searchListObj.append(html.join(""));
  }
  
  searchBetResultObj.createMListHtml = function(data){
	var self = this;
    var html = '';
    for(var i=0,ilen=data.length;i<ilen;i++){
		var itm = data[i];
    	html += '<div class="orderlist">'+
            		'<div class="slf">'+
                    	'<span class="dot"></span><span class="line"></span>'+
                    '</div>'+
                    '<div class="srt">'+
                    	'<p class="gray mb8 clearfix">'+
                        	'<span class="mr10">'+ (itm.createtime ? itm.createtime.substr(5,11): '')  +'</span>'+
                            '<span >'+ itm.user_name + '</span>'+
							'<span class="fr '+ (itm.net_prize > 0 ? 'fontred' : 'gray')  +'">'+  itm.status +'</span>' +
                           // (itm.net_prize > 0 ? '<span class="fr ">中奖<em class="fontred">'+ itm.net_prize + '</em>元</span>' : '')+
                        '</p>'+
                        '<div class="orderbox mb20 clearfix" data-t="detail" data-v="'+ itm.lottery_id +'">'+
                            (itm.net_prize > 0 ? '<p class="prize_1"></p>' : '' ) + 
                           '<p class="fl box_1" data-t="star" data-id="'+ itm.lottery_id +'" data-v="'+ itm.memotype +'"><span class="icon_1 star'+ self.starObj[itm.memotype]  +'"></span></p>'+
       						'<dl class="fl box_2">'+
                            	'<dt>'+ itm.lottery_type_cn + '</dt>'+
                                '<dd class="font12 gray">第'+ itm.lottery_no + '期</dd>'+
                            '</dl>'+
                            '<dl class="fr box_3">'+
                            	'<dd><span class="font12">￥'+ itm.money + '</span> <span class="fr">停售: '+ (itm.sell_end_time ? itm.sell_end_time.substr(5,11) : '') + '</span></dd>'+
                                '<dd><span>' + (itm.ticket_count ? itm.ticket_count : '') + '张票</span> <span class="fr loading_icon1"><em style="width:'+ itm.rate + '%"></em></span></dd>'+
                            '</dl>'+
                        '</div>'+
                    '</div>'+
               '</div>';
    }
	this.searchListObj.append(html);
  }

  searchBetResultObj.getTypeHtml = function(type){
    switch(type){
      case "buy" : return '<a href="javascript:void(0)" class="fontblue">支付</a>';break;
      case "gq" : return '已过期';break;
      case "jy" : return '交易中';break;
      case "sb" : return '已失败';break;
    }
  }

  searchBetResultObj.onloadExecution = function(){
    this.createDom();
    this.createEvent();
    //this.getListData();
  }

  searchBetResultObj.init = function(){
	  this.setDefConfig();
      searchBetResultObj.onloadExecution();
  }
  
  searchBetResultObj.setData = function(obj){
	 this.searchData = obj;
	 this.from = obj.from;
  }
  
  searchBetResultObj.setDefConfig = function(){
	  searchBetResultObj.page = 0;
	  searchBetResultObj.checkPage = true;
	  searchBetResultObj.clientHeight = document.documentElement.clientHeight;
	  searchBetResultObj.minListNum = 2;
	  searchBetResultObj.recordType = {"zt":"直投","zh":"追号","hm":"合买"};
	  this.searchData = null;
	  this.from = '';
	  this.starObj = {
		'0' : 'Gray', '1': 'Green','2':'Red','3':'Blue','4':'Purple'  
	  }
	  this.editDom = '';
  }
	
  searchBetResultObj.destroy = function(){
	  this.setDefConfig();
	  $('#searchBetResult').html('').remove();
	  window.onscroll = null;
	  searchBetResultObj.scrollTop = 0;
   }
  
  
  