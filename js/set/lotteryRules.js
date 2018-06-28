
  var lotteryRulesObj = new PageController({
	   'name': 'lotteryRules',
	   'tpl' : 'template/set/lotteryRules.html'
    });

  lotteryRulesObj.createDomObj = function(){
    this.wrapperObj = $("#lotteryRules_wrapperObj");
	this.topTitObj = $('#lotteryRules_topTit');
  }

  lotteryRulesObj.createEvent = function(){
    this.wrapperObj.tap(function(e){
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "backbtn" : lotteryRulesObj.goBack();return true;
        }
      }
      var liObj = $.oto_checkEvent(e,"LI");
      if(liObj){
        var thisObj = $(liObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "upd" : lotteryRulesObj.updateType(thisObj);return true;
        }
      }
    });
  }

  lotteryRulesObj.updateType = function(obj){
    var thisV = obj.attr("data-v");
    obj.siblings('li').removeClass('on');
    obj.addClass('on');
	var section = this.wrapperObj.find('section[data-v="' + this.lotteryType + '"]');
	var divs = section.find('[data-t="rulesType"]')
	divs.hide();
	divs.filter('[data-v="'+thisV+'"]').show();
  }

  lotteryRulesObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
  }

  lotteryRulesObj.init = function(){
      lotteryRulesObj.onloadExecution();
  }
  
  lotteryRulesObj.setDefConfig = function(){
	 this.lotteryType = '';
	 this.rulesType = '';   
  }

  /**
   * 设置页面数据
   * @param lotteryType 彩种
   * @param rulesType 规则类型：prize 奖级设置, play 玩法规则
   */
  lotteryRulesObj.setData = function(lotteryType,rulesType){
	  this.lotteryType = lotteryType;
	  this.rulesType = rulesType;
	  var cnObj = {
		 'dlt': '大乐透',
		 'ssq': '双色球',
		 'pl3': '排列三',
		 'pl5': '排列五',
		 'qxc': '七星彩',
		 'tjsyy': '11选5',
		 'gd11x5': '粤11选5',
     'gx11x5': '桂11选5',
		 'hub11x5': '鄂11选5',
     'sd11x5': '鲁11选5',
     'xj11x5': '新11选5',
     'jx11x5': '江西11选5',
		 'gxk3' : '广西快3',
		 'jxk3':'江西快3',
		 'jlk3':'吉林快3',
		 'hn4j1': '海南4+1',
		 'FTFH': '竞足混投',
		 'SPF9': '任选九',
		 'SPF14': '胜负彩',
		 'BSKFH': '竞篮混投',
     'd3': '福彩3D'
	  }
	  this.topTitObj.html(cnObj[lotteryType]);
	  var conBox = this.wrapperObj.find('section');
	  //conBox.hide();
	  for(var i=0;i<conBox.length;i++){
		conBox[i].style.display = 'none';
		var lotType = conBox[i].getAttribute('data-v');
		if(lotType == lotteryType){
			//$(conBox[i]).show();
			 conBox[i].style.display = 'block';
			var node = $(conBox[i]).find('li[data-v="' + rulesType + '"]');
			lotteryRulesObj.updateType($(node));
		}
	  }
	  
	  
  }
  
   
