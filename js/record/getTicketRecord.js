
  var getTicketRecordObj = new PageController({
	   'name': 'getTicketRecord',
	   'tpl' : 'template/record/getTicketRecord.html'
    }); 

  getTicketRecordObj.createDomObj = function(){
    this.listDivObj = $("#getTicketRecord_listDivObj");
    this.getTicketRecordObj = $("#getTicketRecord_listObj");
    this.xzObj = $("#getTicketRecord_xzObj");
    this.plTipsObj = $("#getTicketRecord_plTipsObj");
    this.plNumObj = $("#getTicketRecord_plNumObj");
  }

  getTicketRecordObj.createEvent = function(){
    this.listDivObj.unbind('tap').tap(function(e){
      var aObj = $.oto_checkEvent(e,"A");
      if(aObj){
        var thisObj = $(aObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          // case "qp" : getTicketRecordObj.qpFun(thisObj);return true;
          case "pl" : $.alertMsg("正在开发中");return true;getTicketRecordObj.plQp(thisObj);return true;  //批量
          case "dz" : getTicketRecordObj.dzQp(thisObj);return true;  //单张
          // case "all" : getTicketRecordObj.allPlQp();getTicketRecordObj.getPlNum();return true;
          // case "plqp" : getTicketRecordObj.postPlQp();return true;
        }
      }
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "all" : getTicketRecordObj.allPlQp();getTicketRecordObj.getPlNum();return true;
          case "qpAll" : getTicketRecordObj.postPlQp();return true;
          case "back" : getTicketRecordObj.goBack();return true;
        }
      }
      var labelObj = $.oto_checkEvent(e,"LABEL");
      if(labelObj){
        var thisObj = $(labelObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "checked" : getTicketRecordObj.selectList(thisObj);getTicketRecordObj.getPlNum();return true;
        }
      }
      var liObj = $.oto_checkEvent(e,"LI");
      if(liObj){
        var thisObj = $(liObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "upd" : getTicketRecordObj.updateType(thisObj);return true; 
        }
      }
      var divObj = $.oto_checkEvent(e,"DIV");
      if(divObj){
        var thisObj = $(divObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "show" : getTicketRecordObj.showQp(thisObj);return true; 
        }
      }
    });
    window.onscroll = function(){
	  if(window.scrollY !== 0){
	  	getTicketRecordObj.scrollTop = window.scrollY;
	  }
      if(!getTicketRecordObj.checkPage)return false;
	  
      getTicketRecordObj.updatePage();
    }
	
	this.getTicketRecordObj.dropload({  
			scrollArea : window,
			distance : this.pullDistance,
			loadUpFn:function(me){
				getTicketRecordObj.page = 0;
				getTicketRecordObj.getListData();
				me.resetload();
			}
	 })   
  }

  getTicketRecordObj.updatePage = function(){
    var scrollTop = document.body.scrollTop;
    var bodyHeight = this.listDivObj.height();
    if(scrollTop + this.clientHeight > bodyHeight - this.clientHeight/2){
      this.page+=1;
      this.getListData();
    }
  }


  getTicketRecordObj.qpFun = function(obj){
    //var thisId = obj.attr("data-v");
    //window.location.href = '/password.html?id='+thisId+"&type=qp";
  }

  getTicketRecordObj.showQp = function(obj){
    if(this.plCheck)return true;
    var thisId = obj.attr("data-v");
    var targetType = obj.attr("data-type");
    //window.location.href = '/'+targetType+'/'+thisId;
	
	qupiaoPwdObj.goBack = function(){
		qupiaoPwdObj.destroy();
		getTicketRecordObj.show();
	}
	qupiaoPwdObj.show('reload',function(){
		var arr = [];
		arr.push(thisId);
		qupiaoPwdObj.setData(arr);
	})
	
  }

  getTicketRecordObj.selectList = function(obj){
    var thisId = obj.attr("data-v");
    var emObj = obj.children('em');
    if(emObj.hasClass('checked')){
      emObj.removeClass('checked');
      var thisIndex = $.inArray(thisId, this.plIdArr);
      delete this.plIdArr[thisIndex];
    }else{
      emObj.addClass('checked');
      this.plIdArr.push(thisId);
    }
  }

  getTicketRecordObj.updateType = function(obj){
    this.xzObj.html('<a href="javascript:void(0);" data-t="pl">批量</a>');
    this.getTicketRecordObj.html("");
    obj.siblings().removeClass('on');
    obj.addClass('on');
    var thisT = obj.attr("data-v");
    this.type = thisT;
    this.page = 1;
    this.checkPage = true;
    this.getListData();
  }

  getTicketRecordObj.getListData = function(){
	getTicketRecordObj.checkPage = false;
	var postData = {
		'status' : 	this.type,
		'page' : this.page,
		'page_size' : this.minListNum,
		'access_token' : loginObj.access_token
	}
    $.ajax({
	  url : ConfigObj.localSite +  '?version=1&m=user.Record.getticket',
      type : "post",
      data : postData,
      dataType : "json",
      success : function(msg){
		//console.log('取票订单列表数据 ',msg);
		if(msg.code == '0000'){
       	 	if(msg.info.status!=getTicketRecordObj.type || msg.info.page!=getTicketRecordObj.page)return false;
        	if(msg.info.list.length<getTicketRecordObj.minListNum)getTicketRecordObj.checkPage=false;
        	getTicketRecordObj.createListHtml(msg.info.list);
			if(!getTicketRecordObj.checkPage){
				getTicketRecordObj.getTicketRecordObj.append('<div class="center endtip_1">已显示全部</div>');
			}
		}else{
			$.alertMsg(msg.code_str);	
		}
      }
    });
  }

  getTicketRecordObj.plQp = function(obj){
    this.xzObj.html('<a href="javascript:void(0);" data-t="dz">单张</a>');
    this.getPlNum();
    this.plTipsObj.show();
    $("#getTicketRecord_listDivObj .qpMsgObj").hide();
    $("#getTicketRecord_listDivObj .checkObj").show();
    this.plCheck = true;
  }

  getTicketRecordObj.dzQp = function(obj){
    this.xzObj.html('<a href="javascript:void(0);" data-t="pl">批量</a>');
    this.plTipsObj.hide();
    this.plIdArr = new Array();
    $("#getTicketRecord_listDivObj .qpMsgObj").show();
    $("#getTicketRecord_listDivObj .checkObj").hide();
    this.plCheck = false;
  }

  getTicketRecordObj.getPlNum = function(){
    for(var i=0,num=0,ilen=this.plIdArr.length;i<ilen;i++){
      if(this.plIdArr[i])num++;
    }
    this.plNumObj.html(num);
  }

  getTicketRecordObj.allPlQp = function(){
    var labelObj = $(".checkObj");
    this.plIdArr = new Array();
    for(var i=0,ilen=labelObj.length;i<ilen;i++){
      var thisId = labelObj.eq(i).attr("data-v");
      labelObj.eq(i).children('em').addClass('checked');
      this.plIdArr.push(thisId);
    }
  }

  getTicketRecordObj.checkIdList = function(){
    for(var i=0,num=0,ilen=this.plIdArr.length;i<ilen;i++){
      if(this.plIdArr[i])num++;
    }
    var qpObj = this.xzObj.children('.qpObj');
    if(num<=0){
      qpObj.addClass('gray');
    }else{
      qpObj.removeClass('gray');
    }
  }

  getTicketRecordObj.postPlQp = function(){
    var temIdList = new Array();
    for(var i=0,ilen=this.plIdArr.length;i<ilen;i++){
      if(this.plIdArr[i])temIdList.push(this.plIdArr[i]);
    }
    if(temIdList.length==0){
      $.alertMsg("请至少选择一单");
      return false;
    }
	qupiaoPwdObj.goBack = function(){
		qupiaoPwdObj.destroy();
		getTicketRecordObj.show();
	}
	qupiaoPwdObj.show('reload',function(){
		qupiaoPwdObj.setData(temIdList);
	})
    //window.location.href = '/ticketOrder/'+temIdList.join(",");
  }

  getTicketRecordObj.createListHtml = function(data){
    var arg = /^大奖/;
    var arg1 = /^中奖/;
    var html = [];
    for(var i=0,ilen=data.length;i<ilen;i++){
      html.push('<div class="orderlist"><div class="slf"><span class="dot"></span><span class="line"></span></div><div class="srt"><p class="gray mb8">'+data[i]['create_date']+'</p><div class="orderbox mb20" data-t="show" data-v="'+data[i]['target_id']+'" data-type="'+data[i]['target_type']+'"><h3 class="toptit mb10 clearfix"><span class="fl">'+data[i]['lottery_typecn']+'</span><span class="fr font12'+((arg.test(data[i]['prize_status']) || arg1.test(data[i]['prize_status'])) ? " fontred" : "")+'"><em>'+data[i]['prize_status']+'</em><!--em class="rtarrow icon"></em--></span></h3><p class="font12 mb10 clearfix"><span class="fl gray">'+data[i]['lottery_no']+'</span><span class="fr">已取'+data[i]['got_num']+'/<em clas="gray">共'+data[i]['total_num']+'张</em></span></p><p class="font12 clearfix"><span class="fl fontred">￥'+data[i]['amount']+'</span><span class="fr">'+this.getTypeHtml(data[i])+'</span></p></div></div></div>');
    }
	if(this.page == 0){
		this.getTicketRecordObj.html(html.join(""));
	}else{
    	this.getTicketRecordObj.append(html.join(""));
	}
  }

  getTicketRecordObj.getTypeHtml = function(data){
    var type = data['optstatus'];
    var id = data['target_id'];
    switch(type){
      case "not" : return '<a href="javascript:void(0);" class="fontblue qpMsgObj">'+data['optstatus_desc']+'</a><label class="labox checkObj" style="display:none;" data-t="checked" data-v="'+id+'"><em class="icon checkbox"></em></label>';break;
      //case "invalid" : return '<em class="gray">密码已过期/</em><a href="javascript:void(0);" class="fontblue" data-t="qp" data-v="'+id+'">重取</a>';break;
      case "fail" : return '<em class="gray qpMsgObj">'+data['optstatus_desc']+'</em><label class="labox checkObj" style="display:none;" data-t="checked" data-v="'+id+'"><em class="icon checkbox"></em></label>';break;
      case "yes" : return '<em class="gray qpMsgObj">'+data['optstatus_desc']+'</em><label class="labox checkObj" style="display:none;" data-t="checked" data-v="'+id+'"><em class="icon checkbox"></em></label>';break;
    }
  }
  
  getTicketRecordObj.setDefConfig = function(){
	  getTicketRecordObj.type = "not";
	  getTicketRecordObj.page = 1;
	  getTicketRecordObj.minListNum = 20;
	  getTicketRecordObj.checkPage = true;
	  getTicketRecordObj.clientHeight = document.documentElement.clientHeight;
	  getTicketRecordObj.plIdArr = new Array();
	  getTicketRecordObj.plCheck = false; 
	  window.onscroll = null;
	  getTicketRecordObj.scrollTop = 0;
  }

  getTicketRecordObj.onloadExecution = function(){
	this.setDefConfig();
    this.createDomObj();
    this.createEvent();
    this.getListData();
  }

  getTicketRecordObj.init = function(){
      getTicketRecordObj.onloadExecution()
  }
  
