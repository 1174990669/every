
	var protocolObj =  new PageController({
	   'name': 'protocol',
	   'tpl' : 'template/user/protocol.html'
    });

	protocolObj.createDomObj = function(){
		this.backObj = $('#protocol_backbtn');
	}

	protocolObj.createEvent = function(){
		this.backObj.unbind('tap').tap(function(){
			protocolObj.goBack();
		})
	}

	

	protocolObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
	}

	protocolObj.init = function(){
		protocolObj.setDefConfig();
		protocolObj.onloadExecution();
	}
	
	protocolObj.setDefConfig = function(){
		 
	}
	
   