  var pl5Obj = new NumberLottery({
	   'name': 'pl5',
	   'tpl' : 'template/numlottery/pl5.html'  
  });
  pl5Obj.setDefConfig = function(){
	  this.isEdit = false;
	  this.editData = '';
      this.lotteryPlay = "P";
      this.lotteryType = "pl5";
      this.lotteryCnName = "排列五";
      this.lotteryNo = "";
	  this.lotteryOneMoney = 2;
	   this.maxZSVal = 50000;
      this.maxMoneyVal = 500000;
      this.lotteryMinNum = new Array(1,1,1,1,1);
      this.lotteryMaxNum = new Array(10,10,10,10,10);
      this.lotteryBallNum = new Array(10,10,10,10,10);
	  this.lotteryPlayCnName = {};
	 
	 this.lotteryBetError = {
		'P' : ['至少选择1个万位号码','至少选择1个千位号码','至少选择1个百位号码','至少选择1个十位号码','至少选择1个个位号码']
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
		 clearInterval( pl5Obj.scheduleInterval);
		 this.scheduleInterval = '';
	  }
	  this.hasChartData = '';
  }
  
  pl5Obj.createDomObj = function(){
    this.lotteryDomObj = $("#pl5_lotteryObj");
    this.updataPlayObj = $("#pl5_updataPlayObj");
    this.topMenuObj = $('#pl5_topMenuLayer');
	this.topDescObj = $('#pl5_topDesc'); 
    this.jxObj = $('#pl5_jxLayer');
    this.chartListObj = $('#pl5_chartList');
    this.zhushuObj = $("#pl5_zhushuObj");
    this.moneyObj = $("#pl5_moneyObj");
    this.ddTipsObj = $("#pl5_ddTipsObj");
    this.playTitleObj = $("#pl5_playTitleObj");
    this.selectDivObj = $("#pl5_lotteryObj .selectObj");
    this.selTitleObj = $("#pl5_lotteryObj .selTitleObj");
    this.betWrap = $('#pl5_betWrap');
  }

  