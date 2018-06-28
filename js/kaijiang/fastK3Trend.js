var fastK3TrendObj = new PageController({
    name: 'fastK3Trend',
    tpl: 'template/kaijiang/fastK3Trend.html'
});

fastK3TrendObj.setDefConfig = function () {
    fastK3TrendObj.titleWidth = 17.5/100;
    fastK3TrendObj.clientWidth = (document.documentElement.clientWidth || document.body.clientWidth).toFixed(2);
    fastK3TrendObj.clientHeight = (document.documentElement.clientHeight || document.body.clientHeight).toFixed(2);
    fastK3TrendObj.conWidth = Number((Number(fastK3TrendObj.clientWidth) * (1-fastK3TrendObj.titleWidth)).toFixed(2));
    fastK3TrendObj.conHeight = Number(fastK3TrendObj.clientHeight-101-78);
    fastK3TrendObj.maxPage = 0;
    fastK3TrendObj.page = 0;
    fastK3TrendObj.borderWidth = 1;

    fastK3TrendObj.titleIscroll = "";
    fastK3TrendObj.listTitleIscroll = "";
    fastK3TrendObj.listIscroll = "";
    fastK3TrendObj.temTrendData = "";
    fastK3TrendObj.temSTTrendData = "";
    fastK3TrendObj.temSortDom = "";

    fastK3TrendObj.selectBetData = new Array();

    fastK3TrendObj.postData = {
        num : 50,
        showYL : "show",
        statistics : "show",
        lottery_type : ConfigObj.fastK3Type,
        trendType : "HZ",
        trendName : "DF",
        lotteryNoVal : ""
    }

    /**
     * 玩法代号
     * @type {{HZ: string, STHDX: string, SBT: string, ETH: string, EBT: string}}
     */
    fastK3TrendObj.betConf = {
        HZ: '和值',
        STHDX: '三同号',
        SBT: '三不同号',
        ETH: '二同号',
        EBT: '二不同号'
    };

    /**
     * 玩法代号，key 是走势中的代号，value 是投注时玩法代号
     * @type {{HZ: string, STHDX: string, SBT: string, ETH: string, EBT: string}}
     */
    fastK3TrendObj.playTypeMap = {
        HZ: 'SUM',
        STHDX: 'TXD',
        SBT: 'BT3',
        ETH: 'TXD2',
        EBT: 'BT2'
    };

    /**
     * 玩法代号，key 是投注页进入走势页时的代号，value 是走势页代号
     * @type {{HZ: string, STHDX: string, SBT: string, ETH: string, EBT: string}}
     */
    fastK3TrendObj.playTypeMap2 = {
        'SUM': 'HZ',
        'TXD-TX': 'STHDX',
        'TXD2-TXS2': 'ETH',
        'BT3-LTX': 'SBT',
        'BT2': 'ETH',
        'BT3': 'EBT'
    };

    fastK3TrendObj.betNumData = {
        HZ : [1],
        STHDX : [1],
        SBT : [3],
        ETH : [1,1],
        EBT : [2]
    }

    fastK3TrendObj.lotteryBetError = {
        'HZ' : ['至少选择1个号码'],
        'STHDX' : ['至少选择1个号码'],
        'SBT' : ['至少选择3个号码'],
        'ETH' : ['至少选择1个同号',"至少选择1个不同号"],
        'EBT' : ['至少选择2个号码']
    }

    fastK3TrendObj.betData = {
        HZ : new Array(new Array("4","5","6","7","8","9","10","11","12","13","14","15","16","17")), // 广西快3，和值无 3,18
        STHDX : new Array(new Array("111","222","333","444","555","666")),
        SBT : new Array(new Array("1","2","3","4","5","6")),
        ETH : new Array(new Array("11","22","33","44","55","66"),new Array("1","2","3","4","5","6","*")),
        EBT : new Array(new Array("1","2","3","4","5","6"))
    }
    fastK3TrendObj.betTitle = {
        HZ : ["和值"],
        STHDX : ["三同号"],
        SBT : ["三不同号"],
        ETH : ["同号","不同号"],
        EBT : ["二不同号"]
    }

    fastK3TrendObj.DFTitleData = {
        HZ : [new Array("开奖号"),new Array("和值"),new Array("跨度"),new Array("大"),new Array("小"),new Array("单"),new Array("双"),new Array("01","02","03","04","05","06")],
        STHDX : [new Array("开奖号"),new Array("和值"),new Array("跨度"),new Array("大"),new Array("小"),new Array("单"),new Array("双"),new Array("01","02","03","04","05","06")],
        SBT : [new Array("开奖号"),new Array("和值"),new Array("跨度"),new Array("大"),new Array("小"),new Array("单"),new Array("双"),new Array("01","02","03","04","05","06")],
        ETH : [new Array("开奖号"),new Array("和值"),new Array("跨度"),new Array("大"),new Array("小"),new Array("单"),new Array("双"),new Array("01","02","03","04","05","06")],
        EBT : [new Array("开奖号"),new Array("和值"),new Array("跨度"),new Array("大"),new Array("小"),new Array("单"),new Array("双"),new Array("01","02","03","04","05","06")],
    }

    fastK3TrendObj.STTitleData = {
        HZ : [new Array("4","5","6","7","8","9","10"),new Array("11","12","13","14","15","16","17")], // 和值，无 3,18
        STHDX : [new Array("开奖号"),new Array("三同号","三不同","二同号","二不同")],
        SBT : [new Array("开奖号"),new Array("三同号","三不同","二同号","二不同")],
        ETH : [new Array("开奖号"),new Array("11","22","33","44","55","66")],
        EBT : [new Array("开奖号"),new Array("12","13","14","15","16","23","24"),new Array("25","26","34","35","36","45","46","56")],
    }

    fastK3TrendObj.DFTitleWidth = {
        HZ : [50,50,50,25,25,25,25,fastK3TrendObj.conWidth],
        STHDX : [50,50,50,25,25,25,25,fastK3TrendObj.conWidth],
        SBT : [50,50,50,25,25,25,25,fastK3TrendObj.conWidth],
        ETH : [50,50,50,25,25,25,25,fastK3TrendObj.conWidth],
        EBT : [50,50,50,25,25,25,25,fastK3TrendObj.conWidth],
    }


    fastK3TrendObj.STTitleWidth = {
        HZ : [fastK3TrendObj.conWidth,fastK3TrendObj.conWidth],
        STHDX : [50,fastK3TrendObj.conWidth-50],
        SBT : [50,fastK3TrendObj.conWidth-50],
        ETH : [50,fastK3TrendObj.conWidth-50],
        EBT : [50,fastK3TrendObj.conWidth-50,fastK3TrendObj.conWidth],
    }

    fastK3TrendObj.STHSelectClass = ["block-3th","block-3bt","block-2th","block-2bt"]


    fastK3TrendObj.DFTitleClass = {
        HZ : new Array("trend_num fontred","trend_num fontred tn2","trend_num fontred tn3","trend_num fontred tn4","trend_num fontred tn5","trend_num fontred tn6","trend_num fontred tn7","trend_num trend_w6 fontred tn8"),
        STHDX : new Array("trend_num fontred","trend_num fontred tn2","trend_num fontred tn3","trend_num fontred tn4","trend_num fontred tn5","trend_num fontred tn6","trend_num fontred tn7","trend_num trend_w6 fontred tn8"),
        SBT : new Array("trend_num fontred","trend_num fontred tn2","trend_num fontred tn3","trend_num fontred tn4","trend_num fontred tn5","trend_num fontred tn6","trend_num fontred tn7","trend_num trend_w6 fontred tn8"),
        ETH : new Array("trend_num fontred","trend_num fontred tn2","trend_num fontred tn3","trend_num fontred tn4","trend_num fontred tn5","trend_num fontred tn6","trend_num fontred tn7","trend_num trend_w6 fontred tn8"),
        EBT : new Array("trend_num fontred","trend_num fontred tn2","trend_num fontred tn3","trend_num fontred tn4","trend_num fontred tn5","trend_num fontred tn6","trend_num fontred tn7","trend_num trend_w6 fontred tn8")
    }

    fastK3TrendObj.STTitleClass = {
        HZ : ["trend_num fontred tn2 trend_w7","trend_num fontred tn3 trend_w7"],
        STHDX : ["trend_num","trend_num fontred tn2 trend_w4"],
        SBT : ["trend_num","trend_num fontred tn2 trend_w4"],
        ETH : ["trend_num","trend_num fontred tn2 trend_w6"],
        EBT : ["trend_num","trend_num fontred tn2 trend_w7","trend_num fontred tn3 trend_w8"]
    }

    fastK3TrendObj.DFTitleFirst = {
        HZ : ["期号"],
        STHDX : ["期号"],
        SBT : ["期号"],
        ETH : ["期号"],
        EBT : ["期号"]
    }

    fastK3TrendObj.STTitleFirst = {
        HZ : ["期号"],
        STHDX : ["期号"],
        SBT : ["期号"],
        ETH : ["期号"],
        EBT : ["期号"]
    }

    fastK3TrendObj.lotteryNoResult = {};
}

fastK3TrendObj.createDom = function(){
    this.lotteryObj = $("#lotteryObj");
    this.playTitleObj = $("#playTitleObj");
    this.updataPlayObj = $("#updataPlayObj");
    this.setObj = $("#setObj");
    this.titleFirstObj = $("#titleFirstObj");
    this.titleConObj = $("#titleConObj");
    this.listFirstObj = $("#listFirstObj");
    this.listConObj = $("#listConObj");
    this.betFirstObj = $("#betFirstObj");
    this.betConObj = $("#betConObj");
    this.explainObj = $("#explainObj");
    this.selectObj = $("#selectObj");
    this.betMoneyObj = $("#betMoneyObj");
    this.qhObj = $("#qhObj");
    this.subObj = $("#subObj");
    this.chartTitle = $("#chartTitle");
}

fastK3TrendObj.createEvent = function(){
    this.lotteryObj.tap(function(e){
        fastK3TrendObj.lotteryEvent(e);
    });
}

fastK3TrendObj.lotteryEvent = function(e){
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
            case "back" : fastK3TrendObj.goBack();return true;
            case "updatelottery": fastK3TrendObj.updatelottery(thisObj.attr('data-v'), thisObj.attr('data-cn')); return true;
            case "subData" : fastK3TrendObj.subData(thisObj);return true;
            case "delAll" : fastK3TrendObj.delAll();this.createSelectBetDom();this.createMoneyDom();return true;
        }
    }

    var liObj = $.oto_checkEvent(e,"LI");
    if(liObj){
        var thisObj = $(liObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
            case "updateTrendName" : fastK3TrendObj.updateTrendName(thisObj);return true;
        }
    }

    var divObj = $.oto_checkEvent(e,"DIV");
    if(divObj){
        var thisObj = $(divObj);
        var thisT = thisObj.attr("data-t");
        if(thisObj[0].id!="setObj")return false;
        fastK3TrendObj.hideSet();
    }
}

fastK3TrendObj.showUpdPlay = function(obj){
    if(Number(obj.attr("data-s"))){
        this.updataPlayObj.css("display","none");
        obj.attr("data-s",0);
    }else{
        this.updataPlayObj.css("display","");
        obj.attr("data-s",1);
    }

    var bodyHeight = document.body.scrollHeight;
    var divObj = $('<div id="upBGObj" style="width: 100%; height: '+bodyHeight+'px; position: absolute; left: 0px; top: 0px; z-index: 98; background: transparent;" id="bgLayer"></div>');

    $("body").append(divObj);
    divObj.tap(function(){
        fastK3TrendObj.updataPlayObj.css("display","none");
        fastK3TrendObj.playTitleObj.attr("data-s","0");
        divObj.remove();
    });
}

fastK3TrendObj.ajaxGetData = function(){
    var data = this.postData;
//  //console.log("222",data)
    delete data.lotteryNoVal; // 不传期号，获取最新的
	
	var secretData = {
			'para' : Global.encrypt(data)
		};
	
    $.ajax({
        url : ConfigObj.localSite + ConfigObj.fastK3Api[ConfigObj.fastK3Type].chart,
        data : secretData,
        type : "post",
        dataType : "text",
        success : function(msg){
        	
//      	msg = $.parseJSON(msg);
//      	
//      	console.log(msg.info);
            msg = eval("("+msg+")");
            
            
            if(msg.trendType!=fastK3TrendObj.postData.trendType)return false;
            if(msg.code!="0000"){
                $.alertMsg(msg.code_str);
                return false;
            }
            msg.info = $.parseJSON(Global.crypt(msg.info));
//          console.log(msg.info);
            fastK3TrendObj.temTrendData = msg.info;
            fastK3TrendObj.createPageData();
            fastK3TrendObj.createDataDom();
            fastK3TrendObj.recordLotteryNo(msg.info.list, data.trendName, data.trendType);
        }
    });
}

fastK3TrendObj.ajaxGetSTData = function(){
    var data = this.postData;
    //console.log("111",data);
    delete data.lotteryNoVal; // 不传期号，获取最新的

	var secretData2 = {
			'para' : Global.encrypt(data)
		};

    $.ajax({
        url : ConfigObj.localSite + ConfigObj.fastK3Api[ConfigObj.fastK3Type].chart,
        data : secretData2,
        type : "post",
        dataType : "text",
        success : function(msg){
            msg = eval("("+msg+")");
            
            if(msg.code!="0000"){
                $.alertMsg(msg.code_str);
                return false;
            }
            msg.info = $.parseJSON(Global.crypt(msg.info));
            fastK3TrendObj.temSTTrendData = msg.info;
            fastK3TrendObj.createPageData();
            fastK3TrendObj.createDataDom();
            fastK3TrendObj.recordLotteryNo(msg.info.list, data.trendName, data.trendType);
        }
    });
}

// 记录已有数据的期号
fastK3TrendObj.recordLotteryNo = function (data, trendName, trendType) {
    if (data.length) {
        data.forEach(function (v) {
            fastK3TrendObj.lotteryNoResult['' + v.lottery_no + trendName + trendType] = true;
        });
    }
};

fastK3TrendObj.showSet = function(){
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

fastK3TrendObj.hideSet = function(){
    this.setObj.hide();
    this.setObj.removeAttr("data-s",1);
}

fastK3TrendObj.subSet  = function(){
    var spanObj = $("span[data-t='updateData']");
    for(var i=0,ilen=spanObj.length;i<ilen;i++){
        if(!spanObj.eq(i).hasClass('on'))continue;
        var thisData = spanObj.eq(i).attr("data-v").split("_");
        this.postData[thisData[0]] = thisData[1];
    }

    this.temTrendData = "";
    this.temLRTrendData = "";
    this.page = 0;
    this.maxPage = 0
    if(this.postData['trendName']=="ST"){
        this.ajaxGetSTData();
    }else{
        this.ajaxGetData();
    }
    this.selectBetData = new Array();
    // this.createSelectBetDom();
    this.hideSet();
}

fastK3TrendObj.createPageData = function(){
    this.page = 0;
    var trendName = this.postData['trendName'];
    var lotteryPlay = this.postData['trendType'];
    var titleDomData = this[trendName+"TitleData"][this.postData.trendType];
    this.maxPage = titleDomData.length;
}

fastK3TrendObj.createDataDom = function(){
    this.createTitleDom();
    this.createListDom();
    this.createExplain();
    this.createBetDom();
    this.createListHeight();
}

fastK3TrendObj.createTitleDom = function(){
    var trendName = this.postData['trendName'];
    var lotteryPlay = this.postData['trendType'];
    var titleDomData = this[trendName+"TitleData"][this.postData.trendType];

    var titleFirstData = this[trendName+"TitleFirst"][this.postData.trendType][this.page];

    var titleClass = this[trendName+"TitleClass"][this.postData.trendType];
    var html = new Array();

    var allWidth = eval(this[trendName+"TitleWidth"][this.postData.trendType].join("+"))+this.borderWidth*this.maxPage;

    html.push('<div class="clearfix" style="width:'+allWidth+'px;">');

    for(var i=0,ilen=titleDomData.length;i<ilen;i++){
        html.push('<div class="'+titleClass[i]+'" style="width:'+this[trendName+"TitleWidth"][this.postData.trendType][i]+'px;">');
        for(var k=0,klen=titleDomData[i].length;k<klen;k++){
            if(klen==1){
                html.push('<span style="width:100%">'+titleDomData[i][k]+'</span>');
            }else{
                html.push('<span>'+titleDomData[i][k]+'</span>');
            }
        }
        html.push('</div>');
    }
    html.push('</div>');

    this.titleConObj.html(html.join(""));
    this.titleFirstObj.html(titleFirstData);
    this.createTitleIscroll();
}

fastK3TrendObj.createListDom = function(){
    var trendName = this.postData['trendName'];
    switch(trendName){
        case "DF" : this.createDFLIst(fastK3TrendObj.temTrendData);break;
        case "ST" : this.createSTLIst(fastK3TrendObj.temSTTrendData);break;
    }
    this.createListTitleIscroll();
    this.createListIscroll();
}

fastK3TrendObj.createDFLIst = function(data){
    var showYL = this.postData['showYL'] === "show" ? true : false;
    var showSt = this.postData['statistics'] === "show" ? true : false;

    var allWidth = eval(this[this.postData['trendName']+"TitleWidth"][this.postData.trendType].join("+"))+this.borderWidth*this.maxPage;

    var titleHtml = new Array();
    var conHtml = new Array();
    titleHtml.push("<div>");
    conHtml.push('<div style="width:'+allWidth+'px;">');
    var listData = data.list;
//	//console.log(listData);
    if(!listData)return false;
    for(var i=0,ilen=listData.length;i<ilen;i++){
        titleHtml.push('<p class="qh_con'+(i%2 ? "" : " odd")+(i==ilen-1 && !showSt ? " bor_bot" : "")+'"><span>'+listData[i]['lottery_no'].slice(-3)+'期</span><span class="line fl"><em class="dot"></em></span></p>');
        conHtml.push('<div class="clearfix'+(i%2 ? "" : " odd")+(i==ilen-1 && !showSt ? " bor_bot" : "")+'">');

        if(listData[i]['lottery_result'] === false){
            conHtml.push('<div style="width:'+allWidth+'px;text-align:center;">等待开奖</div>');
            conHtml.push('</div>');
            continue;
        }

        conHtml.push('<div class="trend_num trend_sm" style="width:'+this[this.postData['trendName']+"TitleWidth"][this.postData.trendType][0]+'px;">');
        conHtml.push('<span class="w-sm"><i class="fontred">'+listData[i]['lottery_result'].join("")+'</i></span>');
        conHtml.push('</div>');

        conHtml.push('<div class="trend_num trend_sm" style="width:'+this[this.postData['trendName']+"TitleWidth"][this.postData.trendType][1]+'px;">');
        conHtml.push('<span class="w-sm"><i>'+listData[i]['sum']+'</i></span>');
        conHtml.push('</div>');


        conHtml.push('<div class="trend_num trend_sm" style="width:'+this[this.postData['trendName']+"TitleWidth"][this.postData.trendType][2]+'px;">');
        conHtml.push('<span class="w-sm">'+listData[i]['span']+'</span>');
        conHtml.push('</div>');

        conHtml.push('<div class="trend_num trend_sm" style="width:'+this[this.postData['trendName']+"TitleWidth"][this.postData.trendType][3]+'px;">');
//      //console.log(listData[i]);
        if(Number(listData[i]['size'][0].miss) === 0){
            var iHtml = "";
            if(listData[i+1] && listData[i+1].lottery_result!==false){
                iHtml = Number(listData[i+1]['size'][0].miss) === 0 ? '<i class="block_line l_bot"></i>' : '<i class="block_line l_rt"></i>';
            }
            conHtml.push('<span class="block_item block_blue"><em class="on">'+listData[i]['size'][0].hao+'</em>'+iHtml+'</span>');
        }else{
            conHtml.push('<span>'+listData[i]['size'][0].miss+'</span>');
        }
        conHtml.push('</div>');

        conHtml.push('<div class="trend_num trend_sm" style="width:'+this[this.postData['trendName']+"TitleWidth"][this.postData.trendType][4]+'px;">');
        if(Number(listData[i]['size'][1].miss) === 0){
            var iHtml = "";
            if(listData[i+1] && listData[i+1].lottery_result!==false){
                iHtml = Number(listData[i+1]['size'][1].miss) === 0 ? '<i class="block_line l_bot"></i>' : '<i class="block_line l_lf"></i>';
            }
            conHtml.push('<span class="block_item block_blue"><em class="on">'+listData[i]['size'][1].hao+'</em>'+iHtml+'</span>');
        }else{
            conHtml.push('<span>'+listData[i]['size'][1].miss+'</span>');
        }
        conHtml.push('</div>');

        conHtml.push('<div class="trend_num trend_sm" style="width:'+this[this.postData['trendName']+"TitleWidth"][this.postData.trendType][5]+'px;">');
        if(Number(listData[i]['parity'][0].miss) === 0){
            var iHtml = "";
            if(listData[i+1] && listData[i+1].lottery_result!==false){
                iHtml = Number(listData[i+1]['parity'][0].miss) === 0 ? '<i class="block_line l_bot"></i>' : '<i class="block_line l_rt"></i>';
            }
            conHtml.push('<span class="block_item block_orange"><em class="on">'+listData[i]['parity'][0].hao+'</em>'+iHtml+'</span>');
        }else{
            conHtml.push('<span>'+listData[i]['parity'][0].miss+'</span>');
        }
        conHtml.push('</div>');

        conHtml.push('<div class="trend_num trend_sm" style="width:'+this[this.postData['trendName']+"TitleWidth"][this.postData.trendType][6]+'px;">');
        if(Number(listData[i]['parity'][1].miss) === 0){
            var iHtml = "";
            if(listData[i+1] && listData[i+1].lottery_result!==false){
                iHtml = Number(listData[i+1]['parity'][1].miss) === 0 ? '<i class="block_line l_bot"></i>' : '<i class="block_line l_lf"></i>';
            }
            conHtml.push('<span class="block_item block_orange"><em class="on">'+listData[i]['parity'][1].hao+'</em>'+iHtml+'</span>');
        }else{
            conHtml.push('<span>'+listData[i]['parity'][1].miss+'</span>');
        }
        conHtml.push('</div>');

        for(var k=0,klen=listData[i]['num_miss'].length;k<klen;k++){

            conHtml.push('<div class="trend_num trend_w'+listData[i]['num_miss'][k].length+'" style="width:'+this[this.postData['trendName']+"TitleWidth"][this.postData.trendType][7]+'px;">');
            for(var o=0,olen=listData[i]['num_miss'][k].length;o<olen;o++){
                var thisData = listData[i]['num_miss'][k][o];
                conHtml.push('<span><em'+((Number(thisData["miss"])<=0) ? ' class=" on"' : "")+'>'+(Number(thisData["miss"])<=0 ? thisData["hao"] : (showYL ? thisData["miss"] : ''))+(Number(thisData['miss'])<0 ? '<i class="r-dot">'+Math.abs(Number(thisData['miss']))+'</i>' : '')+'</em></span>');
            }
            conHtml.push('</div>');
        }
        conHtml.push('</div>');
    }
    if(showSt){
        var statisticsHtml = this.createDFStatistics(data);
        titleHtml = titleHtml.concat(statisticsHtml['titleHtml']);
        conHtml = conHtml.concat(statisticsHtml['conHtml']);
    }
    conHtml.push('</div>');
    titleHtml.push("</div>")
    this.listConObj.html(conHtml.join(""));
    this.listFirstObj.html(titleHtml.join(""));
}

fastK3TrendObj.createDFStatistics = function(data){
    var titleHtml = new Array();
    var conHtml = new Array();

    titleHtml.push('<p class="qh_con whitebg"><span>出现总数</span></p>');
    titleHtml.push('<p class="qh_con whitebg"><span>平均遗漏</span></p>');
    titleHtml.push('<p class="qh_con whitebg"><span>最大遗漏</span></p>');
    titleHtml.push('<p class="qh_con whitebg"><span>最大连出</span></p>');

    conHtml.push(this.createDFStatisticeCon(data['num_all'],"num_all"));
    conHtml.push(this.createDFStatisticeCon(data['num_avg_miss'],"num_avg_miss"));
    conHtml.push(this.createDFStatisticeCon(data['num_max_miss'],"num_max_miss"));
    conHtml.push(this.createDFStatisticeCon(data['num_con_miss'],"num_con_miss"));

    return {titleHtml:titleHtml,conHtml:conHtml};
}

fastK3TrendObj.createDFStatisticeCon = function(data,type){
    var conHtml = new Array();
    conHtml.push('<div class="clearfix whitebg">');

    if(data === false){
        var allWidth = eval(this[this.postData['trendName']+"TitleWidth"][this.postData.trendType].join("+"))+this.borderWidth*this.maxPage;

        conHtml.push('<div style="width:'+allWidth+'px;text-align:center;">'+(type=="num_avg_miss" ? "等待开奖" : "&nbsp;")+'</div>');
        conHtml.push('</div>');
        return conHtml.join("");
    }

    conHtml.push('<div class="trend_num trend_sm" style="width:'+this[this.postData['trendName']+"TitleWidth"][this.postData.trendType][0]+'px;">');
    conHtml.push('<span class="w-sm"><em>-</em></span>');
    conHtml.push('</div>');

    conHtml.push('<div class="trend_num trend_sm" style="width:'+this[this.postData['trendName']+"TitleWidth"][this.postData.trendType][1]+'px;">');
    conHtml.push('<span class="w-sm"><em>-</em></span>');
    conHtml.push('</div>');

    conHtml.push('<div class="trend_num trend_sm" style="width:'+this[this.postData['trendName']+"TitleWidth"][this.postData.trendType][2]+'px;">');
    conHtml.push('<span class="w-sm"><em>-</em></span>');
    conHtml.push('</div>');

    conHtml.push('<div class="trend_num trend_sm" style="width:'+this[this.postData['trendName']+"TitleWidth"][this.postData.trendType][3]+'px;">');
    conHtml.push('<span><em>-</em></span>');
    conHtml.push('</div>');

    conHtml.push('<div class="trend_num trend_sm" style="width:'+this[this.postData['trendName']+"TitleWidth"][this.postData.trendType][4]+'px;">');
    conHtml.push('<span><em>-</em></span>');
    conHtml.push('</div>');

    conHtml.push('<div class="trend_num trend_sm" style="width:'+this[this.postData['trendName']+"TitleWidth"][this.postData.trendType][5]+'px;">');
    conHtml.push('<span><em>-</em></span>');
    conHtml.push('</div>');

    conHtml.push('<div class="trend_num trend_sm" style="width:'+this[this.postData['trendName']+"TitleWidth"][this.postData.trendType][6]+'px;">');
    conHtml.push('<span><em>-</em></span>');
    conHtml.push('</div>');

    for(var i=0,ilen=data.length;i<ilen;i++){
        conHtml.push('<div class="trend_num trend_w'+data[i].length+'" style="width:'+this[this.postData['trendName']+"TitleWidth"][this.postData.trendType][7]+'px;">');
        for(var k=0,klen=data[i].length;k<klen;k++){
            conHtml.push('<span><em>'+data[i][k]+'</em></span>');
        }
        conHtml.push('</div>');
    }
    conHtml.push('</div>');
    return conHtml.join("");
}

fastK3TrendObj.createSTLIst = function(data){
    var showYL = this.postData['showYL'] === "show" ? true : false;
    var showSt = this.postData['statistics'] === "show" ? true : false;

    var allWidth = eval(this[this.postData['trendName']+"TitleWidth"][this.postData.trendType].join("+"))+this.borderWidth*this.maxPage;

    var titleHtml = new Array();
    var conHtml = new Array();
    titleHtml.push("<div>");
    conHtml.push('<div style="width:'+allWidth+'px;">');
    var listData = data.list;
    if(!listData)return false;
    for(var i=0,ilen=listData.length;i<ilen;i++){
        titleHtml.push('<p class="qh_con'+(i%2 ? "" : " odd")+(i==ilen-1 && !showSt ? " bor_bot" : "")+'"><span>'+listData[i]['lottery_no'].slice(-3)+'期</span><span class="line fl"><em class="dot"></em></span></p>');
        conHtml.push('<div class="clearfix'+(i%2 ? "" : " odd")+(i==ilen-1 && !showSt ? " bor_bot" : "")+'">');

        if(listData[i]['lottery_result'] === false){
            conHtml.push('<div style="width:'+allWidth+'px;text-align:center;">等待开奖</div>');
            conHtml.push('</div>');
            continue;
        }

        if(this.postData['trendType']!=="HZ"){
            conHtml.push('<div class="trend_num trend_sm" style="width:'+this[this.postData['trendName']+"TitleWidth"][this.postData.trendType][0]+'px;">');
            conHtml.push('<span class="w-sm"><i class="fontred">'+listData[i]['lottery_result'].join("")+'</i></span>');
            conHtml.push('</div>');
        }

        var newMissData = this.createFormatData(listData[i]['num_miss']);

        for(var k=0,klen=newMissData.length;k<klen;k++){
            if(this.postData['trendType']==="HZ"){
                conHtml.push('<div class="trend_num trend_w'+newMissData[k].length+'" style="width:'+this[this.postData['trendName']+"TitleWidth"][this.postData.trendType][k]+'px;">');
            }else {
                conHtml.push('<div class="trend_num trend_w'+newMissData[k].length+'" style="width:'+this[this.postData['trendName']+"TitleWidth"][this.postData.trendType][k+1]+'px;">');
            }
            for(var o=0,olen=newMissData[k].length;o<olen;o++){
                var thisData = newMissData[k][o];
                if(this.postData.trendType == "STHDX" || this.postData.trendType == "SBT"){
                    var onSelect = thisData['miss']==0 ? this.STHSelectClass[o] : "";
                    conHtml.push('<span class="'+onSelect+'">'+(thisData['miss']==0 ? thisData['hao'] : (showYL ? thisData["miss"] : ''))+'</span>');
                }else{
                    conHtml.push('<span><em'+((Number(thisData["miss"])<=0) ? ' class=" on"' : "")+'>'+(Number(thisData["miss"])<=0 ? thisData["hao"] : (showYL ? thisData["miss"] : ''))+(Number(thisData['miss'])<0 ? '<i class="r-dot">'+Math.abs(Number(thisData['miss']))+'</i>' : '')+'</em></span>');
                }
            }
            conHtml.push('</div>');
        }
        conHtml.push('</div>');
    }
    if(showSt){
        var statisticsHtml = this.createSTStatistics(data);
        titleHtml = titleHtml.concat(statisticsHtml['titleHtml']);
        conHtml = conHtml.concat(statisticsHtml['conHtml']);
    }
    conHtml.push('</div>');
    titleHtml.push("</div>")
    this.listConObj.html(conHtml.join(""));
    this.listFirstObj.html(titleHtml.join(""));
}

fastK3TrendObj.createSTStatistics = function(data){
    var titleHtml = new Array();
    var conHtml = new Array();

    titleHtml.push('<p class="qh_con whitebg"><span>出现总数</span></p>');
    titleHtml.push('<p class="qh_con whitebg"><span>平均遗漏</span></p>');
    titleHtml.push('<p class="qh_con whitebg"><span>最大遗漏</span></p>');
    titleHtml.push('<p class="qh_con whitebg"><span>最大连出</span></p>');

    conHtml.push(this.createSTStatisticeCon(this.createFormatData(data['num_all']),"num_all"));
    conHtml.push(this.createSTStatisticeCon(this.createFormatData(data['num_avg_miss']),"num_avg_miss"));
    conHtml.push(this.createSTStatisticeCon(this.createFormatData(data['num_max_miss']),"num_max_miss"));
    conHtml.push(this.createSTStatisticeCon(this.createFormatData(data['num_con_miss']),"num_con_miss"));

    return {titleHtml:titleHtml,conHtml:conHtml};
}

fastK3TrendObj.createSTStatisticeCon = function(data,type){
    var conHtml = new Array();
    conHtml.push('<div class="clearfix whitebg">');
//  //console.log('createSTStatisticeCon data: ' + JSON.stringify(data) + ' type: ' + JSON.stringify(type));

    if(data === false || !data.length){
        var allWidth = eval(this[this.postData['trendName']+"TitleWidth"][this.postData.trendType].join("+"))+this.borderWidth*this.maxPage;

        conHtml.push('<div style="width:'+allWidth+'px;text-align:center;">'+(type=="num_avg_miss" ? "等待开奖" : "&nbsp;")+'</div>');
        conHtml.push('</div>');
        return conHtml.join("");
    }

    if(this.postData['trendType']!=="HZ"){
        conHtml.push('<div class="trend_num trend_sm" style="width:'+this[this.postData['trendName']+"TitleWidth"][this.postData.trendType][0]+'px;">');
        conHtml.push('<span class="w-sm"><em>-</em></span>');
        conHtml.push('</div>');
    }

    for(var i=0,ilen=data.length;i<ilen;i++){
        if(this.postData['trendType']=="HZ"){
            conHtml.push('<div class="trend_num trend_w'+data[i].length+'" style="width:'+this[this.postData['trendName']+"TitleWidth"][this.postData.trendType][i]+'px;">');
        }else{
            conHtml.push('<div class="trend_num trend_w'+data[i].length+'" style="width:'+this[this.postData['trendName']+"TitleWidth"][this.postData.trendType][i+1]+'px;">');
        }
        for(var k=0,klen=data[i].length;k<klen;k++){
            conHtml.push('<span><em>'+data[i][k]+'</em></span>');
        }
        conHtml.push('</div>');
    }
    conHtml.push('</div>');
    return conHtml.join("");
}

fastK3TrendObj.createExplain = function(){
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

fastK3TrendObj.createBetDom = function(){
    var lotteryPlay = this.postData['trendType'];
    var allWidth = eval(this[this.postData['trendName']+"TitleWidth"][lotteryPlay].join("+"))+this.borderWidth*this.maxPage;

    if(lotteryPlay=="HZ"){
        var betWidth = allWidth;
        var betClass = "";
    }else{
        var betWidth = this.conWidth;
        var betClass = " num_block";
    }


    var titleDomData = this["betData"][lotteryPlay];
    var titleFirstData = this["betTitle"][lotteryPlay];
    var html = new Array();
    html.push('<div class="clearfix" style="width:'+allWidth+'px;">');
    for(var i=0,ilen=titleDomData.length;i<ilen;i++){
        html.push('<div class="trend_num mb5 fontred trend_w'+titleDomData[i].length+betClass+'" style="width:'+betWidth+'px;">');
        for(var k=0,klen=titleDomData[i].length;k<klen;k++){
            html.push('<span data-t="bet" data-i="'+i+'" data-k="'+k+'"><em '+((this.selectBetData[i] && this.selectBetData[i][k]) ? "class='on'" : "")+'>'+titleDomData[i][k]+'</em></span>');
        }
        html.push('</div>');
    }
    html.push('</div>');

    this.betFirstObj.html('<span class="mb5">'+titleFirstData.join('</span><span class="mb5">')+'</span>');
    this.betConObj.html(html.join(""));
    this.createBetscroll();
}

fastK3TrendObj.createListHeight = function(){
    var betHeight = this.postData.trendType == "ETH" ? 30 : 8;
    var height = this.conHeight - betHeight;
    var listConHeight = this.listConObj.children('div').height() || 0;
    if(listConHeight!=0 && listConHeight<height)height = listConHeight;

    this.listConObj.height(height);
    this.listFirstObj.height(height);
    if(this.listTitleIscroll){
        this.listTitleIscroll.refresh();
        var scrollToVal = this.listFirstObj.children('div').height()-this.conHeight+betHeight;
        scrollToVal = scrollToVal<0 ? 0 : scrollToVal;
        this.listTitleIscroll.scrollTo(0,-1*scrollToVal);
    }
    if(this.listIscroll){
        this.listIscroll.refresh();

        var scrollToVal = this.listConObj.children('div').height()-this.conHeight+betHeight;
        scrollToVal = scrollToVal<0 ? 0 : scrollToVal;
        this.listIscroll.scrollTo(0,-1*scrollToVal);
    }
}

fastK3TrendObj.createListTitleIscroll = function(){
    if(this.listTitleIscroll)this.listTitleIscroll.refresh();
    this.listTitleIscroll = new iScroll(this.listFirstObj[0],{
        hScrollbar : false,
        vScrollbar : false,
        bounce : false,
        momentum : false,
        onScrollMove : function(){
            fastK3TrendObj.listIscroll.scrollTo(fastK3TrendObj.listIscroll.x,this.y);
        },
        onMomentum : function(){
            fastK3TrendObj.listIscroll.scrollTo(fastK3TrendObj.listIscroll.x,this.y,this.duration);
        }
    });
}

fastK3TrendObj.createTitleIscroll = function(){
    if(this.titleIscroll)this.titleIscroll.refresh();
    this.titleIscroll = new iScroll(this.titleConObj[0],{
        hScrollbar : false,
        vScrollbar : false,
        bounce : false,
        momentum : false,
        onScrollMove : function(){
            fastK3TrendObj.listIscroll.scrollTo(this.x,fastK3TrendObj.listIscroll.y);
            if(fastK3TrendObj.postData.trendType == "HZ")fastK3TrendObj.betIscroll.scrollTo(this.x,fastK3TrendObj.betIscroll.y);
            fastK3TrendObj.updatePage(this.x);
        },
        onMomentum : function(){
            fastK3TrendObj.listIscroll.scrollTo(this.x,fastK3TrendObj.listIscroll.y,this.duration);
            if(fastK3TrendObj.postData.trendType == "HZ")fastK3TrendObj.betIscroll.scrollTo(this.x,fastK3TrendObj.betIscroll.y,this.duration);
            fastK3TrendObj.updatePage(this.x);
        }
    });
}

fastK3TrendObj.createListIscroll = function(){
    if(this.listIscroll)this.listIscroll.refresh();
    this.listIscroll = new iScroll(this.listConObj[0],{
        hScrollbar : false,
        vScrollbar : false,
        bounce : false,
        momentum : false,
        onScrollMove : function(){
            fastK3TrendObj.titleIscroll.scrollTo(this.x,fastK3TrendObj.titleIscroll.y);
            if(fastK3TrendObj.postData.trendType == "HZ")fastK3TrendObj.betIscroll.scrollTo(this.x,fastK3TrendObj.betIscroll.y);
            fastK3TrendObj.listTitleIscroll.scrollTo(fastK3TrendObj.listTitleIscroll.x,this.y);
            fastK3TrendObj.updatePage(this.x);
        },
        onMomentum : function(){
            fastK3TrendObj.titleIscroll.scrollTo(this.x,fastK3TrendObj.titleIscroll.y,this.duration);
            if(fastK3TrendObj.postData.trendType == "HZ")fastK3TrendObj.betIscroll.scrollTo(this.x,fastK3TrendObj.betIscroll.y,this.duration);
            fastK3TrendObj.listTitleIscroll.scrollTo(fastK3TrendObj.listTitleIscroll.x,this.y,this.duration);
            fastK3TrendObj.updatePage(this.x);
        }
    });
}

fastK3TrendObj.createBetscroll = function(){
    if(this.betIscroll)this.betIscroll.refresh();
    this.betIscroll = new iScroll(this.betConObj[0],{
        hScrollbar : false,
        vScrollbar : false,
        bounce : false,
        momentum : false,
        onScrollMove : function(){
            fastK3TrendObj.listIscroll.scrollTo(this.x,fastK3TrendObj.listIscroll.y);
            fastK3TrendObj.titleIscroll.scrollTo(this.x,fastK3TrendObj.titleIscroll.y);
            fastK3TrendObj.updatePage(this.x);
        },
        onMomentum : function(){
            fastK3TrendObj.listIscroll.scrollTo(this.x,fastK3TrendObj.listIscroll.y,this.duration);
            fastK3TrendObj.titleIscroll.scrollTo(this.x,fastK3TrendObj.titleIscroll.y,this.duration);
            fastK3TrendObj.updatePage(this.x);
        }
    });
}

fastK3TrendObj.updatePage = function(x){
    var positionWidth  = Math.abs(x);
    this.page = Math.floor(positionWidth/this.conWidth);
    var titleData = this[this.postData["trendName"]+"TitleFirst"][this.postData["trendType"]][0];
    var betTitleData = this["betTitle"][this.postData["trendType"]];
    this.titleFirstObj.html(titleData);
    this.betFirstObj.html('<span class="mb5">'+betTitleData.join('</span><span class="mb5">')+'</span>');
    this.selectObj.children('div').removeClass('on');
    this.selectObj.children('div[data-i="'+this.page+'"]').addClass('on');
}

fastK3TrendObj.updateTrendName = function(obj){
    obj.siblings('li').removeClass('on');
    obj.addClass('on');
    var thisV = obj.attr("data-v");
    this.postData['trendName'] = thisV;
    this.temSortDom = this.titleFirstObj;

    if(thisV=="ST"){
        this.page = 0;
        this.maxPage = 0;
        this.ajaxGetSTData();
    }else /*if(!this.temTrendData)*/{
        this.page = 0;
        this.maxPage = 0;
        this.ajaxGetData();
    //}else{
    //    fastK3TrendObj.createPageData();
    //    this.createDataDom();
    }

    fastK3TimeObj.lotteryNoChangeRec = {}; // TODO
}

/**
 * 更新页面
 * @param type
 * @param typeCn
 */
fastK3TrendObj.updatelottery = function(type, typeCn){
    for (var p in this.playTypeMap2)
        if (type === p) type = this.playTypeMap2[p];

    this.playTitleObj.html("快3-" + typeCn + '<em class="down"></em>');
    this.chartTitle.html(typeCn);
    this.postData['trendType'] = type;
    this.temSortDom = this.titleFirstObj;

    this.selectBetData = new Array();

    this.updataPlayObj.css("display","none");
    this.playTitleObj.attr("data-s","0");
    if($("#upBGObj").length)$("#upBGObj").remove();

    if(this.postData['trendName']=="ST"){
        this.page = 0;
        this.maxPage = 0
        this.ajaxGetSTData();
    }else /*if(!this.temTrendData)*/{
        this.ajaxGetData();
    }/*else{
        fastK3TrendObj.createPageData();
        this.createDataDom();
    }*/
    // this.createSelectBetDom();

    fastK3TimeObj.lotteryNoChangeRec = {}; // TODO
}

fastK3TrendObj.sortDom = function(obj){
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

fastK3TrendObj.sortData = function(data,type){
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

fastK3TrendObj.betNum = function(obj){
    var thisI = obj.attr("data-i");
    var thisK = obj.attr("data-k");
    var emObj = obj.children('em');
    if(emObj.hasClass('on')){
        emObj.removeClass('on');
        delete this.selectBetData[thisI][thisK];
    }else{
        emObj.addClass('on');
        if(!this.selectBetData[thisI])this.selectBetData[thisI] = new Array();
        if(this.postData.trendType == "ETH"){
            if(thisI==1 && thisK==6){
                this.selectBetData[thisI] = new Array();
                this.selectBetData[thisI][0] = "*";
                var betSpanObj = this.betConObj.find("span[data-t='bet']").filter('[data-i="'+thisI+'"]').each(function(index){
                    if(index<6)$(this).children('em').removeClass('on');
                });
                return false;
            }else if(thisI==1 && thisK<6 && this.selectBetData[thisI][0]=="*"){
                this.selectBetData[thisI] = new Array();
                var betSpanObj = this.betConObj.find("span[data-t='bet']").filter('[data-i="'+thisI+'"]').filter('[data-k="6"]');
                betSpanObj.children("em").removeClass("on");
            }
            var otherI = Math.abs(1-thisI);
            if(this.selectBetData[otherI] && this.selectBetData[otherI][thisK]){
                delete this.selectBetData[otherI][thisK];
                var betSpanObj = this.betConObj.find("span[data-t='bet']").filter('[data-i="'+otherI+'"]').filter('[data-k="'+thisK+'"]');
                betSpanObj.children("em").removeClass("on");
            }
            this.selectBetData[thisI][thisK] = this.betData[this.postData['trendType']][thisI][thisK];
        }else{
            this.selectBetData[thisI][thisK] = this.betData[this.postData['trendType']][thisI][thisK];
        }
    }
}

fastK3TrendObj.createSubData = function(){
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

fastK3TrendObj.getCXY = function(x,y){
    if(x<y)return 0;
    var allX = 1;
    var allY = 1;
    for(var i=0,ilen=y;i<ilen;i++){
        allX*=x-i;
        allY*=y-i;
    }
    return allX/allY;
}

fastK3TrendObj.createMoneyDom = function(){
    var zs = this.getZS();
    this.betMoneyObj.html('<span class="fontred">'+zs+'</span>注 <span class="fontred">'+(zs*2)+'</span>元');
}

fastK3TrendObj.getZS = function(){
    if(this.postData['trendType'] == "FP2" || this.postData['trendType'] == "FP3"){
        return fastK3TrendObj.FP2Bonus();
    }else{
        return fastK3TrendObj.R2Bonus();
    }
}

fastK3TrendObj.R2Bonus = function(){
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

fastK3TrendObj.FP2Bonus = function(){
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

fastK3TrendObj.createFormatData = function(data){
//  //console.log('createFormatData trendType: ' + this.postData['trendType'] + ' trendName: ' + this.postData['trendName'] + ' data: ' + JSON.stringify(data));
    if (!data) return [];
    var listData = new Array();

    if(this.postData['trendType']=="HZ" && this.postData['trendName']=="ST"){
        listData.push(data[0].slice(1,8)); // 和值无 3,18
        listData.push(data[0].slice(8,15));

        return listData;
    };

    if(this.postData['trendType']=="EBT" && this.postData['trendName']=="ST"){
        listData.push(data[0].slice(0,7));
        listData.push(data[0].slice(7,15));

        return listData;
    };

    return data;
}

fastK3TrendObj.subData = function(obj){
    if (obj.attr("data-stop")) {
        $.alertMsg("不在开售时间");
        return false;
    }
    var postData = this.createSubData();

    if (!postData) return false;

    // 替换玩法
    var realType = '';
    for (var p in fastK3TrendObj.playTypeMap) {
        if (postData.indexOf(p) !== -1) {
            postData = postData.replace(p, fastK3TrendObj.playTypeMap[p]);
            realType = fastK3TrendObj.playTypeMap[p];
        }
    }

    // TODO
    // window.localStorage.setItem(this.postData['lottery_type'] + "lotteryBetData", postData);

    if (realType == 'TXD') {
        // 投注格式转换
        // 111,222,333|TXD|3   => 1+1+1,2+2+2,3+3+3|TXD|3
        var t = postData.split('|');
        var tt = t[0].split(',');
        var m = [];
        tt.forEach(function (v) {
            var n = v.split('');
            m.push(n.join('+'));
        });
        var mm = m.join(',');
        postData = mm + '|' + t[1] + '|' + t[2];
    }

    if (realType == 'TXD2') {
        // 投注格式转换
        // 11,22,33|4,5|TXD2|6 => 1+1,2+2,3+3|4,5|TXD2|6 =>
        // 11|2|TXD2|1         => 1+1|2|TXD2|1
        // 44,55,66|*|TXD2|3   => 4+4,5+5,6+6|TXS2|3
        var t = postData.split('|');
        var tt = t[0].split(',');
        var m = [];
        tt.forEach(function (v) {
            var n = v.split('');
            m.push(n.join('+'));
        });
        var mm = m.join(',');

        if (t[1] == '*') postData = mm + '|TXS2|' + t[3];
        else postData = mm + '|' + t[1] + '|' + t[2] + '|' + t[3];
    }

    window.localStorage.setItem(this.postData['lottery_type'] + "lotteryBetData", postData);

    // 跳转到投注页
    fastK3TrendObj.goFastK3Confirm();

    if(window.localStorage){

        fastK3TrendObj.goFastK3Confirm();
    }
}

fastK3TrendObj.goFastK3Confirm = function () {
    fastK3TrendObj.destroy();

    fastK3ConfirmObj.goBack = function () {
        fastK3TrendObj.show(true);
    };

    var lotteryPlay = this.postData.trendType;
    // 替换玩法
    for (var p in this.playTypeMap)
        if (lotteryPlay === p) lotteryPlay = this.playTypeMap[p];


    fastK3ConfirmObj.show(true, function () {
        fastK3ConfirmObj.setData({
            'lotteryType': this.postData['lottery_type'], // TODO 应该用 this.postData['lottery_type']，但是它是在哪里设置的呢
            'lotteryCnName': '快三',
            'lotteryNo': this.postData.lotteryNoVal,
            'lotteryPlay': lotteryPlay
        });
    }.bind(this))
};



fastK3TrendObj.delAll = function(){
    this.selectBetData = new Array();
    this.betConObj.find("span[data-i]").each(function(){
        $(this).children('em').removeClass('on');
    });
}

fastK3TrendObj.createGetData = function(){
    return '?lotteryType='+this.postData['lottery_type']+'&lotteryNo='+this.postData['lotteryNoVal']+"&lotteryPlay="+this.postData['trendType']+"&res=trend";
}

fastK3TrendObj.createSelectBetDom = function(){
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
    // this.betObj[(html.length ? "show" : "hide")]();
    this.qhObj[(html.length ? "hide" : "show")]()
    this.betMoneyObj[(html.length ? "show" : "hide")]()
    this.createListHeight();
}

fastK3TrendObj.SetCookie = function(name, value){
    var expdate = new Date();
    var argv = arguments;
    var argc = arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    var path = (argc > 3) ? argv[3] : null;
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;

    if(expires == null)  expires = 3600;
    expdate.setTime(expdate.getTime() + ( expires * 1000 ));
    document.cookie = name + "=" + escape (value) +((expires == null) ? "" : ("; expires="+ expdate.toGMTString()))+((path == null) ? "" : ("; path=" + path)) +((domain == null) ? "" : ("; domain=" + domain))+((secure == true) ? "; secure" : "");
}

fastK3TrendObj.updateData = function(obj){
    obj.siblings('span').removeClass('on');
    obj.addClass('on');
}

fastK3TrendObj.onloadExecution = function(){
    this.createDom();
    this.createEvent();
    this.createListHeight();

    var trendType = this.postData['trendType'] ? this.postData['trendType'] : 'FP1';
    var trendTypeCn = this.betConf[trendType];
    this.playTitleObj.html("快3-"+trendTypeCn+'<em class="down"></em>');
    this.chartTitle.html(trendTypeCn);
    this.postData['trendType'] = trendType;

    this.ajaxGetData();
}

fastK3TrendObj.lotteryNoChange = function (data) {
//  //console.log('lotteryNoChange: ' + JSON.stringify(data));
    if(this.postData.trendName === 'DF' && this.temTrendData.list){
        this.temTrendData.list.push({
            lottery_no: data.preLotteryNo, // 上一期的期号
            lottery_result: false
        });

        this.temTrendData.num_max_miss = false;
        this.temTrendData.num_avg_miss = false;
        this.temTrendData.num_pre_miss = false;
        this.temTrendData.num_cur_miss = false;
        this.temTrendData.num_con_miss = false;
        this.temTrendData.num_hap_pro = false;
        this.temTrendData.num_all = false;

        this.createListDom();
        this.createListHeight();
    }else if ( this.postData.trendName === 'ST' && this.temSTTrendData.list) {
        this.temSTTrendData.list.push({
            lottery_no : data.preLotteryNo,
            lottery_result : false
        });
        this.temSTTrendData.num_max_miss = false;
        this.temSTTrendData.num_avg_miss = false;
        this.temSTTrendData.num_pre_miss = false;
        this.temSTTrendData.num_cur_miss = false;
        this.temSTTrendData.num_con_miss = false;
        this.temSTTrendData.num_hap_pro = false;
        this.temSTTrendData.num_all =false;

        this.createListDom();
        this.createListHeight();
    }
    this.postData.lotteryNoVal = data.lotteryNo;
};

/**
 * 附加新的走势数据
 * @param data
 */
fastK3TrendObj.createNewCG = function (data) {
    if (this.postData.trendName === 'DF') {
        for(var i=0,ilen=this.temTrendData.list.length;i<ilen;i++){
            var lottery_no = this.temTrendData.list[i].lottery_no;
            if(lottery_no == data.list[0].lottery_no){
                this.temTrendData.list[i] = data.list[0];
            }
        }
        // this.temTrendData.list.push(data.list[0]);
        this.temTrendData.num_max_miss = data.num_max_miss;
        this.temTrendData.num_avg_miss = data.num_avg_miss;
        this.temTrendData.num_pre_miss = data.num_pre_miss;
        this.temTrendData.num_cur_miss = data.num_cur_miss;
        this.temTrendData.num_con_miss = data.num_con_miss;
        this.temTrendData.num_hap_pro = data.num_hap_pro;
        this.temTrendData.num_all = data.num_all;
    } else if (this.postData.trendName === 'ST') {
        for(var i=0,ilen=this.temSTTrendData.list.length;i<ilen;i++){
            var lottery_no = this.temSTTrendData.list[i].lottery_no;
            if(lottery_no == data.list[0].lottery_no){
                this.temSTTrendData.list[i] = data.list[0];
            }
        }
        // this.temSTTrendData.list.push(data.list[0]);
        this.temSTTrendData.num_max_miss = data.num_max_miss;
        this.temSTTrendData.num_avg_miss = data.num_avg_miss;
        this.temSTTrendData.num_pre_miss = data.num_pre_miss;
        this.temSTTrendData.num_cur_miss = data.num_cur_miss;
        this.temSTTrendData.num_con_miss = data.num_con_miss;
        this.temSTTrendData.num_hap_pro = data.num_hap_pro;
        this.temSTTrendData.num_all = data.num_all;
    }

    this.createListDom();
    this.createListHeight();
};

fastK3TrendObj.getPostData = function () {
    return this.postData;
};

fastK3TrendObj.init = function () {
    this.setDefConfig();
    fastK3TimeObj.init();
    this.onloadExecution();
};

fastK3TrendObj.dirShow = function () {
    fastK3TrendObj.show();
};

fastK3TrendObj.destroy = function(){
    fastK3TrendObj.setDefConfig();
    fastK3TimeObj.setDefConfig();
    $('#fastK3Trend').html('').remove();
}

fastK3TrendObj.goBack = function () {
    fastK3TrendObj.destroy();
    homeObj.show();
};