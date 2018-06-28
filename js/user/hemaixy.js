
	var hemaixyObj =  new PageController({
	   'name': 'hemaixy',
	   'tpl' : 'template/user/hemaixy.html'
    });

	hemaixyObj.createDomObj = function(){
		this.backObj = $('#hemaixy_backbtn');
	}

	hemaixyObj.createEvent = function(){
		this.backObj.unbind('tap').tap(function(){
			hemaixyObj.goBack();
		})
	}

	

	hemaixyObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
	}

	hemaixyObj.init = function(){
		hemaixyObj.setDefConfig();
		hemaixyObj.onloadExecution();
	}
	
	hemaixyObj.setDefConfig = function(){
		 
	}
	