
  var fastTimeObj = new Object();
  
  fastTimeObj.createDom = function(){
    this.qhObj = $("#fastTrend_qhObj");
    this.subObj = $("#fastTrend_subObj");
  }

  fastTimeObj.getClientTime = function(){
    return new date().getTime();
  }

  fastTimeObj.setLotteryNoTipsHtml = function(){
    var html = '正在获取新的期号';
    this.qhObj.html(html);
  }

  fastTimeObj.getLotteryData = function(tips){
  	//console.log(tips);
    $.ajax({
      url : ConfigObj.localSite + ConfigObj.fastLotApi[ConfigObj.fastLotType].scheme,
      data : "",
      type : "post",
      dataType : "json",
      success : function(msg){
		//console.log('11选5走势图表投注期程',msg);
        if(msg.code !== '0000'){
          $.alertMsg(msg.code_str);
          fastTimeObj.getTimeObj = setTimeout(function(){
            fastTimeObj.getLotteryData();
          },fastTimeObj.fastTimeObjNoInterval);
          return false;
        }
				msg.info = $.parseJSON(Global.crypt(msg.info));        
        if(msg.info.stop == "Y"){
          fastTimeObj.stop = true;
          fastTimeObj.qhObj.html("每天09:00-23:50销售");
          fastTimeObj.setData(msg.info);
          fastTimeObj.resetSetTime();
          fastTimeObj.subObj.attr("data-stop","1");
          return false;
        }else{
          fastTimeObj.subObj.removeAttr('data-stop');
          fastTimeObj.stop = false;
        }
        if(fastTimeObj.getTimeObj){
          clearTimeout(fastTimeObj.getTimeObj);
          fastTimeObj.getTimeObj = "";
        }
        //if(this.tips && fastTimeObj.lotteryNo && msg.info.data.lotteryNo != fastTimeObj.lotteryNo){
		//  if($('#fastBetConfirm').length > 0 && $('#fastBetConfirm').css('display') != 'none'){
        //  	$.alertMsg("当前期已经结束，自动切换到可购买期");
		//  }
       // }
        if(fastTimeObj.lotteryNoChange && msg.info.lotteryNo != fastTimeObj.lotteryNo){
          fastTimeObj.setData(msg.info);
          fastTimeObj.resetSetTime();
          fastTimeObj.lotteryNoChange(msg.info);
        }else{
          fastTimeObj.setData(msg.info);
          fastTimeObj.resetSetTime();
        }
      }
    });
  }
  
  fastTimeObj.lotteryNoChange = function(data){
	fastTrendObj.postData.lotteryNoVal = data.lotteryNo; 
	//fastBetConfirmObj.lotteryNo = data.lotteryNo;  
	if($('#fastBetConfirm').length > 0 && fastBetConfirmObj.updBetTipsObj){
		fastBetConfirmObj.updBetTipsObj.attr("data-no",data.lotteryNo);
	}
  }

  fastTimeObj.getCG = function(time,type){
	//console.log('更新图表getCG');
	////console.log(arguments);
    time = time ? time : this.fastTimeObjCG;
    fastTimeObj.getCGObj = setTimeout(function(){
      var lotteryData = fastTrendObj.postData;
      var dataObj = {
        lottery_type:lotteryData.lottery_type,
        trendType : lotteryData.trendType
      }
      if(type && type==="append"){
		  dataObj.lottery_no = lotteryData.lotteryNoVal;
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
		   //console.log('11选5获取走势数据[fastTime]',msg);
          //if(msg.info.trendType!=lotteryData.trendType)return false;
          if(msg.code !== "0000"){
            $.alertMsg(msg.code_str);
            fastTimeObj.getCG(fastTimeObj.fastTimeObjCGInterval,type);
            return false;
          }
          if(!msg.info || !msg.info.list || !msg.info.list.length){
            fastTimeObj.getCG(fastTimeObj.fastTimeObjCGInterval,type);
            return false;
          }
          if(fastTimeObj.getCGObj){
            clearTimeout(fastTimeObj.getCGObj);
            fastTimeObj.getCGObj = "";
          }
					msg.info = $.parseJSON(Global.crypt(msg.info));
//					console.log('11选5获取走势数据[fastTime]',msg);
          fastTimeObj.createNewCG(msg.info);
        }
      });
    },time);
  }
  
  fastTimeObj.createNewCG = function(data){
	  //console.log('图表更新 createNewCG');
	  //console.log(data);
	  fastTrendObj.temTrendData.list.push(data.list[0]);
	  fastTrendObj.temTrendData.num_max_miss = data.num_max_miss;
	  fastTrendObj.temTrendData.num_avg_miss = data.num_avg_miss;
	  fastTrendObj.temTrendData.num_pre_miss = data.num_pre_miss;
	  fastTrendObj.temTrendData.num_cur_miss = data.num_cur_miss;
	  fastTrendObj.temTrendData.num_con_miss = data.num_con_miss;
	  fastTrendObj.temTrendData.num_hap_pro = data.num_hap_pro;
	  fastTrendObj.temTrendData.num_all = data.num_all;
	  if(fastTrendObj.postData["trendName"]=="LR"){
		fastTrendObj.ajaxGetLRData();
	  }else{
		fastTrendObj.createListDom();
	  } 
  }

  fastTimeObj.setData = function(data){
    this.nowTime = data.nowTime;
    this.syTime = data.syTime;
    this.lotteryNo = data.lotteryNo;
  }

  fastTimeObj.resetSetTime = function(){
    if(this.nowTimeObj)clearTimeout(this.nowTimeObj);
    if(this.syTimeObj)clearTimeout(this.syTimeObj);
    this.nowTimeObj = "";
    this.syTimeObj = "";
    this.updateNowTime();
    this.setSytimeDom();
  }

  fastTimeObj.updateNowTime = function(){
    this.nowTimeObj = setInterval(function(){
      fastTimeObj.nowTime+=1000;
    },1000);
  }

  fastTimeObj.correctTime = function(){
    this.correctTimeObj = setInterval(function(){
		
      var nowTime = new Date().getTime();
      if(!fastTimeObj.syTime)return false;
      if(Math.abs(nowTime - fastTimeObj.nowTime)>fastTimeObj.errorTime){
		//console.log('correct');
        fastTimeObj.getLotteryData();
      }
    },this.correctInterval);
  }

  fastTimeObj.setSytimeDom = function(){
    var thisSyTime = this.syTime;
    this.syTimeObj = setInterval(function(){
      if(thisSyTime==0){
        if(fastTimeObj.syTimeObj)clearTimeout(fastTimeObj.syTimeObj);
        fastTimeObj.syTimeObj = "";
        fastTimeObj.getCG(fastTimeObj.fastTimeObjCG,"append");
        fastTimeObj.setLotteryNoTipsHtml();
        fastTimeObj.getLotteryData();
        return false;
      }
      if(!fastTimeObj.stop){
        var miao = thisSyTime%60;
        var fen = (thisSyTime - miao)/60;
        miao = miao<10 ? "0"+miao : miao;
        fen = fen<10 ? "0"+fen : fen;
        var html = fastTimeObj.lotteryNo.slice(-2)+'期离截止<span class="fontred">'+fen+':'+miao+'</span>';
        fastTimeObj.qhObj.html(html);
      }
      thisSyTime--;
    },1000);
  }

  fastTimeObj.init = function(){
	this.setDefConfig();
    this.createDom();
    this.updateNowTime();
    this.correctTime();
    this.setLotteryNoTipsHtml();
    this.getLotteryData(true);
  }
  
  fastTimeObj.setDefConfig = function(){
	  fastTimeObj.lotteryNo = "";
	  fastTimeObj.nowTime = new Date().getTime();
	  fastTimeObj.syTime = 0;
	  fastTimeObj.fastTimeObjCG = 210000;
	  fastTimeObj.fastTimeObjCGInterval = 50000;   //测试代码 zhangw
	  fastTimeObj.fastTimeObjNoInterval = 30000;
	  fastTimeObj.correctInterval = 10000;
	  fastTimeObj.errorTime = 100000;
	
	
	  fastTimeObj.stop = false;
	  fastTimeObj.tips = true;    //自动切换期号的时候是否提醒用户
	  
	  if(this.correctTimeObj){
		 clearInterval(fastTimeObj.correctTimeObj);
		
	  }
	  if(this.nowTimeObj){
		 clearInterval(fastTimeObj.nowTimeObj);
	  }
	  if(this.syTimeObj){
		clearInterval(fastTimeObj.syTimeObj);
	  }
	  
	  if(this.getTimeObj){
          clearTimeout(fastTimeObj.getTimeObj);
      }
	   
	  if(this.getCGObj){
          clearTimeout(fastTimeObj.getCGObj);
      }
	  
	  this.correctTimeObj = '';
	  this.nowTimeObj = '';
	  this.syTimeObj = '';
	  this.getTimeObj = '';
	  this.getCGObj = '';
	
	  //window.fastTimeObjMyScroll = "";  
  }
