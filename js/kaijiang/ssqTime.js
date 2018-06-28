
  var ssqTimeObj = new Object();
  
  ssqTimeObj.createDom = function(){
    this.qhObj = $("#ssqTrend_qhObj");
    this.subObj = $("#ssqTrend_subObj");
  }

  ssqTimeObj.getClientTime = function(){
    return new date().getTime();
  }

  ssqTimeObj.setLotteryNoTipsHtml = function(){
    var html = '正在获取新的期号';
    this.qhObj.html(html);
  }

  ssqTimeObj.getLotteryData = function(tips){
    $.ajax({
      url : ConfigObj.localSite + '?version=1&m=Ajax.stat.getscheduletime',
      data : "lotteryType=SSQ&v=" + new Date().getTime(),
      type : "post",
      dataType : "json",
      success : function(msg){
		console.log('大乐透走势图表投注期程',msg);
        if(msg.code !== '0000'){
          $.alertMsg(msg.code_str);
          ssqTimeObj.getTimeObj = setTimeout(function(){
            ssqTimeObj.getLotteryData();
          },ssqTimeObj.ssqTimeObjNoInterval);
          return false;
        }
        if(msg.info.stop == "Y"){
          ssqTimeObj.stop = true;
          ssqTimeObj.qhObj.html("每天09:00-23:50销售");
          ssqTimeObj.setData(msg.info);
          ssqTimeObj.resetSetTime();
          ssqTimeObj.subObj.attr("data-stop","1");
          return false;
        }else{
          ssqTimeObj.subObj.removeAttr('data-stop');
          ssqTimeObj.stop = false;
        }
        if(ssqTimeObj.getTimeObj){
          clearTimeout(ssqTimeObj.getTimeObj);
          ssqTimeObj.getTimeObj = "";
        }
        //if(this.tips && ssqTimeObj.lotteryNo && msg.info.lotteryNo != ssqTimeObj.lotteryNo){
		//  if($('#ssqConfirm').length > 0 && $('#ssqConfirm').css('display') != 'none'){
        //  	$.alertMsg("当前期已经结束，自动切换到可购买期");
		//  }
       // }

        if(ssqTimeObj.lotteryNoChange && msg.info.lotteryNo != ssqTimeObj.lotteryNo){
          ssqTimeObj.setData(msg.info);
          ssqTimeObj.resetSetTime();
          ssqTimeObj.lotteryNoChange(msg.info);
        }else{
          ssqTimeObj.setData(msg.info);
          ssqTimeObj.resetSetTime();
        }
      }
    });
  }
  
  ssqTimeObj.lotteryNoChange = function(data){
	ssqTrendObj.postData.lotteryNoVal = data.lotteryNo; 
	//ssqConfirmObj.lotteryNo = data.lotteryNo;  
	if($('#ssqConfirm').length > 0 && ssqConfirmObj.updBetTipsObj){
		ssqConfirmObj.updBetTipsObj.attr("data-no",data.lotteryNo);
	}
  }

  ssqTimeObj.getCG = function(time,type){
    time = time ? time : this.ssqTimeObjCG;
    ssqTimeObj.getCGObj = setTimeout(function(){
      var lotteryData = ssqTrendObj.postData;
      var dataObj = {
        lottery_type:lotteryData.lottery_type,
        trendType : lotteryData.trendType
      }
      if(type && type==="append")dataObj.lottery_no = lotteryData.lotteryNoVal;
      var secretData = {
				'para' : Global.encrypt(dataObj)
			};
      $.ajax({
        url : ConfigObj.localSite +  '?version=1&m=Lottery.ssq.getChartData',
        data : secretData,
        type : "post",
        dataType : "json",
        success : function(msg){
		   //console.log('双色球获取走势数据[ssqTime]',msg);
          //if(msg.info.trendType!=lotteryData.trendType)return false;
          
          if(msg.code !== "0000"){
            $.alertMsg(msg.code_str);
            ssqTimeObj.getCG(ssqTimeObj.ssqTimeObjCGInterval,type);
            return false;
          }
          msg.info = $.parseJSON(Global.crypt(msg.info));
          if(!msg.info || !msg.info.list || !msg.info.list.length){
            ssqTimeObj.getCG(ssqTimeObj.ssqTimeObjCGInterval,type);
            return false;
          }
          if(ssqTimeObj.getCGObj){
            clearTimeout(ssqTimeObj.getCGObj);
            ssqTimeObj.getCGObj = "";
          }

          ssqTimeObj.createNewCG(msg.info);
        }
      });
    },time);
  }
  
  ssqTimeObj.createNewCG = function(data){
	  ssqTrendObj.temTrendData.list.push(data.list[0]);
	  ssqTrendObj.temTrendData.num_max_miss = data.num_max_miss;
	  ssqTrendObj.temTrendData.num_avg_miss = data.num_avg_miss;
	  ssqTrendObj.temTrendData.num_pre_miss = data.num_pre_miss;
	  ssqTrendObj.temTrendData.num_cur_miss = data.num_cur_miss;
	  ssqTrendObj.temTrendData.num_con_miss = data.num_con_miss;
	  ssqTrendObj.temTrendData.num_hap_pro = data.num_hap_pro;
	  ssqTrendObj.temTrendData.num_all = data.num_all;
	  if(ssqTrendObj.postData["trendName"]=="LR"){
		ssqTrendObj.ajaxGetLRData();
	  }else{
		ssqTrendObj.createListDom(data.list);
	  } 
  }

  ssqTimeObj.setData = function(data){
    this.nowTime = data.nowTime;
    this.syTime = data.syTime;
    this.lotteryNo = data.lotteryNo;
  }

  ssqTimeObj.resetSetTime = function(){
    if(this.nowTimeObj)clearTimeout(this.nowTimeObj);
    if(this.syTimeObj)clearTimeout(this.syTimeObj);
    this.nowTimeObj = "";
    this.syTimeObj = "";
    this.updateNowTime();
    this.setSytimeDom();
  }

  ssqTimeObj.updateNowTime = function(){
    this.nowTimeObj = setInterval(function(){
      ssqTimeObj.nowTime+=1000;
    },1000);
  }

  ssqTimeObj.correctTime = function(){
    this.correctTimeObj = setInterval(function(){
		
      var nowTime = new Date().getTime();
      if(!ssqTimeObj.syTime)return false;
      if(Math.abs(nowTime - ssqTimeObj.nowTime)>ssqTimeObj.errorTime){
		//console.log('correct');
        ssqTimeObj.getLotteryData();
      }
    },this.correctInterval);
  }

  ssqTimeObj.setSytimeDom = function(){
    var thisSyTime = this.syTime;
    this.syTimeObj = setInterval(function(){
      if(thisSyTime==0){
        if(ssqTimeObj.syTimeObj)clearTimeout(ssqTimeObj.syTimeObj);
        ssqTimeObj.syTimeObj = "";
        ssqTimeObj.getCG(ssqTimeObj.ssqTimeObjCG,"append");
        ssqTimeObj.setLotteryNoTipsHtml();
        ssqTimeObj.getLotteryData();
        return false;
      }
      if(!ssqTimeObj.stop){
		var hour = 0;
		if(thisSyTime > 3600){
			hour = Math.floor(thisSyTime/3600);
		}
		var fen = Math.floor((thisSyTime - hour*3600)/60);
		var miao = thisSyTime - hour*3600 - fen*60;
		hour = hour<10 ? '0'+hour : hour;
		fen = fen<10 ? "0"+fen : fen;
		miao = miao<10 ? "0"+miao : miao;
		var html = ssqTimeObj.lotteryNo.slice(-3)+'期离截止<span class="fontred">'+(hour ? hour+':' : '') +fen+':'+miao+'</span>';
        ssqTimeObj.qhObj.html(html);
      }
      thisSyTime--;
    },1000);
  }

  ssqTimeObj.init = function(){
	this.setDefConfig();
    this.createDom();
    this.updateNowTime();
    this.correctTime();
    this.setLotteryNoTipsHtml();
    this.getLotteryData(true);
  }
  
  ssqTimeObj.setDefConfig = function(){
	  ssqTimeObj.lotteryNo = "";
	  ssqTimeObj.nowTime = new Date().getTime();
	  ssqTimeObj.syTime = 0;
	  ssqTimeObj.ssqTimeObjCG = 360000;
	  ssqTimeObj.ssqTimeObjCGInterval = 60000;
	  ssqTimeObj.ssqTimeObjNoInterval = 60000;
	  ssqTimeObj.correctInterval = 10000;
	  ssqTimeObj.errorTime = 100000;
	
	
	  ssqTimeObj.stop = false;
	  ssqTimeObj.tips = true;    //自动切换期号的时候是否提醒用户
	  
	  if(this.correctTimeObj){
		 clearInterval(ssqTimeObj.correctTimeObj);
		
	  }
	  if(this.nowTimeObj){
		 clearInterval(ssqTimeObj.nowTimeObj);
	  }
	  if(this.syTimeObj){
		clearInterval(ssqTimeObj.syTimeObj);
	  }
	  
	  if(this.getTimeObj){
          clearTimeout(ssqTimeObj.getTimeObj);
      }
	   
	  if(this.getCGObj){
          clearTimeout(ssqTimeObj.getCGObj);
      }
	  
	  this.correctTimeObj = '';
	  this.nowTimeObj = '';
	  this.syTimeObj = '';
	  this.getTimeObj = '';
	  this.getCGObj = '';
	
	  //window.ssqTimeObjMyScroll = "";  
  }
