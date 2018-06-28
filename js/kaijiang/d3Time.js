
  var d3TimeObj = new Object();
  
  d3TimeObj.createDom = function(){
    this.qhObj = $("#d3Trend_qhObj");
    this.subObj = $("#d3Trend_subObj");
  }

  d3TimeObj.getClientTime = function(){
    return new date().getTime();
  }

  d3TimeObj.setLotteryNoTipsHtml = function(){
    var html = '正在获取新的期号';
    this.qhObj.html(html);
  }

  d3TimeObj.getLotteryData = function(tips){
    $.ajax({
      url : ConfigObj.localSite + '?version=1&m=Ajax.stat.getscheduletime',
       data : "lotteryType=D3&v=" + new Date().getTime(),
      type : "post",
      dataType : "json",
      success : function(msg){
		//console.log('福彩3d走势图表投注期程',msg);
        if(msg.code !== '0000'){
          $.alertMsg(msg.code_str);
          d3TimeObj.getTimeObj = setTimeout(function(){
            d3TimeObj.getLotteryData();
          },d3TimeObj.d3TimeObjNoInterval);
          return false;
        }
        if(msg.info.stop == "Y"){
          d3TimeObj.stop = true;
          d3TimeObj.qhObj.html("每天09:00-23:50销售");
          d3TimeObj.setData(msg.info);
          d3TimeObj.resetSetTime();
          d3TimeObj.subObj.attr("data-stop","1");
          return false;
        }else{
          d3TimeObj.subObj.removeAttr('data-stop');
          d3TimeObj.stop = false;
        }
        if(d3TimeObj.getTimeObj){
          clearTimeout(d3TimeObj.getTimeObj);
          d3TimeObj.getTimeObj = "";
        }
        //if(this.tips && d3TimeObj.lotteryNo && msg.info.lotteryNo != d3TimeObj.lotteryNo){
		//  if($('#d3Confirm').length > 0 && $('#d3Confirm').css('display') != 'none'){
        //  	$.alertMsg("当前期已经结束，自动切换到可购买期");
		//  }
       // }

        if(d3TimeObj.lotteryNoChange && msg.info.lotteryNo != d3TimeObj.lotteryNo){
          d3TimeObj.setData(msg.info);
          d3TimeObj.resetSetTime();
          d3TimeObj.lotteryNoChange(msg.info);
        }else{
          d3TimeObj.setData(msg.info);
          d3TimeObj.resetSetTime();
        }
      }
    });
  }
  
  d3TimeObj.lotteryNoChange = function(data){
	d3TrendObj.postData.lotteryNoVal = data.lotteryNo; 
	//d3ConfirmObj.lotteryNo = data.lotteryNo;  
	if($('#d3Confirm').length > 0 && d3ConfirmObj.updBetTipsObj){
		d3ConfirmObj.updBetTipsObj.attr("data-no",data.lotteryNo);
	}
  }

  d3TimeObj.getCG = function(time,type){
    time = time ? time : this.d3TimeObjCG;
    d3TimeObj.getCGObj = setTimeout(function(){
      var lotteryData = d3TrendObj.postData;
      var dataObj = {
        lottery_type:lotteryData.lottery_type,
        trendType : lotteryData.trendType
      }
      if(type && type==="append")dataObj.lottery_no = lotteryData.lotteryNoVal;
      var secretData = {
				'para' : Global.encrypt(dataObj)
			};
      $.ajax({
        url : ConfigObj.localSite +  '?version=1&m=Lottery.d3.getChartData',
        data : secretData,
        type : "post",
        dataType : "json",
        success : function(msg){
		   //console.log('排列三获取走势数据[d3Time]',msg);
          //if(msg.info.trendType!=lotteryData.trendType)return false;
          
          if(msg.code !== "0000"){
            $.alertMsg(msg.code_str);
            d3TimeObj.getCG(d3TimeObj.d3TimeObjCGInterval,type);
            return false;
          }
          msg.info = $.parseJSON(Global.crypt(msg.info));
          if(!msg.info || !msg.info.list || !msg.info.list.length){
            d3TimeObj.getCG(d3TimeObj.d3TimeObjCGInterval,type);
            return false;
          }
          if(d3TimeObj.getCGObj){
            clearTimeout(d3TimeObj.getCGObj);
            d3TimeObj.getCGObj = "";
          }

          d3TimeObj.createNewCG(msg.info);
        }
      });
    },time);
  }
  
  d3TimeObj.createNewCG = function(data){
	  d3TrendObj.temTrendData.list.push(data.list[0]);
	  d3TrendObj.temTrendData.num_max_miss = data.num_max_miss;
	  d3TrendObj.temTrendData.num_avg_miss = data.num_avg_miss;
	  d3TrendObj.temTrendData.num_pre_miss = data.num_pre_miss;
	  d3TrendObj.temTrendData.num_cur_miss = data.num_cur_miss;
	  d3TrendObj.temTrendData.num_con_miss = data.num_con_miss;
	  d3TrendObj.temTrendData.num_hap_pro = data.num_hap_pro;
	  d3TrendObj.temTrendData.num_all = data.num_all;
	  if(d3TrendObj.postData["trendName"]=="LR"){
		d3TrendObj.ajaxGetLRData();
	  }else{
		d3TrendObj.createListDom(data.list);
	  } 
  }

  d3TimeObj.setData = function(data){
    this.nowTime = data.nowTime;
    this.syTime = data.syTime;
    this.lotteryNo = data.lotteryNo;
  }

  d3TimeObj.resetSetTime = function(){
    if(this.nowTimeObj)clearTimeout(this.nowTimeObj);
    if(this.syTimeObj)clearTimeout(this.syTimeObj);
    this.nowTimeObj = "";
    this.syTimeObj = "";
    this.updateNowTime();
    this.setSytimeDom();
  }

  d3TimeObj.updateNowTime = function(){
    this.nowTimeObj = setInterval(function(){
      d3TimeObj.nowTime+=1000;
    },1000);
  }

  d3TimeObj.correctTime = function(){
    this.correctTimeObj = setInterval(function(){
		
      var nowTime = new Date().getTime();
      if(!d3TimeObj.syTime)return false;
      if(Math.abs(nowTime - d3TimeObj.nowTime)>d3TimeObj.errorTime){
		//console.log('correct');
        d3TimeObj.getLotteryData();
      }
    },this.correctInterval);
  }

  d3TimeObj.setSytimeDom = function(){
    var thisSyTime = this.syTime;
    this.syTimeObj = setInterval(function(){
      if(thisSyTime==0){
        if(d3TimeObj.syTimeObj)clearTimeout(d3TimeObj.syTimeObj);
        d3TimeObj.syTimeObj = "";
        d3TimeObj.getCG(d3TimeObj.d3TimeObjCG,"append");
        d3TimeObj.setLotteryNoTipsHtml();
        d3TimeObj.getLotteryData();
        return false;
      }
      if(!d3TimeObj.stop){
        var hour = 0;
		if(thisSyTime > 3600){
			hour = Math.floor(thisSyTime/3600);
		}
		var fen = Math.floor((thisSyTime - hour*3600)/60);
		var miao = thisSyTime - hour*3600 - fen*60;
		hour = hour<10 ? '0'+hour : hour;
		fen = fen<10 ? "0"+fen : fen;
		miao = miao<10 ? "0"+miao : miao;
		var html = d3TimeObj.lotteryNo.slice(-3)+'期离截止<span class="fontred">'+(hour ? hour+':' : '') +fen+':'+miao+'</span>';
        d3TimeObj.qhObj.html(html);
      }
      thisSyTime--;
    },1000);
  }

  d3TimeObj.init = function(){
	this.setDefConfig();
    this.createDom();
    this.updateNowTime();
    this.correctTime();
    this.setLotteryNoTipsHtml();
    this.getLotteryData(true);
  }
  
  d3TimeObj.setDefConfig = function(){
	  d3TimeObj.lotteryNo = "";
	  d3TimeObj.nowTime = new Date().getTime();
	  d3TimeObj.syTime = 0;
	  d3TimeObj.d3TimeObjCG = 360000;
	  d3TimeObj.d3TimeObjCGInterval = 60000;
	  d3TimeObj.d3TimeObjNoInterval = 60000;
	  d3TimeObj.correctInterval = 10000;
	  d3TimeObj.errorTime = 100000;
	
	
	  d3TimeObj.stop = false;
	  d3TimeObj.tips = true;    //自动切换期号的时候是否提醒用户
	  
	  if(this.correctTimeObj){
		 clearInterval(d3TimeObj.correctTimeObj);
		
	  }
	  if(this.nowTimeObj){
		 clearInterval(d3TimeObj.nowTimeObj);
	  }
	  if(this.syTimeObj){
		clearInterval(d3TimeObj.syTimeObj);
	  }
	  
	  if(this.getTimeObj){
          clearTimeout(d3TimeObj.getTimeObj);
      }
	   
	  if(this.getCGObj){
          clearTimeout(d3TimeObj.getCGObj);
      }
	  
	  this.correctTimeObj = '';
	  this.nowTimeObj = '';
	  this.syTimeObj = '';
	  this.getTimeObj = '';
	  this.getCGObj = '';
	
	  //window.d3TimeObjMyScroll = "";  
  }
