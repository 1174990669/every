
  var qupiaoPwdObj = new PageController({
	   'name': 'qupiaoPwd',
	   'tpl' : 'template/station/qupiaoPwd.html'
    });
  

  qupiaoPwdObj.setData = function(arr){
	 var self = this;
	 this.idArr = arr.slice();  
	 var dataObj = {
		'tid' : arr.join(','),
		'access_token': loginObj.access_token
	 }
	 $.ajax({
		 url : ConfigObj.localSite +  '?version=1&m=user.ticketOrder.index',
		 type:'POST',
		 data:dataObj,
		 dataType:'json',
		 success:function(obj){
			//console.log('取票详情接口数据', obj);
			if(obj.code == '0000'){
				self.stepCon.get(0).className = 'pwdjdt step' + obj.info.step_status;
				var html = obj.info.is_get == 'N' ? '<span style="color:gray">' + obj.info.ticketpwd + '</span>'  : obj.info.ticketpwd;
				self.pwdCon.html(html);
				self.formatHtmlA(obj.info);
				self.formatHtmlB(obj.info);
			}else{
				$.alertMsg(obj.code_str);
			}
			
		 }
	  })
  }
  
  qupiaoPwdObj.formatHtmlA = function(obj){
	  var html = '<p class="clearfix">'+
					'<span class="fl font16"><!-- obj.get_statuscn  --></span>'+
					'<span class="fr">已打'+ obj.got_num + '/<em class="gray">' + obj.total_num + '张</em></span>'+
				'</p>'+
				'<p class="jdtwrap">'+
					'<span class="jdt" style="width:'+ obj.printing_rate + '%;"></span>'+
				'</p>';
	  this.wrapA.html(html);
  }
  
   qupiaoPwdObj.formatHtmlB = function(obj){
	   var html = '<div class="orderbox"  data-id="'+ obj.lottery_id + '">'+
					  '<h3 class="mb10 clearfix" data-t="detail" data-v="'+ obj.lottery_id + '">'+
						  '<span class="fl">'+ obj.lottery_cn + '</span>'+
						  '<span class="fr font12"><em>'+ obj.prize_status + '</em><em class="rtarrow icon"></em></span>'+
					  '</h3>'+
					  '<p class="font12 mb10 clearfix">'+
						  '<span class="fl fontred">￥'+ obj.amount + '</span>'+
						  '<span class="fr gray">'+ obj.lottery_no + '</span>'+
					  '</p>'+
					  '<p class="font12 gray clearfix">'+
						  '<span class="fl">'+ obj.addTime + '</span>';
	  if(obj.get_status=='on' || obj.get_status=='not'){
		 html += ' <span class="fr"><a href="javascript:void(0);" class="fontblue" data-t="cancel" data-v="'+ obj.lottery_id + '">撤销取票</a></span>';
	  }else if(obj.get_status=='yes'){
		 html += '<span class="fr">已完成</span>';  
	  }else{
		 html += '<span class="fr">已过期</span>';
	  }
	  html += '</p></div>';
	  this.wrapB.html(html);
   }

 
  qupiaoPwdObj.createDomObj = function(){
	this.wrapObj = $('#qupiaoPwd_wrap');
	this.pwdBtn = $('#qupiaoPwd_pwdBtn');  //生成密码
	this.newPwdBtn = $('#qupiaoPwd_newPwdBtn');  //重获密码
	this.pwdCon = $('#qupiaoPwd_pwdCon');
	this.backBtn = $('#qupiaoPwd_backbtn');  //回退按钮
	this.helpBtn = $('#qupiaoPwd_helpbtn');     //帮助按钮
	this.stepCon = $('#qupiaoPwd_step');
	this.wrapA = $('#qupiaoPwd_wrapA');
	this.wrapB = $('#qupiaoPwd_wrapB');
  }

  qupiaoPwdObj.createEvent = function(){
	 this.backBtn.unbind('tap').tap(function(){
		 qupiaoPwdObj.goBack(); 
	 })
	 this.helpBtn.unbind('tap').tap(function(){
		 qupiaoPwdObj.goQupiaoHelp(); 
	 })
	 
	 this.wrapObj.unbind('tap').tap(function(e){
		 var hObj = $.oto_checkEvent(e,"H3");
		 if(hObj){
			var thisObj = $(hObj);
			var thisT = thisObj.attr("data-t");
			switch (thisT){
				case "detail" : qupiaoPwdObj.goProjectDetail(thisObj.attr('data-v'));return true;
			}
		 }
		 
		 var aObj = $.oto_checkEvent(e,"A");
		 if(aObj){
			var thisObj = $(aObj);
			var thisT = thisObj.attr("data-t");
			switch (thisT){
				case "cancel" : qupiaoPwdObj.cancelTicket(thisObj.attr('data-v'));return true;
			}
		 }
	 })
	 
  }
  
  qupiaoPwdObj.goProjectDetail = function(id){
	  
	  projectDetailObj.show('reload',function(){
		projectDetailObj.getData(id);
		projectDetailObj.pushRoute(function(){  //路由机制
			qupiaoPwdObj.show();
		})  
	  })
  }
  
  
  
  qupiaoPwdObj.goQupiaoHelp = function(){
	  helpDetailObj.goBack = function(){
		 helpDetailObj.destroy();
		 qupiaoPwdObj.show();  
	  }
	  helpDetailObj.show('reload',function(){
		  helpDetailObj.setData('qupiao');  
	  })
  }
  
  qupiaoPwdObj.cancelTicket = function(id){
	  var postData = {
		'lottery_id' : id,
		'access_token': loginObj.access_token  
	  }
	  $.ajax({
		 url : ConfigObj.localSite +  '?version=1&m=user.account.cancelTicketSelfGet',
		 type:'post',
		 data:postData,
		 dataType:'json',
		 success:function(obj){
			if(obj.code == '0000'){
				$.alertMsg('撤销成功',true);
				setTimeout(function(){
					qupiaoPwdObj.goBack();
				},1000)
			}else{
				$.alertMsg(obj.code_str);
			}
			
		 }
	  })
	  
  }
  
  qupiaoPwdObj.getPwdFun = function(){
	 /* this.pwdBtn.hide();
	  this.newPwdBtn.hide();
	  var dataObj = {
	  }
	  $.ajax({
		 url:'../json/tickequpiaoPwdObjetail.json',
		 type:'GET',
		 data:dataObj,
		 dataType:'text',
		 success:function(data){
			var obj = eval('(' + data + ')');
			if(obj.code == 0){
				qupiaoPwdObj.pwd = obj.info.pwd;
			}else{
				qupiaoPwdObj.pwd = '';
				//qupiaoPwdObj.newPwdBtn.show();
				//$.alertMsg(obj.error);	
			}
			qupiaoPwdObj.checkAjaxEnd = true;
		 }
		  
	  })
	  qupiaoPwdObj.time = 0;
	  qupiaoPwdObj.timer = setInterval(function(){
		  if(qupiaoPwdObj.time == 60){
			clearInterval(qupiaoPwdObj.timer);
			qupiaoPwdObj.time = 0;
			if(qupiaoPwdObj.pwd){
				qupiaoPwdObj.pwdCon.html(qupiaoPwdObj.pwd);	
				return false;
			}else{
				qupiaoPwdObj.pwdCon.html('');	
				qupiaoPwdObj.newPwdBtn.show();
				return false;
			}
		  }
		  qupiaoPwdObj.time++
		  var pwd = qupiaoPwdObj.getRandomPwd();
		  qupiaoPwdObj.pwdCon.html(pwd);
	  },  50)*/
  
  }
  
  qupiaoPwdObj.getRandomPwd = function(){
	  var arr = [];
	  for(var i=0;i<5;i++){
	  	var randomNum = Math.floor(Math.random()*9);
		arr.push(randomNum);
	  }
	  return arr.join('');
  }

  qupiaoPwdObj.onloadExecution = function(){
	this.setDefConfig();
    this.createDomObj();
    this.createEvent();
  }

  qupiaoPwdObj.init = function(){
     qupiaoPwdObj.onloadExecution();
  }
  
  qupiaoPwdObj.setDefConfig = function(){
	    qupiaoPwdObj.idArr = [];   //方案id数组
		qupiaoPwdObj.flag = false;
  		qupiaoPwdObj.pwd = '';
  }
	
   
