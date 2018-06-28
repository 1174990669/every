
  var planDetailObj = new PageController({
	   'name': 'planDetail',
	   'tpl' : 'template/record/planDetail.html'
    }); 

  planDetailObj.createDom = function(){
    this.wrapperObj = $("#planDetail_wrapperObj");
    this.lotteryType = $("#planDetail_lotteryType");
    this.nowLotteryNo = $("#planDetail_nowLotteryNo");
    this.wagerStore = $("#planDetail_wagerStore");
    this.confirmLayer = $('#planDetail_confirmLayer');
    this.confirmBtn = $('#planDetail_confirmBtn');
    this.cancelBtn = $('#planDetail_cancelBtn');
    this.qpObj = $("#planDetail_qpObj");
	
	this.wrapA = $('#planDetail_wrapA');
	this.wrapB = $('#planDetail_wrapB');
	this.wrapC = $('#planDetail_wrapC');
  }

  planDetailObj.createEvent = function(){
    this.wrapperObj.unbind('tap').tap(function(e){
      var aObj = $.oto_checkEvent(e,"A");
      if(aObj){
        var thisObj = $(aObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "bet" : planDetailObj.goBet();return true;
          case "qp" : planDetailObj.hrefQp();return true;
          case "goDetail" : planDetailObj.goDetail(thisObj);return true;
        }
      }
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "back" : planDetailObj.goBack();return true;
        }
      }
      var spanObj = $.oto_checkEvent(e,"SPAN");
      if(spanObj){
        var thisObj = $(spanObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "fail" : planDetailObj.showFail(thisObj);return true;
          case "pay"  : planDetailObj.postPay(thisObj);return true;
        }
      }
      var liObj = $.oto_checkEvent(e,"LI");
      if(liObj){
        var thisObj = $(liObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "st"   : planDetailObj.postPace(thisObj);return true;
		  case "toggle" : planDetailObj.toggleCon(thisObj);return true;
        }
      }
	  var divObj = $.oto_checkEvent(e,"DIV");
      if(divObj){
        var thisObj = $(divObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "project"   : planDetailObj.goProject(thisObj);return true;
		 
        }
      }
    });
  }
  
  planDetailObj.toggleCon = function(obj){
	   this.wrapB.toggle();
  }

  planDetailObj.goProject = function(obj){
	  //console.log(obj);
	  var id = obj.attr('data-i');
	  if(id == 0) return;
	  projectDetailObj.show('reload',function(){
		  projectDetailObj.getData(id);
		  projectDetailObj.pushRoute(function(){
			planDetailObj.show();  
		  });  
	  })
  }

  

  planDetailObj.postPace = function(obj){
	if(this.consign_type == 'Save') return false;
    var pid = obj.attr("data-p");
    planSubDetailObj.goBack=function(){
		planSubDetailObj.destroy();
		planDetailObj.show();	
	}
	planSubDetailObj.show('reload',function(){
		planSubDetailObj.getData(pid);
	})
  }

  

  planDetailObj.showFail = function(obj){
    if(obj.hasClass('showObj')){
      obj.removeClass('showObj')
      obj.next().hide();
    }else{
      obj.addClass('showObj')
      obj.next().show();
    }
  }
  
  planDetailObj.getTotalPrizeHtml = function(obj){
	var prizeStr = '';
	if(this.consign_type == 'Save'){
		 if(obj.head.prize_cn && obj.head.prize_cn.indexOf('累计中奖') != -1){
		 	prizeStr = '<span class="fr fontred"><strong>'+ obj.head.prize_cn+ '</strong></span>';
		 }else{
			prizeStr = '<span class="fr gray"><strong>'+ obj.head.prize_cn +'</strong></span>'; 
		 }	
	}else{
		var data = obj.head;
		if(data.run_status == 'Stop'){
		if(Number(data.total_prize) > 0){
				if( Number(obj.child.succ_prize) > 0){
					prizeStr = '<span class="fr fontred"><strong>中' + obj.child.succ_prize +' 元</strong></span>';
				}else{
					if( Number(obj.child.fail_prize) > 0){
						prizeStr =	'<span class="fr gray"><strong>中'+ obj.child.fail_prize + '元</strong></span>';
					}
				}
			}else{
				prizeStr =	'<span class="fr gray">未中奖</span>';
			}
		 }else{
			if(Number(obj.child.succ_prize) > 0){
				prizeStr =	'<span class="fr fontred"><strong>中' + obj.child.succ_prize + '元</strong></span>';
			}else{
				if(Number(obj.child.fail_prize)  > 0){
					prizeStr =	'<span class="fr gray"><strong>中'+ obj.child.fail_prize + '元</strong></span>'; 
				}
			}				
	   }
	}
	return prizeStr;
  }

  
  planDetailObj.formatHtmlA = function(obj){
	 if(!obj.head) return;
	 var data = obj.head;
	 var html = '';
	 html += '<li class="clearfix font12">'+
				'<p class="fl">'+
					'<span class="font14">'+ data.lottery_type_cn + '</span>&nbsp;&nbsp;&nbsp;<span class="gray">追号</span>'+
				'</p>'+
				'<p class="fr font12">订单编号：'+ data.plan_id + '</p>'+
			'</li>'+
			'<li class="clearfix pr35 font12" data-t="st" data-p="'+ data.plan_id + '">'+
				'<p class="clearfix mb10">'+
					'<span class="fl"><em class="gray">投注金额：</em><em class="fontred">￥'+ data.money + '</em></span>'+
		            this.getTotalPrizeHtml(obj) +
				'</p>'+
				 this.getTicketHtml(data) + 
				'<p><span class="fl"><em class="gray">停追设置：'+ (data.stop_condition_cn ? data.stop_condition_cn : '') + '</em></span><span class="fr">'+ data.run_status_cn +'</span></p>'+
			'</li>'+
			'<li class="clearfix pr35"  data-t="toggle">'+
				'<span class="fl">方案内容</span>'+
				'<span class="fr gray font12"><em class="arrow_down"></em></span>'+
			'</li>';
	  this.wrapA.html(html);  
  }
  
  planDetailObj.getTicketHtml = function(data){
	  var html = '';
	 /*if(data.consign_type == 'Save'){
		var html = '';
	 }else{
		var html = '<p class="clearfix">'+
					'<span class="fl"><em class="gray">取票情况：'+ data.get_ticket_self_cn + '</em></span>'+
					'<span class="fr"><em>'+ data.run_status_cn + '</em></span>'+					
				   '</p>'+
				   '<span class="arrowbox"><em class="rtarrow icon"></em></span>';
	 }*/
	 return html;
  }
  
  planDetailObj.formatDltHtml = function(obj){
	 var html = '';
	 for(var key in obj.content){
		 if(key == 'common' || key == 'random'){
			var arr = obj['content'][key];
			for(var i=0;i<arr.length;i++){
				var itm = arr[i];
				html += '<div class="clearfix">'+
							'<p class="number">'+
								'<span class="gray">';
				for(var j=0;j<itm.redBalls.length;j++){
					html += '<i>' + itm.redBalls[j] + '</i>';
				}
				html += '</span><em>|</em>'+
						'<span class="gray">';
				for(var j=0;j<itm.blueBalls.length;j++){
					html += '<i>' + itm.blueBalls[j] + '</i>';
				}
				html += '</span>'+
						 '</p>'+
				        '<p class="zhushu font12 gray"><span>'+ itm.passTypeCn + '</span><span>'+ itm.count + '注'+ itm.wagerMultiple +'倍</span><span>'+ itm.money + '元</span></p>'+
				'</div>';
			}
		 } else if ('abs' === key) {
			// 胆拖方案内容
             obj['content'][key].forEach(function (v) {
             	 html += '<div class="clearfix">';
				 html += '<p class="number">';

             	 if (v['redDan']) html += '<span class="font3">（<i>' + v['redDan'] + '</i>）</span>'; // 红区胆码
				 html += '<span class="gray">';
             	 v['redBalls'].forEach(function (vv) {html += '<i>' + vv + '</i>';}); // 红区号码
				 html += '</span><em>|</em>';

                 if (v['blueDan']) html += '<span class="font3">（<i>' + v['blueDan'] + '</i>）</span>'; // 蓝区胆码
				 html += '<span class="gray">';
                 v['blueBalls'].forEach(function (vvv) {html += '<i>' + vvv + '</i>';}); // 蓝区号码
				 html += '</span></p>';

				 // 注数、倍数、金额
                 html += '<p class="zhushu font12 gray">' +
					 '<span>' + v['passTypeCn'] + '</span>' +
					 '<span>' + v['count'] + '注' + v['wagerMultiple'] + '倍</span>' +
					 '<span>' + v['money'] + '元</span></p>';

                 html += '</div>'
			 });
		 }
	 }
	 this.wrapB.html(html); 
  }
  
  planDetailObj.formatPl3Html = function(obj){
	 var html = '';
	 for(var key in obj.content){
		if(key == 'IP' || key == 'IPR'){
			var arr = obj['content'][key];
			for(var i=0;i<arr.length;i++){
				var itm = arr[i];
				html += '<div class="clearfix">'+
							'<p class="number">'+											
								'<span class="gray">';
				for(j=0;j<itm.b.length;j++){
					html += '<i>' + itm['b'][j] + '</i>';	
				}
				html += '</span><em>|</em>'+
						'<span class="gray">';
				for(j=0;j<itm.s.length;j++){
					html += '<i>' + itm['s'][j] + '</i>';	
				}
				html += '</span><em>|</em>'+
						'<span class="gray">';
				for(j=0;j<itm.g.length;j++){
					html += '<i>' + itm['g'][j] + '</i>';	
				}
				html += '</span>'+
						'</p>'+
						'<p class="zhushu font12 gray"><span>'+ itm.passTypeCn + '</span><span>'+ itm.count + '注'+ itm.wagerMultiple+ '倍</span><span>'+ itm.money + '元</span></p>'+
					'</div>';
			}
			
		}else if(key == 'UP3' || key == 'UP6' || key == 'UP3R' || key == 'UP6R'){
			var arr = obj['content'][key];
			for(var i=0;i<arr.length;i++){
				var itm = arr[i];
				html += '<div class="clearfix">'+
							'<p class="number">'+
								'<span class="gray">';
								for(var j=0;j<itm.hao.length;j++){
									html += '<i>' + itm.hao[j] + '</i>';	
								}
				html +=			'</span>'+
							'</p>'
							'<p class="zhushu font12 gray"><span>'+ itm.passTypeCn + '</span><span>'+ itm.count +'注'+ itm.wagerMultiple+ '倍</span><span>'+ itm.money + '元</span></p>'+
						'</div>'
			}
		}else if(key == 'IH' || key == 'IHR' || key == 'UH3' || key == 'UH6'|| key == 'UH3R' || key == 'UH6R'){
			var arr = obj['content'][key];
			for(var i=0;i<arr.length;i++){
				var itm = arr[i];
				html += '<div class="clearfix">'+
							'<p class="number">'+
								'<span class="gray">';
						for(var j=0;j<itm.hao.length;j++){
							html += '<i>' + itm.hao[j] + '</i>';	
						}
				html +=         '</span>'+
							'</p>'+
							'<p class="zhushu font12 gray"><span>'+ itm.passTypeCn +'</span><span>'+ itm.count + '注'+ itm.wagerMultiple+ '倍</span><span>'+ itm.money +'元</span></p>'+
						'</div>';
			}
		}else{
			html += '其他玩法';	
		}
	 }
	 this.wrapB.html(html); 
  }
  
  planDetailObj.formatPl5Html = function(obj){
  	 var html = '';
	 for(var key in obj.content){
		 if(key == 'common' || key == 'random'){
			var arr = obj['content'][key];
			for(var i=0;i<arr.length;i++){
				var itm = arr[i];
				html += '<div class="clearfix">'+
						  '<p class="number">'+
							'<span class="gray">';
				for(j=0;j<itm.w.length;j++){
					html += '<i>' + itm['w'][j] + '</i>';	
				}
				html += '</span><em>|</em>'+
						'<span class="gray">';
				for(j=0;j<itm.q.length;j++){
					html += '<i>' + itm['q'][j] + '</i>';	
				}
				html += '</span><em>|</em>'+
						'<span class="gray">';
				for(j=0;j<itm.b.length;j++){
					html += '<i>' + itm['b'][j] + '</i>';	
				}
				html += '</span><em>|</em>'+
						'<span class="gray">';
				for(j=0;j<itm.s.length;j++){
					html += '<i>' + itm['s'][j] + '</i>';	
				}
				html += '</span><em>|</em>'+
						'<span class="gray">';
				for(j=0;j<itm.g.length;j++){
					html += '<i>' + itm['g'][j] + '</i>';	
				}
				html += '</span>'+
						'</p>'+
						'<p class="zhushu font12 gray"><span>'+ itm.passTypeCn + '</span><span>'+ itm.count + '注'+ itm.wagerMultiple+ '倍</span><span>'+ itm.money + '元</span></p>'+
					'</div>';
			}
		 }else{
			html += '其他玩法'; 
		 }
	 }
	 this.wrapB.html(html);
  }
  
  planDetailObj.formatQxcHtml = function(obj){
  	 var html = '';
	 for(var key in obj.content){
		 if(key == 'common' || key == 'random'){
			var arr = obj['content'][key];
			for(var i=0;i<arr.length;i++){
				var itm = arr[i];
				html += '<div class="clearfix">'+
						  '<p class="number">'+
							'<span class="gray">';
				for(j=0;j<itm.yi.length;j++){
					html += '<i>' + itm['yi'][j] + '</i>';	
				}
				html += '</span><em>|</em>'+
						'<span class="gray">';
				for(j=0;j<itm.er.length;j++){
					html += '<i>' + itm['er'][j] + '</i>';	
				}
				html += '</span><em>|</em>'+
						'<span class="gray">';
				for(j=0;j<itm.san.length;j++){
					html += '<i>' + itm['san'][j] + '</i>';	
				}
				html += '</span><em>|</em>'+
						'<span class="gray">';
				for(j=0;j<itm.si.length;j++){
					html += '<i>' + itm['si'][j] + '</i>';	
				}
				html += '</span><em>|</em>'+
						'<span class="gray">';
				for(j=0;j<itm.wu.length;j++){
					html += '<i>' + itm['wu'][j] + '</i>';	
				}
				html += '</span><em>|</em>'+
						'<span class="gray">';
				for(j=0;j<itm.liu.length;j++){
					html += '<i>' + itm['liu'][j] + '</i>';	
				}
				html += '</span><em>|</em>'+
						'<span class="gray">';
				for(j=0;j<itm.qi.length;j++){
					html += '<i>' + itm['qi'][j] + '</i>';	
				}
				html += '</span>'+
						'</p>'+
						'<p class="zhushu font12 gray"><span>'+ itm.passTypeCn + '</span><span>'+ itm.count + '注'+ itm.wagerMultiple+ '倍</span><span>'+ itm.money + '元</span></p>'+
					'</div>';
			}
		 }else{
			html += '其他玩法'; 
		 }
	 }
	 this.wrapB.html(html);
  }
  
  planDetailObj.formatFastHtml = function(obj){
	 var html = '';
	 for(var key in obj.content){
		 if(key == 'FP1' || key == 'FP2' || key == 'FP3'){
			var arr = obj['content'][key];
			for(var i=0;i<arr.length;i++){
				var itm = arr[i];
				html += '<div class="clearfix">'+
						   '<p class="number">'+											
						      '<span class="gray">';
				for(j=0;j<itm['0'].length;j++){
					html += '<i>' + itm['0'][j] + '</i>';	
				}
				html += '</span>';
				if(itm['1'] && itm['1'].length > 0){
					html += '<em>|</em>'+
						    '<span class="gray">';
					for(j=0;j<itm['1'].length;j++){
						html += '<i>' + itm['1'][j] + '</i>';	
					}
					html += '</span>';
				}
				if(itm['2'] && itm['2'].length > 0){
					html += '<em>|</em>'+
						    '<span class="gray">';
					for(j=0;j<itm['2'].length;j++){
						html += '<i>' + itm['2'][j] + '</i>';	
					}
					html += '</span>';
				}
				html += '</p>'+
				        '<p class="zhushu font12 gray"><span>'+ itm.wagerType + '</span><span>'+ itm.passTypeCn + '</span><span>'+ itm.count + '注'+ 
						 ((itm.wagerMultiple && itm.wagerMultiple != -1) ?  itm.wagerMultiple + '倍' : '') +'</span>'+
						 '<span>'+ ((itm.money && itm.money != -1) ?  itm.money + '元' : '') +' </span></p>'+
				'</div>';
				
			}
		 }else{
			var arr = obj['content'][key];
			for(var i=0;i<arr.length;i++){
			    html+= '<div class="libox"><p class="number">';
				var itm = arr[i];
				
				if(itm.dan){
					html += '<span class="fontblack">(';
					for(var j=0;j<itm.dan.length;j++){
						html += '<i>' + itm['dan'][j] + '</i>';	
					}
					html += ')</span>';
				}
				html += '<span class="gray">';
				for(var j=0;j<itm.tuo.length;j++){
					html += '<i>' + itm['tuo'][j] + '</i>';	
				}
				html += '</span>';
				
				html += '</p>'+
				        '<div class="clearfix"><p class="zhushu fl"><span>'+ itm.wagerType + '&nbsp;' + 
						(itm.dan ? '胆拖' : '') +
						'</span><span>' + itm.passTypeCn + '</span><span>'+
						 itm.count + '注' + 
						 ((itm.wagerMultiple && itm.wagerMultiple != -1) ?  itm.wagerMultiple + '倍' : '') +'</span>'+
						 '<span>'+ ((itm.money && itm.money != -1) ?  itm.money + '元' : '') +' </span></p>'+
						'</div></div>';
			}
		 }
	 }
	 this.wrapB.html(html);  
  }

  planDetailObj.formatFastK3Html = function (obj) {
      var html = '';
      var clist = [];
      for (var key in obj.content) {
          if (!obj.content.hasOwnProperty(key)) return;
          obj.content[key].forEach(function (v) {
              var passTypeCn = key === 'TXD2' ? '二同号单选' : v['passTypeCn'];
              var desc = '<p class="zhushu font12 gray"><span>' + passTypeCn + '</span><span>' + v['count'] + '注' + v['wagerMultiple'] + '倍</span><span>' + v['money'] + '元</span></p>';
              var tt = '', t1 = '', t2 = '';
              if (key === 'TXD2') {
				  // 二同号单选

                  v['dan'].forEach(function (vd) {
                      vd = vd.replace(/\+/g, '');
                      t1 += '<i>' + vd + '</i>';
                  });

                  v['hao'].forEach(function (vh) {
                      t2 += '<i>' + vh + '</i>';
                  });

                  tt = '<span class="gray">' + t1 + '</span><em>|</em><span class="gray">' + t2 + '</span>';
              } else if (key === 'BT3' || key === 'BT2') {
                  // 三不同，二不同，有胆拖玩法
                  if (v['dan'].length)
                      v['dan'].forEach(function (vd) {
                          vd = vd.replace(/\+/g, '');
                          t1 += '<i>' + vd + '</i>';
                      });

                  v['hao'].forEach(function (vh) {
                      t2 += '<i>' + vh + '</i>';
                  });

                  tt = (t1.length ? '<span >(' + t1 + ')</span>&nbsp;&nbsp;' : '') + '<span class="gray">' + t2 + '</span>';

              } else {
                  v['hao'].forEach(function (vh) {
                      if (key === 'TXD') vh = vh.replace(/\+/g, '');
					  if (key === 'TXS2') vh = vh.replace(/\+/g, '') + '*';
                      tt += '<i>' + vh + '</i>';
                  });
                  tt = '<span class="gray">' + tt + '</span>';
			  }
              var num = '<p class="number">' + tt + '</p>';
              clist.push('<div class="clearfix">' + num + desc + '</div>');
          });


      }
      this.wrapB.html(clist.join(''));
  };

  planDetailObj.formatD3Html = function(obj){
      var html = '';
      for(var key in obj.content){
          if(key == 'IP' || key == 'IPR'){
              var arr = obj['content'][key];
              for(var i=0;i<arr.length;i++){
                  var itm = arr[i];
                  html += '<div class="clearfix">'+
                      '<p class="number">'+
                      '<span class="gray">';
                  for(j=0;j<itm.b.length;j++){
                      html += '<i>' + itm['b'][j] + '</i>';
                  }
                  html += '</span><em>|</em>'+
                      '<span class="gray">';
                  for(j=0;j<itm.s.length;j++){
                      html += '<i>' + itm['s'][j] + '</i>';
                  }
                  html += '</span><em>|</em>'+
                      '<span class="gray">';
                  for(j=0;j<itm.g.length;j++){
                      html += '<i>' + itm['g'][j] + '</i>';
                  }
                  html += '</span>'+
                      '</p>'+
                      '<p class="zhushu font12 gray"><span>'+ itm.passTypeCn + '</span><span>'+ itm.count + '注'+ itm.wagerMultiple+ '倍</span><span>'+ itm.money + '元</span></p>'+
                      '</div>';
              }

          }else if(key == 'UP3' || key == 'UP6' || key == 'UP3R' || key == 'UP6R'){
              var arr = obj['content'][key];
              for(var i=0;i<arr.length;i++){
                  var itm = arr[i];
                  html += '<div class="clearfix">'+
                      '<p class="number">'+
                      '<span class="gray">';
                  for(var j=0;j<itm.hao.length;j++){
                      html += '<i>' + itm.hao[j] + '</i>';
                  }
                  html +=			'</span>'+
                      '</p>'
                  '<p class="zhushu font12 gray"><span>'+ itm.passTypeCn + '</span><span>'+ itm.count +'注'+ itm.wagerMultiple+ '倍</span><span>'+ itm.money + '元</span></p>'+
                  '</div>'
              }
          }else if(key == 'IH' || key == 'IHR' || key == 'UH3' || key == 'UH6'|| key == 'UH3R' || key == 'UH6R'){
              var arr = obj['content'][key];
              for(var i=0;i<arr.length;i++){
                  var itm = arr[i];
                  html += '<div class="clearfix">'+
                      '<p class="number">'+
                      '<span class="gray">';
                  for(var j=0;j<itm.hao.length;j++){
                      html += '<i>' + itm.hao[j] + '</i>';
                  }
                  html +=         '</span>'+
                      '</p>'+
                      '<p class="zhushu font12 gray"><span>'+ itm.passTypeCn +'</span><span>'+ itm.count + '注'+ itm.wagerMultiple+ '倍</span><span>'+ itm.money +'元</span></p>'+
                      '</div>';
              }
          }else{
              html += '其他玩法';
          }
      }
      this.wrapB.html(html);
  }
  
  planDetailObj.formatHtmlB = function(obj){
	  var self = this;
	  var lotteryType = obj.lotteryInfo.lotteryType;
//	  console.log(obj.head.lottery_type_cn)
	  // TODO 非常奇怪，应该判断英文代号的
	  switch(obj.head.lottery_type_cn){
		  case '超级大乐透':
		  	  self.formatDltHtml(obj);
			  break;
		   case '双色球':
		  	  self.formatDltHtml(obj);
			  break;
		  case '排列三':
		  	  self.formatPl3Html(obj);
			  break;
		  case '排列五':
		  	  self.formatPl5Html(obj);
			  break; 
		  case '七星彩':
		  	  self.formatQxcHtml(obj);
			  break;
		  case '广西11选5':
		  	  self.formatFastHtml(obj);
			  break;
			case '江西快3':
		  	  self.formatFastK3Html(obj);
			  break;
			case '吉林快3':
		  	  self.formatFastK3Html(obj);
			  break;
		  case '广东11选5':
		  	   self.formatFastHtml(obj);
			  break;
		  case '福彩3D':
              self.formatD3Html(obj);
              break;
		  default:
              if (lotteryType === ConfigObj.fastK3Type) self.formatFastK3Html(obj);
	  }
	   
  }
  
  planDetailObj.formatHtmlC = function(obj){
	 var self = this;
	 var html = '';
	 var data = obj.child;
	 if(!data) return;
	 html += '<div class="w94 mt8">'+
					'<p class="detail_tit clearfix">'+
						//'<span class="fl">'+ obj.head.run_status_cn +'</span>'+
						'<span class="fl">追号进度</span>'+
						'<span class="fr font12">已追'+ data.actual_exec_count + '期<em class="gray"> / 共'+ data.expect_exec_count+'期</em></span>'+
					'</p>'+
			  '</div>';
	 html += '<div class="betlist detail_con">'+
				'<div class="listbg"></div>'+
				'<div class="listwrap">'+
					'<div class="lists">';
		 if(!data.list) return;
		 for(var i=0;i<data.list.length;i++){
			var itm = data.list[i];
			var status = self.getPrizeStatus(itm,obj.head);
			html += '<div class="libox detail_zh font12" >'+
						'<div class="zh_li" data-t="project" data-i="'+ itm.lottery_id +'">'+
							'<p class="clearfix mb10">'+
								'<span class="fl font14">第<em class="qs">'+ itm.num + '</em>期</span>'+
								 status +
							'</p>'+
							'<p class="clearfix">'+
								'<span class="fl"><em class="gray">投注金额：</em><em class="fontred">￥'+ itm.money + '</em></span>'+
								'<span class="fr gray">'+ itm.lottery_no + '期'+  itm.build_time + '</span>'+
							'</p>'+
						'</div>'+
					'</div>'; 
		 }
	 html += '</div>'+
	 		'</div>'+
			'</div>';		
	 this.wrapC.html(html);
  }
  
  planDetailObj.getPrizeStatus = function(itm){
	 var self = this;
	 var status = '';
	 if(self.consign_type == 'Save'){
		 if(itm.raw_prize > 0){
			 status = '<span class="fr fontred"><strong>中'+ itm.raw_prize+ '元</strong></span>';	
		 }else if(itm.lottery_id > 0){
			 if(itm.prize_status == 'Not'){
				status = '<span class="fr gray">待开奖</span>'; 
			 }else{
				status = '<span class="fr gray">未中奖</span>';
			 }
		 }
	 }else{
		 if(itm.raw_prize > 0){
			if(itm.print_status == 'yes'){
				status = '<span class="fr fontred"><strong>中'+ itm.raw_prize+ '元</strong></span>';	
			}else{
				status = '<span class="fr gray"><strong>中'+ itm.raw_prize + '元</strong></span>';
			}
		}else if(itm.print_status != 'yes'){
			status = '<span class="fr gray">'+ (itm.print_status_cn ? itm.print_status_cn : '') + '</span>';
		}else if(itm.print_status == 'yes'){
			if(itm.prize_status == 'Not'){
				status = '<span class="fr gray">待开奖</span>';	
			}else{
				status = '<span class="fr gray">未中奖</span>';
			}
		}
	}
	return status;    
  }
  
  planDetailObj.getData = function(id){
	  var self = this;
	  self.plan_id = id;  
	  //console.log('追号详情plan_id : ' + self.plan_id);
	  var postData = {
		 'planid': id,
		 'access_token' : loginObj.access_token  
	  }
	  $.ajax({
		url : ConfigObj.localSite +  '?version=1&m=user.plan.index',
		type:'post',
		data: postData,
		dataType:'json',
		success:function(obj){
//			console.log('追号详情返回数据: ', obj);
			if(obj.code == '0000'){
				self.lotteryInfo = obj.info.lotteryInfo;
				self.consign_type = obj.info.head.consign_type;
				self.formatHtmlA(obj.info);
				self.formatHtmlB(obj.info);
				self.formatHtmlC(obj.info);
				
			}else{
				$.alertMsg(obj.code_str);
			}
		}
	  })
  }
  
  //继续守号
  planDetailObj.goBet = function(){
	 var self = this;
	 var wagerStore = self.lotteryInfo.wagerStore;
	 var nowLotteryNo = self.lotteryInfo.nowLotteryNo;
	 var lotteryType = self.lotteryInfo.lotteryType.toLowerCase();
	 if(!wagerStore || !lotteryType || !nowLotteryNo){
        $.alertMsg("数据错误");
        return false;
     }
	 var wagerArr = wagerStore.split(";");

      if (lotteryType === ConfigObj.fastK3Type) {
		  var result = [];
          wagerArr.forEach(function (v) {
              var tt = v.split('|');
              if (tt[1] === 'TX') v = '255+255+255|TX|1'; // 三同号通选
              if (tt[1] === 'LTX') v = '255+255+255|LTX|1'; // 三连号通选
              if (tt[1] === 'TXD2') { // 二同号单选
                  var tmp = tt[0].split(':');
                  v = tmp[0] + '|' + tmp[1] + '|TXD2|' + tt[2];
              }

              if ((tt[1] === 'BT3' || tt[1] === 'BT2') && tt[0].indexOf('$') !== -1) { // 三不同胆拖、二不同胆拖
                  var tmp = tt[0].split('$');
                  var tmpDan = []; // 胆码
                  tmp[0].split(',').forEach(function (vd) {
                      tmpDan.push('d-' + vd);
                  });
                  v = tmp[1] + ',' + tmpDan.join(',') + '|' + tt[1] + '_D|' + tt[2];
              }

              result.push(v);
          });

          wagerArr = result;
      } else {
          for (var i = 0, ilen = wagerArr.length; i < ilen; i++) {
              wagerArr[i] = wagerArr[i].replace(/\+/g, "|");
              if (wagerArr[i].indexOf("$") < 0)continue;
              var betArr = wagerArr[i].split("|");
              for (var k = 0, klen = betArr.length; k < klen; k++) {
                  if (betArr[k].indexOf("$") < 0)continue;
                  var data = betArr[k].split("$");
                  var temdata = new Array();
                  var danArr = data[0].split(",");
                  for (var d = 0, dlen = danArr.length; d < dlen; d++) {
                      temdata.push("d-" + danArr[d]);
                  }
                  data[0] = temdata.join(",");
                  betArr[k] = data.join(",");
              }
              wagerArr[i] = betArr.join("|");
          }
      }


	  var wagerData = wagerArr.join(";");
	  if(wagerData.length > 800){
		$.alertMsg("当前方案太复杂暂不支持");
		return false;
	  }
	 //先清空旧有数据
	 window.localStorage.removeItem(lotteryType + 'lotteryBetData');
	 window.localStorage.removeItem(lotteryType + 'lotteryAllBetData');
	 window.localStorage.removeItem(lotteryType + 'MulAndPer');
	 
	 //路由待优化 zhangw
	 var confirmData = {
			'lotteryType': lotteryType,
			'lotteryCnName': self.lotteryInfo.lotteryTypeCn,
			'lotteryNo' : nowLotteryNo
	 }
	 Global.GC();
	 //console.log('数字彩守号wagerStore', wagerData);
	 window.localStorage.setItem(lotteryType + "lotteryBetData", wagerData);
	  var betType = lotteryType;

      if (ConfigObj.syx5Type.indexOf(lotteryType) !== -1) {
          ConfigObj.fastLotType = lotteryType;
          betType = 'fastBet';
	  }

      if (lotteryType === ConfigObj.fastK3Type) betType = 'fastK3';

	 window[betType + 'ConfirmObj'].goBack = function(){
		  window[betType + 'Obj'].show('reload');
	 }
	 window[betType + 'Obj'].goBack = function(){
		  Global.GC();
		  homeObj.show(); 
	 }
	 window[betType + 'ConfirmObj'].show('reload',function(){
		 window[betType + 'ConfirmObj'].setData(confirmData)
		 //projectDetailObj.destroy();  
	  });
  }

  planDetailObj.onloadExecution = function(){
	this.setDefConfig();
    this.createDom();
    this.createEvent();
  }

  planDetailObj.init = function(){
      planDetailObj.onloadExecution();
  }
  
  planDetailObj.setDefConfig = function(){
	  this.plan_id = '';
	  this.lotteryInfo = '';
	  this.consign_type = '';   //save 保存
  }

  planDetailObj.dirShow = function (obj) {
      var self = this;
      self.show(true, function () {
          self.plan_id = (obj && obj.plan_id) ? obj.plan_id : '';
          self.getData(self.plan_id);
      });
  }

