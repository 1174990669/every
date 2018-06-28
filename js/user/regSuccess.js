
	var regSuccessObj =  new PageController({
	   'name': 'regSuccess',
	   'tpl' : 'template/user/regSuccess.html'
    });

	regSuccessObj.createDomObj = function(){
		
	}

	regSuccessObj.createEvent = function(){
		$('#regSuccess_backbtn').unbind('tap').tap(function(){
			regSuccessObj.goBack();
		})
		$('#regSuccess_home').unbind('tap').tap(function(){
			/*
			loginObj.goBack = function(){
				Global.GC();
				homeObj.show();
			}
			loginObj.goForward = function(){
				userCenterObj.show('reload');
			}
			loginObj.show();
			*/
			homeObj.show();
		})
		$('#regSuccess_realname').unbind('tap').tap(function(){
			regRealNameObj.goBack = function(){
				Global.GC();
				homeObj.show();	
			}
			var obj = {
				'from': 'userInfo',
					'accountName': 	regSuccessObj.accountName
			}
			regRealNameObj.show(true,function(){
				regRealNameObj.setData(obj)
			})
		})
	}
	
	regSuccessObj.setData = function(obj){
		if(obj){
			this.accountName = obj.accountName;	
		}
	}

	

	regSuccessObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
	}

	regSuccessObj.init = function(){
		regSuccessObj.onloadExecution();
	}
	
	regSuccessObj.setDefConfig = function(){
		this.accountName = ''; 
	}
	
	regSuccessObj.dirShow = function(){
		this.show();	
	}
	
   