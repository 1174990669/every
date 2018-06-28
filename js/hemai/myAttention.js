
	var myAttentionObj = new PageController({
	   'name': 'myAttention',
	   'tpl' : 'template/hemai/myAttention.html'
    }); 

	myAttentionObj.createDomObj = function(){
		this.wrapObj = $("#myAttention_wrapObj");
		this.atnObj = $('#myAttention_atnObj');
		this.listObj = $('#myAttention_listObj');
//		this.lotteryObj = $("hemaiIndex_lotteryObj");
//		this.tipsObj = $("#modifyUserName_tipsObj");
//		this.usernameObj = $("#modifyUserName_usernameObj");
//		this.backObj = $("#modifyUserName_backObj");
//		this.userLiObj = $("#modifyUserName_userLiObj");
//		this.nowName = $('#modifyUserName_nowName');
	}

	myAttentionObj.createEvent = function(){

		this.wrapObj.unbind('tap').tap(function(e){
			myAttentionObj.updateMoneyEvent(e);
		});
		
	}

	myAttentionObj.updateMoneyEvent = function(e){
//		var liObj = $.oto_checkEvent(e,"A");
//		if(liObj){
//			var thisObj = $(liObj);
//			var thisT = thisObj.attr("data-t");
//			switch(thisT){
//				case "planBtn" : this.planBtn(thisObj);return true;
//			}
//		}
		
		var dObj = $.oto_checkEvent(e,"DD");
		if(dObj){
			var thisObj = $(dObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "openStar" : this.goStar(thisObj);return true;
			}
		}
		
		var pObj = $.oto_checkEvent(e,"P");
		if(pObj){
			var thisObj = $(pObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "backbtn" : this.goBack();return true;
			}
		}
		
		var sObj = $.oto_checkEvent(e,"SPAN");
		if(sObj){
			var thisObj = $(sObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "atn" : this.atn(thisObj);return true;
			}
		}
	}

	myAttentionObj.atn = function(obj){
		if(!loginObj.isLogin ){
			$.alertMsg("请先登录！",false)
			setTimeout(function(){
				loginObj.goBack = function () {
			        userCenterObj.show(true);
			    };
			    loginObj.goForward = function () {
			        userCenterObj.show(true);
			    };
			    loginObj.show(true);
			},2000);
			return false;	
		};
		
		var type = obj.attr('data-v');
		var id = obj.attr('data-k');
		this.relation_type = "cancel";
		var data = {
			'user_id': id,
			'relation_type': this.relation_type
		}
		//console.log(data)
		var secretData = {
			'para': Global.encrypt(data),
			'access_token': loginObj.access_token
		}
		$.ajax({
			url : ConfigObj.localSite +  '?version=1&m=user.account.setRelation',
			data : secretData,
			type : "post",
			dataType : "json",
			success : function(msg){
				//console.log(msg);
				$.alertMsg(msg.code_str,true);
				myAttentionObj.getData();
			}
		});
	}

	myAttentionObj.goStar = function(obj){
		var id = obj.attr('data-v');
		starIndexObj.goBack = function(){
			 starIndexObj.destroy();
			 myAttentionObj.show(true,function(){
			 	myAttentionObj.getData();
			 });
		 }
		starIndexObj.show(true,function(){
			starIndexObj.setData({
				'owner_id': id
			})
		});
	}

	myAttentionObj.getData = function(){
		
        var postData = {
			'access_token': loginObj.access_token
		}
		$.ajax({
			url : ConfigObj.localSite +  '?version=1&m=user.account.getFollow_list',
			data : postData,
			type : "post",
			dataType : "json",
			success : function(msg){
				//console.log(msg);
				if(msg.code == '0000'){
					if (msg.info.length == 0) {
						$('#myAttention_listObj').html('<div class="center endtip_1">暂无关注</div>');
						return false;
					}
					myAttentionObj.formatHtml(msg.info);
				}else{
					$.alertMsg(msg.code_str,false);
				}
				
			}

		});
	}

	myAttentionObj.formatHtml = function(obj){
		var data = obj;
		var html = '';
		for (var i in data) {
			var itm = data[i];
			html += '<dl class="hotBig_list">'+
						'<div class="hotBig_name" style="width:40%;">'+
							'<div class="hotBig_nickname">'+
								'<p class="text_show" style="text-align: left;">'+itm.user_name+'</p>'+
							'</div>'+
						'</div>'+
						'<div class="hotBig_per" style="width:30%;">'+
							'<p style="color: #fe3104;">粉丝'+itm.fans+'</p>'+
						'</div>'+
						'<dd class="point_star" data-t="openStar" data-v="'+itm.user_id+'"></dd>'+
						'<div class="hotBig_atn hm_atn" style="width:30%;" id="myAttention_atnObj">'+
							'<span class="atn_btn foo_atn unfollow" data-t="atn" data-v="yes" data-k="'+itm.user_id+'">取消关注</span>'+
						'</div>'+
					'</dl>';
		}
		this.listObj.html(html);
	}

	myAttentionObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
		this.getData();
	}

	myAttentionObj.setDefConfig = function(){
		
	}

	myAttentionObj.init = function(){
		myAttentionObj.onloadExecution();
		myAttentionObj.setDefConfig();
	}
	
	