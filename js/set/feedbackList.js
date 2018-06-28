   var feedbackListObj = new PageController({
	   'name': 'feedbackList',
	   'tpl' : 'template/set/feedbackList.html'
    }); 
  
  feedbackListObj.createDom = function(){
	this.wrapObj = $("#feedbackList_wrap");
    this.listObj = $("#feedbackList_list");
	
  }

  feedbackListObj.createEvent = function(){
	/*this.goTop.unbind('tap').tap(function(){
		window.scrollTo(0,0);
		feedbackListObj.scrollTop = 0;
	})*/
	
    this.wrapObj.unbind('tap').tap(function(e){
        var pObj = $.oto_checkEvent(e,"P");
        if(pObj){
          var thisObj = $(pObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "back" : feedbackListObj.goBack();return true;
			case 'ask' :feedbackListObj.goAsk();return true;
			
          }
        }
		var divObj = $.oto_checkEvent(e,"DIV");
        if(divObj){
          var thisObj = $(divObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "toggle" : feedbackListObj.toggleAnswer(thisObj);return true;
          }
        }
		
		var aObj = $.oto_checkEvent(e,"A");
        if(aObj){
          var thisObj = $(aObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "clearTelTip": $('#feedbackList_telTip').hide();return true;
          }
        }
		
    });
	
	window.onscroll = null;
    window.onscroll = function(){
	  if(!feedbackListObj.checkPage)return false;
      feedbackListObj.updatePage();
    }
	
	$('#feedbackList_listWrap').dropload({  
			scrollArea : window,
			distance : this.pullDistance,
			loadUpFn:function(me){
				feedbackListObj.pullLoad = me;
				feedbackListObj.page = 0;
				feedbackListObj.getListData();
				//me.resetload();
			}
	 })   
  }
  
  feedbackListObj.toggleAnswer = function(dom){
	   var answer = dom.next('.fb-reply');
	   var arrow = dom.find('.arrow');
	   if(answer.css('display') == 'none'){
		  answer.show(); 
		  arrow.addClass('trans');
	   }else{
		  answer.hide();
		  arrow.removeClass('trans');
	   }
  }
  
  feedbackListObj.goAsk = function(){
      feedbackListObj.destroy();
      feedbackObj.show('', function () {
          feedbackObj.pushRoute(function () {
              feedbackListObj.show();
          })
      })
	  // $('#feedbackList_telTip').show();
  }

  feedbackListObj.updatePage = function(){
    var scrollTop = document.body.scrollTop;
    var bodyHeight = this.wrapObj.height();
    if(scrollTop + this.clientHeight > bodyHeight - this.clientHeight/2){
      this.page+=1;
      this.getListData();
    }
	//scrollTop>this.clientHeight*2 ? this.goTop.show() : this.goTop.hide();
  }


  feedbackListObj.getListData = function(){
    feedbackListObj.checkPage = false;
	var postData = {
		'page' : this.page,
		'pageSize' : this.minListNum,
		'access_token' : loginObj.access_token	
	}
    $.ajax({
	  url : ConfigObj.localSite +  '?version=1&m=user.Account.msgList',
      type : "post",
      data : postData,
      dataType : "json",
      success : function(msg){
		//console.log('意见反馈列表数据返回 ', msg);
		if(msg.code == '0000'){
			//if(msg.info.page_no != feedbackListObj.page)return false;

            /**
			if(msg.info.info.length<feedbackListObj.minListNum){
			  feedbackListObj.checkPage = false;
			}else{
			  feedbackListObj.checkPage = true;
			}
             **/

			feedbackListObj.createListHtml(msg.info.info);
			//if(!feedbackListObj.checkPage){
			//	feedbackListObj.listObj.append('<div class="center endtip_1">已显示全部</div>');
			//}
		}else{
			$.alertMsg(msg.code_str);	
		}
		if(feedbackListObj.pullLoad){
			feedbackListObj.pullLoad.resetload();	
		}
      }
    });
  }

  feedbackListObj.createListHtml = function(data){
    var html = '';
    if (!data.length) {
        html = '<div class="noact center"> <p></p> <p class="gray mb40">暂无提问记录！</p></div>';
    } else {
        for(var i=0,ilen=data.length;i<ilen;i++){
            var itm = data[i];
            html += '<div class="fb-item" data-t="toggle">'+
                '<p class="font12 gray mb10 clearfix" >'+
                '<span class="fl">'+ itm.post_time + '</span>'+
                '<span class="fr">'+
                '<a href="javascript:void(0);" class="gray">'+ itm.deal_status_cn +  ' <em class="arrow "></em></a>'+
                '</span>'+
                '</p>'+
                '<p >'+ itm.content + '</p>'+
                '</div>'+
                '<div class="fb-reply" style="display:none">'+
                '<p>' + itm.answer + '</p>'+
                '</div>';
        }
    }

	if(this.page == 0){
		this.listObj.html(html);
	}else{
    	this.listObj.append(html);
	}
  }

  feedbackListObj.onloadExecution = function(){
    this.createDom();
    this.createEvent();
    this.getListData();
  }

  feedbackListObj.init = function(){
	feedbackListObj.setDefConfig();
    feedbackListObj.onloadExecution();
  }
  
  feedbackListObj.setDefConfig = function(){
	  feedbackListObj.page = 0;
	  feedbackListObj.checkPage = true;
	  feedbackListObj.clientHeight = document.documentElement.clientHeight;
	  feedbackListObj.minListNum = 20;
	  feedbackListObj.pullLoad = '';
	  window.onscroll = null;
	  feedbackListObj.scrollTop = 0;
  }
	


