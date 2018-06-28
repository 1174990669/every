
  var stationListMapObj = new PageController({
	   'name': 'stationListMap',
	   'tpl' : 'template/station/stationListMap.html'
    });

  

  stationListMapObj.createDom = function(){
    this.mapObj = $("#stationListMap_mapObj");
	this.headObj = $('#stationListMap_header');
	
	this.backObj = $('#stationListMap_backbtn');
	
  }
  
  stationListMapObj.createEvent = function(){
	  this.backObj.unbind('tap').tap(function(){
		 stationListMapObj.goBack();  
	  })
  }
  
  stationListMapObj.createMapDivHeight = function(){
    var bodyHieght = $("body").height();
    var headHeight = this.headObj.height();
	////console.log(bodyHieght-headHeight);
    this.mapObj.height(bodyHieght-headHeight+20);
  }

  stationListMapObj.createMap = function(){
	if(!this.mapX) return;
	//$('#stationListMap_mapObj').html('');
    var map = new BMap.Map("stationListMap_mapObj");  
	////console.log(map);
    var point = new BMap.Point(this.mapX, this.mapY);
    var marker = new BMap.Marker(point);    
    map.addOverlay(marker);
    map.centerAndZoom(point, this.mapZ);  
  }

  stationListMapObj.onloadExecution = function(){
    this.createDom();
    this.createMapDivHeight();
    //this.createMap();
	this.createEvent();
  }

  stationListMapObj.init = function(){
	// $(function(){
     	stationListMapObj.onloadExecution();
	// })
  }
   
  stationListMapObj.setData = function(obj,spe){
	//console.log(obj);
	//console.log(spe);
	var points = [];
	for(var i=0;i<obj.length;i++){
		var temp = new BMap.Point(Number(obj[i][0]),Number(obj[i][1]));
		if(temp && i < 10){    //超过10个，baidu会报错。  zhangw
			points.push(temp);	
		}
	}
	//console.log(points);
	var myPos = '';
	if(spe){
		myPos = new BMap.Point(spe.lng,spe.lat);
	}else{
		myPos = points[0];	
	}
	 //地图初始化
    var bm = new BMap.Map('stationListMap_mapObj');
    //bm.centerAndZoom(new BMap.Point(116.378688937,39.9076296510), 15);
    bm.centerAndZoom(myPos, 13);   //to modify zhangw 此处应该是用户目前定位点
    //坐标转换完之后的回调函数
    translateCallback = function (data){
      if(data.status === 0) {
        for (var i = 0; i < data.points.length; i++) {
			if(i==0) continue;
            bm.addOverlay(new BMap.Marker(data.points[i]));
           // bm.setCenter(data.points[i]);
        }
        var marker = new BMap.Marker(myPos, {  //最近的用蓝色特殊标识
            icon: new BMap.Icon("images/marker_red_sprite.png", new BMap.Size(
                39, 25))
        });
        bm.addOverlay(marker);
		bm.setCenter(myPos);
      }
    }
    setTimeout(function(){
        var convertor = new BMap.Convertor();
        convertor.translate(points, 1, 5, translateCallback);
    }, 1000);
  }
  
 
    stationListMapObj.setDefConfig = function(){
		
	}
	
	
