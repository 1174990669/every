
  var basketFilterObj = new PageController({
	   'name': 'basketFilter',
	   'tpl' : 'template/sporttery/basketFilter.html'
  });
  
  basketFilterObj.setDefConfig = function(){
	  basketFilterObj.filterData = {};
	  basketFilterObj.ajaxStartTime = 0;
	  basketFilterObj.setTimeObj = "";
	  basketFilterObj.ajaxWaitTime = 500;
	  this.lotteryType = '';
	  this.lotteryNo = '';
	  this.type = '';   
	  this.filterMatchList = [];
  }
  
  basketFilterObj.setData = function(obj){
	  this.lotteryType = obj.lotteryType;
	  this.lotteryNo = obj.lotteryNo;
	  this.type = obj.type;
	  this.getLeagueData();
  }
  
  basketFilterObj.getLeagueData = function(){
	var self = this;
	var postData = {
		lotteryType : self.lotteryType,
		lottteryNo : self.lotteryNo	
	}
	$.ajax({  
      url : ConfigObj.localSite +  '?version=1&m=Lottery.Jclq.leagueList',
      data : postData,
      dataType : "json",
      type : "post",
      success : function(msg){
       	 //console.log('竞彩筛选页面联赛数据',msg);
		if(msg.code == '0000'){
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
  

  basketFilterObj.createDomObj = function(){
	this.leagueWrap = $('#basketFilter_leagueWrap');
    this.filterObj = $("#basketFilter_filterObj");
    this.filterSubObj = $("#basketFilter_filterSubObj");
  }

  basketFilterObj.createEvent = function(){
    this.filterObj.unbind('tap').tap(function(e){
      basketFilterObj.filterEvent(e);
    });
    this.filterSubObj.unbind('tap').tap(function(){
      if(basketFilterObj.filterSubObj.hasClass('noresult'))return false; 
	  basketFilterObj.goBetPage();
    });
	$('#basketFilter_clear').unbind('tap').tap(function(){
		$('span[data-t=filter]').removeClass('selected');
		for(var i in basketFilterObj.filterData){
			basketFilterObj.filterData[i] = '';
		}
		basketFilterObj.getMatchNum();
	})
  }
  
  basketFilterObj.goBetPage = function(){
	 basketMixObj.show('reload',function(){
	 	basketMixObj.filterMatch(basketFilterObj.filterMatchList, basketFilterObj.lotteryNo );
	 })
  }

  basketFilterObj.filterEvent = function(e){
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

  basketFilterObj.createFilterData = function(obj){
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
      if(thisK=="dxf" || thisK=="rq"){
        obj.siblings().removeClass('selected');
        this.filterData[thisK] = "";
      }
     /* if(thisK=="matchType" && thisV=="wdls"){
        this.filterSet5Lang();
      }*/

      obj.addClass('selected');
      if(!this.filterData[thisK]){
        var temFilterData =[];
      }else{
        var temFilterData = this.filterData[thisK].split(",");
      }
      temFilterData.push(thisV);
      this.filterData[thisK] = temFilterData.join(",");
    }
  }

 
  basketFilterObj.getMatchNum = function(){
    basketFilterObj.filterSubObj.html("加载数据中，请稍等。");
    basketFilterObj.filterSubObj.removeClass('noresult');
    var nowTime = new Date().getTime();
    if(nowTime - this.ajaxStartTime < this.ajaxWaitTime){
      if(this.setTimeObj)clearTimeout(this.setTimeObj);
    }
    this.ajaxStartTime = nowTime;
    this.setTimeObj = setTimeout(function(){
      basketFilterObj.getData();
    },this.ajaxWaitTime);
  }

  basketFilterObj.getData = function(){
	//console.log(this.filterData);
    $.ajax({   
      url : ConfigObj.localSite +  '?version=1&m=lottery.jclq.filter',
      data : this.filterData,
      dataType : "json",
      type : "post",
      success : function(msg){
		//console.log('筛选后的比赛数据',msg);
        if(msg.code !== "0000"){
          $.alertMsg(msg.str);
          return false;
        }
        basketFilterObj.filterSubObj.html("有"+msg.info.count+"场比赛符合条件");
        if(Number(msg.info.count) === 0){
          basketFilterObj.filterSubObj.addClass('noresult');
        }else{
          basketFilterObj.filterSubObj.removeClass('noresult');
        }
		basketFilterObj.filterMatchList = msg.info.matchList;
      }
    });
  }

  basketFilterObj.onloadExecution = function(){
	this.setDefConfig();
    this.createDomObj();
    this.createEvent();
    this.getMatchNum();
  }

  basketFilterObj.init = function(){
      basketFilterObj.onloadExecution();
  }
  
  
