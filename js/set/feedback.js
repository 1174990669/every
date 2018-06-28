
  var feedbackObj = new PageController({
	   'name': 'feedback',
	   'tpl' : 'template/set/feedback.html'
    });

   feedbackObj.createDomObj = function() {
        this.optionListObj = $("#feedback_option");
        this.contentObj = $('#feedback_contentInput');
        this.contactObj = $('#feedback_contactInput');
        this.sendBtnObj = $('#feedback_sendBtn');
    }

    feedbackObj.createEvent = function() {


		$('#feedback_wrapperObj').unbind('tap').tap(function(e){
		  var spanObj = $.oto_checkEvent(e,"SPAN");
		  if(spanObj){
			var thisObj = $(spanObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
			  case "option" :  feedbackObj.changeType(thisObj);return true;
			}
		  }
          var aObj = $.oto_checkEvent(e,"A");
		  if(aObj){
			var thisObj = $(aObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
			   case "clearContactTip" : $('#feedback_contactTip').hide();;return true;
			   case "toContactTip" : feedbackObj.submitFun();return true;
			}
		  }
        });

		this.sendBtnObj.unbind('tap').tap(function() {
            feedbackObj.sendData();
        })

		$('#feedback_backBtn').unbind('tap').tap(function(){
			feedbackObj.goBack();
		})
		$('#feedback_list').unbind('tap').tap(function(){
			feedbackObj.goList();
		})
		$('#feedback_contentInput').unbind('focus').focus(function(){
			 $('#feedback_contentInput').addClass('blueBorder');
		})
		$('#feedback_contentInput').unbind('blur').blur(function(){
			 $('#feedback_contentInput').removeClass('blueBorder');
		})
		$('#feedback_contactInput').unbind('focus').focus(function(){
			//30a1f7
			$('#feedback_contactInput').parent('p').css({'borderColor' : '#da3716'});
		})
		$('#feedback_contactInput').unbind('blur').blur(function(){
			$('#feedback_contactInput').parent('p').css({'borderColor' : '#ebebeb'});
		})

    }

	feedbackObj.submitFun = function(){
		$('#feedback_contactTip').hide();
		feedbackObj.checkTip = true;
		feedbackObj.sendData();
	}

	feedbackObj.changeType = function(dom){
		$("#feedback_option").find('span').removeClass('on');
		dom.addClass('on');
		this.type = dom.text();
	}

	feedbackObj.goList = function(){
		if(loginObj.isLogin){
			feedbackListObj.goBack = function(){
				feedbackListObj.destroy();
				feedbackObj.show();
			}
			feedbackListObj.show();
		}else{
			feedbackListObj.goBack = function(){
				feedbackListObj.destroy();
				feedbackObj.show();
			}
			loginObj.goBack = function(){
				feedbackObj.show();
			}
			loginObj.goForward = function(){
				feedbackListObj.show();
			}
			loginObj.show();
		}
	}

    feedbackObj.sendData = function() {
		var self = this;
		var content = this.contentObj.val();
		var contact = this.contactObj.val();

		// 检查一下建议内容和手机号
        if (content.length < 1) {$.alertMsg('请输入建议内容'); return;}
        if (content.length < 5) {$.alertMsg('建议内容最少5个字符');return;}
        if (content.length > 5000) {$.alertMsg('建议内容最多5000个汉字');return;}

        if ((contact.length > 1) && (!/^(1\d{10})|(\w+@\w+\.\w+)$/g.test(contact))) {$.alertMsg('请输入正确的邮箱或者手机号码'); return;}

        var dataObj = {
            content: content,
            title: self.type,
            contact: contact,
            access_token: loginObj.access_token
        };
               

// console.log(dataObj) user.Account.initMsg
		this.loading = Global.simpleLoading.open({timeOut: 10000});

        $.ajax({
            url : ConfigObj.localSite + '?version=1&m=user.Account.addMsg',
            type: 'post',
            data: dataObj,
            dataType: 'json',
            success: function(obj) {
            	console.log(obj)
                Global.simpleLoading.close(feedbackObj.loading);
                if (obj.code == '0000') {
                    $.alertMsg(obj.code_str,true);
                    
					$('#feedback_contentInput').val('');
                    $('#feedback_contactInput').val('');
                } else {
					$.alertMsg(obj.code_str);
				}
            }
        })
    }

  feedbackObj.getData = function(){
	  $.ajax({
		 // url : "/account/logout",
		  url : ConfigObj.localSite + '?version=1&m=user.Account.initMsg',
		  data : {'access_token':loginObj.access_token},
		  type : "post",
		  dataType : "json",
		  success : function(msg){

			// console.log('意见反馈初始化',msg);
			if(msg.code=='0000'){
			    feedbackObj.formatHtml(msg.list);
			    $.ajax({
		            url: ConfigObj.localSite + '?version=1&m=system.AppInfo.getApp',
		            data: {'version' : ConfigObj.version,'appKey': ConfigObj.appkey,'channel_number': ConfigObj.zdid},
		            type: "post",
		            dataType: "json",
		            success: function(msg) {
		             // console.log('版本检查接口返回', msg);
		                if (msg.code == '0000') {
		             		$('#feedback_contentInput').attr('placeholder',msg.info.package.service_qq)

		                }
		            }
		    	})
			}else{
				 $.alertMsg(msg.code_str);
			}

		  }
	});
  }

  feedbackObj.formatHtml = function(obj){
	 // $('#feedback_option');
	 if(obj.title){
		var html = '';
		for(var i=0;i<obj.title.length;i++){
			html += '<span data-t="option" '+ (i==0 ? 'class="on"' : '')  +'>' + obj.title[i] + '</span>';
		}
		$('#feedback_option').html(html);
	 }
//	 if(obj.contact){ feedback_contentInput
//		$('#feedback_contactInput').val(obj.contact);
//	 } 
  }

  feedbackObj.setDefConfig = function(){
	  this.type = '建议';
  }

  feedbackObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
	this.getData();
  }

  feedbackObj.init = function(){
	  feedbackObj.setDefConfig();
      feedbackObj.onloadExecution();
  }

  feedbackObj.goBack = function(){
  	 feedbackObj.popRoute();
  }

  feedbackObj.destroy = function(){
	  this.setDefConfig();
	  $('#feedback').html('').remove();
	  this.routeArr = [];
	  //console.log('意见反馈页面销毁全部路由关系------------------------------');
  }


  feedbackObj.dirShow = function(){
	feedbackObj.show('',function(){
		feedbackObj.getData();
	});
  }



