
  var prizeReviewDetailObj = new PageController({
	   'name': 'prizeReviewDetail',
	   'tpl' : 'template/record/prizeReviewDetail.html'
    });

  prizeReviewDetailObj.createDomObj = function(){
    this.wrap = $("#prizeReviewDetail_wrap");
	//this.recordObj = $('#prizeReviewDetail_recordObj');
  }

  prizeReviewDetailObj.createEvent = function(){
    $('#prizeReviewDetail_backbtn').unbind('tap').tap(function(){
		prizeReviewDetailObj.goBack();
	})
	$('#prizeReviewDetail_botBack').unbind('tap').tap(function(){
		prizeReviewDetailObj.goBack();
	})
	
	$('#prizeReviewDetail_bet').unbind('tap').tap(function(){
		prizeReviewDetailObj.goBack();
		projectDetailObj.goAllBet();
	})
	
	window.onscroll = function(){
		//if(!prizeReviewDetailObj.checkPage)return false;
        //prizeReviewDetailObj.updatePage();	
	}
  }
  
  prizeReviewDetailObj.updatePage = function(){
    var scrollTop = document.body.scrollTop;
    var bodyHeight = this.recordObj.height();
    if(scrollTop + this.clientHeight > bodyHeight - this.clientHeight/2){
	  if($('#prizeReviewDetail').length > 0 && $('#prizeReviewDetail').css('display') != 'none'){ 
      	this.page+=1;
      	this.getData();
	  }
    }
  }
  
  prizeReviewDetailObj.setData = function(id){
	 this.tid = id;  
  }
  
  prizeReviewDetailObj.getData = function(){
	// prizeReviewDetailObj.checkPage = false;
	 var self = this;
	  var postData = {
		'pid' : self.tid ,
		'page' : this.page,
		'page_size' : this.minListNum,
		'access_token':loginObj.access_token
	  }
	  $.ajax({
		url : ConfigObj.localSite +  '?version=1&m=user.project.prizereview',
		type:'post',
		data: postData,
		dataType:'json',
		success:function(obj){
			//console.log('出票详情prizeReviewDetail返回数据: ', obj);
			if(obj.code == '0000'){
				/*if(obj.info.page != self.page)return false;
				if(obj.info.ticket_list.length<self.minListNum){
				  prizeReviewDetailObj.checkPage = false;
				}else{
				  prizeReviewDetailObj.checkPage = true;
				}*/
				prizeReviewDetailObj.formatHtml(obj.info, obj.prizeStatus);
			}else{
				$.alertMsg(obj.code_str);
			}
		}
	  })  
  }
  
  prizeReviewDetailObj.formatHtml = function(obj,status){
	 var html = '';
	 for(var i=0;i<obj.length;i++){
		var itm = obj[i];
		html +=	'<div class="p_item whitebg mb8">'+
					'<div class="clearfix center">'+
						'<div class="fl w10">'+
							'<em class="num">'+ (i + 1) + '</em>'+
							'<p>'+ itm.passType + '</p>'+
						'</div>'+
						'<div class="fl w90 mb5">';
			for(var j=0;j<itm.list.length;j++){
				var match = itm.list[j];
				var hitCls =  '';
				if(match.wager[0].hit == 1){
					hitCls = 'on';
				}else if(match.wager[0].hit == 2){
					hitCls = 'out';
				}
				html +=   '<div class="p_dz clearfix">'+
							  '<span class="gray fl font12 w18">'+ match.oidCn + '</span>'+
							  '<p class="fl w50 p_team clearfix">'+
								  '<span class="w45">'+ match.homeName + '</span>'+
								  '<em class="gray w10">VS</em>'+
								  '<span class="w45">'+ match.awayName + '</span></p>'+
							  '<p class="fl w32">'+
								  '<span class="pblock selected '+  hitCls +'">' + match.wager[0].opt + (match.lotteryType == 'FTSPF' ? '(<em>'+match.rq + '</em>)' : '') + match.wager[0].odd + '</span>'+
							  '</p>'+
						   '</div>'
			}
							
		html +=			'</div>'+
					'</div>'+
					'<div class="p_yc clearfix">'+
						'<span class="fl">'+ this.getPrizeHtml(itm, status)+'</span>'+
						'<div class="fr">'+ itm.count + '注</div>'+
					'</div>'+
				'</div>'
	  }
	  this.wrap.html(html);
	  
  }
  
  prizeReviewDetailObj.getPrizeHtml = function(itm,status){
	var html = '';
	if(status != 'Not' && Number(itm.prize) > 0){
		html = '中奖 <em class="fontred">'+ itm.prize + '</em>元';
	}else if(status != 'Not'){
		html = '未中奖';
	}else{
		html = '预计奖金 <em class="fontred">'+ itm.prize + '</em>元';
	}
	return html;
  }

  prizeReviewDetailObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
  }

  prizeReviewDetailObj.init = function(){
	  prizeReviewDetailObj.setDefConfig();
      prizeReviewDetailObj.onloadExecution();
  }
  
  prizeReviewDetailObj.setDefConfig = function(){
	  this.tid = '';
	  this.page = 0;
	  this.checkPage = true;
	  this.clientHeight = document.documentElement.clientHeight;
	  this.minListNum = 10;  
	  window.onscroll = null;
  }
   
  prizeReviewDetailObj.dirShow = function(obj){
	 
	var id = (obj && obj.id) ? obj.id : '';
	prizeReviewDetailObj.show('reload',function(){
		prizeReviewDetailObj.setData(id);
		prizeReviewDetailObj.getData();	
	}); 
	
  }

