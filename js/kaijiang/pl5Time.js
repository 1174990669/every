
  var pl5TimeObj = new Object();
  
  pl5TimeObj.createDom = function(){
    this.qhObj = $("#pl5Trend_qhObj");
    this.subObj = $("#pl5Trend_subObj");
  }

  pl5TimeObj.getClientTime = function(){
    return new date().getTime();
  }

  pl5TimeObj.setLotteryNoTipsHtml = function(){
    var html = '正在获取新的期号';
    this.qhObj.html(html);
  }

  pl5TimeObj.getLotteryData = function(tips){
    $.ajax({
      url : ConfigObj.localSite + '?version=1&m=Ajax.stat.getscheduletime',
      data : "lotteryType=PL5&v=" + new Date().getTime(),
      type : "post",
      dataType : "json",
      success : function(msg){
		//console.log('排列五走势图表投注期程',msg);
        if(msg.code !== '0000'){
          $.alertMsg(msg.code_str);
          pl5TimeObj.getTimeObj = setTimeout(function(){
            pl5TimeObj.getLotteryData();
          },pl5TimeObj.pl5TimeObjNoInterval);
          return false;
        }
        if(msg.info.stop == "Y"){
          pl5TimeObj.stop = true;
          pl5TimeObj.qhObj.html("每天09:00-23:50销售");
          pl5TimeObj.setData(msg.info);
          pl5TimeObj.resetSetTime();
          pl5TimeObj.subObj.attr("data-stop","1");
          return false;
        }else{
          pl5TimeObj.subObj.removeAttr('data-stop');
          pl5TimeObj.stop = false;
        }
        if(pl5TimeObj.getTimeObj){
          clearTimeout(pl5TimeObj.getTimeObj);
          pl5TimeObj.getTimeObj = "";
        }
        //if(this.tips && pl5TimeObj.lotteryNo && msg.info.lotteryNo != pl5TimeObj.lotteryNo){
		//  if($('#pl5Confirm').length > 0 && $('#pl5Confirm').css('display') != 'none'){
        //  	$.alertMsg("当前期已经结束，自动切换到可购买期");
		//  }
       // }

        if(pl5TimeObj.lotteryNoChange && msg.info.lotteryNo != pl5TimeObj.lotteryNo){
          pl5TimeObj.setData(msg.info);
          pl5TimeObj.resetSetTime();
          pl5TimeObj.lotteryNoChange(msg.info);
        }else{
          pl5TimeObj.setData(msg.info);
          pl5TimeObj.resetSetTime();
        }
      }
    });
  }
  
  pl5TimeObj.lotteryNoChange = function(data){
	pl5TrendObj.postData.lotteryNoVal = data.lotteryNo; 
	//pl5ConfirmObj.lotteryNo = data.lotteryNo;  
	if($('#pl5Confirm').length > 0 && pl5ConfirmObj.updBetTipsObj){
		pl5ConfirmObj.updBetTipsObj.attr("data-no",data.lotteryNo);
	}
  }

  pl5TimeObj.getCG = function(time,type){
    time = time ? time : this.pl5TimeObjCG;
    pl5TimeObj.getCGObj = setTimeout(function(){
      var lotteryData = pl5TrendObj.postData;
      var dataObj = {
        lottery_type:lotteryData.lottery_type,
        trendType : lotteryData.trendType
      }
      if(type && type==="append")dataObj.lottery_no = lotteryData.lotteryNoVal;
      var secretData = {
				'para' : Global.encrypt(dataObj)
			};
      $.ajax({
        url : ConfigObj.localSite +  '?version=1&m=Lottery.pl5.getChartData',
        data : secretData,
        type : "post",
        dataType : "json",
        success : function(msg){
		   //console.log('排列五获取走势数据[pl5Time]',msg);
          //if(msg.info.trendType!=lotteryData.trendType)return false;
          
          if(msg.code !== "0000"){
            $.alertMsg(msg.code_str);
            pl5TimeObj.getCG(pl5TimeObj.pl5TimeObjCGInterval,type);
            return false;
          }
          msg.info = $.parseJSON(Global.crypt(msg.info));
          if(!msg.info || !msg.info.list || !msg.info.list.length){
            pl5TimeObj.getCG(pl5TimeObj.pl5TimeObjCGInterval,type);
            return false;
          }
          if(pl5TimeObj.getCGObj){
            clearTimeout(pl5TimeObj.getCGObj);
            pl5TimeObj.getCGObj = "";
          }

          pl5TimeObj.createNewCG(msg.info);
        }
      });
    },time);
  }
  
  pl5TimeObj.createNewCG = function(data){
	  pl5TrendObj.temTrendData.list.push(data.list[0]);
	  pl5TrendObj.temTrendData.num_max_miss = data.num_max_miss;
	  pl5TrendObj.temTrendData.num_avg_miss = data.num_avg_miss;
	  pl5TrendObj.temTrendData.num_pre_miss = data.num_pre_miss;
	  pl5TrendObj.temTrendData.num_cur_miss = data.num_cur_miss;
	  pl5TrendObj.temTrendData.num_con_miss = data.num_con_miss;
	  pl5TrendObj.temTrendData.num_hap_pro = data.num_hap_pro;
	  pl5TrendObj.temTrendData.num_all = data.num_all;
	  if(pl5TrendObj.postData["trendName"]=="LR"){
		pl5TrendObj.ajaxGetLRData();
	  }else{
		pl5TrendObj.createListDom(data.list);
	  } 
  }

  pl5TimeObj.setData = function(data){
    this.nowTime = data.nowTime;
    this.syTime = data.syTime;
    this.lotteryNo = data.lotteryNo;
  }

  pl5TimeObj.resetSetTime = function(){
    if(this.nowTimeObj)clearTimeout(this.nowTimeObj);
    if(this.syTimeObj)clearTimeout(this.syTimeObj);
    this.nowTimeObj = "";
    this.syTimeObj = "";
    this.updateNowTime();
    this.setSytimeDom();
  }

  pl5TimeObj.updateNowTime = function(){
    this.nowTimeObj = setInterval(function(){
      pl5TimeObj.nowTime+=1000;
    },1000);
  }

  pl5TimeObj.correctTime = function(){
    this.correctTimeObj = setInterval(function(){
		
      var nowTime = new Date().getTime();
      if(!pl5TimeObj.syTime)return false;
      if(Math.abs(nowTime - pl5TimeObj.nowTime)>pl5TimeObj.errorTime){
		//console.log('correct');
        pl5TimeObj.getLotteryData();
      }
    },this.correctInterval);
  }

  pl5TimeObj.setSytimeDom = function(){
    var thisSyTime = this.syTime;
    this.syTimeObj = setInterval(function(){
      if(thisSyTime==0){
        if(pl5TimeObj.syTimeObj)clearTimeout(pl5TimeObj.syTimeObj);
        pl5TimeObj.syTimeObj = "";
        pl5TimeObj.getCG(pl5TimeObj.pl5TimeObjCG,"append");
        pl5TimeObj.setLotteryNoTipsHtml();
        pl5TimeObj.getLotteryData();
        return false;
      }
      if(!pl5TimeObj.stop){
        var hour = 0;
		if(thisSyTime > 3600){
			hour = Math.floor(thisSyTime/3600);
		}
		var fen = Math.floor((thisSyTime - hour*3600)/60);
		var miao = thisSyTime - hour*3600 - fen*60;
		hour = hour<10 ? '0'+hour : hour;
		fen = fen<10 ? "0"+fen : fen;
		miao = miao<10 ? "0"+miao : miao;
		var html = pl5TimeObj.lotteryNo.slice(-3)+'期离截止<span class="fontred">'+(hour ? hour+':' : '') +fen+':'+miao+'</span>';
        pl5TimeObj.qhObj.html(html);
      }
      thisSyTime--;
    },1000);
  }

  pl5TimeObj.init = function(){
	this.setDefConfig();
    this.createDom();
    this.updateNowTime();
    this.correctTime();
    this.setLotteryNoTipsHtml();
    this.getLotteryData(true);
  }
  
  pl5TimeObj.setDefConfig = function(){
	  pl5TimeObj.lotteryNo = "";
	  pl5TimeObj.nowTime = new Date().getTime();
	  pl5TimeObj.syTime = 0;
	  pl5TimeObj.pl5TimeObjCG = 360000;
	  pl5TimeObj.pl5TimeObjCGInterval = 60000;
	  pl5TimeObj.pl5TimeObjNoInterval = 60000;
	  pl5TimeObj.correctInterval = 10000;
	  pl5TimeObj.errorTime = 100000;
	
	
	  pl5TimeObj.stop = false;
	  pl5TimeObj.tips = true;    //自动切换期号的时候是否提醒用户
	  
	  if(this.correctTimeObj){
		 clearInterval(pl5TimeObj.correctTimeObj);
		
	  }
	  if(this.nowTimeObj){
		 clearInterval(pl5TimeObj.nowTimeObj);
	  }
	  if(this.syTimeObj){
		clearInterval(pl5TimeObj.syTimeObj);
	  }
	  
	  if(this.getTimeObj){
          clearTimeout(pl5TimeObj.getTimeObj);
      }
	   
	  if(this.getCGObj){
          clearTimeout(pl5TimeObj.getCGObj);
      }
	  
	  this.correctTimeObj = '';
	  this.nowTimeObj = '';
	  this.syTimeObj = '';
	  this.getTimeObj = '';
	  this.getCGObj = '';
	
	  //window.pl5TimeObjMyScroll = "";  
  }
