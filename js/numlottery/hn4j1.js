  var hn4j1Obj = new NumberLottery({
	   'name': 'hn4j1',
	   'tpl' : 'template/numlottery/hn4j1.html'  
  });
  
  hn4j1Obj.setDefConfig = function(){
	  this.isEdit = false;
	  this.editData = '';
	  
	  this.betCnName = [];
      this.lotteryPlay = "D5";
      this.lotteryType = "hn4j1";
      this.lotteryCnName = "海南";
      this.lotteryNo = "";
	  this.checkP = true;
	  this.lotteryOneMoney = 2;
	  this.maxZSVal = 50000;
      this.maxMoneyVal = 500000;
	  this.lotteryBallWei = 0;
      this.lotteryMinNum = [1,1,1,1,1];
      this.lotteryMaxNum = [10,10,10,10,10];
      this.lotteryBallNum = [10,10,10,10,10];
	  this.lotteryPlayCnName = {"D5":"4+1","R4C3":"任4(3重)","R3C2":"任3(双重)","D4":"定位4","R4C2":"任4(2双重)","R3":"任3(单号)","D3":"定位3","R4C1":"任4(1双重)","R2C2":"任2(双重)","D2":"定位2","R4":"任4(单号)","R2":"任2(单号)","D1":"定位1","R3C3":"任3(3重)"};
	 
	 this.lotteryBetError = {
		'D5' : ['至少选择1个第一位号码','至少选择1个第二位号码','至少选择1个第三位号码','至少选择1个第四位号码','至少选择1个特别号码'],
		'R4C3' : ['至少选择1个重号','至少选择1个单号'],
		'R3C2' : ['至少选择1个重号','至少选择1个单号'],
		'D4' : ['至少选择1个第一位号码','至少选择1个第二位号码','至少选择1个第三位号码','至少选择1个第四位号码'],
		'R4C2' : ['至少选择2个号码'],
		'R3' : ['至少选择3个号码'],
		'D3' : ['必选3位，每位至少选择1个号码','必选3位，每位至少选择1个号码','必选3位，每位至少选择1个号码'],
		"R4C1" : ['至少选择1个重号','至少选择2个单号'],
		'R2C2' : ['至少选择1个重号','至少选择1个单号'],
		"D2" : ['必选2位，每位至少选择1个号码','必选2位，每位至少选择1个号码'],
		'R4' : ['至少选择4个号码'],
		"R2" : ['至少选择2个号码'],
		'D1' : ['必选1位，至少选择1个号码'],
		"R3C3" : ['至少选择1个号码']
	},
	this.lotterySelectTips = {
		"D5" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span>  每位至少选择1个号码</p><div class="tit_rt"><div class="jixuan p3"><span data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
		"D4" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 每位至少选择1个号码</p><div class="tit_rt"><div class="jixuan p3"><span  data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
		"R4" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 至少选4个号码</p><div class="tit_rt"><div class="jixuan p3"><span  data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
		"R4C2" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 至少选2个号码</p><div class="tit_rt"><div class="jixuan p3"><span  data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
		"R3" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 至少选3个号码</p><div class="tit_rt"><div class="jixuan p3"><span  data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
		"R3C3" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 至少选1个号码</p><div class="tit_rt"><div class="jixuan p3"><span  data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
		"R2C2" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 至少选1个号码</p><div class="tit_rt"><div class="jixuan p3"><span  data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
		"R2" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 至少选择2个号码</p><div class="tit_rt"><div class="jixuan p3"><span  data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
		"R4C3" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 至少选择1个重号,1个单号</p><div class="tit_rt"><div class="jixuan p3"><span  data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
		"R4C1" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 至少选择1个重号，2个单号</p><div class="tit_rt"><div class="jixuan p3"><span  data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
		"R3C2" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 至少选择1个重号，1个单号</p><div class="tit_rt"><div class="jixuan p3"><span  data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
		"D3" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 必选3位，每位至少选择1个号码</p><div class="tit_rt"><div class="jixuan p3"><span  data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
		"D2" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 必选2位，每位至少选择1个号码</p><div class="tit_rt"><div class="jixuan p3"><span  data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
		"D1" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 必选1位，至少选择1个号码</p><div class="tit_rt"><div class="jixuan p3"><span  data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>')
	}
	this.bonusTips = {
		"D5" : '选号与开奖号码按位相符即中<span class="fontred">130000</span>元',
		"D4" : '选号与正选号码按位相符即中<span class="fontred">13000</span>元',
		"R4" : '选号各不相同且与正选号码相符即中<span class="fontred">540</span>元',
		"R4C2" : '选号两两相同且与正选号码相符即中<span class="fontred">2165</span>元',
		"R3" : '选号各不相同且与3个正选号相符即中<span class="fontred">62</span>元',
		"R3C3" : '选号完全相同且与3个正选号相符即中<span class="fontred">350</span>元',
		"R2C2" : '选号完全相同且与2个正选号相符即中<span class="fontred">24</span>元',
		"R2" : '选号各不相同且与3个正选号相符即中<span class="fontred">13</span>元',
		"R4C3" : '选号3个相同且与正选号码相符即中<span class="fontred">3250</span>元',
		"R4C1" : '选号仅两个相同且与正选号码相符即中<span class="fontred">1080</span>元',
		"R3C2" : '选号仅两个相同且与3个正选号相符即中<span class="fontred">122</span>元',
		"D3" : '选号与3个正选号码按位相符即中<span class="fontred">1300</span>元',
		"D2" : '选号与2个正选号码按位相符即中<span class="fontred">130</span>元',
		"D1" : '选号与1个正选号码按位相符即中<span class="fontred">13</span>元'
	}
	
      this.lotteryBetData = new Array();
      this.lotteryBetNum = new Array();
      this.lotteryBetDanNum = new Array();
      this.lotteryRandomNum = new Object();
      this.last_update = 0;
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.last_x = 0;
      this.last_y = 0;
      this.last_z = 0;
      this.shake_timer = '';
      this.temQuickTipsObj = '';
      this.isRandom = false;
	   if(this.scheduleInterval){
		 clearInterval( hn4j1Obj.scheduleInterval);
		 this.scheduleInterval = '';
	  }
	  this.hasChartData = '';
  }
  
  hn4j1Obj.createDomObj = function(){
    this.lotteryDomObj = $("#hn4j1_lotteryObj");
    this.updataPlayObj = $("#hn4j1_updataPlayObj");
    this.topMenuObj = $('#hn4j1_topMenuLayer');
	this.topDescObj = $('#hn4j1_topDesc'); 
    this.jxObj = $('#hn4j1_jxLayer');
    this.chartListObj = $('#hn4j1_chartList');
    this.zhushuObj = $("#hn4j1_zhushuObj");
    this.moneyObj = $("#hn4j1_moneyObj");
    this.ddTipsObj = $("#hn4j1_ddTipsObj");
    this.playTitleObj = $("#hn4j1_playTitleObj");
    this.selectDivObj = $("#hn4j1_lotteryObj .selectObj");
    this.selTitleObj = $("#hn4j1_lotteryObj .selTitleObj");
    this.betWrap = $('#hn4j1_betWrap');
  }
  
  hn4j1Obj.funObj = {
	 updatePlayData : function(thisV){
		this.playTitleObj.html(this.lotteryCnName+"-"+this.lotteryPlayCnName[thisV]+'<em class="down"></em>');
	    this.clearBetLottery();

	    this.updateBetDom(thisV);
	    this.updateClassData(thisV);
	    this.updateBonusTips(thisV);
	    this.createSelectTitleHtml();
	    //if($("#showSYXWCharList").attr("data-s")==="1")window.updateLotteryGetCG();
	},
	updateClassData : function(type){
		this.lotteryRandomNum = new Array();
		this.lotteryPlay = type;
		switch (type){
			case "D5" : this.updateD5Data();break;
			case "D4" : this.updateD4Data();break;
			case "R4" : this.updateR4Data();break;
			case "R4C2" : this.updateR4C2Data();break;
			case "R3" : this.updateR3Data();break;
			case "R3C3" : this.updateR3C3Data();break;
			case "R2C2" : this.updateR2C2Data();break;
			case "R2" : this.updateR2Data();break;
			case "R4C3" : this.updateR4C3Data();break;
			case "R4C1" : this.updateR4C1Data();break;
			case "R3C2" : this.updateR3C2Data();break;
			case "D3" : this.updateD3Data();break;
			case "D2" : this.updateD2Data();break;
			case "D1" : this.updateD1Data();break;
		}
	},
	updateD5Data : function(){
		this.lotteryMinNum = [1,1,1,1,1];
		this.lotteryMaxNum = [10,10,10,10,10];
		this.lotteryBallNum = [10,10,10,10,10];
		this.lotteryBallWei = 0;
		this.selectDivObj = this.temBetObj.find(".selectObj");
	},
	updateD4Data : function(){
		this.lotteryMinNum = [1,1,1,1];
		this.lotteryMaxNum = [10,10,10,10];
		this.lotteryBallNum = [10,10,10,10];
		this.lotteryBallWei = 0;
		this.selectDivObj = this.temBetObj.find(".selectObj");
	},
	updateR4Data : function(){
		this.lotteryMinNum = [4];
		this.lotteryMaxNum = [10];
		this.lotteryBallNum = [10];
		this.lotteryBallWei = 0;
		this.selectDivObj = this.temBetObj.find(".selectObj");
	},
	updateR4C2Data : function(){
		this.lotteryMinNum = [2];
		this.lotteryMaxNum = [10];
		this.lotteryBallNum = [10];
		this.lotteryBallWei = 0;
		this.selectDivObj = this.temBetObj.find(".selectObj");
	},
	updateR3Data : function(){
		this.lotteryMinNum = [3];
		this.lotteryMaxNum = [10];
		this.lotteryBallNum = [10];
		this.lotteryBallWei = 0;
		this.selectDivObj = this.temBetObj.find(".selectObj");
	},
	updateR3C3Data : function(){
		this.lotteryMinNum = [1];
		this.lotteryMaxNum = [10];
		this.lotteryBallNum = [10];
		this.lotteryBallWei = 0;
		this.selectDivObj = this.temBetObj.find(".selectObj");
	},
	updateR2C2Data : function(){
		this.lotteryMinNum = [1];
		this.lotteryMaxNum = [10];
		this.lotteryBallNum = [10];
		this.lotteryBallWei = 0;
		this.selectDivObj = this.temBetObj.find(".selectObj");
	},
	updateR2Data : function(){
		this.lotteryMinNum = [2];
		this.lotteryMaxNum = [10];
		this.lotteryBallNum = [10];
		this.lotteryBallWei = 0;
		this.selectDivObj = this.temBetObj.find(".selectObj");
	},
	updateR4C3Data : function(){
		this.lotteryMinNum = [1,1];
		this.lotteryMaxNum = [10,10];
		this.lotteryBallNum = [10,10];
		this.lotteryBallWei = 0;
		this.selectDivObj = this.temBetObj.find(".selectObj");
	},
	updateR4C1Data : function(){
		this.lotteryMinNum = [1,2];
		this.lotteryMaxNum = [10,10];
		this.lotteryBallNum = [10,10];
		this.lotteryBallWei = 0;
		this.selectDivObj = this.temBetObj.find(".selectObj");
	},
	updateR3C2Data : function(){
		this.lotteryMinNum = [1,1];
		this.lotteryMaxNum = [10,10];
		this.lotteryBallNum = [10,10];
		this.lotteryBallWei = 0;
		this.selectDivObj = this.temBetObj.find(".selectObj");
	},
	updateD3Data : function(){
		this.lotteryMinNum = [1,1,1,1];
		this.lotteryMaxNum = [10,10,10,10];
		this.lotteryBallNum = [10,10,10,10];
		this.lotteryBallWei = 3;
		this.selectDivObj = this.temBetObj.find(".selectObj");
	},
	updateD2Data : function(){
		this.lotteryMinNum = [1,1,1,1];
		this.lotteryMaxNum = [10,10,10,10];
		this.lotteryBallNum = [10,10,10,10];
		this.lotteryBallWei = 2;
		this.selectDivObj = this.temBetObj.find(".selectObj");
	},
	updateD1Data : function(){
		this.lotteryMinNum = [1,1,1,1];
		this.lotteryMaxNum = [10,10,10,10];
		this.lotteryBallNum = [10,10,10,10];
		this.lotteryBallWei = 1;
		this.selectDivObj = this.temBetObj.find(".selectObj");
	},
	updateBetDom : function(type){
		//if(!this.betObj)this.betObj = this.lotteryDomObj.find(".betObj");
		//原来h5代码在这里存在改单及切换玩法dom失效问题，修改如下 zhangw
		if(!this.betObj)this.betObj = $('#hn4j1 .betObj')
		$('#hn4j1 .betObj').hide();
		//$('#pl3 .betObj').filter('[data-v="' + type + '"]').show().css({'transform':''});  //解决层级点击问题 zhangw
		$('#hn4j1 .betObj').filter('[data-v="' + type + '"]').get(0).style.display = 'block';  //解决层级点击问题 zhangw
		this.temBetObj = $('#hn4j1 .betObj').filter('[data-v="' + type + '"]')
		if(this.temQuickTipsObj){
			this.temQuickTipsObj.removeClass('showObj');
        	this.temQuickTipsObj.next().hide();
		}
	},
	updateBonusTips : function(type){
		if(!this.bonusTipsObj)this.bonusTipsObj = $("#hn4j1_bonusTipsObj");
		$("#hn4j1_bonusTipsObj").html(this.bonusTips[type]);
	}   
	  
  }
  
  for(var i in  hn4j1Obj.funObj){
	hn4j1Obj[i] = hn4j1Obj.funObj[i];	  
  }

  