  var qxcObj = new NumberLottery({
	   'name': 'qxc',
	   'tpl' : 'template/numlottery/qxc.html'  
  });
  qxcObj.setDefConfig = function(){
	  this.isEdit = false;
	  this.editData = '';
      this.lotteryPlay = "P";
      this.lotteryType = "qxc";
      this.lotteryCnName = "七星彩";
      this.lotteryNo = "";
	  this.lotteryOneMoney = 2;
	  this.maxZSVal = 50000;
      this.maxMoneyVal = 500000;
      this.lotteryMinNum = new Array(1,1,1,1,1,1,1);
      this.lotteryMaxNum = new Array(10,10,10,10,10,10,10);
      this.lotteryBallNum = new Array(10,10,10,10,10,10,10);
	  this.lotteryPlayCnName = {};
	 
	 this.lotteryBetError = {
		'P' : ['至少选择1个第一位号码','至少选择1个第二位号码','至少选择1个第三位号码','至少选择1个第四位号码','至少选择1个第五位号码','至少选择1个第六位号码',,'至少选择1个第七位号码']
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
		 clearInterval( qxcObj.scheduleInterval);
		 this.scheduleInterval = '';
	  }
	  this.hasChartData = '';
  }
  
  qxcObj.createDomObj = function(){
    this.lotteryDomObj = $("#qxc_lotteryObj");
    this.updataPlayObj = $("#qxc_updataPlayObj");
    this.topMenuObj = $('#qxc_topMenuLayer');
	this.topDescObj = $('#qxc_topDesc'); 
    this.jxObj = $('#qxc_jxLayer');
    this.chartListObj = $('#qxc_chartList');
    this.zhushuObj = $("#qxc_zhushuObj");
    this.moneyObj = $("#qxc_moneyObj");
    this.ddTipsObj = $("#qxc_ddTipsObj");
    //this.playTitleObj = $("#qxc_playTitleObj");
    this.selectDivObj = $("#qxc_lotteryObj .selectObj");
    this.selTitleObj = $("#qxc_lotteryObj .selTitleObj");
	this.betWrap = $('#qxc_betWrap');
  }

  