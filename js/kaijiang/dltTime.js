
  var dltTimeObj = new Object();
  
  dltTimeObj.createDom = function(){
    this.qhObj = $("#dltTrend_qhObj");
    this.subObj = $("#dltTrend_subObj");
  }

  dltTimeObj.getClientTime = function(){
    return new date().getTime();
  }

  dltTimeObj.setLotteryNoTipsHtml = function(){
    var html = '正在获取新的期号';
    this.qhObj.html(html);
  }

  dltTimeObj.getLotteryData = function(tips){
    $.ajax({
      url : ConfigObj.localSite + '?version=1&m=Ajax.stat.getscheduletime',
      data : "lotteryType=DLT&v=" + new Date().getTime(),
      type : "post",
      dataType : "json",
      success : function(msg){
		//console.log('大乐透走势图表投注期程',msg);
        if(msg.code !== '0000'){
          $.alertMsg(msg.code_str);
          dltTimeObj.getTimeObj = setTimeout(function(){
            dltTimeObj.getLotteryData();
          },dltTimeObj.dltTimeObjNoInterval);
          return false;
        }
        if(msg.info.stop == "Y"){
          dltTimeObj.stop = true;
          dltTimeObj.qhObj.html("每天09:00-23:50销售");
          dltTimeObj.setData(msg.info);
          dltTimeObj.resetSetTime();
          dltTimeObj.subObj.attr("data-stop","1");
          return false;
        }else{
          dltTimeObj.subObj.removeAttr('data-stop');
          dltTimeObj.stop = false;
        }
        if(dltTimeObj.getTimeObj){
          clearTimeout(dltTimeObj.getTimeObj);
          dltTimeObj.getTimeObj = "";
        }
        //if(this.tips && dltTimeObj.lotteryNo && msg.info.lotteryNo != dltTimeObj.lotteryNo){
		//  if($('#dltConfirm').length > 0 && $('#dltConfirm').css('display') != 'none'){
        //  	$.alertMsg("当前期已经结束，自动切换到可购买期");
		//  }
       // }

        if(dltTimeObj.lotteryNoChange && msg.info.lotteryNo != dltTimeObj.lotteryNo){
          dltTimeObj.setData(msg.info);
          dltTimeObj.resetSetTime();
          dltTimeObj.lotteryNoChange(msg.info);
        }else{
          dltTimeObj.setData(msg.info);
          dltTimeObj.resetSetTime();
        }
      }
    });
  }
  
  dltTimeObj.lotteryNoChange = function(data){
	dltTrendObj.postData.lotteryNoVal = data.lotteryNo; 
	//dltConfirmObj.lotteryNo = data.lotteryNo;  
	if($('#dltConfirm').length > 0 && dltConfirmObj.updBetTipsObj){
		dltConfirmObj.updBetTipsObj.attr("data-no",data.lotteryNo);
	}
  }

  dltTimeObj.getCG = function(time,type){
    time = time ? time : this.dltTimeObjCG;
    dltTimeObj.getCGObj = setTimeout(function(){
      var lotteryData = dltTrendObj.postData;
      var dataObj = {
        lottery_type:lotteryData.lottery_type,
        trendType : lotteryData.trendType
      }
      if(type && type==="append")dataObj.lottery_no = lotteryData.lotteryNoVal;
      var secretData = {
				'para' : Global.encrypt(dataObj)
			};
      $.ajax({
        url : ConfigObj.localSite +  '?version=1&m=Lottery.dlt.getChartData',
        data : secretData,
        type : "post",
        dataType : "json",
        success : function(msg){
		   //console.log('大乐透获取走势数据[dltTime]',msg);
          //if(msg.info.trendType!=lotteryData.trendType)return false;
          
          if(msg.code !== "0000"){
            $.alertMsg(msg.code_str);
            dltTimeObj.getCG(dltTimeObj.dltTimeObjCGInterval,type);
            return false;
          }
          msg.info = $.parseJSON(Global.crypt(msg.info));
          if(!msg.info || !msg.info.list || !msg.info.list.length){
            dltTimeObj.getCG(dltTimeObj.dltTimeObjCGInterval,type);
            return false;
          }
          if(dltTimeObj.getCGObj){
            clearTimeout(dltTimeObj.getCGObj);
            dltTimeObj.getCGObj = "";
          }

          dltTimeObj.createNewCG(msg.info);
        }
      });
    },time);
  }
  
  dltTimeObj.createNewCG = function(data){
	  dltTrendObj.temTrendData.list.push(data.list[0]);
	  dltTrendObj.temTrendData.num_max_miss = data.num_max_miss;
	  dltTrendObj.temTrendData.num_avg_miss = data.num_avg_miss;
	  dltTrendObj.temTrendData.num_pre_miss = data.num_pre_miss;
	  dltTrendObj.temTrendData.num_cur_miss = data.num_cur_miss;
	  dltTrendObj.temTrendData.num_con_miss = data.num_con_miss;
	  dltTrendObj.temTrendData.num_hap_pro = data.num_hap_pro;
	  dltTrendObj.temTrendData.num_all = data.num_all;
	  if(dltTrendObj.postData["trendName"]=="LR"){
		dltTrendObj.ajaxGetLRData();
	  }else{
		dltTrendObj.createListDom(data.list);
	  } 
  }

  dltTimeObj.setData = function(data){
    this.nowTime = data.nowTime;
    this.syTime = data.syTime;
    this.lotteryNo = data.lotteryNo;
  }

  dltTimeObj.resetSetTime = function(){
    if(this.nowTimeObj)clearTimeout(this.nowTimeObj);
    if(this.syTimeObj)clearTimeout(this.syTimeObj);
    this.nowTimeObj = "";
    this.syTimeObj = "";
    this.updateNowTime();
    this.setSytimeDom();
  }

  dltTimeObj.updateNowTime = function(){
    this.nowTimeObj = setInterval(function(){
      dltTimeObj.nowTime+=1000;
    },1000);
  }

  dltTimeObj.correctTime = function(){
    this.correctTimeObj = setInterval(function(){
		
      var nowTime = new Date().getTime();
      if(!dltTimeObj.syTime)return false;
      if(Math.abs(nowTime - dltTimeObj.nowTime)>dltTimeObj.errorTime){
		//console.log('correct');
        dltTimeObj.getLotteryData();
      }
    },this.correctInterval);
  }

  dltTimeObj.setSytimeDom = function(){
    var thisSyTime = this.syTime;
    this.syTimeObj = setInterval(function(){
      if(thisSyTime==0){
        if(dltTimeObj.syTimeObj)clearTimeout(dltTimeObj.syTimeObj);
        dltTimeObj.syTimeObj = "";
        dltTimeObj.getCG(dltTimeObj.dltTimeObjCG,"append");
        dltTimeObj.setLotteryNoTipsHtml();
        dltTimeObj.getLotteryData();
        return false;
      }
      if(!dltTimeObj.stop){
		var hour = 0;
		if(thisSyTime > 3600){
			hour = Math.floor(thisSyTime/3600);
		}
		var fen = Math.floor((thisSyTime - hour*3600)/60);
		var miao = thisSyTime - hour*3600 - fen*60;
		hour = hour<10 ? '0'+hour : hour;
		fen = fen<10 ? "0"+fen : fen;
		miao = miao<10 ? "0"+miao : miao;
		var html = dltTimeObj.lotteryNo.slice(-3)+'期离截止<span class="fontred">'+(hour ? hour+':' : '') +fen+':'+miao+'</span>';
        dltTimeObj.qhObj.html(html);
      }
      thisSyTime--;
    },1000);
  }

  dltTimeObj.init = function(){
	this.setDefConfig();
    this.createDom();
    this.updateNowTime();
    this.correctTime();
    this.setLotteryNoTipsHtml();
    this.getLotteryData(true);
  }
  
  dltTimeObj.setDefConfig = function(){
	  dltTimeObj.lotteryNo = "";
	  dltTimeObj.nowTime = new Date().getTime();
	  dltTimeObj.syTime = 0;
	  dltTimeObj.dltTimeObjCG = 360000;
	  dltTimeObj.dltTimeObjCGInterval = 60000;
	  dltTimeObj.dltTimeObjNoInterval = 60000;
	  dltTimeObj.correctInterval = 10000;
	  dltTimeObj.errorTime = 100000;
	
	
	  dltTimeObj.stop = false;
	  dltTimeObj.tips = true;    //自动切换期号的时候是否提醒用户
	  
	  if(this.correctTimeObj){
		 clearInterval(dltTimeObj.correctTimeObj);
		
	  }
	  if(this.nowTimeObj){
		 clearInterval(dltTimeObj.nowTimeObj);
	  }
	  if(this.syTimeObj){
		clearInterval(dltTimeObj.syTimeObj);
	  }
	  
	  if(this.getTimeObj){
          clearTimeout(dltTimeObj.getTimeObj);
      }
	   
	  if(this.getCGObj){
          clearTimeout(dltTimeObj.getCGObj);
      }
	  
	  this.correctTimeObj = '';
	  this.nowTimeObj = '';
	  this.syTimeObj = '';
	  this.getTimeObj = '';
	  this.getCGObj = '';
	
	  //window.dltTimeObjMyScroll = "";  
  }
