
  var searchCashRecordObj = new PageController({
	   'name': 'searchCashRecord',
	   'tpl' : 'template/record/searchCashRecord.html'
    }); 

  

  searchCashRecordObj.createDom = function(){
    this.searchObj = $("#searchCashRecord_searchObj");
    this.timeObj = $("#searchCashRecord_timeObj");
    this.timeTipsObj = $("#searchCashRecord_timeTipsObj");
    this.searchListObj = $("#searchCashRecord_searchListObj");
    this.searchNumObj = $("#searchCashRecord_searchNumObj");
  }

  searchCashRecordObj.createEvent = function(){
    this.searchObj.unbind('tap').tap(function(e){
      var aObj = $.oto_checkEvent(e,"A");
      if(aObj){
        var thisObj = $(aObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "sub" : searchCashRecordObj.subSearchData();return true;
        }
      }
      var spanObj = $.oto_checkEvent(e,"SPAN");
      if(spanObj){
        var thisObj = $(spanObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "data" : searchCashRecordObj.setSearchData(thisObj);return true;
        }
      }
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "back" : searchCashRecordObj.goBack();return true;
        }
      }
    });

	//this.timeObj[0].removeEventListener('input');
    this.timeObj[0].addEventListener("input",function(){
      searchCashRecordObj.updateTimeVal();
    },false);

    this.timeObj.unbind('change').change(function(){
       searchCashRecordObj.getData();
    });

  }

  searchCashRecordObj.updateTimeVal = function(){
    var thisTime = Number(this.timeObj.val());
    this.timeTipsObj.html(this.timeCn[thisTime]+'<em class="arrow_d statebg"></em>');
    this.updateTiemTipsLeft();
    this.searchData['period'] = this.timeKey[thisTime];
  }

  searchCashRecordObj.updateTiemTipsLeft = function(){
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

  searchCashRecordObj.setSearchData = function(obj){
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

  searchCashRecordObj.createSearchData = function(){
    var childObj = this.searchListObj.children('div');
    for(var i=0,ilen=childObj.length;i<ilen;i++){
      var thisT = childObj.eq(i).attr("data-k");
      if(!thisT)continue;
      this.searchData[thisT] = "";
    }
  }

  searchCashRecordObj.ajaxGetData = function(){
	  
    this.searchData['v'] = new Date().getTime();
//		this.searchData.access_token = loginObj.access_token;
		var postData = {
			'para': Global.encrypt(this.searchData),
			'access_token': loginObj.access_token
		}
//		console.log(this.searchData)
    $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=user.record.cash',
      data : postData,
      type : "post",
      dataType : "json",
      success : function(msg){
      	
		//console.log('现金记录高级查询数据 ',msg);
		if(msg.code == '0000'){
			msg.info = $.parseJSON(Global.crypt(msg.info));
			if(Number(msg.info.count) == 0){
			  searchCashRecordObj.searchNumObj.addClass('noresult');
			}else{
			  searchCashRecordObj.searchNumObj.removeClass('noresult');
			}
			searchCashRecordObj.searchNumObj.html('有'+msg.info.count+'个订单符合条件');
		}else{
			$.alertMsg(msg.code_str);	
		}
      }
    });
  }

  searchCashRecordObj.getData = function(){
    var nowTime = new Date().getTime();
    if(!this.searchData['checkTime'])this.searchData['checkTime'] = nowTime;
    if(nowTime - this.searchData['checkTime']<1000 && this.checkTimeObj){
      clearTimeout(this.checkTimeObj);
    }
    searchCashRecordObj.searchData['checkTime'] = nowTime;
    this.checkTimeObj = setTimeout(function(){
      searchCashRecordObj.ajaxGetData();
    },1000);
    this.searchNumObj.html('查询中');
  }

  searchCashRecordObj.subSearchData = function(){
     var self = this;

     if (self.searchNumObj.hasClass('noresult')) return;

	 searchCashResultObj.goBack = function(){
		searchCashResultObj.destroy();
		searchCashRecordObj.show(); 
	 }
	 var data = {};
	 for(var i in self.searchData){
		data[i] =  self.searchData[i];
	 }
	 searchCashResultObj.show('reload',function(){
		searchCashResultObj.setData(data); 
		searchCashResultObj.getListData();
	 });
  }

  searchCashRecordObj.onloadExecution = function(){
    this.createDom();
    this.createSearchData();
    this.createEvent();
    this.updateTimeVal();
    this.searchNumObj.html('查询中');
    this.ajaxGetData();
  }

  searchCashRecordObj.init = function(){
	   searchCashRecordObj.setDefConfig();
      searchCashRecordObj.onloadExecution();
  }
  
  searchCashRecordObj.setDefConfig = function(){
	searchCashRecordObj.searchData = new Object();
  	searchCashRecordObj.timeCn = {0:"当天",5:"一周",10:"两周",15:"一个月",20:"两个月",25:"三个月"};
  	searchCashRecordObj.timeKey = {0:"-0_days",5:"-1_weeks",10:"-2_weeks ",15:"-1_months",20:"-2_months",25:"-3_months"};
 	searchCashRecordObj.checkTimeObj = false;
  }
	
  
