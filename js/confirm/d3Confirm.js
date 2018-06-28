  var d3ConfirmObj = new BetConfirm({
	   'name': 'd3Confirm',
	   'tpl' : 'template/confirm/betlist.html'
  });
  d3ConfirmObj.setDefConfig = function(){
		this.zhushuArr = new Array();
        this.betAllData = new Array();
        this.betData = "";
        this.agrstate = true;
        this.checkedOver = false;
        this.saveBetData = true;
		
		this.lotteryMinNum = new Array(1,1,1);
		this.lotteryBallNum = new Array(10,10,10);
		this.lotteryBetVal = new Array(new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9));
		this.ballClassName = new Array("fontred","fontred","fontred");
		this.offCheckNum0 = true;   //投注内容数字是单位，前面补0与否
		this.lotteryOneMoney = 2;
		this.lotteryPlay = 'IP';
	    this.lotteryType = 'd3';
		this.lotteryNo = '';
		this.lotteryMul = 1;
		this.lotteryPer = 1;
		this.maxMul = 10000;
		this.maxPer = 999;
		this.overNum = 1000;
		this.maxOver = 50000000;
		this.maxZSVal = 50000;
		this.maxMoneyVal = 500000;
		this.wid = ''; //php wagerId
		this.pid = ''; //php lotteryId
		
  }
  
  d3ConfirmObj.setLotteryPlayData = function(){
	 if(this.lotteryPlay=="IP"){
		this.lotteryMinNum = new Array(1,1,1);
		this.lotteryBallNum = new Array(10,10,10);
		this.lotteryBetVal = new Array(new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9),new Array(0,1,2,3,4,5,6,7,8,9));
	 }else if(this.lotteryPlay=="UP3"){
		this.lotteryMinNum = [2];
		this.lotteryBallNum = [10];
		this.lotteryBetVal = new Array(new Array(0,1,2,3,4,5,6,7,8,9));
	 }else if(this.lotteryPlay=="UP6"){
		this.lotteryMinNum = [3];
		this.lotteryBallNum = [10];
		this.lotteryBetVal = new Array(new Array(0,1,2,3,4,5,6,7,8,9));
	 }else if(this.lotteryPlay=="IH"){
		this.lotteryMinNum = [1];
		this.lotteryBallNum = [28];
		this.lotteryBetVal = new Array(new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27));
	 }else if(this.lotteryPlay=="UH3"){
		this.lotteryMinNum = [1];
		this.lotteryBallNum = [26];
		this.lotteryBetVal = new Array(new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26));
	 }else if(this.lotteryPlay=="UH6"){
		this.lotteryMinNum = [1];
		this.lotteryBallNum = [22];
		this.lotteryBetVal = new Array(new Array(3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24));
	 }
  }
  
  d3ConfirmObj.destroy = function(){
	this.setDefConfig();
	$('#d3Confirm').html('').remove();
	window.localStorage.removeItem('d3lotteryBetData');
	window.localStorage.removeItem('d3lotteryAllBetData');
	window.localStorage.removeItem('d3MulAndPer'); 
  }
