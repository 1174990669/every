
  var basketMixObj = new SportterySoccer({
	   'name': 'basketMix',
	   'tpl' : 'template/sporttery/basketMix.html'  
  });
  
  basketMixObj.setDefConfig = function(){  
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
	
	
    this.lotteryType = 'BSKFH';
	this.lotteryNo = '';
	this.maxZS = 50000;
	this.maxMoney = 500000;
	this.showBetNum = false;
	this.betMinMatch = 2;
	this.maxModeLimite = [8,8,8,4];
	this.maxMul = 10000;
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
	this.postDataKey = new Array(6,7,8,9);
	this.showBetLotteryType = "BSKSF,BSKRFSF,BSKDXF,BSKSFC";
	this.wid = '';
	this.pid = '';
	this.consignType = 'alone';
  }
  
  

  basketMixObj.createDomObj = function(){
    this.lotteryObj = $("#basketMix_lotteryObj");
    this.betOneTipsObj = $("#basketMix_betOneTipsObj");
    this.lotteryInfoObj = $("#basketMix_lotteryInfoObj");
    this.oneGGObj = $("#basketMix_oneGGObj");
    this.otherGGObj = $("#basketMix_otherGGObj");
    this.ddObj = $("#basketMix_ddObj");
    this.ggdoorObj = $("#basketMix_ggdoorObj");
    this.ddDetailObj = $("#basketMix_ddDetailObj");
    this.ggObj = $("#basketMix_ggObj");
    this.ddTitleObj = $("#basketMix_ddTitleObj");
    this.matchListObj = $("#basketMix_matchListObj");
    this.multipleObj = $("#basketMix_multipleObj");
    this.multipleValObj = $("#basketMix_multipleValObj");
    this.navObj = $("#basketMix_navObj");
    this.updObj = $("#basketMix_updObj");
    this.betspObj = $("#basketMix_betspObj");
    this.showOtherGGObj = $("#basketMix_showOtherGGObj");
	
	this.bonusDeilObj = $("#basketMix_bonusDeilObj");
    this.bonusListObj = $("#basketMix_bonusListObj");
  }
  
  var basketMix_funObj = {
	 setBetNum : function(o){
		var showbetObj = this.matchListObj.find("div[data-t='showBet'][data-o='"+o+"']");
	    if(!showbetObj.length)return true;
	    var betNum = this.getTipsBetNum(o);
	    if(betNum){
	    	var html = ['<span class="rq r5">胜分差</span><div class="opt_jz selected" data-t="showBet" data-o="'+o+'"><span>'];
	    	for(var i=0,n=0,ilen=this.betData[o][1][3].length;i<ilen;i++){
	    		if(n==3){
	    			html.push('...');
	    			break;
	    		}
	    		if(!this.betData[o][1][3][i])continue;
	    		html.push(' <em class="font12 gray">'+this.betCnVal[3][i]+'</em>');
	    		n++;
	    	}
	
	    	html.push('</span></div>');
	    	showbetObj.html(html.join(""));
	    }else{
	      showbetObj.html('<span class="rq r5">胜分差</span><div class="opt_jz" data-t="showBet" data-o="'+o+'"><span>点击选择胜分差</span></div></div>');
	    }
	},
	getTipsBetNum : function(o){
		var num = 0;
	    if(!this.betData[o])return num;
	    if(!this.betData[o][3])return num;
	    for(var i=3,ilen=this.betData[o][3].length;i<ilen;i++){
	      if(!this.betData[o][3][i])continue;
	      num+=this.betData[o][3][i];
	    }
	    return num;
	},
	betVal : new Array(new Array("2","1"),new Array("2","1"),new Array("1","2"),new Array("11","12","13","14","15","16","01","02","03","04","05","06")),
	betCnVal : new Array(new Array("客胜","主胜"),new Array("客胜","主胜"),new Array("大","小"),new Array("客胜1-5", "客胜6-10", "客胜11-15", "客胜16-20", "客胜21-25", "客胜26+", "主胜1-5", "主胜6-10", "主胜11-15", "主胜16-20", "主胜21-25", "主胜26+")),
	betName : new Array("胜负","让分","大小分","胜分差"),
	
	
	
	createTitleDDDom : function(o){
		var thisData = this.betData[o];
		return '<div class="libox clearfix"><div class="tz_info mb15"><span class="del fl" data-o="'+o+'" data-t="delOne"><em class="icon"></em></span><p class="fl vs w80 center"><span class="w33">'+thisData[5]+'</span><span class="w33">VS</span><span class="w33">'+thisData[6]+'</span></p><span class="jzdan fr'+(thisData[9] ? ' on' : '')+'" data-o="'+o+'" data-t="dd"><em>胆</em></span></div><div class="w94 tz_hg tz_lc">';
	},
	createWDLDDDom : function(o,i){
		var thisData = this.betData[o];
		return '<div class="match_detail jzhg center mb10 clearfix" data-o="'+o+'" data-i="'+i+'" data-dg="'+thisData[11][i]+'"><span class="rq r_red">胜负</span><div class="opt_jz'+(thisData[1][i][0] ? ' selected' : '')+'" data-t="dds" data-k=0><span><em class="font12 gray">客胜</em> '+thisData[2][i][0]+'</span></div><div class="opt_jz'+(thisData[1][i][1] ? ' selected' : '')+'" data-t="dds" data-k=1><span><em class="font12 gray">主胜</em> '+thisData[2][i][1]+'</span></div></div>';
	},
	createRWDLDDDom : function(o,i){
		var thisData = this.betData[o];
		return '<div class="match_detail jzhg center mb10 clearfix" data-o="'+o+'" data-i="'+i+'" data-dg="'+thisData[11][i]+'"><span class="rq r3">让分</span><div class="opt_jz'+(thisData[1][i][0] ? ' selected' : '')+'" data-t="dds" data-k=0><span><em class="font12 gray">客胜</em> '+thisData[2][i][0]+'</span></div><div class="opt_jz'+(thisData[1][i][1] ? ' selected' : '')+'" data-t="dds" data-k=1><span><em class="font12 gray">主胜</em> '+thisData[2][i][1]+'</span></div></div>';
	},
	createTotalGoalsDDDom : function(o,i){
		
		var thisData = this.betData[o];
		return '<div class="match_detail jzhg center mb10 clearfix" data-o="'+o+'" data-i="'+i+'" data-dg="'+thisData[11][i]+'"><span class="rq r4">大小分</span><div class="opt_jz'+(thisData[1][i][0] ? ' selected' : '')+'" data-t="dds" data-k=0><span><em class="font12 gray">大</em> '+thisData[2][i][0]+'</span></div><div class="opt_jz'+(thisData[1][i][1] ? ' selected' : '')+'" data-t="dds" data-k=1><span><em class="font12 gray">小</em> '+thisData[2][i][1]+'</span></div></div>';
	},
	createHalfFullDDDom : function(o,i){
		return this.createScoreDDDom(o,i);
	},
	createScoreDDDom : function(o,i){
		var thisData = this.betData[o];
		var html = ['<div class="match_detail jzhg jz_score center mb10 clearfix" data-o="'+o+'" data-i="'+i+'" data-dg="'+thisData[11][i]+'"><span class="rq r3'+(i==4? " r3" :(i==2?" r4" : " r5"))+(i!=4 ? " pt1" : "")+'">'+this.betName[i]+'</span>'];
		for(var k=0,klen=thisData[1][i].length;k<klen;k++){
			if(!thisData[1][i][k])continue;
			html.push('<div class="opt_jz'+(thisData[1][i][k] ? ' selected' : '')+'" data-t="dds" data-k='+k+'><span><i class="font12">'+this.betCnVal[i][k]+'</i><i>'+thisData[2][i][k]+'</i></span></div>');
		}
		html.push('</div>');
		return html.join("");
	},
	createfootDDDom : function(o){
		return "</div></div>";
	},
	createTitleSpDom : function(o){
		var spData = this.spTemData[o];
		return '<p class="tit font18 center"><!--em class="font12">['+spData['awayRank']+']</em--> <span>'+spData['awayName']+'</span> <em class="font12 sm">客</em> <span>VS</span> <em class="font12 sm">主</em> <span>'+spData['homeName']+'</span> <!--em class="font12">['+spData['homeRank']+']</em--></p><div class="w94"><div class="hg_wrap lc_wrap">';
	},
	createWDLSpDom : function(o){
		var spData = this.spTemData[o];
		var stopBuy = spData['stopBuy'] && spData['stopBuy']["BSKSF"] ? true : false;
		var danguan = spData['danGuan'] && spData['danGuan']["BSKSF"] ? true : false;
		if(stopBuy){
			return '<div class="match_detail jzhg center mb15 clearfix gray"><span class="rq r1">让<em>0</em></span><div class="opt_jz" style="width:100%;"><span><em class="font12 gray">未开售</em></span></div></div>';
		}
		return '<div class="match_detail jzhg center mb15 clearfix'+(stopBuy? " gray" : "")+((!stopBuy && danguan) ? ' m_single' : '')+'" data-o="'+o+'" data-i="0" data-dg="'+(danguan ? '1' : "0")+'"><span class="rq r2 r_red">胜负</span><div class="opt_jz'+(this.checkSelect(o,0,0) ? ' selected' : '')+'" data-t="'+(stopBuy ? "" : "spbet")+'" data-k="0"><span><em class="font12 gray">客胜</em> '+(stopBuy ? "" : spData['mixOdds']['BSKSF'][1])+'</span></div><div class="opt_jz'+(this.checkSelect(o,0,1) ? ' selected' : '')+'" data-t="'+(stopBuy ? "" : "spbet")+'" data-k="1"><span><em class="font12 gray">主胜</em> '+(stopBuy ? "" : spData['mixOdds']['BSKSF'][0])+'</span></div></div>';
	},
	createRWDLSpDom : function(o){
		var spData = this.spTemData[o];
		var stopBuy = spData['stopBuy'] && spData['stopBuy']["BSKRFSF"] ? true : false;
		var danguan = spData['danGuan'] && spData['danGuan']["BSKRFSF"] ? true : false;
		if(stopBuy){
			return '<div class="match_detail jzhg center mb15 clearfix gray"><span class="rq r2'+(Number(spData['rq']) > 0 ? " r_red" : " r_green")+'">让<em>'+spData['rq']+'</em></span><div class="opt_jz" style="width:100%;"><span><em class="font12 gray">未开售</em></span></div></div>';
		}
		return '<div class="match_detail jzhg center mb15 clearfix'+(stopBuy? " gray" : "")+((!stopBuy && danguan) ? ' m_single' : '')+'" data-o="'+o+'" data-i="1" data-dg="'+(danguan ? '1' : "0")+'"><span class="rq r3">让分</span><div class="opt_jz'+(this.checkSelect(o,1,0) ? ' selected' : '')+'" data-t="'+(stopBuy ? "" : "spbet")+'" data-k="0"><span><em class="font12 gray">客胜</em> '+(stopBuy ? "" : spData['mixOdds']['BSKRFSF'][1])+'</span></div><div class="opt_jz'+(this.checkSelect(o,1,1) ? ' selected' : '')+'" data-t="'+(stopBuy ? "" : "spbet")+'" data-k="1"><span><em class="font12 gray">主'+(Number(spData['mixOdds']['BSKRFSF'][2])>0 ? '<i class="fontred">'+spData['mixOdds']['BSKRFSF'][2]+'</i>' : '<i class="fontgreen">'+spData['mixOdds']['BSKRFSF'][2]+'</i>')+'胜</em> '+(stopBuy ? "" : spData['mixOdds']['BSKRFSF'][0])+'</span></div></div>';
	},
	createTotalGoalsSpDom : function(o){
		var spData = this.spTemData[o];
		var stopBuy = spData['stopBuy'] && spData['stopBuy']["BSKDXF"] ? true : false;
		var danguan = spData['danGuan'] && spData['danGuan']["BSKDXF"] ? true : false;
		if(stopBuy){
			return '<div class="match_detail jzhg center mb15 clearfix gray"><span class="rq r2'+(Number(spData['rq']) > 0 ? " r_red" : " r_green")+'">让<em>'+spData['rq']+'</em></span><div class="opt_jz" style="width:100%;"><span><em class="font12 gray">未开售</em></span></div></div>';
		}
		return '<div class="match_detail jzhg center mb15 clearfix'+(stopBuy? " gray" : "")+((!stopBuy && danguan) ? ' m_single' : '')+'" data-o="'+o+'" data-i="2" data-dg="'+(danguan ? '1' : "0")+'"><span class="rq r4">大小分</span><div class="opt_jz'+(this.checkSelect(o,2,0) ? ' selected' : '')+'" data-t="'+(stopBuy ? "" : "spbet")+'" data-k="0"><span><em class="font12 gray">大于'+(spData['mixOdds']['BSKDXF'][2])+'</em> '+(stopBuy ? "" : spData['mixOdds']['BSKDXF'][0])+'</span></div><div class="opt_jz'+(this.checkSelect(o,2,1) ? ' selected' : '')+'" data-t="'+(stopBuy ? "" : "spbet")+'" data-k="1"><span><em class="font12 gray">小于'+(spData['mixOdds']['BSKDXF'][2])+'</em> '+(stopBuy ? "" : spData['mixOdds']['BSKDXF'][1])+'</span></div></div>';
	},
	createHalfFullSpDom : function(o){
		var spData = this.spTemData[o];
		var stopBuy = spData['stopBuy'] && spData['stopBuy']["BSKSFC"] ? true : false;
		var danguan = spData['danGuan'] && spData['danGuan']["BSKSFC"] ? true : false;
		var spArrVal = spData['mixOdds']['BSKSFC'][1].split(",");
		var spVal = spData['mixOdds']['BSKSFC'][1] + ',' + spData['mixOdds']['BSKSFC'][0];
		var html = ['<div class="match_detail lc-w33 jzhg center clearfix'+(stopBuy? " gray" : "")+((!stopBuy && danguan) ? ' m_single' : '')+'" data-o="'+o+'" data-n="'+spData['homeName']+','+spData['awayName']+'" data-p="'+spData['homeRank']+','+spData['awayRank']+'"><span class="rq r5">客胜</span><div data-s="'+spVal+'" data-i="3" data-dg="'+(danguan ? '1' : "0")+'">'];

		if(stopBuy){
			html.push('<p class="center font12 gray" style="line-height: 124px;">未开售</p></div></div>');
			return html.join("");
		}

		for(var k=0,klen=spArrVal.length;k<klen;k++){
			html.push('<div class="opt_jz'+(this.checkSelect(o,3,k)? ' selected' : '')+'" data-t="'+(stopBuy ? "" : "selectBet")+'" data-k="'+k+'"><span><em class="font12 gray">'+this.betCnVal[3][k]+' </em> '+(stopBuy ? "" :spArrVal[k])+'</span></div>');
		}

		html.push('</div></div>');
		return html.join("");
	},
	createScoreSpDom : function(o){
		var spData = this.spTemData[o];
		var stopBuy = spData['stopBuy'] && spData['stopBuy']["BSKSFC"] ? true : false;
		var danguan = spData['danGuan'] && spData['danGuan']["BSKSFC"] ? true : false;
		var spArrVal = spData['mixOdds']['BSKSFC'][0].split(",");
		var spVal = spData['mixOdds']['BSKSFC'][1] + ',' + spData['mixOdds']['BSKSFC'][0];
		var html = ['<div class="match_detail lc-w33 jzhg center clearfix'+(stopBuy? " gray" : "")+((!stopBuy && danguan) ? ' m_single' : '')+'" data-o="'+o+'" data-n="'+spData['homeName']+','+spData['awayName']+'" data-p="'+spData['homeRank']+','+spData['awayRank']+'"><span class="rq r5">主胜</span><div data-s="'+spVal+'" data-i="3" data-dg="'+(danguan ? '1' : "0")+'">'];

		if(stopBuy){
			html.push('<p class="center font12 gray" style="line-height: 124px;">未开售</p></div></div>');
			return html.join("");
		}

		for(var k=0,klen=spArrVal.length;k<klen;k++){
			html.push('<div class="opt_jz'+(this.checkSelect(o,3,k+6)? ' selected' : '')+'" data-t="'+(stopBuy ? "" : "selectBet")+'" data-k="'+(k+6)+'"><span><em class="font12 gray">'+this.betCnVal[3][k+6]+' </em> '+(stopBuy ? "" : spArrVal[k])+' </span></div>');
		}

		html.push('</div></div>');
		return html.join("");
	},
	createFootSpdom : function(o){
		return '</div><div style="height:150px;"></div></div><div class="bottomcon"><p class="btn_simple btn_jzhg"><a href="javascript:void(0);" data-t="subBet" class="w50"><span>确定</span></a></p></div>';
	}
	  
  }
  
  for(var i in basketMix_funObj){
	 basketMixObj[i] =  basketMix_funObj[i];
  }
  
  basketMixObj.bonusConfig = {
	betName  : ["sf", "rfsf", "dxf", "sfc"],
	getBetVal :function(n) {
		n = Number(n);
		var nlen = 12
		var sfcVal = ["1-5", "6-10", "11-15", "16-20", "21-25", "26", "1-5", "6-10", "11-15", "16-20", "21-25", "26"];
		var spArr = [];
		for (var i = 0; i < 12; i++) {
			var thisSfcVal = sfcVal[i].split("-");
			var minF = thisSfcVal[0];
			var maxF = thisSfcVal[1];
			if (i > 5) {
				var sfBet = 1;
				if (i == 11) {
					var rfsfVal = n < 0 ? (n * -1 < minF ? [1] : [0]) : ([1]);
				} else {
					var rfsfVal = n < 0 ? (n * -1 < minF ? [1] : (n * -1 > maxF ? [0] : [0, 1])) : ([1]);
				}
			} else {
				var sfBet = 0;
				if (i == 5) {
					var rfsfVal = n > 0 ? (n < minF ? [0] : [0, 1]) : ([0]);
				} else {
					var rfsfVal = n > 0 ? (n < minF ? [0] : (n > maxF ? [1] : [0, 1])) : ([0]);
				}
			}
			spArr[i] = [
				[sfBet], rfsfVal, [0, 1],
				[i]
			];
		}
		return spArr;
	}
  }
  
 
  
  basketMixObj.initBonusObj = function(){
	  sportteryBonus.createDomObj = function(){
		this.moneyObj = $("#basketMix_moneyObj");
		this.bonusObj = $("#basketMix_bonusObj");
		this.zhushuObj = $("#basketMix_zhushuObj");
	  }   
	  sportteryBonus.init(basketMixObj.bonusConfig);
  }
  
  basketMixObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
	//this.getData();
	basketMixObj.initBonusObj();   //奖金计算对象
  }
  
  basketMixObj.dirShow = function(){
	  var self = this;
	  self.show('',function(){
		 self.getData();  
	  })
   }
	

