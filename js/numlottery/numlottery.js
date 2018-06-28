function NumberLottery(obj){
  var numberLottery = new PageController({
	   'name': obj ? obj.name : '',
	   'tpl' : obj ? obj.tpl : ''
  });
  
  numberLottery.chartListTitle = {
    tjsyy : {
      // R2 : ["开奖号码"],  this.topMenuObj 不在开售时间 zsurl
      // R3 : ["开奖号码"],
      // R4 : ["开奖号码"],
      // R5 : ["开奖号码"], 
      // R6 : ["开奖号码"],
      // R7 : ["开奖号码"],
      // R8 : ["开奖号码"],
      FP1 : ["第一位"],
      FP2 : ["第一位","第二位"],
      // FC2 : ["开奖号码"],
      FP3 : ["第一位","第二位","第三位"],
      // FC3 : ["开奖号码"],  lottery.schedule.getnumschedule
    }
  }
  
  
  numberLottery.setDefConfig = function(){
	  this.isEdit = false;
	  this.editData = '';
	  this.lotteryPlay = "";
	  this.lotteryType = "";
	  this.lotteryCnName = "";
	  this.maxZSVal = 50000;
	  this.maxMoneyVal = 500000;
	  this.lotteryNo = "";
		this.endTime = 0;  //本期结束时间 时间戳格式
		this.lotteryOneMoney = 2;
	  this.lotteryMinNum = new Array();
	  this.lotteryMaxNum = new Array();
	  this.lotteryBallNum = new Array();
	  this.lotteryBetData = new Array();
	  this.lotteryBetNum = new Array();
	  this.lotteryBetDanNum = new Array();
	  this.lotterySelectTips = new Object();
	  this.lotteryRandomNum = new Object();
	  this.lotteryPlayCnName = new Object();
	  this.lotteryBetError = new Object();
	  this.betCnName = new Array();
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
	  if(this.scheduleInterval){
		  clearInterval( numberLottery.scheduleInterval);
		  this.scheduleInterval = '';
	  }
	  this.hasChartData = '';
	  this.isFastDan = 0;   //是否是高频胆拖玩法
  }

    /**
     * 设置倒计时
     */
  /*  numberLottery.tyDomObj = function(){
      
    }*/
  numberLottery.countdownTick = function (endTime) {
      // numberLottery.typeDomObj()
      console.log(te)
      console.log(Tim)
      if (window.__numLottryCountdownInterval) clearInterval(window.__numLottryCountdownInterval);

      var end = Date.parse(endTime.replace(/-/g, '/')); // end timestamp 
      
//    function getServerDate(){
//			    return new Date($.ajax({async: false}).getResponseHeader("Date"));
//			}
//			var t = getServerDate();
//			var ti = Date.parse(t)/1000;
//			console.log(ti)
      
      function set() {
          var now = Date.now(); // now timestamp 
          // console.log(now)
          if (now >= end) {
            $('#numberLottery_countdown').html('已截止');
            clearInterval(window.__numLottryCountdownInterval);
          } else {
            // console.log(now)
              now = now - 1000;
              // console.log(now)
              var interval = (end - now) / 1000; // seconds of interval
              // console.log(interval)
              var h = Math.floor(interval / 3600); // hours
              h = h < 10 ? '0' + h : h;
              var m = Math.floor((interval - h * 3600) / 60); // minutes
              // console.log(m)
              // console.log(Math.floor((interval - h * 3600) / 60)-59)
              // console.log(Math.floor((interval - h * 3600) / 60))
              m = m < 10 ? '0' + m : m;
              // console.log(m)
              var s = Math.floor(interval - h * 3600 - m * 60); // seconds
              s = s < 10 ? '0' + s : s;
              // var ht = h + ':' + (m-5) + ':' + s
              // console.log(ht)
              $('#numberLottery_countdown').html('距离截止' + h + ':' + (m-Tim) + ':' + s);
              // console.log('距离截止' + h + ':' + m + ':' + s)
              // console.log(Tim)
          }
      }
      window.__numLottryCountdownInterval = setInterval(function () {set();}, 1000);
  },

  //请求赛程数据
  numberLottery.getData = function(){
      window.scrollTo(0,0);
	  var self = this;
	  var dataObj = {
		  lotteryType : self.lotteryType.toUpperCase()   
	   }
	   var secretData = {
			'para' : Global.encrypt(dataObj)
		};
	   $.ajax({
		  url : ConfigObj.localSite + '?version=1&m=lottery.schedule.getnumschedule',
		  data : secretData,
		  type : "post",
		  dataType : "json",
		  success : function(obj){
			 console.log('数字彩赛程接口',obj);
			 if(obj.code == '0000'){
                 // if (dataObj.lotteryType == 'D3') d3Obj.funObj.updateBonusTips('IP');
				 obj.info = $.parseJSON(Global.crypt(obj.info));
				 self.lotteryNo = obj.info.lotteryNo;
         te = obj.info.poolInfo.lottery_type
         console.log(obj.info.endTime)
				 self.endTime = new Date(obj.info.endTime);
         console.log(self.endTime)
				 var desc = '第'+ self.lotteryNo +'期 <span class="fontred"> <span id="numberLottery_countdown"></span> ';
				 var pool = ((self.lotteryType == 'dlt' || self.lotteryType == 'ssq' || self.lotteryType == 'qxc' || self.lotteryType == 'hn4j1') && obj.info.poolInfo.pool_saledesc) ? ' 奖池：'+ obj.info.poolInfo.pool_saledesc +'</span>' : '';
         var poo = '<i class="i-null"></i>'
				 self.topDescObj.html(desc + pool + poo);
				 if(self.scheduleInterval){
					clearInterval(self.scheduleInterval); 
				 }
         var secretData = {
              'type' : te
            };
            console.log(te)
          $.ajax({
            url : ConfigObj.localSite + '?version=1&m=cashier.excep.color_type',
            data : secretData,
            type : "post",
            dataType : "json",
            async:false,
            success : function(ob){
              console.log(ob)
              // console.log(ob.info.time)
              // self.eTim =ob.info.time
              Tim =  ob.info.time
              // numberLottery.countdownTick()
              
            }
          });
         // numberLottery.typeDomObj(te)
         /*numberLottery.typeDomObj = function(Tim){
            var secretData = {
                    'type' : te
                  };
                  $.ajax({
                    url : ConfigObj.localSite + '?version=1&m=cashier.excep.color_type',
                    data : secretData,
                    type : "post",
                    dataType : "json",
                    success : function(ob){
                      // console.log(ob.info.time)
                      // self.eTim =ob.info.time
                      var Tim =  ob.info.time
                      // numberLottery.countdownTick()

                    }
                  });
          }*/
         // console.log(obj.info.endTime)
        /* var dat = new Date();
         var Year = dat.getFullYear();
         var month = dat.getMonth()+1;
         var getDate = dat.getDate();
         var Hour = dat.getHours();
         var Minu = dat.getMinutes();
         var Second = dat.getSeconds();
         var tim = Year+'年'+month+'月'+getDate+'日'+Hour+'时'+Minu+'分'+Second+'秒';*/
         /*if (obj.info.endTime > tim) {
            
         }else{
            $.alertMsg('该彩种暂无最新期数');
            $('.remov').css('display','none')
            // $('.bet_rt').find('.btn_buy').css('display','none')
            // $('.bet_rt').after('<p style="display: inline-block;width: 100%;min-width: 81px;background: #fcdd52;text-align: center;height: 48px;line-height: 45px;font-size: 18px;">暂停</p>')
            return false
              // alert()
         }*/
				 //每1分钟重新请求赛程，防止过期
				 if(self.endTime > 0){
					 self.scheduleInterval = setInterval(function(){
//						 //console.log(self.lotteryType + '数字彩倒计时请求赛程 : '+ self.lotteryNo);
						 if(new Date().getTime() - self.endTime > 0){
							self.getData(); 
						 }
					 },60000)  
				 }
				 var domId = self.lotteryType + 'Confirm';
				 var controller = window[domId + 'Obj'];
				 if($('#' + domId).length > 0 && controller.updBetTipsObj){
						controller.updBetTipsObj.attr("data-no",self.lotteryNo);
		  		 }

                 numberLottery.countdownTick(obj.info.endTime);
			 }else{
				 
			 }
		  }
		}); 
	  
  }
  
  numberLottery.createDomObj = function(){
   /* this.lotteryDomObj = $("#dlt_lotteryObj"); backbtn
    this.updataPlayObj = $("#dlt_updataPlayObj");
    this.topMenuObj = $('#dlt_topMenuLayer');
	this.topDescObj = $('#dlt topDesc');
    this.jxObj = $('#dlt_jxLayer');
    this.chartListObj = $('#dlt_chartList');
    this.zhushuObj = $("#dlt_zhushuObj");
    this.moneyObj = $("#dlt_moneyObj");
    this.ddTipsObj = $("#dlt_ddTipsObj");
    this.playTitleObj = $("#dlt_playTitleObj");
    this.selectDivObj = $("#dlt_lotteryObj .selectObj");
    this.selTitleObj = $("#dlt_lotteryObj .selTitleObj");*/
  }
numberLottery.goBack=function(){
  fastK3Obj.destroy();
      homeObj.show(); 
}
  numberLottery.lotteryEvent = function(e){
    // console.log(e)
    var pObj = $.oto_checkEvent(e,"P");
    if(pObj){
      var thisObj = $(pObj);
      var thisT = thisObj.attr("data-t");
      // console.log(this.goBack()) showupdplay
      console.log(thisT)
      switch(thisT){
        // case "backbtn" : dltnewBounObj.show();return true;//dltnewBounObj
				case "backbtn" :this.goBack();return true;
        case "clear" : this.clearBetLottery();this.setMoneyDom();return true;
        case "updatelottery" : this.updatePlay(thisObj.attr('data-v'),thisObj.attr('data-d'),thisObj);this.setMoneyDom();return true;
        case "showChartList" : this.showChartList(thisObj);return true;
        case "showSYXWChartList" : this.showSYXWChartList(thisObj);return true;
				case "showK3ChartList" : this.showK3ChartList(thisObj);return true;
        case "submitBet" : this.submitBet(thisObj);return true;
      }


    }
    var spanObj = $.oto_checkEvent(e,"SPAN");
    if(spanObj){
      var thisObj = $(spanObj);
      var thisT = thisObj.attr("data-t");
      switch (thisT){ //showupdplay
				case "showTopMenu" : this.showTopMenu(thisObj);return true;
        case "showupdplay" : this.showUpdPlay(thisObj);return true
        case "selectnum" : this.selectNumber(thisObj);this.setMoneyDom();this.isRandom=false;return true;
        case "redjx" : this.showJx(thisObj,'red');return true;
        case "bluejx" : this.showJx(thisObj,'blue');return true;
        case "random" : this.selectRandom(thisObj);this.setMoneyDom();this.isRandom=true;return true;
        case "whatPlay" : this.showPlayTips();return true;
				case "hideJxLayer": this.closeJx();return true;
				case "jxNumBtn" : this.jxNumFun(thisObj);this.isRandom=false;return true;
        case "showquick" :this.showQuick(thisObj);return true;
        case "quick" : this.quickSelectNum(thisObj);this.setMoneyDom();return true;
				case 'zsurl' : this.goTrend();return true;
      }
    }
	var liObj = $.oto_checkEvent(e,"LI");
    if(liObj){
      var thisObj = $(liObj);
      var thisT = thisObj.attr("data-t");
      console.log(thisT)
      switch(thisT){
				case 'kjurl' : this.goNumKaijiang();return true;
				case 'zsurl' : this.goTrend();return true;
        case 'jjurl' : this.goLotteryRules('prize');return true;
				case 'gzurl' : this.goLotteryRules('play');return true;
      }

    }
	
	
  }
  
  numberLottery.hideTopMenu = function(){
	  var btn = this.lotteryDomObj.find('[data-t="showTopMenu"]');   
	  this.topMenuObj.hide();
      btn.attr("data-s",0);
	  this.removeBgLayer(); 
	  
	  var btn2 = this.lotteryDomObj.find('[data-t="showupdplay"]');
    // console.log(btn2)
	  this.updataPlayObj.hide();
      btn2.attr("data-s",0);
	  this.removeBgLayer();
	  // this.betWrap.find('.current').removeClass("currentFixed")
//	  this.betWrap.addClass('centerWrap'); showChartList
	  // this.betWrap.find('.current').addClass('fixTopTit_4');
//	  this.betWrap.find('.history').addClass('mt78');
	  
  }

  numberLottery.goTrend = function(){
	 this.hideTopMenu();
	 switch(this.lotteryType){
		case ConfigObj.fastLotType :
		 fastTrendObj.goBack = function(){
      // console.log(327)
			fastTrendObj.destroy();
			numberLottery.show(); 
		 }
		 var type = this.lotteryType;
		 fastTrendObj.show('reload',function(){
			 if(type == 'gd11x5'){
				//fastTrendObj.updatelottery('FP1','前一');
				fastTrendObj.updatelottery(numberLottery.lotteryPlay,numberLottery.lotteryPlayCnName[numberLottery.lotteryPlay]);
			 }
		 });
		 break;
         case ConfigObj.fastK3Type:
             // 快三走势页
             fastK3TrendObj.goBack = function () {
                 fastK3TrendObj.destroy();
                 numberLottery.show();
             };
             var type = this.lotteryType;
             fastK3TrendObj.show(true, function () {
                 fastK3TrendObj.updatelottery(numberLottery.lotteryPlay, numberLottery.lotteryPlayCnName[numberLottery.lotteryPlay]);
             });
             break;
		case 'dlt':
		  dltTrendObj.goBack = function(){
        console.log(352)
			dltTrendObj.destroy();
			numberLottery.show(); 
		  }
		  dltTrendObj.show('reload');
		  break;
		 case 'ssq':
		  ssqTrendObj.goBack = function(){
			ssqTrendObj.destroy();
			numberLottery.show(); 
		  }
		  ssqTrendObj.show('reload');
		  break;	 	 
		 case 'pl3':
		  pl3TrendObj.goBack = function(){
			pl3TrendObj.destroy();
			numberLottery.show(); 
		  }
		  pl3TrendObj.show('reload',function(){
			    pl3TrendObj.updatelottery(numberLottery.lotteryPlay,numberLottery.lotteryPlayCnName[numberLottery.lotteryPlay]);
		  });
		  break;
		 case 'd3':
		   d3TrendObj.goBack = function(){
			 d3TrendObj.destroy();
			 numberLottery.show(); 
		   }
		   d3TrendObj.show('reload');
		   break;
		 case 'pl5':
		   pl5TrendObj.goBack = function(){
			 pl5TrendObj.destroy();
			 numberLottery.show(); 
		   }
		   pl5TrendObj.show('reload');
		   break;
		 case 'qxc':
		   qxcTrendObj.goBack = function(){
			 qxcTrendObj.destroy();
			 numberLottery.show(); 
		   }
		   qxcTrendObj.show('reload');
		   break;	
		 case 'hn4j1':
		 	hn4j1TrendObj.goBack = function(){
				hn4j1TrendObj.destroy();
				numberLottery.show();	
			}
			hn4j1TrendObj.show('reload');
			break;
	 }

      Global.pv('zoushi', {lotteryType: this.lotteryType});
  }
  
  //规则页面
  numberLottery.goLotteryRules = function(type){
    console.log(409)
	  var btn = this.lotteryDomObj.find('[data-t="showTopMenu"]');
	  this.showTopMenu(btn);
	  lotteryRulesObj.goBack=function(){
      console.log(412)
		 lotteryRulesObj.destroy();
		 numberLottery.show()  
	  }
	  lotteryRulesObj.show('reload',function(){
		  lotteryRulesObj.setData(numberLottery.lotteryType, type);  
	  })
  }
  
  //跳转到开奖页面
  numberLottery.goNumKaijiang = function(){
	  var btn = this.lotteryDomObj.find('[data-t="showTopMenu"]');
	  this.showTopMenu(btn);
	  numKaijiangObj.goBack = function(){
      console.log(426)
		 numKaijiangObj.destroy();
		 numberLottery.show();  
	  }
	  numKaijiangObj.show('reload','',numberLottery.lotteryType,'bet' );
  }

  numberLottery.showQuick = function(obj){
    if(obj.hasClass('showObj')){
      obj.removeClass('showObj');
      obj.next().hide();
      this.temQuickTipsObj = '';
	  this.removeBgLayer();      
    }else{
      if(this.temQuickTipsObj){
        this.temQuickTipsObj.removeClass('showObj');
        this.temQuickTipsObj.next().hide();
      }
      obj.addClass('showObj');
      obj.next().show();
	  this.temQuickTipsObj = obj;
	  this.addBgLayer(obj.next());  
    }
  }
  
   numberLottery.createTipsBg = function(){
    var bodyHeight = document.body.scrollHeight;
    var divObj = $('<div id="upBGObj" style="width: 100%; height: '+bodyHeight+'px; position: absolute; left: 0px; top: 0px; z-index: 98; background: transparent;" ></div>');
    $(document.body).append(divObj);
    divObj.unbind('tap').tap(function(){
      numberLottery.temQuickTipsObj.next().hide();
      numberLottery.temQuickTipsObj.removeClass('showObj');
      divObj.remove();
    });
  }

  numberLottery.quickSelectNum = function(obj){
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
	var quickDivObj = obj.parent().parent();
    quickDivObj.hide();
    quickDivObj.prev().removeClass('showObj');
    this.removeBgLayer();
    this.isRandom = false;
  }

  numberLottery.quickSelectD = function(key){
    var thisMaxNum = this.lotteryMaxNum[key];
    var thisSpanObj = this.selectDivObj.eq(key).find("span");
    for(var i=0,ilen=thisSpanObj.length;i<ilen;i++){
      var thisK = Number(thisSpanObj.eq(i).attr("data-v"));
      if(thisK<thisMaxNum/2)continue;
      this.selectNumber(thisSpanObj.eq(i));
    }
  }

  numberLottery.quickSelectX = function(key){
    var thisMaxNum = this.lotteryMaxNum[key];
    var thisSpanObj = this.selectDivObj.eq(key).find("span");
    for(var i=0,ilen=thisSpanObj.length;i<ilen;i++){
      var thisK = Number(thisSpanObj.eq(i).attr("data-v"));
      if(thisK>=thisMaxNum/2)continue;
      this.selectNumber(thisSpanObj.eq(i));
    }
  }

  numberLottery.quickSelectQ = function(key){
    var thisSpanObj = this.selectDivObj.eq(key).find("span");
    for(var i=0,ilen=thisSpanObj.length;i<ilen;i++){
      this.selectNumber(thisSpanObj.eq(i));
    }
  }

  numberLottery.quickSelectJ = function(key){
    var thisSpanObj = this.selectDivObj.eq(key).find("span");
    for(var i=0,ilen=thisSpanObj.length;i<ilen;i++){
      var thisK = Number(thisSpanObj.eq(i).attr("data-v"));
      if((thisK+1)%2===1)continue;
      this.selectNumber(thisSpanObj.eq(i));
    }
  }

  numberLottery.quickSelectO = function(key){
    var thisSpanObj = this.selectDivObj.eq(key).find("span");
    for(var i=0,ilen=thisSpanObj.length;i<ilen;i++){
      var thisK = Number(thisSpanObj.eq(i).attr("data-v"));
      if((thisK+1)%2===0)continue;
      this.selectNumber(thisSpanObj.eq(i));
    }
  }

  numberLottery.quickSelectC = function(key){
  }
  numberLottery.selectNumber = function(obj){
	//if(this.lotteryType == ConfigObj.fastK3Type){  //sb恶心需求
		//this.checkK3SubType(obj);	
	//}
    var thisV = obj.attr("data-v");
    var thisK = obj.attr("data-k");
    var thisI = obj.parent().attr("data-v");
    if(!this.lotteryBetData[thisI])this.lotteryBetData[thisI]=new Array();
    if(!this.lotteryBetNum[thisI])this.lotteryBetNum[thisI] = 0;
    if(this.checkDanPlay() && !this.lotteryBetDanNum[thisI])this.lotteryBetDanNum[thisI]=0;
    if(this.lotteryBallWei){
      for(var i=0,k=0,ilen=this.lotteryBetNum.length;i<ilen;i++){
        if(this.lotteryBetNum[i]>0)k++;
      }
      if(k>=this.lotteryBallWei && this.lotteryBetNum[thisI]===0){
        $.alertMsg("最多可选"+this.lotteryBallWei+"位");
        return false;
      }
    }
	if(this.lotteryType == "hn4j1" && (this.lotteryPlay == "R4C3" || this.lotteryPlay == "R4C3" || this.lotteryPlay == "R4C1" || this.lotteryPlay == "R3C2")){
      for(var i=0,ilen=this.lotteryBetNum.length;i<ilen;i++){
        if(i==thisI)continue;
        if(this.lotteryBetNum[i]==0)continue;
        for(var k=0,klen=this.lotteryBetData[i].length;k<klen;k++){
          if(!this.lotteryBetData[i][k])continue;
          if(this.lotteryBetData[i][k] == thisV){
            delete this.lotteryBetData[i][k];
            this.lotteryBetNum[i]-=1;
            var thisSpanObj = this.selectDivObj.eq(i).find("span");
            thisSpanObj.eq(k).removeClass('selected');
          }
        }
      }
    }
	if(this.name == 'fastK3'){  //快三玩法校验
		var checkInfo = this.checkK3Select(obj);
		if(!checkInfo.isValid){
			$.alertMsg(	checkInfo.msg);
			return false
		}
	}
	
    if(!this.checkDanPlay() && !obj.hasClass('selected')){
      //if(this.lotteryType == "hn4j1" && this.lotteryBetNum[thisI]>=this.lotteryMaxNum[thisI]){
      //  $.alertMsg('最多可选'+this.lotteryMaxNum[thisI]+'个'+(this.betCnName[thisI] ? this.betCnName[thisI] : '')+'号码');
      //  return false;
      //}
      obj.addClass('selected');

      this.lotteryBetData[thisI][thisK] = thisV;
      this.lotteryBetNum[thisI]+=1;
    }else if(!this.checkDanPlay() && obj.hasClass('selected')){
      obj.removeClass('selected');

      delete this.lotteryBetData[thisI][thisK];
      this.lotteryBetNum[thisI]-=1;
    }else if(this.checkDanPlay() && !obj.hasClass('dan') && !obj.hasClass('selected')){
     // if(this.lotteryBetNum[thisI]>=this.lotteryMaxNum[thisI]){
     //   $.alertMsg('最多可选'+this.lotteryMaxNum[thisI]+'个'+(this.betCnName[thisI] ? this.betCnName[thisI] : '')+'号码');
     //   return false;
     // }
      obj.addClass('selected');

      this.lotteryBetNum[thisI]+=1;
      this.lotteryBetData[thisI][thisK] = thisV;
    }else if(this.checkDanPlay() && obj.hasClass('selected')){

     // if(this.lotteryBetNum[thisI]>=this.lotteryMaxNum[thisI]){
     //   $.alertMsg('最多可选'+this.lotteryMaxNum[thisI]+'个'+(this.betCnName[thisI] ? this.betCnName[thisI] : '')+'号码');
     //   return false;
     // }
      if(this.lotteryBetDanNum[thisI] >= this.lotteryMinNum[thisI]-1){
        obj.removeClass('selected');
        this.lotteryBetNum[thisI]-=1;
        delete this.lotteryBetData[thisI][thisK];
      }else{
        obj.removeClass('selected');
        obj.addClass('dan');
        obj.append('<i>胆</i>');

        this.lotteryBetData[thisI][thisK] = "d-"+thisV;
        this.lotteryBetDanNum[thisI]+=1;
      }
    }else if(this.checkDanPlay() && obj.hasClass('dan')){
      obj.removeClass('dan');
      obj.children('i').remove();
      this.lotteryBetDanNum[thisI]-=1;
      this.lotteryBetNum[thisI]-=1;
      delete this.lotteryBetData[thisI][thisK];
    }
  }

  numberLottery.createSubmitData = function(){
    var data = [];
    var danData = [];
    for(var i=0,ilen=this.lotteryMinNum.length;i<ilen;i++){
	  if(this.lotteryBallWei && (this.lotteryBetData[i] && this.lotteryBetData[i].length)){
        var temArr = [];
        for(var t=0,tlen=this.lotteryBetData[i].length;t<tlen;t++){
          if(this.lotteryBetData[i][t])temArr.push(this.lotteryBetData[i][t]);
        }

        this.lotteryBetData[i] = temArr;
      }
	  if(this.lotteryBallWei && (this.lotteryBetData[i] && this.lotteryBetData[i].length)){
        var temArr = [];
        for(var t=0,tlen=this.lotteryBetData[i].length;t<tlen;t++){
          if(this.lotteryBetData[i][t])temArr.push(this.lotteryBetData[i][t]);
        }

        this.lotteryBetData[i] = temArr;
      }
      if(this.lotteryBallWei && !(this.lotteryBetData[i] && this.lotteryBetData[i].length)){
        data[i] = "-";
        continue;
      }
      if(!this.lotteryBetData[i])continue;
      var temData = [];
      var temDVal = [];
      for(var k=0,klen=this.lotteryBetData[i].length;k<klen;k++){
        if(this.lotteryBetData[i][k])temData.push(this.lotteryBetData[i][k]);
        if(this.lotteryBetData[i][k] && this.lotteryBetData[i][k].indexOf("d-")>-1)temDVal.push(this.lotteryBetData[i][k]);
      }
      //if(this.checkDanPlay() && temDVal.length<1)return [false,this.lotteryBetError['DD'][i]];
      if(temData.length && temData.length<this.lotteryMinNum[i])return [false,this.lotteryBetError[this.lotteryPlay][i]];
      if(temData.length) data[i]=temData.join(",");
      if(temDVal.length)danData[i] = temDVal.join(",");
    }
    
    if(this.checkDanPlay() && danData.length == 0 && data.length == 0){
      return [false,"请至少选择1注"];
    }else if(this.checkDanPlay() && danData.length == 0 && data.length != 0){     
      return [false,"请至少选择一个胆码"]
     }else if(data.length == 0){
      this.selectRandom();
      this.setMoneyDom();
      return [false,""];
    }
    for(var i=0,ilen=this.lotteryMinNum.length;i<ilen;i++){
      if(this.checkDanPlay() && danData[i] && (this.lotteryType == 'dlt' || this.lotteryType == 'ssq')){ //目前这个逻辑只适用于大乐透[和双色球]胆拖 zhangw
        var thisBetData = data[i].split(",");
        if(thisBetData.length < this.lotteryMinNum[i]+1){
          return [false,this.lotteryBetError['DD'][i]];
        }
      }
      if(!data[i])return [false,this.lotteryBetError[this.lotteryPlay][i]];
    }
//  if(this.lotteryType == 'dlt' && danData[1] == undefined && data[1].split(",").length > 2) return [false,"后区无胆码时只能选择两个号码"];
    
    
    var zhushu = numberLottery.getZhushu();
	if(this.lotteryBallWei && zhushu==0){
      this.selectRandom();
      this.setMoneyDom();
      return [false,""];
    }
	if((this.lotteryType == ConfigObj.fastLotType || this.lotteryType == ConfigObj.fastK3Type)  && data.length!=0 && zhushu==0 && danData.length !=0){  //zhangw
		return [false,"请至少选择1注"];	
	}
    if(this.checkP && data.length!=0 && zhushu==0){
      return [false,"请每位至少选择1个不同的号码"];
    }
	if(this.checkP && this.lotteryType == ConfigObj.fastLotType && data.length != 0 && (this.lotteryPlay == 'FP2' || this.lotteryPlay == 'FP3')){
		/*if(zhushu == 1){
			for(var i=0;i<data.length;i++){
				if(i+1 < data.length){
					var itm = data[i].split(',');
					var itm2 = data[i+1].split(',');
					for(var j=0;j<itm.length;j++){
						if($.inArray(itm[j],itm2) != -1){
							return 	[false,"您选择的号码包含无效注,每位需要选择不同的号码"];
						}
					}
				}
			}
		}*/
		if(zhushu == 1){
			var rightArr = [];  //每次去重后的数组
			var notValid = false;
			for(var i=0;i<data.length;i++){
					if(data[i].split(',').length  == 1){
						rightArr[i] =  data[i];	
					}else{
						rightArr[i] = '';
						notValid = true;	
					}
			}
			while(notValid){  //有格式不正确的注码  zhangw
			    for(var i=0;i<data.length;i++){
					if(data[i] && data[i].split(',').length  == 1){
						rightArr[i] =  data[i];	
					}else{
						rightArr[i] = '';
						notValid = true;	
					}
				}
				for(var i=0;i<data.length;i++){
					if(data[i] == rightArr[i]) continue;
					var itm = data[i].split(',');
					if(itm.length > 1){
						var temp = rightArr.concat();
						for(var j=0;j<rightArr.length;j++){   //去重复号 zhangw
							if($.inArray(temp[j],itm) != -1){
								var idx = $.inArray(temp[j],itm);
								itm.splice(idx,1);
								data[i] = itm.join(',');
								rightArr[i] = itm.join(',');	
							}
						}
					}
				}
//				//console.log(data);
//				//console.log(rightArr);
				if(this.lotteryPlay == 'FP2'){
					if(data[0] && data[0].split(',').length ==1  && data[1] && data[1].split(',').length ==1){
						notValid = false;	
					}
				}
				if(this.lotteryPlay == 'FP3'){
					if(data[0] && data[1] && data[2]){
						if(data[0].split(',').length ==1 && data[1].split(',').length ==1 && data[2].split(',').length ==1){
							notValid = false;
						}
					}	
				}
			}
		}
	}
	var fastDanType = '';
	if(this.isFastDan){  //zhangw 增加高频订单逻辑，重要
		fastDanType = '_D';
	}
    data.push(this.isRandom ? this.lotteryPlay+"R" : this.lotteryPlay + fastDanType);
	////console.log(data);
    if(zhushu > this.maxZSVal)return [false,"注数最多支持"+(this.maxZSVal/10000).toFixed(0)+"万注"];
    if(zhushu*this.lotteryOneMoney > this.maxMoneyVal)return [false,"投注金额最大支持"+(this.maxMoneyVal/10000).toFixed(0)+"万元"];
    data.push(zhushu);
    return data.join("|");
  }

  numberLottery.submitBet = function(obj){
    console.log(obj)
    if(obj.attr("data-stop")){
      $.alertMsg("不在开售时间");
      return false;
    }
    var postData = this.createSubmitData();
    if(postData[0] === false){
      if(postData[1])$.alertMsg(postData[1]);
      return false;
    }
    if(window.localStorage){
      window.localStorage.setItem(this.lotteryType+"lotteryBetData",postData);
	  switch(numberLottery.lotteryType){
		 case 'dlt':
		 	this.gotoDltConfirm();
			break;
		 case 'pl3':
		 	this.gotoPl3Confirm();
			break;	
		 case 'pl5':
		 	this.gotoPl5Confirm();
			break;	
		  case 'qxc':
		 	this.gotoQxcConfirm();
			break;
		  case ConfigObj.fastLotType:
		    this.goFastBetConfirm();
			break;
		  case ConfigObj.fastK3Type:
		  	this.goFastK3Confirm();
			break;
		  case 'hn4j1':
		  	this.goHn4j1Confirm();
			break;
		  case 'ssq':
		  	this.goSsqConfirm();
			break;
		  case 'd3':
		  	this.gotoD3Confirm();
			break;
	  }

	  Global.pv('zuodan', {lotteryType: numberLottery.lotteryType});
	  
    }else{
       
    }
  }
  
  numberLottery.goHn4j1Confirm = function(){
	 hn4j1ConfirmObj.goBack = function(){
		 numberLottery.show();
		 numberLottery.clearBetLottery();  
		 numberLottery.setMoneyDom() 
	 }
	 hn4j1ConfirmObj.show('reload',function(){
		 hn4j1ConfirmObj.setData({
			'lotteryType': numberLottery.lotteryType,
			'lotteryCnName': '海南4+1',
			'lotteryNo' : numberLottery.lotteryNo,
			'lotteryPlay': numberLottery.lotteryPlay
		 });
	  })
  }
  
  numberLottery.goFastBetConfirm = function(){
	  fastBetConfirmObj.goBack = function(){
		  numberLottery.show();
		  numberLottery.clearBetLottery();  
		  numberLottery.setMoneyDom()
	  }
	 // fastBetConfirmObj.lotteryPlay = numberLottery.lotteryPlay; //高频比较特殊,需要在setDefConfig前传值 zhangw
	  fastBetConfirmObj.show('reload',function(){
		 fastBetConfirmObj.setData({
			'lotteryType': numberLottery.lotteryType,
			'lotteryCnName': numberLottery.lotteryCnName,
			'lotteryNo' : numberLottery.lotteryNo,
			'lotteryPlay': numberLottery.lotteryPlay,
			'isFastDan' : numberLottery.isFastDan
		 });
	  })
  }
  
  numberLottery.goFastK3Confirm = function(){
	  fastK3ConfirmObj.goBack = function(){
		  numberLottery.show(true);
		  numberLottery.clearBetLottery();  
		  numberLottery.setMoneyDom()
	  }
      // fastK3Obj.setDefConfig();
	  fastK3ConfirmObj.show('reload',function(){
		 fastK3ConfirmObj.setData({
			'lotteryType': numberLottery.lotteryType,
			'lotteryCnName': numberLottery.lotteryCnName,
			'lotteryNo' : numberLottery.lotteryNo,
			'lotteryPlay': numberLottery.lotteryPlay,
			'isFastDan' : numberLottery.isFastDan
		 });
	  })
  }
  
  numberLottery.gotoQxcConfirm = function(){
	  qxcConfirmObj.goBack = function(){
		  numberLottery.show();
		  numberLottery.clearBetLottery();  
		  numberLottery.setMoneyDom()
	  }
	  qxcConfirmObj.show('reload',function(){
		 qxcConfirmObj.setData({
			'lotteryType': numberLottery.lotteryType,
			'lotteryCnName': numberLottery.lotteryCnName,
			'lotteryNo' : numberLottery.lotteryNo,
			'lotteryPlay': numberLottery.lotteryPlay
		 });
	  })
  }
  
  numberLottery.gotoPl5Confirm = function(){
	  pl5ConfirmObj.goBack = function(){
		  numberLottery.show();
		  numberLottery.clearBetLottery();  
		  numberLottery.setMoneyDom()
	  }
	  pl5ConfirmObj.show('reload',function(){
		 pl5ConfirmObj.setData({
			'lotteryType': numberLottery.lotteryType,
			'lotteryCnName': numberLottery.lotteryCnName,
			'lotteryNo' : numberLottery.lotteryNo,
			'lotteryPlay': numberLottery.lotteryPlay
		 });
	  })
  }
  
  numberLottery.gotoPl3Confirm = function(){
	  pl3ConfirmObj.goBack = function(){
		  numberLottery.show();
		  numberLottery.clearBetLottery();  
		  numberLottery.setMoneyDom()
	  }//
	  pl3ConfirmObj.show('reload',function(){
		 pl3ConfirmObj.setData({
			'lotteryType': numberLottery.lotteryType,
			'lotteryCnName': numberLottery.lotteryCnName,
			'lotteryNo' : numberLottery.lotteryNo,
			'lotteryPlay': numberLottery.lotteryPlay
		 });
	  })
  }
  
   numberLottery.gotoD3Confirm = function(){
	  d3ConfirmObj.goBack = function(){
		  numberLottery.show();
		  numberLottery.clearBetLottery();  
		  numberLottery.setMoneyDom()
	  }
	  d3ConfirmObj.show('reload',function(){
		 d3ConfirmObj.setData({
			'lotteryType': numberLottery.lotteryType,
			'lotteryCnName': numberLottery.lotteryCnName,
			'lotteryNo' : numberLottery.lotteryNo,
			'lotteryPlay': numberLottery.lotteryPlay
		 });
	  })
  }
  numberLottery.gotoDltConfirm = function(){
    console.log(934)
	  dltConfirmObj.goBack = function(){
      console.log(934)
		  numberLottery.show();
		  numberLottery.clearBetLottery();  
		  numberLottery.setMoneyDom()
	  }
	  dltConfirmObj.show('reload',function(){
		 dltConfirmObj.setData({
			'lotteryType': numberLottery.lotteryType,
			'lotteryCnName': numberLottery.lotteryCnName,
			'lotteryNo' : numberLottery.lotteryNo,
			'lotteryPlay': numberLottery.lotteryPlay
		 })
	  });
  }
  
  numberLottery.goSsqConfirm = function(){
	  ssqConfirmObj.goBack = function(){
		  numberLottery.show();
		  numberLottery.clearBetLottery();  
		  numberLottery.setMoneyDom()
	  }
	  ssqConfirmObj.show('reload',function(){
		 ssqConfirmObj.setData({
			'lotteryType': numberLottery.lotteryType,
			'lotteryCnName': numberLottery.lotteryCnName,
			'lotteryNo' : numberLottery.lotteryNo,
			'lotteryPlay': numberLottery.lotteryPlay
		 })
	  });
  }
  
  numberLottery.createGetData = function(){
    //return '?lotteryType='+this.lotteryType+'&lotteryNo='+this.lotteryNo;
  }
  

  numberLottery.selectRandom = function(obj){
    var thisK = obj ? obj.attr("data-k") : "";
    if(thisK===""){
      var outKey = [];
      if(this.lotteryBallWei){
        for(var w=0,wlen=numberLottery.lotteryMinNum.length-this.lotteryBallWei;w<wlen;w++){
          var randomKey = Math.floor(Math.random()*numberLottery.lotteryMinNum.length);
          if(outKey.indexOf(randomKey)<0){
            outKey.push(randomKey);
          }else{
            w--;
          }
        }
      }
      for(var i=0,ilen=numberLottery.lotteryMinNum.length;i<ilen;i++){
        this.clearOneBetLottery(i);
      }
      for(var i=0,ilen=numberLottery.lotteryMinNum.length;i<ilen;i++){
        if(outKey.indexOf(i)>-1)continue;
        this.randomSelectNumber(i);
      }
    }else{
      this.clearOneBetLottery(Number(thisK));
      this.randomSelectNumber(Number(thisK));
    }
  }

  numberLottery.randomSelectNumber = function(k){
    var thisMinNum = this.lotteryRandomNum[k] ? this.lotteryRandomNum[k] : this.lotteryMinNum[k];
    var thisBallNum = this.lotteryBallNum[k];
    var thisBallObj = this.selectDivObj.eq(k).find('span');
    var temNum = [];
    for(var i=0,ilen=thisMinNum;i<ilen;i++){
      var randomNum = Math.floor(Math.random()*thisBallNum);
      if($.inArray(randomNum,temNum)>-1){
        i--;continue;
      }
      var thisSelectBall = thisBallObj.filter("[data-k='"+randomNum+"']");
      if(!thisSelectBall.length){
        i--;continue;
      }
      var checkPVal = false;
      if(this.checkP){
        var thisV = thisSelectBall.attr("data-v");
        for(var cn=0,cnlen=this.lotteryBetData.length;cn<cnlen;cn++){
          if(!this.lotteryBetData[cn])continue;
          if($.inArray(thisV,this.lotteryBetData[cn])>-1){
            checkPVal = true;
            i--;break;
          }
		  if(this.lotteryType == ConfigObj.fastK3Type && this.lotteryPlay == 'TXD2-TXS2'){  //二同号单选特殊处理 
			  for(var xx=0;xx<this.lotteryBetData[cn].length;xx++){
				if(!this.lotteryBetData[cn][xx]) continue;
				if(this.lotteryBetData[cn][xx].indexOf(thisV) != -1 || thisV.indexOf(this.lotteryBetData[cn][xx]) != -1){
					checkPVal = true;
            		i--;break;	
				}
			  }
		  }
        }
      }
      if(checkPVal)continue;
      this.selectNumber(thisSelectBall);
      temNum.push(randomNum);
    }
    delete temNum;
  }

  numberLottery.clearBetLottery = function(){
    for(var i=0,ilen=this.selectDivObj.length;i<ilen;i++){
      this.clearOneBetLottery(i);
    }
  }

  numberLottery.clearOneBetLottery = function(k){
    delete this.lotteryBetData[k];
    delete this.lotteryBetNum[k];
    delete this.lotteryBetDanNum[k];
    this.selectDivObj.eq(k).find('span').removeClass("selected");
   // if(this.checkDanPlay()){
      var spanObj = this.selectDivObj.eq(k).find('span');
      for(var i=0,ilen=spanObj.length;i<ilen;i++){
        if(spanObj.eq(i).hasClass('dan')){
          spanObj.eq(i).removeClass("dan");
          spanObj.eq(i).children('i').remove();
        }
      }
   // }
  }

  numberLottery.updatePlay = function(thisV,thisD,node){
    // console.log(thisV)
    if (thisV == 'P') {
      $('#updatelottery_P').css('color','#ff5024')
      $('#updatelottery_D').css('color','#333')
    }else if(thisV == 'D'){
      $('#updatelottery_P').css('color','#333')
      $('#updatelottery_D').css('color','#ff5024')
    }
   // var thisV = obj.attr("data-v");
    if(thisD){
		if(this.lotteryType == ConfigObj.fastLotType || this.name == 'fastK3'){  //高频11选5，快3
			this.isFastDan = 1;	   //高频胆拖玩法
		}
	}else{
      // console.log(1004)
		this.isFastDan = 0;	
	}
    this.updatePlayData(thisV);
    // console.log(this.updatePlayData(thisV))
    this.updataPlayObj.hide();
	this.updataPlayObj.find('p').removeClass('selected');
	if(node){
		node.addClass('selected');
	}
    this.playTitleObj.attr("data-s","0");
	if(this.betWrap){
		this.betWrap.find('.current').removeClass("currentFixed")
//		this.betWrap.addClass('centerWrap');
//		this.betWrap.find('.current').addClass('fixTopTit_4');
//	    this.betWrap.find('.history').addClass('mt78');
	}
	this.removeBgLayer();
	if(this.lotteryType == ConfigObj.fastLotType){
		$('#fastBet_showSYXWCharList').attr('data-s',0);
		this.chartListObj.hide();
	}
	if(this.lotteryType == ConfigObj.fastK3Type){
		$('#fastK3_showK3ChartList').attr('data-s',0);
		$('#fastK3_showK3ChartList').find('.arrow').addClass('trans');
		this.chartListObj.hide();
	}
  }

  numberLottery.updatePlayData = function(thisV){
    // console.log(thisV)
    if(this.lotteryPlayCnName[thisV]){
      this.playTitleObj.html(this.lotteryCnName+"-"+this.lotteryPlayCnName[thisV]  +'<em class="down"></em>');
      // console.log(1036)
    }else{
      // console.log(1038) UP3
      this.playTitleObj.html(this.lotteryCnName);
    }
    this.clearBetLottery();   
    this.lotteryPlay = thisV;
    this.lotteryRandomNum = new Array();
    this.createSelectTitleHtml();  
  }

  numberLottery.updateBet = function(){
	if(!this.isEdit) return false;
    var updateData = this.editData;
    var updateArr = updateData.split("|");
	var lotteryPlay = updateArr[updateArr.length-2];
    if(lotteryPlay.indexOf("R",lotteryPlay.length-1) == lotteryPlay.length-1){ //解决bug zhangw
      this.lotteryPlay = lotteryPlay.substr(0,lotteryPlay.length-1);  //解决bug zhangw
      this.isRandom = true;
    }else{
      this.lotteryPlay = lotteryPlay;
    }

	if(this.lotteryPlay == 'TXD' || this.lotteryPlay == 'TX'){
		this.lotteryPlay =  'TXD-TX';	
	}
	if(this.lotteryPlay == 'TXD2' || this.lotteryPlay == 'TXS2'){
		this.lotteryPlay = 'TXD2-TXS2';	
	}
	if(this.lotteryPlay == 'BT3' || this.lotteryPlay == 'LTX'){
		this.lotteryPlay = 'BT3-LTX';		
	}
    this.updatePlay(this.lotteryPlay,lotteryPlay.indexOf('_D') != -1 ? 1 : '');  //zhangw
    for(var i=0,ilen=this.lotteryBallNum.length;i<ilen;i++){
      if(updateArr[i]=="-")continue;
	  if($.inArray(updateArr[i],['TXD','TX','TXD2','TXS2','BT3','LTX']) != -1) continue;
	  var thisData = updateArr[i].split(",");
	  var x = i;
	  if($.inArray(lotteryPlay,['TX','LTX']) != -1){  //快3 sb需求导致的
		 x = 1;     //主要影响thisSpanObj
	  }else if(lotteryPlay == 'TXS2'){
		 x = 2;      //主要影响thisSpanObj  
	  }
	  var thisSpanObj = this.selectDivObj.eq(x).find('span');
      if(!this.lotteryBetData[x])this.lotteryBetData[x]=new Array();
      if(!this.lotteryBetNum[x])this.lotteryBetNum[x] = 0;
      if(this.checkDanPlay() && !this.lotteryBetDanNum[x])this.lotteryBetDanNum[x]=0;

      for(var k=0,klen=thisData.length;k<klen;k++){
        var thisV = thisData[k];
         if(!thisV)continue;

        if(thisV.indexOf("d-")>-1){
          var thisOldVal = thisV.replace("d-","");
          var thisSelectObj = thisSpanObj.filter("[data-v='"+thisOldVal+"']");

          thisSelectObj.addClass('dan');
          thisSelectObj.append('<i>胆</i>');

          this.lotteryBetDanNum[i]+=1;
        }else{
          var thisSelectObj = thisSpanObj.filter("[data-v='"+thisV+"']");
          thisSelectObj.addClass('selected');
        }

        var thisK = thisSelectObj.attr("data-k");

        this.lotteryBetData[x][thisK] = thisV;
        this.lotteryBetNum[x]+=1;
      }
    }
    
    this.setMoneyDom();
  }

  numberLottery.createSelectTitleHtml = function(){
	 if(!this.lotterySelectTips) return;
	 if((this.lotteryType == ConfigObj.fastLotType  || this.lotteryType == ConfigObj.fastK3Type) && this.isFastDan){ //高频
		var thisHtmlData = this.lotterySelectDanTips[this.lotteryPlay]; 
	 }else{
     	var thisHtmlData = this.lotterySelectTips[this.lotteryPlay];
	 }
     if(!thisHtmlData)return false;
     for(var i=0,ilen=this.selTitleObj.length;i<ilen;i++){
        $(this.selTitleObj[i]).html(thisHtmlData[i]).css({'border-right':'1px solid #f2f3f7'});
	   //强制重新渲染，否则某些手机上会出现重新html后不渲染导致的重影bug zhangw
     }
  }

  numberLottery.createEvent = function(){
    this.lotteryDomObj.unbind('tap').tap(function(e){
      numberLottery.lotteryEvent(e);
    });
    this.ddTipsObj.unbind('tap').tap(function(){
      $(this).hide();
    });
	window.addEventListener('devicemotion', function(e){
	  numberLottery.deviceMotionHandler(e);
    }, false);
	
	this.lotteryDomObj.dropload({  
			scrollArea : window,
			distance : 300,
			loadUpFn:function(me){
				 if(numberLottery.lotteryType != ConfigObj.fastLotType){
				 	numberLottery.getData();
				 }else{
					numberLottery.getLotteryData(); 
				 }
				 me.resetload();
			}
	 })   
  }
  
  numberLottery.closeJx = function(){
	  if(this.jxNumType == 'red'){
		 var obj = this.lotteryDomObj.find('span[data-t=redjx]');
		 this.showJx(obj,'red');  
	  }else if(this.jxNumType == 'blue'){
		 var obj = this.lotteryDomObj.find('span[data-t=bluejx]');
		 this.showJx(obj,'blue');  
	  }
  }
  
  //type: 'red'|'blue'
  numberLottery.showJx = function(obj,type){
    if(Number(obj.attr("data-s"))){
      this.jxObj.hide();
      obj.attr("data-s",0);
      console.log(10)
	  this.jxNumType = '';
      this.removeBgLayer();
      if(obj.attr("data-s",0)){
       $(obj).find('.arrow').removeClass('trans');  
      }
      if($(obj).find('.arrow').length > 0){
       $(obj).find('.arrow').removeClass('trans');  
      }
    }else{
      this.jxObj.show();
      if(type == 'red'){
		if(this.lotteryType == 'ssq'){
			this.createJxBtn(6,20,obj,'red');
		}else{
        	this.createJxBtn(this.lotteryMinNum[0],this.lotteryMaxNum[0],obj,'red');
		}
	    this.jxNumType = 'red';
      }else if(type == 'blue'){
        this.createJxBtn(this.lotteryMinNum[1],this.lotteryMaxNum[1],obj,'blue');
	    this.jxNumType = 'blue';
      }
      obj.attr("data-s",1);
      this.addBgLayer(this.jxObj,obj);
      if($(obj).find('.arrow').length > 0){
       $(obj).find('.arrow').addClass('trans');  
      }
      if(obj.attr("data-s",1)){
        console.log(2)
       $(obj).find('.arrow').removeClass('trans');  
      }
    }  
  }

   /*
  minNum 最少号码
  maxNum 最多号码
  obj 机选层触发按钮
  type 是红球机选层还是蓝球机选层  
  */
  //目前适用于大乐透和双色球
  numberLottery.createJxBtn = function(minNum,maxNum,obj,type){
   var html = '';
   for(var i=minNum;i<=maxNum;i++){
     var itm = i-minNum +1;
	 if(this.lotteryType == 'ssq'){
		  var splitNum = (type == 'red') ? 4 : 6;
	 }else{
		  var splitNum = (type == 'red') ? 5 : 6;
	 }
	
     if(itm % splitNum == 1 ){
       html += '<li>';
     }
     html += '<span  data-t="jxNumBtn" '+ (splitNum == 4 ? 'style="width:25%"' : '')   +'><em>' + i + '</em></span>';
     if(i == maxNum){
	   if(this.lotteryType == 'ssq'){
       	  html += '<span data-t="hideJxLayer" '+ ((splitNum == 6) ? 'style="width:33%"' : 'style="width:25%"') +' id="jxLayerClose"><em style="border-right:none">关闭</em></span>';  
	   }else{
       	  html += '<span data-t="hideJxLayer" id="jxLayerClose"><em style="border-right:none">关闭</em></span>';  		   
	   }
     }
     if(itm-1 == maxNum || itm % splitNum == 0){
       html += '</li>';  
     }
   }
   var ul = this.jxObj.find('ul');
   $(ul).html(html);
   this.jxObj.get(0).className = 'keyboard ' + ((type == 'red') ? 'key5': 'key6');
  }
  
  numberLottery.jxNumFun = function(btn){
	 var val = $(btn).text();
	 if(this.jxNumType == 'red'){
		 var obj = this.lotteryDomObj.find('span[data-t=redjx]');
	 }else if(this.jxNumType == 'blue'){
		 var obj = this.lotteryDomObj.find('span[data-t=bluejx]');
	 }
	 obj = $(obj);
     obj.attr('data-v',val);
     obj.find('.jsJxNum').text(val);
     var thisK = Number(obj.attr("data-k"));
     numberLottery.lotteryRandomNum[thisK] = val;
     numberLottery.showJx(obj,numberLottery.jxNumType);
     this.selectRandom(obj);
     this.setMoneyDom();
  }

  numberLottery.showUpdPlay = function(obj){
    console.log(obj)
    if(Number(obj.attr("data-s"))){
      this.updataPlayObj.hide();
      obj.attr("data-s",0);
	  this.removeBgLayer();
    if(obj.attr("data-s",0)){
        console.log(1275)
         // $('.i-null').removeClass('trans')
       // $(obj).find('.arrow').removeClass('trans');  
      }
	  // this.betWrap.find('.current').removeClass("currentFixed")
//	  this.betWrap.addClass('centerWrap');
//	  this.betWrap.find('.current').addClass('fixTopTit_4');
//	  this.betWrap.find('.history').addClass('mt78');
    }else{
      this.updataPlayObj.show();
      obj.attr("data-s",1);
	  this.addBgLayer(this.updataPlayObj,obj);
    if(obj.attr("data-s",1)){
        console.log(1287)
         // $('.i-null').addClass('trans')
       // $(obj).find('.arrow').removeClass('trans');  
      }
	  // this.betWrap.find('.current').addClass("currentFixed");
//	  this.betWrap.removeClass('centerWrap');
	  if(this.lotteryType != 'pl5' && this.lotteryType != 'qxc'){
//	  	this.betWrap.find('.current').removeClass('fixTopTit_4');
//	  	this.betWrap.find('.history').removeClass('mt78');
				
	  }
	  if(this.topMenuObj.css('display') != 'none'){
		  var btn = this.lotteryDomObj.find('[data-t="showTopMenu"]');
		  this.showTopMenu(btn);
	  }
    }  
	
	if(this.jxObj){
		this.jxObj.hide();	
	}
  }
// showUpdPlay showTopMenu
  numberLottery.showTopMenu = function(obj){  //方法==0
    console.log(obj)
     if(Number(obj.attr("data-s"))){
      this.topMenuObj.hide();
      if(obj.attr("data-s",0)){
         $('.i-null').removeClass('trans')
      }
    }else{
    if(!this.hasChartData){
      this.getChartData(); 
    }
      this.topMenuObj.show();
      obj.attr("data-s",1);
      if(obj.attr("data-s",1)){
         $('.i-null').addClass('trans')
      }
    }  
    /*if(Number(obj.attr("data-s"))){
      this.topMenuObj.hide();
      console.log(1312)
      obj.attr("data-s",0);
	  this.removeBgLayer();
    }else{
      this.topMenuObj.show();
      console.log(1317)  //showTopMenu
      obj.attr("data-s",1);
	  this.addBgLayer(this.topMenuObj,obj);
	  if(this.playTitleObj && this.updataPlayObj.css('display')!= 'none' && this.lotteryType != 'pl5'){
		  this.showUpdPlay(this.playTitleObj);
	  }
    }  */
  }

  numberLottery.removeBgLayer = function(){
    if($('#bgLayer').length){
      $('#bgLayer').remove(); 
    }
  }

  numberLottery.addBgLayer = function(layer,btn){
  	var self = this;
    var bg = '<div style="width:100%;height:100%;background:transparent;position:absolute;left:0;top:0;z-index:90" id="bgLayer"></div>';
    if($('#bgLayer').length == 0){
      $(this.lotteryDomObj).append(bg);
      $('#bgLayer').css({'height':document.documentElement.scrollHeight || document.body.scrollHeight})
      $('#bgLayer').unbind('tap').tap(function(){
      	//将期号那一栏归位
      	// self.betWrap.find('.current').removeClass("currentFixed")
        layer.hide();
        $('#bgLayer').remove();
		if(btn){
			btn.attr('data-s',0)
			if($(btn).find('.arrow').length > 0){ 
			   $(btn).find('.arrow').removeClass('trans');  
			}
      /*if(obj.attr("data-s",0)){
         // $('.i-null').removeClass('trans')
      }*/
		}
		if(numberLottery.betWrap){
//		  numberLottery.betWrap.addClass('centerWrap');
	    }
      })
    }
  }

  numberLottery.setMoneyDom = function(){
     var zs = numberLottery.getZhushu();
     // console.log(zs)
    this.zhushuObj.html(zs);
    this.moneyObj.html(numberLottery.getMoney(zs));
  }
  
  numberLottery.showK3ChartList = function(obj){
  	//console.log(obj);
	 if(Number(obj.attr("data-s"))){
      this.chartListObj.hide();
      obj.attr("data-s",0);
      /*if($(obj).find('.arrow').length > 0){
       $(obj).find('.arrow').addClass('trans');  
      }*/
      if(obj.attr("data-s",0)){
        console.log(1388)
         $('.i-null').removeClass('trans')
       // $(obj).find('.arrow').removeClass('trans');  
      }
    }else{
      if(!this.hasChartData){ 
       this.getK3ChartData(); 
      }
      this.chartListObj.show();
      obj.attr("data-s",1);
      /*if($(obj).find('.arrow').length > 0){
        $(obj).find('.arrow').removeClass('trans');  
      }*/
      if(obj.attr("data-s",1)){
        console.log(1402)
         $('.i-null').addClass('trans')
       // $(obj).find('.arrow').removeClass('trans');  
      }
    }   
  }

    numberLottery.getK3ChartData = function () {
        var dataObj = {
            lottery_type: numberLottery.lotteryType.toUpperCase(),
            // trendType: numberLottery.lotteryPlay == 'SUM' ? 'hz' : 'r'
            trendType: 'simple'
        };
        
        var secretData = {
        	'para': Global.encrypt(dataObj)
        }
        
        $.ajax({
            url: ConfigObj.localSite + ConfigObj.fastK3Api[ConfigObj.fastK3Type].chart,
            type: 'POST',
            data: secretData,
            dataType: 'json',
            success: function (msg) {
            		
                if (msg.code !== '0000') {
                    $.alertMsg(msg.code_str);
                    return false;
                }
								msg.info = $.parseJSON(Global.crypt(msg.info));
                switch (numberLottery.lotteryType) {
                    case ConfigObj.fastK3Type :
                        numberLottery.formatK3List(msg.info.list);
                        break;
                }
            }
        });
    };
  
  numberLottery.showSYXWChartList = function(obj){
    if(Number(obj.attr("data-s"))){
      this.chartListObj.hide();
      obj.attr("data-s",0);
      /*if($(obj).find('.arrow').length > 0){
       $(obj).find('.arrow').addClass('trans');  
      }*/
      if(obj.attr("data-s",0)){
        // console.log(2)
         $('.i-null').removeClass('trans')
       // $(obj).find('.arrow').removeClass('trans');  
      }
    }else{
      if(!this.hasChartData){
       this.getSYXWChartData(); 
      }
      this.chartListObj.show();
      obj.attr("data-s",1);
      /*if($(obj).find('.arrow').length > 0){
        $(obj).find('.arrow').removeClass('trans');  
      }*/
      if(obj.attr("data-s",1)){
        console.log(2)
         $('.i-null').addClass('trans')
       // $(obj).find('.arrow').removeClass('trans');  
      }
    }  
  }

  numberLottery.showChartList = function(obj){
    console.log(obj)
    if(Number(obj.attr("data-s"))){
      this.chartListObj.hide();
      // obj.attr("data-s",0);
         // $('.i-null').addClass('trans')
         // console.log(1465)
      /*if($(obj).find('.i-null').length > 0){
        $(obj).find('.i-null').addClass('trans');  
        console.log(2)
      }*/
      if(obj.attr("data-s",0)){
         $('.i-null').removeClass('trans')
        // $(obj).find('.i-null').addClass('trans');  
        console.log(1473)
      }
    }else{
	  if(!this.hasChartData){
		  this.getChartData(); 
	  }
      this.chartListObj.show();
      obj.attr("data-s",1);
      /*if($(obj).find('.arrow').length > 0){
       $(obj).find('.arrow').removeClass('trans');  
      }*/
      if(obj.attr("data-s",1)){
        console.log(2)
         $('.i-null').addClass('trans')
       // $(obj).find('.arrow').removeClass('trans');  
      }
    }  
  }
  
  numberLottery.getSYXWChartData = function(){
    var dataObj = {
	   lottery_type:numberLottery.lotteryType.toUpperCase(),
	   trendType:numberLottery.lotteryPlay, 
	}
    var serectData = {
    	'para': Global.encrypt(dataObj)
    }
	  $.ajax({
		  url : ConfigObj.localSite + ConfigObj.fastLotApi[ConfigObj.fastLotType].chart,
		  type:'POST',
		  data:serectData,
		  dataType:'json',
		  success : function(msg){
//			console.log('11选5图表',msg);
			if(msg.code !== "0000"){
			  $.alertMsg(msg.code_str);
			  return false;
			}
			msg.info = $.parseJSON(Global.crypt(msg.info));
			numberLottery.fastFormatList(msg.info.list);
		  }
	  });
  }
  
  numberLottery.fastFormatList = function(data,type){
		if(data){
			data.reverse();	
		}
//		console.log(data)
    var html = [];
    var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
    var width = (data[0]['num_miss'].length-1)*221+80+9+221;
    width = width <clientWidth ? clientWidth :width;
    if(this.chartListTitle[this.lotteryType] && this.chartListTitle[this.lotteryType][this.lotteryPlay]){
      var titleData = this.chartListTitle[this.lotteryType][this.lotteryPlay];
      html.push('<div class="clearfix"><p class="w_qh">期号</p>');
      for(var i=0,ilen=titleData.length;i<ilen;i++){
        html.push('<p class="w_dw">'+titleData[i]+'</p>');
      }
      html.push('</div>');
    }
    for(var i=0,ilen=data.length;i<ilen;i++){
//  	console.log(data[i]['lottery_no'].length)
    	if(data[i]['lottery_no'].length){
    		
    	}
      html.push('<div class="listnum clearfix listObj"><span class="qishu fl">'+data[i]['lottery_no']+'</span><span class="line fl"><em class="dot"></em></span><p class="result fl">');
      for(var k=0,klen=data[i]['num_miss'].length;k<klen;k++){
        var thisData = data[i]['num_miss'][k];
         html.push("<span>");
        for(var m=0,mlen=thisData.length;m<mlen;m++){
          if(Number(thisData[m]['miss'])===0){
            html.push('<i class="fontred">'+thisData[m]['hao']+'</i>');
          }else{
            html.push('<i>'+thisData[m]['miss']+'</i>');
          }
        }
        html.push("</span>");
      }
      html.push('</p></div>');
    }
    if(type && type=="append"){
      numberLottery.chartListObj.children('div.listObj').eq(0).before(html.join(""));
    }else{
      numberLottery.chartListObj.html(html.join(""));
    }
    $("#fastBet_chartList").css("width",width+"px"); 
    if(fastBetObj.updateLotteryMyScroll)fastBetObj.updateLotteryMyScroll.refresh();
  }
  
  numberLottery.getChartData = function(){
	  var dataObj = {
		lottery_type:numberLottery.lotteryType.toUpperCase(),
		size:10,
	  }
	  var secretData = {
			'para' : Global.encrypt(dataObj)
		};
	  $.ajax({
			url : ConfigObj.localSite +  '?version=1&m=Lottery.Charts.trend',
			type:'post',
			data:secretData,
			dataType:'json',
			success:function(obj){
				// console.log('数字彩图表数据',obj);
				
				if(obj.code == '0000'){
					obj.info = $.parseJSON(Global.crypt(obj.info));
					if(obj.info.list && obj.info.list.length){
						switch(numberLottery.lotteryType){
						  case "dlt" : numberLottery.formatList(obj.info.list);break;
						  case "ssq" : numberLottery.formatList(obj.info.list);break;
						  case "pl5" : numberLottery.plformatList(obj.info.list);break;
						  case "qxc" : numberLottery.plformatList(obj.info.list);break;
						  case "pl3" : numberLottery.pl3formatList(obj.info.list);break;
						  case "d3" : numberLottery.pl3formatList(obj.info.list);break;
              case "hn4j1" : numberLottery.hn4j1formatList(obj.info.list);break;
						}
						numberLottery.hasChartData = 1;   
					}
				}
			}
	   })  
  }
  
  numberLottery.hn4j1formatList = function(data){
    if(!data) return;
    var html = [];
    for(var i=0,ilen=data.length;i<ilen;i++){
      html.push('<div class="listnum clearfix"><span class="qishu fl">'+data[i]['lotteryNum']+'期</span><span class="line fl"><em class="dot"></em></span><p class="result fl">');
      var resultHtml = ['<span class="fontred">'];
      var tempArr = data[i]['lotteryResult'].split(',');
      for(var k=0,klen=tempArr.length;k<klen;k++){
        if(k == 4){
          resultHtml.push('</span><span class="fontblue">');
        }
        resultHtml.push('<i>'+tempArr[k]+'</i>');
      }
      resultHtml.push('</span>');
      html.push(resultHtml.join(""));
      html.push('</span></p></div>');
    }

    this.chartListObj.html(html.join(""));
  }
  
  numberLottery.plformatList = function(data){
	if(!data) return;
    var html = [];
    for(var i=0,ilen=data.length;i<ilen;i++){
      html.push('<div class="listnum clearfix"><span class="qishu fl">'+data[i]['lotteryNum']+'期</span><span class="line fl"><em class="dot"></em></span><p class="result fl"><span class="fontred">');

      var resultHtml = [];
       switch(this.lotteryType){
		case 'pl5':
			var tempArr = data[i]['lotteryResult'].split('|');
			break;
		case 'qxc':
			var tempArr = data[i]['lotteryResult'].split(','); 
			break;
		default:
			var tempArr = data[i]['lotteryResult'].split(';'); 
			break;
	  }
	  if(tempArr.length > 0){
		  for(var k=0,klen=tempArr.length;k<klen;k++){
			resultHtml.push('<i>'+tempArr[k]+'</i>');
		  }
	  }
      html.push(resultHtml.join(""));
      html.push('</span></p></div>');
    }
    this.chartListObj.html(html.join(""));
  }

  numberLottery.pl3formatList = function(data){
    var html = [];
    if(!data)return false;
    for(var i=0,ilen=data.length;i<ilen;i++){
      html.push('<div class="listnum clearfix"><span class="qishu fl">'+data[i]['lotteryNum']+'期</span><span class="line fl"><em class="dot"></em></span><p class="result fl"><span class="fontred">');

      var resultHtml = [];
	  if(this.lotteryType == 'd3'){
		  var tempArr = data[i]['lotteryResult'].split(','); 
	  }else{
	  	 var tempArr = data[i]['lotteryResult'].split('|');
	  }
	  if(tempArr.length > 0){
		  for(var k=0,klen=tempArr.length;k<klen;k++){
			resultHtml.push('<i>'+tempArr[k]+'</i>');
		  }
	  }
      html.push(resultHtml.join(""));
      html.push('</span><span class="fontblack" style="display:inline-block;width:45px">和值'+(data[i]['sum']>=0 ? data[i]['sum'] : '')+'</span><span class="fontred">'+(data[i]['type'] ? data[i]['type'] : '') +'</span></p></div>');
    }
    this.chartListObj.html(html.join(""));
  }
  
   numberLottery.formatList = function(data){
	    if(!data) return;
		var html = ''
		for(var i=0;i<data.length;i++){
		  var itm = data[i];
		  html += '<div class="listnum clearfix">'+
			  '<span class="qishu fl">'+ itm.lotteryNum +'期</span>'+
			  '<span class="line fl"><em class="dot"></em></span>'+
			  '<p class="result fl"><span class="fontred">';
		  if(itm.lotteryResult){
			  var tempArr = itm.lotteryResult.split('|');
			  if(tempArr.length > 0){
				  var redArr = tempArr[0].split(',');
				  var blueArr = tempArr[1].split(',');
				  for(var j=0;j<redArr.length;j++){
					html += '<i>' + redArr[j] + '</i>';  
				  }
				  html += '</span>'+
					      '<span class="fontblue">';
				  for(var k=0;k<blueArr.length;k++){
					html += '<i>' + blueArr[k] + '</i>'; 
				  }
				  html += '</span>';
			  }
		  }
		  html += '</p></div>';
		}
		this.chartListObj.html(html);
  }

    numberLottery.formatK3List = function (data) {
        if (!data) return;
        var html = '';
        var cssObj = {
            '三不同': 'fontblue',
            '三同号': 'fontred',
            '二不同': 'fontaqua',
            '二同号': 'fontorange',
            '三连号': 'fontgold'
        };

        data.forEach(function (v) {
              var str = v.lottery_no;
              if(v.lottery_no.length == 11){
              	v.lottery_no = str.slice(2);
              }
            html += '<div class="listnum clearfix k3chart">' +
                '<span class="qishu fl" style="width:25%;">' + v.lottery_no + '期</span>' +
                '<span class="line fl"><em class="dot"></em></span>';

            if (v.lottery_result) {
                html += '<p class="result fl" style="width:72%;">';
                html += '<span class="fontred" style="width:30%;text-align:center;">';

                var r = v.lottery_result;

                r.forEach(function (vv) {
                    html += '<i>' + vv + '</i>';
                });

                html += '</span>';

                var typeCls = 'block-2th', type = '二同号';
                if (r[0] == r[1] && r[1] == r[2]) {typeCls = 'block-3th'; type = '三同号';}
                else if (r[0] != r[1] && r[1] != r[2]) {typeCls = 'block-3bt'; type = '三不同';}

                html += '<span class="fontblue" style="width:15%;text-align:center;">' + v.sum + '</span>';

                if (v.ji == 0) html += '<span style="width:15%;text-align: center;"><span style="text-align: center; width:18px; background: #f7ac5b; color: #fff">单</span></span>';
                else html += '<span class="gray" style="width:15%;text-align: center;">' + v.ji + '</span>';

                if (v.ou == 0) html += '<span style="width:15%;text-align: center;"><span style="text-align: center; width: 18px; background: #f7ac5b; color: #fff">双</span></span>';
                else html += '<span class="gray" style="width:15%;text-align: center;">' + v.ou + '</span>';

                html += '<span class=' + typeCls + ' style="width:25%;text-align: center;">' + type + '</span>';
                html += '</p></div>';
            }
        });

        this.chartListObj.html(html);
    }

  numberLottery.showPlayTips = function(){
    this.ddTipsObj.show();
  }

  numberLottery.getMoney = function(zs){
    return this.lotteryOneMoney * zs;
  }

  numberLottery.getZhushu = function(type){
	 type = type  || numberLottery.lotteryPlay;
    return this[type+"Bonus"]();
  }

  numberLottery.PBonus = function(){
      for(var i=0,arg,ilen=numberLottery.lotteryMinNum.length;i<ilen;i++){
        if(!numberLottery.lotteryBetNum[i])return 0;
        if(numberLottery.lotteryBetNum[i] < numberLottery.lotteryMinNum[i])return 0;
        var x = 1,y=1;
        for(var k=0,klen=numberLottery.lotteryMinNum[i];k<klen;k++){
          x*=numberLottery.lotteryBetNum[i]-k;
          y*=numberLottery.lotteryMinNum[i]-k;
        }
        arg = arg ? arg*x/y : 1*x/y;
      }
      return arg;
  }

  numberLottery.IPBonus = numberLottery.PBonus;
  numberLottery.UP3Bonus = function(){
    return 2*this.PBonus();
  }
  
  numberLottery.UP6Bonus = numberLottery.PBonus;
  
  
  numberLottery.IHBonus = function(){
    var betTep = {0:1,1:3,2:6,3:10,4:15,5:21,6:28,7:36,8:45,9:55,10:63,11:69,12:73,13:75,14:75,15:73,16:69,17:63,18:55,19:45,20:36,21:28,22:21,23:15,24:10,25:6,26:3,27:1};

    var arg = 0;
    if(!numberLottery.lotteryBetData[0])return arg;
    for(var i=0,ilen=numberLottery.lotteryBetData[0].length;i<ilen;i++){
      if(!numberLottery.lotteryBetData[0][i])continue;
      arg+=betTep[numberLottery.lotteryBetData[0][i]];
    }
    return arg;
  };
  numberLottery.UH3Bonus = function(){
    var betTep = {0:0,1:1,2:2,3:1,4:3,5:3,6:3,7:4,8:5,9:4,10:5,11:5,12:4,13:5,14:5,15:4,16:5,17:5,18:4,19:5,20:4,21:3,22:3,23:3,24:1,25:2,26:1,27:0};
    
    var arg = 0;
    if(!numberLottery.lotteryBetData[0])return arg;
    for(var i=0,ilen=numberLottery.lotteryBetData[0].length;i<ilen;i++){
      if(!numberLottery.lotteryBetData[0][i])continue;
      arg+=betTep[numberLottery.lotteryBetData[0][i]];
    }
    return arg;
  };
  
  numberLottery.UH6Bonus = function(){
    var betTep = {0:0,1:0,2:0,3:1,4:1,5:2,6:3,7:4,8:5,9:7,10:8,11:9,12:10,13:10,14:10,15:10,16:9,17:8,18:7,19:5,20:4,21:3,22:2,23:1,24:1,25:0,26:0,27:0};
    
    var arg = 0;
    if(!numberLottery.lotteryBetData[0])return arg;
    for(var i=0,ilen=numberLottery.lotteryBetData[0].length;i<ilen;i++){
      if(!numberLottery.lotteryBetData[0][i])continue;
      arg+=betTep[numberLottery.lotteryBetData[0][i]];
    }
    return arg;
  };
  numberLottery.DBonus = function(){
    var checkDan = false;
    for(var i=0,arg,ilen=numberLottery.lotteryMinNum.length;i<ilen;i++){
      if(!numberLottery.lotteryBetNum[i])return 0;
      if(numberLottery.lotteryBetNum[i] < numberLottery.lotteryMinNum[i])return 0;
      if(numberLottery.lotteryBetDanNum[i] && numberLottery.lotteryBetNum[i] <= numberLottery.lotteryMinNum[i])return 0;
      var x = 1,y=1;
      if(numberLottery.lotteryBetDanNum[i])checkDan = true;
      for(var k=0,klen=numberLottery.lotteryMinNum[i]-numberLottery.lotteryBetDanNum[i];k<klen;k++){
        x*=numberLottery.lotteryBetNum[i]-numberLottery.lotteryBetDanNum[i]-k;
        y*=numberLottery.lotteryMinNum[i]-numberLottery.lotteryBetDanNum[i]-k;
      }
      arg = arg ? arg*x/y : 1*x/y;
    }
     //if(!checkDan)return 0;
    return arg;
  }
  numberLottery.R2Bonus = numberLottery.PBonus;


  numberLottery.R3Bonus = numberLottery.R2Bonus;

  numberLottery.R4Bonus = numberLottery.R2Bonus;

  numberLottery.R5Bonus = numberLottery.R2Bonus;

  numberLottery.R6Bonus = numberLottery.R2Bonus;

  numberLottery.R7Bonus = numberLottery.R2Bonus;

  numberLottery.R8Bonus = numberLottery.R2Bonus;

  numberLottery.FP1Bonus = numberLottery.R2Bonus;

  numberLottery.FP2Bonus = function(){
    var temBetData = new Array();
    var getP = function(arr){
      if(!arr || !arr.length)return true;
      if(!temBetData.length){
        temBetData = arr;
        return true;
      }
      var thisTemData = new Array();
      for(var i=0,ilen=temBetData.length;i<ilen;i++){
        if(!temBetData[i])continue;
        for(var k=0,klen=arr.length;k<klen;k++){
          if(!arr[k])continue;
          var betArr = temBetData[i].split(",");
          if($.inArray(arr[k],betArr)>-1)continue;
          thisTemData.push(temBetData[i]+","+arr[k]);
        }
      }
      if(!thisTemData.length)return false;
      temBetData = thisTemData.concat([]);
      return true;
    }
    for(var i=0,ilen=numberLottery.lotteryBetData.length;i<ilen;i++){
      getP(numberLottery.lotteryBetData[i]);
    }
    var arg = 0;
    for(var i in temBetData){
      if(!temBetData[i])continue;
      if(temBetData[i].split(",").length!=numberLottery.lotteryMinNum.length)continue;
      arg++;
    }
    return arg;
  }

  numberLottery.FC2Bonus = numberLottery.R2Bonus;

  numberLottery.FP3Bonus = numberLottery.FP2Bonus;

  numberLottery.FC3Bonus = numberLottery.R2Bonus;
 
  numberLottery.D5Bonus = numberLottery.PBonus;
  numberLottery.D4Bonus = numberLottery.PBonus;
  numberLottery.D3Bonus = function(){
    for(var i=0,k=0,ilen=numberLottery.lotteryBetNum.length;i<ilen;i++){
      if(numberLottery.lotteryBetNum[i]>0)k++;
    }
    if(k<numberLottery.lotteryBallWei){
      return 0;
    }
    for(var i=0,arg,ilen=numberLottery.lotteryMinNum.length;i<ilen;i++){
        if(!numberLottery.lotteryBetNum[i])continue;
        var x = 1,y=1;
        for(var k=0,klen=numberLottery.lotteryMinNum[i];k<klen;k++){
          x*=numberLottery.lotteryBetNum[i]-k;
          y*=numberLottery.lotteryMinNum[i]-k;
        }
        arg = arg ? arg*x/y : 1*x/y;
      }
      return arg;
  };
  numberLottery.D2Bonus = numberLottery.D3Bonus;
  numberLottery.D1Bonus = numberLottery.D3Bonus;
  numberLottery.R4C2Bonus = numberLottery.PBonus;
  numberLottery.R3C3Bonus = numberLottery.PBonus;
  numberLottery.R2C2Bonus = numberLottery.PBonus;
  numberLottery.R4C3Bonus = numberLottery.FP2Bonus;
  numberLottery.R4C1Bonus = function(){
	 var temBetData = new Array();
    var getC = function(arr, n, z){
      var r = [];
      fn([], arr, n);
      return r;
      function fn(t, a, n) {
          if (n === 0 || z && r.length == z) {
              return r[r.length] = t;
          }
          for (var i = 0, l = a.length - n; i <= l; i++) {
              if (!z || r.length < z) {
                  var b = t.slice();
                  b.push(a[i]);
                  fn(b, a.slice(i + 1), n - 1);
              }
          }
      }
    }
    var getP = function(arr){
      if(!arr || !arr.length)return true;
      if(!temBetData.length){
        temBetData = arr;
        return true;
      }
      var thisTemData = new Array();
      for(var i=0,ilen=temBetData.length;i<ilen;i++){
        if(!temBetData[i])continue;
        var arrC = getC(arr,2);
        for(var k=0,klen=arrC.length;k<klen;k++){
          if($.inArray(temBetData[i],arrC[k])>-1)continue;
          thisTemData.push(temBetData[i]+"|"+arrC[k].join(","));
        }
      }
      if(!thisTemData.length)return false;
      temBetData = thisTemData.concat([]);
      return true;
    }
    for(var i=0,ilen=numberLottery.lotteryBetData.length;i<ilen;i++){
      ////console.log(numberLottery.lotteryBetData[i]);
      var arr = [];
      for(var k=0,klen=numberLottery.lotteryBetData[i].length;k<klen;k++){
        if(numberLottery.lotteryBetData[i][k])arr.push(numberLottery.lotteryBetData[i][k])
      }
      getP(arr);
    }
    var arg = 0;
    ////console.log(temBetData);
    for(var i in temBetData){
      if(!temBetData[i])continue;
      if(temBetData[i].split(",").length!=numberLottery.lotteryMinNum.length)continue;
      arg++;
    }
    return arg;
  };
  numberLottery.R3C2Bonus = numberLottery.FP2Bonus;
  
  numberLottery['TXD2Bonus'] = function(){
    return numberLottery.GetPBonus([numberLottery.lotteryMinNum[0],numberLottery.lotteryMinNum[1]],[numberLottery.lotteryBetNum[0],numberLottery.lotteryBetNum[1]]);
  }

  numberLottery['TXS2Bonus'] = function(){
    return numberLottery.GetPBonus([numberLottery.lotteryMinNum[2]],[numberLottery.lotteryBetNum[2]]);
  }

  numberLottery['TXD2-TXS2Bonus'] = function(){
    return numberLottery['TXD2Bonus']() + numberLottery['TXS2Bonus']() ;
  
  }
  numberLottery['BT3Bonus'] = function(){
    return numberLottery.GetPBonus([numberLottery.lotteryMinNum[0]],[numberLottery.lotteryBetNum[0]])
  }
  numberLottery['LTXBonus'] = function(){
    return numberLottery.GetPBonus([numberLottery.lotteryMinNum[1]],[numberLottery.lotteryBetNum[1]])
  }
  
  numberLottery['BT3-LTXBonus'] = function(){
    return this['BT3Bonus']()+this['LTXBonus']();
  }
  
  numberLottery['TXDBonus'] = function(){
	  var num = 1 *  this.lotteryBetNum[0] ? this.lotteryBetNum[0] : 0;
	  return num;  
  }

  numberLottery['TXBonus'] = numberLottery['LTXBonus'];

  numberLottery['TXD-TXBonus'] = function(){
	  return this['TXDBonus']()+this['TXBonus'](); 
  }

  numberLottery.GetPBonus = function(lotteryMinNum,lotteryBetNum){
    lotteryMinNum = lotteryMinNum || numberLottery.lotteryMinNum;
    lotteryBetNum = lotteryBetNum || numberLottery.lotteryBetNum;
    for(var i=0,arg,ilen=lotteryMinNum.length;i<ilen;i++){
      if(!lotteryBetNum[i])return 0;
      if(lotteryBetNum[i] < lotteryMinNum[i])return 0;
      var x = 1,y=1;
      for(var k=0,klen=lotteryMinNum[i];k<klen;k++){
        x*=lotteryBetNum[i]-k;
        y*=lotteryMinNum[i]-k;
      }
      arg = arg ? arg*x/y : 1*x/y;
    }
    return arg;
  }

  
  numberLottery.deviceMotionHandler = function(e){
    var acceleration = e.accelerationIncludingGravity;
    var curTime = new Date().getTime();
    if ((curTime - this.last_update) > 150) {
      var diffTime = curTime - this.last_update;
      this.last_update = curTime;
      this.x = acceleration.x;
      this.y = acceleration.y;
      this.z = acceleration.z;

      var speed = Math.abs(this.x + this.y + this.z - this.last_x - this.last_y - this.last_z) / diffTime * 10000;
      if (speed > 1500) {
		numberLottery.shake_timer = numberLottery.shake_timer ? clearTimeout(numberLottery.shake_timer) : setTimeout(function(){
				if(numberLottery.checkDanPlay())return false;
				numberLottery.selectRandom();
                numberLottery.setMoneyDom();
                numberLottery.isRandom=true;
				if(navigator.notification && navigator.notification.vibrate){
				  var pages  = Global.getActivePage();
				  if(pages.length > 0){
					var defArr = ['dlt','ssq','fastBet','hn4j1','pl3','pl5','qxc'];
					var isNeed = false;
					for(var i=0;i<pages.length;i++){
						var pageId = $(pages[i]).attr('id');
						if($.inArray(pageId,defArr)!= -1 && $(pages[i]).get(0) && $(pages[i]).get(0).style.display != 'none'){
							isNeed = true;	
						}
					}
					if(isNeed){
						navigator.notification.vibrate(300);
					}
				  }
				 // navigator.notification.vibrate(300);	
				}
		},90)
      }
      this.last_x = this.x;
      this.last_y = this.y;
      this.last_z = this.z;
    }
  }
  
  //检查是否是胆拖玩法
  numberLottery.checkDanPlay = function(){
	 var isDanPlay = false
	 if(this.lotteryPlay == 'D'){ //大乐透
		isDanPlay = true;
	 }else if(this.isFastDan == 1){  //高频
		isDanPlay = true;
	 }
	 return isDanPlay;
  }


  numberLottery.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
	this.getData();   //请求赛程数据
    this.updateBet();
  }

  numberLottery.init = function(){
    this.setDefConfig();
    this.onloadExecution();
    var that  = this;
  }
  
   return numberLottery; 
}
