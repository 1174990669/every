var invsendBonusObj = new PageController({
    'name': 'invsendBonus',
    'tpl': 'template/activity/invsendBonus.html'
});


invsendBonusObj.createDomObj = function () {
    this.wrapObj = $('#invsendBonus_wrapper');
};

invsendBonusObj.createEvent = function () {
    this.wrapObj.on('tap', function (e) {
        var pObj = $.oto_checkEvent(e, 'P');
        var t;
        if (pObj) {
            pObj = $(pObj);
            t = pObj.attr('data-t');
            switch (t) {
                case 'back': this.goBack(); break;
                case 'share': this.share(); break;
            }
        }

        var aObj = $.oto_checkEvent(e, 'A');
        if (aObj) {
            aObj = $(aObj);
            t = aObj.attr('data-t');
            switch (t) {
                case 'invite': this.invite(); break;
                case 'detail': this.goInvSendBonusDetail(); break;
            }
        }
    }.bind(this));
};

/**
 *
 * @param {Number} type 1 邀请分享，0 顶部图标分享
 */
invsendBonusObj.share = function (type) {
    //console.log(this.shareObj);
    Global.socialShare({
        'domId': 'invsendBonus',
        'title': '新人有好礼，好友加入再送20元',
        'content': '上旺旺中彩，领新人红包，中百万大奖，享美好人生',
        'url': type ? this.shareObj.url : this.shareObj.curl,
        'imagePath': this.shareObj.imagePath
    });
};

invsendBonusObj.invite = function () {
    if (loginObj.isLogin) {
        if (this.data['is_valid']) {
            this.share(1);
        } else {
            $.alertMsg('红包已派完，您仍可邀请好友', true);
            this.share(1);
        }
    } else {
        $.alertMsg('请先登录');

        invsendBonusObj.bgColor = window.getComputedStyle(document.body).backgroundColor;

        setTimeout(function () {
            loginObj.goBack = function () {
                loginObj.destroy();
                document.body.style.backgroundColor = invsendBonusObj.bgColor;
                invsendBonusObj.show();
            };

            loginObj.goForward = function () {
                document.body.style.backgroundColor = invsendBonusObj.bgColor;
                invsendBonusObj.show();
            };

            document.body.style.backgroundColor = Global.bgColor;
            loginObj.show();
        }, 2000);
    }
};

invsendBonusObj.goInvSendBonusDetail = function () {

    if (!loginObj.isLogin) {
        $.alertMsg('请先登录');
        invsendBonusObj.bgColor = window.getComputedStyle(document.body).backgroundColor;

        setTimeout(function () {
            loginObj.goBack = function () {
                loginObj.destroy();
                document.body.style.backgroundColor = invsendBonusObj.bgColor;
                invsendBonusObj.show();
            };

            loginObj.goForward = function () {
                document.body.style.backgroundColor = invsendBonusObj.bgColor;
                invsendBonusObj.show();
            };

            document.body.style.backgroundColor = Global.bgColor;
            loginObj.show();
        }, 2000);
    } else {
        // 没事别换背景颜色啊

        invsendBonusObj.bgColor = window.getComputedStyle(document.body).backgroundColor;

        invsendBonusDetailObj.goBack = function () {
            document.body.style.backgroundColor = invsendBonusObj.bgColor;
            invsendBonusDetailObj.destroy();
            invsendBonusObj.show();
        };

        invsendBonusDetailObj.show(true, function () {
            document.body.style.backgroundColor = '#fff7ec';
            invsendBonusDetailObj.dirShow(invsendBonusObj.eid, invsendBonusObj.inviteUrl, invsendBonusObj.inviteIamgeUrl);
        });
    }
};

invsendBonusObj.getData = function (cid, eid) {
    var postData = {
        'c_event_id': cid,
        'event_id': eid
    };

    var self = this;
    self.cid = cid;
    self.eid = eid;
	
	var secretData = {
		'para': Global.encrypt(postData),
        'access_token': loginObj.access_token
	}
	
    $.post(ConfigObj.localSite + '?version=1&m=user.activity.inviteSendBonus', secretData, function (data) {
        console.log('邀请送活动返回数据', data);
        
        if (data.code == '0000') {
        	data.data_info = $.parseJSON(Global.crypt(data.data_info));
        	self.data = data.data_info;
            self.shareObj.url = data.data_info.share_info.share_url;
            self.shareObj.curl = data.data_info.share_info.share_c_url;
            self.shareObj.title = data.data_info.share_info.share_title;
            self.shareObj.content = data.data_info.share_info.share_text;
            self.shareObj.imagePath = data.data_info.share_info.share_pic_url;
            self.formatHtml(data.data_info);
        } else {
        }
    }, 'json');
};

invsendBonusObj.formatHtml = function (data) {
	if(data.is_valid){
		
		 $('#invsendBonus_datecontext').html('活动时间：<span>'+data.event_begindate+'至'+data.event_enddate+'</span>');
	}else{
		$('#invsendBonus_datecontext').html('来晚啦，活动已结束');
	}
    if (Number(data.bonus_count)) {
        $('#invsendBonus_receiveNum').append('<em class="dot">' + data.bonus_count + '</em>');
    }
};

invsendBonusObj.onloadExecution = function () {
    this.createDomObj();
    this.createEvent();
};

invsendBonusObj.init = function () {
    this.onloadExecution();
    this.setDefConfig();
};

invsendBonusObj.setDefConfig = function () {
    this.cid = '';
    this.eid = '';
    this.inviteUrl = '';
    this.inviteIamgeUrl = '';
    this.shareObj = {};
};