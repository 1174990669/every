var regsendBonusObj = new PageController({
    'name': 'regsendBonus',
    'tpl': 'template/activity/regsendBonus.html'
});
//regsendBonus_backbtn regsendBonus_shareObj  

regsendBonusObj.createDomObj = function () {
    this.activeObj = $("#regsendBonus_activeObj");
    this.getObj = $("#regsendBonus_getObj");
    this.succObj = $("#regsendBonus_succObj");
    this.backBtn = $('#regsendBonus_backbtn');  //返回
    this.shareObj = $('#regsendBonus_shareObj');
}

regsendBonusObj.createEvent = function () {

    this.backBtn.unbind('tap').tap(function () {
        // history.go(-1) regsendBonus_backbtn
        regsendBonusObj.goBack(); 
        // homeObj.show();
    })
regsendBonusObj.goBack = function(){
    regsendBonusObj.destroy(); 
    homeObj.show();
}
    this.shareObj.on('tap', function () {
        // console.log(25) gethb
        regsendBonusObj.share();
    });

    this.activeObj.unbind('tap').tap(function (e) {
        var aObj = $.oto_checkEvent(e, "A");
        if (aObj) {
            var thisObj = $(aObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT) {
                case "gethb" :
                    regsendBonusObj.getAjax();
                    return true;
                case "href" :
                    regsendBonusObj.hrefUrl(thisObj);
                    return true;
                case 'mybonus' :
                    regsendBonusObj.goBonusRecord();
                    return true;
            }
        }
    });
}

regsendBonusObj.goBonusRecord = function () {
    if (!loginObj.isLogin) {
        userCenterObj.goLogin();
        return false;
    }

    // 恢复原来背景颜色
    document.body.style.backgroundColor = Global.bgColor ? Global.bgColor : '#f2f3f7';

    bonusRecordObj.goBack = function () {
        bonusRecordObj.destroy();
        regsendBonusObj.show();
    };
    bonusRecordObj.show();
};

regsendBonusObj.hrefUrl = function (obj) {
    var self = this;
    var thisH = obj.attr("data-h");
    switch (thisH) {
        case 'record':
            bonusRecordObj.goBack = function () {
                bonusRecordObj.destroy();
                self.show();
            }
            bonusRecordObj.show();
            break;
        case 'home':
            Global.GC();
            homeObj.show();
            break;

    }
}

regsendBonusObj.share = function () {
    // regsendBonusObj.getData()
    Global.socialShare({
        'domId': 'regsendBonus',
        'title': '新人礼3元红包免费领',
        'content': '上旺旺中彩，领新人红包，中百万大奖，享美好人生',
        'url': this.shareObj.url,
        'imagePath': this.shareObj.imagePath
    });
};

regsendBonusObj.getData = function (id) {
//	//console.log(id);
    var postData = {
        'c_event_id': id
    };
    var self = this;
    self.id = id;
    var secretData = {
    	'para': Global.encrypt(postData),
    	'access_token': loginObj.access_token
    }
    $.ajax({
        url: ConfigObj.localSite + '?version=1&m=user.activity.regSendBonus',
        data: secretData,
        type: "post",
        dataType: "json",
        success: function (data) {
		console.log('注册送活动返回数据', data);
			
            if (data.code == "0000") {
                /**
                 if (data.info.attended == 'yes') {
                      self.getObj.hide();
                      self.succObj.show();
                  } else {
                      self.getObj.show();
                      self.succObj.hide();
                  }
                 **/
                data.data_info = $.parseJSON(Global.crypt(data.data_info));
                self.shareObj = {};
                self.shareObj.url = data.data_info.share_info.share_url;
                self.shareObj.title = data.data_info.share_info.share_title;
                self.shareObj.content = data.data_info.share_info.share_text;
                self.shareObj.imagePath = data.data_info.share_info.share_pic_url;
                self.formatHtml(data.data_info);
            } else {
                // console.log() gethb
                $.alertMsg(data.code_str);
                self.getObj.show();
                self.succObj.hide();
            }
        }
    });
}

regsendBonusObj.formatHtml = function (data) {
//  //console.log(data);

    if (data.is_valid) {
        //$('#regsendBonus_date').html('活动时间：' + (data.event_begindate || '2017.04.01') + '至' + '红包派完结束');
    	$('#regsendBonus_date').html('活动时间：' + (data.event_begindate || '2017.04.01') + '至' + data.event_enddate);
        $('#regsendBonus_act').attr('data-t', 'gethb').html('立即领取');
    } else {
        $('#regsendBonus_date').html('来晚啦，活动已结束');
        $('#regsendBonus_act').attr('data-t', 'mybonus').html('我的红包');
    }


    $('#regsendBonus_rules').html(data.rule.Register);
};

// 点击领取
regsendBonusObj.getAjax = function () {
    if (!loginObj.isLogin) {
        // console.log(158)
        // 用户未登录，先跳到注册页面
        var id = regsendBonusObj.id;
        loginObj.goBack = function () {
            regsendBonusObj.show(true, function () {
                regsendBonusObj.getData(id);
            });
        };
        // $.alertMsg('请注册后领取红包');
        loginObj.show();
        return;
    }
//  //console.log(loginObj.userInfo.mobile)
    if(loginObj.userInfo.mobile == ""){
    	var id = regsendBonusObj.id;
    	bindPhoneObj.goBack = function () {
            regsendBonusObj.show(true, function () {
                regsendBonusObj.getData(id);
            });
        };
    	$.alertMsg('请绑定手机后领取红包');
    	bindPhoneObj.show();
    	return;
    }
    if (this.checkAjax)return false;
    this.checkAjax = true;
    var postData = {
        'c_event_id': regsendBonusObj.id
    }
    var secretData = {
    	'para': Global.encrypt(postData),
        'access_token': loginObj.access_token
    }
    $.ajax({
        url: ConfigObj.localSite + '?version=1&m=user.activity.regReceive',
        data: secretData,
        type: "post",
        dataType: "json",
        success: function (data) {
            if (data.code == "0000") {
                // regsendBonusObj.getSucc();
                $.alertMsg('您已成功领取红包', true);
                setTimeout(function () {
                   Global.GC();
                   homeObj.show();
                }, 2000);
                return false;
            } else if (data.code == '-1007') {
                $.alertMsg(data.code_str);
                regsendBonusObj.checkAjax = false;
                setTimeout(function () {
                    Global.GC();
                    userCenterObj.show('reload');
                }, 2000);
            }
            else {
                $.alertMsg(data.code_str);
                regsendBonusObj.checkAjax = false;
            }
        }
    });
}

regsendBonusObj.getSucc = function () {
    this.getObj.hide();
    this.succObj.show();
}

regsendBonusObj.onloadExecution = function () {
    this.createDomObj();
    this.createEvent();
}

regsendBonusObj.init = function () {
    regsendBonusObj.setDefConfig();
    regsendBonusObj.onloadExecution();
}

regsendBonusObj.setDefConfig = function () {
    this.checkAjax = false;
    this.id = '';
    this.shareImgUrl = '';
}

regsendBonusObj.dirShow = function (obj) {
    var self = this;
    self.show('reload', function () {
        self.id = (obj && obj.id) ? obj.id : ''; // 活动 id
        self.getData(self.id);
    });
}
  
  
	
  

