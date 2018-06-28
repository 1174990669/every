
  var memberBetRecordObj = new PageController({
	   'name': 'memberBetRecord',
	   'tpl' : 'template/record/memberBetRecord.html'
    }); 

  memberBetRecordObj.createDom = function(){
    this.wrapObj = $("#memberBetRecord_wrapObj");
    this.betListObj = $("#memberBetRecord_betListObj");
  }

  memberBetRecordObj.createEvent = function(){
	$('#memberBetRecord_starTip').find('textarea').unbind('focus').focus(function(){
		$(this).get(0).select();
	})
    this.wrapObj.unbind('tap').tap(function(e){
        var pObj = $.oto_checkEvent(e,"P");
        if(pObj){
          var thisObj = $(pObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "back" : memberBetRecordObj.goBack();return true;
			case 'star' : memberBetRecordObj.showStarTip(thisObj);return true;
			case 'search' : memberBetRecordObj.goSearch(thisObj);return true;
          }
        }
        var divObj = $.oto_checkEvent(e,"DIV");
        if(divObj){
          var thisObj = $(divObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "detail" : memberBetRecordObj.goDetail(thisObj);return true;
          }
        }
		var aObj = $.oto_checkEvent(e,"A");
        if(aObj){
          var thisObj = $(aObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case 'hideTip' : $('#memberBetRecord_starTip').hide();return true;
			case 'save' : memberBetRecordObj.saveFun();return true;
          }
        }
		var dlObj = $.oto_checkEvent(e,"DL");
        if(dlObj){
          var thisObj = $(dlObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case 'flag' : memberBetRecordObj.flagFun(thisObj);return true;
          }
        }
    });

    window.onscroll = function(){
	  if(window.scrollY !== 0){
	  	memberBetRecordObj.scrollTop = window.scrollY;
	  }
      if(!memberBetRecordObj.checkPage)return false;
      memberBetRecordObj.updatePage();
    }
	 
	this.betListObj.dropload({  
			scrollArea : window,
			distance : this.pullDistance,
			loadUpFn:function(me){
				memberBetRecordObj.page = 0;
				memberBetRecordObj.getListData();
				me.resetload();
			}
	 })   
  }
  
  memberBetRecordObj.goSearch = function(obj){
	   searchRecordObj.goBack = function(){
			searchRecordObj.destroy();
			memberBetRecordObj.show();   
	   }
	   searchRecordObj.show('',function(){
			searchRecordObj.setData({'from':'memberBet'});   
	   });
  }
  
  memberBetRecordObj.flagFun = function(obj){
	 $('#memberBetRecord_starTip').find('.radiobox_1').removeClass('checked');
	 var dom = obj.find('.radiobox_1');
	 dom.addClass('checked');
	 var val = obj.attr('data-v');
	 //console.log(val);
	
  }
  
  memberBetRecordObj.saveFun = function(){
	  var self = this;
	  var radioBox = $('#memberBetRecord_starTip').find('.checked');
	  var type = radioBox.parents('dl').attr('data-v');
	  var textarea = $('#memberBetRecord_starTip').find('textarea');
	  var text = textarea.val();
	  /*if(self.editDom.attr('data-v') == type){
		    $('#memberBetRecord_starTip').hide();
			return false;
	  }*/
	  var postData = {
		'lottery_id' : self.editDom.attr('data-id'),
		'memotype' : type,
		'memo' : text,
		'access_token': loginObj.access_token	
	  }
	
    $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=user.Station.colorTag',    
      type : "post",
      data : postData,
      dataType : "json",
      success : function(msg){
		//console.log('订单标记接口', msg);
		if(msg.code == '0000'){
			$('#memberBetRecord_starTip').hide();
			self.editDom.find('.icon_1').get(0).className = 'icon_1 star' + self.starObj[type];
			self.editDom.attr('data-v',type);
			self.editDom.attr('data-memo',text);
			self.editDom = '';
		}else{
			$('#memberBetRecord_starTip').hide();
			$.alertMsg(msg.code_str);	
		}
      }
    });  
  }
  
  memberBetRecordObj.showStarTip = function(obj){
	  var type = obj.attr('data-v');
	  $('#memberBetRecord_starTip').show();
	  $('#memberBetRecord_starTip').find('.radiobox_1').removeClass('checked');
	  if(obj.attr('data-v') != 0){
		   $('#memberBetRecord_' + this.starObj[type]).addClass('checked');
	  }
	  this.editDom = obj;
	  var text = obj.attr('data-memo');
	  $('#memberBetRecord_starTip').find('textarea').val((text?text:'已经转账付款; 票已出; 已经拍照发送;'));
	  
  }

  memberBetRecordObj.goDetail = function(obj){
    var thisI = obj.attr("data-v");
    if(!thisI)return true;
	projectDetailObj.show('reload',function(){
		projectDetailObj.getData(thisI);
		projectDetailObj.pushRoute(function(){  //路由机制
		  memberBetRecordObj.destroy();
		  memberBetRecordObj.show();
	   })   
	})
	
  }

  memberBetRecordObj.updatePage = function(){
    var scrollTop = document.body.scrollTop;
    var bodyHeight = this.rechargeObj.height();
    if(scrollTop + this.clientHeight > bodyHeight - this.clientHeight/2){
      this.page+=1;
      this.getListData();
    }
  }

  memberBetRecordObj.getListData = function(){
    memberBetRecordObj.checkPage = false;
	var postData = {
		'page' : this.page,
		'page_size': this.minListNum,
		'station_user_id' : loginObj.userInfo.station_user_id,
		'access_token': loginObj.access_token	
	}
	
    $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=user.Station.tostationList',    
      type : "post",
      data : postData,
      dataType : "json",
      success : function(msg){
		//console.log('会员订单记录数据', msg);
		if(msg.code == '0000'){
			if(msg.info.page != memberBetRecordObj.page)return false;
			if(msg.info.list.length<memberBetRecordObj.minListNum){
			  memberBetRecordObj.checkPage = false;
			}else{
			  memberBetRecordObj.checkPage = true;
			}
			//memberBetRecordObj.allrechargeObj.html(msg.info.remain+"元");
			memberBetRecordObj.createListHtml(msg.info.list);
			if(!memberBetRecordObj.checkPage){
				memberBetRecordObj.betListObj.append('<div class="center endtip_1">已显示全部</div>');
			}
		}else{
			//$.alertMsg(msg.code_str);	
		}
      }
    });
  }

  memberBetRecordObj.createListHtml = function(data){
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
                           '<p class="fl box_1" data-t="star" data-memo="'+ itm.memo +'" data-id="'+ itm.lottery_id +'" data-v="'+ itm.memotype +'"><span class="icon_1 star'+ self.starObj[itm.memotype]  +'"></span></p>'+
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
	if(this.page == 0){
		this.betListObj.html(html);
	}else{
    	this.betListObj.append(html);
	}
  }

  memberBetRecordObj.onloadExecution = function(){
    this.createDom();
    this.createEvent();
    this.getListData();
  }

  memberBetRecordObj.init = function(){
	  memberBetRecordObj.setDefConfig();
      memberBetRecordObj.onloadExecution();
  }
  
  memberBetRecordObj.setDefConfig = function(){
	  memberBetRecordObj.page = 0;
	  memberBetRecordObj.checkPage = true;
	  memberBetRecordObj.clientHeight = document.documentElement.clientHeight;
	  memberBetRecordObj.minListNum = 20;
	  memberBetRecordObj.timeTem = "";
	  window.onscroll = null;
	  memberBetRecordObj.scrollTop = 0;
	  memberBetRecordObj.starObj = {
		'0' : 'Gray', '1': 'Green','2':'Red','3':'Blue','4':'Purple'  
	  }
	  this.editDom = '';
  }
  
  
