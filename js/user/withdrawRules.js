
	var withdrawRulesObj = new PageController({
	   'name': 'withdrawRules',
	   'tpl' : 'template/user/withdrawRules.html'
    });

	withdrawRulesObj.createDomObj = function(){
		this.backObj = $('#withdrawRules_backbtn');
	}

	withdrawRulesObj.createEvent = function(){
		this.backObj.unbind('tap').tap(function(){
			withdrawRulesObj.goBack();
		})
	}

	

	withdrawRulesObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
	}

	withdrawRulesObj.init = function(){
		withdrawRulesObj.onloadExecution();
	}
	
	withdrawRulesObj.setDefConfig = function(){
		 
	}
	
   