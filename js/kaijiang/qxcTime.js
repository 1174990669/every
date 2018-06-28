
  var qxcTimeObj = new Object();
  
  qxcTimeObj.createDom = function(){
    this.qhObj = $("#qxcTrend_qhObj");
    this.subObj = $("#qxcTrend_subObj");
  }

  qxcTimeObj.getClientTime = function(){
    return new date().getTime();
  }

  qxcTimeObj.setLotteryNoTipsHtml = function(){
    var html = '正在获取新的期号';
    this.qhObj.html(html);
  }

  qxcTimeObj.getLotteryData = function(tips){
    $.ajax({
      url : ConfigObj.localSite + '?version=1&m=Ajax.stat.getscheduletime',
      data : "lotteryType=QXC&v=" + new Date().getTime(),
      type : "post",
      dataType : "json",
      success : function(msg){
		//console.log('七星彩走势图表投注期程',msg);
        if(msg.code !== '0000'){
          $.alertMsg(msg.code_str);
          qxcTimeObj.getTimeObj = setTimeout(function(){
            qxcTimeObj.getLotteryData();
          },qxcTimeObj.qxcTimeObjNoInterval);
          return false;
        }
        if(msg.info.stop == "Y"){
          qxcTimeObj.stop = true;
          qxcTimeObj.qhObj.html("每天09:00-23:50销售");
          qxcTimeObj.setData(msg.info);
          qxcTimeObj.resetSetTime();
          qxcTimeObj.subObj.attr("data-stop","1");
          return false;
        }else{
          qxcTimeObj.subObj.removeAttr('data-stop');
          qxcTimeObj.stop = false;
        }
        if(qxcTimeObj.getTimeObj){
          clearTimeout(qxcTimeObj.getTimeObj);
          qxcTimeObj.getTimeObj = "";
        }
        //if(this.tips && qxcTimeObj.lotteryNo && msg.info.lotteryNo != qxcTimeObj.lotteryNo){
		//  if($('#qxcConfirm').length > 0 && $('#qxcConfirm').css('display') != 'none'){
        //  	$.alertMsg("当前期已经结束，自动切换到可购买期");
		//  }
       // }

        if(qxcTimeObj.lotteryNoChange && msg.info.lotteryNo != qxcTimeObj.lotteryNo){
          qxcTimeObj.setData(msg.info);
          qxcTimeObj.resetSetTime();
          qxcTimeObj.lotteryNoChange(msg.info);
        }else{
          qxcTimeObj.setData(msg.info);
          qxcTimeObj.resetSetTime();
        }
      }
    });
  }
  
  qxcTimeObj.lotteryNoChange = function(data){
	qxcTrendObj.postData.lotteryNoVal = data.lotteryNo; 
	//qxcConfirmObj.lotteryNo = data.lotteryNo;  
	if($('#qxcConfirm').length > 0 && qxcConfirmObj.updBetTipsObj){
		qxcConfirmObj.updBetTipsObj.attr("data-no",data.lotteryNo);
	}
  }

  qxcTimeObj.getCG = function(time,type){
    time = time ? time : this.qxcTimeObjCG;
    qxcTimeObj.getCGObj = setTimeout(function(){
      var lotteryData = qxcTrendObj.postData;
      var dataObj = {
        lottery_type:lotteryData.lottery_type,
        trendType : lotteryData.trendType
      }
      if(type && type==="append")dataObj.lottery_no = lotteryData.lotteryNoVal;
      $.ajax({
        url : ConfigObj.localSite +  '?version=1&m=Lottery.qxc.getChartData',
        data : dataObj,
        type : "post",
        dataType : "json",
        success : function(msg){
		   //console.log('七星彩获取走势数据[qxcTime]',msg);
          //if(msg.info.trendType!=lotteryData.trendType)return false;
          if(msg.code !== "0000"){
            $.alertMsg(msg.code_str);
            qxcTimeObj.getCG(qxcTimeObj.qxcTimeObjCGInterval,type);
            return false;
          }
          if(!msg.info || !msg.info.list || !msg.info.list.length){
            qxcTimeObj.getCG(qxcTimeObj.qxcTimeObjCGInterval,type);
            return false;
          }
          if(qxcTimeObj.getCGObj){
            clearTimeout(qxcTimeObj.getCGObj);
            qxcTimeObj.getCGObj = "";
          }

          qxcTimeObj.createNewCG(msg.info);
        }
      });
    },time);
  }
  
  qxcTimeObj.createNewCG = function(data){
	  qxcTrendObj.temTrendData.list.push(data.list[0]);
	  qxcTrendObj.temTrendData.num_max_miss = data.num_max_miss;
	  qxcTrendObj.temTrendData.num_avg_miss = data.num_avg_miss;
	  qxcTrendObj.temTrendData.num_pre_miss = data.num_pre_miss;
	  qxcTrendObj.temTrendData.num_cur_miss = data.num_cur_miss;
	  qxcTrendObj.temTrendData.num_con_miss = data.num_con_miss;
	  qxcTrendObj.temTrendData.num_hap_pro = data.num_hap_pro;
	  qxcTrendObj.temTrendData.num_all = data.num_all;
	  if(qxcTrendObj.postData["trendName"]=="LR"){
		qxcTrendObj.ajaxGetLRData();
	  }else{
		qxcTrendObj.createListDom(data.list);
	  } 
  }

  qxcTimeObj.setData = function(data){
    this.nowTime = data.nowTime;
    this.syTime = data.syTime;
    this.lotteryNo = data.lotteryNo;
  }

  qxcTimeObj.resetSetTime = function(){
    if(this.nowTimeObj)clearTimeout(this.nowTimeObj);
    if(this.syTimeObj)clearTimeout(this.syTimeObj);
    this.nowTimeObj = "";
    this.syTimeObj = "";
    this.updateNowTime();
    this.setSytimeDom();
  }

  qxcTimeObj.updateNowTime = function(){
    this.nowTimeObj = setInterval(function(){
      qxcTimeObj.nowTime+=1000;
    },1000);
  }

  qxcTimeObj.correctTime = function(){
    this.correctTimeObj = setInterval(function(){
		
      var nowTime = new Date().getTime();
      if(!qxcTimeObj.syTime)return false;
      if(Math.abs(nowTime - qxcTimeObj.nowTime)>qxcTimeObj.errorTime){
		//console.log('correct');
        qxcTimeObj.getLotteryData();
      }
    },this.correctInterval);
  }

  qxcTimeObj.setSytimeDom = function(){
    var thisSyTime = this.syTime;
    this.syTimeObj = setInterval(function(){
      if(thisSyTime==0){
        if(qxcTimeObj.syTimeObj)clearTimeout(qxcTimeObj.syTimeObj);
        qxcTimeObj.syTimeObj = "";
        qxcTimeObj.getCG(qxcTimeObj.qxcTimeObjCG,"append");
        qxcTimeObj.setLotteryNoTipsHtml();
        qxcTimeObj.getLotteryData();
        return false;
      }
      if(!qxcTimeObj.stop){
        var hour = 0;
		if(thisSyTime > 3600){
			hour = Math.floor(thisSyTime/3600);
		}
		var fen = Math.floor((thisSyTime - hour*3600)/60);
		var miao = thisSyTime - hour*3600 - fen*60;
		hour = hour<10 ? '0'+hour : hour;
		fen = fen<10 ? "0"+fen : fen;
		miao = miao<10 ? "0"+miao : miao;
		var html = qxcTimeObj.lotteryNo.slice(-3)+'期离截止<span class="fontred">'+(hour ? hour+':' : '') +fen+':'+miao+'</span>';
        qxcTimeObj.qhObj.html(html);
      }
      thisSyTime--;
    },1000);
  }

  qxcTimeObj.init = function(){
	this.setDefConfig();
    this.createDom();
    this.updateNowTime();
    this.correctTime();
    this.setLotteryNoTipsHtml();
    this.getLotteryData(true);
  }
  
  qxcTimeObj.setDefConfig = function(){
	  qxcTimeObj.lotteryNo = "";
	  qxcTimeObj.nowTime = new Date().getTime();
	  qxcTimeObj.syTime = 0;
	  qxcTimeObj.qxcTimeObjCG = 3600000;
	  qxcTimeObj.qxcTimeObjCGInterval = 60000;
	  qxcTimeObj.qxcTimeObjNoInterval = 60000;
	  qxcTimeObj.correctInterval = 10000;
	  qxcTimeObj.errorTime = 100000;
	
	
	  qxcTimeObj.stop = false;
	  qxcTimeObj.tips = true;    //自动切换期号的时候是否提醒用户
	  
	  if(this.correctTimeObj){
		 clearInterval(qxcTimeObj.correctTimeObj);
		
	  }
	  if(this.nowTimeObj){
		 clearInterval(qxcTimeObj.nowTimeObj);
	  }
	  if(this.syTimeObj){
		clearInterval(qxcTimeObj.syTimeObj);
	  }
	  
	  if(this.getTimeObj){
          clearTimeout(qxcTimeObj.getTimeObj);
      }
	   
	  if(this.getCGObj){
          clearTimeout(qxcTimeObj.getCGObj);
      }
	  
	  this.correctTimeObj = '';
	  this.nowTimeObj = '';
	  this.syTimeObj = '';
	  this.getTimeObj = '';
	  this.getCGObj = '';
	
	  //window.qxcTimeObjMyScroll = "";  
  }
