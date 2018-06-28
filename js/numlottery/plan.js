function BetPlan(obj){
   var  planObj = new PageController({
	   'name': obj ? obj.name : '',
	   'tpl' : obj ? obj.tpl : ''
  });

  planObj.setDefConfig = function(){
	 planObj.betData = new Array();
	  planObj.money = 0;
	  planObj.bouns = 0;
	  planObj.planMoney = new Array();
	  planObj.planMul = new Array();
	  planObj.winStop = true;
	  planObj.planLotteryDate = new Array();
	
	  planObj.lotteryDate = "";
	  planObj.lotteryNoNum = "";
  
    this.lotteryType = "";
    this.playType = "";
    this.betOneMoney = 2;
    this.betBallNum = {};
    this.lotteryNoAllNum = 84;
    this.planNum = 10;
    this.startMul = 1;
    this.planType = "money"; //percent
    this.profitMoney = 30;
    this.profitPercent = 0.3;
    this.cgNumVal = 5;
    this.maxMul = 10000;
    this.maxBetMoney = 500000;
    this.maxZSVal = 50000;
    this.maxPlanNum = 270;
  }

  planObj.createDom = function(){
    this.wrapperObj = $("#plan_wrapperObj");
    this.planDomObj = $("#plan_planDomObj");
    this.planNumObj = $("#plan_planNumObj");
    this.planTypeObj = $("#plan_planTypeObj");
    this.lotteryNumObj = $("#plan_lotteryNumObj");
    this.moneyObj = $("#plan_moneyObj");
    this.setObj = $("#plan_setObj");
    this.setNumObj = $("#plan_setNumObj");
    this.setMulObj = $("#plan_setMulObj");
    this.setPercentObj = $("#plan_setPercentObj");
    this.setMoneyObj = $("#plan_setMoneyObj");
    this.keyObj = $("#plan_keyObj");
    this.updBetTipsObj = $("#plan_updBetTipsObj");
  }

  planObj.createEvent = function(){
    this.wrapperObj.unbind('tap').tap(function(e){
      planObj.wrapperEvent(e);
    });
  }

  planObj.getBetData = function(){
    if(window.localStorage.getItem(this.lotteryType+"lotteryAllBetData")){
      var data = window.localStorage.getItem(this.lotteryType+"lotteryAllBetData");
      this.betData = data.split(";");
    }else{
      var data = "";
      this.betData = new Array();
    }
  }

  planObj.getMoneyBouns = function(){
     //console.log(this.playType);
    switch(this.playType){
      case "R2" : this.getRMoneyBouns();break;
      case "R3" : this.getRMoneyBouns();break;
      case "R4" : this.getRMoneyBouns();break;
      case "R5" : this.getRMoneyBouns();break;
      case "R6" : this.getRMoneyBouns();break;
      case "R7" : this.getRMoneyBouns();break;
      case "R8" : this.getRMoneyBouns();break;
      case "FP1" : this.getQMoneyBouns();break;
      case "FP2" : this.getQMoneyBouns();break;
      case "FC2" : this.getQZMoneyBouns();break;
      case "FP3": this.getQMoneyBouns();break;
      case "FC3": this.getQZMoneyBouns();break;
	  
	  case "R2_D" : this.getRMoneyBouns();break;
      case "R3_D" : this.getRMoneyBouns();break;
      case "R4_D" : this.getRMoneyBouns();break;
      case "R5_D" : this.getRMoneyBouns();break;
      case "R6_D" : this.getRMoneyBouns();break;
      case "R7_D" : this.getRMoneyBouns();break;
      case "R8_D" : this.getRMoneyBouns();break;
      case "FC2_D" : this.getQZMoneyBouns();break;
      case "FC3_D": this.getQZMoneyBouns();break;
    }
  }

  planObj.getRMoneyBouns = function(){
    var allMoney = 0;
    var allBouns = new Array();
    var allBetBall = new Array();
    if(!this.betData.length)return false;
    for(var i=0,ilen=this.betData.length;i<ilen;i++){
      if(!this.betData[i])continue;
      var thisData = this.betData[i].split("|");
      var betBall = thisData[0].split(",");
      var zhushu = Number(thisData[thisData.length-1]);
      for(var b=0,blen=betBall.length;b<blen;b++){
        var thisBetBall = betBall[b].replace(/^d-/,"");
        if($.inArray(thisBetBall,allBetBall)>-1)continue;
        allBetBall.push(thisBetBall);
      }

      allMoney += zhushu * this.betOneMoney;
    }
    if(allBetBall.length > this.cgNumVal){
      var allCg = this.arrcl(allBetBall,this.cgNumVal);
    }else{
      var allCg = [allBetBall];
    }
    for(var a=0,alen=allCg.length;a<alen;a++){
      if(!allBouns[a])allBouns[a]=0;
      for(var i=0,ilen=this.betData.length;i<ilen;i++){
        var thisData = this.betData[i].split("|");
        var betBall = thisData[thisData.length-3].split(",");
        var zhushu = Number(thisData[thisData.length-1]);
         // var ballCl = this.arrcl(betBall,this.betBallNum[this.playType]);
        var ballCl = this.getBetBallArrcl(betBall,this.betBallNum[this.playType]);
        for(var b=0,blen=ballCl.length;b<blen;b++){
          if(ballCl[b].length>this.cgNumVal){
            for(var g=0,glen=allCg[a].length;g<glen;g++){
              if($.inArray(allCg[a][g],ballCl[b])<0)break;
            }
            if(g == glen)allBouns[a] += this.lotteryBouns[this.playType];
          }else{
            for(var k=0,klen=ballCl[b].length;k<klen;k++){
              if($.inArray(ballCl[b][k],allCg[a])<0)break;
            }
            if(k == klen)allBouns[a] += this.lotteryBouns[this.playType];
          }
        }
      }
    }
    this.money = allMoney;
    this.bouns = eval('Math.max('+allBouns.join(",")+')');

    // //console.log(allBetBall);
    // //console.log(allCg);
    // //console.log(allMoney);
    // //console.log(this.bouns);
    // //console.log(allBouns);
}

  planObj.getBetBallArrcl = function(betBall,num){
    var d = [];
    var t = [];
    for(var i=0,ilen=betBall.length;i<ilen;i++){
      if(betBall[i].indexOf("d-")===0){
        d.push(betBall[i].replace(/^d-/,""));
      }else{
        t.push(betBall[i]);
      }
    }

    var tArrcl = this.arrcl(t,this.betBallNum[this.playType]-d.length);
    var allArrcl = [];
    for(var i=0,ilen=tArrcl.length;i<ilen;i++){
      allArrcl.push(d.concat(tArrcl[i]));
    }
    return allArrcl;
  
  }

  planObj.getQMoneyBouns = function(){
    var allBetData = new Object();
    var allMoney = 0;
    var allBouns = 0;
    for(var i=0,ilen=this.betData.length;i<ilen;i++){
      var thisData = this.betData[i].split("|");
      var zhushu = Number(thisData[thisData.length-1]);
      allMoney += zhushu*this.betOneMoney;

      var betData = new Array();
      for(var k=0,klen=thisData.length-2;k<klen;k++){
        var betBall = thisData[k].split(",");
        if(!betData.length){
          betData = betBall;
        }else{
          var temData = new Array();
          for(var t=0,tlen=betData.length;t<tlen;t++){
            for(var b=0,blen=betBall.length;b<blen;b++){
              if(betData[t].indexOf(betBall[b])>-1)continue;
              temData.push(betData[t]+","+betBall[b]);
            }
          }
          betData = temData;
        }
      }


      for(var b=0,blen=betData.length;b<blen;b++){
        if(!allBetData[betData[b]]){
          allBetData[betData[b]] = this.lotteryBouns[this.playType];
        }else{
          allBetData[betData[b]] += this.lotteryBouns[this.playType];
        }

        if(allBouns<allBetData[betData[b]])allBouns = allBetData[betData[b]];
      }
    }

    this.money = allMoney;
    this.bouns = allBouns;
    // //console.log(this.betData);
    // //console.log(allMoney);
    // //console.log(allBouns);
    // //console.log(allBetData);
  }

  planObj.getQZMoneyBouns = function(){
    var allBetData = new Object();
    var allMoney = 0;
    var allBouns = 0;
    // //console.log(this.betData);
    for(var i=0,ilen=this.betData.length;i<ilen;i++){
      var thisData = this.betData[i].split("|");
      var zhushu = Number(thisData[thisData.length-1]);
      var betBall = thisData[0].split(",");
      allMoney += zhushu*this.betOneMoney;

     // var betCl = this.arrcl(betBall,this.betBallNum[this.playType]);
      var betCl = this.getBetBallArrcl(betBall,this.betBallNum[this.playType]);
      for(var b=0,blen=betCl.length;b<blen;b++){
        var thisBetStr = betCl[b].join(",");
        if(!allBetData[thisBetStr]){
          allBetData[thisBetStr] = this.lotteryBouns[this.playType];
        }else{
          allBetData[thisBetStr] += this.lotteryBouns[this.playType];
        }

        if(allBouns < allBetData[thisBetStr])allBouns = allBetData[thisBetStr]
      }
    }

    this.money = allMoney;
    this.bouns = allBouns;

    // //console.log(this.betData);
    // //console.log(allMoney);
    // //console.log(allBouns);
    // //console.log(allBetData);
  }

  planObj.createPlan = function(){
    this.planMul = new Array();
    this.planMoney = new Array();
    for(var i=0,ilen=this.planNum;i<ilen;i++){
      var mulVal = this.planType == "money" ? this.getMoneyMul() : this.getPercentMul();
      var thisMoney = this.money * mulVal;
      if(thisMoney > this.maxBetMoney)break;
      if(mulVal > this.maxMul)break;
      this.planMul.push(mulVal);
      this.planMoney.push(thisMoney);
    }
     this.startMul = this.planMul[0];
    // //console.log(this.planMul);
  }

  planObj.getMoneyMul = function(){
    var allMoney = this.planMoney.length ? eval(this.planMoney.join("+")) : 0;

    var mulVal = Math.ceil((this.profitMoney + allMoney)/(this.bouns - this.money));

    mulVal = mulVal == 0 ? 1 : mulVal;

    mulVal = mulVal < this.startMul ? this.startMul : mulVal;

    return mulVal;
  }

  planObj.getPercentMul = function(){
    var allMoney = this.planMoney.length ? eval(this.planMoney.join("+")) : 0;

    var mulVal = Math.ceil((1+this.profitPercent)*allMoney/(this.bouns-(1+this.profitPercent)*this.money));
    mulVal = mulVal == 0 ? 1 : mulVal;

    mulVal = mulVal < this.startMul ? this.startMul : mulVal;

    return mulVal;
  }

  planObj.createPlanDom = function(){
    var html = new Array();
    var moneyVal = 0;
    html.push('<tr><th width="10%">期号</th><th>倍数</th><th width="18%">累计投入</th><th width="20%">中奖盈利</th><th width="20%">盈利率</th></tr>');
    this.planLotteryData = new Array();
    for(var i=0,ilen=this.planMul.length;i<ilen;i++){
      moneyVal += this.planMoney[i];
      var thisLotteryNo = this.getPlanLotteryNo(i);
      html.push('<tr><td>'+thisLotteryNo+'</td><td><p data-v="'+i+'" class="inputbox"><span data-t="lostMul">－</span><input type="tel" data-t="updateMul" class="input_sec" value="'+this.planMul[i]+'"/><span data-t="addMul">＋</span></p></td><td>'+(moneyVal)+'</td><td><span class="fontred">'+(this.bouns*this.planMul[i]-moneyVal)+'</span></td><td><span class="fontred">'+
	  ((this.bouns*this.planMul[i]-moneyVal)/moneyVal*100).toFixed(2)+
	  '%</span></td></tr>');
    }
    if(this.planMul.length < Number(this.setNumObj.html())){
      $.alertMsg("设置的盈利金额过大，方案只能生成"+this.planMul.length+"期",true);
    }
    this.planDomObj.html(html.join(""));
  }

  planObj.getPlanLotteryNo = function(i){
    var thisLotteryNo = Number(this.lotteryNoNum) + i;
	////console.log('origin ' + thisLotteryNo);
	var speMul = Math.floor(thisLotteryNo/this.lotteryNoAllNum);     //modify zhangw   修复原有bug,200期以上计算期数发生bug
    var thisLotteryDate = this.lotteryDate;
    if(thisLotteryNo > this.lotteryNoAllNum){
      thisLotteryNo = thisLotteryNo - speMul * this.lotteryNoAllNum;
	  if(thisLotteryNo == 0){
		thisLotteryNo = this.lotteryNoAllNum;	  
	  }
      var timeVal = new Date(Number(this.lotteryDate.slice(0,4)),Number(this.lotteryDate.slice(4,6))-1,Number(this.lotteryDate.slice(6,8))).getTime();
      timeVal+=(speMul * 1*24*60*60*1000);
      var timeObj = new Date(timeVal);
      var year = timeObj.getFullYear();
      var month  = timeObj.getMonth()+1;
      month = month < 10 ? "0"+month : month;
      var day = timeObj.getDate();
      day = day < 10 ? "0"+day : day;
      thisLotteryDate = year.toString()+month+day;
    }


    thisLotteryNo = thisLotteryNo < 10 ? "0"+thisLotteryNo : thisLotteryNo;

    this.planLotteryData.push(thisLotteryDate.slice(2)+thisLotteryNo);
	////console.log(thisLotteryNo);
	////console.log('end');
    return thisLotteryNo;
  }

  planObj.setPlanDataDom = function(){
    //this.planNumObj.html('追'+this.planNum+'期 '+this.startMul+'倍');
	this.planNumObj.html('追'+this.planNum+'期 ');
    if(this.planType=="money"){
      this.planTypeObj.html('计划盈利'+this.profitMoney+'元');
    }else{
      this.planTypeObj.html('计划盈利'+(this.profitPercent*100).toFixed(0)+'%');
    }
  }

  planObj.setMoneyDom = function(){
    this.lotteryNumObj.html(this.planMul.length);
    this.moneyObj.html(eval(this.planMoney.join("+")));
  }

  planObj.arrcl = function(arr, n, z){
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


  planObj.wrapperEvent = function(e){
    var aObj = $.oto_checkEvent(e,"A");
    if(aObj){
      var thisObj = $(aObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "sub" : this.disableBtn(thisObj);this.subData();return true;
        case "set" : this.showSetData();return true;
        case "closeSet" : this.closeSet();return true;
        case "subSet" : this.subSet();return true;
      }
    }
    var emObj = $.oto_checkEvent(e,"EM");
    if(emObj){
      var thisObj = $(emObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "k" : this.keySetVal(thisObj);return true;
        case "dk" : this.keyDelVal(thisObj);return true;
        case "sk" : this.keySubVal(thisObj);return true;
      }
    }
    var inputObj = $.oto_checkEvent(e,"INPUT");
    if(inputObj){
      var thisObj = $(inputObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "updateMul" : this.updateMul(thisObj);return true;
      }
    }
    var spanObj = $.oto_checkEvent(e,"SPAN");
    if(spanObj){
      var thisObj = $(spanObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "addMul" : this.addMul(thisObj);this.createPlanDom();this.setMoneyDom();return true;
        case "lostMul" : this.lostMul(thisObj);this.createPlanDom();this.setMoneyDom();return true;
        case "lostSetNum" : this.lostSetNum(thisObj);return true;
        case "addSetNum" : this.addSetNum(thisObj);return true;
        case "lostSetMul" : this.lostSetMul(thisObj);return true;
        case "addSetMul" : this.addSetMul(thisObj);return true;
        case "updateSetNum" : this.updateSetNum();return true;
        case "updateSetMul" : this.updateSetMul();return true;
        case "updateSetP" : this.updateSetP();return true;
        case "updateSetM" : this.updateSetM();return true;
      }
    }
    var labelObj = $.oto_checkEvent(e,"LABEL");
    if(labelObj){
      var thisObj = $(labelObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "stop" : this.setWinStop(thisObj);return false;
        case "setType" : this.updateType(thisObj);return false;
      }
    }
    var pObj = $.oto_checkEvent(e,"P");
    if(pObj){
      var thisObj = $(pObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "back" : this.goBack();return true;
        case "help" : this.goHelp();return true;
      }
    }
    var divObj = $.oto_checkEvent(e,"DIV");
    if(divObj){
      var thisObj = $(divObj);
      var thisId = thisObj[0].id;
      if(thisId == "setObj"){
        this.closeSet();return true;
      }
    }
  }
  
  planObj.goHelp = function(){
		helpDetailObj.goBack = function(){
			helpDetailObj.destroy();
			planObj.show();	
		}
		helpDetailObj.show('reload',function(){
			helpDetailObj.setData('seniorPlan');
		})
  }

  planObj.closeSet = function(){
    this.setNumObj.removeClass('fontblue');
    this.setMulObj.removeClass('fontblue');
    this.setObj.hide();
    this.keyObj.attr("data-k","");
    this.keyObj.attr("data-v","");
    this.keyObj.hide();
  }

  planObj.subSet = function(){
    this.planNum = Number(this.setNumObj.html());
    this.startMul = Number(this.setMulObj.html());
    this.profitMoney = Number(this.setMoneyObj.html());
	if(this.keyObj && this.keyObj.css('display')!= 'none' ){  //modify bug  zhangw
		this.keySubVal();
	}
    this.profitPercent = Number((Number(this.setPercentObj.html())/100).toFixed(2));
    if(this.setPercentObj.siblings('em').hasClass('checked')){
      this.planType = "percent";
    }else if(this.setMoneyObj.siblings('em').hasClass('checked')){
      this.planType = "money";
    }
    
	/*if(this.startMul < this.planMul[0]){
		$.alertMsg('设置的起始倍数不能低于实际生成的方案倍数');
		return false;	
	}*/
    // //console.log(this.planType);
    // //console.log(this.planNum);
    // //console.log(this.startMul);
    // //console.log(this.profitMoney);
    // //console.log(this.profitPercent);

    this.createPlan();
    this.createPlanDom();
    this.setPlanDataDom();
    this.setMoneyDom();

    this.closeSet();
  }

  planObj.keySetVal = function(obj){
    var thisK = this.keyObj.attr("data-k");
    var thisV = this.keyObj.attr("data-v");
    var thisKV = obj.attr("data-v");
    var val = Number(thisV+""+thisKV);
    var minMax = this.getMinMaxVal(thisK);
    if(val > minMax[1])val = minMax[1];
    this[thisK].html(val);
    this.keyObj.attr("data-v",val);
  }

  planObj.keyDelVal = function(obj){
    var thisK = this.keyObj.attr("data-k");
    var thisV = this.keyObj.attr("data-v");
    var val = thisV.slice(0,-1);
    if(val===""){
      this[thisK].html("&nbsp;");
      this.keyObj.attr("data-v",val);
      return true;
    }
    this[thisK].html(val);
    this.keyObj.attr("data-v",val);
  }

  planObj.keySubVal = function(obj){
    this.setNumObj.removeClass('fontblue');
    this.setMulObj.removeClass('fontblue');
    var thisK = this.keyObj.attr("data-k");
    var thisV = this.keyObj.attr("data-v");
    var minMax = this.getMinMaxVal(thisK);
    if(Number(thisV)<minMax[0])thisV = minMax[0];
    this[thisK].html(thisV);
    this.keyObj.hide();
    this.keyObj.attr("data-k","");
    this.keyObj.attr("data-v","");
  }

  planObj.updateType = function(obj){
    var thisV = obj.attr("data-v");
    if(thisV == "p"){
      this.setPercentObj.siblings("em").addClass('checked');
      this.setMoneyObj.siblings("em").removeClass('checked');
    }else if(thisV == "m"){
      this.setPercentObj.siblings("em").removeClass('checked');
      this.setMoneyObj.siblings("em").addClass('checked');
    }
	this.setMulObj.removeClass('fontblue');
    this.setNumObj.removeClass('fontblue');
    this.keyObj.hide();
    this.keyObj.attr("data-k","");
    this.keyObj.attr("data-v","");
  }

  planObj.updateSetNum = function(){
    this.setNumObj.addClass('fontblue');
    this.setMulObj.removeClass('fontblue');
    var thisOldKey = this.keyObj.attr("data-k");
    if(thisOldKey){
      var minMax = this.getMinMaxVal(thisOldKey);
      var thisV = this[thisOldKey].html();
      if(thisV=="&nbsp;" || thisV==""){
        this[thisOldKey].html(minMax[0]);
      }
    }
    this.keyObj.show();
    this.keyObj.attr("data-k","setNumObj");
    this.keyObj.attr("data-v","");
  }

  planObj.updateSetMul = function(){
    this.setNumObj.removeClass('fontblue');
    this.setMulObj.addClass('fontblue');
    var thisOldKey = this.keyObj.attr("data-k");
    if(thisOldKey){
      var minMax = this.getMinMaxVal(thisOldKey);
      var thisV = this[thisOldKey].html();
      if(thisV=="&nbsp;" || thisV==""){
        this[thisOldKey].html(minMax[0]);
      }
    }
    this.keyObj.show();
    this.keyObj.attr("data-k","setMulObj");
    this.keyObj.attr("data-v","");
  }

  planObj.updateSetM = function(){
    this.setNumObj.removeClass('fontblue');
    this.setMulObj.removeClass('fontblue');
    var thisOldKey = this.keyObj.attr("data-k");
    if(thisOldKey){
      var minMax = this.getMinMaxVal(thisOldKey);
      var thisV = this[thisOldKey].html();
      if(thisV=="&nbsp;" || thisV==""){
        this[thisOldKey].html(minMax[0]);
      }
    }
    this.keyObj.show();
    this.keyObj.attr("data-k","setMoneyObj");
    this.keyObj.attr("data-v","");
  }

  planObj.updateSetP = function(){
    this.setNumObj.removeClass('fontblue');
    this.setMulObj.removeClass('fontblue');
    var thisOldKey = this.keyObj.attr("data-k");
    if(thisOldKey){
      var minMax = this.getMinMaxVal(thisOldKey);
      var thisV = this[thisOldKey].html();
      if(thisV=="&nbsp;" || thisV==""){
        this[thisOldKey].html(minMax[0]);
      }
    }
    this.keyObj.show();
    this.keyObj.attr("data-k","setPercentObj");
    this.keyObj.attr("data-v","");
  }

  planObj.lostSetNum = function(obj){
    var thisPlanNum = this.setNumObj.html();
    thisPlanNum = thisPlanNum!="&nbsp;" ? Number(thisPlanNum) : 0;
    thisPlanNum -=1;
    if(thisPlanNum <= 0)thisPlanNum = 1;
    this.setNumObj.html(thisPlanNum);
  }

  planObj.addSetNum = function(obj){
    var thisPlanNum = this.setNumObj.html();
    thisPlanNum = thisPlanNum!="&nbsp;" ? Number(thisPlanNum) : 0;
    thisPlanNum +=1;
    if(thisPlanNum > this.maxPlanNum)thisPlanNum = this.maxPlanNum;
    this.setNumObj.html(thisPlanNum);
  }

  planObj.lostSetMul = function(obj){
    var thisStartMul = this.setMulObj.html();
    thisStartMul = thisStartMul!="&nbsp;" ? Number(thisStartMul) : 0;
    thisStartMul -=1;
    if(thisStartMul <= 0)thisStartMul = 1;
    this.setMulObj.html(thisStartMul);
  }

  planObj.addSetMul = function(obj){
    var thisStartMul = this.setMulObj.html();
    thisStartMul = thisStartMul!="&nbsp;" ? Number(thisStartMul) : 0;
    thisStartMul +=1;
    if(thisStartMul > this.maxMul)thisStartMul = this.maxMul;
    this.setMulObj.html(thisStartMul);
  }

  planObj.showSetData = function(){
    this.setNumObj.html(this.planNum);
    this.setMulObj.html(this.startMul);

    this.setPercentObj.html(Number(this.profitPercent*100).toFixed(0));
    this.setMoneyObj.html(this.profitMoney);

    if(this.planType == "money"){
      this.setPercentObj.siblings("em").removeClass('checked');
      this.setMoneyObj.siblings("em").addClass('checked');
    }else if(this.planType == "percent"){
      this.setPercentObj.siblings("em").addClass('checked');
      this.setMoneyObj.siblings("em").removeClass('checked');
    }
    this.setObj.show();
  }

  planObj.getMinMaxVal = function(thisK){
    if(thisK == "setNumObj"){
	  var minVal = 1;   //修改bug  zhangw
      //var minVal = this.planNum;
      var maxVal = this.maxPlanNum;
    }else if(thisK == "setMulObj"){
	  var minVal = 1;   //修改bug  zhangw
     // var minVal = this.startMul;
      var maxVal = this.maxMul;
    }else if(thisK == "setPercentObj"){
      var minVal = 1;
      var maxVal = (this.bouns-this.money)/this.money*100;
    }else if(thisK == "setMoneyObj"){
	  var minVal = 1;   //修改bug  zhangw
     // var minVal = this.profitMoney;
      var maxVal = this.maxBetMoney;
    }

    return [minVal,maxVal];
  }

  planObj.getZhushu = function(){
    var zhushu = 0;
    for(var i=0,ilen=this.betData.length;i<ilen;i++){
      var thisData = this.betData[i].split("|");
      zhushu += Number(thisData[thisData.length-1]);
    }
    return zhushu;
  }

  planObj.createSubBetData = function(){
    var data = [];
    for(var i=0,ilen=this.betData.length;i<ilen;i++){
      if(!this.betData[i])continue;
      var thisBetArr = this.betData[i].split("|");
      var betDataTem = [];
      var typeDataTem = [];
      for(var k=0,klen=thisBetArr.length;k<klen;k++){
        if(k>=klen-2){
          typeDataTem.push(thisBetArr[k]);
          continue;
        }
        var thisDArr = thisBetArr[k].split(",");
        if(this.lotteryType == ConfigObj.fastLotType && (this.lotteryPlay=="FP2" || this.lotteryPlay =="FP3") && thisBetArr[klen-1]==1){
          if(thisDArr.length>1){
            for(var tk=0,tklen=thisBetArr.length;tk<tklen-2;tk++){
              var temBetArr = thisBetArr[tk].split(",");
              if(tk!=k && temBetArr.length>1)break;
              if(tk==k)continue;
              var tkIndex = $.inArray(temBetArr[0],thisDArr);
              if(tkIndex>-1){
                var temArr = [];
                for(var it=0,itlen=thisDArr.length;it<itlen;it++){
                  if(it!=tkIndex)temArr.push(thisDArr[it]);
                }
                thisDArr = temArr.concat([]);
                thisBetArr[k] = thisDArr.join(",");
              }
            }
          }
        }
        var dVal = [];
        var tVal = [];
        for(var t=0,tlen=thisDArr.length;t<tlen;t++){
          if(thisDArr[t].indexOf("d-")>-1){
            dVal.push(thisDArr[t].replace("d-",""));
          }else{
            tVal.push(thisDArr[t]);
          }
        }
        betDataTem.push(dVal+(dVal.length?"$":"")+tVal); 
      }
      data.push(betDataTem.join("+")+"|"+typeDataTem.join("|"));
    }
	for(var i=0;i<data.length;i++){    //提交前清理私有胆拖判断数据 zhangw
			data[i] = data[i].replace('_D','');	
	}
    return data.join(";");
  }

  planObj.createPlanWager = function(){
    var planWagerData = new Array();
    for(var i=0,ilen=this.planLotteryData.length;i<ilen;i++){
      planWagerData.push(this.planLotteryData[i]+":"+this.planMul[i]);
    }
    return "{"+planWagerData.join(",")+"}";
  }

  planObj.createSubData = function(){
    var zhushu = this.getZhushu();
    return {
      lotteryType : this.lotteryType.toUpperCase(),
      lotteryNo : this.planLotteryData[0],
      playType : this.checkedZJ ? 'append' : 'common',
      passType : '',
      wagerCount : zhushu,
      wagerMultiple : eval(this.planMul.join("+")),
      consignType : 'alone',    //广东体彩云改为保存  购买：alone  保存：save
      wagerStore  : this.createSubBetData(),
      openType  : 'hide',
      money  : eval(this.planMoney.join("+")),
      source : this.planMul.length >1 ? this.planMul.length : 1,
      manner : 1,
      planType : "UnFixedMultiple",
      stopType : this.winStop ? "Prize" : "",
      hitAmount : "",
      planWager : this.createPlanWager()
    }
  }
  
  planObj.disableBtn = function(){
	 $('#plan_submitBtn').removeAttr('data-t').addClass('gray');  
  }
  planObj.activeBtn = function(){
	 $('#plan_submitBtn').attr('data-t','sub').removeClass('gray');  
  }
  
  /* ------------------------------------------- app 交易流程 ------------------------------------- */
  planObj.subData = function(){
    var postData = this.createSubData();
     if(postData.wagerStore == "" || postData.wagerCount == 0){
      $.alertMsg('请至少选择1注号码');
      return false;
    }
    if(postData['wagerCount'] > this.maxZSVal){
      $.alertMsg('注数最多支持'+(this.maxZSVal/10000).toFixed(0)+'万注');
      return false;
    }
    if(postData['money'] > this.maxBetMoney){
      $.alertMsg("投注金额最大支持"+(this.maxBetMoney/10000)+"万元");
      return false;
    }
	if(loginObj.isLogin){  // 已经登录的情况，先生成pid,用pid去跳转到收银台。 createPid()->buyFun()-> 
		this.createPid();
	}else{                 //未登录，先生成wid,用wid生成pid, 用pid跳转收银台  
		this.createWid();  //createWid()-> afterLoginCreatePid()-> buyFun() -> 
	}

  }

    planObj.buyFun = function (obj) {
        buyConfirmObj.goBack = function () {
            buyConfirmObj.destroy();
            planObj.show();
        };

        setTimeout(function () {
            buyConfirmObj.show(true, function () {
                buyConfirmObj.setData(obj);
            });
        }, 300); // 防止未登录流程多页面连续切换，由动画延迟导致的切换问题
    };
  
  //生成product_id ,跳转到支付确认页[buyConfirm]
  planObj.createPid = function(){
	  var postData = this.createSubData();
	  var self = this;
	  postData.channel_number = ConfigObj.zdid;
	  var secretData = {
	 		'para': Global.encrypt(postData),
	 		'access_token': loginObj.access_token
	 	}
	 
	  $.ajax({
		  url : ConfigObj.localSite +  '?version=1&m=lottery.lottery.numProcess',
		  data : secretData,
		  dataType : "json",
		  timeout: 30000,  
		  type : "post",
		  success : function(obj){
		 console.log(obj)
			planObj.activeBtn();
			
			if(obj.code == '0000'){
				 obj.info = $.parseJSON(Global.crypt(obj.info));	
//				 console.log('已经登录的情况下做单生成lotteryid', obj);
				self.pid = obj.info.productId;
				if(obj.info.productType == 'plan'){
					var data = {
					    'lotteryType': self.lotteryType, 
						'product_id' : obj.info.productId,
						'product_type': obj.info.productType	
					}
				}else{
					var data = {
						'lotteryType': self.lotteryType, 
						'product_id' : obj.info.productId,
						'product_type': obj.info.productType,
						'pay_amount': obj.info.money	
					}
				}
				self.buyFun(data);
				
			}else if(obj.code==="-33333"){
			  self.updBetTipsObj.attr("data-no", obj.info.currentNo);
			  self.showUpdBetTips();
			  return false;
			}else if(obj.code==="EXPIRED_LOTTERYNO"){
			  self.updBetTipsObj.attr("data-no", obj.info.currentNo);
			  self.showUpdBetTips();
			  return false;
			}else{
			  $.alertMsg(obj.code_str);
			 
			}
		  }
    });  
  }
  
  
  
  //未登陆情况下的购买(先生成wagerId,再利用wagerId生成lotteryId);
  planObj.createWid = function(){
	  var self  =  this;
	  var postData = this.createSubData();
	  $.ajax({
		  url : ConfigObj.localSite +  '?version=1&m=lottery.trade.numProcess',
		  data : postData,
		  dataType : "json",
		  timeout: 30000,  
		  type : "post",
		  success : function(obj){
			
			if(obj.code == '0000'){
				//console.log('未登录的情况下做单生成wagerId', obj);
				self.wid = obj.info.wagerId;
				loginObj.goBack = function(){
					self.show();	
				}
				loginObj.goForward = function(){
					//登录后创建pid
					self.show();
					self.afterLoginCreatePid(self.wid,obj.info.productType);  	
				}
				registerObj.goForward = function(){
				}
				loginObj.show();
			}else{
			   loginObj.goBack = function(){
					self.show();   
			   }
			   loginObj.goForward = function(){
					self.show();
					$.alertMsg(obj.code_str);   
			   }
			   registerObj.goForward = function(){
					self.show();
					$.alertMsg(obj.code_str); 
			   }
			 	loginObj.show();
			}
			planObj.activeBtn();
		  }
    });  
  }
  
  //根据wagerId 生成 lotteryId
  planObj.afterLoginCreatePid = function(wid,type){
	 var self = this;
	 var postData = {
		'wagerId': wid,
		'product_type': type,
		'access_token' : loginObj.access_token 
	 }
	 $.ajax({
		  url : ConfigObj.localSite +  '?version=1&m=lottery.trade.buylottery',
		  data : postData,
		  dataType : "json",
		  type : "post",
		  success : function(obj){
			if(obj.code == '0000'){
				//console.log('根据wagerId生成lotteryId', obj);
				
				if(type=='plan'){
					var data = {
					    'lotteryType': self.lotteryType, 
						'product_id' : obj.info.productId,
						'product_type': type,
						'pay_amount': obj.info.money	
					}
					self.pid = obj.info.productId;
				}else{
					var data = {
						'lotteryType': self.lotteryType, 
						'product_id' : obj.info.lotteryId,
						'product_type': type,
						'pay_amount': obj.info.money	
					}
					self.pid = obj.info.lotteryId;
				}
				self.buyFun(data);
			}else{
			   $.alertMsg(obj.code_str);
			}
		  }
    }); 
	  
  }
  
   /* ------------------------------------------- app 交易流程 end ------------------------------------- */
  planObj.setWinStop = function(obj){
    var emObj = obj.find("em");
    if(emObj.hasClass("checked")){
      emObj.removeClass('checked');
      this.winStop = false;
    }else{
      emObj.addClass('checked');
      this.winStop = true;
    }
  }

  planObj.addMul = function(obj){
    var thisPObj = obj.parent();
    var thisI = Number(thisPObj.attr("data-v"));
    this.planMul[thisI] += 1;
    if(this.planMul[thisI] > this.maxMul)this.planMul[thisI] = this.maxMul;
    this.planMoney[thisI] = this.money * this.planMul[thisI];
    thisPObj.find("input").val(this.planMul[thisI]);
  }

  planObj.lostMul = function(obj){
    var thisPObj = obj.parent();
    var thisI = Number(thisPObj.attr("data-v"));
    this.planMul[thisI] -= 1;
    if(this.planMul[thisI] <= 0)this.planMul[thisI] = 1;
    this.planMoney[thisI] = this.money * this.planMul[thisI];
    thisPObj.find("input").val(this.planMul[thisI]);
  }

  planObj.updateMul = function(obj){
    obj[0].addEventListener("input",function(){
      var thisPObj = $(this).parent();
      var thisI = Number(thisPObj.attr("data-v"));
      if(Number(this.value)>planObj.maxMul)this.value = planObj.maxMul;
      if(isNaN(this.value))this.value = planObj.planMul[thisI];
    },false);
    obj.change(function(){
      var thisPObj = $(this).parent();
      var thisI = Number(thisPObj.attr("data-v"));
      if(this.value==="" || this.value == 0)this.value=1;
      planObj.planMul[thisI] = Number(this.value);
      if(planObj.planMul[thisI] < 0)planObj.planMul[thisI] = 1;
      if(planObj.planMul[thisI] > planObj.maxMul)planObj.planMul[thisI] = planObj.maxMul;
      planObj.planMoney[thisI] = planObj.money * planObj.planMul[thisI];
      planObj.createPlanDom();
    });
    obj.blur(function(){
      obj.unbind("blur");
      obj.unbind("change");
    });
  }

  

  planObj.onloadFun = function(){
    this.createDom();
    this.createEvent();
  }

  planObj.init = function(){
   
    this.getBetData();
    this.getMoneyBouns();

      planObj.onloadFun();
      planObj.createPlan();
	  planObj.createPlanDom(); //zhangw
      planObj.setPlanDataDom();
      planObj.setMoneyDom();

  }
  
  planObj.setData = function(obj){
	  //console.log(obj);
	  planObj.playType = obj.playType;
	  if(obj.lotNum){
		this.lotteryNoNum = obj.lotNum; 
	  }
	  if(obj.lotDate){
		this.lotteryDate = obj.lotDate;  
	  }
  }
  
  planObj.show = function(isReload ,callback){
	  var self = this;
	  var activePage = Global.getActivePage();
	  var pageDom = $('#' + self.name);
	  if(pageDom.length == 0 || isReload){
		  $.ajax({
			 url:self.tpl,
			 data:'t=' +new Date().getTime(),
			 dataType:'text',
			 success:function(obj){
				 var rx = /<body[^>]*>([\s\S]+?)<\/body>/i
				 var m = rx.exec(obj);
				 if (m) m = m[1];
				 if(pageDom.length > 0){
					pageDom.remove(); 
				 }
				 var tplHtml = '<div class="page" style="display:none" id="'+ self.name +'">' + m + '</div>';
				 $(document.body).append(tplHtml);
				 Global.pageSwitch($('#' + self.name), $(activePage)); 
				 self.setDefConfig();
				 if(callback) callback();   //setData
				 self.init();
				 
			 }
		  })
	  }else{
		 Global.pageSwitch($('#' + self.name), $(activePage)); 
	  }	
	}
  
  

  planObj.lotteryNoChange = function(data){
    var timeObj = new Date(data['nowTime']);
    var year = timeObj.getFullYear();
    planObj.lotteryDate = year + data['lotteryNo'].toString().slice(2,-2);
    planObj.lotteryNoNum = data['lotteryNo'].toString().slice(-2);
    planObj.createPlanDom();
  }

  return planObj;
}