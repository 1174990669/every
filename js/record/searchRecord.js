
  var searchRecordObj = new PageController({
	   'name': 'searchRecord',
	   'tpl' : 'template/record/searchRecord.html'
    }); 

  searchRecordObj.createDom = function(){
    this.searchObj = $("#searchRecord_searchObj");
    this.timeObj = $("#searchRecord_timeObj");         //拖动显示日期
    this.timeTipsObj = $("#searchRecord_timeTipsObj"); //日期时间显示
    this.searchListObj = $("#searchRecord_searchListObj");
    this.searchNumObj = $("#searchRecord_searchNumObj");
  }
 
  searchRecordObj.createEvent = function(){
    this.searchObj.unbind('tap').tap(function(e){
      var aObj = $.oto_checkEvent(e,"A");
      if(aObj){
        var thisObj = $(aObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "sub" : searchRecordObj.subSearchData();return true;
        }
      }
      var spanObj = $.oto_checkEvent(e,"SPAN");
      if(spanObj){
        var thisObj = $(spanObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "data" : searchRecordObj.setSearchData(thisObj);return true;
        }
      }
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "back" : searchRecordObj.goBack();return true;
        }
      }
	  var dlObj = $.oto_checkEvent(e,"DL");
        if(dlObj){
          var thisObj = $(dlObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case 'flag' : searchRecordObj.flagFun(thisObj);return true;
          }
        }
    });
    
    this.timeObj[0].addEventListener("input",function(){
      searchRecordObj.updateTimeVal();
    },false);

    this.timeObj.unbind('change').change(function(){
       searchRecordObj.getData();
    });

  }
  
  searchRecordObj.flagFun = function(obj){
	var thisV = obj.attr("data-v");
    var thisK = obj.attr("data-k");
	obj.find('.checkbox_1').toggleClass('checked');
    var list = $('#searchRecord dl[data-t=flag]');
	var arr = [];
	list.each(function(idx,ele){
		var checkbox = $(ele).find('.checkbox_1');
		if(checkbox.hasClass('checked')){
			arr.push($(ele).attr('data-v'));	
		}
	})
	////console.log(arr);
	this.searchData[thisK] =  arr.join(',');
	//console.log(this.searchData[thisK]); 
	setTimeout(function(){
    	searchRecordObj.getData();
	}, 50)
  }

  searchRecordObj.updateTimeVal = function(){
    var thisTime = Number(this.timeObj.val());
    this.timeTipsObj.html(this.timeCn[thisTime]+'<em class="arrow_d statebg"></em>');
    this.updateTiemTipsLeft();
    this.searchData['period'] = this.timeKey[thisTime];
  }

  searchRecordObj.updateTiemTipsLeft = function(){
    var thisTime = Number(this.timeObj.val());
    var rangeMax = Number(this.timeObj.attr("max"));
    var rangeStep = Number(this.timeObj.attr("step"));
    var pWidth = this.timeTipsObj.parent().width();
    if (pWidth == 0) pWidth = Math.floor(window.innerWidth * 0.94) - 40; // 取不到 width 先用这个凑合着吧
    var stepWidth = pWidth/(rangeMax/rangeStep);
    var tipsWidth = this.timeTipsObj.width();
    var leftVal = thisTime/rangeStep*stepWidth;
    if(leftVal == pWidth){
      leftVal = leftVal-tipsWidth;
    }else if(leftVal == 0){
      leftVal = 0;
    }else{
      leftVal = leftVal-tipsWidth/2;
    }
    this.timeTipsObj.css("left",leftVal+"px");
  }

  searchRecordObj.setSearchData = function(obj){
    var thisV = obj.attr("data-v");
    var thisK = obj.attr("data-k");
    obj.siblings().removeClass('selected');
    if(obj.hasClass('selected')){
      obj.removeClass('selected')
      this.searchData[thisK]="";
    }else{
      obj.addClass('selected')
      this.searchData[thisK]=thisV;
    }

    this.getData();
  }

  searchRecordObj.createSearchData = function(){
    var childObj = this.searchListObj.children('div');
    for(var i=0,ilen=childObj.length;i<ilen;i++){
      var thisT = childObj.eq(i).attr("data-k");
      if(!thisT)continue;
      this.searchData[thisT] = "";
    }
  }

  searchRecordObj.ajaxGetData = function(){
    this.searchData['v'] = new Date().getTime();
    
	var url = ConfigObj.localSite +  '?version=1&m=user.record.getLaunchList';
	//console.log(this.from);
	if(this.from == 'memberBet'){
		this.searchData['station_user_id'] = loginObj.userInfo.station_user_id;
		url =  ConfigObj.localSite +  '?version=1&m=user.Station.tostationList';
	}else{
		this.searchData['station_user_id'] = '';	
	}
		var secretData = {
		'access_token' : loginObj.access_token,
		'para' : Global.encrypt(this.searchData)
		};
    $.ajax({
      url : url,
      data : secretData,
      type : "post",
      dataType : "json",
      success : function(msg){
       // if(msg.v!=searchRecordObj.searchData['v'])return false;   
        if(msg.code!='0000'){
          $.alertMsg(msg.code_str);
          return false;
        }
        msg.info = $.parseJSON(Global.crypt(msg.info));
//      console.log(msg)
        if(Number(msg.info.count) === 0){
          searchRecordObj.searchNumObj.addClass('noresult');
        }else{
          searchRecordObj.searchNumObj.removeClass('noresult');
        }
        searchRecordObj.searchNumObj.html('有'+msg.info.count+'个订单符合条件');
      }
    });
  }

  searchRecordObj.getData = function(){
    var nowTime = new Date().getTime();
    if(!this.searchData['checkTime'])this.searchData['checkTime'] = nowTime;
    if(nowTime - this.searchData['checkTime']<1000 && this.checkTimeObj){
      clearTimeout(this.checkTimeObj);
    }
    searchRecordObj.searchData['checkTime'] = nowTime;
    this.checkTimeObj = setTimeout(function(){
      searchRecordObj.ajaxGetData();
    },1000);
    this.searchNumObj.html('查询中');
  }

  searchRecordObj.subSearchData = function(){
	 var self = this;
	 if (self.searchNumObj.hasClass('noresult')) return;
	 searchBetResultObj.goBack = function(){
		searchBetResultObj.destroy();
		searchRecordObj.show(); 
	 }
	 var data = {};
	 for(var i in self.searchData){
		data[i] =  self.searchData[i];
	 }
	 data.from = self.from;
	 searchBetResultObj.show('reload',function(){
		searchBetResultObj.setData(data); 
		searchBetResultObj.getListData();
	 });
  }

  searchRecordObj.onloadExecution = function(){
    this.createDom();
    this.createSearchData();
    this.createEvent();
    this.updateTimeVal();
    this.searchNumObj.html('查询中');
    this.ajaxGetData();
  }

  searchRecordObj.init = function(){
	  this.setDefConfig();
      searchRecordObj.onloadExecution();
  }
  
  searchRecordObj.setDefConfig = function(){
	this.searchData = new Object();
	this.timeCn = {0:"当天",5:"一周",10:"两周",15:"一个月",20:"两个月",25:"三个月"};
  	this.timeKey = {0:"-0_days",5:"-1_weeks",10:"-2_weeks ",15:"-1_months",20:"-2_months",25:"-3_months"};
  	this.checkTimeObj = false;
	this.from = '';
  }
  
  searchRecordObj.setData = function(obj){
	 if(obj && obj.from == 'memberBet'){
		 this.from = 'memberBet';
		 this.ajaxGetData();
		 $('#searchRecord_memoType').show();
	 }else{
		  $('#searchRecord_memoType').hide();
	 }
  }
	