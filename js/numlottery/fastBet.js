  var fastBetObj = new NumberLottery({
	   'name': 'fastBet',
	   'tpl' : 'template/numlottery/fastBet.html'  
  });
  fastBetObj.setDefConfig = function(){
	  this.isEdit = false;
	  this.editData = '';
    this.lotteryPlay = "R2";
    this.lotteryType = ConfigObj.fastLotType;
    this.lotteryCnName = "11选5";
    if (this.lotteryType == 'gd11x5') {
			this.lotteryCnName = '广东11选5';
		} else if(this.lotteryType == 'gx11x5'){
			this.lotteryCnName = '广西11选5';
		}else if(this.lotteryType == 'hub11x5'){
			this.lotteryCnName = '湖北11选5';
		}else if(this.lotteryType == 'jx11x5'){
			this.lotteryCnName = '江西11选5';
		}
	  this.checkP = true;
    this.lotteryNo = "";
	  this.lotteryOneMoney = 2;
	  this.maxZSVal = 50000;
    this.maxMoneyVal = 500000;
    this.lotteryMinNum = [2];
	  this.lotteryMaxNum = [11];
	  this.lotteryBallNum =[11];
	  this.lotteryPlayCnName = {"R2":"任二","R3":"任三","R4":"任四","R5":"任五","R6":"任六","R7":"任七","R8":"任八","FP1":"前一","FP2":"前二直","FC2":"前二组","FP3":"前三直","FC3":"前三组"};
	 
	  this.lotteryBetError = {
			'R2' : ['至少选择2个号码'],
			'R3' : ['至少选择3个号码'],
			'R4' : ['至少选择4个号码'],
			'R5' : ['至少选择5个号码'],
			'R6' : ['至少选择6个号码'],
			'R7' : ['至少选择7个号码'],
			'R8' : ['至少选择8个号码'],
			"FP1" : ['至少选1个号码'],
			'FP2' : ['至少选择1个第一位号码','至少选择1个第二位号码'],
			"FC2" : ['至少选择2个号码'],
			'FP3' : ['至少选择1个第一位号码','至少选择1个第二位号码','至少选择1个第三位号码'],
			"FC3" : ['至少选择3个号码']
	  }
	 
	  this.lotterySelectTips = {
			"R2" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 至少选2个号码</p><div class="tit_rt"><div class="jixuan p3"><span data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
			"R3" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 至少选3个号码</p><div class="tit_rt"><div class="jixuan p3"><span  data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
			"R4" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 至少选4个号码</p><div class="tit_rt"><div class="jixuan p3"><span  data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
			"R5" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 至少选5个号码</p><div class="tit_rt"><div class="jixuan p3"><span  data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
			"R6" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 至少选6个号码</p><div class="tit_rt"><div class="jixuan p3"><span  data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
			"R7" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 至少选7个号码</p><div class="tit_rt"><div class="jixuan p3"><span  data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
			"R8" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 至少选8个号码</p><div class="tit_rt"><div class="jixuan p3"><span  data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
			"FP1" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 至少选1个号码</p><div class="tit_rt"><div class="jixuan p3"><span  data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
			"FP2" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 每位至少选1个号码</p><div class="tit_rt"><div class="jixuan p3"><span  data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
			"FC2" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 至少选2个号码</p><div class="tit_rt"><div class="jixuan p3"><span  data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
			"FP3" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 每位至少选1个号码</p><div class="tit_rt"><div class="jixuan p3"><span  data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
			"FC3" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 至少选3个号码</p><div class="tit_rt"><div class="jixuan p3"><span  data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>')
		};
	
	//高频胆拖特殊处理 zhangw
		this.lotterySelectDanTips = {
			"R2" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 胆码1个，胆拖+拖码至少3个</p> <div class="tit_rt"><span data-t="whatPlay">怎么玩？</span></div></div>'),
			"R3" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 胆码1-2个，胆拖+拖码至少4个</p> <div class="tit_rt"><span data-t="whatPlay">怎么玩？</span></div></div>'),
			"R4" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 胆码1-3个，胆拖+拖码至少5个</p> <div class="tit_rt"><span data-t="whatPlay">怎么玩？</span></div></div>'),
			"R5" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 胆码1-4个，胆拖+拖码至少6个</p> <div class="tit_rt"><span data-t="whatPlay">怎么玩？</span></div></div>'),
			"R6" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 胆码1-5个，胆拖+拖码至少7个</p> <div class="tit_rt"><span data-t="whatPlay">怎么玩？</span></div></div>'),
			"R7" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 胆码1-6个，胆拖+拖码至少8个</p> <div class="tit_rt"><span data-t="whatPlay">怎么玩？</span></div></div>'),
			"R8" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 胆码1-7个，胆拖+拖码至少9个</p> <div class="tit_rt"><span data-t="whatPlay">怎么玩？</span></div></div>'),
			"FC2" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 胆码1个，胆拖+拖码至少3个</p> <div class="tit_rt"><span data-t="whatPlay">怎么玩？</span></div></div>'),
			"FC3" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 胆码1-2个，胆拖+拖码至少4个</p> <div class="tit_rt"><span data-t="whatPlay">怎么玩？</span></div></div>')	
		}
	  
	  this.bonusTips = {
			"R2" : '选号与任意2个开奖号码相符即中<span class="fontred">6__</span>元',
			"R3" : '选号与任意3个开奖号码相符即中<span class="fontred">19__</span>元',
			"R4" : '选号与任意4个开奖号码相符即中<span class="fontred">78__</span>元',
			"R5" : '选号与开奖号码相符即中<span class="fontred">540__</span>元',
			"R6" : '选号与开奖号码相符即中<span class="fontred">90__</span>元',
			"R7" : '选号与开奖号码相符即中<span class="fontred">26__</span>元',
			"R8" : '选号与开奖号码相符即中<span class="fontred">9__</span>元',
			"FP1" : '所选号码与开奖号码第一位号码相同<span class="fontred">13__</span>元',
			"FP2" : '所选号码与开奖号码前两位号码相同（且顺序一致）<span class="fontred">130__</span>元',
			"FC2" : '所选号码与开奖号码前两位号码相同（顺序不限）<span class="fontred">65__</span>元',
			"FP3" : '所选号码与开奖号码前三位号码相同（且顺序一致）<span class="fontred">1170__</span>元',
			"FC3" : '所选号码与开奖号码前三位号码相同（顺序不限）<span class="fontred">195__</span>元',
	  };
	  
    this.lotteryBetData = new Array();
    this.lotteryBetNum = new Array();
    this.lotteryBetDanNum = new Array();
    this.lotteryRandomNum = new Object();
    this.last_update = 0;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.last_x = 0;
    this.last_y = 0;
    this.last_z = 0;
    this.shake_timer = '';
    this.temQuickTipsObj = '';
    this.isRandom = false;
	  if(this.correctTimeObj){
		 clearInterval( fastBetObj.correctTimeObj);
		 this.correctTimeObj = '';
	  }
	  if(this.nowTimeObj){
		 clearInterval( fastBetObj.nowTimeObj);
		 this.nowTimeObj = '';
	  }
	  if(this.syTimeObj){
		clearInterval( fastBetObj.syTimeObj);
		this.syTimeObj = '';
	  }
	  this.hasChartData = '';
	  
	  this.updateLotteryMyScroll = '';
	  this.nowTime = new Date().getTime();
	  this.syTime = 0;
	  this.updateLotteryCG = 210000;
	  this.updateLotteryCGInterval = 30000;
	  this.updateLotteryNoInterval = 30000;  //每30秒重新请求期程
	  this.correctInterval = 10000;          //每10秒对本地时间进行校正
	  this.errorTime = 10000;                //误差超过10秒进行校正
	  this.syTimeObj = "";
	  this.nowTimeObj = "";
	  this.getTimeObj = "";
	  this.getCGObj = "";
	  this.stop = false;
	  this.tips = true;    //自动切换期号的时候是否提醒用户
  }
  
  fastBetObj.createDomObj = function(){
    this.lotteryDomObj = $("#fastBet_lotteryObj");
    this.updataPlayObj = $("#fastBet_updataPlayObj");
    this.topMenuObj = $('#fastBet_topMenuLayer');
		this.topDescObj = $('#fastBet_topDesc'); 
    this.jxObj = $('#fastBet_jxLayer');
    this.chartListObj = $('#fastBet_chartList');
    this.zhushuObj = $("#fastBet_zhushuObj");
    this.moneyObj = $("#fastBet_moneyObj");
    this.ddTipsObj = $("#fastBet_ddTipsObj");
    this.playTitleObj = $("#fastBet_playTitleObj");
    this.selectDivObj = $("#fastBet_lotteryObj .selectObj");
    this.selTitleObj = $("#fastBet_lotteryObj .selTitleObj");
		this.qhObj = $("#fastBet_qhObj");
    this.subObj = $("#fastBet_subObj");
		this.betWrap = $('#fastBet_betWrap');
  }
  
   fastBetObj.updatePlayData = function(thisV){
	    if(this.isFastDan == 1){  //胆拖玩法 zhangw
			fastBetObj.R2Bonus = fastBetObj.DBonus;
		}else{
			fastBetObj.R2Bonus = fastBetObj.PBonus;
		}
		fastBetObj.R3Bonus = fastBetObj.R2Bonus;
		fastBetObj.R4Bonus = fastBetObj.R2Bonus;
		fastBetObj.R5Bonus = fastBetObj.R2Bonus;
		fastBetObj.R6Bonus = fastBetObj.R2Bonus;
		fastBetObj.R7Bonus = fastBetObj.R2Bonus;
		fastBetObj.R8Bonus = fastBetObj.R2Bonus;
		fastBetObj.FC2Bonus = fastBetObj.R2Bonus;
		fastBetObj.FC3Bonus = fastBetObj.R2Bonus;
		thisV = thisV.replace('_D','');
		var danHtml = this.isFastDan == 1 ? '胆拖' : '';
		this.playTitleObj.html(this.lotteryCnName+"-"+this.lotteryPlayCnName[thisV]+ danHtml + '<em class="down"></em>');
    this.clearBetLottery();
    this.updateBetDom(thisV);
    this.updateClassData(thisV);  
    this.updateBonusTips(thisV);
    this.createSelectTitleHtml();
    this.updateHaoMaSJ(thisV, this.isFastDan);
    if($("#fastBet_showSYXWCharList").attr("data-s")==="1") fastBetObj.getCG(1);
	};

  /**
   * 更新号码数据
   * @param type
   * @param isDan
   */
  fastBetObj.updateHaoMaSJ = function (type, isDan) {
      type = type.toLowerCase();
      Global.post('?m=lottery.' + this.lotteryType + '.getHaoMaSJ', {type: type, isDan: isDan}, function (res) {
          $ball = $('.ball');
          $div = $('.betObj[data-v="' + type.toUpperCase() + '"]>fieldset>div:first-of-type');
          $p = $div.find('p');

          //console.log($p);

          if (res.code == '0000' && res.info && res.info.length) {
              // 改样式
              $ball.css('margin-right', '5px');
              $div.css('margin-left', '0');

              $xhtip = $p.find('.xhtip');
              if (!$xhtip.length) {
                  $p.prepend('<span class="xhtip"></span>');
                  for (var n = 0; n < 12; n++)
                  	if (n % 4 == 1) $p.find('.xhtip').eq(n).text('遗漏'); // 第一位、第二位、第三位
			  }

              $ballsj = $('.' + type + 'sj .ballsj');
              res.info.forEach(function (v, i) {
                  $ballsj[i].innerHTML = v;
              });
          } else {
              // 样式回去
              $ball.css('margin-right', '10px');
              $div.css('margin', '0 auto');

              $xhtip = $p.find('.xhtip');
              if ($xhtip.length) $xhtip.remove();
          }
      });
  };

	fastBetObj.updateClassData = function(type){
		this.lotteryRandomNum = new Array();
		this.lotteryPlay = type;
		switch (type){
			case "R2" : this.updateR2Data();break;
			case "R3" : this.updateR3Data();break;
			case "R4" : this.updateR4Data();break;
			case "R5" : this.updateR5Data();break;
			case "R6" : this.updateR6Data();break;
			case "R7" : this.updateR7Data();break;
			case "R8" : this.updateR8Data();break;
			case "FP1" : this.updateFP1Data();break;
			case "FP2" : this.updateFP2Data();break;
			case "FC2" : this.updateFC2Data();break;
			case "FP3" : this.updateFP3Data();break;
			case "FC3" : this.updateFC3Data();break;
		}
	};
	fastBetObj.updateR2Data = function(){
		this.lotteryMinNum = [2];
		this.lotteryMaxNum = [11];
		this.lotteryBallNum = [11];
		this.selectDivObj = this.temBetObj.find(".selectObj");
	};
	fastBetObj.updateR3Data = function(){
		this.lotteryMinNum = [3];
		this.lotteryMaxNum = [11];
		this.lotteryBallNum = [11];
		this.selectDivObj = this.temBetObj.find(".selectObj");
	};
	fastBetObj.updateR4Data = function(){
		this.lotteryMinNum = [4];
		this.lotteryMaxNum = [11];
		this.lotteryBallNum = [11];
		this.selectDivObj = this.temBetObj.find(".selectObj");
	};
	fastBetObj.updateR5Data = function(){
		this.lotteryMinNum = [5];
		this.lotteryMaxNum = [11];
		this.lotteryBallNum = [11];
		this.selectDivObj = this.temBetObj.find(".selectObj");
	};
	fastBetObj.updateR6Data = function(){
		this.lotteryMinNum = [6];
		this.lotteryMaxNum = [11];
		this.lotteryBallNum = [11];
		this.selectDivObj = this.temBetObj.find(".selectObj");
	};
	fastBetObj.updateR7Data = function(){
		this.lotteryMinNum = [7];
		this.lotteryMaxNum = [11];
		this.lotteryBallNum = [11];
		this.selectDivObj = this.temBetObj.find(".selectObj");
	};
	fastBetObj.updateR8Data = function(){
		this.lotteryMinNum = [8];
		this.lotteryMaxNum = [11];
		this.lotteryBallNum = [11];
		this.selectDivObj = this.temBetObj.find(".selectObj");
	};
	fastBetObj.updateFP1Data = function(){
		this.lotteryMinNum = [1];
		this.lotteryMaxNum = [11];
		this.lotteryBallNum = [11];
		this.selectDivObj = this.temBetObj.find(".selectObj");
	};
	fastBetObj.updateFP2Data = function(){
		this.lotteryMinNum = [1,1];
		this.lotteryMaxNum = [11,11];
		this.lotteryBallNum = [11,11];
		this.selectDivObj = this.temBetObj.find(".selectObj");
	};
	fastBetObj.updateFC2Data = function(){
		this.lotteryMinNum = [2];
		this.lotteryMaxNum = [11];
		this.lotteryBallNum = [11];
		this.selectDivObj = this.temBetObj.find(".selectObj");
	};
	fastBetObj.updateFP3Data = function(){
		this.lotteryMinNum = [1,1,1];
		this.lotteryMaxNum = [11,11,11];
		this.lotteryBallNum = [11,11,11];
		this.selectDivObj = this.temBetObj.find(".selectObj");
	};
	fastBetObj.updateFC3Data = function(){
		this.lotteryMinNum = [3];
		this.lotteryMaxNum = [11];
		this.lotteryBallNum = [11];
		this.selectDivObj = this.temBetObj.find(".selectObj");
	};
	
	fastBetObj.updateBetDom = function(type){
		/*if(!this.betObj)this.betObj = this.lotteryDomObj.find(".betObj");
		for(var i=0,ilen=this.betObj.length;i<ilen;i++){
			var thisBetType = this.betObj.eq(i).attr("data-v");
			if(thisBetType != type)this.betObj.eq(i).css("display","none");
			if(thisBetType == type)this.betObj.eq(i).css("display","");
			if(thisBetType == type)this.temBetObj = this.betObj.eq(i);
		}*/
		////console.log(type);
		//由于不可知的css3动画原因导致原h5代码在这里编辑单注功能及切换玩法时候失效，修改如下
		if(!this.betObj)this.betObj = $('#fastBet .betObj')
		$('#fastBet .betObj').hide();
		//$('#fastBet .betObj').filter('[data-v="' + type + '"]').show().css({'transform':''}); 
		$('#fastBet .betObj').filter('[data-v="' + type + '"]').get(0).style.display = 'block';  //解决层级点击问题 zhangw 
		this.temBetObj = $('#fastBet .betObj').filter('[data-v="' + type + '"]')
		
		if(this.temQuickTipsObj){
			this.temQuickTipsObj.removeClass('showObj');
        	this.temQuickTipsObj.next().hide();
		}
	};

  /**
   * 更新页面奖金显示
   * @param {string} type 玩法
   */
  fastBetObj.updateBonusTips = function (type) {
      var $bonusTips = $('#fastBet_bonusTipsObj');
      var lType = this.lotteryType.toUpperCase();

      if (!this.bonusTipsObj) this.bonusTipsObj = $bonusTips;

      // 加奖金额显示
      var addPrize = {}, money = 0;
      var lotteryAddPrize = JSON.parse(localStorage.getItem('lotteryAddPrize')); // 加奖数据
      if(!ConfigObj.lotteryAddPrize == false){
	      if (lotteryAddPrize[lType]) addPrize = lotteryAddPrize[lType];
	      if (addPrize[type]) money = addPrize[type];
			}
      if (money) $bonusTips.html(this.bonusTips[type].replace('__', money));
      else $bonusTips.html(this.bonusTips[type].replace('__', ''));
      
  };
  
  
     fastBetObj.getClientTime = function(){
		return new date().getTime();
	  }
	
	  fastBetObj.setLotteryNoTipsHtml = function(){
		var html = '正在获取新的期号';
		this.qhObj.html(html);
		// console.log(html) fastBet_qhObj
	  }
	console.log(ConfigObj.localSite + ConfigObj.fastLotApi[ConfigObj.fastLotType].scheme)
	  fastBetObj.getLotteryData = function(tips){
		$.ajax({
		  url : ConfigObj.localSite + ConfigObj.fastLotApi[ConfigObj.fastLotType].scheme,
		  data : "",
		  type : "post",
		  dataType : "json",
		  success : function(msg){
			console.log('体彩11选5期程',msg);
			if(msg.code !== '0000'){
			  $.alertMsg(msg.code_str);
			  fastBetObj.getTimeObj = setTimeout(function(){
				fastBetObj.getLotteryData();
			  },fastBetObj.updateLotteryNoInterval);
			  return false;
			}
			msg.info = msg.info = $.parseJSON(Global.crypt(msg.info));
//			console.log('体彩11选5期程',msg); fontred
			if(msg.info.stop == "Y"){
			  fastBetObj.stop = true;
			  fastBetObj.qhObj.html("每天09:00-23:00销售");
			  fastBetObj.setData(msg.info);
			  fastBetObj.resetSetTime();
			  fastBetObj.subObj.attr("data-stop","1");
			  return false;
			}else{
			  fastBetObj.subObj.removeAttr('data-stop');
			  fastBetObj.stop = false;
			}
			if(fastBetObj.getTimeObj){
			  clearTimeout(fastBetObj.getTimeObj);
			  fastBetObj.getTimeObj = "";
			}
			//if(fastBetObj.tips && fastBetObj.lotteryNo &&  msg.info.data.lotteryNo != fastBetObj.lotteryNo){
			 // if($('#fastBet').length > 0 && $('#fastBet').css('display') != 'none'){
			 //	$.alertMsg("当前期已经结束，自动切换到可购买期");
			 // }
			//}
	
			if(fastBetObj.lotteryNoChange && msg.info.lotteryNo != fastBetObj.lotteryNo){  //自动切换到新期
			  fastBetObj.setData(msg.info);
			  fastBetObj.lotteryNoChange(msg.info);
			  fastBetObj.resetSetTime();
			  
			  if($('#syxwPlan').length > 0){
				  syxwPlanObj.lotteryNoChange(msg.info);
			  }
			}else{
			  fastBetObj.setData(msg.info);
			  fastBetObj.resetSetTime();
			}
		  }
		});
	  }
	  
	  fastBetObj.lotteryNoChange = function(data){
		  fastBetObj.lotteryNo = data.lotteryNo;
		  //fastBetConfirmObj.lotteryNo = data.lotteryNo; 
		  if($('#fastBetConfirm').length > 0 && fastBetConfirmObj.updBetTipsObj){
				fastBetConfirmObj.updBetTipsObj.attr("data-no",data.lotteryNo);
		  } 
	  }
	  
	  fastBetObj.getNumberLotteryData = function(){
			return {
			  "lotteryType" : fastBetObj.lotteryType,
			  "lotteryNo" : fastBetObj.lotteryNo,
			  "lotteryPlay" : fastBetObj.lotteryPlay
			}  
	  }
	
	  fastBetObj.getCG = function(time,type){
		 //console.log(time/1000 + '秒后更新图表'); 
		time = time ? time : this.updateLotteryCG;
		fastBetObj.getCGObj = setTimeout(function(){
		  //console.log('更新图表');
		  var lotteryData = fastBetObj.getNumberLotteryData();  
		  var dataObj = {
			lottery_type:lotteryData.lotteryType,
			trendType : lotteryData.lotteryPlay
		  }
		  if(type && type==="append"){
			  dataObj.lottery_no = lotteryData.lotteryNo;
			  dataObj.last_result = 1;
		  }
		  var screctData = {
      	'para': Global.encrypt(dataObj)
      }
		  $.ajax({
			url : ConfigObj.localSite + ConfigObj.fastLotApi[ConfigObj.fastLotType].chart,
			data : screctData,
			type : "post",
			dataType : "json",
			success : function(msg){
				console.log(msg)
			  if(msg.code !== "0000"){
				$.alertMsg(msg.code_str);
				fastBetObj.getCG(fastBetObj.updateLotteryCGInterval,type);
				return false;
			  }
			  msg.info = $.parseJSON(Global.crypt(msg.info));
			  if(!msg.info || !msg.info.list.length){
				fastBetObj.getCG(fastBetObj.updateLotteryCGInterval,type);
				return false;
			  }
			  if(fastBetObj.getCGObj){
				clearTimeout(fastBetObj.getCGObj);
				fastBetObj.getCGObj = "";
			  }
			  
			  fastBetObj.setCGDom(msg.info.list,type);
			}
		  });
		},time);
	  }
	
	  fastBetObj.setCGDom = function(data,type){
		fastBetObj.fastFormatList(data,type);
	  }
	
	  fastBetObj.setData = function(data){
		this.nowTime = data.nowTime;  //当前服务器时间戳
		this.syTime = data.syTime;   //本期还剩多少秒
		console.log(this.syTime)
		this.lotteryNo = data.lotteryNo;
	  }
	
	  fastBetObj.resetSetTime = function(){
		if(this.nowTimeObj)clearTimeout(this.nowTimeObj);
		if(this.syTimeObj)clearTimeout(this.syTimeObj);
		this.nowTimeObj = "";
		this.syTimeObj = "";
		this.updateNowTime();
		this.setSytimeDom();
	  }
	
	  fastBetObj.updateNowTime = function(){
		this.nowTimeObj = setInterval(function(){
		  fastBetObj.nowTime+=1000;
		},1000);
	  }
	
	  fastBetObj.correctTime = function(){
		fastBetObj.correctTimeObj = setInterval(function(){
		  //console.log('correct');
		  var nowTime = new Date().getTime();
		  if(!fastBetObj.syTime)return false;
		  if(Math.abs(nowTime - fastBetObj.nowTime)>fastBetObj.errorTime){
			fastBetObj.getLotteryData();
		  }
		},this.correctInterval);
	  }
	
	  fastBetObj.setSytimeDom = function(){
		var thisSyTime = this.syTime;
		this.syTimeObj = setInterval(function(){
		  if(thisSyTime==0){
              // 只能在当前页弹出 fastBet_qhObj
              var apage = Global.getActivePage();
              if (apage.length && apage[0].id == 'fastBet') {
              	console.log(1)
                  $.alertMsg("当前期已经结束，自动切换到可购买期");
              }

			if(fastBetObj.syTimeObj)clearTimeout(fastBetObj.syTimeObj);
			fastBetObj.syTimeObj = "";
			if($("#fastBet_showSYXWCharList").attr("data-s")==="1")fastBetObj.getCG(fastBetObj.updateLotteryCG,"append");
			fastBetObj.setLotteryNoTipsHtml();
			fastBetObj.getLotteryData();
			return false;
		  }
		  if(!fastBetObj.stop){
			var miao = thisSyTime%60;
			// console.log(thisSyTime)
			var fen = (thisSyTime - miao)/60;
			miao = miao<10 ? "0"+miao : miao;
			fen = fen<10 ? "0"+fen : fen;
			var html = '第'+fastBetObj.lotteryNo+'期 <span class="fontred">距离截止'+fen+':'+miao+'</span>';
			// var poo = '<i class="i-null"></i>'
			// fastBetObj.qhObj.html(html + poo);
			fastBetObj.qhObj.html(html);
			// console.log(html)
			if($('#syxwPlan').length > 0){  //高级追号
				syxwPlanObj.qhObj.html(html);	
			}
		  }
		 thisSyTime--;
		 fastBetObj.syTime --
		  ////console.log(fastBetObj.syTime);
		},1000);
	  }
	
	  fastBetObj.chartScroll = function(){
		fastBetObj.updateLotteryMyScroll = new iScroll($("#fastBet_chartScroll")[0],{  
		  hScrollbar : false,
		  hScroll  : true,
		  vScroll  : false
		});
	  }
	  
	  
	
	  fastBetObj.init = function(){
		this.setDefConfig();
		this.createDomObj();
		this.createEvent();   
		this.updateBet();    
		this.updateNowTime();
		this.correctTime();
		this.setLotteryNoTipsHtml();
		this.getLotteryData(true);
		this.chartScroll();
		
	  }
	  
	  
  