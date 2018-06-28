
  var liveScoreObj = new PageController({
	   'name': 'liveScore',
	   'tpl' : 'template/kaijiang/liveScore.html'
    });

  

  liveScoreObj.setDefConfig = function(){
	 liveScoreObj.dateData = "";
	 liveScoreObj.lotteryType = 'FTSPF';
  }

  liveScoreObj.createDomObj = function(){
    this.wrapperObj = $("#liveScore_wrapperObj");
    this.lotteryObj = $("#liveScore_lotteryObj");
    this.dateTipsObj = $("#liveScore_dateTipsObj");
    this.showDateObj = $("#liveScore_showDateObj");
	this.dateList  = $('#liveScore_dateList');
  }

  liveScoreObj.createEvent = function(){
    this.wrapperObj.unbind('tap').tap(function(e){
      liveScoreObj.lotteryEvent(e);
    });
  }

  liveScoreObj.lotteryEvent = function(e){
    var pObj = $.oto_checkEvent(e,"P");
    if(pObj){
      var thisObj = $(pObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "showMatch" : this.showMatch(thisObj);return true;
        case "back" : this.goBack();return true;
        case "showDate" : this.showDate(thisObj);return true;
      }
    }
    var liObj = $.oto_checkEvent(e,"LI");
    if(liObj){
      var thisObj = $(liObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "updDate" : this.updDate(thisObj);return true;
      }
    }
  }

  liveScoreObj.updDate = function(obj){
    this.dateData = obj.attr("data-v");
    this.getData();
    this.dateTipsObj.hide();
    this.showDateObj.removeClass('showObj');
  }

  liveScoreObj.removeliveScore_bgLayer = function(){
    if($('#liveScore_bgLayer').length){
      $('#liveScore_bgLayer').remove(); 
    }
  }

  liveScoreObj.addliveScore_bgLayer = function(layer,btn){
    var bg = '<div style="width:100%;height:100%;background:transparent;position:absolute;left:0;top:0;z-index:98" id="liveScore_bgLayer"></div>';
    if($('#liveScore_bgLayer').length == 0){
      $(this.lotteryObj).append(bg);
      $('#liveScore_bgLayer').css({'height':document.documentElement.scrollHeight || document.body.scrollHeight})
      $('#liveScore_bgLayer').tap(function(){
        btn.removeClass('showObj')
        layer.hide();
        $('#liveScore_bgLayer').remove();
        if($(btn).find('.arrow').length > 0){
           $(btn).find('.arrow').removeClass('trans');  
        }
      })
    }
  }

  liveScoreObj.showDate = function(obj){
    if(obj.hasClass('showObj')){
      obj.removeClass('showObj');
      this.removeliveScore_bgLayer();
      this.dateTipsObj.hide();
    }else{
      obj.addClass('showObj');
      this.dateTipsObj.show();
       this.addliveScore_bgLayer(this.dateTipsObj,obj);
    }
  }

  liveScoreObj.showMatch = function(obj){
    if(obj.hasClass('showObj')){
      obj.removeClass('showObj');
      obj.next().hide();
      obj.children('span').find('em').removeClass('trans');
    }else{
      obj.addClass('showObj');
      obj.next().show();
      obj.children('span').find('em').addClass('trans');
    }
  }
	
  liveScoreObj.getDateData = function(){
  	var postData = {
  		"lotteryType": this.lotteryType
  	}
  	var secretData = {
  		'para': Global.encrypt(postData)
  	}
    $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=lottery.prize.ftTrend',
      data : secretData,
      dataType : "json",
      type : "post",
      success : function(msg){
      	
		//console.log('竞彩日期数据',msg)
        //if(msg.date!=liveScoreObj.dateData)return false;
        if(msg.code !== "0000"){
          $.alertMsg(msg.code_str);
          return false;
        }
        msg.info = $.parseJSON(Global.crypt(msg.info));
        liveScoreObj.formatDateHtml(msg.info);
      }
    });
  }
  
  liveScoreObj.formatDateHtml = function(obj){
	  var html = '';
	  for(var i=0;i<obj.length;i++){
		  var itm = obj[i]
		  html += '<li data-t="updDate" data-v="'+itm.LotteryNo + '"><a href="javascript:void(0);">'+ itm.LotteryNo + '</a></li>'; 
	  }
	  this.dateList.html(html);
  }
  
  var postData = {
  	'lotteryNo':this.dateData,
  	'lotteryType':this.lotteryType
  }
  
  var secretData = {
  	'para': Global.encrypt(postData)
  }
  liveScoreObj.getData = function(){
    $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=Lottery.Charts.getFtTrend',
      data : secretData,
      dataType : "json",
      type : "post",
      success : function(msg){
      	
		//console.log('竞彩赛果数据',msg)
        //if(msg.date!=liveScoreObj.dateData)return false;
        if(msg.code !== "0000"){
          $.alertMsg(msg.str);
          return false;
        }
        msg.info = $.parseJSON(Global.crypt(msg.info));
        liveScoreObj.createLotteryDom(msg.info.matchList);
      }
    });
  }

  liveScoreObj.createLotteryDom = function(data){
    var html = [];
    var num=0;
    for(var i in data){
      html.push('<p class="jzli'+(num==0 ? ' showObj' : '')+'" data-t="showMatch"><span class="gray"><em class="mr10">'+i+' '+data[i]['week']+'</em><em class="mr10">'+data[i]['all']+'场比赛</em><em>已开'+data[i]['open']+'场</em></span><span class="fr"><em class="arrow'+(i==0 ? ' trans' : '')+'"></em></span></p><div class="jz_result"'+(num==0 ? '' : 'style="display:none"')+'>');
      for(var k=0,klen=data[i]['list'].length;k<klen;k++){
        html.push('<div class="result_li clearfix"><p class="font12 gray"><span>'+data[i]['list'][k]['leagueName']+'</span><span>'+(data[i]['list'][k]['oid'].toString().substr(1))+' '+data[i]['list'][k]['match_time_q']+'</span></p><p>'+data[i]['list'][k]['host_name_q']+'</p><p><span class="fontred">'+(data[i]['list'][k]['scoreResult'] ? data[i]['list'][k]['scoreResult'] : '-:-')+'</span><span class="font12 gray">半全场：'+(data[i]['list'][k]['bqcResult'] ? data[i]['list'][k]['bqcResult'] : '-:-')+'</span></p><p>'+data[i]['list'][k]['guest_name_q']+'</p></div>');
      }
      num++;
      html.push('</div>');
    }
    this.lotteryObj.html(html.join(""));
  }

  liveScoreObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
    this.getData();   // 赛果数据
	this.getDateData();   //右上角的日期数据
  }

  liveScoreObj.init = function(){
     this.setDefConfig();
     liveScoreObj.onloadExecution();
  }
  
  
 
