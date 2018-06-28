
  var soccerR9Obj = new SportterySoccer({
	   'name': 'soccerR9',
	   'tpl' : 'template/sporttery/soccerR9.html'  
  }); 
  
  soccerR9Obj.setDefConfig = function(){  
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
	
    this.lotteryType = 'SPF9';
	this.lotteryNo = '';
	this.maxZS = 50000;
	this.maxMoney = 500000;
	this.showBetNum = false;
	this.betMinMatch = 9;
	this.maxModeLimite = [9];
	this.maxMul = 10000;
	this.ggMode = {
		9 : {'9_1':'9串1'}
	}
	this.betOneTipsText = '<p class="center fontred">请至少选9场比赛</p>';
	this.wid = '';
	this.pid = '';
  }
  
  

  soccerR9Obj.createDomObj = function(){
    this.lotteryObj = $("#soccerR9_lotteryObj");
    this.betOneTipsObj = $("#soccerR9_betOneTipsObj");
    this.lotteryInfoObj = $("#soccerR9_lotteryInfoObj");
    this.oneGGObj = $("#soccerR9_oneGGObj");
    this.otherGGObj = $("#soccerR9_otherGGObj");
    this.ddObj = $("#soccerR9_ddObj");
    this.ggdoorObj = $("#soccerR9_ggdoorObj");
    this.ddDetailObj = $("#soccerR9_ddDetailObj");
    this.ggObj = $("#soccerR9_ggObj");
    this.ddTitleObj = $("#soccerR9_ddTitleObj");
    this.matchListObj = $("#soccerR9_matchListObj");
	this.matchWrapObj =  $("#soccerR9_matchWrap");
	this.lotArrowObj = $("#soccerR9_lotArrow");
    this.multipleObj = $("#soccerR9_multipleObj");
    this.multipleValObj = $("#soccerR9_multipleValObj");
    this.navObj = $("#soccerR9_navObj");
    this.updObj = $("#soccerR9_updObj"); 
    this.betspObj = $("#soccerR9_betspObj");
    this.showOtherGGObj = $("#soccerR9_showOtherGGObj");
  }
  
  /* -------------------- dan dev ------------------------------- */
  
  soccerR9Obj.createWDLDDDom = function(o,i){
		var thisData = this.betData[o];
		return '<div class="match_detail jzhg center mb10 clearfix" data-o="'+o+'" data-i="'+i+'" data-dg="'+thisData[11][i]+'"><div class="opt_jz'+(thisData[1][i][0] ? ' selected' : '')+'" data-t="dds" data-k=0><span class="leftBorder"><em class="font12 gray">主胜</em> '+thisData[2][i][0]+'</span></div><div class="opt_jz'+(thisData[1][i][1] ? ' selected' : '')+'" data-t="dds" data-k=1><span><em class="font12 gray">平</em> '+thisData[2][i][1]+'</span></div><div class="opt_jz'+(thisData[1][i][2] ? ' selected' : '')+'" data-t="dds" data-k=2><span><em class="font12 gray">客胜</em> '+thisData[2][i][2]+'</span></div></div>';
  };
  
  soccerR9Obj.createTitleDDDom = function(o){
		var thisData = this.betData[o];
		return '<div class="libox clearfix"><div class="tz_info mb15"><span class="del fl" data-o="'+o+'" data-t="delOne"><em class="icon"></em></span><p class="fl vs w80 center"><span class="w33">'+thisData[5]+'</span><span class="w33">VS</span><span class="w33">'+thisData[6]+'</span></p><span class="jzdan fr'+(thisData[9] ? ' on' : '')+'" data-o="'+o+'" data-t="dd"><em>胆</em></span></div><div class="w94 tz_hg">';
  };
  
  soccerR9Obj.createfootDDDom = function(o){
		return "</div></div>";
  };
  
  soccerR9Obj.createGGDoor = function(){
	    var danNum = soccerR9Obj.getDanNum();
		var danHtml = danNum > 0 ? '<span class="num_dot">' + danNum + '</span>' :(soccerR9Obj.betNum > 9 ? '<span class="num_dot spe_1">胆</span>' :'');
		var topDanHtml = danNum > 0  ? '【'+ danNum +'胆】' : '【设胆】';
		var clearHtml = '<em class="js_clear_1 fontblue" data-t="clearMatch" ></em>';
		this.ggdoorObj.html('<span class="fontblue">' + soccerR9Obj.betNum + '场</span>' + danHtml); 
		this.ddTitleObj.html('已选'+this.betNum+'场' + topDanHtml + clearHtml); 
		
  }
  
  soccerR9Obj.setDD = function(obj){
    var thisOId = obj.attr("data-o");
	if(this.betNum <=9) return false;
    if(obj.hasClass('disable'))return true;
    if(obj.hasClass('on')){
      obj.removeClass('on');
      this.betData[thisOId][9] = false;
    }else{
	  if(this.getDanNum() >=8){
		$.alertMsg('最多只能定8个胆!');
		return false;	
	  }
      obj.addClass('on');
      this.betData[thisOId][9] = true;
    }
  }
  
  soccerR9Obj.checkedDD = function(){
    if(this.betNum == 0)return true;
    var minGGVal = this.getMinGGVal();
    var ddNum = this.getDanNum();

    var ddDivObj = this.ddObj.children('div');
    for(var i=0,ilen=ddDivObj.length;i<ilen;i++){
      var ddSpanObj = ddDivObj.eq(i).find('span[data-t="dd"]');
      var thisO = ddSpanObj.attr("data-o");
      if(this.betData[thisO][9])continue;
      if(ddNum >= minGGVal-1 || this.betNum <=9){
        ddSpanObj.addClass('disable');
      }else{
        ddSpanObj.removeClass('disable');
      }
    }
	if(ddNum > 0 && this.bonusOpt){
		this.bonusOpt.hide();	
	}
  }
  
  soccerR9Obj.resetDD = function(){
    if(this.betNum == 0)return true;
    var minGGVal = 9;
    var ddNum = this.getDanNum();
    if(ddNum > minGGVal-1 || this.betNum <= minGGVal){
      for(var o in this.betData){
        if(this.betData[o] && this.betData[o][9])this.betData[o][9]=false;
      }
    } 

    this.createDDDom();
    this.createDDDoor();
	this.checkedDD();
	if(ddNum > 0 && this.bonusOpt){
		this.bonusOpt.hide();	
	}
  }
  
   /* -------------------- dan dev end------------------------------- */
  
  soccerR9Obj.createGGData = function(){
	    if(this.ggSelectData.length){
	      return this.ggSelectData;
	    }else if(this.ggMode[this.getMaxGGVal()] && this.ggMode[this.getMaxGGVal()][this.getMaxGGVal()+"_1"]){
	      return [this.getMaxGGVal()+"_1"];
	    }else{
	      return [];
	    }
  }
  
  soccerR9Obj.createBetMatchHtml = function(){
	  if(this.betNum>0){
	      this.betOneTipsObj.html('<p class="center">已选择'+this.betNum+'场比赛</p>');
	  }else{
	      this.betOneTipsObj.html(this.betOneTipsText);
	  }
  }
  
  soccerR9Obj.createWargeData = function(){
	    var postData = [];
		var matchObj = $("#soccerR9 .matchObj");
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
  
  soccerR9Obj.initBonusObj = function(){
	  sportteryBonus.createDomObj = function(){
		this.moneyObj = $("#soccerR9_moneyObj");
		this.bonusObj = $("#soccerR9_bonusObj");
		this.zhushuObj = $("#soccerR9_zhushuObj");
	  }   
	  sportteryBonus.init();
   }
  
  soccerR9Obj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
	//this.getData(); soccerR9_updObj
	 soccerR9Obj.initBonusObj();   //奖金计算对象
  }
  
  soccerR9Obj.dirShow = function(){
	  var self = this;
	  self.show('',function(){
		 self.getData();  
	  })
   }
	
   

