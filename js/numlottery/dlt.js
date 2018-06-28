  var dltObj = new NumberLottery({
	   'name': 'dlt',
	   'tpl' : 'template/numlottery/dlt.html'  
  });
  dltObj.setDefConfig = function(){
	  this.isEdit = false;
	  this.editData = '';
      this.lotteryPlay = "P";
      this.lotteryType = "dlt";
      this.lotteryCnName = "大乐透";
      this.lotteryNo = "";
	  this.lotteryOneMoney = 2;
	  this.maxZSVal = 50000;
      this.maxMoneyVal = 500000;
      this.lotteryMinNum = new Array(5,2);
      this.lotteryMaxNum = new Array(18,12);
      this.lotteryBallNum = new Array(35,12);
	  this.lotteryPlayCnName = {"P":"普通","D":"胆拖"};
	  this.lotteryBetError = {
		'P' : ['至少选择5个前区号码','至少选择2个后区号码'],
		"D" : ['至少选择5个前区号码','至少选择2个后区号码'],
		"DD": ['前区胆码+拖码至少6个','后区胆码+拖码至少3个']
	  };
	  this.betCnName  = ["前区","后区"];
	  this.lotterySelectTips = {
		P : new Array('<p><span class="fontred font14"><b>·</b> 前区</span> 选择5-18个号码</p><div class="tit_rt"><div class="jixuan"><span data-t="random" data-k="0"><em class="icon phone"></em>机选</span><span data-t="redjx" data-k="0" data-v="5"><em class="jsJxNum">5</em>个<em class="arrow"></em></span></div></div>','<p><span class="fontred font14"><b>·</b> 后区</span> 选择2-12个号码</p><div class="tit_rt"><div class="jixuan"><span data-t="random" data-k="1"><em>机选</em></span><span data-t="bluejx" data-k="1" data-v="2"><em class="jsJxNum">2</em>个<em class="arrow"></em></span></div></div>'),
		D : new Array('<div class="tit gray"><p><span class="fontred font14"><b>·</b> 前区</span> 胆码1-4个，拖码+胆码至少6个</p><div class="tit_rt"><span data-t="whatPlay">怎么玩？</span></div></div>','<p><span class="fontred font14"><b>·</b> 后区</span> 胆码1个，拖码至少2个</p></div>')
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
		 clearInterval( dltObj.scheduleInterval);
		 this.scheduleInterval = '';
	  }
	  this.hasChartData = '';
  }
  
  dltObj.createDomObj = function(){
    this.lotteryDomObj = $("#dlt_lotteryObj");
    this.updataPlayObj = $("#dlt_updataPlayObj");
    this.topMenuObj = $('#dlt_topMenuLayer');
	this.topDescObj = $('#dlt_topDesc'); 
    this.jxObj = $('#dlt_jxLayer');
    this.chartListObj = $('#dlt_chartList');
    this.zhushuObj = $("#dlt_zhushuObj");
    this.moneyObj = $("#dlt_moneyObj");
    this.ddTipsObj = $("#dlt_ddTipsObj");
    this.playTitleObj = $("#dlt_playTitleObj");
    this.selectDivObj = $("#dlt_lotteryObj .selectObj");
    this.selTitleObj = $("#dlt_lotteryObj .selTitleObj");
	this.betWrap = $('#dlt_betWrap');
	
  }
