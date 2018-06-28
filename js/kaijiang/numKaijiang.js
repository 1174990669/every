
  var numKaijiangObj = new PageController({  //block
	   'name': 'numKaijiang',
	   'tpl' : 'template/kaijiang/numKaijiang.html',
	   'pullDistance':220
    });

  

  numKaijiangObj.setDefConfig = function(){
    this.defLotteryType = "dlt";
	this.nowLotteryType = 'dlt';
    this.allLotteryType = ["ssq","dlt", "jxk3","jlk3","gx11x5","hub11x5","jx11x5","ftspf","spf14","d3","pl3","pl5"/*,"qxc","bsksf","gd11x5","hn4j1","lcbqc","scjq"*/];
    this.allLotteryCnName = {
        "dlt": "大乐透",
        "ssq": "双色球",
        "d3": "福彩3D",
        "jxk3": "江西快3",
        "jlk3": "吉林快3",
        "pl3": "排列三",
        "pl5": "排列五",
//      "qxc": "七星彩",
        "spf14": "胜负彩/任选九",
        // "tjsyy": "11选5",
//      "gd11x5": "粤11选5",
        "gx11x5": "广西11选5",
        "hub11x5": "湖北11选5",
        "jx11x5": "江西11选5",
//      "xj11x5": "新11选5",
//      "sd11x5": "鲁11选5",
//      "bsksf": "竞篮",
        "ftspf": "竞足"
//      "hn4j1": "海南4+1"/*,"lcbqc":"六场半全场","scjq":"四场进球"*/
    };
      this.lotteryClass = {
          dlt: ['redball', 'blueball'],
          ssq: ['redball', 'blueball'],
          pl3: ['redball', 'redball', 'redball'],
          d3: ['redball', 'redball', 'redball'],
          pl5: ['redball', 'redball', 'redball', 'redball', 'redball'],
          qxc: ['redball', 'redball', 'redball', 'redball', 'redball', 'redball', 'redball'],
          spf14: ['block', 'block', 'block', 'block', 'block', 'block', 'block', 'block', 'block', 'block', 'block', 'block', 'block', 'block'],
          lcbqc: [],
          scjq: [],
          tjsyy: ['redball', 'redball', 'redball', 'redball', 'redball', 'redball', 'redball'],
          gd11x5: ['redball', 'redball', 'redball', 'redball', 'redball', 'redball', 'redball'],
          gx11x5: ['redball', 'redball', 'redball', 'redball', 'redball', 'redball', 'redball'],
          hub11x5: ['redball', 'redball', 'redball', 'redball', 'redball', 'redball', 'redball'],
          jx11x5: ['redball', 'redball', 'redball', 'redball', 'redball', 'redball', 'redball'],
          xj11x5: ['redball', 'redball', 'redball', 'redball', 'redball', 'redball', 'redball'],
          sd11x5: ['redball', 'redball', 'redball', 'redball', 'redball', 'redball', 'redball'],
          sd11x5: ['redball', 'redball', 'redball', 'redball', 'redball', 'redball', 'redball'],
          ftspf: [],
          hn4j1: ['redball', 'redball', 'redball', 'redball'],
          bsksf: []
      };
	
	  numKaijiangObj.temData = new Object();
	  numKaijiangObj.temDetailed = new Object();
	  numKaijiangObj.nowPage = 0;
	  numKaijiangObj.checkAjaxEnd = true;
	  numKaijiangObj.nowShowDetailed = "";
	  numKaijiangObj.oldshowDetailedObj = "";
	  numKaijiangObj.maxPage = new Object();
	  numKaijiangObj.ajaxGetDataNum = 20;
	  numKaijiangObj.clientHeight = document.documentElement.clientHeight;
	  numKaijiangObj.dateData = "";
	   window.onscroll = null;
  }
//numKaijiang_kjListObj
  numKaijiangObj.createDomObj = function(){
    this.kjDivObj = $("#numKaijiang_kjDivObj");
    this.kjTitleObj = $("#numKaijiang_kjTitleObj");
    this.kjListObj = $("#numKaijiang_kjListObj");
    this.backObj = $("#numKaijiang_backObj");
    this.scrollObj = $("#numKaijiang_scrollObj");
    this.detailedDivObj = $('<div class="kj_detail"></div>');
    this.dateTipsObj = $("#numKaijiang_dateTipsObj");
    this.showDateObj = $("#numKaijiang_showDateObj");
    this.showSetObj = $('#numKaijiang_showSet');
  }

  numKaijiangObj.createEvent = function(){
    this.kjDivObj.unbind('tap').tap(function(e){
       numKaijiangObj.lotteryEvent(e);
    });
    this.backObj.unbind('tap').tap(function(e){
       numKaijiangObj.goBack();
    });
    this.showDateObj.tap(function(){
      numKaijiangObj.showDate($(this));
    });
    	this.showSetObj.tap(function(){
      numKaijiangObj.goSet();
    });
    this.dateTipsObj.find("li").tap(function(){
      numKaijiangObj.updDate($(this));
    });
    window.onscroll = function(){
	  if(!numKaijiangObj.checkAjaxEnd){
		return false;  
	  }
      numKaijiangObj.updatePage();
    }
	$("#numKaijiang_droploadWrap").dropload({  
			scrollArea : window,
			distance : 200,
			loadUpFn:function(me){
        // console.log(me)
			    numKaijiangObj.pullLoad = me;
				numKaijiangObj.nowPage = 0;
				numKaijiangObj.dateData = '';
				if(numKaijiangObj.nowLotteryType=="ftspf"){
				  numKaijiangObj.getJCLotteryData();
				}else if(numKaijiangObj.nowLotteryType=="bsksf"){
				  numKaijiangObj.getBSKLotteryData();
				}else{
				  numKaijiangObj.getLotteryData();
				}  
				//me.resetload(); numKaijiang_kjDivObj
			}
	 }) 

  }
  
   numKaijiangObj.goSet = function(){
	 prizeNotifyObj.goBack = function(){
		prizeNotifyObj.destroy();
		numKaijiangObj.show(); 
	 }
	 prizeNotifyObj.show('',function(){
		prizeNotifyObj.getData(); 
	 });  
  }
  numKaijiangObj.updDate = function(obj){
       this.dateData = obj.attr("data-v");
	   if(this.nowLotteryType == 'bsksf'){
		 this.getBSKLotteryData();  
	   }else{
       	 this.getJCLotteryData();
	   }
       this.dateTipsObj.hide();
       this.showDateObj.removeClass('showObj');
       this.removeBgLayer();
  }
  

  numKaijiangObj.updatePage = function(){
    if(this.nowLotteryType=="ftspf" || this.nowLotteryType=="bsksf")return false;
    if(this.nowPage >= this.maxPage[this.nowLotteryType])return false;
    var scrollTop = document.body.scrollTop;
    var bodyHeight = this.kjDivObj.height();
    if(scrollTop + this.clientHeight > bodyHeight - this.clientHeight/2){
      this.nowPage +=1;
      this.getLotteryData();
    }
  }

  numKaijiangObj.lotteryEvent = function(e){
    var liObj = $.oto_checkEvent(e,"LI");
    if(liObj){
      var thisObj = $(liObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "upd" : this.updateType(thisObj);return true;
      }
    }
	var pObj = $.oto_checkEvent(e,"P");
    if(pObj){
      var thisObj = $(pObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "showMatch" : this.showMatch(thisObj);return true;
      }
    }
    var spanObj = $.oto_checkEvent(e,"SPAN");
    if(spanObj){
      var thisObj = $(spanObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "detailed" : this.showDetailed(thisObj);return true;
      }
    }
	var divObj = $.oto_checkEvent(e,"DIV");
    if(divObj){
      var thisObj = $(divObj);
      var thisT = thisObj.attr("data-t");
	  //console.log(thisT);
      switch(thisT){
        case "detailed" : this.showDetailed(thisObj);return true;
      }
    }
	
  }

  numKaijiangObj.removeBgLayer = function(){
    if($('#numKaijiang_bgLayer').length){
      $('#numKaijiang_bgLayer').remove(); 
    }
  }

  numKaijiangObj.addBgLayer = function(layer,btn){
    var bg = '<div style="width:100%;height:100%;background:transparent;position:absolute;left:0;top:0;z-index:98" id="numKaijiang_bgLayer"></div>';
    if($('#numKaijiang_bgLayer').length == 0){
      $("body").append(bg);
      $('#numKaijiang_bgLayer').css({'height':document.documentElement.scrollHeight || document.body.scrollHeight})
      $('#numKaijiang_bgLayer').tap(function(){
        btn.removeClass('showObj')
        layer.hide();
        $('#numKaijiang_bgLayer').remove();
        if($(btn).find('.arrow').length > 0){
           $(btn).find('.arrow').removeClass('trans');  
        }
      })
    }
    // console.log(bg)
  }
  
  numKaijiangObj.showDate = function(obj){
    if(obj.hasClass('showObj')){
      obj.removeClass('showObj');
      this.removeBgLayer();
      this.dateTipsObj.hide();
    }else{
      obj.addClass('showObj');
      this.dateTipsObj.show();
       this.addBgLayer(this.dateTipsObj,obj);
    }
  }

  numKaijiangObj.showMatch = function(obj){
    if(obj.hasClass('showObj')){
      obj.removeClass('showObj');
      obj.next().hide();
	  obj.children('span.fr').find('em').get(0).className = 'arrow';
    }else{
      obj.addClass('showObj');
      obj.next().show();
	  obj.children('span.fr').find('em').get(0).className = 'arrowup';
    }
  }
  
  numKaijiangObj.showDetailed = function(obj){
	var self = this;
	var wrapObj = obj.parents('.kjli');
    var thisV = obj.attr("data-v");
    if(this.nowShowDetailed != thisV && this.oldshowDetailedObj)this.oldshowDetailedObj.find('em').get(0).className = 'arrow';
    this.nowShowDetailed = thisV;
    this.oldshowDetailedObj = wrapObj;
    this.detailedDivObj.html("");
    this.detailedDivObj.hide();
    this.detailedDivObj.insertAfter(wrapObj);
    if(wrapObj.find('em').hasClass('arrowup')){
      wrapObj.find('em').get(0).className = 'arrow';
      this.detailedDivObj.hide();
      return false;
    }else{
      wrapObj.find('em').get(0).className = 'arrowup';
    }
    if(numKaijiangObj.temDetailed[numKaijiangObj.nowLotteryType] && numKaijiangObj.temDetailed[numKaijiangObj.nowLotteryType][thisV]){
      this.createDetailed();
      return false;
    }
    var postData = {
  		"lottery_no": thisV,
  		"lottery_type": this.nowLotteryType
  	}
  	var secretData = {
  		'para': Global.encrypt(postData)
  	}
    $.ajax({
	  url : ConfigObj.localSite +  '?version=1&m=Lottery.Charts.award',
      data : secretData,
      type : "post",
      dataType : "json",
      success : function(msg){
      	
      	//console.log(msg);
		if(msg.code == '0000'){
			msg.info = $.parseJSON(Global.crypt(msg.info));
			if(Number(msg.info.lotteryNum) !== Number(thisV))return false;
			if(!self.temDetailed[self.nowLotteryType])self.temDetailed[self.nowLotteryType]=new Object();
			self.temDetailed[self.nowLotteryType][thisV] = msg.info;
			self.createDetailed();
		}else{
				
		}
      }
    });
  }

  numKaijiangObj.createDetailed = function(){
	////console.log(this.nowLotteryType); 
    switch(this.nowLotteryType){
	  case "ssq" : numKaijiangObj.setDltDetailed();break;
      case "dlt" : numKaijiangObj.setDltDetailed();break;
      case "d3"  : numKaijiangObj.setpl3Detailed();break; // 目前和 pl3 一样处理
      case "pl3"  : numKaijiangObj.setpl3Detailed();break;
      case "pl5"  : numKaijiangObj.setpl5Detailed();break;
      case "qxc" : numKaijiangObj.setQxcDetailed();break;
      case "spf14" : numKaijiangObj.setSPF14Detailed();break;
	  case "hn4j1" : numKaijiangObj.setHn4j1Detailed();break;
    }
  }
  
  numKaijiangObj.setHn4j1Detailed = function(){
    var thisData = this.temDetailed[this.nowLotteryType][this.nowShowDetailed];
    var html = ['<p class="clearfix"><span class="w50 fontred"><em>'+thisData['salesVal']+'<i class="font12 gray">本期销量</i></em></span><span class="w50 fontred"><em>'+thisData['bonusVal']+'<i class="font12 gray">奖池滚存</i></em></span></p><p class="font12 gray"><span class="w33">奖级</span><span class="w33">中奖注数</span><span class="w33">单注奖金</span></p>'];
// console.log(html)
    for(var i=0,ilen=thisData['list'].length;i<ilen;i++){
      html.push('<p><span class="w33">'+thisData['list'][i]['level']+'</span><span class="w33">'+thisData['list'][i]['num']+'</span><span class="w33 fontred">'+thisData['list'][i]['money']+'</span></p>');
      // console.log(html)
    }

    this.detailedDivObj.html(html.join(""));
    this.detailedDivObj.show();
  }

  numKaijiangObj.setDltDetailed = function(){
    var thisData = this.temDetailed[this.nowLotteryType][this.nowShowDetailed];
    var html = ['<p class="clearfix"><span class="w50 fontred"><em>'+thisData['salesVal']+'<i class="font12 gray">本期销量</i></em></span><span class="w50 fontred"><em>'+thisData['bonusVal']+'<i class="font12 gray">奖池滚存</i></em></span></p><p class="font12 gray"><span class="w33">奖级</span><span class="w33">中奖注数</span><span class="w33">单注奖金</span></p>'];
    // console.log(html)
    for(var i=0,ilen=thisData['list'].length;i<ilen;i++){
      html.push('<p><span class="w33">'+thisData['list'][i]['level']+'</span><span class="w33">'+thisData['list'][i]['num']+'</span><span class="w33 fontred">'+thisData['list'][i]['money']+'</span></p>');
    }
    this.detailedDivObj.html(html.join(""));
    this.detailedDivObj.show();
  }

  numKaijiangObj.setpl3Detailed = function(){
    var thisData = this.temDetailed[this.nowLotteryType][this.nowShowDetailed];
    var html = ['<p class="clearfix"><span class="w100 fontred"><em>'+thisData['salesVal']+'<i class="font12 gray">本期销量</i></em></span></p><p class="font12 gray"><span class="w33">奖级</span><span class="w33">中奖注数</span><span class="w33">单注奖金</span></p>'];
    // console.log(html)
    for(var i=0,ilen=thisData['list'].length;i<ilen;i++){
      html.push('<p><span class="w33">'+thisData['list'][i]['level']+'</span><span class="w33">'+thisData['list'][i]['num']+'</span><span class="w33 fontred">'+thisData['list'][i]['money']+'</span></p>');
    }
    this.detailedDivObj.html(html.join(""));
    this.detailedDivObj.show();
  }
//numKaijiang_droploadWrap
  numKaijiangObj.setpl5Detailed = numKaijiangObj.setpl3Detailed;

  numKaijiangObj.setQxcDetailed = numKaijiangObj.setDltDetailed;

  numKaijiangObj.setSPF14Detailed = function(){
    var thisData = this.temDetailed[this.nowLotteryType][this.nowShowDetailed];
    var html = ['<p class="clearfix"><span class="w50 fontred"><em><i class="fontred">'+thisData['salesVal']+'</i><i class="font12 gray">本期销量</i></em></span><span class="w50"><em><i class="fontred">'+thisData['bonusVal']+'</i><i class="font12 gray">奖池滚存</i></em></span></p><p class="font12 gray"><span class="w33">奖级</span><span class="w33">中奖注数</span><span class="w33">单注奖金</span></p>'];
// console.log(html)
    for(var i=0,ilen=thisData['list'].length;i<ilen;i++){
      html.push('<p><span class="w33">'+thisData['list'][i]['level']+'</span><span class="w33">'+thisData['list'][i]['num']+'</span><span class="w33 fontred">'+thisData['list'][i]['money']+'</span></p>');
      // console.log(html)
    }
    var matchCgHtml = [];
    var matchNameHtml = [];
    
	if(thisData['schdulelist']){
		for(var i=0,ilen=thisData['schdulelist'].length;i<ilen;i++){
		   matchCgHtml.push('<span class="top">')
		   if(thisData['schdulelist'][i]['betResult'] && thisData['schdulelist'][i]['betResult'] != -1){
			  matchCgHtml.push('<em>'+thisData['schdulelist'][i]['betResult']+'</em>');
		   }
		   if(thisData['schdulelist'][i]['homeGoals'] != -1){
			  matchCgHtml.push('<em class="font12">'+thisData['schdulelist'][i]['homeGoals']+":"+thisData['schdulelist'][i]['awayGoals']+'</em>')
		   }
		   matchCgHtml.push('</span>');
		}
	
		for(var i=0,ilen=thisData['schdulelist'].length;i<ilen;i++){
		  matchNameHtml.push('<span class="vs"><em>'+thisData['schdulelist'][i]['homeName'].substr(0,4)+'</em><i>·</i><em>'+thisData['schdulelist'][i]['awayName'].substr(0,4)+'</em></span>');
		}
	}

    html.push('<div class="sfc_kj"><div class="sfc_li clearfix">'+matchCgHtml.join("")+"</div>");
    html.push('<div class="sfc_li clearfix">'+matchNameHtml.join("")+'</div></div>');

    this.detailedDivObj.html(html.join(""));
    this.detailedDivObj.show();
  }

  numKaijiangObj.updateType = function(obj){
    // console.log(this.kjListObj)

    var sibingObj = obj.siblings();
    sibingObj.removeClass('on');
    obj.addClass('on');
    var thisV = obj.attr("data-v");
    this.nowLotteryType = thisV;
    this.nowPage = 0;
    this.kjListObj.html('<p class="loading_1"></p>');
    if(thisV=="ftspf"){
      this.getJCLotteryData();
    }else if(thisV =='bsksf'){
	  	this.getBSKLotteryData();
		}else{
      this.getLotteryData();
    }
    this.titleScrollVal();
    this.checkDateShow();
    //setTimeout(function(){
	//	$('#numKaijiang .loading_1').remove();
	//},1000);
  }

  numKaijiangObj.titleScrollVal = function(){
    var width = 0;
    var clientWidth = document.documentElement.clientWidth;
    var titleWidth = this.scrollObj.children('ul').width();

    var allLiObj = this.scrollObj.find('li');
    for(var i=0,ilen=allLiObj.length;i<ilen;i++){
      var thisT = allLiObj.eq(i).attr("data-v");
      width += allLiObj.eq(i).width();
//    //console.log(allLiObj.eq(i).width());
      if(thisT == this.nowLotteryType)break;
    }

    // TODO 这是 jQuery/Zepto 的 一个 BUG，对于动态插入的元素可能不能获取宽度
//  //console.log('width:' + width + ' ' + 'clientWidth: ' + clientWidth + ' ' + 'titleWidth:' + titleWidth);

    if(width > clientWidth/2 && this.myScroll){
      if(titleWidth - width < clientWidth/2){
        this.myScroll.scrollTo((titleWidth-clientWidth)*-1,0,800,false);
      }else{
        this.myScroll.scrollTo((width-clientWidth/2)*-1,0,800,false);
      }
    }else{
      this.myScroll.scrollTo(0,0,800,false);
    }
  }

  numKaijiangObj.getLotteryData = function(){
	var self = this;
    if(!this.checkAjaxEnd)return false;
    //if(this.checkTemData())return false;
    var postData = {
    	"lottery_type":this.nowLotteryType,
    	"page":this.nowPage,
    	"size":this.ajaxGetDataNum
    };
    this.checkAjaxEnd = false;
    var secretData = {
			'para' : Global.encrypt(postData)
		};
    $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=Lottery.Charts.trend',
      data : secretData,
      type : "post",
      dataType : "json",
      success : function(msg){
      	// console.log(msg);
      	
		if(numKaijiangObj.pullLoad){
			numKaijiangObj.pullLoad.resetload();
		}
		// console.log('开奖列表', msg); //lotteryResult
		if(msg.code == '0000'){
			msg.info = $.parseJSON(Global.crypt(msg.info));
			// console.log('开奖列表', msg);
			if(!self.temData[self.nowLotteryType])self.temData[self.nowLotteryType]=new Array();
			self.temData[self.nowLotteryType][self.nowPage] = msg.info.list;
			self.setLotteryHtml();
			
			if(!msg.info.list || msg.info.list.length < self.ajaxGetDataNum)self.maxPage[self.nowLotteryType] = self.nowPage;
		}else{
			$.alertMsg(msg.code_str);	
		}
		self.checkAjaxEnd = true;
		$('#numKaijiang .loading_1').remove();
      },
      error : function(){
        self.checkAjaxEnd = true;
		$('#numKaijiang .loading_1').remove();
      }
    });
  }

   numKaijiangObj.getJCLotteryData = function(){
	var self = this;
	
  var postData = {
  	'lotteryNo':this.dateData,
  	'lotteryType':this.nowLotteryType.toUpperCase()
  }
  
  var secretData = {
  	'para': Global.encrypt(postData)
  }
	
    $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=Lottery.Charts.getFtTrend',
      data : secretData,
      dataType : "json",
      type : "post",
      success : function(msg){
      	
        //if(msg.date!=numKaijiangObj.dateData)return false;
        if(msg.code !== "0000"){
          $.alertMsg(msg.str);
          return false;
        }
        msg.info = $.parseJSON(Global.crypt(msg.info));
        numKaijiangObj.createLotteryDom(msg.info.matchList);
	    if(numKaijiangObj.pullLoad){
			numKaijiangObj.pullLoad.resetload();	
		}
		$('#numKaijiang .loading_1').remove();
      }
    });
	this.getDateData();   //右上角的日期数据
  }
  
  
  
   
   //篮彩数据
   numKaijiangObj.getBSKLotteryData = function(){
   	
   	var postData2 = {
  	'lotteryNo':this.dateData,
  	'lotteryType':this.nowLotteryType.toUpperCase()
  }
  
  var secretData2 = {
  	'para': Global.encrypt(postData2)
  }
   	
    $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=lottery.charts.getFtTrend',
      data : secretData2,
      dataType : "json",
      type : "post",
      success : function(msg){
      	
        //if(msg.date!=numKaijiangObj.dateData)return false;
        if(msg.code !== "0000"){
          $.alertMsg(msg.str);
          return false;
        }
        msg.info = $.parseJSON(Global.crypt(msg.info));
        numKaijiangObj.createBSKLotteryDom(msg.info.matchList);
        // console.log(msg.info.matchList)
		if(numKaijiangObj.pullLoad){
			numKaijiangObj.pullLoad.resetload();	
		}
		$('#numKaijiang .loading_1').remove();
      }
    });
	this.getDateData();   //右上角的日期数据
  }
  
  numKaijiangObj.getDateData = function(){
  	
  	var postData = {
  		"lotteryType": this.nowLotteryType.toUpperCase()
  	}
  	var secretData = {
  		'para': Global.encrypt(postData)
  	}
  	
    $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=lottery.prize.ftTrend',
      data : secretData,
      dataType : "json",
      type : "post",
      success : function(msg){
		//console.log('竞彩日期数据',msg)
        //if(msg.date!=liveScoreObj.dateData)return false;
        
        if(msg.code !== "0000"){
          $.alertMsg(msg.code_str);
          return false;
        }
        msg.info = $.parseJSON(Global.crypt(msg.info));
        numKaijiangObj.formatDateHtml(msg.info);
      }
    });
  }
  
  numKaijiangObj.formatDateHtml = function(obj){
	  var html = '';
	  for(var i=0;i<obj.length;i++){
		  var itm = obj[i]
		  html += '<li data-t="updDate" data-v="'+itm.LotteryNo + '"><a href="javascript:void(0);">'+ itm.LotteryNo + '</a></li>'; 
	  }
	  this.dateTipsObj.find('ul').html(html);
	  this.dateTipsObj.find('li').unbind('tap').tap(function(){
		  numKaijiangObj.updDate($(this));  
	  })
    // console.log(html)
  }
  
  numKaijiangObj.createBSKLotteryDom = function(data){
    // console.log(data)
	var html = [];
    var num=0;
    for(var i in data){
      html.push('<p class="jzli'+(num==0 ? ' showObj' : '')+'" data-t="showMatch"><span class="gray"><em class="mr10">'+i+' '+data[i]['week']+'</em><em class="mr10">'+data[i]['all']+'场比赛</em><em>已开'+data[i]['open']+'场</em></span><span class="fr"><em class="arrow'+(num==0 ? ' trans' : '')+'"></em></span></p><div class="jz_result"'+(num==0 ? '' : 'style="display:none"')+'>');
      for(var k=0,klen=data[i]['list'].length;k<klen;k++){
        var html_str = '';
        html_str = '</span><span class="font12 gray kj_lq">总分'+(data[i]['list'][k]['totalResult'] ? data[i]['list'][k]['totalResult'] : '-') +
              ' 分差' + (data[i]['list'][k]['diffResult'] ? data[i]['list'][k]['diffResult'] : '-');
        html.push( '<div class="result_li clearfix"><p class="font12 gray"><span>'+data[i]['list'][k]['leagueName']+'</span><span>'+(data[i]['list'][k]['oid'].toString().substr(1))+' '+data[i]['list'][k]['match_time_q']+'</span></p><p>'+data[i]['list'][k]['host_name_q']+'</p><p><span class="fontred">'+(data[i]['list'][k]['scoreResult'] ? data[i]['list'][k]['scoreResult'] : '--:--') +
            html_str +
            '</span></p><p>'+data[i]['list'][k]['guest_name_q']+'</p></div>');
      }
      num++;
      html.push('</div>');
    }
	if(html.length > 0){
    	this.kjListObj.html(html.join(""));
      console.log()
	}else{
		this.kjListObj.html('<p class="center" style="margin-top:20px">暂无数据</p>');	
	}
  }

  numKaijiangObj.createLotteryDom = function (data) {
      var html = [];
      var num = 0;
      for (var i in data) {
          html.push('<p class="jzli' + (num == 0 ? ' showObj' : '') + '" data-t="showMatch"><span class="gray"><em class="mr10">' + i + ' ' + data[i]['week'] + '</em><em class="mr10">' + data[i]['all'] + '场比赛</em><em>已开' + data[i]['open'] + '场</em></span><span class="fr"><em class="' + (num == 0 ? ' arrowup' : 'arrow') + '"></em></span></p><div class="jz_result"' + (num == 0 ? '' : 'style="display:none"') + '>');
          for (var k = 0, klen = data[i]['list'].length; k < klen; k++) {
              html.push('<div class="result_li kjli clearfix"><p class="font12 gray"><span>' + data[i]['list'][k]['leagueName'] + '</span><span>' + (data[i]['list'][k]['oid'].toString().substr(1)) + ' ' + data[i]['list'][k]['match_time_q'] + '</span></p><p>' + data[i]['list'][k]['host_name_q'] + '</p><p><span class="fontred">' + (data[i]['list'][k]['scoreResult'] ? data[i]['list'][k]['scoreResult'] : (data[i]['list'][k]['result'] == -1 ? '延期' : '--:--')) + '</span>' + (data[i]['list'][k]['result'] != -1 ? '<span class="font12 gray">半全场：' + (data[i]['list'][k]['bqcResult'] ? data[i]['list'][k]['bqcResult'] : '--:--') + '</span>' : '') + '</p><p>' + data[i]['list'][k]['guest_name_q'] + '</p></div>');
          }
          num++;
          html.push('</div>');
      }
      if (html.length > 0) {
          this.kjListObj.html(html.join(""));
      }
  }
  
  numKaijiangObj.checkTemData = function(){
    if(!(this.temData[this.nowLotteryType] && this.temData[this.nowLotteryType][this.nowPage]))return false;
    this.setLotteryHtml();
    return true;
  }

  numKaijiangObj.setLotteryHtml = function(){
    switch(this.nowLotteryType){
      case "dlt" : numKaijiangObj.setDltLottery();break;
	  case "ssq" : numKaijiangObj.setDltLottery();break;
	  case "gxk3" : numKaijiangObj.setK3Lottery('gxk3');break;
    case "jxk3" : numKaijiangObj.setK3Lottery('jxk3');break;
	  case "jlk3" : numKaijiangObj.setK3Lottery('jlk3');break; //jlk3
      case "pl3"  : numKaijiangObj.setpl3Lottery();break;
	  case "d3"  : numKaijiangObj.setpl3Lottery();break;
      case "pl5"  : numKaijiangObj.setpl5Lottery();break;
      case "qxc" : numKaijiangObj.setQxcLottery();break;
      case "spf14" : numKaijiangObj.setSPF14Lottery();break;
      case "gd11x5" : numKaijiangObj.setFastLottery('gd11x5');break;
      case "gx11x5" : numKaijiangObj.setFastLottery('gx11x5');break;
      case "hub11x5" : numKaijiangObj.setFastLottery('hub11x5');break;
      case "jx11x5" : numKaijiangObj.setFastLottery('jx11x5');break;
	  case "tjsyy" : numKaijiangObj.setFastLottery('tjsyy');break;
	  case "hn4j1" : numKaijiangObj.setHn4j1Lottery();break;
    }
  }

  numKaijiangObj.createBallHtml = function(num){
    var numArr = num.split("|");
    var html = [];
    for(var i=0,ilen=numArr.length;i<ilen;i++){
      var thisData = numArr[i].split(",");
      var thisClass = this.lotteryClass[this.nowLotteryType][i];
      $.each(thisData,function(t){
        thisData[t] = '<span class="ball '+thisClass+'">'+thisData[t]+'</span>';
      });
      html.push(thisData.join(""));
    }
    return html.join('');
  }

  numKaijiangObj.createLotteryHtml = function(num){
    var numArr = num.split(",");
    var html = [];
    for(var i=0,ilen=numArr.length;i<ilen;i++){
      var thisClass = this.lotteryClass[this.nowLotteryType][i];
      
      html.push('<span class="'+thisClass+'">'+numArr[i]+'</span>');
    }
    return html.join('');
   }
  
  numKaijiangObj.setK3Lottery = function(){
    var thisData = this.temData[this.nowLotteryType][this.nowPage];
    var html = '';
    if(!thisData || !thisData.length)return html.join("");
	var cssObj ={
			'三不同': 'fontblue',
			'三同号': 'fontred',
			'二不同': 'fontaqua',
			'二同号': 'fontorange',
			'三连号' : 'fontgold'	
	}
    for(var i=0,ilen=thisData.length;i<ilen;i++){
      console.log(thisData.length)
		var itm = thisData[i];
		html += '<div class="kjli">'+
					'<p class="mb15 clearfix">'+
						'<span class="fl '+(i==0 && this.nowPage==0 ? 'fontblue' : '')+ '">第'+ itm.lotteryNum +'期</span>'+
						'<span class="fr gray font12">'+ itm.time +'</span>'+
					'</p>'+
					'<div class="clearfix pl3">'+
						'<p class="w50 clearfix">';
		var arr = itm.lotteryResult.split(',');
    // console.log(html)
		for(var j=0;j<arr.length;j++){
			html += '<span class="ball redball">'+ arr[j] +'</span>';	
		}
		html +=			'</p>'+
						'<p class="w25">'+itm.sum +'</p>'+
						'<p class="w25 '+ (cssObj[itm.type] ? cssObj[itm.type] : '')  + '">'+ itm.type +'</p>'+
					'</div>'+
					'<span class="arrowbox">'+
						
					'</span>'+
				'</div>'
    }
    this.kjListObj.append(html);
  }
  
  numKaijiangObj.setHn4j1Lottery = function(){
    var thisData = this.temData[this.nowLotteryType][this.nowPage];
    var html = [];
    if(!thisData || !thisData.length)return html.join("");
    for(var i=0,ilen=thisData.length;i<ilen;i++){
      html.push('<div class="kjli" ><p class="mb15 clearfix"><span class="fl '+(i==0 && this.nowPage==0 ? 'fontblue' : '')+'">第'+thisData[i]['lotteryNum']+'期</span><span class="fr gray font12">'+thisData[i]['time']+'</span></p><div class="clearfix" data-t="detailed" data-v="'+thisData[i]['lotteryNum']+'"><p class="clearfix" >'+this.createBallHtml(thisData[i]['lotteryResult'])+'</p></div><span class="arrowbox" data-t="detailed" data-v="'+thisData[i]['lotteryNum']+'"><em class="arrow"></em></span></div>');
      // console.log(html)
    }
    // console.log(12)
    this.kjListObj.append(html.join(""));
  }

  numKaijiangObj.setDltLottery = function(){
    var thisData = this.temData[this.nowLotteryType][this.nowPage];
    var html = [];
    if(!thisData || !thisData.length)return html.join("");
    for(var i=0,ilen=thisData.length;i<ilen;i++){
      html.push('<div class="kjli" ><p class="mb15 clearfix"><span class="fl '+(i==0 && this.nowPage==0 ? 'fontblue' : '')+'">第'+thisData[i]['lotteryNum']+'期</span><span class="fr gray font12">'+thisData[i]['time']+'</span></p><div class="clearfix" data-t="detailed" data-v="'+thisData[i]['lotteryNum']+'"><p class="clearfix">'+this.createBallHtml(thisData[i]['lotteryResult'])+'</p></div><span class="arrowbox" data-t="detailed" data-v="'+thisData[i]['lotteryNum']+'"><em class="arrow"></em></span></div>');
      // console.log(html)
    }
    // console.log(html)

	if(this.nowPage == 0){
		this.kjListObj.html(html.join(""));
	}else{
    	this.kjListObj.append(html.join(""));
	}
  }

  numKaijiangObj.setpl3Lottery = function(){
    var thisData = this.temData[this.nowLotteryType][this.nowPage];
    var html = [];
    if(!thisData || !thisData.length)return html.join("");
    for(var i=0,ilen=thisData.length;i<ilen;i++){
      html.push('<div class="kjli" ><p class="mb15 clearfix"><span class="fl '+(i==0 && this.nowPage==0 ? 'fontblue' : '')+'">第'+thisData[i]['lotteryNum']+'期</span><span class="fr gray font12">'+thisData[i]['time']+'</span></p><div class="clearfix pl3" data-t="detailed" data-v="'+thisData[i]['lotteryNum']+'"><p class="w50 clearfix">'+this.createBallHtml(thisData[i]['lotteryResult'])+'</p><p class="w25">和值'+thisData[i]['sum']+'</p><p class="w25'+(thisData[i]['type'] == "豹子" ? " fontred" : (thisData[i]['type'] == "组三" ? " fontblue" : ""))+'">'+thisData[i]['type']+'</p></div><span data-t="detailed" data-v="'+thisData[i]['lotteryNum']+'" class="arrowbox"><em class="arrow"></em></span></div>');
    }
    if(this.nowPage == 0){
		this.kjListObj.html(html.join(""));
	}else{
    	this.kjListObj.append(html.join(""));
	}
  }

  numKaijiangObj.setpl5Lottery = numKaijiangObj.setDltLottery;

  numKaijiangObj.setQxcLottery = numKaijiangObj.setDltLottery;

   numKaijiangObj.setFastLottery =  function(){
    var thisData = this.temData[this.nowLotteryType][this.nowPage];
    var html = [];
    if(!thisData || !thisData.length)return html.join("");
    for(var i=0,ilen=thisData.length;i<ilen;i++){
      html.push('<div class="kjli"><p class="mb15 clearfix"><span class="fl '+(i==0 && this.nowPage==0 ? 'fontblue' : '')+'">第'+thisData[i]['lotteryNum']+'期</span><span class="fr gray font12">'+thisData[i]['time']+'</span></p><div class="clearfix"><p class="clearfix">'+this.createBallHtml(thisData[i]['lotteryResult'])+'</p></div></div>');
    }
    if(this.nowPage == 0){
		this.kjListObj.html(html.join(""));
	}else{
    	this.kjListObj.append(html.join(""));
	}
  };
  numKaijiangObj.setSPF14Lottery = function(){
    var thisData = this.temData[this.nowLotteryType][this.nowPage];
    var html = [];
    if(!thisData || !thisData.length)return html.join("");
    for(var i=0,ilen=thisData.length;i<ilen;i++){
      html.push('<div class="kjli"><p class="mb15 clearfix"><span class="fl '+(i==0 && this.nowPage==0 ? 'fontblue' : '')+'">第'+thisData[i]['lotteryNum']+'期</span><span class="fr gray font12">'+thisData[i]['time']+'</span></p><div class="clearfix wid1"><p class="clearfix">'+this.createLotteryHtml(thisData[i]['lotteryResult'])+'</p></div><span class="arrowbox" data-t="detailed" data-v="'+thisData[i]['lotteryNum']+'" ><em class="arrow"></em></span></div>');
    }
    // console.log(html)

    if(this.nowPage == 0){
		this.kjListObj.html(html.join(""));
	}else{
    	this.kjListObj.append(html.join(""));
	}
  }

  numKaijiangObj.createTitleDom = function(){
    var html = [];
    for(var i=0,ilen=this.allLotteryType.length;i<ilen;i++){
      html.push('<li style="width:100px;" data-v="'+this.allLotteryType[i]+'" data-t="upd"'+(this.allLotteryType[i] == this.defLotteryType ? ' class="on"' : '')+'><span>'+this.allLotteryCnName[this.allLotteryType[i]]+'</span></li>');
    }
    // console.log(html)
    this.kjTitleObj.html(html.join(""));
  }

   numKaijiangObj.checkDateShow = function(){
      /*
    (this.nowLotteryType == "ftspf" || this.nowLotteryType == 'bsksf') ? this.showDateObj.show() : this.showDateObj.hide();
	(this.nowLotteryType == "ftspf" || this.nowLotteryType == 'bsksf') ? this.showSetObj.hide() : this.showSetObj.show();
	*/
       (this.nowLotteryType == "ftspf" || this.nowLotteryType == 'bsksf') ? this.showDateObj.show() : this.showDateObj.hide();
  }

  numKaijiangObj.titleScroll = function () {
      this.myScroll = new iScroll(this.scrollObj[0], {
          hScrollbar: false,
          hScroll: true,
          vScroll: false
      });
  }

  /**
   * 初始化顶部彩种滚动，在页面渲染完成后调用
   */
  numKaijiangObj.initIScroll = function () {
      numKaijiangObj.titleScroll();

      setTimeout(function () {
          numKaijiangObj.myScroll.refresh();
          numKaijiangObj.titleScrollVal();
      }, 300);
  };

  numKaijiangObj.onloadExecution = function(){
    numKaijiangObj.createDomObj();
    numKaijiangObj.createEvent();
    numKaijiangObj.createTitleDom();
    numKaijiangObj.initIScroll();
    numKaijiangObj.checkDateShow();
  }

  //type 彩种
  numKaijiangObj.init = function(type){
    this.setDefConfig();
	if(type){
		this.nowLotteryType = type;
		this.defLotteryType = type;
	}
    numKaijiangObj.onloadExecution();
    if(type=="ftspf"){
      this.getJCLotteryData();
    }else if(type == 'bsksf'){
	  this.getBSKLotteryData();	
	}else{
      this.getLotteryData();
    }
  }
  
  //先请求模板，然后渲染
  //reload 是否重新渲染
  //callback 显示之后的回调函数
  //type 显示何种彩种的开奖
  //from 从何种页面过来
  numKaijiangObj.show = function(reload,callback,type,from){
	  var self = this;
	  var activePage = Global.getActivePage();
	  if($('#numKaijiang').length ==0 || reload){
		  $.ajax({
			 url:'template/kaijiang/numKaijiang.html',
			 data:'t=' +new Date().getTime(),
			 dataType:'text',
			 success:function(obj){
				 var rx = /<body[^>]*>([\s\S]+?)<\/body>/i
				 var m = rx.exec(obj);
				 if (m) m = m[1];
				 var tplHtml = '<div class="page" style="display:none" id="numKaijiang">' + m + '</div>';
				 $(document.body).append(tplHtml);
				 Global.pageSwitch($('#numKaijiang'),$(activePage));
				 numKaijiangObj.init(type);
				 /*
				 if(from == 'bet'){   //从投注页面过来
					 self.backObj.show();
					 $('#home_navObj').hide();
				 }else{
					 self.backObj.hide();
					 $('#home_navObj').show();
				 }
				 */
				 if(callback) callback();
			 }
		  })
	  }else{
		 Global.pageSwitch($('#numKaijiang'),$(activePage)); 
	  }
  }

  numKaijiangObj.dirShow = function (obj) {
      var self = this;
      var type = obj.type ? obj.type.toLowerCase() : 'dlt';
      type = type == 'jczq' ? 'ftspf' : type;
      self.show('reload', null, (type), obj.from);
  }
   
 