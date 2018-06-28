;(function($,undefined){
  // console.log(arguments[1])
  $.alertMsg = function(){
    var alertObj = new Object();
    alertObj.msgData = arguments[0] || "";
    alertObj.msgStyle = arguments[1] ? "suc_icon" : "err_icon";
    alertObj.hideTime = Number(arguments[2]) || 2000;
    alertObj.positionTop = 50;
    alertObj.alertSetTimeObj = "";
    alertObj.zeptoData = $.setData;

    alertObj.createDom = function(){
      if(!this.zeptoData.alertDomObj){
        this.zeptoData.alertDomObj = $('<div class="tip_con"><div class="tip_box"></div></div>');
        $("body").append(this.zeptoData.alertDomObj);
        alertObj.domWidth = this.zeptoData.alertDomObj.width();
        alertObj.domHeight = this.zeptoData.alertDomObj.height();
         this.zeptoData.alertDomWidth = alertObj.domWidth;
        this.zeptoData.alertDomHeight = alertObj.domHeight;
        this.zeptoData.alertDomObj.hide();      
      }else{
        alertObj.domWidth = this.zeptoData.alertDomWidth;
        alertObj.domHeight = this.zeptoData.alertDomHeight;
        ////console.log(this.zeptoData.alertSetTimeObj);
        if(this.zeptoData.alertSetTimeObj)clearTimeout(this.zeptoData.alertSetTimeObj);
        this.zeptoData.alertDomObj.hide();
      }
    }

    alertObj.showDom = function(){
      this.zeptoData.alertDomObj.children('div').html('<span data-t="hide" class="tipicon '+this.msgStyle+'"></span>'+this.msgData);
      this.setPosition();
      this.zeptoData.alertDomObj.fadeIn();
      this.alertSetTimeHide();
    }

    alertObj.hideDom = function(){
      this.zeptoData.alertDomObj.hide();
      if(this.zeptoData.alertSetTimeObj)clearTimeout(this.zeptoData.alertSetTimeObj);
      delete this.zeptoData.alertSetTimeObj;
    }

    alertObj.alertSetTimeHide = function(){
      this.zeptoData.alertSetTimeObj = setTimeout(function(){
        alertObj.hideDom();
      },this.hideTime);
    }

    alertObj.alertEvent = function(){
      this.zeptoData.alertDomObj.tap(function(e){
        var spanObj = $.oto_checkEvent(e,"SPAN");
        if(spanObj){
            var thisObj = $(spanObj);
            var thisT = thisObj.attr("data-t");
            switch(thisT){
              case "hide" : alertObj.hideDom();
            }
        }
      });
    }

    alertObj.setPosition = function(){
      var clientWidth = document.documentElement.clientWidth;
      var clientHeight = document.documentElement.clientHeight;
      var scrollTop = $("body").scrollTop();

      var top = scrollTop+(clientHeight-this.domHeight)/2-this.positionTop;
      var left = (clientWidth-this.domWidth)/2;

      this.zeptoData.alertDomObj.css({
        top : top+"px",
        left : left+"px",
        position : "absolute"
      });
    }

    alertObj.init = function(){
      this.createDom();
      this.showDom();
      this.alertEvent();
    }

    alertObj.init();
  }
})(Zepto)