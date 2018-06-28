
  var pl3TimeObj = new Object();
  
  pl3TimeObj.createDom = function(){
    this.qhObj = $("#pl3Trend_qhObj");
    this.subObj = $("#pl3Trend_subObj");
  }

  pl3TimeObj.getClientTime = function(){
    return new date().getTime();
  }

  pl3TimeObj.setLotteryNoTipsHtml = function(){
    var html = '正在获取新的期号';
    this.qhObj.html(html);
  }

  pl3TimeObj.getLotteryData = function(tips){
    $.ajax({
      url : ConfigObj.localSite + '?version=1&m=Ajax.stat.getscheduletime',
       data : "lotteryType=PL3&v=" + new Date().getTime(),
      type : "post",
      dataType : "json",
      success : function(msg){
		//console.log('排列三走势图表投注期程',msg);
        if(msg.code !== '0000'){
          $.alertMsg(msg.code_str);
          pl3TimeObj.getTimeObj = setTimeout(function(){
            pl3TimeObj.getLotteryData();
          },pl3TimeObj.pl3TimeObjNoInterval);
          return false;
        }
        if(msg.info.stop == "Y"){
          pl3TimeObj.stop = true;
          pl3TimeObj.qhObj.html("每天09:00-23:50销售");
          pl3TimeObj.setData(msg.info);
          pl3TimeObj.resetSetTime();
          pl3TimeObj.subObj.attr("data-stop","1");
          return false;
        }else{
          pl3TimeObj.subObj.removeAttr('data-stop');
          pl3TimeObj.stop = false;
        }
        if(pl3TimeObj.getTimeObj){
          clearTimeout(pl3TimeObj.getTimeObj);
          pl3TimeObj.getTimeObj = "";
        }
        //if(this.tips && pl3TimeObj.lotteryNo && msg.info.lotteryNo != pl3TimeObj.lotteryNo){
		//  if($('#pl3Confirm').length > 0 && $('#pl3Confirm').css('display') != 'none'){
        //  	$.alertMsg("当前期已经结束，自动切换到可购买期");
		//  }
       // }

        if(pl3TimeObj.lotteryNoChange && msg.info.lotteryNo != pl3TimeObj.lotteryNo){
          pl3TimeObj.setData(msg.info);
          pl3TimeObj.resetSetTime();
          pl3TimeObj.lotteryNoChange(msg.info);
        }else{
          pl3TimeObj.setData(msg.info);
          pl3TimeObj.resetSetTime();
        }
      }
    });
  }
  
  pl3TimeObj.lotteryNoChange = function(data){
	pl3TrendObj.postData.lotteryNoVal = data.lotteryNo; 
	//pl3ConfirmObj.lotteryNo = data.lotteryNo;  
	if($('#pl3Confirm').length > 0 && pl3ConfirmObj.updBetTipsObj){
		pl3ConfirmObj.updBetTipsObj.attr("data-no",data.lotteryNo);
	}
  }

  pl3TimeObj.getCG = function(time,type){
    time = time ? time : this.pl3TimeObjCG;
    pl3TimeObj.getCGObj = setTimeout(function(){
      var lotteryData = pl3TrendObj.postData;
      var dataObj = {
        lottery_type:lotteryData.lottery_type,
        trendType : lotteryData.trendType
      }
      if(type && type==="append")dataObj.lottery_no = lotteryData.lotteryNoVal;
      var secretData = {
				'para' : Global.encrypt(dataObj)
			};
      $.ajax({
        url : ConfigObj.localSite +  '?version=1&m=Lottery.pl3.getChartData',
        data : secretData,
        type : "post",
        dataType : "json",
        success : function(msg){
		   //console.log('排列三获取走势数据[pl3Time]',msg);
          //if(msg.info.trendType!=lotteryData.trendType)return false;
          
          if(msg.code !== "0000"){
            $.alertMsg(msg.code_str);
            pl3TimeObj.getCG(pl3TimeObj.pl3TimeObjCGInterval,type);
            return false;
          }
          msg.info = $.parseJSON(Global.crypt(msg.info));
          if(!msg.info || !msg.info.list || !msg.info.list.length){
            pl3TimeObj.getCG(pl3TimeObj.pl3TimeObjCGInterval,type);
            return false;
          }
          if(pl3TimeObj.getCGObj){
            clearTimeout(pl3TimeObj.getCGObj);
            pl3TimeObj.getCGObj = "";
          }

          pl3TimeObj.createNewCG(msg.info);
        }
      });
    },time);
  }
  
  pl3TimeObj.createNewCG = function(data){
	  pl3TrendObj.temTrendData.list.push(data.list[0]);
	  pl3TrendObj.temTrendData.num_max_miss = data.num_max_miss;
	  pl3TrendObj.temTrendData.num_avg_miss = data.num_avg_miss;
	  pl3TrendObj.temTrendData.num_pre_miss = data.num_pre_miss;
	  pl3TrendObj.temTrendData.num_cur_miss = data.num_cur_miss;
	  pl3TrendObj.temTrendData.num_con_miss = data.num_con_miss;
	  pl3TrendObj.temTrendData.num_hap_pro = data.num_hap_pro;
	  pl3TrendObj.temTrendData.num_all = data.num_all;
	  if(pl3TrendObj.postData["trendName"]=="LR"){
		pl3TrendObj.ajaxGetLRData();
	  }else{
		pl3TrendObj.createListDom(data.list);
	  } 
  }

  pl3TimeObj.setData = function(data){
    this.nowTime = data.nowTime;
    this.syTime = data.syTime;
    this.lotteryNo = data.lotteryNo;
  }

  pl3TimeObj.resetSetTime = function(){
    if(this.nowTimeObj)clearTimeout(this.nowTimeObj);
    if(this.syTimeObj)clearTimeout(this.syTimeObj);
    this.nowTimeObj = "";
    this.syTimeObj = "";
    this.updateNowTime();
    this.setSytimeDom();
  }

  pl3TimeObj.updateNowTime = function(){
    this.nowTimeObj = setInterval(function(){
      pl3TimeObj.nowTime+=1000;
    },1000);
  }

  pl3TimeObj.correctTime = function(){
    this.correctTimeObj = setInterval(function(){
		
      var nowTime = new Date().getTime();
      if(!pl3TimeObj.syTime)return false;
      if(Math.abs(nowTime - pl3TimeObj.nowTime)>pl3TimeObj.errorTime){
		//console.log('correct');
        pl3TimeObj.getLotteryData();
      }
    },this.correctInterval);
  }

  pl3TimeObj.setSytimeDom = function(){
    var thisSyTime = this.syTime;
    this.syTimeObj = setInterval(function(){
      if(thisSyTime==0){
        if(pl3TimeObj.syTimeObj)clearTimeout(pl3TimeObj.syTimeObj);
        pl3TimeObj.syTimeObj = "";
        pl3TimeObj.getCG(pl3TimeObj.pl3TimeObjCG,"append");
        pl3TimeObj.setLotteryNoTipsHtml();
        pl3TimeObj.getLotteryData();
        return false;
      }
      if(!pl3TimeObj.stop){
        var hour = 0;
		if(thisSyTime > 3600){
			hour = Math.floor(thisSyTime/3600);
		}
		var fen = Math.floor((thisSyTime - hour*3600)/60);
		var miao = thisSyTime - hour*3600 - fen*60;
		hour = hour<10 ? '0'+hour : hour;
		fen = fen<10 ? "0"+fen : fen;
		miao = miao<10 ? "0"+miao : miao;
		var html = pl3TimeObj.lotteryNo.slice(-3)+'期离截止<span class="fontred">'+(hour ? hour+':' : '') +fen+':'+miao+'</span>';
        pl3TimeObj.qhObj.html(html);
      }
      thisSyTime--;
    },1000);
  }

  pl3TimeObj.init = function(){
	this.setDefConfig();
    this.createDom();
    this.updateNowTime();
    this.correctTime();
    this.setLotteryNoTipsHtml();
    this.getLotteryData(true);
  }
  
  pl3TimeObj.setDefConfig = function(){
	  pl3TimeObj.lotteryNo = "";
	  pl3TimeObj.nowTime = new Date().getTime();
	  pl3TimeObj.syTime = 0;
	  pl3TimeObj.pl3TimeObjCG = 360000;
	  pl3TimeObj.pl3TimeObjCGInterval = 60000;
	  pl3TimeObj.pl3TimeObjNoInterval = 60000;
	  pl3TimeObj.correctInterval = 10000;
	  pl3TimeObj.errorTime = 100000;
	
	
	  pl3TimeObj.stop = false;
	  pl3TimeObj.tips = true;    //自动切换期号的时候是否提醒用户
	  
	  if(this.correctTimeObj){
		 clearInterval(pl3TimeObj.correctTimeObj);
		
	  }
	  if(this.nowTimeObj){
		 clearInterval(pl3TimeObj.nowTimeObj);
	  }
	  if(this.syTimeObj){
		clearInterval(pl3TimeObj.syTimeObj);
	  }
	  
	  if(this.getTimeObj){
          clearTimeout(pl3TimeObj.getTimeObj);
      }
	   
	  if(this.getCGObj){
          clearTimeout(pl3TimeObj.getCGObj);
      }
	  
	  this.correctTimeObj = '';
	  this.nowTimeObj = '';
	  this.syTimeObj = '';
	  this.getTimeObj = '';
	  this.getCGObj = '';
	
	  //window.pl3TimeObjMyScroll = "";  
  }
