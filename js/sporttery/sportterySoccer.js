function SportterySoccer(obj){
  var sportterySoccer = new PageController({
	   'name': obj ? obj.name : '',
	   'tpl' : obj ? obj.tpl : '',
	   'pullDistance' : 300
  });
  
  sportterySoccer.setDefConfig = function(){
	sportterySoccer.betData = new Object();
	sportterySoccer.betNum = 0;
	sportterySoccer.ggSelectData = new Array();
	sportterySoccer.multipleVal = 1;
	sportterySoccer.spTemData = new Object();
	sportterySoccer.showBetNum = true;
	sportterySoccer.noDanGuanVal = 0;
	sportterySoccer.temBetData = new Array(); 
	sportterySoccer.temBetNum = 0;
	sportterySoccer.temNoDanGuanVal = 0;
	sportterySoccer.temScrollTop = 0;
	
    this.betVal = new Array(new Array("3","1","0"),new Array("3","1","0"),new Array("0","1","2","3","4","5","6","7"),new Array("33","31","30","13","11","10","03","01","00"),new Array("10","20","21","30","31","32","40","41","42","50","51","52","90","00","11","22","33","99","01","02","12","03","13","23","04","14","24","05","15","25","09"));
    this.betCnVal = new Array(new Array("胜","平","负"),new Array("胜","平","负"),new Array("0球","1球","2球","3球","4球","5球","6球",">6球"),new Array("胜胜","胜平","胜负","平胜","平平","平负","负胜","负平","负负"),new Array("1:0","2:0","2:1","3:0","3:1","3:2","4:0","4:1","4:2","5:0","5:1","5:2","胜其他","0:0","1:1","2:2","3:3","平其他","0:1","0:2","1:2","0:3","1:3","2:3","0:4","1:4","2:4","0:5","1:5","2:5","负其他"));
    this.betName = new Array("胜平负","让球胜平负","总进球","半全场","比分");
    this.postDataKey = new Array(1,2,5,3,4);
    this.maxModeLimite = [8];
    this.betMinMatch = 2;
	this.maxMul = 10000;
    this.betOneTipsText = '<p class="center fontred">红框1场也能投</p><p class="center font12 gray">页面赔率仅供参考，请以出票为准</p>';
    this.ggMode = {
      1:{'1_1':'单关'},
      2:{'2_1':'2串1'},
      3:{'3_1':'3串1','3_3':'3串3', '3_4':'3串4'},
      4:{'4_1':'4串1','4_4':'4串4', '4_5':'4串5', '4_6':'4串6', '4_11':'4串11'},
      5:{'5_1':'5串1','5_5':'5串5', '5_6':'5串6', '5_10':'5串10', '5_16':'5串16', '5_20':'5串20', '5_26':'5串26'},
      6:{'6_1':'6串1','6_6':'6串6', '6_7':'6串7', '6_15':'6串15', '6_20':'6串20', '6_22':'6串22', '6_35':'6串35', '6_42':'6串42', '6_50':'6串50', '6_57':'6串57'},
      7:{'7_1':'7串1','7_7':'7串7', '7_8':'7串8', '7_21':'7串21', '7_35':'7串35', '7_120':'7串120'},
      8:{'8_1':'8串1','8_8':'8串8', '8_9':'8串9', '8_28':'8串28', '8_56':'8串56', '8_70':'8串70', '8_247':'8串247'}
    }
	this.wid = '';
	this.pid = '';
	this.showBetLotteryType = "FTBRQSPF,FTSPF,FTJQS,FTBQC,FTBF"
  }

  sportterySoccer.createDomObj = function(){
    this.lotteryObj = $("#sportterySoccer_lotteryObj");
    this.betOneTipsObj = $("sportterySoccer_#betOneTipsObj");
    this.lotteryInfoObj = $("#sportterySoccer_lotteryInfoObj");
    this.oneGGObj = $("#sportterySoccer_oneGGObj");
    this.otherGGObj = $("#sportterySoccer_otherGGObj");
    this.ddObj = $("#sportterySoccer_ddObj");
    this.ggdoorObj = $("#sportterySoccer_ggdoorObj");
    this.ddDetailObj = $("#sportterySoccer_ddDetailObj");
    this.ggObj = $("#sportterySoccer_ggObj");
    this.ddTitleObj = $("#sportterySoccer_ddTitleObj");
    this.matchListObj = $("#sportterySoccer_matchListObj");
    this.multipleObj = $("#sportterySoccer_multipleObj");
    this.multipleValObj = $("#sportterySoccer_multipleValObj");
    this.navObj = $("#sportterySoccer_navObj");
    this.updObj = $("#sportterySoccer_updObj");
    this.betspObj = $("#sportterySoccer_betspObj");
    this.showOtherGGObj = $("#sportterySoccer_showOtherGGObj");
    this.bonusOpt = $("#sportterySoccer_bonusOpt");
    this.hemaiOpt = $("#sportterySoccer_hemai")
    this.bonusDeilObj = $("#sportterySoccer_bonusDeilObj");
    this.bonusListObj = $("#sportterySoccer_bonusListObj");
  }
//none
  sportterySoccer.createEvent = function(){
    this.lotteryObj.unbind('tap').tap(function(e){
      sportterySoccer.lotteryEvent(e);
    })
	if(this.bonusOpt){
		this.bonusOpt.unbind('tap').tap(function(e){
		  sportterySoccer.bonusOptAjax(e);
		});
	}
  }

  sportterySoccer.lotteryEvent = function(e){
    var aObj = $.oto_checkEvent(e,"A");
    if(aObj){
      var thisObj = $(aObj);
      var thisT = thisObj.attr("data-t");
      // console.log(thisT)
      switch(thisT){
        case "hideBet" : this.hideBet(thisObj);return true;
        case "subBet"  : this.subBet();return true;
        case "submit" : this.disableBtn(thisObj);this.submitBet();return true;
		case "showNav" : this.showNav();return true;
        case "filter" : this.herfFilter();return true;
		case "hideClearTip" : this.hideClearAllTip();return true;
		case "clearOk" : this.clearAll();this.hideClearAllTip();return true;
      }
    }
    var spanObj = $.oto_checkEvent(e,"SPAN");
    if(spanObj){
      var thisObj = $(spanObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "delOne" : this.deleteOneSelect(thisObj);this.getMoney();return true;
        case "dd" : this.setDD(thisObj);this.createGGDoor();this.checkedDD();this.getMoney();return true;
        case "gg" : this.setGG(thisObj);this.createGGDoor();this.resetDD();this.getMoney();return true;
        case "setM" : this.setM(thisObj);this.getMoney();return true;
        case "addM" : this.addM(thisObj);this.getMoney();return true;
        case "delM" : this.delM(thisObj);this.getMoney();return true;
        case "subM" : this.subM(thisObj);this.getMoney();return true;
        case "showNav" : this.showNav();return true;
        case "filter" : this.herfFilter();return true;
        case "showUpd" : this.showUpd(thisObj);return true;
		    case "clearAll" : this.showClearAllTip();return true;
		    case "hemai" : this.hemai();return true;
      }
    }

    var pObj = $.oto_checkEvent(e,"P");
    if(pObj){
      var thisObj = $(pObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "back" : this.goBack();return true;
        case "updLotteryType" : this.updateLotteryType(thisObj);return true;
        case "showMatch" : this.showMatchList(thisObj);return true;
        case "showDDDom"    : this.showDDDom();return true;
        case "showOtherGG":this.showOtherGG(thisObj);return true;
        case "showMultiple":this.showMultiple();return false;
        case "getBonusDeil" : this.getBonusDeil();return false;
		case "changeLotNo" : this.changeLotNo(thisObj);return false;
      }
    }

    var divObj = $.oto_checkEvent(e,"DIV");
    if(divObj){
      var thisObj = $(divObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "selectBet" : (function(obj){
          obj.selectBet(thisObj);
          obj.showLotteryInfo();
          obj.createBetMatchHtml();
          obj.deleteGGData();
          obj.createGGDom();
          obj.resetDD();
          obj.createGGDoor();
          // obj.createDDDoor();
          obj.getMoney();
        })(this);return true;
        case "showBet" : this.showBet(thisObj);return true;
        case "spbet" : this.betSpSelect(thisObj);this.getMoney();return true; 
        case "dds" : this.ddSelect(thisObj);this.checkedDD();this.getMoney();return true;
      }
    }

    var LiObj = $.oto_checkEvent(e,"LI");
    if(LiObj){
      var thisObj = $(LiObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "showdd" : this.showDDGG(thisObj,'dd');return true;
        case "showgg" : this.showDDGG(thisObj,'gg');return true;
        case "kaijiang" : this.navObj.hide();sportterySoccer.removeBgLayer();this.goKaijiang();return true;
        case "help" : this.navObj.hide();sportterySoccer.removeBgLayer();this.hrefPrizerules();return true;
      }
    }
	
	
  }
  
  sportterySoccer.goLogin = function(){
  	loginObj.goBack = function () {
        userCenterObj.show(true);
    };
    loginObj.goForward = function () {
        userCenterObj.show(true);
    };
    
    loginObj.show(true);
  }
  
  sportterySoccer.hemai = function(){
  	
  	if(!loginObj.isLogin ){
			$.alertMsg("请先登录！",false)
			setTimeout(function(){
				sportterySoccer.goLogin();
			},2000);
			return false;	
		}
  	
  	var zhushuData = window.getBonusData();
  	var subData = this.createSubData();
    console.log(zhushuData['moneyVal'])
    console.log(this.multipleVal)
  	var postData = {
  		"channel_number": ConfigObj.zdid,
  		"matchOrder"  : this.createOidData(),
  		"totalMoney":zhushuData['moneyVal']*this.multipleVal,
  		"lotteryType":this.lotteryType,
  		"lotteryNo":this.lotteryNo,
  		"manner":this.manner ? this.manner : 0
  	};
    console.log(zhushuData['moneyVal']*this.multipleVal)
  	var secretData = {
	 		'para': Global.encrypt(postData),
	 		'access_token': loginObj.access_token
	 	}
	console.log(postData.totalMoney)
  	if(postData.totalMoney < 2){
      console.log(12)
  		$.alertMsg("请先选择场次",false);
  		return false;
  	}
  	
  	$.ajax({
				url: ConfigObj.localSite + '?version=1&m=lottery.lottery.initJcTogehterInfo',
				data: secretData,
				type: "post",
				dataType: "json",
				success: function (obj) {
		 		
					if(obj.code == "0000"){
						obj.info = $.parseJSON(Global.crypt(obj.info));
//						console.log(obj)
						hemaiObj.setData({
							"data":obj.info,
							"createSubData":subData
						});
						sportterySoccer.goHemai();
					}else{
						$.alertMsg(obj.code_str,false)
					}
						
				}
			})
  	
  	
  }
  
  sportterySoccer.goHemai = function(){
  	hemaiObj.goBack = function(){
			 hemaiObj.destroy();
			 sportterySoccer.show();
		 }
		hemaiObj.show();
  }
  
  sportterySoccer.showClearAllTip = function(){
	  if(this.name == 'soccerR9'){
		  $('#soccerR9_confirmTip').toggle();  
	  }
  }
  
  sportterySoccer.hideClearAllTip = function(){
	  $('#soccerR9_confirmTip').hide(); 
  }
  
  sportterySoccer.clearAll = function(obj){
	var matchObj = this.matchListObj.find("div[data-t=selectBet]");
	matchObj.removeClass('selected');
	this.betData = {};
    this.betNum = 0;
    this.showLotteryInfo();
    this.createBetMatchHtml();
    this.deleteGGData();
    this.createGGDom();
    this.resetDD();
    this.createGGDoor();
  }
  
  sportterySoccer.disableBtn = function(btn){
	 btn.removeAttr('data-t').addClass('gray');  
	 setTimeout(function(){
			btn.attr('data-t','submit').removeClass('gray'); 
	 },2500)  
  }
  
  sportterySoccer.goKaijiang = function(){
	   var arr = ['FTBRQSPF','FTSPF','FTFH']; 
	   var type = sportterySoccer.lotteryType.toUpperCase(); 
	   if($.inArray(type,arr) != -1){   //竞彩
		   numKaijiangObj.goBack = function(){
			 numKaijiangObj.destroy();
			 sportterySoccer.show();  
		  }
		  numKaijiangObj.show('reload','','ftspf','bet');
	   }else if(type == 'BSKFH'){   //篮彩
		  numKaijiangObj.goBack = function(){
			 numKaijiangObj.destroy();
			 sportterySoccer.show();  
		  }
		  numKaijiangObj.show('reload','','bsksf','bet');
	   }else{     //足彩
		   numKaijiangObj.goBack = function(){
			 numKaijiangObj.destroy();
			 sportterySoccer.show();  
		  }
		  numKaijiangObj.show('reload','','spf14','bet');    
	   }

  }

  sportterySoccer.hrefPrizerules = function(){
	 lotteryRulesObj.goBack=function(){
		 lotteryRulesObj.destroy();
		 sportterySoccer.show()  
	  }
	  lotteryRulesObj.show('reload',function(){
		  lotteryRulesObj.setData(sportterySoccer.lotteryType,'play');  
	  })
  }

  sportterySoccer.showUpd = function(obj){
    if(obj.hasClass('showObj')){
      obj.removeClass('showObj');
      this.updObj.hide();
	  if(this.name == 'soccerR9' || this.name == 'soccerToto'){
		  if(this.matchWrapObj){
			this.matchWrapObj.addClass('centerWrap');  
		  }
	  }else{
		  if(this.matchListObj){
			this.matchListObj.addClass('centerWrap');
		  }
	  }
    }else{
      obj.addClass('showObj');
      this.updObj.show();
	  if(this.name == 'soccerR9' || this.name == 'soccerToto'){
		  if(this.matchWrapObj){
			// this.matchWrapObj.removeClass('centerWrap');  
		  }
	  }else{
		  if(this.matchListObj){
			// this.matchListObj.removeClass('centerWrap');
		  }
	  }
	  if(this.navObj.css('display') != 'none'){
		 // this.showNav();  
	  }
    }
  }

  sportterySoccer.showDDGG = function(obj,type){
    obj.siblings().removeClass('on');
    obj.addClass('on');
    if(type == "dd"){
      this.ddObj.show();
      this.ggObj.hide();
      this.checkedDD();
    }else if(type == "gg"){
      this.ddObj.hide();
      this.ggObj.show();
    }
    this.createBonusOptBottom(this.ddDetailObj,1);
    
  }

  sportterySoccer.showMatchList = function(obj){
    if(obj.hasClass('showObj')){
      obj.find(".showtipsObj").removeClass('trans');
      obj.next().hide();
      obj.removeClass('showObj');
    }else{
      obj.next().show();
      obj.find(".showtipsObj").addClass('trans');
      obj.addClass('showObj');
	 
    }
  }

  sportterySoccer.showDDDom = function(){
    if(this.ddDetailObj.hasClass('showObj')){
      this.createBonusOptBottom(this.ddDetailObj,0);
      this.ddDetailObj.removeClass('showObj');
      this.removeBgLayer();
      this.ddDetailObj.hide();
      
    }else{
      this.ddDetailObj.addClass('showObj');
      this.ddDetailObj.show();
	  if(this.bonusDeilObj){
      	this.bonusDeilObj.hide();
	  }
      this.hideMultiple();
      this.addBgLayer(this.ddDetailObj);
	  if(this.bonusOpt){
		 this.createBonusOptBottom(this.ddDetailObj,1); 
	  }
    }
    this.checkedDD();  
  }
  
  sportterySoccer.createBonusOptBottom = function(obj,type){
    var objHeight = obj.height();
    var bonusOptBottom = 55;
	if(this.bonusOpt){
		this.bonusOpt.css({
		  "bottom" : (type===1 ? (bonusOptBottom+objHeight)+"px" : "55px")
		});
	}
  }

  sportterySoccer.showOtherGG = function(obj){
    if(obj.hasClass('showObj')){
      obj.removeClass('showObj');
      obj.children('em').removeClass('trans');
      this.otherGGObj.parent().hide();
    }else{
      obj.addClass('showObj');
      obj.children('em').addClass('trans');
      this.otherGGObj.parent().show();
    }
  }

  sportterySoccer.showLotteryInfo = function(){
    if((this.noDanGuanVal>0 && this.betNum>=this.betMinMatch) || (this.noDanGuanVal==0 && this.betNum>0)){
      this.betOneTipsObj.hide();
      this.lotteryInfoObj.show();
      return true;
    }

    this.betOneTipsObj.show();
    this.lotteryInfoObj.hide();
    this.ddDetailObj.hide();
    this.ddDetailObj.removeClass('showObj');
    this.removeBgLayer();
    this.hideMultiple();
	
  }

  sportterySoccer.showMultiple = function(){
    if(this.multipleObj.hasClass('showObj')){
      this.hideMultiple();
	  if(this.bonusOpt){
		 this.createBonusOptBottom(this.multipleObj,0); 
	  }
    }else{
      this.ddDetailObj.hide();
      this.ddDetailObj.removeClass('showObj');
	  if(this.bonusDeilObj){
      	this.bonusDeilObj.hide();
	  }
      this.removeBgLayer();
      this.multipleObj.addClass('showObj').show();
      this.addBgLayer(this.multipleObj);
	  if(this.bonusOpt){
		  this.createBonusOptBottom(this.multipleObj,1); 
	  }
	  this.checkTipsShow = true;
    }
  }

  sportterySoccer.hideMultiple = function(){
    if(!this.multipleVal){
    	this.multipleVal = 1;
	this.getMoney();
    }
    this.multipleValObj.html(this.multipleVal+'倍');
    this.multipleObj.removeClass('showObj');
    this.multipleObj.hide();
    this.removeBgLayer();
  }

  sportterySoccer.removeBgLayer = function(){
    if($('#soccerMix_bgLayer').length){
      $('#soccerMix_bgLayer').remove(); 
	  if(this.bonusOpt){
	    this.bonusOpt.css({'bottom':'55px'})  	
	  }
    }
  }

  sportterySoccer.addBgLayer = function(layer){
    var bg = '<div style="width:100%;height:100%;background:transparent;position:absolute;left:0;top:0;z-index:98" id="soccerMix_bgLayer"></div>';
    if($('#soccerMix_bgLayer').length == 0){
      $(this.lotteryObj).append(bg);
      $('#soccerMix_bgLayer').css({'height':document.documentElement.scrollHeight || document.body.scrollHeight})
      $('#soccerMix_bgLayer').tap(function(){
       if(sportterySoccer.bonusOpt){
	 sportterySoccer.createBonusOptBottom(layer,0);
       }
        layer.removeClass('showObj').hide();
        $('#soccerMix_bgLayer').remove();
	
      })
    }
  }

  sportterySoccer.showNav = function(){
    if(this.navObj.hasClass('showObj')){
      this.navObj.removeClass('showObj');
      this.navObj.hide();
      this.removeBgLayer();
    }else{
      this.navObj.addClass('showObj');
      this.navObj.show();
      this.addBgLayer(this.navObj);
	  if(this.updObj && this.updObj.length > 0){
		  if(this.updObj.css('display') != 'none'){
			  var btn = this.lotteryObj.find('span[data-t=showUpd]');
			  this.showUpd(btn);
		  }
	  }
    }
  }

  sportterySoccer.showBet = function(obj){
    this.temScrollTop = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;
    var thisO = obj.attr("data-o");
    if(this.spTemData[thisO]){
      if(sportterySoccer.betData[thisO]){
        sportterySoccer.temBetData = sportterySoccer.cloneArr(sportterySoccer.betData[thisO]);
      }
      sportterySoccer.temBetNum = sportterySoccer.betNum;
      sportterySoccer.temNoDanGuanVal = sportterySoccer.noDanGuanVal;

      this.createSpDom(thisO);
      return false;
    }
    var postData = {
    	'lotteryType': this.showBetLotteryType,
    	'oid': thisO
    }
    var secretData = {
    	'para': Global.encrypt(postData)
    }
//  console.log(postData)
    $.ajax({
	  url : ConfigObj.localSite +  '?version=1&m=Lottery.Schedule.getOddsByOid',
      data : secretData,
      type : "post",
      dataType : "json",
      success : function(msg){
      	
		//console.log('竞彩足球其他玩法赔率',msg);
        if(!msg || !msg.info)return false;
        msg.info = $.parseJSON(Global.crypt(msg.info));
//      console.log(msg)
        var data = msg['info'][0];
        if(data.oid != thisO)return false;

        if(Number(msg.code) != 0){
          $.alertMsg(msg.str);
          return false;
        }
        if(sportterySoccer.betData[thisO]){
          sportterySoccer.temBetData = sportterySoccer.cloneArr(sportterySoccer.betData[thisO]);
        }
        sportterySoccer.temBetNum = sportterySoccer.betNum;
        sportterySoccer.temNoDanGuanVal = sportterySoccer.noDanGuanVal;

        sportterySoccer.spTemData[thisO] = data;
        sportterySoccer.createSpDom(thisO);
      }
    });
  }

  sportterySoccer.subBet = function(){
    this.temBetData = new Array();
    this.temBetNum = 0;
    this.temNoDanGuanVal = 0;

    this.matchListObj.show();
    this.betspObj.hide();
  }

  sportterySoccer.hideBet = function(obj){
//	console.log(obj)
    window.scroll(0,this.temScrollTop)
    var thisO = obj.attr("data-o");
    if(this.temBetData.length){
      this.betData[thisO] = this.cloneArr(this.temBetData);
    }else{
      if(this.betData[thisO])delete this.betData[thisO];
    }
    this.betNum = this.temBetNum;
    this.noDanGuanVal = this.temNoDanGuanVal;

    this.temBetData = new Array();
    this.temBetNum = 0;
    this.temNoDanGuanVal = 0;

    this.showLotteryInfo();
    this.createBetMatchHtml();
    this.deleteGGData();
    this.createGGDom();
    this.resetDD();
    this.createGGDoor();
    // this.createDDDoor();
    this.setBetNum(thisO);
    this.updateBetStyle(thisO);

    // this.matchListObj.show();
    this.betspObj.hide();
  }

  sportterySoccer.updateBetStyle = function(o){
    var betDomODivObj = this.matchListObj.find("div[data-o='"+o+"']");
    if(!betDomODivObj.length)return false;
    for(var i=0,ilen=this.betVal.length;i<ilen;i++){
      var betDomObj = betDomODivObj.find("div[data-i='"+i+"']");
      if(!betDomObj.length)continue;
      for(var k=0,klen=this.betVal[i].length;k<klen;k++){
        var betObj = betDomObj.children('div').filter('[data-k="'+k+'"]');
        if(this.betData[o] && this.betData[o][1] && this.betData[o][1][i] &&this.betData[o][1][i][k]){
          betObj.addClass('selected');
        }else{
          betObj.removeClass('selected');
        }
      }
    }
  }

  sportterySoccer.selectBet = function(obj){
    var checkSelect = false;
    var thisParentObj =obj.parent();
    var thisGrandpaObj = thisParentObj.parent();
    var thisOId = thisGrandpaObj.attr("data-o");
    if(!this.betData[thisOId] && this.betNum >=15){
      $.alertMsg("最多只能选择15场比赛");
      return false;
    }
    if(obj.hasClass('selected')){
      obj.removeClass('selected');
    }else{
      obj.addClass('selected');
      checkSelect = true;
    }

    var thisName = thisGrandpaObj.attr("data-n").split(",");
    var thisP = thisGrandpaObj.attr("data-p").split(",");
    var thisI = thisParentObj.attr("data-i");
    var thisSp = thisParentObj.attr("data-s").split(",");
    var thisQ = thisParentObj.attr("data-q");
    var thisKey = obj.attr("data-k");
    var isDG = thisParentObj.attr("data-dg");

    this.createData(thisOId,thisName,thisP,thisI,thisKey,thisSp,thisQ,isDG,checkSelect);
  }

  sportterySoccer.betSpSelect = function(obj){
    if(obj.hasClass('selected')){
      obj.removeClass('selected');
    }else{
      obj.addClass('selected');
    }

    this.ddSelect(obj);
  }

  sportterySoccer.createData = function(o,n,p,i,k,s,q,d,c){
    if(c){
      if(!this.betData[o])this.betNum += 1;
      if(!this.betData[o])this.betData[o] = new Array();
      if(!this.betData[o][0])this.betData[o][0] = o;//oid
      if(!this.betData[o][1])this.betData[o][1] = new Array();//key
      if(!this.betData[o][1][i] && (d=="0" || !d))this.noDanGuanVal++;
      if(!this.betData[o][1][i])this.betData[o][1][i] = new Array();//key
      if(!this.betData[o][2])this.betData[o][2] = new Array();//sp
      if(!this.betData[o][2][i])this.betData[o][2][i] = s//sp
      if(!this.betData[o][3])this.betData[o][3] = new Array();//num
      if(!this.betData[o][3][i])this.betData[o][3][i] = 0;//num
      if(!this.betData[o][4])this.betData[o][4] = 0;//allnum
      if(!this.betData[o][5])this.betData[o][5] = n[0];//homename
      if(!this.betData[o][6])this.betData[o][6] = n[1];//awayname
      if(p[0] && !this.betData[o][7])this.betData[o][7] = p[0];//homep
      if(p[1] && !this.betData[o][8])this.betData[o][8] = p[1];//awayp
      if(!this.betData[o][9])this.betData[o][9] = false;
      if(!this.betData[o][10])this.betData[o][10] = q ? q : 0;  
	  if(!this.betData[o][11])this.betData[o][11] = new Array();
      if(!this.betData[o][11][i])this.betData[o][11][i] = d;


      this.betData[o][1][i][k] = this.betVal[i][k];
      this.betData[o][3][i] += 1;
      this.betData[o][4] +=1;
    }else{
      delete this.betData[o][1][i][k];
      this.betData[o][3][i] -= 1;
      this.betData[o][4] -= 1;

      if(this.betData[o][3][i] == 0){
        delete this.betData[o][1][i];
        if(d=="0" || !d)this.noDanGuanVal--;
      }

      if(this.betData[o][4] === 0){
        this.betNum -= 1;
        delete this.betData[o];
      }
    }
    this.setBetNum(o);
  }

  sportterySoccer.createGGDoor = function(){
    var temGGData = new Array();
    for(var i=0,ilen=this.ggSelectData.length;i<ilen;i++){
      if(this.noDanGuanVal>0 && this.ggSelectData[i] == "1_1"){
        this.deleteGGData("1_1");
        continue;
      }
      if(this.ggSelectData[i])temGGData.push(this.ggSelectData[i]);
    }
	if(this.bonusOpt){
    	this.bonusOpt.hide()
	}
    if(temGGData.length>0){
      var firstGGArr = temGGData[0].split("_");
      this.ggdoorObj.html('<span class="fontblue">'+this.ggMode[firstGGArr[0]][temGGData[0]]+(temGGData.length>1 ? '...' : '')+'</span><span class="num_dot">'+this.betNum+'</span>');
      var arg=/_1$/;
      for(var i=0,ilen=temGGData.length;i<ilen;i++){
        if(!arg.test(temGGData[i]))break;
      }
      if(i==ilen && this.getDanNum()<1){
		if(this.bonusOpt){
        	this.bonusOpt.show();
		}
      }
    }else{
      var maxGGVal = this.getMaxGGVal();
      if(!this.ggMode[maxGGVal])return true;
      this.ggdoorObj.html('<span class="fontblue">'+this.ggMode[maxGGVal][maxGGVal+'_1']+'</span><span class="num_dot">'+this.betNum+'</span>');
      if(!(this.noDanGuanVal>0 && maxGGVal == "1") && this.getDanNum()<1){
		  if(this.bonusOpt ){
			  this.bonusOpt.show();
		  }
	  }
    }

    this.ddTitleObj.html('已选'+this.betNum+'场【设胆】');
  }

  sportterySoccer.createGGDom = function(){
    var maxGGVal = this.getMaxGGVal();
    var ggTitleHtml = [];
    var ggOtherHtml = [];
    for(var g in this.ggMode){
      if(g>maxGGVal)break;
      ggTitleHtml.push(this.createGGOneHtml(this.ggMode[g]));
      ggOtherHtml.push(this.createGGOtherHtml(this.ggMode[g]));
    }
    this.oneGGObj.html(ggTitleHtml.join(""));
    var ggOtherHtmlStr = ggOtherHtml.join("");
    if(ggOtherHtmlStr){
      this.showOtherGGObj.show();
    }else{
      this.showOtherGGObj.hide();
    }
    this.otherGGObj.html(ggOtherHtmlStr);
  }

  sportterySoccer.createGGOneHtml = function(ggData){
    var html = [];
    var arg=/_1$/;
    if(this.ggSelectData.length){
      var thisGGData = this.ggSelectData;
    }else if(this.ggMode[this.getMaxGGVal()] && this.ggMode[this.getMaxGGVal()][this.getMaxGGVal()+"_1"]){
      var thisGGData = [this.getMaxGGVal()+"_1"];
    }else{
      var thisGGData = "";
    }
    for(var k in ggData){
      if(this.noDanGuanVal>0 && k=="1_1")continue;
      var thisClass = "";
      if(!this.ggSelectData.length && thisGGData[0]== k){
        thisClass = ' class="selected"';
      }else if(this.ggSelectData.length && $.inArray(k,this.ggSelectData) > -1){
        thisClass = ' class="selected"';
      }
      if(arg.test(k))html.push('<span'+thisClass+' data-t="gg" data-v="'+k+'">'+ggData[k]+'<em class="statebg"></em></span>');
    }
    return html.join("");
  }

  sportterySoccer.createGGOtherHtml = function(ggData){
    var html = [];
    var arg=/_1$/;
    for(var k in ggData){
      if(!arg.test(k))html.push('<span'+($.inArray(k,this.ggSelectData) > -1 ? ' class="selected"' : '')+' data-t="gg" data-v="'+k+'">'+ggData[k]+'<em class="statebg"></em></span>');
    }
    return html.join("");
  }

  sportterySoccer.getMaxGGVal = function(){
    if(this.maxModeLimite.length == 1) return (this.maxModeLimite[0] > this.betNum ? this.betNum : this.maxModeLimite[0]);
    var minVal = eval("Math.max("+this.maxModeLimite.join(",")+")");

    for(var o in this.betData){
      if(!this.betData[o] || !this.betData[o][3])continue;
      for(var i=0,ilen=this.betData[o][3].length;i<ilen;i++){
        if(this.betData[o][3][i] && minVal > this.maxModeLimite[i]){
          minVal = this.maxModeLimite[i];
        }
      }
    }
    return minVal > this.betNum ? this.betNum : minVal;
  }

  sportterySoccer.createDDDom = function(){
    var html = [];
    for(var o in this.betData){
		////console.log(this.betData[o]);
      if(!this.betData[o])continue;
      if(!this.betData[o][1])continue;
      if(!this.betData[o][1].length)continue;
      html.push(this.createTitleDDDom(o));
      for(var i=0,ilen=this.betData[o][1].length;i<ilen;i++){
        if(!this.betData[o][3][i])continue;
        switch(i){
          case 0 : html.push(this.createWDLDDDom(o,i));break;//胜平负
          case 1 : html.push(this.createRWDLDDDom(o,i));break;//
          case 2 : html.push(this.createTotalGoalsDDDom(o,i));break;//总进球
          case 3 : html.push(this.createHalfFullDDDom(o,i));break;//半全场
          case 4 : html.push(this.createScoreDDDom(o,i));break;//比分
        }
      }
      html.push(this.createfootDDDom(o));
    }
	////console.log(html.join(""));
    this.ddObj.html(html.join(""));
  }

  sportterySoccer.createTitleDDDom = function(o){
    return "";
  }

  sportterySoccer.createWDLDDDom = function(o,i){
    return "";
  }

  sportterySoccer.createRWDLDDDom = function(o,i){
    return "";
  }

  sportterySoccer.createTotalGoalsDDDom = function(o,i){
    return "";
  }

  sportterySoccer.createHalfFullDDDom = function(o,i){
    return "";
  }

  sportterySoccer.createScoreDDDom = function(o,i){
    return "";
  }

  sportterySoccer.createfootDDDom = function(o){
    return "";
  }

  sportterySoccer.createSpDom = function(o){
    var html =[];
    html.push(this.createTitleSpDom(o));
    html.push(this.createWDLSpDom(o));
    html.push(this.createRWDLSpDom(o));
    html.push(this.createTotalGoalsSpDom(o));
    html.push(this.createHalfFullSpDom(o));
    html.push(this.createScoreSpDom(o));
    html.push(this.createFootSpdom(o));
    this.betspObj.html(html.join(""));
    // this.matchListObj.hide();
    var clientHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
	////console.log(clientHeight);
    if(this.betspObj.length)this.betspObj.css("height",clientHeight+100+"px");
	////console.log(this.betspObj.height());
    this.betspObj.css("display","");
  }

  sportterySoccer.createTitleSpDom = function(o){
    return "";
  }

  sportterySoccer.createWDLSpDom = function(o){
    return "";
  }

  sportterySoccer.createRWDLSpDom = function(o){
    return "";
  }

  sportterySoccer.createTotalGoalsSpDom = function(o){
    return "";
  }

  sportterySoccer.createHalfFullSpDom = function(o){
    return "";
  }

  sportterySoccer.createScoreSpDom = function(o){
    return "";
  }

  sportterySoccer.createFootSpdom = function(o){
    return "";
  }

  sportterySoccer.createDDDoor = function(){
    //var ddNum = this.getDanNum();
    //this.ddTitleObj.html('已选'+ddNum+'场【设胆】');
  }

  sportterySoccer.herfFilter = function(){
	  var self = this;
	  if(self.lotteryType == 'BSKFH'){
		 basketFilterObj.goBack = function(){
			 basketFilterObj.destroy();
			 sportterySoccer.show();  
		  }
		  basketFilterObj.show('reload',function(){
			  basketFilterObj.setData({
				 lotteryType : sportterySoccer.lotteryType,
				 lotteryNo : sportterySoccer.lotteryNo,
				 type : ''
			  })
		  }) 
	  }else{
		  sportteryFilterObj.goBack = function(){
			 sportteryFilterObj.destroy();
			 sportterySoccer.show();  
		  }
		  sportteryFilterObj.show('reload',function(){
			  sportteryFilterObj.setData({
				 lotteryType : sportterySoccer.lotteryType,
				 lotteryNo : sportterySoccer.lotteryNo,
				 type : self.manner == 2 ? '2x1' : 'soccerMix',
			  })
		  })
	  }
  }

  sportterySoccer.getMinGGVal = function(){
    if(this.betNum == 0)return 0;
    if(!this.ggSelectData.length)return this.betNum;
    var minGG = Number(this.ggSelectData.sort(function(a,b){
      var aVal = Number(a.split("_")[0]);
      var bVal = Number(b.split("_")[0]);
      return aVal - bVal;
    })[0].split("_")[0]);
    return minGG;
  }

  sportterySoccer.getDanNum = function(){
    var ddNum = 0;
    for(var o in this.betData){
      if(this.betData[o] && this.betData[o][9])ddNum++;
    }
    return ddNum;
  }

  sportterySoccer.resetDD = function(){
    if(this.betNum == 0)return true;
    var minGGVal = this.getMinGGVal();
    var ddNum = this.getDanNum();

    if(ddNum > minGGVal-1){
      for(var o in this.betData){
        if(this.betData[o] && this.betData[o][9])this.betData[o][9]=false;
      }
    } 

    this.createDDDom();
    this.createDDDoor();
	if(ddNum > 0 && this.bonusOpt){
		this.bonusOpt.hide();	
	}
  }

  sportterySoccer.checkedDD = function(){
    if(this.betNum == 0)return true;
    var minGGVal = this.getMinGGVal();
    var ddNum = this.getDanNum();

    var ddDivObj = this.ddObj.children('div');
    for(var i=0,ilen=ddDivObj.length;i<ilen;i++){
      var ddSpanObj = ddDivObj.eq(i).find('span[data-t="dd"]');
      var thisO = ddSpanObj.attr("data-o");
      if(this.betData[thisO][9])continue;
      if(ddNum >= minGGVal-1){
        ddSpanObj.addClass('disable');
      }else{
        ddSpanObj.removeClass('disable');
      }
    }
	if(ddNum > 0 && this.bonusOpt){
		this.bonusOpt.hide();	
	}
  }

  sportterySoccer.deleteOneSelect = function(obj){
    var thisOId = obj.attr("data-o");
    var betDomODivObj = this.matchListObj.find("div[data-o='"+thisOId+"']");
    for(var i=0,ilen=this.betData[thisOId][1].length;i<ilen;i++){
      if(!this.betData[thisOId][1][i])continue;
      var betDomObj = betDomODivObj.find("div[data-i='"+i+"']");
      if(betDomObj.length){
        var betListObj = betDomObj.children('div');
        for(var k=0,klen=betListObj.length;k<klen;k++){
          if(betListObj.eq(k).hasClass('selected'))betListObj.eq(k).removeClass('selected');
        }
        var thisDG = betDomObj.attr("data-dg");
        if(thisDG=="0" || !thisDG)this.noDanGuanVal--;
      }else{
        var keyVal = {2:"FTJQS",3:"FTBQC",4:"FTBF"};
        var thisData = this.spTemData[thisOId];
        if(!thisData['danGuan'][keyVal[i]])this.noDanGuanVal--;
      }
    }

    delete this.betData[thisOId];
    this.betNum -= 1;
    this.showLotteryInfo();
    this.createBetMatchHtml();
    this.deleteGGData();
    this.createGGDom();
    this.resetDD();
    this.createGGDoor();
    // this.createDDDoor();
    this.setBetNum(thisOId);
    this.createBonusOptBottom(this.ddDetailObj,1);
  }

  sportterySoccer.ddSelect = function(obj){
    var thisK = obj.attr("data-k");
    var thisOId = obj.parent().attr("data-o");
    var thisI = obj.parent().attr("data-i");
    var betDomODivObj = this.matchListObj.find("div[data-o='"+thisOId+"']");
    var betDomObj = betDomODivObj.find("div[data-i='"+thisI+"']");
    if(!betDomObj.length){
      var thisD = obj.parent().attr("data-dg");
      this.createData(thisOId,"","",thisI,thisK,"","",thisD,false);
    }else{
	  if(this.manner == 2){   //zhangw modify
		var betObj = betDomObj.find('.item');
	  }else{
      	var betObj = betDomObj.children('div').filter("[data-k='"+thisK+"']");
	  }
      this.selectBet(betObj);
    }
    this.showLotteryInfo();
    this.createBetMatchHtml();
    this.deleteGGData();
    this.createGGDom();
    this.resetDD();
    this.createGGDoor();
    // this.createDDDoor();
    this.createBonusOptBottom(this.ddDetailObj,1);
  }

  sportterySoccer.setDD = function(obj){
    var thisOId = obj.attr("data-o");
    if(obj.hasClass('disable'))return true;
    if(obj.hasClass('on')){
      obj.removeClass('on');
      this.betData[thisOId][9] = false;
    }else{
      obj.addClass('on');
      this.betData[thisOId][9] = true;
    }
  }

  sportterySoccer.setGG = function(obj){
    var thisV = obj.attr("data-v");
    if(obj.hasClass('selected')){
      obj.removeClass('selected');
      this.deleteGGData(thisV);
    }else{
//    console.log(this.oneGGObj)
      var ggObj = this.oneGGObj.children('span').add(this.otherGGObj.children('span'));
      this.ggSelectData = new Array();
      for(var i=0,ggNum=0,ilen=ggObj.length;i<ilen;i++){
        if(ggObj.eq(i).hasClass('selected')){
          this.ggSelectData.push(ggObj.eq(i).attr("data-v"));
          ggNum++;
        }
      }
      // for(var i=0,ggNum=0,ilen=this.ggSelectData.length;i<ilen;i++){
      //   if(this.ggSelectData[i])ggNum++;
      // }
      if(ggNum>=5){
        $.alertMsg("过关方式不能超过5个");
        return false;
      }
      obj.addClass('selected');
      this.ggSelectData.push(thisV);
    }

  }

  sportterySoccer.deleteGGData = function(thisV){
    var temGGData = [];
    for(var i=0,ilen=this.ggSelectData.length;i<ilen;i++){
      if(thisV && this.ggSelectData[i] == thisV)continue;
      var ggArr = this.ggSelectData[i].split("_");
      if(this.betNum < Number(ggArr[0]))continue;
      temGGData.push(this.ggSelectData[i]);
    }
    this.ggSelectData = temGGData;
  }

  sportterySoccer.setM = function(obj){
    var thisM = Number(obj.attr("data-v"));
    this.multipleVal = thisM;
    this.multipleValObj.html(this.multipleVal+'倍');
  }

  sportterySoccer.addM = function(obj){
	if(this.checkTipsShow){
      this.multipleVal = 0;
      this.checkTipsShow = false;
    }
    var thisM = obj.attr("data-v");
    var thisS = this.multipleValObj.attr("data-newS");
    if(thisS=="1"){
      var newMultiple =  Number(thisM);
      this.multipleValObj.attr("data-newS","0");
    }else{
      var newMultiple = Number(this.multipleVal + "" + thisM);
    }
   
    if(newMultiple>10000){
      newMultiple=10000;
    }
    this.multipleVal = newMultiple;
    this.multipleValObj.html(this.multipleVal+'倍');
  }

  sportterySoccer.delM = function(obj){
    this.multipleVal = Number(this.multipleVal.toString().slice(0,-1));
    this.multipleValObj.html(this.multipleVal+'倍');
  }

  sportterySoccer.subM = function(obj){
    if(this.multipleVal == 0)this.multipleVal = 1;
    this.multipleValObj.html(this.multipleVal+'倍');

    this.hideMultiple();
    this.createBonusOptBottom(this.multipleObj,1);
  }

  sportterySoccer.createGGData = function(){
    var ggObj = this.oneGGObj.children('span').add(this.otherGGObj.children('span'));
    var ggArr = new Array();
    for(var i=0,ilen=ggObj.length;i<ilen;i++){
      if(ggObj.eq(i).hasClass('selected')){
        ggArr.push(ggObj.eq(i).attr("data-v"));
      }
    }
    return ggArr;
    // if(this.ggSelectData.length){
    //   return this.ggSelectData;
    // }else if(this.ggMode[this.getMaxGGVal()] && this.ggMode[this.getMaxGGVal()][this.getMaxGGVal()+"_1"]){
    //   return [this.getMaxGGVal()+"_1"];
    // }else{
    //   return "";
    // }
  }

  sportterySoccer.updateLotteryType = function(obj){
    var thisV = obj.attr("data-v");
    switch(thisV){
      case "spf" : sportterySoccer.goSoccerMix();return true;
      case "2x1" : sportterySoccer.goSoccer2x1();return true;
    }
  }
  
  sportterySoccer.goSoccerMix = function(){
	 if(this.manner != 2){
	 	this.updObj.hide();  
	 }else{
		soccer2x1Obj.destroy();
		soccerMixObj.goBack = function(){
			soccerMixObj.destroy();
			homeObj.show('reload');	
		}
		soccerMixObj.show('reload',function(){
			soccerMixObj.getData();
		})
	 }  
  }
  
  sportterySoccer.goSoccer2x1 = function(){
	 if(this.manner == 2){
	 	this.updObj.hide();  
	 }else{
		soccerMixObj.destroy();
		soccer2x1Obj.goBack = function(){
			soccer2x1Obj.destroy();
			homeObj.show('reload');	
		}
		soccer2x1Obj.show('reload',function(){
			soccer2x1Obj.getData();
		})
	 }  
  }
  

  sportterySoccer.checkSelect = function(o,i,k){
    if(!this.betData[o])return false;
    if(!this.betData[o][1])return false;
    if(!this.betData[o][1][i])return false;
    if(!this.betData[o][1][i][k])return false;
    return true;
  }

  sportterySoccer.setBetNum = function(o){
    var showbetObj = this.matchListObj.find("div[data-t='showBet'][data-o='"+o+"']");
    if(!showbetObj.length)return true;
    var betNum = this.getTipsBetNum(o);
    if(betNum){
      showbetObj.html('<p class="selected"><span class="font12">已选</span><span>'+this.betData[o][4]+'</span></p>');
    }else{
      showbetObj.html('<p><span>+</span><span class="font12 gray">玩法</span></p>');
    }
  }

  sportterySoccer.getTipsBetNum = function(o){
    var num = 0;
    if(!this.betData[o])return num;
    if(!this.betData[o][3])return num;
    for(var i=2,ilen=this.betData[o][3].length;i<ilen;i++){
      if(!this.betData[o][3][i])continue;
      num+=this.betData[o][3][i];
    }
    return num;
  }

  sportterySoccer.createBetMatchHtml = function(){
    if(this.betNum>0){
      this.betOneTipsObj.html('<p class="center">至少选择'+this.betMinMatch+'场比赛</p>');
    }else{
      this.betOneTipsObj.html(this.betOneTipsText);
    }
  }

  sportterySoccer.getMoney = function(){
    ////console.log(this.createGGData());
    sportteryBonus.getMoney(this.createGGData(),this.betData,this.multipleVal);
  }

  sportterySoccer.createWargeData = function(){
    var postData = [];
//  console.log(this.betData)
    for(var o in this.betData){
      if(!this.betData[o])continue;
      if(!this.betData[o][1])continue;
      var prssData = [];
      for(var i=0,ilen=this.betData[o][1].length;i<ilen;i++){
        if(!this.betData[o][1][i])continue;
        var betData = [];
        for(var k=0,klen=this.betData[o][1][i].length;k<klen;k++){
//      	console.log(this.betData[o][1])
          if(this.betData[o][1][i][k])betData.push(this.betData[o][1][i][k]);
        }
        prssData.push(this.postDataKey[i]+"@"+betData.join(","));
      }
      postData.push(o+":"+prssData.join("+"));
    }
    return postData.join(";");
  }

  sportterySoccer.createOidData = function(){
    var oidArr = [];
    for(var o in this.betData){
      if(this.betData[o] && this.betData[o][4])oidArr.push(o);
    }
    return oidArr.join(",")
  }

  sportterySoccer.createDDOidData = function(){
    var oidArr = [];
//  console.log(this.betData)
    for(var o in this.betData){
      if(this.betData[o] && this.betData[o][4] && this.betData[o][9])oidArr.push(o);
    }
    return oidArr.join(",")
  }

  sportterySoccer.createSubData = function(){
    var zhushuData = window.getBonusData();
    return {
      lotteryType : this.lotteryType,
      lotteryNo  : this.lotteryNo,
      playType : "combin",
      passType : this.createGGData().join(","),
      wagerCount : zhushuData['zhushuVal'],
      wagerMultiple : this.multipleVal,
      matches  : this.createWargeData(),
      matchOrder  : this.createOidData(),
      absMatchOrder : this.createDDOidData(),
      minHit : "",
      maxHit : "", 
      openType  : 'open',
      money : zhushuData['moneyVal']*this.multipleVal,
      source : "common",
      manner : this.manner ? this.manner : 0,
	  consignType : 'alone',     //  购买：alone  保存：save
    }
  }

   /* -------------------------------------- app版本交易流程 ------------------------------------- */
  sportterySoccer.submitBet = function(){
    var postData = this.createSubData();
    if(postData.wagerCount>this.maxZS){
      $.alertMsg("单笔最大支持"+Math.floor(this.maxZS/10000)+"万注");
      return false;
    }else if(postData.money>this.maxMoney){
       $.alertMsg("单笔最大支持"+Math.floor(this.maxMoney/10000)+"万元");
       return false;
    }else if(postData.passType === ""){
      $.alertMsg("请选择过关方式");
      return false;
    }else if(postData.wagerMultiple > this.maxMul){
	  $.alertMsg("最大倍数" + this.maxMul+ '倍');
      return false; 	
	}else if(postData.wagerMultiple == 0){
	  $.alertMsg("最小倍数" + 1 + '倍');
      return false; 	
	}
	
	var self = this;
	if(loginObj.isLogin){   // 已经登录的情况，先生成pid,用pid去跳转到收银台。 createPid()->buyFun()-> 
		self.createPid();
	}else{                    //未登录，先生成wid,用wid生成pid, 用pid跳转收银台  
		self.createWid();  //createWid()-> afterLoginCreatePid()-> buyFun() -> 
	}
    Global.pv('zuodan', {lotteryType: sportterySoccer.lotteryType});
  }
  
  //生成product_id ,跳转到支付确认页[buyConfirm | payConfirm]
  sportterySoccer.createPid = function(type){
  	
	  var postData = this.createSubData();

	  console.log(postData);
		postData.channel_number = ConfigObj.zdid;
	  var secretData = {
	  	'para': Global.encrypt(postData),
	  	'access_token': loginObj.access_token
	  }
    console.log(secretData.para)
	  var self = this;
	  $.ajax({
		  url : ConfigObj.localSite +  '?version=1&m=lottery.lottery.sportteryprocess',
		  data : secretData,
		  dataType : "json",
		  type : "post",
		  success : function(obj){
		  	
		  	console.log(obj);
        if(obj.code == '0000'){
          obj.info = $.parseJSON(Global.crypt(obj.info));
//        console.log('已经登录的情况下做单生成lotteryid', obj);
          var data = {
            'lotteryType': self.lotteryType, 
            'lotteryNo' : self.lotteryNo, 
            'product_id' : obj.info.productId,
            'pay_amount': obj.info.money,
            'assure_amount': -1
          }
          self.pid = obj.info.lotteryId;
          self.buyFun(data);
        }else{
          $.alertMsg(obj.code_str);
        
        }
		  }
    });  
  }
  
  
  /*sportterySoccer.buyFun = function(obj){
	  var product_id = obj.product_id;
	  var typeCn = obj.lotteryTypeCn;
	  $.alertMsg('方案保存成功',true);
	  setTimeout(function(){
		  Global.GC();
		  projectDetailObj.show('reload',function(){
			  projectDetailObj.getData(product_id); 
			  projectDetailObj.pushRoute(function(){
				  Global.backLottery(typeCn);
			  })
		  });
	  },1500)
  }*/
  
   //广东体彩云只是保存 原购买函数暂时注释 zhangw
  sportterySoccer.buyFun = function(obj){
	   var self = this;
	  /*if(ConfigObj.platForm == 'ios'){   //ios平台
		   Global.iosBuy(obj);
	  }else{ */
	 	
		 buyConfirmObj.goBack=function(){
			switch(self.lotteryType){
				case 'FTFH':
					//soccerMixObj.show('reload',function(){
				    //		soccerMixObj.getData(); 
					//});
					if(self.manner == 2){
					    soccer2x1Obj.show();
					}else{
						soccerMixObj.show();   //要求保留选项。
					}
					break;
				case 'SPF14':
					soccerTotoObj.show('reload',function(){
						soccerTotoObj.getData();
					})
					soccerTotoObj.show();
					break;
				case 'SPF9':
					soccerR9Obj.show('reload',function(){
						soccerR9Obj.getData();
					})
					soccerR9Obj.show();
					break;
				default:
					homeObj.show();
					break;
			}
			buyConfirmObj.destroy();	
		}
		var tempFun = function(){
			 buyConfirmObj.setData(obj);  
		}
		setTimeout(function(){
			buyConfirmObj.show('reload', tempFun);
		},300)   //防止未登录流程多页面连续切换，由动画延迟导致的切换问题
	  //}
  };
  
  
  //未登陆情况下的购买(先生成wagerId,再利用wagerId生成lotteryId);
  sportterySoccer.createWid = function(){
	  var self  =  this;
	  var postData = this.createSubData();
	  $.ajax({
		  url : ConfigObj.localSite +  '?version=1&m=lottery.trade.sportteryProcess',
		  data : postData,
		  dataType : "json",
		  type : "post",
		  success : function(obj){
			if(obj.code == '0000'){
				//console.log('未登录的情况下做单生成wagerId', obj);
				self.wid = obj.info.wagerId;
				loginObj.goBack = function(){
					self.show();	
				}
				loginObj.goForward = function(){
					//登录后创建pid
					self.show();
					self.afterLoginCreatePid(self.wid);  	
				}
				registerObj.goForward = function(){	
				}
				$.alertMsg('请先登录');
				loginObj.show();
			}else{
			   loginObj.goBack = function(){
					self.show();   
			   }
			   loginObj.goForward = function(){
					self.show();
					$.alertMsg(obj.code_str);   
			   }
			   registerObj.goForward = function(){
					self.show();
					$.alertMsg(obj.code_str); 
			   }
			   $.alertMsg('请先登录');
			 	loginObj.show();
			}
		  }
    });  
  }
  
  //根据wagerId 生成 lotteryId
  sportterySoccer.afterLoginCreatePid = function(wid){
	 var self = this;
	 var postData = {
		'wagerId': wid,
		'access_token' : loginObj.access_token 
	 }
	 $.ajax({
		  url : ConfigObj.localSite +  '?version=1&m=lottery.trade.buylottery',
		  data : postData,
		  dataType : "json",
		  type : "post",
		  success : function(obj){
			if(obj.code == '0000'){
				//console.log('根据wagerId生成lotteryId', obj);
				self.pid = obj.info.lotteryId;
				var data = {
					'lotteryType': self.lotteryType, 
					'lotteryNo' : self.lotteryNo, 
					'product_id' : obj.info.lotteryId,
					'pay_amount': obj.info.money	
				}
				self.pid = obj.info.lotteryId;
				self.buyFun(data);
			}else{
			   $.alertMsg(obj.code_str);
			}
		  }
    }); 
	  
  }
  
  /* -------------------------------------- app版本交易流程 end ------------------------------------- */

    sportterySoccer.countdownTick = function (endTime) {

        if (window.__sportterySoccerCountdownInterval) clearInterval(window.__sportterySoccerCountdownInterval);

        //console.log('endTime ' + endTime);

        var end = Date.parse(endTime.replace(/-/g, '/')); // end timestamp
        function set() {
            var now = Date.now(); // now timestamp
            if (now >= end) {
                $('#spfLottery_countdown').html('已截止');
               sportterySoccer.lotteryNo = '';
               sportterySoccer.getData();
                clearInterval(window.__sportterySoccerCountdownInterval);
            } else {
                now = now - 1000;
                var interval = (end - now) / 1000; // seconds of interval
                var h = Math.floor(interval / 3600); // hours
                h = h < 10 ? '0' + h : h;
                var m = Math.floor((interval - h * 3600) / 60); // minutes
                m = m < 10 ? '0' + m : m;
                var s = Math.floor(interval - h * 3600 - m * 60); // seconds
                s = s < 10 ? '0' + s : s;
                $('#spfLottery_countdown').html('距离截止' + h + ':' + m + ':' + s);
            }
        }
        window.__sportterySoccerCountdownInterval = setInterval(function () {set();}, 1000);
    },

  //竞彩赛程获取
  sportterySoccer.getData = function(){
	var self = this;
	var postData = {
		'lotteryType' : this.lotteryType,	
		'lotteryNo' : this.lotteryNo ? this.lotteryNo : ''
	}
//	console.log(postData)
	var url = '';
	//console.log(self.lotteryType,self.manner);
	switch(self.lotteryType){
		case 'FTFH':
			if(self.manner == 2){
				url =  ConfigObj.localSite +  '?version=1&m=Lottery.Jczq.jz2x1';
			}else{
				url =  ConfigObj.localSite +  '?version=1&m=Lottery.Jczq.index';	
			}
			break;
		case 'SPF14':
			url =  ConfigObj.localSite +  '?version=1&m=Lottery.zc.spf14';
			break;
		case 'SPF9':
			url = ConfigObj.localSite +  '?version=1&m=Lottery.zc.spf9';
			break;
		case 'BSKFH':
			url = ConfigObj.localSite +  '?version=1&m=Lottery.jclq';
			break;
	}
//	console.log(postData);
	var secretData = {
		'para': Global.encrypt(postData)
	}
//	
	$.ajax({
	  url : url,
      data : secretData,
      type : "post",
      dataType : "json",
      success : function(msg,xhr){
//     var date = new Date( xhr.getResponseHeader("Date"));
//     console.log(date);
		 if(msg == null){     //为什么会为null呢
		 		var html = '<div class="noact center">'+
            				'<p class="mb15"><span class="nomatch_1"></span></p>'+
							'<p class="font14 gray">暂时没有赛程啊~</p>'+
					   '</div>'; 
				 self.matchListObj.html(html);	
				 return false;
		 }
//		 console.log(msg)
		 if(msg.code == '0000'){
			// //console.log(self.lotteryType); lotteryNoList
			msg.info = $.parseJSON(Global.crypt(msg.info));
			console.log('体彩赛程接口',msg)
			if(msg.info.matchList){
				if(self.lotteryType == 'FTFH'){
					self.lotteryNo = msg.info.lotteryNo;
					if(self.manner == 2){   //2选1
						self.format2x1Html(msg.info.matchList);
					}else{
						self.formatMixHtml(msg.info.matchList);
					}
				}else if(self.lotteryType == 'SPF14'){
					$('#soccerToto_desc').html('<span class="gray mr10">第' + msg.info.lotteryNo +'期</span><span class="fontred"><span id="spfLottery_countdown"></span></span>')
					self.lotteryNo = msg.info.lotteryNo;
					self.formatToToHtml(msg.info.matchList);
					self.formatLotListHtml(msg.info.lotteryNoList);
          console.log(msg.info.lotteryNoList)
          if (msg.info.lotteryNoList.length == 1) {
              $('#soccerToto_updObj').find('p').addClass('ace')
          }else if (msg.info.lotteryNoList.length == 2) {
              $('#soccerToto_updObj').find('p').addClass('activ')
            }else{
              $('#soccerToto_updObj').find('p').addClass('acti')

            }

					// 把返回的时间日期格式 05-23 19:30 补齐 
					var now = new Date();
                    var year = now.getFullYear();
                    sportterySoccer.countdownTick(year + '-' + msg.info.endTime + ':00');
				}else if(self.lotteryType == 'SPF9'){
					$('#soccerR9_desc').html('<span class="gray mr10">第' + msg.info.lotteryNo +'期</span><span class="fontred"><span id="spfLottery_countdown"></span></span>')
					self.lotteryNo = msg.info.lotteryNo;
					self.formatToToHtml(msg.info.matchList);
					self.formatLotListHtml(msg.info.lotteryNoList);
          console.log(msg.info.lotteryNoList)
          if (msg.info.lotteryNoList.length == 1) {//soccerToto_updObj
              $('#soccerR9_updObj').find('p').addClass('ace')
          }else if (msg.info.lotteryNoList.length == 2) {
              $('#soccerR9_updObj').find('p').addClass('activ')
            }else{
              $('#soccerR9_updObj').find('p').addClass('acti')

            }
                    // 把返回的时间日期格式 05-23 19:30 补齐
                    var now = new Date();
                    var year = now.getFullYear();
                    sportterySoccer.countdownTick(year + '-' + msg.info.endTime + ':00');
				}else if(self.lotteryType == 'BSKFH'){
					self.lotteryNo = msg.info.lotteryNo;
					self.formatBasketMixHtml(msg.info.matchList);	
				}

			}else{
				var html = '<div class="noact center">'+
            				'<p class="mb15"><span class="nomatch_1"></span></p>'+
							'<p class="font14 gray">暂时没有赛程哦~</p>'+
					   '</div>'; 
				 self.matchListObj.html(html);	
			}
		 }else{
			$.alertMsg(msg.code_str); 
		 }
    }
    });
  }
  
  //篮彩
  sportterySoccer.formatBasketMixHtml = function(obj){
	 //console.log(obj);
	 var html = '';
	 var self = this;
	 if(!obj || obj.length ==0 ) {
		self.matchListObj.html(html);
		return; 
	 } 
	 for(var date in obj){
		 html += '<p class="jzli showObj" data-t="showMatch">'+
					'<span class="gray"><em class="mr10">'+ date + obj[date].week + '</em>' + obj[date].count + '场比赛</span>'+
					'<span class="fr"><em class="arrow trans showtipsObj"></em></span>'+
				 '</p>'+
				 '<div class="jzwrap jzhg_wrap">';
		 if(obj[date].list){
			 for(var i=0;i<obj[date].list.length;i++){
				 var itm = obj[date].list[i];
				html += '<div class="licon clearfix">'+
							'<div class="center gray font12  pt85 w19 fl">'+
								'<p><em class="block" style="background:#'+ itm.bgcolor+ '"></em>'+ itm.leagueName+'</p>'+
								'<p>'+ itm.sno +'</p>'+
								'<p>'+ itm.betEndTime +'截止</p>'+
							'</div>'+
							'<div class="matchcon center w75 fr">'+
								'<p class="jzvs mb10 clearfix">'+
									'<span class="w40"><em class="font12 gray">'+ itm.guest_rank +'</em>'+ itm.guest_name_q +'</span>'+
									'<span class="w19">VS</span>'+
									'<span class="w40">'+ itm.host_name_q + '<em class="font12 gray">'+ itm.host_rank +'</em></span>'+
								'</p>'+
								'<div class="clearfix">'+
									'<div class="vs_info lc_info fl" data-o="'+ itm.oid +'" data-n="'+ itm.homeName+','+ itm.awayName + '" data-p="123,234">';
										// 胜负
										if(itm.stopBuy.BSKSF){
											html += '<div class="match_detail center clearfix">'+
														'<span class="rq">胜负</span>'+
														'<p class="opt_jz vs_none"><span class="font12 gray">未开售</span></p>'+
													'</div>';
										}else{
											html += '<div class="match_detail center clearfix '+  (itm.danGuan.BSKSF ? 'm_single' :'') + '" data-i="0" data-s="'+ itm.mixOdds.BSKSF[1] +','+ itm.mixOdds.BSKSF[0]+ '" '+  (itm.danGuan.BSKSF ? ' data-dg="1"' : '')  + '>'+
														'<span class="rq r_red">胜负</span>'+
														'<div class="opt_jz" data-t="selectBet" data-k="0"><span><em class="font12 gray">客胜</em> '+ itm.mixOdds.BSKSF[1] + '</span></div>'+
														'<div class="opt_jz" data-t="selectBet" data-k="1"><span><em class="font12 gray">主胜</em> '+ itm.mixOdds.BSKSF[0] + '</span></div>'+
													'</div>';
										}
										// 让分胜负  
										if(itm.stopBuy.BSKRFSF){
											html += '<div class="match_detail center clearfix">'+
														'<span class="rq '+  (itm.rq>0 ? 'r_red' : 'r_green') + '">让分</em></span>'+
														'<p class="opt_jz vs_none"><span class="font12 gray">未开售</span></p>'+
													'</div>';
										}else{
											html += '<div class="match_detail center clearfix '+ (itm.danGuan.BSKRFSF ? 'm_single' : '') + '" data-i="1" data-s="'+ itm.mixOdds.BSKRFSF[1]+','+ itm.mixOdds.BSKRFSF[0]+'" data-q="' + itm.rq +'" '+ (itm.danGuan.BSKRFSF ? ' data-dg="1"' : '') +'>'+
														'<span class="rq r3">让分</span>'+
														'<div class="opt_jz" data-t="selectBet" data-k="0"><span><em class="font12 gray">客胜</em> '+ itm.mixOdds.BSKRFSF[1] + '</span></div>'+
														'<div class="opt_jz" data-t="selectBet" data-k="1"><span><em class="font12 gray">主<i class="'+ (itm.rq.indexOf('+') != -1 ? 'fontred' : 'fontgreen')  +'">'+ itm.rq + '</i>胜</em> '+ itm.mixOdds.BSKRFSF[0] +'</span></div>'+
													'</div>';
										}
			
										//  大小分 
										if(itm.stopBuy.BSKDXF){
											html += '<div class="match_detail center clearfix">'+
														'<span class="rq pt2">大小分</span>'+
														'<p class="opt_jz vs_none"><span class="font12 gray">未开售</span></p>'+
													'</div>';
										}else{
											html += '<div class="match_detail center clearfix '+ (itm.danGuan.BSKDXF ? 'm_single' : '') + '" data-i="2" data-s="'+ itm.mixOdds.BSKDXF[0] +','+ itm.mixOdds.BSKDXF[1]+ '" data-q="'+ itm.rq+ '" '+ (itm.danGuan.BSKRFSF ? 'data-dg="1"' : '')+ '>'+
														'<span class="rq r4">大小分</span>'+
														'<div class="opt_jz" data-t="selectBet" data-k="0"><span><em class="font12 gray">大于'+ itm.dxf + '</em> ' + itm.mixOdds.BSKDXF[0] + '</span></div>'+
														'<div class="opt_jz" data-t="selectBet" data-k="1"><span><em class="font12 gray">小于'+ itm.dxf + '</em> ' + itm.mixOdds.BSKDXF[1] + '</span></div>'+
													'</div>';
										}
			
			
										// 胜分差
										if(itm.stopBuy.BSKSFC){
											html += '<div class="match_detail center clearfix">'+
														'<span class="rq pt2">胜分差</span>'+
														'<p class="opt_jz vs_none"><span class="font12 gray">未开售</span></p>'+
													'</div>';
										}else{
											html += '<div class="match_detail lc-score center clearfix ' + ( itm.danGuan.BSKDXF ? 'm_single' : '') + '" data-t="showBet" data-o="'+ itm.oid + '">'+
														'<span class="rq r5">胜分差</span>'+
														'<div class="opt_jz" data-t="showBet" data-o="'+ itm.oid + '"><span>点击选择胜分差</span></div>'+
													'</div>';
										}
				 html +=          '</div>'+
								'</div>'+
							'</div>'+
						'</div>';
			 }
		 }
		 html += '</div>';
		
	 }
	 html += '<div style="height:150px;"></div>';
	 this.matchListObj.html(html);
	 this.pullRefresh();
  }
  
  //任9和14场头部期号列表
  sportterySoccer.formatLotListHtml = function(obj){
	 var self = this;
	 if(obj && obj.length > 0){
		 self.lotArrowObj.show();
		 var html = '';
		 for(var i=0;i<obj.length;i++){
       // html += '<p data-t="changeLotNo" data-v="'+ obj[i] +'" class="'+ (obj[i] == self.lotteryNo ? 'selected' : '')   +'"><span class="botborder">第'+ obj[i]+'期</span><em class="sel-mark"><i class="icon-sm sel-sm"></i></em></p>'
			 html += '<p data-t="changeLotNo" data-v="'+ obj[i] +'" class="'+ (obj[i] == self.lotteryNo ? 'selected' : '')   +'"><span class="botborder">第'+ obj[i]+'期</span></p>'
		 }
		 // console.log(html); showNav
		 self.updObj.html(html)
	 }else{
		 self.lotArrowObj.hide();
		 self.updObj.html(''); 
	 }
  }
  
  //任9和14场头部期号列表 点击切换 
  sportterySoccer.changeLotNo = function(obj){
	  var self = this;
	  self.updObj.find('p').removeClass('selected');
	  obj.addClass('selected');
	  self.updObj.hide();
	  var node = self.lotteryObj.find('span[data-t=showUpd]');
	  self.showUpd(node);
	  self.clearMatch();
	  self.lotteryNo = obj.attr('data-v');
	  self.getData();
  }
  
   //适用于任9和足彩，切换期号时候重置页面
   sportterySoccer.clearMatch = function(){
	   this.setDefConfig();
	   this.showLotteryInfo();
	   this.createBetMatchHtml();
   }
  
  //足彩14赛程|足彩任9
  sportterySoccer.formatToToHtml = function(obj){
  	//console.log(obj);
	 var html = '';
	 var self = this;
	 if(!obj || obj.length ==0 ) {
		self.matchListObj.html('<p class="nomatch">当前无赛程，请稍后再来</p>');
		return; 
	 }
	 for(var i=0;i<obj.length;i++){
		var itm = obj[i];
		//console.log(itm);
		if(itm.odds == "" ){
			itm.odds[0] = "";
			itm.odds[1] = "";
			itm.odds[2] = "";
		}
		html += '<div class="licon clearfix matchObj" data-o="'+ itm.oid + '" data-n="'+ itm.homeName + ','+ itm.awayName + '"'+     'data-p="">'+
				'<div class="center gray font12  pt5 w22 fl">'+
					'<p>第'+ itm.oid + '场</p>'+
					'<p>'+ itm.leagueCnName + '</p>'+
					'<p>'+ itm.matchTime_q + '</p>'+
				'</div>'+
				'<div class="matchcon center w78 fr" data-i="0" data-s="' + itm.odds[0] + ',' +itm.odds[1]+','+ itm.odds[2] +'">'+
					'<div class="item w38 fl" data-t="selectBet" data-k="0">'+
						'<p>'+
							'<span>' + itm.homeName + '</span>'+
							'<span><em class="gray font12">主胜</em>'+ itm.odds[0] + '</span>'+
						'</p>'+
					'</div>'+
					'<div class="item w24 fl" data-t="selectBet" data-k="1">'+
						'<p>'+
							'<span>VS</span>'+
							'<span><em class="gray font12">平</em>'+ itm.odds[1] + '</span>'+
						'</p>'+
					'</div>'+
					'<div class="item w38 fl" data-t="selectBet" data-k="2">'+
						'<p>'+
							'<span>'+ itm.awayName + '</span>'+
							'<span><em class="gray font12">客胜</em>'+ itm.odds[2] + '</span>'+
						'</p>'+
					'</div>'+
				'</div>'+
			'</div>'; 
	 }
	  this.matchListObj.html(html);
	  
	  this.pullRefresh();
  }
  
  sportterySoccer.pullRefresh = function(){
	  var self = this;
	  self.matchListObj.dropload({  //下拉刷新赛程功能
			scrollArea : window,
			distance : self.pullDistance,
			loadUpFn:function(me){
				sportterySoccer.setDefConfig();  //重置数据
				if(sportterySoccer.bonusOpt){
    				sportterySoccer.bonusOpt.hide()
				}
				sportterySoccer.showLotteryInfo();
				sportterySoccer.createBetMatchHtml();
				sportterySoccer.getData();
				me.resetload();
			}
	 })
	  
  }
  
  //竞彩2选1期程html
  sportterySoccer.format2x1Html = function(obj){
	   var html = '';
	  for(var date in obj){
		 html += '<p class="jzli showObj" data-t="showMatch">'+
					'<span class="gray"><em class="mr10">'+ date + obj[date].week + '</em>' + obj[date].count + '场比赛</span>'+
					'<span class="fr"><em class="arrow trans showtipsObj"></em></span>'+
				 '</p>'+
				 '<div class="jzwrap jzhg_wrap">';
		 if(obj[date].list){
			 for(var i in obj[date].list){
				 var itm = obj[date].list[i];
				 html += '<div class="licon clearfix">'+
							'<div class="center gray font12  pt5 w19 fl">'+
								'<p><em class="block" style="background:#'+ itm.bgcolor + '"></em>'+ itm.leagueName + '</p>'+
								'<p>' + itm.sno + '</p>'+
								'<p>' + itm.betEndTime + '截止</p>'+
							'</div>'+
							'<div class="matchcon center w80 fr" data-o="'+ itm.oid + '" data-n="'+ itm.host_name_q+','+ itm.guest_name_q +'" data-p="123,234">';
				if(itm.rq == -1){
					html += '<div data-i="0" data-s="' + itm.mixOdds.FTBRQSPF[0] +',,'+ itm.mixOdds.FTSPF[2] + '" data-q="1">'+
								'<div class="item w50 fl" data-t="selectBet" data-k="0">'+
									'<p>'+
										'<span><em class="gray font12"></em>'+ itm.host_name_q + '</span>'+
										'<span><em class="gray font12">主胜</em>'+ itm.mixOdds.FTBRQSPF[0] + '</span>'+
									'</p>'+
								'</div>'+
							'</div>'+
							'<div data-i="1" data-s="' + itm.mixOdds.FTBRQSPF[0] +',,'+ itm.mixOdds.FTSPF[2] + '" data-q="1">'+
								'<div class="item w50 fl" data-t="selectBet" data-k="2">'+
									'<p>'+
										'<span>'+ itm.guest_name_q + '<em class="gray font12"></em></span>'+
										'<span><em class="gray font12">主不胜</em>'+ itm.mixOdds.FTSPF[2] + '</span>'+
									'</p>'+
								'</div>'+
							'</div>';	
				}else{
					html += '<div data-i="1" data-s="'+ itm.mixOdds.FTSPF[0]+',,'+ itm.mixOdds.FTBRQSPF[2]+ '" data-q="0">'+
								'<div class="item w50 fl" data-t="selectBet" data-k="0">'+
									'<p>'+
										'<span><em class="gray font12"></em>'+ itm.host_name_q + '</span>'+
										'<span><em class="gray font12">主不败</em>'+ itm.mixOdds.FTSPF[0] + '</span>'+
									'</p>'+
								'</div>'+
							'</div>'+
							'<div data-i="0" data-s="'+ itm.mixOdds.FTSPF[0]+',,'+ itm.mixOdds.FTBRQSPF[2]+'" data-q="0">'+
								'<div class="item w50 fl" data-t="selectBet" data-k="2">'+
									'<p>'+
										'<span>'+ itm.guest_name_q + '<em class="gray font12"></em></span>'+
										'<span><em class="gray font12">主败</em>'+ itm.mixOdds.FTBRQSPF[2]+'</span>'+
									'</p>'+
								'</div>'+
							'</div>';	
				}
				html +=     '</div>'+
						'</div>';
			}
		 }
		 html += '</div>';
	  }
	  if(!html){
		  html = '<div class="noact center">'+
            				'<p class="mb15"><span class="nomatch_1"></span></p>'+
							'<p class="font14 gray">暂时没有赛程哦~</p>'+
					   '</div>';   
	  }
      html += '<div style="height:60px;"></div>';
	  this.matchListObj.html(html);
	  this.pullRefresh();
  }
  
  //竞彩期程html
  sportterySoccer.formatMixHtml = function(obj){
	  ////console.log(obj);
	  var html = '';
	  for(var date in obj){
		 html += '<p class="jzli showObj" data-t="showMatch">'+
					'<span class="gray"><em class="mr10">'+ date + obj[date].week + '</em>' + obj[date].count + '场比赛</span>'+
					'<span class="fr"><em class="arrow trans showtipsObj"></em></span>'+
				 '</p>'+
				 '<div class="jzwrap jzhg_wrap">';
		 if(obj[date].list){
			 for(var i=0;i<obj[date].list.length;i++){
				 var itm = obj[date].list[i];
				 html += '<div class="licon clearfix">'+
							'<div class="center gray font12  pt45 w19 fl">'+
								'<p><em class="block" style="background:#'+ itm.bgcolor +  '"></em>'+ itm.leagueName +'</p>'+
								'<p>'+ itm.sno + '</p>'+
								'<p>'+ itm.betEndTime + '截止</p>'+
							'</div>';
				 html += '<div class="matchcon center w75 fr">'+
							'<p class="jzvs mb10 clearfix">'+
								'<span class="w40"><em class="font12 gray"></em>'+ itm.host_name_q + '</span>'+
								'<span class="w19">VS</span>'+
								'<span class="w40">'+ itm.guest_name_q + '<em class="font12 gray"></em></span>'+
							'</p>'+
							'<div class="clearfix">'+
						    '<div class="vs_info fl ' + (!itm.stopBuy.FTBRQSPF && itm.danGuan.FTBRQSPF && !itm.stopBuy.FTSPF && itm.danGuan.FTSPF ?  'm_single' : '') + '" data-o="'+ itm.oid + '" data-n="'+ itm.homeName+ ',' + itm.awayName + '" data-p="123,234">';
			     if(itm.stopBuy.FTBRQSPF){
					 html += '<div class="match_detail center clearfix">'+
								'<span class="rq">让<em>0</em></span>'+
								'<p class="opt_jz vs_none"><span class="font12 gray">未开售</span></p>'+
							 '</div>';
				 }else{
					 html +=  '<div class="match_detail center clearfix ' + (itm.danGuan.FTBRQSPF && !itm.danGuan.FTSPF  ? 'm_single' : '') + '" data-i="0" data-s="' + itm.mixOdds.FTBRQSPF[0] + ',' + itm.mixOdds.FTBRQSPF[1] + ',' + itm.mixOdds.FTBRQSPF[2] + '" ' +  (itm.danGuan.FTBRQSPF ? 'data-dg="1"' : '') + '>'+
								'<span class="rq">让<em>0</em></span>'+
								'<div class="opt_jz" data-t="selectBet" data-k="0"><span><em class="font12 gray">主胜</em>'+
								itm.mixOdds.FTBRQSPF[0] + '</span></div>'+
								'<div class="opt_jz" data-t="selectBet" data-k="1"><span><em class="font12 gray">平</em>'+
								itm.mixOdds.FTBRQSPF[1] + '</span></div>'+
								'<div class="opt_jz" data-t="selectBet" data-k="2"><span><em class="font12 gray">客胜</em>'+
								itm.mixOdds.FTBRQSPF[2] + '</span></div>'+
								'</div>';
				 }
				 if(itm.stopBuy.FTSPF || itm.rq == undefined || itm.mixOdds.FTSPF[2] == undefined){
				 		html += '<div class="match_detail center clearfix">'+
										'<span class="rq r_green">让<em>球</em></span>'+
										'<p class="opt_jz vs_none"><span class="font12 gray">未开售</span></p>'+
									 '</div>'+
								'</div>'+
								'<div class="vs_more fl" data-t="showBet" data-o="' + itm.oid + '">'+
									'<p><span>+</span><span class="font12 gray">玩法</span></p>'+
								'</div>'+
							'</div>'+	
						'</div>'+
					'</div>';			
				 }else{
				 			html += '<div class="match_detail center clearfix ' +  (itm.danGuan.FTSPF && !itm.danGuan.FTBRQSPF ? 'm_single' :'') + '" data-i="1" data-s="'+ itm.mixOdds.FTSPF[0] +','+ itm.mixOdds.FTSPF[1] + ','+ itm.mixOdds.FTSPF[2] + '" data-q="'+ itm.rq + '" ' + (itm.danGuan.FTSPF ? 'data-dg="1"' : '') + '>'+
								'<span class="rq '+ (itm.rq>0 ? 'r_red':'r_green')+ '">让<em>'+ itm.rq + '</em></span>'+
								'<div class="opt_jz" data-t="selectBet" data-k="0"><span><em class="font12 gray">主胜</em>'+
								itm.mixOdds.FTSPF[0] + '</span></div>'+
								'<div class="opt_jz" data-t="selectBet" data-k="1"><span><em class="font12 gray">平</em>'+
								itm.mixOdds.FTSPF[1] + '</span></div>'+
								'<div class="opt_jz" data-t="selectBet" data-k="2"><span><em class="font12 gray">客胜</em>'+
								itm.mixOdds.FTSPF[2] + '</span></div>'+
							'</div>'+
						'</div>'+
						'<div class="vs_more fl" data-t="showBet" data-o="' + itm.oid + '">'+
							'<p><span>+</span><span class="font12 gray">玩法</span></p>'+
						'</div>'+
					'</div>'+	
				'</div>'+
			'</div>';			
				 }
				 
			 }
		 }
		 html += '</div>';
	  }
	 
      html += '<div style="height:60px;"></div>';
	  this.matchListObj.html(html);
	  this.pullRefresh();
  }
  
  sportterySoccer.filterMatch = function(obj,lotteryNo){
	   this.lotteryNo = lotteryNo;
	   if(this.lotteryType == 'BSKFH'){
		   this.formatBasketMixHtml(obj);
	   }else{
		   if(this.manner == 2){  //2选1
			  this.format2x1Html(obj);
		   }else{                 //混关
			  this.formatMixHtml(obj);
		   }
	   }
  }
  

  sportterySoccer.cloneArr = function(arr){
    var temArr = new Array();
    for(var i=0,ilen=arr.length;i<ilen;i++){
      if($.isArray(arr[i])){
        temArr[i] = this.cloneArr(arr[i]);
      }else{
        temArr[i] = arr[i]
      }
    }
    return temArr;
  }
  
  sportterySoccer.bonusOptAjax = function(){
    var postData = this.createSubData();
    if(postData.wagerCount>500){
      $.alertMsg("使用奖金优化，单注倍数不能超过500注，请重新设置");
      return false;
    }else if(postData.money>this.maxMoney){
       $.alertMsg("单笔最大支持"+Math.floor(this.maxMoney/10000)+"万元");
       return false;
    }else if(postData.passType === ""){
      $.alertMsg("请选择过关方式");
      return false;
    }
    var ggVal = postData.passType.split(",");
    var arg=/_1$/;
    for(var i=0,ilen=ggVal.length;i<ilen;i++){
      if(!arg.test(ggVal[i])){
        $.alertMsg("奖金优化只支持n串1的过关方式。");
        return false;
      }
    }
	postData.wagerMultiple = 1;
	postData.manner = 1;
	postData.jctoolMoney = postData.money;
	postData.optimizeType = 'avg';
	if(this.manner == '2'){  //2选1
		postData.subLotteryType  =  'jz2x1';	
		postData.manner = 3;  //2选1的奖金优化manner=3
	}
    prizeToolObj.goBack = function(){
		prizeToolObj.destroy();
		sportterySoccer.show();	
	}
	prizeToolObj.show('reload',function(){
		prizeToolObj.getData(postData);
	})
  }
  //changeLotNo
  sportterySoccer.getBonusDeil = function(){
	var self = this;
	if(self.bonusDeilObj.css('display') != 'none'){
		self.bonusDeilObj.hide();
		self.removeBgLayer();
		self.createBonusOptBottom(self.bonusDeilObj,0);
		return false;	
	}
    var postData = this.createSubData();
    $.ajax({   
      url : ConfigObj.localSite +  '?version=1&m=lottery.jczq.getprizecomputesummary',
      data : postData,
      type : "post",
      dataType : "json",
      success : function(msg){
        if(msg.code!=="0000"){
          $.alertMsg(msg.code_str);
          return false;
        }
        self.bonusDeilObj.addClass('showObj');
        self.createBonusDeilDom(msg.info.summary);
        self.bonusDeilObj.show();
        self.ddDetailObj.hide();
        self.ddDetailObj.removeClass('showObj');
        self.hideMultiple();
        self.addBgLayer(self.bonusDeilObj);
		if(self.bonusOpt){
		   self.createBonusOptBottom(self.bonusDeilObj,1);
	    }
      }
    });
	
  }

  sportterySoccer.createBonusDeilDom = function(data){
    var html = new Array();
    for(var i=0,ilen=data.length;i<ilen;i++){
      html.push('<div class="clearfix"><span class="fl w30">'+data[i]['tuoHit']+'</span><span class="fl w70">'+data[i]['min']+'<em class="jgx">~</em>'+data[i]['max']+'</span></div>');
    }
    this.bonusListObj.html(html.join(""));
  }


  sportterySoccer.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
	this.getData();
  }

  sportterySoccer.init = function(){
    this.setDefConfig();
    this.onloadExecution();
  }
 	
  return sportterySoccer; 
}

