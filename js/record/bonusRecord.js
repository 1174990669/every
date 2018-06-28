 //红包
  var bonusRecordObj = new PageController({
	   'name': 'bonusRecord',
	   'tpl' : 'template/record/bonusRecord.html'
    }); 

  bonusRecordObj.createDom = function(){
    this.bonusObj = $("#bonusRecord_bonusObj");
    //this.noTipsObj = $("#noTipsObj");
    this.bonusListObj = $("#bonusRecord_bonusListObj");
    this.allMoneyObj = $("#bonusRecord_allMoneyObj");
  }

  bonusRecordObj.createEvent = function(){
	  
	 
    this.bonusObj.unbind('tap').tap(function(e){
        var pObj = $.oto_checkEvent(e,"P");
        if(pObj){
          var thisObj = $(pObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "back" : bonusRecordObj.goBack();return true;
           // case "jh" : $.alertMsg('正在建设中');return true;window.location.href='jh';return true;
          }
        }

        var liObj = $.oto_checkEvent(e,"LI");
        if(liObj){
          var thisObj = $(liObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "update" : bonusRecordObj.updateType(thisObj);return true;
          }
        }

        var divObj = $.oto_checkEvent(e,"DIV");
        if(divObj){
          var thisObj = $(divObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "detail" : bonusRecordObj.hrefDetail(thisObj);return true;
          }
        }
    });

    window.onscroll = function(){
      if(!bonusRecordObj.checkPage)return false;
      bonusRecordObj.updatePage();
    }
	
	this.bonusListObj.dropload({  
		scrollArea : window,
		distance : this.pullDistance,
		loadUpFn:function(me){
			bonusRecordObj.page = 0;
			bonusRecordObj.getListData();
			me.resetload();
			
		}
	}) 
  }

  bonusRecordObj.hrefDetail = function(obj){
    var type = obj.attr("data-p");
    var pid = obj.attr("data-i");
    switch(type){
	   case 'Project':
		  projectDetailObj.show('reload',function(){
			  projectDetailObj.getData(pid); 
			  projectDetailObj.pushRoute(function(){  //路由机制
				bonusRecordObj.show();
			 }) 
		  })
		  break;
		case 'bonus':
			/*redBagObj.goBack=function(){
				redBagObj.destroy();
				bonusRecordObj.show();	
			}*/
			redBagObj.show('reload',function(){
				redBagObj.getData(pid,'record');
				redBagObj.pushRoute(function(){
					bonusRecordObj.show();
				})
			})
	}
  }

  bonusRecordObj.updatePage = function(){
  	var scrollTop = document.body.scrollTop;
  	if(scrollTop == 0){
  		scrollTop = document.documentElement.scrollTop;
  	}
//  var scrollTop = document.documentElement.scrollTop;
//	console.log(scrollTop)
    var bodyHeight = this.bonusObj.height();
    if(scrollTop + this.clientHeight > bodyHeight - this.clientHeight/2){
      this.page+=1;
      this.getListData();
    }
  }

  bonusRecordObj.updateType = function(obj){
    var thisT = obj.attr("data-v");
    if(thisT == this.bonusListType)return false;
    obj.siblings().removeClass("on");
    obj.addClass('on');

    this.bonusListType = thisT;
    this.page = 1;
    this.checkPage = true;
    this.timeTem = "";

    this.bonusListObj.html("");
    this.getListData();
  }

  bonusRecordObj.getListData = function(){
    bonusRecordObj.checkPage = false;

	var postData = {
		'bonus_status' : this.bonusListType,
		'page' : this.page,
		'page_size' : this.minListNum
	}
	var secretData = {
		'para': Global.encrypt(postData),
	  	'access_token' : loginObj.access_token
	}
    $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=user.record.bonus',
      type : "post",
      data : secretData,
      dataType : "json",
      success : function(msg){
		//console.log('红包列表数据',msg)
		if(msg.code == '0000'){
			msg.info = $.parseJSON(Global.crypt(msg.info));
//			console.log('红包列表数据',msg)
			if(msg.info.bonus_status != bonusRecordObj.bonusListType)return false;
			if(msg.info.page != bonusRecordObj.page)return false;
		   
			if(msg.info.list.length<bonusRecordObj.minListNum){
			  bonusRecordObj.checkPage = false;
			}else{
			  bonusRecordObj.checkPage = true;
			}
			bonusRecordObj.allMoneyObj.html(msg.info.remain+'元');
			bonusRecordObj.createListHtml(msg.info.list);
			if(!bonusRecordObj.checkPage){
				bonusRecordObj.bonusListObj.append('<div class="center endtip_1">已显示全部</div>');
			}
		}else{
			$.alertMsg(msg.code_str);	
		}
      }
    });
  }

  bonusRecordObj.createListHtml = function(data){
    var html = [];
    for(var i=0,ilen=data.length;i<ilen;i++){
      html.push('<div class="orderlist"><div class="slf"><span class="dot"></span><span class="line"></span></div><div class="srt" ><p class="gray mb8">'+(data[i]['create_date'])+'</p><div class="orderbox mb20" data-t="detail" data-p="'+data[i]['target_type']+'" data-i="'+data[i]['bag_account_id']+'"><h3 class="mb10 clearfix"><span class="fl">'+data[i]['activity_cn']+'</span><span class="fr'+(Number(data[i]['amount']) > 0 ? " fontred" : " fontgreen")+'">'+data[i]['amount']+'元</span></h3><p class="font12 clearfix"><span class="fl gray">'+data[i]['time_desc']+'</span><span class="fr">'+((data[i]['freeze_amount'] && data[i]['bonus_status']=='yes' && (Number(data[i]['freeze_amount']) > 0)) ? '<em class="gray">冻结</em><em class="fontred"> '  + data[i]['freeze_amount'] + '</em>' : ''  )+' <em class="gray">还剩</em><em class="fontred">'+data[i]['remain_amount']+'元</em></span>'+(data[i]['bonus_status'] == "expired" ? '<span class="dated disbg"></span>' : '')+'</p></div></div></div>');
      this.timeTem = data[i]['create_date'];
    }
	if(this.page == 0){
		this.bonusListObj.html(html.join(""));
	}else{
    	this.bonusListObj.append(html.join(""));
	}
  }

  bonusRecordObj.onloadExecution = function(){
    this.createDom();
    this.createEvent();
    this.getListData();
  }

  bonusRecordObj.init = function(){
	  bonusRecordObj.setDefConfig();
      bonusRecordObj.onloadExecution();
  }
  
  bonusRecordObj.setDefConfig = function(){
	  bonusRecordObj.bonusListType = "yes";
	  bonusRecordObj.page = 1;
	  bonusRecordObj.checkPage = true;
	  bonusRecordObj.clientHeight = document.documentElement.clientHeight;
	  bonusRecordObj.minListNum = 20;
	  bonusRecordObj.timeTem = "";
  }
	
