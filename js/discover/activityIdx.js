var activityIdxObj = new PageController({
    'name': 'activityIdx',
    'tpl': 'template/discover/activityIdx.html'
});

activityIdxObj.createDomObj = function () { //activityIdx_back 
    this.wrapperObj = $("#activityIdx_wrapperObj");
    this.backObj = $('#activityIdx_back');
    this.homeObj = $('#activityIdx_home'); 
}

activityIdxObj.createEvent = function () {
    this.backObj.unbind('tap').tap(function () {
        // activityIdxObj.goBack();
        searchSiteObj.show()
        // searchSiteObj.goBack()

    })
    this.homeObj.unbind('tap').tap(function () {
        activityIdxObj.goHome();
    })
    this.wrapperObj.unbind('tap').tap(function (e) {
        var divObj = $.oto_checkEvent(e, "DIV");
        divObj = $(divObj).parents('.act_li');
        if (divObj) {
            var thisObj = $(divObj);
            var thisT = thisObj.attr("data-t");
            var id = thisObj.attr('data-v');
            var extra = thisObj.attr('data-extra');
            switch (thisT) {
                //case "/activity/regsendbonus" : activityIdxObj.goRegSendBonus();return true;
                case 'Bonus' :
                    activityIdxObj.checkBonusType(id, extra);
                    return true;
                case 'LuckyDraw' :
                    activityIdxObj.goScorePrize(id);
                    return true;
            }
        }

    });

}

activityIdxObj.checkBonusType = function (id, extra) {
    switch (extra) {
        case 'Register':
            activityIdxObj.goRegSendBonus(id);
            break; // 注册送红包
        case 'Invitation':
            activityIdxObj.goInvSendBonus(id);
            break; // 邀请送红包
        default:
            activityIdxObj.goRedBag(id); // 普通领取红包
    }
}

activityIdxObj.goScorePrize = function (id) {
    scorePrizeObj.goBack = function () {
        activityIdxObj.show();
        scorePrizeObj.destroy();
    }
    scorePrizeObj.show('reload', function () {
        scorePrizeObj.getData(id);
    })
}


activityIdxObj.goRedBag = function (id) {
    /* redBagObj.goBack = function(){
     activityIdxObj.show();
     redBagObj.destroy();
     }*/
    redBagObj.show(true, function () {
        redBagObj.getData(id);
        redBagObj.pushRoute(function () {
            activityIdxObj.show();
        })
    })
}

activityIdxObj.goHome = function () {
    Global.GC();
    homeObj.show();
}

activityIdxObj.goRegSendBonus = function (id) {
    regsendBonusObj.goBack = function () {
        regsendBonusObj.destroy();
        activityIdxObj.show();
    }
    regsendBonusObj.show(true, function () {
        regsendBonusObj.getData(id);
    });
}

activityIdxObj.goInvSendBonus = function (id) {
    Global.bgColor = window.getComputedStyle(document.body).backgroundColor;
    invsendBonusObj.goBack = function () {
        document.body.style.backgroundColor = Global.bgColor;
        invsendBonusObj.destroy();
        activityIdxObj.show();
    };
    invsendBonusObj.show(true, function () {
        document.body.style.backgroundColor = '#f9ddb6';
        invsendBonusObj.getData('', id);
    });
}
//activityIdx_back

activityIdxObj.getData = function () {
    var postData = {
    	'platForm': ConfigObj.platForm
    };
    var secretData = {
    	'para': Global.encrypt(postData),
    	'access_token': loginObj.access_token
    }
    $.ajax({
        url: ConfigObj.localSite + '?version=1&m=user.activity.activity',
        data: secretData,
        type: "post",
        dataType: "json",
        success: function (msg) {
           console.log('活动首页列表', msg);
            
            if (msg.code == '0000') {
            	msg.info = $.parseJSON(Global.crypt(msg.info));
                activityIdxObj.formatHtml(msg.info);
            } else {
                $.alertMsg(msg.code_str);
            }
        }
    });
}

activityIdxObj.formatHtml = function (data) {
    //activityIdx_list
	//console.log(data);
	//console.log(data.length);
    if (data.length) {
        var html = '';
        for (var i = 0; i < data.length; i++) {
            var itm = data[i];
            var disCls = '';
            if (itm.status == 2) {
                disCls = 'actDisable_1';
            }

            if (itm.type == 'Bonus') {
                // 呜呜呜，又改了，又改了

                if (itm.extra.pic) {
                    html += '<div class="act_li" data-t="' + itm.type + '" data-v="' + itm.eventId + '" data-extra="' + (itm.extra.bonusType ? itm.extra.bonusType : '') + '" ><div>' +
                        '<p class="mb8"><img src="' + itm.extra.pic + '"></p>' +
                        '<p class="font12 gray">活动时间：' + itm.beginTime.substr(0, 10) + '至'+ itm.endTime.substr(0, 10) +'</p>' +
                        (itm.status == 2 ? '<span class="dated disbg"></span>' : '') +
                        '</div></div>';
                } else {
                	if(itm.status == 1){
                	html += '<div class="act_li" data-t="' + itm.type + '" data-v="' + itm.eventId + '" data-extra="' + (itm.extra.bonusType ? itm.extra.bonusType : '') + '">' +
		                		'<div class="act_bg" id="act_bg">'+
		                			'<div class="act_inbg clearfix" id="act_inbg">'+
		                				'<div class="act_money fl">'+
		                					'<p>¥</p>'+
		                					'<span>' + itm.extra.singleBagMoney + '</span>'+
		                				'</div>'+
		                				'<div class="act_content fl">'+
		                					'<h4>' + itm.eventName + '</h4>'+
		                					'<p>' + itm.eventContent + '</p>'+
		                					'<span>活动时间：' + itm.beginTime.substr(0, 10) + '至' + itm.endTime.substr(0, 10) + '</span>'+
		                				'</div>'+
		                			'</div>'+
		                			'<div class="act_pt">'+
		                				'<p>平台</br>通用</p>'+
		                			'</div>'+
		                		'</div>'+
		                	'</div>';
                	
//                  html += '<div class="act_li" data-t="' + itm.type + '" data-v="' + itm.eventId + '" data-extra="' + (itm.extra.bonusType ? itm.extra.bonusType : '') + '">' +
//                      '<div class="pboxwrap coup-' + ((itm.extra && itm.extra.scene) ? itm.extra.scene : '') + '  ' + disCls + '">' +
//                      '<div class="pwdbox">' +
//                      '<span class="coup-style">' + ((itm.extra && itm.extra.sceneText) ? itm.extra.sceneText : '') + '</span>' +
//                      '<span class="bigdot b1"></span>' +
//                      '<span class="bigdot b2"></span>' +
//                      '<p class="smdots s1"><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span>' +
//                      '</p>' +
//                      '<p class="smdots s2"><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span>' +
//                      '</p>' +
//                      '<div class="coup-info center">' +
//                      '<p class="font16">' + itm.extra.singleBagMoney + '元</p>' +
//                      '<p class="font16">' + itm.eventName + '</p>' +
//                      '<p class="font12">' + itm.eventContent + '</p>' +
//                      '</div>' +
//                      '</div>' +
//                      '</div>' +
//                      '<p class="font12 gray">活动时间：' + itm.beginTime.substr(0, 10) + '至' + itm.endTime.substr(0, 10) + '</p>';
                    } else if (itm.status == 0) {
                    	
                    	html += '<div class="act_li" data-t="' + itm.type + '" data-v="' + itm.eventId + '" data-extra="' + (itm.extra.bonusType ? itm.extra.bonusType : '') + '">' +
			                		'<div class="act_bg" id="act_bg">'+
			                			'<div class="act_inbg clearfix" id="act_inbg">'+
			                				'<div class="act_money fl">'+
			                					'<p>¥</p>'+
			                					'<span>' + itm.extra.singleBagMoney + '</span>'+
			                				'</div>'+
			                				'<div class="act_content fl">'+
			                					'<h4>' + itm.eventName + '</h4>'+
			                					'<p>' + itm.eventContent + '</p>'+
			                					'<span>活动时间：' + itm.beginTime.substr(0, 10) + '至' + itm.endTime.substr(0, 10) + '</span>'+
			                				'</div>'+
			                			'</div>'+
			                			'<div class="act_pt">'+
			                				'<p>平台</br>通用</p>'+
			                			'</div>'+
			                		'</div>'+
			                		'<span class="oning disbg"></span>'+
			                	'</div>';
                    	
//                      html += '<span class="oning disbg"></span>';
                    } else if (itm.status == 2) {
//                      html += '<span class="dated disbg"></span>';
                        html += '<div class="act_li" data-t="' + itm.type + '" data-v="' + itm.eventId + '" data-extra="' + (itm.extra.bonusType ? itm.extra.bonusType : '') + '">' +
			                		'<div class="act_bg out" id="act_bg">'+
			                			'<div class="act_inbg clearfix out" id="act_inbg">'+
			                				'<div class="act_money fl">'+
			                					'<p>¥</p>'+
			                					'<span>' + itm.extra.singleBagMoney + '</span>'+
			                				'</div>'+
			                				'<div class="act_content fl">'+
			                					'<h4>' + itm.eventName + '</h4>'+
			                					'<p>' + itm.eventContent + '</p>'+
			                					'<span>活动时间：' + itm.beginTime.substr(0, 10) + '至' + itm.endTime.substr(0, 10) + '</span>'+
			                				'</div>'+
			                			'</div>'+
			                			'<div class="act_pt">'+
			                				'<p>平台</br>通用</p>'+
			                			'</div>'+
			                		'</div>'+
			                		'<span class="dated disbg"></span>'+
			                	'</div>';
                    }
//                  html += '</div>';
                }

            } else if (itm.type == 'LuckyDraw') {

                html += '<div class="act_li" data-t="' + itm.type + '" data-v="' + itm.eventId + '">' +
                    //'<div class="pboxwrap"><div class="luckyDraw_1"></div></div>'+
                    '<div class="pboxwrap"><img src="images/activity/actBg.png" /></div>' +
                    '<p class="font12 gray">活动时间：' + (itm.beginTime ? itm.beginTime.substr(0, 10) : '') + '至' + (itm.endTime ? itm.endTime.substr(0, 10) : '') + '</p>';
                if (itm.status == 0) {
                    html += '<span class="oning disbg"></span>';
                } else if (itm.status == 2) {
                    html += '<span class="dated disbg"></span>';
                }
                html += '</div>';
            }
            /*else if(itm.type == 'LuckyDraw'){   //原有样式，暂时保留，防止抽风改回去
             html += '<div class="act_li" data-t="'+ itm.type +'" data-v="'+ itm.eventId  +'">'+
             '<div class="pboxwrap coup- ' + '  '+ disCls +'">'+
             '<div class="pwdbox">'+
             //'<span class="coup-style">'+ ((itm.extra && itm.extra.sceneText)  ? itm.extra.sceneText :'') + '</span>'+
             '<span class="bigdot b1"></span>'+
             '<span class="bigdot b2"></span>'+
             '<p class="smdots s1"><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span>'+
             '</p>'+
             '<p class="smdots s2"><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span><span class="smdot"></span>'+
             '</p>'+
             '<div class="coup-info center">'+
             //'<p class="font16">'+ itm.extra.singleBagMoney + '元</p>'+
             '<p class="font16">'+ itm.eventName + '</p>'+
             '<p class="font12">'+ itm.eventContent + '</p>'+
             '</div>'+
             '</div>'+
             '</div>'+
             '<p class="font12 gray">活动时间：'+ itm.beginTime.substr(0,10) + '至' + itm.endTime.substr(0,10) + '</p>';
             if(itm.status == 0){
             html += '<span class="oning disbg"></span>';
             }else if(itm.status == 2){
             html += '<span class="dated disbg"></span>';
             }
             html += '</div>';
             */
        }
//      html += '</div>';

        $('#activityIdx_list').html(html);
    }
    else {

        var html = '<div class="noact center">' +
            '<p class="mb15"><span class="disbg dis1"></span></p>' +
            '<p class="font14 gray">暂时没有活动哦~</p>' +
            '</div>';
        $('#activityIdx_list').html(html);
    }
}


activityIdxObj.onloadExecution = function () {
    this.createDomObj();
    this.createEvent();
}

activityIdxObj.init = function () {
    activityIdxObj.onloadExecution();
}

activityIdxObj.goBack = function () {
}

activityIdxObj.setDefConfig = function () {

}
	
	
	
