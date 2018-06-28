
  var sportteryFilterObj = new PageController({
	   'name': 'sportteryFilter',
	   'tpl' : 'template/sporttery/sportteryFilter.html'
  });
  
  sportteryFilterObj.setDefConfig = function(){
	  sportteryFilterObj.filterData = {};
	  sportteryFilterObj.ajaxStartTime = 0;
	  sportteryFilterObj.setTimeObj = "";
	  sportteryFilterObj.ajaxWaitTime = 500;
	  this.lotteryType = '';
	  this.lotteryNo = '';
	  this.type = '';   //区分2选1和混合过关
	  this.filterMatchList = [];
  }
  
  sportteryFilterObj.setData = function(obj){
	  this.lotteryType = obj.lotteryType;
	  this.lotteryNo = obj.lotteryNo;
	  this.type = obj.type;
	  this.getLeagueData();
  }
  
  sportteryFilterObj.getLeagueData = function(){
	var self = this;
	var postData = {
		lotteryType : self.lotteryType,
		lottteryNo : self.lotteryNo	
	}
	var secretData = {
		'para': Global.encrypt(postData)
	}
	$.ajax({  ///Lottery/Jczq/leagueList
      url : ConfigObj.localSite +  '?version=1&m=Lottery.Jczq.leagueList',
      data : secretData,
      dataType : "json",
      type : "post",
      success : function(msg){
     	
       	 //console.log('竞彩筛选页面联赛数据',msg);
		if(msg.code == '0000'){
			msg.leagueList = $.parseJSON(Global.crypt(msg.leagueList));
			var html = '';
			for(var i in msg.leagueList){
				html += '<span data-t="filter" data-k="leagueId" data-v="'+ i +'">'+ msg.leagueList[i].name  +'</span>';	
			}
			self.leagueWrap.html(html);
		}else{
			
		}
      }
    }); 
  }
  

  sportteryFilterObj.createDomObj = function(){
	this.leagueWrap = $('#sportteryFilter_leagueWrap');
    this.filterObj = $("#sportteryFilter_filterObj");
    this.filterSubObj = $("#sportteryFilter_filterSubObj");
  }

  sportteryFilterObj.createEvent = function(){
    this.filterObj.unbind('tap').tap(function(e){
      sportteryFilterObj.filterEvent(e);
    });
    this.filterSubObj.unbind('tap').tap(function(){
      if(sportteryFilterObj.filterSubObj.hasClass('noresult'))return false; 
	  sportteryFilterObj.goBetPage();
    });
  }
  
  sportteryFilterObj.goBetPage = function(){
	  if(this.type == '2x1'){
		soccer2x1Obj.show('reload',function(){
		  soccer2x1Obj.filterMatch(sportteryFilterObj.filterMatchList,sportteryFilterObj.lotteryNo );
	  	})   
	  }else{
	  	soccerMixObj.show('reload',function(){
		  soccerMixObj.filterMatch(sportteryFilterObj.filterMatchList,sportteryFilterObj.lotteryNo );
	  	}) 
	  }
  }

  sportteryFilterObj.filterEvent = function(e){
    var pObj = $.oto_checkEvent(e,"P");
    if(pObj){
      var thisObj = $(pObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "back" : this.goBack();return true;
      }
    }
    var spanObj = $.oto_checkEvent(e,"SPAN");
    if(spanObj){
      var thisObj = $(spanObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "filter" : this.createFilterData(thisObj);this.getMatchNum();return true;
      }
    }
  }

  sportteryFilterObj.getUrl = function(){
   /* switch($.setData.lotteryType){
      case "FTFH" : return "/jczq";break;
      case "FTBRQSPF" : return "/jczq/brq_spf";break;
    }*/
  }

  sportteryFilterObj.createFilterData = function(obj){
    var thisK = obj.attr("data-K");
    var thisV = obj.attr("data-v");
    if(obj.hasClass('selected')){
      obj.removeClass('selected');
      var temV = [];
      var thisFilterData = this.filterData[thisK].split(",");
      for(var i=0,ilen=thisFilterData.length;i<ilen;i++){
        if(!thisFilterData[i])continue;
        if(thisFilterData[i] == thisV)continue;
        temV.push(thisFilterData[i]);
      }
      this.filterData[thisK] = temV.join(",");
    }else{
      if(thisK=="range" || thisK=="matchType" || thisK== "rq"){
        obj.siblings().removeClass('selected');
        this.filterData[thisK] = "";
      }
      if(thisK=="matchType" && thisV=="wdls"){
        this.filterSet5Lang();
      }

      obj.addClass('selected');
      if(!this.filterData[thisK]){
        var temFilterData =[];
      }else{
        var temFilterData = this.filterData[thisK].split(",");
      }
      temFilterData.push(thisV);
      this.filterData[thisK] = temFilterData.join(",");
    }
	if(this.type == '2x1'){
		this.filterData.subLotteryType = 'jz2x1';
	}else{
		this.filterData.subLotteryType = '';	
	}
  }

  sportteryFilterObj.filterSet5Lang = function(){
    var spanObj = $("span[data-k='leagueId']");
    var thisK = 'leagueId';
    this.filterData[thisK] = "";
    for(var i=0,ilen=spanObj.length;i<ilen;i++){
      spanObj.eq(i).removeClass('selected');
      var thisR = spanObj.eq(i).attr("data-r");
      if(thisR)this.createFilterData(spanObj.eq(i));
    }
  }

  sportteryFilterObj.getMatchNum = function(){
    sportteryFilterObj.filterSubObj.html("加载数据中，请稍等。");
    sportteryFilterObj.filterSubObj.removeClass('noresult');
    var nowTime = new Date().getTime();
    if(nowTime - this.ajaxStartTime < this.ajaxWaitTime){
      if(this.setTimeObj)clearTimeout(this.setTimeObj);
    }
    this.ajaxStartTime = nowTime;
    this.setTimeObj = setTimeout(function(){
      sportteryFilterObj.getData();
    },this.ajaxWaitTime);
  }

  sportteryFilterObj.getData = function(){
	if(this.type == '2x1'){
		this.filterData.subLotteryType = 'jz2x1';
	}else{
		this.filterData.subLotteryType = '';	
	}
	//console.log(this.filterData);
		var secretData = {
			'para': Global.encrypt(this.filterData)
		}
    $.ajax({   
      url : ConfigObj.localSite +  '?version=1&m=Lottery.Jczq.filter',
      data : secretData,
      dataType : "json",
      type : "post",
      success : function(msg){
		//console.log('筛选后的比赛数据',msg);
		
        if(msg.code !== "0000"){
          $.alertMsg(msg.str);
          return false;
        }
        msg.info = $.parseJSON(Global.crypt(msg.info));
        sportteryFilterObj.filterSubObj.html("有"+msg.info.count+"场比赛符合条件");
        if(Number(msg.info.count) === 0){
          sportteryFilterObj.filterSubObj.addClass('noresult');
        }else{
          sportteryFilterObj.filterSubObj.removeClass('noresult');
        }
		sportteryFilterObj.filterMatchList = msg.info.matchList;
      }
    });
  }

  sportteryFilterObj.onloadExecution = function(){
	this.setDefConfig();
    this.createDomObj();
    this.createEvent();
    this.getMatchNum();
  }

  sportteryFilterObj.init = function(){
      sportteryFilterObj.onloadExecution();
  }
  
  
