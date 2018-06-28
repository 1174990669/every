
  var aboutUsObj = new PageController({
	   'name': 'aboutUs',
	   'tpl' : 'template/set/aboutUs.html'
    });

  aboutUsObj.createDomObj = function(){
    this.wrapperObj = $("#aboutUs_wrapperObj");
	$('#aboutUs_version').html(ConfigObj.version);
    if (ConfigObj.platForm == 'ios') $('#aboutUs_platform').html('IOS');
  }

  aboutUsObj.createEvent = function(){
    this.wrapperObj.tap(function(e){
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "back" : aboutUsObj.goBack();return true;
        }        
      }
      var liObj = $.oto_checkEvent(e,"LI");
      if(liObj){
        var thisObj = $(liObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "protocol" : aboutUsObj.goProtocol();return true;
          case "aboutsoftware" : aboutUsObj.goAboutSoftware();return true;
        }        
      }
    });
  }
  
  aboutUsObj.goAboutSoftware = function(){
	  aboutSoftwareObj.goBack = function(){
		  aboutSoftwareObj.destroy();
		  aboutUsObj.show();
	  }
	  aboutSoftwareObj.show();
	  
  }
  
  aboutUsObj.goProtocol = function(){
	 protocolObj.goBack = function(){
		 protocolObj.destroy();
		 aboutUsObj.show(); 
	 }
	 protocolObj.show();
  }

  aboutUsObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
  }

  aboutUsObj.init = function(){
      aboutUsObj.onloadExecution();
  }
  
  aboutUsObj.goBack = function(){	
  }
	
	
   
  aboutUsObj.dirShow = function(){
	aboutUsObj.show();  
  }

