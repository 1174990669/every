
  var modifyStationInfoObj = new PageController({
	   'name': 'modifyStationInfo',
	   'tpl' : 'template/user/modifyStationInfo.html'
    });

  modifyStationInfoObj.createDomObj = function(){
    this.wrapperObj = $("#modifyStationInfo_wrapperObj");
  }

  modifyStationInfoObj.createEvent = function(){
    this.wrapperObj.tap(function(e){
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "back" : modifyStationInfoObj.goBack();return true;
        }        
      }
      var spanObj = $.oto_checkEvent(e,"SPAN");
      if(spanObj){
        var thisObj = $(spanObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "del" : modifyStationInfoObj.delImg(thisObj);return true;
        }        
      }
	  var divObj = $.oto_checkEvent(e,"DIV");
      if(divObj){
        var thisObj = $(divObj);
        var thisT = thisObj.attr("data-t");
		////console.log(thisT);
        switch(thisT){
          case "img" : modifyStationInfoObj.getImage(thisObj);return true;
        }        
      }
	   
    });
	$('#modifyStationInfo_submit').unbind('tap').tap(function(){
		modifyStationInfoObj.submitFun();
	})
	
  }
  
  
  modifyStationInfoObj.initAreaEvent = function(){
	
	var selectArea = new MobileSelectArea();
	selectArea.init({trigger:'#modifyStationInfo_area',data:modifyStationInfoObj.cityData,default:1,position:"bottom",callback:function(node,txt,val){
		if(txt[1] == '北京市' || txt[1] == '天津市' || txt[1] == '上海市' || txt[1] == '重庆市'){
				txt[1] = ' ';
		}
		$('#modifyStationInfo_area').val(txt.join(' '));
		modifyStationInfoObj.locId = val[val.length-1] ? val[val.length-1] : val[0];
	}});  
  }
  
  modifyStationInfoObj.getImage = function(obj){
	   var parNode = obj.parents('.m-img');
	   var val = parNode.attr('data-v');
	   //console.log(val);
	   if(ConfigObj.platForm == 'android' && typeof android_obj != 'undefined'){
		   android_obj.getCamraImage(val); 
	   }else if(ConfigObj.platForm == 'ios' && typeof ios_obj != 'undefined'){
		   ios_obj.getCamraImage(val); 
	   }
  }
  
  modifyStationInfoObj.addImg = function(img,num){
	 // alert(img);
	 // alert(num);
		var parDiv = $('#modifyStationInfo_img_' + num);
		//alert(parDiv);
		//alert(parDiv.find('img'));
		// 把处理的好的图片给用户看看呗（可选）
		parDiv.find('.js_upload_1').show();
		parDiv.find('.js_upload_2').hide();
		parDiv.find('img').attr('src',img);
		var data = {
			num : num,
			img : img
		}
		modifyStationInfoObj.imgArr.push(data);
		if(parDiv.next('.m-img').length  == 0){
			modifyStationInfoObj.addEnter();
		}
		
  }
  
  modifyStationInfoObj.getMax = function(){
	 var arr = [];
	 for(var i=0;i<this.imgArr.length;i++){
		 var itm = this.imgArr[i];
		 if(itm && itm.num){
		 	arr.push(itm.num);
		 }
	 }
	 var maxNum = 0;
	 arr.sort(function(a,b){return a-b});
	 if(arr.length > 0){
		maxNum =  arr[arr.length -1] 
	 }
	 maxNum = parseInt(maxNum,10);
	 return maxNum;
  }
  
  
  //增加上传入口
  /*modifyStationInfoObj.addEnter = function(){
	  if(modifyStationInfoObj.imgArr.length >=10 ) return false;
	  var num = modifyStationInfoObj.getMax() + 1;
	  var str = '<div class="m-img"  data-v="'+ num +'" id="modifyStationInfo_img_'+  num +'">'+
                	'<div class="js_upload_1" style="display:none">'+
                    	'<img src="">'+
          				'<span class="img-del font12" data-t="del" data-v="'+  num +'"><em class="icon-sm del-sm"></em>删除</span>'+
                    '</div>'+
                    '<div class="js_upload_2 img-add gray" data-t="img">'+
                		'<em class="addImg_1">+图片</em>'+
						<!--<input type="file"  class="js_file_spe" capture="camera" accept="image*//*"  >-->
					'</div>'+
                '</div>';
	  $('#modifyStationInfo_imgWrap').append(str);
  }
  
  modifyStationInfoObj.delImg = function(obj){
	  var num = obj.attr('data-v');
	  var parDiv = obj.parents('.m-img');
	  //parDiv.find('.js_upload_1').hide();
	  //parDiv.find('.js_upload_2').show();
	  parDiv.remove();
	  var idx = -1;
	  for(var i=0;i<this.imgArr.length;i++){
		   var itm = this.imgArr[i];
		   if(itm.num == num){
				idx = i;   
		   }
	  }
	  if(idx != -1){
	  	this.imgArr.splice(idx,1)
	  }
	  var enterNum = $('#modifyStationInfo_imgWrap').find('.m-img').length
	  if(this.imgArr.length == enterNum ){
	     modifyStationInfoObj.addEnter();
	  }
  }
  
  
  /*modifyStationInfoObj.initFileEvent = function(){
	  $('#modifyStationInfo .js_file_spe').bind('change', function () {
			// this.files[0] 是用户选择的文件
			var node = this;
			//console.log(node);
			lrz(node.files[0], {width: 640})
				.then(function (rst) {
					//console.log(rst);
					var parDiv = $(node).parents('.m-img');
					// 把处理的好的图片给用户看看呗（可选）
					parDiv.find('.js_upload_1').show();
					parDiv.find('.js_upload_2').hide();
					parDiv.find('img').attr('src',rst.base64);
					var num = parDiv.attr('data-v');
					modifyStationInfoObj.imgArr[num] = rst;
					//console.log(modifyStationInfoObj.imgArr);
					return rst;
				})
		
				.then(function (rst) {
					
		            //modifyStationInfoObj
					return rst;
				})
		
				.catch(function (err) {
					// 万一出错了，这里可以捕捉到错误信息
					// 而且以上的then都不会执行
		
					//console.log(err);
				})
		
				.always(function () {
					// 不管是成功失败，这里都会执行
				});
	 });  
  }*/
  
  
  
  modifyStationInfoObj.getData = function(id){
	 var postData = {
		station_id : id
	 }
	 $.ajax({
		url : ConfigObj.localSite +  '?version=1&m=user.station.station_info',
		type:'post',
		data: postData,
		dataType:'json',
		success:function(obj){
			//console.log('管理站点信息接口返回 :',obj);
			if(obj.code == '0000'){
				modifyStationInfoObj.hideLoading();
				modifyStationInfoObj.formatHtml(obj.info);	
			}else{
				$.alertMsg(obj.code_str);
			}
		},
	  })    
	  
  }
  
  modifyStationInfoObj.hideLoading = function(){
	   $('#modifyStationInfo_loading').hide();
	   $('#modifyStationInfo_total').show();
  }
  
  modifyStationInfoObj.formatHtml = function(obj){
	//console.log(obj);
	 $('#modifyStationInfo_id').html(obj.station_id);
	 $('#modifyStationInfo_name').val(obj.station_name);
	 $('#modifyStationInfo_area').val((obj.province ? obj.province : '') + ' ' + obj.city + ' ' +  obj.district);
	 $('#modifyStationInfo_address').val(obj.address);
	 $('#modifyStationInfo_desc').val(obj.describe ? obj.describe  : '');
	 if(obj.area_list){
		var str = JSON.stringify(obj.area_list);
		////console.log(str);
		//console.log(typeof str);
		str = str.replace(/location_id/g,'id');
		str = str.replace(/province_name/g,'name');
		str = str.replace(/city_name/g,'name');
		str = str.replace(/district_name/g,'name');
		this.cityData = JSON.parse(str);
		this.initAreaEvent();
	 }
	 if(obj.location_id){
		this.locId =  obj.location_id;
	 }
  }
  
  modifyStationInfoObj.checkFun = function(){
	  if($('#modifyStationInfo_name').val() == ''){
		$.alertMsg('请填写站点名称');
		return false;  
	  }
	  if($('#modifyStationInfo_area').val() == ''){
		$.alertMsg('请选择站点区域');
		return false;  
	  }
	  if($('#modifyStationInfo_address').val() == ''){
		$.alertMsg('请填写站点地址');
		return false;  
	  }
	  if($('#modifyStationInfo_desc').val() == ''){
		$.alertMsg('请填写站点简介');
		return false;  
	  }
	  return true;
  }
  
  
  modifyStationInfoObj.submitFun = function(){
	 if(!this.checkFun()) return false;
	 var img = [];  // 暂时注释 zhangw
	 for(var i=0;i<this.imgArr.length;i++){
		if(this.imgArr[i]){
			img.push(this.imgArr[i].img);	
		}
	 }
	 var imgStr = '';
	 imgStr = img.join('#');
	 //console.log(imgStr);
	
	 /*if(img.length == 0){
		$.alertMsg('请至少上传一张图片');
		return false;  
	 }*/
	 var disArr = $('#modifyStationInfo_area').val().split(' ');
	 var disTxt = disArr[disArr.length -1];
	 var postData = {
		station_id : $('#modifyStationInfo_id').text(),
		station_name : $('#modifyStationInfo_name').val(),
		provice : disArr[0],
		city : disArr[1],
		district : disTxt,
		address : $('#modifyStationInfo_address').val(),
		describe : $('#modifyStationInfo_desc').val(),
		location_id : this.locId,
		image : imgStr,
		access_token : loginObj.access_token
	 }
	 $.ajax({
		url : ConfigObj.localSite +  '?version=1&m=user.station.addAudit',
		type:'post',
		data: postData,
		dataType:'json',
		success:function(obj){
			//console.log('提交修改站点信息接口返回 :',obj);
			if(obj.code == '0000'){
				$.alertMsg(obj.code_str,true);
				setTimeout(function(){
					modifyStationInfoObj.goBack();
				},1000)
			}else{
				$.alertMsg(obj.code_str);
			}
		},
	 })    
  }

  modifyStationInfoObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
  }

  modifyStationInfoObj.init = function(){
	  this.setDefConfig();
      modifyStationInfoObj.onloadExecution();
  }
  
  modifyStationInfoObj.setDefConfig = function(){
	 this.imgArr = [];  
	 this.cityData = '';
	 this.locId = '';
  }
  
  modifyStationInfoObj.goBack = function(){	
  }
	
	
   
  /*modifyStationInfoObj.dirShow = function(){
	modifyStationInfoObj.show('',function(){   //测试代码，记得测完删除 zhangw
		modifyStationInfoObj.getData("4401010012");	  //15501053088
	});  
  }*/

