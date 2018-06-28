
  var fastTrendObj = new PageController({
	   'name': 'fastTrend',
	   'tpl' : 'template/kaijiang/fastTrend.html'  
  });

  fastTrendObj.setDefConfig = function(){
	  fastTrendObj.titleWidth = 17.5/100;
	  fastTrendObj.clientWidth = (document.documentElement.clientWidth || document.body.clientWidth).toFixed(2);
	  fastTrendObj.clientHeight = (document.documentElement.clientHeight || document.body.clientHeight).toFixed(2);
	  fastTrendObj.conWidth = Number((Number(fastTrendObj.clientWidth) * (1-fastTrendObj.titleWidth)).toFixed(2));
	  fastTrendObj.conHeight = Number(fastTrendObj.clientHeight-101-78);
	  fastTrendObj.maxPage = 0;
	  fastTrendObj.page = 0;
	  fastTrendObj.borderWidth = 1;
	
	  fastTrendObj.titleIscroll = "";
	  fastTrendObj.listTitleIscroll = "";
	  fastTrendObj.listIscroll = "";
	  fastTrendObj.temTrendData = "";
	  fastTrendObj.temLRTrendData = "";
	  fastTrendObj.temSortDom = "";
	
	  fastTrendObj.selectBetData = new Array();
	
	  fastTrendObj.postData = {
		num : 50,
		showYL : "show",
		statistics : "show",
		lottery_type : ConfigObj.fastLotType,
		trendType : "R2",
		trendName : "HM",
		lotteryNoVal : ""
	  }  
	  
	  fastTrendObj.lotteryBetError = {
		'R2' : ['至少选择2个号码'],
		'R3' : ['至少选择3个号码'],
		'R4' : ['至少选择4个号码'],
		'R5' : ['至少选择5个号码'],
		'R6' : ['至少选择6个号码'],
		'R7' : ['至少选择7个号码'],
		'R8' : ['至少选择8个号码'],
		"FP1" : ['至少选1个号码'],
		'FP2' : ['至少选择1个第一位号码','至少选择1个第二位号码'],
		"FC2" : ['至少选择2个号码'],
		'FP3' : ['至少选择1个第一位号码','至少选择1个第二位号码','至少选择1个第三位号码'],
        "FC3" : ['至少选择3个号码']
	 }
	  
  }

  fastTrendObj.betNumData = {
    R2 : [2],
    R3 : [3],
    R4 : [4],
    R5 : [5],
    R6 : [6],
    R7 : [7],
    R8 : [8],
    FP1 : [1],
    FP2 : [1,1],
    FC2 : [2],
    FP3 : [1,1,1],
    FC3 : [3]
  }

  fastTrendObj.betData = {
    R2 : new Array(new Array("01","02","03","04","05","06","07","08","09","10","11")),
    R3 : new Array(new Array("01","02","03","04","05","06","07","08","09","10","11")),
    R4 : new Array(new Array("01","02","03","04","05","06","07","08","09","10","11")),
    R5 : new Array(new Array("01","02","03","04","05","06","07","08","09","10","11")),
    R6 : new Array(new Array("01","02","03","04","05","06","07","08","09","10","11")),
    R7 : new Array(new Array("01","02","03","04","05","06","07","08","09","10","11")),
    R8 : new Array(new Array("01","02","03","04","05","06","07","08","09","10","11")),
    FP1 : new Array(new Array("01","02","03","04","05","06","07","08","09","10","11")),
    FP2 : new Array(new Array("01","02","03","04","05","06","07","08","09","10","11"),new Array("01","02","03","04","05","06","07","08","09","10","11")),
    FC2 : new Array(new Array("01","02","03","04","05","06","07","08","09","10","11")),
    FP3 : new Array(new Array("01","02","03","04","05","06","07","08","09","10","11"),new Array("01","02","03","04","05","06","07","08","09","10","11"),new Array("01","02","03","04","05","06","07","08","09","10","11")),
    FC3 : new Array(new Array("01","02","03","04","05","06","07","08","09","10","11"))
  }

  fastTrendObj.betTitle = {
    R2 : ["任二"],
    R3 : ["任三"],
    R4 : ["任四"],
    R5 : ["任五"],
    R6 : ["任六"],
    R7 : ["任七"],
    R8 : ["任八"],
    FP1 : ["前一"],
    FP2 : ["第一位","第二位"],
    FC2 : ["前二组"],
    FP3 : ["第一位","第二位","第三位"],
    FC3 : ["前三组"]
  }

  fastTrendObj.HMTitleData = fastTrendObj.betData;

  fastTrendObj.YLTitleData = {
    R2 : new Array(new Array("最大","上次","当期","欲出")),
    R3 : new Array(new Array("最大","上次","当期","欲出")),
    R4 : new Array(new Array("最大","上次","当期","欲出")),
    R5 : new Array(new Array("最大","上次","当期","欲出")),
    R6 : new Array(new Array("最大","上次","当期","欲出")),
    R7 : new Array(new Array("最大","上次","当期","欲出")),
    R8 : new Array(new Array("最大","上次","当期","欲出")),
    FP1 : new Array(new Array("最大","上次","当期","欲出")),
    FP2 : new Array(new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出")),
    FC2 : new Array(new Array("最大","上次","当期","欲出")),
    FP3 : new Array(new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出")),
    FC3 : new Array(new Array("最大","上次","当期","欲出"))
  }

  fastTrendObj.LRTitleData = {
    R2 : new Array(new Array("30期","50期","100期","遗漏")),
    R3 : new Array(new Array("30期","50期","100期","遗漏")),
    R4 : new Array(new Array("30期","50期","100期","遗漏")),
    R5 : new Array(new Array("30期","50期","100期","遗漏")),
    R6 : new Array(new Array("30期","50期","100期","遗漏")),
    R7 : new Array(new Array("30期","50期","100期","遗漏")),
    R8 : new Array(new Array("30期","50期","100期","遗漏")),
    FP1 : new Array(new Array("30期","50期","100期","遗漏")),
    FP2 : new Array(new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏")),
    FC2 : new Array(new Array("30期","50期","100期","遗漏")),
    FP3 : new Array(new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏")),
    FC3 : new Array(new Array("30期","50期","100期","遗漏"))
  }

  fastTrendObj.YLSortKey = {
    R2 : new Array(new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")),
    R3 : new Array(new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")),
    R4 : new Array(new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")),
    R5 : new Array(new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")),
    R6 : new Array(new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")),
    R7 : new Array(new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")),
    R8 : new Array(new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")),
    FP1 : new Array(new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")),
    FP2 : new Array(new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")),
    FC2 : new Array(new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")),
    FP3 : new Array(new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")),
    FC3 : new Array(new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"))
  }

  fastTrendObj.LRSortKey = {
    R2 : new Array(new Array("30","50","100","miss")),
    R3 : new Array(new Array("30","50","100","miss")),
    R4 : new Array(new Array("30","50","100","miss")),
    R5 : new Array(new Array("30","50","100","miss")),
    R6 : new Array(new Array("30","50","100","miss")),
    R7 : new Array(new Array("30","50","100","miss")),
    R8 : new Array(new Array("30","50","100","miss")),
    FP1 : new Array(new Array("30","50","100","miss")),
    FP2 : new Array(new Array("30","50","100","miss"),new Array("30","50","100","miss")),
    FC2 : new Array(new Array("30","50","100","miss")),
    FP3 : new Array(new Array("30","50","100","miss"),new Array("30","50","100","miss"),new Array("30","50","100","miss")),
    FC3 : new Array(new Array("30","50","100","miss"))
  }

  fastTrendObj.HMTitleClass = {
    R2 : new Array("trend_num fontred"),
    R3 : new Array("trend_num fontred"),
    R4 : new Array("trend_num fontred"),
    R5 : new Array("trend_num fontred"),
    R6 : new Array("trend_num fontred"),
    R7 : new Array("trend_num fontred"),
    R8 : new Array("trend_num fontred"),
    FP1 : new Array("trend_num fontred"),
    FP2 : new Array("trend_num fontred","trend_num fontred tn2"),
    FC2 : new Array("trend_num fontred"),
    FP3 : new Array("trend_num fontred","trend_num fontred tn2","trend_num fontred tn3"),
    FC3 : new Array("trend_num fontred"),
  }

  fastTrendObj.YLTitleClass = {
    R2 : new Array("trend_num trend_yl"),
    R3 : new Array("trend_num trend_yl"),
    R4 : new Array("trend_num trend_yl"),
    R5 : new Array("trend_num trend_yl"),
    R6 : new Array("trend_num trend_yl"),
    R7 : new Array("trend_num trend_yl"),
    R8 : new Array("trend_num trend_yl"),
    FP1 : new Array("trend_num trend_yl"),
    FP2 : new Array("trend_num trend_yl","trend_num trend_yl fontred tn2"),
    FC2 : new Array("trend_num trend_yl"),
    FP3 : new Array("trend_num trend_yl","trend_num trend_yl fontred tn2","trend_num trend_yl fontred tn3"),
    FC3 : new Array("trend_num trend_yl"),
  }

  fastTrendObj.LRTitleClass = fastTrendObj.YLTitleClass;

  fastTrendObj.HMTitleFirst = {
    R2 : ["期号"],
    R3 : ["期号"],
    R4 : ["期号"],
    R5 : ["期号"],
    R6 : ["期号"],
    R7 : ["期号"],
    R8 : ["期号"],
    FP1 : ["期号"],
    FP2 : ["第一位>","第二位>","第三位>"],
    FC2 : ["期号"],
    FP3 : ["第一位>","第二位>","第三位>"],
    FC3 : ["期号"]
  }

  fastTrendObj.YLTitleFirst = {
    R2 : ["选号<i>↑</i>"],
    R3 : ["选号<i>↑</i>"],
    R4 : ["选号<i>↑</i>"],
    R5 : ["选号<i>↑</i>"],
    R6 : ["选号<i>↑</i>"],
    R7 : ["选号<i>↑</i>"],
    R8 : ["选号<i>↑</i>"],
    FP1 : ["选号<i>↑</i>"],
    FP2 : ["第一位<i>↑</i>","第二位<i>↑</i>"],
    FC2 : ["选号<i>↑</i>"],
    FP3 : ["第一位<i>↑</i>","第二位<i>↑</i>","第三位<i>↑</i>"],
    FC3 : ["选号<i>↑</i>"],
  }

  fastTrendObj.LRTitleFirst = fastTrendObj.YLTitleFirst;

  fastTrendObj.YLExplainData = [
    {title:"最大遗漏",con:"统计期内遗漏的最大值"},
    {title:"上次遗漏",con:"指号码自上次开出前的遗漏次数"},
    {title:"当期遗漏",con:"指号码自上次开出后的遗漏次数"},
    {title:"欲出几率",con:"当期遗漏÷平均遗漏×100"}
  ];

  fastTrendObj.LRExplainData = [
    {title:"热号",con:"统计期内出现次数多的为热号"},
    {title:"冷号",con:"统计期内出现次数少的为冷号"},
    {title:"次数",con:"指号码统计期内出现的次数"},
    {title:"遗漏",con:"指号码自上次开出后的遗漏次数"}
  ];


  fastTrendObj.createDom = function(){
    this.lotteryObj = $("#fastTrend_lotteryObj");
    this.playTitleObj = $("#fastTrend_playTitleObj");
    this.updataPlayObj = $("#fastTrend_updataPlayObj");
    this.setObj = $("#fastTrend_setObj");
    this.titleFirstObj = $("#fastTrend_titleFirstObj");
    this.titleConObj = $("#fastTrend_titleConObj");
    this.listFirstObj = $("#fastTrend_listFirstObj");
    this.listConObj = $("#fastTrend_listConObj");
    this.betFirstObj = $("#fastTrend_betFirstObj");
    this.betConObj = $("#fastTrend_betConObj");
    this.explainObj = $("#fastTrend_explainObj");
    this.betObj = $("#fastTrend_betObj");
    this.selectObj = $("#fastTrend_selectObj");
    this.betMoneyObj = $("#fastTrend_betMoneyObj");
    this.qhObj = $("#fastTrend_qhObj");
    this.subObj = $("#fastTrend_subObj");
  }

  fastTrendObj.createEvent = function(){
    this.lotteryObj.unbind('tap').tap(function(e){
      fastTrendObj.lotteryEvent(e);
    });
  }

  fastTrendObj.lotteryEvent = function(e){
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
        case "back" : fastTrendObj.goBack();return true;
        case "updatelottery" : fastTrendObj.updatelottery(thisObj.attr('data-v'),thisObj.attr('data-cn'));return true;
        case "subData" : fastTrendObj.subData(thisObj);return true;
        case "delAll" : fastTrendObj.delAll();this.createSelectBetDom();this.createMoneyDom();return true;
      }
    }

    var liObj = $.oto_checkEvent(e,"LI");
    if(liObj){
      var thisObj = $(liObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "updateTrendName" : fastTrendObj.updateTrendName(thisObj);return true;
      }
    }

    var divObj = $.oto_checkEvent(e,"DIV");
    if(divObj){
      var thisObj = $(divObj);
      var thisT = thisObj.attr("data-t");
      if(thisObj[0].id!="fastTrend_setObj")return false;
      fastTrendObj.hideSet();
    }
  }

  fastTrendObj.showUpdPlay = function(obj){
    if(Number(obj.attr("data-s"))){
      this.updataPlayObj.hide();
      obj.attr("data-s",0);
	   this.lotteryObj.find('.trend_tab').css({'position':'fixed'});
	   this.lotteryObj.find('section.topfix').removeClass('centerWrap').addClass('centerWrap_1');
    }else{
      this.updataPlayObj.show();
      obj.attr("data-s",1);
	  this.lotteryObj.find('.trend_tab').css({'position':'static'});
	  this.lotteryObj.find('section.topfix').removeClass('centerWrap_1').addClass('centerWrap');
    } 

    var bodyHeight = document.body.scrollHeight;
    var divObj = $('<div id="fastTrend_upBGObj" style="width: 100%; height: '+bodyHeight+'px; position: absolute; left: 0px; top: 0px; z-index: 98; background: transparent;" ></div>');
    $("#fastTrend").append(divObj);
    divObj.tap(function(){
      fastTrendObj.updataPlayObj.hide();
      fastTrendObj.playTitleObj.attr("data-s","0");
      divObj.remove();
    });
  }

  fastTrendObj.ajaxGetData = function(){
    var sercetData = {
    	'para': Global.encrypt(this.postData)
    }
    $.ajax({
       url : ConfigObj.localSite + ConfigObj.fastLotApi[ConfigObj.fastLotType].chart,
      data : sercetData,
      type : "post",
      dataType : "json",
      success : function(msg){
		//console.log('11选5获取走势数据[fastTrend]',msg);
        if(msg.code == "0000"){
        	msg.info = $.parseJSON(Global.crypt(msg.info));
         	//if(msg.trendType!=fastTrendObj.postData.trendType)return false;  //todo zhangw
					fastTrendObj.temTrendData = msg.info;
        	fastTrendObj.createPageData();
        	fastTrendObj.createDataDom();
        }else{
		    $.alertMsg(msg.code_str);
            return false;
		}
       
      }
    });
  }

  fastTrendObj.ajaxGetLRData = function(){
  	 var secretData2 = {
  	 	'para': Global.encrypt(this.postData)
  	 }
     $.ajax({
      url : ConfigObj.localSite + ConfigObj.fastLotApi[ConfigObj.fastLotType].chart,
      data : secretData2,
      type : "post",
      dataType : "json",
      success : function(msg){
        if(msg.code!="0000"){
          $.alertMsg(msg.code_str);
          return false;
        }
        msg.info = $.parseJSON(Global.crypt(msg.info));
        fastTrendObj.temLRTrendData = msg.info;
        fastTrendObj.createPageData();
        fastTrendObj.createDataDom();
      }
    });
  }

  fastTrendObj.showSet = function(){
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

  fastTrendObj.hideSet = function(){
    this.setObj.hide();
    this.setObj.removeAttr("data-s",1);
  }

  fastTrendObj.subSet  = function(){
    var spanObj = $("#fastTrend_lotteryObj span[data-t='updateData']");
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

  fastTrendObj.createPageData = function(){
    this.page = 0;
    var trendName = this.postData['trendName'];
    var lotteryPlay = this.postData['trendType'];
    var titleDomData = this[trendName+"TitleData"][lotteryPlay];
    this.maxPage = titleDomData.length;
  }

  fastTrendObj.createDataDom = function(){
    this.createTitleDom();
    this.createListDom();
    this.createExplain();
    this.createBetDom();
    this.createListHeight();
  }

  fastTrendObj.createTitleDom = function(){
    var trendName = this.postData['trendName'];
    var lotteryPlay = this.postData['trendType'];
    var titleDomData = this[trendName+"TitleData"][lotteryPlay];

    var titleFirstData = this[trendName+"TitleFirst"][lotteryPlay][this.page];
    var titleClass = this[trendName+"TitleClass"][lotteryPlay];
    var html = new Array();
    html.push('<div class="clearfix" style="width:'+(this.maxPage >1 ? (((this.conWidth+this.borderWidth)*this.maxPage).toFixed(2)) : ((this.conWidth*this.maxPage).toFixed(2)))+'px;">');
    for(var i=0,ilen=titleDomData.length;i<ilen;i++){
      html.push('<div class="'+titleClass[i]+'" style="width:'+this.conWidth+'px;">');
      for(var k=0,klen=titleDomData[i].length;k<klen;k++){
        if(trendName=="HM"){
          html.push('<span><em>'+titleDomData[i][k]+'</em></span>');
        }else{
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

  fastTrendObj.createListDom = function(){
    var trendName = this.postData['trendName'];
    switch(trendName){
      case "HM" : this.createHMLIst(fastTrendObj.temTrendData);break;
      case "YL" : this.createYLLIst(fastTrendObj.temTrendData);break;
      case "LR" : this.createLRLIst(fastTrendObj.temLRTrendData);break;
    }
    this.createListTitleIscroll();
    this.createListIscroll();
  }

  fastTrendObj.createHMLIst = function(data){
    var showYL = this.postData['showYL'] === "show" ? true : false;
    var showSt = this.postData['statistics'] === "show" ? true : false;
    var titleHtml = new Array();
    var conHtml = new Array();
    titleHtml.push("<div>");
    conHtml.push('<div style="width:'+(this.maxPage>1 ? (((this.conWidth+this.borderWidth)*this.maxPage).toFixed(2)):((this.conWidth*this.maxPage).toFixed(2)))+'px;">');
    var listData = data.list;
    if(!listData)return false;
    for(var i=0,ilen=listData.length;i<ilen;i++){
      titleHtml.push('<p class="qh_con'+(i%2 ? "" : " odd")+'"><span>'+listData[i]['lottery_no'].slice(-2)+'期</span><span class="line fl"><em class="dot"></em></span></p>');
      conHtml.push('<div class="clearfix'+(i%2 ? "" : " odd")+'">');
      for(var k=0,klen=listData[i]['num_miss'].length;k<klen;k++){
        conHtml.push('<div class="trend_num" style="width:'+this.conWidth+'px;">');
        for(var o=0,olen=listData[i]['num_miss'][k].length;o<olen;o++){
          var thisData = listData[i]['num_miss'][k][o];
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

  fastTrendObj.createHMStatistics = function(data){
    var titleHtml = new Array();
    var conHtml = new Array();

    titleHtml.push('<p class="qh_con whitebg"><span>出现总数</span></p>');
    titleHtml.push('<p class="qh_con whitebg"><span>平均遗漏</span></p>');
    titleHtml.push('<p class="qh_con whitebg"><span>最大遗漏</span></p>');
    titleHtml.push('<p class="qh_con whitebg"><span>最大连出</span></p>');

    conHtml.push(this.createHMStatisticeCon(data['num_all']));
    conHtml.push(this.createHMStatisticeCon(data['num_avg_miss']));
    conHtml.push(this.createHMStatisticeCon(data['num_max_miss']));
    conHtml.push(this.createHMStatisticeCon(data['num_con_miss']));

    return {titleHtml:titleHtml,conHtml:conHtml};
  }

  fastTrendObj.createHMStatisticeCon = function(data){
    var conHtml = new Array();
    conHtml.push('<div class="clearfix whitebg">');
    for(var i=0,ilen=data.length;i<ilen;i++){
      conHtml.push('<div class="trend_num" style="width:'+this.conWidth+'px;">');
      for(var k=0,klen=data[i].length;k<klen;k++){
        conHtml.push('<span><em>'+data[i][k]+'</em></span>');
      }
      conHtml.push('</div>');
    }
    conHtml.push('</div>');
    return conHtml.join("");
  }

  fastTrendObj.createYLLIst = function(data){
    var titleHtml = new Array();
    var conHtml = new Array();
    var maxMiss = data['num_max_miss'];
    var preMiss = data['num_pre_miss'];
    var curMiss = data['num_cur_miss'];
    var hapPro = data['num_hap_pro'];

    var titleData = this.betData[this.postData['trendType']][this.page];
    titleHtml.push("<div>");
    conHtml.push('<div style="width:'+(this.maxPage>1 ? (((this.conWidth+this.borderWidth)*this.maxPage).toFixed(2)):((this.conWidth*this.maxPage).toFixed(2)))+'px;">');
    for(var i=0,ilen=titleData.length;i<ilen;i++){
      titleHtml.push('<p data-i="'+i+'" class="qh_con'+(i%2 ? "" : " odd")+'"><span>'+titleData[i]+'</span><span class="line fl"><em class="dot"></em></span></p>');
      conHtml.push('<div data-i="'+i+'" class="clearfix'+(i%2 ? "" : " odd")+'">');
      for(var k=0,klen=maxMiss.length;k<klen;k++){
        var maxMaxMissVal = eval('Math.max('+maxMiss[k]+')');
        var maxPreMissVal = eval('Math.max('+preMiss[k]+')');
        var maxCurMissVal = eval('Math.max('+curMiss[k]+')');
        var maxHapProVal = eval('Math.max('+hapPro[k]+')');

        conHtml.push('<div class="trend_num trend_yl" style="width:'+this.conWidth+'px;">');
        conHtml.push('<span class="'+(maxMiss[k][i] == maxMaxMissVal ? "fontred" : "")+'">'+maxMiss[k][i]+'</span>');
        conHtml.push('<span class="'+(preMiss[k][i] == maxPreMissVal ? "fontred" : "")+'">'+preMiss[k][i]+'</span>');
        conHtml.push('<span class="'+(curMiss[k][i] == maxCurMissVal ? "fontred" : "")+'">'+curMiss[k][i]+'</span>');
        conHtml.push('<span class="'+(hapPro[k][i] == maxHapProVal ? "fontred" : "")+'">'+hapPro[k][i]+'</span>');
        conHtml.push('</div>');
      }
      conHtml.push('</div>');
    }
    conHtml.push('</div>');
    titleHtml.push("</div>");

    this.listConObj.html(conHtml.join(""));
    this.listFirstObj.html(titleHtml.join(""));
  }

  fastTrendObj.createLRLIst = function(data){
    var titleHtml = new Array();
    var conHtml = new Array();
    var num30Data = data['30'];
    var num50Data = data['50'];
    var num100Data = data['100'];
    var missData = data['miss'];

    var titleData = this.betData[this.postData['trendType']][this.page];
    titleHtml.push("<div>");
    conHtml.push('<div style="width:'+(this.maxPage>1 ? (((this.conWidth+this.borderWidth)*this.maxPage).toFixed(2)):((this.conWidth*this.maxPage).toFixed(2)))+'px;">');
    for(var i=0,ilen=titleData.length;i<ilen;i++){
      titleHtml.push('<p data-i="'+i+'" class="qh_con'+(i%2 ? "" : " odd")+'"><span>'+titleData[i]+'</span><span class="line fl"><em class="dot"></em></span></p>');
      conHtml.push('<div data-i="'+i+'" class="clearfix'+(i%2 ? "" : " odd")+'">');
      for(var k=0,klen=missData.length;k<klen;k++){
        var maxnum30Val = eval('Math.max('+num30Data[k]+')');
        var maxnum50Val = eval('Math.max('+num50Data[k]+')');
        var maxnum100Val = eval('Math.max('+num100Data[k]+')');
        var maxmissVal = eval('Math.max('+missData[k]+')');

        conHtml.push('<div class="trend_num trend_yl" style="width:'+this.conWidth+'px;">');
        conHtml.push('<span class="'+(num30Data[k][i] == maxnum30Val ? "fontred" : "")+'">'+num30Data[k][i]+'</span>');
        conHtml.push('<span class="'+(num50Data[k][i] == maxnum50Val ? "fontred" : "")+'">'+num50Data[k][i]+'</span>');
        conHtml.push('<span class="'+(num100Data[k][i] == maxnum100Val ? "fontred" : "")+'">'+num100Data[k][i]+'</span>');
        conHtml.push('<span class="'+(missData[k][i] == maxmissVal ? "fontred" : "")+'">'+missData[k][i]+'</span>');
        conHtml.push('</div>');
      }
      conHtml.push('</div>');
    }
    conHtml.push('</div>');
    titleHtml.push("</div>");

    this.listConObj.html(conHtml.join(""));
    this.listFirstObj.html(titleHtml.join(""));
  }

  fastTrendObj.createExplain = function(){
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

  fastTrendObj.createBetDom = function(){
    var lotteryPlay = this.postData['trendType'];

    var titleDomData = this["betData"][lotteryPlay];
    var titleFirstData = this["betTitle"][lotteryPlay][this.page];
    var html = new Array();
    html.push('<div class="clearfix" style="width:'+(this.maxPage>1 ? (((this.conWidth+this.borderWidth)*this.maxPage).toFixed(2)):((this.conWidth*this.maxPage).toFixed(2)))+'px;">');
    for(var i=0,ilen=titleDomData.length;i<ilen;i++){
      html.push('<div class="trend_num fontred" style="width:'+this.conWidth+'px;">');
      for(var k=0,klen=titleDomData[i].length;k<klen;k++){
        html.push('<span data-t="bet" data-i="'+i+'" data-k="'+k+'"><em '+((this.selectBetData[i] && this.selectBetData[i][k]) ? "class='on'" : "")+'>'+titleDomData[i][k]+'</em></span>');
      }
      html.push('</div>');
    }
    html.push('</div>');

    this.betFirstObj.html(titleFirstData);
    this.betConObj.html(html.join(""));
    this.createBetscroll();
  }

  fastTrendObj.createListHeight = function(){
    var betHeight = this.betObj.height();
    var height = this.conHeight - betHeight;
    var listConHeight = this.listConObj.children('div').height() || 0;
    if(listConHeight!=0 && listConHeight<height)height = listConHeight;
    this.listConObj.height(height);
    this.listFirstObj.height(height);
    if(this.listTitleIscroll)this.listTitleIscroll.refresh();
    if(this.listIscroll)this.listIscroll.refresh();
  }

  fastTrendObj.createListTitleIscroll = function(){
    if(this.listTitleIscroll)this.listTitleIscroll.refresh();
    this.listTitleIscroll = new iScroll(this.listFirstObj[0],{
      hScrollbar : false,
      vScrollbar : false,
      bounce : false,
      momentum : false,
      onScrollMove : function(){
        fastTrendObj.listIscroll.scrollTo(fastTrendObj.listIscroll.x,this.y);
      },
      onMomentum : function(){
        fastTrendObj.listIscroll.scrollTo(fastTrendObj.listIscroll.x,this.y,this.duration);
      }
    });
     var scrollToVal = this.listFirstObj.children('div').height()-this.conHeight;
    scrollToVal = scrollToVal<0 ? 0 : scrollToVal;
    this.listTitleIscroll.scrollTo(0,-1*scrollToVal);
  }

  fastTrendObj.createTitleIscroll = function(){
    if(this.titleIscroll)this.titleIscroll.refresh();
    this.titleIscroll = new iScroll(this.titleConObj[0],{
      hScrollbar : false,
      vScrollbar : false,
      bounce : false,
      momentum : false,
      onScrollMove : function(){
        fastTrendObj.listIscroll.scrollTo(this.x,fastTrendObj.listIscroll.y);
        fastTrendObj.betIscroll.scrollTo(this.x,fastTrendObj.betIscroll.y);
        fastTrendObj.updatePage(this.x);
      },
      onMomentum : function(){
        fastTrendObj.listIscroll.scrollTo(this.x,fastTrendObj.listIscroll.y,this.duration);
        fastTrendObj.betIscroll.scrollTo(this.x,fastTrendObj.betIscroll.y,this.duration);
        fastTrendObj.updatePage(this.x);
      }
    });
  }

  fastTrendObj.createListIscroll = function(){
    if(this.listIscroll)this.listIscroll.refresh();
    this.listIscroll = new iScroll(this.listConObj[0],{
      hScrollbar : false,
      vScrollbar : false,
      bounce : false,
      momentum : false,
      onScrollMove : function(){
        fastTrendObj.titleIscroll.scrollTo(this.x,fastTrendObj.titleIscroll.y);
        fastTrendObj.betIscroll.scrollTo(this.x,fastTrendObj.betIscroll.y);
        fastTrendObj.listTitleIscroll.scrollTo(fastTrendObj.listTitleIscroll.x,this.y);
        fastTrendObj.updatePage(this.x);
      },
      onMomentum : function(){
        fastTrendObj.titleIscroll.scrollTo(this.x,fastTrendObj.titleIscroll.y,this.duration);
        fastTrendObj.betIscroll.scrollTo(this.x,fastTrendObj.betIscroll.y,this.duration);
        fastTrendObj.listTitleIscroll.scrollTo(fastTrendObj.listTitleIscroll.x,this.y,this.duration);
        fastTrendObj.updatePage(this.x);
      } 　 
    });
    var scrollToVal = this.listConObj.children('div').height()-this.conHeight;
    scrollToVal = scrollToVal<0 ? 0 : scrollToVal;
    this.listIscroll.scrollTo(0,-1*scrollToVal);
  }

  fastTrendObj.createBetscroll = function(){
    if(this.betIscroll)this.betIscroll.refresh();
    this.betIscroll = new iScroll(this.betConObj[0],{
      hScrollbar : false,
      vScrollbar : false,
      bounce : false,
      momentum : false,
      onScrollMove : function(){
        fastTrendObj.listIscroll.scrollTo(this.x,fastTrendObj.listIscroll.y);
        fastTrendObj.titleIscroll.scrollTo(this.x,fastTrendObj.titleIscroll.y);
        fastTrendObj.updatePage(this.x);
      },
      onMomentum : function(){
        fastTrendObj.listIscroll.scrollTo(this.x,fastTrendObj.listIscroll.y,this.duration);
        fastTrendObj.titleIscroll.scrollTo(this.x,fastTrendObj.titleIscroll.y,this.duration);
        fastTrendObj.updatePage(this.x);
      } 
    });
  }

  fastTrendObj.updatePage = function(x){
    var positionWidth  = Math.abs(x);
    this.page = Math.floor(positionWidth/this.conWidth);
    var titleData = this[this.postData["trendName"]+"TitleFirst"][this.postData["trendType"]][this.page];
    var betTitleData = this["betTitle"][this.postData["trendType"]][this.page];
    this.titleFirstObj.html(titleData);
    this.betFirstObj.html(betTitleData);
    this.selectObj.children('div').removeClass('on');
    this.selectObj.children('div[data-i="'+this.page+'"]').addClass('on');
  }

  fastTrendObj.updateTrendName = function(obj){
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
      this.createDataDom();
    } 
    this.betFirstObj.html(this.betTitle[this.postData['trendType']][this.page]);
  }

  fastTrendObj.updatelottery = function(thisV,thisCn){
    this.playTitleObj.html("11选5-"+thisCn+'<em class="down"></em>');
    this.postData['trendType'] = thisV;
    this.temSortDom = this.titleFirstObj;

    this.updataPlayObj.hide();
    this.playTitleObj.attr("data-s","0");
    if($("#fastTrend_upBGObj").length)$("#fastTrend_upBGObj").remove();

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
  }

  fastTrendObj.sortDom = function(obj){
    if(this.postData['trendName'] == "HM")return false;
    var thisK = obj.attr("data-k").split("@");
    var dataKey = thisK[0];
    var dataK = thisK[1];
    if(dataKey=="title"){
      var thisData = this.betData[this.postData['trendType']][this.page];
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

  fastTrendObj.sortData = function(data,type){
    var listObj = this.listConObj.children('div').children('div');
    var newListObj = listObj.sort(function(a,b){
      var thisAI = Number($(a).attr("data-i"));
      var thisBI = Number($(b).attr("data-i"));
      if(type=="down"){
        return data[thisAI] - data[thisBI];
      }else if(type=="up"){
        return data[thisBI] - data[thisAI];
      }else if(type=="old"){
        return thisAI - thisBI;
      }
    });
    var titleObj = this.listFirstObj.children('div').children('p');
    for(var i=0,ilen=newListObj.length;i<ilen;i++){
      var thisI = newListObj.eq(i).attr("data-i");
      var thisTitleObj = titleObj.filter("[data-i='"+thisI+"']");
      if(i%2){
        newListObj.eq(i).removeClass("odd");
        thisTitleObj.removeClass('odd');
      }else{
        newListObj.eq(i).addClass("odd");
        thisTitleObj.addClass('odd');
      }
      this.listConObj.children('div').append(newListObj.eq(i));
      this.listFirstObj.children('div').append(thisTitleObj);
    }
  }

  fastTrendObj.betNum = function(obj){
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

  fastTrendObj.createSubData = function(){
	var data = [];
    for(var i=0,ilen=this.betNumData[this.postData['trendType']].length;i<ilen;i++){
      var thisData = [];

      if(!(this.selectBetData[i] && this.selectBetData[i].length)){
        $.alertMsg(this.lotteryBetError[this.postData['trendType']][i]);
        return false;
      }
      for(var k=0,klen=this.selectBetData[i].length;k<klen;k++){
        if(this.selectBetData[i][k])thisData.push(this.selectBetData[i][k]);
      }
      if(!(thisData.length && thisData.length>=this.betNumData[this.postData['trendType']][i])){
        $.alertMsg(this.lotteryBetError[this.postData['trendType']][i]);
        return false;
      }
      if(thisData.length)data.push(thisData.join(","));
    }
    var zs = this.getZS();
    data.push(this.postData["trendType"]);
    data.push(zs);
    return data.join("|");
  }

  fastTrendObj.getCXY = function(x,y){
    if(x<y)return 0;
    var allX = 1;
    var allY = 1;
    for(var i=0,ilen=y;i<ilen;i++){
      allX*=x-i;
      allY*=y-i;
    }
    return allX/allY;
  }

  fastTrendObj.createMoneyDom = function(){
    var zs = this.getZS();
    this.betMoneyObj.html('<span class="fontred">'+zs+'</span>注 <span class="fontred">'+(zs*2)+'</span>元');
  }

  fastTrendObj.getZS = function(){
     if(this.postData['trendType'] == "FP2" || this.postData['trendType'] == "FP3"){
        return fastTrendObj.FP2Bonus();
     }else{
        return fastTrendObj.R2Bonus();
     }
  }
  
  fastTrendObj.R2Bonus = function(){
	 for(var i=0,zs,ilen=this.betNumData[this.postData['trendType']].length;i<ilen;i++){
      if(!(this.selectBetData[i] && this.selectBetData[i].length))return 0;
      var thisData = [];
      for(var k=0,klen=this.selectBetData[i].length;k<klen;k++){
        if(this.selectBetData[i][k])thisData.push(this.selectBetData[i][k]);
      }
      var thisZs = this.getCXY(thisData.length,this.betNumData[this.postData['trendType']][i]);
      zs = zs ? zs*thisZs : thisZs;
     }
     return zs; 
  }
  
   fastTrendObj.FP2Bonus = function(){
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
		for(var i=0,ilen=this.betNumData[this.postData['trendType']].length;i<ilen;i++){
		  getP(this.selectBetData[i]);
		}
		var arg = 0;
		for(var i in temBetData){
		  if(!temBetData[i])continue;
		  if(temBetData[i].split(",").length!=this.betNumData[this.postData['trendType']].length)continue;
		  arg++;
		}
		return arg;   
   }
  

  fastTrendObj.subData = function(obj){
    if(obj.attr("data-stop")){
      $.alertMsg("不在开售时间");
      return false;
    }
    var postData = this.createSubData();
    if(!postData)return false;
    window.localStorage.setItem(this.postData['lottery_type']+"lotteryBetData",postData);
	switch(this.postData['lottery_type']){
		case ConfigObj.fastLotType:
			this.goFastBetConfirm();
			break;	
	}
  }
  
  fastTrendObj.goFastBetConfirm = function(){
	  var self = this;
	  fastBetConfirmObj.goBack = function(){
		  fastTrendObj.show(); 
	  }
	  fastBetConfirmObj.show('reload',function(){
		 fastBetConfirmObj.setData({
			'lotteryType': self.postData['lottery_type'],
			'lotteryCnName': '11选5',
			'lotteryNo' : self.postData.lotteryNoVal,
			'lotteryPlay': self.postData.trendType
		 })
	  });  
  }
  
  fastTrendObj.delAll = function(){
    this.selectBetData = new Array();
    this.betConObj.find("span[data-i]").each(function(){
      $(this).children('em').removeClass('on');
    });
  }

  fastTrendObj.createGetData = function(){
    return '?lotteryType='+this.postData['lottery_type']+'&lotteryNo='+this.postData['lotteryNoVal']+"&lotteryPlay="+this.postData['trendType']+"&res=trend";
  }

  fastTrendObj.createSelectBetDom = function(){
    var html = [];
    for(var i=0,ilen=this.selectBetData.length;i<ilen;i++){
      if(!this.selectBetData[i]){
        html.push('<div class="fl ts_num'+(this.page == i ? " on" : "")+'"></div>');
        continue;
      }
      var thisHtml = ['<div data-i="'+i+'" class="fl ts_num'+(this.page == i ? " on" : "")+'">'];
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
    this.qhObj[(html.length ? "hide" : "show")]().css({'transform':''});
    this.betMoneyObj[(html.length ? "show" : "hide")]();
    this.createListHeight();
  }

 

  fastTrendObj.updateData = function(obj){
    obj.siblings('span').removeClass('on');
    obj.addClass('on');
  }

  fastTrendObj.onloadExecution = function(){
    this.createDom();
    this.createEvent();
    this.createListHeight();
    this.ajaxGetData();
  }
  
  //此页面包含2个js, fastTrend,fastTime,  fastTime负责高频的赛程时间循环及相关更新，不负责投注。而fastTrend则负责具体图表的页面展现及投注
  fastTrendObj.init = function(){
	  fastTrendObj.setDefConfig();
	  fastTimeObj.setDefConfig();
      fastTrendObj.onloadExecution();
	  fastTimeObj.init();
	     
  }
  
  fastTrendObj.destroy = function(){
	 fastTrendObj.setDefConfig();
	 fastTimeObj.setDefConfig();
	 $('#fastTrend').html('').remove();  
  }

