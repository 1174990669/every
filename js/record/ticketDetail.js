
  var ticketDetailObj = new PageController({
	   'name': 'ticketDetail',
	   'tpl' : 'template/record/ticketDetail.html'
    });

  ticketDetailObj.createDomObj = function(){
    this.wrap = $("#ticketDetail_wrap");
      this.recordObj = $('#ticketDetail_record');
      this.editDom = $('#ticketDetail_star');
  }

  ticketDetailObj.createEvent = function(){
    $('#ticketDetail_backbtn').unbind('tap').tap(function(){
		ticketDetailObj.goBack();
	})
	$('#ticketDetail_star').unbind('tap').tap(function(){
		ticketDetailObj.showStarTip(this);
	})
	this.wrap.unbind('tap').tap(function(e){
		var spanObj = $.oto_checkEvent(e,"SPAN");
		if(spanObj){
		  var thisObj = $(spanObj);
		  var thisT = thisObj.attr("data-t");
		  switch(thisT){
			case "radioBox" : ticketDetailObj.checkFun(thisObj);return true;
		  }
		}
	    var dlObj = $.oto_checkEvent(e,"DL");
        if(dlObj){
          var thisObj = $(dlObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case 'flag' : ticketDetailObj.flagFun(thisObj);return true;
          }
        }
		var aObj = $.oto_checkEvent(e,"A");
        if(aObj){
          var thisObj = $(aObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case 'hideTip' : $('#ticketDetail_starTip').hide();return true;
			case 'save' : ticketDetailObj.saveFun();return true;
          }
        }
		
    });

    // 继续选号
    $('#ticketDetail_continue').tap(function (e) {
        projectDetailObj.goAllBet();
    });
    
	window.onscroll = function(){
		if(!ticketDetailObj.checkPage)return false;
        ticketDetailObj.updatePage();	
	}
  }
  
  ticketDetailObj.updatePage = function(){
    var scrollTop = document.body.scrollTop;
    var bodyHeight = this.recordObj.height();
    if(scrollTop + this.clientHeight > bodyHeight - this.clientHeight/2){
	  if($('#ticketDetail').length > 0 && $('#ticketDetail').css('display') != 'none'){ 
      	this.page+=1;
      	this.getData();
	  }
    }
  }
  
   ticketDetailObj.flagFun = function(obj){
	 $('#ticketDetail_starTip').find('.radiobox_1').removeClass('checked');
	 var dom = obj.find('.radiobox_1');
	 dom.addClass('checked');
	 var val = obj.attr('data-v');
	 //console.log(val);
	
  }
  
  ticketDetailObj.showStarTip = function(){
	   $('#ticketDetail_starTip').show();
  }
  
  ticketDetailObj.saveFun = function(){
	var self = this;
	var radioBox = $('#ticketDetail_starTip').find('.checked');
	var type = radioBox.parents('dl').attr('data-v');
	var textarea = $('#ticketDetail_starTip').find('textarea');
	var text = textarea.val();
	/*if(self.editDom.attr('data-v') == type){
		  $('#ticketDetail_starTip').hide();
		  return false;
	}*/
	var postData = {
	  'lottery_id' : self.lottery_id,
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
			$('#ticketDetail_starTip').hide();
			self.editDom.find('.icon_1').get(0).className = 'icon_1 star' + self.starObj[type];
			self.editDom.attr('data-v',type);
			self.editDom.attr('data-memo',text);
		}else{
			$('#ticketDetailObj_starTip').hide();
			$.alertMsg(msg.code_str);	
		}
      }
    });  
  }
  
  ticketDetailObj.setLoading = function(){
	  var arr = $('#ticketDetail_record .ticket_info');
	  var total = arr.length;
	  var checked = 0;
	  arr.each(function(idx,dom){
		  if( $(dom).find('.radiobox_2').hasClass('checked')){
			 checked ++;  
		  }
	  })
	  var rate = Math.round(checked / total * 100);
	  $('#ticketDetail_loading').html('<p style="width:' + rate + '%" ></p>').show();
  }
  
  //站主端标记票
  ticketDetailObj.checkFun = function(obj){
	  var id = obj.attr('data-v');
	  obj.toggleClass('checked');
	  var self = this;
	  var postData = {
		'ticket_id' : id ,
		'selectstatus' : (obj.hasClass('checked') ? '1' : '0'),
		'access_token':loginObj.access_token
	  }
	  $.ajax({
		url : ConfigObj.localSite +  '?version=1&m=user.Station.checkTicket',
		type:'post',
		data: postData,
		dataType:'json',
		success:function(obj){
			//console.log('勾选票样返回数据: ', obj);
			if(obj.code == '0000'){
				$.alertMsg('操作成功',true); 
				ticketDetailObj.setLoading(); 
			}else{
				$.alertMsg(obj.code_str);
			}
		}
	  })  
  }
  
  ticketDetailObj.setData = function(id,type){
	 this.lottery_id = id;  
	 this.consignType = type;
  }
  
  ticketDetailObj.getData = function(){
	 ticketDetailObj.checkPage = false;
	 var self = this;
	  var postData = {
		'lottery_id' : self.lottery_id ,
		'page' : this.page,
		'page_size' : this.minListNum,
		'consign_type': self.consignType,
		'access_token':loginObj.access_token
	  }
	  $.ajax({
		url : ConfigObj.localSite +  '?version=1&m=Lottery.Ticket.index',
		type:'post',
		data: postData,
		dataType:'json',
		success:function(obj){
			//console.log('出票详情ticketDetail返回数据: ', obj);
			if(obj.code == '0000'){
				if(obj.info.page != self.page)return false;
                if (obj.info.ticket_list.length < self.minListNum || obj.info.count == self.minListNum) {
                    ticketDetailObj.checkPage = false;
                } else {
                    ticketDetailObj.checkPage = true;
                }
				ticketDetailObj.formatHtml(obj.info);
				ticketDetailObj.formatMemberBetHtml(obj.info);
				ticketDetailObj.formatMisc(obj.info);
			}else{
				$.alertMsg(obj.code_str);
			}
		}
	  })  
  }
  
  ticketDetailObj.formatMemberBetHtml = function(obj){
	  var self = this;
	  if(loginObj.userInfo && loginObj.userInfo.user_type == 'Station' && obj.ticket_type == 1){
		 $('#ticketDetail_star').show().find('.icon_1').get(0).className = 'icon_1 star' + self.starObj[obj.memotype];
		 self.setLoading(); 
		 $('#ticketDetail_record').removeClass('centerWrap');
	  }else{
		 $('#ticketDetail_star').hide();
		 $('#ticketDetail_loading').html('');
		 $('#ticketDetail_record').addClass('centerWrap');
	  }
	  $('#ticketDetail_starTip').find('textarea').val(obj.memo);
	  $('#ticketDetail_star').attr('data-memo',obj.memo);  
  }
  
  ticketDetailObj.formatHtml = function(obj){
	  if(!obj.ticket_list || obj.ticket_list.length ==0) return;
	  var html = '';
	  for(var i=0;i<obj.ticket_list.length;i++){
	  	var playTypeCls = '';
	  	if (obj.lotteryType == ConfigObj.fastK3Type) playTypeCls = 'font10'; // 玩法使用小字体，不然显示不下
		  var itm = obj.ticket_list[i];
		  var ticketStatus = (this.consignType == 'save') ? ('票样：No.'+ itm.ticket_order ) : '出票标示：'+ itm.sen_ticket_no + '<strong>【'+ itm.status_cn + '】</strong>';
		  var radioBox = (loginObj.isLogin && loginObj.userInfo.user_type == 'Station' && obj.ticket_type == 1) ? '<span class="radiobox_2 '+ (itm.selectstatus == 1 ? 'checked' : '')  +'" data-t="radioBox" data-v="'+ itm.ticket_id +'"></span>' : '';
		  html += '<div class="inwrap ticket_info mb8 pb15 '+ (itm.status=='4' ? 'gray' :'')+ '">'+
		  			radioBox + 
		  			(itm.raw_prize > 0 ? '<span class="win_icon disbg"></span>' : '') +
					'<p class="toptit clearfix" style="border-bottom:none">'+
						'<span class="fl">'+ ticketStatus +'</span>'+
						'<span class="fr ' + playTypeCls + '">'+
							'<em>'+ (obj.lotteryType == 'SPF9' || obj.lotteryType == 'SPF14' ? (itm.ticket_num > 1 ? '复式' : '单式') : itm.play_type_cn) + '</em><em>'+ itm.ticket_num + '注</em><em>'+ itm.multiple + '倍</em>'+
						'</span>'+
					'</p>'+
					(itm.raw_prize && itm.raw_prize  > 0 ? '<p class="toptit clearfix">中奖金额: <span class="fontred">' + itm.net_prize +'</span></p>' : '')+
					'<div class="options clearfix font12">';
					    if(itm.wager_store_context && itm.wager_store_context.length > 0){
							for(j=0;j<itm.wager_store_context.length;j++){
								var itm2 = itm.wager_store_context[j];
								html += '<p class="num_break"><em class="date">' + (itm2.header ? itm2.header : '')  + '</em>'+ itm2.content + '</p>';
							}
							
						}else{
							html += '<p><em class="date">票信息格式有误</p>';
						}
		  html += 	'</div>'+
				  '</div>';
		  
	  }
	  this.recordObj.append(html);
	  
  }

  ticketDetailObj.formatMisc = function (obj) {
	  var lotteryType = obj.lotteryType.toLowerCase();

      if (['jczq', 'jz2x1', 'ftfh'].indexOf(lotteryType) !== -1) {
          $('#ticketDetail_continue').html('继续选号').attr('data-level', 'sport').attr('data-lotteryType', lotteryType);
      } else if (['spf14', 'spf9'].indexOf(lotteryType) !== -1) {
          $('#ticketDetail_continue').html('继续选号').attr('data-level', 'num').attr('data-lotteryType', lotteryType);
	  } else {
          $('#ticketDetail_continue').html('继续守号').attr('data-level', 'num').attr('data-lotteryType', lotteryType);
	  }
  }

  ticketDetailObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
  }

  ticketDetailObj.init = function(){
	  ticketDetailObj.setDefConfig();
      ticketDetailObj.onloadExecution();
  }
  
  ticketDetailObj.setDefConfig = function(){
	  this.lottery_id = '';
	  this.page = 0;
	  this.checkPage = true;
	  this.clientHeight = document.documentElement.clientHeight;
	  this.minListNum = 10;  
	  window.onscroll = null;
	  this.starObj = {
		'0' : 'Gray', '1': 'Green','2':'Red','3':'Blue','4':'Purple'  
	  }
  }
   
  ticketDetailObj.dirShow = function(obj){
	 
	var id = (obj && obj.id) ? obj.id : '';
	ticketDetailObj.show('reload',function(){
		ticketDetailObj.setData(id);
		ticketDetailObj.getData();	
	}); 
	
  }

