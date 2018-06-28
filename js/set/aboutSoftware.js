
  var aboutSoftwareObj = new PageController({
	   'name': 'aboutSoftware',
	   'tpl' : 'template/set/aboutSoftware.html'
    });

  aboutSoftwareObj.createDomObj = function(){
    this.wrapperObj = $("#aboutSoftware_wrapper");
	if(ConfigObj.platForm == 'ios'){
		$('#aboutSoftware_sysem').html('ios8.0');
	}else if(ConfigObj.platForm == 'android'){
		$('#aboutSoftware_sysem').html('Android 2.0');	
	}
  }

  aboutSoftwareObj.createEvent = function(){
    this.wrapperObj.unbind('tap').tap(function(e){
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "back" : aboutSoftwareObj.goBack();return true;
        }        
      }
    });
  }

  aboutSoftwareObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
  }

  aboutSoftwareObj.init = function(){
      aboutSoftwareObj.onloadExecution();
  }
  
  aboutSoftwareObj.goBack = function(){	
  }
	
	aboutSoftwareObj.setDefConfig = function(){
		 
	}
	
   

