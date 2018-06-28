  var dltConfirmObj = new BetConfirm({
	   'name': 'dltConfirm',
	   'tpl' : 'template/confirm/betlist.html'
  });
  dltConfirmObj.setDefConfig = function(){
		this.zhushuArr = new Array();
        this.betAllData = new Array();
        this.betData = "";
        this.agrstate = true;
        this.checkedOver = false;
		this.checkedZJ = false;
        this.saveBetData = true;
		
		this.lotteryMinNum = new Array(5,2);
		this.lotteryBallNum = new Array(35,12);
		this.lotteryBetVal = new Array(new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35),new Array(1,2,3,4,5,6,7,8,9,10,11,12));
		this.ballClassName = new Array("fontred","fontblue","fontblack");
		this.lotteryOneMoney = 2;
		this.lotteryPlay = 'P';
	    this.lotteryType = 'dlt';
		this.lotteryNo = '';
		this.lotteryMul = 1;
		this.lotteryPer = 1;
		this.maxMul = 10000;
		this.maxPer = 300;
		this.overNum = 3000;
		this.maxOver = 50000000;
		this.maxZSVal = 50000;
		this.maxMoneyVal = 500000;
		this.checkP = false;
		this.wid = ''; //php wagerId
		this.pid = ''; //php lotteryId
		
  }
  
  dltConfirmObj.destroy = function(){
	this.setDefConfig();
	$('#dltConfirm').html('').remove();
	window.localStorage.removeItem('dltlotteryBetData');
	window.localStorage.removeItem('dltlotteryAllBetData');
	window.localStorage.removeItem('dltMulAndPer');  
  }
