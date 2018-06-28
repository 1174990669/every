
  var d3TrendObj = new PageController({
	   'name': 'd3Trend',
	   'tpl' : 'template/kaijiang/d3Trend.html'  
  });

  d3TrendObj.setDefConfig = function(){
	  d3TrendObj.titleWidth = 17.5/100;
	  d3TrendObj.clientWidth = (document.documentElement.clientWidth || document.body.clientWidth).toFixed(2);
	  d3TrendObj.clientHeight = (document.documentElement.clientHeight || document.body.clientHeight).toFixed(2);
	  d3TrendObj.conWidth = Number((Number(d3TrendObj.clientWidth) * (1-d3TrendObj.titleWidth)).toFixed(2));
	  d3TrendObj.conHeight = Number(d3TrendObj.clientHeight-101-78);
	  d3TrendObj.maxPage = 0;
	  d3TrendObj.page = 0;
	  d3TrendObj.borderWidth = 1;
	
	  d3TrendObj.titleIscroll = "";
	  d3TrendObj.listTitleIscroll = "";
	  d3TrendObj.listIscroll = "";
	  d3TrendObj.temTrendData = "";
	  d3TrendObj.temLRTrendData = "";
	  d3TrendObj.temSortDom = "";
	
	  d3TrendObj.selectBetData = new Array();
	
	  d3TrendObj.postData = {
		num : 50,
		showYL : "show",
		statistics : "show",
		lottery_type : "d3",
    	trendType : "IP",
		trendName : "HM",
		lotteryNoVal : ""
	  }  
	  
  }

  d3TrendObj.betNumData = {
    IP : [1,1,1],
    UP3 : [2],
    UP6 : [3],
    IH : [1],
    UH3 : [1],
    UH6 : [1]
  }

  d3TrendObj.betData = {
    IP : new Array(new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9")),
    UP3 : new Array(new Array("0","1","2","3","4","5","6","7","8","9")),
    UP6 : new Array(new Array("0","1","2","3","4","5","6","7","8","9")),
    IH : new Array(new Array("0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27")),
    UH3 : new Array(new Array("0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27")),
    UH6 : new Array(new Array("0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27"))
  }

  d3TrendObj.betTitle = {
    IP : ["第一位","第二位","第三位"],
    UP3 : ["组三"],
    UP6 : ["组六"],
    IH : ["直选和值","直选和值","直选和值"],
    UH3 : ["组三和值","组三和值","组三和值"],
    UH6 : ["组六和值","组六和值","组六和值"]
  }

  d3TrendObj.HMTitleData = d3TrendObj.betData;

  d3TrendObj.YLTitleData = {
    IP : new Array(new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出")),
    UP3 : new Array(new Array("最大","上次","当期","欲出")),
    UP6 : new Array(new Array("最大","上次","当期","欲出")),
    IH : new Array(new Array("最大","上次","当期","欲出")),
    UH3 : new Array(new Array("最大","上次","当期","欲出")),
    UH6 : new Array(new Array("最大","上次","当期","欲出"))
  }

  d3TrendObj.LRTitleData = {
    IP : new Array(new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏")),
    UP3 : new Array(new Array("30期","50期","100期","遗漏")),
    UP6 : new Array(new Array("30期","50期","100期","遗漏")),
    IH : new Array(new Array("30期","50期","100期","遗漏")),
    UH3 : new Array(new Array("30期","50期","100期","遗漏")),
    UH6 : new Array(new Array("30期","50期","100期","遗漏"))
  }

  d3TrendObj.YLSortKey = {
    IP : new Array(new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")),
    UP3 : new Array(new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")),
    UP6 : new Array(new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")),
    IH : new Array(new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")),
    UH3 : new Array(new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")),
    UH6 : new Array(new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"))
  }

  d3TrendObj.LRSortKey = {
    IP : new Array(new Array("30","50","100","miss"),new Array("30","50","100","miss"),new Array("30","50","100","miss")),
    UP3 : new Array(new Array("30","50","100","miss")),
    UP6 : new Array(new Array("30","50","100","miss")),
    IH : new Array(new Array("30","50","100","miss")),
    UH3 : new Array(new Array("30","50","100","miss")),
    UH6 : new Array(new Array("30","50","100","miss"))
  }

  d3TrendObj.HMTitleClass = {
    IP : new Array("trend_num fontred","trend_num fontred tn2","trend_num fontred tn3"),
    UP3 : new Array("trend_num fontred"),
    UP6 : new Array("trend_num fontred"),
    IH : new Array("trend_num fontred","trend_num fontred tn2","trend_num fontred tn3"),
    UH3 : new Array("trend_num fontred","trend_num fontred tn2","trend_num fontred tn3"),
    UH6 : new Array("trend_num fontred","trend_num fontred tn2","trend_num fontred tn3")
  }

  d3TrendObj.YLTitleClass = {
    IP : new Array("trend_num trend_yl","trend_num trend_yl fontred tn2","trend_num trend_yl fontred tn3"),
    UP3 : new Array("trend_num trend_yl"),
    UP6 : new Array("trend_num trend_yl"),
    IH : new Array("trend_num trend_yl"),
    UH3 : new Array("trend_num trend_yl"),
    UH6 : new Array("trend_num trend_yl")
  }

  d3TrendObj.LRTitleClass = d3TrendObj.YLTitleClass;

  d3TrendObj.HMTitleFirst = {
    IP : ["第一位>","第二位>","第三位>"],
    UP3 : ["期号"],
    UP6 : ["期号"],
    IH : ["期号","期号","期号"],
    UH3 : ["期号","期号","期号"],
    UH6 : ["期号","期号","期号"]
  }

  d3TrendObj.YLTitleFirst = {
    IP : ["第一位<i>↑</i>","第二位<i>↑</i>","第三位<i>↑</i>"],
    UP3 : ["选号<i>↑</i>"],
    UP6 : ["选号<i>↑</i>"],
    IH : ["选号<i>↑</i>"],
    UH3 : ["选号<i>↑</i>"],
    UH6 : ["选号<i>↑</i>"]
  }

  d3TrendObj.LRTitleFirst = d3TrendObj.YLTitleFirst;

  d3TrendObj.YLExplainData = [
    {title:"最大遗漏",con:"统计期内遗漏的最大值"},
    {title:"上次遗漏",con:"指号码自上次开出前的遗漏次数"},
    {title:"当期遗漏",con:"指号码自上次开出后的遗漏次数"},
    {title:"欲出几率",con:"当期遗漏÷平均遗漏×100"}
  ];

  d3TrendObj.LRExplainData = [
    {title:"热号",con:"统计期内出现次数多的为热号"},
    {title:"冷号",con:"统计期内出现次数少的为冷号"},
    {title:"次数",con:"指号码统计期内出现的次数"},
    {title:"遗漏",con:"指号码自上次开出后的遗漏次数"}
  ];


  d3TrendObj.createDom = function(){
    this.lotteryObj = $("#d3Trend_lotteryObj");
    this.playTitleObj = $("#d3Trend_playTitleObj");
    this.updataPlayObj = $("#d3Trend_updataPlayObj");
    this.setObj = $("#d3Trend_setObj");
    this.titleFirstObj = $("#d3Trend_titleFirstObj");
    this.titleConObj = $("#d3Trend_titleConObj");
    this.listFirstObj = $("#d3Trend_listFirstObj");
    this.listConObj = $("#d3Trend_listConObj");
    this.betFirstObj = $("#d3Trend_betFirstObj");
    this.betConObj = $("#d3Trend_betConObj");
    this.explainObj = $("#d3Trend_explainObj");
    this.betObj = $("#d3Trend_betObj");
    this.selectObj = $("#d3Trend_selectObj");
    this.betMoneyObj = $("#d3Trend_betMoneyObj");
    this.qhObj = $("#d3Trend_qhObj");
    this.subObj = $("#d3Trend_subObj");
  }

  d3TrendObj.createEvent = function(){
    this.lotteryObj.unbind('tap').tap(function(e){
      d3TrendObj.lotteryEvent(e);
    });
  }

  d3TrendObj.lotteryEvent = function(e){
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
        case "back" : d3TrendObj.goBack();return true;
        case "updatelottery" : d3TrendObj.updatelottery(thisObj.attr('data-v'),thisObj.attr('data-cn'), thisObj);return true;
        case "subData" : d3TrendObj.subData(thisObj);return true;
        case "delAll" : d3TrendObj.delAll();this.createSelectBetDom();this.createMoneyDom();return true;
      }
    }

    var liObj = $.oto_checkEvent(e,"LI");
    if(liObj){
      var thisObj = $(liObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "updateTrendName" : d3TrendObj.updateTrendName(thisObj);return true;
      }
    }

    var divObj = $.oto_checkEvent(e,"DIV");
    if(divObj){
      var thisObj = $(divObj);
      var thisT = thisObj.attr("data-t");
      if(thisObj[0].id!="d3Trend_setObj")return false;
      d3TrendObj.hideSet();
    }
  }

  d3TrendObj.showUpdPlay = function(obj){
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
    var divObj = $('<div id="d3Trend_upBGObj" style="width: 100%; height: '+bodyHeight+'px; position: absolute; left: 0px; top: 0px; z-index: 98; background: transparent;" ></div>');
    $("#d3Trend").append(divObj);
    divObj.unbind('tap').tap(function(){
      d3TrendObj.updataPlayObj.hide();
      d3TrendObj.playTitleObj.attr("data-s","0");
      divObj.remove();
    });
  }

  d3TrendObj.ajaxGetData = function(){
  	var secretData = {
				'para' : Global.encrypt(this.postData)
			};
    $.ajax({
       url : ConfigObj.localSite +  '?version=1&m=Lottery.d3.getChartData',
      data : secretData,
      type : "post",
      dataType : "json",
      success : function(msg){
		//console.log('福彩3D获取走势数据[d3Trend]',msg);
		
        if(msg.code == "0000"){
            // TODO
            msg.info = $.parseJSON(Global.crypt(msg.info));
            if (msg.trendType != d3TrendObj.postData.trendType)return false;

			d3TrendObj.temTrendData = msg.info;
        	d3TrendObj.createPageData();
        	d3TrendObj.createDataDom();
        }else{
		    $.alertMsg(msg.code_str);
            return false;
		}
       
      }
    });
  }
  
  d3TrendObj.createFormatData = function(data){
    if(this.postData['trendType']!="IH" && this.postData['trendType']!="UH3" && this.postData['trendType']!="UH6")return data;
    var listData = new Array();

    listData.push(data[0].slice(0,9));
    listData.push(data[0].slice(9,18));
    listData.push(data[0].slice(18,28));
    return listData;
  }

  d3TrendObj.createFormatI = function(i){
    if(this.postData['trendType']!="IH" && this.postData['trendType']!="UH3" && this.postData['trendType']!="UH6")return i;
    return 0;
  }

  d3TrendObj.createFormatKey = function(i,k){
    if(this.postData['trendType']!="IH" && this.postData['trendType']!="UH3" && this.postData['trendType']!="UH6")return k;
    return 9*i+k;
  }

  d3TrendObj.createFormatPage = function(p,type){
    if(this.postData['trendType']!="IH" && this.postData['trendType']!="UH3" && this.postData['trendType']!="UH6")return p;
    if(this.postData['trendName']!="YL" && this.postData['trendName']!="LR")return 3;
    if(type=="bet")return 3;
    return 1;
  }

  d3TrendObj.createFormatNowPage = function(p){
    if(this.postData['trendType']!="IH" && this.postData['trendType']!="UH3" && this.postData['trendType']!="UH6")return p;
    if(this.postData['trendName']!="YL" && this.postData['trendName']!="LR")return p;
    return 0;
  }

  d3TrendObj.createFormatBet = function(k,str){
    if(this.postData['trendType']=="UH3"){
      if(k<1)return "";
      if(k>26)return "";
    }
    if(this.postData['trendType']=="UH6"){
      if(k<3)return "";
      if(k>24)return "";
    }
    return str;
  }
  
  d3TrendObj.createFormatClass = function(k){
    if(this.postData['trendType']=="UH3"){
      if(k<1)return "class='disabled'";
      if(k>26)return "class='disabled'";
    }
    if(this.postData['trendType']=="UH6"){
      if(k<3)return "class='disabled'";
      if(k>24)return "class='disabled'";
    }
    return '';
  }

  d3TrendObj.ajaxGetLRData = function(){
  	var secretData2 = {
			'para' : Global.encrypt(this.postData)
		};
     $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=Lottery.d3.getChartData',
      data : secretData2,
      type : "post",
      dataType : "json",
      success : function(msg){
      	
        if(msg.code!="0000"){
          $.alertMsg(msg.code_str);
          return false;
        }
        msg.info = $.parseJSON(Global.crypt(msg.info));
        d3TrendObj.temLRTrendData = msg.info;
        d3TrendObj.createPageData();
        d3TrendObj.createDataDom();
      }
    });
  }

  d3TrendObj.showSet = function(){
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

  d3TrendObj.hideSet = function(){
    this.setObj.hide();
    this.setObj.removeAttr("data-s",1);
  }

  d3TrendObj.subSet  = function(){
    var spanObj = $("#d3Trend_lotteryObj span[data-t='updateData']");
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

  d3TrendObj.createPageData = function(){
    this.page = 0;
    var trendName = this.postData['trendName'];
    var lotteryPlay = this.postData['trendType'];
    var titleDomData = this[trendName+"TitleData"][lotteryPlay];
    this.maxPage = titleDomData.length;
  }

  d3TrendObj.createDataDom = function(){
    this.createTitleDom();
    this.createListDom();
    this.createExplain();
    this.createBetDom();
    this.createListHeight();
  }

  d3TrendObj.createTitleDom = function(){
    var trendName = this.postData['trendName'];
    var lotteryPlay = this.postData['trendType'];
    var titleDomData = this.createFormatData(this[trendName+"TitleData"][lotteryPlay]);

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

  d3TrendObj.createListDom = function(){
    var trendName = this.postData['trendName'];
    switch(trendName){
      case "HM" : this.createHMLIst(d3TrendObj.temTrendData);break;
      case "YL" : this.createYLLIst(d3TrendObj.temTrendData);break;
      case "LR" : this.createLRLIst(d3TrendObj.temLRTrendData);break;
    }
    this.createListTitleIscroll();
    this.createListIscroll();
  }

  d3TrendObj.createHMLIst = function(data){
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
	  ////console.log(newMissData);
      for(var k=0,klen=newMissData.length;k<klen;k++){
        conHtml.push('<div class="trend_num trend_w'+newMissData[k].length+'" style="width:'+this.conWidth+'px;">');
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

  d3TrendObj.createHMStatistics = function(data){
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

  d3TrendObj.createHMStatisticeCon = function(data){
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

  d3TrendObj.createYLLIst = function(data){
     var titleHtml = new Array();
    var conHtml = new Array();
    var maxMiss = data['num_max_miss'];
    var preMiss = data['num_pre_miss'];
    var curMiss = data['num_cur_miss'];
    var hapPro = data['num_hap_pro'];

    var titleData = this.betData[this.postData['trendType']][this.createFormatNowPage(this.page)];
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

  d3TrendObj.createLRLIst = function(data){
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

  d3TrendObj.createExplain = function(){
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

  d3TrendObj.createBetDom = function(){
     var lotteryPlay = this.postData['trendType'];

    var titleDomData = this.createFormatData(this["betData"][lotteryPlay]);
    var titleFirstData = this["betTitle"][lotteryPlay][this.createFormatNowPage(this.page)];
    var html = new Array();
    html.push('<div class="clearfix" style="width:'+(this.createFormatPage(this.maxPage,"bet")>1 ? (((this.conWidth+this.borderWidth)*this.createFormatPage(this.maxPage,"bet")).toFixed(2)):((this.conWidth*this.createFormatPage(this.maxPage,"bet")).toFixed(2)))+'px;">');
	//console.log(titleDomData);
    for(var i=0,ilen=titleDomData.length;i<ilen;i++){
      html.push('<div class="trend_num fontred trend_w'+titleDomData[i].length+'" style="width:'+this.conWidth+'px;">');
      for(var k=0,klen=titleDomData[i].length;k<klen;k++){
		 // zhangw modify
		/*if(lotteryPlay == 'UH3' || lotteryPlay == 'UH6'){
			html.push('<span  data-t="'+this.createFormatBet(titleDomData[i][k],'bet')+'" data-i="'+this.createFormatI(i)+'" data-k="'+this.createFormatKey(i,k)+'"><em '+((this.selectBetData[i] && this.selectBetData[i][k]) ? "class='on'" : "")+'>'+titleDomData[i][k]+'</em></span>');
		}else{
        	html.push('<span  data-t="'+this.createFormatBet(k,'bet')+'" data-i="'+this.createFormatI(i)+'" data-k="'+this.createFormatKey(i,k)+'"><em '+((this.selectBetData[i] && this.selectBetData[i][k]) ? "class='on'" : "")+'>'+titleDomData[i][k]+'</em></span>');
		}*/
		html.push('<span data-t="'+this.createFormatBet(this.createFormatKey(i,k),'bet')+'" data-i="'+this.createFormatI(i)+'" data-k="'+this.createFormatKey(i,k)+'"><em '+((this.selectBetData[i] && this.selectBetData[i][k]) ? "class='on'" : this.createFormatClass(this.createFormatKey(i,k)))+'>'+titleDomData[i][k]+'</em></span>');
      }
      html.push('</div>');
    }
    html.push('</div>');

    this.betFirstObj.html(titleFirstData);
    this.betConObj.html(html.join(""));
    this.createBetscroll();
  }

  d3TrendObj.createListHeight = function(){
    var betHeight = this.betObj.height();
    var height = this.conHeight - betHeight;
    var listConHeight = this.listConObj.children('div').height() || 0;
    if(listConHeight!=0 && listConHeight<height)height = listConHeight;
    this.listConObj.height(height);
    this.listFirstObj.height(height);
    if(this.listTitleIscroll)this.listTitleIscroll.refresh();
    if(this.listIscroll)this.listIscroll.refresh();
  }

  d3TrendObj.createListTitleIscroll = function(){
    if(this.listTitleIscroll)this.listTitleIscroll.refresh();
    this.listTitleIscroll = new iScroll(this.listFirstObj[0],{
      hScrollbar : false,
      vScrollbar : false,
      bounce : false,
      momentum : false,
      onScrollMove : function(){
        d3TrendObj.listIscroll.scrollTo(d3TrendObj.listIscroll.x,this.y);
      },
      onMomentum : function(){
        d3TrendObj.listIscroll.scrollTo(d3TrendObj.listIscroll.x,this.y,this.duration);
      }
    });
     var scrollToVal = this.listFirstObj.children('div').height()-this.conHeight;
    scrollToVal = scrollToVal<0 ? 0 : scrollToVal;
    this.listTitleIscroll.scrollTo(0,-1*scrollToVal);
  }

  d3TrendObj.createTitleIscroll = function(){
    if(this.titleIscroll)this.titleIscroll.refresh();
    this.titleIscroll = new iScroll(this.titleConObj[0],{
      hScrollbar : false,
      vScrollbar : false,
      bounce : false,
      momentum : false,
      onScrollMove : function(){
        d3TrendObj.listIscroll.scrollTo(this.x,d3TrendObj.listIscroll.y);
        d3TrendObj.betIscroll.scrollTo(this.x,d3TrendObj.betIscroll.y);
        d3TrendObj.updatePage(this.x);
      },
      onMomentum : function(){
        d3TrendObj.listIscroll.scrollTo(this.x,d3TrendObj.listIscroll.y,this.duration);
        d3TrendObj.betIscroll.scrollTo(this.x,d3TrendObj.betIscroll.y,this.duration);
        d3TrendObj.updatePage(this.x);
      }
    });
  }

  d3TrendObj.createListIscroll = function(){
    if(this.listIscroll)this.listIscroll.refresh();
    this.listIscroll = new iScroll(this.listConObj[0],{
      hScrollbar : false,
      vScrollbar : false,
      bounce : false,
      momentum : false,
      onScrollMove : function(){
        d3TrendObj.titleIscroll.scrollTo(this.x,d3TrendObj.titleIscroll.y);
        d3TrendObj.betIscroll.scrollTo(this.x,d3TrendObj.betIscroll.y);
        d3TrendObj.listTitleIscroll.scrollTo(d3TrendObj.listTitleIscroll.x,this.y);
        d3TrendObj.updatePage(this.x);
      },
      onMomentum : function(){
        d3TrendObj.titleIscroll.scrollTo(this.x,d3TrendObj.titleIscroll.y,this.duration);
        d3TrendObj.betIscroll.scrollTo(this.x,d3TrendObj.betIscroll.y,this.duration);
        d3TrendObj.listTitleIscroll.scrollTo(d3TrendObj.listTitleIscroll.x,this.y,this.duration);
        d3TrendObj.updatePage(this.x);
      } 　 
    });
     var scrollToVal = this.listConObj.children('div').height()-this.conHeight;
    scrollToVal = scrollToVal<0 ? 0 : scrollToVal;
    this.listIscroll.scrollTo(0,-1*scrollToVal);
  }

  d3TrendObj.createBetscroll = function(){
     if(this.betIscroll)this.betIscroll.refresh();
    this.betIscroll = new iScroll(this.betConObj[0],{
      hScrollbar : false,
      vScrollbar : false,
      bounce : false,
      momentum : false,
      onScrollMove : function(){
        if((d3TrendObj.postData['trendName'] == "YL" || d3TrendObj.postData['trendName'] == "LR") && (d3TrendObj.postData['trendType']=="IH" || d3TrendObj.postData['trendType']=="UH3" || d3TrendObj.postData['trendType']=="UH6"))return false;
        d3TrendObj.listIscroll.scrollTo(this.x,d3TrendObj.listIscroll.y);
        d3TrendObj.titleIscroll.scrollTo(this.x,d3TrendObj.titleIscroll.y);
        d3TrendObj.updatePage(this.x);
      },
      onMomentum : function(){
        if((d3TrendObj.postData['trendName'] == "YL" || d3TrendObj.postData['trendName'] == "LR") && (d3TrendObj.postData['trendType']=="IH" || d3TrendObj.postData['trendType']=="UH3" || d3TrendObj.postData['trendType']=="UH6"))return false;
        d3TrendObj.listIscroll.scrollTo(this.x,d3TrendObj.listIscroll.y,this.duration);
        d3TrendObj.titleIscroll.scrollTo(this.x,d3TrendObj.titleIscroll.y,this.duration);
        d3TrendObj.updatePage(this.x);
      } 
    });
  }

  d3TrendObj.updatePage = function(x){
    var positionWidth  = Math.abs(x);
    this.page = Math.floor(positionWidth/this.conWidth);
    var titleData = this[this.postData["trendName"]+"TitleFirst"][this.postData["trendType"]][this.page];
    var betTitleData = this["betTitle"][this.postData["trendType"]][this.page];
    this.titleFirstObj.html(titleData);
    this.betFirstObj.html(betTitleData);
    this.selectObj.children('div').removeClass('on');
    this.selectObj.children('div[data-i="'+this.page+'"]').addClass('on');
  }

  d3TrendObj.updateTrendName = function(obj){
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

  d3TrendObj.updatelottery = function(thisV,thisCn,node){
    this.playTitleObj.html("福彩3D-"+thisCn+'<em class="down"></em>');
    this.postData['trendType'] = thisV;
    this.temSortDom = this.titleFirstObj;

    this.updataPlayObj.hide();
    this.updataPlayObj.find('p').removeClass('selected');
    if (node) {node.addClass('selected');}
    this.playTitleObj.attr("data-s","0");
    if($("#d3Trend_upBGObj").length)$("#d3Trend_upBGObj").remove();

    this.temTrendData = "";
    this.temLRTrendData = "";
    this.page = 0;
    this.maxPage = 0;
    if(this.postData['trendName']=="LR"){
      this.ajaxGetLRData();
    }else{
      this.ajaxGetData();
    }
    this.selectBetData = new Array();
    this.createSelectBetDom();
  }

  d3TrendObj.sortDom = function(obj){
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

  d3TrendObj.sortData = function(data,type){
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

  d3TrendObj.betNum = function(obj){
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

  d3TrendObj.createSubData = function(){
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

  d3TrendObj.getCXY = function(x,y){
    if(x<y)return 0;
    var allX = 1;
    var allY = 1;
    for(var i=0,ilen=y;i<ilen;i++){
      allX*=x-i;
      allY*=y-i;
    }
    return allX/allY;
  }

  d3TrendObj.createMoneyDom = function(){
    var zs = this.getZS();
    this.betMoneyObj.html('<span class="fontred">'+zs+'</span>注 <span class="fontred">'+(zs*2)+'</span>元');
  }

  d3TrendObj.getZS = function(){
     switch(this.postData['trendType']){
      case "IP" : return d3TrendObj.IPBonus();
      case "UP3" : return 2*d3TrendObj.IPBonus();
      case "UP6" : return d3TrendObj.IPBonus();
      case "IH" : return d3TrendObj.IHBonus();
      case "UH3" : return d3TrendObj.UH3Bonus();
      case "UH6" : return d3TrendObj.UH6Bonus();
    }
  }
  
  d3TrendObj.IPBonus = function(){
	 for(var i=0,zs,ilen=this.betNumData[this.postData['trendType']].length;i<ilen;i++){
      if(!(this.selectBetData[i] && this.selectBetData[i].length))return 0;

      // 如果其中有某位没有选择，仍然算作 0 注，liuchao
      if (this.selectBetData[i].every(function (v) {return !v;})) return 0;

      var thisData = [];
      for(var k=0,klen=this.selectBetData[i].length;k<klen;k++){
        if(this.selectBetData[i][k])thisData.push(this.selectBetData[i][k]);
      }
      var thisZs = this.getCXY(thisData.length,this.betNumData[this.postData['trendType']][i]);
      zs = zs ? zs*thisZs : thisZs;
     }
     return zs; 
  }
  
  d3TrendObj.IHBonus = function(){
    var betTep = {0:1,1:3,2:6,3:10,4:15,5:21,6:28,7:36,8:45,9:55,10:63,11:69,12:73,13:75,14:75,15:73,16:69,17:63,18:55,19:45,20:36,21:28,22:21,23:15,24:10,25:6,26:3,27:1};
    for(var i=0,zs=0,ilen=this.betNumData[this.postData['trendType']].length;i<ilen;i++){
      for(var k=0,klen=this.selectBetData[i].length;k<klen;k++){
        if(this.selectBetData[i][k])zs+=betTep[this.selectBetData[i][k]];
      }
    }
    return zs;
  }

  d3TrendObj.UH3Bonus = function(){
    var betTep = {0:0,1:1,2:2,3:1,4:3,5:3,6:3,7:4,8:5,9:4,10:5,11:5,12:4,13:5,14:5,15:4,16:5,17:5,18:4,19:5,20:4,21:3,22:3,23:3,24:1,25:2,26:1,27:0};
    for(var i=0,zs=0,ilen=this.betNumData[this.postData['trendType']].length;i<ilen;i++){
      for(var k=0,klen=this.selectBetData[i].length;k<klen;k++){
        if(this.selectBetData[i][k])zs+=betTep[this.selectBetData[i][k]];
      }
    }
    return zs;
  }

  d3TrendObj.UH6Bonus = function(){
    var betTep = {0:0,1:0,2:0,3:1,4:1,5:2,6:3,7:4,8:5,9:7,10:8,11:9,12:10,13:10,14:10,15:10,16:9,17:8,18:7,19:5,20:4,21:3,22:2,23:1,24:1,25:0,26:0,27:0};
    for(var i=0,zs=0,ilen=this.betNumData[this.postData['trendType']].length;i<ilen;i++){
      for(var k=0,klen=this.selectBetData[i].length;k<klen;k++){
        if(this.selectBetData[i][k])zs+=betTep[this.selectBetData[i][k]];
      }
    }
    return zs;
  }
  

  d3TrendObj.subData = function(obj){
    if(obj.attr("data-stop")){
      $.alertMsg("不在开售时间");
      return false;
    }
    var postData = this.createSubData();
    if(!postData)return false;
    window.localStorage.setItem(this.postData['lottery_type']+"lotteryBetData",postData);
	switch(this.postData['lottery_type']){
		case 'd3':
			this.goPl3Confirm();
			break;	
	}
  }
  
  d3TrendObj.goPl3Confirm = function(){
	  var self = this;
	  d3ConfirmObj.goBack = function(){
		  d3TrendObj.show(); 
	  }
	  d3ConfirmObj.show('reload',function(){
		 d3ConfirmObj.setData({
			'lotteryType': self.postData['lottery_type'],
			'lotteryCnName': '福彩3D',
			'lotteryNo' : self.postData.lotteryNoVal,
			'lotteryPlay': self.postData.trendType
		 })
	  });  
  }
  
  d3TrendObj.delAll = function(){
    this.selectBetData = new Array();
    this.betConObj.find("span[data-i]").each(function(){
      $(this).children('em').removeClass('on');
    });
  }

  d3TrendObj.createGetData = function(){
    return '?lotteryType='+this.postData['lottery_type']+'&lotteryNo='+this.postData['lotteryNoVal']+"&lotteryPlay="+this.postData['trendType']+"&res=trend";
  }

  d3TrendObj.createSelectBetDom = function(){
     var html = [];
    for(var i=0,ilen=this.selectBetData.length;i<ilen;i++){
     if(!this.selectBetData[i] || this.selectBetData[i].every(function (v) {return !v;})){
        html.push('<div class="fl ts_num'+(this.page == i ? " on" : "")+'"></div>');
        continue;
      }
      var thisHtml = ['<div data-i="'+i+'" class="fl ts_num'+(this.createFormatNowPage(this.page) == i ? " on" : "")+'">'];
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

 

  d3TrendObj.updateData = function(obj){
    obj.siblings('span').removeClass('on');
    obj.addClass('on');
  }

  d3TrendObj.onloadExecution = function(){
    this.createDom();
    this.createEvent();
    this.createListHeight();
    this.ajaxGetData();
  }
  
  //此页面包含2个js, d3Trend,d3Time,  d3Time负责高频的赛程时间循环及相关更新，不负责投注。而d3Trend则负责具体图表的页面展现及投注
  d3TrendObj.init = function(){
	  d3TrendObj.setDefConfig();
	  d3TimeObj.setDefConfig();
      d3TrendObj.onloadExecution();
	  d3TimeObj.init();
	     
  }
  
  d3TrendObj.destroy = function(){
	 d3TrendObj.setDefConfig();
	 d3TimeObj.setDefConfig();
	 $('#d3Trend').html('').remove();  
  }

