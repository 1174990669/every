
  var prizeToolObj = new PageController({
	   'name': 'prizeTool',
	   'tpl' : 'template/sporttery/prizeTool.html'  
  });
  
  prizeToolObj.createDom = function(){
    this.lotteryObj = $("#prizeTool_lotteryObj");
    this.betListObj = $("#prizeTool_betListObj .listObj");
    this.keyObj = $("#prizeTool_keyObj");
    this.setZsObj = $("#prizeTool .setZsObj");
    this.mulObj = $("#prizeTool_mulObj");
    this.moneyObj = $("#prizeTool_moneyObj");
    this.bounsObj = $("#prizeTool_bounsObj");
    this.setMoneyObj = $("#prizeTool_setMoneyObj");
    this.yhSub = $("#prizeTool_yhSub");
    this.danBounsObj = $("#prizeTool .danBounsObj");
		this.yhSub.addClass('disabled');
  }
//	prizeToolObj.baseMoney = prizeToolObj.moneyObj.val();
//	//console.log(prizeToolObj.baseMoney)
  prizeToolObj.createEvent = function(){
    this.lotteryObj.unbind('tap').tap(function(e){
      prizeToolObj.lotteryEvent(e);
    });

    this.setZsObj.unbind('keyup').keyup(function(){
      if(prizeToolObj.jctoolMoney!=prizeToolObj.checkUpdMoney){
        return false;
      }
      if(this.value==="")return false;
      var thisI = Number($(this).attr("data-i"));
      if(isNaN(this.value)){
        this.value = prizeToolObj.betListObj.eq(thisI).attr("data-z");
      }
      if(this.value>999)this.value=999;
      prizeToolObj.betListObj.eq(thisI).attr("data-z",this.value);
      prizeToolObj.updBounsVal(thisI);
      prizeToolObj.getBetMoney();
      prizeToolObj.getBounsVal();
    });

    this.setZsObj.unbind('blur').blur(function(){
      if(prizeToolObj.jctoolMoney!=prizeToolObj.checkUpdMoney){
        $.alertMsg("计划投注金额已经变动，请重新优化后再修改。");
        this.value=0;
        return false;
      }
      if(this.value==="")this.value=1;
      var thisI = Number($(this).attr("data-i"));
      prizeToolObj.betListObj.eq(thisI).attr("data-z",this.value);
      prizeToolObj.updBounsVal(thisI);
      prizeToolObj.getBetMoney();
      prizeToolObj.getBounsVal();
    });

    this.yhSub.unbind('tap').tap(function(){
      prizeToolObj.updateData();
    });
  }

  prizeToolObj.lotteryEvent = function(e){
    var aObj = $.oto_checkEvent(e,"A");
    if(aObj){
      var thisObj = $(aObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "subData" : prizeToolObj.disableBtn(thisObj);prizeToolObj.subData();return true;
      }
    }
    var spanObj = $.oto_checkEvent(e,"SPAN");
    if(spanObj){
      var thisObj = $(spanObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "showSetMoney" : prizeToolObj.showSetMoney(thisObj);return true;
        case "showSetDZ" : prizeToolObj.showSetDZ(thisObj);return true;
        case "key" : prizeToolObj.setVal(thisObj);return true;
        case "delkey" : prizeToolObj.delVal(thisObj);return true;
        case "hidekey" : prizeToolObj.hideSetMoney(thisObj);prizeToolObj.updateData();return true;
        case "redu" : prizeToolObj.redu(thisObj);return true;
        case "addVal" : prizeToolObj.addVal(thisObj);return true;
        case "reduM" : prizeToolObj.reduM(thisObj);return true;
        case "addM" : prizeToolObj.addM(thisObj);return true;
        case "reduMoney" : prizeToolObj.reduMoney(thisObj);return true;
        case "addMoney" : prizeToolObj.addMoney(thisObj);return true;
        case "showMul" : prizeToolObj.showMul(thisObj);return true;
      }
    }
    var pObj = $.oto_checkEvent(e,"P");
    if(pObj){
      var thisObj = $(pObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "back" : prizeToolObj.goBack();return true;
        case "help" : prizeToolObj.goHelp();return true;
      }
    }
    var liObj = $.oto_checkEvent(e,"LI");
    if(liObj){
      var thisObj = $(liObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "updateType" : prizeToolObj.updateType(thisObj);return true;
      }
    }
  }
  
  prizeToolObj.disableBtn = function(btn){
	 btn.removeAttr('data-t').addClass('gray');  
	 setTimeout(function(){
			btn.attr('data-t','subData').removeClass('gray'); 
	 },2500)
  }

  prizeToolObj.updateType = function(obj){
    var thisV = obj.attr("data-v");
    if(thisV!="avg" && (this.passType.split(",").length>1 || this.matches.split(";").length > this.passType.split("_")[0])){
      $.alertMsg("风险最小/奖金最高优化不支持组合过关");
      return false;
    }
     if(this.jctoolMoney<this.money){
      $.alertMsg("优化金额必须大于原始单金额");
      return false;
    }
    obj.siblings('li').removeClass('on');
    obj.addClass('on');

    this.optimizeType = thisV;
    this.updateData();
  }

  prizeToolObj.updateData = function(){
	 var self = this;
	 if(this.jctoolMoney<this.money){
      	//$.alertMsg("优化金额必须大于原始单金额");
      	//return false;
		this.jctoolMoney = this.money;
     }
	 if(self.jctoolMoney % 2 != 0){
		 self.jctoolMoney = self.jctoolMoney -1;
	 }
	 self.setMoneyObj.html(self.jctoolMoney);
	 var postData = {
		lotteryType : self.lotteryType,
		lotteryNo : self.lotteryNo,
		passType : self.passType,
		wagerCount : self.wagerCount,
		wagerMultiple : self.wagerMultiple,
		matches : self.matches,
		matchOrder : self.matchOrder,
		absMatchOrder : self.absMatchOrder,
		money : self.money,
		jctoolMoney : self.jctoolMoney,
		checkUpdMoney : self.checkUpdMoney,
		optimizeType : self.optimizeType,
		manner : self.manner 
		  
	 }
	 prizeToolObj.getData(postData);
  }

  prizeToolObj.showSetMoney = function(obj){
    this.hideSetMoney();
    this.showMoneyObj = obj;
    this.keyObj.show();
    obj.addClass('fontblue');
    this.addBgLayer();
  }

  prizeToolObj.showSetDZ = function(obj){
    this.hideSetMoney();
    this.showMoneyObj = obj;
    this.keyObj.show();
    obj.addClass('fontblue');
    this.addBgLayer();
  }

  prizeToolObj.showMul = function(obj){
    this.hideSetMoney();
    this.showMoneyObj = obj;
    this.keyObj.show();
    obj.addClass('fontblue');
    this.addBgLayer();
  }

  prizeToolObj.hideSetMoney = function(){
    if(!this.showMoneyObj)return false;
    this.keyObj.hide();
    this.showMoneyObj.removeClass('fontblue');
    $('#prizeTool_bgLayer').remove();
    this.showMoneyObj = "";
	this.setMoneyObj.attr('data-newS',1);
	this.mulObj.attr('data-newS',1);
  }

  prizeToolObj.setVal = function(obj){
    var thisV = obj.attr("data-v");
    var thisT = this.showMoneyObj.attr("data-t");
    switch(thisT){
      case "showSetMoney" : this.setMoneyVal(thisV);return true;
      case "showSetDZ" : this.setDZVal(thisV);return true;
      case "showMul" : this.setMulVal(thisV);return true;
    }
  }

  prizeToolObj.delVal = function(obj){
    var thisV = obj.attr("data-v");
    var thisT = this.showMoneyObj.attr("data-t");
    switch(thisT){
      case "showSetMoney" : this.delMoneyVal(thisV);return true;
      case "showMul" : this.delMulVal(thisV);return true;
    }
  }

  prizeToolObj.checkMoney = function(){
    if(this.jctoolMoney!=this.checkUpdMoney){
      this.yhSub.removeClass('disabled');
      for(var i=0,ilen=this.setZsObj.length;i<ilen;i++){
        this.setZsObj.eq(i).val(0);
        this.betListObj.eq(i).attr("data-z",0);
        this.updBounsVal(i);
      }
    }else{
      this.yhSub.addClass('disabled');
      for(var i=0,ilen=this.setZsObj.length;i<ilen;i++){
        var oldZ = this.betListObj.eq(i).attr("data-oldZ");
        this.setZsObj.eq(i).val(oldZ);
        this.betListObj.eq(i).attr("data-z",oldZ);
        this.updBounsVal(i);
      }
    }
    this.getBetMoney();
    this.getBounsVal();
  }

  prizeToolObj.setMoneyVal = function(thisV){
	var thisS = this.showMoneyObj.attr("data-newS");
    if(thisS=="1"){
      var newMoney =  Number(thisV);
      this.showMoneyObj.attr("data-newS","0");
    }else{
      var newMoney = Number(this.jctoolMoney + "" + thisV);
    }
    this.jctoolMoney = Number(newMoney);
	if(this.jctoolMoney > 500000){
		this.jctoolMoney = 500000;
	}
    this.showMoneyObj.html(this.jctoolMoney);
    this.checkMoney();
  }

  prizeToolObj.delMoneyVal = function(thisV){
    this.jctoolMoney = Number(this.jctoolMoney.toString().slice(0,-1));
    this.showMoneyObj.html(this.jctoolMoney);
    this.checkMoney();
  }

  prizeToolObj.setDZVal = function(thisV){
    var thisI = Number(this.showMoneyObj.attr("data-i"));
    var thisListObj = this.betListObj.eq(thisI);
    var thisZS = thisListObj.attr("data-z");
    thisZS += thisV.toString();
    thisListObj.attr("data-z",thisZS);
    this.showMoneyObj.html(thisZS+"注");
  }

  prizeToolObj.setMulVal = function(thisV){
	var thisS = this.mulObj.attr("data-newS");
    if(thisS=="1"){
      var newMul =  Number(thisV);
      this.mulObj.attr("data-newS","0");
    }else{
      var newMul = Number(this.wagerMultiple + "" + thisV);
    }
    this.wagerMultiple = Number(newMul);
	if(this.wagerMultiple > 10000){
		this.wagerMultiple = 10000	
	}
    this.showMoneyObj.html(this.wagerMultiple+"倍");
    this.getBetMoney();
    this.getBounsVal();
  }

  prizeToolObj.delMulVal = function(thisV){
    this.wagerMultiple = Number(this.wagerMultiple.toString().slice(0,-1));
	if(this.wagerMultiple == 0){
		this.wagerMultiple = 1;	
	}
    this.showMoneyObj.html(this.wagerMultiple+"倍");
    this.getBetMoney();
    this.getBounsVal();
  }

  prizeToolObj.redu = function(obj){
    if(this.jctoolMoney!=this.checkUpdMoney){
      $.alertMsg("计划投注金额已经变动，请重新优化后再修改。");
      return false;
    }
    var thisI = Number(obj.attr("data-i"));
    var thisListObj  = this.betListObj.eq(thisI);
    var thisSetZsObj = this.setZsObj.eq(thisI);
    var thisZ = Number(thisListObj.attr("data-z"));
    var newData = thisZ-1;
    if(newData<=0)newData=1;
    thisListObj.attr("data-z",newData);
    thisSetZsObj.val(newData);
    this.updBounsVal(thisI);
    this.getBetMoney();
    this.getBounsVal();
  }

  prizeToolObj.addVal = function(obj){
    if(this.jctoolMoney!=this.checkUpdMoney){
      $.alertMsg("计划投注金额已经变动，请重新优化后再修改。");
      return false;
    }
    var thisI = Number(obj.attr("data-i"));
    var thisListObj  = this.betListObj.eq(thisI);
    var thisSetZsObj = this.setZsObj.eq(thisI);
    var thisZ = Number(thisListObj.attr("data-z"));
    var newData = thisZ+1;
    if(newData>999)newData=999;
    thisListObj.attr("data-z",newData);
    thisSetZsObj.val(newData);
    this.updBounsVal(thisI);
    this.getBetMoney();
    this.getBounsVal();
  }

  prizeToolObj.reduM = function(){
    var newData = this.wagerMultiple-1;
    if(newData<=0)newData=1;
    this.wagerMultiple = newData;
    this.mulObj.html(this.wagerMultiple+"倍");
    this.getBetMoney();
    this.getBounsVal();
  }

  prizeToolObj.addM = function(){
   var newData = this.wagerMultiple+1;
    if(newData>999)newData=999;
    this.wagerMultiple = newData;
    this.mulObj.html(this.wagerMultiple+"倍");
    this.getBetMoney();
    this.getBounsVal();
  }

  prizeToolObj.reduMoney = function(){
    var newData = this.jctoolMoney-this.upStepNum;
    if(newData<=this.money)newData=this.money;
    this.jctoolMoney = newData;
    this.setMoneyObj.html(this.jctoolMoney);
    this.checkMoney();
  }

  prizeToolObj.addMoney = function(){
    var newData = this.jctoolMoney+this.upStepNum;
    if(newData>500000)newData=this.checkUpdMoney;
    this.jctoolMoney = newData;
    this.setMoneyObj.html(this.jctoolMoney);
    this.checkMoney();
  }

  prizeToolObj.updBounsVal = function(i){
    var noteval = this.betListObj.eq(i).attr("data-noteval");
    var zs = this.betListObj.eq(i).attr("data-z")
    this.betListObj.eq(i).attr("data-totalval",(Number(zs)*Number(noteval)).toFixed(2));
    this.danBounsObj.eq(i).html((Number(zs)*Number(noteval)).toFixed(2));
  }

  prizeToolObj.getBetMoney = function(){
    var zs = 0;
    for(var i=0,ilen=this.betListObj.length;i<ilen;i++){
      var thisListObj = this.betListObj.eq(i);
      var thisZ = thisListObj.attr("data-z");
      zs+=Number(thisZ);
    }
    this.moneyObj.html(zs*2*this.wagerMultiple);
	return  zs*2*this.wagerMultiple;
  }

  prizeToolObj.getBounsVal = function(){
    var temTeamval = new Array();
    var tembouns = new Array();
    var maxBonus = [];
    var minbouns = new Array();
    var maxbounsVal = 0;
    for(var k in this.lineGroup){
      var thisGroup = this.lineGroup[k];
      var zhbouns = new Array();
      for(var i=0,ilen=this.betListObj.length;i<ilen;i++){
        if(!temTeamval[i]){
          temTeamval[i] = this.betListObj.eq(i).attr("data-teamval");
          tembouns[i] = this.betListObj.eq(i).attr("data-totalval");
          minbouns.push(tembouns[i]);
        }
        if(this.isMaxbouns(thisGroup,temTeamval[i])){
          zhbouns.push(tembouns[i]);
        }
      }
      var bounsVal = eval(zhbouns.join("+"));
      if (bounsVal > maxbounsVal) {
        maxbouns = zhbouns;
        maxbounsVal = bounsVal;
      }
    }
    var minbouns = eval("Math.min("+minbouns.join(",")+")");
    this.bounsObj.html("预计奖金"+(minbouns*this.wagerMultiple).toFixed(2)+"~"+(maxbounsVal*this.wagerMultiple).toFixed(2)+"元");
  }

  prizeToolObj.isMaxbouns = function(bounsTeamVal, thisTeamval) {
    var thisTeamArr=thisTeamval.split(";");
    for(var i=0,ilen=thisTeamArr.length;i<ilen;i++){
      if(bounsTeamVal.indexOf(thisTeamArr[i]) < 0)return false;
    }
    return true;
  }
  
  prizeToolObj.subData = function(){
  	//console.log(this.jctoolMoney,this.checkUpdMoney)
    if(this.jctoolMoney!= this.checkUpdMoney){
      $.alertMsg("计划投注金额已经变动，请重新优化后再投注。");
      return false;
    }
	if(this.getBetMoney() > 500000){
		$.alertMsg('金额不能超过500000');
		return false;	
	}
	  var self = this;
	  if(loginObj.isLogin){
		  self.subDataFun();
	  }else{
		 loginObj.goBack = function(){
			 self.show();
		 }
		 loginObj.goForward = function(){
			 self.show(); 
		 }
		 loginObj.show();  
	  }
  }

  prizeToolObj.subDataFun = function(){
	var self = this;
    var data = new Array();
    for(var i=0,ilen=this.betListObj.length;i<ilen;i++){
      var thisV = this.betListObj.eq(i).attr("data-teamval");
      var thisZ = this.betListObj.eq(i).attr("data-z");
      data.push(thisV+"|"+thisZ);
    }
    var postData = {
		lotteryType : self.lotteryType,
		lotteryNo : self.lotteryNo,
		passType : self.passType,
		wagerCount : self.wagerCount,
		wagerMultiple : self.wagerMultiple,
		matches : self.matches,
		matchOrder : self.matchOrder,
		absMatchOrder : self.absMatchOrder,
		money : self.money,
		jctoolMoney : self.getBetMoney(),
		checkUpdMoney : self.checkUpdMoney,
		optimizeType : self.optimizeType,
		manner : self.manner,
		consignType : 'alone',     //广东体彩云改为保存  购买：alone  保存：save  
	 }
    
    postData['toolMatches'] = data.join("#");
    postData.channel_number = ConfigObj.zdid;
    var secretData = {
    	'para': Global.encrypt(postData),
    	'access_token': loginObj.access_token
    }
    $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=lottery.lottery.sportteryprocess',
      data : secretData,
      dataType : "json",
      type : "post",
      success : function(obj){  
        if(obj.code == '0000'){
        	obj.info = $.parseJSON(Global.crypt(obj.info));
         	var data = {
				'lotteryType': self.lotteryType, 
				'product_id' : obj.info.lotteryId,
				'pay_amount': obj.info.money	
			}
			self.buyFun(data);
        }else{
          $.alertMsg(obj.code_str);
        }
      } 
    });
  }
   
   //保存
   /*prizeToolObj.buyFun = function(obj){
		var product_id = obj.product_id;
		var typeCn = obj.lotteryTypeCn;
		$.alertMsg('方案保存成功',true);
		setTimeout(function(){
			Global.GC();
			projectDetailObj.goBack = function(){
				Global.backLottery(typeCn);
			}
			projectDetailObj.show('reload',function(){
				projectDetailObj.getData(product_id); 
			});
		},1500)   
   }*/
  
  
   //购买
  prizeToolObj.buyFun = function(data){
	  var self = this;
	  buyConfirmObj.goBack = function(){
		  prizeToolObj.show();	
		  buyConfirmObj.destroy();
	  }
	  buyConfirmObj.show('reload', function(){
		  buyConfirmObj.setData(data);	
	  }); 
  }

  prizeToolObj.addBgLayer = function(){
    var bg = '<div style="width:100%;height:100%;background:transparent;position:absolute;left:0;top:0;z-index:98" id="prizeTool_bgLayer"></div>';
    if($('#prizeTool_bgLayer').length == 0){
      $(this.lotteryObj).append(bg);
      $('#prizeTool_bgLayer').css({'height':document.documentElement.scrollHeight || document.body.scrollHeight})
      $('#prizeTool_bgLayer').tap(function(){
        prizeToolObj.hideSetMoney();
      })
    }
  }
  
  prizeToolObj.formatHtml = function(){
	   
  }
  
  prizeToolObj.onloadExecution = function(){
	  	var self = this;
	 	self.createDom();
    	self.createEvent();
		self.getBetMoney();
    	self.getBounsVal();
		
  }


  prizeToolObj.init = function(){
    this.setDefConfig();
  }
  
  prizeToolObj.setDefConfig = function(){
  	this.showMoneyObj = "";
	this.lotteryType = 'FTFH';
	this.lotteryNo = '';
	this.passType = '';
	this.wagerCount = '';
	this.wagerMultiple = '';
	this.matches = '';
	this.matchOrder = '';
	this.absMatchOrder = '';
	this.money = '';
	this.jctoolMoney = '';
	this.checkUpdMoney = '';
	this.optimizeType = '';
	this.lineGroup = '';
	this.manner = '';
  }
  
  prizeToolObj.formatHtmlA = function(obj){
	  var html = '<span class="fl w30">已选'+ obj.matchOrder.split(',').length + '场比赛</span>'+
				 '<span class="fr w70 right">' + obj.passTypeCn + '</span>';
	  $('#prizeTool_wrapA').html(html);
	  $('#prizeTool_setMoneyObj').html(obj.jctoolMoney);
	  var arr = $('#prizeTool li[data-t="updateType"]');
	  for(var i=0;i<arr.length;i++){
		 if($(arr[i]).attr('data-v') == obj.optimizeType){
			 $(arr[i]).addClass('on');
		 }else{
			 $(arr[i]).removeClass('on');
		 }
	  }
  }
  
  prizeToolObj.formatHtmlB = function(obj){
	   var html =  '';
	   for(var i=0;i<obj.optimizeList.length;i++){
		   var itm = obj.optimizeList[i];
		   html += '<div class="p_item listObj" data-teamval="'+ itm.betStr + '" data-noteval="' + itm.money + '" data-totalval="'+ itm.theoreticalBonus + '" data-z="' + itm.betNum + '" data-oldZ="' + itm.betNum + '">'+
					'<div class="clearfix center">'+
						'<div class="fl w10">'+
							'<em class="num">' + (i + 1) + '</em>'+
							'<p>' + itm.passType + '</p>'+
						'</div>'+
						'<div class="fl w90 mb5">';
							for(var j=0;j<itm.list.length;j++){
								var info = itm.list[j];
								html += '<div class="p_dz clearfix">'+
											'<span class="gray fl font12 w18">'+ info.oidCn + '</span>'+
											'<p class="fl w50 p_team clearfix">'+
												'<span class="w45">' + info.homeName + '</span>'+
												'<em class="gray w10">VS</em>'+
												'<span class="w45">'+ info.awayName + '</span></p>'+
											'<p class="fl w32">'+
												'<span>'+ info.betConCn + (info.rq ? '(<em class="fontred">' + info.rq + '</em>)' : '') + info.odds + '</span>'+
											'</p>'+
										'</div>'
							}
		  html +=	  '</div>'+
					'</div>'+
					'<div class="p_yc clearfix">'+
						'<span class="fl gray mt5">预计奖金<em class="fontred danBounsObj">'+ itm.theoreticalBonus + '</em>元</span>'+
						'<div class="fr w50">'+
							'<p class="inputbox"><span data-t="redu" data-i="'+ i + '" class="ipt-span s1">－</span>'+
							'<input class="ipt-span s2 setZsObj" type="tel" value="'+ itm.betNum + '" data-i="'+ i +'">'+
							'<span class="ipt-span s3" data-t="addVal" data-i="'+ i + '">＋</span>'+
							'</p><em> 注</em>'+
						'</div>'+
					'</div>'+
				'</div>';
	   } 
	   $('#prizeTool_wrapB').html(html);
  }
  
  prizeToolObj.setData = function(obj){
	    this.lotteryType = obj.lotteryType;
		this.lotteryNo = obj.lotteryNo;
		this.passType = obj.passType;
		this.wagerCount = obj.wagerCount;
		this.wagerMultiple = obj.wagerMultiple;
		this.matches = obj.matches;
		this.matchOrder = obj.matchOrder;
		this.absMatchOrder = obj.absMatchOrder;
		this.money = parseInt(obj.money,10);  
		this.jctoolMoney = parseInt(obj.jctoolMoney, 10);
		this.checkUpdMoney = parseInt(obj.jctoolMoney, 10);
		this.upStepNum = 2 //跨度暂时改为2而不是动态的
		this.optimizeType = obj.optimizeType;
		this.lineGroup = eval( '(' + obj.lineGroup + ')');
		//this.manner = obj.manner;   //接口有问题，传过去manner=2 ,返回却是1，因此不采用这个接口返回manner值。
  }
  
  
  prizeToolObj.getData = function(postData){
	  var self = this;
	  self.manner = postData.manner;
	  var secretData = {
	  	'para':Global.encrypt(postData)
	  }
	  $.ajax({
		  url : ConfigObj.localSite +  '?version=1&m=Lottery.Jctool.prizereview',
		  data : secretData,
		  dataType : "json",
		  type : "post",
		  success : function(obj){
		  	
			//console.log('奖金优化初始化',obj);
			if(obj.code == '0000'){
				obj.info = $.parseJSON(Global.crypt(obj.info));
				self.setData(obj.info);
				prizeToolObj.formatHtmlA(obj.info);
				prizeToolObj.formatHtmlB(obj.info);
				self.onloadExecution();
			}else{
			   $.alertMsg(obj.code_str);
			   setTimeout(function(){
			   	  prizeToolObj.goBack();
			   },1000)
			}
		  }
    }); 
  }
  
  prizeToolObj.goHelp = function(){
	 helpDetailObj.goBack = function(){
		helpDetailObj.destroy();
		prizeToolObj.show(); 
	 }
	 helpDetailObj.show('reload',function(){
		helpDetailObj.setData('prizetool'); 
	 })
  }

