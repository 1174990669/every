
	var alipayWapObj = new PageController({
	   'name': 'alipayWap',
	   'tpl' : 'template/user/alipayWap.html'
    });


	alipayWapObj.createDomObj = function(){
		
	}

	alipayWapObj.createEvent = function(){
		
	}
	
	
	
	alipayWapObj.setData = function(obj){
		var html = '';
//		html += obj.form;
		html += '<div>'+11111+'</div>'
//		document.getElementById("alipayWap_wrapObj").innerHTML = html;
		$('#alipayWap_wrapObj').append(html);

	}
	
	

    alipayWapObj.setDefConfig = function(){
		this.form = "";
	}

	alipayWapObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
		
//		this.setData();
	}

	alipayWapObj.init = function(){
		this.setDefConfig();
		alipayWapObj.onloadExecution();
	}
	
	
