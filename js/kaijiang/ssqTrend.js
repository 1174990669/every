
  var ssqTrendObj = new PageController({
	   'name': 'ssqTrend',
	   'tpl' : 'template/kaijiang/ssqTrend.html'  
  });

  ssqTrendObj.setDefConfig = function(){
	  ssqTrendObj.titleWidth = 17.5/100;
	  ssqTrendObj.clientWidth = (document.documentElement.clientWidth || document.body.clientWidth).toFixed(2);
	  ssqTrendObj.clientHeight = (document.documentElement.clientHeight || document.body.clientHeight).toFixed(2);
	  ssqTrendObj.conWidth = Number((Number(ssqTrendObj.clientWidth) * (1-ssqTrendObj.titleWidth)).toFixed(2));
	  ssqTrendObj.conHeight = Number(ssqTrendObj.clientHeight-101-78);
	  ssqTrendObj.maxPage = 0;
	  ssqTrendObj.page = 0;
	  ssqTrendObj.borderWidth = 1;
	
	  ssqTrendObj.titleIscroll = "";
	  ssqTrendObj.listTitleIscroll = "";
	  ssqTrendObj.listIscroll = "";
	  ssqTrendObj.temTrendData = "";
	  ssqTrendObj.temLRTrendData = "";
	  ssqTrendObj.temSortDom = "";
	
	  ssqTrendObj.selectBetData = new Array();
	
	  ssqTrendObj.postData = {
		num : 50,
		showYL : "show",
		statistics : "show",
		lottery_type : "ssq",
    	trendType : "P",
		trendName : "HM",
		lotteryNoVal : ""
	  }  
	  
  }

  ssqTrendObj.betNumData = {
     P : [6,1]
  }

  ssqTrendObj.betData = {
      P : new Array(new Array("01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33"),new Array("01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16"))
  }

  ssqTrendObj.betTitle = {
    P : ["红球","红球","红球","蓝球","蓝球"]
  }

  ssqTrendObj.HMTitleData = ssqTrendObj.betData;

  ssqTrendObj.YLTitleData = {
     P : new Array(new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出"))
  }

  ssqTrendObj.LRTitleData = {
     P : new Array(new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏"))
  }

  ssqTrendObj.YLSortKey = {
      P : new Array(new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"))
  }

  ssqTrendObj.LRSortKey = {
     P : new Array(new Array("30","50","100","miss"),new Array("30","50","100","miss"))
  }

  ssqTrendObj.HMTitleClass = {
       P : new Array("trend_num fontred","trend_num fontred tn2","trend_num fontred tn3","trend_num fontblue tn4","trend_num fontblue tn4")
  }

  ssqTrendObj.YLTitleClass = {
       P : new Array("trend_num trend_yl","trend_num trend_yl fontred tn2")
  }

  ssqTrendObj.LRTitleClass = ssqTrendObj.YLTitleClass;

  ssqTrendObj.HMTitleFirst = {
      P : ["红球>","红球>","红球>","蓝球>","蓝球>"]
  }

  ssqTrendObj.YLTitleFirst = {
     P : ["红球<i>↑</i>","蓝球<i>↑</i>"]
  }

  ssqTrendObj.LRTitleFirst = ssqTrendObj.YLTitleFirst;

  ssqTrendObj.YLExplainData = [
    {title:"最大遗漏",con:"统计期内遗漏的最大值"},
    {title:"上次遗漏",con:"指号码自上次开出前的遗漏次数"},
    {title:"当期遗漏",con:"指号码自上次开出后的遗漏次数"},
    {title:"欲出几率",con:"当期遗漏÷平均遗漏×100"}
  ];

  ssqTrendObj.LRExplainData = [
    {title:"热号",con:"统计期内出现次数多的为热号"},
    {title:"冷号",con:"统计期内出现次数少的为冷号"},
    {title:"次数",con:"指号码统计期内出现的次数"},
    {title:"遗漏",con:"指号码自上次开出后的遗漏次数"}
  ];


  ssqTrendObj.createDom = function(){
    this.lotteryObj = $("#ssqTrend_lotteryObj");
    this.playTitleObj = $("#ssqTrend_playTitleObj");
    this.updataPlayObj = $("#ssqTrend_updataPlayObj");
    this.setObj = $("#ssqTrend_setObj");
    this.titleFirstObj = $("#ssqTrend_titleFirstObj");
    this.titleConObj = $("#ssqTrend_titleConObj");
    this.listFirstObj = $("#ssqTrend_listFirstObj");
    this.listConObj = $("#ssqTrend_listConObj");
    this.betFirstObj = $("#ssqTrend_betFirstObj");
    this.betConObj = $("#ssqTrend_betConObj");
    this.explainObj = $("#ssqTrend_explainObj");
    this.betObj = $("#ssqTrend_betObj");
    this.selectObj = $("#ssqTrend_selectObj");
    this.betMoneyObj = $("#ssqTrend_betMoneyObj");
    this.qhObj = $("#ssqTrend_qhObj");
    this.subObj = $("#ssqTrend_subObj");
    this.bottomHeightObj = $("#ssqTrend_bottomHeightObj");
  }

  ssqTrendObj.createEvent = function(){
    this.lotteryObj.unbind('tap').tap(function(e){
      ssqTrendObj.lotteryEvent(e);
    });
  }

  ssqTrendObj.lotteryEvent = function(e){
    var aObj = $.oto_checkEvent(e,"A");
    if(aObj){
      var thisObj = $(aObj);
      var thisT = thisObj.attr("data-t");
      switch (thisT){
        case "resSet" : this.hideSet();return true;
        case "subSet" : this.subSet();return true;
      }
    }

    var spanObj = $.oto_checkEvent(e,"SPAN");
    if(spanObj){
      var thisObj = $(spanObj);
      var thisT = thisObj.attr("data-t");
      switch (thisT){
        case "showupdplay" : this.showUpdPlay(thisObj);return true;
        case "showSet" : this.showSet(thisObj);return true;
        case "sortDom" : this.sortDom(thisObj);return true;
        case "bet" : this.betNum(thisObj);this.createSelectBetDom();this.createMoneyDom();return true;
        case "updateData" :this.updateData(thisObj);
      }
    }

    var pObj = $.oto_checkEvent(e,"P");
    if(pObj){
      var thisObj = $(pObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "back" : ssqTrendObj.goBack();return true;
        case "updatelottery" : ssqTrendObj.updatelottery(thisObj);return true;
        case "subData" : ssqTrendObj.subData(thisObj);return true;
        case "delAll" : ssqTrendObj.delAll();this.createSelectBetDom();this.createMoneyDom();return true;
      }
    }

    var liObj = $.oto_checkEvent(e,"LI");
    if(liObj){
      var thisObj = $(liObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "updateTrendName" : ssqTrendObj.updateTrendName(thisObj);return true;
      }
    }

    var divObj = $.oto_checkEvent(e,"DIV");
    if(divObj){
      var thisObj = $(divObj);
      var thisT = thisObj.attr("data-t");
      if(thisObj[0].id!="ssqTrend_setObj")return false;
      ssqTrendObj.hideSet();
    }
  }

  ssqTrendObj.showUpdPlay = function(obj){
    if(Number(obj.attr("data-s"))){
      this.updataPlayObj.hide();
      obj.attr("data-s",0);
    }else{
      this.updataPlayObj.show();
      obj.attr("data-s",1);
    } 

    var bodyHeight = document.body.scrollHeight;
    var divObj = $('<div id="ssqTrend_upBGObj" style="width: 100%; height: '+bodyHeight+'px; position: absolute; left: 0px; top: 0px; z-index: 98; background: transparent;" ></div>');
    $("body").append(divObj);
    divObj.tap(function(){
      ssqTrendObj.updataPlayObj.hide();
      ssqTrendObj.playTitleObj.attr("data-s","0");
      divObj.remove();
    });
  }
	
  ssqTrendObj.ajaxGetData = function(){
  	var secretData = {
			'para' : Global.encrypt(this.postData)
		};
    $.ajax({
       url : ConfigObj.localSite +  '?version=1&m=Lottery.ssq.getChartData',
      data : secretData,
      type : "post",
      dataType : "json",
      success : function(msg){
		//console.log('双色球获取走势数据[ssqTrend]',msg);
        if(msg.code == "0000"){
         	//if(msg.trendType!=ssqTrendObj.postData.trendType)return false;  //todo zhangw
         	msg.info = $.parseJSON(Global.crypt(msg.info));
			ssqTrendObj.temTrendData = msg.info;
        	ssqTrendObj.createPageData();
        	ssqTrendObj.createDataDom();
        }else{
		    $.alertMsg(msg.code_str);
            return false;
		}
       
      }
    });
  }
  
  ssqTrendObj.createFormatData = function(data){
    if(this.postData['trendType']!="P" || this.postData['trendName']!="HM")return data;
    var listData = new Array();

    listData.push(data[0].slice(0,12));
    listData.push(data[0].slice(12,24));
    listData.push(data[0].slice(24,35));
    listData.push(data[1].slice(0,8));
	listData.push(data[1].slice(8,16));
	////console.log(listData);
    return listData;
  }

  ssqTrendObj.createFormatI = function(i){
    if(this.postData['trendType']!="P")return i;
	switch(this.postData['trendName']){
		case 'HM':
			return i<3 ? 0 : 1;
		case 'YL':	
			return i>0 ? 1 : 0;
		case 'LR':
			return i>0 ? 1 : 0;
	}		
	
  }

  ssqTrendObj.createFormatKey = function(i,k){
	////console.log(i,k);
    if(this.postData['trendType']!="P")return k;
	if(this.postData['trendName'] == 'HM'){
		switch(i){
		  case 0 : return k;
		  case 1 : return 12+k;
		  case 2 : return 24+k;
		  case 3 : return k;
		  case 4 : return 8+k;
		}
	}else if(this.postData['trendName'] == 'YL' || this.postData['trendName'] == 'LR' ){
		switch(i){
		  case 0 : return k;
		  case 1 : return k;
		}	
	}
  }

  ssqTrendObj.createFormatPage = function(p,type){
    if(this.postData['trendType']!="P")return p;
    if(this.postData['trendName']!="YL" && this.postData['trendName']!="LR")return 5;
    if(this.postData['trendName']=="YL")return p;
    if(this.postData['trendName']=="LR")return p;
    if(type=="bet")return 5;
    return 1;
  }

  ssqTrendObj.createFormatNowPage = function(p){
    if(this.postData['trendType']!="P" || this.postData['trendName']!="HM")return p;
	if(p<3)return 0;
    	return 1;
  }

  ssqTrendObj.createFormatBet = function(k,str){
    return str;
  }
  
  ssqTrendObj.updateHeight = function(){
    if(this.postData['trendType']=="P" && this.postData['trendName']=="HM")return false;
    if(!this.temHideObj)this.temHideObj = [];
    if(!this.temTitleHideObj)this.temTitleHideObj = [];
    if(this.createFormatNowPage(this.page)==1){
      if(this.temHideObj.length)return false;
      var hideListObj = this.listConObj.children('div').children('div');
      var hideTitleObj = this.listFirstObj.children('div').children('p');
      for(var i=0,ilen=hideListObj.length;i<ilen;i++){
        if(i<16)continue;
        hideListObj.eq(i).hide();
        hideTitleObj.eq(i).hide();
        this.temHideObj.push(hideListObj.eq(i));
        this.temTitleHideObj.push(hideTitleObj.eq(i));
      }
      this.createListHeight();
      this.listIscroll.refresh();
      this.titleIscroll.refresh();
    }else{
      if(!this.temHideObj.length)return false;
      for(var i=0,ilen=this.temHideObj.length;i<ilen;i++){
        this.temHideObj[i].show();
        this.temTitleHideObj[i].show();
      }
      this.temHideObj = [];
      this.temTitleHideObj = [];
      this.createListHeight();
      this.listIscroll.refresh();
      this.titleIscroll.refresh();
    }
  }

  ssqTrendObj.ajaxGetLRData = function(){
  	
  		var secretData2 = {
			'para' : Global.encrypt(this.postData)
		};
     $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=Lottery.ssq.getChartData',
      data : secretData2,
      type : "post",
      dataType : "json",
      success : function(msg){
      	
        if(msg.code!="0000"){
          $.alertMsg(msg.code_str);
          return false;
        }
        msg.info = $.parseJSON(Global.crypt(msg.info));
        ssqTrendObj.temLRTrendData = msg.info;
        ssqTrendObj.createPageData();
        ssqTrendObj.createDataDom();
      }
    });
  }

  ssqTrendObj.showSet = function(){
    var spanObj = $("span[data-t='updateData']");
    for(var i=0,ilen=spanObj.length;i<ilen;i++){
      var thisData = spanObj.eq(i).attr("data-v").split("_");
      if(!this.postData[thisData[0]])continue;
      if(this.postData[thisData[0]] == thisData[1]){
        spanObj.eq(i).addClass('on');
      }else{
        spanObj.eq(i).removeClass('on');
      }
    }
    this.setObj.show();
    this.setObj.attr("data-s",0);
  }

  ssqTrendObj.hideSet = function(){
    this.setObj.hide();
    this.setObj.removeAttr("data-s",1);
  }

  ssqTrendObj.subSet  = function(){
    var spanObj = $("#ssqTrend_lotteryObj span[data-t='updateData']");
    for(var i=0,ilen=spanObj.length;i<ilen;i++){
      if(!spanObj.eq(i).hasClass('on'))continue;
      var thisData = spanObj.eq(i).attr("data-v").split("_");
      this.postData[thisData[0]] = thisData[1];
    }

    this.temTrendData = "";
    this.temLRTrendData = "";
    this.page = 0;
    this.maxPage = 0
    if(this.postData['trendName']=="LR"){
      this.ajaxGetLRData();
    }else{
      this.ajaxGetData();
    }
    this.selectBetData = new Array();
    this.createSelectBetDom();
    this.hideSet();
  }

  ssqTrendObj.createPageData = function(){
    this.page = 0;
    var trendName = this.postData['trendName'];
    var lotteryPlay = this.postData['trendType'];
    var titleDomData = this[trendName+"TitleData"][lotteryPlay];
    this.maxPage = titleDomData.length;
  }

  ssqTrendObj.createDataDom = function(){
    this.createTitleDom();  
    this.createListDom();
    this.createExplain();
    this.createBetDom();
    this.createListHeight();
    this.createListTitleIscroll();
    this.createListIscroll();
  }

  ssqTrendObj.createTitleDom = function(){
    var trendName = this.postData['trendName'];
    var lotteryPlay = this.postData['trendType'];
    var titleDomData = this.createFormatData(this[trendName+"TitleData"][lotteryPlay]);
	////console.log(this[trendName+"TitleFirst"]);
	////console.log(this.page);
	////console.log(this.createFormatNowPage(this.page));
    var titleFirstData = this[trendName+"TitleFirst"][lotteryPlay][this.createFormatNowPage(this.page)];
    var titleClass = this[trendName+"TitleClass"][lotteryPlay];
    var html = new Array();
    html.push('<div class="clearfix" style="width:'+(this.createFormatPage(this.maxPage) >1 ? (((this.conWidth+this.borderWidth)*this.createFormatPage(this.maxPage)).toFixed(2)) : ((this.conWidth*this.createFormatPage(this.maxPage)).toFixed(2)))+'px;">');
    for(var i=0,ilen=titleDomData.length;i<ilen;i++){
      html.push('<div class="'+titleClass[i]+' trend_w'+titleDomData[i].length+'" style="width:'+this.conWidth+'px;">');
      for(var k=0,klen=titleDomData[i].length;k<klen;k++){
        if(trendName=="HM"){
          html.push('<span><em>'+titleDomData[i][k]+'</em></span>');
        }else{
        //  //console.log(i);
          html.push('<span data-t="sortDom" data-k="'+this[trendName+"SortKey"][lotteryPlay][i][k]+'@'+i+'">'+titleDomData[i][k]+'<i>↑</i></span>');
        }
      }
      html.push('</div>');
    }
    html.push('</div>');
    if(trendName=="HM"){
      this.titleFirstObj.removeClass('fontblue');
      this.titleConObj.removeClass('gray');
    }else{
      this.titleFirstObj.addClass('fontblue');
      this.titleConObj.addClass('gray');
    }
    this.titleConObj.html(html.join(""));
    this.titleFirstObj.html(titleFirstData);
    this.createTitleIscroll();
  }

  ssqTrendObj.createListDom = function(){
    var trendName = this.postData['trendName'];
    switch(trendName){
      case "HM" : this.createHMLIst(ssqTrendObj.temTrendData);break;
      case "YL" : this.createYLLIst(ssqTrendObj.temTrendData);break;
      case "LR" : this.createLRLIst(ssqTrendObj.temLRTrendData);break;
    }
   // this.createListTitleIscroll();  //zhangw
    //this.createListIscroll();
  }

  ssqTrendObj.createHMLIst = function(data){
    var showYL = this.postData['showYL'] === "show" ? true : false;
    var showSt = this.postData['statistics'] === "show" ? true : false;
    var titleHtml = new Array();
    var conHtml = new Array();
    titleHtml.push("<div>");
    conHtml.push('<div style="width:'+(this.createFormatPage(this.maxPage)>1 ? (((this.conWidth+this.borderWidth)*this.createFormatPage(this.maxPage)).toFixed(2)):((this.conWidth*this.createFormatPage(this.maxPage)).toFixed(2)))+'px;">');
    var listData = data.list;
    if(!listData)return false;
    for(var i=0,ilen=listData.length;i<ilen;i++){
      titleHtml.push('<p class="qh_con'+(i%2 ? "" : " odd")+'"><span>'+listData[i]['lottery_no'].slice(-3)+'期</span><span class="line fl"><em class="dot"></em></span></p>');
      conHtml.push('<div class="clearfix'+(i%2 ? "" : " odd")+'">');
      var newMissData = this.createFormatData(listData[i]['num_miss']);
      for(var k=0,klen=newMissData.length;k<klen;k++){
        conHtml.push('<div class="trend_num trend_w'+newMissData[k].length+(k>=3 ? " numblue" : "")+'" style="width:'+this.conWidth+'px;">');
        for(var o=0,olen=newMissData[k].length;o<olen;o++){
          var thisData = newMissData[k][o];
          conHtml.push('<span><em'+((Number(thisData["miss"])===0) ? ' class=" on"' : "")+'>'+(Number(thisData["miss"])===0 ? thisData["hao"] : (showYL ? thisData["miss"] : ''))+'</em></span>');
        }
        conHtml.push('</div>');
      }
      conHtml.push('</div>');
    }
    if(showSt){
      var statisticsHtml = this.createHMStatistics(data);
      titleHtml = titleHtml.concat(statisticsHtml['titleHtml']);
      conHtml = conHtml.concat(statisticsHtml['conHtml']);
    }
    conHtml.push('</div>');
    titleHtml.push("</div>")
    this.listConObj.html(conHtml.join(""));
    this.listFirstObj.html(titleHtml.join(""));
  }

  ssqTrendObj.createHMStatistics = function(data){
    var titleHtml = new Array();
    var conHtml = new Array();

    titleHtml.push('<p class="qh_con whitebg"><span>出现总数</span></p>');
    titleHtml.push('<p class="qh_con whitebg"><span>平均遗漏</span></p>');
    titleHtml.push('<p class="qh_con whitebg"><span>最大遗漏</span></p>');
    titleHtml.push('<p class="qh_con whitebg"><span>最大连出</span></p>');

    conHtml.push(this.createHMStatisticeCon(this.createFormatData(data['num_all'])));
    conHtml.push(this.createHMStatisticeCon(this.createFormatData(data['num_avg_miss'])));
    conHtml.push(this.createHMStatisticeCon(this.createFormatData(data['num_max_miss'])));
    conHtml.push(this.createHMStatisticeCon(this.createFormatData(data['num_con_miss'])));

    return {titleHtml:titleHtml,conHtml:conHtml};
  }

  ssqTrendObj.createHMStatisticeCon = function(data){
     var conHtml = new Array();
    conHtml.push('<div class="clearfix whitebg">');
    for(var i=0,ilen=data.length;i<ilen;i++){
      conHtml.push('<div class="trend_num trend_w'+data[i].length+'" style="width:'+this.conWidth+'px;">');
      for(var k=0,klen=data[i].length;k<klen;k++){
        conHtml.push('<span><em>'+data[i][k]+'</em></span>');
      }
      conHtml.push('</div>');
    }
    conHtml.push('</div>');
    return conHtml.join("");
  }

  ssqTrendObj.createYLLIst = function(data){
	//console.log(data);
    var titleHtml = new Array();
    var conHtml = new Array();
    var maxMiss = data['num_max_miss'];
    var preMiss = data['num_pre_miss'];
    var curMiss = data['num_cur_miss'];
    var hapPro = data['num_hap_pro'];
    var titleData = this.betData[this.postData['trendType']][this.createFormatNowPage(this.page)];
	//console.log(titleData);
    titleHtml.push("<div>");
    conHtml.push('<div style="width:'+(this.createFormatPage(this.maxPage)>1 ? (((this.conWidth+this.borderWidth)*this.createFormatPage(this.maxPage)).toFixed(2)):((this.conWidth*this.createFormatPage(this.maxPage)).toFixed(2)))+'px;">');
	for(var i=0,ilen=titleData.length;i<ilen;i++){
      titleHtml.push('<p data-i="'+i+'" class="qh_con'+(i%2 ? "" : " odd")+'"><span>'+titleData[i]+'</span><span class="line fl"><em class="dot"></em></span></p>');
      conHtml.push('<div data-i="'+i+'" class="clearfix'+(i%2 ? "" : " odd")+'">');

	  for(var k=0,klen=maxMiss.length;k<klen;k++){

        var maxMaxMissVal = eval('Math.max('+maxMiss[k]+')');
        var maxPreMissVal = eval('Math.max('+preMiss[k]+')');
        var maxCurMissVal = eval('Math.max('+curMiss[k]+')');
        var maxHapProVal = eval('Math.max('+hapPro[k]+')');

        conHtml.push('<div class="trend_num trend_yl" style="width:'+this.conWidth+'px;">');
		if(typeof maxMiss[k][i] != 'undefined'){
        	conHtml.push('<span class="'+(maxMiss[k][i] == maxMaxMissVal ? "fontred" : "")+'">'+(maxMiss[k][i] )+'</span>');
		}
		if(typeof preMiss[k][i] != 'undefined'){
			conHtml.push('<span class="'+(preMiss[k][i] == maxPreMissVal ? "fontred" : "")+'">'+(preMiss[k][i] )+'</span>');	
		}
        if(typeof curMiss[k][i] != 'undefined'){
        	conHtml.push('<span class="'+(curMiss[k][i] == maxCurMissVal ? "fontred" : "")+'">'+(curMiss[k][i])+'</span>');
		}
		if(typeof hapPro[k][i] != 'undefined'){
        	conHtml.push('<span class="'+(hapPro[k][i] == maxHapProVal ? "fontred" : "")+'">'+  (hapPro[k][i])+'</span>');
		}
        conHtml.push('</div>');
		
      }
      conHtml.push('</div>');
    }
    conHtml.push('</div>');
    titleHtml.push("</div>");

    this.listConObj.html(conHtml.join(""));
    this.listFirstObj.html(titleHtml.join(""));
  }

  ssqTrendObj.createLRLIst = function(data){
    var titleHtml = new Array();
    var conHtml = new Array();
    var num30Data = data['30'];
    var num50Data = data['50'];
    var num100Data = data['100'];
    var missData = data['miss'];

    var titleData = this.betData[this.postData['trendType']][this.createFormatNowPage(this.page)];
    titleHtml.push("<div>");
    conHtml.push('<div style="width:'+(this.createFormatPage(this.maxPage)>1 ? (((this.conWidth+this.borderWidth)*this.createFormatPage(this.maxPage)).toFixed(2)):((this.conWidth*this.createFormatPage(this.maxPage)).toFixed(2)))+'px;">');
    for(var i=0,ilen=titleData.length;i<ilen;i++){
      titleHtml.push('<p data-i="'+i+'" class="qh_con'+(i%2 ? "" : " odd")+'"><span>'+titleData[i]+'</span><span class="line fl"><em class="dot"></em></span></p>');
      conHtml.push('<div data-i="'+i+'" class="clearfix'+(i%2 ? "" : " odd")+'">');
      for(var k=0,klen=missData.length;k<klen;k++){
        var maxnum30Val = eval('Math.max('+num30Data[k]+')');
        var maxnum50Val = eval('Math.max('+num50Data[k]+')');
        var maxnum100Val = eval('Math.max('+num100Data[k]+')');
        var maxmissVal = eval('Math.max('+missData[k]+')');

        conHtml.push('<div class="trend_num trend_yl" style="width:'+this.conWidth+'px;">');
		if(typeof num30Data[k][i] != 'undefined'){
        	conHtml.push('<span class="'+(num30Data[k][i] == maxnum30Val ? "fontred" : "")+'">'+num30Data[k][i]+'</span>');
		}
		if(typeof num50Data[k][i] != 'undefined'){
        	conHtml.push('<span class="'+(num50Data[k][i] == maxnum50Val ? "fontred" : "")+'">'+num50Data[k][i]+'</span>');
		}
		if(typeof num100Data[k][i] != 'undefined'){
        	conHtml.push('<span class="'+(num100Data[k][i] == maxnum100Val ? "fontred" : "")+'">'+num100Data[k][i]+'</span>');
		}
		if(typeof missData[k][i] != 'undefined'){
        	conHtml.push('<span class="'+(missData[k][i] == maxmissVal ? "fontred" : "")+'">'+missData[k][i]+'</span>');
		}
        conHtml.push('</div>');
      }
      conHtml.push('</div>');
    }
    conHtml.push('</div>');
    titleHtml.push("</div>");

    this.listConObj.html(conHtml.join(""));
    this.listFirstObj.html(titleHtml.join(""));
  }

  ssqTrendObj.createExplain = function(){
    var trendName = this.postData['trendName'];
    var explainData = this[trendName+"ExplainData"];
    if(!explainData){
      this.explainObj.hide();
      return false;
    }else{
      this.explainObj.show();
    }
    var html = new Array();
    for(var i=0,ilen=explainData.length;i<ilen;i++){
      html.push('<p><span class="mr10">['+explainData[i]['title']+']</span>'+explainData[i]['con']+'</p>');
    }
    this.explainObj.html(html.join(""));
  }

  ssqTrendObj.createBetDom = function(){
    var lotteryPlay = this.postData['trendType'];

    var titleDomData = this.createFormatData(this["betData"][lotteryPlay]);
    var titleFirstData = this["betTitle"][lotteryPlay][this.createFormatNowPage(this.page)];
    var html = new Array();
    html.push('<div class="clearfix" style="width:'+(this.createFormatPage(this.maxPage,"bet")>1 ? (((this.conWidth+this.borderWidth)*this.createFormatPage(this.maxPage,"bet")).toFixed(2)):((this.conWidth*this.createFormatPage(this.maxPage,"bet")).toFixed(2)))+'px;">');
    for(var i=0,ilen=titleDomData.length;i<ilen;i++){
	  var blueCls = '';
	  switch(this.postData['trendName']){
		case 'HM':
			blueCls = i>=3 ? 'numblue  fontblue' : '';
			break;
		case 'YL':	
			blueCls = i==1 ? 'numblue  fontblue' : '';
			break;
		case 'LR':
			blueCls = i==1 ? 'numblue  fontblue' : '';
			break;
	  }		
      html.push('<div class="trend_num fontred trend_w'+titleDomData[i].length+' '+ blueCls +'" style="width:'+this.conWidth+'px;">');
      for(var k=0,klen=titleDomData[i].length;k<klen;k++){
        html.push('<span data-t="'+this.createFormatBet(k,'bet')+'" data-i="'+this.createFormatI(i)+'" data-k="'+this.createFormatKey(i,k)+'"><em '+((this.selectBetData[i] && this.selectBetData[i][k]) ? "class='on'" : "")+'>'+titleDomData[i][k]+'</em></span>');
      }
      html.push('</div>');
    }
    html.push('</div>');
    this.betFirstObj.html(titleFirstData);
    this.betConObj.html(html.join(""));
    this.createBetscroll();
  }

  ssqTrendObj.createListHeight = function(){
    var betHeight = this.betObj.height();
	if(this.postData['trendName']== 'HM'){
		this.conHeight = Number(this.clientHeight-101-78);
	}else{
		this.conHeight = Number(this.clientHeight-101-138);	
	}
    var height = this.conHeight - betHeight;
    var listConHeight = this.listConObj.children('div').height() || 0;
    if(listConHeight!=0 && listConHeight<height)height = listConHeight;
    this.listConObj.height(height);
    this.listFirstObj.height(height);
    if(this.listTitleIscroll)this.listTitleIscroll.refresh();
    if(this.listIscroll)this.listIscroll.refresh();
  }

  ssqTrendObj.createListTitleIscroll = function(){
    if(this.listTitleIscroll)this.listTitleIscroll.refresh();
    this.listTitleIscroll = new iScroll(this.listFirstObj[0],{
      hScrollbar : false,
      vScrollbar : false,
      bounce : false,
      momentum : false,
      onScrollMove : function(){
        ssqTrendObj.listIscroll.scrollTo(ssqTrendObj.listIscroll.x,this.y);
      },
      onMomentum : function(){
        ssqTrendObj.listIscroll.scrollTo(ssqTrendObj.listIscroll.x,this.y,this.duration);
      }
    });
    var scrollToVal = this.listFirstObj.children('div').height()-this.conHeight;
    scrollToVal = scrollToVal<0 ? 0 : scrollToVal;
    this.listTitleIscroll.scrollTo(0,-1*scrollToVal);
  }

  ssqTrendObj.createTitleIscroll = function(){
    if(this.titleIscroll)this.titleIscroll.refresh();
    this.titleIscroll = new iScroll(this.titleConObj[0],{
      hScrollbar : false,
      vScrollbar : false,
      bounce : false,
      momentum : false,
      onScrollMove : function(){
        ssqTrendObj.listIscroll.scrollTo(this.x,ssqTrendObj.listIscroll.y);
        ssqTrendObj.betIscroll.scrollTo(this.x,ssqTrendObj.betIscroll.y);
        ssqTrendObj.updatePage(this.x);
        ssqTrendObj.updateHeight();
      },
      onMomentum : function(){
        ssqTrendObj.listIscroll.scrollTo(this.x,ssqTrendObj.listIscroll.y,this.duration);
        ssqTrendObj.betIscroll.scrollTo(this.x,ssqTrendObj.betIscroll.y,this.duration);
        ssqTrendObj.updatePage(this.x);
        ssqTrendObj.updateHeight();
      }
    });
  }

  ssqTrendObj.createListIscroll = function(){
    if(this.listIscroll)this.listIscroll.refresh();
    this.listIscroll = new iScroll(this.listConObj[0],{
      hScrollbar : false,
      vScrollbar : false,
      bounce : false,
      momentum : false,
      onScrollMove : function(){
        ssqTrendObj.titleIscroll.scrollTo(this.x,ssqTrendObj.titleIscroll.y);
        ssqTrendObj.betIscroll.scrollTo(this.x,ssqTrendObj.betIscroll.y);
        ssqTrendObj.listTitleIscroll.scrollTo(ssqTrendObj.listTitleIscroll.x,this.y);
        ssqTrendObj.updatePage(this.x);
        ssqTrendObj.updateHeight();
      },
      onMomentum : function(){
        ssqTrendObj.titleIscroll.scrollTo(this.x,ssqTrendObj.titleIscroll.y,this.duration);
        ssqTrendObj.betIscroll.scrollTo(this.x,ssqTrendObj.betIscroll.y,this.duration);
        ssqTrendObj.listTitleIscroll.scrollTo(ssqTrendObj.listTitleIscroll.x,this.y,this.duration);
        ssqTrendObj.updatePage(this.x);
        ssqTrendObj.updateHeight();
      } 　 
    });
     var scrollToVal = this.listConObj.children('div').height()-this.conHeight;
     scrollToVal = scrollToVal<0 ? 0 : scrollToVal;
    this.listIscroll.scrollTo(0,-1*scrollToVal);
  }

  ssqTrendObj.createBetscroll = function(){
    if(this.betIscroll)this.betIscroll.refresh();
    this.betIscroll = new iScroll(this.betConObj[0],{
      hScrollbar : false,
      vScrollbar : false,
      bounce : false,
      momentum : false,
      onScrollMove : function(){
        if((ssqTrendObj.postData['trendName'] == "YL" || ssqTrendObj.postData['trendName'] == "LR") && (ssqTrendObj.postData['trendType']=="IH" || ssqTrendObj.postData['trendType']=="UH3" || ssqTrendObj.postData['trendType']=="UH6"))return false;
        ssqTrendObj.listIscroll.scrollTo(this.x,ssqTrendObj.listIscroll.y);
        ssqTrendObj.titleIscroll.scrollTo(this.x,ssqTrendObj.titleIscroll.y);
        ssqTrendObj.updatePage(this.x);
        ssqTrendObj.updateHeight();
      },
      onMomentum : function(){
        if((ssqTrendObj.postData['trendName'] == "YL" || ssqTrendObj.postData['trendName'] == "LR") && (ssqTrendObj.postData['trendType']=="IH" || ssqTrendObj.postData['trendType']=="UH3" || ssqTrendObj.postData['trendType']=="UH6"))return false;
        ssqTrendObj.listIscroll.scrollTo(this.x,ssqTrendObj.listIscroll.y,this.duration);
        ssqTrendObj.titleIscroll.scrollTo(this.x,ssqTrendObj.titleIscroll.y,this.duration);
        ssqTrendObj.updatePage(this.x);
        ssqTrendObj.updateHeight();
      } 
    });
  }

  ssqTrendObj.updatePage = function(x){
    var positionWidth  = Math.abs(x);
    this.page = Math.floor(positionWidth/this.conWidth);
	////console.log(positionWidth);
	////console.log(this.conWidth);
	
    var titleData = this[this.postData["trendName"]+"TitleFirst"][this.postData["trendType"]][this.page];
	////console.log(titleData);
	if(this.postData["trendName"] == 'HM'){
    	var betTitleData = this["betTitle"][this.postData["trendType"]][this.page]; 
	}else{
		if(this.page == 0){
			var betTitleData = this["betTitle"][this.postData["trendType"]][0]; 		
		}else if(this.page == 1){
			var betTitleData = this["betTitle"][this.postData["trendType"]][3]; 	
		}
	}
	////console.log(betTitleData);
    this.titleFirstObj.html(titleData);
    this.betFirstObj.html(betTitleData);
    this.selectObj.children('div').removeClass('on');
    this.selectObj.children('div[data-i="'+this.createFormatNowPage(this.page)+'"]').addClass('on');
  }

  ssqTrendObj.updateTrendName = function(obj){
    obj.siblings('li').removeClass('on');
    obj.addClass('on');
    var thisV = obj.attr("data-v");
    this.postData['trendName'] = thisV;
    this.temSortDom = this.titleFirstObj;
    if(thisV=="LR" && !this.temLRTrendData){
      this.page = 0;
      this.maxPage = 0;
      this.ajaxGetLRData();
    }else if(!this.temTrendData){
      this.page = 0;
      this.maxPage = 0;
      this.ajaxGetData();
    }else{
      this.page = 0;
      this.createDataDom();
    } 
    this.betFirstObj.html(this.betTitle[this.postData['trendType']][this.createFormatNowPage(this.page)]);
    this.selectObj.children('div').removeClass('on');
    this.selectObj.children('div[data-i="'+this.createFormatNowPage(this.page)+'"]').addClass('on');
  }

  ssqTrendObj.updatelottery = function(obj){
    var thisV = obj.attr("data-v");
    var thisCn = obj.attr("data-cn");
    this.playTitleObj.html("双色球-"+thisCn+'<em class="down"></em>');
    this.postData['trendType'] = thisV;
    this.temSortDom = this.titleFirstObj;

    this.updataPlayObj.hide();
    this.playTitleObj.attr("data-s","0");
    if($("#ssqTrend_upBGObj").length)$("#ssqTrend_upBGObj").remove();

    this.temTrendData = "";
    this.temLRTrendData = "";
    this.page = 0;
    this.maxPage = 0
    if(this.postData['trendName']=="LR"){
      this.ajaxGetLRData();
    }else{
      this.ajaxGetData();
    }
    this.selectBetData = new Array();
    this.createSelectBetDom();
  }

  ssqTrendObj.sortDom = function(obj){
    if(this.postData['trendName'] == "HM")return false;
    var thisK = obj.attr("data-k").split("@");
    var dataKey = thisK[0];
    var dataK = thisK[1];
    if(dataKey=="title"){
      var thisData = this.betData[this.postData['trendType']][this.createFormatNowPage(this.page)];
    }else if(this.postData['trendName'] == "YL"){
      var thisData = this.temTrendData[dataKey][dataK].concat([]);
    }else if(this.postData['trendName'] == "LR"){
      var thisData = this.temLRTrendData[dataKey][dataK].concat([]);
    }
    if(this.temSortDom && this.temSortDom.index(obj)<0){
      this.temSortDom.removeClass('sortObj');
      this.temSortDom.removeClass('fontblue');
      this.temSortDom.find("i").html("↑");
    }
    if(!obj.hasClass('fontblue')){
      obj.addClass('fontblue');
      obj.find("i").html("↑");
      this.sortData(thisData,"down");
    }else if(!obj.hasClass('sortObj')){
      obj.addClass('sortObj');
       obj.find("i").html("↓");   //↑ ↓
      this.sortData(thisData,"up");
    }else{
      obj.removeClass('fontblue');
      obj.removeClass('sortObj');
      obj.find("i").html("↑");
      this.sortData(thisData,"old");
    }
    this.temSortDom = obj;
  }

  ssqTrendObj.sortData = function(data,type){
	//console.log(data);
	//console.log(type);
    var listObj = this.listConObj.children('div').children('div');
    
    var newListObj = listObj.sort(function(a,b){
      var thisAI = Number($(a).attr("data-i"));
      var thisBI = Number($(b).attr("data-i"));
	 // //console.log(thisBI);
	 /* var thisAI = parseInt($(a).attr("data-i"),10);
      var thisBI = parseInt($(b).attr("data-i"),10);*/
	  ////console.log(thisAI);
      if(type=="down"){
        return (data[thisAI] ? data[thisAI] : 0)  - (data[thisBI] ? data[thisBI] : 0 );  //zhangw modify
      }else if(type=="up"){
        return (data[thisBI] ? data[thisBI] : 0 )  - (data[thisAI] ? data[thisAI] : 0);
      }else if(type=="old"){
        return thisAI - thisBI;
      }
    });
	
    var titleObj = this.listFirstObj.children('div').children('p');
    for(var i=0,ilen=newListObj.length;i<ilen;i++){
      var thisI = newListObj.eq(i).attr("data-i");
      var thisTitleObj = titleObj.filter("[data-i='"+thisI+"']");
	  if(newListObj.eq(i).css('display')!= 'none'){
		  if(i%2){
			newListObj.eq(i).removeClass("odd");
			thisTitleObj.removeClass('odd');
		  }else{
			newListObj.eq(i).addClass("odd");
			thisTitleObj.addClass('odd');
		  }
	  }
      this.listConObj.children('div').append(newListObj.eq(i));
      this.listFirstObj.children('div').append(thisTitleObj);
    }
  }

  ssqTrendObj.betNum = function(obj){
    var thisI = obj.attr("data-i");
    var thisK = obj.attr("data-k");
    var emObj = obj.children('em');
    if(emObj.hasClass('on')){
      emObj.removeClass('on');
      delete this.selectBetData[thisI][thisK];
    }else{
      emObj.addClass('on');
      if(!this.selectBetData[thisI])this.selectBetData[thisI] = new Array();
      this.selectBetData[thisI][thisK] = this.betData[this.postData['trendType']][thisI][thisK];
    }
  }

  ssqTrendObj.createSubData = function(){
    var data = [];
    for(var i=0,ilen=this.betNumData[this.postData['trendType']].length;i<ilen;i++){
      var thisData = [];
      if(!(this.selectBetData[i] && this.selectBetData[i].length)){
        $.alertMsg("请至少选择1注");
        return false;
      }
      for(var k=0,klen=this.selectBetData[i].length;k<klen;k++){
        if(this.selectBetData[i][k])thisData.push(this.selectBetData[i][k]);
      }
      if(!thisData.length || thisData.length < this.betNumData[this.postData['trendType']][i]){
        $.alertMsg("请至少选择1注");
        return false;
      }
      if(thisData.length)data.push(thisData.join(","));
    }
    var zs = this.getZS();
    if((this.postData["trendType"]=="FP2" || this.postData["trendType"]=="FP3") && zs==0){
      $.alertMsg("请每位至少选择1个不同的号码");
      return false;
    }
    data.push(this.postData["trendType"]);
    data.push(zs);
    return data.join("|");
  }

  ssqTrendObj.getCXY = function(x,y){
    if(x<y)return 0;
    var allX = 1;
    var allY = 1;
    for(var i=0,ilen=y;i<ilen;i++){
      allX*=x-i;
      allY*=y-i;
    }
    return allX/allY;
  }

  ssqTrendObj.createMoneyDom = function(){
    var zs = this.getZS();
    this.betMoneyObj.html('<span class="fontred">'+zs+'</span>注 <span class="fontred">'+(zs*2)+'</span>元');
  }

  ssqTrendObj.getZS = function(){
    switch(this.postData['trendType']){
      case "P" : return ssqTrendObj.PBonus();
    }
  }
  
  ssqTrendObj.PBonus = function(){
    for(var i=0,zs,ilen=this.betNumData[this.postData['trendType']].length;i<ilen;i++){
      if(!(this.selectBetData[i] && this.selectBetData[i].length))return 0;
      var thisData = [];
      for(var k=0,klen=this.selectBetData[i].length;k<klen;k++){
        if(this.selectBetData[i][k])thisData.push(this.selectBetData[i][k]);
      }
      if(thisData.length<this.betNumData[this.postData['trendType']][i])return 0;
      var thisZs = this.getCXY(thisData.length,this.betNumData[this.postData['trendType']][i]);
      zs = zs ? zs*thisZs : thisZs;
     }
     return zs;
  }

  

  ssqTrendObj.subData = function(obj){
    //console.log(obj)
    if(obj.attr("data-stop")){
      $.alertMsg("不在开售时间");
      return false;
    }
    var postData = this.createSubData();
    if(!postData)return false;
    window.localStorage.setItem(this.postData['lottery_type']+"lotteryBetData",postData);
	switch(this.postData['lottery_type']){
		case 'ssq':
			this.goSsqConfirm();
			break;	
	}
  }
  
  ssqTrendObj.goSsqConfirm = function(){
	  var self = this;
	  ssqConfirmObj.goBack = function(){
		  ssqTrendObj.show(); 
	  }
	  ssqConfirmObj.show('reload',function(){
		 ssqConfirmObj.setData({
			'lotteryType': self.postData['lottery_type'],
			'lotteryCnName': '双色球',
			'lotteryNo' : self.postData.lotteryNoVal,
			'lotteryPlay': self.postData.trendType
		 })
	  });  
  }
  
  ssqTrendObj.delAll = function(){
    this.selectBetData = new Array();
    this.betConObj.find("span[data-i]").each(function(){
      $(this).children('em').removeClass('on');
    });
  }

  ssqTrendObj.createGetData = function(){
    return '?lotteryType='+this.postData['lottery_type']+'&lotteryNo='+this.postData['lotteryNoVal']+"&lotteryPlay="+this.postData['trendType']+"&res=trend";
  }

  ssqTrendObj.createSelectBetDom = function(){
    var html = [];
    for(var i=0,ilen=this.selectBetData.length;i<ilen;i++){
      if(!this.selectBetData[i]){
        html.push('<div class="fl ts_num'+(this.page == i ? " on" : "")+'"></div>');
        continue;
      }
      var thisHtml = ['<div data-i="'+i+'" class="fl ts_num'+(this.createFormatNowPage(this.page) == i ? " on" : "")+(i==0 ? " fontred" : " fontblue")+'">'];
      for(var k=0,num=0,klen=this.selectBetData[i].length;k<klen;k++){
        if(!this.selectBetData[i][k])continue;
        thisHtml.push('<span>'+this.selectBetData[i][k]+'</span>');
        num++;
      }
      thisHtml.push('</div>');
      if(num)html.push(thisHtml.join(""));
    }
    if(html.length)this.selectObj.html(html.join('<em class="shu">|</em>'));
    this.betObj[(html.length ? "show" : "hide")]();
    this.qhObj[(html.length ? "hide" : "show")]()
    this.betMoneyObj[(html.length ? "show" : "hide")]()
    this.createListHeight();
  }

 

  ssqTrendObj.updateData = function(obj){
    obj.siblings('span').removeClass('on');
    obj.addClass('on');
  }

  ssqTrendObj.onloadExecution = function(){
    this.createDom();
    this.createEvent();
    this.createListHeight();
    this.ajaxGetData();
  }
  
  //此页面包含2个js, ssqTrend,dltTime,  dltTime负责赛程时间循环及相关更新，不负责投注。而ssqTrend则负责具体图表的页面展现及投注
  ssqTrendObj.init = function(){
	  ssqTrendObj.setDefConfig();
	  ssqTimeObj.setDefConfig();
      ssqTrendObj.onloadExecution();
	  ssqTimeObj.init();
	     
  }
  
  ssqTrendObj.destroy = function(){
	 ssqTrendObj.setDefConfig();
	 ssqTimeObj.setDefConfig();
	 $('#ssqTrend').html('').remove();  
  }

