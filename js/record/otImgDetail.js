
  var otImgDetailObj = new PageController({
	   'name': 'otImgDetail',
	   'tpl' : 'template/record/otImgDetail.html'
    });

  otImgDetailObj.createDomObj = function(){
    this.wrapperObj = $("#otImgDetail_wrapperObj");
  }

  otImgDetailObj.createEvent = function(){
    this.wrapperObj.tap(function(e){
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "back" : otImgDetailObj.goBack();return true;
        }        
      }
     
    });
  }
  
  otImgDetailObj.getData = function(id){
	    if(id){
			id = id.replace('x','');
	    	$('#otImgDetail_img1').html('<img src="images/ticket/' + id + '_f.jpg"  style="width:90%"/>');
			$('#otImgDetail_img2').html('<img src="images/ticket/' + id + '_b.jpg"  style="width:90%"/>');
		}
  }
  

  otImgDetailObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
  }

  otImgDetailObj.init = function(){
      otImgDetailObj.onloadExecution();
  }
  
  otImgDetailObj.goBack = function(){	
  }
	
	
   
  otImgDetailObj.dirShow = function(){
	otImgDetailObj.show();  
  }

