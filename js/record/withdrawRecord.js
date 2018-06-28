
  var withdrawRecordObj = new PageController({
	   'name': 'withdrawRecord',
	   'tpl' : 'template/record/withdrawRecord.html'
    }); 

  withdrawRecordObj.createDom = function(){
    this.withdrawObj = $("#withdrawRecord_withdrawObj");
    //this.noTipsObj = $("#noTipsObj");
    this.withdrawListObj = $("#withdrawRecord_withdrawListObj");
    this.allwithdrawObj = $("#withdrawRecord_allwithdrawObj");
  }

  withdrawRecordObj.createEvent = function(){
    this.withdrawObj.unbind('tap').tap(function(e){
        var pObj = $.oto_checkEvent(e,"P");
        if(pObj){
          var thisObj = $(pObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "back" : withdrawRecordObj.goBack();return true;
          }
        }
        var divObj = $.oto_checkEvent(e,"DIV");
        if(divObj){
          var thisObj = $(divObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "detail" : withdrawRecordObj.hrefDetail(thisObj);return true;
          }
        }
    });

    window.onscroll = function(){
	  if(window.scrollY !== 0){
	  	withdrawRecordObj.scrollTop = window.scrollY;
	  }
      if(!withdrawRecordObj.checkPage)return false;
      withdrawRecordObj.updatePage();
    }
	
	 this.withdrawListObj.dropload({  
			scrollArea : window,
			distance : this.pullDistance,
			loadUpFn:function(me){
				withdrawRecordObj.page = 0;
				withdrawRecordObj.getListData();
				me.resetload();
			}
	 })   
  }

  withdrawRecordObj.hrefDetail = function(obj){
    var thisP = obj.attr("data-p");
    var thisI = obj.attr("data-i");
    if(!!!thisP || !!!thisI)return true;
    if(thisP == 'order'){
		withdrawDetailObj.goBack = function(){
			withdrawDetailObj.destroy();
			withdrawRecordObj.show();	
		}
		
		withdrawDetailObj.show('reload',function(){
			withdrawDetailObj.getData(thisI);
		})
	}
	/*if(thisP == 'Project'){
		  projectDetailObj.show('reload',function(){
			  projectDetailObj.getData(thisI);  
			  projectDetailObj.pushRoute(function(){  //路由机制
				withdrawRecordObj.show();
			  })  
		  })
	}*/
  }

  withdrawRecordObj.updatePage = function(){
    var scrollTop = document.body.scrollTop;
    var bodyHeight = this.withdrawObj.height();
    if(scrollTop + this.clientHeight > bodyHeight - this.clientHeight/2){
      this.page+=1;
      this.getListData();
    }
  }

  withdrawRecordObj.getListData = function(){
    withdrawRecordObj.checkPage = false;
	var postData = {
		'page' : this.page,
		'page_size': this.minListNum	
	}
	var secretData = {
    	'access_token': loginObj.access_token,
			'para' : Global.encrypt(postData)
		};
    $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=user.record.withdraw',
      type : "post",
      data : secretData,
      dataType : "json",
      success : function(msg){
//		console.log('提款记录数据', msg);
		if(msg.code == '0000'){
			msg.info = $.parseJSON(Global.crypt(msg.info));
//			console.log('提款记录数据', msg);
			if(msg.info.page != withdrawRecordObj.page)return false;
			if(msg.info.list.length<withdrawRecordObj.minListNum){
			  withdrawRecordObj.checkPage = false;
			}else{
			  withdrawRecordObj.checkPage = true;
			}
			withdrawRecordObj.allwithdrawObj.html(msg.info.remain+"元");
			withdrawRecordObj.createListHtml(msg.info.list);
			if(!withdrawRecordObj.checkPage){
				withdrawRecordObj.withdrawListObj.append('<div class="center endtip_1">已显示全部</div>');
			}
		}else{
			$.alertMsg(msg.code_str);	
		}
      }
    });
  }

  withdrawRecordObj.createListHtml = function (data) {
      var html = [];

      data.forEach(function (v) {

          var statusMap = {
              Not: ['待审核', '#999', '#333'],
              Audited: ['待处理', '#999', '#333'],
              Succeed: ['成功', '#ef633f', '#ef633f'],
              Cancel: ['失败', '#999', '#999'],
              Closed: ['交易关闭','#999', '#999']
          };
//					console.log(v)
					
          var statusHtml = '<span style="display: inline-block; position: relative; bottom: 10px"><span style="color: ' + statusMap[v['status']][1] + '; display: block">' + v['amount'] + '元</span><span style="color: ' +  statusMap[v['status']][2] + '; display: block">' + statusMap[v['status']][0] + '</span></span><em class="icon rtarrow" style="position: relative; bottom: 25px"></em>';
					var tapHtml = '<div id="tap_area" class="orderbox mb20" data-t="detail" data-p="order" data-i="' + v['target_id'] + '">'
//					if(v['pay_method'] == "batchPayToWechat"){
//        	  statusHtml = '<span style="display: inline-block; position: relative; bottom: 10px"><span style="color: ' + statusMap[v['status']][1] + '; display: block">' + v['amount'] + '元</span><span style="color: ' +  statusMap[v['status']][2] + '; display: block">' + statusMap[v['status']][0] + '</span></span><em class="rtarrow" style="position: relative; bottom: 25px"></em>';
//        		tapHtml = '<div id="tap_area" class="orderbox mb20" data-p="order" data-i="' + v['target_id'] + '">'
//					}
          var t = '' +
              '<div class="orderlist">' +
              '<div class="slf">' +
              '<span class="dot"></span>' +
              '<span class="line"></span>' +
              '</div>' +
              '<div class="srt">' +
              '<p class="gray mb8">' + v['create_date'] + '</p>' +
               tapHtml +
              '<h3 class="mb10">' + v['item_cn'] + '</h3>' +
              '<p class="font12 gray">' + v['create_time'] + '</p>' +
              '<p class="cash_change">' +
              statusHtml +
              '</p>' +
              '</div>' +
              '</div>' +
              '</div>';
//            console.log(v['pay_method'] == "batchPayToWechat")
          html.push(t);
      });

      if (this.page === 0) {
          this.withdrawListObj.html(html.join(''));
      } else {
          this.withdrawListObj.append(html.join(''));
      }
  }

  withdrawRecordObj.onloadExecution = function(){
    this.createDom();
    this.createEvent();
    this.getListData();
  }

  withdrawRecordObj.init = function(){
	  withdrawRecordObj.setDefConfig();
      withdrawRecordObj.onloadExecution();
  }
  
  withdrawRecordObj.setDefConfig = function(){
	  withdrawRecordObj.page = 0;
	  withdrawRecordObj.checkPage = true;
	  withdrawRecordObj.clientHeight = document.documentElement.clientHeight;
	  withdrawRecordObj.minListNum = 20;
	  withdrawRecordObj.timeTem = "";
	  window.onscroll = null;
	  withdrawRecordObj.scrollTop = 0;
  }
