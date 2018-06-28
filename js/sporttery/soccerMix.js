
  var soccerMixObj = new SportterySoccer({
	   'name': 'soccerMix',
	   'tpl' : 'template/sporttery/soccerMix.html'
  });
  
  soccerMixObj.setDefConfig = function(){  
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
    this.betCnVal = new Array(new Array("胜","平","负"),new Array("胜","平","负"),new Array("0球","1球","2球","3球","4球","5球","6球",">6球"),new Array("胜胜","胜平","胜负","平胜","平平","平负","负胜","负平","负负"),new Array("1:0","2:0","2:1","3:0","3:1","3:2","4:0","4:1","4:2","5:0","5:1","5:2","胜其他","0:0","1:1","2:2","3:3","平其他","0:1","0:2","1:2","0:3","1:3","2:3","0:4","1:4","2:4","0:5","1:5","2:5","负其他"));
    this.betName = new Array("胜平负","让球胜平负","总进球","半全场","比分");
    this.postDataKey = new Array(1,2,5,3,4);
    //this.maxModeLimite = [8];
    //this.betMinMatch = 2;
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
	this.maxModeLimite = [8,8,6,4,4];
	this.betMinMatch = 2;
	this.maxMul = 10000;
	this.wid = '';
	this.pid = '';
	this.showBetLotteryType = "FTBRQSPF,FTSPF,FTJQS,FTBQC,FTBF"
  }
  
  soccerMixObj.createTitleDDDom = function(o){
		var thisData = this.betData[o];
		return '<div class="libox clearfix"><div class="tz_info mb15"><span class="del fl" data-o="'+o+'" data-t="delOne"><em class="icon"></em></span><p class="fl vs w80 center"><span class="w33">'+thisData[5]+'</span><span class="w33">VS</span><span class="w33">'+thisData[6]+'</span></p><span class="jzdan fr'+(thisData[9] ? ' on' : '')+'" data-o="'+o+'" data-t="dd"><em>胆</em></span></div><div class="w94 tz_hg">';
	};
	soccerMixObj.createWDLDDDom = function(o,i){
		var thisData = this.betData[o];
		return '<div class="match_detail jzhg center mb10 clearfix" data-o="'+o+'" data-i="'+i+'" data-dg="'+thisData[11][i]+'"><span class="rq r1">让<em>0</em></span><div class="opt_jz'+(thisData[1][i][0] ? ' selected' : '')+'" data-t="dds" data-k=0><span><em class="font12 gray">主胜</em> '+thisData[2][i][0]+'</span></div><div class="opt_jz'+(thisData[1][i][1] ? ' selected' : '')+'" data-t="dds" data-k=1><span><em class="font12 gray">平</em> '+thisData[2][i][1]+'</span></div><div class="opt_jz'+(thisData[1][i][2] ? ' selected' : '')+'" data-t="dds" data-k=2><span><em class="font12 gray">客胜</em> '+thisData[2][i][2]+'</span></div></div>';
	};
	soccerMixObj.createRWDLDDDom = function(o,i){
		var thisData = this.betData[o];
		return '<div class="match_detail jzhg center mb10 clearfix" data-o="'+o+'" data-i="'+i+'" data-dg="'+thisData[11][i]+'"><span class="rq r2'+(thisData[10]>0 ? " r_red" : " r_green")+'">让<em>'+thisData[10]+'</em></span><div class="opt_jz'+(thisData[1][i][0] ? ' selected' : '')+'" data-t="dds" data-k=0><span><em class="font12 gray">主胜</em> '+thisData[2][i][0]+'</span></div><div class="opt_jz'+(thisData[1][i][1] ? ' selected' : '')+'" data-t="dds" data-k=1><span><em class="font12 gray">平</em> '+thisData[2][i][1]+'</span></div><div class="opt_jz'+(thisData[1][i][2] ? ' selected' : '')+'" data-t="dds" data-k=2><span><em class="font12 gray">客胜</em> '+thisData[2][i][2]+'</span></div></div>';
	};
	soccerMixObj.createTotalGoalsDDDom = function(o,i){
		return this.createScoreDDDom(o,i);
	};
	soccerMixObj.createHalfFullDDDom = function(o,i){
		return this.createScoreDDDom(o,i);
	};
	soccerMixObj.createScoreDDDom = function(o,i){
		var thisData = this.betData[o];
		var colorObj = {
			'2' : 'r4',
			'4' : 'r3',
			'3' : 'r5'	
		}
		var cssStr = (colorObj && colorObj[i]) ? colorObj[i] : 'r3';
		var html = ['<div class="match_detail jzhg jz_score center mb10 clearfix" data-o="'+o+'" data-i="'+i+'" data-dg="'+thisData[11][i]+'"><span class="rq '+ cssStr +' '+(i!=4 ? " pt1" : "")+'">'+this.betName[i]+'</span>'];
		for(var k=0,klen=thisData[1][i].length;k<klen;k++){
			if(!thisData[1][i][k])continue;
			html.push('<div class="opt_jz'+(thisData[1][i][k] ? ' selected' : '')+'" data-t="dds" data-k='+k+'><span><i class="font12">'+this.betCnVal[i][k]+'</i><i>'+thisData[2][i][k]+'</i></span></div>');
		}
		html.push('</div>');
		return html.join("");
	};
	soccerMixObj.createfootDDDom = function(o){
		return "</div></div>";
	};
	soccerMixObj.createTitleSpDom = function(o){
		var spData = this.spTemData[o];
		return '<p class="tit font18 center"><!--em class="font12">['+spData['homeRank']+']</em--> <span>'+spData['homeName']+'</span> <em class="font12 sm">主</em> <span>VS</span> <em class="font12 sm">客</em> <span>'+spData['awayName']+'</span> <!--em class="font12">['+spData['awayRank']+']</em--></p><div class="w94"><div class="hg_wrap">';
	};
	soccerMixObj.createWDLSpDom = function(o){
		var spData = this.spTemData[o];
		var stopBuy = spData['stopBuy'] && spData['stopBuy']["FTBRQSPF"] ? true : false;
		var danguan = spData['danGuan'] && spData['danGuan']["FTBRQSPF"] ? true : false;
		if(stopBuy){
			return '<div class="match_detail jzhg center mb15 clearfix gray"><span class="rq r1">让<em>0</em></span><div class="opt_jz" style="width:100%;"><span><em class="font12 gray">未开售</em></span></div></div>';
		}
		return '<div class="match_detail jzhg center mb15 clearfix'+(stopBuy? " gray" : "")+((!stopBuy && danguan) ? ' m_single' : '')+'" data-o="'+o+'" data-i="0" data-dg="'+(danguan ? '1' : "0")+'"><span class="rq r1">让<em>0</em></span><div class="opt_jz'+(this.checkSelect(o,0,0) ? ' selected' : '')+'" data-t="'+(stopBuy ? "" : "spbet")+'" data-k="0"><span><em class="font12 gray">主胜</em> '+(stopBuy ? "" : spData['mixOdds']['FTBRQSPF'][0])+'</span></div><div class="opt_jz'+(this.checkSelect(o,0,1) ? ' selected' : '')+'" data-t="'+(stopBuy ? "" : "spbet")+'" data-k="1"><span><em class="font12 gray">平</em> '+(stopBuy ? "" : spData['mixOdds']['FTBRQSPF'][1])+'</span></div><div class="opt_jz'+(this.checkSelect(o,0,2) ? ' selected' : '')+'" data-t="'+(stopBuy ? "" : "spbet")+'" data-k="2"><span><em class="font12 gray">客胜</em> '+(stopBuy ? "" : spData['mixOdds']['FTBRQSPF'][2])+'</span></div></div>';
	};
	soccerMixObj.createRWDLSpDom = function(o){
		var spData = this.spTemData[o];
		var stopBuy = spData['stopBuy'] && spData['stopBuy']["FTSPF"] ? true : false;
		var danguan = spData['danGuan'] && spData['danGuan']["FTSPF"] ? true : false;
		if(stopBuy){
			return '<div class="match_detail jzhg center mb15 clearfix gray"><span class="rq r2'+(Number(spData['rq']) > 0 ? " r_red" : " r_green")+'">让<em>'+spData['rq']+'</em></span><div class="opt_jz" style="width:100%;"><span><em class="font12 gray">未开售</em></span></div></div>';
		}
		return '<div class="match_detail jzhg center mb15 clearfix'+(stopBuy? " gray" : "")+((!stopBuy && danguan) ? ' m_single' : '')+'" data-o="'+o+'" data-i="1" data-dg="'+(danguan ? '1' : "0")+'"><span class="rq r2'+(Number(spData['rq']) > 0 ? " r_red" : " r_green")+'">让<em>'+spData['rq']+'</em></span><div class="opt_jz'+(this.checkSelect(o,1,0) ? ' selected' : '')+'" data-t="'+(stopBuy ? "" : "spbet")+'" data-k="0"><span><em class="font12 gray">主胜</em> '+(stopBuy ? "" : spData['mixOdds']['FTSPF'][0])+'</span></div><div class="opt_jz'+(this.checkSelect(o,1,1)? ' selected' : '')+'" data-t="'+(stopBuy ? "" : "spbet")+'" data-k="1"><span><em class="font12 gray">平</em> '+(stopBuy ? "" : spData['mixOdds']['FTSPF'][1])+'</span></div><div class="opt_jz'+(this.checkSelect(o,1,2) ? ' selected' : '')+'" data-t="'+(stopBuy ? "" : "spbet")+'" data-k="2"><span><em class="font12 gray">客胜</em> '+(stopBuy ? "" : spData['mixOdds']['FTSPF'][2])+'</span></div></div>';
	};
	soccerMixObj.createTotalGoalsSpDom = function(o){
		var spData = this.spTemData[o];
		var stopBuy = spData['stopBuy'] && spData['stopBuy']["FTJQS"] ? true : false;
		var danguan = spData['danGuan'] && spData['danGuan']["FTJQS"] ? true : false;
		var html = ['<div class="match_detail jzhg jz_score s_more center mb15 clearfix'+(stopBuy? " gray" : "")+((!stopBuy && danguan) ? ' m_single' : '')+'"  data-o="'+o+'" data-n="'+spData['homeName']+','+spData['awayName']+'" data-p="'+spData['homeRank']+','+spData['awayRank']+'"><span class="rq r4 q4"><i>总进球</i></span><div data-s="'+spData['mixOdds']['FTJQS'].join(",")+'" data-i="2" data-dg="'+(danguan ? '1' : "0")+'">'];
		if(stopBuy){
			html.push('<p class="center font12 gray" style="line-height: 90px;">未开售</p></div></div>');
			return html.join("");
		}
		for(var k=0,klen=spData['mixOdds']['FTJQS'].length;k<klen;k++){
			html.push('<div class="opt_jz'+(this.checkSelect(o,2,k)? ' selected' : '')+'" data-t="'+(stopBuy ? "" : "selectBet")+'" data-k="'+k+'"><span><i class="font12 gray">'+this.betCnVal[2][k]+'</i><i>'+(stopBuy ? "" : spData['mixOdds']['FTJQS'][k])+'</i></span></div>');
		}

		html.push('</div></div>');
		return html.join("");
	};
	soccerMixObj.createHalfFullSpDom = function(o){
		var spData = this.spTemData[o];
		var stopBuy = spData['stopBuy'] && spData['stopBuy']["FTBQC"] ? true : false;
		var danguan = spData['danGuan'] && spData['danGuan']["FTBQC"] ? true : false;
		var html = ['<div class="match_detail jzhg s_more center mb15 clearfix'+(stopBuy? " gray" : "")+((!stopBuy && danguan) ? ' m_single' : '')+'"  data-o="'+o+'" data-n="'+spData['homeName']+','+spData['awayName']+'" data-p="'+spData['homeRank']+','+spData['awayRank']+'"><span class="rq r5 q5"><i>半全场</i></span><div data-s="'+spData['mixOdds']['FTBQC'].join(",")+'" data-i="3" data-dg="'+(danguan ? '1' : "0")+'">'];
		if(stopBuy){
			html.push('<p class="center font12 gray" style="line-height: 124px;">未开售</p></div></div>');
			return html.join("");
		}
		for(var k=0,klen=spData['mixOdds']['FTBQC'].length;k<klen;k++){
			html.push('<div class="opt_jz w30'+(this.checkSelect(o,3,k)? ' selected' : '')+'" data-t="'+(stopBuy ? "" : "selectBet")+'" data-k="'+k+'"><span><i class="font12 gray">'+this.betCnVal[3][k]+'</i><i>'+(stopBuy ? "" : spData['mixOdds']['FTBQC'][k])+'</i></span></div>');
		}

		html.push('</div></div>');
		return html.join("");
	};
	soccerMixObj.createScoreSpDom = function(o){
		var spData = this.spTemData[o];
		var stopBuy = spData['stopBuy'] && spData['stopBuy']["FTBF"] ? true : false;
		var danguan = spData['danGuan'] && spData['danGuan']["FTBF"] ? true : false;
		var html = ['<div class="match_detail jzhg jz_score s_more center mb15 clearfix'+(stopBuy? " gray" : "")+((!stopBuy && danguan) ? ' m_single' : '')+'"  data-o="'+o+'" data-n="'+spData['homeName']+','+spData['awayName']+'" data-p="'+spData['homeRank']+','+spData['awayRank']+'"><span class="rq r3 q3"><i>比分</i></span><div data-s="'+spData['mixOdds']['FTBF'].join(",")+'" data-i="4" data-dg="'+(danguan ? '1' : "0")+'">'];
		if(stopBuy){
			html.push('<p class="center font12 gray" style="line-height: 315px;">未开售</p></div></div>');
			return html.join("");
		}
		for(var k=0,klen=spData['mixOdds']['FTBF'].length;k<klen;k++){
			var wid = (k == 12 || k == 30) ? " w60" : " w20";
			html.push('<div class="opt_jz'+wid+(this.checkSelect(o,4,k)? ' selected' : '')+'" data-t="'+(stopBuy ? "" : "selectBet")+'" data-k="'+k+'"><span><i class="font12 gray">'+this.betCnVal[4][k]+'</i><i>'+(stopBuy ? "" : spData['mixOdds']['FTBF'][k])+'</i></span></div>');
		}

		html.push('</div></div>');
		return html.join("");
	};
	soccerMixObj.createFootSpdom = function(o){
		return '</div><div style="height:150px;"></div></div><div class="bottomcon"><p class="btn_simple btn_jzhg"><a href="javascript:void(0);" data-t="subBet" style="width:100%;"><span>确定</span></a></p></div>';
	}

  soccerMixObj.createDomObj = function(){
    this.lotteryObj = $("#soccerMix_lotteryObj");
    this.betOneTipsObj = $("#soccerMix_betOneTipsObj");
    this.lotteryInfoObj = $("#soccerMix_lotteryInfoObj");
    this.oneGGObj = $("#soccerMix_oneGGObj");
    this.otherGGObj = $("#soccerMix_otherGGObj");
    this.ddObj = $("#soccerMix_ddObj");
    this.ggdoorObj = $("#soccerMix_ggdoorObj");
    this.ddDetailObj = $("#soccerMix_ddDetailObj");
    this.ggObj = $("#soccerMix_ggObj");
    this.ddTitleObj = $("#soccerMix_ddTitleObj");
    this.matchListObj = $("#soccerMix_matchListObj");
    this.multipleObj = $("#soccerMix_multipleObj");
    this.multipleValObj = $("#soccerMix_multipleValObj");
    this.navObj = $("#soccerMix_navObj");
    this.updObj = $("#soccerMix_updObj");
    this.betspObj = $("#soccerMix_betspObj");
    this.showOtherGGObj = $("#soccerMix_showOtherGGObj");
	this.bonusOpt = $("#soccerMix_bonusOpt");
	this.bonusDeilObj = $("#soccerMix_bonusDeilObj");
    this.bonusListObj = $("#soccerMix_bonusListObj");
  }
  
  soccerMixObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
	//this.getData();
	soccerMixObj.initBonusObj();   //奖金计算对象
  }
	
   
   soccerMixObj.initBonusObj = function(){
	  sportteryBonus.createDomObj = function(){
		this.moneyObj = $("#soccerMix_moneyObj");
		this.bonusObj = $("#soccerMix_bonusObj");
		this.zhushuObj = $("#soccerMix_zhushuObj");
	  }   
	  setTimeout(function(){
	  	sportteryBonus.init();
	  },50)
   }
   
   soccerMixObj.dirShow = function(){
	  var self = this;
	  self.show('',function(){
		 self.getData();  
	  })
   }
   
   
  
  

