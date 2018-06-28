function BetConfirm(obj){
  var  confirm = new PageController({
	   'name': obj ? obj.name : '',
	   'tpl' : obj ? obj.tpl : ''
  });
//lottery.lottery.numProcess  
  confirm.setDefConfig = function(){
	this.zhushuArr = new Array();
    this.betAllData = new Array();
    this.betData = "";   //从投注页传过来的数据  submit
    this.agrstate = true;
    this.checkedOver = false;
    this.checkedZJ = false;	
    this.checkTipsShow = false;
    this.saveBetData = true;
    this.lotteryMinNum = new Array();
    this.lotteryBallNum = new Array();
    this.lotteryOneMoney = 2;
    this.lotteyType = '';
	this.lotteryPlay = '';
	this.lotteryCnName = '';
    this.lotteryMul = 1;
    this.lotteryPer = 1;
    this.maxMul = 10000;
    this.maxPer = 300;
    this.overNum = 3000;
    this.maxZSVal = 50000;
    this.maxMoneyVal = 500000;
    this.checkP = false;
	this.wid = ''; //php wagerId
	this.pid = ''; //php lotteryId

  }

  confirm.createDomObj = function(){
    this.betListObj = $("#confirm_betListObj");
    this.betSectionObj = $("#confirm_betSectionObj");
    this.additionalObj = $("#confirm_additionalObj");
    this.betListTipsObj = $("#confirm_betListTipsObj");
    this.zhushuObj = $("#confirm_zhushuObj");
    this.moneyObj = $("#confirm_moneyObj");
    this.bonusOverObj = $("#confirm_bonusOverObj");
    this.overNumObj = $("#confirm_overNumObj");
    this.mulUpdObj = $("#confirm_mulUpdObj");
    this.perUpdObj = $("#confirm_perUpdObj");
    this.mulInputObj = $("#confirm_mulInputObj");
    this.perInputObj = $("#confirm_perInputObj");
    this.overInputObj = $("#confirm_overInputObj");
	this.zhuijiaObj = $('#confirm_zjObj');
      this.delTipsObj = $("#confirm_delTipsObj");
    this.zjStyleObj = $("#confirm_zjStyleObj");
    this.updBetTipsObj = $("#confirm_updBetTipsObj");
	this.backObj = $('#confirm_backbtn');
	this.cnNameObj = $('#confirm_cnName');
	this.planBtnObj = $('#confirm_planBtn');
	if(this.lotteryType == 'dlt'){
		this.zhuijiaObj.show();	
	}else{
		this.zhuijiaObj.hide();
	}
	if(this.lotteryType == ConfigObj.fastLotType){
    this.planBtnObj.show();	
    $('#confirm_hemai').hide();
		this.updatePlanNum('fast');
	}else if(this.lotteryType == ConfigObj.fastK3Type){
        // this.planBtnObj.show();
        // this.updatePlanNum('fastK3');
        $('#confirm_hemai').hide();
	}else{
		this.planBtnObj.hide();
		this.updatePlanNum(this.lotteryType);
	}
	if(this.overInputObj){
		this.overInputObj.html(this.overNum + '元');
	}
	
  }
  
  confirm.updatePlanNum = function(type){
	  if(type == 'fast'){
		  $('#confirm_monthNum').attr('data-v',84).find('em').text('一天');
		  $('#confirm_halfYearNum').attr('data-v',84*2).find('em').text('两天');
		  $('#confirm_yearNum').attr('data-v',84*3).find('em').text('三天');
	  }else if(type == 'fastK3'){
		  $('#confirm_monthNum').attr('data-v',78).find('em').text('一天');
		  $('#confirm_halfYearNum').attr('data-v',78*2).find('em').text('两天');
		  $('#confirm_yearNum').attr('data-v',78*3).find('em').text('三天');
	  }else if(type == 'pl3' || type == 'pl5'){
		  $('#confirm_monthNum').attr('data-v',30).find('em').text('一月');
		  $('#confirm_halfYearNum').attr('data-v',180).find('em').text('半年');
		  $('#confirm_yearNum').attr('data-v',360).find('em').text('全年');
	  }else{
		  $('#confirm_monthNum').attr('data-v',12).find('em').text('一月');
		  $('#confirm_halfYearNum').attr('data-v',80).find('em').text('半年');
		  $('#confirm_yearNum').attr('data-v',153).find('em').text('全年');
	  }
  }

  confirm.createEvent = function(){
    this.betSectionObj.unbind('tap').tap(function(e){
      confirm.betEvent(e);
    });
    this.additionalObj.unbind('tap').tap(function(e){
      confirm.buyEvent(e);
    });
    
  	$('#confirm_hemai').unbind('tap').tap(function(e){
      confirm.hemai();
    });
    
    this.delTipsObj.unbind('tap').tap(function(e){
      var aObj = $.oto_checkEvent(e,"A");
      if(aObj){
        var thisObj = $(aObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "subDel" : confirm.hideDelTips();confirm.delAllLottery();confirm.checkedBetTips();confirm.createBetList();confirm.setMoneyDom();confirm.hideDelTips();return true;
          case "clearDel" : confirm.hideDelTips();return true;
        }
      }

      var divObj = $.oto_checkEvent(e,"DIV");
      if(divObj){
        var thisObj = $(divObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "nohide" : return true;
          case "hideDel" : confirm.hideDelTips();return true;
        }
      }

    });
    
    this.updBetTipsObj.unbind('tap').tap(function(e){
	      var aObj = $.oto_checkEvent(e,"A");
	      if(aObj){
	        var thisObj = $(aObj);
	        var thisT = thisObj.attr("data-t");
	        switch(thisT){
	          case "clearBet" : confirm.hideUpdBetTips();return true;
	          case "subUpdBet" : confirm.updateLotteryNo();confirm.submitBet();confirm.hideUpdBetTips();return true;
	        }
	      }

	      var divObj = $.oto_checkEvent(e,"DIV");
	      if(divObj){
	        var thisObj = $(divObj);
	        var thisT = thisObj.attr("data-t");
	        switch(thisT){
	          case "nohide" : return true;
	          case "hideDel" : confirm.hideUpdBetTips();return true;
	        }
	      }

	});
     
	this.backObj.unbind('tap').tap(function(){
		confirm.goBack();
	})
  }

  confirm.betEvent = function(e){
   var aObj = $.oto_checkEvent(e,"A");
    if(aObj){
      var thisObj = $(aObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "xy" : this.goProtocol();return true; 
      }
    }
    var spanObj = $.oto_checkEvent(e,"SPAN");
    if(spanObj){
      var thisObj = $(spanObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "add" : this.addLottery(thisObj);this.checkedBetTips();this.createBetList();this.setMoneyDom();return true;
        case "del" : this.delLottery(thisObj);this.checkedBetTips();this.createBetList();this.setMoneyDom();return true;
        case "delall" : this.showDelTips();return true;
        case "upd" : this.updateLottery(thisObj);return true; 
      }
    }
    var labelObj = $.oto_checkEvent(e,"LABEL");
    if(labelObj){
      var thisObj = $(labelObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "agr" : this.agrCheck(thisObj);return true;
      }
      
    }
	
  }

  confirm.buyEvent = function(e){
    var aObj = $.oto_checkEvent(e,"A");
    if(aObj){
      var thisObj = $(aObj);
      var thisT = thisObj.attr("data-t");
      console.log(thisT)
      switch(thisT){
        case "overnum" : this.showOverNum();return true;
        case "submit" : this.disableBtn(thisObj);this.submitBet();return true;
        case "gjzh" : this.hrefGjzh();return true;   //高级追号
      }
      return true;
    }
    var spanObj = $.oto_checkEvent(e,"SPAN");
    if(spanObj){
      var thisObj = $(spanObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "increase" :this.increaseVal(thisObj);this.setMoneyDom();this.checkedBetOver();break;
        case "reduce"   :this.reduceVal(thisObj);this.setMoneyDom();this.checkedBetOver();break;
        case "mul" : this.showMulTips();break;
        case "per" : this.showPerTips();break;
        case "mn"  : this.updateMulVal(thisObj);this.setMoneyDom();this.checkedBetOver();break;
        case "mv"  : this.updateMulOther(thisObj);this.setMoneyDom();this.checkedBetOver();break;
        case "md"  : this.delMulVal();this.setMoneyDom();this.checkedBetOver();break;
        case "ms"  : this.hideMulTips();this.setMoneyDom();break;
        case "pn"  : this.updatePerVal(thisObj);this.setMoneyDom();this.checkedBetOver();break;
        case "pv"  : this.updatePerOther(thisObj);this.setMoneyDom();this.checkedBetOver();break;
        case "pd"  : this.delPerVal();this.setMoneyDom();this.checkedBetOver();break;
        case "ps"  : this.hidePerTips();this.setMoneyDom();break;
        case "on"  : this.updateOverVal(thisObj);break;
        case "od"  : this.delOverVal();break;
        case "os"  : this.hideOverTips();break;
      }
      return true;
    }
    var labelObj = $.oto_checkEvent(e,"LABEL");
    if(labelObj){
      var thisObj = $(labelObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "zj" : this.zjLottery(thisObj);this.createBetList();this.setMoneyDom();break;
        case "over" : this.overLottery(thisObj);break;
      }
      return true;
    }
  }

    confirm.disableBtn = function (btn) {
      // console.log(btn)
        btn.removeAttr('data-t').addClass('gray');
        setTimeout(function () {
            if (btn.hasClass('gray')) btn.attr('data-t', 'submit').removeClass('gray');
        }, 2000);
    }

  confirm.zjLottery = function(obj){
    var emObj = obj.children('em');
    if(emObj.hasClass('checked')){
      emObj.removeClass('checked');
      this.lotteryOneMoney = 2;
      this.checkedZJ = false;
    }else{
      emObj.addClass('checked');
      this.lotteryOneMoney = 3;
      this.checkedZJ = true;
    }
    
     window.localStorage.setItem(confirm.lotteryType+"ZjData",confirm.checkedZJ);
     
  }
  confirm.hrefGjzh = function(){
    var temPlayType = "";
    //console.log(this.betAllData);
    for(var i=0,ilen=this.betAllData.length;i<ilen;i++){
      if(!this.betAllData[i])continue;
      var thisData = this.betAllData[i].split("|");
      var thisPlayType = thisData[thisData.length-2];
      thisPlayType = thisPlayType.replace(/\R$/,"");
	  /*if(thisPlayType.indexOf('_D') != -1){
		$.alertMsg("高级追号不支持设胆");
        return false;  
	  }
	  thisPlayType = thisPlayType.replace(/_D/,"");*/
      if(temPlayType!=="" && thisPlayType != temPlayType){
        $.alertMsg("高级追号只能支持一种玩法");
        return false;
      }
      temPlayType = thisPlayType;
    }
    //w.location.href = "/"+this.lotteryType+"/plan?playType="+temPlayType; confirm_submit
	if(confirm.lotteryType == ConfigObj.fastLotType || (ConfigObj.syx5Type.indexOf(confirm.lotteryType) !== -1)){
		syxwPlanObj.goBack=function(){
			syxwPlanObj.destroy();
			confirm.show();	
		}
		syxwPlanObj.show('reload',function(){
			var lotNum = confirm.lotteryNo.toString().slice(-2);
			var lotteryDate = new Date().getFullYear()+ confirm.lotteryNo.toString().slice(2,-2); 
			syxwPlanObj.setData({'playType': temPlayType,'lotNum' : lotNum,'lotDate':lotteryDate})
		})
	} else if (confirm.lotteryType == ConfigObj.fastK3Type) {
        // 快三高级追号
        /*
        ksPlanObj.goBack = function () {
            ksPlanObj.destroy();
            confirm.show();
        };

        ksPlanObj.show(true, function () {
            var lotNum = confirm.lotteryNo.toString().slice(-2);
            var lotteryDate = new Date().getFullYear() + confirm.lotteryNo.toString().slice(2, -3);
            syxwPlanObj.setData({playType: temPlayType, lotNum: lotNum, lotDate: lotteryDate})
        })
         */
    }
  }
  confirm.increaseVal = function(obj){
    var thisK = obj.attr("data-k");
    var val = thisK=="q" ? this.updatePer("increase") : this.updateMul("increase");
    var html = thisK=="q" ? "期" : "倍";
    obj.prev().html(val+html);
  }

  confirm.reduceVal = function(obj){
    var thisK = obj.attr("data-k");
    var val = thisK=="q" ? this.updatePer("reduce") : this.updateMul("reduce");
    var html = thisK=="q" ? "期" : "倍";
    obj.next().html(val+html);
  }

  confirm.updateMul = function(type){
    this.lotteryMul = type == "increase" ? this.lotteryMul+=1 : this.lotteryMul-=1;
    this.lotteryMul = this.lotteryMul <=0 ? 1 : this.lotteryMul;
    this.lotteryMul = this.lotteryMul > this.maxMul ? this.maxMul : this.lotteryMul;
    return this.lotteryMul;
  }

  confirm.updateMulVal = function(obj){
    if(this.checkTipsShow){
      this.lotteryMul = 0;
      this.checkTipsShow = false;
    }
    var thisV = obj.attr("data-v");
    this.lotteryMul = Number(this.lotteryMul+""+thisV);
    if(this.lotteryMul>this.maxMul)this.lotteryMul = this.maxMul;
    this.mulInputObj.html(this.lotteryMul+"倍");
  }

  confirm.updateMulOther = function(obj){
    var thisV = obj.attr("data-v");
    this.lotteryMul = Number(thisV);
    this.mulInputObj.html(this.lotteryMul+"倍");
  }

  confirm.delMulVal = function(){
    this.lotteryMul = Number((this.lotteryMul+"").slice(0,-1));
    this.mulInputObj.html(this.lotteryMul+"倍");
  }

  confirm.hideMulTips = function(){
    if(this.lotteryMul<1)this.lotteryMul=1;
    this.mulInputObj.html(this.lotteryMul+"倍");
    this.mulUpdObj.hide();
    this.checkTipsShow = false;
    this.removeTipBg();
    this.mulInputObj.removeClass('fontblue');
  }

  confirm.updatePerVal = function(obj){
    if(this.checkTipsShow){
      this.lotteryPer = 0;
      this.checkTipsShow = false;
    }
    var thisV = obj.attr("data-v");
    this.lotteryPer = Number(this.lotteryPer+""+thisV);
    if(this.lotteryPer>this.maxPer)this.lotteryPer = this.maxPer;
    this.perInputObj.html(this.lotteryPer+"期");
  }

  confirm.updatePerOther = function(obj){
    var thisV = obj.attr("data-v");
    this.lotteryPer = Number(thisV);
    this.perInputObj.html(this.lotteryPer+"期");
  }

  confirm.delPerVal = function(){
    this.lotteryPer = Number((this.lotteryPer+"").slice(0,-1));
    this.perInputObj.html(this.lotteryPer+"期");
  }

  confirm.hidePerTips = function(){
    if(this.lotteryPer<1)this.lotteryPer=1;
    this.perInputObj.html(this.lotteryPer+"期");
    this.perUpdObj.hide();
    this.checkTipsShow = false;
    this.removeTipBg();
    this.perInputObj.removeClass('fontblue');
  }

  confirm.updateOverVal = function(obj){
    if(this.checkTipsShow){
      this.overNum = 0;
      this.checkTipsShow = false;
    }
    var thisV = obj.attr("data-v");
    this.overNum = Number(this.overNum+""+thisV);
    if(this.overNum>this.maxOver)this.overNum = this.maxOver;
    this.overInputObj.html(this.overNum+"元");
  }

  confirm.delOverVal = function(){
    this.overNum = Number((this.overNum+"").slice(0,-1));
    this.overInputObj.html(this.overNum+"元");
  }

  confirm.hideOverTips = function(){
    if(this.overNum<1)this.overNum=3000;
    this.overInputObj.html(this.overNum+"元");
    this.overNumObj.hide();
    this.checkTipsShow = false;
    this.removeTipBg();
    this.overInputObj.removeClass('fontblue');
  }

  confirm.updatePer = function(type){
    this.lotteryPer = type == "increase" ? this.lotteryPer+1 : this.lotteryPer-1;
    this.lotteryPer = this.lotteryPer <=0 ? 1: this.lotteryPer;
    this.lotteryPer = this.lotteryPer > this.maxPer ? this.maxPer : this.lotteryPer;
    return this.lotteryPer;
  }

  confirm.checkedBetTips = function(){
    for(var i=0,ilen=this.betAllData.length;i<ilen;i++){
      if(this.betAllData[i]){
        this.betListTipsObj.hide();
        return true;
      }
    }
    this.betListTipsObj.show();
  }

  confirm.checkedBetOver = function(){
    if(this.lotteryPer>1){
      this.bonusOverObj.show();
      var emObj = this.bonusOverObj.find("em");
      this.checkedOver = emObj.hasClass('checked') ? true : false;
    }else if(this.lotteryPer<=1){
      this.bonusOverObj.hide();
      this.checkedOver = false;
    }
  }

  confirm.overLottery = function(obj){
    var emObj = obj.find("em");
    if(emObj.hasClass('checked')){
      emObj.removeClass('checked');
      this.checkedOver = false;
    }else{
      emObj.addClass('checked');
      this.checkedOver = true;
    }
  }

  confirm.showOverNum = function(){
    this.overNumObj.show();
    this.mulUpdObj.hide();
    this.perUpdObj.hide();
    this.createTipsBg();
    this.perInputObj.removeClass('fontblue');
    this.overInputObj.addClass('fontblue');
    this.mulInputObj.removeClass('fontblue');
    this.checkTipsShow = true;
  }

  confirm.showMulTips = function(){
    this.overNumObj.hide();
    this.mulUpdObj.show();
    this.perUpdObj.hide();
     this.createTipsBg();
    this.perInputObj.removeClass('fontblue');
    this.overInputObj.removeClass('fontblue');
    this.mulInputObj.addClass('fontblue');
    this.checkTipsShow = true;
  }

  confirm.showPerTips = function(){
    this.overNumObj.hide();
    this.mulUpdObj.hide();
    this.perUpdObj.show();
    this.createTipsBg();
    this.perInputObj.addClass('fontblue');
    this.overInputObj.removeClass('fontblue');
    this.mulInputObj.removeClass('fontblue');
    this.checkTipsShow = true;
  }

  confirm.agrCheck = function(obj){
     $.alertMsg("请阅读并同意《广东体彩云服务协议》");
    return false;
    var emObj = obj.children('em');
    if(emObj.hasClass('checked')){
      emObj.removeClass('checked');
      this.agrstate = false;
    }else{
      emObj.addClass('checked');
      this.agrstate = true;
    }
  }

  confirm.delLottery = function(obj){
    var thisI = Number(obj.parent().attr("data-i"));
    delete this.betAllData[thisI];
    delete this.zhushuArr[thisI];
    this.saveSessionAllBetData();
    obj.parent().remove();
  }

  confirm.showDelTips = function(){
    this.delTipsObj.show();
  }

  confirm.hideDelTips = function(){
    this.delTipsObj.hide();
  }
  confirm.showUpdBetTips = function(){
    this.updBetTipsObj.show();
  }

  confirm.hideUpdBetTips = function(){
    this.updBetTipsObj.hide();
  }

  confirm.updateLotteryNo = function(){
    var thisLotteryNo = this.updBetTipsObj.attr("data-no");
    this.lotteryNo = thisLotteryNo;
  }
  confirm.delAllLottery = function(obj){
    //if(!window.confirm("确认清空投注号码?"))return false;
    this.betAllData = [];
    this.zhushuArr = [];
    this.saveSessionAllBetData();
  }

  confirm.updateLottery = function(obj){
    var betVal = obj.parent().attr("data-v");
    var thisI = Number(obj.parent().attr("data-i"));
    delete this.betAllData[thisI];
    this.saveSessionAllBetData();
	switch(confirm.lotteryType){
		case 'dlt':
			dltObj.show('reload',function(){
				dltObj.isEdit = true;
				dltObj.editData = betVal;
				dltObj.updateBet();	
			});	
			break;
		case 'ssq':
			ssqObj.show('reload',function(){
				ssqObj.isEdit = true;
				ssqObj.editData = betVal;
				ssqObj.updateBet();	
			});	
			break;
		case 'pl5':
			pl5Obj.show('reload',function(){
				pl5Obj.isEdit = true;
				pl5Obj.editData = betVal;
				pl5Obj.updateBet();	
			});	
			break;
		case 'pl3':
			pl3Obj.show('reload',function(){
				pl3Obj.isEdit = true;
				pl3Obj.editData = betVal;
				pl3Obj.updateBet();	
			});	
			break;
		case 'd3':
			d3Obj.show('reload',function(){
				d3Obj.isEdit = true;
				d3Obj.editData = betVal;
				d3Obj.updateBet();	
			});	
			break;
		case 'qxc':
			qxcObj.show('reload',function(){
				qxcObj.isEdit = true;
				qxcObj.editData = betVal;
				qxcObj.updateBet();	
			});	
			break;
		case ConfigObj.fastLotType:
			fastBetObj.show('reload',function(){
				fastBetObj.isEdit = true;
				fastBetObj.editData = betVal;
				fastBetObj.updateBet();
			})
			break;
		case ConfigObj.fastK3Type:
			fastK3Obj.show('reload',function(){
				fastK3Obj.isEdit = true;
				fastK3Obj.editData = betVal;
				fastK3Obj.updateBet();
			})
			break;
		case 'hn4j1':
			hn4j1Obj.show('reload',function(){
				hn4j1Obj.isEdit = true;
				hn4j1Obj.editData = betVal;
				hn4j1Obj.updateBet();
			});
			break;
        default:
            if (ConfigObj.syx5Type.indexOf(confirm.lotteryType) !== -1) {
                fastBetObj.show(true, function () {
                    fastBetObj.isEdit = true;
                    fastBetObj.editData = betVal;
                    fastBetObj.updateBet();
                });
                break;
            }
            break;
	}
	
  }
  

  confirm.setMoneyDom = function(){
    this.zhushuObj.html(this.getZhushu()+"注 "+this.lotteryMul+"倍 "+this.lotteryPer+"期");
    this.moneyObj.html(this.getMoney());
    this.setTemMulAndPer();
  }

  confirm.getZhushu = function(){
    var val = 0;
    for(var i=0,ilen=this.zhushuArr.length;i<ilen;i++){
      if(this.zhushuArr[i])val+=Number(this.zhushuArr[i]);
    }
    return val;
  }

  confirm.getMoney = function(){
    return this.lotteryOneMoney*this.getZhushu()*this.lotteryMul*this.lotteryPer;
  }

  confirm.addLottery = function(obj){
    var thisV = obj.attr("data-v");
    if(thisV=="continue"){
	  switch(confirm.lotteryType){
		 case 'dlt':
		 	 dltObj.show('reload');
			 break;
		 case 'ssq':
		 	 ssqObj.show('reload');
			 break;
		 case 'pl3':
		 	 pl3Obj.show('reload');
			 break;
		 case 'd3':
		 	 d3Obj.show('reload');
			 break;
		 case 'pl5':
		 	 pl5Obj.show('reload');
			 break;
		 case 'qxc':
		 	 qxcObj.show('reload');
			 break;
		 case ConfigObj.fastLotType:
		 	 fastBetObj.show('reload',function(){
				 fastBetObj.updatePlay('FP1');  
			 });
			 break;
		 case ConfigObj.fastK3Type:
		 	//console.log("233")
		 	 fastK3Obj.show('reload',function(){
				 fastK3Obj.updatePlay('SUM');  
			 });
			 break;
		 case 'hn4j1':
		 	hn4j1Obj.show('reload');
			break;
          default:
              if (ConfigObj.syx5Type.indexOf(confirm.lotteryType) !== -1) {
                  fastBetObj.show(true, function () {
                      fastBetObj.updatePlay('FP1');
                  });
              }
              break;
	  }
      return false;
    }
	
    for(var i=0;i<Number(thisV);i++){
      var betRandomVal = [];
      var outKey = [];
      if(this.lotteryBallWei){
        for(var w=0,wlen=this.lotteryMinNum.length-this.lotteryBallWei;w<wlen;w++){
          var randomKey = Math.floor(Math.random()*this.lotteryMinNum.length);
          if(outKey.indexOf(randomKey)<0){
            outKey.push(randomKey);
          }else{
            w--;
          }
        }
      }
      for(var n=0,nlen=this.lotteryMinNum.length;n<nlen;n++){
        if(outKey.indexOf(n)>-1){
          betRandomVal.push("-");
          continue;
        }
        var temBall = [];
        for(var k=0,klen=this.lotteryMinNum[n];k<klen;k++){
           var randomKey = Math.floor(Math.random()*this.lotteryBallNum[n]);
          var randomVal = this.lotteryBetVal[n][randomKey];
          randomVal = (!!!this.offCheckNum0 && randomVal<10) ? "0"+randomVal:""+randomVal;
          if($.inArray(randomVal,temBall)>-1){
            k--;
            continue;
          }
          var checkPVal = false;
          if(this.checkP){
            for(var cn=0;cn<n;cn++){
              var thisBetArr = betRandomVal[cn].split(",");
              if($.inArray(randomVal,thisBetArr)>-1){
                k--;
                checkPVal = true;
                break;
              }
            }
          }
          ////console.log(checkPVal);
          if(checkPVal)continue;
          temBall.push(randomVal);
        }
        temBall.sort(function(a,b){
          return Number(a)-Number(b);
        });
        betRandomVal.push(temBall.join(","));
      }
     // betRandomVal.push(this.lotteryPlay+"R");
      //console.log(this.lotteryPlay);
	  	betRandomVal.push(this.lotteryPlay);
      betRandomVal.push("1");
      this.setSessionAllBetData(betRandomVal.join("|"));
    }
	
  }

  confirm.getSessionBetData = function(){
    var data = window.localStorage.getItem(this.lotteryType+"lotteryBetData");
    window.localStorage.removeItem(this.lotteryType+"lotteryBetData");
    return data;
  }

  confirm.getSearchBetData = function(){
    var thisSearch = window.location.search;
    var searchArr = thisSearch.replace("?","").split("&");
    for(var i=0,ilen=searchArr.length;i<ilen;i++){
      var thisP = searchArr[i].split("=");
      if(thisP[0] == "data")return thisP[1];
    }
  }

  confirm.getSessionAllBetData = function(){
    if(!this.saveBetData)return false;
    if(!(window.localStorage && window.localStorage.getItem(this.lotteryType+"lotteryAllBetData")))return false;
    this.betAllData =  window.localStorage.getItem(this.lotteryType+"lotteryAllBetData").split(";");
  }

  confirm.setSessionAllBetData = function(data){
    var dataArr = data.split(";");
    this.betAllData = this.betAllData.concat(dataArr);
    
    this.saveSessionAllBetData();

  }

  confirm.saveSessionAllBetData = function(){
    if(!window.localStorage || !this.saveBetData)return false;
    var temData = new Array();
    for(var i=0,ilen=this.betAllData.length;i<ilen;i++){
      if(this.betAllData[i])temData.push(this.betAllData[i]);
    }
    window.localStorage.setItem(this.lotteryType+"lotteryAllBetData",temData.join(";"));
  }

  confirm.createBetData = function(){
    this.betData = (window.localStorage && window.localStorage.getItem(this.lotteryType+"lotteryBetData")) ? this.getSessionBetData() :''; 
    if(!this.betData)return false;
    this.setSessionAllBetData(this.betData);
  }

  confirm.getBetStype = function(type,zhushu){
  
       type = type.replace(/\R$/,"");
      var zhuijiaText = this.checkedZJ ? "-追加" : "";
      if(type == "D")return "胆拖"+zhuijiaText;
    if((this.lotteryType == "pl3" || this.lotteryType == "d3")  && type=="UP3" && zhushu >1)return "组三复式"+zhuijiaText;
    if((this.lotteryType == "pl3" || this.lotteryType == "d3") && type=="UP3" && zhushu ==1)return "组三单式"+zhuijiaText;
    if((this.lotteryType == "pl3" || this.lotteryType == "d3") && type=="UP6" && zhushu >1)return "组六复式"+zhuijiaText;
    if((this.lotteryType == "pl3" || this.lotteryType == "d3") && type=="UP6" && zhushu ==1)return "组六单式"+zhuijiaText;
    if((this.lotteryType == "pl3" || this.lotteryType == "d3") && type=="IH")return "直选和值"+zhuijiaText;
    if((this.lotteryType == "pl3" || this.lotteryType == "d3") && type=="UH3")return "组三和值"+zhuijiaText;
    if((this.lotteryType == "pl3" || this.lotteryType == "d3") && type=="UH6")return "组六和值"+zhuijiaText;
    if((this.lotteryType == "pl3" || this.lotteryType == "d3") && type=="IP" && zhushu==1)return "直选单式"+zhuijiaText;
    if((this.lotteryType == "pl3" || this.lotteryType == "d3") && type=="IP" && zhushu > 1)return "直选复式"+zhuijiaText;
    var tjsyyBetType = zhushu>1 ?  "复式" : "单式";
	
    if(this.lotteryType == ConfigObj.fastLotType && type=="R2")return "任二 "+tjsyyBetType+zhuijiaText;
    if(this.lotteryType == ConfigObj.fastLotType && type=="R3")return "任三 "+tjsyyBetType+zhuijiaText;
    if(this.lotteryType == ConfigObj.fastLotType && type=="R4")return "任四 "+tjsyyBetType+zhuijiaText;
    if(this.lotteryType == ConfigObj.fastLotType && type=="R5")return "任五 "+tjsyyBetType+zhuijiaText;
    if(this.lotteryType == ConfigObj.fastLotType && type=="R6")return "任六 "+tjsyyBetType+zhuijiaText;
    if(this.lotteryType == ConfigObj.fastLotType && type=="R7")return "任七 "+tjsyyBetType+zhuijiaText;
    if(this.lotteryType == ConfigObj.fastLotType && type=="R8")return "任八 "+tjsyyBetType+zhuijiaText;
    if(this.lotteryType == ConfigObj.fastLotType && type=="FP1")return "前一 "+tjsyyBetType+zhuijiaText;
    if(this.lotteryType == ConfigObj.fastLotType && type=="FP2")return "前二直选 "+tjsyyBetType+zhuijiaText;
    if(this.lotteryType == ConfigObj.fastLotType && type=="FC2")return "前二组选 "+tjsyyBetType+zhuijiaText;
    if(this.lotteryType == ConfigObj.fastLotType && type=="FP3")return "前三直选 "+tjsyyBetType+zhuijiaText;
    if(this.lotteryType == ConfigObj.fastLotType && type=="FC3")return "前三组选 "+tjsyyBetType+zhuijiaText;
	
	var dantuoType = '胆拖';
	if(this.lotteryType == ConfigObj.fastLotType && type=="R2_D")return "任二" + dantuoType;
    if(this.lotteryType == ConfigObj.fastLotType && type=="R3_D")return "任三" + dantuoType;
	if(this.lotteryType == ConfigObj.fastLotType && type=="R4_D")return "任四" + dantuoType;
	if(this.lotteryType == ConfigObj.fastLotType && type=="R5_D")return "任五" + dantuoType;
	if(this.lotteryType == ConfigObj.fastLotType && type=="R6_D")return "任六" + dantuoType;
	if(this.lotteryType == ConfigObj.fastLotType && type=="R7_D")return "任七" + dantuoType;
    if(this.lotteryType == ConfigObj.fastLotType && type=="R8_D")return "任八" + dantuoType;
	if(this.lotteryType == ConfigObj.fastLotType && type=="FC2_D")return "前二组选" + dantuoType;
	if(this.lotteryType == ConfigObj.fastLotType && type=="FC3_D")return "前三组选" + dantuoType;
	
	if(this.lotteryType == ConfigObj.fastK3Type){
		var k3BetType = zhushu>1 ?  "复式" : "单式";
		if(type == 'SUM') return  '和值 ' + k3BetType;
		if(type == 'TX') return '三同号通选 ' ;
		if(type == 'LTX') return '三连号通选 ' ;
		if(type == 'TXD') return '三同号单选 ' + k3BetType;
		if(type == 'TXD2') return '二同号单选 ' + k3BetType;
		if(type == 'TXS2') return '二同号复选 ' + k3BetType;
		if(type == 'BT3') return '三不同 ' + k3BetType;
		if(type == 'BT2') return '二不同 ' + k3BetType;
		
		if(type == 'BT3_D') return '三不同胆拖';
		if(type == 'BT2_D') return '二不同胆拖';
	}
   
    var hn4j1BetType = zhushu>1 ?  "复式" : "单式"
    if(this.lotteryType == "hn4j1" && type=="D5")return "4+1 "+hn4j1BetType+zhuijiaText;
    if(this.lotteryType == "hn4j1" && type=="D4")return "定位4 "+hn4j1BetType+zhuijiaText;
    if(this.lotteryType == "hn4j1" && type=="R4")return "任4(单号) "+hn4j1BetType+zhuijiaText;
    if(this.lotteryType == "hn4j1" && type=="R4C2")return "任4(2双重) "+hn4j1BetType+zhuijiaText;
    if(this.lotteryType == "hn4j1" && type=="R3")return "任3(单号) "+hn4j1BetType+zhuijiaText;
    if(this.lotteryType == "hn4j1" && type=="R3C3")return "任3(3重) "+hn4j1BetType+zhuijiaText;
    if(this.lotteryType == "hn4j1" && type=="R2C2")return "任2(双重) "+hn4j1BetType+zhuijiaText;
    if(this.lotteryType == "hn4j1" && type=="R2")return "任2(单号) "+hn4j1BetType+zhuijiaText;
    if(this.lotteryType == "hn4j1" && type=="R4C3")return "任4(3重) "+hn4j1BetType+zhuijiaText;
    if(this.lotteryType == "hn4j1" && type=="R4C1")return "任4(1双重) "+hn4j1BetType+zhuijiaText;
    if(this.lotteryType == "hn4j1" && type=="R3C2")return "任3(双重) "+hn4j1BetType+zhuijiaText;
    if(this.lotteryType == "hn4j1" && type=="D3")return "定位3 "+hn4j1BetType+zhuijiaText;
    if(this.lotteryType == "hn4j1" && type=="D2")return "定位2 "+hn4j1BetType+zhuijiaText;
    if(this.lotteryType == "hn4j1" && type=="D1")return "定位1 "+hn4j1BetType+zhuijiaText;
    if(type != "D" && zhushu==1)return "单式"+zhuijiaText;
    if(type != "D" && zhushu>1)return "复式"+zhuijiaText;


  }

  confirm.createBetList = function(){
    var html =  new Array();
    this.zhushuArr = new Array();
    for(var i=0,ilen=this.betAllData.length;i<ilen;i++){
      if(!this.betAllData[i])continue;
      var thisData = this.betAllData[i].split("|");
//	  //console.log(thisData);
      var thisLotteryPlay = thisData[thisData.length-2].replace(/\R$/,"");
//	  //console.log(thisLotteryPlay)
      var thisZhushu = thisData[thisData.length-1];

      this.zhushuArr[i] = thisZhushu;

      html.push('<div class="libox" data-i="'+i+'" data-v="'+this.betAllData[i]+'"><span class="del" data-t="del"><em class="icon"></em></span><p class="number font14">');

      var ballHtml = [];
      for(var k=0,klen=thisData.length-2;k<klen;k++){
        var ballData = thisData[k].split(",");
        if(confirm.checkDanPlay(thisLotteryPlay))var danBallHtml = [];
        var tuoBallHtml = [];
        $.each(ballData,function(i){
          if(confirm.checkDanPlay(thisLotteryPlay) && ballData[i].indexOf("d-")== 0){
            danBallHtml.push('<i>'+ballData[i].replace("d-","")+'</i>');
          }else{
			var tempHtml2 = ballData[i];
			if(confirm.lotteryType == ConfigObj.fastK3Type){   //快3
				//console.log(tempHtml2);
				if(thisLotteryPlay == 'TX'){
					tempHtml2 = '111/222/333/444/555/666';
				}else if(thisLotteryPlay == 'LTX'){
					tempHtml2 = '123/234/345/456';
				}else if(thisLotteryPlay == 'TXS2'){
					tempHtml2 = tempHtml2.replace(/1\+1/g,'1+1*');	
					tempHtml2 = tempHtml2.replace(/2\+2/g,'2+2*');	
					tempHtml2 = tempHtml2.replace(/3\+3/g,'3+3*');	
					tempHtml2 = tempHtml2.replace(/4\+4/g,'4+4*');	
					tempHtml2 = tempHtml2.replace(/5\+5/g,'5+5*');	
					tempHtml2 = tempHtml2.replace(/6\+6/g,'6+6*');	
				}
				tempHtml2 = tempHtml2.replace(/\+/g,'');
					
			}
            tuoBallHtml.push('<i>'+tempHtml2+'</i>');
          }
        });
        if(confirm.checkDanPlay(thisLotteryPlay) && danBallHtml.length){
		  if(this.lotteryType == ConfigObj.fastLotType || this.lotteryType == ConfigObj.fastK3Type ){  //高频
			  ballHtml.push('<span class="fontblack">('+danBallHtml.join("")+')</span><span class="'+this.ballClassName[k]+'"> '+tuoBallHtml.join("")+'</span>');
		  }else{
          	  ballHtml.push('<span class="'+this.ballClassName[this.lotteryMinNum.length]+'">('+danBallHtml.join("")+')</span><span class="'+this.ballClassName[k]+'"> '+tuoBallHtml.join("")+'</span>');
		  }
        }else{
          if(this.lotteryType == "hn4j1"){
            ballHtml.push('<span class="'+this.lotteryBallClassName[thisLotteryPlay][k]+'">'+tuoBallHtml.join("")+'</span>');
          }else{
            ballHtml.push('<span class="'+this.ballClassName[k]+'">'+tuoBallHtml.join("")+'</span>');
          }

        }
      }

      html.push(ballHtml.join('<em>|</em>'));

      html.push('</p><p class="zhushu font12"><span>'+this.getBetStype(thisLotteryPlay,thisZhushu)+'</span><span>'+thisZhushu+'注</span><span>'+(thisZhushu*this.lotteryOneMoney)+'元</span></p><span class="arrowbox" data-t="upd"><em class="rtarrow icon"></em></span></div>');
    }
    this.betListObj.html(html.join(""));
  }

  confirm.createSubData = function(){
    var zhushu = this.getZhushu();
    return {
      lotteryType : this.lotteryType.toUpperCase(),
      lotteryNo : this.lotteryNo,
      playType : this.checkedZJ ? 'append' : 'common',
      passType : '',
      wagerCount : zhushu,
      wagerMultiple : this.lotteryMul,
      consignType : 'alone',     // 购买：alone  保存：save
      wagerStore  : this.createSubBetData(),
      openType  : 'open',
      money  : zhushu*this.lotteryOneMoney*this.lotteryMul*this.lotteryPer,
      source : this.lotteryPer >1 ? this.lotteryPer : 1,
      manner : 1,
      planType : "FixedMultiple",
      stopType : this.checkedOver ? "OnePeriodHit" : "Over",
      prizeAmount : this.overNum,
    }
  }

  confirm.createSubBetData = function(){
    var data = [];
    for(var i=0,ilen=this.betAllData.length;i<ilen;i++){
      if(!this.betAllData[i])continue;
      var thisBetArr = this.betAllData[i].split("|");
      //console.log(thisBetArr)
      var betDataTem = [];
      var typeDataTem = [];
      for(var k=0,klen=thisBetArr.length;k<klen;k++){
        if(k>=klen-2){
          typeDataTem.push(thisBetArr[k]);
          continue;
        }
        var thisDArr = thisBetArr[k].split(",");
        var dVal = [];
        var tVal = [];
        for(var t=0,tlen=thisDArr.length;t<tlen;t++){
          if(thisDArr[t].indexOf("d-")>-1){
            dVal.push(thisDArr[t].replace("d-",""));
          }else if(thisDArr[t]==="-"){
            tVal.push("*");
          }else{
            tVal.push(thisDArr[t]);
          }
        }
        betDataTem.push(dVal+(dVal.length?"$":"")+tVal); 
      }
//	  //console.log(typeDataTem);
//	  //console.log(betDataTem);
	  if(this.lotteryType == ConfigObj.fastK3Type && typeDataTem[0] == 'TXD2'){
		 data.push(betDataTem.join(":")+"|"+typeDataTem.join("|"));
	  }else{
      	 data.push(betDataTem.join("+")+"|"+typeDataTem.join("|"));
	  }
    }
	if(this.lotteryType == ConfigObj.fastLotType || this.lotteryType == ConfigObj.fastK3Type){   //提交前清理私有胆拖判断数据 zhangw
		for(var i=0;i<data.length;i++){
			data[i] = data[i].replace('_D','');	
		}
	}
    return data.join(";");
  }
  
  confirm.setTemMulAndPer = function(){
    var temData = this.lotteryMul+"_"+this.lotteryPer;
    try{
      window.localStorage.setItem(this.lotteryType+"MulAndPer",temData);
    }catch(e){
     
    }
  }

  confirm.getTemMulAndPer = function(){
    if(window.localStorage && window.localStorage.getItem(this.lotteryType+"MulAndPer")){
      var temData = window.localStorage.getItem(this.lotteryType+"MulAndPer");
    }else{
      var temData = "1_1";
    }
    var dataArr = temData.split("_");
    this.lotteryMul = Number(dataArr[0]);
    this.lotteryPer= Number(dataArr[1]);

    this.mulInputObj.html(this.lotteryMul+"倍");
    this.perInputObj.html(this.lotteryPer+"期");

    this.checkedBetOver();
  }
  
  confirm.removeTipBg = function(){
	  if($('#confirm_upBGObj')){
		$('#confirm_upBGObj').remove();	  
	  }
  }
  
  confirm.createTipsBg = function(){
	if($('#confirm_upBGObj').length == 0){
		var bodyHeight = document.body.scrollHeight;
		var divObj = $('<div id="confirm_upBGObj" style="width: 100%; height: '+bodyHeight+'px; position: absolute; left: 0px; top: 0px; z-index: 98; background: transparent;" ></div>');
		$("body").append(divObj);
		divObj.tap(function(){
		   confirm.hidePerTips();
		   confirm.hideOverTips();
		   confirm.hideMulTips();
		   confirm.setMoneyDom();
		});
	}
  }
  
  /* -------------------------------------- app版本交易流程 ------------------------------------- */
  confirm.submitBet = function(){
	this.hidePerTips();
	this.hideMulTips();
	this.hideOverTips();
	this.setMoneyDom();
	/*if(this.lotteryPer > 1){
	  $.alertMsg("追号功能目前正在建设中");
	  return false;
	}*/
	if(!this.agrstate){
		$.alertMsg("请阅读并同意《旺旺中彩平台服务协议》");
		return false;
	}
	var self = this;
	var postData = this.createSubData();
	if(postData.wagerStore == "" || postData.wagerCount == 0){
      $.alertMsg('请至少选择1注号码');
      return false;
    }
    if(postData['wagerCount'] > this.maxZSVal){
      $.alertMsg('注数最多支持'+(this.maxZSVal/10000).toFixed(0)+'万注');
      return false;
    }
    if(postData['money'] > this.maxMoneyVal){
      $.alertMsg("投注金额最大支持"+(this.maxMoneyVal/10000)+"万元");
      return false;
    }
	var numLotArr = ['dlt','ssq','qxc','pl3','pl5','d3',ConfigObj.fastLotType,ConfigObj.fastK3Type,'hn4j1'];
	if($.inArray(this.lotteryType,numLotArr) != -1 ){ 
		var nowLotNo = this.updBetTipsObj.attr("data-no");
		if(nowLotNo && (nowLotNo != this.lotteryNo)){
			this.showUpdBetTips();
			return false;	
		}
	}
      if(loginObj.isLogin){  // 已经登录的情况，先生成pid,用pid去跳转到收银台。 createPid()->buyFun()->
		self.createPid();
	}else{                 //未登录，先生成wid,用wid生成pid, 用pid跳转收银台  
		self.createWid();  //createWid()-> afterLoginCreatePid()-> buyFun() -> 
	}
	self.showSlowLoading();
	Global.pv('zuodan_baocun',{lotteryType:confirm.lotteryType});
  }
  
   // 保存方式[例如广东体彩云] 
   /*confirm.buyFun = function(obj){
	   this.hideSlowLoading();
	   if(obj.product_type == 'project'){
			  var product_id = obj.product_id;
			  var typeCn = obj.lotteryTypeCn;
			  $.alertMsg('方案保存成功',true);
			  setTimeout(function(){
				  projectDetailObj.show('reload',function(){
					  projectDetailObj.getData(product_id); 
					  projectDetailObj.pushRoute(function(){
						  Global.backLottery(typeCn);
					  })
				  });
			  },1500)
	   }else if(obj.product_type == 'plan'){
		     var product_id = obj.product_id;
			 var typeCn = obj.lotteryTypeCn;
			 $.alertMsg('追号保存成功',true);
			 setTimeout(function(){
				 Global.GC();
				 planDetailObj.goBack = function(){
					Global.backLottery(typeCn);
				 }
				 planDetailObj.show('reload',function(){
					 planDetailObj.getData(product_id);
				 })
			 },1500)
	   }
   }*/
  
  //购买方式
  confirm.buyFun = function(obj){
	 var self = this;
	  /*if(ConfigObj.platForm == 'ios'){   //ios平台  
		  Global.iosBuy(obj);
	  }else{*/
		 buyConfirmObj.goBack=function(){
			switch(self.lotteryType){
				case 'dlt':
					dltObj.show('reload');
					break;
				case 'ssq':
					ssqObj.show('reload');
					break;	
				case 'pl3':
					pl3Obj.show('reload');
					break;
				case 'd3':
					d3Obj.show('reload');
					break;
				case 'pl5':
					pl5Obj.show('reload');
					break;
				case 'qxc':
					qxcObj.show('reload');
					break;
				case ConfigObj.fastLotType:
					fastBetObj.show('reload');
					break;
        case ConfigObj.fastK3Type:
            fastK3Obj.show('reload');
            break;
				case 'hn4j1':
					hn4j1Obj.show('reload');
					break;
				default:
					homeObj.show();
					break;	
			}
			self.destroy();
			buyConfirmObj.destroy();	
		}
		setTimeout(function(){
            buyConfirmObj.show(true, function () {
                buyConfirmObj.setData(obj);
            });
		},300)   //防止未登录流程多页面连续切换，由动画延迟导致的切换问题 zhangw
	  //}

      // 缓存购买数据
      if (obj['product_id']) Global.setCache('confirm_product', obj);
      if (obj['product_id']) Global.cache['confirm_product'] = obj;
  };
  
  //生成product_id ,跳转到支付确认页[buyConfirm]
  confirm.createPid = function(){
	  var postData = this.createSubData();
	  var self = this;
	  postData.channel_number = ConfigObj.zdid;
//	  console.log(postData);
	 	var secretData = {
	 		'para': Global.encrypt(postData),
	 		'access_token': loginObj.access_token
	 	}
    // console.log(secretData)
	  $.ajax({
		  url : ConfigObj.localSite +  '?version=1&m=lottery.lottery.numProcess',
		  data : secretData,
		  dataType : "json",
		  type : "post",
		  timeout: 5000, 
      beforeSend:function(){
        $('#confirm_slowLoading').show();
      },
		  success : function(obj){
        var data = '';
		  	// console.log(obj);
		      // 恢复付款按钮
          $('#createPid').attr('data-t','submit').removeClass('gray');
		      // $('#createPid').attr('data-t','submit').addClass('gray');
        // console.log(1192);

          // 隐藏加载层
          confirm.hideSlowLoading();

        if(obj.code == '0000'){
              	obj.info = $.parseJSON(Global.crypt(obj.info));
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
    						'lotteryNo' : self.lotteryNo, 
    						'product_id' : obj.info.productId,
    						'product_type': obj.info.productType,
    						'pay_amount': obj.info.money,
    						'assure_amount': -1
    					}
    				}
            if (data == '') {
              $.alertMsg('订单提交失败，请重新下单')
              confirm.goBack();
              return false;
            }else{
              self.buyFun(data);
            }
			}else if(obj.code==="-33333"){
					  obj.info = $.parseJSON(Global.crypt(obj.info));
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
  confirm.createWid = function(){
	  var self  =  this;
	  var postData = this.createSubData();
	  $.ajax({
		  url : ConfigObj.localSite +  '?version=1&m=lottery.trade.numProcess',
		  data : postData,
		  dataType : "json",
		  type : "post",
		  timeout: 5000, 
      beforeSend:function(){
        $('#confirm_slowLoading').show();
      },
		  success : function(obj){
        console.log(obj)
		      // 恢复付款按钮
              $('#confirm_submit').attr('data-t', 'submit').removeClass('gray');
              // console.log(1248)
              // 隐藏加载层
              confirm.hideSlowLoading();

              if(obj.code == '0000'){
				console.log('未登录的情况下做单生成wagerId', obj);
				self.wid = obj.info.wagerId;
				loginObj.goBack = function(){
					self.show();	
				}
        loginObj.goFrd=function(){
          if (obj.info.wagerId==undefined) {
                userCenterObj.show();
                // buyConfirmObj.hide()
                // console.log(1)
              }else{
                buyConfirmObj.show();
                // userCenterObj.hide();
                // console.log(2)
              }
        };
				loginObj.goForward = function(){
					//登录后创建pid 
					self.show();
					self.afterLoginCreatePid(self.wid,obj.info.productType);  
          console.log(self.wid) 
          // console.log(obj.info.productType)	 buyConfirm.show();  goForward
				}
				registerObj.goForward = function(){
          self.show();
          self.afterLoginCreatePid(self.wid,obj.info.productType);  
          // console.log(self.wid) 
          // console.log(obj.info.productType) 
				}
				$.alertMsg('请先登录');
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
			   $.alertMsg('请先登录');
			 	loginObj.show();
			}
		  }
    });  
  }
  
  //根据wagerId 生成 lotteryId
  confirm.afterLoginCreatePid = function(wid,type){
    // console.log(wid)
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
				// console.log('根据wagerId生成lotteryId', obj);
				
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
						'lotteryNo' : self.lotteryNo, 
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
  
  /* -------------------------------------- 合买 ------------------------------------- */
  
  confirm.goLogin = function () {
	    loginObj.goBack = function () {
	        userCenterObj.show(true);
	    };
	    loginObj.goForward = function () {
	        userCenterObj.show(true);
	    };
	    
	    loginObj.show(true);
	}
  
  confirm.hemai = function(){
  	
  	if(!loginObj.isLogin ){
			$.alertMsg("请先登录！",false)
			setTimeout(function(){
				confirm.goLogin();
			},2000);
			return false;	
		}
  	
  	var zhushu = this.getZhushu();
  	var subData = this.createSubData();
  	var postData = {
  		"totalMoney"  : zhushu*this.lotteryOneMoney*this.lotteryMul*this.lotteryPer,
  		"lotteryType" : this.lotteryType.toUpperCase(),
      "lotteryNo" : this.lotteryNo,
      "channel_number": ConfigObj.zdid
  	}
  	if(subData.source > 1){
  		$.alertMsg("追号不能发起合买",false);
  		return false;
  	};
  	if(this.createSubBetData() < 1){
  		$.alertMsg("请至少选择一注号码",false);
  		return false;
  	}
  	var secretData = {
	 		'para': Global.encrypt(postData),
	 		'access_token': loginObj.access_token
	 	}
  	
  	$.ajax({
				url: ConfigObj.localSite + '?version=1&m=lottery.lottery.initNumTogehterInfo',
				data: secretData,
				type: "post",
				dataType: "json",
				success: function (obj) {
					if(obj.code == "0000"){
						obj.info = $.parseJSON(Global.crypt(obj.info));
						hemaiObj.setData({
							"data":obj.info,
							"createSubData":subData
						});
						confirm.goHemai();
					}else{
						$.alertMsg(obj.code_str,false)
					}
				}
			})
  	
  	
		
  }
  
  confirm.goHemai = function(){
  	hemaiObj.goBack = function(){
			 hemaiObj.destroy();
			 confirm.show();
		 }
		 hemaiObj.show();
  }
  
  /* -------------------------------------- app版本交易流程 end ------------------------------------- */
  
  confirm.setData = function(obj){
  	//console.log(obj);
	 if(!obj) return;
//	 //console.log('数字彩确认页 setData', obj);
	 this.lotteryType = obj.lotteryType;
	 this.lotteryCnName = obj.lotteryCnName;
	 this.lotteryNo = obj.lotteryNo;
	 if(obj.lotteryPlay){
	 	this.lotteryPlay = obj.lotteryPlay;
		if(this.lotteryType == 'pl3' || this.lotteryType == 'd3'){  //以下子玩法机选1注会生成不规则的注数，不一定是1注，所以默认设为直选IP zhangw
			if(this.lotteryPlay == 'UP3' || this.lotteryPlay == 'UH3' || this.lotteryPlay == 'UH6' || this.lotteryPlay == 'IH' || this.lotteryPlay == 'UP6'){
				this.lotteryPlay = 'IP';
			}
		}
		if(this.lotteryType == 'dlt' || this.lotteryType == 'ssq'){  //大乐透定胆玩法没有机选
			this.lotteryPlay = 'P';	
		}
		if(this.lotteryType == ConfigObj.fastK3Type){   //快三
			if(this.lotteryPlay == 'TX'){
				this.lotteryPlay = 'TXD';	
			}
			if(this.lotteryPlay == 'BT3-LTX'){
				this.lotteryPlay = 'BT3';	
			}
			if(this.lotteryPlay == 'TXD2-TXS2'){
				this.lotteryPlay = 'TXD2';	
			}
			if(this.lotteryPlay == 'TXD-TX'){
				this.lotteryPlay = 'TXD';	
			}
		}
	 }
	
	 this.cnNameObj.html(obj.lotteryCnName);
	 /*if(this.lotteryType == 'pl3' || ConfigObj.syx5Type.indexOf(this.lotteryType) !== false || this.lotteryType == ConfigObj.fastLotType || this.lotteryType == 'hn4j1' || this.lotteryType == ConfigObj.fastK3Type){
		 if(this.setLotteryPlayData){   
			this.setLotteryPlayData(); //lotteryMinNum  lotteryBallNum lotteryBetVal 
		 }
	 }*/
   if(this.lotteryType == 'pl3' || this.lotteryType == ConfigObj.fastLotType || this.lotteryType == 'hn4j1' || this.lotteryType == ConfigObj.fastK3Type){
     if(this.setLotteryPlayData){   
      this.setLotteryPlayData(); //lotteryMinNum  lotteryBallNum lotteryBetVal 
     }
   }
  }
  
  //跳转到购彩协议页
  confirm.goProtocol = function(){
	 protocolObj.goBack = function(){
		 protocolObj.destroy();
		 confirm.show();
	 }
	 protocolObj.show();
  }
  
  confirm.showSlowLoading = function(){
	  if(this.lotteryPer > 100){
	  	$('#confirm_slowLoading').show(); 
	  }
  }
  
  confirm.hideSlowLoading = function(){
	  $('#confirm_slowLoading').hide();  
  }
  
  confirm.checkDanPlay = function(lotteryPlay){
	 var isDanPlay = false
	 if(lotteryPlay == 'D'){ //大乐透
		isDanPlay = true;
	 }else if(this.lotteryType == ConfigObj.fastLotType && lotteryPlay.indexOf('_D') != -1 ){  //高频
		isDanPlay = true;
	 }else if(this.lotteryType == ConfigObj.fastK3Type && lotteryPlay.indexOf('_D') != -1 ){  //快三
		isDanPlay = true; 
	 }
	 return isDanPlay;  
  }
  
  
  confirm.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();

    this.getSessionAllBetData();  //从本地读取上次的确认页数据
    this.createBetData();  //本次提交的数据加入
    this.createBetList();
    this.checkedBetTips();
    this.getTemMulAndPer();
    this.setMoneyDom();
    if(confirm.lotteryType == ConfigObj.fastK3Type || confirm.lotteryType == ConfigObj.fastLotType){
    	$('#confirm_openHm').hide();
    }
 
  }

 

  confirm.init = function(){
    this.setDefConfig();
    confirm.onloadExecution();
    
  }
  
  return confirm; 
}
