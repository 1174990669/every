
  var chartIdxObj = new PageController({
	   'name': 'chartIdx',
	   'tpl' : 'template/kaijiang/chartIdx.html'
    });

  chartIdxObj.destroy = function () {

      /**
       * 删除缓存的投注记录
       */
      for (var k in window.localStorage) {
          if (k.indexOf('lottery') != -1) {
              window.localStorage.removeItem(k);
          }
      }

      this.setDefConfig();
      $('#' + this.name).html('').remove();
  };


  chartIdxObj.createDomObj = function(){
    this.wrapperObj = $("#chartIdx_wrapperObj");
  }

  chartIdxObj.createEvent = function(){
	$('#chartIdx_back').unbind('tap').tap(function(){
		chartIdxObj.goBack();
	})
    this.wrapperObj.unbind('tap').tap(function(e){
        if (e.target.tagName === 'A') {
            var aObj = $.oto_checkEvent(e, 'A');
            if (aObj) {
                aObj = $(aObj);
                var t = aObj.parent().attr('data-t');
                var v = aObj.attr('data-v');
                var cn = aObj.attr('data-cn');
                if (t === 'd3Sub') {
                    chartIdxObj.goD3ChartSub(v, cn);
                    return;
                } else if (t === 'pl3Sub') {
                    chartIdxObj.goPl3ChartSub(v, cn);
                    return;
                } else if (t === 'ssqSub') {
                    chartIdxObj.goSsqChartSub(v);
                    return;
                } else if (t === 'dltSub') {
                    chartIdxObj.goDltChartSub(v);
                    return;
                } else if (t === 'pl5Sub') {
                    chartIdxObj.goPl5ChartSub(v);
                    return;
                }
            }
        }

    	var DLObj = $.oto_checkEvent(e,"DL");
      if(DLObj){
        var thisObj = $(DLObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "href" : chartIdxObj.goChart(thisObj);
        }        
      }
    });
  }
  
  chartIdxObj.goChart = function(obj){
	 var type = obj.attr('data-v');
	// //console.log(type);
	 switch(type){
	 	case 'dlt':
	 		chartIdxObj.goDltChart();
			return;  
		case 'ssq':
	 		chartIdxObj.goSsqChart();
			return;
		case 'pl3':
			chartIdxObj.goPl3Chart();
			return;  
		case 'd3':
			chartIdxObj.goD3Chart();
			return; 
		case 'pl5':
			chartIdxObj.goPl5Chart();
			return;  
		case 'qxc':
			chartIdxObj.goQxcChart();
			return;
		case ConfigObj.fastLotType:
			chartIdxObj.goFastBetChart(ConfigObj.fastLotType);
			return;
	 }
  }
  
  chartIdxObj.goDltChart = function(){
	  dltTrendObj.goBack = function(){
		 chartIdxObj.show();
		 dltTrendObj.destroy();  
	  }
	  dltTrendObj.show('reload');
  }

  chartIdxObj.goDltChartSub = function (v) {
      dltTrendObj.goBack = function () {
          chartIdxObj.show();
          dltTrendObj.destroy();
      };
      dltTrendObj.show(true, function () {
          console.clear();
          //console.log(v);
          dltTrendObj.updateTrendName($('#dltTrend_' + v));
      });
  }
  
  chartIdxObj.goSsqChart = function(){
	  ssqTrendObj.goBack = function(){
		 chartIdxObj.show();
		 ssqTrendObj.destroy();  
	  }
	  ssqTrendObj.show('reload');
  }

  chartIdxObj.goSsqChartSub = function (v) {
      ssqTrendObj.goBack = function () {
          chartIdxObj.show();
          ssqTrendObj.destroy();
      };
      ssqTrendObj.show(true, function () {
          ssqTrendObj.updateTrendName($('#ssqTrend_' + v));
      });
  };
  
  chartIdxObj.goPl3Chart = function(){
	  pl3TrendObj.goBack = function(){
		 chartIdxObj.show();
		 pl3TrendObj.destroy();  
	  }
	  pl3TrendObj.show('reload');
  }

  chartIdxObj.goPl3ChartSub = function(v, cn){
      pl3TrendObj.goBack = function () {
          chartIdxObj.show();
          pl3TrendObj.destroy();
      };
      pl3TrendObj.show(true, function () {
          pl3TrendObj.updatelottery(v, cn);
      });
  }
  
   chartIdxObj.goD3Chart = function(){
	  d3TrendObj.goBack = function(){
		 chartIdxObj.show();
		 d3TrendObj.destroy();  
	  }
	  d3TrendObj.show('reload');
  }

  chartIdxObj.goD3ChartSub = function (v, cn) {
      d3TrendObj.goBack = function () {
          chartIdxObj.show();
          d3TrendObj.destroy();
      };
      d3TrendObj.show(true, function () {
          d3TrendObj.updatelottery(v, cn);
      });
  }
  
   chartIdxObj.goPl5Chart = function(){
	  pl5TrendObj.goBack = function(){
		 chartIdxObj.show();
		 pl5TrendObj.destroy();  
	  }
	  pl5TrendObj.show('reload');
  }

  chartIdxObj.goPl5ChartSub = function(v){
      pl5TrendObj.goBack = function(){
          chartIdxObj.show();
          pl5TrendObj.destroy();
      };
      pl5TrendObj.show(true, function () {
          pl5TrendObj.updateTrendName($('#pl5Trend_' + v));
      });
  }
  
   chartIdxObj.goQxcChart = function(){
	  qxcTrendObj.goBack = function(){
		 chartIdxObj.show();
		 qxcTrendObj.destroy();  
	  }
	  qxcTrendObj.show('reload');
  }
  
  chartIdxObj.goFastBetChart = function(type){
	  fastTrendObj.goBack = function(){
		 chartIdxObj.show();
		 fastTrendObj.destroy();  
	  }
	  fastTrendObj.show('reload',function(){
		 if(type == 'gd11x5'){
		 	fastTrendObj.updatelottery('R2','任二');
		 }
	  });
  }
  

  chartIdxObj.onloadExecution = function(){
    this.createDomObj();
    this.createEvent();
  }

  chartIdxObj.init = function(){
      chartIdxObj.onloadExecution();
  }
  
  chartIdxObj.goBack = function(){	
  }
	
	
   
  chartIdxObj.dirShow = function(){
	chartIdxObj.show();  
  }

