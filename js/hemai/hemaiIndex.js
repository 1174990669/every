
	var hemaiIndexObj = new PageController({
	   'name': 'hemaiIndex',
	   'tpl' : 'template/hemai/hemaiIndex.html'
    }); 

	hemaiIndexObj.createDomObj = function(){
		this.wrapObj = $("#hemaiIndex_wrapperObj");
		this.noTipsObj = $("#hemaiIndex_noTipsObj");
		this.lotteryObj = $("hemaiIndex_lotteryObj"); //hemaiIndex_lotteryObj  noTipsObj
		this.atnObj = $("#hemaiIndex_atnObj"); //
		this.jdObj = $("#hemaiIndex_jd");
		this.jeObj = $("#hemaiIndex_je"); 
		this.hbObj = $("#hemaiIndex_hb");
		this.jzObj = $('#hemaiIndex_jz');
		this.headObj = $('#hemaiIndex_header');
		this.listObj = $('#hemaiIndex_listObj');//
		this.backObj = $('#actIdx_back');//activityIdx_back activityIdx_back

	}

	hemaiIndexObj.createEvent = function(){

		this.wrapObj.unbind('tap').tap(function(e){
			hemaiIndexObj.updateMoneyEvent(e);
		});
		this.backObj.unbind('tap').tap(function(){
			searchSiteObj.show()
			console.log(1)
		});
		window.onscroll = function(){
	      	if(!hemaiIndexObj.checkPage)return false;
	      	hemaiIndexObj.updatePage();
	    }
		
		$('#hemaiIndex_listObj').dropload({  
			scrollArea : window,
			distance : this.pullDistance,
			loadUpFn:function(me){
				hemaiIndexObj.page = 0;
				hemaiIndexObj.getData();
				me.resetload();
			}
		}) 
		
	}
//star
	hemaiIndexObj.updateMoneyEvent = function(e){
		var liObj = $.oto_checkEvent(e,"LI");
		if(liObj){
			var thisObj = $(liObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "setLottery" : this.setLottery(thisObj);return true;
			}
		}
		
		var pObj = $.oto_checkEvent(e,"P");
		if(pObj){
			var thisObj = $(pObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "lottery" : this.lottery(thisObj);return true;
				case "star" : this.goStar();return true;
				case "attention" : this.goAttention();return true;
				case "betFTFH" : this.goFTFH();return true;
			}
		}
		
		var dlObj = $.oto_checkEvent(e,"DL");
		if(dlObj){
			var thisObj = $(dlObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "godetail" : this.goDetail(thisObj);return true;
			}
		}
		
		var slObj = $.oto_checkEvent(e,"SPAN");
		if(slObj){
			var thisObj = $(slObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "atn" : this.atn(thisObj);return true;
				case "jd" : this.jdOrder(thisObj);break;
				case "je" : this.jeOrder(thisObj);break;
				case "hb" : this.hbOrder(thisObj);break;
				case "jz" : this.jzOrder(thisObj);break;
			}
		}
	}

	hemaiIndexObj.goFTFH = function(){
		soccerMixObj.goBack = function(){
		    soccerMixObj.destroy();
		    homeObj.show();
	    }
	    soccerMixObj.show(true,function(){
		    soccerMixObj.getData(); 
	    });
	}

	hemaiIndexObj.updatePage = function(){
	  	var scrollTop = document.body.scrollTop;
	  	if(scrollTop == 0){
	  		scrollTop = document.documentElement.scrollTop;
	  	}
	    var bodyHeight = this.wrapObj.height();
	    if(scrollTop + this.clientHeight > bodyHeight - this.clientHeight/2){
	      this.page+=1;
	      this.getData();
	    }
	    
	    
	}


	hemaiIndexObj.goDetail = function(obj){
		var thisV = obj.attr('data-v');
		hemaiDetailObj.goBack = function(){
			 hemaiDetailObj.destroy();
			 hemaiIndexObj.show();
		 }
		hemaiDetailObj.show(true,function(){
			hemaiDetailObj.setData(thisV);
		});
	}

	hemaiIndexObj.lottery = function(obj){
		if($("#hemaiIndex_selectObj").css("display") == "none"){
			$('#hemaiIndex_selectObj').show();
			addBgLayer();
		} else{
			$('#hemaiIndex_selectObj').hide();
			$('#global_bgLayer').remove();
		}
		
		function addBgLayer() {
            var bg = '<div style="width:100%;height:100%;background:transparent;position:absolute;left:0;top:0;z-index:90" id="global_bgLayer"></div>';
            if ($('#global_bgLayer').length == 0) {
                $('#hemaiIndex').append(bg);
                $('#global_bgLayer').css({ 'height': document.documentElement.scrollHeight || document.body.scrollHeight })
                $('#global_bgLayer').unbind('tap').tap(function() {
                    $('#hemaiIndex_selectObj').hide();
                    $('#global_bgLayer').remove();
                })
            }
        }
		
	}
	
	hemaiIndexObj.atn = function(obj){
		if(!loginObj.isLogin ){
			$.alertMsg("请先登录！",false)
			setTimeout(function(){
				hemaiIndexObj.goLogin();
			},2000);
			return false;	
		};
		var type = obj.attr('data-v');
		var id = obj.attr('data-k');
		if(id == loginObj.userId){
			$.alertMsg("不能关注自己",false);
			return false;
		}
		if(type == "no"){
			obj.addClass('noatn_btn');
			obj.attr('data-v','yes');
			obj.html('已关注');
			this.relation_type = "build";
		}else if(type == "yes"){
			obj.removeClass('noatn_btn');
			obj.attr('data-v','no');
			obj.html('关注');
			this.relation_type = "cancel";
		};
		
		var data = {
			'user_id': id,
			'relation_type': this.relation_type
		}
		//console.log(data)
		var secretData = {
			'para': Global.encrypt(data),
			'access_token': loginObj.access_token
		}
		this.page = 0;
		$.ajax({
			url : ConfigObj.localSite +  '?version=1&m=user.account.setRelation',
			data : secretData,
			type : "post",
			dataType : "json",
			success : function(msg){
				//console.log(msg);
				$.alertMsg(msg.code_str,true);
				hemaiIndexObj.getData();
				
			}
		});
	}
	
	
	hemaiIndexObj.goStar = function(){
		hotBigcafeObj.goBack = function(){
			 hotBigcafeObj.destroy();
			 hemaiIndexObj.show(true,function(){
			 	this.page = 0;
			 	hemaiIndexObj.getData();
			 });
		 }
		hotBigcafeObj.show();
	}

	hemaiIndexObj.goLogin = function () {
	    loginObj.goBack = function () {
	        userCenterObj.show(true);
	    };
	    loginObj.goForward = function () {
	        userCenterObj.show(true);
	    };
	    loginObj.show(true);
	}

	hemaiIndexObj.goAttention = function(){
		
		if(!loginObj.isLogin ){
			$.alertMsg("请先登录！",false)
			setTimeout(function(){
				hemaiIndexObj.goLogin();
			},2000);
			return false;	
		}
		
		myAttentionObj.goBack = function(){
			 myAttentionObj.destroy();
			 hemaiIndexObj.show(true,function(){
			 	this.page = 0;
			 	hemaiIndexObj.getData();
			 });
		 }
		myAttentionObj.show();
	}

	hemaiIndexObj.setLottery = function(obj){
		var thisV = obj.attr("data-v");
		obj.siblings().removeClass("selected");
		obj.addClass('selected')
		this.lotteryType = thisV;
		hemaiIndexObj.getData();
		$('#hemaiIndex_lotteryObj').html(obj[0].innerHTML);
		$('#hemaiIndex_selectObj').hide();
	}

	hemaiIndexObj.jdOrder = function(obj){
		var thisV = obj.attr("data-v");
		this.sort = "completerate";
		this.jeObj.html('<span data-t="je" data-v="de" class="hm_h_btn hm_je">金额</span>');
		this.hbObj.html('<span data-t="hb" data-v="de" class="hm_h_btn hm_hb">周回报率</span>');
		this.jzObj.html('<span data-t="jz" data-v="de" class="hm_h_btn hm_jz">快截至</span>');
		if(thisV == 'de'){
			obj.attr('data-v','up');
			obj.addClass('hmup');
			this.desc = "asc";
		}else if(thisV == "up"){
			obj.attr('data-v','down');
			obj.removeClass('hmup');
			obj.addClass('hmdown');
			this.desc = "desc";
		}else if(thisV == "down"){
			obj.attr('data-v','up');
			obj.removeClass('hmdown');
			obj.addClass('hmup');
			this.desc = "asc";
		}
		hemaiIndexObj.getData();
	}

	hemaiIndexObj.jeOrder = function(obj){
		var thisV = obj.attr("data-v");
		this.sort = "money";
		
		this.jdObj.html('<span data-t="jd" data-v="de" class="hm_h_btn hm_je">进度</span>');
		this.hbObj.html('<span data-t="hb" data-v="de" class="hm_h_btn hm_hb">周回报率</span>');
		this.jzObj.html('<span data-t="jz" data-v="de" class="hm_h_btn hm_jz">快截至</span>');
		
		if(thisV == 'de'){
			obj.attr('data-v','up');
			obj.addClass('hmup');
			this.desc = "asc";
		}else if(thisV == "up"){
			obj.attr('data-v','down');
			obj.removeClass('hmup');
			obj.addClass('hmdown');
			this.desc = "desc";
		}else if(thisV == "down"){
			obj.attr('data-v','up');
			obj.removeClass('hmdown');
			obj.addClass('hmup');
			this.desc = "asc";
		}
		hemaiIndexObj.getData();
	}
	
	hemaiIndexObj.hbOrder = function(obj){
		var thisV = obj.attr("data-v");
		this.sort = "returnrate";
		this.jdObj.html('<span data-t="jd" data-v="de" class="hm_h_btn hm_je">进度</span>');
		this.jeObj.html('<span data-t="je" data-v="de" class="hm_h_btn hm_je">金额</span>');
		this.jzObj.html('<span data-t="jz" data-v="de" class="hm_h_btn hm_jz">快截至</span>');
		if(thisV == 'de'){
			obj.attr('data-v','up');
			obj.addClass('hmup');
			this.desc = "asc";
		}else if(thisV == "up"){
			obj.attr('data-v','down');
			obj.removeClass('hmup');
			obj.addClass('hmdown');
			this.desc = "desc";
		}else if(thisV == "down"){
			obj.attr('data-v','up');
			obj.removeClass('hmdown');
			obj.addClass('hmup');
			this.desc = "asc";
		}
		hemaiIndexObj.getData();
	}
	
	hemaiIndexObj.jzOrder = function(obj){
		var thisV = obj.attr("data-v");
		this.sort = "sell_end_time";
		this.jdObj.html('<span data-t="jd" data-v="de" class="hm_h_btn hm_je">进度</span>');
		this.jeObj.html('<span data-t="je" data-v="de" class="hm_h_btn hm_je">金额</span>');
		this.hbObj.html('<span data-t="hb" data-v="de" class="hm_h_btn hm_hb">周回报率</span>');
		if(thisV == 'de'){
			obj.attr('data-v','up');
			obj.addClass('hmup');
			this.desc = "asc";
		}else{
			obj.attr('data-v','de');
			obj.removeClass('hmup');
			this.desc = "";
			this.sort = "";
		}
		hemaiIndexObj.getData();
	}
	
	hemaiIndexObj.getData = function(){
		hemaiIndexObj.checkPage = false;
        var postData = {
			"sort" : this.sort,
			"desc" : this.desc,
			"lotteryType" : this.lotteryType,
			"page": this.page,
			"size": this.size
		}
        var secretData = {
        	'para':Global.encrypt(postData),
        	'access_token': loginObj.access_token
        }
		$.ajax({
			url : ConfigObj.localSite +  '?version=1&m=lottery.lottery.TogetherProjectList',
			data : secretData,
			type : "post",
			dataType : "json",
			success : function(msg){
				console.log(msg);
				if(msg.code == '0000'){
					if(msg.info.length){
			          hemaiIndexObj.noTipsObj.hide();
			        }else if(hemaiIndexObj.page == 0){
			          hemaiIndexObj.noTipsObj.show();
			          $('#hemaiIndex_listObj').html('');
			          return false;
			        }
					if(msg.info.length<hemaiIndexObj.size){
					  hemaiIndexObj.checkPage = false;
					}else{
					  hemaiIndexObj.checkPage = true;
					}
					hemaiIndexObj.formatHtml(msg.info);
					if(!hemaiIndexObj.checkPage){
						$('#hemaiIndex_listObj').append('<div class="center endtip_1">已显示全部</div>');
					}
					
				}else{
					$.alertMsg(code.str,false)
				}
				
			}

		});
	}

	hemaiIndexObj.formatHtml = function(obj){
		var html = '';
		var data = obj;
		for (var i=0,ilen=data.length;i<ilen;i++) {
			var itm = data[i];
			
			html += '<div class="hm_list">'+
						'<div class="hm_list_t clearfix">'+
							'<div class="fl" style="width:19%">'+
								'<p>'+ itm.lottery_tyoe_cn +'</p>'+
							'</div>'+
							'<div class="fl" style="width:23%">'+
								'<div class="hm_nickname">'+
									'<p class="text_show" style="text-align: left;">'+itm.user_name+'</p>'+
								'</div>'+
							'</div>'+
							'<div class="fl" style="width:41%">'+
								'<p class="hemai_rate" style="color: #fe3104;">周回报率 '+ Number(itm.returnrate).toFixed(1) +'%</p>'+
							'</div>'+
							'<div class="fl hm_atn" id="hemaiIndex_atnObj" style="width:17%">'+
								'<span class="atn_btn '+(itm.follow_status == 1 ? 'noatn_btn' : '')+'" data-t="atn" data-k="'+itm.owner_id+'" data-v="'+(itm.follow_status == 1? 'yes' : 'no')+'">'+(itm.follow_status ==1? '已关注' : '关注')+'</span>'+
							'</div>'+
						'</div>'+
						'<dl class="hm_list_b" data-t="godetail" data-v="'+ itm.project_id +'">'+
							'<div class="content3 hmPace" style="text-align: center;">'+
								'<canvas id="'+ itm.project_id +'" class="hm_scale" width="120px" height="120px" style="width: 60px;height: 60px;"></canvas>'+
								'<div class="hm_pace">'+
									'<p>' + itm.completerate + '%</p>'+
									'<span>保' + itm.assure_rate + '%</span>'+
								'</div>'+
							'</div>'+
							'<div class="content3 hm_info">'+
								'<p>总金额</p>'+
								'<span>'+ itm.money +'</span>'+
							'</div>'+
							'<div class="content3 hm_info">'+
								'<p>剩余份数</p>'+
								'<span>'+ itm.remainNum +'</span>'+
							'</div>'+
							'<div class="content3 hm_info">'+
								'<p>截止时间</p>'+
								'<span style="color: #fe3104;">'+ itm.sell_end_time +'</span>'+
							'</div>'+
							'<div class="content4 hmIndex_arr"></div>'+
						'</dl>'+
					'</div>';

					// console.log(html)
		}
		if(this.page == 0){
			$('#hemaiIndex_listObj').html(html);
			// console.log(html)
		}else{
			$('#hemaiIndex_listObj').append(html);
			// console.log(html)
		}
		for (var k=0,ilen=data.length;k<ilen;k++) {
			drawCircle({
			    id: data[k].project_id,
			    color: '#e04241',
			    angle: data[k].completerate/100,
			    lineWidth: 4
			});
		}
		
	}

	hemaiIndexObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
//		this.getData();
	}

	hemaiIndexObj.setDefConfig = function(){
		this.lotteryType = "";
		this.cateType = "";
		this.orderType = "";
		this.sort = "";
		this.desc = "";
		this.size = 10;
		this.page = 0;
		this.checkPage = true;
		this.clientHeight = document.documentElement.clientHeight;
	}

	hemaiIndexObj.init = function(){
		hemaiIndexObj.onloadExecution();
		hemaiIndexObj.setDefConfig();
		hemaiIndexObj.getData();
	}
	


	