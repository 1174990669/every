  var hn4j1ConfirmObj = new BetConfirm({
	   'name': 'hn4j1Confirm',
	   'tpl' : 'template/confirm/betlist.html'
  });
  hn4j1ConfirmObj.setDefConfig = function(){
		this.zhushuArr = new Array();
        this.betAllData = new Array();
        this.betData = "";
        this.agrstate = true;
        this.checkedOver = false;
        this.saveBetData = true;
		
		this.lotteryMinNum = [1,1,1,1,1];
		this.lotteryBallNum = [10,10,10,10,10];
		this.lotteryBetVal =  new Array(new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9));
		this.lotteryBallClassName = {
			"D5": new Array("fontred","fontred","fontred","fontred","fontblue"),
			"D4": new Array("fontred","fontred","fontred","fontred"),
			"R4": new Array("fontred"),
			"R4C2":  new Array("fontred"),
			"R3": new Array("fontred"),
			"R3C3": new Array("fontred"),
			"R2C2": new Array("fontred"),
			"R2": new Array("fontred"),
			"R4C3": new Array("fontred","fontred"),
			"R4C1": new Array("fontred","fontred"),
			"R3C2": new Array("fontred","fontred"),
			"D3": new Array("fontred","fontred","fontred","fontred"),
			"D2": new Array("fontred","fontred","fontred","fontred"),
			"D1": new Array("fontred","fontred","fontred","fontred"),
		};
		
		this.offCheckNum0 = true;   //投注内容数字是单位，前面补0与否
		this.checkP = true;
		this.lotteryOneMoney = 2;
		this.lotteryPlay = 'D5';
	    this.lotteryType = 'hn4j1';
		this.lotteryNo = '';
		this.lotteryMul = 1;
		this.lotteryPer = 1;
		this.maxMul = 10000;
		this.maxPer = 999;
		this.overNum = 3000;
		this.maxOver = 50000000;
		this.maxZSVal = 50000;
		this.maxMoneyVal = 500000;
		this.res = '';
		this.wid = ''; //php wagerId
		this.pid = ''; //php lotteryId
		
  }
  
  
  hn4j1ConfirmObj.setLotteryPlayData = function(){
	 if(this.lotteryPlay=="D5"){
		this.lotteryMinNum = [1,1,1,1,1];
	    this.lotteryBallNum = [10,10,10,10,10];
		this.lotteryBetVal = new Array(new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9));
		this.lotteryBallWei = 0;
	 }else if(this.lotteryPlay=="D4"){
		this.lotteryMinNum = [1,1,1,1];
		this.lotteryBallNum = [10,10,10,10];
		this.lotteryBetVal = new Array(new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9));
		this.lotteryBallWei = 0;
	 }else if(this.lotteryPlay=="R4"){
		this.lotteryMinNum = [4];
		this.lotteryBallNum = [10];
		this.lotteryBetVal = new Array(new Array(0,1,2,3,4,5,6,7,8,9));
		this.lotteryBallWei = 0;
	 }else if(this.lotteryPlay=="R4C2"){
		this.lotteryMinNum = [2];
		this.lotteryBallNum = [10];
		this.lotteryBetVal = new Array(new Array(0,1,2,3,4,5,6,7,8,9));
		this.lotteryBallWei = 0;
	 }else if(this.lotteryPlay=="R3"){
		this.lotteryMinNum = [3];
		this.lotteryBallNum = [10];
		this.lotteryBetVal = new Array(new Array(0,1,2,3,4,5,6,7,8,9));
		this.lotteryBallWei = 0;
	 }else if(this.lotteryPlay=="R3C3"){
		this.lotteryMinNum = [1];
		this.lotteryBallNum = [10];
		this.lotteryBetVal = new Array(new Array(0,1,2,3,4,5,6,7,8,9));
		this.lotteryBallWei = 0;
	 }else if(this.lotteryPlay=="R2C2"){
		this.lotteryMinNum = [1];
		this.lotteryBallNum = [10];
		this.lotteryBetVal = new Array(new Array(0,1,2,3,4,5,6,7,8,9));
	 }else if(this.lotteryPlay=="R2"){
		this.lotteryMinNum = [2];
		this.lotteryBallNum = [10];
		this.lotteryBetVal = new Array(new Array(0,1,2,3,4,5,6,7,8,9));
		this.lotteryBallWei = 0;
	 }else if(this.lotteryPlay=="R4C3"){
		this.lotteryMinNum = [1,1];
		this.lotteryBallNum = [10,10];
		this.lotteryBetVal = new Array(new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9));
		this.lotteryBallWei = 0;
	 }else if(this.lotteryPlay=="R4C1"){
		this.lotteryMinNum = [1,2];
		this.lotteryBallNum = [10,10];
		this.lotteryBetVal = new Array(new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9));
		this.lotteryBallWei = 0;
	 }else if(this.lotteryPlay=="R3C2"){
		this.lotteryMinNum = [1,1];
		this.lotteryBallNum = [10,10];
		this.lotteryBetVal = new Array(new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9));
		this.lotteryBallWei = 0;
	 }else if(this.lotteryPlay=="D3"){
		this.lotteryMinNum = [1,1,1,1];
		this.lotteryBallNum = [10,10,10,10];
		this.lotteryBallWei = 3;
		this.lotteryBetVal = new Array(new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9));
		this.ballClassName = new Array("fontred","fontred","fontred","fontred");
	 }else if(this.lotteryPlay=="D2"){
		this.lotteryMinNum = [1,1,1,1];
		this.lotteryBallNum = [10,10,10,10];
		this.lotteryBallWei = 2;
		this.lotteryBetVal = new Array(new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9));
		this.ballClassName = new Array("fontred","fontred","fontred","fontred");
	 }else if(this.lotteryPlay=="D1"){
		this.lotteryMinNum = [1,1,1,1];
		this.lotteryBallNum = [10,10,10,10];
		this.lotteryBallWei = 1;
		this.lotteryBetVal = new Array(new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9));
		this.ballClassName = new Array("fontred","fontred","fontred","fontred");
	 }
	 
  }
  
  hn4j1ConfirmObj.destroy = function(){
	this.setDefConfig();
	$('#hn4j1Confirm').html('').remove();
	window.localStorage.removeItem('hn4j1lotteryBetData');
	window.localStorage.removeItem('hn4j1lotteryAllBetData');
	window.localStorage.removeItem('hn4j1MulAndPer'); 
  }
