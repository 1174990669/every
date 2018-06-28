  var fastK3ConfirmObj = new BetConfirm({
	   'name': 'fastK3Confirm',
	   'tpl' : 'template/confirm/betlist.html'
  });
  fastK3ConfirmObj.setDefConfig = function(){
		this.zhushuArr = new Array();
        this.betAllData = new Array();
        this.betData = "";
        this.agrstate = true;
        this.checkedOver = false;
        this.saveBetData = true;
		this.lotteryPlay == "SUM"
		this.lotteryMinNum = [1];
		this.lotteryBallNum = [14];
		this.lotteryBetVal = new Array(new Array(4,5,6,7,8,9,10,11,12,13,14,15,16,17));
		
		  
		
		this.ballClassName =  new Array("fontred","fontred","fontred","fontred","fontred","fontred","fontred");
		this.lotteryOneMoney = 2;
	    this.lotteryType = ConfigObj.fastK3Type;
		this.lotteryNo = '';
		this.checkP = true;
		this.offCheckNum0 = true;
		this.lotteryMul = 1;
		this.lotteryPer = 1;
		this.maxMul = 10000;
		this.maxPer = 999;
		this.overNum = 19;
		this.maxOver = 50000000;
		this.maxZSVal = 50000;
		this.maxMoneyVal = 500000;
		this.wid = ''; //php wagerId
		this.pid = ''; //php lotteryId
		
  }
  
  fastK3ConfirmObj.setLotteryPlayData = function(){
	   if(this.lotteryPlay == "SUM"){
			this.lotteryMinNum = [1];
			this.lotteryBallNum = [14];
			this.lotteryBetVal = new Array(new Array(4,5,6,7,8,9,10,11,12,13,14,15,16,17));
		}else if(this.lotteryPlay == "TXD"){
			this.lotteryMinNum = [1];
			this.lotteryBallNum = [6];
			this.lotteryBetVal = new Array(new Array('1+1+1','2+2+2','3+3+3','4+4+4','5+5+5','6+6+6'));
		}else if(this.lotteryPlay == "TXS2"){
			this.lotteryMinNum = [1];
			this.lotteryBallNum = [6];
			this.lotteryBetVal = new Array(new Array('1+1','2+2','3+3','4+4','5+5','6+6'));
		}else if(this.lotteryPlay == "TXD2"){
			this.lotteryMinNum = [1,1];
			this.lotteryBallNum = [6,6];
			this.lotteryBetVal = new Array(new Array('1+1','2+2','3+3','4+4','5+5','6+6'),new Array(1,2,3,4,5,6));
		}else if(this.lotteryPlay == "BT3"){
			this.lotteryMinNum = [3];
			this.lotteryBallNum = [6];
			this.lotteryBetVal = new Array(new Array(1,2,3,4,5,6));
		}else if(this.lotteryPlay == "BT2"){
			this.lotteryMinNum = [2];
			this.lotteryBallNum = [6];
			this.lotteryBetVal = new Array(new Array(1,2,3,4,5,6));
		}
  }
  
  
  fastK3ConfirmObj.destroy = function(){
	this.setDefConfig();
	$('#fastK3Confirm').html('').remove();
	window.localStorage.removeItem(fastK3ConfirmObj.lotteryType + 'lotteryBetData');
	window.localStorage.removeItem(fastK3ConfirmObj.lotteryType + 'lotteryAllBetData');
	window.localStorage.removeItem(fastK3ConfirmObj.lotteryType + 'MulAndPer'); 
  }
