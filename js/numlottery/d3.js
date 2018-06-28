  var d3Obj = new NumberLottery({
	   'name': 'd3',
	   'tpl' : 'template/numlottery/d3.html'  
  });
  d3Obj.setDefConfig = function(){ //d3_topDesc
	  this.isEdit = false;
	  this.editData = '';
      this.lotteryPlay = "IP";
      this.lotteryType = "d3";
      this.lotteryCnName = "福彩3D";
      this.lotteryNo = "";
	  this.lotteryOneMoney = 2;
	  this.maxZSVal = 50000;
      this.maxMoneyVal = 500000;
      this.lotteryMinNum = new Array(1,1,1);
      this.lotteryMaxNum = new Array(10,10,10);
      this.lotteryBallNum = new Array(10,10,10);
	  this.lotteryPlayCnName = {"IP":"直选","UP3":"组三","UP6":"组六","IH":"直选和值","UH3":"组三和值","UH6":"组六和值"};
	  this.lotterySelectTips = {
		"IP" : new Array('<p><span class="fontred font14"><b>·</b> 选号</span> 每位至少选1个号码</p><div class="tit_rt"><div class="jixuan p3"><span data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
		"UP3" : new Array('<p><span class="fontred font14"><b>·</b> 选号</span> 至少选2个号码</p><div class="tit_rt"><div class="jixuan p3"><span data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
		"UP6" : new Array('<p><span class="fontred font14"><b>·</b> 选号</span> 至少选3个号码</p><div class="tit_rt"><div class="jixuan p3"><span data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
		"IH" : new Array('<p><span class="fontred font14"><b>·</b> 选号</span> 至少选1个号码</p><div class="tit_rt"><div class="jixuan p3"><span data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
		"UH3" : new Array('<p><span class="fontred font14"><b>·</b> 选号</span> 至少选1个号码</p><div class="tit_rt"><div class="jixuan p3"><span data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
		"UH6" : new Array('<p><span class="fontred font14"><b>·</b> 选号</span> 至少选1个号码</p><div class="tit_rt"><div class="jixuan p3"><span data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
	}
	 this.lotteryBetError = {
		'IP' : ['至少选择1个百位号码','至少选择1个十位号码','至少选择1个个位号码'],
		"UP3" : ['至少选择2个号码'],
		'UP6' : ['至少选择3个号码'],
		"IH" : ['至少选择1个号码'],
		'UH3' : ['至少选择1个号码'],
		"UH6" : ['至少选择1个号码']
	 }
	 // 将 __ 替换为加奖金额
	 this.bonusTips = {
		"IP" : '选号与开奖号码按位相符即中<span class="fontred">1040__</span>元',
		"UP3" : '开奖号码为组三且包含在选号中即中<span class="fontred">346__</span>元',
		"UP6" : '开奖号码为组六且包含在选号中即中<span class="fontred">173__</span>元',
		"IH" : '开奖号码和值与所选和值相同即中<span class="fontred">1040__</span>元',
		"UH3" : '开奖号码为组三且和值与所选和值相同即中<span class="fontred">346__</span>元',
		"UH6" : '开奖号码为组六且和值与所选和值相同即中<span class="fontred">173__</span>元',
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
		 clearInterval( d3Obj.scheduleInterval);
		 this.scheduleInterval = '';
	  }
	  this.hasChartData = '';
  }
  
  d3Obj.createDomObj = function(){
    this.lotteryDomObj = $("#d3_lotteryObj");
    this.updataPlayObj = $("#d3_updataPlayObj");
    this.topMenuObj = $('#d3_topMenuLayer');
	this.topDescObj = $('#d3_topDesc'); 
    this.jxObj = $('#d3_jxLayer');
    this.chartListObj = $('#d3_chartList');
    this.zhushuObj = $("#d3_zhushuObj");
    this.moneyObj = $("#d3_moneyObj");
    this.ddTipsObj = $("#d3_ddTipsObj");
    this.playTitleObj = $("#d3_playTitleObj");
    this.selectDivObj = $("#d3_lotteryObj .selectObj");
    this.selTitleObj = $("#d3_lotteryObj .selTitleObj");
	this.betWrap = $('#d3_betWrap');
  }
  
  d3Obj.funObj = {
	  updatePlayData : function(thisV){
	  	console.log(thisV)
	  	if (thisV == 'IP') {
	  		$('#updatelottery_IP').css('color','#ff5024')
	  		$('#updatelottery_UP3,#updatelottery_UP6,#updatelottery_IH,#updatelottery_UH3,#updatelottery_UH6').css('color','#333')
	  	}else if (thisV == 'UP3') {
	  		$('#updatelottery_UP3').css('color','#ff5024')
	  		$('#updatelottery_IP,#updatelottery_UP6,#updatelottery_IH,#updatelottery_UH3,#updatelottery_UH6').css('color','#333')
	  	}else if (thisV == 'UP6') {
	  		$('#updatelottery_UP6').css('color','#ff5024')
	  		$('#updatelottery_UP3,#updatelottery_IP,#updatelottery_IH,#updatelottery_UH3,#updatelottery_UH6').css('color','#333')
	  	}else if (thisV == 'IH') {
	  		$('#updatelottery_IH').css('color','#ff5024')
	  		$('#updatelottery_UP3,#updatelottery_UP6,#updatelottery_IP,#updatelottery_UH3,#updatelottery_UH6').css('color','#333')
	  	}else if (thisV == 'UH3') {
	  		$('#updatelottery_UH3').css('color','#ff5024')
	  		$('#updatelottery_UP3,#updatelottery_UP6,#updatelottery_IH,#updatelottery_IP,#updatelottery_UH6').css('color','#333')
	  	}else if (thisV == 'UH6') {
	  		$('#updatelottery_UH6').css('color','#ff5024')
	  		$('#updatelottery_UP3,#updatelottery_UP6,#updatelottery_IH,#updatelottery_UH3,#updatelottery_IP').css('color','#333')
	  	}
	  		//IP UP3 UP6 IH UH3 UH6
		this.playTitleObj.html(this.lotteryCnName+"-"+this.lotteryPlayCnName[thisV]+'<em class="down"></em>');
	    this.clearBetLottery();

	    this.updateBetDom(thisV);
	    this.updateClassData(thisV);  //有问题，待查 zhangw
	    this.updateBonusTips(thisV);
	    this.createSelectTitleHtml();
	},
	updateClassData : function(type){
		this.lotteryRandomNum = new Array();
		this.lotteryPlay = type;
		switch (type){ 
			case "IP" : this.updateIPData();break;
			case "UP3" : this.updateUP3Data();break;
			case "UP6" : this.updateUP6Data();break;
			case "IH" : this.updateIHData();break;
			case "UH3" : this.updateUH3Data();break;
			case "UH6" : this.updateUH6Data();break;
		}
	},
	updateIPData : function(){
		this.lotteryMinNum = new Array(1,1,1);
		this.lotteryMaxNum = new Array(10,10,10);
		this.lotteryBallNum = new Array(10,10,10);
		this.selectDivObj = this.temBetObj.find(".selectObj");  //改单会有不生效问题 zhangw
	    //this.selectDivObj = $('#d3_lotteryObj .selectObj').filter('[data-v="IP"]');  //测试代码 zhangw
	},
	updateUP3Data : function(){
		this.lotteryMinNum = [2];
		this.lotteryMaxNum = [10];
		this.lotteryBallNum = [10];
		this.selectDivObj = this.temBetObj.find(".selectObj");
	},
	updateUP6Data : function(){
		this.lotteryMinNum = [3];
		this.lotteryMaxNum = [10];
		this.lotteryBallNum = [10];
		this.selectDivObj = this.temBetObj.find(".selectObj");
	},
	updateIHData : function(){
		this.lotteryMinNum = [1];
		this.lotteryMaxNum = [28];
		this.lotteryBallNum = [28];
		this.selectDivObj = this.temBetObj.find(".selectObj");
	},
	updateUH3Data : function(){
		this.lotteryMinNum = [1];
		this.lotteryMaxNum = [26];
		this.lotteryBallNum = [26];
		this.selectDivObj = this.temBetObj.find(".selectObj");
	},
	updateUH6Data : function(){
		this.lotteryMinNum = [1];
		this.lotteryMaxNum = [22];
		this.lotteryBallNum = [22];
		this.selectDivObj = this.temBetObj.find(".selectObj");
	},
	updateBetDom : function(type){
		//if(!this.betObj)this.betObj = this.lotteryDomObj.find(".betObj");
		//原来h5代码在这里存在改单及切换玩法dom失效问题，修改如下 zhangw
		if(!this.betObj)this.betObj = $('#d3 .betObj')
		$('#d3 .betObj').hide();
		//$('#d3 .betObj').filter('[data-v="' + type + '"]').show().css({'transform':''});  //解决层级点击问题 zhangw
		$('#d3 .betObj').filter('[data-v="' + type + '"]').get(0).style.display = 'block';  //解决层级点击问题 zhangw
		this.temBetObj = $('#d3 .betObj').filter('[data-v="' + type + '"]')
		if(this.temQuickTipsObj){
			this.temQuickTipsObj.removeClass('showObj');
        	this.temQuickTipsObj.next().hide();
		}
		
	},
	updateBonusTips : function(type){
        if (!d3Obj.bonusTipsObj) d3Obj.bonusTipsObj = $("#d3_bonusTipsObj");

        // 加奖金额显示
        var addPrize = {}, money = 0;
//        console.log(ConfigObj.lotteryAddPrize);
        if(!ConfigObj.lotteryAddPrize == false){
        	var lotteryAddPrize = JSON.parse(localStorage.getItem('lotteryAddPrize')); // 加奖数据
        
        if (lotteryAddPrize['D3']) addPrize = lotteryAddPrize['D3'];
        if (addPrize[type]) money = addPrize[type];
        };
        

        if (money) $("#d3_bonusTipsObj").html(d3Obj.bonusTips[type].replace('__', money));
        else $("#d3_bonusTipsObj").html(d3Obj.bonusTips[type].replace('__', ''));
	}
  }
  
  for(var i in  d3Obj.funObj){
	d3Obj[i] = d3Obj.funObj[i];	  
  }

  
  
  
  