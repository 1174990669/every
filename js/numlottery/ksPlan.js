var ksPlanObj = new BetPlan({
    name: 'ksPlan',
    tpl: 'template/numlottery/plan.html'
});

ksPlanObj.setDefConfig = function () {
    this.betData = [];
    this.money = 0;
    this.bouns = 0;
    this.planMoney = [];
    this.planMul = [];
    this.winStop = true;
    this.lotteryDate = "";
    this.lotteryNoNum = "";

    this.lotteryType = ConfigObj.fastLotType;
    this.playType = "SUM";
    this.betOneMoney = 2;
    this.betBallNum = {
        SUM: 1,
        TX: 1,
        TXD: 1,
        TXS2: 1,
        TXD2: 2,
        BT3: 3,
        BT2: 2,
        LTX: 1
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

    // 玩法单注奖金
    this.lotteryBouns = {
        TX: 40,
        TXD: 240,
        TXS2: 15,
        TXD2: 80,
        BT3: 40,
        BT2: 8,
        LTX: 10
    }
}

ksPlanObj.createDom = function () {
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
  
  

  
  
  
  