
	var hmUserlistObj = new PageController({
	   'name': 'hmUserlist',
	   'tpl' : 'template/hemai/hmUserlist.html'
    }); 

	hmUserlistObj.createDomObj = function(){
		this.wrapObj = $("#hmUserlist_wrapObj");
		this.listObj = $('#hmUserlist_listObj');
	}

	hmUserlistObj.createEvent = function(){

		this.wrapObj.unbind('tap').tap(function(e){
			hmUserlistObj.updateMoneyEvent(e);
		});
		
	}

	hmUserlistObj.updateMoneyEvent = function(e){
		var pObj = $.oto_checkEvent(e,"P");
		if(pObj){
			var thisObj = $(pObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "backbtn" : this.goBack();return true;
			}
		}
	}

	hmUserlistObj.setData = function(obj){
		var data = obj;
		this.pid = data.pid;
		hmUserlistObj.getData();
	}

	hmUserlistObj.getData = function(){
		
        var postData = {
			'pid':this.pid
		}
        //console.log(postData)
        var secretData = {
        	'para':Global.encrypt(postData),
        	'access_token':loginObj.access_token
        }
		$.ajax({
			url : ConfigObj.localSite +  '?version=1&m=user.project.followProjectList',
			data : secretData,
			type : "post",
			dataType : "json",
			success : function(msg){
//				console.log(msg);
				if(msg.code == '0000'){
					hmUserlistObj.formatHtml(msg.info);
				}else{
					$.alertMsg(msg.code_str)
				}
			}
		});
	}

	hmUserlistObj.formatHtml = function(obj){
		var html = '';
		for(var i=0,ilen=obj.length;i<ilen;i++){
			var itm = obj[i];
			html += '<div class="hmUser_list clearfix">'+
					'<span class="text_show" style="width:24%">'+itm.user_name+'</span>'+
					'<span class="text_show" style="width:17%">'+itm.shareNum+'份</span>'+
					'<span class="text_show" style="width:17%">'+itm.shareMoney+'元</span>'+
					'<span class="text_show" style="width:24%">'+itm.create_time+'</span>'+
					'<span class="text_show" style="width:18%">'+(itm.prizeMoney > 0?itm.prizeMoney : "认购成功")+'</span>'+
					'</div>';
		}
		this.listObj.html(html);
	}

	hmUserlistObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
	}

	hmUserlistObj.setDefConfig = function(){
		this.pid = "";
	}

	hmUserlistObj.init = function(){
		hmUserlistObj.onloadExecution();
		hmUserlistObj.setDefConfig();
	}
	
	