
  var soccerTotoObj = new SportterySoccer({
	   'name': 'soccerToto',
	   'tpl' : 'template/sporttery/soccerToto.html'  
  });
   
  soccerTotoObj.setDefConfig = function(){  
	this.betData = new Object();
	this.betNum = 0;
	this.ggSelectData = new Array();
	this.multipleVal = 1;
	this.spTemData = new Object();
	this.showBetNum = true;
	this.noDanGuanVal = 0;
	this.temBetData = new Array();
	this.temBetNum = 0;
	this.temNoDanGuanVal = 0;
	this.temScrollTop = 0;
	
	this.betVal = new Array(new Array("3","1","0"),new Array("3","1","0"),new Array("0","1","2","3","4","5","6","7"),new Array("33","31","30","13","11","10","03","01","00"),new Array("10","20","21","30","31","32","40","41","42","50","51","52","90","00","11","22","33","99","01","02","12","03","13","23","04","14","24","05","15","25","09"));
    this.betCnVal = new Array(new Array("胜","平","负"),new Array("胜","平","负"),new Array("0球","1球","2球","3球","4球","5球","6球",">6球"),new Array("胜胜","胜平","胜负","平胜","平平","平负","负胜","负平","负负"),new Array("1-0","2-0","2-1","3-0","3-1","3-2","4-0","4-1","4-2","5-0","5-1","5-2","胜其他","0-0","1-1","2-2","3-3","平其他","0-1","0-2","1-2","0-3","1-3","2-3","0-4","1-4","2-4","0-5","1-5","2-5","负其他"));
    this.betName = new Array("胜平负","让球胜平负","总进球","半全场","比分");
    this.postDataKey = new Array(1,2,5,3,4);
	
    this.lotteryType = 'SPF14';
	this.lotteryNo = '';
	this.maxZS = 50000;
	this.maxMoney = 500000;
	this.showBetNum = false;
	this.betMinMatch = 14;
	this.maxModeLimite = [14];
	this.maxMul = 10000;
	this.ggMode = {
		14 : {'14_1':'14串1'}
	}
	this.betOneTipsText = '<p class="center fontred">请至少选14场比赛</p>';
	this.wid = '';
	this.pid = '';
  }
  
  

  soccerTotoObj.createDomObj = function(){
    this.lotteryObj = $("#soccerToto_lotteryObj");
    this.betOneTipsObj = $("#soccerToto_betOneTipsObj");
    this.lotteryInfoObj = $("#soccerToto_lotteryInfoObj");
    this.oneGGObj = $("#soccerToto_oneGGObj");
    this.otherGGObj = $("#soccerToto_otherGGObj");
    this.ddObj = $("#soccerToto_ddObj");
    this.ggdoorObj = $("#soccerToto_ggdoorObj");
    this.ddDetailObj = $("#soccerToto_ddDetailObj");
    this.ggObj = $("#soccerToto_ggObj");
    this.ddTitleObj = $("#soccerToto_ddTitleObj");
    this.matchListObj = $("#soccerToto_matchListObj");
    this.matchWrapObj =  $("#soccerToto_matchWrap");
	this.lotArrowObj = $("#soccerToto_lotArrow");
    this.multipleObj = $("#soccerToto_multipleObj");
    this.multipleValObj = $("#soccerToto_multipleValObj");
    this.navObj = $("#soccerToto_navObj");
    this.updObj = $("#soccerToto_updObj");
    this.betspObj = $("#soccerToto_betspObj");
    this.showOtherGGObj = $("#soccerToto_showOtherGGObj");
  }
  
  soccerTotoObj.createGGData = function(){
	  if(this.ggSelectData.length){
		return this.ggSelectData;
	  }else if(this.ggMode[this.getMaxGGVal()] && this.ggMode[this.getMaxGGVal()][this.getMaxGGVal()+"_1"]){
		return [this.getMaxGGVal()+"_1"];
	  }else{
		return [];
	  }  
  }
  
  soccerTotoObj.createBetMatchHtml = function(){
	  if(this.betNum>0){
	     this.betOneTipsObj.html('<p class="center">已选择'+this.betNum+'场比赛</p>');
	  }else{
	     this.betOneTipsObj.html(this.betOneTipsText);
	  }  
  }
  
  soccerTotoObj.createWargeData = function(){
	    var postData = [];
		var matchObj = $("#soccerToto .matchObj");
		for(var ok=0,oklen=matchObj.length;ok<oklen;ok++){
			var o = matchObj.eq(ok).attr("data-o");
			if(!this.betData[o])continue;
      		if(!this.betData[o][1])continue;
		    if(!this.betData[o][1][0])continue;
	        var betData = [];
	        for(var k=0,klen=this.betData[o][1][0].length;k<klen;k++){
	          if(this.betData[o][1][0][k])betData.push(this.betData[o][1][0][k]);
	        }
		    postData.push(o+":"+betData.join(","));
		}
		return postData.join(";");  
  }
  
  soccerTotoObj.initBonusObj = function(){
	  sportteryBonus.createDomObj = function(){
		this.moneyObj = $("#soccerToto_moneyObj");
		this.bonusObj = $("#soccerToto_bonusObj");
		this.zhushuObj = $("#soccerToto_zhushuObj");
	  }   
	  sportteryBonus.init();
   }
  
  soccerTotoObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
	//this.getData();
	soccerTotoObj.initBonusObj();   //奖金计算对象
  }
  
  soccerTotoObj.dirShow = function(){
	  var self = this;
	  self.show('',function(){
		 self.getData();  
	  })
   }
	

