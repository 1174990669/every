  var syxwPlanObj = new BetPlan({
	   'name': 'syxwPlan',
	   'tpl' : 'template/numlottery/plan.html'  
  });
  syxwPlanObj.setDefConfig = function(){
	  this.betData = new Array();
	  this.money = 0;
	  this.bouns = 0;
	  this.planMoney = new Array();
	  this.planMul = new Array();
	  this.winStop = true;
	  this.planLotteryDate = new Array();
	  this.lotteryDate = "";
	  this.lotteryNoNum = "";
	  
	    this.lotteryType = ConfigObj.fastLotType;
		this.playType ="R2";
		this.betOneMoney = 2;
		this.betBallNum = {
			R2 : 2,
            R2_D : 2,
			R3 : 3,
            R3_D: 3,
			R4 : 4,
            R4_D : 4,
			R5 : 5,
             R5_D : 5,
			R6 : 6,
             R6_D : 6,
			R7 : 7,
             R7_D : 7,
			R8 : 8,
             R8_D : 8,
			FP1 : 1,
			FP2 : 1,
			FC2 : 2,
            FC2_D : 2,
			FP3 : 1,
            FC3_D : 3,
			FC3 : 3
		};
		this.planNum = 10;
		this.startMul = 1;
		this.planType = "money";
		this.profitMoney = 30;
		this.profitPercent = 0.3;
		this.maxBetMoney = 500000;
		this.maxMul = 10000;
		this.maxPlanNum = 252;
		this.cgNumVal = 5;
		this.lotteryNoAllNum = 84;
		this.lotteryBouns = {
			R2 : 6,
            R2_D : 6,
			R3 : 19,
            R3_D : 19,
			R4 : 78,
            R4_D : 78,
			R5 : 540,
            R5_D : 540,
			R6 : 90,
            R6_D : 90,
			R7 : 26,
			R7_D : 26,
			R8 : 9,
            R8_D : 9,
			FP1 : 13,
			FP2 : 130,
			FC2 : 65,
            FC2_D : 65,
			FP3 : 1170,
			FC3 : 195,
			FC3_D : 195
		}
  }
  
  syxwPlanObj.createDom = function(){
    this.wrapperObj = $("#plan_wrapperObj");
    this.planDomObj = $("#plan_planDomObj");
    this.planNumObj = $("#plan_planNumObj");
    this.planTypeObj = $("#plan_planTypeObj");
    this.lotteryNumObj = $("#plan_lotteryNumObj");
    this.moneyObj = $("#plan_moneyObj");
    this.setObj = $("#plan_setObj");
    this.setNumObj = $("#plan_setNumObj");
    this.setMulObj = $("#plan_setMulObj");
    this.setPercentObj = $("#plan_setPercentObj");
    this.setMoneyObj = $("#plan_setMoneyObj");
    this.keyObj = $("#plan_keyObj");
    this.updBetTipsObj = $("#plan_updBetTipsObj");
	this.qhObj = $("#plan_qhObj");
  }
  
  

  
  
  
  