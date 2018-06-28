
  var lotteryListObj = new PageController({
	   'name': 'lotteryList',
	   'tpl' : 'template/discover/lotteryList.html'
    });

  lotteryListObj.createDomObj = function(){
    this.wrapperObj = $("#lotteryList_wrapperObj");
  }

  lotteryListObj.createEvent = function(){
    this.wrapperObj.tap(function(e){
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "back" : lotteryListObj.goBack();return true;
        }        
      }
      var liObj = $.oto_checkEvent(e,"LI");
      if(liObj){
        var thisObj = $(liObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case 'lottery' : lotteryListObj.goLottery(thisObj);return true;
        }        
      }
    });
  }
  
  lotteryListObj.goLottery = function(obj){
	  var lotteryType = obj.attr('data-v');
	  switch(lotteryType){
		case 'dlt':
			this.gotoDltBet();
			break;
		case 'pl3':
			this.gotoPl3Bet();
			break;
		case 'pl5':
			this.gotoPl5Bet();
			break;	
		case 'qxc':
			this.gotoQxcBet();
			break;
		case 'jczq':
			this.gotoJczqBet();
			break;
		case 'jz2x1':
			this.goto2x1Bet();
			break;
		case 'spf14':
			this.goTotoBet();
			break;
		case 'spf9':
			this.goR9Bet();
			break;
		case 'tjsyy':   //高频
			this.goFastBet('tjsyy');
			break;
		case 'gd11x5':
			this.goFastBet('gd11x5');
			break;
		case 'hn4j1':
			this.goHn4j1Bet();
			break;
		case 'jclq':
			this.goBasketMixBet();
			break;
		default:
			break;
		
	}  
  }
  
  lotteryListObj.goBasketMixBet = function(){
	  basketMixObj.goBack = function(){
		basketMixObj.destroy();
		lotteryListObj.show(); 
	 }
	 basketMixObj.show('reload',function(){
		basketMixObj.getData(); 
	 })
  }
  
  lotteryListObj.goHn4j1Bet = function(){
	 hn4j1Obj.goBack = function(){
		hn4j1Obj.destroy();
		hn4j1ConfirmObj.destroy();
		//hn4j1TrendObj.destroy();
		lotteryListObj.show(); 
	 }
	 hn4j1Obj.show();
  }
  
  //跳转到十一运
  lotteryListObj.goFastBet = function(type){
	  fastBetObj.goBack = function(){
		  fastBetObj.destroy();
		  fastBetConfirmObj.destroy(); 
		  fastTrendObj.destroy();  
		  lotteryListObj.show();
	  }
	  ConfigObj.fastLotType = type;   //高频类型
	  fastBetObj.show('',function(){
		 if(type == 'gd11x5'){
		     fastBetObj.updatePlay('FP1'); 
			 //fastBetObj.lotteryCnName = '广东11选5';
		 }
	  });
  }
  
  
  
  lotteryListObj.goR9Bet = function(){
	 soccerR9Obj.goBack = function(){
		soccerR9Obj.destroy();
		lotteryListObj.show(); 
	 }
	 soccerR9Obj.show('reload',function(){
		soccerR9Obj.getData(); 
	 })
  }
  
  lotteryListObj.goTotoBet = function(){
	 soccerTotoObj.goBack = function(){
		soccerTotoObj.destroy();
		lotteryListObj.show(); 
	 }
	 soccerTotoObj.show('reload',function(){
		soccerTotoObj.getData(); 
	 })
  }
  
  lotteryListObj.goto2x1Bet = function(){
	 soccer2x1Obj.goBack = function(){
		soccer2x1Obj.destroy();
		lotteryListObj.show(); 
	 }
	 soccer2x1Obj.show('reload',function(){
		soccer2x1Obj.getData(); 
	 })
  }
  
  //跳转到竞彩足球
  lotteryListObj.gotoJczqBet = function(){
	  soccerMixObj.goBack = function(){
		  soccerMixObj.destroy();
		  lotteryListObj.show();
	  }
	  soccerMixObj.show('reload',function(){
		  soccerMixObj.getData(); 
	  });
  }
  
  //跳转到大乐透
  lotteryListObj.gotoDltBet = function(){
	  dltObj.goBack = function(){
		  dltObj.destroy();
		  dltConfirmObj.destroy();
		  lotteryListObj.show();
	  }
	  dltObj.show();
  }
  
  //跳转到排列三
  lotteryListObj.gotoPl3Bet = function(){
	  pl3Obj.goBack = function(){
		  pl3Obj.destroy();
		  pl3ConfirmObj.destroy();  
		  lotteryListObj.show();
	  }
	  pl3Obj.show();
  }
  
  //跳转到排列五
  lotteryListObj.gotoPl5Bet = function(){
	  pl5Obj.goBack = function(){
		  pl5Obj.destroy();
		  pl5ConfirmObj.destroy();  
		  lotteryListObj.show();
	  }
	  pl5Obj.show();
  }
  
  //跳转到七星彩
  lotteryListObj.gotoQxcBet = function(){
	  qxcObj.goBack = function(){
		  qxcObj.destroy();
		  qxcConfirmObj.destroy();  
		  lotteryListObj.show();
	  }
	  qxcObj.show();
  }
  
  lotteryListObj.setData = function(data){
	if(!data) return;
    var html = [];
    for(var i in data){   
      var thisLottery = i;
      var htmlStr = '<li data-t="lottery" data-v="'+thisLottery+'"><a href="javascript:void(0)"><span class="lot_icon '+thisLottery+'01 fl"></span><div class="lot_name fl"><h3>'+data[i]['cnName']+'</h3>'+((data[i]['bonus'] ) ? '<p>奖池：<span class="money">'+data[i]['bonusVal']+' </span></p>' : '<p>'+data[i]['msg']+'</p>')+(data[i]['add'] ? '<span class="acticon a-jiaj"></span>' : '')+'</div>'+(data[i]['open'] ? '<span class="acticon a-kaij"></span>' : '')+'</a></li>';

      if(data[i]['first']){
        html.unshift(htmlStr);
      }else{
        html.push(htmlStr);
      }
      
    }
	$('#lotteryList_list').html(html.join(""));
  }
  
  
  lotteryListObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
  }

  lotteryListObj.init = function(){
      lotteryListObj.onloadExecution();
  }
  
  
	
	
   
  lotteryListObj.dirShow = function(){
	lotteryListObj.show();  
  }

