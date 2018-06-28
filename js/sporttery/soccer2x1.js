
  var soccer2x1Obj = new SportterySoccer({
	   'name': 'soccer2x1',
	   'tpl' : 'template/sporttery/soccer2x1.html'  
  });
  
  soccer2x1Obj.setDefConfig = function(){  
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
    this.betOneTipsText = '<p class="center fontred">红框1场也能投</p><p class="center font12 gray">页面赔率仅供参考，请以出票为准</p>';
    this.ggMode = {
      1:{'1_1':'单关'},
      2:{'2_1':'2串1'},
      3:{'3_1':'3串1','3_3':'3串3', '3_4':'3串4'},
      4:{'4_1':'4串1','4_4':'4串4', '4_5':'4串5', '4_6':'4串6', '4_11':'4串11'},
      5:{'5_1':'5串1','5_5':'5串5', '5_6':'5串6', '5_10':'5串10', '5_16':'5串16', '5_20':'5串20', '5_26':'5串26'},
      6:{'6_1':'6串1','6_6':'6串6', '6_7':'6串7', '6_15':'6串15', '6_20':'6串20', '6_22':'6串22', '6_35':'6串35', '6_42':'6串42', '6_50':'6串50', '6_57':'6串57'},
      7:{'7_1':'7串1','7_7':'7串7', '7_8':'7串8', '7_21':'7串21', '7_35':'7串35', '7_120':'7串120'},
      8:{'8_1':'8串1','8_8':'8串8', '8_9':'8串9', '8_28':'8串28', '8_56':'8串56', '8_70':'8串70', '8_247':'8串247'}
    }
	
    this.lotteryType = 'FTFH';
	this.lotteryNo = '';
	this.maxZS = 50000;
	this.maxMoney = 500000;
	this.showBetNum = false;
	this.betMinMatch = 2;
	this.maxModeLimite = [8,8];
	this.maxMul = 10000;
	this.manner = 2;
	this.betOneTipsText = '<p class="center fontred">至少选择2场</p><p class="center font12 gray">页面赔率仅供参考，请以出票为准</p>';
	this.wid = '';
	this.pid = '';
  }
  
  

  soccer2x1Obj.createDomObj = function(){
    this.lotteryObj = $("#soccer2x1_lotteryObj");
    this.betOneTipsObj = $("#soccer2x1_betOneTipsObj");
    this.lotteryInfoObj = $("#soccer2x1_lotteryInfoObj");
    this.oneGGObj = $("#soccer2x1_oneGGObj");
    this.otherGGObj = $("#soccer2x1_otherGGObj");
    this.ddObj = $("#soccer2x1_ddObj");
    this.ggdoorObj = $("#soccer2x1_ggdoorObj");
    this.ddDetailObj = $("#soccer2x1_ddDetailObj");
    this.ggObj = $("#soccer2x1_ggObj");
    this.ddTitleObj = $("#soccer2x1_ddTitleObj");
    this.matchListObj = $("#soccer2x1_matchListObj");
    this.multipleObj = $("#soccer2x1_multipleObj");
    this.multipleValObj = $("#soccer2x1_multipleValObj");
    this.navObj = $("#soccer2x1_navObj");
    this.updObj = $("#soccer2x1_updObj");
    this.betspObj = $("#soccer2x1_betspObj");
    this.showOtherGGObj = $("#soccer2x1_showOtherGGObj");
	this.bonusOpt = $("#soccer2x1_bonusOpt");
	this.bonusDeilObj = $("#soccer2x1_bonusDeilObj");
    this.bonusListObj = $("#soccer2x1_bonusListObj");
  }
  
  soccer2x1Obj.createTitleDDDom = function(o){
	    var thisData = this.betData[o];
		////console.log(thisData);
		var thisQ = Number(thisData[10]);
		var thisI = thisQ === 1 ? [0,1] : [1,0];
		//var thisKCn = thisQ === 1 ? ["主不败","客胜"] : ["主胜","客不败"]; //原代码有错误
		var thisKCn = thisQ === 1 ?  ["主胜","主不胜"]: ["主不败","主败"];  //modify zhangw
		var thisSp = (thisData[2] && thisData[2][0]) ? thisData[2][0] : thisData[2][1];
		return '<div class="libox clearfix"><span class="del fl" data-o="'+o+'" data-t="delOne"><em class="icon"></em></span><div class="matchcon center w80 fl"><div data-o="'+o+'" data-i="'+thisI[0]+'"><div class="item w50 fl'+(thisData[1][thisI[0]] && thisData[1][thisI[0]][0] ? ' selected' : '')+'" data-t="dds" data-k=0><p><span><em class="gray font12"></em>'+thisData[5]+'</span><span><em class="gray font12">'+thisKCn[0]+'</em> '+thisSp[0]+'</span></p></div></div><div data-o="'+o+'" data-i="'+thisI[1]+'"><div class="item w50 fl'+(thisData[1][thisI[1]] && thisData[1][thisI[1]][2] ? ' selected' : '')+'" data-t="dds" data-k=2><p><span>'+thisData[6]+'<em class="gray font12"></em></span><span><em class="gray font12">'+thisKCn[1]+'</em> '+thisSp[2]+'</span></p></div></div></div><span class="jzdan fr'+(thisData[9] ? ' on' : '')+'" data-o="'+o+'" data-t="dd"><em>胆</em></span></div>';
  }
  
  soccer2x1Obj.createWDLDDDom = function(o,i){
	 return "";
  }
  
  soccer2x1Obj.createRWDLDDDom = function(o,i){
	return "";
  }
  soccer2x1Obj.createfootDDDom = function(o){
	return "";
  }
  
  soccer2x1Obj.initBonusObj = function(){
	  sportteryBonus.createDomObj = function(){
		this.moneyObj = $("#soccer2x1_moneyObj");
		this.bonusObj = $("#soccer2x1_bonusObj");
		this.zhushuObj = $("#soccer2x1_zhushuObj");
	  }   
	  sportteryBonus.init();
   }
  
  soccer2x1Obj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
	//this.getData();
	 soccer2x1Obj.initBonusObj();   //奖金计算对象
  }
	
   

