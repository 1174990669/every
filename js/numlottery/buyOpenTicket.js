
  var buyOpenTicketObj = new PageController({
	   'name': 'buyOpenTicket',
	   'tpl' : 'template/numlottery/buyOpenTicket.html'
    });

  buyOpenTicketObj.createDomObj = function(){
    this.wrapObj = $("#buyOpenTicket_wrapperObj");
  }

  buyOpenTicketObj.createEvent = function(){
    this.wrapObj.tap(function(e){
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "back" : buyOpenTicketObj.goBack();return true;
		  case 'buy' : buyOpenTicketObj.buyItem(thisObj);return true;   //添加到购物车
		  case 'title' : buyOpenTicketObj.toggle(thisObj);return true;
		  case 'showBuyList' : buyOpenTicketObj.showBuyList(thisObj);return true;
        }        
      }
       var spanObj = $.oto_checkEvent(e,"SPAN");
       if(spanObj){
         var thisObj = $(spanObj);
         var thisT = thisObj.attr("data-t");
         switch(thisT){
           case 'minus' : buyOpenTicketObj.minusFun(thisObj);return true;
		   case 'add' : buyOpenTicketObj.addFun(thisObj);return true;   //添加到购物车
		   case 'botMinus' : buyOpenTicketObj.minusFun2(thisObj); return true;
		   case 'botAdd' : buyOpenTicketObj.addFun2(thisObj);return true;
		   case 'send' : buyOpenTicketObj.sendFun(thisObj);return true;
		   case 'clear' : buyOpenTicketObj.showTipOne(thisObj);return true;
		   case 'submit' : buyOpenTicketObj.showTipTwo(thisObj);return true;
		   case 'record' : buyOpenTicketObj.goRecord(thisObj);return true;
		   case 'img' : buyOpenTicketObj.goImgDetail(thisObj);return true;
         }        
       }
	   var aObj = $.oto_checkEvent(e,"A");
       if(aObj){
         var thisObj = $(aObj);
         var thisT = thisObj.attr("data-t");
         switch(thisT){
            case 'hideTipOne' : buyOpenTicketObj.hideTipOne(thisObj);return true;
			case 'confirmTipOne' : buyOpenTicketObj.clearList();buyOpenTicketObj.hideTipOne(thisObj);return true;
			case 'hideTipTwo' : buyOpenTicketObj.hideTipTwo(thisObj);return true;
			case 'confirmTipTwo' : buyOpenTicketObj.submitFun();buyOpenTicketObj.hideTipTwo(thisObj);return true;
         }        
       }
    });
	$('#buyOpenTicket_listWrap').unbind('tap').tap(function(){
		$('#buyOpenTicket_buyListWrap').hide();
	})
  }
  
  buyOpenTicketObj.showTipOne = function(obj){
	 $('#buyOpenTicket_tipOne').show();  
  }
  
  buyOpenTicketObj.hideTipOne = function(obj){
	 $('#buyOpenTicket_tipOne').hide();  
  }
  
  buyOpenTicketObj.goImgDetail = function(obj){
	  var id = obj.attr('data-id');
	  otImgDetailObj.goBack = function(){
		  otImgDetailObj.destroy();
		  buyOpenTicketObj.show();
	  }
	  otImgDetailObj.show('',function(){
		  otImgDetailObj.getData(id); 
	  })
  }
  
   buyOpenTicketObj.goRecord = function(){
	   buyOpenTicketObj.clearList();
	   openTicketRecordObj.show('',function(){
			   openTicketRecordObj.pushRoute(function(){
				 	buyOpenTicketObj.show();  
			   })
		});
   }
   
   
  buyOpenTicketObj.showTipTwo = function(){
	  $('#buyOpenTicket_tipTwo').show();   
  }
  
  buyOpenTicketObj.hideTipTwo = function(){
	  $('#buyOpenTicket_tipTwo').hide();   
  }
  
  buyOpenTicketObj.submitFun = function(){
	  if(this.money == 0){
		$.alertMsg('至少选择1份');
		return false;
		   
	  }
	  this.clearList();
	    ticketCashierObj.goBack = function(){
			Global.GC();
			homeObj.show();	
		}
		ticketCashierObj.show('',function(){
		   	ticketCashierObj.demo({});
		});
  }
  
  
  buyOpenTicketObj.clearList = function(){
	   this.wrapObj.find('input[data-t=val]').val(0);
	   this.wrapObj.find('p[data-t=buy]').show();
	   this.wrapObj.find('p[data-t=modify]').hide();
	   this.calcMoney();
  }
  
  buyOpenTicketObj.showBuyList = function(){
	 $('#buyOpenTicket_buyListWrap').toggle();  
  }
  
  buyOpenTicketObj.toggle = function(obj){
	 var content = obj.next('.js_wrap');
	 if(content.css('display') == 'none'){
		 content.show();
		 obj.find('.arrow').addClass('trans');
	 }else{
		 content.hide();
		 obj.find('.arrow').removeClass('trans');
	 }
  }
  
  buyOpenTicketObj.sendFun = function(obj){
	 $('#buyOpenTicket_sendWrap').find('span').removeClass('on');
	 obj.addClass('on');  
  }
  
  buyOpenTicketObj.minusFun2 = function(obj){
	  var total = obj.parent('p');
	  var input = total.find('input');
	  var id = input.attr('data-subid');
	  var input2 = this.wrapObj.find('input[data-id=' + id + ']');
	  buyOpenTicketObj.minusFun(input2);
  }
  
  buyOpenTicketObj.addFun2 = function(obj){
	  var total = obj.parent('p');
	  var input = total.find('input');
	  var id = input.attr('data-subid');
	  var input2 = this.wrapObj.find('input[data-id=' + id + ']');
	  buyOpenTicketObj.addFun(input2);
  }
  
  buyOpenTicketObj.minusFun = function(obj){
	  var total = obj.parent('p');
	  var input = total.find('input');
	  var value = input.val();
	  var newVal = value -1;
	  if(newVal > 0){
		  input.val(newVal);
	  }else{
		  input.val(0);
 		  total.hide();
		  total.prev('p').show();
	  }
	  this.calcMoney();
  }
  
  buyOpenTicketObj.addFun = function(obj){
	  var total = obj.parent('p');
	  var input = total.find('input');
	  var value = input.val();
	  var newVal = Number(value) + 1;
	  input.val(newVal);
	  this.calcMoney();
  }
  
  buyOpenTicketObj.buyItem = function(obj){
	   var total = obj.parent('div');
	   var modifyObj = total.find('p[data-t=modify]');
	   obj.hide();
	   modifyObj.show();
	   modifyObj.find('input').val(1);
	   this.calcMoney();
  }
  
  buyOpenTicketObj.calcMoney = function(){
	  var inputs = this.wrapObj.find('input[data-t=val]');
	  var count = 0;
	  var money = 0;
	  var html = '';
	  inputs.each(function(idx,itm){
		  var ele  = $(itm);
		  if(ele.val() > 0){
			  var num = parseInt(ele.val());
			  var price = parseInt(ele.attr('data-price'));
			  var name = ele.attr('data-name');
			  var itmMoney = num * price;
			  var id = ele.attr('data-id');
		  	  count += num;
			  money += itmMoney;
			  html += '<div class="item clearfix">'+
						'<span class="gray fl">'+ name  +'</span>'+
						'<span class="gray fl">￥'+ price + '</span>'+
						'<div class="fl center w40">'+
							'<p class="jipt clearfix">'+
								'<span data-t="botMinus">-</span><input type="text" value="'+ num +'" data-subid="'+ id +'"><span data-t="botAdd">+</span>'+
							'</p>'+
					   '</div>'+					
					   '</div>';
		  }
		  
	  })
	 // //console.log(count);
	  ////console.log(money);
	  $('#buyOpenTicket_count').html(count);
	  $('#buyOpenTicket_money').html(money);
	  $('#buyOpenTicket_buyList').html(html);
	  if(count > 0){
		 $('#buyOpenTicket_shop').show();  
	  }else{
		 $('#buyOpenTicket_shop').hide();
	  }
	  this.money = money;
  }
  
  buyOpenTicketObj.setDefConfig = function(){
		this.money = 0;  
  }

  buyOpenTicketObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
  }

  buyOpenTicketObj.init = function(){
	  this.setDefConfig();
      buyOpenTicketObj.onloadExecution();
  }
  
  buyOpenTicketObj.goBack = function(){
	  var self = this;
	  self.popRoute();
  }
  
  buyOpenTicketObj.destroy = function(){
	  this.setDefConfig();
	  $('#buyOpenTicket').html('').remove();
	  this.routeArr = [];
	  //console.log('即开票购买页面销毁全部路由关系------------------------------');
  }
	
	
   
  buyOpenTicketObj.dirShow = function(){
	buyOpenTicketObj.show();  
  }

