  var qxcConfirmObj = new BetConfirm({
	   'name': 'qxcConfirm',
	   'tpl' : 'template/confirm/betlist.html'
  });
  qxcConfirmObj.setDefConfig = function(){
		this.zhushuArr = new Array();
        this.betAllData = new Array();
        this.betData = "";
        this.agrstate = true;
        this.checkedOver = false;
        this.saveBetData = true;
		
		this.lotteryMinNum = new Array(1,1,1,1,1,1,1);
		this.lotteryBallNum = new Array(10,10,10,10,10,10,10);
		this.lotteryBetVal = new Array(new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9));
		this.ballClassName =  new Array("fontred","fontred","fontred","fontred","fontred","fontred","fontred");
		this.offCheckNum0 = true;
		this.lotteryOneMoney = 2;
		this.lotteryPlay = 'P';
	    this.lotteryType = 'qxc';
		this.offCheckNum0 = true;
		this.lotteryNo = '';
		this.lotteryMul = 1;
		this.lotteryPer = 1;
		this.maxMul = 10000;
		this.maxPer = 999;
		this.overNum = 3000;
		this.maxOver = 50000000;
		this.maxZSVal = 50000;
		this.maxMoneyVal = 500000;
		this.wid = ''; //php wagerId
		this.pid = ''; //php lotteryId
		
  }
  
  
  qxcConfirmObj.destroy = function(){
	this.setDefConfig();
	$('#qxcConfirm').html('').remove();
	window.localStorage.removeItem('qxclotteryBetData');
	window.localStorage.removeItem('qxclotteryAllBetData');
	window.localStorage.removeItem('qxcMulAndPer'); 
  }
