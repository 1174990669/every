  var fastK3Obj = new NumberLottery({
	   'name': 'fastK3',
	   'tpl' : 'template/numlottery/fastK3.html'  
  });
  fastK3Obj.setDefConfig = function(){
	  this.isEdit = false;
	  this.editData = '';
      this.lotteryPlay = "SUM";
      this.lotteryType = ConfigObj.fastK3Type;
      this.lotteryCnName = "快3";
	  this.checkP = true;
      this.lotteryNo = ""; 
	  this.lotteryOneMoney = 2;
	  this.maxZSVal = 50000;
      this.maxMoneyVal = 500000;
      this.lotteryMinNum = [1];
	  this.lotteryMaxNum = [14];
	  this.lotteryBallNum =[14];
	  this.lotteryPlayCnName = {"SUM":"和值","TX":"三同号","TXD-TX":"三同号","TXS2":"二同号","TXD2-TXS2":"二同号","BT3-LTX":"三不同","BT3":"三不同","BT2":"二不同","LTX":"三不同"};
	  this.lotteryBetNumArr = {"SUM":[[0]],"TXD-TX":[[0],[1]],"TXD2-TXS2":[[0,1],[2]],"BT3-LTX":[[0],[1]],"BT3":[[0]],"BT2":[[0]]};
      this.isFastDan = false;
      if (this.lotteryType == "jxk3") {
      	this.lotteryCnName = "江西快3";
      } else if(this.lotteryType == "gxk3"){
      	this.lotteryCnName = "广西快3";
      } else if(this.lotteryType == "jlk3"){
      	this.lotteryCnName = "吉林快3";
      };
    $('#fastK3_playTitleObj').html(this.lotteryCnName+"-和值" + '<em class="down"></em>');  
		
	 this.lotteryBetError = {
		'SUM' : ['至少选择1个号码'],
		'TX' : ['至少选择1个号码'],
		'LTX' : ['至少选择1个号码'],
		'TXD' : ['至少选择1个号码'],
		'TXS2' : ['至少选择1个号码'],
		'TXD2' : ['至少选择1个同号','至少选择1个不同号'],
		'BT3' : ['至少选择3个号码'],
		'BT2' : ['至少选择2个号码'],
	 }
	 
	 
	  this.lotterySelectTips = {
		"SUM" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 至少选1个号码</p><div class="tit_rt"><div class="jixuan p3"><span data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
		"TX" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 至少选1个号码</p><div class="tit_rt"><div class="jixuan p3"><span data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
		"LTX" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 至少选1个号码</p><div class="tit_rt"><div class="jixuan p3"><span data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
		"TXD-TX" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 至少选1个号码</p><div class="tit_rt"><div class="jixuan p3"><span data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
		"TXS2" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 至少选1个号码</p><div class="tit_rt"><div class="jixuan p3"><span data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
		"TXD2-TXS2" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 选择同号和不同号</p><div class="tit_rt"><div class="jixuan p3"><span data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
		"BT3-LTX" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 至少选3个号码</p><div class="tit_rt"><div class="jixuan p3"><span data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),
		"BT2" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 至少选2个号码</p><div class="tit_rt"><div class="jixuan p3"><span data-t="random" data-k=""><em class="icon phone"></em>机选</span><span></span></div></div>'),

	};
	
	//高频胆拖特殊处理 zhangw
	this.lotterySelectDanTips = {
		"BT3" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 胆码1-2个，胆码+拖码至少4个</p> <div class="tit_rt"><span data-t="whatPlay">怎么玩？</span></div></div>'),
		"BT2" : new Array('<p><span class="fontred font14 mr10"><b>·</b></span> 胆码1个，胆码+拖码至少3个</p> <div class="tit_rt"><span data-t="whatPlay">怎么玩？</span></div></div>'),
		
	}
	  
	  this.bonusTips = {
		'SUM' : '预期奖金<span class="fontred">9</span>-<span class="fontred">240</span>元',
		'TX' : '选号与开奖号码相符即中<span class="fontred">40</span>元',
		'TXD' : '选号与开奖号码相符即中<span class="fontred">240</span>元',
		'TXS2' : '选号与开奖号码的重号相同即中<span class="fontred">15</span>元',
		'TXD2' : '选号不按位与开奖号码相符即中<span class="fontred">80</span>元',
		'BT3' : '选号与开奖号码相符即中<span class="fontred">40</span>元',
		'BT2' : '选号与开奖号码中任意2个相符即中<span class="fontred">8</span>元',
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
		 clearInterval( fastK3Obj.correctTimeObj);
		 this.correctTimeObj = '';
	  }
	  if(this.nowTimeObj){
		 clearInterval( fastK3Obj.nowTimeObj);
		 this.nowTimeObj = '';
	  }
	  if(this.syTimeObj){
		clearInterval( fastK3Obj.syTimeObj);
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
  
  fastK3Obj.createDomObj = function(){
    this.lotteryDomObj = $("#fastK3_lotteryObj");
    this.updataPlayObj = $("#fastK3_updataPlayObj");
    this.topMenuObj = $('#fastK3_topMenuLayer');
	this.topDescObj = $('#fastK3_topDesc'); 
    this.jxObj = $('#fastK3_jxLayer');
    this.chartListObj = $('#fastK3_chartList');
    this.zhushuObj = $("#fastK3_zhushuObj");
    this.moneyObj = $("#fastK3_moneyObj");
    this.ddTipsObj = $("#fastK3_ddTipsObj");
    this.playTitleObj = $("#fastK3_playTitleObj");
    this.selectDivObj = $("#fastK3_lotteryObj .selectObj");
    this.selTitleObj = $("#fastK3_lotteryObj .selTitleObj");
	this.qhObj = $("#fastK3_qhObj");
    this.subObj = $("#fastK3_subObj");
	this.betWrap = $('#fastK3_betWrap');
  }
  
   //子玩法在一个界面，隐形先切换玩法.  
   fastK3Obj.checkK3SubType = function(obj){
	  var parObj = obj.parents('.betObj');
	  var type = parObj.attr('data-v')
	  if( type == 'TX'){
		  this.updatePlayData('TX');  
	  }
	  if( type == 'TXD' && this.lotteryPlay == 'TX'){
		  this.updatePlayData('TXD');  
	  }
	  if( type == 'TXD2' && this.lotteryPlay == 'TXS2'){
		   this.updatePlayData('TXD2');  
	  }
	  if( type == 'TXS2' && this.lotteryPlay == 'TXD2'){
		   this.updatePlayData('TXS2');  
	  }
	  if( type == 'LTX' && this.lotteryPlay == 'BT3'){
		    this.updatePlayData('LTX');
	  }
	  if( type == 'BT3' && this.lotteryPlay == 'LTX'){
		   this.updatePlayData('BT3');
	  }
   }
  
   fastK3Obj.updatePlayData = function(thisV){
	    // console.log(thisV);
	    if (thisV == 'SUM') {
	  		$('#upda_SUM').css('color','#ff5024')
	  		$('#upda_TXD,#upda_TXD2,#upda_BT3,#upda_BT2').css('color','#333')
	  	}else if (thisV == 'TXD-TX') {
	  		$('#upda_TXD').css('color','#ff5024')
	  		$('#upda_SUM,#upda_TXD2,#upda_BT3,#upda_BT2').css('color','#333')
	  	}else if (thisV == 'TXD2-TXS2') {
	  		$('#upda_TXD2').css('color','#ff5024')
	  		$('#upda_TXD,#upda_SUM,#upda_BT3,#upda_BT2').css('color','#333')
	  	}else if (thisV == 'BT3-LTX') {
	  		$('#upda_BT3').css('color','#ff5024')
	  		$('#upda_TXD,#upda_TXD2,#upda_SUM,#upda_BT2').css('color','#333')
	  	}else if (thisV == 'BT2') {
	  		$('#upda_BT2').css('color','#ff5024')
	  		$('#upda_TXD,#upda_TXD2,#upda_BT3,#upda_SUM').css('color','#333')
	  	}/*else if (thisV == 'UH6') {
	  		$('#update_UH6').css('color','#ff5024')
	  		$('#update_UP3,#update_UP6,#update_IH,#update_UH3,#update_SUM').css('color','#333')
	  	}*/
	    if(this.isFastDan == 1){  //胆拖玩法 zhangw
			fastK3Obj.BT3Bonus = fastK3Obj.DBonus;
			fastK3Obj.BT2Bonus = fastK3Obj.DBonus;
		}else{
			fastK3Obj.BT3Bonus = fastK3Obj.BT3_Bonus;
			fastK3Obj.BT2Bonus = fastK3Obj.BT2_Bonus;
		}
		/*if(thisV == 'TXD2'){
			this.checkP = true;	
		}else{
			this.checkP = false;
		}*/
		//console.log(this.lotteryCnName);
		thisV = thisV.replace('_D','');
		var danHtml = this.isFastDan == 1 ? '胆拖' : '';
		this.playTitleObj.html(this.lotteryCnName+"-"+this.lotteryPlayCnName[thisV]+ danHtml + '<em class="down"></em>');
	    this.clearBetLottery();
	    this.updateBetDom(thisV);
	    this.updateClassData(thisV);  
	    this.updateBonusTips(thisV);
	    this.createSelectTitleHtml();
	    if($("#fastK3_showK3CharList").attr("data-s")==="1") fastK3Obj.getCG(1);
	};
	fastK3Obj.updateClassData = function(type){
		this.lotteryRandomNum = new Array();
		this.lotteryPlay = type;
		switch (type){
			case "SUM" : this.updateSUMData();break;
			case "TX" : this.updateTXData();break;
			//case "TXD" : this.updateTXDData();break;
			case "TXD-TX" : this.updateTXDTXData();break;
			case "TXD2-TXS2" : this.updateTXD2TXS2Data();break;
			//case "TXD2" : this.updateTXD2Data();break;
			case "BT3-LTX" : this.updateBT3LTXData();break;
			case "BT2" : this.updateBT2Data();break;
			case "BT3" : this.updateBT3Data();break;
			case "LTX" : this.updateLTXData();break;
		}
	};
	fastK3Obj.updateSUMData = function(){
		this.lotteryMinNum = [1];
		this.lotteryMaxNum = [14];
		this.lotteryBallNum = [14];
		this.selectDivObj = this.temBetObj.find(".selectObj");
	};
	fastK3Obj.updateTXData = function(){
		this.lotteryMinNum = [1];
		this.lotteryMaxNum = [1];
		this.lotteryBallNum = [1];
		this.selectDivObj = this.temBetObj.find(".selectObj");
	};
	fastK3Obj.updateLTXData = function(){
		this.lotteryMinNum = [1];
		this.lotteryMaxNum = [1];
		this.lotteryBallNum = [1];
		this.selectDivObj = this.temBetObj.find(".selectObj");
	};
	fastK3Obj.updateTXDData = function(){
		this.lotteryMinNum = [1];
		this.lotteryMaxNum = [6];
		this.lotteryBallNum = [6];
		this.selectDivObj = this.temBetObj.find(".selectObj");
	};
	fastK3Obj.updateTXS2Data = function(){
		this.lotteryMinNum = [1];
		this.lotteryMaxNum = [6];
		this.lotteryBallNum = [6];
		this.selectDivObj = this.temBetObj.find(".selectObj");
	};
	fastK3Obj.updateTXD2Data = function(){
		this.lotteryMinNum = [1,1];
		this.lotteryMaxNum = [6,6];
		this.lotteryBallNum = [6,6];
		this.selectDivObj = this.temBetObj.find(".selectObj");
	};
	fastK3Obj.updateBT3Data = function(){
		this.lotteryMinNum = [3];
		this.lotteryMaxNum = [6];
		this.lotteryBallNum = [6];
		this.selectDivObj = this.temBetObj.find(".selectObj");
	};
	
	fastK3Obj.updateTXD2TXS2Data = function(){
		this.lotteryMinNum = [1,1,1];
		this.lotteryMaxNum = [6,6,6];
		this.lotteryBallNum = [6,6,6];
		this.selectDivObj = this.temBetObj.find(".selectObj");
	};
	
	fastK3Obj.updateBT3LTXData = function(){
		this.lotteryMinNum = [3,1];
		this.lotteryMaxNum = [6,1];
		this.lotteryBallNum = [6,1];
		this.selectDivObj = this.temBetObj.find(".selectObj");
	};
	
	fastK3Obj.updateTXDTXData = function(){
		this.lotteryMinNum = [1,1];
		this.lotteryMaxNum = [6,1];
		this.lotteryBallNum = [6,1];
		this.selectDivObj = this.temBetObj.find(".selectObj");
	};
	
	fastK3Obj.updateBT2Data = function(){
		this.lotteryMinNum = [2];
		this.lotteryMaxNum = [6];
		this.lotteryBallNum = [6];
		this.selectDivObj = this.temBetObj.find(".selectObj");
	};
	
	
	fastK3Obj.updateBetDom = function(type){
		/*if(!this.betObj)this.betObj = this.lotteryDomObj.find(".betObj");
		for(var i=0,ilen=this.betObj.length;i<ilen;i++){
			var thisBetType = this.betObj.eq(i).attr("data-v");
			if(thisBetType != type)this.betObj.eq(i).css("display","none");
			if(thisBetType == type)this.betObj.eq(i).css("display","");
			if(thisBetType == type)this.temBetObj = this.betObj.eq(i);
		}*/
		//console.log(type);
		//由于不可知的css3动画原因导致原h5代码在这里编辑单注功能及切换玩法时候失效，修改如下
		if(!this.betObj)this.betObj = $('#fastK3 .betObj')
		$('#fastK3 .betObj').hide();
		//$('#fastK3 .betObj').filter('[data-v="' + type + '"]').show().css({'transform':''}); 
		if(type.indexOf('-') == -1 && $('#fastK3 .betObj').filter('[data-v="' + type + '"]').length ){
			$('#fastK3 .betObj').filter('[data-v="' + type + '"]').get(0).style.display = 'block';  //解决层级点击问题 zhangw
		}
		if(type == 'TXD2-TXS2'){
			$('#fastK3 .betObj').filter('[data-v="TXD2-TXS2"]').get(0).style.display = 'block';	
		}
		if(type == 'BT3-LTX'){
			$('#fastK3 .betObj').filter('[data-v="BT3-LTX"]').get(0).style.display = 'block';
		}
		if(type == 'TXD-TX'){
			$('#fastK3 .betObj').filter('[data-v="TXD-TX"]').get(0).style.display = 'block';
		}
		
		
		this.temBetObj = $('#fastK3 .betObj').filter('[data-v="' + type + '"]')
		
		if(this.temQuickTipsObj){
			this.temQuickTipsObj.removeClass('showObj');
        	this.temQuickTipsObj.next().hide();
		}
	};
	
	fastK3Obj.updateBonusTips = function(type){
		if(!this.bonusTipsObj)this.bonusTipsObj = $("#fastK3_bonusTipsObj");
		$("#fastK3_bonusTipsObj").html(this.bonusTips[type]);
	} 
  
  
     fastK3Obj.getClientTime = function(){
		return new date().getTime();
	  }
	
	  fastK3Obj.setLotteryNoTipsHtml = function(){
		var html = '正在获取新的期号';
		this.qhObj.html(html);
	  }
	
	  fastK3Obj.getLotteryData = function(tips){
		$.ajax({
		  url : ConfigObj.localSite + ConfigObj.fastK3Api[ConfigObj.fastK3Type].scheme,
		  data : "",
		  type : "post",
		  dataType : "json",
		  success : function(msg){
			// console.log('快3期程',msg);
			
			if(msg.code !== '0000'){
			  $.alertMsg(msg.code_str);
			  fastK3Obj.getTimeObj = setTimeout(function(){
				fastK3Obj.getLotteryData();
			  },fastK3Obj.updateLotteryNoInterval);
			  return false;
			}
			msg.info = $.parseJSON(Global.crypt(msg.info));
			if(msg.info.data.stop == "Y"){
			  fastK3Obj.stop = true;
			  fastK3Obj.qhObj.html("每天09:28-22:28销售");
			  fastK3Obj.setData(msg.info.data);
			  fastK3Obj.resetSetTime();
			  fastK3Obj.subObj.attr("data-stop","1");
			  return false;
			}else{
			  fastK3Obj.subObj.removeAttr('data-stop');
			  fastK3Obj.stop = false;
			}
			if(fastK3Obj.getTimeObj){
			  clearTimeout(fastK3Obj.getTimeObj);
			  fastK3Obj.getTimeObj = "";
			}
			//if(fastK3Obj.tips && fastK3Obj.lotteryNo &&  msg.info.data.lotteryNo != fastK3Obj.lotteryNo){
			 // if($('#fastK3').length > 0 && $('#fastK3').css('display') != 'none'){
			 //	$.alertMsg("当前期已经结束，自动切换到可购买期");
			 // }
			//}
	
			if(fastK3Obj.lotteryNoChange && msg.info.data.lotteryNo != fastK3Obj.lotteryNo){  //自动切换到新期
			  fastK3Obj.setData(msg.info.data);
			  fastK3Obj.resetSetTime();
			  fastK3Obj.lotteryNoChange(msg.info.data);
			  //if($('#fastK3Plan').length > 0){
			//	  fastK3PlanObj.lotteryNoChange(msg.info.data);
			 // }
			}else{
			  fastK3Obj.setData(msg.info.data);
			  fastK3Obj.resetSetTime();
			}
		  }
		});
	  }
	  
	  fastK3Obj.lotteryNoChange = function(data){
		  fastK3Obj.lotteryNo = data.lotteryNo;
		  //fastK3ConfirmObj.lotteryNo = data.lotteryNo; 
		  if($('#fastK3Confirm').length > 0 && fastK3ConfirmObj.updBetTipsObj){
				fastK3ConfirmObj.updBetTipsObj.attr("data-no",data.lotteryNo);
		  } 
	  }
	  
	  fastK3Obj.getNumberLotteryData = function(){
			return {
			  "lotteryType" : fastK3Obj.lotteryType,
			  "lotteryNo" : fastK3Obj.lotteryNo,
			  "lotteryPlay" : fastK3Obj.lotteryPlay
			}  
	  }
	
	  fastK3Obj.getCG = function(time,type){
		 //console.log(time/1000 + '秒后更新图表'); 
		time = time ? time : this.updateLotteryCG;
		fastK3Obj.getCGObj = setTimeout(function(){
		  //console.log('更新图表');
		  var lotteryData = fastK3Obj.getNumberLotteryData();  
		  var dataObj = {
			lottery_type:lotteryData.lotteryType,
			trendType : this.lotteryPlay == 'SUM' ? 'hz' : 'r'
		  }
		  if(type && type==="append"){
			  dataObj.lottery_no = lotteryData.lotteryNo;
			  dataObj.last_result = 1;
		  }
		  
		  var secretData = {
				'para' : Global.encrypt(dataObj)
			};
		  
		  $.ajax({
			url : ConfigObj.localSite + ConfigObj.fastK3Api[ConfigObj.fastK3Type].chart,
			data : secretData,
			type : "post",
			dataType : "json",
			success : function(msg){
				console.log(msg);
				
			  if(msg.code !== "0000"){
				$.alertMsg(msg.code_str);
				fastK3Obj.getCG(fastK3Obj.updateLotteryCGInterval,type);
				return false;
			  }
			  msg.info = $.parseJSON(Global.crypt(msg.info));
			  if(!msg.info || !msg.info.list.length){
				fastK3Obj.getCG(fastK3Obj.updateLotteryCGInterval,type);
				return false;
			  }
			  if(fastK3Obj.getCGObj){
				clearTimeout(fastK3Obj.getCGObj);
				fastK3Obj.getCGObj = "";
			  }
			  fastK3Obj.setCGDom(msg.info.list,type);
			}
		  });
		},time);
	  }
	
	  fastK3Obj.setCGDom = function(data,type){
		fastK3Obj.fastFormatList(data,type);
	  }
	
	  fastK3Obj.setData = function(data){
		this.nowTime = data.nowTime;  //当前服务器时间戳
		this.syTime = data.syTime;   //本期还剩多少秒
		this.lotteryNo = data.lotteryNo;
	  }
	
	  fastK3Obj.resetSetTime = function(){
		if(this.nowTimeObj)clearTimeout(this.nowTimeObj);
		if(this.syTimeObj)clearTimeout(this.syTimeObj);
		this.nowTimeObj = "";
		this.syTimeObj = "";
		this.updateNowTime();
		this.setSytimeDom();
	  }
	
	  fastK3Obj.updateNowTime = function(){
		this.nowTimeObj = setInterval(function(){
		  fastK3Obj.nowTime+=1000;
		},1000);
	  }

	  fastK3Obj.correctTime = function () {
		  fastK3Obj.correctTimeObj = setInterval(function () {
		      // var nowTime = new Date().getTime();
		      // if (!fastK3Obj.syTime) return false;
		      // if (Math.abs(nowTime - fastK3Obj.nowTime) > fastK3Obj.errorTime) {
		      //     fastK3Obj.getLotteryData();
		      // }
		      fastK3Obj.getLotteryData();
		  }, 30000);
	  }
	
	  fastK3Obj.setSytimeDom = function(){
		var thisSyTime = this.syTime;
		this.syTimeObj = setInterval(function(){
		  if(thisSyTime==0){
              // 只能在当前页弹出
              var apage = Global.getActivePage();
              if (apage.length && apage[0].id == 'fastK3') {
                  $.alertMsg("当前期已经结束，自动切换到可购买期");
			  }

			if(fastK3Obj.syTimeObj)clearTimeout(fastK3Obj.syTimeObj);
			fastK3Obj.syTimeObj = "";
			if($("#fastK3_showSYXWCharList").attr("data-s")==="1")fastK3Obj.getCG(fastK3Obj.updateLotteryCG,"append");
			fastK3Obj.setLotteryNoTipsHtml();
			fastK3Obj.getLotteryData();
			return false;
		  }
		  if(!fastK3Obj.stop){
			var miao = thisSyTime%60;
			var fen = (thisSyTime - miao)/60;
			miao = miao<10 ? "0"+miao : miao;
			fen = fen<10 ? "0"+fen : fen;
			var html = '第'+fastK3Obj.lotteryNo+'期 <span class="fontred">距离截止'+fen+':'+miao+'</span>';
			// var poo = '<i class="i-null"></i>'
			// fastK3Obj.qhObj.html(html + poo);
			fastK3Obj.qhObj.html(html);
			/*if($('#fastK3Plan').length > 0){  //高级追号  暂时注释
				fastK3PlanObj.qhObj.html(html);	
			}*/
		  }
		 thisSyTime--;
		 fastK3Obj.syTime --
		  ////console.log(fastK3Obj.syTime);
		},1000);
	  }
	
	  fastK3Obj.chartScroll = function(){
		fastK3Obj.updateLotteryMyScroll = new iScroll($("#fastK3_chartScroll")[0],{  
		  hScrollbar : false,
		  hScroll  : true,
		  vScroll  : false
		});
	  }
	  
	   
      fastK3Obj.SUMBonus = function(){
		// if(this.lotteryBetNum == 0) return 0;
		 var num = 1 *  this.lotteryBetNum[0] ? this.lotteryBetNum[0] : 0;
		 return num;
	  }
	   
	 /* fastK3Obj.TXDBonus = function(){
		 var num = 1 *  this.lotteryBetNum[0] ? this.lotteryBetNum[0] : 0;
		 return num;
	  }
	  
	  fastK3Obj.TXBonus = function(){
		  var num = 1 *  this.lotteryBetNum[0] ? this.lotteryBetNum[0] : 0;
		 return num;
	  }*/
	  
	  fastK3Obj.BT3_Bonus = function(){
		 //var num = 1 *  this.lotteryBetNum[0] ? this.lotteryBetNum[0] : 0;
		 var num = this.computeCombineNum(this.lotteryBetNum[0],3);
		 return num;
	  }
	  
	  
	  fastK3Obj.BT2_Bonus = function(){
		 //var num = 1 *  this.lotteryBetNum[0] ? this.lotteryBetNum[0] : 0;
		 var num = this.computeCombineNum(this.lotteryBetNum[0],2);
		 return num;
	  }
	  
	  //组合数算法
	  fastK3Obj.computeCombineNum=function(x,y){
		var FirstValue=1;
		var SecondValue=1;
		if(!x || !y)return 0;
		if( y > x )return 0;
		if( y==0 )return 1;
		for(var I=0;I<y;I++)
		{	
			FirstValue *= x-I;
			SecondValue *= I+1;	
		}
		var ResultNum = FirstValue/SecondValue;
		return ResultNum;			
	 }
	  
	  
	  fastK3Obj.checkK3Select = function(obj){
		  var thisV = obj.attr("data-v");
   		  var thisK = obj.attr("data-k");
    	  var thisI = obj.parent().attr("data-v");
		  var type = obj.parents('.betObj').attr('data-v');
		  var isValid = true;
		  var msg = '';
		  if(type == 'TXD2-TXS2'){
			   if(thisI == 0){
				    if(this.lotteryBetData[1] && this.lotteryBetData[1].length > 0){
						for(var i=0;i<this.lotteryBetData[1].length;i++){
							if(!this.lotteryBetData[1][i]) continue;
							if(thisV.indexOf(this.lotteryBetData[1][i]) != -1){
								isValid = false;
								msg = '请选择一个不同号码';
							}
						}
					}
			   }
			   if(thisI == 1){
				    if(this.lotteryBetData[0] && this.lotteryBetData[0].length > 0){
						for(var i=0;i<this.lotteryBetData[0].length;i++){
							if(!this.lotteryBetData[0][i]) continue;
							if(this.lotteryBetData[0][i].indexOf(thisV) != -1){
								isValid = false;
								msg = '请选择一个不同号码';
							}
						}
					}
			   }
			   
		  }
		 // //console.log({isValid : isValid, msg : msg});
		  return {isValid : isValid, msg : msg}
	  }
	  
	  fastK3Obj.quickSelectNum = function(obj){
		var thisV = obj.attr("data-v");
		var thisK = Number(obj.parent().attr("data-k"));
		this.clearOneBetLottery(thisK);
		switch(thisV){
		  case "d" : this.quickSelectD(thisK);break;
		  case "x" : this.quickSelectX(thisK);break;
		  case "q" : this.quickSelectQ(thisK);break;
		  case "j" : this.quickSelectJ(thisK);break;
		  case "o" : this.quickSelectO(thisK);break;
		  case "c" : this.quickSelectC(thisK);break;
		}
		this.isRandom = false;
	  }
	  
	  fastK3Obj.quickSelectD = function(key){
		var thisMaxNum = 22;  //暂时这样,以后需要可改成可配置
		var thisSpanObj = this.selectDivObj.eq(key).find("span");
		for(var i=0,ilen=thisSpanObj.length;i<ilen;i++){
		  var thisK = Number(thisSpanObj.eq(i).attr("data-v"));
		  if(thisK<thisMaxNum/2)continue;
		  this.selectNumber(thisSpanObj.eq(i));
		}
	  }
	  
	  fastK3Obj.quickSelectX = function(key){
		var thisMaxNum = 22;
		var thisSpanObj = this.selectDivObj.eq(key).find("span");
		for(var i=0,ilen=thisSpanObj.length;i<ilen;i++){
		  var thisK = Number(thisSpanObj.eq(i).attr("data-v"));
		  if(thisK>=thisMaxNum/2)continue;
		  this.selectNumber(thisSpanObj.eq(i));
		}
	  }
	  
	 fastK3Obj.createSubmitData = function(){
//	 	var isValid = true;
//	 	var msg = '';
//	 	if(this.lotteryPlay == 'TXD2-TXS2'){
//	 		//console.log("2333",this.lotteryBetData[0],this.lotteryBetData[1])
//	 		if(this.lotteryBetData[0] || this.lotteryBetData[1] == undefined){
//	 			isValid = false;
//				msg = '请选择一个不同号码';
//	 		}
//	 		return {isValid : isValid, msg : msg}
//	 	};
	 	
	 	
		var lotteryPlayArr = this.lotteryPlay.split("-");
		var zhushu = this.getZhushu();
		if(zhushu > this.maxZSVal)return [false,"注数最多支持"+(this.maxZSVal/10000).toFixed(0)+"万注"];
    	if(zhushu*this.lotteryOneMoney > this.maxMoneyVal)return [false,"投注金额最大支持"+(this.maxMoneyVal/10000).toFixed(0)+"万元"];
		var betDataArr = [];
		for(var p=0,plen=lotteryPlayArr.length;p<plen;p++){
			var thisPlay = lotteryPlayArr[p];
			var thisBetNumArr = this.lotteryBetNumArr[this.lotteryPlay][p];
			var data = [];
    		var danData = [];
    		for(var i=0,ilen=thisBetNumArr.length;i<ilen;i++){
    			var thisBetKey = thisBetNumArr[i];
				if(!this.lotteryBetData[thisBetKey])continue;
				var temData = [];
				var temDVal = [];
				for(var k=0,klen=this.lotteryBetData[thisBetKey].length;k<klen;k++){
					if(this.lotteryBetData[thisBetKey][k])temData.push(this.lotteryBetData[thisBetKey][k]);
					if(this.lotteryBetData[thisBetKey][k] && this.lotteryBetData[thisBetKey][k].indexOf("d-")>-1)temDVal.push(this.lotteryBetData[thisBetKey][k]);
				}
				if(zhushu<=0 && temData.length && temData.length<this.lotteryMinNum[i])return [false,this.lotteryBetError[this.lotteryPlay][i]];
				if(temData.length)data[i]=temData.join(",");
				if(temDVal.length)danData[i] = temDVal.join(",");
		    }

		    if((this.isFastDan == 1)&& danData.length == 0 && data.length == 0){
		      return [false,"请至少选择1注"];
		    }else if((this.isFastDan == 1)&& danData.length == 0 && data.length != 0){
		      return [false,"请至少选择一个胆码"];
		    } else if ((this.isFastDan == 1)) {
				var maLength = data[0].split(',').length;
                if (thisPlay == 'BT3' && maLength < 4) return [false, '胆码+拖码至少4个'];
                if (thisPlay == 'BT2' && maLength < 3) return [false, '胆码+拖码至少3个'];
			} else if(zhushu == 0 && thisPlay!="TX" && thisPlay!="LTX" && thisPlay!="TXS2"){
				////console.log(thisPlay);
		    	if(thisPlay=="BT3" || thisPlay=="TXD"){
		    		this.selectRandom($("<span data-k='0'></span>"));
		    	}else{
		    		this.selectRandom();
		    	}
		      	this.setMoneyDom();
		      	return [false,""];
		    } 
		    var thiszhushu = this.getZhushu(thisPlay);
			////console.log(thisPlay);
			////console.log(thiszhushu);
		    if(!thiszhushu)continue;
		    //data.push(this.isRandom ? thisPlay+"R" : thisPlay);
			var fastDanType = '';
			if(this.isFastDan){  //zhangw 增加高频订单逻辑，重要
				fastDanType = '_D';
			}
			data.push(thisPlay + fastDanType);
		    data.push(thiszhushu);
		    betDataArr.push(data.join("|"));
		}
		//console.log(betDataArr);
		return betDataArr.join(";");

	}
	  
	  
	
	  fastK3Obj.init = function(){
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
  