
  var hn4j1TrendObj = new PageController({
	   'name': 'hn4j1Trend',
	   'tpl' : 'template/kaijiang/hn4j1Trend.html'  
  });
 
  hn4j1TrendObj.setDefConfig = function(){
	  hn4j1TrendObj.titleWidth = 17.5/100;
	  hn4j1TrendObj.clientWidth = (document.documentElement.clientWidth || document.body.clientWidth).toFixed(2);
	  hn4j1TrendObj.clientHeight = (document.documentElement.clientHeight || document.body.clientHeight).toFixed(2);
	  hn4j1TrendObj.conWidth = Number((Number(hn4j1TrendObj.clientWidth) * (1-hn4j1TrendObj.titleWidth)).toFixed(2));
	  hn4j1TrendObj.conHeight = Number(hn4j1TrendObj.clientHeight-101-78);
	  hn4j1TrendObj.maxPage = 0;
	  hn4j1TrendObj.page = 0;
	  hn4j1TrendObj.borderWidth = 1;
	
	  hn4j1TrendObj.titleIscroll = "";
	  hn4j1TrendObj.listTitleIscroll = "";
	  hn4j1TrendObj.listIscroll = "";
	  hn4j1TrendObj.temTrendData = "";
	  hn4j1TrendObj.temLRTrendData = "";
	  hn4j1TrendObj.temSortDom = "";
	
	  hn4j1TrendObj.selectBetData = new Array();
	  
	  hn4j1TrendObj.postData = {
		num : 50,
		showYL : "show",
		statistics : "show",
		lottery_type : "hn4j1",
		trendType : "D5",
		trendName : "HM",
		lotteryNoVal : ""
	  }
  
  }

 

  hn4j1TrendObj.betNumData = {
    D5 : [1,1,1,1,1],
    R4C3 : [1,1],
    R3C2 : [1,1],
    D4 : [1,1,1,1],
    R4C2 : [2],
    R3 : [3],
    D3 : [1,1,1,1],
    R4C1 : [1,2],
    R2C2 : [1],
    D2 : [1,1,1,1],
    R4 : [4],
    R2 : [2],
    D1 : [1,1,1,1],
    R3C3 : [1]
  }

  hn4j1TrendObj.betMaxNumData = {
    D5 : [10,10,10,10,10],
    R4C3 : [1,1],
    R3C2 : [1,1],
    D4 : [10,10,10,10],
    R4C2 : [2],
    R3 : [10],
    D3 : [10,10,10,10],
    R4C1 : [1,2],
    R2C2 : [1],
    D2 : [10,10,10,10],
    R4 : [10],
    R2 : [10],
    D1 : [10,10,10,10],
    R3C3 : [1]
  }

  hn4j1TrendObj.lotteryBallWei = {
    D3 : 3,
    D2 : 2,
    D1 : 1
  }

  hn4j1TrendObj.betData = {
    D5 : new Array(new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9")),
    R4C3 : new Array(new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9")),
    R3C2 : new Array(new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9")),
    D4 : new Array(new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9")),
    R4C2 : new Array(new Array("0","1","2","3","4","5","6","7","8","9")),
    R3 : new Array(new Array("0","1","2","3","4","5","6","7","8","9")),
    D3 : new Array(new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9")),
    R4C1 : new Array(new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9")),
    R2C2 : new Array(new Array("0","1","2","3","4","5","6","7","8","9")),
    D2 : new Array(new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9")),
    R4 : new Array(new Array("0","1","2","3","4","5","6","7","8","9")),
    R2 : new Array(new Array("0","1","2","3","4","5","6","7","8","9")),
    D1 : new Array(new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9"),new Array("0","1","2","3","4","5","6","7","8","9")),
    R3C3 : new Array(new Array("0","1","2","3","4","5","6","7","8","9"))
  }

  hn4j1TrendObj.betTitle = {
    D5 : ["第一位","第二位","第三位","第四位","特殊号"],
    R4C3 : ["重号","单号"],
    R3C2 : ["重号","单号"],
    D4 : ["第一位","第二位","第三位","第四位"],
    R4C2 : ["重号"],
    R3 : ["单号"],
    D3 : ["第一位","第二位","第三位","第四位"],
    R4C1 : ["重号","单号"],
    R2C2 : ["重号"],
    D2 : ["第一位","第二位","第三位","第四位"],
    R4 : ["单号"],
    R2 : ["单号"],
    D1 : ["第一位","第二位","第三位","第四位"],
    R3C3 : ["重号"]
  }

  hn4j1TrendObj.HMTitleData = hn4j1TrendObj.betData;

  hn4j1TrendObj.YLTitleData = {
    D5 : new Array(new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出")),
    R4C3 : new Array(new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出")),
    R3C2 : new Array(new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出")),
    D4 : new Array(new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出")),
    R4C2 : new Array(new Array("最大","上次","当期","欲出")),
    R3 : new Array(new Array("最大","上次","当期","欲出")),
    D3 : new Array(new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出")),
    R4C1 : new Array(new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出")),
    R2C2 : new Array(new Array("最大","上次","当期","欲出")),
    D2 : new Array(new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出")),
    R4 : new Array(new Array("最大","上次","当期","欲出")),
    R2 : new Array(new Array("最大","上次","当期","欲出")),
    D1 : new Array(new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出"),new Array("最大","上次","当期","欲出")),
    R3C3 : new Array(new Array("最大","上次","当期","欲出"))
  }

  hn4j1TrendObj.LRTitleData = {
    D5 : new Array(new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏")),
    R4C3 : new Array(new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏")),
    R3C2 : new Array(new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏")),
    D4 : new Array(new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏")),
    R4C2 : new Array(new Array("30期","50期","100期","遗漏")),
    R3 : new Array(new Array("30期","50期","100期","遗漏")),
    D3 : new Array(new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏")),
    R4C1 : new Array(new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏")),
    R2C2 : new Array(new Array("30期","50期","100期","遗漏")),
    D2 : new Array(new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏")),
    R4 : new Array(new Array("30期","50期","100期","遗漏")),
    R2 : new Array(new Array("30期","50期","100期","遗漏")),
    D1 :new Array(new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏"),new Array("30期","50期","100期","遗漏")),
    R3C3 : new Array(new Array("30期","50期","100期","遗漏"))
  }

  hn4j1TrendObj.YLSortKey = {
    D5 : new Array(new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")),
    R4C3 : [new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")],
    R3C2 : [new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")],
    D4 : [new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")],
    R4C2 : [new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")],
    R3 : [new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")],
    D3 : [new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")],
    R4C1 : [new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")],
    R2C2 : [new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")],
    D2 : [new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")],
    R4 : [new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")],
    R2 : [new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")],
    D1 : [new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro"),new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")],
    R3C3 : [new Array("num_max_miss","num_pre_miss","num_cur_miss","num_hap_pro")]
  }

  hn4j1TrendObj.LRSortKey = {
    D5 : [new Array("30","50","100","miss"),new Array("30","50","100","miss"),new Array("30","50","100","miss"),new Array("30","50","100","miss"),new Array("30","50","100","miss")],
    R4C3 : [new Array("30","50","100","miss"),new Array("30","50","100","miss")],
    R3C2 : [new Array("30","50","100","miss"),new Array("30","50","100","miss")],
    D4 : [new Array("30","50","100","miss"),new Array("30","50","100","miss"),new Array("30","50","100","miss"),new Array("30","50","100","miss")],
    R4C2 : [new Array("30","50","100","miss")],
    R3 : [new Array("30","50","100","miss")],
    D3 : [new Array("30","50","100","miss"),new Array("30","50","100","miss"),new Array("30","50","100","miss"),new Array("30","50","100","miss")],
    R4C1 : [new Array("30","50","100","miss"),new Array("30","50","100","miss")],
    R2C2 : [new Array("30","50","100","miss")],
    D2 : [new Array("30","50","100","miss"),new Array("30","50","100","miss"),new Array("30","50","100","miss"),new Array("30","50","100","miss")],
    R4 : [new Array("30","50","100","miss")],
    R2 : [new Array("30","50","100","miss")],
    D1 : [new Array("30","50","100","miss"),new Array("30","50","100","miss"),new Array("30","50","100","miss"),new Array("30","50","100","miss")],
    R3C3 : [new Array("30","50","100","miss")]
  }

  hn4j1TrendObj.HMTitleClass = {
    D5 : ["trend_num fontred","trend_num fontred tn2","trend_num fontred tn3","trend_num fontred tn4","trend_num fontred tn5"],
    R4C3 : ["trend_num fontred","trend_num fontred tn2"],
    R3C2 : ["trend_num fontred","trend_num fontred tn2"],
    D4 : ["trend_num fontred","trend_num fontred tn2","trend_num fontred tn3","trend_num fontred tn4"],
    R4C2 : ["trend_num fontred"],
    R3 : ["trend_num fontred"],
    D3 : ["trend_num fontred","trend_num fontred tn2","trend_num fontred tn3","trend_num fontred tn4"],
    R4C1 : ["trend_num fontred","trend_num fontred tn2"],
    R2C2 : ["trend_num fontred"],
    D2 : ["trend_num fontred","trend_num fontred tn2","trend_num fontred tn3","trend_num fontred tn4"],
    R4 : ["trend_num fontred"],
    R2 : ["trend_num fontred"],
    D1 : ["trend_num fontred","trend_num fontred tn2","trend_num fontred tn3","trend_num fontred tn4"],
    R3C3 : ["trend_num fontred"]
  }

  hn4j1TrendObj.YLTitleClass = {
    D5 : ["trend_num trend_yl","trend_num trend_yl fontred tn2","trend_num trend_yl fontred tn3","trend_num trend_yl fontred tn4","trend_num trend_yl fontred tn5"],
    R4C3 : ["trend_num trend_yl","trend_num trend_yl fontred tn2"],
    R3C2 : ["trend_num trend_yl","trend_num trend_yl fontred tn2"],
    D4 : ["trend_num trend_yl","trend_num trend_yl fontred tn2","trend_num trend_yl fontred tn3","trend_num trend_yl fontred tn4"],
    R4C2 : ["trend_num trend_yl"],
    R3 : ["trend_num trend_yl"],
    D3 : ["trend_num trend_yl","trend_num trend_yl fontred tn2","trend_num trend_yl fontred tn3","trend_num trend_yl fontred tn4"],
    R4C1 : ["trend_num trend_yl","trend_num trend_yl fontred tn2"],
    R2C2 : ["trend_num trend_yl"],
    D2 : ["trend_num trend_yl","trend_num trend_yl fontred tn2","trend_num trend_yl fontred tn3","trend_num trend_yl fontred tn4"],
    R4 : ["trend_num trend_yl"],
    R2 : ["trend_num trend_yl"],
    D1 : ["trend_num trend_yl","trend_num trend_yl fontred tn2","trend_num trend_yl fontred tn3","trend_num trend_yl fontred tn4"],
    R3C3 : ["trend_num trend_yl"]
  }

  hn4j1TrendObj.LRTitleClass = hn4j1TrendObj.YLTitleClass;

  hn4j1TrendObj.HMTitleFirst = {
    D5 : ["第一位>","第二位>","第三位>","第四位>","特殊号>"],
    R4C3 : ["重号>","单号>"],
    R3C2 : ["重号>","单号>"],
    D4 : ["第一位>","第二位>","第三位>","第四位>"],
    R4C2 : ["重号>"],
    R3 : ["单号>"],
    D3 : ["第一位>","第二位>","第三位>","第四位>"],
    R4C1 : ["重号>","单号>"],
    R2C2 : ["重号>"],
    D2 : ["第一位>","第二位>","第三位>","第四位>"],
    R4 : ["单号>"],
    R2 : ["单号>"],
    D1 : ["第一位>","第二位>","第三位>","第四位>"],
    R3C3 : ["重号>"]
  }

  hn4j1TrendObj.YLTitleFirst = {
    D5 : ["第一位<i>↓</i>","第二位<i>↓</i>","第三位<i>↓</i>","第四位<i>↓</i>","特殊号<i>↓</i>"],
    R4C3 : ["重号<i>↓</i>","单号<i>↓</i>"],
    R3C2 : ["重号<i>↓</i>","单号<i>↓</i>"],
    D4 : ["第一位<i>↓</i>","第二位<i>↓</i>","第三位<i>↓</i>","第四位<i>↓</i>"],
    R4C2 : ["重号<i>↓</i>"],
    R3 : ["单号<i>↓</i>"],
    D3 : ["第一位<i>↓</i>","第二位<i>↓</i>","第三位<i>↓</i>","第四位<i>↓</i>"],
    R4C1 : ["重号<i>↓</i>","单号<i>↓</i>"],
    R2C2 : ["重号<i>↓</i>"],
    D2 : ["第一位<i>↓</i>","第二位<i>↓</i>","第三位<i>↓</i>","第四位<i>↓</i>"],
    R4 : ["单号<i>↓</i>"],
    R2 : ["单号<i>↓</i>"],
    D1 : ["第一位<i>↓</i>","第二位<i>↓</i>","第三位<i>↓</i>","第四位<i>↓</i>"],
    R3C3 : ["重号<i>↓</i>"]
  }

  hn4j1TrendObj.LRTitleFirst = hn4j1TrendObj.YLTitleFirst;

  hn4j1TrendObj.YLExplainData = [
    {title:"最大遗漏",con:"统计期内遗漏的最大值"},
    {title:"上次遗漏",con:"指号码自上次开出前的遗漏次数"},
    {title:"当期遗漏",con:"指号码自上次开出后的遗漏次数"},
    {title:"欲出几率",con:"当期遗漏÷平均遗漏×100"}
  ];

  hn4j1TrendObj.LRExplainData = [
    {title:"热号",con:"统计期内出现次数多的为热号"},
    {title:"冷号",con:"统计期内出现次数少的为冷号"},
    {title:"次数",con:"指号码统计期内出现的次数"},
    {title:"遗漏",con:"指号码自上次开出后的遗漏次数"}
  ];


  hn4j1TrendObj.createDom = function(){
    this.lotteryObj = $("#hn4j1Trend_lotteryObj");
    this.playTitleObj = $("#hn4j1Trend_playTitleObj");
    this.updataPlayObj = $("#hn4j1Trend_updataPlayObj");
    this.setObj = $("#hn4j1Trend_setObj");
    this.titleFirstObj = $("#hn4j1Trend_titleFirstObj");
    this.titleConObj = $("#hn4j1Trend_titleConObj");
    this.listFirstObj = $("#hn4j1Trend_listFirstObj");
    this.listConObj = $("#hn4j1Trend_listConObj");
    this.betFirstObj = $("#hn4j1Trend_betFirstObj");
    this.betConObj = $("#hn4j1Trend_betConObj");
    this.explainObj = $("#hn4j1Trend_explainObj");
    this.betObj = $("#hn4j1Trend_betObj");
    this.selectObj = $("#hn4j1Trend_selectObj");
    this.betMoneyObj = $("#hn4j1Trend_betMoneyObj");
    this.qhObj = $("#hn4j1Trend_qhObj");
    this.subObj = $("#hn4j1Trend_subObj");
  }

  hn4j1TrendObj.createEvent = function(){
    this.lotteryObj.unbind('tap').tap(function(e){
      hn4j1TrendObj.lotteryEvent(e);
    });
  }

  hn4j1TrendObj.lotteryEvent = function(e){
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
        case "back" : hn4j1TrendObj.goBack();return true;
        case "updatelottery" : hn4j1TrendObj.updatelottery(thisObj);return true;
        case "subData" : hn4j1TrendObj.subData(thisObj);return true;
        case "delAll" : hn4j1TrendObj.delAll();this.createSelectBetDom();this.createMoneyDom();return true;
      }
    }

    var liObj = $.oto_checkEvent(e,"LI");
    if(liObj){
      var thisObj = $(liObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "updateTrendName" : hn4j1TrendObj.updateTrendName(thisObj);return true;
      }
    }

    var divObj = $.oto_checkEvent(e,"DIV");
    if(divObj){
      var thisObj = $(divObj);
      var thisT = thisObj.attr("data-t");
      if(thisObj[0].id!="hn4j1Trend_setObj")return false;
      hn4j1TrendObj.hideSet();
    }
  }

  hn4j1TrendObj.showUpdPlay = function(obj){
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
	  if($('#hn4j1Trend_upBGObj').length == 0){
		var bodyHeight = document.body.scrollHeight;
		var divObj = $('<div  style="width: 100%; height: '+bodyHeight+'px; position: absolute; left: 0px; top: 0px; z-index: 98; background: transparent;" id="hn4j1Trend_upBGObj"></div>');
		$("body").append(divObj);
		divObj.tap(function(){
		  hn4j1TrendObj.updataPlayObj.hide();
		  hn4j1TrendObj.playTitleObj.attr("data-s","0");
		  divObj.remove();
		});
	   }
    } 
    
	
  }

  hn4j1TrendObj.ajaxGetData = function(){
    $.ajax({
       url : ConfigObj.localSite +  '?version=1&m=Lottery.hn4j1.getChartData',
      data : this.postData,
      type : "post",
      dataType : "json",
      success : function(msg){
        if(msg.trendType!=hn4j1TrendObj.postData.trendType)return false;
        if(msg.code!="0000"){
          $.alertMsg(msg.code_str);
          return false;
        }
        hn4j1TrendObj.temTrendData = msg.info;
        hn4j1TrendObj.createPageData();
        hn4j1TrendObj.createDataDom();
      }
    });
  }

  hn4j1TrendObj.ajaxGetLRData = function(){
     $.ajax({
       url : ConfigObj.localSite +  '?version=1&m=Lottery.hn4j1.getChartData',
      data : this.postData,
      type : "post",
      dataType : "json",
      success : function(msg){
        if(msg.code!="0000"){
          $.alertMsg(msg.code_str);
          return false;
        }
        hn4j1TrendObj.temLRTrendData = msg.info;
        hn4j1TrendObj.createPageData();
        hn4j1TrendObj.createDataDom();
      }
    });
  }

  hn4j1TrendObj.showSet = function(){
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

  hn4j1TrendObj.hideSet = function(){
    this.setObj.hide();
    this.setObj.removeAttr("data-s",1);
  }

  hn4j1TrendObj.subSet  = function(){
     var spanObj = $("#hn4j1Trend_lotteryObj span[data-t='updateData']");
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

  hn4j1TrendObj.createPageData = function(){
    this.page = 0;
    var trendName = this.postData['trendName'];
    var lotteryPlay = this.postData['trendType'];
    var titleDomData = this[trendName+"TitleData"][lotteryPlay];
    this.maxPage = titleDomData.length;
  }

  hn4j1TrendObj.createDataDom = function(){
    this.createTitleDom();
    this.createListDom();
    this.createExplain();
    this.createBetDom();
    this.createListHeight();
  }

  hn4j1TrendObj.createTitleDom = function(){
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
          html.push('<span data-t="sortDom" data-k="'+this[trendName+"SortKey"][lotteryPlay][i][k]+'@'+i+'">'+titleDomData[i][k]+'<i>↓</i></span>');
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

  hn4j1TrendObj.createListDom = function(){
    var trendName = this.postData['trendName'];
    switch(trendName){
      case "HM" : this.createHMLIst(hn4j1TrendObj.temTrendData);break;
      case "YL" : this.createYLLIst(hn4j1TrendObj.temTrendData);break;
      case "LR" : this.createLRLIst(hn4j1TrendObj.temLRTrendData);break;
    }
    this.createListTitleIscroll();
    this.createListIscroll();
  }

  hn4j1TrendObj.createHMLIst = function(data){
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

  hn4j1TrendObj.createHMStatistics = function(data){
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

  hn4j1TrendObj.createHMStatisticeCon = function(data){
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

  hn4j1TrendObj.createYLLIst = function(data){
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

  hn4j1TrendObj.createLRLIst = function(data){
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

  hn4j1TrendObj.createExplain = function(){
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

  hn4j1TrendObj.createBetDom = function(){
    var lotteryPlay = this.postData['trendType'];

    var titleDomData = this["betData"][lotteryPlay];
    var titleFirstData = this["betTitle"][lotteryPlay][this.page];
    var html = new Array();
    html.push('<div class="clearfix" style="width:'+(this.maxPage>1 ? (((this.conWidth+this.borderWidth)*this.maxPage).toFixed(2)):((this.conWidth*this.maxPage).toFixed(2)))+'px;">');
    for(var i=0,ilen=titleDomData.length;i<ilen;i++){
      html.push('<div class="trend_num fontred trend_w'+titleDomData[i].length+(i==4 ? " numblue  fontblue" : "")+'" style="width:'+this.conWidth+'px;">');
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

  hn4j1TrendObj.createListHeight = function(){
    var betHeight = this.betObj.height();
    var height = this.conHeight - betHeight;
    var listConHeight = this.listConObj.children('div').height() || 0;
    if(listConHeight!=0 && listConHeight<height)height = listConHeight;
    this.listConObj.height(height);
    this.listFirstObj.height(height);
    if(this.listTitleIscroll)this.listTitleIscroll.refresh();
    if(this.listIscroll)this.listIscroll.refresh();
  }

  hn4j1TrendObj.createListTitleIscroll = function(){
    if(this.listTitleIscroll)this.listTitleIscroll.refresh();
    this.listTitleIscroll = new iScroll(this.listFirstObj[0],{
      hScrollbar : false,
      vScrollbar : false,
      bounce : false,
      momentum : false,
      onScrollMove : function(){
        hn4j1TrendObj.listIscroll.scrollTo(hn4j1TrendObj.listIscroll.x,this.y);
      },
      onMomentum : function(){
        hn4j1TrendObj.listIscroll.scrollTo(hn4j1TrendObj.listIscroll.x,this.y,this.duration);
      }
    });
    var scrollToVal = this.listFirstObj.children('div').height()-this.conHeight;
    scrollToVal = scrollToVal<0 ? 0 : scrollToVal;
    this.listTitleIscroll.scrollTo(0,-1*scrollToVal);
  }

  hn4j1TrendObj.createTitleIscroll = function(){
    if(this.titleIscroll)this.titleIscroll.refresh();
    this.titleIscroll = new iScroll(this.titleConObj[0],{
      hScrollbar : false,
      vScrollbar : false,
      bounce : false,
      momentum : false,
      onScrollMove : function(){
        hn4j1TrendObj.listIscroll.scrollTo(this.x,hn4j1TrendObj.listIscroll.y);
        hn4j1TrendObj.betIscroll.scrollTo(this.x,hn4j1TrendObj.betIscroll.y);
        hn4j1TrendObj.updatePage(this.x);
      },
      onMomentum : function(){
        hn4j1TrendObj.listIscroll.scrollTo(this.x,hn4j1TrendObj.listIscroll.y,this.duration);
        hn4j1TrendObj.betIscroll.scrollTo(this.x,hn4j1TrendObj.betIscroll.y,this.duration);
        hn4j1TrendObj.updatePage(this.x);
      }
    });
  }

  hn4j1TrendObj.createListIscroll = function(){
    if(this.listIscroll)this.listIscroll.refresh();
    this.listIscroll = new iScroll(this.listConObj[0],{
      hScrollbar : false,
      vScrollbar : false,
      bounce : false,
      momentum : false,
      onScrollMove : function(){
        hn4j1TrendObj.titleIscroll.scrollTo(this.x,hn4j1TrendObj.titleIscroll.y);
        hn4j1TrendObj.betIscroll.scrollTo(this.x,hn4j1TrendObj.betIscroll.y);
        hn4j1TrendObj.listTitleIscroll.scrollTo(hn4j1TrendObj.listTitleIscroll.x,this.y);
        hn4j1TrendObj.updatePage(this.x);
      },
      onMomentum : function(){
        hn4j1TrendObj.titleIscroll.scrollTo(this.x,hn4j1TrendObj.titleIscroll.y,this.duration);
        hn4j1TrendObj.betIscroll.scrollTo(this.x,hn4j1TrendObj.betIscroll.y,this.duration);
        hn4j1TrendObj.listTitleIscroll.scrollTo(hn4j1TrendObj.listTitleIscroll.x,this.y,this.duration);
        hn4j1TrendObj.updatePage(this.x);
      } 　 
    });
    var scrollToVal = this.listConObj.children('div').height()-this.conHeight;
    scrollToVal = scrollToVal<0 ? 0 : scrollToVal;
    this.listIscroll.scrollTo(0,-1*scrollToVal);
  }

  hn4j1TrendObj.createBetscroll = function(){
    if(this.betIscroll)this.betIscroll.refresh();
    this.betIscroll = new iScroll(this.betConObj[0],{
      hScrollbar : false,
      vScrollbar : false,
      bounce : false,
      momentum : false,
      onScrollMove : function(){
        hn4j1TrendObj.listIscroll.scrollTo(this.x,hn4j1TrendObj.listIscroll.y);
        hn4j1TrendObj.titleIscroll.scrollTo(this.x,hn4j1TrendObj.titleIscroll.y);
        hn4j1TrendObj.updatePage(this.x);
      },
      onMomentum : function(){
        hn4j1TrendObj.listIscroll.scrollTo(this.x,hn4j1TrendObj.listIscroll.y,this.duration);
        hn4j1TrendObj.titleIscroll.scrollTo(this.x,hn4j1TrendObj.titleIscroll.y,this.duration);
        hn4j1TrendObj.updatePage(this.x);
      } 
    });
  }

  hn4j1TrendObj.updatePage = function(x){
    var positionWidth  = Math.abs(x);
    this.page = Math.floor(positionWidth/this.conWidth);
    var titleData = this[this.postData["trendName"]+"TitleFirst"][this.postData["trendType"]][this.page];
    var betTitleData = this["betTitle"][this.postData["trendType"]][this.page];
    this.titleFirstObj.html(titleData);
    this.betFirstObj.html(betTitleData);
    this.selectObj.children('div').removeClass('on');
    this.selectObj.children('div[data-i="'+this.page+'"]').addClass('on');
  }

  hn4j1TrendObj.updateTrendName = function(obj){
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

  hn4j1TrendObj.updatelottery = function(obj){
    var thisV = obj.attr("data-v");
    var thisCn = obj.attr("data-cn");
    this.playTitleObj.html("海南-"+thisCn+'<em class="down"></em>');
    this.postData['trendType'] = thisV;
    this.temSortDom = this.titleFirstObj;

    this.updataPlayObj.hide();
    this.playTitleObj.attr("data-s","0");
    if($("#hn4j1Trend_upBGObj").length)$("#hn4j1Trend_upBGObj").remove();

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

  hn4j1TrendObj.sortDom = function(obj){
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
      this.temSortDom.find("i").html("↓");
    }
    if(!obj.hasClass('fontblue')){
      obj.addClass('fontblue');
      obj.find("i").html("↓");
      this.sortData(thisData,"down");
    }else if(!obj.hasClass('sortObj')){
      obj.addClass('sortObj');
      obj.find("i").html("↑");
      this.sortData(thisData,"up");
    }else{
      obj.removeClass('fontblue');
      obj.removeClass('sortObj');
      obj.find("i").html("↓");
      this.sortData(thisData,"old");
    }
    this.temSortDom = obj;
  }

  hn4j1TrendObj.sortData = function(data,type){
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

  hn4j1TrendObj.betNum = function(obj){
    var thisI = obj.attr("data-i");
    var thisK = obj.attr("data-k");
    var emObj = obj.children('em');
    if(emObj.hasClass('on')){
      emObj.removeClass('on');
      delete this.selectBetData[thisI][thisK];
    }else{
      var lotteryBetNum = new Array();
      for(var i=0,ilen=this.betNumData[this.postData['trendType']].length;i<ilen;i++){
        lotteryBetNum[i]=0;
        if(!this.selectBetData[i])continue;
        for(var k=0,klen=this.selectBetData[i].length;k<klen;k++){
          if(this.selectBetData[i][k])lotteryBetNum[i]+=1;
        }
      }
      if(this.lotteryBallWei){
        for(var i=0,k=0,ilen=lotteryBetNum.length;i<ilen;i++){
          if(lotteryBetNum[i]>0)k++;
        }
        if(k>=this.lotteryBallWei[this.postData['trendType']] && lotteryBetNum[thisI]===0){
          $.alertMsg("最多可选"+this.lotteryBallWei[this.postData['trendType']]+"位");
          return false;
        }
      }
      if(lotteryBetNum[thisI]>=this.betMaxNumData[this.postData['trendType']][thisI]){
        $.alertMsg('最多可选'+this.betMaxNumData[this.postData['trendType']][thisI]+'个'+this.betTitle[this.postData['trendType']][thisI]);
        return false;
      }
      emObj.addClass('on');
      if(!this.selectBetData[thisI])this.selectBetData[thisI] = new Array();
      this.selectBetData[thisI][thisK] = this.betData[this.postData['trendType']][thisI][thisK];
    }
  }

  hn4j1TrendObj.createSubData = function(){
    var data = [];
    for(var i=0,ilen=this.betNumData[this.postData['trendType']].length;i<ilen;i++){
      var thisData = [];
      // if(!(this.selectBetData[i] && this.selectBetData[i].length)){
      //   $.alertMsg("请至少选择1注");
      //   return false;
      // }
      if(!(this.selectBetData[i] && this.selectBetData[i].length)){
        data.push("-");
        continue;
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
    if((this.postData["trendType"]=="D3" || this.postData["trendType"]=="D2" || this.postData["trendType"]=="D1") && zs==0){
      $.alertMsg("请每位至少选择1个不同的号码");
      return false;
    }else if((this.postData["trendType"]=="R4C3" || this.postData["trendType"]=="R4C1" || this.postData["trendType"]=="R3C2") && zs==0){
      $.alertMsg("重号和单号至少选择1个不同的号码");
      return false;
    }else if(zs==0){
      $.alertMsg("请至少选择1注");
      return false;
    }
    data.push(this.postData["trendType"]);
    data.push(zs);
    return data.join("|");
  }

  hn4j1TrendObj.getCXY = function(x,y){
    if(x<y)return 0;
    var allX = 1;
    var allY = 1;
    for(var i=0,ilen=y;i<ilen;i++){
      allX*=x-i;
      allY*=y-i;
    }
    return allX/allY;
  }

  hn4j1TrendObj.createMoneyDom = function(){
    var zs = this.getZS();
    this.betMoneyObj.html('<span class="fontred">'+zs+'</span>注 <span class="fontred">'+(zs*2)+'</span>元');
  }

  hn4j1TrendObj.getZS = function(){
    return hn4j1TrendObj[this.postData['trendType']+"Bonus"]();
  }

  hn4j1TrendObj.D5Bonus = function(){
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

  hn4j1TrendObj.D3Bonus = function(){
    var lotteryBetNum = new Array();
    var lotteryBallWei = this.lotteryBallWei[this.postData['trendType']];
    var lotteryMinNum = this.betNumData[this.postData['trendType']];
    for(var i=0,ilen=this.betNumData[this.postData['trendType']].length;i<ilen;i++){
      lotteryBetNum[i] = 0;
      if(!this.selectBetData[i])continue;
      for(var k=0,klen=this.selectBetData[i].length;k<klen;k++){
        if(this.selectBetData[i][k])lotteryBetNum[i]+=1;
      }
    }
    for(var i=0,k=0,ilen=lotteryBetNum.length;i<ilen;i++){
      if(lotteryBetNum[i]>0)k++;
    }
    if(k<lotteryBallWei){
      return 0;
    }
    for(var i=0,arg,ilen=lotteryBetNum.length;i<ilen;i++){
        if(!lotteryBetNum[i])continue;
        var x = 1,y=1;
        for(var k=0,klen=lotteryMinNum[i];k<klen;k++){
          x*=lotteryBetNum[i]-k;
          y*=lotteryMinNum[i]-k;
        }
        arg = arg ? arg*x/y : 1*x/y;
      }
      return arg;
  }

  hn4j1TrendObj.FP2Bonus = function(){
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

  hn4j1TrendObj.D4Bonus = hn4j1TrendObj.D5Bonus;
  hn4j1TrendObj.D2Bonus = hn4j1TrendObj.D3Bonus;
  hn4j1TrendObj.D1Bonus = hn4j1TrendObj.D3Bonus;
  hn4j1TrendObj.R4C3Bonus = hn4j1TrendObj.FP2Bonus;
  hn4j1TrendObj.R4C2Bonus = hn4j1TrendObj.D5Bonus;
  hn4j1TrendObj.R4C1Bonus = function(){
    var lotteryBetNum = new Array();
    var lotteryMinNum = this.betNumData[this.postData['trendType']];
    for(var i=0,ilen=this.betNumData[this.postData['trendType']].length;i<ilen;i++){
      lotteryBetNum[i] = 0;
      if(!this.selectBetData[i])continue;
      for(var k=0,klen=this.selectBetData[i].length;k<klen;k++){
        if(this.selectBetData[i][k])lotteryBetNum[i]+=1;
      }
    }
    for(var i=0,arg,ilen=lotteryMinNum.length;i<ilen;i++){
      if(!lotteryBetNum[i])return 0;
      if(lotteryBetNum[i] < lotteryMinNum[i])return 0;
      if(i==1){
        for(var b=0,blen=this.selectBetData[i].length;b<blen;b++){
          if(!this.selectBetData[i][b])continue;
          if($.inArray(this.selectBetData[i][b],this.selectBetData[0])>-1)return 0;
        }
      }
    }
    return 1;
  }
  hn4j1TrendObj.R4Bonus = hn4j1TrendObj.D5Bonus;
  hn4j1TrendObj.R3C3Bonus = hn4j1TrendObj.D5Bonus;
  hn4j1TrendObj.R3C2Bonus = hn4j1TrendObj.R4C3Bonus;
  hn4j1TrendObj.R3Bonus = hn4j1TrendObj.D5Bonus;
  hn4j1TrendObj.R2C2Bonus = hn4j1TrendObj.D5Bonus;
  hn4j1TrendObj.R2Bonus = hn4j1TrendObj.D5Bonus;

  hn4j1TrendObj.subData = function(obj){
    if(obj.attr("data-stop")){
      $.alertMsg("不在开售时间");
      return false;
    }
    var postData = this.createSubData();
	//console.log(postData);
    if(!postData)return false;
	window.localStorage.setItem(this.postData['lottery_type']+"lotteryBetData",postData);
    switch(this.postData['lottery_type']){
		case 'hn4j1':
			this.goHn4j1Confirm();
			break;	
	}
  }
  
  hn4j1TrendObj.goHn4j1Confirm = function(){
	  var self = this;
	  hn4j1ConfirmObj.goBack = function(){
		  hn4j1TrendObj.show(); 
	  }
	  hn4j1ConfirmObj.show('reload',function(){
		 hn4j1ConfirmObj.setData({
			'lotteryType': self.postData['lottery_type'],
			'lotteryCnName': '海南4+1',
			'lotteryNo' : self.postData.lotteryNoVal,
			'lotteryPlay': self.postData.trendType
		 })
	  });  
  }

  hn4j1TrendObj.delAll = function(){
    this.selectBetData = new Array();
    this.betConObj.find("span[data-i]").each(function(){
      $(this).children('em').removeClass('on');
    });
  }

  hn4j1TrendObj.createGetData = function(){
    return '?lotteryType='+this.postData['lottery_type']+'&lotteryNo='+this.postData['lotteryNoVal']+"&lotteryPlay="+this.postData['trendType']+"&res=trend";
  }

  hn4j1TrendObj.createSelectBetDom = function(){
    var html = [];
    for(var i=0,ilen=this.selectBetData.length;i<ilen;i++){
      if(!this.selectBetData[i]){
        html.push('<div class="fl ts_num'+(this.page == i ? " on" : "")+'"></div>');
        continue;
      }
      var thisHtml = ['<div data-i="'+i+'" class="fl ts_num'+(this.page == i ? " on" : "")+(i==4 ? " fontblue" : " fontred")+'">'];
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

 

  hn4j1TrendObj.updateData = function(obj){
    obj.siblings('span').removeClass('on');
    obj.addClass('on');
  }

  hn4j1TrendObj.onloadExecution = function(){
    this.createDom();
    this.createEvent();
    this.createListHeight();
    this.ajaxGetData();
  }

  //此页面包含2个js, hn4j1Trend,hn4j1Time,  hn4j1Time负责高频的赛程时间循环及相关更新，不负责投注。而hn4j1Trend则负责具体图表的页面展现及投注
  hn4j1TrendObj.init = function(){
	  hn4j1TrendObj.setDefConfig();
	  hn4j1TimeObj.setDefConfig();
      hn4j1TrendObj.onloadExecution();
	  hn4j1TimeObj.init();
	     
  }
  
  hn4j1TrendObj.destroy = function(){
	 hn4j1TrendObj.setDefConfig();
	 hn4j1TimeObj.setDefConfig();
	 $('#hn4j1Trend').html('').remove();  
  }


