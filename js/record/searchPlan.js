
  var searchPlanObj = new PageController({
	   'name': 'searchPlan',
	   'tpl' : 'template/record/searchPlan.html'
    });  

  searchPlanObj.createDom = function(){
    this.searchObj = $("#searchPlan_searchObj");
    this.timeObj = $("#searchPlan_timeObj");
    this.timeTipsObj = $("#searchPlan_timeTipsObj");
    this.searchListObj = $("#searchPlan_searchListObj");
    this.searchNumObj = $("#searchPlan_searchNumObj");
	$('#searchPlan_fastType').val('data-v',ConfigObj.fastLotType);
  }

  searchPlanObj.createEvent = function(){
    this.searchObj.unbind('tap').tap(function(e){
      var aObj = $.oto_checkEvent(e,"A");
      if(aObj){
        var thisObj = $(aObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "sub" : searchPlanObj.subSearchData();return true;
        }
      }
      var spanObj = $.oto_checkEvent(e,"SPAN");
      if(spanObj){
        var thisObj = $(spanObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "data" : searchPlanObj.setSearchData(thisObj);return true;
        }
      }
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "back" : searchPlanObj.goBack();return true;
        }
      }
    });
    
	//this.timeObj[0].removeEventListener('input'); user.record.getPlanList
    this.timeObj[0].addEventListener("input",function(){
      searchPlanObj.updateTimeVal();
    },false);

    this.timeObj.unbind('change').change(function(){
       searchPlanObj.getData();
    });

  }

  searchPlanObj.updateTimeVal = function(){
    var thisTime = Number(this.timeObj.val());
    this.timeTipsObj.html(this.timeCn[thisTime]+'<em class="arrow_d statebg"></em>');
    this.updateTiemTipsLeft();
    this.searchData['period'] = this.timeKey[thisTime];
  }

  searchPlanObj.updateTiemTipsLeft = function(){
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

  searchPlanObj.setSearchData = function(obj){
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

  searchPlanObj.createSearchData = function(){
    var childObj = this.searchListObj.children('div');
    for(var i=0,ilen=childObj.length;i<ilen;i++){
      var thisT = childObj.eq(i).attr("data-k");
      if(!thisT)continue;
      this.searchData[thisT] = "";
    }
  }

  searchPlanObj.ajaxGetData = function(){
    this.searchData['v'] = new Date().getTime();
	var secretData = {
		'para':Global.encrypt(this.searchData),
		'access_token' : loginObj.access_token
	}
    $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=user.record.getPlanList',
      data : secretData,
      type : "post",
      dataType : "json",
      success : function(msg){
        console.log(msg)
       // if(msg.v!=searchPlanObj.searchData['v'])return false; 
       
        if(msg.code!='0000'){
          $.alertMsg(msg.code_str);
          return false;
        }
        msg.info = $.parseJSON(Global.crypt(msg.info));
        if(Number(msg.info.count) === 0){
          searchPlanObj.searchNumObj.addClass('noresult');
        }else{
          searchPlanObj.searchNumObj.removeClass('noresult');
        }
        searchPlanObj.searchNumObj.html('有'+msg.info.count+'个订单符合条件');
      }
    });
  }

  searchPlanObj.getData = function(){
    var nowTime = new Date().getTime();
    if(!this.searchData['checkTime'])this.searchData['checkTime'] = nowTime;
    if(nowTime - this.searchData['checkTime']<1000 && this.checkTimeObj){
      clearTimeout(this.checkTimeObj);
    }
    searchPlanObj.searchData['checkTime'] = nowTime;
    this.checkTimeObj = setTimeout(function(){
      searchPlanObj.ajaxGetData();
    },1000);
    this.searchNumObj.html('查询中');
  }

  searchPlanObj.subSearchData = function(){
	 var self = this;
	 if (self.searchNumObj.hasClass('noresult')) return;
	 searchPlanResultObj.goBack = function(){
		searchPlanResultObj.destroy();
		searchPlanObj.show(); 
	 }
	 var data = {};
	 for(var i in self.searchData){
		data[i] =  self.searchData[i];
	 }
	 searchPlanResultObj.show('reload',function(){
		searchPlanResultObj.setData(data); 
		searchPlanResultObj.getListData();
	 });
  }

  searchPlanObj.onloadExecution = function(){
    this.createDom();
    this.createSearchData();
    this.createEvent();
    this.updateTimeVal();
    this.searchNumObj.html('查询中');
    this.ajaxGetData();
  }

  searchPlanObj.init = function(){
	  this.setDefConfig();
      searchPlanObj.onloadExecution();
  }
  
  searchPlanObj.setDefConfig = function(){
	this.searchData = new Object();
	this.timeCn = {0:"当天",5:"一周",10:"两周",15:"一个月",20:"两个月",25:"三个月"};
  	this.timeKey = {0:"-0_days",5:"-1_weeks",10:"-2_weeks ",15:"-1_months",20:"-2_months",25:"-3_months"};
  	this.checkTimeObj = false;
  }
  
  searchPlanObj.dirShow = function(){
	 this.show();  
  }
	