  var ssqObj = new NumberLottery({
	   'name': 'ssq',
	   'tpl' : 'template/numlottery/ssq.html'  
  }); //ssq_playTitleObj
  ssqObj.setDefConfig = function(){
	  this.isEdit = false;
	  this.editData = '';
      this.lotteryPlay = "P";
      this.lotteryType = "ssq"; 
      this.lotteryCnName = "双色球";
      this.lotteryNo = "";
	  this.lotteryOneMoney = 2;
	  this.maxZSVal = 50000;
      this.maxMoneyVal = 500000;
      this.lotteryMinNum = new Array(6,1);
      this.lotteryMaxNum = new Array(33,16);
      this.lotteryBallNum = new Array(33,16);
	  this.lotteryPlayCnName = {"P":"普通","D":"胆拖"};
	  this.lotteryBetError = {
		'P' : ['至少选择6个红球号码','至少选择1个蓝球号码'],
		"D" : ['至少选择6个红球号码','至少选择1个蓝球号码'],
		"DD": ['红球胆码+拖码至少7个','蓝球至少1个']
	  };
	  this.betCnName  = ["红球","蓝球"];
	  this.lotterySelectTips = {
		P : new Array('<p><span class="fontred font14"><b>·</b> 红球</span> 选择6-33个号码</p><div class="tit_rt"><div class="jixuan"><span data-t="random" data-k="0"><em class="icon phone"></em>机选</span><span data-t="redjx" data-k="0" data-v="6"><em class="jsJxNum">6</em>个<em class="arrow"></em></span></div></div>','<p><span class="fontblue font14"><b>·</b> 蓝球</span> 选择1-16个号码</p><div class="tit_rt"><div class="jixuan"><span data-t="random" data-k="1"><em>机选</em></span><span data-t="bluejx" data-k="1" data-v="1"><em class="jsJxNum">1</em>个<em class="arrow"></em></span></div></div>'),
		D : new Array('<div class="tit gray"><p><span class="fontred font14"><b>·</b> 红球</span> 胆码1-5个，拖码+胆码至少7个</p><div class="tit_rt"><span data-t="whatPlay">怎么玩？</span></div></div>','<p><span class="fontblue font14"><b>·</b> 蓝球 </span> 至少选择1个号码</p></div>')
	}
    // console.log(this.lotterySelectTips)
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
		 clearInterval( ssqObj.scheduleInterval);
		 this.scheduleInterval = '';
	  }
	  this.hasChartData = '';
  }
  
  ssqObj.createDomObj = function(){
    this.lotteryDomObj = $("#ssq_lotteryObj"); 
    this.updataPlayObj = $("#ssq_updataPlayObj");  //普通 脱胆 双色球
    this.topMenuObj = $('#ssq_topMenuLayer'); //ssq_topMenuLayer 历史开奖玩法说明
	this.topDescObj = $('#ssq_topDesc'); 
    this.jxObj = $('#ssq_jxLayer');
    this.chartListObj = $('#ssq_chartList');
    this.zhushuObj = $("#ssq_zhushuObj");
    this.moneyObj = $("#ssq_moneyObj");
    this.ddTipsObj = $("#ssq_ddTipsObj");
    this.playTitleObj = $("#ssq_playTitleObj");  //双色球
    this.selectDivObj = $("#ssq_lotteryObj .selectObj");
    this.selTitleObj = $("#ssq_lotteryObj .selTitleObj");
	  this.SsqbetWrap = $('#ssq_betWrap'); 
  }
