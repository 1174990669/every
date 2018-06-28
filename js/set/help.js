
  var helpObj = new PageController({
	   'name': 'help',
	   'tpl' : 'template/set/help.html'
    });

  helpObj.createDomObj = function(){
    this.wrapperObj = $("#help_wrapperObj");
  }

  helpObj.createEvent = function(){
    this.wrapperObj.unbind('tap').tap(function(e){
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "back" : helpObj.goBack();return true;
          case "feedback": helpObj.goFeedback();return true;
        }
      }
      var liObj = $.oto_checkEvent(e,"LI");
      if(liObj){
        var thisObj = $(liObj);
        var thisT = thisObj.attr("data-t");
        var thisV = thisObj.attr("data-v");
        switch(thisT){
          case "help" :  helpObj.goHelp(thisV);return true;
          case "rules" : helpObj.goRules(thisV);return true;
        }
      }
    });
  }

  helpObj.goHelp = function(thisV){
	helpDetailObj.goBack=function(){
		helpDetailObj.destroy();
		helpObj.show();	
	}
	helpDetailObj.show('reload',function(){
		helpDetailObj.setData(thisV);
	})
  }

  helpObj.goRules = function(thisV){
    if(thisV == "lotterywdl" || thisV == "bask" || thisV == "wdl"){
      $.alertMsg("正在建设中");
      return false;
    }
	lotteryRulesObj.goBack = function(){
		lotteryRulesObj.destroy();
		helpObj.show();	
	}
    lotteryRulesObj.show('reload',function(){
		lotteryRulesObj.setData(thisV,'prize');
	})
  }

  helpObj.goFeedback = function () {
      feedbackObj.goBack = function () {
          feedbackObj.destroy();
          settingObj.show();
      };
      feedbackObj.show('reload', function () {
      });
  };

  helpObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
  }

  helpObj.init = function(){
      helpObj.onloadExecution();
  }
  
  helpObj.setDefConfig = function(){
		 
  }
	
  
