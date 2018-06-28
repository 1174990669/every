
  var stationInfoObj = new PageController({
	   'name': 'stationInfo',
	   'tpl' : 'template/station/stationInfo.html'
    });

  

  stationInfoObj.createDom = function(){
    this.mapObj = $("#stationInfo_mapObj");
	this.headObj = $('#stationInfo_header');
	this.nameObj = $('#stationInfo_nameObj');
	this.idObj = $('#stationInfo_idObj');
	this.addressObj = $('#stationInfo_addressObj');
	this.backObj = $('#stationInfo_backbtn');
	
	this.nameObj.html('电话 ' + (this.phone? this.phone : ''));
	this.idObj.html('No.' + (this.id? this.id : ''));
	this.addressObj.html('地址 ' + (this.address?this.address:''));
  }
  
  stationInfoObj.createEvent = function(){
	  this.backObj.unbind('tap').tap(function(){
		 stationInfoObj.goBack();  
	  })
  }
  
  stationInfoObj.createMapDivHeight = function(){
	if(!this.mapX) return;
    var bodyHieght = $("body").height();
    var headHeight = this.headObj.height();
	////console.log(bodyHieght-headHeight);
    this.mapObj.height(bodyHieght-headHeight);
  }

  stationInfoObj.createMap = function(){
	if(!this.mapX) return;
	//$('#stationInfo_mapObj').html('');
    var map = new BMap.Map("stationInfo_mapObj");  
	////console.log(map);
    var point = new BMap.Point(this.mapX, this.mapY);
    var marker = new BMap.Marker(point);    
    map.addOverlay(marker);
    map.centerAndZoom(point, this.mapZ);  
  }

  stationInfoObj.onloadExecution = function(){
    this.createDom();
    this.createMapDivHeight();
    this.createMap();
	this.createEvent();
  }

  stationInfoObj.init = function(){
	// $(function(){
     	stationInfoObj.onloadExecution();
	// })
  }
   
  stationInfoObj.setData = function(obj){
	  this.mapX = obj.mapX;
  	  this.mapY = obj.mapY;
      this.mapZ = obj.mapZ ? obj.mapZ : 16;
      this.id = obj.id;
      this.phone = obj.phone;
	  this.address = obj.address;
	
  }
  
  //根据sid ajax获取站点信息
  stationInfoObj.getData = function(sid){
	  var self = this;
	  $.ajax({
			url : ConfigObj.localSite +  '?version=1&m=user.station.getStationInfo',
			data : {'id': sid,'access_token':loginObj.access_token},
			dataType : "json",
			type : "post",
			success : function(msg){
				//console.log('站点信息返回',msg);
				if(msg.code == '0000'){
					////console.log(msg.info);
					self.mapX = msg.info.longitude;
					self.mapY = msg.info.latitude;
					self.mapZ = 16;
					self.phone = msg.info.phone;
					self.id = msg.info.station_id;
					self.address = msg.info.address;
					//self.init();
					setTimeout(function(){
						self.init();
					},1000)
				}else{
					$.alertMsg(msg.code_str);
				}
			}
		});
	  
  }
  
    stationInfoObj.setDefConfig = function(){
		this.mapX = '';
  		this.mapY = '';
  		this.mapZ = 16;
		this.id = '';
		this.phone = '';
		this.address = '';
	}
	
	
