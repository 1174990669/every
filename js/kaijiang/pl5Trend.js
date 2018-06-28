
  var pl5TrendObj = new PageController({
	   'name': 'pl5Trend',
	   'tpl' : 'template/kaijiang/pl5Trend.html'  
  });

  pl5TrendObj.setDefConfig = function(){
	  pl5TrendObj.titleWidth = 17.5/100;
	  pl5TrendObj.clientWidth = (document.documentElement.clientWidth || document.body.clientWidth).toFixed(2);
	  pl5TrendObj.clientHeight = (document.documentElement.clientHeight || document.body.clientHeight).toFixed(2);
	  pl5TrendObj.conWidth = Number((Number(pl5TrendObj.clientWidth) * (1-pl5TrendObj.titleWidth)).toFixed(2));
	  pl5TrendObj.conHeight = Number(pl5TrendObj.clientHeight-101-78);
	  pl5TrendObj.maxPage = 0;
	  pl5TrendObj.page = 0;
	  pl5TrendObj.borderWidth = 1;
	
	  pl5TrendObj.titleIscroll = "";
	  pl5TrendObj.listTitleIscroll = "";
	  pl5TrendObj.listIscroll = "";
	  pl5TrendObj.temTrendData = "";
	  pl5TrendObj.temLRTrendData = "";
	  pl5TrendObj.temSortDom = "";
	
	  pl5TrendObj.selectBetData = new Array();
	
	  pl5TrendObj.postData = {
		num : 50,
		showYL : "show",
		statistics : "show",
		lottery_type : "pl5",
    	trendType : "P",
		trendName : "HM",
		lotteryNoVal : ""
	  }  
	  
  }

  pl5TrendObj.betNumData = {
     P : [1,1,1,1,1]
  }

  pl5TrendObj.betData = {
      P : new Array(new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9"))
  }

  pl5TrendObj.betTitle = {
     P : ["第一位","第二位","第三位","第四位","第五位"]
  }

  pl5TrendObj.HMTitleData = pl5TrendObj.betData;

  pl5TrendObj.YLTitleData = {
     P : new Array(new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出"))
  }

  pl5TrendObj.LRTitleData = {
      P : new Array(new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏"))
  }

  pl5TrendObj.YLSortKey = {
      P : new Array(new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"))
  }

  pl5TrendObj.LRSortKey = {
      P : new Array(new Array("30","50","100","miss"),new Array("30","50","100","miss"),new Array("30","50","100","miss"),new Array("30","50","100","miss"),new Array("30","50","100","miss"))
  }

  pl5TrendObj.HMTitleClass = {
        P : new Array("trend_num fontred","trend_num fontred tn2","trend_num fontred tn3","trend_num fontred tn4","trend_num fontred tn5")
  }

  pl5TrendObj.YLTitleClass = {
       P : new Array("trend_num trend_yl","trend_num trend_yl fontred tn2","trend_num trend_yl fontred tn3","trend_num trend_yl fontred tn4","trend_num trend_yl fontred tn5")
  }

  pl5TrendObj.LRTitleClass = pl5TrendObj.YLTitleClass;

  pl5TrendObj.HMTitleFirst = {
      P : ["第一位>","第二位>","第三位>","第四位>","第五位>"]
  }

  pl5TrendObj.YLTitleFirst = {
     P : ["第一位<i>↑</i>","第二位<i>↑</i>","第三位<i>↑</i>","第四位<i>↑</i>","第五位<i>↑</i>"]
  }

  pl5TrendObj.LRTitleFirst = pl5TrendObj.YLTitleFirst;

  pl5TrendObj.YLExplainData = [
    {title:"最大遗漏",con:"统计期内遗漏的最大值"},
    {title:"上次遗漏",con:"指号码自上次开出前的遗漏次数"},
    {title:"当期遗漏",con:"指号码自上次开出后的遗漏次数"},
    {title:"欲出几率",con:"当期遗漏÷平均遗漏×100"}
  ];

  pl5TrendObj.LRExplainData = [
    {title:"热号",con:"统计期内出现次数多的为热号"},
    {title:"冷号",con:"统计期内出现次数少的为冷号"},
    {title:"次数",con:"指号码统计期内出现的次数"},
    {title:"遗漏",con:"指号码自上次开出后的遗漏次数"}
  ];


  pl5TrendObj.createDom = function(){
    this.lotteryObj = $("#pl5Trend_lotteryObj");
    this.playTitleObj = $("#pl5Trend_playTitleObj");
    this.updataPlayObj = $("#pl5Trend_updataPlayObj");
    this.setObj = $("#pl5Trend_setObj");
    this.titleFirstObj = $("#pl5Trend_titleFirstObj");
    this.titleConObj = $("#pl5Trend_titleConObj");
    this.listFirstObj = $("#pl5Trend_listFirstObj");
    this.listConObj = $("#pl5Trend_listConObj");
    this.betFirstObj = $("#pl5Trend_betFirstObj");
    this.betConObj = $("#pl5Trend_betConObj");
    this.explainObj = $("#pl5Trend_explainObj");
    this.betObj = $("#pl5Trend_betObj");
    this.selectObj = $("#pl5Trend_selectObj");
    this.betMoneyObj = $("#pl5Trend_betMoneyObj");
    this.qhObj = $("#pl5Trend_qhObj");
    this.subObj = $("#pl5Trend_subObj");
  }

  pl5TrendObj.createEvent = function(){
    this.lotteryObj.unbind('tap').tap(function(e){
      pl5TrendObj.lotteryEvent(e);
    });
  }

  pl5TrendObj.lotteryEvent = function(e){
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
        case "back" : pl5TrendObj.goBack();return true;
        case "updatelottery" : pl5TrendObj.updatelottery(thisObj);return true;
        case "subData" : pl5TrendObj.subData(thisObj);return true;
        case "delAll" : pl5TrendObj.delAll();this.createSelectBetDom();this.createMoneyDom();return true;
      }
    }

    var liObj = $.oto_checkEvent(e,"LI");
    if(liObj){
      var thisObj = $(liObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "updateTrendName" : pl5TrendObj.updateTrendName(thisObj);return true;
      }
    }

    var divObj = $.oto_checkEvent(e,"DIV");
    if(divObj){
      var thisObj = $(divObj);
      var thisT = thisObj.attr("data-t");
      if(thisObj[0].id!="pl5Trend_setObj")return false;
      pl5TrendObj.hideSet();
    }
  }

  pl5TrendObj.showUpdPlay = function(obj){
    if(Number(obj.attr("data-s"))){
      this.updataPlayObj.hide();
      obj.attr("data-s",0);
    }else{
      this.updataPlayObj.show();
      obj.attr("data-s",1);
    } 

    var bodyHeight = document.body.scrollHeight;
    var divObj = $('<div id="pl5Trend_upBGObj" style="width: 100%; height: '+bodyHeight+'px; position: absolute; left: 0px; top: 0px; z-index: 98; background: transparent;" ></div>');
    $("body").append(divObj);
    divObj.tap(function(){
      pl5TrendObj.updataPlayObj.hide();
      pl5TrendObj.playTitleObj.attr("data-s","0");
      divObj.remove();
    });
  }

  pl5TrendObj.ajaxGetData = function(){
  	var secretData = {
			'para' : Global.encrypt(this.postData)
		};
    $.ajax({
       url : ConfigObj.localSite +  '?version=1&m=Lottery.pl5.getChartData',
      data : secretData,
      type : "post",
      dataType : "json",
      success : function(msg){
		//console.log('排列五获取走势数据[pl5Trend]',msg);
		
        if(msg.code == "0000"){
         	//if(msg.trendType!=pl5TrendObj.postData.trendType)return false;  //todo zhangw
         	msg.info = $.parseJSON(Global.crypt(msg.info));
			pl5TrendObj.temTrendData = msg.info;
        	pl5TrendObj.createPageData();
        	pl5TrendObj.createDataDom();
        }else{
		    $.alertMsg(msg.code_str);
            return false;
		}
       
      }
    });
  }
  
  pl5TrendObj.createFormatData = function(data){
    if(this.postData['trendType']!="P" || this.postData['trendName']!="HM")return data;
    var listData = new Array();

    listData.push(data[0].slice(0,12));
    listData.push(data[0].slice(12,24));
    listData.push(data[0].slice(24,35));
    listData.push(data[1].slice(0,12));
    return listData;
  }

  pl5TrendObj.createFormatI = function(i){
    if(this.postData['trendType']!="P")return i;
	return i<3 ? 0 : 1;
	/*switch(this.postData['trendName']){
		case 'HM':
			return i<3 ? 0 : 1;
		case 'YL':	
			return i>0 ? 1 : 0;
		case 'LR':
			return i>0 ? 1 : 0;
	}		*/
	
  }

  pl5TrendObj.createFormatKey = function(i,k){
    if(this.postData['trendType']!="P")return k;
    switch(i){
      case 0 : return k;
      case 1 : return 12+k;
      case 2 : return 24+k;
      case 3 : return k;
    }
  }

  pl5TrendObj.createFormatPage = function(p,type){
    if(this.postData['trendType']!="P")return p;
    if(this.postData['trendName']!="YL" && this.postData['trendName']!="LR")return 4;
    if(this.postData['trendName']=="YL")return p;
    if(this.postData['trendName']=="LR")return p;
    if(type=="bet")return 4;
    return 1;
  }

  pl5TrendObj.createFormatNowPage = function(p){
    if(this.postData['trendType']!="P")return p;
    if(p<3)return 0;
    return 1;
  }

  pl5TrendObj.createFormatBet = function(k,str){
    return str;
  }

  pl5TrendObj.ajaxGetLRData = function(){
  	var secretData2 = {
			'para' : Global.encrypt(this.postData)
		};
     $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=Lottery.pl5.getChartData',
      data : secretData2,
      type : "post",
      dataType : "json",
      success : function(msg){
      	
        if(msg.code!="0000"){
          $.alertMsg(msg.code_str);
          return false;
        }
        msg.info = $.parseJSON(Global.crypt(msg.info));
        pl5TrendObj.temLRTrendData = msg.info;
        pl5TrendObj.createPageData();
        pl5TrendObj.createDataDom();
      }
    });
  }

  pl5TrendObj.showSet = function(){
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

  pl5TrendObj.hideSet = function(){
    this.setObj.hide();
    this.setObj.removeAttr("data-s",1);
  }

  pl5TrendObj.subSet  = function(){
    var spanObj = $("#pl5Trend_lotteryObj span[data-t='updateData']");
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

  pl5TrendObj.createPageData = function(){
    this.page = 0;
    var trendName = this.postData['trendName'];
    var lotteryPlay = this.postData['trendType'];
    var titleDomData = this[trendName+"TitleData"][lotteryPlay];
    this.maxPage = titleDomData.length;
  }

  pl5TrendObj.createDataDom = function(){
    this.createTitleDom();
    this.createListDom();
    this.createExplain();
    this.createBetDom();
    this.createListHeight();
  }

  pl5TrendObj.createTitleDom = function(){
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

  pl5TrendObj.createListDom = function(){
    var trendName = this.postData['trendName'];
    switch(trendName){
      case "HM" : this.createHMLIst(pl5TrendObj.temTrendData);break;
      case "YL" : this.createYLLIst(pl5TrendObj.temTrendData);break;
      case "LR" : this.createLRLIst(pl5TrendObj.temLRTrendData);break;
    }
    this.createListTitleIscroll();
    this.createListIscroll();
  }

  pl5TrendObj.createHMLIst = function(data){
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

  pl5TrendObj.createHMStatistics = function(data){
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

  pl5TrendObj.createHMStatisticeCon = function(data){
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

  pl5TrendObj.createYLLIst = function(data){
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

  pl5TrendObj.createLRLIst = function(data){
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

  pl5TrendObj.createExplain = function(){
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

  pl5TrendObj.createBetDom = function(){
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

  pl5TrendObj.createListHeight = function(){
    var betHeight = this.betObj.height();
    var height = this.conHeight - betHeight;
    var listConHeight = this.listConObj.children('div').height() || 0;
    if(listConHeight!=0 && listConHeight<height)height = listConHeight;
    this.listConObj.height(height);
    this.listFirstObj.height(height);
    if(this.listTitleIscroll)this.listTitleIscroll.refresh();
    if(this.listIscroll)this.listIscroll.refresh();
  }

  pl5TrendObj.createListTitleIscroll = function(){
    if(this.listTitleIscroll)this.listTitleIscroll.refresh();
    this.listTitleIscroll = new iScroll(this.listFirstObj[0],{
      hScrollbar : false,
      vScrollbar : false,
      bounce : false,
      momentum : false,
      onScrollMove : function(){
        pl5TrendObj.listIscroll.scrollTo(pl5TrendObj.listIscroll.x,this.y);
      },
      onMomentum : function(){
        pl5TrendObj.listIscroll.scrollTo(pl5TrendObj.listIscroll.x,this.y,this.duration);
      }
    });
    var scrollToVal = this.listFirstObj.children('div').height()-this.conHeight;
    scrollToVal = scrollToVal<0 ? 0 : scrollToVal;
    this.listTitleIscroll.scrollTo(0,-1*scrollToVal);
  }

  pl5TrendObj.createTitleIscroll = function(){
    if(this.titleIscroll)this.titleIscroll.refresh();
    this.titleIscroll = new iScroll(this.titleConObj[0],{
      hScrollbar : false,
      vScrollbar : false,
      bounce : false,
      momentum : false,
      onScrollMove : function(){
        pl5TrendObj.listIscroll.scrollTo(this.x,pl5TrendObj.listIscroll.y);
        pl5TrendObj.betIscroll.scrollTo(this.x,pl5TrendObj.betIscroll.y);
        pl5TrendObj.updatePage(this.x);
      },
      onMomentum : function(){
        pl5TrendObj.listIscroll.scrollTo(this.x,pl5TrendObj.listIscroll.y,this.duration);
        pl5TrendObj.betIscroll.scrollTo(this.x,pl5TrendObj.betIscroll.y,this.duration);
        pl5TrendObj.updatePage(this.x);
      }
    });
  }

  pl5TrendObj.createListIscroll = function(){
    if(this.listIscroll)this.listIscroll.refresh();
    this.listIscroll = new iScroll(this.listConObj[0],{
      hScrollbar : false,
      vScrollbar : false,
      bounce : false,
      momentum : false,
      onScrollMove : function(){
        pl5TrendObj.titleIscroll.scrollTo(this.x,pl5TrendObj.titleIscroll.y);
        pl5TrendObj.betIscroll.scrollTo(this.x,pl5TrendObj.betIscroll.y);
        pl5TrendObj.listTitleIscroll.scrollTo(pl5TrendObj.listTitleIscroll.x,this.y);
        pl5TrendObj.updatePage(this.x);
      },
      onMomentum : function(){
        pl5TrendObj.titleIscroll.scrollTo(this.x,pl5TrendObj.titleIscroll.y,this.duration);
        pl5TrendObj.betIscroll.scrollTo(this.x,pl5TrendObj.betIscroll.y,this.duration);
        pl5TrendObj.listTitleIscroll.scrollTo(pl5TrendObj.listTitleIscroll.x,this.y,this.duration);
        pl5TrendObj.updatePage(this.x);
      } 　 
    });
    var scrollToVal = this.listConObj.children('div').height()-this.conHeight;
    scrollToVal = scrollToVal<0 ? 0 : scrollToVal;
    this.listIscroll.scrollTo(0,-1*scrollToVal);
  }

  pl5TrendObj.createBetscroll = function(){
    if(this.betIscroll)this.betIscroll.refresh();
    this.betIscroll = new iScroll(this.betConObj[0],{
      hScrollbar : false,
      vScrollbar : false,
      bounce : false,
      momentum : false,
      onScrollMove : function(){
       
        pl5TrendObj.listIscroll.scrollTo(this.x,pl5TrendObj.listIscroll.y);
        pl5TrendObj.titleIscroll.scrollTo(this.x,pl5TrendObj.titleIscroll.y);
        pl5TrendObj.updatePage(this.x);
      },
      onMomentum : function(){
        
        pl5TrendObj.listIscroll.scrollTo(this.x,pl5TrendObj.listIscroll.y,this.duration);
        pl5TrendObj.titleIscroll.scrollTo(this.x,pl5TrendObj.titleIscroll.y,this.duration);
        pl5TrendObj.updatePage(this.x);
      } 
    });
  }

  pl5TrendObj.updatePage = function(x){
   var positionWidth  = Math.abs(x);
    this.page = Math.floor(positionWidth/this.conWidth);
    var titleData = this[this.postData["trendName"]+"TitleFirst"][this.postData["trendType"]][this.page];
    var betTitleData = this["betTitle"][this.postData["trendType"]][this.page];
    this.titleFirstObj.html(titleData);
    this.betFirstObj.html(betTitleData);
    this.selectObj.children('div').removeClass('on');
    this.selectObj.children('div[data-i="'+this.page+'"]').addClass('on');
  }

  pl5TrendObj.updateTrendName = function(obj){
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

  pl5TrendObj.updatelottery = function(obj){
    var thisV = obj.attr("data-v");
    var thisCn = obj.attr("data-cn");
    this.playTitleObj.html("排列五-"+thisCn+'<em class="down"></em>');
    this.postData['trendType'] = thisV;
    this.temSortDom = this.titleFirstObj;

    this.updataPlayObj.hide();
    this.playTitleObj.attr("data-s","0");
    if($("#pl5Trend_upBGObj").length)$("#pl5Trend_upBGObj").remove();

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

  pl5TrendObj.sortDom = function(obj){
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

  pl5TrendObj.sortData = function(data,type){
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

  pl5TrendObj.betNum = function(obj){
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

  pl5TrendObj.createSubData = function(){
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

  pl5TrendObj.getCXY = function(x,y){
    if(x<y)return 0;
    var allX = 1;
    var allY = 1;
    for(var i=0,ilen=y;i<ilen;i++){
      allX*=x-i;
      allY*=y-i;
    }
    return allX/allY;
  }

  pl5TrendObj.createMoneyDom = function(){
    var zs = this.getZS();
    this.betMoneyObj.html('<span class="fontred">'+zs+'</span>注 <span class="fontred">'+(zs*2)+'</span>元');
  }

  pl5TrendObj.getZS = function(){
     return pl5TrendObj.PBonus();
  }

  pl5TrendObj.PBonus = function () {
      for (var i = 0, zs, ilen = this.betNumData[this.postData['trendType']].length; i < ilen; i++) {
          if (!(this.selectBetData[i] && this.selectBetData[i].length))return 0;

          // 如果其中有某位没有选择，仍然算作 0 注，liuchao
          if (this.selectBetData[i].every(function (v) {return !v;})) return 0;

          var thisData = [];
          for (var k = 0, klen = this.selectBetData[i].length; k < klen; k++) {
              if (this.selectBetData[i][k]) {
                  thisData.push(this.selectBetData[i][k]);
              }
          }
          var thisZs = this.getCXY(thisData.length, this.betNumData[this.postData['trendType']][i]);
          zs = zs ? zs * thisZs : thisZs;
      }
      return zs;
  }

  

  pl5TrendObj.subData = function(obj){
    if(obj.attr("data-stop")){
      $.alertMsg("不在开售时间");
      return false;
    }
    var postData = this.createSubData();
    if(!postData)return false;
    window.localStorage.setItem(this.postData['lottery_type']+"lotteryBetData",postData);
	switch(this.postData['lottery_type']){
		case 'pl5':
			this.goPl5Confirm();
			break;	
	}
  }
  
  pl5TrendObj.goPl5Confirm = function(){
	  var self = this;
	  pl5ConfirmObj.goBack = function(){
		  pl5TrendObj.show(); 
	  }
	  pl5ConfirmObj.show('reload',function(){
		 pl5ConfirmObj.setData({
			'lotteryType': self.postData['lottery_type'],
			'lotteryCnName': '排列五',
			'lotteryNo' : self.postData.lotteryNoVal,
			'lotteryPlay': self.postData.trendType
		 })
	  });  
  }
  
  pl5TrendObj.delAll = function(){
    this.selectBetData = new Array();
    this.betConObj.find("span[data-i]").each(function(){
      $(this).children('em').removeClass('on');
    });
  }

  pl5TrendObj.createGetData = function(){
    return '?lotteryType='+this.postData['lottery_type']+'&lotteryNo='+this.postData['lotteryNoVal']+"&lotteryPlay="+this.postData['trendType']+"&res=trend";
  }

  pl5TrendObj.createSelectBetDom = function(){
     var html = [];
    for(var i=0,ilen=this.selectBetData.length;i<ilen;i++){
     if(!this.selectBetData[i] || this.selectBetData[i].every(function (v) {return !v;})){
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

 

  pl5TrendObj.updateData = function(obj){
    obj.siblings('span').removeClass('on');
    obj.addClass('on');
  }

  pl5TrendObj.onloadExecution = function(){
    this.createDom();
    this.createEvent();
    this.createListHeight();
    this.ajaxGetData();
  }
  
  //此页面包含2个js, pl5Trend,pl5Time,  pl5Time负责赛程时间循环及相关更新，不负责投注。而pl5Trend则负责具体图表的页面展现及投注
  pl5TrendObj.init = function(){
	  pl5TrendObj.setDefConfig();
	  pl5TimeObj.setDefConfig();
      pl5TrendObj.onloadExecution();
	  pl5TimeObj.init();
	     
  }
  
  pl5TrendObj.destroy = function(){
	 pl5TrendObj.setDefConfig();
	 pl5TimeObj.setDefConfig();
	 $('#pl5Trend').html('').remove();  
  }

