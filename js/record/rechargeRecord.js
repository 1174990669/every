
  var rechargeRecordObj = new PageController({
	   'name': 'rechargeRecord',
	   'tpl' : 'template/record/rechargeRecord.html'
    });

  rechargeRecordObj.createDom = function(){
    this.rechargeObj = $("#rechargeRecord_rechargeObj");
    //this.noTipsObj = $("#noTipsObj");
    this.rechargeListObj = $("#rechargeRecord_rechargeListObj");
  }

  rechargeRecordObj.createEvent = function(){
    this.rechargeObj.unbind('tap').tap(function(e){
        var pObj = $.oto_checkEvent(e,"P");
        if(pObj){
          var thisObj = $(pObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "back" : rechargeRecordObj.goBack();return true;
          }
        }
        var divObj = $.oto_checkEvent(e,"DIV");
        if(divObj){
          var thisObj = $(divObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "detail" : rechargeRecordObj.hrefDetail(thisObj);return true;
          }
        }
    });

    window.onscroll = function(){
	  if(window.scrollY !== 0){
	  	rechargeRecordObj.scrollTop = window.scrollY;
	  }
      if(!rechargeRecordObj.checkPage)return false;
      rechargeRecordObj.updatePage();
    }

	this.rechargeListObj.dropload({
			scrollArea : window,
			distance : this.pullDistance,
			loadUpFn:function(me){
				rechargeRecordObj.page = 0;
				rechargeRecordObj.getListData();
				me.resetload();
			}
	 })
  }

  rechargeRecordObj.hrefDetail = function(obj){
    var thisP = obj.attr("data-p");
    var thisI = obj.attr("data-i");
    if(!!!thisP || !!!thisI)return true;
    if(thisP == 'order'){
		rechargeStatusObj.goBack = function(){
			rechargeStatusObj.destroy();
			rechargeRecordObj.show();
		}

		rechargeStatusObj.show('reload',function(){
			rechargeStatusObj.getData(thisI);
		})
	}
	if(thisP == 'Project'){

		  projectDetailObj.show('reload',function(){
			  projectDetailObj.getData(thisI);
			  projectDetailObj.pushRoute(function(){  //路由机制
				rechargeRecordObj.show();
			 })
		  })
	}
  }

  rechargeRecordObj.updatePage = function(){
    var scrollTop = document.body.scrollTop;
    var bodyHeight = this.rechargeObj.height();
    if(scrollTop + this.clientHeight > bodyHeight - this.clientHeight/2){
      this.page+=1;
      this.getListData();
    }
  }

  rechargeRecordObj.getListData = function(){
    rechargeRecordObj.checkPage = false;
	var postData = {
		'page' : this.page,
		'page_size': this.minListNum	
	}
	var secretData = {
			'para' : Global.encrypt(postData),
			'access_token': loginObj.access_token
		};
    $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=user.Record.deposit',
      type : "post",
      data : secretData,
      dataType : "json",
      success : function(msg){
		//console.log('充值记录数据', msg);
		if(msg.code == '0000'){
			msg.info = $.parseJSON(Global.crypt(msg.info));
			if(msg.info.page != rechargeRecordObj.page)return false;
			if(msg.info.list.length<rechargeRecordObj.minListNum){
			  rechargeRecordObj.checkPage = false;
			}else{
			  rechargeRecordObj.checkPage = true;
			}
			//rechargeRecordObj.allrechargeObj.html(msg.info.remain+"元");
            rechargeRecordObj.createListHtml(msg.info.list);
			if(!rechargeRecordObj.checkPage){
				rechargeRecordObj.rechargeListObj.append('<div class="center endtip_1">已显示全部</div>');
			}
		}else{
			$.alertMsg(msg.code_str);
		}
      }
    });
  }

  rechargeRecordObj.createListHtml = function(data){
      var html = [];

      data.forEach(function (v) {
          var statusColorMap = {
              Succeed: ['#ef633f', '#ef633f'],
              Not: ['#999', '#333'],
              Default: ['#999', '#999']
          };

          var statusHtml = '<span style="display: inline-block;position: relative; bottom: 10px"><span style="color: ' + (statusColorMap[v['status']] ? statusColorMap[v['status']][0] : statusColorMap['Default'][0]) + '; display: block">' + v['amount'] + '元</span><span  style="color: ' + (statusColorMap[v['status']] ? statusColorMap[v['status']][1] : statusColorMap['Default'][1]) + '; display: block">' + v['status_cn'] + '</span></span><em class="icon rtarrow" style="position: relative; bottom: 25px"></em>';

          var t = '' +
              '<div class="orderlist">' +
              '<div class="slf">' +
              '<span class="dot"></span>' +
              '<span class="line"></span>' +
              '</div>' +
              '<div class="srt">' +
              '<p class="gray mb8">' + v['create_date'] + '</p>' +
              '<div class="orderbox mb20" data-t="detail" data-p="order" data-i="' + v['target_id'] + '">' +
              '<h3 class="mb10">' + v['item_cn'] + '</h3>' +
              '<p class="font12 gray">' + v['create_time'] + '</p>' +
              '<p class="cash_change">' +
              statusHtml +
              '</p>' +
              '</div>' +
              '</div>' +
              '</div>';

          html.push(t);
      });

	if(this.page == 0){
		this.rechargeListObj.html(html.join(""));
	}else{
    	this.rechargeListObj.append(html.join(""));
	}
  }

  rechargeRecordObj.onloadExecution = function(){
    this.createDom();
    this.createEvent();
    this.getListData();
  }

  rechargeRecordObj.init = function(){
	  rechargeRecordObj.setDefConfig();
      rechargeRecordObj.onloadExecution();
  }

  rechargeRecordObj.setDefConfig = function(){
	  rechargeRecordObj.page = 0;
	  rechargeRecordObj.checkPage = true;
	  rechargeRecordObj.clientHeight = document.documentElement.clientHeight;
	  rechargeRecordObj.minListNum = 20;
	  rechargeRecordObj.timeTem = "";
	  window.onscroll = null;
	  rechargeRecordObj.scrollTop = 0;
  }
