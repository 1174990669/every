
  var helpDetailObj = new PageController({
	   'name': 'helpDetail',
	   'tpl' : 'template/set/helpDetail.html'
    });

  helpDetailObj.createDomObj = function(){
    this.wrapperObj = $("#helpDetail_wrapperObj");
	this.topTitObj = $('#helpDetail_tit');
  }

  helpDetailObj.createEvent = function(){
    this.wrapperObj.unbind('tap').tap(function(e){
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "backbtn" : helpDetailObj.goBack();return true;
        }
      }
    });
  }

  helpDetailObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
  }

  helpDetailObj.init = function(){
      helpDetailObj.onloadExecution();
  }
  
  helpDetailObj.setDefConfig = function(){
	 this.rulesType = '';   
  }
  
  helpDetailObj.setData = function(type){
	  this.rulesType = type;
      var cnObj = {
          'login': '注册登录',
          'bet': '投注追号',
          'recharge': '账户充值',
          'draw': '兑奖提款',
          'handsel': '红包积分',
          'safe': '账户安全',

          'hemai': '合买跟单',
          'ticket': '站点取票',
          'qupiao': '取票帮助',
          'prizetool': '奖金优化',
          'seniorPlan': '高级追号',
          'lotDesc': '彩票术语'
      }
	  this.topTitObj.html(cnObj[type]);
	  var conBox = this.wrapperObj.find('section');
	  conBox.hide();
	  for(var i=0;i<conBox.length;i++){
		var nodeType = conBox[i].getAttribute('data-v');
		if(nodeType == type){
			$(conBox[i]).show();
		}
	  }
	  
	  
  }
  
   
