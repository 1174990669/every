
  var qxcTrendObj = new PageController({
	   'name': 'qxcTrend',
	   'tpl' : 'template/kaijiang/qxcTrend.html'  
  });

  qxcTrendObj.setDefConfig = function(){
	  qxcTrendObj.titleWidth = 17.5/100;
	  qxcTrendObj.clientWidth = (document.documentElement.clientWidth || document.body.clientWidth).toFixed(2);
	  qxcTrendObj.clientHeight = (document.documentElement.clientHeight || document.body.clientHeight).toFixed(2);
	  qxcTrendObj.conWidth = Number((Number(qxcTrendObj.clientWidth) * (1-qxcTrendObj.titleWidth)).toFixed(2));
	  qxcTrendObj.conHeight = Number(qxcTrendObj.clientHeight-101-78);
	  qxcTrendObj.maxPage = 0;
	  qxcTrendObj.page = 0;
	  qxcTrendObj.borderWidth = 1;
	
	  qxcTrendObj.titleIscroll = "";
	  qxcTrendObj.listTitleIscroll = "";
	  qxcTrendObj.listIscroll = "";
	  qxcTrendObj.temTrendData = "";
	  qxcTrendObj.temLRTrendData = "";
	  qxcTrendObj.temSortDom = "";
	
	  qxcTrendObj.selectBetData = new Array();
	
	  qxcTrendObj.postData = {
		num : 50,
		showYL : "show",
		statistics : "show",
	    lottery_type : "qxc",
    	trendType : "P",
		trendName : "HM",
		lotteryNoVal : ""
	  }  
	  
  }

  qxcTrendObj.betNumData = {
      P : [1,1,1,1,1,1,1]
  }

  qxcTrendObj.betData = {
      P : new Array(new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9"))
  }

  qxcTrendObj.betTitle = {
    P : ["第一位","第二位","第三位","第四位","第五位","第六位","第七位"]
  }

  qxcTrendObj.HMTitleData = qxcTrendObj.betData;

  qxcTrendObj.YLTitleData = {
     P : new Array(new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出"))
  }

  qxcTrendObj.LRTitleData = {
     P : new Array(new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏"))
  }

  qxcTrendObj.YLSortKey = {
      P : new Array(new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"))
  }

  qxcTrendObj.LRSortKey = {
     P : new Array(new Array("30","50","100","miss"),new Array("30","50","100","miss"),new Array("30","50","100","miss"),new Array("30","50","100","miss"),new Array("30","50","100","miss"),new Array("30","50","100","miss"),new Array("30","50","100","miss"))
  }

  qxcTrendObj.HMTitleClass = {
        P : new Array("trend_num fontred","trend_num fontred tn2","trend_num fontred tn3","trend_num fontred tn4","trend_num fontred tn5","trend_num fontred tn6","trend_num fontred tn7")
  }

  qxcTrendObj.YLTitleClass = {
       P : new Array("trend_num trend_yl","trend_num trend_yl fontred tn2","trend_num trend_yl fontred tn3","trend_num trend_yl fontred tn4","trend_num trend_yl fontred tn5","trend_num trend_yl fontred tn6","trend_num trend_yl fontred tn7")
  }

  qxcTrendObj.LRTitleClass = qxcTrendObj.YLTitleClass;

  qxcTrendObj.HMTitleFirst = {
      P : ["第一位>","第二位>","第三位>","第四位>","第五位>","第六位>","第七位>"]
  }

  qxcTrendObj.YLTitleFirst = {
     P : ["第一位<i>↑</i>","第二位<i>↑</i>","第三位<i>↑</i>","第四位<i>↑</i>","第五位<i>↑</i>","第六位<i>↑</i>","第七位<i>↑</i>"]
  }

  qxcTrendObj.LRTitleFirst = qxcTrendObj.YLTitleFirst;

  qxcTrendObj.YLExplainData = [
    {title:"最大遗漏",con:"统计期内遗漏的最大值"},
    {title:"上次遗漏",con:"指号码自上次开出前的遗漏次数"},
    {title:"当期遗漏",con:"指号码自上次开出后的遗漏次数"},
    {title:"欲出几率",con:"当期遗漏÷平均遗漏×100"}
  ];

  qxcTrendObj.LRExplainData = [
    {title:"热号",con:"统计期内出现次数多的为热号"},
    {title:"冷号",con:"统计期内出现次数少的为冷号"},
    {title:"次数",con:"指号码统计期内出现的次数"},
    {title:"遗漏",con:"指号码自上次开出后的遗漏次数"}
  ];


  qxcTrendObj.createDom = function(){
    this.lotteryObj = $("#qxcTrend_lotteryObj");
    this.playTitleObj = $("#qxcTrend_playTitleObj");
    this.updataPlayObj = $("#qxcTrend_updataPlayObj");
    this.setObj = $("#qxcTrend_setObj");
    this.titleFirstObj = $("#qxcTrend_titleFirstObj");
    this.titleConObj = $("#qxcTrend_titleConObj");
    this.listFirstObj = $("#qxcTrend_listFirstObj");
    this.listConObj = $("#qxcTrend_listConObj");
    this.betFirstObj = $("#qxcTrend_betFirstObj");
    this.betConObj = $("#qxcTrend_betConObj");
    this.explainObj = $("#qxcTrend_explainObj");
    this.betObj = $("#qxcTrend_betObj");
    this.selectObj = $("#qxcTrend_selectObj");
    this.betMoneyObj = $("#qxcTrend_betMoneyObj");
    this.qhObj = $("#qxcTrend_qhObj");
    this.subObj = $("#qxcTrend_subObj");
  }

  qxcTrendObj.createEvent = function(){
    this.lotteryObj.unbind('tap').tap(function(e){
      qxcTrendObj.lotteryEvent(e);
    });
  }

  qxcTrendObj.lotteryEvent = function(e){
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
        case "back" : qxcTrendObj.goBack();return true;
        case "updatelottery" : qxcTrendObj.updatelottery(thisObj);return true;
        case "subData" : qxcTrendObj.subData(thisObj);return true;
        case "delAll" : qxcTrendObj.delAll();this.createSelectBetDom();this.createMoneyDom();return true;
      }
    }

    var liObj = $.oto_checkEvent(e,"LI");
    if(liObj){
      var thisObj = $(liObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "updateTrendName" : qxcTrendObj.updateTrendName(thisObj);return true;
      }
    }

    var divObj = $.oto_checkEvent(e,"DIV");
    if(divObj){
      var thisObj = $(divObj);
      var thisT = thisObj.attr("data-t");
      if(thisObj[0].id!="qxcTrend_setObj")return false;
      qxcTrendObj.hideSet();
    }
  }

  qxcTrendObj.showUpdPlay = function(obj){
    if(Number(obj.attr("data-s"))){
      this.updataPlayObj.hide();
      obj.attr("data-s",0);
    }else{
      this.updataPlayObj.show();
      obj.attr("data-s",1);
    } 

    var bodyHeight = document.body.scrollHeight;
    var divObj = $('<div id="qxcTrend_upBGObj" style="width: 100%; height: '+bodyHeight+'px; position: absolute; left: 0px; top: 0px; z-index: 98; background: transparent;" ></div>');
    $("body").append(divObj);
    divObj.tap(function(){
      qxcTrendObj.updataPlayObj.hide();
      qxcTrendObj.playTitleObj.attr("data-s","0");
      divObj.remove();
    });
  }

  qxcTrendObj.ajaxGetData = function(){
    $.ajax({
       url : ConfigObj.localSite +  '?version=1&m=Lottery.qxc.getChartData',
      data : this.postData,
      type : "post",
      dataType : "json",
      success : function(msg){
		//console.log('七星彩获取走势数据[qxcTrend]',msg);
        if(msg.code == "0000"){
         	//if(msg.trendType!=qxcTrendObj.postData.trendType)return false;  //todo zhangw
			qxcTrendObj.temTrendData = msg.info;
        	qxcTrendObj.createPageData();
        	qxcTrendObj.createDataDom();
        }else{
		    $.alertMsg(msg.code_str);
            return false;
		}
       
      }
    });
  }
  
  qxcTrendObj.createFormatData = function(data){
    if(this.postData['trendType']!="P" || this.postData['trendName']!="HM")return data;
    var listData = new Array();

    listData.push(data[0].slice(0,12));
    listData.push(data[0].slice(12,24));
    listData.push(data[0].slice(24,35));
    listData.push(data[1].slice(0,12));
    return listData;
  }

  qxcTrendObj.createFormatI = function(i){
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

  qxcTrendObj.createFormatKey = function(i,k){
    if(this.postData['trendType']!="P")return k;
    switch(i){
      case 0 : return k;
      case 1 : return 12+k;
      case 2 : return 24+k;
      case 3 : return k;
    }
  }

  qxcTrendObj.createFormatPage = function(p,type){
    if(this.postData['trendType']!="P")return p;
    if(this.postData['trendName']!="YL" && this.postData['trendName']!="LR")return 4;
    if(this.postData['trendName']=="YL")return p;
    if(this.postData['trendName']=="LR")return p;
    if(type=="bet")return 4;
    return 1;
  }

  qxcTrendObj.createFormatNowPage = function(p){
    if(this.postData['trendType']!="P")return p;
    if(p<3)return 0;
    return 1;
  }

  qxcTrendObj.createFormatBet = function(k,str){
    return str;
  }

  qxcTrendObj.ajaxGetLRData = function(){
     $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=Lottery.qxc.getChartData',
      data : this.postData,
      type : "post",
      dataType : "json",
      success : function(msg){
        if(msg.code!="0000"){
          $.alertMsg(msg.code_str);
          return false;
        }
        qxcTrendObj.temLRTrendData = msg.info;
        qxcTrendObj.createPageData();
        qxcTrendObj.createDataDom();
      }
    });
  }

  qxcTrendObj.showSet = function(){
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

  qxcTrendObj.hideSet = function(){
    this.setObj.hide();
    this.setObj.removeAttr("data-s",1);
  }

  qxcTrendObj.subSet  = function(){
    var spanObj = $("#qxcTrend_lotteryObj span[data-t='updateData']");
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

  qxcTrendObj.createPageData = function(){
    this.page = 0;
    var trendName = this.postData['trendName'];
    var lotteryPlay = this.postData['trendType'];
    var titleDomData = this[trendName+"TitleData"][lotteryPlay];
    this.maxPage = titleDomData.length;
  }

  qxcTrendObj.createDataDom = function(){
    this.createTitleDom();
    this.createListDom();
    this.createExplain();
    this.createBetDom();
    this.createListHeight();
  }

  qxcTrendObj.createTitleDom = function(){
     var trendName = this.postData['trendName'];
    var lotteryPlay = this.postData['trendType'];
    var titleDomData = this[trendName+"TitleData"][lotteryPlay];

    var titleFirstData = this[trendName+"TitleFirst"][lotteryPlay][this.page];
    var titleClass = this[trendName+"TitleClass"][lotteryPlay];
    var html = new Array();
    html.push('<div class="clearfix" style="width:'+(this.maxPage >1 ? (((this.conWidth+this.borderWidth)*this.maxPage).toFixed(2)) : ((this.conWidth*this.maxPage).toFixed(2)))+'px;">');
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

  qxcTrendObj.createListDom = function(){
    var trendName = this.postData['trendName'];
    switch(trendName){
      case "HM" : this.createHMLIst(qxcTrendObj.temTrendData);break;
      case "YL" : this.createYLLIst(qxcTrendObj.temTrendData);break;
      case "LR" : this.createLRLIst(qxcTrendObj.temLRTrendData);break;
    }
    this.createListTitleIscroll();
    this.createListIscroll();
  }

  qxcTrendObj.createHMLIst = function(data){
     var showYL = this.postData['showYL'] === "show" ? true : false;
    var showSt = this.postData['statistics'] === "show" ? true : false;
    var titleHtml = new Array();
    var conHtml = new Array();
    titleHtml.push("<div>");
    conHtml.push('<div style="width:'+(this.maxPage>1 ? (((this.conWidth+this.borderWidth)*this.maxPage).toFixed(2)):((this.conWidth*this.maxPage).toFixed(2)))+'px;">');
    var listData = data.list;
    if(!listData)return false;
    for(var i=0,ilen=listData.length;i<ilen;i++){
      titleHtml.push('<p class="qh_con'+(i%2 ? "" : " odd")+'"><span>'+listData[i]['lottery_no'].slice(-3)+'期</span><span class="line fl"><em class="dot"></em></span></p>');
      conHtml.push('<div class="clearfix'+(i%2 ? "" : " odd")+'">');
      for(var k=0,klen=listData[i]['num_miss'].length;k<klen;k++){
        conHtml.push('<div class="trend_num trend_w'+listData[i]['num_miss'][k].length+'" style="width:'+this.conWidth+'px;">');
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

  qxcTrendObj.createHMStatistics = function(data){
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

  qxcTrendObj.createHMStatisticeCon = function(data){
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

  qxcTrendObj.createYLLIst = function(data){
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

  qxcTrendObj.createLRLIst = function(data){
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

  qxcTrendObj.createExplain = function(){
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

  qxcTrendObj.createBetDom = function(){
    var lotteryPlay = this.postData['trendType'];

    var titleDomData = this["betData"][lotteryPlay];
    var titleFirstData = this["betTitle"][lotteryPlay][this.page];
    var html = new Array();
    html.push('<div class="clearfix" style="width:'+(this.maxPage>1 ? (((this.conWidth+this.borderWidth)*this.maxPage).toFixed(2)):((this.conWidth*this.maxPage).toFixed(2)))+'px;">');
    for(var i=0,ilen=titleDomData.length;i<ilen;i++){
      html.push('<div class="trend_num fontred trend_w'+titleDomData[i].length+'" style="width:'+this.conWidth+'px;">');
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

  qxcTrendObj.createListHeight = function(){
    var betHeight = this.betObj.height();
    var height = this.conHeight - betHeight;
    var listConHeight = this.listConObj.children('div').height() || 0;
    if(listConHeight!=0 && listConHeight<height)height = listConHeight;
    this.listConObj.height(height);
    this.listFirstObj.height(height);
    if(this.listTitleIscroll)this.listTitleIscroll.refresh();
    if(this.listIscroll)this.listIscroll.refresh();
  }

  qxcTrendObj.createListTitleIscroll = function(){
    if(this.listTitleIscroll)this.listTitleIscroll.refresh();
    this.listTitleIscroll = new iScroll(this.listFirstObj[0],{
      hScrollbar : false,
      vScrollbar : false,
      bounce : false,
      momentum : false,
      onScrollMove : function(){
        qxcTrendObj.listIscroll.scrollTo(qxcTrendObj.listIscroll.x,this.y);
      },
      onMomentum : function(){
        qxcTrendObj.listIscroll.scrollTo(qxcTrendObj.listIscroll.x,this.y,this.duration);
      }
    });
    var scrollToVal = this.listFirstObj.children('div').height()-this.conHeight;
    scrollToVal = scrollToVal<0 ? 0 : scrollToVal;
    this.listTitleIscroll.scrollTo(0,-1*scrollToVal);
  }

  qxcTrendObj.createTitleIscroll = function(){
    if(this.titleIscroll)this.titleIscroll.refresh();
    this.titleIscroll = new iScroll(this.titleConObj[0],{
      hScrollbar : false,
      vScrollbar : false,
      bounce : false,
      momentum : false,
      onScrollMove : function(){
        qxcTrendObj.listIscroll.scrollTo(this.x,qxcTrendObj.listIscroll.y);
        qxcTrendObj.betIscroll.scrollTo(this.x,qxcTrendObj.betIscroll.y);
        qxcTrendObj.updatePage(this.x);
      },
      onMomentum : function(){
        qxcTrendObj.listIscroll.scrollTo(this.x,qxcTrendObj.listIscroll.y,this.duration);
        qxcTrendObj.betIscroll.scrollTo(this.x,qxcTrendObj.betIscroll.y,this.duration);
        qxcTrendObj.updatePage(this.x);
      }
    });
  }

  qxcTrendObj.createListIscroll = function(){
    if(this.listIscroll)this.listIscroll.refresh();
    this.listIscroll = new iScroll(this.listConObj[0],{
      hScrollbar : false,
      vScrollbar : false,
      bounce : false,
      momentum : false,
      onScrollMove : function(){
        qxcTrendObj.titleIscroll.scrollTo(this.x,qxcTrendObj.titleIscroll.y);
        qxcTrendObj.betIscroll.scrollTo(this.x,qxcTrendObj.betIscroll.y);
        qxcTrendObj.listTitleIscroll.scrollTo(qxcTrendObj.listTitleIscroll.x,this.y);
        qxcTrendObj.updatePage(this.x);
      },
      onMomentum : function(){
        qxcTrendObj.titleIscroll.scrollTo(this.x,qxcTrendObj.titleIscroll.y,this.duration);
        qxcTrendObj.betIscroll.scrollTo(this.x,qxcTrendObj.betIscroll.y,this.duration);
        qxcTrendObj.listTitleIscroll.scrollTo(qxcTrendObj.listTitleIscroll.x,this.y,this.duration);
        qxcTrendObj.updatePage(this.x);
      } 　 
    });
    var scrollToVal = this.listConObj.children('div').height()-this.conHeight;
    scrollToVal = scrollToVal<0 ? 0 : scrollToVal;
    this.listIscroll.scrollTo(0,-1*scrollToVal);
  }

  qxcTrendObj.createBetscroll = function(){
    if(this.betIscroll)this.betIscroll.refresh();
    this.betIscroll = new iScroll(this.betConObj[0],{
      hScrollbar : false,
      vScrollbar : false,
      bounce : false,
      momentum : false,
      onScrollMove : function(){
        
        qxcTrendObj.listIscroll.scrollTo(this.x,qxcTrendObj.listIscroll.y);
        qxcTrendObj.titleIscroll.scrollTo(this.x,qxcTrendObj.titleIscroll.y);
        qxcTrendObj.updatePage(this.x);
      },
      onMomentum : function(){
        
        qxcTrendObj.listIscroll.scrollTo(this.x,qxcTrendObj.listIscroll.y,this.duration);
        qxcTrendObj.titleIscroll.scrollTo(this.x,qxcTrendObj.titleIscroll.y,this.duration);
        qxcTrendObj.updatePage(this.x);
      } 
    });
  }

  qxcTrendObj.updatePage = function(x){
    var positionWidth  = Math.abs(x);
    this.page = Math.floor(positionWidth/this.conWidth);
    var titleData = this[this.postData["trendName"]+"TitleFirst"][this.postData["trendType"]][this.page];
    var betTitleData = this["betTitle"][this.postData["trendType"]][this.page];
    this.titleFirstObj.html(titleData);
    this.betFirstObj.html(betTitleData);
    this.selectObj.children('div').removeClass('on');
     this.selectObj.children('div[data-i="'+this.page+'"]').addClass('on');
  }

  qxcTrendObj.updateTrendName = function(obj){
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

  qxcTrendObj.updatelottery = function(obj){
    var thisV = obj.attr("data-v");
    var thisCn = obj.attr("data-cn");
    this.playTitleObj.html("七星彩-"+thisCn+'<em class="down"></em>');
    this.postData['trendType'] = thisV;
    this.temSortDom = this.titleFirstObj;

    this.updataPlayObj.hide();
    this.playTitleObj.attr("data-s","0");
    if($("#qxcTrend_upBGObj").length)$("#qxcTrend_upBGObj").remove();

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

  qxcTrendObj.sortDom = function(obj){
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

  qxcTrendObj.sortData = function(data,type){
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

  qxcTrendObj.betNum = function(obj){
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

  qxcTrendObj.createSubData = function(){
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

  qxcTrendObj.getCXY = function(x,y){
    if(x<y)return 0;
    var allX = 1;
    var allY = 1;
    for(var i=0,ilen=y;i<ilen;i++){
      allX*=x-i;
      allY*=y-i;
    }
    return allX/allY;
  }

  qxcTrendObj.createMoneyDom = function(){
    var zs = this.getZS();
    this.betMoneyObj.html('<span class="fontred">'+zs+'</span>注 <span class="fontred">'+(zs*2)+'</span>元');
  }

  qxcTrendObj.getZS = function(){
    return qxcTrendObj.PBonus();
  }
  
  qxcTrendObj.PBonus = function(){
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

  qxcTrendObj.FP2Bonus = function(){
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
      ////console.log(this.selectBetData[i]);
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
  

  qxcTrendObj.subData = function(obj){
    if(obj.attr("data-stop")){
      $.alertMsg("不在开售时间");
      return false;
    }
    var postData = this.createSubData();
    if(!postData)return false;
    window.localStorage.setItem(this.postData['lottery_type']+"lotteryBetData",postData);
	switch(this.postData['lottery_type']){
		case 'qxc':
			this.goQxcConfirm();
			break;	
	}
  }
  
  qxcTrendObj.goQxcConfirm = function(){
	  var self = this;
	  qxcConfirmObj.goBack = function(){
		  qxcTrendObj.show(); 
	  }
	  qxcConfirmObj.show('reload',function(){
		 qxcConfirmObj.setData({
			'lotteryType': self.postData['lottery_type'],
			'lotteryCnName': '七星彩',
			'lotteryNo' : self.postData.lotteryNoVal,
			'lotteryPlay': self.postData.trendType
		 })
	  });  
  }
  
  qxcTrendObj.delAll = function(){
    this.selectBetData = new Array();
    this.betConObj.find("span[data-i]").each(function(){
      $(this).children('em').removeClass('on');
    });
  }

  qxcTrendObj.createGetData = function(){
    return '?lotteryType='+this.postData['lottery_type']+'&lotteryNo='+this.postData['lotteryNoVal']+"&lotteryPlay="+this.postData['trendType']+"&res=trend";
  }

  qxcTrendObj.createSelectBetDom = function(){
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
    this.qhObj[(html.length ? "hide" : "show")]()
    this.betMoneyObj[(html.length ? "show" : "hide")]()
    this.createListHeight();
  }

 

  qxcTrendObj.updateData = function(obj){
    obj.siblings('span').removeClass('on');
    obj.addClass('on');
  }

  qxcTrendObj.onloadExecution = function(){
    this.createDom();
    this.createEvent();
    this.createListHeight();
    this.ajaxGetData();
  }
  
  //此页面包含2个js, qxcTrend,qxcTime,  qxcTime负责赛程时间循环及相关更新，不负责投注。而qxcTrend则负责具体图表的页面展现及投注
  qxcTrendObj.init = function(){
	  qxcTrendObj.setDefConfig();
	  qxcTimeObj.setDefConfig();
      qxcTrendObj.onloadExecution();
	  qxcTimeObj.init();
	     
  }
  
  qxcTrendObj.destroy = function(){
	 qxcTrendObj.setDefConfig();
	 qxcTimeObj.setDefConfig();
	 $('#qxcTrend').html('').remove();  
  }

