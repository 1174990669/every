
	var hotBigcafeObj = new PageController({
	   'name': 'hotBigcafe',
	   'tpl' : 'template/hemai/hotBigcafe.html'
    }); 

	hotBigcafeObj.createDomObj = function(){
		this.wrapObj = $("#hotBigcafe_wrapObj");
		this.atnObj = $('#hotBigcafe_atnObj');
		this.listObj = $('#hotBigcafe_listObj');
	}

	hotBigcafeObj.createEvent = function(){

		this.wrapObj.unbind('tap').tap(function(e){
			hotBigcafeObj.updateMoneyEvent(e);
		});
		
	}
	hotBigcafeObj.updateMoneyEvent = function(e){
		
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
				case "lottery" : this.lottery(thisObj);return true;
				case "backbtn" : searchSiteObj.show();return true;
				// case "backbtn" : this.goBack();return true; 
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
	
	hotBigcafeObj.atn = function(obj){
		
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
		if(type == "no"){
			obj.addClass('unfollow');
			obj.attr('data-v','yes');
			obj.html('取消关注');
			this.relation_type = "build";
		}else if(type == "yes"){
			obj.removeClass('unfollow');
			obj.attr('data-v','no');
			obj.html('关注');
			this.relation_type = "cancel";
		}
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
			}
		});
	}
	
	hotBigcafeObj.goStar = function(obj){
		var id = obj.attr('data-v');
		starIndexObj.goBack = function(){
			 starIndexObj.destroy();
			 hotBigcafeObj.show(true,function(){
			 	hotBigcafeObj.getData();
			 });
		 }
		starIndexObj.show(true,function(){
			starIndexObj.setData({
				'owner_id': id
			})
		});
	}
	
	hotBigcafeObj.getData = function(){
		
        var postData = {
			'access_token':loginObj.access_token
		}
		$.ajax({
			url : ConfigObj.localSite +  '?version=1&m=lottery.lottery.TogetherUserList',
			data : postData,
			type : "post",
			dataType : "json",
			success : function(msg){
				//console.log(msg); searchSiteObj.show()
				if(msg.code == '0000'){
					if (msg.info.length == 0) {
						$('#hotBigcafe_listObj').html('<div class="center endtip_1">暂无大咖</div>');
						return false;
					}
					hotBigcafeObj.formatHtml(msg.info);
				}else{
					$.alertMsg(msg.code_str)
				}
				
			}

		});
	}

	hotBigcafeObj.formatHtml = function(obj){
		var html = '';
		for (var i=0,ilen=obj.length;i<ilen;i++) {
			var itm = obj[i];
			html += '<dl class="hotBig_list">'+
						'<div class="hotBig_name">'+
							'<div class="hotBig_nickname">'+
								'<p class="text_show" style="text-align: left;">'+itm.user_name+'</p>'+
							'</div>'+
						'</div>'+
						'<div class="hotBig_per">'+
							'<p style="color: #fe3104;">周回报率 '+itm.returnrate+'%</p>'+
						'</div>'+
						'<dd class="point_star" data-t="openStar" data-v="'+itm.owner_id+'"></dd>'+
						'<div class="hotBig_atn hm_atn" id="hotBigcafe_atnObj">'+
							'<span class="atn_btn foo_atn '+(itm.follow_status == "1"?'unfollow':'')+'" data-t="atn" data-k="'+itm.owner_id+'" data-v="'+(itm.follow_status == "1"?'yes':'no')+'">'+(itm.follow_status == "1"?'取消关注':'关注')+'</span>'+
						'</div>'+
					'</dl>';
		}
		this.listObj.html(html);
	}

	hotBigcafeObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
		this.getData();
	}

	hotBigcafeObj.setDefConfig = function(){
		
	}

	hotBigcafeObj.init = function(){
		hotBigcafeObj.onloadExecution();
		hotBigcafeObj.setDefConfig();
	}
	
	


	

/*
	var hotBigcafeObj = new PageController({
	   'name': 'hotBigcafe',
	   'tpl' : 'template/hemai/hotBigcafe.html'
    }); 

	hotBigcafeObj.createDomObj = function(){
		this.wrapObj = $("#hotBigcafe_wrapObj");
		this.atnObj = $('#hotBigcafe_atnObj');
		this.listObj = $('#hotBigcafe_listObj');
	}

	hotBigcafeObj.createEvent = function(){

		this.wrapObj.unbind('tap').tap(function(e){
			hotBigcafeObj.updateMoneyEvent(e);
		});
		
	}

	hotBigcafeObj.updateMoneyEvent = function(e){
		
		var dObj = $.oto_checkEvent(e,"DD");
		if(dObj){
			var thisObj = $(dObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "openStar" : this.goStar(thisObj);return true;
			}
		}
		//backbtn
		var pObj = $.oto_checkEvent(e,"P");
		if(pObj){
			var thisObj = $(pObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "lottery" : this.lottery(thisObj);return true;
				// case "backbtn" : this.goBack();return true;  //改为单独的屏蔽 3/21 
				case "backbtn" : searchSiteObj.show();return true;  //更改后的 3/21 
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
	
	hotBigcafeObj.atn = function(obj){
		//this.goStar()
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
		if(type == "no"){
			obj.addClass('unfollow');
			obj.attr('data-v','yes');
			obj.html('取消关注');
			this.relation_type = "build";
		}else if(type == "yes"){
			obj.removeClass('unfollow');
			obj.attr('data-v','no');
			obj.html('关注');
			this.relation_type = "cancel";
		}
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
			}
		});
	}
	
	hotBigcafeObj.goStar = function(obj){
		var id = obj.attr('data-v');
		starIndexObj.goBack = function(){
			 starIndexObj.destroy();
			 hotBigcafeObj.show(true,function(){
			 	hotBigcafeObj.getData();
			 });
		 }
		starIndexObj.show(true,function(){
			starIndexObj.setData({
				'owner_id': id
			})
		});
	}
	
	hotBigcafeObj.getData = function(){
		
        var postData = {
			'access_token':loginObj.access_token
		}
		$.ajax({
			url : ConfigObj.localSite +  '?version=1&m=lottery.lottery.TogetherUserList',
			data : postData,
			type : "post",
			dataType : "json",
			success : function(msg){
				//console.log(msg);
				if(msg.code == '0000'){
					if (msg.info.length == 0) {
						$('#hotBigcafe_listObj').html('<div class="center endtip_1">暂无大咖</div>');
						return false;
					}
					hotBigcafeObj.formatHtml(msg.info);
				}else{
					$.alertMsg(msg.code_str)
				}
				
			}

		});
	}

	hotBigcafeObj.formatHtml = function(obj){
		var html = '';
		for (var i=0,ilen=obj.length;i<ilen;i++) {
			var itm = obj[i];
			html += '<dl class="hotBig_list">'+
						'<div class="hotBig_name">'+
							'<div class="hotBig_nickname">'+
								'<p class="text_show" style="text-align: left;">'+itm.user_name+'</p>'+
							'</div>'+
						'</div>'+
						'<div class="hotBig_per">'+
							'<p style="color: #fe3104;">周回报率 '+itm.returnrate+'%</p>'+
						'</div>'+
						'<dd class="point_star" data-t="openStar" data-v="'+itm.owner_id+'"></dd>'+
						'<div class="hotBig_atn hm_atn" id="hotBigcafe_atnObj">'+
							'<span class="atn_btn foo_atn '+(itm.follow_status == "1"?'unfollow':'')+'" data-t="atn" data-k="'+itm.owner_id+'" data-v="'+(itm.follow_status == "1"?'yes':'no')+'">'+(itm.follow_status == "1"?'取消关注':'关注')+'</span>'+
						'</div>'+
					'</dl>';
		}
		this.listObj.html(html);
	}

	hotBigcafeObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
		this.getData();
	}

	hotBigcafeObj.setDefConfig = function(){
		
	}

	hotBigcafeObj.init = function(){
		hotBigcafeObj.onloadExecution();
		hotBigcafeObj.setDefConfig();
	}
	
	


	*/