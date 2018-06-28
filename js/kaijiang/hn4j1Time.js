
  var hn4j1TimeObj = new Object();
  
  hn4j1TimeObj.createDom = function(){
    this.qhObj = $("#hn4j1Trend_qhObj");
    this.subObj = $("#hn4j1Trend_subObj");
  }

  hn4j1TimeObj.getClientTime = function(){
    return new date().getTime();
  }

  hn4j1TimeObj.setLotteryNoTipsHtml = function(){
    var html = '正在获取新的期号';
    this.qhObj.html(html);
  }

  hn4j1TimeObj.getLotteryData = function(tips){
    $.ajax({
      url : ConfigObj.localSite + '?version=1&m=Ajax.stat.getscheduletime',
       data : "lotteryType=hn4j1&v=" + new Date().getTime(),
      type : "post",
      dataType : "json",
      success : function(msg){
		//console.log('海南走势图表投注期程',msg);
        if(msg.code != '0000'){
          $.alertMsg(msg.code_str);
          hn4j1TimeObj.getTimeObj = setTimeout(function(){
            hn4j1TimeObj.getLotteryData();
          },hn4j1TimeObj.hn4j1TimeObjNoInterval);
          return false;
        }
        if(msg.info.stop == "Y"){
          hn4j1TimeObj.stop = true;
          hn4j1TimeObj.qhObj.html("每天09:00-23:50销售");
          hn4j1TimeObj.setData(msg.info);
          hn4j1TimeObj.resetSetTime();
          hn4j1TimeObj.subObj.attr("data-stop","1");
          return false;
        }else{
          hn4j1TimeObj.subObj.removeAttr('data-stop');
          hn4j1TimeObj.stop = false;
        }
        if(hn4j1TimeObj.getTimeObj){
          clearTimeout(hn4j1TimeObj.getTimeObj);
          hn4j1TimeObj.getTimeObj = "";
        }
        //if(this.tips && hn4j1TimeObj.lotteryNo && msg.info.lotteryNo != hn4j1TimeObj.lotteryNo){
		//  if($('#hn4j1Confirm').length > 0 && $('#hn4j1Confirm').css('display') != 'none'){
        //  	$.alertMsg("当前期已经结束，自动切换到可购买期");
		//  }
       // }

        if(hn4j1TimeObj.lotteryNoChange && msg.info.lotteryNo != hn4j1TimeObj.lotteryNo){
          hn4j1TimeObj.setData(msg.info);
          hn4j1TimeObj.resetSetTime();
          hn4j1TimeObj.lotteryNoChange(msg.info);
        }else{
          hn4j1TimeObj.setData(msg.info);
          hn4j1TimeObj.resetSetTime();
        }
      }
    });
  }
  
  hn4j1TimeObj.lotteryNoChange = function(data){
	hn4j1TrendObj.postData.lotteryNoVal = data.lotteryNo; 
	//hn4j1ConfirmObj.lotteryNo = data.lotteryNo;  
	if($('#hn4j1Confirm').length > 0 && hn4j1ConfirmObj.updBetTipsObj){
		hn4j1ConfirmObj.updBetTipsObj.attr("data-no",data.lotteryNo);
	}
  }

  hn4j1TimeObj.getCG = function(time,type){
    time = time ? time : this.hn4j1TimeObjCG;
    hn4j1TimeObj.getCGObj = setTimeout(function(){
      var lotteryData = hn4j1TrendObj.postData;
      var dataObj = {
        lottery_type:lotteryData.lottery_type,
        trendType : lotteryData.trendType
      }
      if(type && type==="append")dataObj.lottery_no = lotteryData.lotteryNoVal;
      $.ajax({
        url : ConfigObj.localSite +  '?version=1&m=Lottery.hn4j1.getChartData',
        data : dataObj,
        type : "post",
        dataType : "json",
        success : function(msg){
		   //console.log('排列三获取走势数据[hn4j1Time]',msg);
          //if(msg.info.trendType!=lotteryData.trendType)return false;
          if(msg.code !== "0000"){
            $.alertMsg(msg.code_str);
            hn4j1TimeObj.getCG(hn4j1TimeObj.hn4j1TimeObjCGInterval,type);
            return false;
          }
          if(!msg.info || !msg.info.list || !msg.info.list.length){
            hn4j1TimeObj.getCG(hn4j1TimeObj.hn4j1TimeObjCGInterval,type);
            return false;
          }
          if(hn4j1TimeObj.getCGObj){
            clearTimeout(hn4j1TimeObj.getCGObj);
            hn4j1TimeObj.getCGObj = "";
          }

          hn4j1TimeObj.createNewCG(msg.info);
        }
      });
    },time);
  }
  
  
  hn4j1TimeObj.setData = function(data){
    this.nowTime = data.nowTime;
    this.syTime = data.syTime;
    this.lotteryNo = data.lotteryNo;
  }

  hn4j1TimeObj.resetSetTime = function(){
    if(this.nowTimeObj)clearTimeout(this.nowTimeObj);
    if(this.syTimeObj)clearTimeout(this.syTimeObj);
    this.nowTimeObj = "";
    this.syTimeObj = "";
    this.updateNowTime();
    this.setSytimeDom();
  }

  hn4j1TimeObj.updateNowTime = function(){
    this.nowTimeObj = setInterval(function(){
      hn4j1TimeObj.nowTime+=1000;
    },1000);
  }

  hn4j1TimeObj.correctTime = function(){
    this.correctTimeObj = setInterval(function(){
		
      var nowTime = new Date().getTime();
      if(!hn4j1TimeObj.syTime)return false;
      if(Math.abs(nowTime - hn4j1TimeObj.nowTime)>hn4j1TimeObj.errorTime){
		//console.log('correct');
        hn4j1TimeObj.getLotteryData();
      }
    },this.correctInterval);
  }

  hn4j1TimeObj.setSytimeDom = function(){
    var thisSyTime = this.syTime;
    this.syTimeObj = setInterval(function(){
      if(thisSyTime==0){
        if(hn4j1TimeObj.syTimeObj)clearTimeout(hn4j1TimeObj.syTimeObj);
        hn4j1TimeObj.syTimeObj = "";
        hn4j1TimeObj.getCG(hn4j1TimeObj.hn4j1TimeObjCG,"append");
        hn4j1TimeObj.setLotteryNoTipsHtml();
        hn4j1TimeObj.getLotteryData();
        return false;
      }
      if(!hn4j1TimeObj.stop){
        var hour = 0;
		if(thisSyTime > 3600){
			hour = Math.floor(thisSyTime/3600);
		}
		var fen = Math.floor((thisSyTime - hour*3600)/60);
		var miao = thisSyTime - hour*3600 - fen*60;
		hour = hour<10 ? '0'+hour : hour;
		fen = fen<10 ? "0"+fen : fen;
		miao = miao<10 ? "0"+miao : miao;
		var html = hn4j1TimeObj.lotteryNo.slice(-3)+'期离截止<span class="fontred">'+(hour ? hour+':' : '') +fen+':'+miao+'</span>';
        hn4j1TimeObj.qhObj.html(html);
      }
      thisSyTime--;
    },1000);
  }

  hn4j1TimeObj.init = function(){
	this.setDefConfig();
    this.createDom();
    this.updateNowTime();
    this.correctTime();
    this.setLotteryNoTipsHtml();
    this.getLotteryData(true);
  }
  
  hn4j1TimeObj.setDefConfig = function(){
	  hn4j1TimeObj.lotteryNo = "";
	  hn4j1TimeObj.nowTime = new Date().getTime();
	  hn4j1TimeObj.syTime = 0;
	  hn4j1TimeObj.hn4j1TimeObjCG = 360000;
	  hn4j1TimeObj.hn4j1TimeObjCGInterval = 60000;
	  hn4j1TimeObj.hn4j1TimeObjNoInterval = 60000;
	  hn4j1TimeObj.correctInterval = 10000;
	  hn4j1TimeObj.errorTime = 100000;
	
	
	  hn4j1TimeObj.stop = false;
	  hn4j1TimeObj.tips = true;    //自动切换期号的时候是否提醒用户
	  
	  if(this.correctTimeObj){
		 clearInterval(hn4j1TimeObj.correctTimeObj);
		
	  }
	  if(this.nowTimeObj){
		 clearInterval(hn4j1TimeObj.nowTimeObj);
	  }
	  if(this.syTimeObj){
		clearInterval(hn4j1TimeObj.syTimeObj);
	  }
	  
	  if(this.getTimeObj){
          clearTimeout(hn4j1TimeObj.getTimeObj);
      }
	   
	  if(this.getCGObj){
          clearTimeout(hn4j1TimeObj.getCGObj);
      }
	  
	  this.correctTimeObj = '';
	  this.nowTimeObj = '';
	  this.syTimeObj = '';
	  this.getTimeObj = '';
	  this.getCGObj = '';
	
	  //window.hn4j1TimeObjMyScroll = "";  
  }
