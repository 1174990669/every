  var fastBetConfirmObj = new BetConfirm({
	   'name': 'fastBetConfirm',
	   'tpl' : 'template/confirm/betlist.html'
  });
  fastBetConfirmObj.setDefConfig = function(){
		this.zhushuArr = new Array();
        this.betAllData = new Array();
        this.betData = "";
        this.agrstate = true;
        this.checkedOver = false;
        this.saveBetData = true;
		this.lotteryPlay == "R2"
		this.lotteryMinNum = [2];
		this.lotteryBallNum = [11];
		this.lotteryBetVal = new Array(new Array(1,2,3,4,5,6,7,8,9,10,11));
		
		  
		
		this.ballClassName =  new Array("fontred","fontred","fontred","fontred","fontred","fontred","fontred");
		this.lotteryOneMoney = 2;
	    this.lotteryType = ConfigObj.fastLotType;
		this.lotteryNo = '';
		this.checkP = true;
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
  
  fastBetConfirmObj.setLotteryPlayData = function(){
	   if(this.lotteryPlay == "R2"){
			this.lotteryMinNum = [2];
			this.lotteryBallNum = [11];
			this.lotteryBetVal = new Array(new Array(1,2,3,4,5,6,7,8,9,10,11));
		}else if(this.lotteryPlay == "R3"){
			this.lotteryMinNum = [3];
			this.lotteryBallNum = [11];
			this.lotteryBetVal = new Array(new Array(1,2,3,4,5,6,7,8,9,10,11));
		}else if(this.lotteryPlay == "R4"){
			this.lotteryMinNum = [4];
			this.lotteryBallNum = [11];
			this.lotteryBetVal = new Array(new Array(1,2,3,4,5,6,7,8,9,10,11));
		}else if(this.lotteryPlay == "R5"){
			this.lotteryMinNum = [5];
			this.lotteryBallNum = [11];
			this.lotteryBetVal = new Array(new Array(1,2,3,4,5,6,7,8,9,10,11));
		}else if(this.lotteryPlay == "R6"){
			this.lotteryMinNum = [6];
			this.lotteryBallNum = [11];
			this.lotteryBetVal = new Array(new Array(1,2,3,4,5,6,7,8,9,10,11));
		}else if(this.lotteryPlay == "R7"){
			this.lotteryMinNum = [7];
			this.lotteryBallNum = [11];
			this.lotteryBetVal = new Array(new Array(1,2,3,4,5,6,7,8,9,10,11));
		}else if(this.lotteryPlay == "R8"){
			this.lotteryMinNum = [8];
			this.lotteryBallNum = [11];
			this.lotteryBetVal = new Array(new Array(1,2,3,4,5,6,7,8,9,10,11));
		}else if(this.lotteryPlay == "FP1"){
			this.lotteryMinNum = [1];
			this.lotteryBallNum = [11];
			this.lotteryBetVal = new Array(new Array(1,2,3,4,5,6,7,8,9,10,11));
		}else if(this.lotteryPlay == "FP2"){
			this.lotteryMinNum = [1,1];
			this.lotteryBallNum = [11,11];
			this.lotteryBetVal = new Array(new Array(1,2,3,4,5,6,7,8,9,10,11),new Array(1,2,3,4,5,6,7,8,9,10,11));
		}else if(this.lotteryPlay == "FC2"){
			this.lotteryMinNum = [2];
			this.lotteryBallNum = [11];
			this.lotteryBetVal = new Array(new Array(1,2,3,4,5,6,7,8,9,10,11));
		}else if(this.lotteryPlay == "FP3"){
			this.lotteryMinNum = [1,1,1];
			this.lotteryBallNum = [11,11,11];
			this.lotteryBetVal = new Array(new Array(1,2,3,4,5,6,7,8,9,10,11),new Array(1,2,3,4,5,6,7,8,9,10,11),new Array(1,2,3,4,5,6,7,8,9,10,11));
		}else if(this.lotteryPlay == "FC3"){
			this.lotteryMinNum = [3];
			this.lotteryBallNum = [11];
			this.lotteryBetVal = new Array(new Array(1,2,3,4,5,6,7,8,9,10,11))
		}  
  }
  
  
  fastBetConfirmObj.destroy = function(){
	this.setDefConfig();
	$('#fastBetConfirm').html('').remove();
	window.localStorage.removeItem(ConfigObj.fastLotType + 'lotteryBetData');
	window.localStorage.removeItem(ConfigObj.fastLotType + 'lotteryAllBetData');
	window.localStorage.removeItem(ConfigObj.fastLotType + 'MulAndPer'); 
  }
